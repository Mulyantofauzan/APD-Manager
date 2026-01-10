import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { authService } from './services/authService';
import { ROUTES } from './constants/config';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MasterApdPage from './pages/MasterApdPage';
import KaryawanPage from './pages/KaryawanPage';
import TransaksiPage from './pages/TransaksiPage';
import PemusnahanPage from './pages/PemusnahanPage';
import SettingsPage from './pages/SettingsPage';
import './styles/globals.css';

function App() {
  const { setUser, setLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setLoading]);

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={isAuthenticated ? <DashboardPage /> : <Navigate to={ROUTES.LOGIN} />}
        />
        <Route
          path={ROUTES.MASTER_APD}
          element={isAuthenticated ? <MasterApdPage /> : <Navigate to={ROUTES.LOGIN} />}
        />
        <Route
          path={ROUTES.KARYAWAN}
          element={isAuthenticated ? <KaryawanPage /> : <Navigate to={ROUTES.LOGIN} />}
        />
        <Route
          path={ROUTES.TRANSAKSI}
          element={isAuthenticated ? <TransaksiPage /> : <Navigate to={ROUTES.LOGIN} />}
        />
        <Route
          path={ROUTES.PEMUSNAHAN}
          element={isAuthenticated ? <PemusnahanPage /> : <Navigate to={ROUTES.LOGIN} />}
        />
        <Route
          path={ROUTES.SETTINGS}
          element={isAuthenticated ? <SettingsPage /> : <Navigate to={ROUTES.LOGIN} />}
        />
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} />} />
      </Routes>
    </Router>
  );
}

export default App;
