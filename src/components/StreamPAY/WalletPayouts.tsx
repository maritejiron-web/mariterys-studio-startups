import React, { useState } from 'react';
import { 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  RefreshCw,
  Send,
  PlusCircle,
  Globe2
} from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface WalletPayoutsProps {
  userBalanceUSD: number;
  onWithdrawFunds: (amountUSD: number, payoutMethod: string) => void;
}

export const WalletPayouts: React.FC<WalletPayoutsProps> = ({
  userBalanceUSD,
  onWithdrawFunds
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>(userBalanceUSD.toString());
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'sinpe' | 'paypal' | 'tarjeta'>('paypal');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState({
    bankName: 'BAC Credomatic / Banco Nacional',
    iban: 'CR26010200009876543210',
    sinpePhone: '+506 8888-9999',
    paypalEmail: 'Maritejiron@gmail.com',
    tarjetaUltimos4: '4242'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0 || amt > userBalanceUSD) return;

    setIsProcessing(true);
    setTimeout(() => {
      onWithdrawFunds(amt, selectedMethod === 'bank' ? 'Transferencia Bancaria (IBAN)' : selectedMethod === 'sinpe' ? 'SINPE Móvil' : selectedMethod === 'paypal' ? 'PayPal' : 'Tarjeta Débito/Crédito');
      setIsProcessing(false);
      setSuccessMessage(`¡Solicitud enviada con éxito! $${amt.toFixed(2)} transferidos a tu cuenta.`);
      setTimeout(() => setSuccessMessage(''), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 lg:p-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
            <Wallet className="w-3.5 h-3.5" />
            <span>Billetera & Transferencias Directas</span>
          </div>
          <h1 className="text-2xl font-black text-white">Retiros e Ingresos Disponibles</h1>
          <p className="text-xs text-slate-300">Sin comisiones ocultas. Retira a tu cuenta bancaria local o pasarela preferida.</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowDepositModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 fill-slate-950" />
            <span>Recargar Saldo (PayPal / Tarjetas)</span>
          </button>

          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Saldo Actual Disponible:</div>
            <div className="text-3xl font-black font-mono text-emerald-300">${userBalanceUSD.toFixed(2)} USD</div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Withdrawal Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-400" />
            <span>Solicitar Retiro Directo</span>
          </h2>

          <form onSubmit={handleWithdraw} className="space-y-4">
            
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Monto a Retirar (USD):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-lg text-emerald-400 font-bold">$</span>
                <input
                  type="number"
                  step="0.01"
                  max={userBalanceUSD}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xl font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Select Method */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Método de Transferencia:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('bank')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    selectedMethod === 'bank'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 mb-1 text-emerald-400" />
                  <span>Transferencia IBAN</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('sinpe')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    selectedMethod === 'sinpe'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1 text-cyan-400" />
                  <span>SINPE Móvil Local</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('paypal')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    selectedMethod === 'paypal'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4 mb-1 text-blue-400" />
                  <span>PayPal Internacional</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('tarjeta')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    selectedMethod === 'tarjeta'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mb-1 text-purple-400" />
                  <span>Tarjeta Débito / Crédito</span>
                </button>
              </div>
            </div>

            {/* Account Details Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <span className="text-slate-400 font-semibold block">Datos de Destino Configurados:</span>
              {selectedMethod === 'bank' && (
                <div className="font-mono text-slate-300">
                  <p>Banco: {accountDetails.bankName}</p>
                  <p>IBAN: {accountDetails.iban}</p>
                </div>
              )}
              {selectedMethod === 'sinpe' && (
                <div className="font-mono text-slate-300">
                  <p>Teléfono Registrado: {accountDetails.sinpePhone}</p>
                </div>
              )}
              {selectedMethod === 'paypal' && (
                <div className="font-mono text-slate-300">
                  <p>Correo PayPal: {accountDetails.paypalEmail}</p>
                  <p className="text-[11px] text-blue-300">Aceptado en Costa Rica y en más de 200 países del mundo.</p>
                </div>
              )}
              {selectedMethod === 'tarjeta' && (
                <div className="font-mono text-slate-300">
                  <p>Tarjeta Vinculada: **** **** **** {accountDetails.tarjetaUltimos4}</p>
                  <p className="text-[11px] text-purple-300">Recepción directa a tu tarjeta de débito o crédito bancaria local.</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing || userBalanceUSD <= 0}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Procesando Transferencia...</span>
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Confirmar Retiro Inmediato de ${withdrawAmount}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Guarantee & History (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de Pago StreamPAY</span>
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Transferencias procesadas en menos de 24 horas hábiles.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>0% de tarifa de retiro en cuentas nacionales e internacionales.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Cifrado bancario de extremo a extremo (SSL 256-bit).</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Top Up / Recarga de Saldo Modal */}
      <PaymentCheckoutModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        title="Recargar Saldo de Billetera StreamPAY"
        amountUSD={50.00}
        itemDescription="Depósito directo a tu billetera digital StreamPAY para compras, suscripciones y propinas"
        onPaymentSuccess={(methodUsed, txId) => {
          setSuccessMessage(`Recarga exitosa de $50.00 USD procesada mediante ${methodUsed}. Referencia: ${txId}`);
          setTimeout(() => setSuccessMessage(''), 6000);
        }}
      />

    </div>
  );
};
