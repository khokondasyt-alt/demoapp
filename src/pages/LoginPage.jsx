import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Heart, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (userType) => {
    if (!formData.mobile || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
      u.mobile === formData.mobile && 
      u.password === formData.password &&
      (userType === 'user' ? u.gender === 'male' : u.gender === 'female')
    );

    if (user) {
      if (user.gender === 'female' && user.status === 'pending') {
        toast({
          title: "Account Pending",
          description: "Your model account is pending admin approval",
          variant: "destructive"
        });
        return;
      }

      login(user);
      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${user.fullName}`
      });

      if (userType === 'user') {
        navigate('/user-dashboard');
      } else {
        navigate('/model-dashboard');
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials or account type",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-white hover:text-pink-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-pink-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Online Fun Service
              </span>
            </div>
            <CardTitle className="text-white text-2xl">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="user" className="text-white data-[state=active]:bg-pink-500">
                  User Login
                </TabsTrigger>
                <TabsTrigger value="model" className="text-white data-[state=active]:bg-purple-500">
                  Model Login
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-white">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('user')}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Login as User
                </Button>
              </TabsContent>

              <TabsContent value="model" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-white">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('model')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Login as Model
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/register')}
                  className="text-pink-400 hover:text-pink-300 font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
