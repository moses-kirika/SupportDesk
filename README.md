# SupportDesk KE

**SupportDesk KE** is a premium, localized IT Service Management (ITSM) portal designed specifically for the Kenyan corporate landscape. It provides enterprise-grade ticket management, client oversight, and team collaboration tools with a native feel.

## ✨ Key Features
- **IT-Themed Dashboard**: Live metrics for uptime, tickets, and active nodes.
- **Enterprise Ticketing**: Fully dynamic ticket lifecycle with localized Kenyan IT context.
- **Organisation Registry**: Manage premium clients like Nexus Telcom, Savannah Capital, and Rift Holdings.
- **Support Team CRUD**: Full administrative control over team members and roles.
- **Synced Persistence**: Global state managed via React Context and `localStorage`.

## 🚀 Getting Started

### Development
1. Clone the repository.
2. Navigate to the frontend directory: `cd frontend`.
3. Install dependencies: `npm install`.
4. Start the dev server: `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000).

### Authentication
Username/identity is managed via **AuthContext**. The app facilitates a mock-but-persistent sign-up/login flow that personalizes the experience (e.g., "Jambo, Moses!").

## 📂 Project Structure
- `/src/app`: Pages for Tickets, Organisations, Support Team, Help, and Dashboard.
- `/src/context`: Global state providers for all business entities.
- `/src/components`: UI building blocks (Sidebar, Navbar, Message Bubbles).

---
**Build with ❤️ for the Kenyan IT Community.**

