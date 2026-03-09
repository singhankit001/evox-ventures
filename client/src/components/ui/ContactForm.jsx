"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    eventType: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill out the required fields (Name, Email, Message).");
      return;
    }
    
    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Phone: ${formData.phone || "N/A"}\nEvent Type: ${formData.eventType || "N/A"}\nBudget: ${formData.budget || "N/A"}\n\nClient Message:\n${formData.message}`
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center p-20 text-center glass-surface rounded-[3rem] border-white/5"
          >
            <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mb-6 text-3xl font-black text-white tracking-tighter uppercase italic">Inquiry Received</h3>
            <p className="text-zinc-500 max-w-sm mb-12 font-light">
              Your message has been encrypted and delivered to our concierge. We will reach out shortly to discuss your vision.
            </p>
            <button 
              onClick={() => {
                setStatus("idle");
                setFormData({ name: "", email: "", phone: "", budget: "", eventType: "", message: "" });
              }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 hover:text-white transition-colors"
            >
              Initiate New Inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={handleSubmit} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-10 glass-surface p-12 lg:p-16 rounded-[3rem] border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-3 group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-orange-500 transition-colors">Nominal Identity *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-zinc-700 focus:border-orange-500 focus:outline-none transition-all font-light text-lg"
                  placeholder="e.g. Alexander Sterling"
                />
              </div>
              <div className="flex flex-col gap-3 group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-orange-500 transition-colors">Digital Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-zinc-700 focus:border-orange-500 focus:outline-none transition-all font-light text-lg"
                  placeholder="alexander@domain.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-3 group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-orange-500 transition-colors">Event Vertical</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-orange-500 focus:outline-none transition-all font-light text-lg appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#030303] text-zinc-600">Select Architecture...</option>
                  <option value="Corporate" className="bg-[#030303]">Corporate Summit</option>
                  <option value="Sports" className="bg-[#030303]">Sports Management</option>
                  <option value="Social" className="bg-[#030303]">Social Gathering</option>
                  <option value="Travel" className="bg-[#030303]">Travel Retreat</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-orange-500 transition-colors">Fiscal Allocation</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-zinc-700 focus:border-orange-500 focus:outline-none transition-all font-light text-lg"
                  placeholder="e.g. $50k+"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 group">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-orange-500 transition-colors">Narrative Brief *</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full resize-none bg-transparent border-b border-white/10 py-4 text-white placeholder:text-zinc-700 focus:border-orange-500 focus:outline-none transition-all font-light text-lg"
                placeholder="Describe your vision in detail..."
              />
            </div>

            {errorMessage && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500"
              >
                {errorMessage}
              </motion.p>
            )}

            <div className="pt-6">
              <Button
                type="submit"
                disabled={status === "loading"}
                variant="luxury"
                className="w-full group"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="mr-3">Deliver Strategy</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
