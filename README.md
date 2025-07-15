# React Simple API Frontend

A React frontend application for consuming the nodejs-simpleapi-with-db API.

## Features

- View server health information (auto-refreshes every 30 seconds)
- Create, view, and delete users
- Create, view, and delete messages
- Responsive design with modern UI
- Error handling and loading states

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:3001
```

If not set, the app will use relative URLs assuming the API is served from the same domain.

3. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`.

## API Endpoints

This frontend expects the following API endpoints:

- `GET /health` - Server health information
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `DELETE /users/:id` - Delete a user
- `GET /messages` - Get all messages  
- `POST /messages` - Create a new message
- `DELETE /messages/:id` - Delete a message

## Project Structure

```
src/
├── components/
│   ├── ServerInfo.js     # Server health component
│   ├── UserSection.js    # User management component
│   └── MessageSection.js # Message management component
├── App.js               # Main application component
├── index.js            # React entry point
└── index.css           # Global styles
```

## Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Technologies Used

- React 18
- Create React App
- Modern JavaScript (ES6+)
- CSS3 with Flexbox