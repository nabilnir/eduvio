"use client";

import { useState } from "react";
import Link from "next/link";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: ""
  });

  const stats = [
    { label: "Total Slots", value: "12", icon: "list_alt", color: "bg-surface-container-high text-primary" },
    { label: "Available", value: "05", icon: "event_available", color: "bg-primary-container text-on-primary-container" },
    { label: "Booked", value: "07", icon: "bookmark_check", color: "bg-surface-container-highest text-on-surface" },
  ];

  const slots = [
    { date: "Oct 24, 2023", range: "09:00 AM - 09:15 AM", duration: "15m", status: "Available" },
    { date: "Oct 24, 2023", range: "09:15 AM - 09:30 AM", duration: "15m", status: "Booked" },
    { date: "Oct 24, 2023", range: "09:45 AM - 10:00 AM", duration: "15m", status: "Available" },
    { date: "Oct 25, 2023", range: "10:30 AM - 10:45 AM", duration: "15m", status: "Booked" },
    { date: "Oct 25, 2023", range: "11:00 AM - 11:15 AM", duration: "15m", status: "Available" },
  ];

  return (
    <div className="flex bg-background text-on-surface min-h-screen">
      
      {/* ── Side Navigation ── */}
      <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-border bg-white shadow-sm flex flex-col p-6 space-y-8 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-primary tracking-tight">Eduvio</h1>
            <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">Academic Management</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "dashboard" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab("schedule")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "schedule" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm font-medium">Class Schedule</span>
          </button>
          <button 
            onClick={() => setActiveTab("students")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "students" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Students</span>
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "settings" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-border space-y-1">
          <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-text-muted hover:text-primary transition-colors duration-200 rounded-lg">
            <span className="material-symbols-outlined">help</span>
            <span className="text-sm font-medium">Help Center</span>
          </Link>
          <Link href="/" className="flex items-center space-x-3 px-4 py-3 text-text-muted hover:text-error transition-colors duration-200 rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* ── Top Navigation ── */}
      <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-white/80 backdrop-blur-md border-b border-border z-40 flex justify-between items-center px-8">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">search</span>
            <input 
              className="w-full bg-surface-muted border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
              placeholder="Search for students, slots or classes..." 
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-text-muted hover:text-primary transition-all">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button className="text-text-muted hover:text-primary transition-all">
            <span className="material-symbols-outlined text-xl">apps</span>
          </button>
          <div className="h-6 w-px bg-border"></div>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-text-primary">Prof. Aditya Mahya</p>
              <p className="text-[11px] text-text-secondary font-medium">Mathematics Dept.</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
              <img 
                src="https://lh3.googleusercontent.com/aida-/AB6AXuAtNRFio9GN9WyNOeR-LUzC2wQiYojcvI3O9ehzTksRaxhyhD2sNsdDLQFeJkNYHgWdxdjsSSvVGYe3O1TpTPlyP9jrrImXX5tKrqwHbHNObzWOrz_HrFA4C-_PyctKShVTio19DCZ7KltIYOtfzo-uBKqUKoQyt2X1w5as8FeKIMcDvR3tLec3eGBC8NC39ShOeNjTtqFKBlPX5VovA5-m1-fAjMlaEtbG-RO1S1U-gYLJc9HZCV1VUdfwU-jpF7p4ucVOdWWMDuc" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="ml-[260px] pt-16 flex-1 bg-surface-muted/30">
        <div className="max-w-[1440px] mx-auto p-8 space-y-8">
          
          {/* Welcome Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Welcome, Prof. Aditya Mahya</h2>
              <p className="text-text-secondary mt-1">Here is your schedule overview for this week.</p>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-primary-dark active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">add</span>
              <span className="text-sm uppercase tracking-wider">New Slot</span>
            </button>
          </section>

          {/* Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-border flex items-center space-x-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <span className="material-symbols-outlined text-4xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-3xl font-extrabold text-text-primary mt-1 leading-tight">{stat.value}</h3>
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Add New Time Slot Form */}
            <div className="lg:col-span-4 h-full">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-border h-full">
                <h4 className="text-xl font-extrabold text-text-primary mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Add New Slot
                </h4>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Select Date</label>
                    <input 
                      className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" 
                      type="date"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Start Time</label>
                      <input 
                        className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" 
                        step="900" 
                        type="time"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">End Time</label>
                      <input 
                        className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" 
                        step="900" 
                        type="time"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <p className="text-[11px] font-medium text-primary flex items-center gap-2 leading-tight">
                      <span className="material-symbols-outlined !text-xs">info</span>
                      Slots are created in 15-min increments by default.
                    </p>
                  </div>
                  <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all active:scale-[0.98] shadow-md shadow-primary/20" type="submit">
                    Confirm and Create
                  </button>
                </form>
              </div>
            </div>

            {/* Your Slots Table */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-border">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-extrabold text-text-primary flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">view_list</span>
                    Your Slots
                  </h4>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-surface-muted rounded-xl text-text-muted transition-colors"><span className="material-symbols-outlined">filter_list</span></button>
                    <button className="p-2 hover:bg-surface-muted rounded-xl text-text-muted transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Date</th>
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Time Range</th>
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center">Duration</th>
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Status</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {slots.map((slot, i) => (
                        <tr key={i} className="group hover:bg-surface-muted/50 transition-colors">
                          <td className="py-5 px-2 text-sm font-bold text-text-primary">{slot.date}</td>
                          <td className="py-5 px-2 text-sm text-text-secondary">{slot.range}</td>
                          <td className="py-5 px-2 text-sm text-text-secondary text-center font-medium">{slot.duration}</td>
                          <td className="py-5 px-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${
                              slot.status === "Available" 
                              ? "bg-primary/10 text-primary border-primary/10" 
                              : "bg-secondary/10 text-secondary border-secondary/10"
                            }`}>
                              {slot.status}
                            </span>
                          </td>
                          <td className="py-5 text-right pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-text-muted hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-lg">
                                {slot.status === "Available" ? "edit" : "visibility"}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
                  <p className="text-xs font-medium text-text-muted">Showing 5 of 12 slots</p>
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 rounded-lg bg-surface-muted flex items-center justify-center text-text-muted hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                    <span className="text-sm font-bold px-3">1</span>
                    <button className="w-8 h-8 rounded-lg bg-surface-muted flex items-center justify-center text-text-muted hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Anchor Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
            <div className="relative h-64 rounded-[32px] overflow-hidden group">
              <img 
                alt="Campus Community" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzoWIPnJrIW32bMXXNZx8Pr79Rn2YQpuVGq5UIie-ZZLwZH4Qgu3vAmeAY2oiRLTAI5k0qAKiH4e6FQdo37hlGS_au0tbPG25rgZI1ph30Ja6fvuTmaeg70wm2eRk2BuFmnWC2pwZw5ZeuY1DByBDzyMMYWVBSae9bZKIDJYzHpGr0Z2yKYFGviRSoSI_8gnRmxNrJeTuzFZOAXNhNMiqVvJoQJ1Oev9S6bzhGJx_OWpNkz_vwGEv80hABsBp6xg3QsgZIuDuE6y0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h5 className="text-white text-xl font-bold mb-2">Campus Community</h5>
                <p className="text-white/80 text-sm max-w-sm">Connect with your peers and share teaching resources globally.</p>
              </div>
            </div>
            <div className="bg-primary p-8 rounded-[32px] flex flex-col justify-center text-white relative overflow-hidden group shadow-xl shadow-primary/20">
              <div className="relative z-10">
                <h5 className="text-xl font-bold mb-4">Upcoming Department Meeting</h5>
                <p className="text-white/80 text-sm mb-6 max-w-sm leading-relaxed">Friday, Oct 27th at 10:00 AM in Hall B. Agenda: Semester Review & Research Grants.</p>
                <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all active:scale-[0.98]">Set Reminder</button>
              </div>
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 !text-[200px] opacity-10  transition-transform duration-700 group-hover:rotate-0">groups</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
