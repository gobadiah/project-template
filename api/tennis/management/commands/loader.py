"""Tennis loader command.

Use it with: python manage.py tennis_loader.
"""

from django.core.management.base import BaseCommand

from tennis.loader import loader


class Command(BaseCommand):
    """Loader command."""

    help = 'Will load a json file into the database'

    def handle(self, *args, **options):
        """Handle options and execute the function."""
        loader()
