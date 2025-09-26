import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Upload, DollarSign, Users, Video, MessageCircle, LogOut, Camera } from 'lucide-react';

const ModelDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [callRequests, setCallRequests] = useState([]);
  const [profileData, setProfileData] = useState({
    bio: '',
    rate: ''
  });

  useEffect(() => {
    if (!user || user.gender !== 'female' || user.status !== 'active') {
      navigate('/login');
      return;
    }

    setProfileData({
      ...profileData,
      rate: user.callRate || 50
    });

    // Mock call requests
    setCallRequests([
      { id: 1, userName: 'John Doe', type: 'video', time: '2 min ago' },
      { id: 2, userName: 'Mike Smith', type: 'chat', time: '5 min ago' }
    ]);
  }, [user, navigate]);

  const handleProfileUpdate = () => {
    toast({
      description: "🚧 Profile update feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handlePhotoUpload = () => {
    toast({
      description: "🚧 Photo upload feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleAcceptCall = (requestId) => {
    toast({
      description: "🚧 Call acceptance feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleRejectCall = (requestId) => {
    setCallRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Call Rejected",
      description: "Call request has been declined"
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Model Dashboard</h1>
            <p className="text-gray-300">Welcome back, {user.fullName}!</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-400/50 text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 grid md:grid-cols-3 gap-6 mb-6"
          >
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Total Earnings</p>
                    <p className="text-2xl font-bold text-white">₹{user.earnings || 0}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">Active Chats</p>
                    <p className="text-2xl font-bold text-white">3</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 text-sm font-medium">Your Rate</p>
                    <p className="text-2xl font-bold text-white">₹{user.callRate || 50}/min</p>
                  </div>
                  <Video className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Management */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Profile Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    onClick={handlePhotoUpload}
                    className="bg-pink-500 hover:bg-pink-600 h-32 flex-col"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    Upload Profile Photo
                  </Button>
                  <Button
                    onClick={handlePhotoUpload}
                    className="bg-purple-500 hover:bg-purple-600 h-32 flex-col"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    Upload Gallery
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Bio</Label>
                    <Input
                      placeholder="Tell users about yourself..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Rate per minute (Set by Admin)</Label>
                    <Input
                      type="number"
                      value={profileData.rate}
                      readOnly
                      className="bg-white/20 border-white/30 text-white cursor-not-allowed"
                    />
                  </div>
                  <Button
                    onClick={handleProfileUpdate}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                  >
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call Requests */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Call Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {callRequests.map((request) => (
                    <div key={request.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{request.userName}</span>
                        <span className="text-xs text-gray-400">{request.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 capitalize">{request.type} call</span>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptCall(request.id)}
                            className="bg-green-500 hover:bg-green-600 text-xs"
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRejectCall(request.id)}
                            variant="outline"
                            className="border-red-400/50 text-red-400 hover:bg-red-400/10 text-xs"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {callRequests.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No pending requests</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModelDashboard;
