import { initializeApp, applicationDefault, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import path from 'path';

// Initialize Firebase Admin SDK
let app: App | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

try {
  // Check if service account key file exists for development
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  
  if (serviceAccountPath && process.env.NODE_ENV === 'development') {
    // Use service account key for development
    const serviceAccount = require(path.resolve(serviceAccountPath));
    app = initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log('✅ Firebase Admin SDK initialized with service account key');
  } else {
    // Use application default credentials for production
    app = initializeApp({
      credential: applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log('✅ Firebase Admin SDK initialized with application default credentials');
  }

  // Initialize Firestore
  db = getFirestore(app);
  console.log('✅ Firestore initialized');

  // Initialize Auth
  auth = getAuth(app);
  console.log('✅ Firebase Auth initialized');

} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', error);
  console.log('⚠️  Some features may not work without proper Firebase configuration');
  console.log('   Please check your Firebase credentials and configuration');
}

// Export initialized instances
export { app, db, auth };
export default app; 