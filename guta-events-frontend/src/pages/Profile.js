import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    avatar: ""
  });

  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    fetch("http://localhost:8080/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => {});
  }, []);

  /* ================= CHANGE TEXT ================= */
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /* ================= FILE ================= */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    const formData = new FormData();

    formData.append("firstname", user.firstname);
    formData.append("lastname", user.lastname);
    formData.append("bio", user.bio || "");

    if (file) {
      formData.append("avatar", file);
    }

    const res = await fetch("http://localhost:8080/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    setUser(data);

    // 🔥 IMPORTANT FIX (sync navbar)
    localStorage.setItem("user", JSON.stringify(data));

    alert("Profile updated successfully!");
    setFile(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <img
          src={
            file
              ? URL.createObjectURL(file)
              : user.avatar
                ? `http://localhost:8080${user.avatar}`
                : "https://img.icons8.com/color/96/user-male-circle--v1.png"
          }
          style={styles.avatar}
          alt="profile"
        />

        <input type="file" onChange={handleFileChange} />

        <input
          name="firstname"
          value={user.firstname}
          onChange={handleChange}
          placeholder="First Name"
          style={styles.input}
        />

        <input
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          style={styles.input}
        />

        <input
          value={user.email}
          disabled
          style={styles.input}
        />

        <textarea
          name="bio"
          value={user.bio || ""}
          onChange={handleChange}
          placeholder="Bio"
          style={styles.textarea}
        />

        <button onClick={handleSave} style={styles.button}>
          Save Changes
        </button>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px"
  },

  card: {
    width: "350px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    marginBottom: "10px"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0"
  },

  textarea: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    minHeight: "60px"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Profile;