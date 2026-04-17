import { useEffect, useState } from "react";
import API from "../api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= LOAD USERS ================= */
  const loadUsers = async () => {
    try {
      const res = await fetch(`${API}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Load users error:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`${API}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadUsers();
  };

  /* ================= UPDATE USER ================= */
  const updateUser = async () => {
    setLoading(true);

    await fetch(`${API}/users/${selectedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(selectedUser),
    });

    setSelectedUser(null);
    setLoading(false);
    loadUsers();
  };

  /* ================= CHANGE ROLE ================= */
  const changeRole = async (id, role) => {
    await fetch(`${API}/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    loadUsers();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 User Management</h2>

      {/* USERS LIST */}
      <div style={styles.table}>
        {users.map((user) => (
          <div key={user.id} style={styles.row}>
            <div>
              <strong>
                {user.firstname} {user.lastname}
              </strong>
              <p style={styles.email}>{user.email}</p>
            </div>

            {/* ROLE */}
            <select
              value={user.role}
              onChange={(e) => changeRole(user.id, e.target.value)}
              style={styles.select}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* ACTIONS */}
            <div style={styles.actions}>
              <button
                onClick={() => setSelectedUser(user)}
                style={styles.editBtn}
              >
                Edit
              </button>

              <button
                onClick={() => deleteUser(user.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {selectedUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit User</h3>

            <input
              value={selectedUser.firstname || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  firstname: e.target.value,
                })
              }
              placeholder="First Name"
              style={styles.input}
            />

            <input
              value={selectedUser.lastname || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  lastname: e.target.value,
                })
              }
              placeholder="Last Name"
              style={styles.input}
            />

            <input
              value={selectedUser.email || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              style={styles.input}
            />

            <div style={styles.modalActions}>
              <button
                onClick={() => setSelectedUser(null)}
                style={styles.cancel}
              >
                Cancel
              </button>

              <button
                onClick={updateUser}
                disabled={loading}
                style={styles.save}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "30px",
    background: "#f5f7ff",
    minHeight: "100vh",
  },

  title: {
    marginBottom: "20px",
  },

  table: {
    display: "grid",
    gap: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  email: {
    fontSize: "12px",
    color: "#666",
  },

  select: {
    padding: "6px",
    borderRadius: "6px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },

  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
  },

  cancel: {
    background: "#ccc",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  save: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ManageUsers;