import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ColumnManagement from './pages/ColumnManagement';
import NavigationManagement from './pages/NavigationManagement';
import TopicManagement from './pages/TopicManagement';
import ResourceAggregation from './pages/ResourceAggregation';
import UserCenter from './pages/UserCenter';
import SystemMessages from './pages/SystemMessages';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/columns" replace />} />
        <Route path="/columns" element={<ColumnManagement />} />
        <Route path="/navigation" element={<NavigationManagement />} />
        <Route path="/topics" element={<TopicManagement />} />
        <Route path="/resources" element={<ResourceAggregation />} />
        <Route path="/user-center" element={<UserCenter />} />
        <Route path="/system-messages" element={<SystemMessages />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
