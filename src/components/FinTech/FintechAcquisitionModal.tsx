import React, { useState } from 'react';
import {
  Crown,
  X,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Building2,
  FileText,
  Sparkles,
  ExternalLink,
  Bot,
  Layers,
  Lock,
  Zap,
  PhoneCall,
  Share2,
  Image as ImageIcon,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import aficheCorregidoImg from '../../assets/images/afiche_fintech_corregido_1790221595432.jpg';

interface FintechAcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
  waLink?: string;
}

export const FintechAcquisitionModal: React.FC<FintechAcquisitionModalProps> = ({
  isOpen,
  onClose,
  phone = '+506 7019-3160',
  waLink = 'https://wa.link/ykdhlk'
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const salePriceUSD = '$50,000 USD';
  const salePriceCRC = '₡26,000,000 CRC';
  const managerName = 'María Teresa Jirón Bermúdez';
  const managerRole = 'Fundadora de Startups';
  const managerEmail = 'maritejiron@gmail.com';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const whatsappSaleUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola ${managerName} (${managerRole}), estoy interesado(a) en la ADQUISICIÓN de la Startup CardPay FinTech Core Ledger & CFO A.I. por el valor de $50,000 USD (₡26,000,000 CRC). Deseo agendar una reunión ejecutiva para formalizar la compraventa y traspaso de propiedad intelectual.`
  )}`;

  const executiveSummaryText = `🏢 MEMORÁNDUM DE VENTA DE STARTUP FINTECH
--------------------------------------------------
Nombre del Activo: CardPay FinTech — Core Ledger Transaccional & CFO A.I.
Propietaria: ${managerName} (${managerRole})
Email Oficial: ${managerEmail}
Teléfono / WhatsApp: (506) 7019-3160
Precio de Venta en Firme: $50,000 USD (₡26,000,000 CRC)

VALOR ESTRATÉGICO & ACTIVOS INCLUIDOS:
1. Core Ledger Bancario de Partida Doble (Double-Entry General Ledger):
   - Cumplimiento estricto de principios contables ACID y directrices SUGEF / Basilea III.
   - Bóveda transaccional multidivisa (Colones ₡, Dólares $ y Euros €).
   - Generación de hashes criptográficos inmutables por cada asiento contable.

2. Director Financiero con Inteligencia Artificial (Alex Morgan - CFO A.I.):
   - Atención y evaluación crediticia concurrente de 1,000 a 3,000 clientes por minuto.
   - Pre-aprobación en 60 segundos y argumentario de ventas persuasivo (Deal Closer).
   - Ahorro anual estimado en personal superior a los $75,000 USD.

3. Protocolo de Gobernanza & Control Dual (Maker-Checker):
   - Mitigación absoluta de riesgo: la IA no puede liberar dinero de forma autónoma.
   - Despacho de Gerencia con firma digital protegida por PIN para autorizar desembolsos.

4. Paquete de Traspaso:
   - 100% de los Derechos de Propiedad Intelectual y Código Fuente.
   - Documentación técnica, manual de despliegue y soporte de traspaso.

Para negociar o agendar un Due Diligence, comunicarse a: ${phone}`;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(executiveSummaryText);
    setCopied(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-stone-900 border-2 border-amber-500/60 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-5 text-stone-200 my-auto relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20 border border-amber-400/50 flex-shrink-0">
            <Crown className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-black bg-amber-500 text-stone-950 px-2 py-0.5 rounded uppercase tracking-wider">
                OFERTA PÚBLICA DE ADQUISICIÓN
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                DUE DILIGENCE LISTO
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-1">
              Adquisición de Startup: CardPay FinTech Core Ledger
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              Plataforma Bancaria Transaccional + Director Financiero CFO A.I. 24/7
            </p>
          </div>
        </div>

        {/* VALUATION BADGE CARD */}
        <div className="bg-gradient-to-r from-amber-950/50 via-stone-950 to-amber-950/40 p-4 rounded-2xl border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block font-bold">
              Precio de Venta en Firme (100% Equity & Código Fuente)
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                {salePriceUSD}
              </span>
              <span className="text-xs font-mono text-stone-400 font-bold">
                (~{salePriceCRC})
              </span>
            </div>
            <span className="text-[11px] text-stone-400 font-mono block mt-1">
              🏢 Propietaria: <strong className="text-stone-200">{managerName}</strong> • <span className="text-amber-400 font-bold">{managerRole}</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono block">
              ✉️ {managerEmail} • 📞 (506) 7019-3160
            </span>
          </div>

          <a
            href={whatsappSaleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black rounded-xl font-mono text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Negociar por WhatsApp</span>
          </a>
        </div>

        {/* ASSETS INCLUDED GRID */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Activos Tecnológicos Incluidos en la Adquisición:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Core Ledger Bancario (ACID)</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Contabilidad de partida doble con balances en tiempo real en CRC, USD y EUR, conciliación estricta y hashes criptográficos inmutables.
              </p>
            </div>

            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                <Bot className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Alex Morgan (CFO A.I. 24/7)</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Asistente de inteligencia artificial que audita bóveda, evalúa scoring de clientes y cierra acuerdos de financiamiento en 60 segundos.
              </p>
            </div>

            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Control Dual (Maker-Checker)</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Protección regulatoria SUGEF: ningún centavo sale de la bóveda sin la firma digital y autorización de la Gerencia General.
              </p>
            </div>

            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>100% Propiedad Intelectual</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Código fuente completo (TypeScript, React, Node.js, Kotlin), sin regalías ni comisiones de terceros, listo para operar o revender.
              </p>
            </div>
          </div>
        </div>

        {/* WHY INVEST BANNER */}
        <div className="p-3 rounded-xl bg-stone-950 border border-stone-850 flex items-start gap-2.5 text-xs text-stone-300 font-mono">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Retorno de Inversión (ROI):</strong> Ahorro estimado de más de <strong>$75,000 USD al año</strong> en salarios de analistas de crédito, auditores contables y oficiales de cumplimiento.
          </div>
        </div>

        {/* OFFICIAL FLYER PREVIEW & DOWNLOAD BANNER */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-stone-950 to-emerald-950/30 border border-blue-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <img 
              src={aficheCorregidoImg} 
              alt="Afiche Oficial de Venta FinTech Leader" 
              className="w-14 h-18 object-cover rounded-lg border border-amber-400/50 shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition"
              onClick={() => window.open(aficheCorregidoImg, '_blank')}
              title="Clic para ver en grande"
            />
            <div className="text-left">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                ⭐ AFICHE OFICIAL LISTO PARA LINKEDIN ($50,000 USD)
              </span>
              <p className="text-xs text-stone-200 font-bold mt-0.5">
                Infografía corregida con cifras institucionales exactas y ortografía pulida.
              </p>
              <span className="text-[10px] text-stone-400 font-mono">
                Hoy: $50,000 USD • Potencial: $100M+ USD
              </span>
            </div>
          </div>

          <a
            href={aficheCorregidoImg}
            download="Afiche_Oficial_Fintech_Leader_50K.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 shadow-md flex-shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Imagen</span>
          </a>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          <button
            onClick={handleCopySummary}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-stone-700 hover:border-amber-500/50 bg-stone-950 hover:bg-stone-850 text-stone-300 hover:text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">¡Ficha Copiada al Portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-400" />
                <span>Copiar Ficha para Inversionistas</span>
              </>
            )}
          </button>

          <a
            href={whatsappSaleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-2.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-xl font-mono text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <PhoneCall className="w-4 h-4 fill-current" />
            <span>Contactar a Gerencia ({phone})</span>
          </a>
        </div>

      </div>
    </div>
  );
};
