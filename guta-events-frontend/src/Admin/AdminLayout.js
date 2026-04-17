import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import Dashboard from "./Dashboard";
import AddEvent from "./AddEvent";
import ManageEvents from "./ManageEvents";
import ManageBookings from "./ManageBookings";
import ManageUsers from "./ManageUsers";
import Profile from "../pages/Profile";

function AdminLayout() {
  return (
    <div style={styles.shell}>
      <Sidebar />

      <div style={styles.main}>
        <div style={styles.content}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-event" element={<AddEvent />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    background: "#f6f7fb",
  },

  main: {
    flex: 1,
    marginLeft: "260px",
    padding: "24px",
  },

  content: {
    maxWidth: "1300px",
    margin: "0 auto",
  },
};

export default AdminLayout;