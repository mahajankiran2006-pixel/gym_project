import React from 'react';

const Home = () => {
  return (
    <main>
      {/* slider Area Start*/}
      <div className="slider-area position-relative">
        <div className="slider-active">
          <div className="single-slider slider-height d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-10">
                  <div className="hero__caption">
                    <span data-animation="fadeInLeft" data-delay="0.1s">
                      Hi This is Zacson
                    </span>
                    <h1 data-animation="fadeInLeft" data-delay="0.4s">
                      Gym Trainer
                    </h1>
                    <a
                      href="/courses"
                      className="border-btn hero-btn"
                      data-animation="fadeInLeft"
                      data-delay="0.8s"
                    >
                      My Courses
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* slider Area End*/}

      {/* Traning categories Start */}
      <section className="traning-categories black-bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="single-topic text-center mb-30">
                <div className="topic-img">
                  <img src="/assets/img/gallery/cat1.png" alt="Personal training" />
                  <div className="topic-content-box">
                    <div className="topic-content">
                      <h3>Personal traning</h3>
                      <p>
                        You’ll look at graphs and charts in Task One, how to approach the
                        task and the language needed for a successful answer.
                      </p>
                      <a href="/courses" className="border-btn">
                        View Courses
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="single-topic text-center mb-30">
                <div className="topic-img">
                  <img src="/assets/img/gallery/cat2.png" alt="Group training" />
                  <div className="topic-content-box">
                    <div className="topic-content">
                      <h3>Group traning</h3>
                      <p>
                        You’ll look at graphs and charts in Task One, how to approach the
                        task and the language needed for a successful answer.
                      </p>
                      <a href="/courses" className="btn">
                        View Courses
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Traning categories End*/}

      {/* Team / What I Offer */}
      <section className="team-area fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-tittle text-center mb-55 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                <h2>What I Offer</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div
                className="single-cat text-center mb-30 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".2s"
              >
                <div className="cat-icon">
                  <img src="/assets/img/gallery/team1.png" alt="Body Building" />
                </div>
                <div className="cat-cap">
                  <h5>
                    <a href="/services">Body Building</a>
                  </h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="single-cat text-center mb-30 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              >
                <div className="cat-icon">
                  <img src="/assets/img/gallery/team2.png" alt="Muscle Gain" />
                </div>
                <div className="cat-cap">
                  <h5>
                    <a href="/services">Muscle Gain</a>
                  </h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="single-cat text-center mb-30 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".6s"
              >
                <div className="cat-icon">
                  <img src="/assets/img/gallery/team3.png" alt="Weight Loss" />
                </div>
                <div className="cat-cap">
                  <h5>
                    <a href="/services">Weight Loss</a>
                  </h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Area Start */}
      <div className="gallery-area section-padding30">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div className="box snake mb-30">
                <div
                  className="gallery-img big-img"
                  style={{ backgroundImage: 'url(/assets/img/gallery/gallery1.png)' }}
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
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div className="box snake mb-30">
                <div
                  className="gallery-img big-img"
                  style={{ backgroundImage: 'url(/assets/img/gallery/gallery2.png)' }}
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
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div className="box snake mb-30">
                <div
                  className="gallery-img big-img"
                  style={{ backgroundImage: 'url(/assets/img/gallery/gallery3.png)' }}
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
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="box snake mb-30">
                <div
                  className="gallery-img big-img"
                  style={{ backgroundImage: 'url(/assets/img/gallery/gallery4.png)' }}
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
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="box snake mb-30">
                <div
                  className="gallery-img big-img"
                  style={{ backgroundImage: 'url(/assets/img/gallery/gallery5.png)' }}
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <div className="box snake mb-30">
                <div
                  className="gallery-img big-img"
                  style={{ backgroundImage: 'url(/assets/img/gallery/gallery6.png)' }}
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
          </div>
        </div>
      </div>

      {/* Pricing / Courses area start */}
      <section className="pricing-area section-padding40 fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-tittle text-center mb-55 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".1s">
                <h2>Pricing</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {[0, 1, 2].map((card) => (
              <div className="col-lg-4 col-md-6 col-sm-6" key={card}>
                <div className="properties mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay={`.${card + 2}s`}>
                  <div className="properties__card">
                    <div className="about-icon">
                      <img src="/assets/img/icon/price.svg" alt="price icon" />
                    </div>
                    <div className="properties__caption">
                      <span className="month">6 month</span>
                      <p className="mb-25">
                        $30/m <span>(Single class)</span>
                      </p>
                      {[0, 1, 2, 3, 4].map((feature) => (
                        <div className={`single-features${feature === 4 ? ' mb-20' : ''}`} key={feature}>
                          <div className="features-icon">
                            <img src="/assets/img/icon/check.svg" alt="check" />
                          </div>
                          <div className="features-caption">
                            <p>
                              {feature === 0 && 'Free riding '}
                              {feature === 1 && 'Unlimited equipments'}
                              {feature === 2 && 'Personal trainer'}
                              {feature === 3 && 'Weight losing classes'}
                              {feature === 4 && 'Month to mouth'}
                            </p>
                          </div>
                        </div>
                      ))}
                      <a href="/pricing" className="border-btn border-btn2">
                        Join Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Area-2 Start */}
      <section className="about-area2 fix pb-padding pt-50 pb-80">
        <div className="support-wrapper align-items-center">
          <div className="right-content2">
            <div className="right-img wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
              <img src="/assets/img/gallery/about.png" alt="About" />
            </div>
          </div>
          <div className="left-content2">
            <div className="section-tittle2 mb-20 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
              <div className="front-text">
                <h2 className="">About Me</h2>
                <p>
                  You’ll look at graphs and charts in Task One, how to approach the task and the language needed for a
                  successful answer. You’ll examine Task Two questions and learn how to plan, write and check academic
                  essays.
                </p>
                <p className="mb-40">
                  Task One, how to approach the task and the language needed for a successful answer. You’ll examine
                  Task Two questions and learn how to plan, write and check academic essays.
                </p>
                <a href="/courses" className="border-btn">
                  My Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Area Start */}
      <section className="home-blog-area pt-10 pb-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9 col-sm-10">
              <div className="section-tittle text-center mb-100 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
                <h2>From Blog</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="/assets/img/gallery/blog1.png" alt="blog 1" />
                  </div>
                  <div className="blog-cap">
                    <span>Gym &amp; Fitness</span>
                    <h3>
                      <a href="/blog/1">Your Antibiotic One Day To 10 Day Options</a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".6s">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="/assets/img/gallery/blog2.png" alt="blog 2" />
                  </div>
                  <div className="blog-cap">
                    <span>Gym &amp; Fitness</span>
                    <h3>
                      <a href="/blog/2">Your Antibiotic One Day To 10 Day Options</a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* services-area */}
      <section className="services-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                <div className="features-icon">
                  <img src="/assets/img/icon/icon1.svg" alt="location" />
                </div>
                <div className="features-caption">
                  <h3>Location</h3>
                  <p>You’ll look at graphs and charts in Task One, how to approach</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                <div className="features-icon">
                  <img src="/assets/img/icon/icon2.svg" alt="phone" />
                </div>
                <div className="features-caption">
                  <h3>Phone</h3>
                  <p>(90) 277 278 2566</p>
                  <p>(78) 267 256 2578</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-40 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
                <div className="features-icon">
                  <img src="/assets/img/icon/icon3.svg" alt="email" />
                </div>
                <div className="features-caption">
                  <h3>Email</h3>
                  <p>jacson767@gmail.com</p>
                  <p>contact56@zacsion.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
