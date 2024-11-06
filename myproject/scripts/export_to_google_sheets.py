import gspread
from google.oauth2.service_account import Credentials
import sqlite3
import time

# Path to the credentials JSON file
credentials_file = 'C:/Users/ploke/OneDrive/Documents/Pictures/SMS/mos-main/myproject/scripts/google_sheets_credentials.json'

# Set up the scope and credentials
scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive"
]
creds = Credentials.from_service_account_file(credentials_file, scopes=scope)
client = gspread.authorize(creds)

# Open the Google Sheets file
spreadsheet = client.open("mostindia")

# Function to get or create a worksheet
def get_or_create_sheet(spreadsheet, title):
    try:
        return spreadsheet.worksheet(title)
    except gspread.exceptions.WorksheetNotFound:
        return spreadsheet.add_worksheet(title=title, rows="100", cols="20")

# Get or create the "Staff" and "Attendance" worksheets
staff_sheet = get_or_create_sheet(spreadsheet, "Staff")
attendance_sheet = get_or_create_sheet(spreadsheet, "Attendance")

# Connect to your SQLite database
db_path = 'C:/Users/ploke/OneDrive/Documents/Pictures/SMS/mos-main/myproject/db.sqlite3'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Fetch data from myApp_staff and upload it to the 'Staff' sheet
cursor.execute("SELECT * FROM myApp_staff")  # Replace with actual table name if different
staff_rows = cursor.fetchall()

# Clear existing data in Staff sheet before updating
staff_sheet.clear()

# Use batch append to reduce requests
staff_sheet.append_rows(staff_rows)

# Fetch data from myApp_attendance and upload it to the 'Attendance' sheet
cursor.execute("SELECT * FROM myApp_attendance")  # Replace with actual table name if different
attendance_rows = cursor.fetchall()

# Clear existing data in Attendance sheet before updating
attendance_sheet.clear()

# Split the data into manageable batches to avoid exceeding quotas
batch_size = 50  # Adjust as needed to avoid hitting the limit

for i in range(0, len(attendance_rows), batch_size):
    attendance_sheet.append_rows(attendance_rows[i:i + batch_size])
    time.sleep(2)  # Add delay to avoid hitting rate limits

# Close the database connection
conn.close()

print("Data export to Google Sheets completed successfully.")
