import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import get_calendar_events
from datetime import datetime, timedelta
import pytz

def test_calendar_parsing():
    print("Testing Calendar Event Parsing...")
    print("=" * 50)
    
    # Print the week range being used for filtering
    PACIFIC_TZ = pytz.timezone('America/Los_Angeles')
    today = datetime.now(PACIFIC_TZ).date()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    print(f"Week range: {start_of_week} to {end_of_week}")
    print(f"Today: {today}")
    print()
    
    events = get_calendar_events()
    
    print("\nAll event titles and raw data:")
    for event in events['all_events']:
        title = event.get('title', 'N/A')
        date = event.get('date', 'Unknown')
        print(f"Title: {repr(title)} | Date: {date} | Lowercase: {repr(title.lower())}")
        print(event)
        print()
    
    for team_name, team_events in events.items():
        if team_name == 'all_events':
            continue
            
        print(f"\n{team_name}:")
        print("-" * 30)
        
        if not team_events:
            print("No events found")
        else:
            for event in team_events:
                print(f"   Day: {event.get('day', 'Unknown')}, Time: {event.get('time', 'Unknown')}")
                print(f"   Title: {event.get('title', 'N/A')}")
                print()

if __name__ == "__main__":
    test_calendar_parsing() 