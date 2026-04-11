import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQueue } from '../context/QueueContext';
import styles from './Dashboard.module.css';
import QueueStatusBar from '../components/QueueStatusBar';

// Import all dashboard sections
import LiveQueue from '../dashboard/LiveQueue';
import TokenGenerator from '../dashboard/TokenGenerator';
import TokenHistory from '../dashboard/TokenHistory';
import PrescriptionHistory from '../dashboard/PrescriptionHistory';
import QueueUpdates from '../dashboard/QueueUpdates';
import AddPrescription from '../dashboard/AddPrescription';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats } = useQueue();
  const [activeTab, setActiveTab] = useState('liveQueue');

  // Define tabs array based on user role
  const isManagement = user?.role === 'management';

  let tabs = [
    { id: 'liveQueue', label: 'Live Queue' },
    { id: 'generateToken', label: isManagement ? 'Generate Token' : 'Get Token' },
    { id: 'tokenHistory', label: isManagement ? 'Token History' : 'My Token History' },
    { id: 'prescriptionHistory', label: isManagement ? 'Prescription History' : 'My Prescriptions' }
  ];

  if (isManagement) {
    // Management gets an additional update action
    tabs.splice(2, 0, { id: 'queueUpdates', label: 'Updates' });
    tabs.splice(3, 0, { id: 'addPrescription', label: 'Write Prescription' });
  }

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
      case 'addPrescription':
        return <AddPrescription />;
      default:
        return <LiveQueue />;
    }
  };

  // Derive a user name for personalization
  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.heroBanner}></div>
      <header className={styles.pageHeader}>
        <h1>{isManagement ? `Welcome back, ${userName}!` : `Hello, ${userName}!`}</h1>
        <p>{isManagement ? 'Here\'s your management overview for today.' : 'View your active tickets and medical history.'}</p>
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
