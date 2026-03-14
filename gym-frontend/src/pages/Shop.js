import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const normalizeCart = (items) =>
    items.map((item) => ({
      ...item,
      itemType: item.itemType || 'product'
    }));

  const loadCart = useCallback(() => {
    const savedCart = localStorage.getItem('gym_cart');
    if (savedCart) {
      setCart(normalizeCart(JSON.parse(savedCart)));
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, [fetchProducts, loadCart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1, itemType: 'product' }];
    }

    const normalized = normalizeCart(updatedCart);
    setCart(normalized);
    localStorage.setItem('gym_cart', JSON.stringify(normalized));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    const normalized = normalizeCart(updatedCart);
    setCart(normalized);
    localStorage.setItem('gym_cart', JSON.stringify(normalized));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    const normalized = normalizeCart(updatedCart);
    setCart(normalized);
    localStorage.setItem('gym_cart', JSON.stringify(normalized));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: '/shop' } });
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <main>
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70">
                    <h2>Shop</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center" style={{ padding: '100px 0', color: '#fff' }}>
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Shop</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pricing-area section-padding40 fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-tittle text-center mb-55">
                <h2>Gym Products & Supplements</h2>
              </div>
            </div>
          </div>
          {error && (
            <div className="row">
              <div className="col-12 text-center mb-4">
                <p style={{ color: '#e31e25' }}>{error}</p>
              </div>
            </div>
          )}
          {products.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center">
                <p style={{ color: '#fff' }}>No products available at the moment.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="row">
                {products.map((product) => {
                  const cartItem = cart.find((item) => item._id === product._id);
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={product._id}>
                      <div className="properties mb-30">
                        <div className="properties__card">
                          {product.imageUrl && (
                            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                              />
                            </div>
                          )}
                          <div className="properties__caption">
                            <h4 style={{ color: '#fff', marginBottom: '10px' }}>{product.name}</h4>
                            {product.category && (
                              <p style={{ color: '#999', fontSize: '12px', marginBottom: '10px' }}>
                                {product.category}
                              </p>
                            )}
                            {product.description && (
                              <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '15px' }}>
                                {product.description}
                              </p>
                            )}
                            <div style={{ marginBottom: '15px' }}>
                              <p style={{ color: '#e31e25', fontSize: '20px', fontWeight: 'bold' }}>
                                ${product.price}
                              </p>
                              {product.stock !== undefined && (
                                <p style={{ color: product.stock > 0 ? '#0f0' : '#f00', fontSize: '12px' }}>
                                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                                </p>
                              )}
                            </div>
                            {cartItem ? (
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <button
                                  onClick={() => updateQuantity(product._id, cartItem.quantity - 1)}
                                  className="border-btn"
                                  style={{ minWidth: '30px', padding: '5px' }}
                                >
                                  -
                                </button>
                                <span style={{ color: '#fff', minWidth: '30px', textAlign: 'center' }}>
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(product._id, cartItem.quantity + 1)}
                                  className="border-btn"
                                  style={{ minWidth: '30px', padding: '5px' }}
                                  disabled={product.stock !== undefined && cartItem.quantity >= product.stock}
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => removeFromCart(product._id)}
                                  className="border-btn"
                                  style={{ marginLeft: '10px', padding: '5px 10px' }}
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(product)}
                                className="border-btn border-btn2"
                                disabled={product.stock !== undefined && product.stock === 0}
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {cart.length > 0 && (
                <div className="row mt-5">
                  <div className="col-12">
                    <div
                      style={{
                        background: '#1a1a1a',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #e31e25',
                        position: 'sticky',
                        bottom: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ color: '#fff', margin: 0 }}>
                            Cart: {cart.length} item{cart.length > 1 ? 's' : ''} | Total: ${getCartTotal().toFixed(2)}
                          </p>
                        </div>
                        <button onClick={handleCheckout} className="border-btn border-btn2">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Shop;

