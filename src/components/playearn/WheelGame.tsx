import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCw, Sparkles, Trophy, Gem, Diamond, Coins, Flame, AlertCircle } from 'lucide-react';
import { WHEEL_PRIZES } from './gameData';
import { WheelPrize } from './types';

interface WheelGameProps {
  spinsLeft: number;
  onWinPrize: (prize: WheelPrize) => void;
  onUseSpin: () => void;
  onBuySpinsWithGems: () => void;
  gemsCount: number;
}

export const WheelGame: React.FC<WheelGameProps> = ({
  spinsLeft,
  onWinPrize,
  onUseSpin,
  onBuySpinsWithGems,
  gemsCount
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<WheelPrize | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const numSlices = WHEEL_PRIZES.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  // Dibujar la rueda en el Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 12;

    ctx.clearRect(0, 0, width, height);

    // Dibujar los gajos
    WHEEL_PRIZES.forEach((prize, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#1e293b';
      ctx.stroke();

      // Dibujar texto del premio
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = prize.textColor;
      ctx.font = 'bold 15px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 4;
      ctx.fillText(`${prize.icon} ${prize.label}`, radius - 25, 5);
      ctx.restore();
    });

    // Círculo central brillante
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    // Estrella central
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⭐', centerX, centerY);
  }, []);

  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return;

    setIsSpinning(true);
    setWonPrize(null);
    onUseSpin();

    // Seleccionar premio al azar
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const selectedPrize = WHEEL_PRIZES[prizeIndex];

    // Calcular grados para que la aguja (en la parte superior 270 grados o 90 grados) apunte al gajo
    // La aguja apunta arriba (-90 grados o 270)
    const extraTurns = 5 + Math.floor(Math.random() * 3); // 5 a 7 vueltas completas
    const sliceDegrees = 360 / numSlices;
    
    // Para que el slice quede en el puntero superior (270 grados):
    const targetSliceDegree = 270 - (prizeIndex * sliceDegrees + sliceDegrees / 2);
    const totalRotation = currentRotation + (extraTurns * 360) + ((targetSliceDegree - (currentRotation % 360) + 360) % 360);

    setCurrentRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      onWinPrize(selectedPrize);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }
    }, 4500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Luz ambiental */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gira y Gana Premios Reales</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          🎡 Rueda de la Fortuna Diaria
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Pon a prueba tu suerte. Gana dólares en efectivo, gemas brillantes, diamantes exclusivos y giros extras.
        </p>
      </div>

      {/* Contenedor de la Ruleta */}
      <div className="relative flex flex-col items-center justify-center my-6">
        {/* Puntero Superior */}
        <div className="absolute -top-3 z-20 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[30px] border-t-amber-400 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]" />

        <div className="relative p-2 bg-gradient-to-br from-amber-500 via-purple-600 to-emerald-500 rounded-full shadow-2xl shadow-amber-500/20">
          <div className="bg-slate-950 rounded-full p-2">
            <canvas
              ref={canvasRef}
              width={380}
              height={380}
              className="max-w-[300px] max-h-[300px] sm:max-w-[380px] sm:max-h-[380px] rounded-full transition-transform duration-[4500ms] cubic-bezier(0.15, 0.9, 0.25, 1)"
              style={{
                transform: `rotate(${currentRotation}deg)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Estado de Giros y Botón de Acción */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">Giros Disponibles:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-amber-400">{spinsLeft}</span>
              <span className="text-xs text-slate-400 font-mono">/ día</span>
              {spinsLeft === 0 && (
                <span className="text-[10px] text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-md font-mono">
                  Sin giros gratis hoy
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {spinsLeft > 0 ? (
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className="flex-1 sm:flex-none px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Girando la Fortuna...' : '¡GIRAR AHORA!'}</span>
            </button>
          ) : (
            <button
              onClick={onBuySpinsWithGems}
              disabled={gemsCount < 100}
              className="flex-1 sm:flex-none px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20"
            >
              <Gem className="w-4 h-4 text-purple-200" />
              <span>Comprar 1 Giro por 100 💎</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal de Premio Ganado */}
      <AnimatePresence>
        {wonPrize && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-6 p-5 bg-gradient-to-r from-emerald-950/90 to-slate-900 border-2 border-emerald-500/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{wonPrize.icon}</span>
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider block">
                  🎉 ¡Felicidades! Has ganado:
                </span>
                <span className="text-xl font-black text-white">
                  {wonPrize.label}
                </span>
              </div>
            </div>
            <button
              onClick={() => setWonPrize(null)}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl tracking-wider transition-all cursor-pointer"
            >
              ¡Recibir Recompensa! ✓
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
