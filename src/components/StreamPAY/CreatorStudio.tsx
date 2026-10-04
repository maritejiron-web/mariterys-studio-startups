import React, { useState } from 'react';
import { 
  Tv2, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  PlusCircle, 
  Wallet, 
  Lock, 
  Sparkles, 
  Users, 
  BarChart3, 
  ArrowUpRight, 
  CheckCircle2, 
  Video, 
  Camera, 
  Calendar, 
  Trash2, 
  Edit3,
  CreditCard,
  Building2,
  FileCheck
} from 'lucide-react';
import { StreamMediaItem, StreamTipTransaction, CreatorAnalytics } from '../../types';

interface CreatorStudioProps {
  creatorMedia: StreamMediaItem[];
  analytics: CreatorAnalytics;
  transactions: StreamTipTransaction[];
  onOpenUploadModal: () => void;
  onOpenPayoutModal: () => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  creatorMedia,
  analytics,
  transactions,
  onOpenUploadModal,
  onOpenPayoutModal
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'supporters' | 'payouts'>('analytics');

  return (
    <div className="max-w-[1700px] mx-auto p-4 lg:p-8 space-y-8">
      
      {/* Header Studio Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-950 border border-indigo-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <Tv2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Estudio de Creador StreamPAY</span>
            </div>
            <span className="text-xs text-slate-400">by Pass Media Monetik</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">
            Tablero de Monetización & Contenido
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Administra tus ingresos en tiempo real. Todas las propinas, ventas Pay-Per-View y suscripciones mensuales están disponibles para retiro directo sin retenciones.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPayoutModal}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Retirar Saldo (${analytics.totalBalanceUSD.toFixed(2)})</span>
          </button>

          <button
            onClick={onOpenUploadModal}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nuevo Video / Galería</span>
          </button>
        </div>
      </div>

      {/* Real-time Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Available Balance */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Saldo Disponible</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black font-mono text-emerald-300">
            ${analytics.totalBalanceUSD.toFixed(2)}
          </div>
          <p className="text-[11px] text-emerald-400/80 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Listo para transferencia a cuenta</span>
          </p>
        </div>

        {/* Total Tips Received */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Propinas Recibidas</span>
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black font-mono text-cyan-300">
            ${analytics.totalTipsUSD.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-400">
            Enviadas directamente por seguidores
          </p>
        </div>

        {/* Pay-Per-View Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Ventas Pay-Per-View</span>
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Lock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black font-mono text-amber-300">
            ${analytics.totalPpvUSD.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-400">
            Por desbloqueo de cursos y videos
          </p>
        </div>

        {/* Subscriptions Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Suscripciones Mensuales</span>
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black font-mono text-purple-300">
            ${analytics.totalSubscriptionsUSD.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-400">
            Miembros Plata, Oro y VIP
          </p>
        </div>

      </div>

      {/* Sub Navigation Tabs inside Studio */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gráfico de Ingresos
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'content'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gestor de Publicaciones ({creatorMedia.length})
        </button>

        <button
          onClick={() => setActiveTab('supporters')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'supporters'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Historial de Transacciones ({transactions.length})
        </button>
      </div>

      {/* Tab 1: Analytics & Revenue Graph */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weekly Bar Graph */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span>Ingresos Diarios de esta Semana</span>
                </h3>
                <p className="text-xs text-slate-400">Suma total acumulada de propinas y ventas PPV</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg">
                Total 7 Días: $2,496.50
              </span>
            </div>

            {/* Simulated Bar Visualizer */}
            <div className="h-64 flex items-end justify-between gap-3 pt-8 px-4 border-b border-slate-800">
              {analytics.dailyEarnings.map((d, idx) => {
                const maxAmt = 700;
                const heightPercent = Math.min(100, Math.max(15, (d.amountUSD / maxAmt) * 100));
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${d.amountUSD.toFixed(0)}
                    </span>
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-blue-600 via-cyan-500 to-emerald-400 group-hover:brightness-125 transition-all relative"
                    >
                      <div className="absolute inset-0 bg-white/10 rounded-t-xl opacity-0 group-hover:opacity-100" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-semibold">{d.date}</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Promedio Diario</span>
                <span className="text-white font-bold font-mono text-sm">${(analytics.totalBalanceUSD / 7).toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Día Pico</span>
                <span className="text-cyan-300 font-bold font-mono text-sm">Domingo ($640)</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Retención StreamPAY</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">0% Promocional</span>
              </div>
            </div>
          </div>

          {/* Quick Creator Comparison Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>¿Por qué estás ganando más en StreamPAY?</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-slate-200">
                <strong className="text-emerald-300 block mb-0.5">✓ Cobro Directo Inmediato</strong>
                No esperas a acumular $100 ni esperas hasta fin de mes para pedir tu transferencia.
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-slate-200">
                <strong className="text-cyan-300 block mb-0.5">✓ Micro-Propinas de $0.50 a $50</strong>
                Tus fans no necesitan pagar cuotas costosas para apoyarte.
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-slate-200">
                <strong className="text-amber-300 block mb-0.5">✓ Pago Por Visión (PPV)</strong>
                Sube cursos o masterclasses y cobra $1.99 o $4.99 por cada espectador.
              </div>
            </div>

            <button
              onClick={onOpenPayoutModal}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md"
            >
              Transferir Saldo Ahora
            </button>
          </div>

        </div>
      )}

      {/* Tab 2: Content Management */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Videos & Galerías Publicadas</h3>
            <button
              onClick={onOpenUploadModal}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Nuevo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creatorMedia.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                    <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-300 uppercase">
                      {item.accessType === 'free' ? 'Gratis (Propinas)' : item.accessType === 'ppv' ? `PPV $${item.ppvPriceUSD?.toFixed(2)}` : 'VIP Suscriptores'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2">{item.title}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{item.views.toLocaleString()} vistas</span>
                    <span className="text-emerald-400 font-bold">${item.totalTipsAmountUSD.toFixed(2)} acumulados</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-500">{item.createdAt}</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Transactions */}
      {activeTab === 'supporters' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Historial de Propinas & Pagos Recibidos</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                  <th className="py-3 px-4">Usuario / Seguidor</th>
                  <th className="py-3 px-4">Tipo de Pago</th>
                  <th className="py-3 px-4">Monto USD</th>
                  <th className="py-3 px-4">Método</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{tx.senderName}</td>
                    <td className="py-3 px-4 text-slate-300">
                      {tx.type === 'micro_tip' ? 'Micro-Propina' : tx.type === 'ppv_purchase' ? 'Compra PPV' : 'Suscripción'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-300">${tx.amountUSD.toFixed(2)}</td>
                    <td className="py-3 px-4 text-slate-400">{tx.paymentMethod}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{tx.timestamp}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
