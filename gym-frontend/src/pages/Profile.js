import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Profile = () => {
  const { user, changePassword } = useAuth();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('password');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/orders/my`);
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    setSubmitting(true);
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setSuccess('Password updated successfully');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to change password';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#5BE38C';
      case 'processing':
        return '#FFC857';
      case 'cancelled':
        return '#FF6B6B';
      default:
        return '#7a7a7a';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#5BE38C';
      case 'failed':
        return '#FF6B6B';
      default:
        return '#FFC857';
    }
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const parts = user.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  };

  const profileStats = [
    { label: 'Role', value: user?.role || 'user' },
    { label: 'Orders', value: orders.length },
    { label: 'Member since', value: user ? new Date(user.createdAt || user?.date || Date.now()).getFullYear() : '—' }
  ];

  const tabButtonStyle = (tab) => ({
    background: activeTab === tab ? '#e31e25' : 'transparent',
    border: '1px solid #333',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '999px',
    marginRight: '10px',
    cursor: 'pointer',
    textTransform: 'capitalize',
    transition: 'all .2s ease'
  });

  return (
    <main className="contact-section" style={{ paddingTop: '140px' }}>
      <div className="container">
        <div
          style={{
            background: '#050505',
            border: '1px solid #1f1f1f',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              borderBottom: '1px solid #1f1f1f',
              paddingBottom: '25px',
              marginBottom: '30px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #e31e25, #821313)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#fff',
                  textTransform: 'uppercase'
                }}
              >
                {getUserInitials()}
              </div>
              <div>
                <p style={{ color: '#7a7a7a', margin: 0, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '12px' }}>
                  Logged in as
                </p>
                <h2 style={{ color: '#fff', marginBottom: '5px' }}>{user?.name}</h2>
                <p style={{ color: '#bbb', margin: 0 }}>
                  {user?.email} • <span style={{ textTransform: 'capitalize' }}>{user?.role}</span>
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              {profileStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    minWidth: '140px',
                    padding: '12px 18px',
                    borderRadius: '16px',
                    background: '#0f0f0f',
                    border: '1px solid #1f1f1f'
                  }}
                >
                  <p style={{ color: '#7a7a7a', margin: 0, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {stat.label}
                  </p>
                  <p style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: 600 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('password')} style={tabButtonStyle('password')}>
              Security
            </button>
            <button onClick={() => setActiveTab('orders')} style={tabButtonStyle('orders')}>
              Orders
            </button>
          </div>

          {activeTab === 'password' && (
            <div
              style={{
                background: '#0b0b0b',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid #1f1f1f',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <h3 style={{ color: '#fff', marginBottom: '20px' }}>Change Password</h3>
              {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
              {success && <p style={{ color: '#5BE38C' }}>{success}</p>}
              <form className="form-contact" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={{ color: '#ccc', marginBottom: '5px' }}>Current password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="currentPassword"
                    placeholder="••••••••"
                    value={form.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#ccc', marginBottom: '5px' }}>New password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="newPassword"
                    placeholder="••••••••"
                    value={form.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#ccc', marginBottom: '5px' }}>Confirm new password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="button button-contactForm boxed-btn" disabled={submitting}>
                    {submitting ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div
              style={{
                background: '#0b0b0b',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid #1f1f1f'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <h3 style={{ color: '#fff', marginBottom: '15px' }}>Order History</h3>
                <p style={{ color: '#7a7a7a', marginBottom: '15px' }}>
                  {loadingOrders ? 'Syncing orders...' : `${orders.length} order${orders.length === 1 ? '' : 's'}`}
                </p>
              </div>
              {loadingOrders ? (
                <p style={{ color: '#fff' }}>Loading orders...</p>
              ) : orders.length === 0 ? (
                <div
                  style={{
                    border: '1px dashed #2a2a2a',
                    borderRadius: '16px',
                    padding: '40px',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ color: '#fff', marginBottom: '10px', fontSize: '18px' }}>You have no orders yet</p>
                  <p style={{ color: '#7a7a7a', marginBottom: '20px' }}>
                    Explore our shop and training plans to place your first order.
                  </p>
                  <a href="/shop" className="border-btn border-btn2">
                    Browse Products
                  </a>
                </div>
              ) : (
                <div className="table-responsive">
                  <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1f1f1f', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '15px', textAlign: 'left', color: '#7a7a7a', fontSize: '12px' }}>Order</th>
                        <th style={{ padding: '15px', textAlign: 'left', color: '#7a7a7a', fontSize: '12px' }}>Items</th>
                        <th style={{ padding: '15px', textAlign: 'left', color: '#7a7a7a', fontSize: '12px' }}>Total</th>
                        <th style={{ padding: '15px', textAlign: 'left', color: '#7a7a7a', fontSize: '12px' }}>Payment</th>
                        <th style={{ padding: '15px', textAlign: 'left', color: '#7a7a7a', fontSize: '12px' }}>Status</th>
                        <th style={{ padding: '15px', textAlign: 'left', color: '#7a7a7a', fontSize: '12px' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                          <td style={{ padding: '15px', fontWeight: 600, letterSpacing: '0.5px' }}>
                            #{order._id.slice(-8).toUpperCase()}
                          </td>
                          <td style={{ padding: '15px', fontSize: '13px', color: '#ccc' }}>
                            {order.items.map((item, idx) => (
                              <div key={idx} style={{ marginBottom: '4px' }}>
                                {item.name} <span style={{ color: '#555' }}>×{item.quantity}</span>
                              </div>
                            ))}
                          </td>
                          <td style={{ padding: '15px', fontWeight: 600 }}>${order.totalAmount.toFixed(2)}</td>
                          <td style={{ padding: '15px' }}>
                            <span style={{ color: getPaymentStatusColor(order.paymentStatus), fontWeight: 600 }}>
                              {order.paymentStatus.toUpperCase()}
                            </span>
                            <br />
                            <span style={{ fontSize: '12px', color: '#7a7a7a' }}>{order.paymentMethod}</span>
                          </td>
                          <td style={{ padding: '15px' }}>
                            <span
                              style={{
                                color: getStatusColor(order.status),
                                background: 'rgba(255,255,255,0.05)',
                                padding: '6px 12px',
                                borderRadius: '999px',
                                fontSize: '12px',
                                fontWeight: 600,
                                letterSpacing: '1px'
                              }}
                            >
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: '15px', fontSize: '12px', color: '#bbb' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
