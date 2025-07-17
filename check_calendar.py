import requests
from datetime import datetime, timedelta
import pytz

def check_calendar():
    """Check what events are in the Google Calendar"""
    try:
        url = "https://calendar.google.com/calendar/ical/tornadoclasstimes%40gmail.com/public/basic.ics"
        response = requests.get(url)
        response.raise_for_status()
        
        print(f"Calendar Response Status: {response.status_code}")
        print("Calendar Content:")
        print(response.text)
        
    except Exception as e:
        print(f"Error reading calendar: {e}")

if __name__ == "__main__":
    check_calendar() 