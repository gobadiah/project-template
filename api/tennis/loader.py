"""Loader function for getting a json into the database."""

import datetime
import json
import logging
import re
import subprocess  # Noqa B404

from assets.models import Asset

import boto3

import botocore

from core.models import User

from django.db import transaction
from django.utils.translation import ugettext_lazy as _

from sports.models import \
    Session, \
    Video, \
    VideoPoint

from .models import \
    Exchange, \
    ExchangePlayer, \
    Game, \
    GamePlayer, \
    Hit, \
    Match, \
    MatchPlayer, \
    Player, \
    SessionPlayer, \
    Set, \
    SetPlayer, \
    Training

logger = logging.getLogger()


@transaction.atomic
def loader(
    json_filename=None,
):
    """Load a json into database, and upload a video to S3 as well."""
    # Load json
    data = load_json(json_filename)
    user = choose_user()
    user.save()
    session = create_session(user, data)
    session.save()
    players = create_players(data)
    video = create_video(user, session)
    video.asset.save()
    video.asset_id = video.asset.id
    video.save()
    training = None
    match = None
    exchanges = {}
    sets = {}
    games = {}
    exchanges = {}
    for player in players.values():
        player.save()
        SessionPlayer.objects.get_or_create(
            session=session,
            player=player,
        )
    for ex in data['list_of_exchanges']:
        if ex['game_mode'] == 'match':
            if 'game_id' not in ex:
                logger.info('WARNING! Exchange found with no game_id '
                            'while in game_mode match:', ex)
                continue
            if match is None:
                match = Match.objects.create(session=session)
            exchange = Exchange(
                game=get_game(
                    ex['game_id'],
                    games,
                    players,
                    match,
                    sets,
                    data,
                ),
            )
        else:
            if training is None:
                training = Training.objects.create(session=session)
            exchange = Exchange(training=training)
        exchange.start_at, _ = VideoPoint.objects.get_or_create(
            video=video,
            frame=ex.pop('first_frame'),
            time=datetime.timedelta(
                seconds=ex.pop('video_begin_time')['0'],
            ),
        )
        exchange.end_at, _ = VideoPoint.objects.get_or_create(
            video=video,
            frame=ex.pop('last_frame'),
            time=datetime.timedelta(
                seconds=ex.pop('video_end_time')['0'],
            ),
        )
        exchange.server = players[ex.pop('server')]
        player_sides = ex.pop('player_sides')
        exchange.data = ex
        exchange.save()
        exchanges[ex['exchange_id']] = exchange
        for side, player_id in player_sides.items():
            ExchangePlayer.objects.create(
                exchange=exchange,
                player=players[player_id],
                is_winner=player_id == ex['winner'],
                side=side,
            )
    for h in data['list_of_hits']:
        if h['exchange_id'] not in exchanges:
            continue
        hit = Hit(exchange=exchanges[h['exchange_id']])
        hit.video_point, _ = VideoPoint.objects.get_or_create(
            video=video,
            frame=h.pop('frame'),
            time=datetime.timedelta(
                seconds=int(h.pop('video_time')['0']),
            ),
        )
        hitter = players[h.pop('hitter')]
        hit.hitter = hitter
        hit.data = h
        hit.save()
    for game_id, game in games.items():
        video_points = VideoPoint.objects.filter(
            start_point_for_exchanges__game=game,
        )
        game.start_at = min(video_points)
        game.end_at = max(video_points)
        game.save()
        d = data['list_of_games'][game_id]
        for side, player_id in d['player_sides'].items():
            exchanges_won = d['score']['points'][player_id]
            GamePlayer.objects.create(
                game=game,
                player=players[player_id],
                is_winner=player_id == d['winner'],
                side=side,
                exchanges_won=exchanges_won if d['winner'] != player_id
                else exchanges_won + 1,
            )
    for set_id, set in sets.items():
        video_points = VideoPoint.objects.filter(
            start_point_for_exchanges__game__set=set,
        )
        set.start_at = min(video_points)
        set.end_at = max(video_points)
        set.save()
        d = data['list_of_sets'][set_id]
        for player_id, games_won in d['score']['games'].items():
            logger.info(player_id, games_won)
            SetPlayer.objects.create(
                set=set,
                player=players[player_id],
                is_winner=player_id == d['winner'],
                games_won=games_won if d['winner'] != player_id else
                games_won + 1,
            )
    if match:
        video_points = VideoPoint.objects.filter(
            start_point_for_exchanges__game__set__match=match,
        )
        match.start_at = min(video_points)
        match.end_at = max(video_points)
        match.save()
        last_set = Set.objects.filter(match=match).order_by('-index')[0]
        for player in last_set.players.all():
            MatchPlayer.objects.create(
                match=match,
                player=player,
                sets_won=SetPlayer.objects.filter(
                    set__match=match,
                    player=player,
                    is_winner=True,
                ).count(),
                is_winner=last_set.winner == player,
            )
    if training:
        video_points = VideoPoint.objects.filter(
            start_point_for_exchanges__training=training,
        )
        training.start_at = min(video_points)
        training.end_at = max(video_points)
        training.save()


def load_json(json_filename='database_match.json'):
    """Load the json from filename if provided or ask the user."""
    if json_filename is None:
        json_filename = input(  # Noqa B322
            _('Please enter the filename for the json database: '))
    return json.load(open(json_filename))


def choose_user(default_email='gobadiah@gmail'):
    """Choose or create a user if it doesn't exist."""
    email = input('Enter the user\'s email [{}]: '.format(  # Noqa B322
        default_email)) or \
        default_email
    user = User(email=email)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        pass
    if user.id is None:
        logger.info('User with email {} doesn\'t exist, '
                    'please enter the following informations.'.format(email))
        setup_user(user)
    else:
        logger.info('User {} has been found'.format(user))
    return user


def setup_user(user):
    """Set-up a new user."""
    default_first_name = 'Michaël'
    default_last_name = 'Journo'
    user.first_name = input('First name [{}]: '.format(  # Noqa B322
        default_first_name,
    )) or default_first_name
    user.last_name = input('Last name [{}]: '.format(  # Noqa B322
        default_last_name,
    )) or default_last_name
    user.birthday = datetime.date(1986, 2, 11)
    password = User.objects.make_random_password()
    user.set_password(password)
    logger.info('User {} has been created, '
                'and the following password has been set: {}'.format(
                    user,
                    password,
                ))


def get_length(filename):
    """Get a video duration using ffprobe."""
    result = subprocess.Popen(  # Noqa B607
        [
            'ffprobe',
            '-v',
            'error',
            '-show_entries',
            'format=duration',
            '-of',
            'default=nologger.info_wrappers=1:nokey=1',
            filename,
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    lines = result.stdout.readlines()
    return float(lines[0])


def get_mime_type(filename):
    """Get mimetype from a file."""
    result = subprocess.Popen(  # Noqa B607
        [
            'file',
            '-b',
            '--mime-type',
            filename,
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    return result.stdout.readlines()[0].decode('utf-8').strip()


def format_timedelta(td):
    """Format a timedelta using a regular format."""
    s = td.seconds
    h = s // 3600
    s = s - (3600 * h)
    m = s // 60
    s = s - (60 * m)
    hours = h + td.days * 24
    return '{}:{}:{}'.format(hours, m, s)


def get_duration(text, default='06:00:00'):
    """Get a duration from the user."""
    default_duration_str = default
    duration_str = input(text + ' (format hh:mm:ss) [{}]: '.format(  # Noqa B322
        default_duration_str,
    )) or default_duration_str
    tmp = re.findall('([0-9]+):([0-9]+):([0-9]+)', duration_str)
    if len(tmp) == 0:
        logger.info('Error while searching for duration, '
                    'setting duration to 0 second')
        return datetime.timedelta()
    else:
        return datetime.timedelta(
            hours=int(tmp[0][0]),
            minutes=int(tmp[0][1]),
            seconds=int(tmp[0][2]),
        )


def create_session(user, data):
    """Create a session for a given user using data from a json file."""
    session = Session()
    session.owner = user
    logger.info(data['session_info'], data['session_info']['date'])
    if 'session_info' in data and 'date' in data['session_info']:
        default_date_str = data['session_info']['date']
    else:
        default_date_str = datetime.date.today().strftime('%d/%m/%Y')
    date_str = input(  # Noqa B322
        'Session\'s date (format dd/mm/YYYY) [{}]: '.format(default_date_str),
    ) or default_date_str
    session.date = datetime.datetime.strptime(date_str, '%d/%m/%Y').date()
    if 'session_info' in data and 'place' in data['session_info']:
        default_place = data['session_info']['place']
    else:
        default_place = 'Paris'
    session.place = input(  # Noqa B322
        'Session\'s place [{}]: '.format(default_place),
    ) or default_place
    session.duration = get_duration('Session\'s duration', default='06:00:00')
    surface = None

    def get(surface):
        if surface == 'quick':
            return 'hard'
        return surface

    available_surfaces = [
        'clay',
        'grass',
        'hard',
        'carpet',
    ]
    while surface is None:
        if 'session_info' in data and \
                'court_caracteristics' in data['session_info']:
            default_surface = get(data['session_info']['court_caracteristics'])
        else:
            default_surface = 'clay'
        surface = input('Session\'s surface {} [{}]: '.format(  # Noqa B322
            available_surfaces,
            default_surface,
        )) or \
            default_surface
        if surface not in available_surfaces:
            surface = None
        logger.info('loop', surface)
    session.data['surface'] = surface

    return session


def create_video(user, session, region='eu-west-3'):
    """Create a video for a user and a given session."""
    asset = Asset(owner=user, external=False)
    default_bucket = 'kincube-development'
    asset.info['s3'] = {}
    asset.info['s3']['bucket'] = input(  # Noqa B322
        'Video\'s bucket in Amazon S3 [{}]: '.format(default_bucket)) or \
        default_bucket
    default_key = 'australian open 2017 finale federer_nadal best points HD ' \
        'french_français (720p_30fps_H264-192kbit_AAC).mp4'
    asset.info['s3']['key'] = \
        input('Video\'s key in Amazon S3 [{}]: '.format(  # Noqa B322
        default_key,
    )) or default_key
    #  asset.url = 'http://{}.s3-aws-{}.amazonaws.com/{}'.format(
    #      asset.info['s3']['bucket'],
    #      region,
    #      asset.info['s3']['key'],
    #  )
    # duration = datetime.timedelta(seconds=get_length(video.key))
    # video.duration = duration
    s3 = boto3.resource('s3')
    data = open(asset.info['s3']['key'], 'rb')
    mime_type = get_mime_type(asset.info['s3']['key'])
    asset.info['Content-Type'] = mime_type
    s3.Bucket(asset.info['s3']['bucket']).put_object(
        Key=asset.info['s3']['key'],
        Body=data,
        ACL='public-read',
        ContentType=mime_type,
    )
    config = boto3.client('s3')._client_config
    config.signature_version = botocore.UNSIGNED
    asset.url = boto3.resource(
        's3',
        config=config,
    ).meta.client.generate_presigned_url(
        'get_object',
        ExpiresIn=0,
        Params={
            'Bucket': asset.info['s3']['bucket'],
            'Key': asset.info['s3']['key'],
        },
    )
    video = Video(asset=asset, session=session)
    return video


def create_training(session):
    """Create training for a session."""
    training = Training(session=session)
    return training


def create_match(session):
    """Create a match for a session."""
    return Match(session=session)


def create_player(p):
    """Create a player from data in json, and acts user for extra input."""
    default_email = None
    email = input(  # Noqa B322
        'Enter {}\'s email: '.format(p['player_id'])) or \
        default_email
    name = '{} {}'.format(p['first_name'], p['last_name'])
    player = Player(email=email, name=name)
    try:
        if email is not None:
            player.user = User.objects.get(email=email)
    except User.DoesNotExist:
        pass
    try:
        if email is not None:
            player = Player.objects.get(email=email)
    except Player.DoesNotExist:
        pass
    player.data = p
    return player


def create_players(data):
    """Create multiple players."""
    players = {}
    for key in ['player_1', 'player_2']:
        players[data['players_info'][key]['player_id']] = \
            create_player(data['players_info'][key])
    return players


def get_set(set_id, sets, players, match, data):
    """Get or create a set using ids and json data."""
    if set_id not in sets:
        sets[set_id] = Set.objects.create(
            match=match,
            index=set_id,
            data=data['list_of_sets'][set_id],
        )
    return sets[set_id]


def get_game(game_id, games, players, match, sets, data):
    """Get or create game using ids and json data."""
    if game_id not in games:
        games[game_id] = Game.objects.create(
            set=get_set(
                data['list_of_games'][game_id]['set_id'],
                sets,
                players,
                match,
                data,
            ),
            index=game_id,
            data=data['list_of_games'][game_id],
            server=players[data['list_of_games'][game_id]['server']],
        )
    return games[game_id]
