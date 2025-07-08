# Powerise Website

A modern website with admin panel built using Next.js, Express, and Firebase.

## Project Structure

This is a monorepo project using pnpm workspaces:

```
powerise-website/
├── packages/
│   ├── client/          # Next.js frontend application
│   └── server/          # Express backend API
├── package.json         # Root package.json
├── pnpm-workspace.yaml  # Workspace configuration
└── README.md
```

## Tech Stack

### Frontend (Client)
- **Next.js 14** - React framework with App Router
- **Material-UI (MUI)** - Component library and design system
- **Zustand** - State management
- **Firebase Auth** - Authentication
- **TypeScript** - Type safety

### Backend (Server)
- **Express.js** - Node.js web framework
- **Firebase Admin SDK** - Backend Firebase integration
- **Firestore** - Database
- **TypeScript** - Type safety

## Development Setup

### Prerequisites
- Node.js 18+
- pnpm 8+
- Firebase CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables (see `.env.example` files in each package)

4. Start development servers:
   ```bash
   pnpm dev
   ```

This will start both the frontend (Next.js) and backend (Express) in development mode.

## Available Scripts

- `pnpm dev` - Start all packages in development mode
- `pnpm build` - Build all packages
- `pnpm start` - Start all packages in production mode
- `pnpm lint` - Run linting across all packages
- `pnpm type-check` - Run TypeScript type checking

## Features

### Public Website
- Homepage with company information
- News/Announcements listing and details
- Static pages (About, Services, etc.)
- Contact form

### Admin Panel
- Secure authentication
- News/Announcements management (CRUD)
- Static pages content management
- Inquiries management
- User-friendly dashboard

## Development Plan

This project follows an epic-based development approach:

1. **Project Foundation** - Monorepo setup, Firebase integration
2. **Backend API Foundation** - Express server, Auth middleware
3. **Design System** - MUI theme, common components
4. **Authentication** - Admin login, route guards
5. **News Management** - CRUD operations for announcements
6. **Pages Management** - Static content management
7. **Inquiries** - Contact form and management
8. **Deployment** - Production deployment setup

## Contributing

1. Follow the established code style
2. Write TypeScript for type safety
3. Test your changes thoroughly
4. Update documentation as needed

## License

MIT License 