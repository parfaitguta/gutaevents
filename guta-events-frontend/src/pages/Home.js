import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>

          <h1 style={styles.heroTitle}>Guta Events</h1>

          <p style={styles.heroText}>
            Discover concerts, conferences, parties and amazing experiences.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/events" style={styles.primaryBtn}>Explore Events</Link>
            <Link to="/add-event" style={styles.secondaryBtn}>Create Event</Link>
          </div>

        </div>
      </section>

      {/* FEATURE SECTION */}
      <section style={styles.section}>

        <h2 style={styles.sectionTitle}>Popular Event Types</h2>

        <div style={styles.grid}>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
              style={styles.cardImg}
              alt="Concert event"
            />
            <h3>Concerts</h3>
            <p>Enjoy unforgettable music experiences.</p>
          </div>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              style={styles.cardImg}
              alt="Tech conference event"
            />
            <h3>Tech Conferences</h3>
            <p>Meet innovators and tech leaders.</p>
          </div>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"
              style={styles.cardImg}
              alt="Night party event"
            />
            <h3>Night Parties</h3>
            <p>Experience vibrant nightlife events.</p>
          </div>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1503424886307-b090341d25d1"
              style={styles.cardImg}
              alt="Business event"
            />
            <h3>Business Events</h3>
            <p>Professional networking opportunities.</p>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section style={styles.statsSection}>

        <div style={styles.statBox}>
          <h2>500+</h2>
          <p>Events Hosted</p>
        </div>

        <div style={styles.statBox}>
          <h2>10K+</h2>
          <p>Users Joined</p>
        </div>

        <div style={styles.statBox}>
          <h2>120+</h2>
          <p>Organizers</p>
        </div>

      </section>

      {/* CTA */}
      <section style={styles.cta}>

        <h2>Create your own event today</h2>

        <p>Organize concerts, conferences, or private parties easily.</p>

        <Link to="/add-event" style={styles.ctaBtn}>
          Start Creating
        </Link>

      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>

        <div style={styles.footerContainer}>

          <div style={styles.footerColumn}>
            <h2 style={styles.footerLogo}>🎉 Guta Events</h2>
            <p style={styles.footerText}>
              A modern platform for discovering and organizing amazing events.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h3>Quick Links</h3>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/events" style={styles.footerLink}>Events</Link>
            <Link to="/add-event" style={styles.footerLink}>Create Event</Link>
            <Link to="/dashboard" style={styles.footerLink}>Dashboard</Link>
          </div>

          <div style={styles.footerColumn}>
            <h3>Contact</h3>
            <p>Kigali, Rwanda</p>
            <p>info@gutaevents.com</p>
            <p>+250 780 776 354</p>

            <a
              href="https://wa.me/250780776354"
              target="_blank"
              rel="noreferrer"
              style={styles.whatsappBtn}
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          <div style={styles.footerColumn}>
            <h3>Follow Us</h3>
            <div style={styles.socials}>
              <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" />
              <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" />
              <img src="https://img.icons8.com/color/48/twitter.png" alt="Twitter" />
              <img src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube" />
            </div>
          </div>

        </div>

        <div style={styles.footerBottom}>
          © 2026 Guta Events Platform — All rights reserved
        </div>

      </footer>

    </div>
  );
}

const styles = {

  page: {
    fontFamily: "Arial, sans-serif",
    scrollBehavior: "smooth"
  },

  hero: {
    height: "90vh",
    background: "url('https://images.unsplash.com/photo-1511578314322-379afb476865') center/cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  heroOverlay: {
    background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.75))",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    color: "white",
    maxWidth: "800px"
  },

  heroTitle: {
    fontSize: "clamp(32px, 5vw, 55px)",
    marginBottom: "10px"
  },

  heroText: {
    fontSize: "18px",
    marginBottom: "25px"
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#6366f1",
    padding: "12px 25px",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
  },

  secondaryBtn: {
    border: "2px solid white",
    padding: "12px 25px",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "0.3s",
  },

  section: {
    padding: "70px 20px",
    textAlign: "center"
  },

  sectionTitle: {
    fontSize: "34px",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
    maxWidth: "1100px",
    margin: "0 auto"
  },

  card: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "0.3s",
    cursor: "pointer"
  },

  cardImg: {
    width: "100%",
    height: "170px",
    objectFit: "cover"
  },

  statsSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
    padding: "60px",
    background: "#4f46e5",
    color: "white"
  },

  statBox: {
    textAlign: "center",
    minWidth: "150px",
    fontSize: "22px",
    fontWeight: "bold"
  },

  cta: {
    background: "#111827",
    color: "white",
    padding: "70px",
    textAlign: "center"
  },

  ctaBtn: {
    marginTop: "20px",
    display: "inline-block",
    background: "#6366f1",
    padding: "14px 28px",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none"
  },

  footer: {
    background: "#111827",
    color: "white",
    marginTop: "50px"
  },

  footerContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "50px 30px",
    gap: "40px"
  },

  footerColumn: {
    maxWidth: "250px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  footerLogo: {
    color: "#6366f1"
  },

  footerText: {
    color: "#d1d5db",
    fontSize: "14px"
  },

  footerLink: {
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "14px"
  },

  socials: {
    display: "flex",
    gap: "12px",
    marginTop: "10px"
  },

  whatsappBtn: {
    marginTop: "10px",
    background: "#25D366",
    color: "white",
    padding: "10px 15px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block"
  },

  footerBottom: {
    borderTop: "1px solid #374151",
    textAlign: "center",
    padding: "20px",
    fontSize: "14px",
    color: "#9ca3af"
  }

};

export default Home;