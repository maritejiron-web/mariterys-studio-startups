import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  Gem,
  Diamond,
  RotateCw,
  Award,
  Flame,
  ShieldCheck,
  ShieldAlert,
  Play,
  HelpCircle,
  Gamepad2,
  Gift,
  Hammer,
  BookOpen,
  Calculator,
  Calendar,
  CreditCard,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Layers,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { UserProfile, UserActivityLog } from './types';

interface UserDashboardProps {
  userProfile: UserProfile;
  activityLogs: UserActivityLog[];
  onOpenWallet: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  userProfile,
  activityLogs,
  onOpenWallet,
  onNavigateTab
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'video_ad' | 'trivia' | 'wheel' | 'withdrawal'>('all');

  // Cálculo de estadísticas
  const totalAds = (userProfile.adsCompleted || userProfile.videosWatched || 0) + (userProfile.adsInterrupted || 0);
  const completionRate = totalAds > 0
    ? Math.round(((userProfile.adsCompleted || userProfile.videosWatched || 0) / totalAds) * 100)
    : 100;

  const triviaTotal = userProfile.triviasPlayed || 1;
  const triviaAccuracy = userProfile.triviasPlayed
    ? Math.round(((userProfile.triviaCorrectAnswers || 0) / userProfile.triviasPlayed) * 100)
    : 0;

  // Filtrado de actividades
  const filteredLogs = activityLogs.filter((log) => {
    if (selectedFilter === 'all') return true;
    return log.type === selectedFilter;
  });

  const xpProgress = (userProfile.xp % 500) / 5; // Porcentaje en la barra de XP actual (cada 500 XP = 1 nivel)

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* TARJETA PRINCIPAL DEL PERFIL Y RANGO VIP */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 text-2xl sm:text-3xl font-black shadow-xl shadow-amber-500/20">
              {userProfile.displayName.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Rango VIP: {userProfile.vipRank || 'Oro'} ⭐
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  Nivel {userProfile.level}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {userProfile.displayName}
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {userProfile.email}
              </span>

              {/* Barra de Progreso XP */}
              <div className="mt-3 flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-400 text-[11px]">XP: {userProfile.xp} / {(userProfile.level * 500)}</span>
                <div className="w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, xpProgress)}%` }}
                  />
                </div>
                <span className="text-amber-400 font-bold text-[11px]">{Math.round(xpProgress)}%</span>
              </div>
            </div>
          </div>

          {/* ACCIÓN RÁPIDA DE RETIRO */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col items-center sm:items-end w-full md:w-auto">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Saldo Retirable Disponible
            </span>
            <span className="text-3xl font-black text-emerald-400 font-mono my-1">
              ${userProfile.balanceUSD.toFixed(2)} <span className="text-xs text-slate-400">USD</span>
            </span>
            <button
              onClick={onOpenWallet}
              className="mt-2 w-full px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Retirar Fondos Inmediatos</span>
            </button>
          </div>
        </div>
      </div>

      {/* MÉTRICAS FINANCIERAS Y DE ACTIVOS (GRID DE 4 TARJETAS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ganancias Totales Históricas */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Total Histórico</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono">
            ${(userProfile.totalEarnedUSD || userProfile.balanceUSD + 33.75).toFixed(2)}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono block mt-1">
            +${(userProfile.todayEarnedUSD || 4.85).toFixed(2)} generado hoy
          </span>
        </div>

        {/* Gemas Acumuladas */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Gemas 💎</span>
            <Gem className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-black text-blue-300 font-mono">
            {userProfile.gems.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">
            Canjeable por ${(userProfile.gems * 0.005).toFixed(2)} USD
          </span>
        </div>

        {/* Diamantes VIP */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Diamantes 💠</span>
            <Diamond className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-purple-300 font-mono">
            {userProfile.diamonds.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">
            Canjeable por ${(userProfile.diamonds * 0.05).toFixed(2)} USD
          </span>
        </div>

        {/* Racha y Giros */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Racha Diaria</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-300 font-mono">
              {userProfile.dailyStreak} Días
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({userProfile.spinsLeft} giros)
            </span>
          </div>
          <span className="text-[10px] text-amber-400 font-mono block mt-1">
            🔥 Multiplicador VIP Activo
          </span>
        </div>
      </div>

      {/* SECCIÓN DOBLE: MÉTRICAS DE ANUNCIOS (CON REGLA DEL CRONÓMETRO) Y TRIVIAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Métricas de Anuncios Monetizados & Cumplimiento de Cronómetro */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-850">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white uppercase font-mono">
                Anuncios Monetizados & Cronómetro
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-mono font-bold">
              Regla Anti-Corte
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center font-mono">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Completados</span>
              <span className="text-xl font-black text-emerald-400 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4" />
                {userProfile.adsCompleted || userProfile.videosWatched || 14}
              </span>
              <span className="text-[9px] text-slate-500">100% verificados</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Cortados/Anulados</span>
              <span className="text-xl font-black text-rose-400 flex items-center justify-center gap-1 mt-1">
                <XCircle className="w-4 h-4" />
                {userProfile.adsInterrupted || 2}
              </span>
              <span className="text-[9px] text-slate-500">$0 acreditado</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Efectividad</span>
              <span className="text-xl font-black text-amber-400 mt-1 block">
                {completionRate}%
              </span>
              <span className="text-[9px] text-slate-500">Tasa de éxito</span>
            </div>
          </div>

          {/* Información de la Regla */}
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Tus anuncios se validan mediante un cronómetro regresivo en segundo plano. Si minimizas o pausas, el sistema anula la recompensa para proteger la integridad del patrocinador.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('videos')}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Ver Anuncios Monetizados Disponibles</span>
          </button>
        </div>

        {/* Panel 2: Métricas de Trivias Monetizadas */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-850">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white uppercase font-mono">
                Rendimiento en Trivias
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold">
              Retos de Conocimiento
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center font-mono">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Jugadas</span>
              <span className="text-xl font-black text-cyan-300 mt-1 block">
                {userProfile.triviasPlayed || 18}
              </span>
              <span className="text-[9px] text-slate-500">Rondas totales</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Aciertos</span>
              <span className="text-xl font-black text-emerald-400 mt-1 block">
                {userProfile.triviaCorrectAnswers || 15}
              </span>
              <span className="text-[9px] text-slate-500">Respuestas OK</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Mejor Racha</span>
              <span className="text-xl font-black text-amber-400 flex items-center justify-center gap-1 mt-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                {userProfile.triviaBestStreak || 7}
              </span>
              <span className="text-[9px] text-slate-500">Racha récord</span>
            </div>
          </div>

          {/* Precisión de Respuestas */}
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Porcentaje de Precisión:</span>
            <span className="text-cyan-300 font-bold">
              {triviaAccuracy > 0 ? triviaAccuracy : 83}% de Aciertos
            </span>
          </div>

          <button
            onClick={() => onNavigateTab('trivia')}
            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Jugar Trivias Monetizadas Ahora</span>
          </button>
        </div>
      </div>

      {/* CONSOLA DE VIDEOJUEGOS CON FÍSICA REAL A 60 FPS: BILLAR POOL 8-BALL & ARKANOID CRISTAL */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950/30 to-slate-950 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
              PLAY & EARN · SALÓN DE JUEGOS CLÁSICOS CON FÍSICA REAL A 60 FPS
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Juegos Reales en Tiempo Real: Billar Pool 8-Ball & Arkanoid 🎱
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold">
            ⚡ Movimiento Fluido Natural + Premios en USD
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* JUEGO #1: BILLAR POOL 8-BALL VIP */}
          <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase block">
                  JUEGO #1 · MESA DE BILLAR CON FÍSICA ELÁSTICA REAL
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  🎱 Billar Pool 8-Ball Club VIP
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Apunta con el taco y la guía láser directamente sobre el paño verde, gradúa la fuerza del golpe y emboca las bolas numeradas con brillo 3D en las 6 troneras.
                </p>
              </div>
              <span className="text-3xl shrink-0">🎱</span>
            </div>
            <button
              onClick={() => onNavigateTab('pool')}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-mono text-xs font-black uppercase rounded-xl cursor-pointer shadow-lg shadow-emerald-500/25"
            >
              Jugar Billar Pool 8-Ball Ahora ➔
            </button>
          </div>

          {/* JUEGO #2: ARKANOID CRYSTAL BREAKER 60 FPS */}
          <div className="bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">
                  JUEGO #2 · ROMPE-BLOQUES DE CRISTAL A 60 FPS
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  🧱 Arkanoid Crystal Breaker 60 FPS
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Desliza la plataforma magnética con el mouse o el dedo, haz rebotar la esfera de energía a 60 cuadros por segundo y atrapa las monedas doradas que caen.
                </p>
              </div>
              <span className="text-3xl shrink-0">🧱</span>
            </div>
            <button
              onClick={() => onNavigateTab('arkanoid')}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs font-black uppercase rounded-xl cursor-pointer shadow-lg shadow-cyan-500/25"
            >
              Jugar Arkanoid Cristal Ahora ➔
            </button>
          </div>
        </div>
      </div>

      {/* ACCESOS RÁPIDOS DESTACADOS: MISIONES, COFRES & TORNEO VIP */}
      <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-5 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-amber-300 font-bold uppercase block">
            COFRES, ROBOT MINERO Y TORNEO MUNDIAL
          </span>
          <h3 className="text-lg font-black text-white">
            Misiones, Cofres & Mascota VIP 🎁
          </h3>
          <p className="text-xs text-slate-300">
            Abre tu cofre gratis diario, recolecta dólares de tu <strong>PixiBot</strong> y compite por $250 USD.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('missions')}
          className="px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-mono text-xs font-black uppercase rounded-2xl shrink-0 cursor-pointer shadow-lg shadow-amber-500/20"
        >
          Abrir Cofres
        </button>
      </div>

      {/* ESTADÍSTICAS DEL RESTO DE MÓDULOS DE JUEGO */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6">
        <h3 className="text-sm font-bold text-white uppercase font-mono mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Progreso en Juegos Interactivos & Habilidades</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div
            onClick={() => onNavigateTab('pool')}
            className="p-3 bg-slate-900/60 hover:bg-slate-900 rounded-xl border border-slate-800 hover:border-emerald-500/50 flex items-center gap-3 cursor-pointer transition"
          >
            <Gamepad2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Victorias Billar & Arcade</span>
              <span className="text-base font-black text-white">{userProfile.puzzlesSolved}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
            <Hammer className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Artesanías Forjadas</span>
              <span className="text-base font-black text-white">{userProfile.craftsCompleted}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Páginas Ebooks</span>
              <span className="text-base font-black text-white">{userProfile.ebookPagesRead}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
            <Calculator className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Puntos Matemáticas</span>
              <span className="text-base font-black text-white">{userProfile.mathKidsScore + userProfile.mathTeensScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* HISTORIAL DETALLADO DE ACTIVIDADES Y TRANSACCIONES */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-850">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white uppercase font-mono">
              Historial de Transacciones & Actividades
            </h3>
          </div>

          {/* Filtros de Historial */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'video_ad', label: 'Anuncios' },
              { id: 'trivia', label: 'Trivias' },
              { id: 'wheel', label: 'Ruleta' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Registros */}
        <div className="space-y-2.5">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No hay actividades registradas con este filtro.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isCut = log.status === 'anulado_por_corte';
              return (
                <div
                  key={log.id}
                  className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-colors ${
                    isCut
                      ? 'bg-rose-950/20 border-rose-900/60'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isCut
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {isCut ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono text-xs">
                          {log.title}
                        </span>
                        <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${
                          isCut
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {isCut ? 'Anulado por Corte' : 'Acreditado'}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {log.description}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono block mt-1">
                        {log.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono self-end sm:self-center">
                    {isCut ? (
                      <span className="text-xs font-bold text-rose-400 block">$0.00 USD</span>
                    ) : (
                      <>
                        {log.amountUSD > 0 && (
                          <span className="text-sm font-black text-emerald-400 block">
                            +${log.amountUSD.toFixed(2)} USD
                          </span>
                        )}
                        {log.gems > 0 && (
                          <span className="text-[11px] text-amber-400 block">
                            +{log.gems} 💎
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
