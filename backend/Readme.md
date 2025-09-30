# YouVerify Assessment - Invoice App Backend

## Overview

This backend service powers the **Invoice App** developed as part of the YouVerify Frontend Engineer assessment. It provides RESTful APIs and real-time functionality for invoice management and user activities. The backend is built with **TypeScript**, **Express**, **MongoDB**, and **Socket.IO**, with Firebase authentication.

The backend is designed to support a responsive frontend, handle real-time updates, and maintain a scalable structure for further extensions.

---

## Features

* **Invoice Management**

  * Fetch and duplicate invoices.
  * Group invoices by date for frontend display.

* **Recent Activity Tracking**

  * Record actions such as invoice duplication in real-time.
  * Emits socket events for instant frontend updates.

* **Real-Time Updates**

  * Socket.IO integration for live invoice and activity updates.

* **Authentication**

  * Firebase authentication for secure API access.

* **TypeScript & Validation**

  * Strong typing with TypeScript for better maintainability.

---

## Tech Stack

* **Backend:** Node.js, Express
* **Language:** TypeScript
* **Database:** MongoDB with Mongoose
* **Real-Time:** Socket.IO
* **Authentication:** Firebase
* **Utilities:** NanoID for unique IDs

---

## Setup & Installation

### Prerequisites

* Node.js v18+
* MongoDB Atlas or local MongoDB instance
* Firebase project for authentication

### Installation

1. Clone the repository:

```bash
git clone <https://github.com/Damileee/youVerify-assessment.git>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in `backend/`:

```env
PORT=4000
MONGO_URI=<your-mongodb-connection-string>
FIREBASE_SERVICE_ACCOUNT_KEY=<your-firebase-json-key>
```

4. Start in development mode:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
npm start
```

---

## API Endpoints

### `POST /invoices/duplicate`

Duplicate the most recent invoice:

**Request Headers:**

```http
Authorization: Bearer <Firebase-ID-Token>
```

**Response:**

```json
{
  "success": true,
  "recentInvoice": {
    "date": "TODAY - 30TH SEPTEMBER, 2025",
    "invoices": [
      {
        "id": "1023494 - 2304",
        "dueDate": "May 19, 2023",
        "amount": 1311750.12,
        "status": "paid"
      }
    ]
  },
  "recentActivity": {
    "id": "xyz123",
    "title": "Invoice duplicated",
    "timestamp": "Mon, 10:30 AM",
    "description": "Duplicated invoice <b>00239434/Olaniyi Ojo Adewale</b>"
  }
}
```

### `GET /invoices`

Fetch all invoices or grouped invoices.
**Response:** Returns invoices grouped by `dateGroup`.

---

## Socket Events

* **`invoice:duplicated`** – Emits the duplicated invoice grouped by date.
* **`recentActivity:created`** – Emits a newly created activity log.

These events enable real-time updates for the frontend.

---

## Folder Structure

```
backend/
├─ src/
│  ├─ models/           # Mongoose models
│  ├─ routes/           # Express routes
│  ├─ utils/            # Helper functions (Firebase verification, etc.)
│  └─ server.ts         # Entry point
├─ package.json
├─ tsconfig.json
└─ .env.example
```

---

## Deployment

* **Render:** Backend hosted on Render, exposing APIs for frontend consumption.
* **MongoDB Atlas:** Used as cloud database, ensure your Render IP is whitelisted.

---

## Assumptions

* Only authenticated users can access invoice duplication.
* Frontend handles pagination and grouping display logic.
* Duplicate invoice uses today’s date for grouping.

---

## Author

**Damilare Olasoju**
**Email: olasojudamilare6@gmail.com**