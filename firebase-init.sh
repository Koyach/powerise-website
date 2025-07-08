#!/bin/bash

# Firebase CLI Initialization Helper for Powerise Website
# This script helps set up Firebase CLI with the correct configuration

echo "🔥 Firebase CLI Initialization for Powerise Website"
echo "=================================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
    echo "✅ Firebase CLI installed"
else
    echo "✅ Firebase CLI is already installed"
fi

echo ""

# Login to Firebase
echo "🔐 Logging in to Firebase..."
firebase login

echo ""

# Initialize Firebase project
echo "🚀 Initializing Firebase project..."
echo "When prompted, select the following options:"
echo "- Which Firebase features do you want to set up for this directory?"
echo "  ✅ Firestore: Configure security rules and indexes files for Firestore"
echo "  ✅ Functions: Configure a Cloud Functions directory and files (optional)"
echo "  ✅ Hosting: Configure files for Firebase Hosting and (optionally) GitHub Action deploys (optional)"
echo ""
echo "- Please select an option:"
echo "  ✅ Use an existing project (select your powerise-website project)"
echo ""
echo "- What file should be used for Firestore Rules?"
echo "  ✅ firestore.rules (default)"
echo ""
echo "- File firestore.rules already exists. Do you want to overwrite it?"
echo "  ❌ No (keep the existing rules)"
echo ""

firebase init

echo ""
echo "🎉 Firebase initialization complete!"
echo ""
echo "Next steps:"
echo "1. Follow the FIREBASE_SETUP.md guide to complete the setup"
echo "2. Download your service account key and place it in packages/server/"
echo "3. Configure your Firebase config in packages/client/src/lib/firebase.ts"
echo "4. Test the setup by running the development servers" 