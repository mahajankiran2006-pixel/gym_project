import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getAssetPath from '../utils/assetPath';

const API_BASE_URL = 'http://localhost:5000/api';

const Gallery = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const images = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/trainers`);
      setTrainers(res.data);
    } catch (err) {
      setError('Failed to load trainers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Gallery</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="container text-center" style={{ padding: '80px 0', color: '#fff' }}>
          <p>Loading gallery...</p>
        </div>
      )}

      {!loading && error && (
        <div className="container text-center" style={{ padding: '40px 0', color: '#ff6b6b' }}>
          <p>{error}</p>
        </div>
      )}

      {/* Trainers Section */}
      {trainers.length > 0 && (
        <section className="team-area fix section-padding30">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-tittle text-center mb-55">
                  <h2>Our Trainers</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {trainers.map((trainer) => (
                <div className="col-lg-4 col-md-6" key={trainer._id}>
                  <div className="single-cat text-center mb-30">
                    <div
                      className="cat-icon"
                      style={{
                        width: "100%",
                        height: 240,
                        overflow: "hidden",
                        borderRadius: 8,
                        background: "#0f172a",
                      }}
                    >
                      {trainer.imageUrl ? (
                        <img
                          src={trainer.imageUrl}
                          alt={trainer.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        <img
                          src={getAssetPath("/assets/img/gallery/team1.png")}
                          alt={trainer.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      )}
                    </div>
                    <div className="cat-cap">
                      <h5>{trainer.name}</h5>
                      {trainer.specialty && (
                        <p style={{ color: '#e31e25', fontWeight: 'bold' }}>{trainer.specialty}</p>
                      )}
                      {trainer.bio && <p>{trainer.bio}</p>}
                      {trainer.socialLinks && (
                        <div style={{ marginTop: '15px' }}>
                          {trainer.socialLinks.facebook && (
                            <a href={trainer.socialLinks.facebook} target="_blank" rel="noreferrer" style={{ margin: '0 5px' }}>
                              <i className="fab fa-facebook-f" style={{ color: '#fff' }} />
                            </a>
                          )}
                          {trainer.socialLinks.instagram && (
                            <a href={trainer.socialLinks.instagram} target="_blank" rel="noreferrer" style={{ margin: '0 5px' }}>
                              <i className="fab fa-instagram" style={{ color: '#fff' }} />
                            </a>
                          )}
                          {trainer.socialLinks.twitter && (
                            <a href={trainer.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ margin: '0 5px' }}>
                              <i className="fab fa-twitter" style={{ color: '#fff' }} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery Section */}
      <div className="gallery-area section-padding30">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 mb-4">
              <div className="section-tittle text-center">
                <h2>Workout Gallery</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {images.map((n) => (
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6" key={n}>
                <div className="box snake mb-30">
                  <div
                    className="gallery-img big-img"
                    style={{ backgroundImage: `url(${getAssetPath(`/assets/img/gallery/gallery${n}.png`)})` }}
                  />
                  <div className="overlay">
                    <div className="overlay-content">
                      <h3>Muscle gaining</h3>
                      <a href="/gallery">
                        <i className="ti-plus" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Gallery;
