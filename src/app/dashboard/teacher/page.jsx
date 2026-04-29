"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const API_BASE = "http://localhost:5000/api";

export default function TeacherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState({ name: "Teacher", profilePic: "", dept: "Mathematics Dept." });
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({ date: "", startTime: "", endTime: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    const profilePic = localStorage.getItem('profilePic');

    if (!token) {
      router.push('/');
      return;
    }
    if (role !== 'teacher') {
      router.push('/dashboard/student');
      return;
    }

    setUser({ name: name || "Teacher", profilePic, dept: "Mathematics Dept." });
    fetchSlots();
  }, [router]);

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API_BASE}/slots`);
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error('Error fetching slots');
    }
  };

  const handleStartTimeChange = (time) => {
    setFormData(prev => {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes + 15);
      const endHours = String(date.getHours()).padStart(2, '0');
      const endMinutes = String(date.getMinutes()).padStart(2, '0');
      return { ...prev, startTime: time, endTime: `${endHours}:${endMinutes}` };
    });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dateObj = new Date(formData.date);
    const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    try {
      const url = editingId ? `${API_BASE}/slots/${editingId}` : `${API_BASE}/slots`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, displayDate })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      Swal.fire({
        title: editingId ? 'Updated!' : 'Created!',
        text: editingId ? 'Your slot has been updated.' : 'Your new slot is ready.',
        icon: 'success',
        confirmButtonColor: '#0D8B8B',
        timer: 2000
      });

      setFormData({ date: "", startTime: "", endTime: "" });
      setEditingId(null);
      fetchSlots();
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#0D8B8B'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slot) => {
    setEditingId(slot._id.toString());
    setFormData({ date: slot.date, startTime: slot.startTime, endTime: slot.endTime });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_BASE}/slots/${id.toString()}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire({ title: 'Deleted!', text: 'Removed.', icon: 'success', timer: 1500, showConfirmButton: false });
          fetchSlots();
        }
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete.', 'error');
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const stats = [
    { label: "Total Slots", value: slots.length, icon: "list_alt", color: "bg-surface-container-high text-primary" },
    { label: "Available", value: slots.filter(s => s.status === 'Available').length, icon: "event_available", color: "bg-primary-container text-on-primary-container" },
    { label: "Booked", value: slots.filter(s => s.status === 'Booked').length, icon: "bookmark_check", color: "bg-surface-container-highest text-on-surface" },
  ];

  return (
    <div className="flex bg-background text-on-surface min-h-screen">
      <aside className="fixed left-0 top-0 h-screen w-65 border-r border-border bg-white shadow-sm flex flex-col p-6 space-y-8 z-50">
        <div className="flex items-center px-2">
          <Image src="/mainlogo.png" alt="Eduvio Logo" width={128} height={40} className="h-auto object-contain" />
        </div>
        <nav className="flex-1 space-y-1">
          {["Dashboard", "Schedule", "Students", "Settings"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.toLowerCase() ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"}`}
            >
              <span className="material-symbols-outlined">{item === "Dashboard" ? "dashboard" : item === "Schedule" ? "calendar_month" : item === "Students" ? "group" : "settings"}</span>
              <span className="text-sm font-medium">{item}</span>
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-border space-y-1">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-text-muted hover:text-error transition-colors rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="ml-65 pt-16 flex-1 bg-surface-muted/30 min-h-screen">
        <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-white/80 backdrop-blur-md border-b border-border z-40 flex justify-between items-center px-8">
           <div className="flex items-center flex-1 max-w-xl">
             <div className="relative w-full">
               <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">search</span>
               <input className="w-full bg-surface-muted border-none rounded-full pl-10 pr-4 py-2 text-sm outline-none" placeholder="Search..." type="text" />
             </div>
           </div>
           <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-3 text-right">
               <div>
                 <p className="text-sm font-bold text-text-primary">{user.name}</p>
                 <p className="text-[11px] text-text-secondary font-medium">{user.dept}</p>
               </div>
               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10 bg-primary/5 flex items-center justify-center">
                 {user.profilePic ? <img src={user.profilePic} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined">person</span>}
               </div>
             </div>
           </div>
        </header>

        <div className="max-w-360 mx-auto p-8 space-y-8">
          <section className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Welcome, {user.name}</h2>
              <p className="text-text-secondary mt-1">Here is your schedule overview.</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-border flex items-center space-x-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <span className="material-symbols-outlined text-4xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-3xl font-extrabold text-text-primary mt-1">{stat.value}</h3>
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 h-full">
              <div className="bg-white p-8 rounded-4xl shadow-sm border border-border">
                <h4 className="text-xl font-extrabold text-text-primary mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">{editingId ? 'edit' : 'schedule'}</span> {editingId ? 'Update Slot' : 'Add New Slot'}
                </h4>
                <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider ml-1 text-text-secondary">Select Date</label>
                    <input className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3.5 text-sm outline-none" type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider ml-1 text-text-secondary">Start</label>
                      <input className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3.5 text-sm outline-none" type="time" required value={formData.startTime} onChange={(e) => handleStartTimeChange(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider ml-1 text-text-secondary">End</label>
                      <input className="w-full bg-gray-100 border border-border rounded-xl px-4 py-3.5 text-sm outline-none cursor-not-allowed" type="time" readOnly value={formData.endTime} />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 ${editingId ? 'bg-secondary hover:bg-secondary-dark' : 'bg-primary hover:bg-primary-dark'}`}>
                    {loading ? "Processing..." : editingId ? "Update Slot" : "Confirm and Create"}
                  </button>
                  {editingId && <button onClick={() => { setEditingId(null); setFormData({date: "", startTime: "", endTime: ""}) }} type="button" className="w-full text-text-secondary text-sm hover:underline">Cancel Edit</button>}
                </form>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white p-8 rounded-4xl shadow-sm border border-border">
                <h4 className="text-xl font-extrabold text-text-primary flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">view_list</span> Your Slots
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Date</th>
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Time Range</th>
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 text-center">Status</th>
                        <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {slots.map((slot, i) => (
                        <tr key={i} className="hover:bg-surface-muted/50 transition-colors">
                          <td className="py-5 px-2 text-sm font-bold text-text-primary">{slot.displayDate || slot.date}</td>
                          <td className="py-5 px-2 text-sm text-text-secondary">{slot.startTime} - {slot.endTime}</td>
                          <td className="py-5 px-2 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${slot.status === "Available" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
                              {slot.status}
                            </span>
                          </td>
                          <td className="py-5 text-right">
                             <div className="flex gap-2 justify-end">
                               {slot.status === 'Available' ? (
                                 <button onClick={() => handleEdit(slot)} className="p-2 text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit Slot">
                                   <span className="material-symbols-outlined text-lg">edit</span>
                                 </button>
                               ) : (
                                 <button disabled className="p-2 text-text-muted/30 cursor-not-allowed" title="Booked slots cannot be edited">
                                   <span className="material-symbols-outlined text-lg">edit</span>
                                 </button>
                               )}
                               <button onClick={() => handleDelete(slot._id)} className="p-2 text-text-muted hover:text-error hover:bg-error/5 rounded-lg transition-all" title="Delete Slot">
                                 <span className="material-symbols-outlined text-lg">delete</span>
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
