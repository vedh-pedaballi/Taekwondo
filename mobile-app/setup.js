#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

console.log('🚀 Tornado Sports Club Mobile App Setup');
console.log('=====================================\n');

// Check Node.js version
function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 16) {
    console.error('❌ Node.js version 16 or higher is required');
    console.error(`Current version: ${nodeVersion}`);
    process.exit(1);
  }
  
  console.log(`✅ Node.js version: ${nodeVersion}`);
}

// Check if package.json exists
function checkPackageJson() {
  const packagePath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    console.error('❌ package.json not found');
    console.error('Please run this script from the mobile-app directory');
    process.exit(1);
  }
  
  console.log('✅ package.json found');
}

// Install dependencies
function installDependencies() {
  console.log('\n📦 Installing dependencies...');
  
  try {
    execSync('npm install', {stdio: 'inherit'});
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    console.error(error.message);
    process.exit(1);
  }
}

// Check React Native CLI
function checkReactNativeCLI() {
  console.log('\n🔧 Checking React Native CLI...');
  
  try {
    execSync('npx react-native --version', {stdio: 'pipe'});
    console.log('✅ React Native CLI is available');
  } catch (error) {
    console.log('⚠️  React Native CLI not found, installing...');
    try {
      execSync('npm install -g @react-native-community/cli', {stdio: 'inherit'});
      console.log('✅ React Native CLI installed');
    } catch (installError) {
      console.error('❌ Failed to install React Native CLI');
      console.error(installError.message);
    }
  }
}

// Create .env file if it doesn't exist
function createEnvFile() {
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('\n📝 Creating .env file...');
    
    const envContent = `# Backend Configuration
BACKEND_URL=http://localhost:5000

# API Configuration
API_TIMEOUT=10000

# App Configuration
APP_NAME=Tornado Sports Club
APP_VERSION=1.0.0

# Development
DEBUG=true
LOG_LEVEL=info
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created');
  } else {
    console.log('✅ .env file already exists');
  }
}

// Check Android setup
function checkAndroidSetup() {
  console.log('\n🤖 Checking Android setup...');
  
  try {
    execSync('adb version', {stdio: 'pipe'});
    console.log('✅ Android SDK found');
  } catch (error) {
    console.log('⚠️  Android SDK not found');
    console.log('Please install Android Studio and configure ANDROID_HOME');
  }
}

// Check iOS setup (macOS only)
function checkIOSSetup() {
  if (process.platform === 'darwin') {
    console.log('\n🍎 Checking iOS setup...');
    
    try {
      execSync('xcodebuild -version', {stdio: 'pipe'});
      console.log('✅ Xcode found');
      
      // Check if iOS dependencies need to be installed
      const iosPodfilePath = path.join(__dirname, 'ios', 'Podfile');
      if (fs.existsSync(iosPodfilePath)) {
        console.log('📱 Installing iOS dependencies...');
        try {
          execSync('cd ios && pod install', {stdio: 'inherit'});
          console.log('✅ iOS dependencies installed');
        } catch (error) {
          console.log('⚠️  Failed to install iOS dependencies');
          console.log('You may need to run: cd ios && pod install');
        }
      }
    } catch (error) {
      console.log('⚠️  Xcode not found');
      console.log('Please install Xcode from the App Store');
    }
  } else {
    console.log('\n🍎 iOS setup skipped (not on macOS)');
  }
}

// Create necessary directories
function createDirectories() {
  console.log('\n📁 Creating necessary directories...');
  
  const dirs = [
    'src/components',
    'src/context',
    'src/screens',
    'src/services',
    'src/utils',
    '__tests__',
  ];
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {recursive: true});
      console.log(`✅ Created ${dir}`);
    }
  });
}

// Update API service with correct backend URL
function updateApiService() {
  console.log('\n🔗 Updating API service configuration...');
  
  const apiServicePath = path.join(__dirname, 'src', 'services', 'ApiService.js');
  
  if (fs.existsSync(apiServicePath)) {
    let content = fs.readFileSync(apiServicePath, 'utf8');
    
    // Update the baseURL to use environment variable
    content = content.replace(
      "this.baseURL = 'http://localhost:5000';",
      "this.baseURL = process.env.BACKEND_URL || 'http://localhost:5000';"
    );
    
    fs.writeFileSync(apiServicePath, content);
    console.log('✅ API service updated');
  }
}

// Main setup function
function main() {
  try {
    checkNodeVersion();
    checkPackageJson();
    installDependencies();
    checkReactNativeCLI();
    createEnvFile();
    checkAndroidSetup();
    checkIOSSetup();
    createDirectories();
    updateApiService();
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Start your Flask backend server');
    console.log('2. Update the BACKEND_URL in .env file if needed');
    console.log('3. Run: npm start');
    console.log('4. Run: npm run android (for Android)');
    console.log('5. Run: npm run ios (for iOS, macOS only)');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
main(); 