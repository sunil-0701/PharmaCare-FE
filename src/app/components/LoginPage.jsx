import React, { useState } from "react";
import { Pill, Lock, Mail, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export function LoginPage({ onNavigateBack }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await login(data.email, data.password);
    } catch (error) {
      toast.error("Invalid email or password. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden p-6 font-sans">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-emerald-200/40 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10rem] left-[-10rem] w-[30rem] h-[30rem] bg-teal-200/40 rounded-full blur-[100px] animate-pulse duration-1000" />
      </div>

      <div className="absolute top-8 left-8 flex items-center gap-4 z-10">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5 rounded-2xl shadow-xl shadow-emerald-200">
          <Pill className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg tracking-tight text-gray-900 leading-none">PharmaCare</h1>
          <p className="text-[0.65rem] font-bold text-emerald-600 uppercase tracking-widest mt-1">Health Systems</p>
        </div>
      </div>

      {onNavigateBack && (
        <div className="absolute top-24 left-8 z-10">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white/70 hover:shadow-md transition-all duration-200 font-bold text-sm hover:scale-105 active:scale-95"
            onClick={onNavigateBack}
            type="button"
          >
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
        </div>
      )}

      <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white shadow-2xl shadow-emerald-900/5 relative z-10">
        <div className="text-center mb-10">
          <div className="bg-emerald-50 p-4 rounded-[2rem] mb-6 mx-auto w-fit relative group">
            <div className="absolute inset-0 bg-emerald-200 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
            <Sparkles className="w-8 h-8 text-emerald-600 relative z-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome Back</h2>
          <p className="text-slate-500 font-medium">
            Sign in to access your pharmacy
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-all duration-200 group-focus-within:scale-110" />
              <input
                id="email"
                type="text"
                className={`w-full h-14 pl-14 pr-6 bg-slate-50 border rounded-2xl text-base font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white hover:border-slate-300 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200"
                  }`}
                placeholder="Enter your email"
                {...register("email")}
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-semibold ml-1 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label htmlFor="password" className="text-sm font-bold text-slate-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:scale-105 transition-all duration-200 active:scale-95"
                onClick={() => toast.info("Please contact your administrator to reset your password")}
                disabled={loading}
              >
                Forgot?
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-all duration-200 group-focus-within:scale-110" />
              <input
                id="password"
                type="password"
                className={`w-full h-14 pl-14 pr-6 bg-slate-50 border rounded-2xl text-base font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white hover:border-slate-300 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200"
                  }`}
                placeholder="Enter your password"
                {...register("password")}
                disabled={loading}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs font-semibold ml-1 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-16 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-emerald-600 hover:to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-900/10 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 group"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>

          <div className="pt-6 border-t border-slate-100">
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
              <p className="text-[1rem] text-slate-500 leading-relaxed font-medium flex gap-3">
                <span className="text-emerald-600 text-lg">ℹ️</span>
                <span>
                  User accounts are created and managed by the administrator.
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}