import { useQueue } from '../context/QueueContext';
import { useAuth } from '../context/AuthContext';
import styles from './DashboardSections.module.css';

const PrescriptionHistory = () => {
  const { user } = useAuth();
  const { prescriptions } = useQueue();
  const isManagement = user?.role === 'management';

  // Filter based on role
  const userPrescriptions = isManagement 
    ? prescriptions 
    : prescriptions.filter(rx => rx.userId === user?.id);

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>{isManagement ? 'Overall Medical History' : 'Your Medical History'}</h2>
      
      {userPrescriptions.length > 0 ? (
        <div className={styles.gridContainer}>
          {userPrescriptions.map(rx => (
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
          <img src="/images/empty-state.png" alt="Empty Clipboard" className={styles.emptyImage} />
          <p>
            {isManagement 
              ? "No past prescriptions found in the system." 
              : `Hi ${user?.name || user?.email?.split('@')[0] || 'there'}, you don't have any prescriptions in your history yet.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionHistory;
