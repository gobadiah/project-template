"""Tennis urls."""

from django.urls import include, path

from jasonpi.utils import \
    one_to_one_relationship, \
    resource_relationships

from rest_framework_nested import routers

import sports.views

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'exchanges', views.ExchangeViewSet)
router.register(r'exchangeplayers', views.ExchangePlayerViewSet)
router.register(r'games', views.GameViewSet)
router.register(r'gameplayers', views.GamePlayerViewSet)
router.register(r'hits', views.HitViewSet)
router.register(r'matches', views.MatchViewSet)
router.register(r'matchplayers', views.MatchPlayerViewSet)
router.register(r'players', views.PlayerViewSet)
router.register(r'sessions', views.SessionViewSet)
router.register(r'sets', views.SetViewSet)
router.register(r'setplayers', views.SetPlayerViewSet)
router.register(r'trainings', views.TrainingViewSet)
router.register(r'videos', views.VideoViewSet)

exchanges_router = routers.NestedDefaultRouter(
    router,
    r'exchanges',
    lookup='exchange',
    trailing_slash=False,
)

exchangeplayers_router = routers.NestedDefaultRouter(
    router,
    r'exchangeplayers',
    lookup='exchangeplayer',
    trailing_slash=False,
)

games_router = routers.NestedDefaultRouter(
    router,
    r'games',
    lookup='game',
    trailing_slash=False,
)

gameplayers_router = routers.NestedDefaultRouter(
    router,
    r'gameplayers',
    lookup='gameplayer',
    trailing_slash=False,
)

hits_router = routers.NestedDefaultRouter(
    router,
    r'hits',
    lookup='hit',
    trailing_slash=False,
)

matches_router = routers.NestedDefaultRouter(
    router,
    r'matches',
    lookup='match',
    trailing_slash=False,
)

matchplayers_router = routers.NestedDefaultRouter(
    router,
    r'matchplayers',
    lookup='matchplayer',
    trailing_slash=False,
)

players_router = routers.NestedDefaultRouter(
    router,
    r'players',
    lookup='player',
    trailing_slash=False,
)

sessions_router = routers.NestedDefaultRouter(
    router,
    r'sessions',
    lookup='session',
    trailing_slash=False,
)
sessions_router.register(
    r'trainings',
    views.TrainingViewSet,
    base_name='session-trainings',
)
sessions_router.register(
    r'matches',
    views.MatchViewSet,
    base_name='session-matches',
)
sessions_router.register(
    r'exchanges',
    views.ExchangeViewSet,
    base_name='session-exchanges',
)
sessions_router.register(
    r'players',
    views.PlayerViewSet,
    base_name='session-players',
)

sets_router = routers.NestedDefaultRouter(
    router,
    r'sets',
    lookup='set',
    trailing_slash=False,
)

setplayers_router = routers.NestedDefaultRouter(
    router,
    r'setplayers',
    lookup='setplayer',
    trailing_slash=False,
)

trainings_router = routers.NestedDefaultRouter(
    router,
    r'trainings',
    lookup='training',
    trailing_slash=False,
)

videos_router = routers.NestedDefaultRouter(
    router,
    r'videos',
    lookup='video',
    trailing_slash=False,
)

app_name = 'tennis'
urlpatterns = [
    path('', include(router.urls)),

    # exchanges
    path('', include(exchanges_router.urls)),
    resource_relationships('exchange', views.ExchangeRelationshipView),

    # exchangeplayers
    path('', include(exchangeplayers_router.urls)),
    resource_relationships(
        'exchangeplayer',
        views.ExchangePlayerRelationshipView,
    ),
    one_to_one_relationship(
        'exchange',
        'start_at',
        sports.views.VideoPointViewSet,
    ),

    # games
    path('', include(games_router.urls)),
    resource_relationships('game', views.GameRelationshipView),

    # gameplayers
    path('', include(gameplayers_router.urls)),
    resource_relationships('gameplayer', views.GamePlayerRelationshipView),

    # hits
    path('', include(hits_router.urls)),
    resource_relationships('hit', views.HitRelationshipView),

    # matches
    path('', include(matches_router.urls)),
    resource_relationships('match', views.MatchRelationshipView),

    # matchplayers
    path('', include(matchplayers_router.urls)),
    resource_relationships('matchplayer', views.MatchPlayerRelationshipView),

    # players
    path('', include(players_router.urls)),
    resource_relationships('player', views.PlayerRelationshipView),

    # sessions
    path('', include(sessions_router.urls)),
    resource_relationships('session', views.SessionRelationshipView),

    # sets
    path('', include(sets_router.urls)),
    resource_relationships('set', views.SetRelationshipView),

    # setplayers
    path('', include(setplayers_router.urls)),
    resource_relationships('setplayer', views.SetPlayerRelationshipView),

    # trainings
    path('', include(trainings_router.urls)),
    resource_relationships('training', views.TrainingRelationshipView),

    # videos
    path('', include(videos_router.urls)),
    resource_relationships('videos', views.VideoRelationshipView),
]
