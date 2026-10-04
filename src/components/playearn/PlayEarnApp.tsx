import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  RotateCw,
  Gamepad2,
  Gift,
  Hammer,
  BookOpen,
  Calculator,
  Wallet,
  User,
  LogOut,
  Sparkles,
  Flame,
  Award,
  Gem,
  Diamond,
  Share2,
  Check,
  Globe,
  Coins,
  ArrowLeft,
  LayoutDashboard,
  Zap,
  ShieldCheck,
  ShieldAlert,
  CreditCard,
  Rocket,
  Swords
} from 'lucide-react';
import { UserProfile, WheelPrize, CraftMaterial, CraftRecipe, ProductOpinion, UserActivityLog } from './types';
import {
  getStoredLocalProfile,
  saveStoredLocalProfile,
  syncUserProfileToFirebase,
  subscribeToAuthChanges,
  logoutFirebase,
  getUserActivityLogs,
  saveUserActivityLog
} from './firebaseService';
import { WheelGame } from './WheelGame';
import { VideoGameConsoleHub } from './VideoGameConsoleHub';
import { MissionsAndPetHub } from './MissionsAndPetHub';
import { CraftingWorkshop } from './CraftingWorkshop';
import { EbookReader } from './EbookReader';
import { MathGames } from './MathGames';
import { VideosAndReviews } from './VideosAndReviews';
import { TriviaGame } from './TriviaGame';
import { UserDashboard } from './UserDashboard';
import { WalletModal } from './WalletModal';
import { AuthModal } from './AuthModal';

interface PlayEarnAppProps {
  onBackToHub: () => void;
  onNavigateToAcademy?: () => void;
}

export const PlayEarnApp: React.FC<PlayEarnAppProps> = ({ onBackToHub, onNavigateToAcademy }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredLocalProfile);
  const [activityLogs, setActivityLogs] = useState<UserActivityLog[]>(getUserActivityLogs);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pool' | 'arkanoid' | 'videos' | 'trivia' | 'wheel' | 'missions' | 'craft' | 'ebooks' | 'math'>('dashboard');
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [notificationToast, setNotificationToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Escuchar cambios de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        // Usuario conectado
        setUserProfile((prev) => ({
          ...prev,
          uid: firebaseUser.uid,
          email: firebaseUser.email || prev.email,
          displayName: firebaseUser.displayName || prev.displayName || 'Usuario Play & Earn'
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotificationToast({ message, type });
    setTimeout(() => setNotificationToast(null), 3800);
  };

  // Guardar perfil y sincronizar con Firestore
  const updateProfile = (updater: (prev: UserProfile) => UserProfile) => {
    setUserProfile((prev) => {
      const next = updater(prev);
      syncUserProfileToFirebase(next);
      return next;
    });
  };

  // Registrar actividad
  const logActivity = (log: Omit<UserActivityLog, 'id' | 'userId' | 'timestamp'>) => {
    const newLog: UserActivityLog = {
      ...log,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: userProfile.uid,
      timestamp: 'Justo ahora'
    };
    saveUserActivityLog(newLog);
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Recompensas de Videos y Anuncios Monetizados (Cronómetro 100% verificado)
  const handleVideoReward = (rewardUSD: number, rewardGems: number, rewardDiamonds: number, taskTitle: string) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + rewardUSD).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + rewardUSD).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + rewardUSD).toFixed(2)),
      gems: prev.gems + rewardGems,
      diamonds: prev.diamonds + rewardDiamonds,
      videosWatched: (prev.videosWatched || 0) + 1,
      adsCompleted: (prev.adsCompleted || prev.videosWatched || 0) + 1,
      xp: prev.xp + 60
    }));

    logActivity({
      type: 'video_ad',
      title: `Anuncio Verificado: ${taskTitle}`,
      description: 'Cronómetro 100% completado sin interrupciones. Pago garantizado acreditado.',
      amountUSD: rewardUSD,
      gems: rewardGems,
      diamonds: rewardDiamonds,
      status: 'acreditado'
    });

    showToast(`¡Acreditado! +$${rewardUSD.toFixed(2)} USD, +${rewardGems} 💎 y +${rewardDiamonds} 💠`);
  };

  // Regla del Cronómetro: Anuncio Interrumpido / Cortado
  const handleAdInterrupted = (taskTitle: string) => {
    updateProfile((prev) => ({
      ...prev,
      adsInterrupted: (prev.adsInterrupted || 0) + 1
    }));

    logActivity({
      type: 'video_ad',
      title: `Anuncio Interrumpido: ${taskTitle}`,
      description: 'El usuario pausó o abandonó la pantalla antes del tiempo requerido. Ganancia anulada por regla.',
      amountUSD: 0,
      gems: 0,
      diamonds: 0,
      status: 'anulado_por_corte'
    });

    showToast('⚠️ Anuncio interrumpido: Ganancia anulada. Debes ver el 100% continuo.', 'warning');
  };

  // Recompensas de Trivias Monetizadas
  const handleTriviaAnswered = (
    isCorrect: boolean,
    rewardUSD: number,
    gems: number,
    diamonds: number,
    streak: number,
    category: string
  ) => {
    updateProfile((prev) => {
      const nextTriviasPlayed = (prev.triviasPlayed || 0) + 1;
      const nextCorrect = isCorrect ? (prev.triviaCorrectAnswers || 0) + 1 : (prev.triviaCorrectAnswers || 0);
      const nextBestStreak = Math.max(prev.triviaBestStreak || 0, streak);

      return {
        ...prev,
        triviasPlayed: nextTriviasPlayed,
        triviaCorrectAnswers: nextCorrect,
        triviaBestStreak: nextBestStreak,
        balanceUSD: isCorrect ? Number((prev.balanceUSD + rewardUSD).toFixed(2)) : prev.balanceUSD,
        totalEarnedUSD: isCorrect ? Number(((prev.totalEarnedUSD || prev.balanceUSD) + rewardUSD).toFixed(2)) : prev.totalEarnedUSD,
        todayEarnedUSD: isCorrect ? Number(((prev.todayEarnedUSD || 0) + rewardUSD).toFixed(2)) : prev.todayEarnedUSD,
        gems: isCorrect ? prev.gems + gems : prev.gems,
        diamonds: isCorrect ? prev.diamonds + diamonds : prev.diamonds,
        xp: isCorrect ? prev.xp + 40 : prev.xp + 10
      };
    });

    if (isCorrect) {
      logActivity({
        type: 'trivia',
        title: `Trivia Acertada: ${category}`,
        description: `Respuesta correcta con racha de ${streak} aciertos consecutivos.`,
        amountUSD: rewardUSD,
        gems: gems,
        diamonds: diamonds,
        status: 'acreditado'
      });
      showToast(`¡Trivia acertada! +$${rewardUSD.toFixed(2)} USD y +${gems} 💎`);
    } else {
      logActivity({
        type: 'trivia',
        title: `Trivia Fallada: ${category}`,
        description: 'Respuesta incorrecta o tiempo agotado.',
        amountUSD: 0,
        gems: 0,
        diamonds: 0,
        status: 'acreditado'
      });
    }
  };

  // Recompensa por dar Like a Producto
  const handleLikeProduct = (rewardGems: number) => {
    updateProfile((prev) => ({
      ...prev,
      gems: prev.gems + rewardGems,
      xp: prev.xp + 10
    }));
    showToast(`¡Like registrado! +${rewardGems} Gemas 💎`);
  };

  // Recompensa por Reseña/Opinión
  const handleReviewSubmitted = (opinion: ProductOpinion) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + opinion.rewardEarned).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + opinion.rewardEarned).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + opinion.rewardEarned).toFixed(2)),
      gems: prev.gems + 30,
      reviewsSubmitted: (prev.reviewsSubmitted || 0) + 1,
      xp: prev.xp + 45
    }));

    logActivity({
      type: 'video_ad',
      title: 'Reseña de Producto Publicada',
      description: `Evaluación de ${opinion.rating} estrellas aprobada.`,
      amountUSD: opinion.rewardEarned,
      gems: 30,
      diamonds: 0,
      status: 'acreditado'
    });

    showToast(`¡Opinión publicada! +$${opinion.rewardEarned.toFixed(2)} USD y +30 💎`);
  };

  // Rueda de la fortuna
  const handleUseSpin = () => {
    updateProfile((prev) => ({
      ...prev,
      spinsLeft: Math.max(0, prev.spinsLeft - 1)
    }));
  };

  const handleWinPrize = (prize: WheelPrize) => {
    updateProfile((prev) => {
      let balanceUSD = prev.balanceUSD;
      let totalEarnedUSD = prev.totalEarnedUSD || prev.balanceUSD;
      let todayEarnedUSD = prev.todayEarnedUSD || 0;
      let gems = prev.gems;
      let diamonds = prev.diamonds;
      let spinsLeft = prev.spinsLeft;

      if (prize.type === 'usd' || prize.type === 'jackpot') {
        balanceUSD = Number((balanceUSD + prize.value).toFixed(2));
        totalEarnedUSD = Number((totalEarnedUSD + prize.value).toFixed(2));
        todayEarnedUSD = Number((todayEarnedUSD + prize.value).toFixed(2));
      } else if (prize.type === 'gems') {
        gems += prize.value;
      } else if (prize.type === 'diamonds') {
        diamonds += prize.value;
      } else if (prize.type === 'spin') {
        spinsLeft += prize.value;
      }

      return {
        ...prev,
        balanceUSD,
        totalEarnedUSD,
        todayEarnedUSD,
        gems,
        diamonds,
        spinsLeft,
        xp: prev.xp + 30
      };
    });

    logActivity({
      type: 'wheel',
      title: `Rueda de la Fortuna: ${prize.label}`,
      description: 'Premio obtenido girando la rueda de premios diarios.',
      amountUSD: (prize.type === 'usd' || prize.type === 'jackpot') ? prize.value : 0,
      gems: prize.type === 'gems' ? prize.value : 0,
      diamonds: prize.type === 'diamonds' ? prize.value : 0,
      status: 'acreditado'
    });

    showToast(`¡Premio de la Rueda: ${prize.label}! 🎉`);
  };

  const handleBuySpinsWithGems = () => {
    if (userProfile.gems < 100) return;
    updateProfile((prev) => ({
      ...prev,
      gems: prev.gems - 100,
      spinsLeft: prev.spinsLeft + 1
    }));
    showToast('¡Compraste 1 Giro extra por 100 Gemas! 🎡');
  };

  // Recompensas de la Consola de Videojuegos (#1 Racer Neon 3D & #4 Monster Pet Evolution)
  const handleConsoleReward = (
    gameName: string,
    rewardUSD: number,
    rewardGems: number,
    rewardDiamonds: number,
    gemCost: number = 0
  ) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + rewardUSD).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + rewardUSD).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + rewardUSD).toFixed(2)),
      gems: Math.max(0, prev.gems - gemCost + rewardGems),
      diamonds: prev.diamonds + rewardDiamonds,
      puzzlesSolved: (prev.puzzlesSolved || 0) + 1,
      xp: prev.xp + 110
    }));

    logActivity({
      type: 'puzzle',
      title: `Consola de Videojuegos: ${gameName}`,
      description:
        gemCost > 0
          ? `Mejora desbloqueada por ${gemCost} Gemas + bono acreditado.`
          : 'Recompensa ganada en Play & Earn: Consola de Videojuegos.',
      amountUSD: rewardUSD,
      gems: rewardGems - gemCost,
      diamonds: rewardDiamonds,
      status: 'acreditado'
    });

    showToast(
      `¡${gameName}! +$${rewardUSD.toFixed(2)} USD, +${rewardGems} 💎 y +${rewardDiamonds} 💠`
    );
  };

  // Recompensas del Salón Arcade Neon 3-en-1
  const handleArcadeReward = (gameName: string, rewardUSD: number, rewardGems: number, rewardDiamonds: number) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + rewardUSD).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + rewardUSD).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + rewardUSD).toFixed(2)),
      gems: prev.gems + rewardGems,
      diamonds: prev.diamonds + rewardDiamonds,
      puzzlesSolved: (prev.puzzlesSolved || 0) + 1,
      xp: prev.xp + 90
    }));

    logActivity({
      type: 'puzzle',
      title: `Victoria en Arcade Neon: ${gameName}`,
      description: 'Recompensa instantánea ganada en el Salón Arcade Neon 3-en-1.',
      amountUSD: rewardUSD,
      gems: rewardGems,
      diamonds: rewardDiamonds,
      status: 'acreditado'
    });

    showToast(`¡Ganaste en ${gameName}! +$${rewardUSD.toFixed(2)} USD, +${rewardGems} 💎 y +${rewardDiamonds} 💠`);
  };

  // Recompensas de Misiones Diarias, Cofres Sorpresa y Mascota Minera
  const handleClaimMissionOrChest = (
    title: string,
    rewardUSD: number,
    rewardGems: number,
    rewardDiamonds: number,
    gemCost: number = 0
  ) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + rewardUSD).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + rewardUSD).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + rewardUSD).toFixed(2)),
      gems: Math.max(0, prev.gems - gemCost + rewardGems),
      diamonds: prev.diamonds + rewardDiamonds,
      xp: prev.xp + 75
    }));

    logActivity({
      type: 'wheel',
      title,
      description: gemCost > 0
        ? `Desbloqueado con ${gemCost} Gemas en la Bóveda VIP.`
        : 'Recompensa especial acreditada en tu cuenta.',
      amountUSD: rewardUSD,
      gems: rewardGems - gemCost,
      diamonds: rewardDiamonds,
      status: 'acreditado'
    });

    showToast(`¡${title}! +$${rewardUSD.toFixed(2)} USD y +${rewardDiamonds} 💠`);
  };

  // Taller de artesanía
  const handleBuyCraftMaterial = (material: CraftMaterial) => {
    updateProfile((prev) => ({
      ...prev,
      gems: prev.gems - material.costGems
    }));
  };

  const handleSellCraft = (recipe: CraftRecipe) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + recipe.sellPriceUSD).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + recipe.sellPriceUSD).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + recipe.sellPriceUSD).toFixed(2)),
      diamonds: prev.diamonds + recipe.sellPriceDiamonds,
      craftsCompleted: (prev.craftsCompleted || 0) + 1,
      xp: prev.xp + 100
    }));

    logActivity({
      type: 'craft',
      title: `Venta Artesanal: ${recipe.name}`,
      description: 'Pieza forjada y vendida en el mercado artesanal.',
      amountUSD: recipe.sellPriceUSD,
      gems: 0,
      diamonds: recipe.sellPriceDiamonds,
      status: 'acreditado'
    });

    showToast(`¡Vendiste "${recipe.name}" por +$${recipe.sellPriceUSD.toFixed(2)} USD y +${recipe.sellPriceDiamonds} 💠!`);
  };

  // Ebooks
  const handleChapterCompleted = (rewardUSD: number, rewardDiamonds: number) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + rewardUSD).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + rewardUSD).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + rewardUSD).toFixed(2)),
      diamonds: prev.diamonds + rewardDiamonds,
      ebookPagesRead: (prev.ebookPagesRead || 0) + 10,
      xp: prev.xp + 45
    }));

    logActivity({
      type: 'ebook',
      title: 'Capítulo de Ebook Completado',
      description: 'Lectura de literatura interactiva completada.',
      amountUSD: rewardUSD,
      gems: 0,
      diamonds: rewardDiamonds,
      status: 'acreditado'
    });

    showToast(`¡Capítulo completado! +$${rewardUSD.toFixed(2)} USD y +${rewardDiamonds} 💠`);
  };

  // Matemáticas
  const handleMathAnswered = (rewardUSD: number, rewardGems: number, rewardDiamonds: number) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD + rewardUSD).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + rewardUSD).toFixed(2)),
      todayEarnedUSD: Number(((prev.todayEarnedUSD || 0) + rewardUSD).toFixed(2)),
      gems: prev.gems + rewardGems,
      diamonds: prev.diamonds + rewardDiamonds,
      mathKidsScore: (prev.mathKidsScore || 0) + 1,
      xp: prev.xp + 35
    }));

    logActivity({
      type: 'math',
      title: 'Reto Matemático Resuelto',
      description: 'Problema interactivo de cálculo mental o álgebra resuelto.',
      amountUSD: rewardUSD,
      gems: rewardGems,
      diamonds: rewardDiamonds,
      status: 'acreditado'
    });

    showToast(`¡Respuesta correcta! +$${rewardUSD.toFixed(2)} USD, +${rewardGems} 💎 y +${rewardDiamonds} 💠`);
  };

  // Conversiones de billetera
  const handleConvertGemsToUSD = (gemsAmount: number, usdEarned: number) => {
    updateProfile((prev) => ({
      ...prev,
      gems: prev.gems - gemsAmount,
      balanceUSD: Number((prev.balanceUSD + usdEarned).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + usdEarned).toFixed(2))
    }));

    logActivity({
      type: 'conversion',
      title: 'Canje de Gemas por Dinero',
      description: `Conversión de ${gemsAmount} Gemas ➔ $${usdEarned.toFixed(2)} USD.`,
      amountUSD: usdEarned,
      gems: -gemsAmount,
      diamonds: 0,
      status: 'acreditado'
    });

    showToast(`Canje exitoso: -${gemsAmount} Gemas ➔ +$${usdEarned.toFixed(2)} USD en saldo retirable`);
  };

  const handleConvertDiamondsToUSD = (diamondsAmount: number, usdEarned: number) => {
    updateProfile((prev) => ({
      ...prev,
      diamonds: prev.diamonds - diamondsAmount,
      balanceUSD: Number((prev.balanceUSD + usdEarned).toFixed(2)),
      totalEarnedUSD: Number(((prev.totalEarnedUSD || prev.balanceUSD) + usdEarned).toFixed(2))
    }));

    logActivity({
      type: 'conversion',
      title: 'Canje de Diamantes por Dinero',
      description: `Conversión de ${diamondsAmount} Diamantes ➔ $${usdEarned.toFixed(2)} USD.`,
      amountUSD: usdEarned,
      gems: 0,
      diamonds: -diamondsAmount,
      status: 'acreditado'
    });

    showToast(`Canje exitoso: -${diamondsAmount} Diamantes ➔ +$${usdEarned.toFixed(2)} USD en saldo retirable`);
  };

  const handleWithdrawSubmitted = (amount: number) => {
    updateProfile((prev) => ({
      ...prev,
      balanceUSD: Number((prev.balanceUSD - amount).toFixed(2))
    }));

    logActivity({
      type: 'withdrawal',
      title: 'Solicitud de Retiro de Fondos',
      description: `Solicitud de retiro de $${amount.toFixed(2)} USD en proceso de transferencia.`,
      amountUSD: -amount,
      gems: 0,
      diamonds: 0,
      status: 'pendiente'
    });
  };

  const handleLogout = async () => {
    await logoutFirebase();
    setUserProfile((prev) => ({
      ...prev,
      uid: 'guest_demo',
      email: 'invitado@playearn.app',
      displayName: 'Jugador Pro'
    }));
    showToast('Sesión cerrada.');
  };

  // Copiar link directo para compartir la app
  const copyShareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=playearn`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
    showToast('¡Enlace de Play & Earn copiado al portapapeles!');
  };

  const isGuest = userProfile.uid === 'guest_demo';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl border text-white font-mono text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md ${
              notificationToast.type === 'warning'
                ? 'bg-rose-950/95 border-rose-500/80 text-rose-200'
                : 'bg-emerald-950/95 border-emerald-500/80 text-emerald-200'
            }`}
          >
            {notificationToast.type === 'warning' ? (
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{notificationToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SUPERIOR CON SALDO, GEMAS Y AUTENTICACIÓN FIREBASE */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo y Marca */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToHub}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-colors cursor-pointer"
                title="Regresar al Hub de Startups"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className="p-2 bg-gradient-to-br from-amber-500 to-rose-600 text-slate-950 rounded-xl font-black text-lg shadow-md shadow-amber-500/20 cursor-pointer"
                title="Ir a mi Dashboard"
              >
                🎮
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-white uppercase flex items-center gap-1.5">
                    <span>Play & Earn · Consola de Videojuegos</span>
                    <span className="text-[10px] font-mono font-bold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded">
                      VIP
                    </span>
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Física Real 60 FPS · Billar Pool 8-Ball & Arkanoid Cristal
                  </span>
                </div>
              </div>
            </div>

            {/* Botón compartir en móvil */}
            <button
              onClick={copyShareLink}
              className="md:hidden p-2 bg-slate-900 text-amber-400 rounded-xl border border-slate-800"
              title="Compartir enlace"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Medidores de Saldo, Gemas, Diamantes y Acciones */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
            {/* Saldo en Dinero Real Retirable */}
            <button
              onClick={() => setIsWalletOpen(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/60 hover:border-emerald-400 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm shadow-emerald-500/10"
              title="Abrir Billetera y Retiros"
            >
              <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-md">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono uppercase text-slate-400 block leading-tight">
                  Saldo Efectivo
                </span>
                <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">
                  ${userProfile.balanceUSD.toFixed(2)} USD
                </span>
              </div>
            </button>

            {/* Contador de Gemas */}
            <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
              <Gem className="w-3.5 h-3.5 text-blue-400" />
              <div className="text-left">
                <span className="text-[9px] font-mono uppercase text-slate-400 block leading-tight">
                  Gemas
                </span>
                <span className="text-xs sm:text-sm font-black text-blue-400 font-mono">
                  {userProfile.gems}
                </span>
              </div>
            </div>

            {/* Contador de Diamantes */}
            <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
              <Diamond className="w-3.5 h-3.5 text-purple-400" />
              <div className="text-left">
                <span className="text-[9px] font-mono uppercase text-slate-400 block leading-tight">
                  Diamantes
                </span>
                <span className="text-xs sm:text-sm font-black text-purple-400 font-mono">
                  {userProfile.diamonds}
                </span>
              </div>
            </div>

            {/* Perfil & Dashboard VIP Shortcut */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
              title="Abrir Mi Dashboard de Métricas"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono font-bold">Mi Panel</span>
            </button>

            {/* Autenticación Firebase (Email / Password) */}
            {isGuest ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/10 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Ingresar / Registro</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-white block leading-tight truncate max-w-[120px]">
                    {userProfile.displayName}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono block truncate max-w-[120px]">
                    {userProfile.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Compartir App */}
            <button
              onClick={copyShareLink}
              className="hidden md:flex p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-xl border border-slate-800 transition-colors cursor-pointer items-center gap-1 text-xs font-mono"
              title="Copiar enlace para compartir la app"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* BARRA DE PESTAÑAS Y NAVEGACIÓN COMPLETA */}
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-slate-850 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard & Consola', icon: LayoutDashboard, color: 'text-amber-400', badge: 'VIP' },
            { id: 'pool', label: '🎱 Billar Pool 8-Ball VIP', icon: Gamepad2, color: 'text-emerald-400', badge: 'Física Real' },
            { id: 'arkanoid', label: '🧱 Arkanoid Cristal 60FPS', icon: Sparkles, color: 'text-cyan-400', badge: '60 FPS' },
            { id: 'missions', label: 'Misiones, Cofres & Mascota', icon: Gift, color: 'text-amber-400', badge: 'Premios' },
            { id: 'videos', label: 'Ver Anuncios Monetizados', icon: Play, color: 'text-rose-400', badge: 'Regla 100%' },
            { id: 'trivia', label: 'Juego de Trivias', icon: Zap, color: 'text-cyan-400', badge: 'Efectivo' },
            { id: 'wheel', label: 'Gira y Gana (Rueda)', icon: RotateCw, color: 'text-amber-400', badge: 'Jackpot $10' },
            { id: 'craft', label: 'Taller de Artesanía', icon: Hammer, color: 'text-amber-500', badge: 'Forja' },
            { id: 'ebooks', label: 'Lectura de Ebooks', icon: BookOpen, color: 'text-emerald-400', badge: 'Libros' },
            { id: 'math', label: 'Matemáticas Kids & Colegio', icon: Calculator, color: 'text-cyan-400', badge: 'Retos' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-slate-900 border-amber-500 text-white shadow-md shadow-amber-500/10'
                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* TICKER SOCIAL DE GANADORES EN TIEMPO REAL */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 text-[11px] font-mono text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-amber-400 font-bold shrink-0">⚡ ACTIVIDAD EN VIVO:</span>
            <span className="shrink-0">🎱 <strong>Carlos_CR</strong> embocó 5 bolas en <em>Billar Pool 8-Ball (+$0.75 USD)</em></span>
            <span className="text-slate-600">·</span>
            <span className="shrink-0">🧱 <strong>Elena_VIP</strong> completó nivel en <em>Arkanoid Cristal (+$0.65 USD)</em></span>
            <span className="text-slate-600">·</span>
            <span className="shrink-0">🎁 <strong>Diego_PRO</strong> abrió un <em>Cofre Imperial (+$2.10 USD)</em></span>
          </div>
          <button
            onClick={() => setActiveTab('missions')}
            className="text-amber-400 hover:text-amber-300 font-bold shrink-0 cursor-pointer hidden sm:inline"
          >
            Ver Torneo $250 USD ➔
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL SEGÚN PESTAÑA */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <UserDashboard
                userProfile={userProfile}
                activityLogs={activityLogs}
                onOpenWallet={() => setIsWalletOpen(true)}
                onNavigateTab={(tab) => setActiveTab(tab as any)}
              />
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <VideosAndReviews
                userId={userProfile.uid}
                userEmail={userProfile.email}
                userName={userProfile.displayName}
                onVideoRewardClaimed={handleVideoReward}
                onAdInterrupted={handleAdInterrupted}
                onLikeProduct={handleLikeProduct}
                onReviewSubmitted={handleReviewSubmitted}
              />
            </motion.div>
          )}

          {activeTab === 'trivia' && (
            <motion.div
              key="trivia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TriviaGame
                userGems={userProfile.gems}
                onTriviaAnswered={handleTriviaAnswered}
                onOpenAdModal={() => setActiveTab('videos')}
              />
            </motion.div>
          )}

          {activeTab === 'wheel' && (
            <motion.div
              key="wheel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <WheelGame
                spinsLeft={userProfile.spinsLeft}
                onWinPrize={handleWinPrize}
                onUseSpin={handleUseSpin}
                onBuySpinsWithGems={handleBuySpinsWithGems}
                gemsCount={userProfile.gems}
              />
            </motion.div>
          )}

          {activeTab === 'pool' && (
            <motion.div
              key="pool"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <VideoGameConsoleHub
                initialGame="pool"
                userGems={userProfile.gems}
                userDiamonds={userProfile.diamonds}
                onConsoleReward={handleConsoleReward}
              />
            </motion.div>
          )}

          {activeTab === 'arkanoid' && (
            <motion.div
              key="arkanoid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <VideoGameConsoleHub
                initialGame="arkanoid"
                userGems={userProfile.gems}
                userDiamonds={userProfile.diamonds}
                onConsoleReward={handleConsoleReward}
              />
            </motion.div>
          )}

          {activeTab === 'missions' && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <MissionsAndPetHub
                userProfile={userProfile}
                onClaimMissionOrChest={handleClaimMissionOrChest}
                onNavigateTab={(tab) => setActiveTab(tab as any)}
              />
            </motion.div>
          )}

          {activeTab === 'craft' && (
            <motion.div
              key="craft"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <CraftingWorkshop
                userGems={userProfile.gems}
                onBuyMaterial={handleBuyCraftMaterial}
                onCompleteCraft={handleSellCraft}
              />
            </motion.div>
          )}

          {activeTab === 'ebooks' && (
            <motion.div
              key="ebooks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <EbookReader onChapterCompleted={handleChapterCompleted} />
            </motion.div>
          )}

          {activeTab === 'math' && (
            <motion.div
              key="math"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <MathGames onQuestionAnswered={handleMathAnswered} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>© 2026 Play & Earn Money AAP • Entretenimiento y Monetización Activa</span>
            <span className="text-emerald-500 font-bold">• Firebase Backend</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToAcademy && (
              <button
                onClick={onNavigateToAcademy}
                className="text-amber-400 hover:text-amber-300 transition cursor-pointer font-bold"
              >
                FullStack Academy 🎓
              </button>
            )}
            <span>•</span>
            <button
              onClick={() => setIsWalletOpen(true)}
              className="text-emerald-400 hover:underline cursor-pointer font-bold"
            >
              Retirar Fondos (${userProfile.balanceUSD.toFixed(2)}) 💵
            </button>
            <span>•</span>
            <button
              onClick={onBackToHub}
              className="text-slate-400 hover:text-white transition cursor-pointer"
            >
              Menú Principal ⬅
            </button>
          </div>
        </div>
      </footer>

      {/* MODALES */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        balanceUSD={userProfile.balanceUSD}
        gems={userProfile.gems}
        diamonds={userProfile.diamonds}
        userId={userProfile.uid}
        userEmail={userProfile.email}
        onConvertGemsToUSD={handleConvertGemsToUSD}
        onConvertDiamondsToUSD={handleConvertDiamondsToUSD}
        onWithdrawSubmitted={handleWithdrawSubmitted}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(profile) => {
          setUserProfile(profile);
          showToast(`¡Bienvenido, ${profile.displayName}! Cuenta sincronizada con Firebase.`);
        }}
      />
    </div>
  );
};
