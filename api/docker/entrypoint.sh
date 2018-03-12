#!/bin/bash

set -e

until python -c "import os; import psycopg2; psycopg2.connect(os.environ['DATABASE_URL'])"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

python manage.py migrate

uwsgi --socket mysite.sock --module api.wsgi --chmod-socket=666 &

/bin/bash -c "envsubst < /etc/nginx/sites-available/api.conf > /etc/nginx/sites-available/default && nginx -g 'daemon off;'"
