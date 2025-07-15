import React, { useState, useEffect } from 'react';

const UserSection = ({ apiUrl }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiUrl}/users`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please enter both name and email');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setFormData({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      alert('Error creating user: ' + err.message);
      console.error('Error creating user:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      fetchUsers();
    } catch (err) {
      alert('Error deleting user: ' + err.message);
      console.error('Error deleting user:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [apiUrl]);

  return (
    <div className="section">
      <h2>Users</h2>
      
      <form onSubmit={createUser} className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Enter user name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={submitting}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter user email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add User'}
        </button>
      </form>

      {loading && <div className="loading">Loading users...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      {!loading && !error && (
        <div>
          {users.length === 0 ? (
            <div className="empty-state">No users yet</div>
          ) : (
            users.map(user => (
              <div key={user.id} className="list-item">
                <div className="content">
                  <strong>{user.name}</strong> ({user.email})
                </div>
                <button 
                  onClick={() => deleteUser(user.id)} 
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

export default UserSection;
