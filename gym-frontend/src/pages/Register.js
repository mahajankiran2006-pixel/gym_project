import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      await register(form);
      navigate('/');
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed';
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
            <h2 className="contact-title">Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form-contact" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  {submitting ? 'Registering...' : 'Register'}
                </button>
              </div>
              <p style={{ marginTop: '10px' }}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
