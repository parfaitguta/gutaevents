import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      setLoading(true);

      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const [eventsRes, usersRes, bookingsRes] = await Promise.all([
        fetch("http://localhost:8080/events"),
        fetch("http://localhost:8080/users", { headers }),
        fetch("http://localhost:8080/admin/bookings", { headers }),
      ]);

      const eventsData = await eventsRes.json().catch(() => []);
      const usersData = await usersRes.json().catch(() => []);
      const bookingsData = await bookingsRes.json().catch(() => []);

      setEvents(eventsData);
      setUsers(usersData);
      setBookings(bookingsData);

    } catch (err) {
      console.error("Dashboard error:", err);
      setEvents([]);
      setUsers([]);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= STATS ================= */
  const totalEvents = events.length;
  const totalUsers = users.length;
  const totalBookings = bookings.length;

  const totalSeats = events.reduce((acc, e) => acc + (e.seats || 0), 0);

  /* ================= CHART DATA ================= */
  const eventChart = events.map((e) => ({
    name: e.title?.slice(0, 10) || "Event",
    seats: e.seats || 0,
  }));

  const bookingChart = bookings.reduce((acc, b) => {
    const found = acc.find((x) => x.name === b.title);

    if (found) found.value += 1;
    else acc.push({ name: b.title, value: 1 });

    return acc;
  }, []);

  const pieData = [
    { name: "Events", value: totalEvents },
    { name: "Users", value: totalUsers },
    { name: "Bookings", value: totalBookings },
  ];

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b"];

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* ❌ Sidebar removed (handled by AdminLayout) */}

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>📊 Admin Dashboard</h1>
          <p style={styles.subtitle}>Real-time platform analytics</p>
        </div>

        {/* CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h2>{totalEvents}</h2>
            <p>Total Events</p>
          </div>

          <div style={styles.card}>
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div style={styles.card}>
            <h2>{totalBookings}</h2>
            <p>Total Bookings</p>
          </div>

          <div style={styles.card}>
            <h2>{totalSeats}</h2>
            <p>Available Seats</p>
          </div>
        </div>

        {/* CHARTS */}
        <div style={styles.chartGrid}>
          <div style={styles.chartBox}>
            <h3>🎫 Event Seats Overview</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={eventChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="seats" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartBox}>
            <h3>📈 Platform Distribution</h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90} label>
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOOKINGS */}
        <div style={styles.chartBoxFull}>
          <h3>📊 Most Booked Events</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    display: "flex",
    background: "#f5f7ff",
    minHeight: "100vh",
  },

  content: {
    marginLeft: "240px",
    padding: "30px",
    width: "100%",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "28px",
    margin: 0,
  },

  subtitle: {
    color: "#666",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
    textAlign: "center",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  chartBox: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
  },

  chartBoxFull: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
  },
};

export default Dashboard;