import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:8080";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading bookings...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.content}>
        <h2 style={styles.title}>📦 Manage Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} style={styles.card}>
              <h3>{b.title}</h3>

              <p>
                👤 {b.firstname} {b.lastname}
              </p>

              <p>🎫 Tickets: {b.tickets}</p>
            </div>
          ))
        )}
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

  title: {
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
};