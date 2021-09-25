from django.core.management.base import BaseCommand
from django.db.models import F

from JobMatcherApp.models import Employer, Seeker


class Command(BaseCommand):
    help = "Update free calls and apps"

    def handle(self, *args, **options):
        # Update the employer free_calls, in-place
        # F() = value of field of model, F expressions is a reference to a column and its atomic,
        # allowing for in-place update
        employers = Employer.objects.update(free_calls=F("free_calls") + 1)

        # In filter, column__lt (less than = field look-up) = value to filter by a certain value
        seekers = Seeker.objects.filter(free_apps__lt=10).update(free_apps=F("free_apps") + 1)

        self.stdout.write(self.style.SUCCESS(f"Successfully updated {seekers} seekers"))
        self.stdout.write(self.style.SUCCESS(f"Successfully updated {employers} employers"))
