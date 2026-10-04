import React from 'react';
import { 
  Trophy, 
  Check, 
  X, 
  Globe2, 
  Zap, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ArrowRight,
  TrendingUp,
  Users,
  Tv,
  Clock,
  HelpCircle
} from 'lucide-react';

interface CompetitiveComparisonProps {
  onOpenCalculator: () => void;
  onOpenCampaign: () => void;
}

export const CompetitiveComparison: React.FC<CompetitiveComparisonProps> = ({
  onOpenCalculator,
  onOpenCampaign
}) => {
  return (
    <div className="max-w-[1500px] mx-auto p-4 lg:p-8 space-y-10 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-cyan-950/60 to-slate-950 border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden space-y-4 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Matriz de Supremacía Competitiva StreamPAY 2026</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight">
            ¿Por qué <span className="text-cyan-400">StreamPAY</span> es Superior a YouTube, Patreon y OnlyFans?
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
            Eliminamos las barreras geográficas y los requisitos abusivos de las corporaciones tradicionales. En StreamPAY, cualquier creador en el mundo monetiza sus videos, cursos y fotos desde el minuto 1.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onOpenCampaign}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ver Encuesta Viral TikTok / IG</span>
          </button>
          <button
            onClick={onOpenCalculator}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Calculadora de Ganancias</span>
          </button>
        </div>
      </div>

      {/* Core Advantages Grid (4 Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-cyan-500/50 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">1. Monetización Inmediata (Día 1)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Olvida los límites de YouTube (1,000 suscriptores + 4,000 horas de reproducción). Recibe micro-propinas de $0.50 a $50+ desde tu primer video o foto publicada.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-emerald-500/50 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">2. Cobertura Global Sin Bloqueos</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sin restricciones por país. Permite afiliarse a creadores de toda Latinoamérica, Europa, África, Asia y EEUU con retiros locales por IBAN, SINPE Móvil o Crypto USDT.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-amber-500/50 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">3. Modelo Híbrido Tres en Uno</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Combina Propinas en Vivo (estilo Twitch), Ventas Pay-Per-View para Cursos/Galerías (estilo Udemy) y Suscripciones VIP Mensuales (estilo Patreon).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-purple-500/50 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">4. Retiros Directos Sin Retención</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            0% de tarifa promocional para creadores pioneros. Transfiere directamente a tu cuenta bancaria o billetera digital sin esperar acumulaciones de $100.
          </p>
        </div>

      </div>

      {/* Feature Matrix Table */}
      <div className="p-6 lg:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Tabla Comparativa Frente a las Grandes Plataformas</span>
            </h2>
            <p className="text-xs text-slate-400">Análisis detallado de características y limitaciones</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            Ecosistema Independiente Pass Media
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-4 px-4 w-1/4">Característica / Regla</th>
                <th className="py-4 px-4 text-cyan-400 bg-cyan-950/30 border-x border-cyan-500/30 font-bold">StreamPAY Pass Media</th>
                <th className="py-4 px-4 text-red-400">YouTube Partner</th>
                <th className="py-4 px-4 text-orange-400">Patreon</th>
                <th className="py-4 px-4 text-pink-400">OnlyFans</th>
                <th className="py-4 px-4 text-cyan-200">TikTok Creator Fund</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">Requisitos de Monetización</td>
                <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20 font-bold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>0 Requisitos (Desde el Día 1)</span>
                </td>
                <td className="py-4 px-4 text-slate-400">1,000 Subs + 4,000 Horas de vistas</td>
                <td className="py-4 px-4 text-slate-400">Requiere audiencia previa propia</td>
                <td className="py-4 px-4 text-slate-400">Aprobación manual y límites de contenido</td>
                <td className="py-4 px-4 text-slate-400">10,000 seguidores + 100,000 vistas/mes</td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">Acceso Geográfico (Países)</td>
                <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20 font-bold text-emerald-400">
                  <span>🌐 100% Global sin restricciones</span>
                </td>
                <td className="py-4 px-4 text-red-400">Restringido en múltiples países de LatAm y África</td>
                <td className="py-4 px-4 text-slate-400">Limitado a tarjetas internacionales</td>
                <td className="py-4 px-4 text-slate-400">Restringido por bancos locales</td>
                <td className="py-4 px-4 text-red-400">Solo disponible en 6 países específicos</td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">Métodos de Retiro Directo</td>
                <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20 font-bold text-cyan-300">
                  <span>IBAN Local, SINPE Móvil, Crypto USDT, PayPal</span>
                </td>
                <td className="py-4 px-4 text-slate-400">Solo transferencia bancaria Adsense lenta</td>
                <td className="py-4 px-4 text-slate-400">Payoneer / PayPal con altas comisiones</td>
                <td className="py-4 px-4 text-slate-400">Bancos internacionales autorizados</td>
                <td className="py-4 px-4 text-slate-400">PayPal únicamente</td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">Micro-Propinas de Espectadores</td>
                <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20 font-bold text-emerald-400">
                  <span>✓ Desde $0.50 en adelante (Sin cuotas altas)</span>
                </td>
                <td className="py-4 px-4 text-slate-400">Super Thanks sólo en canales verificados</td>
                <td className="py-4 px-4 text-slate-400">No permite micro-propinas espontáneas</td>
                <td className="py-4 px-4 text-slate-400">Propinas sujetas a suscripción obligatoria</td>
                <td className="py-4 px-4 text-slate-400">Regalos en Live únicamente con comisiones elevadas</td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">Ventas Pay-Per-View (PPV)</td>
                <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20 font-bold text-emerald-400">
                  <span>✓ Ideal para Cursos, Masterclass y Fotos</span>
                </td>
                <td className="py-4 px-4 text-red-400">❌ No disponible para canales normales</td>
                <td className="py-4 px-4 text-slate-400">Limitado a publicaciones de pago</td>
                <td className="py-4 px-4 text-slate-400">Mensajes PPV masivos</td>
                <td className="py-4 px-4 text-red-400">❌ No disponible</td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">Comisión de Plataforma</td>
                <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20 font-bold text-amber-300">
                  <span>0% Promocional para Creadores Iniciales</span>
                </td>
                <td className="py-4 px-4 text-red-400">45% que se queda YouTube Adsense</td>
                <td className="py-4 px-4 text-slate-400">8% - 12% + cargos de procesamiento</td>
                <td className="py-4 px-4 text-red-400">20% fijo de retención</td>
                <td className="py-4 px-4 text-red-400">Paga centavos por 1,000 vistas (RPM &lt; $0.05)</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Callout CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <h3 className="text-xl font-black text-white">
            ¿Listo para llevar esta propuesta a TikTok e Instagram?
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Utiliza nuestro módulo de Encuesta de Pre-Registro para validar interés, medir la intención de los usuarios y captar creadores fundadores antes de nuestro lanzamiento oficial.
          </p>
        </div>

        <button
          onClick={onOpenCampaign}
          className="px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs shadow-xl shadow-cyan-400/20 transition-all active:scale-95 shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Lanzar Encuesta Viral Ahora</span>
        </button>
      </div>

    </div>
  );
};
