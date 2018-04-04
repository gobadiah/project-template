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
            }).update({
                'label': 'Service',
            }),
            session.players.all(),
        )),
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
