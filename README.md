# SupportDesk KE

SupportDesk KE is a localized IT Service Management (ITSM) portal for modern corporate support teams. It gives organisations a single place to log, track, assign, and resolve IT support requests while helping service teams oversee clients, workloads, and day-to-day collaboration.

The application pairs a modern web interface with a REST API and multi-tenant data model, making it suitable as a foundation for internal IT help desks and managed-support teams.

## Key features

- **Enterprise ticket management:** Create, categorize, prioritize, assign, update, resolve, and close support tickets.
- **Ticket lifecycle visibility:** Track open, in-progress, waiting, resolved, and closed work with priority levels from low to urgent.
- **Operational dashboard:** Surface key support metrics, ticket activity, uptime indicators, and active infrastructure context.
- **Client and organisation oversight:** Maintain an organisation registry and associate users, tickets, comments, and attachments with the correct client.
- **Support-team administration:** Manage support-team members, roles, and technician assignments.
- **Role-aware foundation:** The backend models administrator, technician, and end-user roles for controlled service workflows.
- **Team collaboration:** Add ticket comments and retain ticket-centred discussions for hand-offs and updates.
- **Attachment-ready tickets:** The data model supports files associated with tickets and their uploaders.
- **Persistent user experience:** The frontend uses React Context and browser storage for its current client-side state and mock authentication flow.
- **Localised context:** The product language and sample organisations are designed around corporate IT support workflows.

## Tech stack

### Frontend

- [Next.js 16](https://nextjs.org/) with React 19 and TypeScript
- Tailwind CSS 4 for styling
- React Hook Form and Zod for form handling and validation
- Axios for HTTP requests
- Recharts for dashboard data visualisation
- Lucide React for interface icons

### Backend

- [NestJS 11](https://nestjs.com/) with TypeScript
- Prisma ORM with a SQLite development database (`backend/dev.db`)
- Passport and JWT packages for the authentication foundation
- `class-validator` and `class-transformer` with NestJS's global validation pipe
- Jest and Supertest for unit and end-to-end test support

## Project structure

```text
SupportDesk/
├── frontend/              # Next.js web application
│   └── src/
│       ├── app/           # Dashboard and feature routes
│       ├── components/    # Shared UI components
│       └── context/       # Client-side application state
├── backend/               # NestJS REST API
│   ├── prisma/            # Prisma schema and database configuration
│   ├── src/               # Modules, controllers, and services
│   └── test/              # End-to-end test configuration
└── README.md
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) 20 LTS or newer
- npm (installed with Node.js)
- Git

SQLite is used for the included development database, so no separate database server is required for the default local setup.

## Setup and installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd SupportDesk
```

### 2. Install dependencies

Install the frontend and backend packages separately:

```bash
cd frontend
npm install
cd ../backend
npm install
```

### 3. Configure the backend environment

Create a local environment file from the supplied example:

```bash
cd backend
copy .env.example .env
```

On macOS or Linux, use:

```bash
cp .env.example .env
```

For the included SQLite development database, set `DATABASE_URL` in `backend/.env` to:

```env
DATABASE_URL="file:../dev.db"
PORT=3001
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="replace-with-a-local-development-secret"
JWT_EXPIRATION="24h"
```

The remaining email and cloud-storage values can stay unset until those integrations are enabled. Never commit real credentials.

### 4. Generate the Prisma client

From `backend`:

```bash
npx prisma generate
```

If you change the schema during development, apply it to the local database with:

```bash
npx prisma db push
```

### 5. Start the backend API

From `backend`:

```bash
npm run start:dev
```

The API starts at [http://localhost:3001](http://localhost:3001).

### 6. Start the frontend

Open a second terminal, then run:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

Run these commands from the relevant application directory.

| Area | Command | Purpose |
| --- | --- | --- |
| Frontend | `npm run dev` | Start the Next.js development server. |
| Frontend | `npm run build` | Create a production frontend build. |
| Frontend | `npm run start` | Serve the production frontend build. |
| Frontend | `npm run lint` | Run frontend linting. |
| Backend | `npm run start:dev` | Start the NestJS API with file watching. |
| Backend | `npm run build` | Compile the backend. |
| Backend | `npm run start:prod` | Run the compiled backend. |
| Backend | `npm run test` | Run backend unit tests. |
| Backend | `npm run test:e2e` | Run backend end-to-end tests. |
| Backend | `npm run test:cov` | Run backend tests with coverage. |

## Authentication and data notes

The frontend currently includes a mock, persistent sign-up/login experience managed through `AuthContext`; it is intended to personalise the interface during local development. The NestJS API includes the packages and data model required for JWT-based authentication, including user roles and organisation ownership. Production deployment should complete the API-backed authentication flow, use a securely managed `JWT_SECRET`, and replace development-only browser persistence where appropriate.

## Roadmap

The following planned work represents **approximately 34 hours** of future development and quality work.

| Planned work | Estimate |
| --- | ---: |
| Connect frontend authentication to the NestJS JWT API; add secure password hashing, refresh/logout handling, and protected routes. | 6 hrs |
| Complete ticket API integration in the interface, including loading, failure, empty, and optimistic-update states. | 5 hrs |
| Add role-based access controls for administrators, technicians, and end users across API endpoints and UI actions. | 4 hrs |
| Build notification delivery for assignment, comments, status changes, and resolution, with SMTP configuration and in-app read states. | 4 hrs |
| Implement secure attachment uploads, file-size/type validation, storage configuration, and download permissions. | 4 hrs |
| Add advanced ticket search, filters, saved views, pagination, and export for support managers. | 3 hrs |
| Improve automated test coverage for authentication, ticket permissions, organisation isolation, and critical frontend workflows. | 4 hrs |
| Accessibility and responsive-design pass: keyboard navigation, contrast, labels, mobile layouts, and screen-reader checks. | 2 hrs |
| Production readiness: environment validation, structured logging, error monitoring hooks, security headers, and deployment documentation. | 2 hrs |

## Contributing

1. Create a branch for your change.
2. Make focused changes and keep secrets out of the repository.
3. Run the relevant lint, build, and test commands before opening a pull request.
4. Describe the problem, implementation, and verification steps in the pull request.

## License

This project is provided under the terms in [LICENSE](LICENSE).
