import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    location: "",
    event_date: "",
    price: "",
    seats: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create event");
        return;
      }

      alert("Event created successfully!");
      navigate("/admin/events");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>➕ Add Event</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Event Title"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="date"
          name="event_date"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="seats"
          placeholder="Total Seats"
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Create Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "30px",
    maxWidth: "500px",
    margin: "auto",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
  },

  title: {
    textAlign: "center",
    color: "#4f46e5",
    marginBottom: "15px",
  },

  form: {
    display: "grid",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  button: {
    background: "#4f46e5",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};