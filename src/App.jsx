import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import UserDashboard from '@/pages/UserDashboard';
import ModelDashboard from '@/pages/ModelDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import VideoCallPage from '@/pages/VideoCallPage';
import ChatPage from '@/pages/ChatPage';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Helmet>
          <title>Online Fun Service - Connect & Chat</title>
          <meta name="description" content="Premium video calling and chat service connecting users with verified models" />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/model-dashboard" element={<ModelDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/video-call/:modelId" element={<VideoCallPage />} />
            <Route path="/chat/:modelId" element={<ChatPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
