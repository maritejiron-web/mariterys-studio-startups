import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  ThumbsUp,
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  DollarSign,
  Gem,
  Diamond,
  Eye,
  Info,
  XCircle,
  Sparkles,
  Lock
} from 'lucide-react';
import { INITIAL_VIDEO_ADS } from './gameData';
import { VideoAdTask, ProductOpinion } from './types';
import { saveProductReviewToFirestore } from './firebaseService';

interface VideosAndReviewsProps {
  userId: string;
  userEmail: string;
  userName: string;
  onVideoRewardClaimed: (rewardUSD: number, rewardGems: number, rewardDiamonds: number, taskTitle: string) => void;
  onAdInterrupted?: (taskTitle: string) => void;
  onLikeProduct: (rewardGems: number) => void;
  onReviewSubmitted: (opinion: ProductOpinion) => void;
}

export const VideosAndReviews: React.FC<VideosAndReviewsProps> = ({
  userId,
  userEmail,
  userName,
  onVideoRewardClaimed,
  onAdInterrupted,
  onLikeProduct,
  onReviewSubmitted
}) => {
  const [tasks, setTasks] = useState<VideoAdTask[]>(INITIAL_VIDEO_ADS);
  const [activeTask, setActiveTask] = useState<VideoAdTask>(INITIAL_VIDEO_ADS[0]);
  
  // Estados del Cronómetro Estricto y Anti-Corte
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(activeTask.durationSeconds);
  const [hasClaimedVideo, setHasClaimedVideo] = useState(false);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [interruptionReason, setInterruptionReason] = useState<string>('');
  const [likedTasks, setLikedTasks] = useState<string[]>([]);

  // Formulario de opinión y reseñas
  const [starRating, setStarRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [prosText, setProsText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [submittedTasks, setSubmittedTasks] = useState<string[]>([]);
  const [recentReviews, setRecentReviews] = useState<ProductOpinion[]>([]);

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  const countdownRef = useRef(countdown);
  countdownRef.current = countdown;
  const hasClaimedRef = useRef(hasClaimedVideo);
  hasClaimedRef.current = hasClaimedVideo;

  // REGLA ESTRICTA ANTI-CORTE: Detectar cambio de pestaña o pérdida de foco
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlayingRef.current && !hasClaimedRef.current && countdownRef.current > 0) {
        handleInterruption('Cambio de pestaña o minimización de pantalla');
      }
    };

    const handleWindowBlur = () => {
      if (isPlayingRef.current && !hasClaimedRef.current && countdownRef.current > 0) {
        handleInterruption('Pérdida de foco de la ventana del navegador');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  // Función ejecutada cuando se corta o interrumpe el anuncio
  const handleInterruption = (reason: string) => {
    setIsPlaying(false);
    setIsInterrupted(true);
    setInterruptionReason(reason);
    if (onAdInterrupted) {
      onAdInterrupted(activeTask.title);
    }
  };

  // Temporizador de visualización segundo a segundo
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && countdown > 0 && !isInterrupted) {
      interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isInterrupted]);

  // Cuando el cronómetro llega a 0 con éxito (sin cortes)
  useEffect(() => {
    if (countdown === 0 && isPlaying && !hasClaimedVideo && !isInterrupted) {
      setIsPlaying(false);
      setHasClaimedVideo(true);
      onVideoRewardClaimed(
        activeTask.rewardUSD,
        activeTask.rewardGems,
        activeTask.rewardDiamonds,
        activeTask.title
      );

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [countdown, isPlaying, hasClaimedVideo, isInterrupted, activeTask]);

  // Reiniciar temporizador al cambiar de tarea
  const handleSelectTask = (task: VideoAdTask) => {
    if (isPlaying && countdown > 0 && !hasClaimedVideo) {
      const confirmLeave = window.confirm(
        '⚠️ ATENCIÓN: Si cambias de anuncio mientras el cronómetro está corriendo, perderás el dinero de la recompensa. ¿Deseas interrumpir?'
      );
      if (!confirmLeave) return;
      handleInterruption('El usuario cambió de anuncio antes de completar el tiempo.');
    }

    setActiveTask(task);
    setIsPlaying(false);
    setCountdown(task.durationSeconds);
    setHasClaimedVideo(false);
    setIsInterrupted(false);
    setInterruptionReason('');
    setCommentText('');
    setProsText('');
  };

  // Iniciar reproducción respetando la regla
  const handleStartAd = () => {
    setIsInterrupted(false);
    setInterruptionReason('');
    setIsPlaying(true);
  };

  // Pausar intencionalmente (activa la regla anti-corte)
  const handlePauseAd = () => {
    handleInterruption('El usuario pausó la reproducción del anuncio');
  };

  // Reiniciar desde cero para cumplir la regla
  const handleRestartFromZero = () => {
    setIsInterrupted(false);
    setInterruptionReason('');
    setCountdown(activeTask.durationSeconds);
    setIsPlaying(true);
  };

  // Abandonar sin recompensa
  const handleDismissAd = () => {
    setIsInterrupted(false);
    setIsPlaying(false);
    setCountdown(activeTask.durationSeconds);
  };

  // Dar Like al producto
  const handleLike = () => {
    if (likedTasks.includes(activeTask.id)) return;

    setLikedTasks((prev) => [...prev, activeTask.id]);
    setTasks((prev) =>
      prev.map((t) => (t.id === activeTask.id ? { ...t, likesCount: t.likesCount + 1 } : t))
    );
    onLikeProduct(15); // 15 Gemas por cada Like
  };

  // Enviar reseña/opinión de producto
  const handleSubmitOpinion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submittedTasks.includes(activeTask.id)) return;

    setIsSubmittingReview(true);

    const rewardBonusUSD = 0.75;
    const opinion: ProductOpinion = {
      id: `rev-${Date.now()}`,
      productId: activeTask.id,
      userId: userId || 'guest',
      userEmail: userEmail || 'invitado@playearn.app',
      userName: userName || 'Usuario Evaluador',
      rating: starRating,
      liked: likedTasks.includes(activeTask.id),
      comment: commentText,
      pros: prosText || 'Excelente calidad y presentación',
      rewardEarned: rewardBonusUSD,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    await saveProductReviewToFirestore(opinion);
    setRecentReviews((prev) => [opinion, ...prev]);
    setSubmittedTasks((prev) => [...prev, activeTask.id]);
    onReviewSubmitted(opinion);

    setIsSubmittingReview(false);
    setCommentText('');
    setProsText('');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  const isLiked = likedTasks.includes(activeTask.id);
  const isReviewed = submittedTasks.includes(activeTask.id);
  const progressPercent = Math.round(((activeTask.durationSeconds - countdown) / activeTask.durationSeconds) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Encabezado y Regla Destacada */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Play className="w-3.5 h-3.5" />
          <span>Anuncios Monetizados con Cronómetro Anti-Corte</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          📺 Ver Anuncios Monetizados & Calificar
        </h2>
        
        {/* BANNER OFICIAL DE LA REGLA DEL CRONÓMETRO */}
        <div className="max-w-2xl mx-auto p-3 bg-amber-950/40 border border-amber-500/40 rounded-2xl flex items-start gap-3 text-left">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-300 uppercase tracking-wide block font-mono">
              Regla Oficial del Cronómetro:
            </span>
            <p className="text-slate-300 mt-0.5 leading-relaxed">
              Debes mirar el anuncio completo hasta que el cronómetro llegue a <strong className="text-white">00:00</strong>. Si pausas, cambias de pestaña o cierras el anuncio por cualquier razón, <strong className="text-rose-400">el dinero de la ganancia NO se acreditará en tu cuenta</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Anuncios Disponibles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {tasks.map((task) => {
          const isSelected = activeTask.id === task.id;
          return (
            <button
              key={task.id}
              onClick={() => handleSelectTask(task)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-950 border-rose-500 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                <img
                  src={task.thumbnail}
                  alt={task.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-amber-400" />
                  <span>{task.durationSeconds}s</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block truncate">
                  {task.brand}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                  {task.title}
                </h4>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-emerald-400 font-black">+${task.rewardUSD.toFixed(2)} USD</span>
                <span className="text-amber-400">+{task.rewardGems} 💎</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Reproductor Interactivo con Cronómetro Estricto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Lado Izquierdo: Pantalla de Video / Anuncio */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between relative">
          {/* Pantalla de Reproducción */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            <img
              src={activeTask.videoUrl}
              alt={activeTask.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-90' : 'opacity-50'
              }`}
            />

            {/* ESTADO 1: ANTES DE INICIAR */}
            {!isPlaying && !hasClaimedVideo && !isInterrupted && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={handleStartAd}
                  className="w-16 h-16 bg-gradient-to-tr from-rose-600 to-amber-500 hover:from-rose-500 hover:to-yellow-400 rounded-full flex items-center justify-center text-slate-950 shadow-2xl transition-transform hover:scale-110 cursor-pointer mb-3"
                >
                  <Play className="w-8 h-8 ml-1 fill-current" />
                </button>
                <span className="text-sm font-mono font-black text-white uppercase tracking-wider">
                  Ver Anuncio Completo ({activeTask.durationSeconds} seg)
                </span>
                <span className="text-xs text-emerald-400 font-mono mt-1 font-bold">
                  Recompensa Oficial: +${activeTask.rewardUSD.toFixed(2)} USD • +{activeTask.rewardGems} Gemas
                </span>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Obligatorio: Ver 100% sin pausas ni cambiar de pestaña</span>
                </div>
              </div>
            )}

            {/* ESTADO 2: REPRODUCIENDO CON CRONÓMETRO ACTIVO */}
            {isPlaying && !isInterrupted && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                {/* Indicador de Seguridad Anti-Corte */}
                <div className="flex items-center justify-between pointer-events-auto">
                  <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-rose-500/60 flex items-center gap-2 text-[11px] font-mono font-bold text-white shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span>ANTI-CORTE ACTIVO</span>
                  </div>

                  {/* Contador Cronómetro Digital de Alta Precisión */}
                  <div className="bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-amber-400 flex items-center gap-2 shadow-xl">
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                    <span className="text-sm font-mono font-black text-amber-300">
                      00:{countdown < 10 ? `0${countdown}` : countdown}
                    </span>
                  </div>
                </div>

                {/* Barra de progreso de visualización obligatoria */}
                <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                    <span>Progreso de visualización: {progressPercent}%</span>
                    <span className="text-amber-400 font-bold">Tiempo restante: {countdown}s</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-400 transition-all duration-1000 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ESTADO 3: ALERTA DE INTERRUPCIÓN / CORTE (REGLA APLICADA) */}
            <AnimatePresence>
              {isInterrupted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20"
                >
                  <div className="w-14 h-14 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 mb-3 shadow-lg shadow-rose-500/20">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block">
                    REGLA DE MONETIZACIÓN VIOLADA
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white uppercase mt-1">
                    ¡Anuncio Interrumpido!
                  </h4>
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-xl text-xs text-slate-300 max-w-md my-3 leading-relaxed">
                    <p className="font-bold text-rose-300">
                      Motivo: {interruptionReason || 'Pausa o abandono antes del tiempo'}
                    </p>
                    <p className="mt-1 text-slate-400">
                      El dinero de la recompensa (<strong className="text-rose-300">+${activeTask.rewardUSD.toFixed(2)} USD</strong>) <strong className="text-white">NO ha sido acreditado</strong> en tu cuenta porque no cumpliste el 100% del cronómetro continuo.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleRestartFromZero}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reiniciar y Ver Completo (Ganar Dinero)</span>
                    </button>
                    <button
                      onClick={handleDismissAd}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-mono uppercase transition-colors cursor-pointer border border-slate-800"
                    >
                      <span>Descartar ($0.00)</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ESTADO 4: ANUNCIO COMPLETADO EXITOSAMENTE (100% VERIFICADO) */}
            {hasClaimedVideo && (
              <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-500/20 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block">
                  CRONÓMETRO 100% VERIFICADO
                </span>
                <h4 className="text-xl font-black text-white uppercase mt-1">
                  ¡Recompensa Acreditada en tu Cuenta!
                </h4>
                <div className="my-3 px-4 py-2 bg-emerald-900/60 border border-emerald-600/50 rounded-xl text-xs font-mono text-emerald-200">
                  <span>Has recibido </span>
                  <strong className="text-white text-sm">+${activeTask.rewardUSD.toFixed(2)} USD</strong>
                  <span>, </span>
                  <strong className="text-amber-300">+{activeTask.rewardGems} 💎</strong>
                  <span> y </span>
                  <strong className="text-purple-300">+{activeTask.rewardDiamonds} 💠</strong>
                </div>
                <p className="text-[11px] text-slate-300">
                  Ahora puedes dar Like al producto (+15 💎) y publicar tu opinión sincera (+ $0.75 USD).
                </p>
              </div>
            )}
          </div>

          {/* Barra de Controles y Datos del Video */}
          <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-850">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                {activeTask.brand} • {activeTask.category}
              </span>
              <h3 className="text-sm font-bold text-white line-clamp-1">
                {activeTask.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {/* Botón de pausa manual (advierte la regla) */}
              {isPlaying && !isInterrupted && (
                <button
                  onClick={handlePauseAd}
                  className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  title="Pausar anuncio (cancelará la acreditación)"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar</span>
                </button>
              )}

              {/* Botón de Like */}
              <button
                onClick={handleLike}
                disabled={isLiked}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLiked
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'text-rose-400 fill-rose-400' : ''}`} />
                <span>{activeTask.likesCount}</span>
                {!isLiked && <span className="text-[10px] text-amber-400">(+15 💎)</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Ficha del Producto y Formulario de Opinión */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <img
                src={activeTask.productImage}
                alt={activeTask.productName}
                className="w-12 h-12 object-cover rounded-xl border border-slate-700"
              />
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                  Producto Comercial:
                </span>
                <h4 className="text-xs font-bold text-white">
                  {activeTask.productName}
                </h4>
                <div className="flex items-center gap-1 text-amber-400 text-xs mt-0.5">
                  {'★'.repeat(Math.floor(activeTask.ratingAverage))}
                  <span className="text-[10px] text-slate-400 font-mono ml-1">
                    ({activeTask.ratingAverage} / 5.0)
                  </span>
                </div>
              </div>
            </div>

            {/* Formulario de Reseña de Producto */}
            <form onSubmit={handleSubmitOpinion} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1 font-bold">
                  Tu Calificación del Producto:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setStarRating(star)}
                      className={`text-xl transition-transform hover:scale-125 cursor-pointer ${
                        star <= starRating ? 'text-amber-400' : 'text-slate-700'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs text-amber-400 font-mono font-bold ml-2">
                    {starRating} Estrellas
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1 font-bold">
                  Tu Opinión o Reseña Comercial:
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribe tu opinión honesta (calidad, utilidad, precio)..."
                  rows={2}
                  disabled={isReviewed}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl p-2.5 text-xs text-slate-200 outline-none resize-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1 font-bold">
                  Puntos Fuertes (Pros):
                </label>
                <input
                  type="text"
                  value={prosText}
                  onChange={(e) => setProsText(e.target.value)}
                  placeholder="Ej: Rápida entrega, materiales de calidad..."
                  disabled={isReviewed}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl p-2 text-xs text-slate-200 outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                {isReviewed ? (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-center text-xs font-mono text-emerald-300 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Reseña Aprobada • Bono de +$0.75 USD acreditado</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !commentText.trim()}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isSubmittingReview ? 'Publicando...' : 'Publicar Opinión (+ $0.75 USD)'}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Historial de Opiniones Publicadas Recientemente */}
      {recentReviews.length > 0 && (
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-3 flex items-center gap-2">
            <span>📝 Opiniones Recientes en la Comunidad:</span>
          </h4>
          <div className="space-y-2">
            {recentReviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-white mr-2">{rev.userName}:</span>
                  <span className="text-slate-300 italic">"{rev.comment}"</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                  <span className="text-amber-400">{'★'.repeat(rev.rating)}</span>
                  <span className="text-emerald-400 font-bold">+${rev.rewardEarned.toFixed(2)} USD</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
