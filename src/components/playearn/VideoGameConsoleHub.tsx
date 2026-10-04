import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Sparkles,
  DollarSign,
  Target,
  Zap,
  Award,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface VideoGameConsoleHubProps {
  initialGame?: 'pool' | 'arkanoid';
  userGems: number;
  userDiamonds: number;
  onConsoleReward: (
    gameName: string,
    rewardUSD: number,
    rewardGems: number,
    rewardDiamonds: number,
    gemCost?: number
  ) => void;
}

// ============================================================================
// SONIDOS REALES Y NATURALES (GOLPE DE BOLAS DE BILLAR, REBOTE Y MONEDAS)
// ============================================================================
class NaturalGameSound {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private getCtx(): AudioContext | null {
    if (this.muted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playBallClick(volume = 0.2) {
    const ctx = this.getCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(Math.min(0.35, volume), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {}
  }

  public playPocketDrop() {
    const ctx = this.getCtx();
    if (!ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((n, i) => {
        setTimeout(() => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(n, ctx.currentTime);
          gain.gain.setValueAtTime(0.14, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.16);
        }, i * 60);
      });
    } catch {}
  }

  public playBrickBreak(pitch = 520) {
    const ctx = this.getCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.4, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }
}

const gameAudio = new NaturalGameSound();

// ============================================================================
// TIPOS PARA JUEGO #1: BILLAR POOL 8-BALL VIP (FÍSICA REAL 60 FPS EN CANVAS)
// ============================================================================
interface PoolBall {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isStriped?: boolean;
  pocketed: boolean;
}

const INITIAL_POOL_BALLS = (): PoolBall[] => {
  const r = 13;
  const startX = 530;
  const startY = 190;
  const palette = [
    { id: 1, color: '#eab308', isStriped: false }, // 1 Amarilla
    { id: 2, color: '#2563eb', isStriped: false }, // 2 Azul
    { id: 3, color: '#dc2626', isStriped: false }, // 3 Roja
    { id: 4, color: '#7c3aed', isStriped: false }, // 4 Morada
    { id: 8, color: '#0f172a', isStriped: false }, // 8 Negra
    { id: 5, color: '#ea580c', isStriped: false }, // 5 Naranja
    { id: 6, color: '#16a34a', isStriped: false }, // 6 Verde
    { id: 7, color: '#991b1b', isStriped: false }, // 7 Vino
    { id: 9, color: '#eab308', isStriped: true },  // 9 Rayada
    { id: 10, color: '#2563eb', isStriped: true }  // 10 Rayada
  ];

  const balls: PoolBall[] = [
    // Bola Blanca (Cue Ball)
    {
      id: 0,
      x: 190,
      y: startY,
      vx: 0,
      vy: 0,
      radius: r,
      color: '#f8fafc',
      pocketed: false
    }
  ];

  // Armar triángulo de bolas (4 columnas)
  let idx = 0;
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row <= col; row++) {
      if (idx >= palette.length) break;
      const spec = palette[idx++];
      const bx = startX + col * (r * 1.82);
      const by = startY - (col * r) + row * (r * 2.04);
      balls.push({
        id: spec.id,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        radius: r,
        color: spec.color,
        isStriped: spec.isStriped,
        pocketed: false
      });
    }
  }
  return balls;
};

// ============================================================================
// TIPOS PARA JUEGO #2: ARKANOID CRYSTAL BREAKER (FÍSICA REAL 60 FPS EN CANVAS)
// ============================================================================
interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  alive: boolean;
  points: number;
  hasCoin: boolean;
}

interface FallingCoin {
  x: number;
  y: number;
  vy: number;
  type: 'usd' | 'gem';
  collected: boolean;
}

export const VideoGameConsoleHub: React.FC<VideoGameConsoleHubProps> = ({
  initialGame = 'pool',
  onConsoleReward
}) => {
  const [selectedGame, setSelectedGame] = useState<'pool' | 'arkanoid'>(initialGame);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    setSelectedGame(initialGame);
  }, [initialGame]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    gameAudio.muted = !next;
  };

  // ==========================================================================
  // LÓGICA DEL JUEGO #1: BILLAR POOL 8-BALL VIP (FÍSICA REAL EN CANVAS)
  // ==========================================================================
  const poolCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const poolBallsRef = useRef<PoolBall[]>(INITIAL_POOL_BALLS());
  const [aimAngle, setAimAngle] = useState<number>(0); // Radianes
  const [shotPower, setShotPower] = useState<number>(65); // 15 a 100
  const [ballsMoving, setBallsMoving] = useState<boolean>(false);
  const [pocketedCount, setPocketedCount] = useState<number>(0);
  const [poolSessionUSD, setPoolSessionUSD] = useState<number>(0);
  const [poolSessionGems, setPoolSessionGems] = useState<number>(0);
  const [poolMessage, setPoolMessage] = useState<string>(
    '🎱 Apunta tocando o moviendo el mouse sobre la mesa y presiona "¡GOLPEAR BOLA BLANCA!"'
  );

  // Troneras de la mesa de billar (760 x 380)
  const POCKETS = [
    { x: 26, y: 26 },
    { x: 380, y: 20 },
    { x: 734, y: 26 },
    { x: 26, y: 354 },
    { x: 380, y: 360 },
    { x: 734, y: 354 }
  ];

  const resetPoolTable = () => {
    poolBallsRef.current = INITIAL_POOL_BALLS();
    setPocketedCount(0);
    setBallsMoving(false);
    setAimAngle(0);
    setPoolMessage('🎱 Mesa nueva lista. ¡Apunta con el láser y ejecuta tu tiro inicial!');
  };

  const shootCueBall = () => {
    if (ballsMoving) return;
    const cueBall = poolBallsRef.current.find((b) => b.id === 0);
    if (!cueBall || cueBall.pocketed) return;

    const speed = (shotPower / 100) * 17.5;
    cueBall.vx = Math.cos(aimAngle) * speed;
    cueBall.vy = Math.sin(aimAngle) * speed;
    setBallsMoving(true);
    gameAudio.playBallClick(0.35);
    setPoolMessage('🔥 ¡Tiro en marcha! Observa la física real de las bolas...');
  };

  // Apuntar directamente con el mouse o toque sobre la mesa de billar
  const handlePoolCanvasPointer = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ballsMoving) return;
    const canvas = poolCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const targetX = (e.clientX - rect.left) * scaleX;
    const targetY = (e.clientY - rect.top) * scaleY;

    const cueBall = poolBallsRef.current.find((b) => b.id === 0);
    if (cueBall) {
      const angle = Math.atan2(targetY - cueBall.y, targetX - cueBall.x);
      setAimAngle(angle);
    }
  };

  // Bucle de Física 60 FPS de la Mesa de Billar
  useEffect(() => {
    if (selectedGame !== 'pool') return;

    let animId: number;
    const TABLE_W = 760;
    const TABLE_H = 380;
    const RAIL = 24;

    const renderPool = () => {
      const canvas = poolCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const balls = poolBallsRef.current;
      let anyMoving = false;

      // 1. Actualizar posiciones y fricción del paño
      for (const b of balls) {
        if (b.pocketed) continue;
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.986; // Fricción natural del paño de billar
        b.vy *= 0.986;

        if (Math.hypot(b.vx, b.vy) < 0.07) {
          b.vx = 0;
          b.vy = 0;
        } else {
          anyMoving = true;
        }

        // Rebote contra las bandas de madera/goma
        if (b.x - b.radius < RAIL) {
          b.x = RAIL + b.radius;
          b.vx = -b.vx * 0.85;
          gameAudio.playBallClick(0.1);
        } else if (b.x + b.radius > TABLE_W - RAIL) {
          b.x = TABLE_W - RAIL - b.radius;
          b.vx = -b.vx * 0.85;
          gameAudio.playBallClick(0.1);
        }

        if (b.y - b.radius < RAIL) {
          b.y = RAIL + b.radius;
          b.vy = -b.vy * 0.85;
          gameAudio.playBallClick(0.1);
        } else if (b.y + b.radius > TABLE_H - RAIL) {
          b.y = TABLE_H - RAIL - b.radius;
          b.vy = -b.vy * 0.85;
          gameAudio.playBallClick(0.1);
        }

        // Comprobar si cayó en alguna de las 6 troneras (Pockets)
        for (const p of POCKETS) {
          if (Math.hypot(b.x - p.x, b.y - p.y) < 23) {
            if (b.id === 0) {
              // Si cae la bola blanca, se reposiciona en el punto de salida
              b.x = 190;
              b.y = 190;
              b.vx = 0;
              b.vy = 0;
              setPoolMessage('⚪ Bola blanca reposicionada en zona de salida.');
            } else {
              b.pocketed = true;
              b.vx = 0;
              b.vy = 0;
              gameAudio.playPocketDrop();
              setPocketedCount((c) => c + 1);
              setPoolSessionUSD((u) => Number((u + 0.15).toFixed(2)));
              setPoolSessionGems((g) => g + 12);
              setPoolMessage(
                `🎉 ¡EMBOCASTE LA BOLA #${b.id}! +$0.15 USD y +12 Gemas 💎 acumuladas.`
              );
            }
            break;
          }
        }
      }

      // 2. Colisiones elásticas reales entre todas las bolas
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const b1 = balls[i];
          const b2 = balls[j];
          if (b1.pocketed || b2.pocketed) continue;

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = b1.radius + b2.radius;

          if (dist > 0 && dist < minDist) {
            // Separar superposición
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;
            b1.x -= nx * overlap;
            b1.y -= ny * overlap;
            b2.x += nx * overlap;
            b2.y += ny * overlap;

            // Intercambiar momento lineal a lo largo de la normal
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;
            b1.vx -= p * nx * 0.95;
            b1.vy -= p * ny * 0.95;
            b2.vx += p * nx * 0.95;
            b2.vy += p * ny * 0.95;

            const impactSpeed = Math.hypot(kx, ky);
            if (impactSpeed > 0.6) {
              gameAudio.playBallClick(Math.min(0.3, impactSpeed * 0.03));
            }
          }
        }
      }

      setBallsMoving(anyMoving);

      // 3. DIBUJAR LA MESA DE BILLAR PROFESIONAL EN EL CANVAS
      ctx.clearRect(0, 0, TABLE_W, TABLE_H);

      // Marco exterior de madera caoba pulida
      ctx.fillStyle = '#451a03';
      ctx.fillRect(0, 0, TABLE_W, TABLE_H);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, TABLE_W - 4, TABLE_H - 4);

      // Paño verde esmeralda de torneo con sombreado radial
      const feltGrad = ctx.createRadialGradient(
        TABLE_W / 2,
        TABLE_H / 2,
        40,
        TABLE_W / 2,
        TABLE_H / 2,
        420
      );
      feltGrad.addColorStop(0, '#059669');
      feltGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = feltGrad;
      ctx.fillRect(RAIL, RAIL, TABLE_W - RAIL * 2, TABLE_H - RAIL * 2);

      // Línea de salida (Baulk line)
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(190, RAIL);
      ctx.lineTo(190, TABLE_H - RAIL);
      ctx.stroke();

      // Diamantes guía en los bordes de madera
      ctx.fillStyle = '#fbbf24';
      for (let m = 110; m < TABLE_W - 80; m += 90) {
        if (Math.abs(m - 380) < 30) continue;
        ctx.beginPath();
        ctx.arc(m, 12, 3, 0, Math.PI * 2);
        ctx.arc(m, TABLE_H - 12, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dibujar las 6 Troneras (Pockets)
      for (const p of POCKETS) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 21, 0, Math.PI * 2);
        ctx.fillStyle = '#090d16';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#92400e';
        ctx.stroke();
      }

      // 4. Línea guía láser y Taco de Billar cuando las bolas están quietas
      const cueBall = balls.find((b) => b.id === 0);
      if (cueBall && !anyMoving) {
        const rayLen = 280;
        const targetX = cueBall.x + Math.cos(aimAngle) * rayLen;
        const targetY = cueBall.y + Math.sin(aimAngle) * rayLen;

        // Línea punteada de puntería
        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cueBall.x, cueBall.y);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.restore();

        // Círculo fantasma de impacto
        ctx.beginPath();
        ctx.arc(targetX, targetY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#facc15';
        ctx.fill();

        // Dibujar el Taco de Billar detrás de la bola blanca
        const pullBack = 22 + (shotPower / 100) * 28;
        const cueStartX = cueBall.x - Math.cos(aimAngle) * pullBack;
        const cueStartY = cueBall.y - Math.sin(aimAngle) * pullBack;
        const cueEndX = cueBall.x - Math.cos(aimAngle) * (pullBack + 145);
        const cueEndY = cueBall.y - Math.sin(aimAngle) * (pullBack + 145);

        ctx.beginPath();
        ctx.moveTo(cueStartX, cueStartY);
        ctx.lineTo(cueEndX, cueEndY);
        ctx.strokeStyle = '#fde68a';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Punta azul del taco
        ctx.beginPath();
        ctx.arc(cueStartX, cueStartY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      }

      // 5. Dibujar todas las Bolas con sombreado 3D realista y número
      for (const b of balls) {
        if (b.pocketed) continue;

        // Sombra proyectada sobre el paño
        ctx.beginPath();
        ctx.arc(b.x + 3, b.y + 4, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.38)';
        ctx.fill();

        // Esfera base
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Si es rayada, banda blanca
        if (b.isStriped) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 0.72, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }

        // Círculo blanco central con el número de la bola
        if (b.id !== 0) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, 6.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(b.id), b.x, b.y + 0.5);
        }

        // Brillo especular 3D (luz superior izquierda)
        ctx.beginPath();
        ctx.arc(b.x - 4, b.y - 4, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.fill();
      }

      animId = requestAnimationFrame(renderPool);
    };

    animId = requestAnimationFrame(renderPool);
    return () => cancelAnimationFrame(animId);
  }, [selectedGame, aimAngle, shotPower]);

  const handleClaimPoolWinnings = () => {
    const usd = Math.max(0.30, poolSessionUSD);
    const gems = Math.max(20, poolSessionGems);
    onConsoleReward('Billar Pool 8-Ball Club VIP', usd, gems, 2);
    setPoolSessionUSD(0);
    setPoolSessionGems(0);
    resetPoolTable();
  };

  // ==========================================================================
  // LÓGICA DEL JUEGO #2: ARKANOID CRYSTAL BREAKER 60 FPS (FÍSICA REAL CANVAS)
  // ==========================================================================
  const arkCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [arkRunning, setArkRunning] = useState<boolean>(false);
  const [arkScore, setArkScore] = useState<number>(0);
  const [arkSessionUSD, setArkSessionUSD] = useState<number>(0);
  const [arkSessionGems, setArkSessionGems] = useState<number>(0);
  const paddleXRef = useRef<number>(310);
  const ballRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 370,
    y: 310,
    vx: 4.8,
    vy: -4.8
  });
  const bricksRef = useRef<Brick[]>([]);
  const fallingCoinsRef = useRef<FallingCoin[]>([]);

  const initArkanoidBricks = useCallback(() => {
    const rows = 5;
    const cols = 9;
    const pad = 8;
    const offsetTop = 42;
    const offsetLeft = 28;
    const brickW = 70;
    const brickH = 22;
    const colors = ['#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'];

    const list: Brick[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          x: offsetLeft + c * (brickW + pad),
          y: offsetTop + r * (brickH + pad),
          w: brickW,
          h: brickH,
          color: colors[r % colors.length],
          alive: true,
          points: (rows - r) * 10,
          hasCoin: (r + c) % 2 === 0
        });
      }
    }
    bricksRef.current = list;
    fallingCoinsRef.current = [];
    ballRef.current = { x: 370, y: 310, vx: 4.8, vy: -4.8 };
    paddleXRef.current = 310;
  }, []);

  useEffect(() => {
    initArkanoidBricks();
  }, [initArkanoidBricks]);

  const startArkanoidGame = () => {
    if (bricksRef.current.every((b) => !b.alive)) {
      initArkanoidBricks();
    }
    ballRef.current = { x: paddleXRef.current + 65, y: 320, vx: 5.0, vy: -5.2 };
    setArkRunning(true);
  };

  // Mover plataforma con el mouse o dedo sobre el canvas
  const handleArkPointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = arkCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    paddleXRef.current = Math.max(12, Math.min(canvas.width - 142, mouseX - 65));
  };

  // Bucle 60 FPS de Arkanoid Crystal Breaker
  useEffect(() => {
    if (selectedGame !== 'arkanoid') return;

    let animId: number;
    const W = 740;
    const H = 390;
    const PADDLE_W = 130;
    const PADDLE_H = 14;
    const PADDLE_Y = H - 32;

    const renderArkanoid = () => {
      const canvas = arkCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fondo espacial profundo con grilla sutil
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Si está corriendo, actualizar física de la esfera y monedas
      if (arkRunning) {
        const ball = ballRef.current;
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Rebote paredes laterales y techo
        if (ball.x < 10 || ball.x > W - 10) {
          ball.vx = -ball.vx;
          gameAudio.playBallClick(0.15);
        }
        if (ball.y < 10) {
          ball.vy = -ball.vy;
          gameAudio.playBallClick(0.15);
        }

        // Rebote en la plataforma del jugador
        const px = paddleXRef.current;
        if (
          ball.vy > 0 &&
          ball.y + 9 >= PADDLE_Y &&
          ball.y - 9 <= PADDLE_Y + PADDLE_H &&
          ball.x >= px - 6 &&
          ball.x <= px + PADDLE_W + 6
        ) {
          const hitOffset = (ball.x - (px + PADDLE_W / 2)) / (PADDLE_W / 2);
          ball.vx = hitOffset * 6.4;
          ball.vy = -Math.abs(ball.vy);
          gameAudio.playBallClick(0.25);
        }

        // Si cae al fondo, rebota automáticamente con escudo magnético para no frustrar la partida
        if (ball.y > H - 8) {
          ball.vy = -Math.abs(ball.vy);
          paddleXRef.current = Math.max(12, Math.min(W - PADDLE_W - 12, ball.x - PADDLE_W / 2));
        }

        // Colisión contra los bloques de cristal
        for (const br of bricksRef.current) {
          if (!br.alive) continue;
          if (
            ball.x + 8 > br.x &&
            ball.x - 8 < br.x + br.w &&
            ball.y + 8 > br.y &&
            ball.y - 8 < br.y + br.h
          ) {
            br.alive = false;
            ball.vy = -ball.vy;
            gameAudio.playBrickBreak(480 + br.points * 4);
            setArkScore((s) => s + br.points);
            setArkSessionUSD((u) => Number((u + 0.04).toFixed(2)));
            setArkSessionGems((g) => g + 4);

            if (br.hasCoin) {
              fallingCoinsRef.current.push({
                x: br.x + br.w / 2,
                y: br.y + br.h / 2,
                vy: 2.6,
                type: Math.random() > 0.4 ? 'usd' : 'gem',
                collected: false
              });
            }
            break;
          }
        }

        // Si destruyó todos los bloques, regenerar nivel con bono
        if (bricksRef.current.every((b) => !b.alive)) {
          gameAudio.playPocketDrop();
          initArkanoidBricks();
        }

        // Actualizar monedas que caen
        for (const coin of fallingCoinsRef.current) {
          if (coin.collected) continue;
          coin.y += coin.vy;
          if (
            coin.y >= PADDLE_Y - 8 &&
            coin.y <= PADDLE_Y + PADDLE_H + 8 &&
            coin.x >= px - 10 &&
            coin.x <= px + PADDLE_W + 10
          ) {
            coin.collected = true;
            gameAudio.playPocketDrop();
            if (coin.type === 'usd') {
              setArkSessionUSD((u) => Number((u + 0.10).toFixed(2)));
            } else {
              setArkSessionGems((g) => g + 10);
            }
          }
        }
      }

      // Dibujar los bloques de cristal con bisel brillante
      for (const br of bricksRef.current) {
        if (!br.alive) continue;
        ctx.fillStyle = br.color;
        ctx.beginPath();
        ctx.roundRect(br.x, br.y, br.w, br.h, 5);
        ctx.fill();

        // Brillo superior de cristal
        ctx.fillStyle = 'rgba(255,255,255,0.32)';
        ctx.fillRect(br.x + 3, br.y + 2, br.w - 6, 5);
      }

      // Dibujar monedas cayendo
      for (const coin of fallingCoinsRef.current) {
        if (coin.collected || coin.y > H) continue;
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = coin.type === 'usd' ? '#fbbf24' : '#38bdf8';
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(coin.type === 'usd' ? '$' : '💎', coin.x, coin.y + 1);
      }

      // Dibujar Plataforma Magnética (Paddle)
      const px = paddleXRef.current;
      const padGrad = ctx.createLinearGradient(px, PADDLE_Y, px + PADDLE_W, PADDLE_Y);
      padGrad.addColorStop(0, '#06b6d4');
      padGrad.addColorStop(0.5, '#f8fafc');
      padGrad.addColorStop(1, '#06b6d4');
      ctx.fillStyle = padGrad;
      ctx.beginPath();
      ctx.roundRect(px, PADDLE_Y, PADDLE_W, PADDLE_H, 7);
      ctx.fill();

      // Dibujar Esfera de Energía con brillo
      const ball = ballRef.current;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#facc15';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      animId = requestAnimationFrame(renderArkanoid);
    };

    animId = requestAnimationFrame(renderArkanoid);
    return () => cancelAnimationFrame(animId);
  }, [selectedGame, arkRunning, initArkanoidBricks]);

  const handleClaimArkanoidWinnings = () => {
    const usd = Math.max(0.25, arkSessionUSD);
    const gems = Math.max(15, arkSessionGems);
    setArkRunning(false);
    onConsoleReward('Arkanoid Crystal Breaker VIP', usd, gems, 2);
    setArkSessionUSD(0);
    setArkSessionGems(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* CABECERA LIMPIA Y NATURAL */}
      <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              PLAY & EARN · SALÓN DE JUEGOS CLÁSICOS CON FÍSICA REAL A 60 FPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {selectedGame === 'pool'
                ? '🎱 Billar Pool 8-Ball Club VIP'
                : '🧱 Arkanoid Crystal Breaker 60 FPS'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {selectedGame === 'pool'
                ? 'Mesa de billar profesional con física elástica real: apunta con el taco y el láser sobre el paño verde, ajusta la potencia y emboca las bolas numeradas.'
                : 'Clásico rompe-bloques de cristal a 60 cuadros por segundo: desliza la barra con el mouse o el dedo, destruye los cristales y atrapa las monedas doradas.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setSelectedGame('pool')}
              className={`px-4 py-3 rounded-2xl border font-mono text-xs font-black uppercase cursor-pointer flex items-center gap-2 transition-all ${
                selectedGame === 'pool'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-lg shadow-emerald-500/25'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>🎱 1. Billar Pool 8-Ball</span>
            </button>

            <button
              onClick={() => setSelectedGame('arkanoid')}
              className={`px-4 py-3 rounded-2xl border font-mono text-xs font-black uppercase cursor-pointer flex items-center gap-2 transition-all ${
                selectedGame === 'arkanoid'
                  ? 'bg-cyan-400 text-slate-950 border-cyan-200 shadow-lg shadow-cyan-400/25'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>🧱 2. Arkanoid Cristal</span>
            </button>

            <button
              onClick={toggleSound}
              className="px-3.5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-400" />
              )}
              <span>{soundEnabled ? 'Sonido Activo' : 'Silenciado'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* JUEGO #1: MESA DE BILLAR POOL 8-BALL VIP                             */}
      {/* ==================================================================== */}
      {selectedGame === 'pool' && (
        <div className="bg-slate-950 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
          {/* Marcador Superior de la Mesa de Billar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-slate-400">Bolas Embocadas: </span>
                <span className="text-emerald-400 font-black">{pocketedCount} / 10</span>
              </div>
              <div className="px-3.5 py-2 bg-slate-900 border border-emerald-500/40 rounded-xl">
                <span className="text-slate-400">Ganancia Acumulada: </span>
                <span className="text-emerald-400 font-black">
                  +${poolSessionUSD.toFixed(2)} USD
                </span>
                <span className="text-blue-400 font-black ml-2">+{poolSessionGems} 💎</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetPoolTable}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-mono text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Acomodar Triángulo</span>
              </button>

              <button
                onClick={handleClaimPoolWinnings}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 rounded-xl font-mono text-xs font-black uppercase cursor-pointer flex items-center gap-1.5 shadow-lg"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>
                  Cobrar +${Math.max(0.30, poolSessionUSD).toFixed(2)} USD
                </span>
              </button>
            </div>
          </div>

          {/* MESA DE BILLAR INTERACTIVA EN CANVAS */}
          <div className="flex flex-col items-center justify-center bg-slate-900/70 p-3 sm:p-5 rounded-2xl border border-slate-800">
            <canvas
              ref={poolCanvasRef}
              width={760}
              height={380}
              onMouseMove={handlePoolCanvasPointer}
              onClick={handlePoolCanvasPointer}
              className="w-full max-w-[760px] aspect-[2/1] rounded-xl shadow-2xl cursor-crosshair border-2 border-amber-900/60"
            />
            <p className="text-xs font-mono text-emerald-300 mt-3 text-center">
              {poolMessage}
            </p>
          </div>

          {/* CONTROLES DE ÁNGULO, POTENCIA DEL TACO Y BOTÓN DE TIRO */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <div className="md:col-span-4 space-y-1 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-bold">🎯 Ángulo del Taco:</span>
                <span className="text-amber-400 font-black">
                  {Math.round((aimAngle * 180) / Math.PI)}°
                </span>
              </div>
              <input
                type="range"
                min={-3.14}
                max={3.14}
                step={0.02}
                value={aimAngle}
                onChange={(e) => setAimAngle(parseFloat(e.target.value))}
                disabled={ballsMoving}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="md:col-span-4 space-y-1 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-bold">⚡ Fuerza del Golpe:</span>
                <span className="text-emerald-400 font-black">{shotPower}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                step={1}
                value={shotPower}
                onChange={(e) => setShotPower(parseInt(e.target.value, 10))}
                disabled={ballsMoving}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="md:col-span-4">
              <button
                onClick={shootCueBall}
                disabled={ballsMoving}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 disabled:opacity-40 text-slate-950 font-mono text-xs font-black uppercase rounded-xl cursor-pointer shadow-xl flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4" />
                <span>
                  {ballsMoving ? 'Bolas en Movimiento...' : '🎱 ¡GOLPEAR BOLA BLANCA!'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* JUEGO #2: ARKANOID CRYSTAL BREAKER 60 FPS                            */}
      {/* ==================================================================== */}
      {selectedGame === 'arkanoid' && (
        <div className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-slate-400">Puntaje Cristal: </span>
                <span className="text-cyan-400 font-black">{arkScore} pts</span>
              </div>
              <div className="px-3.5 py-2 bg-slate-900 border border-emerald-500/40 rounded-xl">
                <span className="text-slate-400">Ganancia Acumulada: </span>
                <span className="text-emerald-400 font-black">
                  +${arkSessionUSD.toFixed(2)} USD
                </span>
                <span className="text-blue-400 font-black ml-2">+{arkSessionGems} 💎</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  initArkanoidBricks();
                  setArkRunning(true);
                }}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-black uppercase cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{arkRunning ? 'Reiniciar Nivel' : 'Iniciar Partida'}</span>
              </button>

              <button
                onClick={handleClaimArkanoidWinnings}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 rounded-xl font-mono text-xs font-black uppercase cursor-pointer flex items-center gap-1.5 shadow-lg"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>
                  Cobrar +${Math.max(0.25, arkSessionUSD).toFixed(2)} USD
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center bg-slate-900/70 p-3 sm:p-5 rounded-2xl border border-slate-800">
            <canvas
              ref={arkCanvasRef}
              width={740}
              height={390}
              onMouseMove={handleArkPointerMove}
              className="w-full max-w-[740px] aspect-[74/39] rounded-xl shadow-2xl border border-cyan-500/40 cursor-ew-resize"
            />

            {!arkRunning && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  🧱 Arkanoid Crystal Breaker (60 FPS)
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Mueve el mouse o desliza tu dedo de izquierda a derecha para hacer rebotar la esfera de energía, romper todos los cristales y atrapar las monedas que caen.
                </p>
                <button
                  onClick={startArkanoidGame}
                  className="px-7 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs font-black uppercase rounded-2xl cursor-pointer shadow-xl flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>¡Jugar Ahora!</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
