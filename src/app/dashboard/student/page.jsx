"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDate, setSelectedDate] = useState("24");
  const [user, setUser] = useState({ name: "Student", profilePic: "", id: "" });
  const [slots, setSlots] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const randomId = "#" + Math.floor(1000 + Math.random() * 9000);
    setUser(prev => ({ ...prev, id: randomId }));

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    const profilePic = localStorage.getItem('profilePic');

    if (!token) {
      router.push('/');
      return;
    }
  
    if (role === 'teacher') {
      router.push('/dashboard/teacher');
      return;
    }

    if (name) {
      setUser(prev => ({ ...prev, name, profilePic }));
    }

    fetch('/backend-api/slots')
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(err => console.error('Failed to fetch slots:', err));
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const handleBookSlot = async (slotId) => {
    const result = await Swal.fire({
      title: 'Confirm Booking?',
      text: "Do you want to book this class slot?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0D8B8B',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, book it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/backend-api/slots/book/${slotId.toString()}`, {
          method: 'PATCH'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to book");

        Swal.fire({
          title: 'Success!',
          text: 'Class booked successfully.',
          icon: 'success',
          confirmButtonColor: '#0D8B8B',
          timer: 2000
        });

        const updatedSlots = await fetch('/backend-api/slots').then(r => r.json());
        setSlots(updatedSlots);
      } catch (err) {
        Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonColor: '#0D8B8B'
        });
      }
    }
  };

  return (
    <div className="flex bg-background text-on-surface min-h-screen">
      <aside className="fixed left-0 top-0 h-screen w-65 border-r border-border bg-white shadow-sm flex flex-col p-6 space-y-8 z-50">
        <div className="flex items-center gap-3 px-2">
          <Image src="/mainlogo.png" alt="Eduvio Logo" width={128} height={40} className="h-auto object-contain" />
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === "dashboard" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button onClick={() => setActiveTab("schedule")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === "schedule" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"}`}>
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm font-medium">Class Schedule</span>
          </button>
          <button onClick={() => setActiveTab("students")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === "students" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"}`}>
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Students</span>
          </button>
          <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === "settings" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary hover:bg-surface-muted hover:text-primary"}`}>
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>
        <div className="pt-6 border-t border-border space-y-1">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-text-muted hover:text-error transition-colors rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="ml-65 flex-1 min-h-screen relative bg-surface-muted/30">
        <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 z-40 bg-white/80 backdrop-blur-md border-b border-border flex justify-between items-center px-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-md:hidden max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">search</span>
              <input className="w-full bg-surface-muted border-none rounded-full py-2 pl-10 pr-4 text-sm outline-none" placeholder="Search..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-text-primary">{user.name}</p>
                <p className="text-[10px] text-text-secondary">Student ID: {user.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-primary/10 flex items-center justify-center">
                {user.profilePic ? <img src={user.profilePic} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-primary">person</span>}
              </div>
            </div>
          </div>
        </header>

        <div className="pt-24 px-10 pb-16 max-w-360 mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-text-primary">Welcome, {user.name.split(' ')[0]}!</h2>
            <p className="text-text-secondary mt-2">Select a slot to book your next class.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {slots.map((slot) => (
              <div key={slot._id} className="bg-white p-6 rounded-3xl border border-border hover:shadow-xl transition-all flex flex-col group">
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${slot.status === 'Available' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${slot.status === 'Available' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{slot.status}</span>
                </div>
                <p className="text-xs font-bold text-text-muted uppercase mb-1">{slot.displayDate || slot.date}</p>
                <p className="text-xl font-extrabold text-text-primary mb-6">{slot.startTime} - {slot.endTime}</p>
                
                {slot.status === 'Available' ? (
                  <button 
                    onClick={() => handleBookSlot(slot._id)}
                    className="mt-auto w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98]"
                  >Book Now</button>
                ) : (
                  <button disabled className="mt-auto w-full py-3 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed">Booked</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
