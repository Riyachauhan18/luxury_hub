'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';
import { loginAdminAction, requestPasswordResetAction } from '../../actions';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Forgot Password State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [resetLoading, setResetLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginAdminAction(email, password);
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(res.error || 'Authentication failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus(null);
    setResetLoading(true);

    try {
      const res = await requestPasswordResetAction(resetEmail);
      setResetStatus(res);
      if (res.success && res.requireOtp) {
        setIsOtpMode(true);
      }
    } catch (err) {
      setResetStatus({
        success: false,
        message: 'Unable to process reset request. Please try again.'
      });
    } finally {
      setResetLoading(false);
    }
  };

  const handlePasswordResetConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus(null);

    if (newPassword !== confirmPassword) {
      setResetStatus({ success: false, message: 'New passwords do not match.' });
      return;
    }

    setResetLoading(true);

    try {
      const { confirmPasswordResetAction } = await import('../../actions');
      const res = await confirmPasswordResetAction(resetEmail, otpCode, newPassword);
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setResetStatus({ success: false, message: res.error || 'Password reset failed.' });
      }
    } catch (err) {
      setResetStatus({ success: false, message: 'An error occurred while resetting password.' });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FDFBF7] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full space-y-8 bg-[#0C0C0C] border border-white/10 p-8 md:p-10 shadow-2xl relative">
        
        {/* Header Logo */}
        <div className="text-center space-y-4">
          <div className="relative h-12 w-48 mx-auto">
            <Image
              src="/logo.png"
              alt="THE LUXURY HUB"
              fill
              className="object-contain filter brightness-110"
              priority
            />
          </div>
          <div className="text-[10px] tracking-[0.25em] text-[#C5A85C] uppercase font-medium">
            ADMINISTRATIVE DASHBOARD PORTAL
          </div>
        </div>

        {/* FORGOT PASSWORD VIEW */}
        {isForgotMode ? (
          <div className="space-y-6 pt-2">
            <div className="flex items-center space-x-2 text-xs text-neutral-400 border-b border-white/5 pb-3">
              <KeyRound className="w-4 h-4 text-[#C5A85C]" />
              <span className="font-semibold text-neutral-200 uppercase tracking-wider">
                {isOtpMode ? 'ENTER RESET CODE & NEW PASSWORD' : 'RECOVER ADMIN PASSWORD'}
              </span>
            </div>

            {resetStatus && (
              <div className={`p-4 text-xs leading-relaxed border ${
                resetStatus.success 
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                  : 'bg-red-950/40 border-red-500/30 text-red-300'
              }`}>
                {resetStatus.message}
              </div>
            )}

            {!isOtpMode ? (
              <form onSubmit={handlePasswordResetRequest} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase flex items-center">
                    <Mail className="w-3 h-3 mr-1.5 text-[#C5A85C]" /> ENTER ADMIN / OWNER EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="admin@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full text-xs p-4 bg-[#050505] border border-white/10 text-warm-ivory placeholder-neutral-600 rounded-none focus:border-[#C5A85C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {resetLoading ? 'DISPATCHING...' : 'SEND RESET VERIFICATION CODE'} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordResetConfirm} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase flex items-center">
                    <KeyRound className="w-3 h-3 mr-1.5 text-[#C5A85C]" /> 6-DIGIT VERIFICATION CODE
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center text-base tracking-[0.3em] font-mono p-3.5 bg-[#050505] border border-white/10 text-warm-ivory placeholder-neutral-700 rounded-none focus:border-[#C5A85C]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase flex items-center">
                    <Lock className="w-3 h-3 mr-1.5 text-[#C5A85C]" /> NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full text-xs p-4 bg-[#050505] border border-white/10 text-warm-ivory placeholder-neutral-600 rounded-none focus:border-[#C5A85C]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase flex items-center">
                    <Lock className="w-3 h-3 mr-1.5 text-[#C5A85C]" /> CONFIRM NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-xs p-4 bg-[#050505] border border-white/10 text-warm-ivory placeholder-neutral-600 rounded-none focus:border-[#C5A85C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {resetLoading ? 'UPDATING...' : 'UPDATE PASSWORD & LOGIN'} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
            )}

            <button
              onClick={() => { setIsForgotMode(false); setIsOtpMode(false); setResetStatus(null); }}
              className="text-xs text-neutral-400 hover:text-[#C5A85C] transition-colors flex items-center pt-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> BACK TO LOGIN
            </button>
          </div>
        ) : (
          /* LOGIN VIEW */
          <div className="space-y-6 pt-2">
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-300 text-xs tracking-wide leading-relaxed">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase flex items-center">
                  <Mail className="w-3 h-3 mr-1.5 text-[#C5A85C]" /> EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-4 bg-[#050505] border border-white/10 text-warm-ivory placeholder-neutral-600 rounded-none focus:border-[#C5A85C]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase flex items-center">
                    <Lock className="w-3 h-3 mr-1.5 text-[#C5A85C]" /> PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(true)}
                    className="text-[10px] text-[#C5A85C] hover:text-white transition-colors uppercase font-medium"
                  >
                    FORGOT PASSWORD?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs p-4 bg-[#050505] border border-white/10 text-warm-ivory placeholder-neutral-600 rounded-none focus:border-[#C5A85C]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? 'AUTHENTICATING...' : 'LOGIN TO ADMIN'} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
