import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  Tv, 
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

export const MonetizationCalculator: React.FC = () => {
  const [monthlyViews, setMonthlyViews] = useState<number>(12000);
  const [tipRate, setTipRate] = useState<number>(1.5); // % of viewers who tip
  const [avgTipUSD, setAvgTipUSD] = useState<number>(2.50);
  const [ppvSales, setPpvSales] = useState<number>(45); // number of $2 PPV unlocks
  const [subscribersCount, setSubscribersCount] = useState<number>(30); // $4.99/mo subs

  // Calculations
  const calculatedTips = (monthlyViews * (tipRate / 100)) * avgTipUSD;
  const calculatedPpv = ppvSales * 1.99;
  const calculatedSubs = subscribersCount * 4.99;
  const totalStreamPayMonthly = calculatedTips + calculatedPpv + calculatedSubs;

  // YouTube comparison
  const youtubeEarned = monthlyViews < 100000 ? 0 : (monthlyViews / 1000) * 1.50; // $0 if below monetization threshold

  return (
    <div className="max-w-[1400px] mx-auto p-4 lg:p-8 space-y-8 animate-in fade-in">
      
      {/* Title & Introduction Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/30 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Calculadora de Monetización Comparativa</span>
        </div>
        <h1 className="text-2xl lg:text-4xl font-black text-white">
          Compara tus Ingresos: <span className="text-amber-400">YouTube</span> vs <span className="text-cyan-400">StreamPAY</span>
        </h1>
        <p className="text-xs lg:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
          En YouTube requieres 1,000 suscriptores y 4,000 horas de reproducción para solicitar monetización (lo que tarda meses o años). En StreamPAY empiezas a recibir micro-propinas, ventas Pay-Per-View y suscripciones desde tu primer video.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Column (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Ajusta tus Métricas Estimadas de Contenido</span>
          </h2>

          {/* Slider 1: Monthly Views */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Vistas Mensuales Estimadas:</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">{monthlyViews.toLocaleString()} vistas</span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={monthlyViews}
              onChange={(e) => setMonthlyViews(parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 2: % of viewers who leave a tip */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Tasa de Espectadores que Envíen Propina (%):</span>
              <span className="font-mono font-bold text-emerald-300 text-sm">{tipRate}% ({Math.round(monthlyViews * (tipRate / 100))} propinas)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={tipRate}
              onChange={(e) => setTipRate(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 3: Average Tip Amount */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Propina Promedio por Fan:</span>
              <span className="font-mono font-bold text-emerald-300 text-sm">${avgTipUSD.toFixed(2)} USD</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="10.00"
              step="0.50"
              value={avgTipUSD}
              onChange={(e) => setAvgTipUSD(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 4: Pay-Per-View Unlocks */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Desbloqueos PPV ($1.99) al mes:</span>
              <span className="font-mono font-bold text-amber-300 text-sm">{ppvSales} compras (${(ppvSales * 1.99).toFixed(2)})</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="5"
              value={ppvSales}
              onChange={(e) => setPpvSales(parseInt(e.target.value))}
              className="w-full accent-amber-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 5: Subscribers */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Suscriptores Mensuales ($4.99/mes):</span>
              <span className="font-mono font-bold text-purple-300 text-sm">{subscribersCount} miembros (${(subscribersCount * 4.99).toFixed(2)})</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={subscribersCount}
              onChange={(e) => setSubscribersCount(parseInt(e.target.value))}
              className="w-full accent-purple-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* Results Comparison Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* StreamPAY Result Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/50 border-2 border-cyan-500/50 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                RESULTADO STREAMPAY
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">Monetización Día 1</span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Ingreso Estimado Mensual:</div>
              <div className="text-4xl lg:text-5xl font-black font-mono text-cyan-300">
                ${totalStreamPayMonthly.toFixed(2)} <span className="text-xs text-slate-400 font-normal">USD/mes</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">💰 Micro-Propinas:</span>
                <span className="font-mono text-emerald-300 font-bold">${calculatedTips.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">🔒 Pago Por Visión (PPV):</span>
                <span className="font-mono text-amber-300 font-bold">${calculatedPpv.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">👑 Suscripciones de Fans:</span>
                <span className="font-mono text-purple-300 font-bold">${calculatedSubs.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* YouTube Comparison Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 font-mono">YOUTUBE ADSENSE</span>
              <span className="text-[10px] text-slate-500">Requisitos Estrictos</span>
            </div>

            <div className="text-2xl font-black font-mono text-slate-400">
              ${youtubeEarned.toFixed(2)} <span className="text-xs text-slate-500">USD</span>
            </div>

            {monthlyViews < 100000 ? (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>$0 en YouTube:</strong> Si no tienes 1,000 suscriptores y 4,000 horas de reproducción validadas, YouTube no te paga absolutamente nada por estas vistas.
                </span>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                YouTube requiere millones de reproducciones para ganar sumas significativas debido al bajo pago por anuncio ($1 - $2 por cada 1,000 reproducciones).
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
