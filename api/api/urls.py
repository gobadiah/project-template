"""api URL Configuration.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

"""

import assets.urls

import core.urls

from django.contrib import admin
from django.urls import include, path

import jasonpi.urls

import sports.urls

import stats.urls

import tennis.urls

urlpatterns = [
    path('', include(assets.urls)),
    path('', include(core.urls)),
    path('', include(jasonpi.urls)),
    path('', include(sports.urls)),
    path('', include(stats.urls)),
    path('tennis/', include(tennis.urls, namespace='tennis')),
    path('admin/doc/', include('django.contrib.admindocs.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
