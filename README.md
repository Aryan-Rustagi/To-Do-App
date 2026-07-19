# TaskFlow — To-Do App

A clean, full-stack to-do list application built with React (Vite) on the frontend and Node.js + Express + MongoDB on the backend.

> **Note:** All CSS styling in this project was generated with the help of AI.

---

## Live Deployments

- **Frontend (Vercel):** [https://to-do-app-azure-seven.vercel.app/](https://to-do-app-azure-seven.vercel.app/)
- **Backend (Render):** [https://to-do-app-erhn.onrender.com](https://to-do-app-erhn.onrender.com)

---

## Project Structure

```
To-Do-App/
├── client/                   # React frontend (Vite)
│   ├── pages/
│   │   ├── Landing.jsx       # Home / hero page
│   │   ├── Login.jsx         # Login page
│   │   ├── Signup.jsx        # Sign up page
│   │   └── Todo.jsx          # Task dashboard (protected)
│   ├── src/
│   │   ├── styles/
│   │   │   ├── landing.css   # Styles for Landing page (AI generated)
│   │   │   ├── auth.css      # Shared styles for Login & Signup (AI generated)
│   │   │   ├── todo.css      # Styles for Todo dashboard (AI generated)
│   │   │   ├── theme.css     # Global design tokens (AI generated)
│   │   │   └── layout.css    # Layout utilities (AI generated)
│   │   ├── App.jsx           # Route definitions
│   │   ├── main.jsx          # App entry point
│   │   └── index.css         # Base global styles
│   └── package.json
│
└── server/                   # Node.js backend
    ├── controller/
    │   ├── todoController.js  # CRUD logic for todos
    │   └── authController.js  # Register & login logic
    ├── models/
    │   ├── Todo.js            # Mongoose Todo schema
    │   └── User.js            # Mongoose User schema
    ├── routes/
    │   ├── todoRoutes.js      # /api/todos routes
    │   └── authRoutes.js      # /api/auth routes
    ├── middleware/
    │   └── authMiddleware.js  # JWT verification middleware
    ├── db.config/
    │   └── db.js              # MongoDB connection
    ├── .env                   # Environment variables (not committed)
    └── server.js              # Express app entry point
```

---

## How It Works — Application Workflow

### 1. Landing Page (`/`)
- The first page a visitor sees.
- Displays a hero section with a short description of the app.
- Has two buttons in the header: **Sign In** (goes to `/login`) and **Get Started** (goes to `/signup`).
- No authentication required to view this page.

### 2. Sign Up (`/signup`)
- New users fill in their **email**, **password**, and **confirm password**.
- On submit, a `POST` request is sent to `/api/auth/register`.
- If successful, the JWT token is saved to `localStorage` and the user is redirected to `/todo`.
- If already logged in (token exists), the page automatically redirects to `/todo`.

### 3. Login (`/login`)
- Returning users enter their **email** and **password**.
- On submit, a `POST` request is sent to `/api/auth/login`.
- On success, the JWT token and email are stored in `localStorage` and the user is redirected to `/todo`.
- A link at the bottom takes users to the Sign Up page if they don't have an account.

### 4. Todo Dashboard (`/todo`) — Protected
- Only accessible when a valid JWT token exists in `localStorage`.
- If there is no token, the user is redirected to `/login`.
- Users can:
  - **Add** a task with a title and description.
  - **Toggle** a task as complete or incomplete.
  - **Edit** a task's title and description inline.
  - **Delete** a task.
- All task operations call the backend API with the JWT token in the `Authorization` header.
- Clicking **Sign Out** clears the token from `localStorage` and redirects to `/`.

---

## API Endpoints

### Auth — `/api/auth`
| Method | Endpoint    | Description              |
|--------|-------------|--------------------------|
| POST   | `/register` | Create a new user account |
| POST   | `/login`    | Authenticate and get JWT |

### Todos — `/api/todos` *(requires JWT)*
| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| GET    | `/`                  | Get all todos for user  |
| POST   | `/`                  | Create a new todo       |
| PUT    | `/:id`               | Update a todo           |
| PUT    | `/:id/toggle`        | Toggle complete status  |
| DELETE | `/:id`               | Delete a todo           |

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, React Router v6   |
| Styling    | Vanilla CSS *(AI generated)*      |
| HTTP       | Axios                             |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB with Mongoose             |
| Auth       | JSON Web Tokens (JWT)             |

---

## Running the Project Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Start the Backend
```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
node server.js
```
Server runs on `http://localhost:5000`

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev
```
App runs on `http://localhost:5173`

---

## Notes

- No arrow functions are used anywhere in the React component files — all event handlers and async functions use the standard `function` keyword.
- Each page has its own dedicated CSS file inside `client/src/styles/`.
- All CSS was designed and generated with the help of AI to maintain a clean, professional white theme.
