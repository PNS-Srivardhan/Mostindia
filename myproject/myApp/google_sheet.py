import sqlite3
import pandas as pd
from datetime import datetime
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

# Authenticate with Google Sheets API
def authenticate_google_sheets(json_file_path):
    credentials = Credentials.from_service_account_file(
        json_file_path,
        scopes=["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    )
    service = build('sheets', 'v4', credentials=credentials)
    return service

# Authenticate with Google Drive API
def authenticate_google_drive(json_file_path):
    credentials = Credentials.from_service_account_file(
        json_file_path,
        scopes=["https://www.googleapis.com/auth/drive"]
    )
    service = build('drive', 'v3', credentials=credentials)
    return service

# Create a new Google Spreadsheet
def create_new_spreadsheet(service, title):
    spreadsheet_body = {
        'properties': {
            'title': title
        }
    }
    spreadsheet = service.spreadsheets().create(body=spreadsheet_body, fields='spreadsheetId').execute()
    return spreadsheet['spreadsheetId']

# Share the spreadsheet with a specific email
def share_spreadsheet(json_file_path, spreadsheet_id, email):
    drive_service = authenticate_google_drive(json_file_path)
    permission = {
        'type': 'user',
        'role': 'writer',
        'emailAddress': email
    }
    drive_service.permissions().create(fileId=spreadsheet_id, body=permission).execute()
    print(f"Spreadsheet shared with {email}")

# Fetch specific tables and their data from SQLite
def fetch_sqlite_data(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Specify the tables to back up
    tables_to_backup = ['myApp_attendance', 'myApp_staff']

    data = {}
    for table_name in tables_to_backup:
        query = f"SELECT * FROM {table_name}"
        df = pd.read_sql_query(query, conn)
        data[table_name] = df

    conn.close()
    return data

# Write data to Google Sheets
def write_to_google_sheets(service, spreadsheet_id, sqlite_data):
    combined_data = []
    for sheet_name, df in sqlite_data.items():
        # Add table name as a header
        combined_data.append([sheet_name])
        # Convert DataFrame to a list of lists and append to combined data
        combined_data.extend([df.columns.tolist()] + df.values.tolist())
        # Add an empty row for separation
        combined_data.append([])

    # Write combined data to the sheet
    range_name = "Sheet1!A1"
    body = {
        'values': combined_data
    }
    service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id,
        range=range_name,
        valueInputOption="RAW",
        body=body
    ).execute()
    print("Data written to the single sheet: Sheet1")

# Main function
def transfer_sqlite_to_google_sheets(db_path, json_file_path, share_email=None):
    # Authenticate with Google Sheets
    sheets_service = authenticate_google_sheets(json_file_path)

    # Create a new Google Sheets file
    spreadsheet_title = f"SQLite Backup {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    spreadsheet_id = create_new_spreadsheet(sheets_service, spreadsheet_title)

    print(f"New Spreadsheet created with ID: {spreadsheet_id}")

    # Optionally share the spreadsheet
    if share_email:
        share_spreadsheet(json_file_path, spreadsheet_id, share_email)

    # Fetch SQLite data
    sqlite_data = fetch_sqlite_data(db_path)

    # Write data to Google Sheets
    write_to_google_sheets(sheets_service, spreadsheet_id, sqlite_data)

    print(f"SQLite data successfully transferred to Google Sheets (ID: {spreadsheet_id})")

# Example Usage
if __name__ == "__main__":
    DB_PATH = r'C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\myproject\db.sqlite3' 
    JSON_FILE_PATH = r'C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\myproject\myApp\sheet.json'  # Path to your service account JSON
    SHARE_EMAIL = "srivardhan0005@gmail.com"  # Email address to share the spreadsheet with (optional)

    transfer_sqlite_to_google_sheets(DB_PATH, JSON_FILE_PATH, SHARE_EMAIL)
