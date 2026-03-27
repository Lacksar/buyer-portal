'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login as apiLogin } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiLogin(form);
      login(data.user);
      toast.success('Successfully Logged In.');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center pt-[10%] px-4 font-sans text-neutral-900">
      <div className="w-full max-w-sm space-y-10">
        
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Buyer Portal</h1>
          <p className="text-xs font-bold text-neutral-400 mt-2 uppercase tracking-widest">Login to Portal</p>
        </div>

        <div className="bg-white border border-neutral-100 p-8 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pl-1">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="email@example.com" 
                className="h-10 border-neutral-200 focus:border-indigo-600 focus:ring-0 rounded-md bg-neutral-50/20"
                value={form.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</Label>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                className="h-10 border-neutral-200 focus:border-indigo-600 focus:ring-0 rounded-md bg-neutral-50/20"
                value={form.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 bg-indigo-600 hover:bg-neutral-900 text-white font-bold rounded-md transition-all active:scale-95 group">
              {loading ? '...' : (
                <span className="flex items-center gap-2">Login <ArrowRight size={14} className="group-hover:translate-x-1" /></span>
              )}
            </Button>
          </form>

       
        </div>

        <p className="text-sm text-center text-neutral-500">
          New here?{' '}
          <Link href="/signup" className="text-indigo-600 font-bold hover:underline underline-offset-4 font-mono uppercase text-xs">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
