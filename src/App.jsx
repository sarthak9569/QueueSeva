import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueueProvider } from './context/QueueContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Dashboard Sections
import Welcome from './dashboard/Welcome';
import LiveQueue from './dashboard/LiveQueue';
import TokenGenerator from './dashboard/TokenGenerator';
import TokenHistory from './dashboard/TokenHistory';
import Prescriptions from './dashboard/Prescriptions';
import Profile from './dashboard/Profile';
import FAQ from './dashboard/FAQ';

function App() {
  return (
    <AuthProvider>
      <QueueProvider>
        <Router>
          <Routes>
            {/* Public Routes with Shared Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Auth Routes (Standalone) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              } 
            >
              <Route index element={<Welcome />} />
              <Route path="live" element={<LiveQueue />} />
              <Route path="generate" element={<TokenGenerator />} />
              <Route path="history" element={<TokenHistory />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="faq" element={<FAQ />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueueProvider>
    </AuthProvider>
  );
}

export default App;
