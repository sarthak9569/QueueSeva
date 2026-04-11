import styles from './TokenCard.module.css';

const TokenCard = ({ token, isLive = false }) => {
  if (!token) return null;

  return (
    <div className={`${styles.card} ${isLive ? styles.liveCard : ''}`}>
      <div className={styles.header}>
        <span className={styles.tokenId}>#{token.tokenNumber || '---'}</span>
        <span className={`${styles.status} ${styles[token.status?.toLowerCase() || 'waiting']}`}>
          {token.status || 'WAITING'}
        </span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.patientName}>{token.patientName || 'Unknown Patient'}</h3>
        <p className={styles.department}>{token.department || 'General'}</p>
        <p className={styles.time}>Issued: {token.issuedAt ? new Date(token.issuedAt).toLocaleTimeString() : '---'}</p>
      </div>
    </div>
  );
};

export default TokenCard;
