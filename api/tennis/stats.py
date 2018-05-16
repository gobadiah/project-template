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


@register_session
def mean_speed_of_hits(session):
    """
        calculate stat on hits for session per player
            - the mean speed of hits per player in a session
            - the mean service speed per player in a session
            - the max service speed per player in a session

        TODO : distinguish between in match and in training in session

    """
    # get all the players in the session
    players = session.players.all()

    data = {}
    for player_i in players:
        data[player_i.id] = {'all': [],
                                'forehand': [],
                                'backhand': [],
                                'overhead':[],
                                'volley': [],
                                'service': []}

    #@michael : do you have doc on the syntax : exchange__in ?
    list_of_hits = Hit.objects.filter(exchange__in=session.exchanges)

    # Get all info in data to calculate mean speed per type of hits
    for hit in list_of_hits:
        hitter = hit.hitter.id
        mean_speed = hit.data["mean_speed"]
        type_of_hit = hit.data["type_of_hit"]
        data[hitter]["all"].append(mean_speed)
        data[hitter][type_of_hit].append(mean_speed)


    #@michael can we import numpy in djang ? and use np.mean() ?
    def calculate_mean(this_list):
        """
            calculate mean value of list
        """
        if len(this_list) == 0:
            return 0
        else:
            return sum(this_list) / len(this_list)

    def add_normalized_value(stat_dict):
        """
            add normalized parameter to stat dict
             value / max_value
        """
        for this_stat in stat_dict:
            max_value = max([stat_dict[this_stat][player_id]["value"] for \
                                player_id in stat_dict[this_stat]])
            for player_id in stat_dict[this_stat]:
                stat_dict[this_stat][player_id]["normalized"] = \
                        stat_dict[this_stat][player_id]["value"] / max_value
        return stat_dict


    result = {"meanhitspeed":
                dict(map(
                    lambda player: (player.id, {
                        'value': calculate_mean(data[player.id]["all"]),
                        'display': "%0.1fkmh" % (calculate_mean(data[player.id]["all"])),
                        'label': 'Mean hit speed',
                    }),
                    players,
                )),
                "meanservicespeed":
                    dict(map(
                        lambda player: (player.id, {
                            'value': calculate_mean(data[player.id]["service"]),
                            'display': '%0.1fkm/h' % (calculate_mean(data[player.id]["service"])),
                            'label': 'Mean service speed',
                        }),
                        session.players.all(),
                    )),
                "maxservicespeed":
                    dict(map(
                        lambda player: (player.id, {
                            'value': max(data[player.id]["service"]),
                            'display': '%0.1fkm/h' % (max(data[player.id]["service"])),
                            'label': 'Mean service speed',
                        }),
                        session.players.all(),
                    )),
                }

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
