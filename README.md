# ChatAI - Real-time Chat Application

This is a real-time chat application built with Next.js, MongoDB, and Socket.IO. It allows users to send and receive messages in real-time, featuring a responsive interface and future plans for integrating AI-driven.

## Features

- **Real-time communication**: Messages are instantly sent and received via Socket.IO.
- **Message storage**: All messages are stored in MongoDB for persistent chat history.
- **User management**: Basic user system using MongoDB for storing users.
- **Scalable architecture**: Built with Next.js 14, using the new App Router for flexible routing and modular API design.
- **Future plans**:
  - AI-powered translation
  - Voice and video calls

## Project Structure

```bash
next-ChatAI-app/
├── node_modules/           # Dependencies installed via npm/yarn
├── pages/
│   ├── api/                # WebSocket handler using Socket.IO          
├── public/                 # Public assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── login/      # API for user login and authentication
│   │   │   ├── message/    # API for retrieving and sending messages
│   │   │   └── register/   # API for user register
│   │   ├── chat/           # Main chat page
│   │   ├── fonts/          # Font configurations
│   │   ├── lib/            # db and middleware configurations
│   │   ├── login/          # Login page
│   │   ├── models/         # User and Message models
│   │   ├── register/       # Register page
│   │   └── globals.css     # Global CSS for styling
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
└── next.config.js          # Next.js configuration
```
## Key Files
- `src/app/api/login/route.ts`: Handles Socket.IO connections and manages real-time messaging.
- `src/app/api/message/route.ts`: Provides APIs for retrieving and sending chat messages to/from MongoDB.
- `src/app/chat/page.tsx`: Frontend page for the chat interface, handling message rendering and real-time updates.

## Technologies Used

- **Next.js 14**: Modern framework for building web applications.Next.js 14: For server-side rendering, static site generation, and API handling.
- **MongoDB**: NoSQL database for storing messages and user data.
- **Socket.IO**: For real-time bi-directional communication between client and server.
- **TypeScript**: Strongly typed language for better code quality and developer experience.
- **Axios**: For making HTTP requests to the backend API.

## Getting Started
### Prerequisites
Ensure you have the following installed on your machine:

- Node.js (version 14.x or later)
- MongoDB Atlas account for database setup
### Installation
1.Clone the repository:

```bash
git clone https://github.com/your-username/next-chatai-app.git
cd next-chatai-app
```
2.Install dependencies:

```bash
npm install
```
3.Set up environment variables: Create a .env.local file in the root directory with the following values:

```bash
MONGODB_ATLAS_URI=<your-mongodb-connection-string>
JWT_SECRET=<YOUR_JWT_SECRET_STRING>
NODE_ENV=<ENVIRONMENT_STRING>

NEXTAUTH_URL=http://localhost:3000
VERCEL_URL=<YOUR_VERCEL_URL>

GITHUB_CLIENT_ID=<YOUR_GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<YOUR_GITHUB_CLIENT_SECRET>

GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>

TWITTER_CLIENT_ID=<YOUR_TWITTER_CLIENT_ID>
TWITTER_CLIENT_SECRET=<YOUR_TWITTER_CLIENT_SECRET>

NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET>
```
4.Start the development server:

```bash
npm run dev
```
The application will be running on http://localhost:3000.

## API Endpoints
- `GET /api/message?sender=<sender>&receiver=<receiver>`: Retrieve chat messages between two users.
- `POST /api/message`: Send a message between two users. Requires a JSON body with `sender`, `receiver`, and `message` fields.

## WebSocket
- WebSocket connection is handled under the namespace `/api/socket`.
- Clients can send and receive messages in real-time through this connection.

## Deployment
This project is set up to be deployed on `Vercel`. To deploy:

1. Commit your changes and push them to GitHub.
2. Connect your repository to Vercel and deploy automatically.

For backend deployment, MongoDB Atlas is recommended as the database solution.

## Future Enhancements
- AI-powered language translation using ChatGPT.
- Support for voice and video calls via WebRTC.
- Enhanced user authentication and authorization.

## License
This project is licensed under the MIT License.