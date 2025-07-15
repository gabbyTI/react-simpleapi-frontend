import React, { useState, useEffect } from 'react';
import ServerInfo from './components/ServerInfo';
import UserSection from './components/UserSection';
import MessageSection from './components/MessageSection';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

function App() {
  return (
    <div className="app">
      <h1>API Dashboard</h1>
      
      <ServerInfo apiUrl={API_BASE_URL} />
      <UserSection apiUrl={API_BASE_URL} />
      <MessageSection apiUrl={API_BASE_URL} />
    </div>
  );
}

export default App;
