import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState({}); // NEW
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const loadEvents = async () => {
    const res = await fetch("http://localhost:8080/events");
    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  /* ================= BOOK EVENT (IMPROVED) ================= */
  const bookEvent = async (eventId) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    const ticketCount = tickets[eventId] || 1;

    const res = await fetch("http://localhost:8080/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        event_id: eventId,
        tickets: Number(ticketCount),
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("🎉 Booking successful!");
      loadEvents();
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🎉 Events</h1>

      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>

            {event.image && (
              <img
                src={`http://localhost:8080${event.image}`}
                alt="event"
                style={styles.image}
              />
            )}

            <h3>{event.title}</h3>
            <p>📍 {event.location}</p>
            <p>📅 {event.event_date}</p>
            <p>💰 ${event.price}</p>
            <p>🎟 Seats: {event.seats}</p>

            {/* NEW: ticket selector */}
            <input
              type="number"
              min="1"
              max={event.seats}
              value={tickets[event.id] || 1}
              onChange={(e) =>
                setTickets({
                  ...tickets,
                  [event.id]: e.target.value,
                })
              }
              style={styles.input}
            />

            <button
              style={styles.btn}
              onClick={() => bookEvent(event.id)}
            >
              Book Ticket
            </button>

            {/* NEW: view details */}
            <button
              style={styles.viewBtn}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              View Details
            </button>

            {isAdmin && (
              <button style={styles.adminBtn}>
                Admin View
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "20px",
    background: "#f4f6ff",
    minHeight: "100vh",
  },

  title: {
    color: "#4f46e5",
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
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  input: {
    width: "60px",
    padding: "5px",
    marginTop: "10px",
  },

  btn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  viewBtn: {
    marginTop: "8px",
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px",
    width: "100%",
    borderRadius: "8px",
    cursor: "pointer",
  },

  adminBtn: {
    marginTop: "8px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px",
    width: "100%",
    borderRadius: "8px",
  },
};