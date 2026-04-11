
import { useAuth } from '../context/AuthContext';
import { useQueue } from '../context/QueueContext';
import styles from './DashboardSections.module.css';
import TokenCard from '../components/TokenCard';

const TokenHistory = () => {
  const { user } = useAuth();
  const { tokens } = useQueue();

  // Filter the global tokens to only show ones belonging to this user
  const userTokens = user ? tokens.filter(t => t.userId === user.id) : [];

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>Your Token History {user && `(${user.email || 'ID: ' + user.id})`}</h2>
      
      {userTokens.length > 0 ? (
        <div className={styles.gridContainer}>
          {userTokens.map(token => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          No past tokens found.
        </div>
      )}
    </div>
  );
};

export default TokenHistory;
