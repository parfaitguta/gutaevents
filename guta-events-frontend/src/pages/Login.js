import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://gutaevents.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),   // ✅ FIX 1: remove spaces
          password: password.trim()
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server did not return valid JSON");
      }

      // ❌ backend error handling
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      if (!data.token) {
        throw new Error("Login failed: No token received");
      }

      // ✅ save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user?.role || "");

      setLoading(false);

      // ✅ redirect based on role
      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/events");
      }

    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};

export default Login;