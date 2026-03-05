import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      const returnTo = location.state?.returnTo || '/';
      navigate(returnTo);
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-section" style={{ paddingTop: '140px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="contact-title">Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form-contact" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <button type="submit" className="button button-contactForm boxed-btn" disabled={submitting}>
                  {submitting ? 'Logging in...' : 'Login'}
                </button>
              </div>
              <p style={{ marginTop: '10px' }}>
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
