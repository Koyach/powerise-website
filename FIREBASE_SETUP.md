# Firebase Setup Guide for Powerise Website

This guide will help you set up Firebase for the Powerise website project, including Authentication and Firestore Database.

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Google account
- Access to Firebase Console

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `powerise-website` (or your preferred name)
4. Accept the terms and click "Continue"
5. Choose whether to enable Google Analytics (optional)
6. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click "Authentication" in the left sidebar
2. Click "Get started" if this is your first time
3. Go to the "Sign-in method" tab
4. Click "Email/Password"
5. Enable "Email/Password" provider
6. Click "Save"

## Step 3: Create Firestore Database

1. In your Firebase project dashboard, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (we'll configure rules later)
4. Select a location (recommended: closest to your users, e.g., `asia-northeast1` for Japan)
5. Click "Done"

## Step 4: Generate Service Account Key (Backend)

1. Go to Project settings (gear icon) → "Service accounts" tab
2. Click "Generate new private key"
3. Download the JSON file
4. Rename it to `serviceAccountKey.json`
5. Place it in `packages/server/` directory

⚠️ **IMPORTANT**: Never commit this file to version control!

## Step 5: Configure Backend Environment

1. In `packages/server/`, copy `.env.example` to `.env`:
   ```bash
   cd packages/server
   cp .env.example .env
   ```

2. Edit the `.env` file:
   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:3000

   # Firebase Configuration
   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json

   # Firebase Project Settings (replace with your project ID)
   FIREBASE_PROJECT_ID=your-actual-project-id
   ```

## Step 6: Register Web App (Frontend)

1. In Firebase Console, go to Project settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web" icon (`</>`)
4. Enter app nickname: `powerise-client`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the `firebaseConfig` object

## Step 7: Configure Frontend Firebase

1. Open `packages/client/src/lib/firebase.ts`
2. Replace the placeholder config with your actual Firebase config:

```typescript
// Your web app's Firebase configuration (replace with actual values)
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Your actual API key
  authDomain: "powerise-website.firebaseapp.com", // Your actual auth domain
  projectId: "powerise-website", // Your actual project ID
  storageBucket: "powerise-website.appspot.com", // Your actual storage bucket
  messagingSenderId: "123456789", // Your actual messaging sender ID
  appId: "1:123456789:web:abcdef123456" // Your actual app ID
};
```

## Step 8: Install Firebase CLI and Login

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project root
firebase init
```

When running `firebase init`, select:
- Firestore
- Functions (optional)
- Hosting (optional)

## Step 9: Test the Setup

### Backend Test

```bash
cd packages/server
pnpm dev
```

Check the logs for: "✅ Firebase Admin SDK initialized successfully"

### Frontend Test

```bash
cd packages/client
pnpm dev
```

The Firebase client should initialize without errors.

## Step 10: Initial Firestore Security Rules

In `firestore.rules`, start with these basic rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow all users to read news/pages (public content)
    match /news/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    match /pages/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow authenticated users to create inquiries
    match /inquiries/{document} {
      allow create: if true; // Anyone can submit inquiries
      allow read, update, delete: if request.auth != null; // Only authenticated users can manage
    }
  }
}
```

## Environment Variables Summary

### Backend (.env)
```env
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
FIREBASE_PROJECT_ID=your-project-id
```

### Frontend
Firebase config is stored in `packages/client/src/lib/firebase.ts`

## Security Checklist

- [ ] ✅ `serviceAccountKey.json` is in `.gitignore`
- [ ] ✅ `.env` files are in `.gitignore`
- [ ] ✅ Firebase rules are configured appropriately
- [ ] ✅ Only necessary authentication providers are enabled
- [ ] ✅ Frontend Firebase config does not contain sensitive data

## Next Steps

After completing this setup:

1. Test authentication in the frontend
2. Create initial admin user
3. Implement CRUD operations for news/pages
4. Set up proper production security rules
5. Configure Firebase hosting (optional)

## Troubleshooting

### Common Issues

1. **"Firebase Admin SDK not initialized"**
   - Check if `serviceAccountKey.json` is in the correct location
   - Verify the `GOOGLE_APPLICATION_CREDENTIALS` path in `.env`

2. **"Permission denied" in Firestore**
   - Check Firestore security rules
   - Ensure user is authenticated

3. **CORS errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check Firebase project settings

For more help, see the [Firebase Documentation](https://firebase.google.com/docs). 