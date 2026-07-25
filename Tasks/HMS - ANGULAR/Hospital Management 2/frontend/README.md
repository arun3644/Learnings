# Hospital Management System - Frontend

Angular 18 standalone application with NgRx state management.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

```bash
npm install
```

## Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── core/           # Core services, guards, interceptors, models
│   ├── store/          # NgRx state management
│   ├── features/       # Feature modules (auth, admin, doctor, patient, nurse)
│   ├── shared/         # Shared components, directives, pipes
│   ├── layouts/        # Layout components
│   └── app files       # Root app configuration
├── assets/             # Static assets
├── environments/       # Environment configurations
└── styles/             # Global styles
```

## Features

- ✅ Angular 18 Standalone Components
- ✅ NgRx State Management
- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Lazy-loaded Routes
- ✅ Reactive Forms
- ✅ HTTP Interceptors
- ✅ Custom Validators
- ✅ Reusable Components

## Backend API

The frontend connects to the backend API at `http://localhost:8080`

## User Roles

- **Admin**: Manage doctors, patients, nurses, appointments, and view statistics
- **Doctor**: View appointments, manage time slots, view patients
- **Patient**: Book appointments, view doctors, view appointment history
- **Nurse**: View patients, manage patient care

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `npm test` - Run unit tests
- `npm run lint` - Lint the code
