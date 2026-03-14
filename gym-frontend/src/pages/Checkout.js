import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const Checkout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    shippingAddress: '',
    paymentMethod: 'COD',
    cardNumber: '',
    cardCvv: '',
    cardExpiry: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successModal, setSuccessModal] = useState({
    open: false,
    title: '',
    message: ''
  });

  const normalizeCart = (items) =>
    items.map((item) => ({
      ...item,
      itemType: item.itemType || 'product'
    }));

  const loadCart = useCallback(() => {
    const savedCart = localStorage.getItem('gym_cart');
    if (savedCart) {
      try {
        setCart(normalizeCart(JSON.parse(savedCart)));
      } catch (error) {
        console.error('Failed to parse cart', error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: '/checkout' } });
      return;
    }
    loadCart();
  }, [isAuthenticated, navigate, loadCart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (form.paymentMethod === 'TEST_CARD') {
      if (!form.cardNumber || !form.cardCvv || !form.cardExpiry) {
        setError('Please fill in all card details');
        setSubmitting(false);
        return;
      }
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          itemType: item.itemType || 'product',
          itemRef: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotal(),
        paymentMethod: form.paymentMethod,
        shippingAddress: form.shippingAddress,
        ...(form.paymentMethod === 'TEST_CARD' && {
          cardNumber: form.cardNumber,
          cardCvv: form.cardCvv,
          cardExpiry: form.cardExpiry
        })
      };

      await axios.post(`${API_BASE_URL}/orders`, orderData);

      localStorage.removeItem('gym_cart');
      setCart([]);
      setForm({
        shippingAddress: '',
        paymentMethod: 'COD',
        cardNumber: '',
        cardCvv: '',
        cardExpiry: ''
      });
      setSuccessModal({
        open: true,
        title: 'Order placed successfully!',
        message: 'We will contact you shortly with payment details and next steps.'
      });
      
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to place order';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const isCartEmpty = cart.length === 0;

  const renderItemMeta = (item) => {
    if (item.itemType === 'course' && item.courseMeta) {
      return (
        <p style={{ color: '#bbb', margin: '2px 0', fontSize: '12px' }}>
          {item.courseMeta.durationMonths} months · ${item.courseMeta.pricePerMonth}/month · {item.courseMeta.level}
        </p>
      );
    }
    return null;
  };

  return (
    <>
      <main className="contact-section" style={{ paddingTop: '140px' }}>
        <div className="container">
          {isCartEmpty ? (
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="contact-title">Checkout</h2>
                <p style={{ color: '#fff', marginBottom: '20px' }}>
                  Your cart is empty. Add items from the shop or choose a training plan to continue.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                  <a href="/shop" className="border-btn">
                    Go to Shop
                  </a>
                  <a href="/pricing" className="border-btn border-btn2">
                    View Courses
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <h2 className="contact-title">Checkout</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form className="form-contact" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label style={{ color: '#fff', marginBottom: '5px' }}>Shipping Address</label>
                    <textarea
                      className="form-control"
                      name="shippingAddress"
                      placeholder="Enter your shipping address"
                      value={form.shippingAddress}
                      onChange={handleChange}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ color: '#fff', marginBottom: '5px' }}>Payment Method</label>
                    <select
                      className="form-control"
                      name="paymentMethod"
                      value={form.paymentMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="COD">Cash on Delivery</option>
                      <option value="TEST_CARD">Test Card (4242424242424242)</option>
                    </select>
                  </div>

                  {form.paymentMethod === 'TEST_CARD' && (
                    <>
                      <div className="form-group">
                        <label style={{ color: '#fff', marginBottom: '5px' }}>Card Number</label>
                        <input
                          className="form-control"
                          type="text"
                          name="cardNumber"
                          placeholder="4242424242424242"
                          value={form.cardNumber}
                          onChange={handleChange}
                          maxLength="16"
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: '#fff', marginBottom: '5px' }}>CVV</label>
                            <input
                              className="form-control"
                              type="text"
                              name="cardCvv"
                              placeholder="123"
                              value={form.cardCvv}
                              onChange={handleChange}
                              maxLength="4"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: '#fff', marginBottom: '5px' }}>Expiry (MM/YY)</label>
                            <input
                              className="form-control"
                              type="text"
                              name="cardExpiry"
                              placeholder="12/25"
                              value={form.cardExpiry}
                              onChange={handleChange}
                              maxLength="5"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-group mt-3">
                    <button type="submit" className="button button-contactForm boxed-btn" disabled={submitting}>
                      {submitting ? 'Processing...' : `Place Order - $${getTotal().toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-lg-4">
                <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #e31e25' }}>
                  <h3 style={{ color: '#fff', marginBottom: '20px' }}>Order Summary</h3>
                  {cart.map((item) => (
                    <div key={`${item.itemType}-${item._id}`} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #333' }}>
                      <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                      {renderItemMeta(item)}
                      <p style={{ color: '#999', margin: '5px 0', fontSize: '14px' }}>
                        Qty: {item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #e31e25' }}>
                    <p style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                      Total: ${getTotal().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {successModal.open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#0b0b0b',
              border: '1px solid #e31e25',
              borderRadius: '10px',
              padding: '30px',
              maxWidth: '420px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
            }}
          >
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>{successModal.title}</h3>
            <p style={{ color: '#ccc', marginBottom: '25px' }}>{successModal.message}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="border-btn border-btn2"
                onClick={() => {
                  setSuccessModal({ open: false, title: '', message: '' });
                  navigate('/profile');
                }}
                style={{ minWidth: '150px' }}
              >
                View My Orders
              </button>
              <button
                type="button"
                className="border-btn"
                onClick={() => setSuccessModal({ open: false, title: '', message: '' })}
                style={{ minWidth: '120px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;

