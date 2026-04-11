import styles from './QueueStatusBar.module.css';

const QueueStatusBar = ({ stats }) => {
  const defaultStats = {
    total: 0,
    waiting: 0,
    serving: 0,
    completed: 0,
    ...stats
  };

  return (
    <div className={styles.container}>
      <div className={styles.statBox}>
        <span className={styles.label}>Total Tokens</span>
        <span className={styles.value}>{defaultStats.total}</span>
      </div>
      <div className={`${styles.statBox} ${styles.waitingBox}`}>
        <span className={styles.label}>Waiting</span>
        <span className={styles.value}>{defaultStats.waiting}</span>
      </div>
      <div className={`${styles.statBox} ${styles.servingBox}`}>
        <span className={styles.label}>Serving</span>
        <span className={styles.value}>{defaultStats.serving}</span>
      </div>
      <div className={`${styles.statBox} ${styles.completedBox}`}>
        <span className={styles.label}>Completed</span>
        <span className={styles.value}>{defaultStats.completed}</span>
      </div>
    </div>
  );
};

export default QueueStatusBar;
