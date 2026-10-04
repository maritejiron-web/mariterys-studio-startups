import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, CheckCircle2, AlertCircle, X, LogIn, UserPlus } from 'lucide-react';
import { registerWithFirebaseEmail, loginWithFirebaseEmail } from './firebaseService';
import { UserProfile } from './types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (tab === 'register') {
        if (password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
        const profile = await registerWithFirebaseEmail(email, password, name);
        onSuccess(profile);
        onClose();
      } else {
        const profile = await loginWithFirebaseEmail(email, password);
        onSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let friendly = 'Error de autenticación. Verifica tus datos e intenta de nuevo.';
      if (err.code === 'auth/email-already-in-use') {
        friendly = 'Este correo ya está registrado. Por favor inicia sesión.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        friendly = 'Correo o contraseña incorrectos.';
      } else if (err.code === 'auth/user-not-found') {
        friendly = 'No existe ninguna cuenta registrada con este correo.';
      } else if (err.message) {
        friendly = err.message;
      }
      setErrorMessage(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <span>Firebase Authentication</span>
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            {tab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h3>
          <p className="text-xs text-slate-400">
            {tab === 'login'
              ? 'Guarda tu progreso y saldo en tu proyecto Firebase play-and-earn-money-aap.'
              : '¡Regístrate y recibe $5.00 USD + 300 Gemas 💎 de bono de bienvenida!'}
          </p>
        </div>

        {/* Pestañas Login vs Register */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => { setTab('login'); setErrorMessage(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setErrorMessage(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer ${
              tab === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse (+ $5 USD)
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1 font-bold">
                Nombre de Usuario:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu Nombre o Apodo"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-mono text-slate-300 block mb-1 font-bold">
              Correo Electrónico:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@ejemplo.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-300 block mb-1 font-bold">
              Contraseña:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-4"
          >
            {tab === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>
              {loading
                ? 'Conectando con Firebase...'
                : tab === 'login'
                ? 'Ingresar a mi Cuenta'
                : 'Crear mi Cuenta Gratis'}
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
