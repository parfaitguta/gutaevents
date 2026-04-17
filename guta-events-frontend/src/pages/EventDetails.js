import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= LOAD EVENT ================= */
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/events/${id}`);
        const data = await res.json();

        setEvent(data);
      } catch (err) {
        setMessage("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  /* ================= BOOKING ================= */
  const handleBooking = async () => {
    setMessage("");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    if (!tickets || tickets < 1) {
      setMessage("Invalid ticket number");
      return;
    }

    if (tickets > event.seats) {
      setMessage("Not enough seats available");
      return;
    }

    try {
      setBooking(true);

      const res = await fetch("http://localhost:8080/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_id: id,
          tickets: Number(tickets),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setMessage(data.error || "Booking failed");
      } else {
        setMessage("🎉 Booking successful!");
        setEvent((prev) => ({
          ...prev,
          seats: prev.seats - tickets,
        }));

        setTimeout(() => {
          navigate("/my-bookings");
        }, 1500);
      }
    } catch (err) {
      setMessage("Server error");
    } finally {
      setBooking(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <h2 style={styles.loading}>Loading event...</h2>;
  }

  if (!event) {
    return <h2 style={styles.loading}>Event not found</h2>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* IMAGE */}
        {event.image && (
          <img
            src={`http://localhost:8080${event.image}`}
            alt="event"
            style={styles.image}
          />
        )}

        {/* TITLE */}
        <h1>{event.title}</h1>

        <p><b>Location:</b> {event.location}</p>
        <p><b>Date:</b> {event.event_date}</p>
        <p><b>Price:</b> ${event.price}</p>
        <p><b>Available Seats:</b> {event.seats}</p>

        {/* SOLD OUT */}
        {event.seats <= 0 && (
          <p style={styles.soldOut}>❌ Sold Out</p>
        )}

        {/* BOOKING SECTION */}
        {event.seats > 0 && (
          <div style={styles.bookingBox}>
            <label>Tickets:</label>

            <input
              type="number"
              min="1"
              max={event.seats}
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              style={styles.input}
            />

            <button
              onClick={handleBooking}
              disabled={booking}
              style={{
                ...styles.button,
                opacity: booking ? 0.6 : 1,
                cursor: booking ? "not-allowed" : "pointer",
              }}
            >
              {booking ? "Booking..." : "Book Ticket"}
            </button>
          </div>
        )}

        {/* MESSAGE */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default EventDetails;

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "30px",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  bookingBox: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  input: {
    width: "80px",
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
  },

  message: {
    marginTop: "15px",
    fontWeight: "bold",
  },

  soldOut: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },

  loading: {
    textAlign: "center",
    marginTop: "50px",
  },
};