import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getAssetPath from "../../utils/assetPath";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="header-area header-transparent">
      <div className="main-header header-sticky">
        <div className="container-fluid">
          <div className="menu-wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src={getAssetPath("/assets/img/logo/logo.png")} alt="logo" />
              </Link>
            </div>
            <div className="main-menu f-right d-none d-lg-block">
              <nav>
                <ul id="navigation">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                  )}
                  {!isAuthenticated && (
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li style={{ position: "relative" }}>
                      <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          border: "2px solid #fff",
                          background: "transparent",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        {(user?.name || "U").charAt(0).toUpperCase()}
                      </button>
                      {open && (
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            marginTop: 10,
                            background: "#0b0b0b",
                            border: "1px solid #e31e25",
                            borderRadius: 6,
                            padding: "10px 14px",
                            minWidth: 190,
                            zIndex: 1000,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
                          }}
                        >
                          <p
                            style={{
                              color: "#fff",
                              marginBottom: 10,
                              fontSize: 12,
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                            }}
                          >
                            Signed in as
                            <br />
                            <span style={{ color: "#e31e25" }}>
                              {user?.name}
                            </span>
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              navigate("/profile");
                              setOpen(false);
                            }}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              background: "transparent",
                              border: "none",
                              color: "#fff",
                              padding: "4px 0",
                              cursor: "pointer",
                              fontSize: 13,
                            }}
                          >
                            Profile / Change password
                          </button>
                          <button
                            type="button"
                            onClick={handleLogout}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              background: "transparent",
                              border: "none",
                              color: "#fff",
                              padding: "4px 0",
                              cursor: "pointer",
                              fontSize: 13,
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
