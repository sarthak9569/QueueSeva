import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LoginSignup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'patient' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Mock signup logic
      setTimeout(() => {
        login('mock-jwt-token-newuser', { id: formData.role === 'management' ? 'admin-2' : '2', role: formData.role, email: formData.email, name: formData.name });
        navigate('/dashboard');
        setLoading(false);
      }, 1000);
    } catch {
      setError('Error creating account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageBanner}></div>
      <div className={styles.formSection}>
        <div className={styles.authBox}>
        <div className={styles.header}>
          <h2>Create Account</h2>
          <p>Join QueueSewa today</p>
        </div>
        
        {error && <div className={styles.errorAlert}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Sign Up As</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                <input 
                  type="radio" 
                  name="role" 
                  value="patient" 
                  checked={formData.role === 'patient'} 
                  onChange={handleChange} 
                /> Patient
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                <input 
                  type="radio" 
                  name="role" 
                  value="management" 
                  checked={formData.role === 'management'} 
                  onChange={handleChange} 
                /> Management
              </label>
            </div>
          </div>
          
          <button type="submit" disabled={loading} className={styles.authBtn}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className={styles.footer}>
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signup;
