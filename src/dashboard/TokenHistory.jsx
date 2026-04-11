
import { useAuth } from '../context/AuthContext';
import { useQueue } from '../context/QueueContext';
import styles from './DashboardSections.module.css';
import TokenCard from '../components/TokenCard';

const TokenHistory = () => {
  const { user } = useAuth();
  const { tokens } = useQueue();
  const isManagement = user?.role === 'management';

  // Filter the global tokens to only show ones belonging to this user, unless management
  const userTokens = isManagement ? tokens : (user ? tokens.filter(t => t.userId === user.id) : []);

  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>{isManagement ? 'Overall Token History' : `${userName}'s Token History`}</h2>
      
      {userTokens.length > 0 ? (
        <div className={styles.gridContainer}>
          {userTokens.map(token => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <img src="/images/empty-state.png" alt="Empty Folder" className={styles.emptyImage} />
          <p>
            {isManagement 
              ? "No tokens have been generated yet." 
              : `Hi ${userName}, you don't have any past tokens.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenHistory;
