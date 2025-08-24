import os
from datetime import datetime
from functools import wraps
from flask import (
    Blueprint, render_template, send_from_directory, request,
    redirect, url_for, session, flash, g
)
from werkzeug.utils import secure_filename
from .models import User
from .extensions import db, mail
# Note: You might need to import other helpers like 'send_email' if they are in a separate file.

# This creates a 'Blueprint', which is a way to organize a group of related routes.
main_bp = Blueprint('main_bp', __name__)

# --- Reusable Decorator & Helper Functions (Moved from app.py) ---

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash("You must be logged in to view this page.", "error")
            return redirect(url_for('main_bp.login_page')) # Use 'main_bp.login_page'
        
        user = User.query.get(session['user_id'])
        if user is None:
            session.clear()
            flash("Your session is invalid, please log in again.", "error")
            return redirect(url_for('main_bp.login_page'))
        
        g.user = user
        return f(*args, **kwargs)
    return decorated_function

def get_images_by_folder(folder_path):
    # ... (This is the consolidated image function from the optimization) ...
    images = []
    abs_folder_path = os.path.join(os.path.dirname(__file__), 'static', folder_path)
    if not os.path.exists(abs_folder_path):
        return images
    
    for filename in os.listdir(abs_folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            filepath = os.path.join(abs_folder_path, filename)
            images.append({
                'filename': filename,
                'original_name': filename,
                'created': os.path.getctime(filepath)
            })
    images.sort(key=lambda x: x['created'])
    return images

def get_calendar_events():
    # ... (Your full calendar parsing logic goes here) ...
    pass

# --- Website Page Routes ---

@main_bp.route("/")
def index():
    return render_template("Home.html")

@main_bp.route('/classes')
def classes():
    # ... (Your original classes logic) ...
    return render_template('Classes.html')

@main_bp.route("/AboutUs")
def AboutUs():
    return render_template("AboutUs.html")

@main_bp.route("/Gallery")
def Gallery():
    images = get_images_by_folder("dynamic_images")
    return render_template("Gallery.html", images=images)

@main_bp.route('/Events')
def events():
    return render_template('Events.html', year=datetime.now().year)

@main_bp.route('/Contact')
def contact():
    return render_template('Contact.html')

@main_bp.route('/national-winners')
def national_winners():
    winner_images = get_images_by_folder("NationalWinnerPics")
    return render_template('NationalWinners.html', winner_images=winner_images)

@main_bp.route('/usa-team-members')
def usa_team_members():
    team_images = get_images_by_folder("USATeamPics")
    return render_template('USATeamMembers.html', team_images=team_images)

# --- User Account Routes ---

@main_bp.route('/MyClasses')
@login_required
def my_classes():
    # ... (Your original MyClasses logic) ...
    return render_template('MyClasses.html', user=g.user)

@main_bp.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    # ... (Your original profile update logic) ...
    return render_template('Profile.html', user=g.user)

@main_bp.route('/SignupPage', methods=['GET', 'POST'])
def signup_page():
    # ... (Your original signup logic) ...
    return render_template('SignupPage.html')

@main_bp.route('/LoginPage', methods=['GET', 'POST'])
def login_page():
    # ... (Your original login logic) ...
    return render_template('LoginPage.html')

@main_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main_bp.index'))

@main_bp.route('/ForgotPassword', methods=['GET', 'POST'])
def forgot_password():
    # ... (Your original forgot password logic) ...
    return render_template('ForgotPassword.html')

@main_bp.route('/ResetPassword', methods=['GET', 'POST'])
def reset_password():
    # ... (Your original reset password logic) ...
    return render_template('ResetPassword.html')

# --- Image and Static File Serving Routes ---

@main_bp.route('/images/<path:filename>')
def image_file(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), "dynamic_images"), filename)

@main_bp.route('/winner-images/<path:filename>')
def winner_image_file(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), "NationalWinnerPics"), filename)

@main_bp.route('/team-images/<path:filename>')
def team_image_file(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), "USATeamPics"), filename)

@main_bp.route('/offline')
def offline():
    return render_template('offline.html')