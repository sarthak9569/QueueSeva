import { useQueue } from '../context/QueueContext';
import styles from './DashboardSections.module.css';
import TokenCard from '../components/TokenCard';

const LiveQueue = () => {
  const { tokens } = useQueue();

  // Filter tokens to only show ones currently live in the queue
  const liveTokens = tokens.filter(t => t.status === 'SERVING' || t.status === 'WAITING');

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.title}>Live Queue</h2>
      
      {liveTokens.length > 0 ? (
        <div className={styles.gridContainer}>
          {liveTokens.map(token => (
            <TokenCard key={token.id} token={token} isLive={token.status === 'SERVING'} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          No tokens in the queue.
        </div>
      )}
    </div>
  );
};

export default LiveQueue;
