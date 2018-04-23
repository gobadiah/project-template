"""Stats generation for tennis activities."""

from functools import reduce

from core.models import User

from django.contrib.contenttypes.models import ContentType
from django.utils import timezone

from sports.models import Session

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
    players = session.players.all()
    result = {}
    for player_i in players:
        result[player_i.id] = {}
        session.matches.
        """hits = session.hits.filter(hitter=player_i)
        for type_of_hit in ["forehand", "backhand", "service", "volley"]:
            special_hits = [hit for hit in hits if (hit.data["type_of_hit"] \
                            == type_of_hit or type_of_hit == "all") and \
                            (hit.data["considered_for_score"] or \
                             session.type_of_session == "training")]
            mean_speed = sum(hit.data["mean_speed"] for hit in special_hits) \
                         / len(special_hits) if len(special_hits) > 0 \
                         else None
            result[player_i.id][type_of_hit] = mean_speed"""
    return {'speed_of_hits':
                {'label': 'speed_hits',
                'display' : str(10)},
            }




@register_session
def duration_session(session):
    """Compute the duration of a tennis session."""
    return {
        'duration': {
            'label': 'Duration',
            'display': str(session.duration),
        },
    }
