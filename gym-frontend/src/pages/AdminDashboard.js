import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [products, setProducts] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    durationMonths: 6,
    pricePerMonth: 0,
    features: [],
    level: "beginner",
    imageUrl: "",
    isActive: true,
  });
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
    stock: 0,
    isActive: true,
  });
  const [trainerForm, setTrainerForm] = useState({
    name: "",
    bio: "",
    specialty: "",
    imageUrl: "",
    socialLinks: { facebook: "", instagram: "", twitter: "" },
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchData();
  }, [isAuthenticated, user, navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("gym_token");
      const headers = { Authorization: `Bearer ${token}` };

      console.log(
        "Fetching admin data with token:",
        token ? "Token exists" : "No token"
      );

      const [ordersRes, coursesRes, productsRes, trainersRes, usersRes, contactsRes] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/orders`, { headers }),
          axios.get(`${API_BASE_URL}/courses`),
          axios.get(`${API_BASE_URL}/products`),
          axios.get(`${API_BASE_URL}/trainers`),
          axios.get(`${API_BASE_URL}/auth/users`, { headers }),
          axios.get(`${API_BASE_URL}/contact`, { headers }),
        ]);
      setOrders(ordersRes.data);
      setCourses(coursesRes.data);
      setProducts(productsRes.data);
      setTrainers(trainersRes.data);
      setUsers(usersRes.data);
      setContacts(contactsRes.data);
      setError("");
    } catch (err) {
      console.error("Error fetching admin data:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderUpdate = async (orderId, updates) => {
    try {
      const token = localStorage.getItem("gym_token");
      await axios.put(`${API_BASE_URL}/orders/${orderId}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      alert("Order updated successfully");
    } catch (err) {
      alert("Failed to update order");
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gym_token");
      const headers = { Authorization: `Bearer ${token}` };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/courses/${editingId}`, courseForm, {
          headers,
        });
      } else {
        await axios.post(`${API_BASE_URL}/courses`, courseForm, { headers });
      }
      setCourseForm({
        title: "",
        description: "",
        durationMonths: 6,
        pricePerMonth: 0,
        features: [],
        level: "beginner",
        imageUrl: "",
        isActive: true,
      });
      setEditingId(null);
      fetchData();
      alert("Course saved successfully");
    } catch (err) {
      alert("Failed to save course");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gym_token");
      const headers = { Authorization: `Bearer ${token}` };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/products/${editingId}`, productForm, {
          headers,
        });
      } else {
        await axios.post(`${API_BASE_URL}/products`, productForm, { headers });
      }
      setProductForm({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        category: "",
        stock: 0,
        isActive: true,
      });
      setEditingId(null);
      fetchData();
      alert("Product saved successfully");
    } catch (err) {
      alert("Failed to save product");
    }
  };

  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gym_token");
      const headers = { Authorization: `Bearer ${token}` };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/trainers/${editingId}`, trainerForm, {
          headers,
        });
      } else {
        await axios.post(`${API_BASE_URL}/trainers`, trainerForm, { headers });
      }
      setTrainerForm({
        name: "",
        bio: "",
        specialty: "",
        imageUrl: "",
        socialLinks: { facebook: "", instagram: "", twitter: "" },
        isActive: true,
      });
      setEditingId(null);
      fetchData();
      alert("Trainer saved successfully");
    } catch (err) {
      alert("Failed to save trainer");
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem("gym_token");
      const headers = { Authorization: `Bearer ${token}` };

      if (type === "users") {
        await axios.delete(`${API_BASE_URL}/auth/users/${id}`, { headers });
      } else {
        await axios.delete(`${API_BASE_URL}/${type}/${id}`, { headers });
      }
      fetchData();
      alert("Deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleEdit = (type, item) => {
    setEditingId(item._id);
    if (type === "courses") {
      setCourseForm({ ...item, features: item.features || [] });
    } else if (type === "products") {
      setProductForm(item);
    } else if (type === "trainers") {
      setTrainerForm({
        ...item,
        socialLinks: item.socialLinks || {
          facebook: "",
          instagram: "",
          twitter: "",
        },
      });
    }
  };

  const tabs = [
    { id: "orders", label: "Orders", count: orders.length },
    { id: "users", label: "Active Users", count: users.length },
    { id: "contacts", label: "Contacts", count: contacts.length },
    { id: "courses", label: "Courses", count: courses.length },
    { id: "products", label: "Products", count: products.length },
    { id: "trainers", label: "Trainers", count: trainers.length },
  ];

  const tabButtonStyle = (tabId) => ({
    background:
      activeTab === tabId
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "#1e293b",
    border: "1px solid",
    borderColor: activeTab === tabId ? "#8b5cf6" : "#334155",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "10px",
    marginRight: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    fontWeight: 600,
    textTransform: "capitalize",
    transition: "all .3s ease",
    boxShadow:
      activeTab === tabId ? "0 4px 15px rgba(102, 126, 234, 0.4)" : "none",
  });

  const formCardStyle = {
    background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
    borderRadius: "16px",
    border: "1px solid #334155",
    padding: "28px",
    marginBottom: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  };

  const inputStyle = {
    background: "#1e293b",
    color: "#f1f5f9",
    border: "1px solid #475569",
    borderRadius: "8px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "16px",
  };

  const textareaStyle = {
    background: "#1e293b",
    color: "#f1f5f9",
    border: "1px solid #475569",
    borderRadius: "8px",
    padding: "12px 16px",
    width: "100%",
    resize: "vertical",
    fontSize: "16px",
  };

  const selectStyle = {
    background: "#1e293b",
    color: "#f1f5f9",
    border: "1px solid #475569",
    borderRadius: "8px",
    padding: "12px 16px",
    width: "100%",
    cursor: "pointer",
    fontSize: "16px",
  };

  const dashboardStats = [
    { label: "Total Orders", value: orders.length },
    { label: "Total Users", value: users.length },
    {
      label: "Active Courses",
      value: courses.filter((c) => c.isActive).length,
    },
    { label: "Products", value: products.length },
  ];

  if (loading) {
    return (
      <main className="contact-section" style={{ paddingTop: "140px" }}>
        <div className="container text-center" style={{ color: "#fff" }}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="contact-section"
      style={{ paddingTop: "140px", background: "#0f172a" }}
    >
      <div className="container">
        <div
          style={{
            background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "24px",
            border: "1px solid #334155",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "20px",
              borderBottom: "1px solid #334155",
              paddingBottom: "25px",
              marginBottom: "30px",
            }}
          >
            <div>
              <p
                style={{
                  color: "#8b5cf6",
                  marginBottom: "8px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Admin Control Room
              </p>
              <h2
                style={{
                  color: "#f1f5f9",
                  marginBottom: "5px",
                  fontSize: "32px",
                }}
              >
                Welcome back, {user?.name}
              </h2>
              <p style={{ color: "#94a3b8" }}>
                Manage orders, catalog, and trainers from a single place.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {dashboardStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    minWidth: "150px",
                    padding: "20px",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(145deg, #334155 0%, #1e293b 100%)",
                    border: "1px solid #475569",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  <p
                    style={{
                      color: "#94a3b8",
                      margin: 0,
                      textTransform: "uppercase",
                      fontSize: "11px",
                      letterSpacing: "1px",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      color: "#f1f5f9",
                      margin: 0,
                      fontSize: "28px",
                      fontWeight: 700,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div
              style={{
                border: "1px solid #ef4444",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#fca5a5",
                borderRadius: "12px",
                padding: "12px 18px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={tabButtonStyle(tab.id)}
              >
                {tab.label} <span style={{ opacity: 0.8 }}>({tab.count})</span>
              </button>
            ))}
          </div>

          {activeTab === "orders" && (
            <div
              style={{
                background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
                borderRadius: "16px",
                border: "1px solid #334155",
                padding: "28px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h3 style={{ color: "#f1f5f9", marginBottom: "6px" }}>
                    Orders
                  </h3>
                  <p style={{ color: "#94a3b8", margin: 0 }}>
                    {orders.length} total orders
                  </p>
                </div>
                <p style={{ color: "#64748b", margin: 0, fontSize: "12px" }}>
                  Latest {orders.length} orders
                </p>
              </div>
              <div className="table-responsive">
                <table
                  style={{
                    width: "100%",
                    color: "#f1f5f9",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #334155",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "12px",
                      }}
                    >
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Order
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Customer
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Items
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Total
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Payment
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Status
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        style={{ borderBottom: "1px solid #334155" }}
                      >
                        <td
                          style={{
                            padding: "14px",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            color: "#8b5cf6",
                          }}
                        >
                          #{order._id.slice(-8).toUpperCase()}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <p style={{ margin: 0, color: "#f1f5f9" }}>
                            {order.user?.name || "N/A"}
                          </p>
                          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                            {order.user?.email}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "14px",
                            fontSize: "12px",
                            color: "#cbd5e1",
                          }}
                        >
                          {order.items.map((item, idx) => (
                            <div key={idx}>
                              {item.name}{" "}
                              <span style={{ color: "#64748b" }}>
                                ×{item.quantity}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td
                          style={{
                            padding: "14px",
                            fontWeight: 600,
                            color: "#10b981",
                          }}
                        >
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <select
                            value={order.paymentStatus}
                            onChange={(e) =>
                              handleOrderUpdate(order._id, {
                                paymentStatus: e.target.value,
                              })
                            }
                            style={{
                              background: "#334155",
                              color: "#f1f5f9",
                              borderRadius: "8px",
                              border: "1px solid #475569",
                              padding: "8px 12px",
                              cursor: "pointer",
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                          </select>
                        </td>
                        <td style={{ padding: "14px" }}>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleOrderUpdate(order._id, {
                                status: e.target.value,
                              })
                            }
                            style={{
                              background: "#334155",
                              color: "#f1f5f9",
                              borderRadius: "8px",
                              border: "1px solid #475569",
                              padding: "8px 12px",
                              cursor: "pointer",
                            }}
                          >
                            <option value="new">New</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td
                          style={{
                            padding: "14px",
                            fontSize: "12px",
                            color: "#94a3b8",
                          }}
                        >
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div
              style={{
                background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
                borderRadius: "16px",
                border: "1px solid #334155",
                padding: "28px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h3 style={{ color: "#f1f5f9", marginBottom: "6px" }}>
                    Active Users
                  </h3>
                  <p style={{ color: "#94a3b8", margin: 0 }}>
                    {users.length} total users
                  </p>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  style={{
                    width: "100%",
                    color: "#f1f5f9",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #334155",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "12px",
                      }}
                    >
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Role
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Joined Date
                      </th>
                      <th
                        style={{
                          padding: "14px",
                          textAlign: "left",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        style={{ borderBottom: "1px solid #334155" }}
                      >
                        <td style={{ padding: "14px", color: "#f1f5f9" }}>
                          {user.name}
                        </td>
                        <td style={{ padding: "14px", color: "#cbd5e1" }}>
                          {user.email}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: 600,
                              background:
                                user.role === "admin" ? "#8b5cf6" : "#475569",
                              color: "#fff",
                            }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "14px",
                            fontSize: "12px",
                            color: "#94a3b8",
                          }}
                        >
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <button
                            onClick={() => handleDelete("users", user._id)}
                            className="border-btn"
                            style={{ padding: "5px 10px" }}
                            disabled={user.role === "admin"}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div
              style={{
                background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
                borderRadius: "16px",
                border: "1px solid #334155",
                padding: "28px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h3 style={{ color: "#f1f5f9", marginBottom: "6px" }}>
                    Contacts
                  </h3>
                  <p style={{ color: "#94a3b8", margin: 0 }}>
                    {contacts.length} total contacts
                  </p>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  style={{
                    width: "100%",
                    color: "#f1f5f9",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #334155",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "12px",
                      }}
                    >
                      <th style={{ padding: "14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Name</th>
                      <th style={{ padding: "14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Email</th>
                      <th style={{ padding: "14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Subject</th>
                      <th style={{ padding: "14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Message</th>
                      <th style={{ padding: "14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Received</th>
                      <th style={{ padding: "14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c._id} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={{ padding: "14px", color: "#f1f5f9" }}>{c.name}</td>
                        <td style={{ padding: "14px", color: "#cbd5e1" }}>{c.email}</td>
                        <td style={{ padding: "14px", color: "#cbd5e1" }}>{c.subject}</td>
                        <td style={{ padding: "14px", color: "#cbd5e1", maxWidth: 420, whiteSpace: "normal", wordBreak: "break-word" }}>
                          {c.message}
                        </td>
                        <td style={{ padding: "14px", color: "#94a3b8", fontSize: "12px" }}>
                          {new Date(c.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <button
                            onClick={() => handleDelete("contact", c._id)}
                            className="border-btn"
                            style={{ padding: "5px 10px" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <div style={formCardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <h3 style={{ color: "#f1f5f9", marginBottom: "15px" }}>
                    {editingId ? "Edit Course" : "Add New Course"}
                  </h3>
                  {editingId && (
                    <button
                      type="button"
                      className="border-btn"
                      onClick={() => {
                        setEditingId(null);
                        setCourseForm({
                          title: "",
                          description: "",
                          durationMonths: 6,
                          pricePerMonth: 0,
                          features: [],
                          level: "beginner",
                          imageUrl: "",
                          isActive: true,
                        });
                      }}
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
                <form onSubmit={handleCourseSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Title"
                          value={courseForm.title}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          style={textareaStyle}
                          placeholder="Description"
                          value={courseForm.description}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              description: e.target.value,
                            })
                          }
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="course-duration" style={{ color: "#94a3b8", marginBottom: "6px", display: "block" }}>Duration (months)</label>
                        <input
                          id="course-duration"
                          className="form-control"
                          style={inputStyle}
                          type="number"
                          placeholder="Duration (months)"
                          value={courseForm.durationMonths}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              durationMonths: parseInt(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="course-price" style={{ color: "#94a3b8", marginBottom: "6px", display: "block" }}>Price per month</label>
                        <input
                          id="course-price"
                          className="form-control"
                          style={inputStyle}
                          type="number"
                          step="0.01"
                          placeholder="Price per month"
                          value={courseForm.pricePerMonth}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              pricePerMonth: parseFloat(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="course-level" style={{ color: "#94a3b8", marginBottom: "6px", display: "block" }}>Level</label>
                        <select
                          id="course-level"
                          className="form-control"
                          style={selectStyle}
                          value={courseForm.level}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              level: e.target.value,
                            })
                          }
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="course-image-url" style={{ color: "#94a3b8", marginBottom: "6px", display: "block" }}>Image URL</label>
                        <input
                          id="course-image-url"
                          className="form-control"
                          style={inputStyle}
                          placeholder="Image URL"
                          value={courseForm.imageUrl}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              imageUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="course-features" style={{ color: "#94a3b8", marginBottom: "6px", display: "block" }}>Features</label>
                        <input
                          id="course-features"
                          className="form-control"
                          style={inputStyle}
                          placeholder="Features (comma separated)"
                          value={courseForm.features.join(", ")}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              features: e.target.value
                                .split(",")
                                .map((f) => f.trim())
                                .filter((f) => f),
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#f1f5f9" }}>
                          <input
                            type="checkbox"
                            checked={courseForm.isActive}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                isActive: e.target.checked,
                              })
                            }
                          />{" "}
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="border-btn">
                    {editingId ? "Update" : "Create"} Course
                  </button>
                </form>
              </div>

              <div style={{ ...formCardStyle, marginTop: "20px" }}>
                <h3 style={{ color: "#f1f5f9", marginBottom: "20px" }}>
                  All Courses
                </h3>
                <div className="table-responsive">
                  <table
                    style={{
                      width: "100%",
                      color: "#f1f5f9",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid #334155" }}>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Title
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Price/Month
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Duration
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Level
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr
                          key={course._id}
                          style={{ borderBottom: "1px solid #334155" }}
                        >
                          <td style={{ padding: "15px" }}>{course.title}</td>
                          <td style={{ padding: "15px", color: "#10b981" }}>
                            ${course.pricePerMonth}
                          </td>
                          <td style={{ padding: "15px", color: "#cbd5e1" }}>
                            {course.durationMonths} months
                          </td>
                          <td style={{ padding: "15px", color: "#cbd5e1" }}>
                            {course.level}
                          </td>
                          <td style={{ padding: "15px" }}>
                            <button
                              onClick={() => handleEdit("courses", course)}
                              className="border-btn"
                              style={{
                                marginRight: "5px",
                                padding: "5px 10px",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete("courses", course._id)
                              }
                              className="border-btn"
                              style={{ padding: "5px 10px" }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div style={formCardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <h3 style={{ color: "#f1f5f9", marginBottom: "15px" }}>
                    {editingId ? "Edit Product" : "Add New Product"}
                  </h3>
                  {editingId && (
                    <button
                      type="button"
                      className="border-btn"
                      onClick={() => {
                        setEditingId(null);
                        setProductForm({
                          name: "",
                          description: "",
                          price: 0,
                          imageUrl: "",
                          category: "",
                          stock: 0,
                          isActive: true,
                        });
                      }}
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
                <form onSubmit={handleProductSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Name"
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          style={textareaStyle}
                          placeholder="Description"
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              description: e.target.value,
                            })
                          }
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="product-price" style={{ color: "#94a3b8", marginBottom: "6px", display: "block" }}>Price</label>
                        <input
                          id="product-price"
                          className="form-control"
                          style={inputStyle}
                          type="number"
                          step="0.01"
                          placeholder="Price"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              price: parseFloat(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Category"
                          value={productForm.category}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              category: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="product-stock" style={{ color: "#94a3b8", marginBottom: "6px", display: "block" }}>Stock</label>
                        <input
                          id="product-stock"
                          className="form-control"
                          style={inputStyle}
                          type="number"
                          placeholder="Stock"
                          value={productForm.stock}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              stock: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Image URL"
                          value={productForm.imageUrl}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              imageUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#f1f5f9" }}>
                          <input
                            type="checkbox"
                            checked={productForm.isActive}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                isActive: e.target.checked,
                              })
                            }
                          />{" "}
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="border-btn">
                    {editingId ? "Update" : "Create"} Product
                  </button>
                </form>
              </div>

              <div style={{ ...formCardStyle, marginTop: "20px" }}>
                <h3 style={{ color: "#f1f5f9", marginBottom: "20px" }}>
                  All Products
                </h3>
                <div className="table-responsive">
                  <table
                    style={{
                      width: "100%",
                      color: "#f1f5f9",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid #334155" }}>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Category
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Price
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Stock
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product._id}
                          style={{ borderBottom: "1px solid #334155" }}
                        >
                          <td style={{ padding: "15px" }}>{product.name}</td>
                          <td style={{ padding: "15px", color: "#cbd5e1" }}>
                            {product.category}
                          </td>
                          <td style={{ padding: "15px", color: "#10b981" }}>
                            ${product.price}
                          </td>
                          <td style={{ padding: "15px", color: "#cbd5e1" }}>
                            {product.stock}
                          </td>
                          <td style={{ padding: "15px" }}>
                            <button
                              onClick={() => handleEdit("products", product)}
                              className="border-btn"
                              style={{
                                marginRight: "5px",
                                padding: "5px 10px",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete("products", product._id)
                              }
                              className="border-btn"
                              style={{ padding: "5px 10px" }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trainers" && (
            <div>
              <div style={formCardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <h3 style={{ color: "#f1f5f9", marginBottom: "15px" }}>
                    {editingId ? "Edit Trainer" : "Add New Trainer"}
                  </h3>
                  {editingId && (
                    <button
                      type="button"
                      className="border-btn"
                      onClick={() => {
                        setEditingId(null);
                        setTrainerForm({
                          name: "",
                          bio: "",
                          specialty: "",
                          imageUrl: "",
                          socialLinks: {
                            facebook: "",
                            instagram: "",
                            twitter: "",
                          },
                          isActive: true,
                        });
                      }}
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
                <form onSubmit={handleTrainerSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Name"
                          value={trainerForm.name}
                          onChange={(e) =>
                            setTrainerForm({
                              ...trainerForm,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Specialty"
                          value={trainerForm.specialty}
                          onChange={(e) =>
                            setTrainerForm({
                              ...trainerForm,
                              specialty: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          style={textareaStyle}
                          placeholder="Bio"
                          value={trainerForm.bio}
                          onChange={(e) =>
                            setTrainerForm({
                              ...trainerForm,
                              bio: e.target.value,
                            })
                          }
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Image URL"
                          value={trainerForm.imageUrl}
                          onChange={(e) =>
                            setTrainerForm({
                              ...trainerForm,
                              imageUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Facebook URL"
                          value={trainerForm.socialLinks.facebook}
                          onChange={(e) =>
                            setTrainerForm({
                              ...trainerForm,
                              socialLinks: {
                                ...trainerForm.socialLinks,
                                facebook: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Instagram URL"
                          value={trainerForm.socialLinks.instagram}
                          onChange={(e) =>
                            setTrainerForm({
                              ...trainerForm,
                              socialLinks: {
                                ...trainerForm.socialLinks,
                                instagram: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          style={inputStyle}
                          placeholder="Twitter URL"
                          value={trainerForm.socialLinks.twitter}
                          onChange={(e) =>
                            setTrainerForm({
                              ...trainerForm,
                              socialLinks: {
                                ...trainerForm.socialLinks,
                                twitter: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#f1f5f9" }}>
                          <input
                            type="checkbox"
                            checked={trainerForm.isActive}
                            onChange={(e) =>
                              setTrainerForm({
                                ...trainerForm,
                                isActive: e.target.checked,
                              })
                            }
                          />{" "}
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="border-btn">
                    {editingId ? "Update" : "Create"} Trainer
                  </button>
                </form>
              </div>

              <div style={{ ...formCardStyle, marginTop: "20px" }}>
                <h3 style={{ color: "#f1f5f9", marginBottom: "20px" }}>
                  All Trainers
                </h3>
                <div className="table-responsive">
                  <table
                    style={{
                      width: "100%",
                      color: "#f1f5f9",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid #334155" }}>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Specialty
                        </th>
                        <th
                          style={{
                            padding: "15px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map((trainer) => (
                        <tr
                          key={trainer._id}
                          style={{ borderBottom: "1px solid #334155" }}
                        >
                          <td style={{ padding: "15px" }}>{trainer.name}</td>
                          <td style={{ padding: "15px", color: "#cbd5e1" }}>
                            {trainer.specialty}
                          </td>
                          <td style={{ padding: "15px" }}>
                            <button
                              onClick={() => handleEdit("trainers", trainer)}
                              className="border-btn"
                              style={{
                                marginRight: "5px",
                                padding: "5px 10px",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete("trainers", trainer._id)
                              }
                              className="border-btn"
                              style={{ padding: "5px 10px" }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
