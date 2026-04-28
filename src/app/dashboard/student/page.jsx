"use client";

import { useState } from "react";
import Link from "next/link";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDate, setSelectedDate] = useState("24");

  const dates = [
    { day: "Mon", date: "24" },
    { day: "Tue", date: "25" },
    { day: "Wed", date: "26" },
    { day: "Thu", date: "27" },
    { day: "Fri", date: "28" },
  ];

  const slots = [
    { id: 1, date: "Monday, Oct 24", start: "09:00", end: "09:15", status: "Available", type: "normal" },
    { id: 2, date: "Monday, Oct 24", start: "09:15", end: "09:30", status: "Available", type: "normal" },
    { id: 3, date: "Monday, Oct 24", start: "10:00", end: "10:15", status: "Available", type: "popular" },
    { id: 4, date: "Monday, Oct 24", start: "10:30", end: "10:45", status: "Available", type: "normal" },
    { id: 5, date: "Monday, Oct 24", start: "13:00", end: "13:15", status: "Available", type: "normal" },
    { id: 6, date: "Monday, Oct 24", start: "14:45", end: "15:00", status: "Available", type: "normal" },
    { id: 7, date: "Monday, Oct 24", start: "16:15", end: "16:30", status: "Available", type: "normal" },
    { id: 8, date: "Monday, Oct 24", start: "17:00", end: "17:15", status: "Booked", type: "locked" },
  ];

  return (
    <div className="flex bg-background text-on-surface min-h-screen">
      
      {/* ── Side Navigation ── */}
      <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-border bg-white shadow-sm flex flex-col p-6 space-y-8 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white">school</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-primary tracking-tight leading-none">Eduvio</h1>
            <p className="text-[10px] text-text-secondary font-medium uppercase tracking-widest mt-1">Academic Management</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              activeTab === "dashboard" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab("schedule")}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              activeTab === "schedule" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm font-medium">Class Schedule</span>
          </button>
          <button 
            onClick={() => setActiveTab("students")}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              activeTab === "students" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Students</span>
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              activeTab === "settings" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-border space-y-1">
          <Link href="#" className="flex items-center gap-3 p-3 text-text-muted hover:text-primary transition-colors duration-200 rounded-lg">
            <span className="material-symbols-outlined">help</span>
            <span className="text-sm font-medium">Help Center</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 p-3 text-text-muted hover:text-error transition-colors duration-200 rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="ml-[260px] flex-1 min-h-screen relative">
        
        {/* ── Top Navigation ── */}
        <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 z-40 bg-white/80 backdrop-blur-md border-b border-border flex justify-between items-center px-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">search</span>
              <input 
                className="w-full bg-surface-muted border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                placeholder="Search for classes, tutors..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-text-muted hover:text-primary relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
            </button>
            <button className="text-text-muted hover:text-primary">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-text-primary">Alex Rivera</p>
                <p className="text-[10px] text-text-secondary">Student ID: #8829</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApe9PgCCMVQHGAR4XvBsHcOkRhR4XY8ZC5rpoJT1etNumlpngKrdSSUunw-H44550b3WRlRgnsZZGATIX1QE9Ap4uhQoBXICue_fSrAPbZhcPY14gShp4f-O3kVPsK8grcsZLioe39ptuD5LFTtV1QTMUZwT1Uwk6qGIBJrlRjIWJqOxiRxkzJvzSRtKS6_DsIcbUXYKjCWA4iKZJ8sT4nFlLvPEENFV3-3E56fY3JKioJaD6tZvIRJ5rGh71DrgXp-WW-Kr-F8KA" 
                  alt="Student Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="pt-24 px-10 pb-16 max-w-[1440px] mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <nav className="flex items-center gap-2 text-text-muted text-xs font-bold mb-2 uppercase tracking-widest">
                <Link href="#" className="hover:text-primary">Schedule</Link>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span className="text-primary">Booking</span>
              </nav>
              <h2 className="text-4xl font-extrabold text-text-primary">Book Your Class</h2>
              <p className="text-text-secondary mt-2">Select a 15-minute slot that fits your study routine.</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-border">
              <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <span className="text-xs font-bold text-primary">October 24, 2023</span>
              </div>
              <button className="p-2 hover:bg-surface-muted rounded-lg text-text-muted hover:text-primary transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>

          {/* Bento Grid - Date Selection */}
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-border flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-extrabold text-text-primary mb-1">Pick a Date</h3>
                <p className="text-sm text-text-secondary">Showing availability for the next 7 days</p>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {dates.map((d, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedDate(d.date)}
                    className={`flex flex-col items-center gap-2 px-5 py-4 rounded-2xl transition-all min-w-[75px] ${
                      selectedDate === d.date 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "bg-surface-muted text-text-secondary hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider">{d.day}</span>
                    <span className="text-xl font-extrabold">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 bg-primary p-8 rounded-3xl shadow-xl flex flex-col justify-center text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-white/80">bolt</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Recommendation</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Morning Slots</h3>
                <p className="text-sm text-white/80 leading-relaxed">Students who book between 8:00 and 10:00 AM show 40% higher focus levels.</p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
            </div>
          </div>

          {/* Available Slots Grid */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-text-primary">Available Slots</h3>
            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">12 slots found</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {slots.map((slot) => (
              <div 
                key={slot.id} 
                className={`bg-white p-6 rounded-[32px] border transition-all duration-300 group relative overflow-hidden ${
                  slot.status === "Booked" 
                  ? "opacity-60 pointer-events-none bg-surface-muted" 
                  : "border-border shadow-sm hover:shadow-xl hover:-translate-y-1"
                } ${slot.type === "popular" ? "border-primary/20 ring-1 ring-primary/10" : ""}`}
              >
                {slot.type === "popular" && (
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors"></div>
                )}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`p-3 rounded-2xl transition-colors ${
                    slot.status === "Booked" 
                    ? "bg-border text-text-muted" 
                    : slot.type === "popular" ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                  }`}>
                    <span className="material-symbols-outlined">{slot.status === "Booked" ? "lock" : "schedule"}</span>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                    slot.status === "Booked" 
                    ? "bg-border text-text-muted" 
                    : slot.type === "popular" ? "bg-secondary/20 text-secondary" : "bg-success/10 text-success"
                  }`}>
                    {slot.type === "popular" ? "High Demand" : slot.status}
                  </span>
                </div>
                <div className="mb-6 relative z-10">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{slot.date}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-extrabold ${slot.status === "Booked" ? "text-text-muted" : "text-text-primary"}`}>{slot.start}</span>
                    <span className="text-text-muted font-medium">—</span>
                    <span className={`text-lg font-bold ${slot.status === "Booked" ? "text-text-muted" : "text-text-secondary"}`}>{slot.end}</span>
                  </div>
                </div>
                <button 
                  className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md relative z-10 ${
                    slot.status === "Booked" 
                    ? "bg-border text-text-muted shadow-none" 
                    : "bg-primary hover:bg-primary-dark text-white shadow-primary/20"
                  }`}
                >
                  {slot.status === "Booked" ? "Unavailable" : "Book Now"}
                  {slot.status !== "Booked" && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                </button>
              </div>
            ))}
          </div>

          {/* Load More Section */}
          <div className="mt-12 p-10 border-2 border-dashed border-border rounded-[40px] flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-surface-muted rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-text-muted text-3xl">more_horiz</span>
            </div>
            <h4 className="text-xl font-bold text-text-primary">Need a different time?</h4>
            <p className="text-text-secondary mb-8 max-w-xs leading-relaxed">View evening slots or request a custom appointment with your tutor.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="px-8 py-3.5 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-all">Load More Slots</button>
              <button className="px-8 py-3.5 bg-text-primary text-white font-bold rounded-xl hover:bg-black transition-all">Request Callback</button>
            </div>
          </div>
        </div>
      </main>

      {/* ── Floating Action Button ── */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 shadow-secondary/30">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}
