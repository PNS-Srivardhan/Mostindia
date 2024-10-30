from django.core.management.commands.runserver import Command as runserver
from django.utils.autoreload import run_with_reloader

class Command(runserver):
    def run(self, *args, **options):
        # Disable autoreload
        self.use_reloader = False
        return super().run(*args, **options)
