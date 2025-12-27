
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Settings, Ticket, PartyPopper, BarChart3, Save, RotateCcw, Lock, Eye, EyeOff, LogOut, AlertCircle, ShieldCheck } from 'lucide-react';
import { Attraction, PEEKABOO_DATA } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  siteContent: any;
  setSiteContent: (data: any) => void;
  zones: Attraction[];
  setZones: (zones: Attraction[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, siteContent, setSiteContent, zones, setZones }) => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'zones' | 'tickets' | 'parties'>('overview');
  const [bookings, setBookings] = useState<any[]>([]);

  // Check session on mount or when modal opens
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('peekaboo_admin_session');
    if (sessionAuth === 'true') {
      setIsLoggedIn(true);
    }

    if (isOpen) {
      const savedBookings = JSON.parse(localStorage.getItem('peekaboo_bookings') || '[]');
      setBookings(savedBookings);
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLocked) return;

    // Hardcoded demo password - in production this would be an API call
    if (password === 'peekaboo2025') {
      setIsLoggedIn(true);
      sessionStorage.setItem('peekaboo_admin_session', 'true');
      setPassword('');
      setAttempts(0);
      
      // Log login event
      const logs = JSON.parse(localStorage.getItem('peekaboo_bookings') || '[]');
      logs.push({ 
        id: Date.now(), 
        type: 'Security', 
        details: { event: 'Admin Login Success' }, 
        timestamp: new Date().toISOString() 
      });
      localStorage.setItem('peekaboo_bookings', JSON.stringify(logs));
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError('Incorrect password. Access denied.');
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setError('Too many attempts. Locked for 30 seconds.');
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
          setError('');
        }, 30000);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('peekaboo_admin_session');
    setActiveTab('overview');
  };

  const resetAll = () => {
    if (confirm('Are you sure? This will reset all site content to factory defaults.')) {
      setSiteContent(PEEKABOO_DATA);
      localStorage.removeItem('peekaboo_site_content');
      localStorage.removeItem('peekaboo_zones');
      window.location.reload();
    }
  };

  const handleZoneEdit = (id: string, field: string, value: string) => {
    const updated = zones.map(z => z.id === id ? { ...z, [field]: value } : z);
    setZones(updated);
  };

  const handleTicketEdit = (index: number, field: string, value: any) => {
    const updatedTickets = [...siteContent.tickets];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };
    setSiteContent({ ...siteContent, tickets: updatedTickets });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col font-[Quicksand]"
      >
        {/* Header Bar */}
        <div className="bg-[#E41E26] p-6 text-white flex justify-between items-center shrink-0 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg p-1">
              <img src="input_file_1.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest leading-none">Staff Portal</h2>
              <p className="text-[10px] opacity-70 font-bold uppercase mt-1">Management Terminal v2.0</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
            <X size={20} />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gray-50/50">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Lock size={32} className="text-[#E41E26]" />
              </div>
              <h3 className="text-2xl font-black mb-2">Secure Login</h3>
              <p className="text-gray-400 font-bold text-sm mb-8 text-center px-4">
                Access is restricted to Peekaboo Irbid authorized staff members only.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div className="relative">
                  <input 
                    autoFocus
                    type={showPassword ? "text" : "password"} 
                    placeholder="Manager Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-gray-50 border-2 ${error ? 'border-red-300' : 'border-gray-100'} px-6 py-5 rounded-2xl font-black focus:border-[#00ADEF] outline-none transition-all pr-14`}
                    disabled={isLocked}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#00ADEF] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-red-500 font-bold text-sm px-2"
                    >
                      <AlertCircle size={16} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  disabled={isLocked || !password}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                    isLocked 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#00ADEF] text-white hover:bg-[#009bd7] active:scale-95 shadow-lg shadow-blue-100'
                  }`}
                >
                  <ShieldCheck size={20} />
                  Authorize Access
                </button>
              </form>
              
              <p className="mt-8 text-xs font-bold text-gray-300 uppercase tracking-tighter">
                Session expires on window close
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r-2 border-gray-100 p-6 flex flex-col gap-2 shrink-0">
              {[
                { id: 'overview', icon: BarChart3, label: 'Analytics' },
                { id: 'zones', icon: Settings, label: 'Play Zones' },
                { id: 'tickets', icon: Ticket, label: 'Tickets' },
                { id: 'parties', icon: PartyPopper, label: 'Parties' },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                    activeTab === tab.id ? 'bg-[#E41E26] text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-[#E41E26]'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
              
              <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col gap-3">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-4 rounded-xl text-sm font-black uppercase text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <LogOut size={18} /> Logout Session
                </button>
                <button onClick={resetAll} className="flex items-center gap-3 p-4 text-[10px] font-black uppercase text-red-200 hover:text-red-400 transition-colors">
                  <RotateCcw size={14} /> Factory Reset
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-10 bg-white">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-3xl font-black text-gray-900">Live Traffic</h3>
                       <div className="flex gap-2">
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-black uppercase">System Active</span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {bookings.length === 0 ? (
                        <div className="p-12 text-center text-gray-400 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
                          Waiting for site interactions...
                        </div>
                      ) : (
                        [...bookings].reverse().map((b) => (
                          <div key={b.id} className="bg-white p-6 rounded-[2rem] border-2 border-gray-50 flex items-center justify-between hover:border-[#00ADEF]/20 transition-all group">
                            <div className="flex items-center gap-6">
                              <div className={`p-4 rounded-2xl transition-colors ${
                                b.type === 'Party' ? 'bg-orange-50 text-orange-500' : 
                                b.type === 'Security' ? 'bg-red-50 text-red-500' :
                                'bg-blue-50 text-blue-500'
                              }`}>
                                {b.type === 'Party' ? <PartyPopper size={24} /> : b.type === 'Security' ? <ShieldCheck size={24} /> : <Ticket size={24} />}
                              </div>
                              <div>
                                <p className="font-black text-gray-900">
                                  {b.type === 'Party' ? 'Party Request' : b.type === 'Security' ? 'Security Event' : 'Booking Confirmation'}
                                </p>
                                <p className="text-xs text-gray-400 uppercase font-black">{new Date(b.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black py-2 px-4 rounded-full bg-gray-50 text-gray-500 group-hover:bg-[#00ADEF] group-hover:text-white transition-colors">
                                {JSON.stringify(b.details).slice(1,-1).replace(/"/g, '')}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'zones' && (
                  <motion.div key="zones" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-3xl font-black mb-8 text-gray-900">Play Universe Settings</h3>
                    <div className="grid grid-cols-1 gap-12">
                      {zones.map(zone => (
                        <div key={zone.id} className="bg-gray-50 p-8 rounded-[3rem] border-2 border-white shadow-sm">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-1">
                              <label className="text-xs font-black uppercase text-gray-400 mb-2 block">Zone Identity</label>
                              <input 
                                value={zone.name}
                                onChange={(e) => handleZoneEdit(zone.id, 'name', e.target.value)}
                                className="w-full bg-white px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#F7941D] outline-none font-bold"
                              />
                            </div>
                            <div className="col-span-1">
                              <label className="text-xs font-black uppercase text-gray-400 mb-2 block">Play Type</label>
                              <input 
                                value={zone.category}
                                onChange={(e) => handleZoneEdit(zone.id, 'category', e.target.value)}
                                className="w-full bg-white px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#F7941D] outline-none font-bold"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs font-black uppercase text-gray-400 mb-2 block">Public Description</label>
                              <textarea 
                                value={zone.description}
                                onChange={(e) => handleZoneEdit(zone.id, 'description', e.target.value)}
                                className="w-full bg-white px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#F7941D] outline-none font-bold h-24 resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tickets' && (
                  <motion.div key="tickets" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-3xl font-black mb-8 text-gray-900">Rate Management</h3>
                    <div className="grid grid-cols-1 gap-8">
                      {siteContent.tickets.map((ticket: any, idx: number) => (
                        <div key={idx} className="bg-white p-8 rounded-[3rem] border-4 border-gray-50 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-2 h-full transition-all group-hover:w-4" style={{ backgroundColor: ticket.color }} />
                           <div className="flex justify-between items-center mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ticket.color }} />
                                <h4 className="text-xl font-black">{ticket.name}</h4>
                              </div>
                              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                <label className="text-[10px] font-black uppercase text-gray-400">JD Value</label>
                                <input 
                                  type="number" 
                                  step="0.1"
                                  value={ticket.numericPrice}
                                  onChange={(e) => handleTicketEdit(idx, 'numericPrice', parseFloat(e.target.value))}
                                  className="w-20 bg-transparent font-black text-[#E41E26] outline-none"
                                />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-gray-300 ml-4">Price Display</label>
                                <input 
                                  value={ticket.price}
                                  onChange={(e) => handleTicketEdit(idx, 'price', e.target.value)}
                                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none font-bold"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-gray-300 ml-4">Duration Text</label>
                                <input 
                                  value={ticket.desc}
                                  onChange={(e) => handleTicketEdit(idx, 'desc', e.target.value)}
                                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none font-bold"
                                />
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
