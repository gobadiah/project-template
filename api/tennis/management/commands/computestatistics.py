"""Tennis compute statistics."""
import datetime

from django.core.management.base import BaseCommand

from tennis.stats import \
    compute_sessions_statistics, \
    compute_statistics_for_user, \
    compute_users_statistics


class Command(BaseCommand):
    """Compute statistics command."""

    help = 'Compute KinCube stats'

    def add_arguments(self, parser):
        """Add arguments to the command."""
        parser.add_argument('--date', nargs='*')
        parser.add_argument('--today', action='store_true')
        parser.add_argument('--user-id', type=int)
        parser.add_argument('--sessions', action='store_true')

    def handle(self, *args, **options):
        """Handle options and execute the function."""
        dates = list(map(
            lambda d: datetime.datetime.strptime(d, '%Y-%m-%d').date(),
            options['date'] if options['date'] else [],
        ))
        if options['today']:
            dates.append(datetime.date.today())

        if options['user_id']:
            for date in dates:
                compute_statistics_for_user(options['user_id'], date)
        else:
            for date in dates:
                compute_users_statistics(date)

        if options['sessions']:
            compute_sessions_statistics()
