import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Video, MessageCircle, Shield } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 p-6 flex justify-between items-center"
      >
        <div className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-pink-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Online Fun Service
          </span>
        </div>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="border-pink-400/50 text-pink-400 hover:bg-pink-400/10"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            Register
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Connect
              </span>
              <br />
              <span className="text-white">& Chat</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              Premium video calling and chat service connecting you with verified models worldwide
            </p>
            <div className="flex space-x-4">
              <Button 
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-lg px-8 py-4"
              >
                Get Started
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10 text-lg px-8 py-4"
              >
                Sign In
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                alt="Featured model - Beautiful woman with elegant styling"
                className="w-full h-[600px] object-cover"
               src="https://images.unsplash.com/photo-1699206791200-414d95e68450" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">Sophia</h3>
                <p className="text-pink-300">Featured Model</p>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" />
                  <span className="text-sm">Online Now</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-32 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Video className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">HD Video Calls</h3>
            <p className="text-gray-300">Crystal clear video quality with instant connection</p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real-time Chat</h3>
            <p className="text-gray-300">Instant messaging with multimedia support</p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Shield className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-300">End-to-end encryption for your privacy</p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Need help? Contact us at{' '}
            <a href="mailto:onlinefunservice365@gmail.com" className="text-pink-400 hover:text-pink-300">
              onlinefunservice365@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
