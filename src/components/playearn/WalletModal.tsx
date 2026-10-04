import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Wallet, DollarSign, Gem, Diamond, ArrowRight, CheckCircle2, AlertCircle, X, CreditCard, Send } from 'lucide-react';
import { WithdrawalRequest } from './types';
import { submitWithdrawalToFirestore } from './firebaseService';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balanceUSD: number;
  gems: number;
  diamonds: number;
  userId: string;
  userEmail: string;
  onConvertGemsToUSD: (gemsAmount: number, usdEarned: number) => void;
  onConvertDiamondsToUSD: (diamondsAmount: number, usdEarned: number) => void;
  onWithdrawSubmitted: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balanceUSD,
  gems,
  diamonds,
  userId,
  userEmail,
  onConvertGemsToUSD,
  onConvertDiamondsToUSD,
  onWithdrawSubmitted
}) => {
  const [method, setMethod] = useState<'paypal' | 'bank_transfer' | 'sinpe_movil' | 'usdt'>('paypal');
  const [accountDetails, setAccountDetails] = useState('');
  const [amountToWithdraw, setAmountToWithdraw] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const minWithdrawal = 10.00;
  const canWithdraw = balanceUSD >= minWithdrawal && balanceUSD >= amountToWithdraw;

  // Convertir 500 Gemas = $1.00 USD
  const handleConvertGems = () => {
    if (gems < 500) return;
    onConvertGemsToUSD(500, 1.00);
  };

  // Convertir 50 Diamantes = $2.50 USD
  const handleConvertDiamonds = () => {
    if (diamonds < 50) return;
    onConvertDiamondsToUSD(50, 2.50);
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canWithdraw || !accountDetails.trim()) return;

    setIsSubmitting(true);

    const req: WithdrawalRequest = {
      id: `wth-${Date.now()}`,
      userId: userId || 'guest',
      userEmail: userEmail || 'invitado@playearn.app',
      method,
      amountUSD: Number(amountToWithdraw),
      accountDetails,
      status: 'pendiente',
      requestedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };

    await submitWithdrawalToFirestore(req);
    onWithdrawSubmitted(Number(amountToWithdraw));

    setIsSubmitting(false);
    setSuccessMessage(`¡Solicitud de retiro por $${Number(amountToWithdraw).toFixed(2)} USD recibida con éxito!`);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (e) {}

    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Billetera & Retiro de Fondos
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Monetización real por entretenimiento
            </span>
          </div>
        </div>

        {/* Resumen de Saldos */}
        <div className="grid grid-cols-3 gap-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6 text-center">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Saldo Real</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
              ${balanceUSD.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Gemas 💎</span>
            <span className="text-base sm:text-lg font-black text-blue-400 font-mono">
              {gems}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Diamantes 💠</span>
            <span className="text-base sm:text-lg font-black text-purple-400 font-mono">
              {diamonds}
            </span>
          </div>
        </div>

        {/* Canje de Gemas y Diamantes a Dinero Real */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block">
            🔄 Canjear a Dinero Efectivo:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={handleConvertGems}
              disabled={gems < 500}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-blue-500/50 disabled:opacity-40 rounded-xl text-left transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-blue-400 font-bold mb-1">
                <span>500 Gemas 💎</span>
                <span>= $1.00 USD</span>
              </div>
              <span className="text-[10px] text-slate-400 block">
                {gems >= 500 ? 'Canjear ahora ✓' : `Te faltan ${500 - gems} gemas`}
              </span>
            </button>

            <button
              onClick={handleConvertDiamonds}
              disabled={diamonds < 50}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-purple-500/50 disabled:opacity-40 rounded-xl text-left transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-purple-400 font-bold mb-1">
                <span>50 Diamantes 💠</span>
                <span>= $2.50 USD</span>
              </div>
              <span className="text-[10px] text-slate-400 block">
                {diamonds >= 50 ? 'Canjear ahora ✓' : `Te faltan ${50 - diamonds} diamantes`}
              </span>
            </button>
          </div>
        </div>

        {/* Formulario de Retiro */}
        {successMessage ? (
          <div className="p-5 bg-emerald-950/80 border border-emerald-500 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white uppercase">{successMessage}</h4>
            <p className="text-xs text-slate-300 font-mono">
              Los pagos se procesan en un plazo de 24 horas hábiles a tu cuenta registrada.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5 font-bold">
                Método de Pago para Recibir:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'paypal', label: 'PayPal' },
                  { id: 'bank_transfer', label: 'Transferencia Bancaria' },
                  { id: 'sinpe_movil', label: 'SINPE Móvil' },
                  { id: 'usdt', label: 'USDT (Cripto TRC20)' }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setMethod(item.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      method === item.id
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1 font-bold">
                Monto a Retirar ($ USD):
              </label>
              <input
                type="number"
                min="10"
                step="1"
                max={Math.floor(balanceUSD)}
                value={amountToWithdraw}
                onChange={(e) => setAmountToWithdraw(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-sm font-mono text-white outline-none"
                required
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Mínimo de retiro: $10.00 USD • Tu saldo actual: ${balanceUSD.toFixed(2)} USD
              </span>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1 font-bold">
                Datos de tu Cuenta / Correo / Número:
              </label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder={
                  method === 'paypal'
                    ? 'ejemplo@gmail.com'
                    : method === 'sinpe_movil'
                    ? 'Teléfono: 8888-8888 y Nombre'
                    : method === 'usdt'
                    ? 'Dirección de Billetera USDT (TRC20)'
                    : 'IBAN / Cuenta Cliente y Nombre del Titular'
                }
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-white outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !canWithdraw || !accountDetails.trim()}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Procesando...' : 'Solicitar Retiro de Fondos'}</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
