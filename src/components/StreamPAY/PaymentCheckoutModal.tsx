import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  DollarSign, 
  Smartphone, 
  Globe2, 
  Building2,
  AlertCircle
} from 'lucide-react';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amountUSD: number;
  itemDescription: string;
  recipientName?: string;
  onPaymentSuccess: (methodUsed: string, transactionId: string) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  onClose,
  title,
  amountUSD,
  itemDescription,
  recipientName,
  onPaymentSuccess
}) => {
  const [selectedGateway, setSelectedGateway] = useState<'paypal' | 'tarjeta' | 'mercadopago' | 'sinpe' | 'walink'>('paypal');
  
  // Form states for Stripe / Credit Card
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'amex' | 'generic'>('generic');

  // Form states for PayPal
  const [paypalEmail, setPaypalEmail] = useState('');

  // Form states for SINPE & WhatsApp walink
  const [sinpePhone, setSinpePhone] = useState('');
  const [whatsappCustomerPhone, setWhatsappCustomerPhone] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    // Format card number with spaces every 4 digits
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);

    if (raw.startsWith('4')) {
      setCardBrand('visa');
    } else if (raw.startsWith('51') || raw.startsWith('52') || raw.startsWith('53') || raw.startsWith('54') || raw.startsWith('55')) {
      setCardBrand('mastercard');
    } else if (raw.startsWith('34') || raw.startsWith('37')) {
      setCardBrand('amex');
    } else {
      setCardBrand('generic');
    }
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedTxId = `TX-${selectedGateway.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        let methodName = 'Tarjeta de Débito / Crédito (Vía PayPal)';
        if (selectedGateway === 'paypal') methodName = 'PayPal Express';
        if (selectedGateway === 'tarjeta') methodName = 'Tarjeta (VISA / Mastercard / Amex)';
        if (selectedGateway === 'mercadopago') methodName = 'Mercado Pago LATAM';
        if (selectedGateway === 'sinpe') methodName = 'SINPE Móvil Local';
        if (selectedGateway === 'walink') methodName = 'WhatsApp wa.link Directo';

        onPaymentSuccess(methodName, generatedTxId);
        onClose();
        setPaymentSuccess(false);
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-xl w-full space-y-6 shadow-2xl relative animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pasarela de Pago Segura (256-bit SSL)</span>
            </div>
            <h2 className="text-xl font-black text-white mt-2">{title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{itemDescription}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Amount Summary */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-300">
            <span className="block text-slate-400 font-mono">Monto Total a Procesar:</span>
            {recipientName && <span className="font-semibold text-white">Destinatario: {recipientName}</span>}
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ${amountUSD.toFixed(2)} USD
          </div>
        </div>

        {paymentSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50 mx-auto flex items-center justify-center font-bold text-2xl animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-white">¡Pago Procesado Exitosamente!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Tu transacción ha sido confirmada mediante {selectedGateway.toUpperCase()}. El contenido ya está disponible en tu cuenta.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitPayment} className="space-y-5">
            
            {/* Select Gateway */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Selecciona tu Método de Pago Preferido:
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* PayPal Express (Principal y Recomendado) */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('paypal')}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    selectedGateway === 'paypal'
                      ? 'bg-blue-950/40 border-blue-500 text-blue-200 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">PayPal Express</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold">Recomendado</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Saldo PayPal, Pay in 4 y Tarjetas Internacionales
                  </p>
                </button>

                {/* Tarjetas de Crédito / Débito */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('tarjeta')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedGateway === 'tarjeta'
                      ? 'bg-purple-950/40 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">Tarjeta Débito / Crédito</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">Global</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Visa, Mastercard, American Express (Vía PayPal Gateway)
                  </p>
                </button>

                {/* Mercado Pago */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('mercadopago')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedGateway === 'mercadopago'
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">Mercado Pago</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">LATAM</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tarjetas de Crédito/Débito Locales en América Latina
                  </p>
                </button>

                {/* SINPE / IBAN */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('sinpe')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedGateway === 'sinpe'
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">SINPE Móvil / IBAN</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">Costa Rica</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Transferencia Móvil Inmediata 24/7 sin comisiones
                  </p>
                </button>

                {/* WhatsApp walink Direct */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('walink')}
                  className={`col-span-2 p-3.5 rounded-2xl border text-left transition-all ${
                    selectedGateway === 'walink'
                      ? 'bg-emerald-950/60 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Direct Checkout (wa.link)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-mono font-bold">
                      Pago Directo 1:1
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Genera enlace directo wa.link para confirmación inmediata, comprobantes o pago por chat de WhatsApp
                  </p>
                </button>
              </div>
            </div>

            {/* Dynamic Form per Selected Gateway */}
            {(selectedGateway === 'tarjeta' || (selectedGateway as any) === 'stripe') && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Datos de Tarjeta (Vía PayPal Gateway):</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                    <span className={`px-1.5 py-0.5 rounded ${cardBrand === 'visa' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800'}`}>VISA</span>
                    <span className={`px-1.5 py-0.5 rounded ${cardBrand === 'mastercard' ? 'bg-orange-600 text-white font-bold' : 'bg-slate-800'}`}>MC</span>
                    <span className={`px-1.5 py-0.5 rounded ${cardBrand === 'amex' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800'}`}>AMEX</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Nombre en la Tarjeta (Titular)"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                    placeholder="MM/AA"
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-center"
                  />
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                    placeholder="CVC / CWW"
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-center"
                  />
                </div>
              </div>
            )}

            {selectedGateway === 'paypal' && (
              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-blue-300 font-bold">
                  <span>Autorización PayPal Express Checkout:</span>
                  <Globe2 className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conéctate directamente a tu cuenta PayPal para pagar con tu saldo disponible o tarjetas asociadas.
                </p>
                <input
                  type="email"
                  required
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="Tu correo electrónico de PayPal"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {selectedGateway === 'mercadopago' && (
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                  <span>Procesador Mercado Pago LATAM:</span>
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Acepta tarjetas de débito y crédito locales de América Latina (México, Colombia, Argentina, Chile, Perú).
                </p>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Nombre completo del pagador"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {selectedGateway === 'sinpe' && (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>Transferencia SINPE Móvil Inmediata:</span>
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 space-y-1">
                  <div>• Número SINPE Móvil Oficial: <strong>8888-9999</strong></div>
                  <div>• Destinatario: <strong>StreamPAY Servicios S.A.</strong></div>
                  <div>• Detalle del Comprobante: <strong>{itemDescription.slice(0, 20)}</strong></div>
                </div>
                <input
                  type="tel"
                  required
                  value={sinpePhone}
                  onChange={(e) => setSinpePhone(e.target.value)}
                  placeholder="Tu número telefónico de SINPE enviado"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {selectedGateway === 'walink' && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Direct Checkout (wa.link):</span>
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">Respuesta Inmediata</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Genera un enlace directo <strong>wa.link</strong> para enviar el pedido de ${amountUSD.toFixed(2)} USD directamente al soporte o creador vía WhatsApp con un solo clic.
                </p>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-2">
                  <div className="font-mono text-[11px] text-emerald-400">Mensaje predeterminado de wa.link:</div>
                  <div className="italic text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px]">
                    "Hola StreamPAY, deseo procesar mi pago de ${amountUSD.toFixed(2)} USD para: {itemDescription}. Mi número de referencia es TX-WALINK-{Math.floor(1000 + Math.random() * 9000)}"
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`https://wa.me/50688889999?text=${encodeURIComponent(`Hola StreamPAY, deseo procesar el pago de $${amountUSD.toFixed(2)} USD para: ${itemDescription}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs text-center transition-all flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Abrir Enlace wa.link en WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Note about real API key setup */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Modo Simulación Activo:</strong> Puedes simular compras y transacciones para probar la experiencia. Para conectar tus credenciales reales de producción de PayPal (PayPal Client ID y Client Secret), añade tus variables de entorno en el archivo <code>.env</code>.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verificando y Conectando Pasarela...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pagar ${amountUSD.toFixed(2)} USD con {selectedGateway.toUpperCase()}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
