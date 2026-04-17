import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>

      <div style={styles.container}>

        {/* BRAND */}
        <div style={styles.column}>
          <h2 style={styles.logo}>🎉 Guta Events</h2>
          <p style={styles.text}>
            Guta Events is a modern platform for discovering, managing and
            organizing amazing events like concerts, conferences and parties.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div style={styles.column}>
          <h3 style={styles.title}>Quick Links</h3>

          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/events">Events</Link>
          <Link style={styles.link} to="/add-event">Create Event</Link>
          <Link style={styles.link} to="/dashboard">Dashboard</Link>
        </div>

        {/* CONTACT */}
        <div style={styles.column}>
          <h3 style={styles.title}>Contact</h3>
          <p style={styles.text}>Kigali, Rwanda</p>
          <p style={styles.text}>info@gutaevents.com</p>
          <p style={styles.text}>+250 780 000 000</p>
        </div>

        {/* SOCIAL */}
        <div style={styles.column}>
          <h3 style={styles.title}>Follow Us</h3>

          <div style={styles.socials}>
            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="fb"/>
            <img src="https://img.icons8.com/color/48/instagram-new.png" alt="ig"/>
            <img src="https://img.icons8.com/color/48/twitter.png" alt="tw"/>
            <img src="https://img.icons8.com/color/48/youtube-play.png" alt="yt"/>
          </div>
        </div>

      </div>

      <div style={styles.bottom}>
        © 2026 Guta Events Platform — All rights reserved
      </div>

    </footer>
  );
}

const styles = {

footer:{
background:"#111827",
color:"white",
marginTop:"60px"
},

container:{
display:"flex",
justifyContent:"space-around",
flexWrap:"wrap",
padding:"50px 30px",
gap:"40px"
},

column:{
maxWidth:"250px",
display:"flex",
flexDirection:"column",
gap:"10px"
},

logo:{
color:"#6366f1"
},

title:{
marginBottom:"10px"
},

text:{
color:"#d1d5db",
fontSize:"14px"
},

link:{
color:"#d1d5db",
textDecoration:"none",
fontSize:"14px"
},

socials:{
display:"flex",
gap:"12px",
marginTop:"10px"
},

bottom:{
borderTop:"1px solid #374151",
textAlign:"center",
padding:"20px",
fontSize:"14px",
color:"#9ca3af"
}

};

export default Footer;