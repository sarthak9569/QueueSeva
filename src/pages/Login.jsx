import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LoginSignup.module.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock login since backend isn't ready
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          login('mock-jwt-token-12345', { id: '1', role: 'admin', email: credentials.email });
          navigate('/dashboard');
        } else {
          setError('Please fill in all fields.');
        }
        setLoading(false);
      }, 1000);
    } catch {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.authBox}>
        <div className={styles.header}>
          <h2>Welcome Back</h2>
          <p>Sign in to QueueSewa</p>
        </div>
        
        {error && <div className={styles.errorAlert}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={credentials.email} 
              onChange={handleChange} 
              autoComplete="email"
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              autoComplete="current-password"
              required 
            />
          </div>
          
          <button type="submit" disabled={loading} className={styles.authBtn}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className={styles.footer}>
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
