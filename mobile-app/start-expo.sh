#!/bin/bash

# Increase file descriptor limit
ulimit -n 65536
 
# Start Expo with clear cache
npx expo start --clear 