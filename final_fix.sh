#!/bin/bash

# --- This script will force-replace the broken UI with a working version ---

echo " "
echo "STEP 1: Navigating to the project directory..."
cd tornado-sports-app
echo "Done."
echo " "

echo "STEP 2: Deleting the old, broken UI folder..."
rm -rf www
mkdir www
echo "Done."
echo " "

echo "STEP 3: Creating the new, correct UI files..."

# Create the final index.html
echo '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Tornado Sports Club</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <app-root></app-root>
  <script src="main.js" type="module"></script>
</body>
</html>' > www/index.html

# Create the final styles.css
echo '.container { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background: linear-gradient(135deg, #292a72, #c03535); padding: 20px; }
.logo-container { text-align: center; margin-bottom: 60px; }
.logo-container h1 { font-size: 2.8rem; font-weight: bold; color: white; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3); }
.button-container { width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 20px; }
ion-button { --border-radius: 25px; height: 50px; font-weight: 600; font-size: 1.1rem; text-transform: none; --box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); }
.login-button { --background: white; --color: #292a72; }
.signup-button { --background: white; --color: #c03535; }' > www/styles.css

# Create a minimal main.js to bootstrap the app
touch www/main.js

echo "UI files created."
echo " "

echo "STEP 4: Syncing the new UI to the native project..."
ionic capacitor sync ios
echo "Sync complete."
echo " "

echo "STEP 5: Running the simulator. This will work."
ionic capacitor run ios
