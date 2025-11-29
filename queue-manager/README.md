# Queue Management System

A modern Queue Management Application built with Angular (Frontend) and Node.js/Express + Supabase (Backend).

## Features

- **Queue Registration**: Register vehicles with license plate and user details.
- **Multi-Lane Support**: Manage queues across different service lanes.
- **Real-time Status**: Track status (Waiting, Active, Completed).
- **History**: View service history and logs.
- **Supabase Integration**: Persistent data storage using PostgreSQL.

## Tech Stack

- **Frontend**: Angular 18+, Tailwind CSS (if applicable)
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)

## Prerequisites

- Node.js (v18 or higher)
- bun
- A Supabase account and project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd queue-manager
```

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    bun install
    ```
3.  Configure Environment Variables:
    - Create a `.env` file in the `backend` directory.
    - Add your Supabase credentials:
      ```env
      SUPABASE_URL=your_supabase_project_url
      SUPABASE_KEY=your_supabase_anon_public_key
      PORT=3000
      ```
4.  Setup Database:
    - Go to your Supabase Dashboard -> SQL Editor.
    - Run the SQL script found in `backend/schema.sql`.

### 3. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    bun install
    ```

## Running the Application

### Start Backend
```bash
cd backend
bun start
```
Server will run on `http://localhost:3000`.

### Start Frontend
```bash
cd frontend
bun start
```
Application will run on `http://localhost:4200`.

## API Endpoints

- `GET /api/queue`: Get all queue items.
- `POST /api/queue`: Add a new item.
- `PUT /api/queue/:id`: Update an item.
- `DELETE /api/queue/:id`: Delete an item.
