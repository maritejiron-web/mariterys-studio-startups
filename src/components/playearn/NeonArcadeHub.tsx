import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Gem,
  Diamond,
  Sparkles,
  Flame,
  Trophy,
  RotateCcw,
  Coins,
  Zap,
  ShieldAlert,
  CheckCircle2,
  Pickaxe,
  Rocket,
  Crown,
  Volume2,
  VolumeX,
  Star,
  Gift
} from 'lucide-react';

interface NeonArcadeHubProps {
  userGems: number;
  onArcadeReward: (
    gameName: string,
    rewardUSD: number,
    rewardGems: number,
    rewardDiamonds: number
  ) => void;
}

// ============================================================================
// TIPOS PARA MINIJUEGO 1: JOYAS NEON MATCH-3 (CRYPTO CRUSH)
// ============================================================================
interface GemTile {
  id: string;
  type: number;
  isMatched?: boolean;
}

const GEM_TYPES = [
  { id: 0, icon: '💎', name: 'Zafiro Neon', bg: 'from-cyan-500/30 to-blue-600/40', border: 'border-cyan-400/60', text: 'text-cyan-300' },
  { id: 1, icon: '🪙', name: 'Moneda USD', bg: 'from-amber-500/30 to-yellow-600/40', border: 'border-amber-400/60', text: 'text-amber-300' },
  { id: 2, icon: '💠', name: 'Diamante Puro', bg: 'from-purple-500/30 to-fuchsia-600/40', border: 'border-purple-400/60', text: 'text-purple-300' },
  { id: 3, icon: '🔥', name: 'Rubí Ignis', bg: 'from-rose-500/30 to-red-600/40', border: 'border-rose-400/60', text: 'text-rose-300' },
  { id: 4, icon: '🍀', name: 'Esmeralda VIP', bg: 'from-emerald-500/30 to-teal-600/40', border: 'border-emerald-400/60', text: 'text-emerald-300' },
  { id: 5, icon: '👑', name: 'Corona Real', bg: 'from-yellow-400/30 to-orange-500/40', border: 'border-yellow-300/60', text: 'text-yellow-200' }
];

// ============================================================================
// TIPOS PARA MINIJUEGO 2: MINAS DE DIAMANTES (CYBER-TESORO)
// ============================================================================
interface MineCell {
  index: number;
  revealed: boolean;
  content: 'usd' | 'gems' | 'diamond' | 'jackpot' | 'bomb';
  amount: number;
  label: string;
}

// ============================================================================
// TIPOS PARA MINIJUEGO 3: CYBER-TAP LLUVIA DORADA
// ============================================================================
interface FloatingTarget {
  id: string;
  x: number;
  y: number;
  type: 'coin' | 'bill' | 'diamond' | 'chest' | 'virus';
  icon: string;
  label: string;
  usd: number;
  gems: number;
  diamonds: number;
}

export const NeonArcadeHub: React.FC<NeonArcadeHubProps> = ({
  userGems,
  onArcadeReward
}) => {
  const [activeGame, setActiveGame] = useState<'match3' | 'mines' | 'cybertap'>('match3');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastWinBanner, setLastWinBanner] = useState<{
    title: string;
    usd: number;
    gems: number;
    diamonds: number;
  } | null>(null);

  // ==========================================================================
  // LÓGICA JUEGO 1: JOYAS NEON (CRYPTO CRUSH)
  // ==========================================================================
  const BOARD_SIZE = 6;
  const [board, setBoard] = useState<GemTile[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [matchScore, setMatchScore] = useState(0);
  const [matchTarget] = useState(600);
  const [movesLeft, setMovesLeft] = useState(15);
  const [comboCount, setComboCount] = useState(1);
  const [matchRoundWon, setMatchRoundWon] = useState(false);
  const [floatingComboText, setFloatingComboText] = useState<string | null>(null);

  const generateTile = (): GemTile => ({
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: Math.floor(Math.random() * GEM_TYPES.length)
  });

  const initMatch3Board = () => {
    const newBoard: GemTile[] = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => generateTile());
    setBoard(newBoard);
    setSelectedIdx(null);
    setMatchScore(0);
    setMovesLeft(15);
    setComboCount(1);
    setMatchRoundWon(false);
  };

  useEffect(() => {
    initMatch3Board();
  }, []);

  // Encontrar grupo conectado de joyas iguales (estilo Blast / Match)
  const getConnectedCluster = (grid: GemTile[], startIdx: number): number[] => {
    const targetType = grid[startIdx]?.type;
    if (targetType === undefined) return [];
    const visited = new Set<number>();
    const queue = [startIdx];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (visited.has(curr)) continue;
      visited.add(curr);

      const r = Math.floor(curr / BOARD_SIZE);
      const c = curr % BOARD_SIZE;
      const neighbors = [
        r > 0 ? (r - 1) * BOARD_SIZE + c : -1,
        r < BOARD_SIZE - 1 ? (r + 1) * BOARD_SIZE + c : -1,
        c > 0 ? r * BOARD_SIZE + (c - 1) : -1,
        c < BOARD_SIZE - 1 ? r * BOARD_SIZE + (c + 1) : -1
      ];

      for (const n of neighbors) {
        if (n !== -1 && !visited.has(n) && grid[n]?.type === targetType) {
          queue.push(n);
        }
      }
    }
    return Array.from(visited);
  };

  // Encontrar líneas de 3 o más en el tablero tras un intercambio
  const findLineMatches = (grid: GemTile[]): number[] => {
    const matched = new Set<number>();
    // Horizontales
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE - 2; c++) {
        const i = r * BOARD_SIZE + c;
        const t = grid[i].type;
        if (grid[i + 1].type === t && grid[i + 2].type === t) {
          matched.add(i);
          matched.add(i + 1);
          matched.add(i + 2);
        }
      }
    }
    // Verticales
    for (let c = 0; c < BOARD_SIZE; c++) {
      for (let r = 0; r < BOARD_SIZE - 2; r++) {
        const i = r * BOARD_SIZE + c;
        const t = grid[i].type;
        if (grid[i + BOARD_SIZE].type === t && grid[i + BOARD_SIZE * 2].type === t) {
          matched.add(i);
          matched.add(i + BOARD_SIZE);
          matched.add(i + BOARD_SIZE * 2);
        }
      }
    }
    return Array.from(matched);
  };

  const triggerBlast = (indicesToClear: number[], currentGrid: GemTile[], nextCombo: number) => {
    const pointsEarned = indicesToClear.length * 35 * nextCombo;
    const nextScore = matchScore + pointsEarned;

    setFloatingComboText(
      indicesToClear.length >= 5
        ? `¡MEGA EXPLOSIÓN x${nextCombo}! +${pointsEarned} pts`
        : `¡Combo x${nextCombo}! +${pointsEarned} pts`
    );
    setTimeout(() => setFloatingComboText(null), 1200);

    // Reemplazar joyas explotadas y hacer caer nuevas
    const updatedGrid = [...currentGrid];
    indicesToClear.forEach((idx) => {
      updatedGrid[idx] = generateTile();
    });

    setBoard(updatedGrid);
    setMatchScore(nextScore);
    setComboCount(nextCombo + 1);

    if (nextScore >= matchTarget && !matchRoundWon) {
      setMatchRoundWon(true);
      const rewardUSD = 0.65;
      const rewardGems = 45;
      const rewardDiamonds = 6;
      setLastWinBanner({
        title: '¡Nivel de Joyas Neon Superado!',
        usd: rewardUSD,
        gems: rewardGems,
        diamonds: rewardDiamonds
      });
      onArcadeReward('Joyas Neon Match-3', rewardUSD, rewardGems, rewardDiamonds);
    }
  };

  const handleTileClick = (index: number) => {
    if (movesLeft <= 0 || matchRoundWon) return;

    // Si hay un grupo conectado de 2 o más del mismo color, explotarlo al instante (estilo Tap Blast muy intuitivo)
    const cluster = getConnectedCluster(board, index);
    if (cluster.length >= 2 && selectedIdx === null) {
      setMovesLeft((m) => m - 1);
      triggerBlast(cluster, board, comboCount);
      return;
    }

    // O permitir intercambiar 2 fichas adyacentes
    if (selectedIdx === null) {
      setSelectedIdx(index);
      return;
    }

    if (selectedIdx === index) {
      setSelectedIdx(null);
      return;
    }

    const r1 = Math.floor(selectedIdx / BOARD_SIZE);
    const c1 = selectedIdx % BOARD_SIZE;
    const r2 = Math.floor(index / BOARD_SIZE);
    const c2 = index % BOARD_SIZE;
    const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;

    if (isAdjacent) {
      const swapped = [...board];
      const temp = swapped[selectedIdx];
      swapped[selectedIdx] = swapped[index];
      swapped[index] = temp;

      setMovesLeft((m) => m - 1);
      setSelectedIdx(null);

      const lineMatches = findLineMatches(swapped);
      const newCluster = getConnectedCluster(swapped, index);
      const toClear = lineMatches.length >= 3 ? lineMatches : newCluster.length >= 2 ? newCluster : [selectedIdx, index];
      triggerBlast(toClear, swapped, comboCount);
    } else {
      setSelectedIdx(index);
    }
  };

  // ==========================================================================
  // LÓGICA JUEGO 2: MINAS DE DIAMANTES (CYBER-TESORO)
  // ==========================================================================
  const [minesCount, setMinesCount] = useState<3 | 5 | 7>(3);
  const [mineCells, setMineCells] = useState<MineCell[]>([]);
  const [mineGameActive, setMineGameActive] = useState(false);
  const [mineGameOver, setMineGameOver] = useState<'won' | 'exploded' | null>(null);
  const [accumulatedUSD, setAccumulatedUSD] = useState(0);
  const [accumulatedGems, setAccumulatedGems] = useState(0);
  const [accumulatedDiamonds, setAccumulatedDiamonds] = useState(0);
  const [picksCount, setPicksCount] = useState(0);

  const startMinesRound = (customMines: 3 | 5 | 7 = minesCount) => {
    const total = 25;
    const bombIndices = new Set<number>();
    while (bombIndices.size < customMines) {
      bombIndices.add(Math.floor(Math.random() * total));
    }

    const cells: MineCell[] = Array.from({ length: total }, (_, idx) => {
      if (bombIndices.has(idx)) {
        return {
          index: idx,
          revealed: false,
          content: 'bomb',
          amount: 0,
          label: '💥 Roca Trampa'
        };
      }
      const roll = Math.random();
      if (roll < 0.12) {
        return { index: idx, revealed: false, content: 'jackpot', amount: 0.35, label: '+$0.35' };
      } else if (roll < 0.48) {
        return { index: idx, revealed: false, content: 'usd', amount: 0.12, label: '+$0.12' };
      } else if (roll < 0.78) {
        return { index: idx, revealed: false, content: 'gems', amount: 15, label: '+15 💎' };
      } else {
        return { index: idx, revealed: false, content: 'diamond', amount: 3, label: '+3 💠' };
      }
    });

    setMineCells(cells);
    setMineGameActive(true);
    setMineGameOver(null);
    setAccumulatedUSD(0);
    setAccumulatedGems(0);
    setAccumulatedDiamonds(0);
    setPicksCount(0);
  };

  useEffect(() => {
    startMinesRound(3);
  }, []);

  const currentMultiplier = Number((1 + picksCount * (minesCount === 3 ? 0.18 : minesCount === 5 ? 0.32 : 0.55)).toFixed(2));

  const handleRevealMineCell = (idx: number) => {
    if (!mineGameActive || mineGameOver || mineCells[idx].revealed) return;

    const cell = mineCells[idx];
    const nextCells = mineCells.map((c, i) => (i === idx ? { ...c, revealed: true } : c));

    if (cell.content === 'bomb') {
      // Revelar todo el tablero
      setMineCells(nextCells.map((c) => ({ ...c, revealed: true })));
      setMineGameActive(false);
      setMineGameOver('exploded');
      return;
    }

    setMineCells(nextCells);
    const nextPicks = picksCount + 1;
    setPicksCount(nextPicks);

    if (cell.content === 'usd' || cell.content === 'jackpot') {
      setAccumulatedUSD((prev) => Number((prev + cell.amount).toFixed(2)));
    } else if (cell.content === 'gems') {
      setAccumulatedGems((prev) => prev + cell.amount);
    } else if (cell.content === 'diamond') {
      setAccumulatedDiamonds((prev) => prev + cell.amount);
    }
  };

  const handleCashOutMines = () => {
    if (!mineGameActive || picksCount === 0) return;

    const finalUSD = Number((Math.max(0.10, accumulatedUSD) * currentMultiplier).toFixed(2));
    const finalGems = Math.max(10, Math.round(accumulatedGems * currentMultiplier));
    const finalDiamonds = Math.max(2, accumulatedDiamonds);

    setMineGameActive(false);
    setMineGameOver('won');
    setMineCells((prev) => prev.map((c) => ({ ...c, revealed: true })));

    setLastWinBanner({
      title: `¡Botín Retirado con Multiplicador x${currentMultiplier}!`,
      usd: finalUSD,
      gems: finalGems,
      diamonds: finalDiamonds
    });

    onArcadeReward('Minas de Diamantes VIP', finalUSD, finalGems, finalDiamonds);
  };

  // ==========================================================================
  // LÓGICA JUEGO 3: CYBER-TAP & LLUVIA DORADA
  // ==========================================================================
  const [tapActive, setTapActive] = useState(false);
  const [tapTimeLeft, setTapTimeLeft] = useState(20);
  const [tapUSD, setTapUSD] = useState(0);
  const [tapGems, setTapGems] = useState(0);
  const [tapDiamonds, setTapDiamonds] = useState(0);
  const [feverCharge, setFeverCharge] = useState(0);
  const [targets, setTargets] = useState<FloatingTarget[]>([]);
  const tapSessionRef = useRef({ usd: 0, gems: 0, diamonds: 0 });

  const isFeverMode = feverCharge >= 100;

  const startCyberTap = () => {
    setTapActive(true);
    setTapTimeLeft(20);
    setTapUSD(0);
    setTapGems(0);
    setTapDiamonds(0);
    setFeverCharge(0);
    tapSessionRef.current = { usd: 0, gems: 0, diamonds: 0 };
    spawnTargetsBatch();
  };

  const spawnTargetsBatch = () => {
    const items: FloatingTarget[] = Array.from({ length: 6 }, () => createRandomTarget());
    setTargets(items);
  };

  const createRandomTarget = (): FloatingTarget => {
    const r = Math.random();
    const x = 10 + Math.floor(Math.random() * 78);
    const y = 12 + Math.floor(Math.random() * 70);
    const id = `tgt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    if (r < 0.14) {
      return { id, x, y, type: 'virus', icon: '👾', label: '-$0.05', usd: -0.05, gems: 0, diamonds: 0 };
    } else if (r < 0.32) {
      return { id, x, y, type: 'chest', icon: '🎁', label: '+$0.15', usd: 0.15, gems: 10, diamonds: 2 };
    } else if (r < 0.58) {
      return { id, x, y, type: 'bill', icon: '💵', label: '+$0.08', usd: 0.08, gems: 5, diamonds: 0 };
    } else if (r < 0.82) {
      return { id, x, y, type: 'coin', icon: '🪙', label: '+8 💎', usd: 0.03, gems: 8, diamonds: 0 };
    } else {
      return { id, x, y, type: 'diamond', icon: '💠', label: '+2 💠', usd: 0.04, gems: 0, diamonds: 2 };
    }
  };

  useEffect(() => {
    if (!tapActive) return;

    const timer = setInterval(() => {
      setTapTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTapActive(false);
          const finalUSD = Number(Math.max(0.15, tapSessionRef.current.usd).toFixed(2));
          const finalGems = Math.max(15, tapSessionRef.current.gems);
          const finalDiamonds = Math.max(2, tapSessionRef.current.diamonds);
          setLastWinBanner({
            title: '¡Lluvia Dorada Cyber-Tap Finalizada!',
            usd: finalUSD,
            gems: finalGems,
            diamonds: finalDiamonds
          });
          onArcadeReward('Cyber-Tap Lluvia Dorada', finalUSD, finalGems, finalDiamonds);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tapActive]);

  const handleCatchTarget = (target: FloatingTarget) => {
    if (!tapActive) return;
    const mult = isFeverMode ? 2 : 1;

    const addUSD = target.type === 'virus' ? target.usd : target.usd * mult;
    const addGems = target.gems * mult;
    const addDiamonds = target.diamonds * mult;

    const nextUSD = Math.max(0, Number((tapSessionRef.current.usd + addUSD).toFixed(2)));
    const nextGems = Math.max(0, tapSessionRef.current.gems + addGems);
    const nextDiamonds = Math.max(0, tapSessionRef.current.diamonds + addDiamonds);

    tapSessionRef.current = { usd: nextUSD, gems: nextGems, diamonds: nextDiamonds };
    setTapUSD(nextUSD);
    setTapGems(nextGems);
    setTapDiamonds(nextDiamonds);

    if (target.type !== 'virus') {
      setFeverCharge((prev) => Math.min(100, prev + 16));
    } else {
      setFeverCharge((prev) => Math.max(0, prev - 30));
    }

    // Reemplazar ese objetivo por uno nuevo al instante
    setTargets((prev) => prev.map((t) => (t.id === target.id ? createRandomTarget() : t)));
  };

  const handleCenterCoreTap = () => {
    if (!tapActive) return;
    const mult = isFeverMode ? 2 : 1;
    const nextUSD = Number((tapSessionRef.current.usd + 0.02 * mult).toFixed(2));
    const nextGems = tapSessionRef.current.gems + 2 * mult;
    tapSessionRef.current = { ...tapSessionRef.current, usd: nextUSD, gems: nextGems };
    setTapUSD(nextUSD);
    setTapGems(nextGems);
    setFeverCharge((prev) => Math.min(100, prev + 10));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* CABECERA DEL SALÓN ARCADE NEON 3-EN-1 */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-300 mb-2">
              <Gamepad2 className="w-4 h-4 text-fuchsia-400" />
              <span>ARCADE NEON INTERACTIVO</span>
              <span>·</span>
              <span className="text-emerald-400">3 Minijuegos de Recompensa Directa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Zona Arcade Neon: Juega, Combina y Multiplica
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Elige cualquiera de nuestros 3 minijuegos de nueva generación. Cada victoria acredita dólares retirables, Gemas y Diamantes directamente en tu billetera.
            </p>
          </div>

          {/* Selector de los 3 Minijuegos */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 w-full lg:w-auto">
            <button
              onClick={() => setActiveGame('match3')}
              className={`flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeGame === 'match3'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>💎</span>
              <span>1. Joyas Neon</span>
            </button>

            <button
              onClick={() => setActiveGame('mines')}
              className={`flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeGame === 'mines'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Pickaxe className="w-3.5 h-3.5" />
              <span>2. Minas de Diamante</span>
            </button>

            <button
              onClick={() => setActiveGame('cybertap')}
              className={`flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeGame === 'cybertap'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>3. Cyber-Tap Fiebre</span>
            </button>
          </div>
        </div>
      </div>

      {/* BANNER DE ÚLTIMO PREMIO ACREDITADO */}
      <AnimatePresence>
        {lastWinBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-950/90 border border-emerald-500/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-300">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">{lastWinBanner.title}</h4>
                <p className="text-xs text-emerald-300 font-mono">
                  Acreditado al instante: +${lastWinBanner.usd.toFixed(2)} USD · +{lastWinBanner.gems} Gemas 💎 · +{lastWinBanner.diamonds} Diamantes 💠
                </p>
              </div>
            </div>
            <button
              onClick={() => setLastWinBanner(null)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono cursor-pointer"
            >
              Cerrar aviso
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          MINIJUEGO 1: JOYAS NEON MATCH-3 (CRYPTO CRUSH)
      ==================================================================== */}
      {activeGame === 'match3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Panel Izquierdo: Estadísticas y Reglas */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-fuchsia-400">MINIJUEGO #1 · PUZZLE DE CRISTALES</span>
                <h3 className="text-xl font-black text-white mt-0.5">Joyas Neon: Crypto Crush</h3>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-slate-800 cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Toca cualquier grupo de <strong>2 o más joyas iguales conectadas</strong> para hacerlas explotar en cadena, o toca dos joyas vecinas para intercambiarlas. ¡Alcanza los <strong>{matchTarget} puntos</strong> antes de agotar tus movimientos!
            </p>

            {/* Barra de Meta de Puntos */}
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Energía Acumulada:</span>
                <span className="text-fuchsia-300 font-bold">
                  {matchScore} / {matchTarget} pts
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${Math.min(100, (matchScore / matchTarget) * 100)}%` }}
                />
              </div>
            </div>

            {/* Indicadores de Movimientos y Combo */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 block">Movimientos Restantes</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{movesLeft}</span>
              </div>
              <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 block">Multiplicador Combo</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">x{comboCount}</span>
              </div>
            </div>

            {/* Recompensa del Nivel */}
            <div className="p-4 bg-gradient-to-r from-fuchsia-950/40 to-indigo-950/40 border border-fuchsia-500/30 rounded-2xl">
              <span className="text-[11px] font-mono text-fuchsia-300 font-bold block mb-2">
                🎁 PREMIO POR COMPLETAR LA META:
              </span>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-black text-sm">+$0.65 USD</span>
                <span className="text-blue-300 font-bold">+45 Gemas 💎</span>
                <span className="text-purple-300 font-bold">+6 Diamantes 💠</span>
              </div>
            </div>

            <button
              onClick={initMatch3Board}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold rounded-xl border border-slate-700 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-fuchsia-400" />
              <span>Nuevo Tablero / Reiniciar Partida</span>
            </button>
          </div>

          {/* Panel Derecho: Tablero 6x6 de Joyas Neon */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 flex flex-col items-center justify-center relative min-h-[440px]">
            <AnimatePresence>
              {floatingComboText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 z-20 px-4 py-1.5 bg-fuchsia-600 text-white font-mono font-black text-xs rounded-xl shadow-lg"
                >
                  {floatingComboText}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full max-w-md mx-auto">
              {board.map((tile, idx) => {
                const gem = GEM_TYPES[tile.type] || GEM_TYPES[0];
                const isSelected = selectedIdx === idx;
                return (
                  <motion.button
                    key={tile.id}
                    layout
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleTileClick(idx)}
                    className={`aspect-square rounded-2xl bg-gradient-to-br ${gem.bg} border-2 ${
                      isSelected ? 'border-white ring-2 ring-fuchsia-400 scale-105' : gem.border
                    } flex items-center justify-center text-2xl sm:text-3xl shadow-lg cursor-pointer transition-transform select-none`}
                  >
                    <span>{gem.icon}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Estado de Fin de Ronda */}
            {(matchRoundWon || movesLeft <= 0) && (
              <div className="mt-6 w-full max-w-md bg-slate-900/95 border border-slate-700 rounded-2xl p-4 text-center space-y-3">
                {matchRoundWon ? (
                  <>
                    <div className="text-emerald-400 font-black text-base flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>¡Meta Superada! Ganaste +$0.65 USD y +45 💎</span>
                    </div>
                    <button
                      onClick={initMatch3Board}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs uppercase rounded-xl cursor-pointer"
                    >
                      Jugar Otra Ronda Monetizada
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-amber-400 font-bold text-sm">
                      Te quedaste a {Math.max(0, matchTarget - matchScore)} pts de la meta.
                    </div>
                    <button
                      onClick={initMatch3Board}
                      className="px-5 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
                    >
                      Intentar de Nuevo Gratis
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MINIJUEGO 2: MINAS DE DIAMANTES (CYBER-TESORO)
      ==================================================================== */}
      {activeGame === 'mines' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Panel de Control de Minas */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div>
              <span className="text-xs font-mono text-emerald-400">MINIJUEGO #2 · RIESGO Y TESORO</span>
              <h3 className="text-xl font-black text-white mt-0.5">Minas de Diamantes VIP</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Destapa las bóvedas para encontrar <strong>Efectivo USD, Gemas y Diamantes</strong>. Cada bóveda segura eleva tu multiplicador. ¡Retira tu botín antes de tocar una Roca Trampa!
              </p>
            </div>

            {/* Selector de Dificultad (Cantidad de Rocas Trampa) */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">
                Nivel de Riesgo (Rocas Trampa en el tablero):
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { count: 3 as const, label: '3 Rocas (Seguro)', mult: '+0.18x / paso' },
                  { count: 5 as const, label: '5 Rocas (Medio)', mult: '+0.32x / paso' },
                  { count: 7 as const, label: '7 Rocas (VIP)', mult: '+0.55x / paso' }
                ].map((opt) => (
                  <button
                    key={opt.count}
                    onClick={() => {
                      setMinesCount(opt.count);
                      startMinesRound(opt.count);
                    }}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition ${
                      minesCount === opt.count
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="block">{opt.label}</span>
                    <span className="text-[10px] text-slate-400">{opt.mult}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botín Acumulado en la Ronda Actual */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Multiplicador Actual:</span>
                <span className="text-amber-400 font-black text-base">x{currentMultiplier}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Efectivo</span>
                  <span className="text-sm font-black text-emerald-400">
                    ${(accumulatedUSD * currentMultiplier).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Gemas</span>
                  <span className="text-sm font-black text-blue-300">
                    +{Math.round(accumulatedGems * currentMultiplier)} 💎
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Diamantes</span>
                  <span className="text-sm font-black text-purple-300">
                    +{accumulatedDiamonds} 💠
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de Acción: Retirar Botín o Nueva Ronda */}
            <div className="space-y-2.5">
              <button
                onClick={handleCashOutMines}
                disabled={!mineGameActive || picksCount === 0}
                className={`w-full py-3.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                  mineGameActive && picksCount > 0
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer'
                    : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>
                  {picksCount > 0
                    ? `Retirar Tesoro Ahora (x${currentMultiplier})`
                    : 'Destapa al menos 1 bóveda para retirar'}
                </span>
              </button>

              <button
                onClick={() => startMinesRound(minesCount)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-xs font-bold rounded-xl border border-slate-700 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nueva Cuadrícula de Minas</span>
              </button>
            </div>
          </div>

          {/* Tablero 5x5 de Bóvedas */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 flex flex-col items-center justify-center">
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3 w-full max-w-md mx-auto">
              {mineCells.map((cell) => {
                const isBomb = cell.content === 'bomb';
                return (
                  <motion.button
                    key={cell.index}
                    whileHover={!cell.revealed && mineGameActive ? { scale: 1.04 } : {}}
                    whileTap={!cell.revealed && mineGameActive ? { scale: 0.94 } : {}}
                    onClick={() => handleRevealMineCell(cell.index)}
                    className={`aspect-square rounded-2xl border font-mono flex flex-col items-center justify-center p-1 transition-all cursor-pointer select-none ${
                      !cell.revealed
                        ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-emerald-400/60 shadow-md'
                        : isBomb
                        ? 'bg-rose-950/90 border-rose-500 text-rose-300'
                        : 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300'
                    }`}
                  >
                    {!cell.revealed ? (
                      <span className="text-lg sm:text-xl opacity-60">🔒</span>
                    ) : isBomb ? (
                      <>
                        <span className="text-xl sm:text-2xl">💥</span>
                        <span className="text-[9px] text-rose-300 font-bold mt-0.5">Trampa</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg sm:text-xl">
                          {cell.content === 'jackpot'
                            ? '💰'
                            : cell.content === 'usd'
                            ? '💵'
                            : cell.content === 'gems'
                            ? '💎'
                            : '💠'}
                        </span>
                        <span className="text-[10px] font-black text-white mt-0.5">{cell.label}</span>
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {mineGameOver === 'exploded' && (
              <div className="mt-5 w-full max-w-md bg-rose-950/60 border border-rose-500/50 rounded-2xl p-3.5 text-center flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-rose-200">
                  💥 ¡Tocaste una Roca Trampa! Recuerda retirar tu botín a tiempo.
                </span>
                <button
                  onClick={() => startMinesRound(minesCount)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold rounded-lg shrink-0 cursor-pointer"
                >
                  Reintentar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MINIJUEGO 3: CYBER-TAP & LLUVIA DORADA
      ==================================================================== */}
      {activeGame === 'cybertap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Panel Izquierdo: Controles de Fiebre Dorada */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div>
              <span className="text-xs font-mono text-amber-400">MINIJUEGO #3 · ACCIÓN Y REFLEJOS</span>
              <h3 className="text-xl font-black text-white mt-0.5">Cyber-Tap: Lluvia Dorada</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Tienes <strong>20 segundos</strong> para atrapar todas las monedas, billetes, diamantes y cofres que aparecen en la bóveda. ¡Toca el Reactor Central y evita los virus rojos 👾!
              </p>
            </div>

            {/* Tiempo y Modo Fiebre */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 block">Cronómetro</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{tapTimeLeft}s</span>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 block">Estado de Fiebre</span>
                <span className={`text-sm font-black mt-2 block ${isFeverMode ? 'text-amber-300' : 'text-slate-300'}`}>
                  {isFeverMode ? '🔥 MODO FIEBRE x2' : `${feverCharge}% Carga`}
                </span>
              </div>
            </div>

            {/* Botín de la sesión */}
            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-2xl flex items-center justify-around font-mono text-center">
              <div>
                <span className="text-[10px] text-slate-400 block">USD Capturado</span>
                <span className="text-lg font-black text-emerald-400">+${tapUSD.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Gemas</span>
                <span className="text-lg font-black text-blue-300">+{tapGems} 💎</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Diamantes</span>
                <span className="text-lg font-black text-purple-300">+{tapDiamonds} 💠</span>
              </div>
            </div>

            <button
              onClick={startCyberTap}
              disabled={tapActive}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                tapActive
                  ? 'bg-slate-900 text-amber-300 border border-amber-500/40'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{tapActive ? '¡Ronda en Curso! Toca los Premios' : 'Iniciar Ronda de 20 Segundos'}</span>
            </button>
          </div>

          {/* Arena Interactiva Cyber-Tap */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 relative min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
            {!tapActive ? (
              <div className="text-center space-y-4 max-w-sm">
                <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-4xl mx-auto">
                  🚀
                </div>
                <h4 className="text-lg font-black text-white">Arena Cyber-Tap Lista</h4>
                <p className="text-xs text-slate-400">
                  Haz clic en el botón para desatar la lluvia de monedas, cofres y diamantes. Todo lo que atrapes en 20 segundos se acredita en tu cuenta.
                </p>
                <button
                  onClick={startCyberTap}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-mono font-black text-xs uppercase rounded-xl cursor-pointer shadow-lg"
                >
                  ¡Empezar Lluvia Dorada Ahora!
                </button>
              </div>
            ) : (
              <div className="w-full h-[380px] relative bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
                {/* Reactor Central para Tapping Rápido */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCenterCoreTap}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer shadow-2xl z-10 ${
                    isFeverMode
                      ? 'bg-gradient-to-br from-amber-500 to-rose-600 border-yellow-200 text-slate-950'
                      : 'bg-gradient-to-br from-indigo-900 to-slate-900 border-amber-400/60 text-white'
                  }`}
                >
                  <span className="text-2xl">⚡</span>
                  <span className="text-[9px] font-mono font-black uppercase mt-0.5">
                    {isFeverMode ? 'FIEBRE x2' : 'TAP NÚCLEO'}
                  </span>
                </motion.button>

                {/* Objetivos Flotantes */}
                {targets.map((t) => (
                  <motion.button
                    key={t.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleCatchTarget(t)}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-2xl border flex flex-col items-center justify-center cursor-pointer shadow-lg select-none ${
                      t.type === 'virus'
                        ? 'bg-rose-950/90 border-rose-500 text-rose-300'
                        : t.type === 'chest'
                        ? 'bg-amber-950/90 border-amber-400 text-amber-200'
                        : 'bg-slate-900/95 border-cyan-400/50 text-white'
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-[10px] font-mono font-bold mt-0.5">{t.label}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
