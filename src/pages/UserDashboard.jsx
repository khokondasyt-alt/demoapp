import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Video, MessageCircle, Gift, Wallet, LogOut, Plus } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [models, setModels] = useState([]);
  const [walletAmount, setWalletAmount] = useState('');

  useEffect(() => {
    if (!user || user.gender !== 'male') {
      navigate('/login');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const activeModels = users.filter(u => u.gender === 'female' && u.status === 'active');
    setModels(activeModels);
  }, [user, navigate]);

  const handleAddMoney = () => {
    if (!walletAmount || parseFloat(walletAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const newBalance = (user.wallet || 0) + parseFloat(walletAmount);
    updateUser({ ...user, wallet: newBalance });
    
    toast({
      title: "Money Added!",
      description: `₹${walletAmount} added to your wallet successfully`
    });
    
    setWalletAmount('');
  };

  const handleVideoCall = (model) => {
    const callRate = model.callRate || 50;
    if ((user.wallet || 0) < callRate) {
      toast({
        title: "Insufficient Balance",
        description: `You need at least ₹${callRate} to make a call. Please add money to your wallet.`,
        variant: "destructive"
      });
      return;
    }
    
    const callId = `call_${user.id}_${model.id}_${Date.now()}`;
    const activeCall = {
      callId,
      userId: user.id,
      modelId: model.id,
      startTime: Date.now(),
      status: 'active'
    };

    localStorage.setItem('activeCall', JSON.stringify(activeCall));
    navigate(`/video-call/${model.id}`);
  };

  const handleChat = (modelId) => {
    toast({
      description: "🚧 Chat feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleGift = (modelId) => {
    toast({
      description: "🚧 Gift feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome, {user.fullName}!</h1>
            <p className="text-gray-300">Discover amazing models and start connecting</p>
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

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-400">₹{(user.wallet || 0).toFixed(2)}</p>
                  <p className="text-gray-300">Available Balance</p>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={walletAmount}
                    onChange={(e) => setWalletAmount(e.target.value)}
                    className="w-32 bg-white/10 border-white/20 text-white"
                  />
                  <Button
                    onClick={handleAddMoney}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Available Models</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                  <div className="relative">
                    <img 
                      alt={`${model.fullName} - Professional model photo`}
                      className="w-full h-48 object-cover"
                     src="https://images.unsplash.com/photo-1699206791200-414d95e68450" />
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                        Online
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-bold">
                      ₹{model.callRate || 50}/min
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">{model.fullName}</h3>
                    <p className="text-gray-300 text-sm mb-4">Professional Model</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleVideoCall(model)}
                        className="bg-pink-500 hover:bg-pink-600 text-xs"
                      >
                        <Video className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleChat(model.id)}
                        className="bg-purple-500 hover:bg-purple-600 text-xs"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleGift(model.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-xs"
                      >
                        <Gift className="w-3 h-3 mr-1" />
                        Gift
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {models.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No models available at the moment</p>
              <p className="text-gray-500">Check back later for new models!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
