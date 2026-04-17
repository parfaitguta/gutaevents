import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  /* LOAD USER */
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (t) {
      fetch("http://localhost:8080/me", {
        headers: { Authorization: `Bearer ${t}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch(() => {});
    }
  }, [location]);

  /* CLOSE MENU */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setRole(null);
    navigate("/login");
  };

  /* SEARCH */
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/events?search=${search}`);
  };

  const avatar = user?.avatar
    ? `http://localhost:8080${user.avatar}`
    : "https://img.icons8.com/color/96/user-male-circle--v1.png";

  return (
    <nav style={styles.navbar}>

      {/* LOGO */}
      <div style={styles.logoBox}>
        <h2 style={styles.logoText}>Guta Events</h2>
      </div>

      {/* SEARCH */}
      <form onSubmit={handleSearch} style={styles.searchBox}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          style={styles.searchInput}
        />
      </form>

      {/* LINKS */}
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>

        {/* USER ONLY */}
        {token && role !== "admin" && (
          <Link to="/my-bookings">My Bookings</Link>
        )}

        {/* ADMIN ONLY */}
        {token && role === "admin" && (
          <Link to="/admin/dashboard">Dashboard</Link>
        )}

        {!token && (
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>
        )}

        {/* PROFILE */}
        {token && (
          <div ref={menuRef} style={styles.profileWrapper}>
            <img
              src={avatar}
              alt="profile"
              style={styles.profile}
              onClick={() => setOpenMenu(!openMenu)}
            />

            {openMenu && (
              <div style={styles.dropdown}>
                <strong>
                  {user?.firstname} {user?.lastname}
                </strong>
                <p style={{ fontSize: "12px" }}>{user?.email}</p>

                <button
                  style={styles.dropdownBtn}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>

                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

/* STYLES */
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 40px",
    background: "white",
    position: "sticky",
    top: 0,
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  logoBox: { display: "flex", alignItems: "center" },
  logoText: { color: "#4f46e5" },

  searchBox: { flex: 1, display: "flex", justifyContent: "center" },
  searchInput: {
    width: "280px",
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ddd",
  },

  links: { display: "flex", gap: "15px", alignItems: "center" },

  loginBtn: {
    background: "#4f46e5",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
  },

  profileWrapper: { position: "relative" },

  profile: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: "45px",
    background: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    borderRadius: "10px",
    padding: "10px",
    width: "180px",
  },

  dropdownBtn: {
    width: "100%",
    border: "none",
    background: "transparent",
    padding: "8px",
    textAlign: "left",
  },

  logoutBtn: {
    width: "100%",
    background: "red",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    marginTop: "5px",
  },
};

export default Navbar;