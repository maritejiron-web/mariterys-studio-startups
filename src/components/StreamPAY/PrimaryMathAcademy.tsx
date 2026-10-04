import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Calculator,
  CheckCircle2,
  XCircle,
  Award,
  Trophy,
  Crown,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Layers,
  Ruler,
  CircleDot,
  Coins,
  PieChart,
  TrendingUp,
  BarChart2,
  Compass,
  Lightbulb,
  Scale,
  Shapes,
  Volume2,
  MessageSquare,
  Printer,
  Flame,
  Zap,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { AlbertEinsteinTutor } from './AlbertEinsteinTutor';
import { StudentMedalsHonor, OFFICIAL_MEDALS } from './StudentMedalsHonor';
import { GeometryStudio } from './GeometryStudio';

export type MathSubTopic =
  | 'einstein'
  | 'medallas'
  | 'fracciones'
  | 'naturales'
  | 'metrico'
  | 'conversion_recta'
  | 'geometria'
  | 'negocios_monedas'
  | 'relaciones'
  | 'estadistica_prob'
  | 'simulador';

interface ExamQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  einsteinStep: string;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    topic: 'Representación de Fracciones',
    question: '¿Cuál de las siguientes fracciones es impropia y cómo se expresa como número mixto?',
    options: [
      '3/5 no se puede convertir porque es menor que 1',
      '7/4 es impropia y equivale a 1 3/4',
      '4/7 es impropia y equivale a 2 1/4',
      '8/8 es impropia y equivale a 2 enteros'
    ],
    correctIndex: 1,
    explanation: 'Una fracción impropia tiene el numerador mayor que el denominador (7 > 4). Al dividir 7 entre 4 obtenemos cociente 1 y residuo 3, por lo que 7/4 = 1 3/4.',
    einsteinStep: '👨‍🏫 Einstein te explica: "Imagina que compras pizzas partidas en 4 partes. Si tienes 7 pedazos, puedes armar 1 pizza completa de 4 pedazos y todavía te sobran 3 pedazos. Por eso es 1 entero con 3/4 (1 3/4). ¡Elemental!"'
  },
  {
    id: 2,
    topic: 'Sistema Métrico Nacional',
    question: 'En una competencia escolar, Lucía corrió 2.5 kilómetros y luego caminó 850 metros. ¿Cuántos metros recorrió en total?',
    options: [
      '2,585 metros',
      '3,350 metros',
      '1,100 metros',
      '33,500 metros'
    ],
    correctIndex: 1,
    explanation: 'Primero convertimos los kilómetros a metros: 2.5 km × 1,000 = 2,500 m. Luego sumamos: 2,500 m + 850 m = 3,350 metros.',
    einsteinStep: '👨‍🏫 Einstein te explica: "Paso 1: Recuerda que Kilo significa 1,000. Así que 2.5 km son 2,500 metros. Paso 2: Sumas los 850 metros que caminó: 2,500 + 850 = 3,350 metros."'
  },
  {
    id: 3,
    topic: 'Geometría: Área y Perímetro',
    question: 'Un parque infantil rectangular tiene 18 metros de largo y 12 metros de ancho. ¿Cuál es su perímetro y su área?',
    options: [
      'Perímetro: 30 m | Área: 216 m²',
      'Perímetro: 60 m | Área: 216 m²',
      'Perímetro: 60 m | Área: 108 m²',
      'Perímetro: 48 m | Área: 300 m²'
    ],
    correctIndex: 1,
    explanation: 'Perímetro: 2×(largo + ancho) = 2×(18 + 12) = 2×30 = 60 metros. Área: largo × ancho = 18 × 12 = 216 m².',
    einsteinStep: '👨‍🏫 Einstein te explica: "Paso 1: El perímetro es la cerca que rodea todo el parque: 18 + 18 + 12 + 12 = 60 m. Paso 2: El área es el pasto que cubre el suelo: 18 × 12 = 216 m²."'
  },
  {
    id: 4,
    topic: 'Conversión Decimal y Fracción',
    question: 'El profesor escribió el número decimal 0.75 en la pizarra. ¿A cuál fracción irreducible corresponde?',
    options: [
      '7/5',
      '75/10',
      '3/4',
      '1/2'
    ],
    correctIndex: 2,
    explanation: '0.75 se lee "75 centésimas" = 75/100. Simplificando entre 25 en numerador y denominador: (75÷25) / (100÷25) = 3/4.',
    einsteinStep: '👨‍🏫 Einstein te explica: "Escribe 75/100. Ahora divide arriba y abajo entre 25: 75 ÷ 25 = 3, y 100 ÷ 25 = 4. ¡Queda 3/4! Tres cuartos es el 75%."'
  },
  {
    id: 5,
    topic: 'Geometría: Círculo (π = 3.14)',
    question: 'Una glorieta circular tiene un radio de 5 metros. Utilizando π ≈ 3.14, ¿cuál es el área aproximada de la glorieta?',
    options: [
      '31.4 m²',
      '78.5 m²',
      '15.7 m²',
      '100 m²'
    ],
    correctIndex: 1,
    explanation: 'Fórmula del área del círculo: A = π × r². Calculamos: r² = 5 × 5 = 25. Luego: 3.14 × 25 = 78.5 m².',
    einsteinStep: '👨‍🏫 Einstein te explica: "¡Atención con el radio al cuadrado! r² significa 5 × 5 = 25. Ahora multiplicas 3.14 × 25 = 78.5 metros cuadrados."'
  },
  {
    id: 6,
    topic: 'Sistema Monetario de Negocios',
    question: 'Un libro cuesta ₡8,000 colones. La librería ofrece un 25% de descuento por promoción escolar. ¿Cuánto se debe pagar por el libro?',
    options: [
      '₡2,000 colones',
      '₡6,000 colones',
      '₡5,500 colones',
      '₡7,200 colones'
    ],
    correctIndex: 1,
    explanation: 'El 25% de ₡8,000 es (8,000 × 25) ÷ 100 = ₡2,000 de descuento. Precio a pagar: 8,000 - 2,000 = ₡6,000 colones.',
    einsteinStep: '👨‍🏫 Einstein te explica: "El 25% es la cuarta parte de cualquier cosa. Divides ₡8,000 entre 4 = ₡2,000 de rebaja. Al precio original le quitas la rebaja: 8,000 - 2,000 = ₡6,000 a pagar."'
  },
  {
    id: 7,
    topic: 'Relaciones y Notación',
    question: 'Observa la secuencia: 4, 9, 14, 19, 24... ¿Cuál es la regla de formación y qué número ocupa la posición 8?',
    options: [
      'Suma 4 | Número en posición 8 es 32',
      'Suma 5 | Número en posición 8 es 39',
      'Multiplica por 2 | Número en posición 8 es 48',
      'Suma 5 | Número en posición 8 es 34'
    ],
    correctIndex: 1,
    explanation: 'La regla es sumar 5 a cada término (9-4=5, 14-9=5). Término 5=24, T6=29, T7=34, T8=39.',
    einsteinStep: '👨‍🏫 Einstein te explica: "Restamos dos números juntos: 9 - 4 = 5. Vemos que va de 5 en 5. Continuamos la serie: 24, 29, 34, 39. ¡El octavo número es 39!"'
  },
  {
    id: 8,
    topic: 'Estadística y Probabilidades',
    question: 'Las notas de Mariana en sus 5 exámenes de matemáticas fueron: 85, 90, 85, 100, 90. ¿Cuál es la moda y la media aritmética (promedio)?',
    options: [
      'Moda: 85 y 90 (bimodal) | Media: 90',
      'Moda: 100 | Media: 88',
      'Moda: 85 | Media: 85',
      'Moda: 90 | Media: 92'
    ],
    correctIndex: 0,
    explanation: 'Moda: Tanto 85 como 90 se repiten 2 veces (es bimodal). Media: (85+90+85+100+90) ÷ 5 = 450 ÷ 5 = 90.',
    einsteinStep: '👨‍🏫 Einstein te explica: "Paso 1: La moda es lo que está de moda (lo que más se repite). 85 y 90 se repiten dos veces cada uno. Paso 2: Sumas todas las notas (450) y divides entre los 5 exámenes = 90."'
  },
  {
    id: 9,
    topic: 'Estadística y Probabilidades',
    question: 'En una bolsa hay 4 bolas rojas, 3 azules y 5 verdes. Si sacas una bola sin mirar, ¿cuál es la probabilidad de que sea verde?',
    options: [
      '5/7',
      '5/12',
      '3/12',
      '1/5'
    ],
    correctIndex: 1,
    explanation: 'Total de casos posibles = 4 + 3 + 5 = 12 bolas. Casos favorables (bolas verdes) = 5. Por lo tanto, Probabilidad = 5/12.',
    einsteinStep: '👨‍🏫 Einstein te explica: "Paso 1: Cuenta todas las bolas en total: 4 + 3 + 5 = 12. Paso 2: Las que te sirven son las verdes (5). Por la ley de probabilidad: Casos a favor / Casos totales = 5/12."'
  },
  {
    id: 10,
    topic: 'Medidas Comerciales',
    question: 'En la feria del agricultor, 1 kilogramo de fresas cuesta ₡2,400 colones. Si don Manuel compra 750 gramos, ¿cuánto debe pagar?',
    options: [
      '₡1,200 colones',
      '₡1,800 colones',
      '₡2,000 colones',
      '₡1,600 colones'
    ],
    correctIndex: 1,
    explanation: '1 kg = 1,000 g. 750 g equivale a 3/4 de kilo (0.75 kg). Calculamos: 2,400 × 0.75 = ₡1,800 colones.',
    einsteinStep: '👨‍🏫 Einstein te explica: "Paso 1: 1 kilo tiene 1,000 gramos. Un cuarto de kilo (250 g) cuesta 2,400 ÷ 4 = ₡600. Como 750 g son tres cuartos (250 × 3), multiplicas 600 × 3 = ₡1,800 colones."'
  }
];

export const PrimaryMathAcademy: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<MathSubTopic>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sub = (params.get('subtopic') || params.get('tema') || '').toLowerCase();
      const hash = (window.location.hash || '').toLowerCase();
      if (sub === 'geometria' || sub === 'figuras' || sub === 'poligonos' || hash.includes('geometria') || hash.includes('figuras') || hash.includes('poligono')) {
        return 'geometria';
      }
      if (sub === 'medallas' || sub === 'premios' || hash.includes('medallas') || hash.includes('premios')) {
        return 'medallas';
      }
      if (sub === 'simulador' || sub === 'examen' || hash.includes('simulador') || hash.includes('examen')) {
        return 'simulador';
      }
      if (sub === 'fracciones' || hash.includes('fraccion')) {
        return 'fracciones';
      }
      if (sub === 'einstein' || hash.includes('einstein')) {
        return 'einstein';
      }
    }
    return 'einstein';
  });

  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  // Synchronize topic from URL if changed externally or via hash
  useEffect(() => {
    const handleUrlSync = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const sub = (params.get('subtopic') || params.get('tema') || '').toLowerCase();
      const hash = (window.location.hash || '').toLowerCase();
      if (sub === 'geometria' || sub === 'figuras' || sub === 'poligonos' || hash.includes('geometria') || hash.includes('figuras') || hash.includes('poligono')) {
        setActiveTopic('geometria');
      } else if (sub === 'medallas' || sub === 'premios' || hash.includes('medallas') || hash.includes('premios')) {
        setActiveTopic('medallas');
      } else if (sub === 'simulador' || sub === 'examen' || hash.includes('simulador') || hash.includes('examen')) {
        setActiveTopic('simulador');
      } else if (sub === 'einstein' || hash.includes('einstein')) {
        setActiveTopic('einstein');
      }
    };

    window.addEventListener('hashchange', handleUrlSync);
    window.addEventListener('popstate', handleUrlSync);
    return () => {
      window.removeEventListener('hashchange', handleUrlSync);
      window.removeEventListener('popstate', handleUrlSync);
    };
  }, []);

  const handleSelectTopic = (topic: MathSubTopic) => {
    setActiveTopic(topic);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('project', 'streampay');
      url.searchParams.set('tab', 'math');
      url.searchParams.set('subtopic', topic);
      window.history.replaceState({}, '', url.pathname + url.search + `#${topic}`);
    }
  };

  const handleCopyPublicLink = (customTopic?: string) => {
    if (typeof window === 'undefined') return;
    const targetTopic = customTopic || activeTopic;
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const directUrl = `${origin}${pathname}?project=streampay&tab=math&subtopic=${targetTopic}#${targetTopic}`;

    const executeCopy = () => {
      setLinkCopied(true);
      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.3 } });
      } catch (e) {}
      setTimeout(() => setLinkCopied(false), 4500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(directUrl).then(executeCopy).catch(() => {
        fallbackCopy(directUrl);
      });
    } else {
      fallbackCopy(directUrl);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 4500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  // Interactive Fraction State
  const [numFrac, setNumFrac] = useState<number>(3);
  const [denFrac, setDenFrac] = useState<number>(4);

  // Metric Conversion State
  const [metricValue, setMetricValue] = useState<number>(5);
  const [metricFrom, setMetricFrom] = useState<'km' | 'm' | 'cm' | 'mm'>('km');
  const [metricTo, setMetricTo] = useState<'km' | 'm' | 'cm' | 'mm'>('m');

  // Geometry Calculator State
  const [geoShape, setGeoShape] = useState<'rectangulo' | 'cuadrado' | 'circulo' | 'triangulo' | 'trapecio'>('rectangulo');
  const [geoBase, setGeoBase] = useState<number>(10);
  const [geoHeight, setGeoHeight] = useState<number>(6);
  const [geoSide, setGeoSide] = useState<number>(8);
  const [geoRadius, setGeoRadius] = useState<number>(4);
  const [geoBaseMinor, setGeoBaseMinor] = useState<number>(4);

  // Business Money State
  const [productPrice, setProductPrice] = useState<number>(12000);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [applyIVA, setApplyIVA] = useState<boolean>(true);
  const [cashGiven, setCashGiven] = useState<number>(20000);

  // Exam Simulator State
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});
  const [showEinsteinDetail, setShowEinsteinDetail] = useState<{ [key: number]: boolean }>({});

  // Student Medals, XP & Name State with LocalStorage
  const [unlockedMedals, setUnlockedMedals] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('streampay_student_medals');
      return saved ? JSON.parse(saved) : ['med_einstein_amigo'];
    }
    return ['med_einstein_amigo'];
  });

  const [studentXP, setStudentXP] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('streampay_student_xp');
      return saved ? parseInt(saved, 10) : 250;
    }
    return 250;
  });

  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('streampay_student_name') || '';
    }
    return '';
  });

  // Recent medal unlock banner
  const [recentMedalNotification, setRecentMedalNotification] = useState<{ title: string; points: number } | null>(null);

  const triggerUnlockMedal = (medalId: string) => {
    setUnlockedMedals(prev => {
      if (prev.includes(medalId)) return prev;
      const updated = [...prev, medalId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('streampay_student_medals', JSON.stringify(updated));
      }
      return updated;
    });

    const medalObj = OFFICIAL_MEDALS.find(m => m.id === medalId);
    if (medalObj) {
      setRecentMedalNotification({ title: medalObj.title, points: medalObj.pointsXP });
      setStudentXP(prev => {
        const nextXP = prev + medalObj.pointsXP;
        if (typeof window !== 'undefined') {
          localStorage.setItem('streampay_student_xp', nextXP.toString());
        }
        return nextXP;
      });

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}

      setTimeout(() => {
        setRecentMedalNotification(null);
      }, 5000);
    }
  };

  const handleUpdateStudentName = (name: string) => {
    setStudentName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('streampay_student_name', name);
    }
  };

  const handleAddXp = (points: number, reason: string) => {
    setStudentXP(prev => {
      const nextXP = prev + points;
      if (typeof window !== 'undefined') {
        localStorage.setItem('streampay_student_xp', nextXP.toString());
      }
      return nextXP;
    });
    setRecentMedalNotification({ title: `+${points} XP: ${reason}`, points });
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
    setTimeout(() => {
      setRecentMedalNotification(null);
    }, 4500);
    // Unlocks geometry medal for the student
    triggerUnlockMedal('med_geometria');
  };

  const calculateMetricConversion = () => {
    const toMeters: { [key: string]: number } = { km: 1000, m: 1, cm: 0.01, mm: 0.001 };
    const inMeters = metricValue * toMeters[metricFrom];
    return inMeters / toMeters[metricTo];
  };

  const calculateGeometry = () => {
    if (geoShape === 'cuadrado') {
      return { perimeter: geoSide * 4, area: geoSide * geoSide };
    } else if (geoShape === 'rectangulo') {
      return { perimeter: 2 * (geoBase + geoHeight), area: geoBase * geoHeight };
    } else if (geoShape === 'circulo') {
      return {
        perimeter: Number((2 * Math.PI * geoRadius).toFixed(2)),
        area: Number((Math.PI * geoRadius * geoRadius).toFixed(2))
      };
    } else if (geoShape === 'triangulo') {
      return {
        perimeter: geoBase * 3,
        area: Number(((geoBase * geoHeight) / 2).toFixed(2))
      };
    } else if (geoShape === 'trapecio') {
      return {
        perimeter: geoBase + geoBaseMinor + (geoHeight * 2),
        area: Number((((geoBase + geoBaseMinor) * geoHeight) / 2).toFixed(2))
      };
    }
    return { perimeter: 0, area: 0 };
  };

  const calculateBusiness = () => {
    const discountAmount = (productPrice * discountPercent) / 100;
    const priceAfterDiscount = productPrice - discountAmount;
    const ivaAmount = applyIVA ? (priceAfterDiscount * 0.13) : 0;
    const finalPrice = priceAfterDiscount + ivaAmount;
    const changeReturn = Math.max(0, cashGiven - finalPrice);
    return { discountAmount, priceAfterDiscount, ivaAmount, finalPrice, changeReturn };
  };

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
    setShowEinsteinDetail(prev => ({ ...prev, [qId]: true }));

    const isCorrect = optionIdx === EXAM_QUESTIONS.find(q => q.id === qId)?.correctIndex;
    if (isCorrect) {
      // Award +50 base XP
      setStudentXP(prev => {
        const nextXP = prev + 50;
        if (typeof window !== 'undefined') {
          localStorage.setItem('streampay_student_xp', nextXP.toString());
        }
        return nextXP;
      });

      // Match question topic to medals
      let medalToUnlock: string | null = null;
      if (qId === 1) medalToUnlock = 'med_fracciones';
      if (qId === 2) medalToUnlock = 'med_metrico';
      if (qId === 3) medalToUnlock = 'med_pemdas';
      if (qId === 4) medalToUnlock = 'med_recta';
      if (qId === 5) medalToUnlock = 'med_geometria';
      if (qId === 6) medalToUnlock = 'med_banquero';
      if (qId === 7) medalToUnlock = 'med_proporciones';
      if (qId === 8 || qId === 9) medalToUnlock = 'med_estadistica';
      if (qId === 10) medalToUnlock = 'med_banquero';

      if (medalToUnlock && !unlockedMedals.includes(medalToUnlock)) {
        triggerUnlockMedal(medalToUnlock);
      } else {
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount === EXAM_QUESTIONS.length && EXAM_QUESTIONS.length > 0) {
      const correctCount = EXAM_QUESTIONS.filter(q => selectedAnswers[q.id] === q.correctIndex).length;
      if (correctCount >= 7 && !unlockedMedals.includes('med_simulador_aprobado')) {
        triggerUnlockMedal('med_simulador_aprobado');
      }
      if (correctCount === 10 && !unlockedMedals.includes('med_perfeccion')) {
        triggerUnlockMedal('med_perfeccion');
      }
      if (unlockedMedals.length >= 6 && !unlockedMedals.includes('med_diploma_honor')) {
        triggerUnlockMedal('med_diploma_honor');
      }
    }
  }, [selectedAnswers]);

  const handleResetExam = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setShowEinsteinDetail({});
  };

  const geoResults = calculateGeometry();
  const bizResults = calculateBusiness();

  return (
    <div className="space-y-6 relative">

      {/* Floating Medal Unlock Notification Banner */}
      {recentMedalNotification && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 text-slate-950 font-sans shadow-2xl border-2 border-white/60 animate-in slide-in-from-top duration-300 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono font-black tracking-wider text-slate-900">
              ¡NUEVA MEDALLA DESBLOQUEADA!
            </div>
            <div className="text-xs font-black">{recentMedalNotification.title}</div>
            <div className="text-[10px] font-mono font-bold text-slate-800">
              +{recentMedalNotification.points} Puntos Einstein acumulados
            </div>
          </div>
          <button
            onClick={() => setActiveTopic('medallas')}
            className="px-2.5 py-1 rounded-lg bg-slate-950 text-white text-[10px] font-mono font-bold hover:bg-slate-850 transition-all ml-1"
          >
            Ver Medallero
          </button>
        </div>
      )}
      
      {/* Hero Header for 6th Grade Math */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-mono text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>PROGRAMA OFICIAL • 6TO GRADO DE PRIMARIA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Pruebas Estandarizadas de Matemáticas & Tutor Albert Einstein
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explicaciones paso a paso, calculadoras interactivas, el <strong>Bot de Albert Einstein</strong> y el <strong>Medallero de Honor</strong> con diplomas escolares descargables para incentivar el estudio.
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopyPublicLink()}
              className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all border border-indigo-400"
              title="Copiar enlace directo para enviar a los estudiantes por WhatsApp o abrir en navegador"
            >
              {linkCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-200">¡Enlace Copiado! ✓</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-white" />
                  <span>🔗 Compartir Enlace Público</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSelectTopic('geometria')}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Shapes className="w-4 h-4 text-white" />
              <span>🎨 Pizarra & Polígonos</span>
            </button>

            <button
              onClick={() => handleSelectTopic('medallas')}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>🏆 Medallas ({unlockedMedals.length})</span>
            </button>

            <button
              onClick={() => handleSelectTopic('einstein')}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>👨‍🏫 Einstein</span>
            </button>

            <button
              onClick={() => handleSelectTopic('simulador')}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Practicar Examen</span>
            </button>
          </div>
        </div>

        {/* Link Copied Notification Banner */}
        {linkCopied && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>¡Enlace público copiado al portapapeles!</strong> Puedes compartirlo con la alumna o abrirlo directamente en cualquier navegador. Llevará exactamente a esta sección.</span>
            </div>
            <button
              onClick={() => setLinkCopied(false)}
              className="px-2 py-1 bg-emerald-800/60 hover:bg-emerald-700 rounded-lg text-[10px] font-bold text-white shrink-0"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs for Topics */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'geometria', label: '🎨 5. Figuras Geométricas, Polígonos & Pizarra Libre', icon: Shapes, highlight: true },
          { id: 'einstein', label: '👨‍🏫 Tutor Albert Einstein (Paso a Paso)', icon: Sparkles, highlight: true },
          { id: 'medallas', label: `🏆 Premios & Medallero (${unlockedMedals.length})`, icon: Trophy, medalTab: true },
          { id: 'fracciones', label: '1. Fracciones & Mixtos', icon: PieChart },
          { id: 'naturales', label: '2. Números Naturales (PEMDAS)', icon: Layers },
          { id: 'metrico', label: '3. Sistema Métrico Nacional', icon: Ruler },
          { id: 'conversion_recta', label: '4. Conversión & Recta', icon: TrendingUp },
          { id: 'negocios_monedas', label: '6. Sistema Monetario', icon: Coins },
          { id: 'relaciones', label: '7. Relaciones & Proporciones', icon: Compass },
          { id: 'estadistica_prob', label: '8. Estadística & Probabilidad', icon: BarChart2 },
          { id: 'simulador', label: '📝 Simulador Oficial (10 Preguntas)', icon: Award, exam: true }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTopic === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTopic(item.id as MathSubTopic)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono whitespace-nowrap flex items-center gap-2 transition-all border shrink-0 ${
                isActive
                  ? item.medalTab
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30'
                    : item.highlight
                    ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/30 font-black'
                    : item.exam
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20'
                  : item.medalTab
                  ? 'bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-slate-800'
                  : item.highlight
                  ? 'bg-slate-900 border-cyan-500/40 text-cyan-300 hover:bg-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOPIC 0: PROFESOR ALBERT EINSTEIN BOT */}
      {activeTopic === 'einstein' && (
        <AlbertEinsteinTutor />
      )}

      {/* TOPIC MEDALLAS: PREMIOS Y MEDALLERO PARA ALUMNOS */}
      {activeTopic === 'medallas' && (
        <StudentMedalsHonor
          unlockedMedals={unlockedMedals}
          studentXP={studentXP}
          studentName={studentName}
          onUpdateName={handleUpdateStudentName}
          onClaimMedal={triggerUnlockMedal}
          onGoToExam={() => setActiveTopic('simulador')}
          onGoToTopic={(topicId) => setActiveTopic(topicId as MathSubTopic)}
        />
      )}

      {/* TOPIC 1: FRACCIONES & REPRESENTACIÓN */}
      {activeTopic === 'fracciones' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Tema 1 • 6to Grado</span>
              <h3 className="text-xl font-bold text-white">Representación de Fracciones, Propias, Impropias y Mixtas</h3>
            </div>
            <button
              onClick={() => setActiveTopic('einstein')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>¿Dudas? Preguntar a Einstein</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-400" />
                <span>Laboratorio Interactivo de Fracciones</span>
              </h4>
              <p className="text-xs text-slate-400">
                Cambia los valores para ver la clasificación y conversión automática:
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Numerador:</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={numFrac}
                    onChange={(e) => setNumFrac(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-center font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Denominador:</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={denFrac}
                    onChange={(e) => setDenFrac(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-center font-bold text-lg"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-center space-y-2">
                <div className="inline-block px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-400 text-indigo-300 font-mono text-2xl font-black">
                  {numFrac} / {denFrac}
                </div>

                <div className="text-xs font-bold">
                  {numFrac < denFrac ? (
                    <span className="text-emerald-400">🟢 Fracción Propia (Menor que 1 unidad)</span>
                  ) : numFrac === denFrac ? (
                    <span className="text-cyan-400">🔵 Fracción Igual a la Unidad (= 1)</span>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-amber-400">🟠 Fracción Impropia (Mayor que 1 unidad)</span>
                      <div className="text-slate-300 text-xs">
                        Número Mixto: <strong className="text-white font-mono font-bold text-sm">
                          {Math.floor(numFrac / denFrac)} {numFrac % denFrac > 0 ? `${numFrac % denFrac}/${denFrac}` : ''}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-400">
                  Decimal equivalente: <strong className="text-white font-mono">{(numFrac / denFrac).toFixed(3)}</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Guía Rápida para el Examen:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 block font-mono">1. Fracción Propia:</strong>
                    <p className="text-slate-300 text-[11px]">Numerador menor que el denominador (ej: 2/5, 3/8). Siempre va entre 0 y 1 en la recta.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-amber-400 block font-mono">2. Fracción Impropia:</strong>
                    <p className="text-slate-300 text-[11px]">Numerador mayor que el denominador (ej: 7/4, 9/2). Equivale a un número mixto (1 3/4).</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-cyan-400 block font-mono">3. Fracciones Equivalentes:</strong>
                    <p className="text-slate-300 text-[11px]">Representan el mismo valor. Multiplicas o divides ambos términos por el mismo número: 1/2 = 2/4 = 4/8.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-purple-400 block font-mono">4. Fracción Irreducible:</strong>
                    <p className="text-slate-300 text-[11px]">Ya no se puede simplificar más porque numerador y denominador no tienen divisores comunes (ej: 3/4).</p>
                  </div>
                </div>
              </div>

              {/* Recta numérica */}
              <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/20 text-xs space-y-2">
                <span className="font-bold text-white block">Posición en la Recta Numérica (0 a 3):</span>
                <div className="relative h-10 w-full flex items-center">
                  <div className="h-1.5 w-full bg-slate-700 rounded-full relative">
                    <div className="absolute left-0 -top-2 text-[10px] font-mono text-slate-400">0</div>
                    <div className="absolute left-1/3 -top-2 text-[10px] font-mono text-slate-400">1</div>
                    <div className="absolute left-2/3 -top-2 text-[10px] font-mono text-slate-400">2</div>
                    <div className="absolute right-0 -top-2 text-[10px] font-mono text-slate-400">3</div>
                    <div
                      className="absolute -top-3 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 transform -translate-x-1/2 shadow-lg transition-all"
                      style={{ left: `${Math.min(100, Math.max(0, ((numFrac / denFrac) / 3) * 100))}%` }}
                    />
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 text-right">
                  Posición: <strong className="text-amber-400 font-mono">{(numFrac / denFrac).toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 2: NÚMEROS NATURALES & PEMDAS */}
      {activeTopic === 'naturales' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Tema 2 • 6to Grado</span>
              <h3 className="text-xl font-bold text-white">Números Naturales, Valor Posicional y Jerarquía (PEMDAS)</h3>
            </div>
            <button
              onClick={() => setActiveTopic('einstein')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pedir explicación de PEMDAS</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Orden Inquebrantable de Operaciones</span>
              </h4>
              <ol className="space-y-2 text-slate-300 text-[11px]">
                <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono">1</span>
                  <span><strong>Paréntesis ( ):</strong> Siempre primero lo que está dentro.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center font-mono">2</span>
                  <span><strong>Potencias:</strong> Ej: 2³ = 2 × 2 × 2 = 8.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center font-mono">3</span>
                  <span><strong>Multiplicaciones y Divisiones:</strong> De izquierda a derecha.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center font-mono">4</span>
                  <span><strong>Sumas y Restas:</strong> Al puro final de izquierda a derecha.</span>
                </li>
              </ol>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-[11px] space-y-1">
                <strong className="text-emerald-300 block">Ejemplo Resuelto:</strong>
                <code className="text-amber-300 font-mono block">20 - 3 × (4 + 2) = ?</code>
                <span className="text-slate-400">Paso 1: Paréntesis ➔ 4 + 2 = 6 ➔ 20 - 3 × 6</span><br />
                <span className="text-slate-400">Paso 2: Multiplicación ➔ 3 × 6 = 18 ➔ 20 - 18</span><br />
                <span className="text-emerald-400 font-bold">Resultado = 2</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Valor Posicional hasta Millones</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-[10px] font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400">
                      <th className="p-1 border border-slate-800">C. Millón</th>
                      <th className="p-1 border border-slate-800">D. Millón</th>
                      <th className="p-1 border border-slate-800">U. Millón</th>
                      <th className="p-1 border border-slate-800">Centenas</th>
                      <th className="p-1 border border-slate-800">Decenas</th>
                      <th className="p-1 border border-slate-800">Unidades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-white font-bold bg-slate-900">
                      <td className="p-1 border border-slate-800">100M</td>
                      <td className="p-1 border border-slate-800">10M</td>
                      <td className="p-1 border border-slate-800">1M</td>
                      <td className="p-1 border border-slate-800">100</td>
                      <td className="p-1 border border-slate-800">10</td>
                      <td className="p-1 border border-slate-800">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                <strong className="text-cyan-300 block">Potencias de base 10:</strong>
                <p className="text-slate-300">10² = 100 • 10³ = 1,000 • 10⁶ = 1,000,000 (1 millón).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 3: SISTEMA MÉTRICO NACIONAL */}
      {activeTopic === 'metrico' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Tema 3 • 6to Grado</span>
              <h3 className="text-xl font-bold text-white">Sistema Métrico Nacional (SI): Medidas y Conversiones</h3>
            </div>
            <button
              onClick={() => setActiveTopic('einstein')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver truco de Einstein</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Ruler className="w-4 h-4 text-cyan-400" />
                <span>Calculadora de Longitud en Vivo</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Cantidad:</label>
                  <input
                    type="number"
                    value={metricValue}
                    onChange={(e) => setMetricValue(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 block mb-1">De:</label>
                    <select
                      value={metricFrom}
                      onChange={(e) => setMetricFrom(e.target.value as any)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    >
                      <option value="km">Kilómetros (km)</option>
                      <option value="m">Metros (m)</option>
                      <option value="cm">Centímetros (cm)</option>
                      <option value="mm">Milímetros (mm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">A:</label>
                    <select
                      value={metricTo}
                      onChange={(e) => setMetricTo(e.target.value as any)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    >
                      <option value="km">Kilómetros (km)</option>
                      <option value="m">Metros (m)</option>
                      <option value="cm">Centímetros (cm)</option>
                      <option value="mm">Milímetros (mm)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-center space-y-1">
                  <span className="text-[11px] text-slate-400">Resultado Equivalente:</span>
                  <div className="text-2xl font-black text-cyan-300 font-mono">
                    {calculateMetricConversion().toLocaleString()} {metricTo}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Regla Mnemotécnica: Bajar Multiplica (×10) • Subir Divide (÷10)</span>
                </h4>
                <p className="text-slate-300 text-[11px]">
                  Cada escalón equivale a un cero. Pasar de km a m son 3 escalones hacia abajo = multiplicar por 1,000.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-amber-400 block font-mono">⚖️ Medidas de Masa:</strong>
                  <ul className="text-slate-300 space-y-0.5">
                    <li>• 1 tonelada (t) = 1,000 kg</li>
                    <li>• 1 kilogramo (kg) = 1,000 gramos (g)</li>
                    <li>• 1/2 kg = 500 g | 1/4 kg = 250 g</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-cyan-400 block font-mono">🥛 Medidas de Capacidad:</strong>
                  <ul className="text-slate-300 space-y-0.5">
                    <li>• 1 litro (l) = 1,000 mililitros (ml)</li>
                    <li>• 1/2 litro = 500 ml</li>
                    <li>• 1/4 litro = 250 ml</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 4: CONVERSIÓN DECIMAL Y FRACCIONES */}
      {activeTopic === 'conversion_recta' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Tema 4 • 6to Grado</span>
              <h3 className="text-xl font-bold text-white">Conversión entre Fracciones y Decimales</h3>
            </div>
            <button
              onClick={() => setActiveTopic('einstein')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver explicación paso a paso</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Fracción ➔ Decimal (Dividir)</h4>
              <p className="text-slate-300 text-[11px]">Divide el numerador entre el denominador:</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono space-y-1.5 text-[11px]">
                <div>• 1/2 = 1 ÷ 2 = <strong className="text-emerald-400">0.5</strong></div>
                <div>• 3/4 = 3 ÷ 4 = <strong className="text-emerald-400">0.75</strong></div>
                <div>• 1/4 = 1 ÷ 4 = <strong className="text-emerald-400">0.25</strong></div>
                <div>• 2/5 = 2 ÷ 5 = <strong className="text-emerald-400">0.4</strong></div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Decimal ➔ Fracción (Simplificar)</h4>
              <p className="text-slate-300 text-[11px]">Escribe sobre base 10, 100 o 1000 y simplifica:</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono space-y-1.5 text-[11px]">
                <div>• 0.8 = 8/10 = simplificado entre 2 = <strong className="text-cyan-400">4/5</strong></div>
                <div>• 0.75 = 75/100 = simplificado entre 25 = <strong className="text-cyan-400">3/4</strong></div>
                <div>• 0.35 = 35/100 = simplificado entre 5 = <strong className="text-cyan-400">7/20</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 5: GEOMETRÍA, POLÍGONOS & PIZARRA LIBRE DE TRAZO */}
      {activeTopic === 'geometria' && (
        <GeometryStudio
          onAddXp={handleAddXp}
          onAskEinstein={(questionText) => {
            setActiveTopic('einstein');
          }}
        />
      )}

      {/* TOPIC 6: SISTEMA MONETARIO & COMERCIO */}
      {activeTopic === 'negocios_monedas' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Tema 6 • 6to Grado</span>
              <h3 className="text-xl font-bold text-white">Sistema Monetario, Vueltos, Descuentos e IVA</h3>
            </div>
            <button
              onClick={() => setActiveTopic('einstein')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver explicación de descuentos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-400" />
                <span>Simulador de Caja Registradora</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Precio Producto (₡):</label>
                  <input
                    type="number"
                    step="500"
                    value={productPrice}
                    onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Descuento (%):</label>
                    <input
                      type="number"
                      min="0"
                      max="90"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Billete Entregado (₡):</label>
                    <input
                      type="number"
                      step="1000"
                      value={cashGiven}
                      onChange={(e) => setCashGiven(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300 pt-1">
                  <input
                    type="checkbox"
                    checked={applyIVA}
                    onChange={(e) => setApplyIVA(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <span>Aplicar IVA (13%)</span>
                </label>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Descuento:</span>
                    <span className="text-amber-400">- ₡{bizResults.discountAmount.toLocaleString()}</span>
                  </div>
                  {applyIVA && (
                    <div className="flex justify-between text-slate-400">
                      <span>IVA (13%):</span>
                      <span className="text-cyan-400">+ ₡{bizResults.ivaAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-1.5 text-sm">
                    <span>Total a Pagar:</span>
                    <span className="text-emerald-400">₡{bizResults.finalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-bold border-t border-slate-800 pt-1">
                    <span>Vuelto a Entregar:</span>
                    <span>₡{bizResults.changeReturn.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white text-sm">Problemas Prácticos de Negocios:</h4>
              <div className="space-y-3 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block">Feria del Agricultor (Gramos y Kilos):</strong>
                  <p className="text-slate-300">
                    Si 1 kg de queso vale ₡4,200:
                  </p>
                  <p className="text-emerald-400 font-mono">
                    • 500 g (medio kilo) = ₡2,100<br />
                    • 250 g (un cuarto) = ₡1,050<br />
                    • 750 g (tres cuartos) = ₡3,150
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 7: RELACIONES Y PROPORCIONES */}
      {activeTopic === 'relaciones' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Tema 7 • 6to Grado</span>
              <h3 className="text-xl font-bold text-white">Relaciones, Sucesiones Numéricas y Regla de Tres</h3>
            </div>
            <button
              onClick={() => setActiveTopic('einstein')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preguntar regla de tres a Einstein</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Regla de Secuencias Aritméticas:</h4>
              <p className="text-slate-300 text-[11px]">Calcula la diferencia constante entre términos:</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1.5">
                <div className="text-amber-400">Secuencia: 7, 13, 19, 25, 31...</div>
                <div className="text-slate-400">Diferencia: 13 - 7 = 6</div>
                <div className="text-emerald-400 font-bold">Regla: Sumar 6 a cada término. Siguiente = 37.</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Método del Valor Unitario:</h4>
              <p className="text-slate-300 text-[11px]">"Si 3 cuadernos cuestan ₡4,500, ¿cuánto cuestan 7?"</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
                <div>1 cuaderno = 4,500 ÷ 3 = ₡1,500 cada uno.</div>
                <div>7 cuadernos = 1,500 × 7 = <strong className="text-emerald-400">₡10,500 colones.</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 8: ESTADÍSTICA Y PROBABILIDAD */}
      {activeTopic === 'estadistica_prob' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Tema 8 • 6to Grado</span>
              <h3 className="text-xl font-bold text-white">Estadística (Media, Moda, Mediana) y Probabilidad Simple</h3>
            </div>
            <button
              onClick={() => setActiveTopic('einstein')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver explicación de probabilidad</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Las 3 Medidas Clave:</h4>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400 block font-mono">Moda:</strong>
                  <span className="text-slate-300">El número que más veces se repite en la lista.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-cyan-400 block font-mono">Media (Promedio):</strong>
                  <span className="text-slate-300">Sumar todos los números y dividir entre el total de datos.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-400 block font-mono">Mediana:</strong>
                  <span className="text-slate-300">Se ordenan de menor a mayor y se toma el del centro exacto.</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Escala de Probabilidad:</h4>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/30">
                  <strong className="text-emerald-400 block">Evento Seguro:</strong>
                  <span className="text-slate-300">Ocurre 100% garantizado (Probabilidad = 1).</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-cyan-500/30">
                  <strong className="text-cyan-400 block">Evento Probable:</strong>
                  <span className="text-slate-300">Casos a favor ÷ Casos posibles (ej: 5/10 = 50%).</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-red-500/30">
                  <strong className="text-red-400 block">Evento Imposible:</strong>
                  <span className="text-slate-300">No puede ocurrir jamás (Probabilidad = 0).</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 9: SIMULADOR DE PRUEBAS ESTANDARIZADAS CON EINSTEIN TUTOR */}
      {activeTopic === 'simulador' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-amber-500/40 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>SIMULADOR OFICIAL • 10 PREGUNTAS TIPO MEP</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Práctica Interactiva con Ayuda de Albert Einstein</h3>
            </div>
            <button
              onClick={handleResetExam}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reiniciar Práctica</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>Respondidas: {Object.keys(selectedAnswers).length} de {EXAM_QUESTIONS.length}</span>
              <span>
                Aciertos:{' '}
                <strong className="text-emerald-400">
                  {EXAM_QUESTIONS.filter(q => selectedAnswers[q.id] === q.correctIndex).length}
                </strong>
              </span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(Object.keys(selectedAnswers).length / EXAM_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {EXAM_QUESTIONS.map((q, qIndex) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-red-950/20 border-red-500/40'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                        Pregunta {qIndex + 1} • {q.topic}
                      </span>
                      {isAnswered && (
                        <span className={`text-xs font-bold flex items-center gap-1 font-mono ${
                          isCorrect ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white leading-relaxed">
                      {q.question}
                    </h4>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((option, optIdx) => {
                        let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                          } else if (selectedOpt === optIdx) {
                            btnStyle = 'bg-red-500/20 border-red-500 text-red-300 line-through';
                          } else {
                            btnStyle = 'bg-slate-950 border-slate-900 text-slate-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Einstein Step-by-step guidance box */}
                    {showEinsteinDetail[q.id] && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 border border-amber-400/40 text-xs space-y-2 animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 text-amber-300 font-bold font-mono text-[11px]">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>Paso a Paso con Albert Einstein:</span>
                        </div>
                        <p className="text-slate-200 text-[11px] leading-relaxed italic">
                          {q.einsteinStep}
                        </p>
                        <div className="pt-1 text-[10px] text-slate-400 border-t border-slate-800">
                          <strong>Justificación matemática:</strong> {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Exam Final Result */}
          {Object.keys(selectedAnswers).length === EXAM_QUESTIONS.length && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/50 border-2 border-amber-500/50 text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 font-black">
                <Trophy className="w-7 h-7" />
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block">
                  ¡EXAMEN COMPLETADO CON ÉXITO!
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  ¡Felicitaciones por tu Esfuerzo y Dedicación!
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
                Puntaje obtenido:{' '}
                <strong className="text-emerald-400 font-mono text-lg font-black">
                  {EXAM_QUESTIONS.filter(q => selectedAnswers[q.id] === q.correctIndex).length} de {EXAM_QUESTIONS.length}
                </strong>{' '}
                aciertos. Has ganado puntos de experiencia (XP) y desbloqueado medallas de honor en tu vitrina escolar.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 max-w-md mx-auto text-xs text-amber-300 italic">
                👨‍🏫 Prof. Albert Einstein: <em>«¡Maravilloso progreso! Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el bello y maravilloso mundo del saber.»</em>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTopic('medallas')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Ver Mis Medallas & Diplomas</span>
                </button>

                <button
                  onClick={handleResetExam}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reintentar Examen</span>
                </button>

                <button
                  onClick={() => setActiveTopic('einstein')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Preguntar a Einstein</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
