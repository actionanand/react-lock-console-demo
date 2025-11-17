import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LockScreen, useLockScreen } from './features/lock-screen';
import { ConsoleManager } from './features/console-manager';
import { Home } from './pages/Home';
import { About } from './pages/About';

function ProtectedRoutes() {
  const { authenticated } = useLockScreen();

  if (!authenticated) {
    return <Navigate to="/lock" replace />;
  }

  return (
    <>
      <ConsoleManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  const { authenticated } = useLockScreen();

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route 
          path="/lock" 
          element={authenticated ? <Navigate to="/" replace /> : <LockScreen />} 
        />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
