import React, { useState, useEffect } from 'react';

const MessageSection = ({ apiUrl }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiUrl}/messages`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
      
      // Auto-select first user if available and none selected
      if (data.length > 0 && !selectedUserId) {
        setSelectedUserId(data[0].id);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const createMessage = async (e) => {
    e.preventDefault();
    
    if (!messageContent.trim()) {
      alert('Please enter a message');
      return;
    }

    if (!selectedUserId) {
      alert('Please select a user');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: messageContent.trim(),
          userId: selectedUserId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create message');
      }

      setMessageContent('');
      fetchMessages();
    } catch (err) {
      alert('Error creating message: ' + err.message);
      console.error('Error creating message:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/messages/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      fetchMessages();
    } catch (err) {
      alert('Error deleting message: ' + err.message);
      console.error('Error deleting message:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, [apiUrl]);

  return (
    <div className="section">
      <h2>Messages</h2>
      
      <form onSubmit={createMessage} className="form-group">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          disabled={submitting}
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting || !selectedUserId}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {loading && <div className="loading">Loading messages...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      {!loading && !error && (
        <div>
          {messages.length === 0 ? (
            <div className="empty-state">No messages yet</div>
          ) : (
            messages.map(message => (
              <div key={message.id} className="list-item">
                <div className="content">
                  <strong>{message.timestamp ? new Date(message.timestamp).toLocaleString() : 'Unknown time'}</strong>
                  <br />
                  {message.content}
                </div>
                <button 
                  onClick={() => deleteMessage(message.id)} 
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MessageSection;
