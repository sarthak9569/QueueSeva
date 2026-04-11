import { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import styles from './Dashboard.module.css';
import QueueStatusBar from '../components/QueueStatusBar';

// Import all dashboard sections
import LiveQueue from '../dashboard/LiveQueue';
import TokenGenerator from '../dashboard/TokenGenerator';
import TokenHistory from '../dashboard/TokenHistory';
import PrescriptionHistory from '../dashboard/PrescriptionHistory';
import QueueUpdates from '../dashboard/QueueUpdates';

const Dashboard = () => {
  const { stats } = useQueue();
  const [activeTab, setActiveTab] = useState('liveQueue');

  // Define tabs array for easy mapping
  const tabs = [
    { id: 'liveQueue', label: 'Live Queue' },
    { id: 'generateToken', label: 'Generate Token' },
    { id: 'queueUpdates', label: 'Updates' },
    { id: 'tokenHistory', label: 'Token History' },
    { id: 'prescriptionHistory', label: 'Prescription History' }
  ];

  // Render the appropriate component based on state
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'liveQueue':
        return <LiveQueue />;
      case 'generateToken':
        return <TokenGenerator />;
      case 'queueUpdates':
        return <QueueUpdates />;
      case 'tokenHistory':
        return <TokenHistory />;
      case 'prescriptionHistory':
        return <PrescriptionHistory />;
      default:
        return <LiveQueue />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Dashboard Control Panel</h1>
        <p>Manage queues, tokens, and patient flow</p>
      </header>

      {/* Overview Stat Bar */}
      <QueueStatusBar stats={stats} />

      {/* Tab Navigation Menu */}
      <nav className={styles.tabMenu}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Active Section Content */}
      <main className={styles.contentArea}>
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Dashboard;
