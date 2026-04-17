import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const link = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    marginBottom: "8px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#e5e7eb",
    background: isActive ? "#4f46e5" : "transparent",
    fontWeight: isActive ? "600" : "400",
  });

  return (
    <aside style={styles.sidebar}>
      <div>
        <h2 style={styles.logo}>Guta Admin</h2>

        <NavLink to="/admin/dashboard" style={link}>📊 Dashboard</NavLink>
        <NavLink to="/admin/events" style={link}>🎫 Events</NavLink>
        <NavLink to="/admin/add-event" style={link}>➕ Create Event</NavLink>
        <NavLink to="/admin/users" style={link}>👥 Users</NavLink>
        <NavLink to="/admin/bookings" style={link}>📑 Bookings</NavLink>
        <NavLink to="/admin/profile" style={link}>👤 Profile</NavLink>
      </div>

      <button onClick={logout} style={styles.logout}>
        🚪 Logout
      </button>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "#0f172a",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logo: {
    color: "#6366f1",
    marginBottom: "25px",
    fontSize: "22px",
  },

  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Sidebar;