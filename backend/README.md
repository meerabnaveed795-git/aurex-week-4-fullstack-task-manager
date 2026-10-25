# AUREX Full-Stack Internship - Month 2, Week 3

## Intern Information
**Name:** Meerab Naveed
**Domain:** Full-Stack Web Development
**Week:** Month 2 - Week 3 (Node.js, Express.js, MongoDB and CRUD)

## Project: Task Manager REST API
A backend REST API built with Node.js, Express.js and MongoDB (Mongoose). It lets a client create,
read, update and delete tasks. Data is stored in MongoDB Atlas, so it is still there after the server restarts.

## Tech Stack
- Node.js and npm
- Express.js (server, routes, middleware)
- MongoDB Atlas and Mongoose (database, schema, model)
- dotenv (environment variables), cors, nodemon (development)
- Postman (API testing)

## Folder Structure
```
backend/
├── src/
│   ├── config/db.js              # MongoDB connection
│   ├── models/Task.js            # Mongoose schema and model
│   ├── controllers/taskController.js   # CRUD logic
│   ├── routes/taskRoutes.js      # URLs -> controller functions
│   ├── middleware/errorHandler.js      # 404 and error handling
│   └── server.js                 # app entry point
├── postman/                      # Postman collection
├── .env                          #  environment variables (no secrets)
├── .gitignore
├── package.json
└── README.md
```

## Request Flow
Client -> Route -> Controller -> Model (MongoDB) -> Response -> Client

## Setup and Run
1. Install Node.js (LTS version).
2. Install the packages: `npm install`
3. Copy `.env.example` to `.env` and fill in your own values:
   ```
   PORT=5000
   MONGODB_URI=<your MongoDB Atlas connection string>
   ```
4. Start the server: `npm run dev` (or `npm start`)
5. Open http://localhost:5000 - you should see `{"message":"Task API is running"}`

`.env` is listed in `.gitignore`, so passwords are never pushed to GitHub.

## Database Model (Task)
| Field | Type | Rules |
|-------|------|-------|
| title | String | required, 3-100 characters |
| description | String | optional, max 500 characters |
| completed | Boolean | default false |
| priority | String | low, medium or high (default medium) |
| createdAt / updatedAt | Date | added automatically |

## API Endpoints
Base URL: `http://localhost:5000/api/tasks`

| Operation | Method | Endpoint | Success | Errors |
|-----------|--------|----------|---------|--------|
| Create task | POST | `/api/tasks` | 201 Created | 400 validation failed |
| Get all tasks | GET | `/api/tasks` (optional `?completed=true`) | 200 OK | - |
| Get one task | GET | `/api/tasks/:id` | 200 OK | 400 invalid id, 404 not found |
| Update task | PUT | `/api/tasks/:id` | 200 OK | 400 invalid id or data, 404 not found |
| Delete task | DELETE | `/api/tasks/:id` | 200 OK | 400 invalid id, 404 not found |

### Example: create a task
Request body:
```json
{ "title": "Learn Express", "description": "Finish the Week 3 API", "priority": "high" }
```
Response (201):
```json
{
  "_id": "665f1c2e9b1d8a0012a4c111",
  "title": "Learn Express",
  "description": "Finish the Week 3 API",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-10-17T10:00:00.000Z",
  "updatedAt": "2026-10-17T10:00:00.000Z"
}
```

### Example: validation error (400)
```json
{ "message": "Validation failed", "errors": ["Title is required"] }
```

## HTTP Status Codes Used
200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Server Error

## Testing
All endpoints were tested in Postman, including failed requests (missing title, invalid id, id that does not exist).
The Postman collection is in the `postman` folder.

## Learning Summary
<write 4-5 lines in your own words: what Node, Express, MongoDB and Mongoose are, what you found difficult>
