import { Link } from 'react-router-dom';
import styles from './PublicPages.module.css';

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Welcome to QueueSewa</h1>
        <p className={styles.subtitle}>
          The modern, intuitive queue management system designed for seamless hospital and patient experiences.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/signup" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none', width: 'auto', marginRight: '1rem' }}>
            Get Started
          </Link>
          <Link to="/login" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none', width: 'auto', backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
            Sign In
          </Link>
        </div>
      </div>
      
      <div className={styles.contentCard}>
        <h2 style={{ textAlign: 'center' }}>Why QueueSewa?</h2>
        <p style={{ textAlign: 'center' }}>
          We eliminate the friction of waiting. With live queue tracking, personalized ticket generation, and integrated medical history synchronization, QueueSewa ensures that patients spend more time healing and less time waiting in lines. Management can easily oversee live traffic and prescribe directly to the serving token.
        </p>
      </div>
    </div>
  );
};

export default Home;