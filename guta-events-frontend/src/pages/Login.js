import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Save token
        localStorage.setItem("token", data.token);

        // IMPORTANT: take role ONLY from backend user object
        const role = data.user?.role;
        localStorage.setItem("role", role);

        // Save full user
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");

        // ✅ FIXED REDIRECT LOGIC
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/events");
        }

      } else {
        alert(data.error || "Invalid email or password");
      }

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    marginTop: "50px",
    background: "#f4f6ff",
    borderRadius: "10px",
  },

  title: {
    textAlign: "center",
    color: "#4f46e5",
  },

  form: {
    display: "grid",
    gap: "10px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },

  button: {
    padding: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};

export default Login;