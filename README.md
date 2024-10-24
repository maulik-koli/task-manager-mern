# Task Manager Project

## Description

This is a task manager application built using the MERN stack. Users can save tasks and projects, organize them by categories, and manage subtasks within projects. The app incorporates JWT authentication for enhanced security and allows users to stay logged in until their token expires.

## Features

- Save and manage tasks and projects
- Organize tasks by categories
- Store and manage subtasks within projects
- JWT authentication for secure user sessions
- Persistent login using cookies

## Technology

- MongoDB
- Express.js
- React
- Node.js
- JWT for authentication

## Dependencies

### Backend

- **bcryptjs**: 2.4.3
- **cors**: 2.8.5
- **dotenv**: 16.4.5
- **express**: 4.21.0
- **jsonwebtoken**: 9.0.2
- **mongoose**: 8.6.2
- **validator**: 13.12.0

### Frontend

- **@emotion/react**: 11.13.3
- **@emotion/styled**: 11.13.0
- **@mui/icons-material**: 6.1.2
- **@mui/material**: 6.1.2
- **react**: 18.3.1
- **react-dom**: 18.3.1
- **react-router-dom**: 6.26.2

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/weather-snap
   ```

2. **Install dependencies:**
   
   For the client:
   ```bash
   cd client
   npm install
   ```

   For the server:
   ```bash
   cd server
   npm install
   ```
   
3. **Start the backend server:**
   ```bash
   cd server
   npm run start
   ```

4. **Start the frontend application:**
    ```bash
    cd client
    npm run start
    ```

5. **Open your browser and navigate to:**
   ```bach
   http://localhost:3000/
   ```

6. **Start Mongod Server for MongoDB:**

## Project Structure

```
task-manager/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   └── package.json
└── server/
    ├── src/
    │   ├── db/
    │   ├── middleware/
    │   ├── models/
    │   ├── routers/
    │   └── utils/
    │   └── app.js
    ├── .gitignore
    ├── package-lock.json
    └── package.json

```

- **client/**: Contains the frontend code for the application.
  - **public/**: Contains static files.
  - **src/**: Contains components, pages, and other application logic.

- **server/**: Contains the backend code and API.
  - **src/**: Contains database connections, middleware, models, and routes.

## Working

- **app.js**: The main entry point for the backend server, setting up routes and middleware.
- **frontend components**: Manages task and project functionalities, handles authentication, and manages user sessions.
- **JWT Authentication**: Provides secure user login and session management.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Create a new branch for your feature or bug fix.
2. Commit your changes and push them to your branch.
3. Open a pull request with a description of your changes.

## Acknowledgements

- **MERN Stack**: MongoDB, Express, React, Node.js.
- **JWT**: JSON Web Token for secure authentication.
- **Express.js**: A fast, minimalist web framework for Node.js.

---
