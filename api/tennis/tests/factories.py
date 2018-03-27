"""Factories for tennis."""

import datetime

from core.users.tests.factories import UserFactory

import factory

from sports.tests.factories import \
    SessionFactory, \
    VideoFactory, \
    VideoPointFactory

from ..models import \
    Exchange, \
    ExchangePlayer, \
    Game, \
    GamePlayer, \
    Hit, \
    Match, \
    MatchPlayer, \
    Player, \
    Set, \
    SetPlayer, \
    Training


class ExchangeFactory(factory.django.DjangoModelFactory):
    """Default Exchange factory."""

    class Meta(object):
        """ExchangeFactory Meta class."""

        model = Exchange

        exclude = ['player1']

    class Params(object):
        """TrainingFactory Params class.

        video is shared accross start_at and end_at.
        """

        video = factory.SubFactory(VideoFactory)
        player1 = factory.SubFactory('tennis.tests.factories.PlayerFactory')
        player2 = factory.SubFactory('tennis.tests.factories.PlayerFactory')

    start_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=1000,
        time=datetime.timedelta(seconds=30),
    ))
    end_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=2000,
        time=datetime.timedelta(seconds=60),
    ))
    game = factory.LazyAttribute(lambda o: GameFactory(
        video=o.video,
        player1=o.player1,
        player2=o.player2,
    ))

    exchangeplayer1__player = factory.SelfAttribute('..player1')
    exchangeplayer1 = factory.RelatedFactory(
        'tennis.tests.factories.ExchangePlayerFactory',
        'exchange',
    )
    exchangeplayer2__player = factory.SelfAttribute('..player2')
    exchangeplayer2 = factory.RelatedFactory(
        'tennis.tests.factories.ExchangePlayerFactory',
        'exchange',
        is_winner=False,
    )


class ExchangePlayerFactory(factory.django.DjangoModelFactory):
    """Default ExchangePlayer factory."""

    class Meta(object):
        """ExchangePlayerFactory Meta class."""

        model = ExchangePlayer

    exchange = factory.SubFactory('tennis.tests.factories.ExchangeFactory')
    player = factory.SubFactory('tennis.tests.factories.PlayerFactory')
    is_winner = True
    side = 'right'


class GameFactory(factory.django.DjangoModelFactory):
    """Default Game factory."""

    class Meta(object):
        """GameFactory Meta class."""

        model = Game

    class Params(object):
        """TrainingFactory Params class.

        video is shared accross start_at and end_at.
        """

        video = factory.SubFactory(VideoFactory)
        player1 = factory.SubFactory('tennis.tests.factories.PlayerFactory')
        player2 = factory.SubFactory('tennis.tests.factories.PlayerFactory')

    start_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=1000,
        time=datetime.timedelta(seconds=30),
    ))
    end_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=2000,
        time=datetime.timedelta(seconds=60),
    ))
    set = factory.LazyAttribute(lambda o: SetFactory(
        video=o.video,
        player1=o.player1,
        player2=o.player2,
    ))
    index = 0
    server = factory.LazyAttribute(lambda o: o.player1)

    gameplayer1__player = factory.SelfAttribute('..player1')
    gameplayer1 = factory.RelatedFactory(
        'tennis.tests.factories.GamePlayerFactory',
        'game',
    )
    gameplayer2__player = factory.SelfAttribute('..player2')
    gameplayer2 = factory.RelatedFactory(
        'tennis.tests.factories.GamePlayerFactory',
        'game',
        is_winner=False,
    )


class GamePlayerFactory(factory.django.DjangoModelFactory):
    """Default GamePlayer factory."""

    class Meta(object):
        """GamePlayerFactory Meta class."""

        model = GamePlayer

    game = factory.SubFactory('tennis.tests.factories.GameFactory')
    player = factory.SubFactory('tennis.tests.factories.PlayerFactory')
    is_winner = True
    side = 'right'
    exchanges_won = 4


class HitFactory(factory.django.DjangoModelFactory):
    """Default Hit factory."""

    class Meta(object):
        """HitFactory Meta class."""

        model = Hit

    exchange = factory.SubFactory('tennis.tests.factories.ExchangeFactory')
    video_point = factory.SubFactory(VideoPointFactory)
    hitter = factory.SubFactory('tennis.tests.factories.PlayerFactory')


class MatchFactory(factory.django.DjangoModelFactory):
    """Default Match factory."""

    class Meta(object):
        """MatchFactory Meta class."""

        model = Match

    class Params(object):
        """TrainingFactory Params class.

        video is shared accross start_at and end_at.
        """

        video = factory.SubFactory(VideoFactory)
        player1 = factory.SubFactory('tennis.tests.factories.PlayerFactory')
        player2 = factory.SubFactory('tennis.tests.factories.PlayerFactory')

    start_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=1000,
        time=datetime.timedelta(seconds=30),
    ))
    end_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=2000,
        time=datetime.timedelta(seconds=60),
    ))
    session = factory.LazyAttribute(lambda o: o.video.session)

    matchplayer1__player = factory.SelfAttribute('..player1')
    matchplayer1 = factory.RelatedFactory(
        'tennis.tests.factories.MatchPlayerFactory',
        'match',
    )
    matchplayer2__player = factory.SelfAttribute('..player2')
    matchplayer2 = factory.RelatedFactory(
        'tennis.tests.factories.MatchPlayerFactory',
        'match',
    )


class MatchPlayerFactory(factory.django.DjangoModelFactory):
    """Default MatchPlayer factory."""

    class Meta(object):
        """MatchPlayerFactory Meta class."""

        model = MatchPlayer

    match = factory.SubFactory('tennis.tests.factories.MatchFactory')
    player = factory.SubFactory('tennis.tests.factories.PlayerFactory')
    is_winner = True
    sets_won = 2


class PlayerFactory(factory.django.DjangoModelFactory):
    """Default Player factory."""

    class Meta(object):
        """PlayerFactory Meta class."""

        model = Player

    class Params(object):
        """PlayerFactory Params class.

        user name is used for player name as well
        """

        user_ = factory.SubFactory(UserFactory)

    user = factory.LazyAttribute(lambda o: o.user_)
    name = factory.LazyAttribute(lambda o: o.user_.first_name)
    email = factory.lazy_attribute(lambda o: o.user_.email)


class SetFactory(factory.django.DjangoModelFactory):
    """Default Set factory."""

    class Meta(object):
        """SetFactory Meta class."""

        model = Set

    class Params(object):
        """SetFactory Params class.

        video is shared accross start_at and end_at.
        """

        video = factory.SubFactory(VideoFactory)
        player1 = factory.SubFactory('tennis.tests.factories.PlayerFactory')
        player2 = factory.SubFactory('tennis.tests.factories.PlayerFactory')

    start_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=1000,
        time=datetime.timedelta(seconds=30),
    ))
    end_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=2000,
        time=datetime.timedelta(seconds=60),
    ))
    match = factory.LazyAttribute(lambda o: MatchFactory(
        video=o.video,
        player1=o.player1,
        player2=o.player2,
    ))
    index = 0

    setplayer1__player = factory.SelfAttribute('..player1')
    setplayer1 = factory.RelatedFactory(
        'tennis.tests.factories.SetPlayerFactory',
        'set',
    )
    setplayer2__player = factory.SelfAttribute('..player2')
    setplayer2 = factory.RelatedFactory(
        'tennis.tests.factories.SetPlayerFactory',
        'set',
        is_winner=False,
        games_won=3,
    )


class SetPlayerFactory(factory.django.DjangoModelFactory):
    """Default SetPlayer factory."""

    class Meta(object):
        """SetPlayerFactory Meta class."""

        model = SetPlayer

    set = factory.SubFactory('tennis.tests.factories.SetFactory')
    player = factory.SubFactory('tennis.tests.factories.PlayerFactory')
    is_winner = True
    games_won = 5


class TrainingFactory(factory.django.DjangoModelFactory):
    """Default Training factory."""

    class Meta(object):
        """TrainingFactory Meta class."""

        model = Training

    class Params(object):
        """TrainingFactory Params class.

        video is shared accross start_at and end_at.
        """

        video = factory.SubFactory(VideoFactory)

    start_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=1000,
        time=datetime.timedelta(seconds=30),
    ))
    end_at = factory.LazyAttribute(lambda o: VideoPointFactory(
        video=o.video,
        frame=2000,
        time=datetime.timedelta(seconds=60),
    ))
    session = factory.SubFactory(SessionFactory)
