import React from 'react';
import { Link } from 'react-router-dom';
import getAssetPath from '../../utils/assetPath';

const Footer = () => {
  return (
    <footer>
      <div className="footer-area black-bg">
        <div className="container">
          <div className="footer-top footer-padding">
            <div className="row">
              <div className="col-xl-12">
                <div className="single-footer-caption mb-50 text-center">
                  <div className="footer-logo">
                    <Link to="/"><img src={getAssetPath("/assets/img/logo/logo2_footer.png")} alt="footer logo" /></Link>
                  </div>
                  <div className="header-area main-header2">
                    <div className="main-header main-header2">
                      <div className="menu-wrapper menu-wrapper2">
                        <div className="main-menu main-menu2 text-center">
                          <nav>
                            <ul>
                              <li><Link to="/">Home</Link></li>
                              <li><Link to="/about">About</Link></li>
                              <li><Link to="/courses">Courses</Link></li>
                              <li><Link to="/pricing">Pricing</Link></li>
                              <li><Link to="/gallery">Gallery</Link></li>
                              <li><Link to="/contact">Contact</Link></li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-social mt-30">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                      <i className="fab fa-pinterest-p" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
