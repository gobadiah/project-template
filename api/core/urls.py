"""Core urls conf."""

import core.users.urls

from django.urls import include, path

urlpatterns = [
    path('', include(core.users.urls)),
]
