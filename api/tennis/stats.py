"""Stats generation for tennis activities."""

from functools import reduce

from core.models import User

from django.contrib.contenttypes.models import ContentType
from django.utils import timezone

from sports.models import Session

from .models import Hit

from stats.models import Stats

user_generators = {}
session_generators = {}


class register_user(object): # noqa N801
    def __init__(self, f):
        """register_user initializer."""
        user_generators[f.__name__] = f


class register_session(object): # noqa N801
    def __init__(self, f):
        """register_session initializer."""
        session_generators[f.__name__] = f


def run_user(user, date):
    """Compute the stats for a user and a given date."""
    return reduce(
        lambda x, y: {**x, **y},
        map(
            lambda f: f(user, date),
            user_generators.values(),
        ),
    )


def run_session(session):
    """Compute the stats for a tennis session."""
    return reduce(
        lambda x, y: {**x, **y},
        map(
            lambda f: f(session),
            session_generators.values(),
        ),
    )


def compute_users_statistics(date):
    """Wrap run method for users statistics at date."""
    for user in User.objects.all():
        compute_statistics_for_user(user, date)


def compute_sessions_statistics():
    """Wrap run method for sessions statistics."""
    for session in Session.objects.all():
        compute_statistics_for_session(session)


def compute_statistics_for_session(session):
    """Wrap run method for session statistics."""
    if type(session) == int:
        session = Session.objects.get(pk=session)

    data = run_session(session)

    print(Stats.objects.update_or_create(  # Noqa T1
        content_type=ContentType.objects.get_for_model(session),
        object_id=session.id,
        date=session.date,
        version=Stats.VERSION,
        defaults={
            'data': data,
            'computed_at': timezone.now(),
        },
    ))


def compute_statistics_for_user(user, date):
    """Wrap run method for user statistics at date."""
    if type(user) == int:
        user = User.objects.get(pk=user)

    data = run_user(user, date)
    print(Stats.objects.update_or_create(  # Noqa T1
        content_type=ContentType.objects.get_for_model(user),
        object_id=user.id,
        date=date,
        version=Stats.VERSION,
        defaults={
            'data': data,
            'computed_at': timezone.now(),
        },
    ))


@register_user
def kincube_ranking(user, date):
    """Compute the KinCube ranking."""
    return {
        'kincube_ranking': {
            'label': 'KinCube ranking',
            'display': '3456',
        },
    }


@register_user
def service(user, date):
    """Compute the service statistic."""
    return {'service': 3453}


@register_session
def service_session(session):
    """Compute the service statstic for a session."""
    return {
        'service': dict(map(
            lambda player: (player.id, {
                'display': '180km/h',
                'normalized': 0.7,
                'label': 'Service',
            }),
            session.players.all(),
        )),
    }

# TODO : split function with sub functions


@register_session
def stats_win_exchanges(session):
    """Compute the number of win exchanges per player."""
    # get all the players in the current sessions
    players = session.players.all()

    # calculate the distance per players for each exchanges
    # data contains for each player the list of distance travelled on
    # all exchanges
    data = {key: {player.data['player_id']: 0 for player in players}
            for key in ['score',
                        'winonserv',
                        'winonreturn',
                        'winningforehand',
                        'winningbackhand',
                        'ace',
                        'faultserv',
                        'faultbackhand',
                        'faultforehand']}
    for exchange in session.exchanges:
        winner = exchange.data['winner']
        list_of_hits = Hit.objects.filter(exchange=exchange)
        # total number of win
        if winner in data['score']:
            data['score'][winner] += 1

        # winning shots
        # > check if last hitter is the winner
        # > identify first hitter (service)
        last_hit_id = exchange.data['hit_ids'][-1]
        first_hit_id = exchange.data['hit_ids'][0]
        last_hit = None
        first_hit = None
        for hit in list_of_hits:
            if hit.data['hit_id'] == last_hit_id:
                last_hit = hit
            if hit.data['hit_id'] == first_hit_id:
                first_hit = hit

        # winning exchanges on service_session
        if first_hit is not None:
            if first_hit.hitter.data['player_id'] == winner:
                if winner in data['winonserv']:
                    # Winning exchanges on service
                    data['winonserv'][winner] += 1
            else:
                if winner in data['winonreturn']:
                    # Winning exchanges on return
                    data['winonreturn'][winner] += 1

        # check hit was found
        if last_hit is not None:
            # check if last hit is a winning shot
            if last_hit.data['is_winning']:
                # classify type of winning hit
                if last_hit.data['type_of_hit'] == 'service':
                    if winner in data['ace']:
                        data['ace'][winner] += 1
                elif last_hit.data['type_of_hit'] == 'backhand':
                    if winner in data['winningbackhand']:
                        data['winningbackhand'][winner] += 1
                elif last_hit.data['type_of_hit'] == 'forehand':
                    if winner in data['winningforehand']:
                        data['winningforehand'][winner] += 1
            # check if last hit is a fault
            else:
                # find hitter
                hitter = last_hit.hitter.data['player_id']
                if last_hit.data['type_of_hit'] == 'service':
                    if hitter in data['faultserv']:
                        data['faultserv'][hitter] += 1
                elif last_hit.data['type_of_hit'] == 'backhand':
                    if hitter in data['faultbackhand']:
                        data['faultbackhand'][hitter] += 1
                elif last_hit.data['type_of_hit'] == 'forehand':
                    if hitter in data['faultforehand']:
                        data['faultforehand'][hitter] += 1

    # expose this function outside register
    # @michael : idem remark stats_distance_exchanges
    def add_pct_value(stat_dict):
        """Add normalized parameter to stat dict value / max_value."""
        for this_stat in stat_dict:
            # total_value cannot be null
            total_value = max(sum([stat_dict[this_stat][player_id]['value'] for
                                   player_id in stat_dict[this_stat]]), 1)
            for player_id in stat_dict[this_stat]:
                stat_dict[this_stat][player_id]['normalized'] = \
                        stat_dict[this_stat][player_id]['value'] / total_value
        return stat_dict

    result = {
        'winpercentage': dict(map(
            lambda player: (player.id, {
                'value':
                data['score'][player.data['player_id']],
                'display': '%d points won' %
                (data['score'][player.data['player_id']]),
                'label': 'Won points',
            }),
            session.players.all(),
        )),
        'winningonserv': dict(map(
            lambda player: (player.id, {
                'value':
                data['winonserv'][player.data['player_id']],
                'display': '%d points won' %
                (data['winonserv'][player.data['player_id']]),
                'label': 'Win on service',
            }),
            session.players.all(),
        )),
        'winningonreturn': dict(map(
            lambda player: (player.id, {
                'value':
                data['winonreturn'][player.data['player_id']],
                'display': '%d points won' %
                (data['winonreturn'][player.data['player_id']]),
                'label': 'Win on return',
            }),
            session.players.all(),
        )),
        'winonbackhand': dict(map(
            lambda player: (player.id, {
                'value':
                data['winningbackhand'][player.data['player_id']],
                'display': '%d points won' %
                (data['winningbackhand'][player.data['player_id']]),
                'label': 'Wins on backhand',
            }),
            session.players.all(),
        )),
        'winonforehand': dict(map(
            lambda player: (player.id, {
                'value':
                data['winningforehand'][player.data['player_id']],
                'display': '%d points won' %
                (data['winningforehand'][player.data['player_id']]),
                'label': 'Wins on forehand',
            }),
            session.players.all(),
        )),
        'ace': dict(map(
            lambda player: (player.id, {
                'value':
                data['ace'][player.data['player_id']],
                'display': '%d points won' %
                (data['ace'][player.data['player_id']]),
                'label': 'Aces',
            }),
            session.players.all(),
        )),
        'lostonbackhand': dict(map(
            lambda player: (player.id, {
                'value':
                data['faultbackhand'][player.data['player_id']],
                'display': '%d points lost' %
                (data['faultbackhand'][player.data['player_id']]),
                'label': 'Fault on backhand',
            }),
            session.players.all(),
        )),
        'lostonforehand': dict(map(
            lambda player: (player.id, {
                'value':
                data['faultforehand'][player.data['player_id']],
                'display': '%d points lost' %
                (data['faultforehand'][player.data['player_id']]),
                'label': 'Fault on forehand',
            }),
            session.players.all(),
        )),
        'lostonserv': dict(map(
            lambda player: (player.id, {
                'value':
                data['faultserv'][player.data['player_id']],
                'display': '%d points lost' %
                (data['faultserv'][player.data['player_id']]),
                'label': 'Faults on service',
            }),
            session.players.all(),
        ))}
    add_pct_value(result)
    return result


@register_session
def stats_distance_exchanges(session):
    """Compute the distance per player."""
    # get all the players in the current sessions
    players = session.players.all()

    # calculate the distance per players for each exchanges
    # data contains for each player the list of distance travelled on
    # all exchanges
    data = {player.data['player_id']: [] for player in players}
    for exchange in session.exchanges:
        exchange_distance = exchange.data['travelled_distance']
        for player_id in exchange_distance:
            data[player_id].append(exchange_distance[player_id])

    # expose this function outside register
    # @michael : where to put this kind of usefull function ?
    def add_normalized_value(stat_dict):
        """Add normalized parameter to stat dict value / max_value."""
        for this_stat in stat_dict:
            max_value = max([stat_dict[this_stat][player_id]['value'] for
                             player_id in stat_dict[this_stat]])
            for player_id in stat_dict[this_stat]:
                stat_dict[this_stat][player_id]['normalized'] = \
                        stat_dict[this_stat][player_id]['value'] / max_value
        return stat_dict

    result = {
        'distanceplayer': dict(map(
            lambda player: (player.id, {
                'value':
                sum(data[player.data['player_id']]),
                'display': '%0.1f m' %
                (sum(data[player.data['player_id']])),
                'label': 'Travelled distance',
            }),
            session.players.all(),
        ))}
    add_normalized_value(result)
    return result


@register_session
def stats_speed_hits(session):
    """Calculate stat on hits for session per player.
    - the max speed forehand per player in a session
    - the max speed backhand per player in a session
    - the max service speed per player in a session




    """
    # get all the players in the session
    players = session.players.all()

    data = {}

    for player in players:
        data[player.id] = {'all': [],
                             'forehand': [],
                             'backhand': [],
                             'overhead': [],
                             'volley': [],
                             'service': [],
                             'undef': []}

    # @michael : do you have doc on the syntax : exchange__in ?

    list_of_hits = Hit.objects.filter(exchange__in=session.exchanges)

    # Get all info in data to calculate mean speed per type of hits
    for hit in list_of_hits:
        hitter = hit.hitter.id
        mean_speed = hit.data['mean_speed']
        type_of_hit = hit.data['type_of_hit']
        if type_of_hit is None:
            type_of_hit = 'undef'
        data[hitter]['all'].append(mean_speed)
        data[hitter][type_of_hit].append(mean_speed)

    # @michael can we import numpy in djang ? and use np.mean() ?

    def calculate_mean(this_list):
        """Calculate mean value of list."""
        if len(this_list) == 0:
            return 0
        else:
            return sum(this_list) / len(this_list)

    def add_normalized_value(stat_dict):
        """Add normalized parameter to stat dict value / max_value."""
        for this_stat in stat_dict:
            max_value = max([stat_dict[this_stat][player_id]['value'] for
                             player_id in stat_dict[this_stat]])
            for player_id in stat_dict[this_stat]:
                stat_dict[this_stat][player_id]['normalized'] = \
                        stat_dict[this_stat][player_id]['value'] / max_value
        return stat_dict

    result = {'meanhitspeed':
              dict(map(
                    lambda player: (player.id, {
                        'value': calculate_mean(data[player.id]['all']),
                        'display': '%0.1fkmh' %
                        (calculate_mean(data[player.id]['all'])),
                        'label': 'Mean hit speed',
                    }),
                    players,
                )),
              'maxbackhandspeed':
              dict(map(
                          lambda player: (player.id, {
                              'value':
                              max(data[player.id]['backhand']),
                              'display': '%0.1fkm/h' %
                              (max(data[player.id]['backhand'])),
                              'label': 'Max backhand speed',
                          }),
                          session.players.all(),
                      )),
              'maxforehandspeed':
              dict(map(
                          lambda player: (player.id, {
                              'value':
                              max(data[player.id]['forehand']),
                              'display': '%0.1fkm/h' %
                              (max(data[player.id]['forehand'])),
                              'label': 'Max forehand speed',
                          }),
                          session.players.all(),
                      )),
              'meanservicespeed':
              dict(map(
                        lambda player: (player.id, {
                            'value':
                            calculate_mean(data[player.id]['service']),
                            'display': '%0.1fkm/h' %
                            (calculate_mean(data[player.id]['service'])),
                            'label': 'Mean service speed',
                        }),
                        session.players.all(),
                    )),
              'maxservicespeed':
              dict(map(
                        lambda player: (player.id, {
                            'value': max(data[player.id]['service']),
                            'display': '%0.1fkm/h' %
                            (max(data[player.id]['service'])),
                            'label': 'Mean service speed',
                        }),
                        session.players.all(),
                    ))}

    add_normalized_value(result)
    return result


@register_session
def duration_session(session):
    """Compute the duration of a tennis session."""
    return {
        'duration': {
            'label': 'Duration',
            'display': str(session.duration),
        },
    }


@register_session
def heat_map_info(session):
    """Compute the heat map data for a session."""
    # get all the players in the current sessions
    players = session.players.all()

    # get all hit data for this exchange
    list_of_hits = Hit.objects.filter(exchange__in=session.exchanges)

    # normalise data as if player was always on the left
    def normalise(pt, side):
        if side == 'left':
            return pt
        else:
            # symetry on y axis on net
            x, y = pt
            return [23.77 - x, y]

    # calculate hit info per type of hit per players
    data = {key: {player.data['player_id']: [] for player in players}
            for key in ['hitterposition',
                        'reboundposition']}

    for hit in list_of_hits:
        # hitter id
        this_hitter = hit.hitter.data['player_id']
        # hitter side // rebound side
        side = hit.data['hitter_side']
        # always a hitter position
        hitter_position = hit.data['hitter_position']
        # check if hitter is one of the 2 players
        if this_hitter in data['hitterposition']:
            # add stat to data
            data['hitterposition'][this_hitter].append(
                normalise(hitter_position,
                          side))
        # test if there is a rebound position
        this_rebound = hit.data['rebound_position']
        if this_rebound is not None:
            # check if hitter is one of the 2 players
            if this_hitter in data['reboundposition']:
                # add stat to data
                data['reboundposition'][this_hitter].append(
                    normalise(this_rebound,
                              side))

    return data
