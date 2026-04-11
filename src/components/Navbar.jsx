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
        <Link to={token ? "/dashboard" : "/login"}>QueueSewa</Link>
      </div>
      <div className={styles.navLinks}>
        {token ? (
          <>
            <span className={styles.userInfo}>Welcome, {user?.role || 'User'}</span>
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
