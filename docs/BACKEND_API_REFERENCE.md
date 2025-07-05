# Digital Louage System Backend API Documentation

## Overview

This document describes the REST API endpoints and backend structure for the Digital Louage System. It is intended for frontend developers to integrate with the backend and build the client application.

---

## Base URL

-   **Development:** `http://localhost:5000/api/`

---

## Authentication

-   **JWT-based authentication**
-   Token is set as an HTTP-only cookie after login/register
-   Most endpoints require authentication (see below)

---

## Endpoints

### Auth

| Method | Endpoint       | Description                | Access  |
| ------ | -------------- | -------------------------- | ------- |
| POST   | /auth/register | Register new user          | Public  |
| POST   | /auth/login    | Login user                 | Public  |
| GET    | /auth/profile  | Get logged-in user profile | Private |

#### Register

-   **POST** `/auth/register`
-   Body: `{ firstName, lastName, username, email, password, role }`
    -   **Note:** Only `role` values of `'passenger'` or `'driver'` are accepted from the frontend. Roles `admin` and `superadmin` cannot be set by users during registration; they are assigned by backend administrators only.
-   Returns: user info (no password), sets JWT cookie

#### Login

-   **POST** `/auth/login`
-   Body: `{ email, password }`
-   Returns: user info (no password), sets JWT cookie

#### Get Profile

-   **GET** `/auth/profile`
-   Returns: user info (no password)

---

### Users

| Method | Endpoint        | Description           | Access           |
| ------ | --------------- | --------------------- | ---------------- |
| GET    | /users/         | Get all users         | Admin/Superadmin |
| GET    | /users/:id      | Get user by ID        | Admin/Superadmin |
| PUT    | /users/profile  | Update own profile    | Private          |
| PUT    | /users/password | Change own password   | Private          |
| DELETE | /users/:id      | Delete user by ID     | Admin/Superadmin |
| POST   | /users/logout   | Logout (clear cookie) | Private          |

---

### Trips

| Method | Endpoint   | Description     | Access                  |
| ------ | ---------- | --------------- | ----------------------- |
| GET    | /trips/    | Get all trips   | Public                  |
| GET    | /trips/:id | Get trip by ID  | Public                  |
| POST   | /trips/    | Create new trip | Driver/Admin/Superadmin |
| PUT    | /trips/:id | Update trip     | Driver/Admin/Superadmin |
| DELETE | /trips/:id | Delete trip     | Driver/Admin/Superadmin |

---

### Stations

| Method | Endpoint      | Description        | Access           |
| ------ | ------------- | ------------------ | ---------------- |
| GET    | /stations/    | Get all stations   | Public           |
| GET    | /stations/:id | Get station by ID  | Public           |
| POST   | /stations/    | Create new station | Admin/Superadmin |
| PUT    | /stations/:id | Update station     | Admin/Superadmin |
| DELETE | /stations/:id | Delete station     | Admin/Superadmin |

---

### Health

| Method | Endpoint | Description  | Access |
| ------ | -------- | ------------ | ------ |
| GET    | /health/ | Health check | Public |

---

## Models (Clarified)

### User Model

-   `firstName`: String (required)
-   `lastName`: String (required)
-   `username`: String (required, unique)
-   `email`: String (required, unique)
-   `password`: String (required, min 6 chars)
-   `role`: 'driver' | 'passenger' | 'admin' | 'superadmin' (required)
    -   **Note:** Only `'passenger'` and `'driver'` can be set from the frontend. `admin` and `superadmin` are assigned by backend/admin only.
-   `station`: String (required for admin, station name, not a reference)
-   `createdAt`: Date

### Trip Model

-   `driver`: User ID (reference to User, required)
-   `departureStation`: String (station name, required)
-   `arrivalStation`: String (station name, required)
-   `availableSeats`: Number (required)
-   `price`: Number (required)
-   `status`: 'active' | 'completed' | 'cancelled' (default: 'active')
-   `createdBy`: User ID (reference to User, required)
-   `createdAt`: Date

### Station Model

-   `name`: String (required, unique)
-   `admin`: User ID (reference to User, nullable)
-   `destinations`: [Station IDs] (array of references to Station)
-   `createdAt`: Date

---

## Roles & Permissions

-   **passenger**: Can view trips, reserve seats (future)
-   **driver**: Can declare trips, manage own trips
-   **admin**: Can manage drivers, stations, bookings for their station
-   **superadmin**: Full access

---

## Error Handling

-   All responses are JSON: `{ success, data, message }`
-   On error: `{ success: false, data: null, message: 'Error message' }`

---

## Notes for Frontend

-   Send credentials (cookies) with requests: `withCredentials: true` in fetch/axios
-   For protected routes, check for 401/403 errors
-   See `TECH_STACK.md` for stack details

---

## Contact

For questions, contact the backend team.
