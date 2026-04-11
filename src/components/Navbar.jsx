import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">QueueSewa</Link>
      </div>
      <div className={styles.navLinks}>
        <div style={{ display: 'flex', gap: '1rem', marginRight: 'auto', alignItems: 'center' }}>
          <Link to="/" className={styles.linkBtn}>Home</Link>
          <Link to="/about" className={styles.linkBtn}>About</Link>
          <Link to="/contact" className={styles.linkBtn}>Contact</Link>
          {token && <Link to="/dashboard" className={styles.linkBtn} style={{fontWeight: '600', color: 'var(--primary-color)'}}>Dashboard</Link>}
        </div>
        
        {token ? (
          <>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || (user?.role === 'management' ? 'M' : 'P')}
              </div>
              <div className={styles.userDetails}>
                <span className={styles.userName}>{user?.name || user?.email?.split('@')[0] || 'User'}</span>
                <span className={styles.userRole}>{user?.role || 'Patient'}</span>
              </div>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.linkBtn}>Login</Link>
            <Link to="/signup" className={`${styles.linkBtn} ${styles.primaryBtn}`}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
