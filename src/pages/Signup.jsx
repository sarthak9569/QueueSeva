import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'patient' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Mock signup logic
      setTimeout(() => {
        login('mock-jwt-token-newuser', { 
          id: formData.role === 'management' ? 'admin-2' : '2', 
          role: formData.role, 
          email: formData.email, 
          name: formData.name 
        });
        navigate('/dashboard');
        setLoading(false);
      }, 1000);
    } catch {
      setError('Error creating account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[520px] relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[28px] text-primary mb-6 border border-slate-100 shadow-xl shadow-blue-500/5 hover:rotate-12 transition-transform">
            <UserPlus size={40} />
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Join QueueSeva</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 italic">Clinical Network Enrollment</p>
        </div>

        <Card className="border-none shadow-[0_32px_64px_-16px_rgba(14,165,233,0.15)] rounded-[48px] overflow-hidden">
          <CardContent className="p-12">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-8 p-6 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-3"
                >
                  <AlertCircle size={20} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Legal Identity"
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  icon={User}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email Portal"
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Security Key"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Finalize Key"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  icon={ShieldCheck}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 italic">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1 text-center sm:text-left">Clinical Designation</label>
                <div className="flex gap-4">
                  {[
                    { val: 'patient', label: 'Patient' },
                    { val: 'management', label: 'Clinician' }
                  ].map((role) => (
                    <label 
                      key={role.val}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-3 p-4 rounded-[20px] cursor-pointer transition-all border-2",
                        formData.role === role.val 
                          ? "bg-white border-primary shadow-lg shadow-primary/5 text-primary ring-4 ring-primary/5" 
                          : "bg-transparent border-transparent text-slate-400 hover:bg-white hover:border-slate-100"
                      )}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.val}
                        className="hidden"
                        checked={formData.role === role.val}
                        onChange={handleChange}
                      />
                      <span className="text-xs font-black uppercase tracking-widest">{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 px-2">
                 <input type="checkbox" id="terms" required className="accent-primary w-4 h-4" />
                 <label htmlFor="terms" className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    By confirming, I agree to the <Link to="#" className="text-primary font-black hover:underline">SLA Policies</Link> and <Link to="#" className="text-primary font-black hover:underline">Encryption Standards</Link>.
                 </label>
              </div>

              <Button
                type="submit"
                className="w-full h-16 text-lg font-black tracking-tighter gap-3 rounded-[24px] shadow-2xl shadow-primary/20 group"
                disabled={loading}
              >
                {loading ? 'Initializing...' : (
                  <>
                    Establish Identity <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center mt-12 text-slate-400 font-medium text-sm">
          Already have an identity record? <Link to="/login" className="font-black text-primary hover:underline transition-all">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;

