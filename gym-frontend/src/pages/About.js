import React from 'react';
import getAssetPath from '../utils/assetPath';

const About = () => {
  return (
    <main>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>About Me</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="team-area pt-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-cat text-center mb-30">
                <div className="cat-icon">
                  <img src={getAssetPath("/assets/img/gallery/team1.png")} alt="Body Building" />
                </div>
                <div className="cat-cap">
                  <h5>Body Building</h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-cat text-center mb-30">
                <div className="cat-icon">
                  <img src={getAssetPath("/assets/img/gallery/team2.png")} alt="Muscle Gain" />
                </div>
                <div className="cat-cap">
                  <h5>Muscle Gain</h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-cat text-center mb-30">
                <div className="cat-icon">
                  <img src={getAssetPath("/assets/img/gallery/team3.png")} alt="Weight Loss" />
                </div>
                <div className="cat-cap">
                  <h5>Weight Loss</h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-area2 fix pb-padding pt-50 pb-80">
        <div className="support-wrapper align-items-center">
          <div className="right-content2">
            <div className="right-img">
              <img src={getAssetPath("/assets/img/gallery/about.png")} alt="About" />
            </div>
          </div>
          <div className="left-content2">
            <div className="section-tittle2 mb-20">
              <div className="front-text">
                <h2>About Me</h2>
                <p>
                  You’ll look at graphs and charts in Task One, how to approach the task and the language
                  needed for a successful answer.
                </p>
                <p className="mb-40">
                  Task One, how to approach the task and the language needed for a successful answer.
                  You’ll examine Task Two questions and learn how to plan, write and check academic essays.
                </p>
                <a href="/courses" className="border-btn">
                  My Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
