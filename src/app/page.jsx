"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  // ── UI State ── 
  const [activeRole, setActiveRole] = useState("student"); // "student" | "teacher"
  const [showPassword, setShowPassword] = useState(false);

  // ── Form State ── 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API Call
    setTimeout(() => {
      setLoading(false);
      if (activeRole === "teacher") {
        router.push("/teacher/dashboard");
      } else {
        setError("Student Dashboard is coming soon!");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary flex flex-col">

      {/* ── Top Gradient Bar ── */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-dark to-secondary z-50" />

      {/* ── Main Content ── */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[480px] bg-surface rounded-3xl shadow-lg shadow-black/5 p-8 md:p-10 border border-border">

          {/* ── Logo & Title ── */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/mainlogo.png" 
                alt="Eduvio Logo" 
                className="w-36 h-auto object-contain"
              />
            </div>
            
            <p className="text-sm text-text-secondary mt-1">Access your academic dashboard</p>
          </div>

          {/* ── Role Switcher ── */}
          <div className="flex p-1 bg-surface-muted rounded-2xl mb-8 border border-border">
            <button
              type="button"
              onClick={() => setActiveRole("student")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${activeRole === "student"
                  ? "bg-surface text-primary shadow-sm border border-border"
                  : "text-text-secondary hover:text-text-primary"
                }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("teacher")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${activeRole === "teacher"
                  ? "bg-surface text-primary shadow-sm border border-border"
                  : "text-text-secondary hover:text-text-primary"
                }`}
            >
              Teacher
            </button>
          </div>

          {/* ── Login Form ── */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-error-bg text-error rounded-xl text-sm font-medium border border-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-muted border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1 mr-1">
                <label htmlFor="password" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-surface-muted border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {/* TODO: This button toggles showPassword state — you can keep this as-is */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In as {activeRole === "student" ? "Student" : "Teacher"}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface px-4 text-xs text-text-muted font-medium">Or continue with</span>
            </div>
          </div>

          {/* ── Social Buttons ── */}
          <div className="grid grid-cols-2 gap-3">
            {/* TODO: Add Google OAuth handler here */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-surface-muted border border-border rounded-xl hover:bg-white hover:shadow-sm transition-all text-sm font-semibold text-text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            {/* TODO: Add Microsoft OAuth handler here */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-surface-muted border border-border rounded-xl hover:bg-white hover:shadow-sm transition-all text-sm font-semibold text-text-primary"
            >
              <svg className="w-5 h-5" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h11v11H0z" fill="#f35325" />
                <path d="M12 0h11v11H12z" fill="#81bc06" />
                <path d="M0 12h11v11H0z" fill="#05a6f0" />
                <path d="M12 12h11v11H12z" fill="#ffba08" />
              </svg>
              Microsoft
            </button>
          </div>

          {/* ── Sign Up Link ── */}
          <p className="text-center mt-7 text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-border">
        <p className="text-xs text-text-muted">© 2024 Eduvio Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-text-muted hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-xs text-text-muted hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="#" className="text-xs text-text-muted hover:text-primary transition-colors">Help Center</Link>
        </div>
      </footer>

      {/* ── Floating Testimonial Card ── */}
      <div className="fixed bottom-8 right-8 hidden lg:block z-40">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-border shadow-xl flex items-center gap-3 max-w-[240px]">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-primary/30 bg-primary-light flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" style={{ color: "#0D8B8B" }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-primary italic leading-snug">&quot;The best scheduling tool we&apos;ve ever used.&quot;</p>
            <p className="text-xs font-bold mt-1" style={{ color: "#0D8B8B" }}>Dr. Sarah Jenkins</p>
          </div>
        </div>
      </div>

    </div>
  );
}
