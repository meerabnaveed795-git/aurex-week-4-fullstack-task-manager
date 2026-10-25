# AUREX Week 4 - Full Stack Task Management Application

## Project Overview
TaskFlow is a full-stack task management web application developed as part of the AUREX Full-Stack Engineering Internship. It helps users organize their work by creating, viewing, editing, completing, filtering, and deleting tasks.

## Features
- User registration and login
- JWT-based authentication
- Add new tasks
- View personal tasks
- Edit task titles
- Mark tasks as completed or undo completion
- Delete tasks
- Filter tasks by All, Pending, and Completed
- Store task and user data in MongoDB
- Responsive React user interface

## Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs

## Project Structure

```text
aurex-fullstack-project-meerab-naveed/
├── backend/
│   ├── src/
│   ├── postman/
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

## Prerequisites
- Node.js and npm
- MongoDB database
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd aurex-fullstack-project-meerab-naveed
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and configure your own environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

Check `backend/package.json` for the available start script.

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get authenticated user details |
| GET | `/api/tasks` | View the user's tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Protected endpoints require a valid JWT access token.

## Security
- Passwords are hashed using bcryptjs.
- JWT authentication protects private routes.
- Tasks are associated with their respective users.
- Environment variables and secrets must not be committed to GitHub.

## Internship
**Program:** AUREX Full-Stack Engineering Internship  
**Assignment:** Week 4 - Full Stack Task Management Application

## Future Improvements
- Task descriptions and due dates
- Task priority selection
- Search tasks
- Improved notifications and validation
- Live deployment
