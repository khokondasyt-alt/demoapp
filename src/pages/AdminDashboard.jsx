import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Shield, Users, UserCheck, DollarSign, LogOut, Check, X, Eye, Video } from 'lucide-react';
import ModelProfileModal from '@/components/ModelProfileModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [models, setModels] = useState([]);
  const [pendingModels, setPendingModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    loadData();

    const interval = setInterval(() => {
      const callData = localStorage.getItem('activeCall');
      setActiveCall(callData ? JSON.parse(callData) : null);
    }, 2000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  const loadData = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const regularUsers = allUsers.filter(u => u.gender === 'male');
    const activeModels = allUsers.filter(u => u.gender === 'female' && u.status === 'active');
    const pendingModels = allUsers.filter(u => u.gender === 'female' && u.status === 'pending');
    
    setUsers(regularUsers);
    setModels(activeModels);
    setPendingModels(pendingModels);
  };

  const handleApproveModel = (modelId) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map(u => {
      if (u.id === modelId) {
        return { ...u, status: 'active', callRate: 50, earnings: 0, adminCommission: 20 };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadData();
    
    toast({
      title: "Model Approved",
      description: "Model has been approved and can now accept calls"
    });
  };

  const handleRejectModel = (modelId) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.filter(u => u.id !== modelId);
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadData();
    
    toast({
      title: "Model Rejected",
      description: "Model application has been rejected and removed"
    });
  };

  const handleBlockUser = (userId) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map(u => {
      if (u.id === userId) {
        return { ...u, status: 'blocked' };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadData();
    
    toast({
      title: "User Blocked",
      description: "User has been blocked from the platform"
    });
  };

  const handleViewProfile = (model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const handleSaveModelProfile = (updatedModel) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map(u => u.id === updatedModel.id ? { ...u, ...updatedModel } : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadData();
    toast({
      title: "Profile Updated",
      description: `${updatedModel.fullName}'s profile has been updated.`
    });
  };

  const handleMonitorCall = (modelId) => {
    navigate(`/video-call/${modelId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const totalPlatformEarnings = models.reduce((sum, model) => {
    const callRate = model.callRate || 0;
    const commission = model.adminCommission || 0;
    const modelEarnings = model.earnings || 0;
    if (callRate > 0 && commission > 0 && modelEarnings > 0) {
      const modelShareRate = 1 - (commission / 100);
      const totalCallValue = modelEarnings / modelShareRate;
      return sum + (totalCallValue - modelEarnings);
    }
    return sum;
  }, 0);

  return (
    <>
      <div className="min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-orange-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300">Manage users, models, and platform operations</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-400/50 text-red-400 hover:bg-red-400/10"><LogOut className="w-4 h-4 mr-2" />Logout</Button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-blue-400 text-sm font-medium">Total Users</p><p className="text-2xl font-bold text-white">{users.length}</p></div><Users className="w-8 h-8 text-blue-400" /></div></CardContent></Card>
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-purple-400 text-sm font-medium">Active Models</p><p className="text-2xl font-bold text-white">{models.length}</p></div><UserCheck className="w-8 h-8 text-purple-400" /></div></CardContent></Card>
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-yellow-400 text-sm font-medium">Pending Approval</p><p className="text-2xl font-bold text-white">{pendingModels.length}</p></div><Shield className="w-8 h-8 text-yellow-400" /></div></CardContent></Card>
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-green-400 text-sm font-medium">Platform Earnings</p><p className="text-2xl font-bold text-white">₹{totalPlatformEarnings.toFixed(2)}</p></div><DollarSign className="w-8 h-8 text-green-400" /></div></CardContent></Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="pending" className="text-white data-[state=active]:bg-yellow-500">Pending Models ({pendingModels.length})</TabsTrigger>
                <TabsTrigger value="models" className="text-white data-[state=active]:bg-purple-500">Active Models ({models.length})</TabsTrigger>
                <TabsTrigger value="users" className="text-white data-[state=active]:bg-blue-500">Users ({users.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20"><CardHeader><CardTitle className="text-white">Pending Model Approvals</CardTitle></CardHeader><CardContent><div className="space-y-4">{pendingModels.map((model) => (<div key={model.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"><div><h3 className="text-white font-medium">{model.fullName}</h3><p className="text-gray-300 text-sm">{model.mobile}</p></div><div className="flex space-x-2"><Button size="sm" onClick={() => handleApproveModel(model.id)} className="bg-green-500 hover:bg-green-600"><Check className="w-4 h-4 mr-1" />Approve</Button><Button size="sm" onClick={() => handleRejectModel(model.id)} variant="outline" className="border-red-400/50 text-red-400 hover:bg-red-400/10"><X className="w-4 h-4 mr-1" />Reject</Button></div></div>))}{pendingModels.length === 0 && <div className="text-center py-8"><p className="text-gray-400">No pending model approvals</p></div>}</div></CardContent></Card>
              </TabsContent>

              <TabsContent value="models" className="mt-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20"><CardHeader><CardTitle className="text-white">Active Models</CardTitle></CardHeader><CardContent><div className="space-y-4">{models.map((model) => { const isLive = activeCall?.modelId === model.id; return (<div key={model.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"><div><h3 className="text-white font-medium">{model.fullName}</h3><p className="text-gray-300 text-sm">Rate: ₹{model.callRate || 50}/min</p><p className="text-green-400 text-sm">Earnings: ₹{(model.earnings || 0).toFixed(2)}</p></div><div className="flex items-center space-x-2"><Button size="sm" variant="outline" className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10" onClick={() => handleViewProfile(model)}><Eye className="w-4 h-4 mr-1" />View</Button>{isLive ? (<Button size="sm" className="bg-red-500 hover:bg-red-600 animate-pulse" onClick={() => handleMonitorCall(model.id)}><Video className="w-4 h-4 mr-1" />Monitor Live</Button>) : (<Button size="sm" variant="outline" className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10" disabled><Video className="w-4 h-4 mr-1" />Offline</Button>)}</div></div>);})}{models.length === 0 && <div className="text-center py-8"><p className="text-gray-400">No active models</p></div>}</div></CardContent></Card>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20"><CardHeader><CardTitle className="text-white">Platform Users</CardTitle></CardHeader><CardContent><div className="space-y-4">{users.map((user) => (<div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"><div><h3 className="text-white font-medium">{user.fullName}</h3><p className="text-gray-300 text-sm">{user.mobile}</p><p className="text-blue-400 text-sm">Wallet: ₹{(user.wallet || 0).toFixed(2)}</p></div><Button size="sm" onClick={() => handleBlockUser(user.id)} variant="outline" className="border-red-400/50 text-red-400 hover:bg-red-400/10">Block User</Button></div>))}{users.length === 0 && <div className="text-center py-8"><p className="text-gray-400">No users registered</p></div>}</div></CardContent></Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      {selectedModel && (
        <ModelProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          model={selectedModel}
          onSave={handleSaveModelProfile}
        />
      )}
    </>
  );
};

export default AdminDashboard;
