import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  ArrowDownRight, 
  CheckCircle2, 
  Lock, 
  AlertCircle,
  Building2,
  Bitcoin,
  PhoneCall,
  Clock,
  Info,
  DollarSign,
  HelpCircle,
  Receipt,
  Sparkles
} from 'lucide-react';
import { WithdrawalRequest } from '../../types/tradingTypes';

export interface SavedCard {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  holderName: string;
  expiry: string;
  depositedAmountUSD: number;
  lastUsedAt: string;
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountBalanceUSD: number;
  freeMarginUSD: number;
  savedCards: SavedCard[];
  onWithdrawSuccess: (request: WithdrawalRequest, cardUsed?: SavedCard) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  accountBalanceUSD,
  freeMarginUSD,
  savedCards,
  onWithdrawSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'original_card' | 'crypto' | 'sinpe' | 'wire'>('original_card');
  const [selectedCardId, setSelectedCardId] = useState<string>(savedCards[0]?.id || 'card-default-1');
  const [amountUSD, setAmountUSD] = useState<number>(250);
  
  // Custom destination fields if not card
  const [cryptoAddress, setCryptoAddress] = useState<string>('TQn9Y2khEsLJW1ChVWFMSMeRDow5KNiqUS');
  const [sinpePhone, setSinpePhone] = useState<string>('+506 8840-7799');
  const [bankIban, setBankIban] = useState<string>('CR05015202001026284000');
  const [bankName, setBankName] = useState<string>('Banco Nacional de Costa Rica (BNCR)');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [completedWithdrawal, setCompletedWithdrawal] = useState<WithdrawalRequest | null>(null);

  if (!isOpen) return null;

  const selectedCard = savedCards.find(c => c.id === selectedCardId) || savedCards[0];
  const maxWithdrawable = Math.max(0, freeMarginUSD);

  // Fee calculation (0% on original card refund protocol, 1% on other networks)
  const feeUSD = selectedMethod === 'original_card' ? 0.00 : Number((amountUSD * 0.01).toFixed(2));
  const netUSD = Math.max(0, amountUSD - feeUSD);

  const handleExecuteWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountUSD <= 0 || amountUSD > maxWithdrawable) return;

    setIsProcessing(true);

    setTimeout(() => {
      let destDetails = '';
      let methodName = '';

      if (selectedMethod === 'original_card' && selectedCard) {
        methodName = `Reembolso a Tarjeta Original (${selectedCard.brand.toUpperCase()} •••• ${selectedCard.last4})`;
        destDetails = `${selectedCard.holderName} | ${selectedCard.brand.toUpperCase()} **** ${selectedCard.last4} | Exp: ${selectedCard.expiry}`;
      } else if (selectedMethod === 'crypto') {
        methodName = 'Retiro Cripto USDT (TRC-20)';
        destDetails = `Wallet TRC-20: ${cryptoAddress}`;
      } else if (selectedMethod === 'sinpe') {
        methodName = 'Retiro Inmediato SINPE Móvil';
        destDetails = `Teléfono: ${sinpePhone} (Costa Rica)`;
      } else {
        methodName = 'Transferencia Bancaria Internacional';
        destDetails = `${bankName} | IBAN: ${bankIban}`;
      }

      const newRequest: WithdrawalRequest = {
        id: `WD-${Date.now().toString().slice(-6)}`,
        method: methodName,
        destinationDetails: destDetails,
        amountUSD: Number(amountUSD.toFixed(2)),
        feeUSD,
        netUSD: Number(netUSD.toFixed(2)),
        status: 'approved',
        requestedAt: 'Justo ahora'
      };

      setCompletedWithdrawal(newRequest);
      setIsProcessing(false);
      setIsSuccess(true);
      onWithdrawSuccess(newRequest, selectedMethod === 'original_card' ? selectedCard : undefined);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
      <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-750 p-2 rounded-full transition-colors cursor-pointer"
        >
          ✕
        </button>

        {!isSuccess ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>POLÍTICA ANTI-FRAUDE • RETIRO DIRECTO A TARJETA DE ORIGEN</span>
              </div>
              <h2 className="text-2xl font-black uppercase text-white tracking-tight">
                Solicitar Retiro de Ganancias
              </h2>
              <p className="text-xs text-slate-400">
                Por normativa bancaria PCI-DSS y prevención de lavado (AML), los fondos se envían preferentemente a la <strong>misma tarjeta bancaria</strong> con la cual realizaste tu depósito.
              </p>
            </div>

            {/* Balances Display */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Saldo Total:</span>
                <span className="text-base font-black text-white">
                  ${accountBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-[10px] text-slate-400 uppercase block">Disponible para Retirar:</span>
                <span className="text-base font-black text-emerald-400">
                  ${maxWithdrawable.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </div>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-4 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedMethod('original_card')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  selectedMethod === 'original_card'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[11px]">Misma Tarjeta</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('crypto')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  selectedMethod === 'crypto'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bitcoin className="w-4 h-4" />
                <span className="text-[11px]">USDT Cripto</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('sinpe')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  selectedMethod === 'sinpe'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span className="text-[11px]">SINPE Móvil</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('wire')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  selectedMethod === 'wire'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-[11px]">Banco IBAN</span>
              </button>
            </div>

            <form onSubmit={handleExecuteWithdrawal} className="space-y-4">
              {/* Original Card Selector */}
              {selectedMethod === 'original_card' && (
                <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      Tarjetas de Depósito Registradas:
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-800">
                      0% Comisión
                    </span>
                  </div>

                  {savedCards.length > 0 ? (
                    <div className="space-y-2">
                      {savedCards.map(card => (
                        <div
                          key={card.id}
                          onClick={() => setSelectedCardId(card.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedCardId === card.id
                              ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 font-black text-xs font-mono uppercase">
                              {card.brand}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                                <span>•••• •••• •••• {card.last4}</span>
                                <span className="text-[10px] text-slate-400">({card.expiry})</span>
                              </div>
                              <div className="text-[10px] text-slate-400">
                                Titular: <span className="text-slate-200">{card.holderName}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right font-mono">
                            <div className="text-[10px] text-emerald-400 font-bold">Verificada</div>
                            <div className="text-[9px] text-slate-500">Depósitos: ${card.depositedAmountUSD.toFixed(0)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200">
                      No tienes tarjetas registradas aún. Al realizar tu primer depósito con tarjeta, quedará vinculada automáticamente para retiros instantáneos.
                    </div>
                  )}

                  <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
                    <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      El dinero se acreditará como un <strong>Reembolso / Abono Directo (Original Credit Transaction - OCT)</strong> en el estado de cuenta de tu tarjeta de 1 a 24 horas hábiles.
                    </span>
                  </div>
                </div>
              )}

              {/* Crypto Form */}
              {selectedMethod === 'crypto' && (
                <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-mono text-slate-400 uppercase block">
                    Dirección de Billetera USDT (Red TRC-20):
                  </label>
                  <input
                    type="text"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    required
                    placeholder="Ej. TQn9Y2khEsLJW1ChVWFMSMeRDow5KNiqUS"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Comisión de red blockchain: 1% ($1 USDT min). Acreditación en ~10 minutos.
                  </span>
                </div>
              )}

              {/* SINPE Form */}
              {selectedMethod === 'sinpe' && (
                <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-mono text-slate-400 uppercase block">
                    Número Telefónico SINPE Móvil (Costa Rica):
                  </label>
                  <input
                    type="text"
                    value={sinpePhone}
                    onChange={(e) => setSinpePhone(e.target.value)}
                    required
                    placeholder="+506 8840-7799"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Tipo de cambio oficial BCCR. Acreditación inmediata las 24 horas.
                  </span>
                </div>
              )}

              {/* Wire Form */}
              {selectedMethod === 'wire' && (
                <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                      Nombre de la Entidad Bancaria:
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                      placeholder="Ej. Banco Nacional, BAC Credomatic, Chase"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                      Cuenta IBAN / Número de Cuenta:
                    </label>
                    <input
                      type="text"
                      value={bankIban}
                      onChange={(e) => setBankIban(e.target.value)}
                      required
                      placeholder="CR05015202001026284000"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold">
                    Monto a Retirar (USD):
                  </label>
                  <button
                    type="button"
                    onClick={() => setAmountUSD(Number(maxWithdrawable.toFixed(2)))}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 font-bold uppercase underline cursor-pointer"
                  >
                    Retirar Todo (${maxWithdrawable.toFixed(2)})
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                  </div>
                  <input
                    type="number"
                    min={10}
                    max={maxWithdrawable}
                    step={1}
                    value={amountUSD}
                    onChange={(e) => setAmountUSD(Number(e.target.value))}
                    className="w-full bg-slate-950 border-2 border-slate-800 focus:border-cyan-400 rounded-2xl pl-10 pr-24 py-3.5 text-lg font-mono font-black text-white focus:outline-none transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
                    {[100, 500, 1000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmountUSD(val)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono rounded-lg transition-colors cursor-pointer"
                      >
                        +${val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary calculation breakdown */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Monto Solicitado:</span>
                  <span className="text-white">${amountUSD.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Comisión por Procesamiento:</span>
                  <span className={feeUSD === 0 ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {feeUSD === 0 ? 'GRATIS ($0.00)' : `$${feeUSD.toFixed(2)} USD (1%)`}
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-1.5 flex justify-between font-black text-sm">
                  <span className="text-slate-200">Total Neto a Recibir:</span>
                  <span className="text-cyan-400">${netUSD.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || amountUSD <= 0 || amountUSD > maxWithdrawable}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Procesando Reembolso con la Red Bancaria...</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Confirmar Retiro a Tarjeta (${netUSD.toFixed(2)} USD)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-cyan-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
                RETIRO PROCESADO CON ÉXITO
              </span>
              <h3 className="text-2xl font-black text-white uppercase">
                ¡Fondos Enviados a tu Tarjeta!
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                La solicitud de retiro ha sido aprobada y transmitida a la red emisora de tu tarjeta bancaria original.
              </p>
            </div>

            {completedWithdrawal && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">ID de Transacción:</span>
                  <span className="text-cyan-400 font-bold">{completedWithdrawal.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Método de Destino:</span>
                  <span className="text-white text-right font-bold">{completedWithdrawal.method}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Detalle de Destino:</span>
                  <span className="text-slate-300 text-right text-[11px]">{completedWithdrawal.destinationDetails}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Monto Neto Acreditado:</span>
                  <span className="text-emerald-400 font-black text-sm">${completedWithdrawal.netUSD.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Estado de Liquidación:</span>
                  <span className="text-emerald-300 font-bold">Aprobado / Liquidado</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold font-mono rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Volver a la Terminal de Trading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
