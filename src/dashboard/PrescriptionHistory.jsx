import { useState, useEffect } from 'react';
import styles from './DashboardSections.module.css';

const PrescriptionHistory = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock Data Fetch
    setTimeout(() => {
      setPrescriptions([
        { id: 1, patientName: 'John Doe', tokenNumber: '101', date: Date.now() - 3600000, medicines: 'Paracetamol 500mg' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>Prescription History</h2>
      
      {loading ? (
        <p>Loading prescriptions...</p>
      ) : prescriptions.length > 0 ? (
        <div className={styles.gridContainer}>
          {prescriptions.map(rx => (
            <div key={rx.id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <h3>{rx.patientName}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Token: #{rx.tokenNumber}</p>
              <p><strong>Medicines:</strong> {rx.medicines}</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{new Date(rx.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          No past prescriptions found.
        </div>
      )}
    </div>
  );
};

export default PrescriptionHistory;
