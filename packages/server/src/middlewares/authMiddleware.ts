import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/firebase';
import { DecodedIdToken, Auth } from 'firebase-admin/auth';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}

/**
 * Authentication middleware to verify Firebase ID tokens
 * Expects Authorization header with format: "Bearer <token>"
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    
    // Check if authorization header exists
    if (!authHeader) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'No authorization header provided',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid authorization header format. Expected: Bearer <token>',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Extract token from header
    const idToken = authHeader.split('Bearer ')[1];
    
    if (!idToken) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Verify the ID token using Firebase Admin SDK
    if (!auth) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Firebase Auth not initialized',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Add decoded user information to request object
    req.user = decodedToken;
    
    // Log successful authentication (optional, remove in production for security)
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ User authenticated: ${decodedToken.email || decodedToken.uid}`);
    }
    
    // Continue to next middleware
    next();
    
  } catch (error) {
    console.error('❌ Authentication error:', error);
    
    // Handle different types of Firebase Auth errors
    if (error instanceof Error) {
      let statusCode = 403;
      let message = 'Invalid or expired token';
      
      // More specific error handling based on error code
      if (error.message.includes('expired')) {
        message = 'Token has expired';
      } else if (error.message.includes('invalid')) {
        message = 'Invalid token format';
      } else if (error.message.includes('revoked')) {
        message = 'Token has been revoked';
      }
      
      res.status(statusCode).json({
        error: 'Forbidden',
        message,
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(403).json({
        error: 'Forbidden',
        message: 'Token verification failed',
        timestamp: new Date().toISOString(),
      });
    }
  }
};

/**
 * Optional middleware to check if user has admin privileges
 * Should be used after authMiddleware
 */
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'User not authenticated',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Check if user has admin custom claim
    if (!req.user.admin) {
      res.status(403).json({
        error: 'Forbidden',
        message: 'Admin privileges required',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  } catch (error) {
    console.error('❌ Admin check error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to verify admin privileges',
      timestamp: new Date().toISOString(),
    });
  }
}; 