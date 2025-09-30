# YouVerify Assessment - Invoice App Frontend

## Overview

This is the frontend for the **Invoice App** assessment project. It is built using **Nuxt 4 and Vue 3**, with **Tailwind CSS** for styling, **Firebase** for authentication, and **Socket.IO** for real-time updates.

## The app allows users to:
	•	Log in / Sign up using Firebase authentication.
	•	View recent invoices grouped by date.
	•	Duplicate invoices and see real-time updates in both the modal and main dashboard.
	•	View recent activities associated with actions like invoice duplication.
	•	See their profile initials in the profile bar and log out.

⸻

## Features
	•	User Authentication
	•	Sign up, log in, and log out functionality using Firebase.
	•	User initials displayed in the profile bar.
	•	Invoice Management
	•	Fetch recent invoices from the backend.
	•	Duplicate invoices from the modal dropdown.
	•	Duplicated invoices are grouped under the date they were duplicated.
	•	Real-time Updates
	•	Modal updates instantly to show activity carried out (e.g., invoice duplication).
	•	Recent invoices and activities update on the main page in real time.
	•	Responsive UI
	•	Works across desktop and mobile devices.
	•	Testing
	•	Unit and integration tests using Vitest and @vue/test-utils.

⸻

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

3. Create a `.env` file in `frontend/`:

NUXT_PUBLIC_API_BASE_URL=https://your-backend-url/api
NUXT_PUBLIC_LOCALHOST_API_BASE_URL=http://localhost:4000/api


⸻

## Running the App

1. Development

```bash
npm run dev
```

The app will be available at http://localhost:3000.

2. Build & Preview

```bash
npm run build
npm run preview
```

⸻

## Testing

Run all tests:

```bash
npm run test
```

**Tests cover critical components and UI behavior.**

⸻

Real-time Invoice Duplication Flow
	1.	Open an invoice modal.
	2.	Click the “More” button on an invoice.
	3.	Select Duplicate from the dropdown.
	4.	Modal Updates:
	•	A recent activity for the duplication appears instantly.
	5.	Main Dashboard Updates:
	•	Recent invoices update to include the duplicated invoice, grouped under the date it was duplicated.
	•	Recent activities list updates to show the action carried out.

⸻

Profile & Logout
	•	Profile bar shows user initials.
	•	Click on the profile bar to log out.

⸻

## Project Structure

frontend/
├─ components/       # Reusable Vue components
├─ pages/            # Nuxt pages
├─ composables/      # Vue composables
├─ plugins/          # Plugins (e.g., Firebase, Socket.IO)
├─ tests/            # Component/unit tests
├─ assets/           # Static assets
├─ nuxt.config.ts    # Nuxt configuration
├─ package.json      # NPM dependencies & scripts
└─ README.md


⸻

## Notes
	•	Ensure the backend API URL (NUXT_PUBLIC_API_BASE_URL) is accessible.
	•	When testing locally, fallback to NUXT_PUBLIC_LOCALHOST_API_BASE_URL.
	•	The app is designed to always show the latest 5 invoices on the dashboard, but duplications are updated in real time.

## Author

**Damilare Olasoju**
**Email: olasojudamilare6@gmail.com**