# EV Charging Station Management App

A full-stack web application for managing EV charging stations, built as part of the Evoltsoft assignment.

## Live Links

- **Frontend (Vercel):** https://assignment-one-drab.vercel.app
- **Backend API (Render):** https://evoltsoft-assignment-iyvg.onrender.com/api

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Atlas) via Mongoose
- **Auth:** JWT (jsonwebtoken), bcrypt for password hashing
- **Frontend:** Vue 3 (Composition API), Vue Router
- **Maps:** Leaflet + OpenStreetMap
- **HTTP Client:** Axios

## Features

- User registration and login with JWT-based authentication
- Protected routes for creating, updating, and deleting charging stations
- Public read access to charger listings
- Filterable charger list (status, connector type, power output range)
- Interactive map view with markers for each charging station
- Full CRUD operations from the UI

## Project Structure

/backend   - Express API, MongoDB models, auth
/frontend  - Vue 3 application

## Running Locally

### Backend

1. Navigate to the backend folder:
cd backend
npm install
2. Create a `.env` file with:
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
3. Start the server:
node server.js
   Server runs on `http://localhost:3000`

### Frontend

1. Navigate to the frontend folder:
cd frontend
npm install
2. Update `src/api/axios.js` baseURL to point to your backend (local or deployed)
3. Start the dev server:
npm run dev
   App runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/stations | No | List all charging stations |
| POST | /api/stations | Yes | Create a new station |
| PUT | /api/stations/:id | Yes | Update a station |
| DELETE | /api/stations/:id | Yes | Delete a station |

Protected routes require an `Authorization: Bearer <token>` header.

## Charging Station Schema

- `name` (String, required)
- `location` (Object: `lat`, `lng` — Numbers, required)
- `status` (String, enum: `Active`/`Inactive`)
- `powerOutput` (Number, kW)
- `connectorType` (String, enum: `Type1`/`Type2`)