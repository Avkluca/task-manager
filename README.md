# Task Manager MERN Stack

A full-stack task management application built with MongoDB, Express, React, and Node.js.

## Project Structure

```
task-manager-mern/
├── backend/
│   ├── server.js (Express server setup)
│   ├── package.json
│   ├── config/
│   │   └── db.js (MongoDB connection)
│   ├── models/
│   │   └── Task.js (Mongoose schema)
│   └── routes/
│       └── taskRoutes.js (API endpoints)
│
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── App.css
        ├── index.css
        └── components/
            ├── TaskInput.js
            ├── TaskInput.css
            ├── TaskList.js
            └── TaskList.css
```

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder:
   ```
   MONGODB_URI=mongodb://localhost:27017/task-manager
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on http://localhost:5000

### Frontend Setup

1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## Features

- ✅ Create new tasks
- ✅ View all tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Persistent storage with MongoDB
- ✅ Beautiful UI with CSS styling

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Technologies Used

- **Frontend**: React, Axios, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Tools**: npm, Nodemon

## Next Steps

1. Make sure MongoDB is installed and running
2. Set up environment variables
3. Install dependencies for both frontend and backend
4. Run both servers in separate terminals
5. Open http://localhost:3000 in your browser
