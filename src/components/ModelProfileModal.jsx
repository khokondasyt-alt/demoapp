import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, DollarSign, Percent } from 'lucide-react';

const ModelProfileModal = ({ isOpen, onClose, model, onSave }) => {
  const [editableModel, setEditableModel] = useState(model);

  useEffect(() => {
    setEditableModel(model);
  }, [model]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableModel(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editableModel);
    onClose();
  };

  if (!isOpen) return null;

  const modelShare = ((editableModel.callRate || 50) * (1 - ((editableModel.adminCommission || 20) / 100))).toFixed(2);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-purple-900/80 via-slate-900/80 to-pink-900/80 w-full max-w-lg rounded-2xl border border-white/20 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Model Profile: {model.fullName}</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                <Input id="fullName" name="fullName" value={editableModel.fullName} onChange={handleInputChange} className="bg-white/10 border-white/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-300">Mobile Number</Label>
                <Input id="mobile" name="mobile" value={editableModel.mobile} onChange={handleInputChange} className="bg-white/10 border-white/20 text-white" />
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-pink-400">Payment Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="callRate" className="text-gray-300 flex items-center"><DollarSign className="w-4 h-4 mr-1" />User Call Price (/min)</Label>
                  <Input id="callRate" name="callRate" type="number" value={editableModel.callRate || 50} onChange={handleInputChange} className="bg-white/10 border-white/20 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminCommission" className="text-gray-300 flex items-center"><Percent className="w-4 h-4 mr-1" />Admin Commission (%)</Label>
                  <Input id="adminCommission" name="adminCommission" type="number" value={editableModel.adminCommission || 20} onChange={handleInputChange} className="bg-white/10 border-white/20 text-white" />
                </div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-md border border-green-500/20 text-center">
                <p className="text-green-300 text-sm">Model will receive:</p>
                <p className="text-lg font-bold text-green-400">₹{modelShare} / minute</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose} className="border-gray-500 text-gray-300 hover:bg-gray-500/20">Cancel</Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-pink-500 to-purple-500">Save Changes</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModelProfileModal;
