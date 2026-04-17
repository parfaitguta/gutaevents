import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  /* ================= LOAD BOOKINGS ================= */
  const loadBookings = async () => {
    try {
      const res = await fetch("http://localhost:8080/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  /* ================= CANCEL BOOKING (OPTIONAL FUTURE BACKEND) ================= */
  const cancelBooking = async (id) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8080/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to cancel booking");
        return;
      }

      setBookings((prev) => prev.filter((b) => b.id !== id));
      setMessage("Booking cancelled");
    } catch (err) {
      alert("Server error");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <h2 style={styles.loading}>Loading your tickets...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>🎟 My Bookings</h1>

      {message && <p style={styles.message}>{message}</p>}

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div style={styles.empty}>
          <h3>No bookings yet</h3>
          <p>Book an event and your tickets will appear here.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {bookings.map((b) => (
            <div key={b.id} style={styles.card}>
              <h2 style={styles.title}>{b.title}</h2>

              <p>📍 <b>Location:</b> {b.location}</p>
              <p>📅 <b>Date:</b> {b.event_date}</p>
              <p>🎟 <b>Tickets:</b> {b.tickets}</p>

              <div style={styles.badge}>✔ Confirmed</div>

              {/* ACTIONS */}
              <button
                onClick={() => cancelBooking(b.id)}
                style={styles.cancelBtn}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "auto",
  },

  loading: {
    textAlign: "center",
    marginTop: "50px",
  },

  message: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: "50px",
    padding: "30px",
    background: "#f4f6ff",
    borderRadius: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    position: "relative",
  },

  title: {
    color: "#4f46e5",
  },

  badge: {
    marginTop: "10px",
    color: "green",
    fontWeight: "bold",
  },

  cancelBtn: {
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "8px",
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
  },
};