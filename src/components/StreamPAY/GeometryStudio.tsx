import React, { useState, useRef, useEffect } from 'react';
import {
  Shapes,
  Triangle,
  Square,
  Circle,
  Hexagon,
  PenTool,
  Pencil,
  Eraser,
  Grid,
  Undo2,
  Download,
  Ruler,
  Sparkles,
  Award,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Volume2,
  VolumeX,
  Eye,
  Sliders,
  Maximize2,
  Info,
  Calculator
} from 'lucide-react';

export interface PolygonInfo {
  id: string;
  name: string;
  alternateName?: string;
  sides: number;
  category: 'triangulo' | 'cuadrilatero' | 'poligono_regular' | 'circulo';
  description: string;
  perimeterFormula: string;
  areaFormula: string;
  internalAnglesSum: number | string;
  oneInternalAngle: number | string;
  centralAngle: number | string;
  diagonalsFromVertex: number;
  totalDiagonals: number;
  mepGradeTip: string;
  defaultSide?: number;
  defaultApothem?: number;
  defaultHeight?: number;
  defaultBase?: number;
  defaultSmallBase?: number;
  defaultRadius?: number;
}

export const ALL_GEOMETRIC_SHAPES: PolygonInfo[] = [
  // --- TRIÁNGULOS ---
  {
    id: 'triangulo_equilatero',
    name: 'Triángulo Equilátero',
    sides: 3,
    category: 'triangulo',
    description: 'Polígono de 3 lados exactamente iguales y 3 ángulos iguales de 60°. Es el triángulo regular.',
    perimeterFormula: 'P = 3 × l',
    areaFormula: 'A = (base × altura) / 2',
    internalAnglesSum: 180,
    oneInternalAngle: 60,
    centralAngle: 120,
    diagonalsFromVertex: 0,
    totalDiagonals: 0,
    mepGradeTip: '¡Regla de oro MEP! La suma de los 3 ángulos internos de CUALQUIER triángulo siempre da 180°. En el equilátero, cada ángulo mide exactamente 60° (180° ÷ 3 = 60°).',
    defaultSide: 6,
    defaultHeight: 5.2
  },
  {
    id: 'triangulo_isosceles',
    name: 'Triángulo Isósceles',
    sides: 3,
    category: 'triangulo',
    description: 'Triángulo con 2 lados de igual medida y 1 lado diferente (base). Sus 2 ángulos de la base son iguales.',
    perimeterFormula: 'P = 2 × l + base',
    areaFormula: 'A = (base × altura) / 2',
    internalAnglesSum: 180,
    oneInternalAngle: 'Depende (2 iguales)',
    centralAngle: 'N/A',
    diagonalsFromVertex: 0,
    totalDiagonals: 0,
    mepGradeTip: 'Tiene un eje de simetría vertical que pasa por el vértice superior y corta la base en dos mitades exactamente iguales.',
    defaultSide: 7,
    defaultBase: 5,
    defaultHeight: 6.5
  },
  {
    id: 'triangulo_rectangulo',
    name: 'Triángulo Rectángulo',
    sides: 3,
    category: 'triangulo',
    description: 'Tiene un ángulo recto exacto de 90°. Los lados que forman la "L" son los catetos y el lado más largo inclinado es la hipotenusa.',
    perimeterFormula: 'P = cateto₁ + cateto₂ + hipotenusa',
    areaFormula: 'A = (cateto₁ × cateto₂) / 2',
    internalAnglesSum: 180,
    oneInternalAngle: 'Un ángulo de 90°',
    centralAngle: 'N/A',
    diagonalsFromVertex: 0,
    totalDiagonals: 0,
    mepGradeTip: '¡Súper fácil para calcular el área! Al ser recto, un cateto sirve de base y el otro de altura. Solo multiplicas los dos catetos y divides entre 2.',
    defaultBase: 6,
    defaultHeight: 8
  },
  {
    id: 'triangulo_escaleno',
    name: 'Triángulo Escaleno',
    sides: 3,
    category: 'triangulo',
    description: 'Todos sus 3 lados tienen medidas diferentes y sus 3 ángulos internos son todos distintos.',
    perimeterFormula: 'P = a + b + c',
    areaFormula: 'A = (base × altura) / 2',
    internalAnglesSum: 180,
    oneInternalAngle: 'Todos distintos',
    centralAngle: 'N/A',
    diagonalsFromVertex: 0,
    totalDiagonals: 0,
    mepGradeTip: 'Aunque sus 3 lados y ángulos sean desiguales, la suma de sus 3 ángulos internos SIEMPRE suma 180° exactos.',
    defaultBase: 8,
    defaultHeight: 5
  },

  // --- CUADRILÁTEROS ---
  {
    id: 'cuadrado',
    name: 'Cuadrado',
    sides: 4,
    category: 'cuadrilatero',
    description: 'Cuadrilátero regular con 4 lados congruentes (iguales) y 4 ángulos rectos de 90°. Sus diagonales son perpendiculares e iguales.',
    perimeterFormula: 'P = 4 × l',
    areaFormula: 'A = l × l = l²',
    internalAnglesSum: 360,
    oneInternalAngle: 90,
    centralAngle: 90,
    diagonalsFromVertex: 1,
    totalDiagonals: 2,
    mepGradeTip: '¡Todo cuadrilátero suma 360° en sus ángulos internos! (4 - 2) × 180° = 2 × 180° = 360°.',
    defaultSide: 6
  },
  {
    id: 'rectangulo',
    name: 'Rectángulo',
    sides: 4,
    category: 'cuadrilatero',
    description: 'Cuadrilátero paralelogramo con lados opuestos paralelos e iguales y 4 ángulos rectos de 90°.',
    perimeterFormula: 'P = 2 × base + 2 × altura',
    areaFormula: 'A = base × altura',
    internalAnglesSum: 360,
    oneInternalAngle: 90,
    centralAngle: 'N/A',
    diagonalsFromVertex: 1,
    totalDiagonals: 2,
    mepGradeTip: 'Muy frecuente en exámenes MEP para lotes, canchas de fútbol, piscinas y terrenos escolares.',
    defaultBase: 9,
    defaultHeight: 5
  },
  {
    id: 'rombo',
    name: 'Rombo',
    sides: 4,
    category: 'cuadrilatero',
    description: 'Tiene 4 lados iguales, pero sus ángulos no son rectos (dos agudos y dos obtusos). Posee Diagonal Mayor (D) y Diagonal Menor (d).',
    perimeterFormula: 'P = 4 × l',
    areaFormula: 'A = (Diagonal Mayor × Diagonal Menor) / 2',
    internalAnglesSum: 360,
    oneInternalAngle: 'Ángulos opuestos iguales',
    centralAngle: 'N/A',
    diagonalsFromVertex: 1,
    totalDiagonals: 2,
    mepGradeTip: 'Las dos diagonales se cruzan en el puro centro formando una cruz perpendicular de 90°.',
    defaultSide: 5,
    defaultBase: 8, // Diagonal mayor
    defaultHeight: 6 // Diagonal menor
  },
  {
    id: 'trapecio',
    name: 'Trapecio',
    sides: 4,
    category: 'cuadrilatero',
    description: 'Cuadrilátero con un par de lados opuestos paralelos llamados Base Mayor (B) y Base Menor (b), y una altura perpendicular (h).',
    perimeterFormula: 'P = B + b + lado₁ + lado₂',
    areaFormula: 'A = [(Base Mayor + Base Menor) × altura] / 2',
    internalAnglesSum: 360,
    oneInternalAngle: 'Suma = 360°',
    centralAngle: 'N/A',
    diagonalsFromVertex: 1,
    totalDiagonals: 2,
    mepGradeTip: 'Fórmula clave en 6to grado: semisuma de las bases multiplicada por la altura: A = [(B + b) × h] / 2.',
    defaultBase: 10,
    defaultSmallBase: 6,
    defaultHeight: 5
  },

  // --- POLÍGONOS REGULARES ---
  {
    id: 'pentagono',
    name: 'Pentágono Regular',
    sides: 5,
    category: 'poligono_regular',
    description: 'Polígono regular de 5 lados congruentes y 5 ángulos internos iguales de 108°. Tiene apotema y radio.',
    perimeterFormula: 'P = 5 × l',
    areaFormula: 'A = (Perímetro × apotema) / 2',
    internalAnglesSum: 540,
    oneInternalAngle: 108,
    centralAngle: 72,
    diagonalsFromVertex: 2,
    totalDiagonals: 5,
    mepGradeTip: 'La apotema es la distancia perpendicular trazada desde el centro del polígono hasta el punto medio de cualquier lado.',
    defaultSide: 6,
    defaultApothem: 4.13
  },
  {
    id: 'hexagono',
    name: 'Hexágono Regular',
    sides: 6,
    category: 'poligono_regular',
    description: 'Polígono regular de 6 lados congruentes y 6 ángulos internos de 120°. ¡Forma los panales de las abejas y los copos de nieve!',
    perimeterFormula: 'P = 6 × l',
    areaFormula: 'A = (Perímetro × apotema) / 2',
    internalAnglesSum: 720,
    oneInternalAngle: 120,
    centralAngle: 60,
    diagonalsFromVertex: 3,
    totalDiagonals: 9,
    mepGradeTip: '¡Dato mágico! En el hexágono regular, el radio mide exactamente lo mismo que el lado (r = l), dividiéndose en 6 triángulos equiláteros perfectos.',
    defaultSide: 6,
    defaultApothem: 5.2
  },
  {
    id: 'heptagono',
    name: 'Heptágono Regular',
    alternateName: 'Polígono de 7 lados (Heptágono)',
    sides: 7,
    category: 'poligono_regular',
    description: 'Polígono de 7 lados y 7 vértices congruentes. Tiene 14 diagonales en total y una suma de ángulos internos de 900°.',
    perimeterFormula: 'P = 7 × l',
    areaFormula: 'A = (Perímetro × apotema) / 2',
    internalAnglesSum: 900,
    oneInternalAngle: 128.57,
    centralAngle: 51.43,
    diagonalsFromVertex: 4,
    totalDiagonals: 14,
    mepGradeTip: 'Diagonales totales: D = [n × (n - 3)] / 2 = [7 × (7 - 3)] / 2 = (7 × 4) / 2 = 28 / 2 = 14 diagonales.',
    defaultSide: 5,
    defaultApothem: 5.19
  },
  {
    id: 'octagono',
    name: 'Octágono Regular',
    sides: 8,
    category: 'poligono_regular',
    description: 'Polígono regular de 8 lados congruentes y 8 ángulos internos de 135°. Es la forma universal de las señales de ALTO (STOP).',
    perimeterFormula: 'P = 8 × l',
    areaFormula: 'A = (Perímetro × apotema) / 2',
    internalAnglesSum: 1080,
    oneInternalAngle: 135,
    centralAngle: 45,
    diagonalsFromVertex: 5,
    totalDiagonals: 20,
    mepGradeTip: 'Suma de ángulos: (8 - 2) × 180° = 6 × 180° = 1,080°. Cada ángulo mide 1,080° ÷ 8 = 135°.',
    defaultSide: 5,
    defaultApothem: 6.03
  },
  {
    id: 'eneagono',
    name: 'Eneágono (o Nonágono)',
    sides: 9,
    category: 'poligono_regular',
    description: 'Polígono regular de 9 lados y 9 vértices. Suma de ángulos interiores: 1,260°. Diagonales totales: 27.',
    perimeterFormula: 'P = 9 × l',
    areaFormula: 'A = (Perímetro × apotema) / 2',
    internalAnglesSum: 1260,
    oneInternalAngle: 140,
    centralAngle: 40,
    diagonalsFromVertex: 6,
    totalDiagonals: 27,
    mepGradeTip: 'Diagonales desde un solo vértice: d = n - 3 = 9 - 3 = 6 diagonales.',
    defaultSide: 4,
    defaultApothem: 5.5
  },
  {
    id: 'decagono',
    name: 'Decágono Regular',
    sides: 10,
    category: 'poligono_regular',
    description: 'Polígono regular de 10 lados y 10 vértices. Cada ángulo interno mide 144° y su ángulo central mide exactamente 36°.',
    perimeterFormula: 'P = 10 × l',
    areaFormula: 'A = (Perímetro × apotema) / 2',
    internalAnglesSum: 1440,
    oneInternalAngle: 144,
    centralAngle: 36,
    diagonalsFromVertex: 7,
    totalDiagonals: 35,
    mepGradeTip: 'Ángulo central: 360° ÷ 10 = 36°. Cada división forma un triángulo isósceles que conecta con el centro.',
    defaultSide: 4,
    defaultApothem: 6.15
  },
  {
    id: 'dodecagono',
    name: 'Dodecágono Regular',
    sides: 12,
    category: 'poligono_regular',
    description: 'Polígono regular de 12 lados y 12 vértices, con la simetría de las 12 horas del reloj tradicional.',
    perimeterFormula: 'P = 12 × l',
    areaFormula: 'A = (Perímetro × apotema) / 2',
    internalAnglesSum: 1800,
    oneInternalAngle: 150,
    centralAngle: 30,
    diagonalsFromVertex: 9,
    totalDiagonals: 54,
    mepGradeTip: 'Diagonales totales: D = [12 × (12 - 3)] / 2 = (12 × 9) / 2 = 108 / 2 = 54 diagonales.',
    defaultSide: 3,
    defaultApothem: 5.6
  },

  // --- CÍRCULO Y CIRCUNFERENCIA ---
  {
    id: 'circulo',
    name: 'Círculo y Circunferencia',
    sides: 0,
    category: 'circulo',
    description: 'Figura plana delimitada por una circunferencia. Posee Centro, Radio (r), Diámetro (d = 2r), Cuerda, Secante, Tangente y el número π ≈ 3.1416.',
    perimeterFormula: 'Longitud C = 2 × π × r = π × d',
    areaFormula: 'Área A = π × r²',
    internalAnglesSum: 360,
    oneInternalAngle: 360,
    centralAngle: 360,
    diagonalsFromVertex: 0,
    totalDiagonals: 0,
    mepGradeTip: 'El diámetro mide exactamente el doble del radio: d = 2 × r. En 6to grado del MEP se utiliza π ≈ 3.14.',
    defaultSide: 0,
    defaultRadius: 5
  }
];

export interface DrawingChallenge {
  id: number;
  title: string;
  shapeId: string;
  instruction: string;
  question: string;
  answerExplanation: string;
  xpReward: number;
}

const DRAWING_CHALLENGES: DrawingChallenge[] = [
  {
    id: 1,
    title: 'Reto 1: Triángulo Rectángulo & Catetos',
    shapeId: 'triangulo_rectangulo',
    instruction: 'Dibuja un triángulo rectángulo sobre la cuadrícula o usa la plantilla guía. Pinta o señala el ángulo de 90° con un cuadrito en la esquina.',
    question: 'Si los catetos miden 6 cm y 8 cm, ¿cuál es su área exacta?',
    answerExplanation: 'Área = (base × altura) / 2 = (6 × 8) / 2 = 48 / 2 = 24 cm². ¡Excelente trazo!',
    xpReward: 60
  },
  {
    id: 2,
    title: 'Reto 2: El Heptágono y sus 14 Diagonales',
    shapeId: 'heptagono',
    instruction: 'Estampa el Heptágono (7 lados) en la pizarra. Con el pincel rojo, traza 3 diagonales uniendo vértices no consecutivos.',
    question: '¿Cuántos lados tiene el heptágono y cuántas diagonales totales se pueden trazar?',
    answerExplanation: 'Tiene 7 lados y 14 diagonales totales calculadas con D = [7 × (7 - 3)] / 2 = 28 / 2 = 14 diagonales.',
    xpReward: 80
  },
  {
    id: 3,
    title: 'Reto 3: Hexágono y la Apotema',
    shapeId: 'hexagono',
    instruction: 'Traza o estampa un Hexágono regular. Dibuja un punto en el centro y una línea perpendicular hasta la mitad de un lado: ¡esa es la apotema!',
    question: 'Si el lado mide 6 cm y la apotema mide 5.2 cm, ¿cuál es el perímetro y el área?',
    answerExplanation: 'P = 6 × 6 = 36 cm. Área = (P × apotema) / 2 = (36 × 5.2) / 2 = 187.2 / 2 = 93.6 cm².',
    xpReward: 90
  },
  {
    id: 4,
    title: 'Reto 4: Cuadrado Dividido en 4 Triángulos',
    shapeId: 'cuadrado',
    instruction: 'Dibuja un cuadrado en la cuadrícula. Traza sus 2 diagonales cruzadas de esquina a esquina formando 4 triángulos iguales.',
    question: '¿Qué tipo de triángulos se forman en el interior del cuadrado al cruzar sus diagonales?',
    answerExplanation: 'Se forman 4 triángulos rectángulos isósceles iguales, ya que las diagonales de un cuadrado se cortan a 90°.',
    xpReward: 70
  },
  {
    id: 5,
    title: 'Reto 5: Trapecio con Bases y Altura',
    shapeId: 'trapecio',
    instruction: 'Dibuja un trapecio con una base larga abajo (Base Mayor B) y una base corta arriba (Base Menor b). Traza la línea vertical de altura (h).',
    question: 'Si B = 10 cm, b = 6 cm y la altura h = 4 cm, ¿cuál es el área?',
    answerExplanation: 'Área = [(B + b) × h] / 2 = [(10 + 6) × 4] / 2 = (16 × 4) / 2 = 64 / 2 = 32 cm².',
    xpReward: 80
  },
  {
    id: 6,
    title: 'Reto 6: Círculo, Radio y Diámetro',
    shapeId: 'circulo',
    instruction: 'Dibuja un círculo. Marca su centro. Traza con el pincel azul el radio (del centro al borde) y con verde el diámetro completo.',
    question: 'Si el radio mide 4 cm y π = 3.14, ¿cuál es la longitud de la circunferencia?',
    answerExplanation: 'Longitud C = 2 × π × r = 2 × 3.14 × 4 = 25.12 cm. Diámetro = 2 × 4 = 8 cm.',
    xpReward: 85
  }
];

interface GeometryStudioProps {
  onAddXp?: (points: number, reason: string) => void;
  onAskEinstein?: (questionText: string) => void;
}

export const GeometryStudio: React.FC<GeometryStudioProps> = ({ onAddXp, onAskEinstein }) => {
  // Tabs: 'canvas' (Pizarra Libre), 'catalogo' (Todas las figuras), 'calculadora' (Laboratorio dinámico), 'retos' (Prácticas guiadas)
  const [activeTab, setActiveTab] = useState<'canvas' | 'catalogo' | 'calculadora' | 'retos'>('canvas');
  
  // Selected shape for catalog / calculator / stamp
  const [selectedShapeId, setSelectedShapeId] = useState<string>('heptagono');
  const selectedShape = ALL_GEOMETRIC_SHAPES.find(s => s.id === selectedShapeId) || ALL_GEOMETRIC_SHAPES[0];

  // Interactive Calculator dynamic parameters
  const [calcSide, setCalcSide] = useState<number>(selectedShape.defaultSide || 6);
  const [calcBase, setCalcBase] = useState<number>(selectedShape.defaultBase || 8);
  const [calcHeight, setCalcHeight] = useState<number>(selectedShape.defaultHeight || 5);
  const [calcSmallBase, setCalcSmallBase] = useState<number>(selectedShape.defaultSmallBase || 4);
  const [calcApothem, setCalcApothem] = useState<number>(selectedShape.defaultApothem || 4.5);
  const [calcRadius, setCalcRadius] = useState<number>(selectedShape.defaultRadius || 5);

  // Update calculator fields when shape changes
  useEffect(() => {
    setCalcSide(selectedShape.defaultSide || 6);
    setCalcBase(selectedShape.defaultBase || 8);
    setCalcHeight(selectedShape.defaultHeight || 5);
    setCalcSmallBase(selectedShape.defaultSmallBase || 4);
    setCalcApothem(selectedShape.defaultApothem || 4.5);
    setCalcRadius(selectedShape.defaultRadius || 5);
  }, [selectedShapeId]);

  // Drawing Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#38bdf8'); // Sky blue
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [gridMode, setGridMode] = useState<'grid' | 'dots' | 'chalkboard' | 'white'>('grid');
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [activeChallengeId, setActiveChallengeId] = useState<number>(1);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Colors available for student
  const COLORS = [
    { name: 'Cian Brillante', hex: '#38bdf8' },
    { name: 'Amarillo Sol', hex: '#facc15' },
    { name: 'Esmeralda', hex: '#10b981' },
    { name: 'Rosa Mágico', hex: '#f43f5e' },
    { name: 'Púrpura Neón', hex: '#a855f7' },
    { name: 'Naranja Vivo', hex: '#fb923c' },
    { name: 'Blanco Tiza', hex: '#ffffff' },
    { name: 'Azul Marino', hex: '#2563eb' }
  ];

  // Helper to show notification
  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Redraw Canvas Background (Grid / Dots / Chalkboard / White)
  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, mode: 'grid' | 'dots' | 'chalkboard' | 'white') => {
    ctx.save();
    if (mode === 'chalkboard') {
      ctx.fillStyle = '#062c1d'; // Dark school green blackboard
      ctx.fillRect(0, 0, width, height);
      // subtle chalk dust texture
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (mode === 'white') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    } else if (mode === 'dots') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
      for (let x = 20; x < width; x += 25) {
        for (let y = 20; y < height; y += 25) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else {
      // Millimeter school grid on dark slate
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Fine grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Major grid (every 60px)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-res pixel ratio
    const width = canvas.parentElement?.clientWidth || 700;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    drawBackground(ctx, width, height, gridMode);
    // save base state in undo stack
    setUndoStack([ctx.getImageData(0, 0, width, height)]);
  }, [gridMode]);

  // Save current canvas snapshot to undo stack
  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev.slice(-15), snapshot]);
  };

  // Undo last stroke
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length <= 1) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newStack = [...undoStack];
    newStack.pop(); // Remove current
    const previousState = newStack[newStack.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setUndoStack(newStack);
    triggerToast('↩️ Trazo deshecho');
  };

  // Clear canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBackground(ctx, canvas.width, canvas.height, gridMode);
    setUndoStack([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    triggerToast('🧹 Pizarra limpia lista para trazar');
  };

  // Download Canvas Drawing as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `dibujo-geometria-6to-grado-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    triggerToast('💾 ¡Dibujo guardado con éxito!');
  };

  // Canvas Drawing Handlers (Mouse & Touch)
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = isEraser ? brushSize * 4 : brushSize;
    ctx.strokeStyle = isEraser 
      ? (gridMode === 'chalkboard' ? '#062c1d' : gridMode === 'white' ? '#ffffff' : '#090d16')
      : brushColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveSnapshot();
    }
  };

  // Stamp / Draw a geometric shape template in the center of the canvas
  const stampShapeTemplate = (shape: PolygonInfo) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveSnapshot();

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.28;

    ctx.save();
    ctx.strokeStyle = brushColor;
    ctx.fillStyle = `${brushColor}15`; // 10% opacity fill
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (shape.id === 'circulo') {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Center point
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Radio line
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Text labels
      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Centro', cx - 20, cy - 10);
      ctx.fillText(`Radio (r = ${radius.toFixed(0)}px)`, cx + 20, cy - 8);
    } else if (shape.id === 'rectangulo') {
      const w = radius * 2.2;
      const h = radius * 1.3;
      ctx.beginPath();
      ctx.rect(cx - w / 2, cy - h / 2, w, h);
      ctx.fill();
      ctx.stroke();

      // Right angle indicator in corner
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - w / 2, cy - h / 2, 14, 14);

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#facc15';
      ctx.fillText('Base (b)', cx - 20, cy + h / 2 + 18);
      ctx.fillText('Altura (h)', cx + w / 2 + 10, cy + 4);
    } else if (shape.id === 'cuadrado') {
      const s = radius * 1.6;
      ctx.beginPath();
      ctx.rect(cx - s / 2, cy - s / 2, s, s);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#facc15';
      ctx.fillText('Lado (l)', cx - 18, cy + s / 2 + 18);
    } else if (shape.id === 'triangulo_rectangulo') {
      const w = radius * 1.8;
      const h = radius * 1.5;
      const x0 = cx - w / 2;
      const y0 = cy + h / 2;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0 + w, y0);
      ctx.lineTo(x0, y0 - h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right angle square
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.strokeRect(x0, y0 - 15, 15, 15);

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Cateto 1 (base)', cx - 30, y0 + 18);
      ctx.fillText('Cateto 2 (altura)', x0 - 95, cy);
      ctx.fillStyle = '#facc15';
      ctx.fillText('Hipotenusa', cx + 10, cy - 20);
    } else if (shape.id === 'trapecio') {
      const bigBase = radius * 2.2;
      const smallBase = radius * 1.2;
      const h = radius * 1.4;
      const xTopLeft = cx - smallBase / 2;
      const xTopRight = cx + smallBase / 2;
      const xBottomLeft = cx - bigBase / 2;
      const xBottomRight = cx + bigBase / 2;
      const yTop = cy - h / 2;
      const yBottom = cy + h / 2;

      ctx.beginPath();
      ctx.moveTo(xBottomLeft, yBottom);
      ctx.lineTo(xBottomRight, yBottom);
      ctx.lineTo(xTopRight, yTop);
      ctx.lineTo(xTopLeft, yTop);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Height dashed line
      ctx.strokeStyle = '#f43f5e';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(xTopLeft, yTop);
      ctx.lineTo(xTopLeft, yBottom);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Base Menor (b)', cx - 35, yTop - 10);
      ctx.fillText('Base Mayor (B)', cx - 35, yBottom + 20);
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('Altura (h)', xTopLeft - 55, cy);
    } else {
      // Regular Polygons (Equilateral Triangle, Pentagon, Hexagon, Heptagon, Octagon, etc.)
      const n = shape.sides;
      const angleStep = (Math.PI * 2) / n;
      const startAngle = -Math.PI / 2; // top vertex aligned

      ctx.beginPath();
      const vertices: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const angle = startAngle + i * angleStep;
        const vx = cx + radius * Math.cos(angle);
        const vy = cy + radius * Math.sin(angle);
        vertices.push({ x: vx, y: vy });
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center point
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Apothem line for polygons with 5 or more sides
      if (n >= 4) {
        // midpoint of bottom side
        const p1 = vertices[Math.floor(n / 2)];
        const p2 = vertices[(Math.floor(n / 2) + 1) % n];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(midX, midY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#f43f5e';
        ctx.fillText('Apotema (ap)', midX - 30, (cy + midY) / 2);
      }

      // Label vertices numbers
      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = '#ffffff';
      vertices.forEach((v, idx) => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`${idx + 1}`, v.x - 3, v.y + 4);
      });
    }

    ctx.restore();
    saveSnapshot();
    triggerToast(`✨ Plantilla de ${shape.name} trazada en la pizarra`);
  };

  // Complete Challenge Handler
  const handleVerifyChallenge = (challenge: DrawingChallenge) => {
    if (!completedChallenges.includes(challenge.id)) {
      setCompletedChallenges(prev => [...prev, challenge.id]);
      if (onAddXp) {
        onAddXp(challenge.xpReward, `Reto de Geometría: ${challenge.title}`);
      }
      triggerToast(`🎉 ¡Reto #${challenge.id} completado! Ganaste +${challenge.xpReward} XP y la felicitación de Einstein`);
    } else {
      triggerToast(`👍 Ya habías acreditado este reto. ¡Sigue practicando!`);
    }
  };

  // Audio Speech for Einstein explanation
  const speakEinstein = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      triggerToast('🔊 Profesor Einstein explicando en voz alta...');
    } else {
      triggerToast('⚠️ Tu navegador no soporta síntesis de voz.');
    }
  };

  // Dynamic calculations for the chosen shape in Calculator tab
  const getDynamicCalculations = () => {
    if (selectedShape.id === 'circulo') {
      const r = calcRadius;
      const d = 2 * r;
      const perimeter = 2 * 3.1416 * r;
      const area = 3.1416 * r * r;
      return {
        perimeter: `${perimeter.toFixed(2)} cm`,
        area: `${area.toFixed(2)} cm²`,
        extraLabel1: 'Diámetro (2 × r)',
        extraValue1: `${d.toFixed(1)} cm`,
        extraLabel2: 'Constante π utilizada',
        extraValue2: '3.1416 (MEP)',
        steps: [
          `Paso 1: Diámetro = 2 × radio = 2 × ${r} = ${d} cm`,
          `Paso 2: Circunferencia (Perímetro) = 2 × π × r = 2 × 3.1416 × ${r} = ${perimeter.toFixed(2)} cm`,
          `Paso 3: Área = π × r² = 3.1416 × (${r})² = 3.1416 × ${(r * r).toFixed(1)} = ${area.toFixed(2)} cm²`
        ]
      };
    } else if (selectedShape.id === 'rectangulo') {
      const b = calcBase;
      const h = calcHeight;
      const perimeter = 2 * b + 2 * h;
      const area = b * h;
      return {
        perimeter: `${perimeter.toFixed(1)} cm`,
        area: `${area.toFixed(1)} cm²`,
        extraLabel1: 'Ángulos internos',
        extraValue1: '4 rectos (4 × 90° = 360°)',
        extraLabel2: 'Diagonales totales',
        extraValue2: '2 cruzadas',
        steps: [
          `Paso 1: Perímetro = 2b + 2h = 2(${b}) + 2(${h}) = ${(2 * b).toFixed(1)} + ${(2 * h).toFixed(1)} = ${perimeter.toFixed(1)} cm`,
          `Paso 2: Área = base × altura = ${b} × ${h} = ${area.toFixed(1)} cm²`
        ]
      };
    } else if (selectedShape.id === 'cuadrado') {
      const l = calcSide;
      const perimeter = 4 * l;
      const area = l * l;
      return {
        perimeter: `${perimeter.toFixed(1)} cm`,
        area: `${area.toFixed(1)} cm²`,
        extraLabel1: 'Ángulos internos',
        extraValue1: '4 × 90° = 360°',
        extraLabel2: 'Diagonales',
        extraValue2: '2 perpendiculares',
        steps: [
          `Paso 1: Perímetro = 4 × lado = 4 × ${l} = ${perimeter.toFixed(1)} cm`,
          `Paso 2: Área = lado² = ${l} × ${l} = ${area.toFixed(1)} cm²`
        ]
      };
    } else if (selectedShape.id === 'triangulo_equilatero' || selectedShape.id === 'triangulo_rectangulo' || selectedShape.id === 'triangulo_isosceles' || selectedShape.id === 'triangulo_escaleno') {
      const b = calcBase || calcSide;
      const h = calcHeight;
      const perimeter = 3 * b;
      const area = (b * h) / 2;
      return {
        perimeter: `Aprox. ${perimeter.toFixed(1)} cm`,
        area: `${area.toFixed(1)} cm²`,
        extraLabel1: 'Suma de ángulos internos',
        extraValue1: '180° exactos (Regla MEP)',
        extraLabel2: 'Fórmula de Área',
        extraValue2: '(base × altura) / 2',
        steps: [
          `Paso 1: Identificar base = ${b} cm y altura perpendicular = ${h} cm`,
          `Paso 2: Multiplicar base × altura = ${b} × ${h} = ${(b * h).toFixed(1)}`,
          `Paso 3: Dividir entre 2 = ${(b * h).toFixed(1)} ÷ 2 = ${area.toFixed(1)} cm²`
        ]
      };
    } else if (selectedShape.id === 'trapecio') {
      const B = calcBase;
      const b = calcSmallBase;
      const h = calcHeight;
      const perimeter = B + b + 2 * Math.sqrt(Math.pow((B - b) / 2, 2) + h * h);
      const area = ((B + b) * h) / 2;
      return {
        perimeter: `Aprox. ${perimeter.toFixed(1)} cm`,
        area: `${area.toFixed(1)} cm²`,
        extraLabel1: 'Semisuma de bases',
        extraValue1: `(B + b)/2 = ${((B + b) / 2).toFixed(1)} cm`,
        extraLabel2: 'Suma de ángulos',
        extraValue2: '360°',
        steps: [
          `Paso 1: Sumar Base Mayor + Base Menor = ${B} + ${b} = ${(B + b).toFixed(1)} cm`,
          `Paso 2: Multiplicar la suma por la altura = ${(B + b).toFixed(1)} × ${h} = ${((B + b) * h).toFixed(1)}`,
          `Paso 3: Dividir entre 2 = ${((B + b) * h).toFixed(1)} ÷ 2 = ${area.toFixed(1)} cm²`
        ]
      };
    } else {
      // General Regular Polygons (Pentagon, Hexagon, Heptagon, Octagon, etc.)
      const n = selectedShape.sides;
      const l = calcSide;
      const ap = calcApothem;
      const perimeter = n * l;
      const area = (perimeter * ap) / 2;
      const sumAngles = (n - 2) * 180;
      const oneAngle = sumAngles / n;
      const diagTotal = (n * (n - 3)) / 2;

      return {
        perimeter: `${perimeter.toFixed(1)} cm`,
        area: `${area.toFixed(1)} cm²`,
        extraLabel1: `Suma de ángulos (${n} lados)`,
        extraValue1: `(${n} - 2) × 180° = ${sumAngles}°`,
        extraLabel2: 'Diagonales totales',
        extraValue2: `[${n} × (${n} - 3)] / 2 = ${diagTotal}`,
        steps: [
          `Paso 1: Perímetro = número de lados × longitud = ${n} × ${l} = ${perimeter.toFixed(1)} cm`,
          `Paso 2: Multiplicar Perímetro por la Apotema = ${perimeter.toFixed(1)} × ${ap} = ${(perimeter * ap).toFixed(1)}`,
          `Paso 3: Dividir entre 2 = ${(perimeter * ap).toFixed(1)} ÷ 2 = ${area.toFixed(1)} cm²`,
          `Paso 4: Cada ángulo interno mide ${sumAngles}° ÷ ${n} = ${oneAngle.toFixed(2)}°`
        ]
      };
    }
  };

  const dynamicCalc = getDynamicCalculations();

  return (
    <div className="space-y-6">
      {/* Feedback Toast */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border-2 border-amber-500/80 text-amber-300 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold font-mono">{feedbackToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
              📐 TEMA OFICIAL 5 • 6TO GRADO MEP
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
              <span>Figuras Geométricas, Polígonos & Pizarra de Trazo</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Explora triángulos, cuadrados, rectángulos, trapecios, círculos y todos los polígonos regulares (pentágonos, hexágonos, <strong>heptágonos de 7 lados</strong>, octágonos). ¡Aprende sus fórmulas y usa la pizarra para trazar y dibujar libremente!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const text = `¡Hola! En geometría de 6to grado aprenderás todos los polígonos: desde el triángulo de 3 lados hasta el heptágono de 7 lados y el círculo. Recuerda que el área de todo polígono regular es perímetro por apotema dividido entre dos. ¡Usa la pizarra para trazar tus figuras libremente!`;
                speakEinstein(text);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Escuchar a Einstein</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'canvas'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Pencil className="w-4 h-4" />
            <span>🎨 Pizarra de Trazo Libre</span>
          </button>

          <button
            onClick={() => setActiveTab('catalogo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'catalogo'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-black'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Shapes className="w-4 h-4" />
            <span>📚 Catálogo de Todas las Figuras</span>
          </button>

          <button
            onClick={() => setActiveTab('calculadora')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'calculadora'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 font-black'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>⚡ Calculadora & Simulador 3D</span>
          </button>

          <button
            onClick={() => setActiveTab('retos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'retos'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 font-black'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>🏆 Retos y Prácticas de Trazo ({completedChallenges.length}/{DRAWING_CHALLENGES.length})</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          TAB 1: PIZARRA DE TRAZO LIBRE Y DIBUJO CREATIVO (CANVAS)
          ========================================================= */}
      {activeTab === 'canvas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Stamp shapes quickly */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                  <Shapes className="w-4 h-4" />
                  <span>Estampar Plantilla Guía</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">1-Clic</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Elige una figura geométrica para dibujarla nítida en el centro del lienzo con cotas y vértices:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {ALL_GEOMETRIC_SHAPES.slice(0, 8).map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => stampShapeTemplate(shape)}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700/60 text-left text-xs text-slate-200 hover:text-cyan-300 transition-all flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-black text-[11px] group-hover:scale-110 transition-transform">
                      {shape.sides === 0 ? '○' : shape.sides}
                    </span>
                    <span className="font-bold truncate text-[11px]">{shape.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Extra Heptagon & Octagon button highlight */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => stampShapeTemplate(ALL_GEOMETRIC_SHAPES.find(s => s.id === 'heptagono')!)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-950 to-indigo-950 border border-purple-500/40 hover:border-purple-400 text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>⭐ Estampar Heptágono (7 Lados)</span>
                </button>
              </div>
            </div>

            {/* Brush & Colors Control */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
                Herramientas del Pincel
              </span>

              {/* Color Palette */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400 font-bold block">Paleta de Colores:</label>
                <div className="grid grid-cols-4 gap-2">
                  {COLORS.map(c => (
                    <button
                      key={c.hex}
                      onClick={() => {
                        setBrushColor(c.hex);
                        setIsEraser(false);
                      }}
                      style={{ backgroundColor: c.hex }}
                      className={`h-8 rounded-xl transition-all cursor-pointer relative shadow-md ${
                        brushColor === c.hex && !isEraser
                          ? 'ring-2 ring-white scale-105'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Brush Size */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-bold">Grosor de Trazo:</span>
                  <span className="text-cyan-400 font-mono font-bold">{brushSize}px</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 8, 14].map(size => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        brushSize === size
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-slate-950 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {size === 2 ? 'Fino' : size === 4 ? 'Normal' : size === 8 ? 'Marcador' : 'Brocha'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eraser and Canvas Background Selector */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEraser(!isEraser)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isEraser
                        ? 'bg-rose-600 text-white font-black shadow-lg shadow-rose-600/30'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <Eraser className="w-4 h-4" />
                    <span>{isEraser ? 'Borrador Activado' : 'Goma de Borrar'}</span>
                  </button>

                  <button
                    onClick={handleUndo}
                    disabled={undoStack.length <= 1}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 disabled:opacity-40 transition-all cursor-pointer"
                    title="Deshacer trazo"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleClear}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40 text-rose-400 transition-all cursor-pointer"
                    title="Limpiar pizarra"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono block">Fondo de la Pizarra:</label>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                    <button
                      onClick={() => setGridMode('grid')}
                      className={`p-1.5 rounded-lg border text-center cursor-pointer transition-all ${
                        gridMode === 'grid'
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      📐 Milimetrado
                    </button>
                    <button
                      onClick={() => setGridMode('chalkboard')}
                      className={`p-1.5 rounded-lg border text-center cursor-pointer transition-all ${
                        gridMode === 'chalkboard'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      🏫 Pizarra Verde
                    </button>
                    <button
                      onClick={() => setGridMode('dots')}
                      className={`p-1.5 rounded-lg border text-center cursor-pointer transition-all ${
                        gridMode === 'dots'
                          ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      ⚬ Punteado
                    </button>
                    <button
                      onClick={() => setGridMode('white')}
                      className={`p-1.5 rounded-lg border text-center cursor-pointer transition-all ${
                        gridMode === 'white'
                          ? 'bg-slate-200 border-white text-slate-950 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      📄 Papel Blanco
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Workspace */}
          <div className="lg:col-span-8 space-y-3">
            <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-200 font-bold">
                    Pizarra Digital Interactiva de Trazo Libre
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Guardar Dibujo (PNG)</span>
                  </button>
                </div>
              </div>

              {/* Canvas element */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-inner bg-slate-950 touch-none">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full cursor-crosshair block"
                  style={{ height: '480px' }}
                />

                {/* Floating tip inside canvas */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 pointer-events-none">
                  ✏️ Traza a mano alzada o estampa figuras desde el panel izquierdo
                </div>
              </div>

              {/* Instruction banner for daughter */}
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>
                    <strong>Consejo para el examen MEP:</strong> Al dibujar figuras con regla, cuenta las líneas de la cuadrícula para medir lados iguales y trazar la apotema perpendicular desde el centro.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('retos')}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-mono font-bold text-[11px] whitespace-nowrap transition-all"
                >
                  Ir a los Retos ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: CATÁLOGO COMPLETO DE TODAS LAS FIGURAS GEOMÉTRICAS
          ========================================================= */}
      {activeTab === 'catalogo' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
              Explorador de Figuras Geométricas de 6to Grado (MEP)
            </span>
            <p className="text-xs text-slate-300">
              Haz clic en cualquier figura para estudiar sus propiedades, fórmulas de área y perímetro, apotema y número de diagonales:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {ALL_GEOMETRIC_SHAPES.map(shape => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShapeId(shape.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedShapeId === shape.id
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[10px] font-mono font-black">
                    {shape.sides === 0 ? '○' : shape.sides}
                  </span>
                  <span>{shape.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Shape Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual vector preview */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800/40">
                    {selectedShape.category === 'triangulo'
                      ? 'TRIÁNGULO (3 LADOS)'
                      : selectedShape.category === 'cuadrilatero'
                      ? 'CUADRILÁTERO (4 LADOS)'
                      : selectedShape.category === 'circulo'
                      ? 'CÍRCULO Y CIRCUNFERENCIA'
                      : `POLÍGONO REGULAR (${selectedShape.sides} LADOS)`}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    {selectedShape.sides > 0 ? `${selectedShape.sides} Vértices` : 'Radio r'}
                  </span>
                </div>

                <h4 className="text-2xl font-black text-white">
                  {selectedShape.name}
                </h4>
                {selectedShape.alternateName && (
                  <span className="text-xs text-amber-400 font-mono block">
                    {selectedShape.alternateName}
                  </span>
                )}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedShape.description}
                </p>
              </div>

              {/* Dynamic SVG Vector representation */}
              <div className="w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
                {selectedShape.id === 'circulo' ? (
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="70" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="100" y1="100" x2="170" y2="100" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4,4" />
                    <circle cx="100" cy="100" r="4" fill="#facc15" />
                    <text x="125" y="92" fill="#facc15" fontSize="12" fontWeight="bold">Radio (r)</text>
                    <text x="75" y="115" fill="#ffffff" fontSize="10">Centro</text>
                  </svg>
                ) : selectedShape.id === 'rectangulo' ? (
                  <svg className="w-56 h-40" viewBox="0 0 220 160">
                    <rect x="20" y="30" width="180" height="100" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="20" y1="30" x2="200" y2="130" stroke="rgba(244, 63, 94, 0.6)" strokeWidth="2" strokeDasharray="4,4" />
                    <text x="95" y="148" fill="#facc15" fontSize="12" fontWeight="bold">Base (b)</text>
                    <text x="5" y="85" fill="#f43f5e" fontSize="12" fontWeight="bold" transform="rotate(-90 12,85)">Altura (h)</text>
                  </svg>
                ) : selectedShape.id === 'cuadrado' ? (
                  <svg className="w-44 h-44" viewBox="0 0 180 180">
                    <rect x="25" y="25" width="130" height="130" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="25" y1="25" x2="155" y2="155" stroke="rgba(244, 63, 94, 0.6)" strokeWidth="2" strokeDasharray="4,4" />
                    <line x1="155" y1="25" x2="25" y2="155" stroke="rgba(244, 63, 94, 0.6)" strokeWidth="2" strokeDasharray="4,4" />
                    <text x="70" y="172" fill="#facc15" fontSize="12" fontWeight="bold">Lado (l)</text>
                  </svg>
                ) : (
                  // Polygon generator SVG
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    {(() => {
                      const n = selectedShape.sides;
                      const cx = 100;
                      const cy = 100;
                      const r = 75;
                      const points = [];
                      for (let i = 0; i < n; i++) {
                        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
                        points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
                      }
                      return (
                        <>
                          <polygon points={points.join(' ')} fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="3" />
                          <circle cx={cx} cy={cy} r="4" fill="#facc15" />
                          {/* Apothem line */}
                          {n >= 4 && (
                            <line
                              x1={cx}
                              y1={cy}
                              x2={cx}
                              y2={cy + r * Math.cos(Math.PI / n)}
                              stroke="#f43f5e"
                              strokeWidth="2.5"
                              strokeDasharray="3,3"
                            />
                          )}
                          <text x={cx + 6} y={cy + (r * Math.cos(Math.PI / n)) / 2} fill="#f43f5e" fontSize="10" fontWeight="bold">
                            ap
                          </text>
                        </>
                      );
                    })()}
                  </svg>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    stampShapeTemplate(selectedShape);
                    setActiveTab('canvas');
                  }}
                  className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-600/20"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Llevar a la Pizarra para Trazar</span>
                </button>
              </div>
            </div>

            {/* Properties and formulas table */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h5 className="text-sm font-mono uppercase text-amber-400 font-bold flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  <span>Fórmulas y Propiedades de {selectedShape.name}</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-mono block">Fórmula de Perímetro (P):</span>
                    <strong className="text-emerald-400 font-mono text-sm block">{selectedShape.perimeterFormula}</strong>
                    <span className="text-[11px] text-slate-500">Suma de las longitudes de todos sus lados.</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-mono block">Fórmula de Área (A):</span>
                    <strong className="text-cyan-400 font-mono text-sm block">{selectedShape.areaFormula}</strong>
                    <span className="text-[11px] text-slate-500">Superficie interior de la figura.</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-mono block">Suma de Ángulos Internos:</span>
                    <strong className="text-amber-300 font-mono text-sm block">
                      {typeof selectedShape.internalAnglesSum === 'number'
                        ? `${selectedShape.internalAnglesSum}°`
                        : selectedShape.internalAnglesSum}
                    </strong>
                    <span className="text-[11px] text-slate-500">Fórmula: (n - 2) × 180°</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-mono block">Diagonales Totales:</span>
                    <strong className="text-purple-400 font-mono text-sm block">
                      {selectedShape.totalDiagonals} diagonales
                    </strong>
                    <span className="text-[11px] text-slate-500">Fórmula: [n × (n - 3)] / 2</span>
                  </div>
                </div>

                {/* Einstein MEP Tip */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-950 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span>👨‍🏫 Consejo de Albert Einstein para el Examen MEP:</span>
                    </span>
                    <button
                      onClick={() => speakEinstein(selectedShape.mepGradeTip)}
                      className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-all"
                      title="Escuchar consejo"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    «{selectedShape.mepGradeTip}»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: CALCULADORA Y SIMULADOR GEOMÉTRICO DINÁMICO
          ========================================================= */}
      {activeTab === 'calculadora' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>Simulador de Medidas Dinámicas</span>
              </span>
              <select
                value={selectedShapeId}
                onChange={(e) => setSelectedShapeId(e.target.value)}
                className="p-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono font-bold text-amber-400"
              >
                {ALL_GEOMETRIC_SHAPES.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <p className="text-xs text-slate-300">
              Ajusta las medidas de <strong>{selectedShape.name}</strong> para ver cómo cambian el perímetro y el área en tiempo real:
            </p>

            {/* Inputs based on shape type */}
            <div className="space-y-4 text-xs">
              {selectedShape.id === 'circulo' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-bold">Radio (r):</label>
                    <span className="text-cyan-400 font-mono font-bold">{calcRadius} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={calcRadius}
                    onChange={(e) => setCalcRadius(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              ) : selectedShape.id === 'rectangulo' ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-bold">Base (b):</label>
                      <span className="text-cyan-400 font-mono font-bold">{calcBase} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="30"
                      step="1"
                      value={calcBase}
                      onChange={(e) => setCalcBase(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-bold">Altura (h):</label>
                      <span className="text-emerald-400 font-mono font-bold">{calcHeight} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="25"
                      step="1"
                      value={calcHeight}
                      onChange={(e) => setCalcHeight(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </>
              ) : selectedShape.id === 'trapecio' ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-bold">Base Mayor (B):</label>
                      <span className="text-cyan-400 font-mono font-bold">{calcBase} cm</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="30"
                      value={calcBase}
                      onChange={(e) => setCalcBase(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-bold">Base Menor (b):</label>
                      <span className="text-amber-400 font-mono font-bold">{calcSmallBase} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max={calcBase - 1}
                      value={calcSmallBase}
                      onChange={(e) => setCalcSmallBase(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-bold">Altura (h):</label>
                      <span className="text-rose-400 font-mono font-bold">{calcHeight} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={calcHeight}
                      onChange={(e) => setCalcHeight(parseFloat(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>
                </>
              ) : (
                // Regular Polygons & Triangles
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-bold">Longitud de cada lado (l):</label>
                      <span className="text-cyan-400 font-mono font-bold">{calcSide} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="25"
                      step="0.5"
                      value={calcSide}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setCalcSide(val);
                        // approximate apothem update
                        if (selectedShape.sides >= 5) {
                          const ap = val / (2 * Math.tan(Math.PI / selectedShape.sides));
                          setCalcApothem(parseFloat(ap.toFixed(2)));
                        }
                      }}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  {selectedShape.sides >= 5 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-300 font-bold">Apotema (ap):</label>
                        <span className="text-rose-400 font-mono font-bold">{calcApothem} cm</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="0.1"
                        value={calcApothem}
                        onChange={(e) => setCalcApothem(parseFloat(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  )}

                  {selectedShape.category === 'triangulo' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-300 font-bold">Altura (h):</label>
                        <span className="text-emerald-400 font-mono font-bold">{calcHeight} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="25"
                        step="0.5"
                        value={calcHeight}
                        onChange={(e) => setCalcHeight(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Real-time calculated results */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Resultados Calculados en Vivo</span>
                </h5>
                <span className="text-xs font-mono text-slate-400">Unidades: cm y cm²</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-slate-950 border border-emerald-500/40 space-y-1">
                  <span className="text-xs text-slate-400 font-mono">Perímetro Total:</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    {dynamicCalc.perimeter}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/50 to-slate-950 border border-cyan-500/40 space-y-1">
                  <span className="text-xs text-slate-400 font-mono">Área Superficial:</span>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                    {dynamicCalc.area}
                  </div>
                </div>
              </div>

              {/* Extra properties */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{dynamicCalc.extraLabel1}:</span>
                  <strong className="text-amber-300 font-mono text-xs">{dynamicCalc.extraValue1}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{dynamicCalc.extraLabel2}:</span>
                  <strong className="text-purple-300 font-mono text-xs">{dynamicCalc.extraValue2}</strong>
                </div>
              </div>

              {/* Step by step mathematical reasoning */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <span className="text-amber-400 font-bold block text-xs">Desglose Paso a Paso:</span>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  {dynamicCalc.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: RETOS Y PRÁCTICAS DE TRAZO GUIADAS (6TO GRADO)
          ========================================================= */}
      {activeTab === 'retos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Laboratorio de Prácticas & Retos Escolares</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">
                {completedChallenges.length} de {DRAWING_CHALLENGES.length} Retos Superados
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Completa cada reto de trazo geométrico para ganar Puntos de Experiencia (XP) y desbloquear la Medalla Oficial de Geometría escolar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DRAWING_CHALLENGES.map(challenge => {
              const isCompleted = completedChallenges.includes(challenge.id);
              const targetShape = ALL_GEOMETRIC_SHAPES.find(s => s.id === challenge.shapeId);

              return (
                <div
                  key={challenge.id}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xl ${
                    isCompleted
                      ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/50'
                      : 'bg-slate-900/90 border-slate-800 hover:border-purple-500/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/40">
                        +{challenge.xpReward} PUNTOS XP
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>¡Completado!</span>
                        </span>
                      )}
                    </div>

                    <h5 className="text-base font-bold text-white">
                      {challenge.title}
                    </h5>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {challenge.instruction}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                      <strong className="text-cyan-300 block">Pregunta Clave:</strong>
                      <p className="text-slate-300">{challenge.question}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        if (targetShape) {
                          stampShapeTemplate(targetShape);
                          setActiveTab('canvas');
                          triggerToast(`✏️ Plantilla cargada. ¡Traza lo solicitado en el reto #${challenge.id}!`);
                        }
                      }}
                      className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Ir a Pizarra & Trazar</span>
                    </button>

                    <button
                      onClick={() => handleVerifyChallenge(challenge)}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        isCompleted
                          ? 'bg-slate-800 text-slate-400 cursor-default'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black shadow-lg shadow-purple-600/20'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isCompleted ? 'Acreditado con Éxito' : '¡Listo, Calificar con Einstein!'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
