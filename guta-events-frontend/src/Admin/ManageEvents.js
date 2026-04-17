import { useEffect, useState } from "react";

const API = "http://localhost:8080";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/events`);
      const data = await res.json();

      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) return;

    await fetch(`${API}/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    load();
  };

  if (loading) {
    return <div style={styles.loading}>Loading events...</div>;
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🎫 Manage Events</h2>

      <div style={styles.grid}>
        {events.map((e) => (
          <div key={e.id} style={styles.card}>
            <h3>{e.title}</h3>
            <p>📍 {e.location}</p>
            <p>📅 {e.event_date}</p>
            <p>💺 Seats: {e.seats}</p>

            <button onClick={() => remove(e.id)} style={styles.deleteBtn}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "20px",
  },

  loading: {
    padding: "30px",
    fontSize: "18px",
  },

  title: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};