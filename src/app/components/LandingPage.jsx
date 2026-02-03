import React from "react";
import {
  Pill,
  ShoppingCart,
  Package,
  BarChart3,
  FileText,
  Shield,
  Bell,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";

export function LandingPage({ onNavigateToLogin }) {
  const features = [
    {
      icon: ShoppingCart,
      title: "Point of Sale",
      description:
        "Fast and efficient billing system with barcode scanning, cart management, and instant receipt generation.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description:
        "Real-time stock tracking with low stock alerts, expiry date monitoring, and batch management.",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description:
        "Comprehensive sales reports, profit analysis, and staff performance metrics with visual charts.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: FileText,
      title: "Prescription Management",
      description:
        "Digital prescription upload, verification workflow, and patient history tracking.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description:
        "Secure access control with Admin, Pharmacist, and Inventory Manager roles.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Automated notifications for low stock, expiring medicines, and important updates.",
      gradient: "from-rose-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-main-emerald relative overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-white transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10rem] right-[-10rem] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[30%] left-[-15rem] w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse duration-700" />
      </div>

      <header className="sticky top-4 mx-4 md:mx-auto md:max-w-7xl bg-slate-900/40 backdrop-blur-xl border border-emerald-500/10 shadow-2xl shadow-black/20 rounded-3xl z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5 rounded-2xl shadow-xl shadow-emerald-500/20">
                <Pill className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-extrabold text-xl tracking-tight text-white leading-none">PharmaCare</h1>
                <p className="text-[0.65rem] font-bold text-emerald-400 uppercase tracking-widest mt-1">Health Systems</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-6 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-extrabold text-lg shadow-2xl shadow-emerald-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                onClick={onNavigateToLogin}
              >
                Start Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 flex flex-col items-center text-center px-6">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 animate-pulse" />
          <div className="relative bg-slate-900/50 p-2 rounded-full shadow-2xl border border-emerald-500/20">
            <div className="bg-emerald-500/10 text-emerald-400 px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>NEXT-GEN PHARMACY OS</span>
            </div>
          </div>
        </div>

        <h1 className="text-[2.75rem] md:text-7xl lg:text-[5.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-8 max-w-5xl">
          Everything Your Pharmacy <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent"> Needs in One Place.</span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-12 leading-relaxed font-bold">
          The most advanced pharmacy management platform designed to automate <br className="hidden md:block" />
          inventory, streamline POS, and secure patient records.
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <button
            className="px-10 h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-extrabold text-lg shadow-2xl shadow-emerald-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            onClick={onNavigateToLogin}
          >
            Start Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col items-center text-center mb-20 px-6">
          <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-[0.2em] mb-6">Features</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Powerful Tools for Modern Healthcare</h2>
          <p className="text-xl text-slate-300 max-w-2xl font-bold">Built by pharmacists, for pharmacists. Every tool you need to scale your clinical workspace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-[2.5rem] border border-emerald-500/10 shadow-2xl shadow-black/10 hover:-translate-y-2 hover:shadow-emerald-500/10 transition-all duration-500 group cursor-pointer active:scale-95"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 font-bold leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="bg-slate-900 rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden text-center shadow-3xl">
          {/* CTA Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center">
            <Zap className="text-emerald-400 w-12 h-12 mb-8 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
              Ready to Upgrade Your <br className="hidden md:block" /> Pharmacy Workspace?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl font-bold">Join 5,000+ pharmacies using PharmaCare to deliver better care, faster.</p>
            <button
              className="px-12 h-16 bg-white hover:bg-emerald-50 text-slate-900 rounded-3xl font-extrabold text-xl shadow-2xl transition-all active:scale-95 flex items-center gap-3"
              onClick={onNavigateToLogin}
            >
              Get Access Now
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-2 rounded-xl">
              <Pill className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex flex-col">
              <p className="font-extrabold text-slate-900 tracking-tight">PharmaCare</p>
              <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Healthcare System</p>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400 tracking-wider uppercase">
            © 2026 PharmaCare Architecture Inc.
          </p>

        </div>
      </footer>
    </div>
  );
}
