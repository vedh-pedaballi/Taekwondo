import sqlite3
import os

def migrate_database():
    """Add profile_picture column to existing users table"""
    
    # Check if database exists
    if not os.path.exists('users.db'):
        print("Database doesn't exist yet. It will be created when you run the app.")
        return
    
    # Connect to the database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    try:
        # Check if profile_picture column already exists
        cursor.execute("PRAGMA table_info(user)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'profile_picture' not in columns:
            print("Adding profile_picture column to user table...")
            cursor.execute("ALTER TABLE user ADD COLUMN profile_picture VARCHAR(255)")
            conn.commit()
            print("✅ Successfully added profile_picture column!")
        else:
            print("✅ profile_picture column already exists!")
            
        # Check if forgot_password_code column exists
        if 'forgot_password_code' not in columns:
            print("Adding forgot_password_code column to user table...")
            cursor.execute("ALTER TABLE user ADD COLUMN forgot_password_code VARCHAR(10)")
            conn.commit()
            print("✅ Successfully added forgot_password_code column!")
        else:
            print("✅ forgot_password_code column already exists!")
            
        # Check if forgot_password_expiry column exists
        if 'forgot_password_expiry' not in columns:
            print("Adding forgot_password_expiry column to user table...")
            cursor.execute("ALTER TABLE user ADD COLUMN forgot_password_expiry DATETIME")
            conn.commit()
            print("✅ Successfully added forgot_password_expiry column!")
        else:
            print("✅ forgot_password_expiry column already exists!")
            
        # Check if belt_rank column exists
        if 'belt_rank' not in columns:
            print("Adding belt_rank column to user table...")
            cursor.execute("ALTER TABLE user ADD COLUMN belt_rank VARCHAR(20)")
            conn.commit()
            print("✅ Successfully added belt_rank column!")
        else:
            print("✅ belt_rank column already exists!")
            
        # Check if team column exists
        if 'team' not in columns:
            print("Adding team column to user table...")
            cursor.execute("ALTER TABLE user ADD COLUMN team VARCHAR(30)")
            conn.commit()
            print("✅ Successfully added team column!")
        else:
            print("✅ team column already exists!")
            
    except Exception as e:
        print(f"❌ Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    print("🔄 Starting database migration...")
    migrate_database()
    print("✅ Migration completed!") 