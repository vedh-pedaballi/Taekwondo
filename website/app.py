import os
from datetime import datetime, timedelta, timezone
from flask import Flask, render_template, send_from_directory, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_mail import Mail, Message
import random
import string
import secrets
import requests
import pytz
import dateutil.parser


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# File upload configuration
UPLOAD_FOLDER = 'static/profile_pictures'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Flask-Mail configuration for Gmail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('GMAIL_APP_PASSWORD', 'YOUR_APP_PASSWORD_HERE')  # Set GMAIL_APP_PASSWORD environment variable
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME')

db = SQLAlchemy(app)

mail = Mail(app)

PACIFIC_TZ = pytz.timezone('America/Los_Angeles')

# Example: When you need the current time, use:
# datetime.now(PACIFIC_TZ)

# Update get_calendar_events to convert all event dates/times to Pacific Time

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=True)
    belt_rank = db.Column(db.String(20), nullable=True)
    team = db.Column(db.String(30), nullable=True)
    forgot_password_code = db.Column(db.String(10), nullable=True)
    forgot_password_expiry = db.Column(db.DateTime, nullable=True)

    def __init__(self, name, email, belt_rank=None, team=None):
        self.name = name
        self.email = email
        self.belt_rank = belt_rank
        self.team = team

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='pbkdf2:sha256')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Calendar events (you can populate this from Google Calendar API)
calendar_events_A_Team = [
    {"title": "A Team", "date": "2025-07-15", "time": "7:20 PM - 9:00 PM"},
    {"title": "A Team", "date": "2024-07-17", "time": "7:10 PM - 9:00 PM"},
    {"title": "A Team", "date": "2024-07-18", "time": "6:20 PM - 8:00 PM"},
    {"title": "A Team", "date": "2024-07-20", "time": "6:30 PM - 8:30 PM"},
]

calendar_events_B_Team = [
    {"title": "B Team", "date": "2025-07-15", "time": "7:20 PM"},
    {"title": "B Team", "date": "2024-07-17", "time": "7:10 PM"},
    {"title": "B Team", "date": "2024-07-18", "time": "6:20 PM"},
    {"title": "B Team", "date": "2024-07-20", "time": "6:30 PM"},
]

calendar_events_Youth_Team = [
    {"title": "C Team", "date": "2025-07-15", "time": "7:20 PM"},
    {"title": "C Team", "date": "2024-07-17", "time": "7:10 PM"},
    {"title": "C Team", "date": "2024-07-18", "time": "6:20 PM"},
    {"title": "C Team", "date": "2024-07-20", "time": "6:30 PM"},
]

calendar_events_Beginners_Team = [
    {"title": "Beginners", "date": "2025-07-15", "time": "7:20 PM"},
    {"title": "Beginners", "date": "2024-07-17", "time": "7:10 PM"},
    {"title": "Beginners", "date": "2024-07-18", "time": "6:20 PM"},
    {"title": "Beginners", "date": "2024-07-20", "time": "6:30 PM"},
]


# Dummy data for the "About Us" section
about_us_content = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
"""

class_schedule = []

def get_images_chronologically(folder_path):
    """Get images ordered by file creation/modification time"""
    images = []
    # Ensure absolute path
    abs_folder_path = os.path.join(os.path.dirname(__file__), folder_path) if not os.path.isabs(folder_path) else folder_path
    if not os.path.exists(abs_folder_path):
        return images
    # Get all image files
    for filename in os.listdir(abs_folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            filepath = os.path.join(abs_folder_path, filename)
            # Get file stats
            stat = os.stat(filepath)
            created_time = stat.st_ctime  # or st_mtime for modification time
            images.append({
                'filename': filename,
                'filepath': filepath,
                'created': created_time,
                'created_readable': datetime.fromtimestamp(created_time)
            })
    # Sort by creation time (oldest first)
    images.sort(key=lambda x: x['created'])
    return images

def get_winner_images_chronologically(folder_path):
    """Get winner images ordered by file creation/modification time"""
    images = []
    # Ensure absolute path
    abs_folder_path = os.path.join(os.path.dirname(__file__), folder_path) if not os.path.isabs(folder_path) else folder_path
    if not os.path.exists(abs_folder_path):
        return images
    # Get all image files
    for filename in os.listdir(abs_folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            filepath = os.path.join(abs_folder_path, filename)
            # Get file stats
            stat = os.stat(filepath)
            created_time = stat.st_ctime  # or st_mtime for modification time
            images.append({
                'filename': filename,
                'filepath': filepath,
                'created': created_time,
                'created_readable': datetime.fromtimestamp(created_time),
                'original_name': filename
            })
    # Sort by creation time (oldest first)
    images.sort(key=lambda x: x['created'])
    return images

def get_calendar_events():
    """Get events from Google Calendar for this week (Pacific Time) and organize by team"""
    try:
        url = "https://calendar.google.com/calendar/ical/tornadoclasstimes%40gmail.com/public/basic.ics"
        response = requests.get(url)
        response.raise_for_status()
        
        events = []
        lines = response.text.split('\n')
        current_event = {}
        
        for line in lines:
            line = line.strip()
            if line.startswith('BEGIN:VEVENT'):
                current_event = {}
            elif line.startswith('END:VEVENT'):
                if current_event:
                    events.append(current_event)
            elif line.startswith('SUMMARY:'):
                current_event['title'] = line[8:]
            elif line.startswith('DTSTART'):
                date_time_str = line.split(':', 1)[1].strip()
                try:
                    dt = dateutil.parser.parse(date_time_str)
                    pacific_dt = dt.astimezone(PACIFIC_TZ) if dt.tzinfo else PACIFIC_TZ.localize(dt)
                    current_event['date'] = pacific_dt.date()
                    current_event['time'] = pacific_dt.strftime('%I:%M %p')
                    current_event['day'] = pacific_dt.strftime('%A')
                except Exception as e:
                    try:
                        dt = datetime.strptime(date_time_str[:8], "%Y%m%d")
                        pacific_dt = PACIFIC_TZ.localize(dt)
                        current_event['date'] = pacific_dt.date()
                        current_event['time'] = "All Day"
                        current_event['day'] = pacific_dt.strftime('%A')
                    except Exception as e2:
                        current_event['date'] = None
                        current_event['time'] = "Unknown"
                        current_event['day'] = "Unknown"
            elif line.startswith('DTEND'):
                end_time_str = line.split(':', 1)[1].strip()
                try:
                    dt = dateutil.parser.parse(end_time_str)
                    pacific_dt = dt.astimezone(PACIFIC_TZ) if dt.tzinfo else PACIFIC_TZ.localize(dt)
                    current_event['end_date'] = pacific_dt.date()
                    current_event['end_time'] = pacific_dt.strftime('%I:%M %p')
                except Exception as e:
                    try:
                        dt = datetime.strptime(end_time_str[:8], "%Y%m%d")
                        pacific_dt = PACIFIC_TZ.localize(dt)
                        current_event['end_date'] = pacific_dt.date()
                        current_event['end_time'] = "All Day"
                    except Exception as e2:
                        current_event['end_date'] = None
                        current_event['end_time'] = "Unknown"
            elif line.startswith('DESCRIPTION:'):
                current_event['description'] = line[12:]
        
        # Filter for this week (Pacific Time)
        # Show all events since these are recurring weekly classes
        week_events = [e for e in events if 'date' in e and e['date']]
        
        # Sort by date and time
        week_events.sort(key=lambda e: (e['date'], e['time']))
        
        # Separate events by team
        a_team_events = []
        b_team_events = []
        youth_team_events = []
        beginners_events = []
        
        for event in week_events:
            title = event.get('title', '').strip().lower()
            if 'a team' in title:
                a_team_events.append(event)
            if 'b team' in title:
                b_team_events.append(event)
            if 'youth' in title:
                youth_team_events.append(event)
            if 'beginners' in title:
                beginners_events.append(event)
        
        # Return organized events
        return {
           'A Team': a_team_events,
           'B Team': b_team_events,
           'Youth Team': youth_team_events,
           'Beginners': beginners_events,
           'all_events': week_events
        }
        
    except Exception as e:
        print(f"Error reading calendar: {e}")
        return {
           'A Team': [],
           'B Team': [],
           'Youth Team': [],
           'Beginners': [],
           'all_events': []
        }

@app.route('/classes')
def classes():
    # Get live calendar events
    calendar_events = get_calendar_events()
    
    # Group events by day of week
    days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    weekly_schedule = {}
    
    for event in calendar_events['all_events']:
        day_name = event['day']  # Get day name
        if day_name not in weekly_schedule:
            weekly_schedule[day_name] = []
        weekly_schedule[day_name].append(event)
    
    return render_template('Classes.html', weekly_schedule=weekly_schedule, days_of_week=days_of_week)

@app.route("/Classes")
def Classes():
    calendar_events = calendar_events_A_Team  # or use any default event list
    return render_template("Classes.html", schedule=class_schedule, about_us=about_us_content, events=calendar_events)

@app.route("/AboutUs")
def AboutUs():
    return render_template("AboutUs.html", about_us=about_us_content)

@app.route("/Gallery")
def Gallery():
    images = get_images_chronologically("dynamic_images")
    return render_template("Gallery.html", schedule=class_schedule, about_us=about_us_content, images=images)

@app.route("/")
def index():
    return render_template("Home.html", about_us=about_us_content)

@app.route('/images/<filename>')
def image_file(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), "dynamic_images"), filename)

@app.route('/Events')
def events():
    return render_template('Events.html', year=datetime.now().year)

@app.route('/Contact')
def contact():
    return render_template('Contact.html', year=datetime.now().year)

@app.route('/contact', methods=['POST'])
def contact_form():
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    subject = request.form.get('subject')
    message = request.form.get('message')
    
    # Here you would typically send an email or save to database
    # For now, we'll just redirect back to the contact page
    return redirect(url_for('contact'))

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')
    # Here you would typically add the email to your newsletter subscription list
    # For now, we'll just redirect back to the events page
    return redirect(url_for('events'))

@app.route('/process_selection', methods=['POST'])
def process_selection():
    selected_option = request.args.get('option')
    if selected_option == 'Classes':
        return redirect(url_for('Classes'))
    elif selected_option == 'About Us':
        return redirect(url_for('AboutUs'))
    elif selected_option == 'Gallery':
        return redirect(url_for('Gallery'))
    else:
        return redirect(url_for('index'))

@app.route('/national-winners')
def national_winners():
    winner_images = get_winner_images_chronologically("NationalWinnerPics")
    return render_template('NationalWinners.html', winner_images=winner_images, year=datetime.now().year)

@app.route('/winner-images/<filename>')
def winner_image_file(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), "NationalWinnerPics"), filename)

@app.route('/usa-team-members')
def usa_team_members():
    team_images = get_winner_images_chronologically("USATeamPics")
    return render_template('USATeamMembers.html', team_images=team_images, year=datetime.now().year)

@app.route('/team-images/<filename>')
def team_image_file(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), "USATeamPics"), filename)



@app.route('/MyClasses')
def my_classes():
    if 'user_id' not in session:
        return redirect(url_for('login_page'))
    
    user = User.query.get(session['user_id'])
    if not user:
        session.clear()
        return redirect(url_for('login_page'))
    
    # Get organized calendar events
    calendar_events = get_calendar_events()
    
    team_from_session = session.get('user_team')
    team_from_db = user.team

    # Get team-specific events based on user's team
    team_events = []
    if team_from_db == 'A Team':
        team_events = calendar_events['A Team']
    elif team_from_db == 'B Team':
        team_events = calendar_events['B Team']
    elif team_from_db == 'Youth Team':
        team_events = calendar_events['Youth Team']
    elif team_from_db == 'Beginners':
        team_events = calendar_events['Beginners']

    return render_template('MyClasses.html', 
                         user=user, 
                         team_session=team_from_session, 
                         team_db=team_from_db, 
                         team_class=team_events)

@app.route('/SignupPage', methods=['GET', 'POST'])
def signup_page():
    message = None
    success = False
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')
        belt_rank = request.form.get('belt_rank', '')
        team = request.form.get('team', '')

        # Validation
        if not name or not email or not password:
            message = "All fields are required."
        elif len(password) < 6:
            message = "Password must be at least 6 characters long."
        elif password != confirm_password:
            message = "Passwords do not match."
        else:
            # Check if user already exists
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                message = "An account with this email already exists."
            else:
                # Create new user
                new_user = User(name=name, email=email, belt_rank=belt_rank, team=team)
                new_user.set_password(password)
                
                try:
                    db.session.add(new_user)
                    db.session.commit()
                    success = True
                    message = "Account created successfully! You can now log in."
                except Exception as e:
                    db.session.rollback()
                    message = "An error occurred while creating your account. Please try again."

    return render_template('SignupPage.html', message=message, success=success)

@app.route('/LoginPage', methods=['GET', 'POST'])
def login_page():
    message = None
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')

        if not email or not password:
            message = "Please enter both email and password."
        else:
            user = User.query.filter_by(email=email).first()
            if user and user.check_password(password):
                # Log in successful
                session['user_id'] = user.id
                session['user_name'] = user.name
                session['user_email'] = user.email
                session['user_profile_picture'] = user.profile_picture
                session['user_team'] = user.team
                return redirect(url_for('index'))
            else:
                message = "Invalid email or password."

    return render_template('LoginPage.html', message=message)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if 'user_id' not in session:
        return redirect(url_for('login_page'))
    
    user = User.query.get(session['user_id'])
    if not user:
        session.clear()
        return redirect(url_for('login_page'))
    
    message = None
    success = False
    
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        belt_rank = request.form.get('belt_rank', '')
        team = request.form.get('team', '')
        
        # Handle profile picture upload
        if 'profile_picture' in request.files:
            file = request.files['profile_picture']
            if file and file.filename != '' and allowed_file(file.filename):
                filename = secure_filename(f"user_{user.id}_{file.filename}")
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                
                # Delete old profile picture if it exists
                if user.profile_picture:
                    old_filepath = os.path.join(app.config['UPLOAD_FOLDER'], user.profile_picture)
                    if os.path.exists(old_filepath):
                        os.remove(old_filepath)
                
                user.profile_picture = filename
                session['user_profile_picture'] = filename
                success = True
                message = "Profile picture updated successfully!"
        
        # Update name and email
        if name and name != user.name:
            user.name = name
            session['user_name'] = name
            success = True
            message = "Profile updated successfully!"
        
        if email and email != user.email:
            # Check if email is already taken
            existing_user = User.query.filter_by(email=email).first()
            if existing_user and existing_user.id != user.id:
                message = "This email is already taken by another account."
            else:
                user.email = email
                session['user_email'] = email
                success = True
                message = "Profile updated successfully!"
        
        # Update belt rank and team
        if belt_rank != user.belt_rank:
            user.belt_rank = belt_rank
            success = True
            message = "Profile updated successfully!"
        
        if team != user.team:
            user.team = team
            session['user_team'] = team
            success = True
            message = "Profile updated successfully!"
        
        if success:
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                message = "An error occurred while updating your profile."
    
    return render_template('Profile.html', user=user, message=message, success=success)

@app.route('/ForgotPassword', methods=['GET', 'POST'])
def forgot_password():
    message = None
    success = False
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        
        if not email:
            message = "Please enter your email address."
        else:
            user = User.query.filter_by(email=email).first()
            if user:
                # Generate reset code
                reset_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
                user.forgot_password_code = reset_code
                user.forgot_password_expiry = datetime.now(PACIFIC_TZ) + timedelta(hours=1)
                
                try:
                    db.session.commit()
                    
                    # Send email with reset code
                    email_body = f"""
                    Hello {user.name},
                    
                    You requested a password reset for your Tornado Sports Club account.
                    Your reset code is: {reset_code}
                    
                    This code will expire in 1 hour.
                    
                    If you didn't request this reset, please ignore this email.
                    
                    Best regards,
                    Tornado Sports Club Team
                    """
                    
                    send_email(user.email, "Password Reset Code", email_body)
                    success = True
                    message = "A reset code has been sent to your email address."
                except Exception as e:
                    db.session.rollback()
                    message = "An error occurred. Please try again."
            else:
                message = "No account found with this email address."

    return render_template('ForgotPassword.html', message=message, success=success)

@app.route('/ResetPassword', methods=['GET', 'POST'])
def reset_password():
    message = None
    success = False
    email = request.args.get('email', '').strip().lower()
    code = request.args.get('code', '').strip()
    
    if not email or not code:
        return redirect(url_for('forgot_password'))
    
    user = User.query.filter_by(email=email, forgot_password_code=code).first()
    if not user or user.forgot_password_expiry < datetime.now(PACIFIC_TZ):
        message = "Invalid or expired reset code."
        return render_template('ResetPassword.html', message=message, success=success, email=email, code=code)
    
    if request.method == 'POST':
        new_password = request.form.get('new_password', '')
        confirm_password = request.form.get('confirm_password', '')
        
        if not new_password:
            message = "Please enter a new password."
        elif len(new_password) < 6:
            message = "Password must be at least 6 characters long."
        elif new_password != confirm_password:
            message = "Passwords do not match."
        else:
            user.set_password(new_password)
            user.forgot_password_code = None
            user.forgot_password_expiry = None
            
            try:
                db.session.commit()
                success = True
                message = "Password reset successfully! You can now log in with your new password."
            except Exception as e:
                db.session.rollback()
                message = "An error occurred while resetting your password."

    return render_template('ResetPassword.html', message=message, success=success, email=email, code=code)

def send_email(to, subject, body):
    try:
        msg = Message(subject, recipients=[to], body=body)
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

@app.route('/static/sw.js')
def service_worker():
    return send_from_directory('static', 'sw.js')

@app.route('/api/sync', methods=['POST'])
def sync_data():
    # Handle offline data sync
    data = request.get_json()
    # Process offline data here
    return {'status': 'success'}

@app.route('/offline')
def offline():
    return render_template('offline.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5555)