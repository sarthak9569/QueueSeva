import styles from './PublicPages.module.css';

const About = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>About QueueSewa</h1>
        <p className={styles.subtitle}>
          Solving modern healthcare bottlenecks through simple, intelligent software.
        </p>
      </div>

      <div className={styles.contentCard}>
        <h2>Our Mission</h2>
        <p>
          At QueueSewa, we believe that accessing healthcare should never be an administrative burden. Our mission is to transform waiting areas from chaotic, uncertain environments into streamlined, transparent experiences.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Built with cutting edge web technologies, our real-time queuing system bridges the gap between patient experience and clinic management, offering dynamic token tracking, centralized prescription storage, and role-based data security.
        </p>
      </div>
      
      <div className={styles.contentCard}>
        <h2>How It Works</h2>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Patient Registration:</strong> Sign up instantly and request a ticket for the department you need.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Live Status Tracking:</strong> Watch your ticket status change in real time through the dashboard.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Management Interface:</strong> Hospital staff can increment token statuses smoothly, reducing manual oversight.</li>
          <li><strong>Integrated Medical History:</strong> Every token resolved allows doctors to immediately write prescriptions logically linked back to the patient.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;