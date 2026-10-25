# TaskFlow - Frontend

## Overview
TaskFlow is the React frontend of the AUREX Week 4 Full-Stack Task Management Application. It provides a user-friendly interface for account registration, login, and task management.

The frontend communicates with the Node.js and Express backend through REST APIs.

## Features
- User registration and login
- JWT-based authentication
- Add new tasks
- View personal tasks
- Edit task titles
- Mark tasks as completed or undo completion
- Delete tasks
- Filter tasks by All, Pending, and Completed
- Responsive user interface
- Success and error messages

## Technologies Used
- React
- Vite
- JavaScript
- CSS
- Fetch API
- Browser localStorage for the authentication token

## Project Structure

```text id="o6c9qw"
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites
- Node.js
- npm
- The TaskFlow backend running locally

## Installation

From the frontend directory, install the dependencies:

```bash id="ac7w8z"
npm install
```

## Run the Application

Start the Vite development server:

```bash id="4ogz9b"
npm run dev
```

Open the local URL shown in the terminal, usually:

`http://localhost:5173`

## Backend Connection
The frontend currently sends API requests to:

`http://localhost:5000`

Make sure the backend is running before testing registration, login, or task operations.

## Authentication
After successful registration or login, the application stores the returned JWT token in browser localStorage and uses it to access protected task endpoints.

## Task Management
Authenticated users can:
- Create tasks
- View their tasks
- Edit task titles
- Mark tasks complete or undo completion
- Delete tasks
- Filter tasks by status

## Notes
- The backend and MongoDB database must be configured correctly.
- The current API address is intended for local development.
- For production deployment, configure the frontend to use the deployed backend URL.
- Never commit private credentials or tokens to GitHub.

## Internship
**Program:** AUREX Full-Stack Engineering Internship  
**Assignment:** Week 4 - Full Stack Task Management Application
