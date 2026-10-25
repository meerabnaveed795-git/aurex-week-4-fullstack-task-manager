# TaskFlow - Backend API

## Overview
This is the backend of the AUREX Week 4 Full-Stack Task Management Application. It provides REST APIs for user authentication and task management using Node.js, Express.js, and MongoDB.

## Features
- User registration and login
- Password hashing using bcryptjs
- JWT-based authentication
- Protected API routes
- Create, retrieve, update, and delete tasks
- User-specific task access
- Centralized error handling
- MongoDB database integration

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## Project Structure

```text
backend/
├── postman/
│   └── AUREX-Week3-Task-API.postman_collection.json
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

**Security note:** The actual `.env` file contains private configuration and must not be uploaded to GitHub.

## Installation

Run these commands from the backend directory:

```bash
npm install
```

Create a `.env` file in the backend directory with your own values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not share your real database connection string or JWT secret.

## Run the Server

Use the start command defined in `package.json`. If the project uses the `start` script, run:

```bash
npm start
```

The backend is configured to run locally at:

`http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a user account |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Retrieve authenticated user details |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve the current user's tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Protected endpoints require a valid JWT in the Authorization header:

`Authorization: Bearer YOUR_TOKEN`

## Testing
The `postman/` directory contains a Postman collection for API testing. Register or log in to obtain a valid token before testing protected task endpoints.

## Security
- Passwords are hashed before storage.
- JWT authentication protects private endpoints.
- Users can access only their own tasks.
- Secrets must be stored in environment variables.
