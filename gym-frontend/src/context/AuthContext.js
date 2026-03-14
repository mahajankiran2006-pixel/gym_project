import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('gym_token');
    const storedUser = localStorage.getItem('gym_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const saveAuth = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    localStorage.setItem('gym_token', jwtToken);
    localStorage.setItem('gym_user', JSON.stringify(userData));
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem('gym_token');
    localStorage.removeItem('gym_user');
  };

  const register = async (payload) => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, payload);
    saveAuth(res.data.user, res.data.token);
    return res.data;
  };

  const changePassword = async (payload) => {
    const res = await axios.post(`${API_BASE_URL}/auth/change-password`, payload);
    return res.data;
  };

  const login = async (payload) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, payload);
    saveAuth(res.data.user, res.data.token);
    return res.data;
  };

  const logout = () => {
    clearAuth();
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    changePassword,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
