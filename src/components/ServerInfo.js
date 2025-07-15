import React, { useState, useEffect } from 'react';

const ServerInfo = ({ apiUrl }) => {
  const [serverInfo, setServerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServerInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiUrl}/health`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch server info');
      }
      
      const data = await response.json();
      setServerInfo(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching server info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerInfo();
    
    // Refresh server info every 30 seconds
    const interval = setInterval(fetchServerInfo, 30000);
    
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="section">
        <h2>Server Info</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <h2>Server Info</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Server Info</h2>
      <div>
        <p>Status: {serverInfo?.status}</p>
        <p>Hostname: {serverInfo?.hostname}</p>
        <p>Last Updated: {serverInfo?.timestamp ? new Date(serverInfo.timestamp).toLocaleString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default ServerInfo;
