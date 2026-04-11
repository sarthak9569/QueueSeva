import { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import styles from './DashboardSections.module.css';

const QueueUpdates = () => {
  const { updateTokenStatus } = useQueue();
  const [tokenId, setTokenId] = useState('');
  const [status, setStatus] = useState('SERVING');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      await updateTokenStatus(tokenId, status);
      setMessage(`Token #${tokenId} status successfully updated to ${status}.`);
      setTokenId('');
      setLoading(false);
    } catch {
      setError(`Failed to update. Token #${tokenId} may not exist.`);
      setLoading(false);
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>Update Token Status</h2>
      
      {message && <div className={styles.successMessage}>{message}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleUpdate} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="tokenId">Token ID / Number</label>
          <input 
            type="text" 
            id="tokenId" 
            value={tokenId} 
            onChange={(e) => setTokenId(e.target.value)} 
            required 
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="status">New Status</label>
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="WAITING">WAITING</option>
            <option value="SERVING">SERVING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </form>
    </div>
  );
};

export default QueueUpdates;
