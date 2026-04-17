import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* ================= SIDEBAR ================= */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Guta Admin</h2>

        <Link style={styles.link} to="/admin/dashboard">
          📊 Dashboard
        </Link>

        <Link style={styles.link} to="/admin/events">
          🎫 Events
        </Link>

        <Link style={styles.link} to="/admin/create-event">
          ➕ Create Event
        </Link>

        <Link style={styles.link} to="/admin/users">
          👥 Users
        </Link>

        <Link style={styles.link} to="/admin/bookings">
          📑 Bookings
        </Link>

        {/* Divider */}
        <hr style={styles.divider} />

        {/* Logout Button */}
        <button style={styles.logout} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
  },

  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#111827",
    color: "white",
    position: "fixed",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    overflowY: "auto", // ⭐ allows scroll
  },

  logo: {
    marginBottom: "20px",
  },

  link: {
    textDecoration: "none",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    background: "#1f2937",
  },

  divider: {
    borderColor: "#374151",
    marginTop: "20px",
  },

  logout: {
    marginTop: "auto",
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  content: {
    marginLeft: "240px",
    padding: "20px",
    width: "100%",
  },
};

export default AdminLayout;