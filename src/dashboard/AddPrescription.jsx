import { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import styles from './DashboardSections.module.css';

const AddPrescription = () => {
  const { tokens, addPrescription, updateTokenStatus } = useQueue();
  const [selectedToken, setSelectedToken] = useState('');
  const [medicines, setMedicines] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Only show tokens currently serving to management
  const servingTokens = tokens.filter(t => t.status === 'SERVING');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedToken) {
      setError('Please select a token first.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      // 1. Add the prescription
      await addPrescription(selectedToken, medicines);
      
      // 2. Optionally advance the token to COMPLETED immediately 
      await updateTokenStatus(selectedToken, 'COMPLETED');

      setMessage(`Prescription saved! Token #${selectedToken} is now COMPLETED.`);
      setSelectedToken('');
      setMedicines('');
      setLoading(false);
    } catch {
      setError(`Failed to save prescription for Token #${selectedToken}.`);
      setLoading(false);
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>Write Prescription</h2>
      
      {message && <div className={styles.successMessage}>{message}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="selectedToken">Select Patient (Currently Serving)</label>
          <select 
            id="selectedToken" 
            value={selectedToken} 
            onChange={(e) => setSelectedToken(e.target.value)}
            required
            disabled={servingTokens.length === 0}
          >
            <option value="">-- Select Token --</option>
            {servingTokens.map(t => (
              <option key={t.id} value={t.tokenNumber}>
                Token #{t.tokenNumber} - {t.patientName}
              </option>
            ))}
          </select>
          {servingTokens.length === 0 && (
            <small style={{ color: 'var(--text-secondary)' }}>No patients are currently serving.</small>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="medicines">Prescription Details / Medicines</label>
          <textarea 
            id="medicines" 
            value={medicines} 
            onChange={(e) => setMedicines(e.target.value)}
            required
            rows={5}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="e.g. Paracetamol 500mg, 1 tablet twice a day"
          />
        </div>
        
        <button type="submit" disabled={loading || servingTokens.length === 0} className={styles.submitBtn}>
          {loading ? 'Saving...' : 'Save Prescription & Complete Token'}
        </button>
      </form>
    </div>
  );
};

export default AddPrescription;
