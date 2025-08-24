# Tornado Sports Club Mobile App

A React Native mobile application for the Tornado Sports Club, providing a modern mobile interface for the existing Flask web application.

## Features

### 🏠 Home Screen
- Beautiful hero section with gradient background
- Quick action cards for easy navigation
- Featured content sections
- Latest news and updates
- Contact information

### 📅 Classes & Events
- View class schedules and upcoming events
- Calendar integration
- Team-specific class information
- Event registration and details

### 🖼️ Gallery
- Photo gallery with image zoom
- National winners showcase
- Team member profiles
- Dynamic image loading

### 👤 User Profile
- User authentication and registration
- Profile management
- Class attendance tracking
- Personal information updates

### 🎨 Modern UI/UX
- Dark/Light theme support
- Smooth animations and transitions
- Responsive design
- Native mobile interactions

### 🔧 Technical Features
- Offline support with data caching
- Push notifications
- Image upload and management
- Real-time updates
- Cross-platform compatibility

## Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Python Flask backend running

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Configure backend URL**
   Edit `src/services/ApiService.js` and update the `baseURL` to point to your Flask server:
   ```javascript
   this.baseURL = 'http://your-flask-server-url:5000';
   ```

## Running the App

### Development Mode

1. **Start Metro bundler**
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

### Production Build

1. **Android APK**
   ```bash
   npm run build-android
   ```

2. **iOS Archive (macOS only)**
   ```bash
   npm run build-ios
   ```

## Project Structure

```
mobile-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/            # React Context providers
│   ├── screens/            # Screen components
│   ├── services/           # API and business logic
│   └── utils/              # Utility functions
├── android/                # Android-specific files
├── ios/                    # iOS-specific files
├── __tests__/              # Test files
└── package.json
```

## Key Components

### Authentication
- `AuthContext.js` - Manages user authentication state
- `AuthService.js` - Handles authentication API calls
- `LoginScreen.js` - User login interface
- `SignupScreen.js` - User registration interface

### Navigation
- `CustomTabBar.js` - Custom bottom tab navigation
- `App.js` - Main navigation setup

### API Integration
- `ApiService.js` - Centralized API communication
- Handles all backend interactions
- Error handling and retry logic

### Theming
- `ThemeContext.js` - Theme management
- Dark/Light mode support
- Consistent styling across the app

## Backend Integration

The mobile app communicates with the existing Flask backend through RESTful APIs. The backend provides:

- User authentication and management
- Class and event data
- Image storage and serving
- Contact form processing
- Newsletter subscription

## Environment Configuration

Create a `.env` file in the root directory:

```env
# Backend Configuration
BACKEND_URL=http://localhost:5000

# API Configuration
API_TIMEOUT=10000

# App Configuration
APP_NAME=Tornado Sports Club
APP_VERSION=1.0.0
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **iOS build issues**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   npm run ios
   ```

4. **Network connectivity**
   - Ensure Flask backend is running
   - Check API URL configuration
   - Verify network permissions

### Debug Mode

Enable debug mode by adding to `index.js`:
```javascript
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning:']); // Ignore specific warnings
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added offline support and improved UI
- **v1.2.0** - Enhanced authentication and profile features

## Roadmap

- [ ] Push notifications
- [ ] Advanced offline features
- [ ] Social media integration
- [ ] Payment processing
- [ ] Advanced analytics
- [ ] Multi-language support 