import React from 'react';

const Blog = () => {
  return (
    <main>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Blog</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="home-blog-area pt-10 pb-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9 col-sm-10">
              <div className="section-tittle text-center mb-100">
                <h2>From Blog</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="/assets/img/gallery/blog1.png" alt="blog1" />
                  </div>
                  <div className="blog-cap">
                    <span>Gym &amp; Fitness</span>
                    <h3>Your Antibiotic One Day To 10 Day Options</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="/assets/img/gallery/blog2.png" alt="blog2" />
                  </div>
                  <div className="blog-cap">
                    <span>Gym &amp; Fitness</span>
                    <h3>Your Antibiotic One Day To 10 Day Options</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
