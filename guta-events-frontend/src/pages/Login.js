import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("https://gutaevents.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // save auth
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirect
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div style={styles.page}>

      <form style={styles.form} onSubmit={handleLogin}>

        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

const styles = {

  page:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background:"#f5f5f5"
  },

  form:{
    width:"350px",
    background:"white",
    padding:"30px",
    borderRadius:"10px",
    display:"flex",
    flexDirection:"column",
    gap:"15px"
  },

  input:{
    padding:"10px",
    border:"1px solid #ccc",
    borderRadius:"6px"
  },

  button:{
    padding:"12px",
    background:"#2563eb",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  error:{
    color:"red"
  }

};

export default Login;