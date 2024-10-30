# myApp/management/commands/backup_db.py

import os
import shutil
from django.core.management.base import BaseCommand
from datetime import datetime

class Command(BaseCommand):
    help = "Backup the SQLite database."

    def handle(self, *args, **options):
        db_path = r"C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\mos-main\myproject\db.sqlite3"
        backup_dir = os.path.join(os.path.dirname(db_path), 'backups')
        os.makedirs(backup_dir, exist_ok=True)

        backup_filename = f"db_backup_{datetime.now().strftime('%Y%m%d%H%M%S')}.sqlite3"
        backup_path = os.path.join(backup_dir, backup_filename)

        shutil.copy(db_path, backup_path)
        self.stdout.write(self.style.SUCCESS(f"Backup created at {backup_path}"))
