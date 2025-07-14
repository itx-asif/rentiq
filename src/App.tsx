import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AddProperty from './pages/Addproperty';
import MyProperties from './pages/Myproperties';
import AllPropertiesAdmin from './pages/allProperties';
import AllUsers from './pages/AllUsers';

import ProtectedRoute from './services/ProtectedRoute';
import AdminRoute from './services/AdminRoutes';
import Properties from './pages/Properties';
import UpdateProfile from './pages/Profile';
import Chat from './pages/chat';
import PropertyRecommendation from './pages/Recommnedtation';
import NotFound from './pages/NotFound';
import RequestReset from './pages/RequestReset';
import Reset from './pages/Reset';
import PropertyDetailPage from './pages/PropertyDetailpage';


function App() {
  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/properties' element={<Properties />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/forget-password' element={<RequestReset />} />
        <Route path='/reset-password/:token' element={<Reset />} />
        <Route path='/recommendations' element={<PropertyRecommendation />} />
        <Route path='/property/:id' element={<PropertyDetailPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Authenticated User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="properties" element={<MyProperties />} />
          <Route path='profile' element={<UpdateProfile />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<AllPropertiesAdmin />} />
          <Route path="users" element={<AllUsers />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
