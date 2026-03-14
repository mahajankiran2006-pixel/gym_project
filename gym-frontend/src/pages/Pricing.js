import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import getAssetPath from '../utils/assetPath';

const API_BASE_URL = 'http://localhost:5000/api';

const Pricing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCourseFromState = location.state?.selectedCourse;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      setError('Failed to load pricing plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (course) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: '/pricing' } });
      return;
    }

    const courseTotal = course.pricePerMonth * course.durationMonths;
    const checkoutItem = {
      _id: course._id,
      name: course.title,
      price: courseTotal,
      quantity: 1,
      itemType: 'course',
      imageUrl: course.imageUrl,
      courseMeta: {
        durationMonths: course.durationMonths,
        pricePerMonth: course.pricePerMonth,
        level: course.level
      }
    };

    localStorage.setItem('gym_cart', JSON.stringify([checkoutItem]));
    navigate('/checkout', { state: { fromPricing: true } });
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
                    <h2>Pricing</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center" style={{ padding: '100px 0', color: '#fff' }}>
          <p>Loading pricing plans...</p>
        </div>
      </main>
    );
  }

  const displayCourses = selectedCourseFromState
    ? courses.filter((c) => c._id === selectedCourseFromState._id)
    : courses;

  return (
    <main>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Pricing</h2>
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
                <h2>Pricing Plans</h2>
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
          {displayCourses.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center">
                <p style={{ color: '#fff' }}>No pricing plans available.</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {displayCourses.map((course) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={course._id}>
                  <div className="properties mb-30">
                    <div className="properties__card">
                      <div className="about-icon">
                        <img src={getAssetPath("/assets/img/icon/price.svg")} alt="price icon" />
                      </div>
                      <div className="properties__caption">
                        <span className="month">{course.durationMonths} month{course.durationMonths > 1 ? 's' : ''}</span>
                        <p className="mb-25">
                          ${course.pricePerMonth}/m <span>({course.level})</span>
                        </p>
                        {course.features && course.features.length > 0 ? (
                          course.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className={`single-features${idx === course.features.length - 1 ? ' mb-20' : ''}`}
                            >
                              <div className="features-icon">
                                <img src="/assets/img/icon/check.svg" alt="check" />
                              </div>
                              <div className="features-caption">
                                <p>{feature}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="single-features">
                              <div className="features-icon">
                                <img src="/assets/img/icon/check.svg" alt="check" />
                              </div>
                              <div className="features-caption">
                                <p>Free riding</p>
                              </div>
                            </div>
                            <div className="single-features">
                              <div className="features-icon">
                                <img src="/assets/img/icon/check.svg" alt="check" />
                              </div>
                              <div className="features-caption">
                                <p>Unlimited equipments</p>
                              </div>
                            </div>
                            <div className="single-features">
                              <div className="features-icon">
                                <img src="/assets/img/icon/check.svg" alt="check" />
                              </div>
                              <div className="features-caption">
                                <p>Personal trainer</p>
                              </div>
                            </div>
                            <div className="single-features mb-20">
                              <div className="features-icon">
                                <img src="/assets/img/icon/check.svg" alt="check" />
                              </div>
                              <div className="features-caption">
                                <p>Weight losing classes</p>
                              </div>
                            </div>
                          </>
                        )}
                        <div style={{ marginTop: '20px', marginBottom: '15px' }}>
                          <p style={{ color: '#e31e25', fontSize: '20px', fontWeight: 'bold' }}>
                            Total: ${course.pricePerMonth * course.durationMonths}
                          </p>
                        </div>
                        <button
                          onClick={() => handlePurchase(course)}
                          className="border-btn border-btn2"
                        >
                          {isAuthenticated ? 'Purchase Now' : 'Login to Purchase'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Pricing;
