import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { PhoneOff, Mic, Video, ArrowLeft, Timer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const VideoCallPage = () => {
  const navigate = useNavigate();
  const { modelId } = useParams();
  const { user, updateUser } = useAuth();
  const [callDuration, setCallDuration] = useState(0);
  const [model, setModel] = useState(null);

  const endCall = useCallback(() => {
    localStorage.removeItem('activeCall');
    toast({
      title: "Call Ended",
      description: `Duration: ${Math.floor(callDuration / 60)}m ${callDuration % 60}s`
    });
    navigate('/user-dashboard');
  }, [callDuration, navigate]);

  useEffect(() => {
    const activeCallData = localStorage.getItem('activeCall');
    if (!activeCallData || !user) {
      navigate('/user-dashboard');
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const currentModel = allUsers.find(u => u.id === modelId);
    if (!currentModel) {
      endCall();
      return;
    }
    setModel(currentModel);

    const callRate = currentModel.callRate || 50;
    const adminCommission = currentModel.adminCommission || 20;
    const modelShareRate = callRate * (1 - adminCommission / 100);

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    const billingTimer = setInterval(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser.wallet < callRate / 60) {
        toast({
          title: "Insufficient Balance",
          description: "Call ended due to low balance.",
          variant: "destructive"
        });
        endCall();
        return;
      }

      const updatedUserWallet = currentUser.wallet - callRate / 60;
      updateUser({ ...currentUser, wallet: updatedUserWallet });

      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = allUsers.map(u => {
        if (u.id === currentModel.id) {
          return { ...u, earnings: (u.earnings || 0) + modelShareRate / 60 };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));

    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(billingTimer);
    };
  }, [modelId, navigate, user, endCall, updateUser]);

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-full relative"
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
            <div className="text-center">
              <img 
                alt={model?.fullName || 'Model'}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-pink-500 shadow-lg"
                src="https://images.unsplash.com/photo-1699206791200-414d95e68450" />
              <h2 className="text-2xl font-bold text-white mb-2">In call with {model?.fullName}</h2>
              <div className="flex items-center justify-center text-lg text-gray-300">
                <Timer className="w-5 h-5 mr-2" />
                <span>{formatDuration(callDuration)}</span>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
            <div className="text-center">
              <Video className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm">You</p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-md rounded-full px-6 py-4">
              <Button size="lg" variant="outline" className="rounded-full w-14 h-14 border-white/20 text-white hover:bg-white/10"><Mic className="w-6 h-6" /></Button>
              <Button size="lg" variant="outline" className="rounded-full w-14 h-14 border-white/20 text-white hover:bg-white/10"><Video className="w-6 h-6" /></Button>
              <Button size="lg" onClick={endCall} className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600"><PhoneOff className="w-6 h-6" /></Button>
            </div>
          </div>

          <Button onClick={endCall} variant="ghost" className="absolute top-4 left-4 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoCallPage;
