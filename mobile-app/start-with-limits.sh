#!/bin/bash

# Increase file descriptor limit
ulimit -n 65536

# Set environment variables to reduce file watching
export WATCHMAN_PREFER_IPV6=true
export WATCHMAN_SOCKET_TIMEOUT=30

# Start Expo with reduced file watching
npx expo start --clear --no-dev --minify 