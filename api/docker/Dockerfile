FROM python:3.6.3

RUN apt-get update

RUN apt-get install -y nginx vim gettext

WORKDIR /usr/src/app

RUN pip install uwsgi

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN ln -s /usr/src/app/docker/nginx-app.conf /etc/nginx/sites-available/api.conf

RUN python manage.py collectstatic --no-input

EXPOSE 8000

CMD ["docker/entrypoint.sh"]
