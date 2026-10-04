import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Trophy,
  Sparkles,
  Flame,
  CheckCircle2,
  Bot,
  BatteryCharging,
  Zap,
  Crown,
  Coins,
  Gem,
  Diamond,
  ArrowUpRight,
  Star,
  Award,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from './types';

interface MissionsAndPetHubProps {
  userProfile: UserProfile;
  onClaimMissionOrChest: (
    title: string,
    rewardUSD: number,
    rewardGems: number,
    rewardDiamonds: number,
    gemCost?: number
  ) => void;
  onNavigateTab: (tabId: string) => void;
}

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  rewardUSD: number;
  rewardGems: number;
  rewardDiamonds: number;
  goToTab: string;
}

export const MissionsAndPetHub: React.FC<MissionsAndPetHubProps> = ({
  userProfile,
  onClaimMissionOrChest,
  onNavigateTab
}) => {
  const [claimedQuests, setClaimedQuests] = useState<string[]>([]);
  const [freeChestClaimed, setFreeChestClaimed] = useState(false);
  const [chestResult, setChestResult] = useState<{
    chestName: string;
    usd: number;
    gems: number;
    diamonds: number;
  } | null>(null);

  // Estado de la Mascota Minera Cyber-Bot
  const [petLevel, setPetLevel] = useState(3);
  const [petEnergy, setPetEnergy] = useState(85);
  const [petMood, setPetMood] = useState<'Feliz ⚡' | 'Turbo 🔥' | 'Hambriento 🔋'>('Feliz ⚡');
  const [petVaultUSD, setPetVaultUSD] = useState(0.45);
  const [petVaultGems, setPetVaultGems] = useState(35);

  // Bono de Liga Semanal
  const [leagueBonusClaimed, setLeagueBonusClaimed] = useState(false);

  const quests: DailyQuest[] = [
    {
      id: 'q-arcade',
      title: 'Explorador del Arcade Neon',
      description: 'Juega y gana en cualquiera de los 3 minijuegos del Arcade Neon.',
      current: Math.min(3, userProfile.puzzlesSolved || 2),
      target: 2,
      rewardUSD: 0.50,
      rewardGems: 40,
      rewardDiamonds: 5,
      goToTab: 'puzzle'
    },
    {
      id: 'q-videos',
      title: 'Patrocinador Verificado 100%',
      description: 'Completa anuncios monetizados respetando el cronómetro sin cortes.',
      current: Math.min(5, userProfile.adsCompleted || 3),
      target: 3,
      rewardUSD: 0.75,
      rewardGems: 50,
      rewardDiamonds: 8,
      goToTab: 'videos'
    },
    {
      id: 'q-trivia',
      title: 'Mente Brillante en Trivias',
      description: 'Responde correctamente preguntas de Trivia o Retos Matemáticos.',
      current: Math.min(5, userProfile.triviaCorrectAnswers || 5),
      target: 5,
      rewardUSD: 0.60,
      rewardGems: 45,
      rewardDiamonds: 6,
      goToTab: 'trivia'
    },
    {
      id: 'q-craft',
      title: 'Maestro del Taller & Lectura',
      description: 'Forja una pieza artesanal o lee un capítulo de Ebook.',
      current: Math.min(2, (userProfile.craftsCompleted || 1) + 1),
      target: 2,
      rewardUSD: 0.55,
      rewardGems: 35,
      rewardDiamonds: 5,
      goToTab: 'craft'
    }
  ];

  const handleClaimQuest = (quest: DailyQuest) => {
    if (claimedQuests.includes(quest.id)) return;
    setClaimedQuests((prev) => [...prev, quest.id]);
    onClaimMissionOrChest(
      `Misión Diaria: ${quest.title}`,
      quest.rewardUSD,
      quest.rewardGems,
      quest.rewardDiamonds,
      0
    );
  };

  // Abrir Cofres Misteriosos
  const handleOpenChest = (tier: 'free' | 'gold' | 'diamond') => {
    if (tier === 'free') {
      if (freeChestClaimed) return;
      setFreeChestClaimed(true);
      const res = { chestName: 'Cofre Diario Cyber-Bronce', usd: 0.35, gems: 30, diamonds: 4 };
      setChestResult(res);
      onClaimMissionOrChest(res.chestName, res.usd, res.gems, res.diamonds, 0);
      return;
    }

    if (tier === 'gold') {
      if (userProfile.gems < 60) return;
      const usd = Number((0.55 + Math.random() * 0.65).toFixed(2));
      const diamonds = 8 + Math.floor(Math.random() * 8);
      const res = { chestName: 'Cofre Bóveda de Oro', usd, gems: 0, diamonds };
      setChestResult(res);
      onClaimMissionOrChest(res.chestName, res.usd, res.gems, res.diamonds, 60);
      return;
    }

    if (tier === 'diamond') {
      if (userProfile.gems < 140) return;
      const usd = Number((1.40 + Math.random() * 1.35).toFixed(2));
      const diamonds = 20 + Math.floor(Math.random() * 15);
      const res = { chestName: 'Cofre Imperial de Diamante', usd, gems: 0, diamonds };
      setChestResult(res);
      onClaimMissionOrChest(res.chestName, res.usd, res.gems, res.diamonds, 140);
    }
  };

  // Interacciones con la Mascota Minera Cyber-Bot
  const handleFeedPet = () => {
    if (userProfile.gems < 20) return;
    setPetEnergy(100);
    setPetMood('Turbo 🔥');
    setPetLevel((lvl) => lvl + 1);
    setPetVaultUSD((v) => Number((v + 0.35).toFixed(2)));
    setPetVaultGems((g) => g + 35);
    onClaimMissionOrChest('Mejora de Mascota Cyber-Bot (Turbo)', 0.15, 0, 3, 20);
  };

  const handleCollectPetVault = () => {
    if (petVaultUSD <= 0 && petVaultGems <= 0) return;
    const usdToClaim = petVaultUSD;
    const gemsToClaim = petVaultGems;
    setPetVaultUSD(0);
    setPetVaultGems(0);
    onClaimMissionOrChest('Cosecha de Mascota Minera PixiBot', usdToClaim, gemsToClaim, 4, 0);
  };

  const leaderboard = [
    { rank: 1, name: 'Valentina_CryptoCR', xp: 4850, earned: '$142.80', prize: '$100 USD' },
    { rank: 2, name: 'CarlosTrader_VIP', xp: 4120, earned: '$98.40', prize: '$65 USD' },
    { rank: 3, name: userProfile.displayName + ' (Tú)', xp: userProfile.xp + 1800, earned: `$${(userProfile.totalEarnedUSD || 48.5).toFixed(2)}`, prize: '$40 USD', isUser: true },
    { rank: 4, name: 'Sofia_NeonGamer', xp: 2690, earned: '$44.10', prize: '$25 USD' },
    { rank: 5, name: 'Mateo_Dev88', xp: 2310, earned: '$39.50', prize: '$20 USD' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* CABECERA PRINCIPAL: CENTRO DE MISIONES, COFRES Y CYBER-MASCOTA */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/30 to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 mb-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>TEMPORADA VIP ACTIVA</span>
              <span>·</span>
              <span className="text-emerald-400">Recompensas Diarias & Minería Pasiva</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Misiones Diarias, Cofres Sorpresa & Cyber-Mascota
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Completa tus metas del día, abre cofres con premios instantáneos en efectivo, cuida a tu robot minero PixiBot y escala en el Torneo Semanal.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 px-5 py-3.5 rounded-2xl font-mono text-right shrink-0">
            <span className="text-[10px] text-slate-400 block uppercase">Tus Gemas para Cofres</span>
            <span className="text-2xl font-black text-blue-300">{userProfile.gems} 💎</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          SECCIÓN 1: BÓVEDA DE 3 COFRES SORPRESA (LOOT BOXES)
      ==================================================================== */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-4">
          <div className="flex items-center gap-2.5">
            <Gift className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white">Bóveda de Cofres Misteriosos</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Cada cofre garantiza saldo USD retirable o Diamantes VIP
          </span>
        </div>

        <AnimatePresence>
          {chestResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-emerald-950/90 border border-emerald-400/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div>
                  <h4 className="text-sm font-black text-white">
                    ¡Abriste: {chestResult.chestName}!
                  </h4>
                  <p className="text-xs font-mono text-emerald-300">
                    Ganaste +${chestResult.usd.toFixed(2)} USD{' '}
                    {chestResult.gems > 0 ? `· +${chestResult.gems} Gemas 💎 ` : ''}
                    · +{chestResult.diamonds} Diamantes 💠
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChestResult(null)}
                className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded-lg text-xs font-mono cursor-pointer"
              >
                Genial
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Cofre 1: Gratis Diario */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-300 font-bold">COFRE DIARIO</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">GRATIS</span>
            </div>
            <div className="text-center py-3">
              <div className="text-5xl mb-2">📦</div>
              <h4 className="text-base font-black text-white">Cofre Cyber-Bronce</h4>
              <p className="text-xs text-slate-400 mt-1">
                Contiene +$0.35 USD, +30 Gemas 💎 y +4 Diamantes 💠
              </p>
            </div>
            <button
              onClick={() => handleOpenChest('free')}
              disabled={freeChestClaimed}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-black uppercase transition cursor-pointer ${
                freeChestClaimed
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
              }`}
            >
              {freeChestClaimed ? 'Reclamado Hoy ✓' : 'Abrir Cofre Gratis'}
            </button>
          </div>

          {/* Cofre 2: Bóveda de Oro */}
          <div className="bg-gradient-to-b from-amber-950/30 to-slate-900/80 border border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold">ALTA PROBABILIDAD</span>
              <span className="text-xs font-mono text-blue-300 font-bold">60 Gemas 💎</span>
            </div>
            <div className="text-center py-3">
              <div className="text-5xl mb-2">🧰</div>
              <h4 className="text-base font-black text-white">Cofre Bóveda de Oro</h4>
              <p className="text-xs text-slate-300 mt-1">
                Premios de <strong>$0.55 a $1.20 USD</strong> + hasta 15 Diamantes 💠
              </p>
            </div>
            <button
              onClick={() => handleOpenChest('gold')}
              disabled={userProfile.gems < 60}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-black uppercase transition cursor-pointer ${
                userProfile.gems >= 60
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {userProfile.gems >= 60 ? 'Desbloquear por 60 💎' : 'Faltan Gemas (60 💎)'}
            </button>
          </div>

          {/* Cofre 3: Imperial de Diamante */}
          <div className="bg-gradient-to-b from-purple-950/40 to-slate-900/80 border border-purple-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-300 font-bold">JACKPOT VIP</span>
              <span className="text-xs font-mono text-blue-300 font-bold">140 Gemas 💎</span>
            </div>
            <div className="text-center py-3">
              <div className="text-5xl mb-2">👑</div>
              <h4 className="text-base font-black text-white">Cofre Imperial Diamante</h4>
              <p className="text-xs text-slate-300 mt-1">
                Premios de <strong>$1.40 a $2.75 USD</strong> + hasta 35 Diamantes 💠
              </p>
            </div>
            <button
              onClick={() => handleOpenChest('diamond')}
              disabled={userProfile.gems < 140}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-black uppercase transition cursor-pointer ${
                userProfile.gems >= 140
                  ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {userProfile.gems >= 140 ? 'Desbloquear por 140 💎' : 'Faltan Gemas (140 💎)'}
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          SECCIÓN 2: MISIONES DIARIAS + MASCOTA MINERA CYBER-BOT
      ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Misiones Diarias Interactivas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-850 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-black text-white uppercase font-mono">
                Misiones Diarias Monetizadas
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              {claimedQuests.length} / {quests.length} Reclamadas
            </span>
          </div>

          <div className="space-y-3">
            {quests.map((q) => {
              const isClaimed = claimedQuests.includes(q.id);
              const isReady = q.current >= q.target;
              const pct = Math.min(100, Math.round((q.current / q.target) * 100));

              return (
                <div
                  key={q.id}
                  className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{q.title}</h4>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        +${q.rewardUSD.toFixed(2)} USD · +{q.rewardGems} 💎
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{q.description}</p>
                    <div className="w-full max-w-xs h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto">
                    {isClaimed ? (
                      <span className="px-4 py-2 bg-slate-800 text-emerald-400 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completada</span>
                      </span>
                    ) : isReady ? (
                      <button
                        onClick={() => handleClaimQuest(q)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-mono text-xs font-black uppercase rounded-xl cursor-pointer shadow-md"
                      >
                        Reclamar +${q.rewardUSD.toFixed(2)}
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigateTab(q.goToTab)}
                        className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Ir a Jugar</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mascota Minera Cyber-Bot ("PixiBot VIP") (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-indigo-950/40 to-slate-950 border border-indigo-500/40 rounded-3xl p-6 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-black text-white uppercase font-mono">
                Mascota Minera: PixiBot
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-300 font-bold">
              Nivel {petLevel} · {petMood}
            </span>
          </div>

          <div className="text-center py-2 space-y-2">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
              className="w-24 h-24 rounded-3xl bg-cyan-500/15 border-2 border-cyan-400/50 flex items-center justify-center text-5xl mx-auto shadow-xl shadow-cyan-500/10"
            >
              🤖
            </motion.div>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              PixiBot recolecta micro-recompensas en segundo plano mientras juegas en la plataforma.
            </p>
          </div>

          {/* Barra de Energía del Robot */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Batería Cuántica:</span>
              <span className="text-cyan-300 font-bold">{petEnergy}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
                style={{ width: `${petEnergy}%` }}
              />
            </div>
          </div>

          {/* Bóveda acumulada por la mascota */}
          <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Cosecha Lista para Retirar</span>
              <span className="text-base font-black text-emerald-400">
                +${petVaultUSD.toFixed(2)} USD · +{petVaultGems} 💎
              </span>
            </div>
            <button
              onClick={handleCollectPetVault}
              disabled={petVaultUSD <= 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase cursor-pointer ${
                petVaultUSD > 0
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Recolectar
            </button>
          </div>

          <button
            onClick={handleFeedPet}
            disabled={userProfile.gems < 20}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-mono text-xs font-black uppercase rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <BatteryCharging className="w-4 h-4" />
            <span>Recargar Turbo & Subir Nivel (20 💎)</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          SECCIÓN 3: TORNEO SEMANAL & RANKING MUNDIAL DE JUGADORES
      ==================================================================== */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-850 pb-4">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-black text-white uppercase font-mono">
                Ranking Mundial & Torneo Semanal ($250.00 USD en Premios)
              </h3>
              <p className="text-xs text-slate-400">
                Actualmente estás en el <strong>Puesto #3 (Liga Oro VIP)</strong>. ¡Sigue sumando XP para alcanzar el 1er lugar!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (leagueBonusClaimed) return;
              setLeagueBonusClaimed(true);
              onClaimMissionOrChest('Bono Diario de Clasificación TOP 3', 0.40, 25, 5, 0);
            }}
            disabled={leagueBonusClaimed}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-black uppercase cursor-pointer shrink-0 ${
              leagueBonusClaimed
                ? 'bg-slate-900 text-slate-500 border border-slate-800'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
            }`}
          >
            {leagueBonusClaimed ? 'Bono Top 3 Reclamado ✓' : 'Reclamar Bono Top 3 (+$0.40 USD)'}
          </button>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {leaderboard.map((row) => (
            <div
              key={row.rank}
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                row.isUser
                  ? 'bg-amber-500/10 border-amber-500/50 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black ${
                    row.rank === 1
                      ? 'bg-amber-400 text-slate-950'
                      : row.rank === 2
                      ? 'bg-slate-300 text-slate-950'
                      : row.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  #{row.rank}
                </span>
                <div>
                  <span className="font-bold block">{row.name}</span>
                  <span className="text-[10px] text-slate-400">{row.xp} XP Acumulados</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-slate-400 block">Ganado</span>
                  <span className="text-emerald-400 font-bold">{row.earned}</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[10px] text-slate-400 block">Premio Torneo</span>
                  <span className="text-amber-300 font-black">{row.prize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
