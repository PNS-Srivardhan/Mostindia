#!/usr/bin/env python
import os
import sys
from django.core.management import execute_from_command_line

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")  # Replace 'myproject' with your actual project name

    # Start the server when no additional arguments are provided
    if len(sys.argv) == 1:
        sys.argv.append('runserver')  # Default to running the server

    # Execute the command provided in sys.argv
    execute_from_command_line(sys.argv)
