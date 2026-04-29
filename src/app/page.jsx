"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, microsoftProvider } from "@/lib/firebase";
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState("student"); // "student" | "teacher"
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/backend-api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      localStorage.setItem('profilePic', data.profilePic || '');

      router.push(data.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student');
    } catch (err) {
      setError('Connection failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch('/backend-api/auth/social-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
          provider: provider.providerId === 'google.com' ? 'google.com' : 'microsoft.com'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      localStorage.setItem('profilePic', data.profilePic || '');

      router.push(data.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student');
    } catch (err) {
      setError('Social Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary flex flex-col">
      <div className="fixed top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-primary-dark to-secondary z-50" />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-120 bg-surface rounded-3xl shadow-lg shadow-black/5 p-8 md:p-10 border border-border">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image src="/mainlogo.png" alt="Eduvio Logo" width={144} height={60} className="h-auto object-contain" />
            </div>
            <p className="text-sm text-text-secondary mt-1">Access your academic dashboard</p>
          </div>

          <div className="flex bg-surface-muted p-1 rounded-2xl mb-8">
            <button
              onClick={() => setActiveRole("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeRole === "student" ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
            >
              <span className="material-symbols-outlined text-lg">school</span>
              Student
            </button>
            <button
              onClick={() => setActiveRole("teacher")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeRole === "teacher" ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
            >
              <span className="material-symbols-outlined text-lg">person</span>
              Teacher
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-muted border border-border rounded-2xl px-12 py-4 text-sm outline-none focus:border-primary transition-all"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Password</label>
                <Link href="#" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider">Forgot Password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-muted border border-border rounded-2xl px-12 py-4 text-sm outline-none focus:border-primary transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs py-3 px-4 rounded-xl font-medium animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? "Signing in..." : "Sign In to Eduvio"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-surface px-4 text-text-muted">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialLogin(googleProvider)}
              className="flex items-center justify-center gap-3 py-3.5 border border-border rounded-2xl hover:bg-surface-muted transition-all active:scale-[0.98]"
            >
              <Image src="https://www.google.com/favicon.ico" alt="Google" width={18} height={18} />
              <span className="text-xs font-bold text-text-primary">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin(microsoftProvider)}
              className="flex items-center justify-center gap-3 py-3.5 border border-border rounded-2xl hover:bg-surface-muted transition-all active:scale-[0.98]"
            >
              <Image src="https://www.microsoft.com/favicon.ico" alt="Microsoft" width={18} height={18} />
              <span className="text-xs font-bold text-text-primary">Microsoft</span>
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-text-secondary font-medium">
            New to Eduvio? <Link href="/register" className="text-primary font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
