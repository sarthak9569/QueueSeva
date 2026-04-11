import { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import styles from './DashboardSections.module.css';


const TokenGenerator = () => {
  const { generateToken } = useQueue();
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    department: 'General'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const newToken = await generateToken(formData);
      setSuccess(`Token #${newToken.tokenNumber} generated successfully for ${formData.patientName}`);
      setFormData({ patientName: '', phoneNumber: '', department: 'General' });
      setLoading(false);
    } catch {
      setError('Failed to generate token. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>Generate New Token</h2>
      
      {success && <div className={styles.successMessage}>{success}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="patientName">Patient Name</label>
          <input 
            type="text" 
            id="patientName" 
            name="patientName" 
            value={formData.patientName} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="department">Department</label>
          <select 
            id="department" 
            name="department" 
            value={formData.department} 
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Generating...' : 'Generate Token'}
        </button>
      </form>
    </div>
  );
};

export default TokenGenerator;
