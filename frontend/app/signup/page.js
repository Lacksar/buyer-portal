'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup as apiSignup } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiSignup(form);
      login(data.user);
      toast.success('Account created.');
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
          <p className="text-xs font-bold text-neutral-400 mt-2 uppercase tracking-widest">Sign Up for Portal</p>
        </div>

        <div className="bg-white border border-neutral-100 p-8 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pl-1">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                className="h-10 border-neutral-200 focus:border-indigo-600 focus:ring-0 rounded-md bg-neutral-50/20"
                value={form.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pl-1">Email Address</Label>
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
            
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pl-1">Password</Label>
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

            <Button type="submit" disabled={loading} className="w-full h-11 bg-indigo-600 hover:bg-neutral-900 text-white font-bold rounded-md transition-all active:scale-95 mt-2">
              {loading ? '...' : 'Create Account'}
            </Button>
          </form>

        
        </div>

        <p className="text-sm text-center text-neutral-500">
          Already registered?{' '}
          <Link href="/login" className="text-indigo-600 font-bold hover:underline underline-offset-4 font-mono uppercase text-xs">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
