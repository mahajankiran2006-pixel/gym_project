import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (course) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/pricing', { state: { selectedCourse: course } });
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
                    <h2>Courses</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center" style={{ padding: '100px 0', color: '#fff' }}>
          <p>Loading courses...</p>
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
                  <h2>Courses</h2>
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
                <h2>Available Courses</h2>
                <p style={{ color: '#999', marginTop: '10px' }}>
                  Choose the training plan that fits your goals and budget.
                </p>
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
          {courses.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center">
                <p style={{ color: '#fff' }}>No courses available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {courses.map((course) => (
                <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={course._id}>
                  <div className="properties mb-30">
                    <div className="properties__card">
                      {course.imageUrl && (
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        </div>
                      )}
                      <div className="properties__caption">
                        <h4 style={{ color: '#fff', marginBottom: '10px' }}>{course.title}</h4>
                        <p style={{ color: '#ccc', fontSize: '14px', minHeight: '60px' }}>
                          {course.description || 'Professional training course'}
                        </p>
                        <div style={{ margin: '15px 0' }}>
                          <p style={{ color: '#e31e25', fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
                            ${course.pricePerMonth}/month
                          </p>
                          <p style={{ color: '#999', fontSize: '13px', marginBottom: '2px' }}>
                            Duration: {course.durationMonths} months
                          </p>
                          <p style={{ color: '#999', fontSize: '13px', textTransform: 'capitalize' }}>
                            Level: {course.level}
                          </p>
                        </div>
                        {course.features && course.features.length > 0 && (
                          <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {course.features.slice(0, 4).map((feature, idx) => (
                              <span
                                key={idx}
                                style={{
                                  border: '1px solid #333',
                                  borderRadius: '999px',
                                  padding: '4px 10px',
                                  fontSize: '12px',
                                  color: '#ccc'
                                }}
                              >
                                {feature}
                              </span>
                            ))}
                            {course.features.length > 4 && (
                              <span style={{ fontSize: '12px', color: '#bbb' }}>+{course.features.length - 4} more</span>
                            )}
                          </div>
                        )}
                        <button
                          onClick={() => handleEnroll(course)}
                          className="border-btn border-btn2"
                        >
                          {isAuthenticated ? 'Proceed to Enrollment' : 'Login to Enroll'}
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

export default Courses;
