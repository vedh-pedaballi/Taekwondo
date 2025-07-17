import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime, timedelta

CALENDAR_URL = "https://calendar.google.com/calendar/ical/tornadoclasstimes%40gmail.com/public/basic.ics"

def read_public_calendar(calendar_id):
    """Read events from a public Google Calendar and return only events for the current week."""
    url = f"https://calendar.google.com/calendar/ical/{calendar_id}/public/basic.ics"
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        # Debug: Show first few lines of the feed
        print("First 50 lines of .ics feed:")
        lines = response.text.split('\n')
        for i, line in enumerate(lines[:50]):
            print(f"  {i+1}: {line}")
        print("...")
        
        # Also show any lines containing VEVENT
        print("\nLines containing VEVENT:")
        for i, line in enumerate(lines):
            if 'VEVENT' in line:
                print(f"  {i+1}: {line}")
        
        # Also show any lines containing DTSTART
        print("\nLines containing DTSTART:")
        for i, line in enumerate(lines):
            if 'DTSTART' in line:
                print(f"  {i+1}: {line}")
        
        events = []
        current_event = {}
        for line in lines:
            if line.startswith('BEGIN:VEVENT'):
                current_event = {}
            elif line.startswith('END:VEVENT'):
                if current_event:
                    events.append(current_event)
            elif line.startswith('SUMMARY:'):
                current_event['title'] = line[8:]
            elif line.startswith('DTSTART;VALUE=DATE:'):
                # All-day event
                date_str = line.split(':')[1][:8]  # YYYYMMDD
                current_event['date'] = datetime.strptime(date_str, "%Y%m%d").date()
            elif line.startswith('DTSTART;TZID='):
                # Timed event with timezone
                date_str = line.split(':')[1][:8]  # YYYYMMDD
                current_event['date'] = datetime.strptime(date_str, "%Y%m%d").date()
            elif line.startswith('DTSTART:'):
                # Timed event without timezone
                date_str = line.split(':')[1][:8]  # YYYYMMDD
                current_event['date'] = datetime.strptime(date_str, "%Y%m%d").date()
            elif line.startswith('DESCRIPTION:'):
                current_event['description'] = line[12:]
        
        print(f"\nTotal events found: {len(events)}")
        print("All events:")
        for event in events:
            print(f"  {event.get('date', 'No date')} - {event.get('title', 'No title')}")
        
        # Filter for this week
        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)
        week_events = [e for e in events if 'date' in e and start_of_week <= e['date'] <= end_of_week]
        # Sort by date
        week_events.sort(key=lambda e: e['date'])
        return week_events
    except Exception as e:
        print(f"Error reading calendar: {e}")
        return []

# Example usage
if __name__ == "__main__":
    calendar_id = "tornadoclasstimes@gmail.com"
    events = read_public_calendar(calendar_id)
    print("\nThis Week's Events:")
    for event in events:
        print(f"{event.get('date', 'No date')} - {event.get('title', 'No title')}")
        if event.get('description'):
            print(f"  {event['description']}")
        print() 