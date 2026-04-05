"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Check, ChevronRight, LayoutGrid, 
  Users, MapPin, Calculator, Sparkles, Trophy, 
  Zap, Clock, Crown, Shield, Camera, Music, Utensils
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// --- PRICING DATA & LOGIC ---

const EVENT_TYPES = [
  { id: "wedding", label: "Wedding", base: 150000, desc: "Elite wedding planning & coordination." },
  { id: "engagement", label: "Engagement", base: 65000, desc: "Premium ring ceremonies & setups." },
  { id: "haldi", label: "Haldi / Mehendi / Sangeet", base: 45000, desc: "Vibrant traditional celebrations." },
  { id: "reception", label: "Reception", base: 85000, desc: "Elegant evening grand scale events." },
  { id: "birthday", label: "Birthday Party", base: 25000, desc: "Curated social party planning." },
  { id: "kids-birthday", label: "Kids Birthday Party", base: 11000, desc: "High-energy themed kids celebrations." },
  { id: "anniversary", label: "Anniversary", base: 30000, desc: "Intimate milestone celebrations." },
  { id: "club-party", label: "Club Party", base: 40000, desc: "High-energy nightlife production." },
  { id: "corporate", label: "Corporate Event", base: 50000, desc: "Professional brand-led gatherings." },
  { id: "product-launch", label: "Product Launch", base: 75000, desc: "High-impact brand activation." },
  { id: "conference", label: "Conference / Seminar", base: 60000, desc: "Corporate knowledge sharing." },
  { id: "live-show", label: "Concert / Live Show", base: 120000, desc: "Large scale tour & stage production." },
  { id: "house-party", label: "Private House Party", base: 15000, desc: "Intimate elite domestic gatherings." },
  { id: "beach-trip", label: "Beach / Leisure Getaway", base: 55000, desc: "Premium coastal & travel curation." },
  { id: "proposal", label: "Luxury Proposal Setup", base: 25000, desc: "Romantic high-end bespoke setups." },
  { id: "custom", label: "Custom Event", base: 50000, desc: "Tailored unique experience design." },
];

const GUEST_COUNTS = [
  { id: "0-25", label: "0–25", mult: 1.0 },
  { id: "25-50", label: "25–50", mult: 1.3 },
  { id: "50-100", label: "50–100", mult: 1.8 },
  { id: "100-200", label: "100–200", mult: 2.5 },
  { id: "200-500", label: "200–500", mult: 4.2 },
  { id: "500+", label: "500+", mult: 7.0 },
];

const VENUE_TYPES = [
  { id: "home", label: "Home", mult: 1.0 },
  { id: "banquet", label: "Banquet Hall", mult: 1.2 },
  { id: "lawn", label: "Lawn", mult: 1.5 },
  { id: "beach", label: "Beachside", mult: 1.8 },
  { id: "resort", label: "Resort", mult: 2.0 },
  { id: "hotel", label: "Hotel Ballroom", mult: 2.2 },
  { id: "rooftop", label: "Rooftop", mult: 1.6 },
  { id: "ground", label: "Open Ground", mult: 2.5 },
];

const SERVICES = [
  { id: "planning", label: "Event Planning", cost: 15000, icon: Trophy },
  { id: "decor", label: "Theme & Decor", cost: 50000, icon: Sparkles },
  { id: "lighting", label: "Lighting", cost: 15000, icon: Zap },
  { id: "music", label: "DJ / Music", cost: 12000, icon: Music },
  { id: "live", label: "Live Artist", cost: 25000, icon: Music },
  { id: "photo", label: "Photography", cost: 20000, icon: Camera },
  { id: "video", label: "Videography", cost: 35000, icon: Camera },
  { id: "catering", label: "Catering", cost: 50000, icon: Utensils },
  { id: "hospitality", label: "Guest Management", cost: 15000, icon: Shield },
];

const BUDGET_TIERS = [
  { id: "economy", label: "Economy", mult: 0.8 },
  { id: "premium", label: "Premium", mult: 1.5 },
  { id: "luxury", label: "Luxury", mult: 2.5 },
  { id: "ultra", label: "Ultra Luxury", mult: 4.5 },
];

export default function QuotationPage() {

  const [formData, setFormData] = useState({
    eventType: "wedding",
    guests: "50-100",
    venue: "banquet",
    budget: "premium",
    services: ["planning", "decor", "lighting", "photo"],
    duration: "Full Day",
  });

  const quote = useMemo(() => {
    const event = EVENT_TYPES.find(e => e.id === formData.eventType);
    const guestMult = GUEST_COUNTS.find(g => g.id === formData.guests).mult;
    const venueMult = VENUE_TYPES.find(v => v.id === formData.venue).mult;
    const budgetMult = BUDGET_TIERS.find(b => b.id === formData.budget).mult;
    
    let servicesTotal = formData.services.reduce((acc, sId) => {
      const s = SERVICES.find(sv => sv.id === sId);
      return acc + (s ? s.cost : 0);
    }, 0);

    const baseCost = event.base + servicesTotal;
    const rawTotal = baseCost * guestMult * venueMult * budgetMult;
    
    return {
      total: Math.round(rawTotal),
      min: Math.round(rawTotal * 0.85),
      max: Math.round(rawTotal * 1.25),
      planning: Math.round(event.base * budgetMult),
      decor: Math.round(50000 * budgetMult * venueMult),
      catering: Math.round(servicesTotal * 0.4 * guestMult)
    };
  }, [formData]);

  const formatINR = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const toggleService = (id) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id) 
        ? prev.services.filter(s => s !== id) 
        : [...prev.services, id]
    }));
  };

  return (
    <main className="min-h-screen bg-[var(--bg-deep)] pt-32 pb-24 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* Header */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="eyebrow mb-6">Concierge Pricing Engine</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
              Instant Event <br />
              <span className="text-orange-500">Quotation</span>
            </h1>
            <p className="text-zinc-400 max-w-xl text-lg font-light leading-relaxed">
              Tailored estimates calculated in real-time based on the elite Pune market standards for your signature event.
            </p>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Main Form Area */}
          <div className="space-y-12 bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl">
            
            {/* Step 1: Core Definitions */}
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold border border-orange-500/20">1</div>
                <h2 className="text-2xl font-black text-white tracking-tight">Event Blueprint</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Event Type</label>
                  <select 
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-orange-500 transition-colors cursor-pointer appearance-none outline-none"
                  >
                    {EVENT_TYPES.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Guest Count</label>
                  <div className="flex flex-wrap gap-2">
                    {GUEST_COUNTS.map(g => (
                      <button
                        key={g.id}
                        onClick={() => setFormData({...formData, guests: g.id})}
                        className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all ${formData.guests === g.id ? 'bg-orange-500 text-black' : 'bg-white/5 text-zinc-400 border border-white/5 hover:border-white/20'}`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Venue Atmosphere</label>
                  <select 
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-orange-500 transition-colors cursor-pointer appearance-none outline-none"
                  >
                    {VENUE_TYPES.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Budget Tier</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_TIERS.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setFormData({...formData, budget: b.id})}
                        className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all ${formData.budget === b.id ? 'bg-orange-500 text-black' : 'bg-white/5 text-zinc-400 border border-white/5 hover:border-white/20'}`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Signature Services */}
            <div className="space-y-10 pt-10 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold border border-orange-500/20">2</div>
                <h2 className="text-2xl font-black text-white tracking-tight">Expert Services</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all duration-300 ${formData.services.includes(s.id) ? 'bg-orange-500/10 border-orange-500/40 text-orange-400' : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:border-white/20'}`}
                  >
                    <s.icon className={`h-6 w-6 mb-3 ${formData.services.includes(s.id) ? 'text-orange-500' : 'text-zinc-600'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <aside className="sticky top-32 space-y-8">
            <motion.div
              layout
              className="bg-zinc-950 border border-orange-500/20 rounded-[2.5rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent pointer-events-none" />
              
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Live Quote</span>
                <span className="flex items-center gap-2 text-white/40 text-[9px] uppercase font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Synced
                </span>
              </div>

              <div className="space-y-2 mb-8">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Estimated Total</div>
                <div className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
                  {formatINR(quote.total)}
                </div>
                <div className="text-[10px] font-bold text-zinc-500 tracking-wider">
                  Range: {formatINR(quote.min)} — {formatINR(quote.max)}
                </div>
              </div>

              <div className="space-y-4 mb-10 pt-6 border-t border-white/5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-500 uppercase tracking-widest">Planning Fee</span>
                  <span className="text-white">{formatINR(quote.planning)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-500 uppercase tracking-widest">Decor Est.</span>
                  <span className="text-white">{formatINR(quote.decor)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-500 uppercase tracking-widest">Production Est.</span>
                  <span className="text-white">{formatINR(quote.catering)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                   href="/contact" 
                   variant="luxury" 
                   className="w-full justify-center py-6"
                >
                  Request Proposal
                </Button>
                <div className="text-center">
                  <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest p-4">
                    Recommended Package: {formData.budget.toUpperCase()} ELITE
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
               <Shield className="h-5 w-5 text-zinc-500 mb-3" />
               <p className="text-[10px] text-zinc-600 font-semibold leading-relaxed tracking-wider uppercase">
                  Final quotation may vary based on venue availability, artist selection, and custom production requirements.
               </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
