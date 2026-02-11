# Event Admin Backend

## Overview
This project is a backend REST API for an Event Booking Admin Dashboard built using:

- Node.js
- Express.js
- Sequelize ORM
- SQLite Database
- JWT Authentication

The system allows the Admin to manage:

- Users
- Organizers
- Events
- Bookings
- Payments
- Dashboard statistics

---

## Setup Instructions

### 1. Clone repository
git clone https://github.com/sivakotireddygit/event-admin-backend.git
cd event-admin-backend

### 2. Install dependencies
npm install

### 3. Run server
node server.js

Server runs on:
http://localhost:5000

---

## Default Admin Login

First create admin:

GET /api/seed-admin

Login credentials:

Email: admin@mail.com  
Password: 123456

---

## API Modules

### Authentication
- POST /api/login

### Dashboard
- GET /api/dashboard

### Users
- GET /api/users
- PATCH /api/users/:id/block

### Organizers
- GET /api/organizers
- PATCH /api/organizers/:id/status

### Events
- GET /api/events
- PATCH /api/events/:id/status

### Bookings & Revenue
- GET /api/bookings
- GET /api/revenue

---

## Testing

All APIs tested using **Postman**.

---

## Author
Sivakoti Reddy
