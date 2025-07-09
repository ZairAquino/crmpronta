# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

InsurancePro CRM is a full-stack MERN application with separate frontend and backend directories:

- **Frontend**: React.js application built with Material-UI (MUI) components and Material Kit design system
- **Backend**: Node.js/Express.js server with MongoDB database using Mongoose ODM
- **Authentication**: JWT-based authentication system
- **File Storage**: Local file uploads with multer middleware

### Key Frontend Technologies
- React 18.2.0 with create-react-app
- Material-UI (@mui/material) for UI components
- Redux Toolkit for state management
- React Router for navigation
- Formik + Yup for form validation
- Axios for API calls
- FullCalendar for calendar functionality

### Key Backend Technologies
- Express.js server with CORS enabled
- MongoDB with Mongoose ODM
- JWT authentication with passport-jwt
- Multer for file uploads
- Nodemailer for email functionality
- Winston for logging

## Project Structure

```
InsuranceProCRM/
├── frontend/           # React.js frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components by feature
│   │   ├── layouts/        # Layout components (dashboard, simple)
│   │   ├── sections/       # Section components for dashboard
│   │   ├── service/        # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── theme/          # MUI theme configuration
│   └── public/         # Static assets
├── server/             # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middlewares/       # Custom middleware
│   ├── db/               # Database connection
│   └── uploads/          # File upload directory
```

## Core Business Entities

The CRM manages these main entities:
- **Users**: Admin and regular users with role-based access
- **Leads**: Potential customers with lead scoring
- **Contacts**: Converted leads/customers
- **Policies**: Insurance policies tied to contacts
- **Claims**: Insurance claims processing
- **Calls/Meetings**: Communication tracking
- **Tasks**: Task management system
- **Documents**: File management for policies/claims
- **Email Templates**: Templated email system

## Development Commands

### Frontend (run from `/frontend` directory)
```bash
npm start          # Start development server (port 3000)
npm run build      # Build production bundle
npm test           # Run tests
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Backend (run from `/server` directory)
```bash
npm run dev        # Start development server with nodemon (port 5000)
npm test           # Run tests (not implemented)
```

## Environment Configuration

### Frontend
- API base URL configured in `src/constant.js`
- Default points to production: `https://insurance-crm.onrender.com/`
- For local development, change to: `http://127.0.0.1:5000/`

### Backend
Environment variables needed in `/server/.env`:
- `DB_URL`: MongoDB connection string
- `DB_NAME`: Database name
- `PORT`: Server port (defaults to 5000)
- JWT and other auth secrets

## Key Files to Understand

### Frontend
- `src/App.js`: Main app component with routing
- `src/routes.js`: Route definitions
- `src/service/api.js`: API service layer
- `src/layouts/dashboard/nav/config.js`: Navigation configuration
- `src/constant.js`: API base URL configuration

### Backend
- `app.js`: Express app setup and middleware
- `index.js`: Server entry point
- `db/connectdb.js`: Database connection
- `routes/serverRoutes.js`: Main route aggregator
- `controllers/`: Business logic for each entity

## Development Notes

- The application uses JWT tokens for authentication
- File uploads are handled locally in `/server/uploads/`
- The frontend uses Material-UI's theming system extensively
- Redux Toolkit is used for state management but not consistently throughout
- Form validation uses Formik + Yup pattern
- The codebase follows a feature-based organization in the pages directory