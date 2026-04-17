const API = "http://localhost:8080";

export const getToken = () => localStorage.getItem("token");

export const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

/* USERS */
export const fetchUsers = async () => {
  const res = await fetch(`${API}/users`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
};

export const updateUserRole = async (id, role) => {
  await fetch(`${API}/users/${id}/role`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ role }),
  });
};

/* EVENTS */
export const fetchEvents = async () => {
  const res = await fetch(`${API}/events`);
  return res.json();
};

export const deleteEvent = async (id) => {
  await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
};