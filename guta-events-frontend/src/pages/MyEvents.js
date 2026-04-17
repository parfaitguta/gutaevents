import { useEffect, useState } from "react";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  const loadMyEvents = async () => {
    const res = await fetch("http://localhost:8080/my-registrations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadMyEvents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🎟 My Registered Events</h2>

      {events.length === 0 ? (
        <p>No events registered yet.</p>
      ) : (
        events.map((e) => (
          <div key={e.id} style={styles.card}>
            <h3>{e.title}</h3>
            <p>{e.location}</p>
            <p>{e.event_date}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default MyEvents;