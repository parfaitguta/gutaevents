const API = "https://gutaevents.onrender.com";

export const getToken = () => localStorage.getItem("token");

export const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

/* ================= USERS ================= */

export const fetchUsers = async () => {
  const res = await fetch(`${API}/users`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete user");

  return res.json();
};

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${API}/users/${id}/role`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ role }),
  });

  if (!res.ok) throw new Error("Failed to update role");

  return res.json();
};

/* ================= EVENTS ================= */

export const fetchEvents = async () => {
  const res = await fetch(`${API}/events`);

  if (!res.ok) throw new Error("Failed to fetch events");

  return res.json();
};

export const deleteEvent = async (id) => {
  const res = await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete event");

  return res.json();
};