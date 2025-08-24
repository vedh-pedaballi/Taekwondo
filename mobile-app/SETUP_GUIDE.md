# Tornado Sports Club Mobile App Setup Guide

This guide will help you set up and run the React Native mobile app for Tornado Sports Club.

## Prerequisites

### Required Software
- **Node.js** (v16 or higher)
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Python Flask backend** (your existing website backend)

### System Requirements
- **Android**: Windows, macOS, or Linux
- **iOS**: macOS only (requires Xcode)

## Quick Setup

### 1. Install Dependencies

```bash
# Navigate to the mobile app directory
cd mobile-app

# Install Node.js dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

### 2. Configure Backend Connection

Edit `src/services/ApiService.js` and update the backend URL:

```javascript
// Change this line to point to your Flask server
this.baseURL = 'http://your-flask-server-url:5000';
```

### 3. Start the Development Server

```bash
# Start Metro bundler
npm start

# In a new terminal, run on Android
npm run android

# Or run on iOS (macOS only)
npm run ios
```

## Detailed Setup Instructions

### Step 1: Environment Setup

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Install React Native CLI**
   ```bash
   npm install -g @react-native-community/cli
   ```

3. **Android Setup**
   - Install [Android Studio](https://developer.android.com/studio)
   - Set up Android SDK
   - Configure environment variables:
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/tools
     export PATH=$PATH:$ANDROID_HOME/tools/bin
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

4. **iOS Setup (macOS only)**
   - Install Xcode from the App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

### Step 2: Project Setup

1. **Clone and Navigate**
   ```bash
   cd mobile-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **iOS Dependencies (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Step 3: Backend Configuration

1. **Start Your Flask Backend**
   ```bash
   # Navigate to your website directory
   cd website
   python app.py
   ```

2. **Update API Service**
   - Open `src/services/ApiService.js`
   - Update the `baseURL` to match your Flask server
   - Default: `http://localhost:5000`

### Step 4: Run the App

#### Development Mode

1. **Start Metro Bundler**
   ```bash
   npm start
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

3. **Run on iOS (macOS only)**
   ```bash
   npm run ios
   ```

#### Production Build

1. **Android APK**
   ```bash
   npm run build-android
   ```

2. **iOS Archive (macOS only)**
   ```bash
   npm run build-ios
   ```

## Troubleshooting

### Common Issues

#### 1. Metro Bundler Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### 2. Android Build Issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
npm run android
```

#### 3. iOS Build Issues
```bash
# Clean iOS build
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

#### 4. Network Connectivity
- Ensure Flask backend is running
- Check API URL configuration
- Verify network permissions in app

#### 5. Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Enable debug mode by adding to `index.js`:
```javascript
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning:']); // Ignore specific warnings
```

## Project Structure

```
mobile-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomTabBar.js
│   │   └── LoadingScreen.js
│   ├── context/            # React Context providers
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── ClassesScreen.js
│   │   ├── EventsScreen.js
│   │   ├── GalleryScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── AboutScreen.js
│   │   ├── ContactScreen.js
│   │   ├── WinnersScreen.js
│   │   └── TeamMembersScreen.js
│   ├── services/           # API and business logic
│   │   ├── ApiService.js
│   │   └── AuthService.js
│   └── utils/              # Utility functions
├── android/                # Android-specific files
├── ios/                    # iOS-specific files
├── __tests__/              # Test files
├── package.json            # Dependencies and scripts
├── app.json               # App configuration
├── index.js               # Entry point
├── setup.js               # Setup script
├── README.md              # Project documentation
└── SETUP_GUIDE.md         # This file
```

## Configuration Files

### Environment Variables (.env)
```env
# Backend Configuration
BACKEND_URL=http://localhost:5000

# API Configuration
API_TIMEOUT=10000

# App Configuration
APP_NAME=Tornado Sports Club
APP_VERSION=1.0.0

# Development
DEBUG=true
LOG_LEVEL=info
```

### Package.json Scripts
```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint .",
    "clean": "cd android && ./gradlew clean && cd ..",
    "build-android": "cd android && ./gradlew assembleRelease && cd ..",
    "build-ios": "cd ios && xcodebuild -workspace TornadoSports.xcworkspace -scheme TornadoSports -configuration Release -destination generic/platform=iOS -archivePath TornadoSports.xcarchive archive && cd .."
  }
}
```

## Backend Integration

The mobile app communicates with your existing Flask backend through RESTful APIs. Ensure your Flask app has the following endpoints:

### Authentication Endpoints
- `POST /LoginPage` - User login
- `POST /SignupPage` - User registration
- `POST /ForgotPassword` - Password reset request
- `POST /ResetPassword` - Password reset
- `POST /profile` - Profile update

### Content Endpoints
- `GET /` - Home page data
- `GET /classes` - Class information
- `GET /Events` - Event information
- `GET /Gallery` - Gallery images
- `GET /AboutUs` - About page content
- `GET /Contact` - Contact information
- `GET /national-winners` - Winners gallery
- `GET /usa-team-members` - Team members

## Testing

### Run Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Deployment

### Android
1. Generate signed APK
2. Upload to Google Play Store
3. Or distribute APK directly

### iOS
1. Archive in Xcode
2. Upload to App Store Connect
3. Submit for review

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the README.md file
3. Check React Native documentation
4. Contact the development team

## Next Steps

After successful setup:
1. Customize the UI to match your brand
2. Add more features and screens
3. Implement push notifications
4. Add offline functionality
5. Set up analytics and crash reporting
6. Prepare for app store submission 