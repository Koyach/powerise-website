# Backend API Foundation Guide

This document explains the backend API server structure and authentication system for the Powerise website.

## Project Structure

```
packages/server/src/
├── index.ts                    # Main server entry point
├── lib/
│   └── firebase.ts            # Firebase Admin SDK initialization
└── middlewares/
    └── authMiddleware.ts      # Authentication middleware
```

## Features Implemented

### ✅ 1. Core Server Setup

- **Express.js** server with TypeScript
- **CORS** middleware configured for frontend communication
- **JSON parsing** middleware with 10MB limit
- **Environment variables** loaded with dotenv
- **Graceful shutdown** handling

### ✅ 2. Firebase Admin SDK Integration

**File: `src/lib/firebase.ts`**

- **Flexible initialization** for development and production
- **Service account key** support for development
- **Application default credentials** for production
- **Firestore and Auth** instances exported
- **Comprehensive error handling**

**Configuration:**
```typescript
// Development (with service account key)
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
FIREBASE_PROJECT_ID=your-project-id

// Production (with application default credentials)
FIREBASE_PROJECT_ID=your-project-id
```

### ✅ 3. Authentication Middleware

**File: `src/middlewares/authMiddleware.ts`**

#### `authMiddleware`
- **Bearer token validation** from Authorization header
- **Firebase ID token verification** using Admin SDK
- **User information** attached to `req.user`
- **Comprehensive error handling** with specific error messages
- **Development logging** for debugging

#### `adminMiddleware`
- **Admin privilege checking** using Firebase custom claims
- **Must be used after** `authMiddleware`
- **Protects admin-only routes**

## API Endpoints

### Public Endpoints

#### `GET /health`
Health check endpoint with Firebase connection status.

**Response:**
```json
{
  "status": "ok",
  "message": "Powerise API Server is running",
  "timestamp": "2024-06-27T13:00:00.000Z",
  "environment": "development",
  "firebase": {
    "firestore": "connected"
  }
}
```

#### `GET /api`
API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Powerise API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "auth": {
      "test": "/api/auth/test (requires authentication)",
      "admin": "/api/auth/admin (requires admin privileges)"
    },
    "news": "/api/news (coming soon)",
    "pages": "/api/pages (coming soon)",
    "inquiries": "/api/inquiries (coming soon)"
  }
}
```

### Protected Endpoints

#### `GET /api/auth/test` 🔐
Test authentication middleware.

**Headers:**
```
Authorization: Bearer <firebase-id-token>
```

**Response:**
```json
{
  "message": "Authentication successful",
  "user": {
    "uid": "user-firebase-uid",
    "email": "user@example.com",
    "emailVerified": true
  },
  "timestamp": "2024-06-27T13:00:00.000Z"
}
```

#### `GET /api/auth/admin` 👨‍💼
Test admin middleware (requires admin custom claim).

**Headers:**
```
Authorization: Bearer <firebase-id-token-with-admin-claim>
```

**Response:**
```json
{
  "message": "Admin access successful",
  "user": {
    "uid": "admin-firebase-uid",
    "email": "admin@example.com",
    "admin": true
  },
  "timestamp": "2024-06-27T13:00:00.000Z"
}
```

## Authentication Flow

### 1. Client Authentication

```typescript
// Frontend: Get ID token after Firebase Auth sign-in
const user = await signInWithEmailAndPassword(auth, email, password);
const idToken = await user.user.getIdToken();

// Make authenticated request
const response = await fetch('/api/auth/test', {
  headers: {
    'Authorization': `Bearer ${idToken}`,
    'Content-Type': 'application/json',
  },
});
```

### 2. Server Token Verification

```typescript
// Extract token from Authorization header
const authHeader = req.headers.authorization;
const idToken = authHeader.split('Bearer ')[1];

// Verify with Firebase Admin SDK
const decodedToken = await auth.verifyIdToken(idToken);
req.user = decodedToken; // Attach user info to request
```

### 3. Admin Privileges

To set admin custom claims (run this once in Firebase Admin SDK):

```typescript
// Server-side script to set admin claim
import { auth } from './src/lib/firebase';

async function setAdminClaim(uid: string) {
  await auth.setCustomUserClaims(uid, { admin: true });
  console.log(`Admin claim set for user: ${uid}`);
}
```

## Error Responses

### Authentication Errors

#### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "No authorization header provided",
  "timestamp": "2024-06-27T13:00:00.000Z"
}
```

#### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Invalid or expired token",
  "timestamp": "2024-06-27T13:00:00.000Z"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Firebase Auth not initialized",
  "timestamp": "2024-06-27T13:00:00.000Z"
}
```

## Development & Testing

### Start Development Server

```bash
cd packages/server
pnpm dev
```

**Console Output:**
```
✅ Firebase Admin SDK initialized with service account key
✅ Firestore initialized
✅ Firebase Auth initialized
🚀 Powerise API Server running on port 8000
📍 Health check: http://localhost:8000/health
📖 API Info: http://localhost:8000/api
🔐 Auth test: http://localhost:8000/api/auth/test
👨‍💼 Admin test: http://localhost:8000/api/auth/admin
🌍 Environment: development
```

### Test with cURL

#### Health Check
```bash
curl http://localhost:8000/health
```

#### Authentication Test (requires valid Firebase ID token)
```bash
curl -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
     http://localhost:8000/api/auth/test
```

### TypeScript Types

The server extends the Express Request interface:

```typescript
declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken; // Firebase user information
    }
  }
}
```

## Next Steps

1. **Implement CRUD routes** for news, pages, and inquiries
2. **Add input validation** using Zod schemas
3. **Set up rate limiting** for API endpoints
4. **Add logging** middleware for request tracking
5. **Implement file upload** for images/documents
6. **Add API documentation** with OpenAPI/Swagger

## Security Considerations

- ✅ **Token verification** using Firebase Admin SDK
- ✅ **CORS configuration** restricts frontend origins
- ✅ **Environment variables** for sensitive configuration
- ✅ **Error handling** prevents information leakage
- ⏳ **Rate limiting** (to be implemented)
- ⏳ **Input validation** (to be implemented)
- ⏳ **Request logging** (to be implemented)

## Troubleshooting

### Common Issues

1. **"Firebase Auth not initialized"**
   - Check if `serviceAccountKey.json` exists
   - Verify `GOOGLE_APPLICATION_CREDENTIALS` path
   - Ensure `FIREBASE_PROJECT_ID` is set

2. **"Token verification failed"**
   - Check if token is valid and not expired
   - Verify token format: `Bearer <token>`
   - Ensure Firebase project ID matches

3. **CORS errors**
   - Check `FRONTEND_URL` environment variable
   - Verify frontend URL matches CORS origin

For more details, see the [Firebase Setup Guide](./FIREBASE_SETUP.md). 