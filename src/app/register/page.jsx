"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [activeRole, setActiveRole] = useState("student"); // "student" | "teacher"
  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement registration logic with your backend
    console.log("Registering as:", activeRole, formData);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="flex-grow flex items-center justify-center p-6 md:p-10 bg-background min-h-screen">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Branding & Visual Anchor */}
        <section className="hidden lg:flex lg:col-span-5 flex-col space-y-8 pr-8">
          <div className="flex items-center space-x-3">
            <img src="/mainlogo.png" alt="Eduvio Logo" className="w-12 h-auto object-contain" />
            <h1 className="text-3xl font-bold text-primary tracking-tight">Eduvio</h1>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-text-primary leading-tight">
              Empowering the next generation of learners.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-md">
              Join a global community of educators and students. Experience a more organized, intuitive, and high-tech approach to academic progress.
            </p>
          </div>

          <div className="relative w-full aspect-video rounded-[32px] overflow-hidden shadow-2xl shadow-primary/10 group">
            <img 
              alt="Students collaborating" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4948gjAiwLBorBq6A98dLkiQySKwG56B7JgUwkhag0o8oEgdCkgsQWKy8dDjUZymeNe73WWR44l6QfZLExf_5p8nbH5Mq1B3MnzMZ50peVUR8iSBM-wPaqCIaefCkSiit9pG16Wxko_gaCquqDJwYPODXp5lH_43jCz-3jRM_EcYCSecIsW9xQ9uaIhc-Ozv8I-Zxp5YHavytDTwIn57Fba_oYOyS3wvB32RN1Sf26vJn_CctoLB5dFhxsXKmDURGxiaT170ej9c" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </section>

        {/* Right Side: Registration Card */}
        <section className="lg:col-span-7 w-full flex justify-center">
          <div className="bg-surface w-full max-w-[560px] p-8 md:p-12 rounded-[32px] shadow-xl shadow-black/5 border border-border">
            
            {/* Header */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full">Step 1 of 2</span>
                <Link href="/" className="text-sm font-semibold text-text-muted hover:text-primary transition-colors">
                  Already have an account?
                </Link>
              </div>
              <h3 className="text-3xl font-extrabold text-text-primary mb-2">Create your account</h3>
              <p className="text-sm text-text-secondary">Let 's start by identifying your role in the classroom.</p>
            </div>

            {/* Step 1: Role Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <button 
                type="button"
                onClick={() => setActiveRole("teacher")}
                className={`group flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                  activeRole === "teacher" 
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                  : "border-border hover:border-primary/40 hover:bg-surface-muted"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  activeRole === "teacher" ? "bg-primary text-white" : "bg-primary/10 text-primary"
                }`}>
                  <span className="material-symbols-outlined text-[28px]">cast_for_education</span>
                </div>
                <span className="font-bold text-text-primary mb-1">I am a Teacher</span>
                <span className="text-xs text-text-muted">Manage courses and slots</span>
              </button>

              <button 
                type="button"
                onClick={() => setActiveRole("student")}
                className={`group flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                  activeRole === "student" 
                  ? "border-secondary bg-secondary/5 shadow-md shadow-secondary/5" 
                  : "border-border hover:border-secondary/40 hover:bg-surface-muted"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  activeRole === "student" ? "bg-secondary text-white" : "bg-secondary/10 text-secondary"
                }`}>
                  <span className="material-symbols-outlined text-[28px]">person</span>
                </div>
                <span className="font-bold text-text-primary mb-1">I am a Student</span>
                <span className="text-xs text-text-muted">Learn and book slots</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center mb-10">
              <div className="flex-grow border-t border-border"></div>
              <span className="px-4 text-[10px] font-bold text-text-muted uppercase tracking-widest bg-surface">Account Details</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            {/* Step 2: Form Fields */}
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">badge</span>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                      placeholder="John Doe" 
                      type="text" 
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Institution</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">account_balance</span>
                    <input 
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                      placeholder="University Name" 
                      type="text" 
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">mail</span>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                    placeholder="john@example.com" 
                    type="email" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">lock</span>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                    placeholder="••••••••" 
                    type="password" 
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70" 
                  type="submit"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-center text-[11px] text-text-muted mt-6 px-4">
                By registering, you agree to Eduvio 's <Link className="text-primary font-bold hover:underline" href="#">Terms of Service</Link> and <Link className="text-primary font-bold hover:underline" href="#">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
