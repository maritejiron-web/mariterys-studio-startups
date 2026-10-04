import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Trophy,
  Medal,
  Star,
  Crown,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  Printer,
  Flame,
  Zap,
  GraduationCap,
  Volume2,
  VolumeX,
  Share2,
  BookOpen,
  PieChart,
  Shapes,
  Coins,
  Ruler,
  TrendingUp,
  BarChart2,
  Layers,
  Compass
} from 'lucide-react';

export interface StudentMedal {
  id: string;
  title: string;
  category: 'fracciones' | 'aritmetica' | 'geometria' | 'metrico' | 'finanzas' | 'estadistica' | 'maestria' | 'einstein';
  metal: 'oro' | 'plata' | 'bronce' | 'diamante';
  icon: React.ElementType;
  pointsXP: number;
  requirement: string;
  description: string;
  einsteinPraise: string;
}

export const OFFICIAL_MEDALS: StudentMedal[] = [
  {
    id: 'med_fracciones',
    title: '🥇 Medalla de Oro: Maestro de Fracciones',
    category: 'fracciones',
    metal: 'oro',
    icon: PieChart,
    pointsXP: 150,
    requirement: 'Dominar fracciones propias, impropias y números mixtos',
    description: 'Otorgada por comprender cómo convertir fracciones impropias a números mixtos y simplificar a la irreducible.',
    einsteinPraise: '¡Espléndido! Como solía decir, entender las partes de un todo es la base para comprender la armonía del universo. ¡Sigue así!'
  },
  {
    id: 'med_pemdas',
    title: '⚡ Medalla Relámpago: Jerarquía PEMDAS',
    category: 'aritmetica',
    metal: 'diamante',
    icon: Layers,
    pointsXP: 180,
    requirement: 'Resolver operaciones combinadas respetando el orden correcto',
    description: 'Otorgada por no caer en la trampa de sumar antes de multiplicar: primero paréntesis, luego multiplicaciones y divisiones.',
    einsteinPraise: '¡Increíble disciplina mental! En la física y en las matemáticas, el orden de las operaciones lo es todo. ¡Eres formidable!'
  },
  {
    id: 'med_metrico',
    title: '📏 Medalla Gran Agrimensor Métrico',
    category: 'metrico',
    metal: 'plata',
    icon: Ruler,
    pointsXP: 140,
    requirement: 'Realizar conversiones exactas en la escalera métrica (km, m, cm, mm)',
    description: 'Otorgada por multiplicar o dividir por potencias de 10 al subir o bajar la escalera del Sistema Internacional.',
    einsteinPraise: '¡Exactitud absoluta! Medir el mundo con precisión es el primer paso de todos los grandes exploradores y científicos.'
  },
  {
    id: 'med_recta',
    title: '🎯 Medalla Precisión Decimal y Recta',
    category: 'fracciones',
    metal: 'bronce',
    icon: TrendingUp,
    pointsXP: 120,
    requirement: 'Ubicar con precisión decimales y fracciones en la recta numérica',
    description: 'Otorgada por saber convertir 3/4 en 0.75 y situarlo exactamente entre 0 y 1 sin dudar.',
    einsteinPraise: '¡Visión geométrica impecable! La recta numérica es el mapa infinito donde habitan todos los números conocidos.'
  },
  {
    id: 'med_geometria',
    title: '📐 Medalla Euclides: Geómetra de Costa Rica',
    category: 'geometria',
    metal: 'oro',
    icon: Shapes,
    pointsXP: 200,
    requirement: 'Calcular perímetro y área de cuadriláteros, trapecios y círculos con π',
    description: 'Otorgada por aplicar correctamente base × altura, la fórmula del trapecio y π × r² para el área circular.',
    einsteinPraise: '¡Bravo! Desde las pirámides antiguas hasta el espacio curvo, la geometría es el lenguaje secreto del cosmos.'
  },
  {
    id: 'med_banquero',
    title: '💰 Medalla Pequeño Banquero de Negocios',
    category: 'finanzas',
    metal: 'oro',
    icon: Coins,
    pointsXP: 160,
    requirement: 'Calcular vueltos en caja registradora, descuentos e IVA del 13%',
    description: 'Otorgada por dominar las transacciones de la vida real con colones y dólares sin equivocarse en el cambio.',
    einsteinPraise: '¡Gran astucia financiera! Quien domina los números en el comercio jamás será engañado. ¡Tu futuro es brillante!'
  },
  {
    id: 'med_proporciones',
    title: '⚖️ Medalla Mente Analítica: Regla de Tres',
    category: 'aritmetica',
    metal: 'plata',
    icon: Compass,
    pointsXP: 140,
    requirement: 'Calcular valores unitarios y proporcionalidad directa',
    description: 'Otorgada por encontrar el valor desconocido cuando dos cantidades crecen al mismo ritmo constante.',
    einsteinPraise: '¡Lógica pura y elegante! La proporcionalidad directa es el principio que une la velocidad, el tiempo y la distancia.'
  },
  {
    id: 'med_estadistica',
    title: '🎲 Medalla Sabio de Probabilidades y Datos',
    category: 'estadistica',
    metal: 'bronce',
    icon: BarChart2,
    pointsXP: 130,
    requirement: 'Identificar moda, promedio, mediana y clasificar eventos probables',
    description: 'Otorgada por analizar conjuntos de datos escolares y predecir resultados seguros, probables o imposibles.',
    einsteinPraise: '¡Pensamiento estadístico supremo! Aunque a mí me gustaba decir que Dios no juega a los dados, ¡comprender el azar es genial!'
  },
  {
    id: 'med_simulador_aprobado',
    title: '🏆 Copa de Honor: Pruebas Estandarizadas MEP',
    category: 'maestria',
    metal: 'diamante',
    icon: Trophy,
    pointsXP: 300,
    requirement: 'Obtener 70% o más en el Examen Simulador de 6to Grado',
    description: 'Máxima condecoración por superar con éxito el simulador oficial de 10 preguntas de matemáticas.',
    einsteinPraise: '¡FELICITACIONES CAMPEÓN(A)! Has demostrado que con dedicación, curiosidad y práctica no hay examen que te detenga. ¡Estoy muy orgulloso de ti!'
  },
  {
    id: 'med_perfeccion',
    title: '👑 Insignia de Perfección: 10 de 10 Absoluto',
    category: 'maestria',
    metal: 'diamante',
    icon: Crown,
    pointsXP: 400,
    requirement: 'Lograr calificación perfecta (100%) en el simulador',
    description: 'Galardón reservado para los estudiantes que responden todas las preguntas sin cometer un solo error.',
    einsteinPraise: '¡UN GENIO AUTÉNTICO! Un 10 de 10 perfecto. Tu nivel de concentración y agudeza matemática es digno de un premio Nobel escolar.'
  },
  {
    id: 'med_einstein_amigo',
    title: '👨‍🏫 Medalla Pupilo Favorito de Albert Einstein',
    category: 'einstein',
    metal: 'oro',
    icon: Sparkles,
    pointsXP: 100,
    requirement: 'Consultar dudas y pedir explicaciones paso a paso al Bot Tutor',
    description: 'Otorgada a los estudiantes curiosos que no se quedan con la duda y preguntan hasta entender el por qué de las cosas.',
    einsteinPraise: '«Lo importante es no dejar de hacerse preguntas. La curiosidad tiene su propia razón de existir». ¡Gracias por ser mi estudiante!'
  },
  {
    id: 'med_diploma_honor',
    title: '🎓 Gran Diploma de Honor: Graduado 6° Grado',
    category: 'maestria',
    metal: 'diamante',
    icon: GraduationCap,
    pointsXP: 500,
    requirement: 'Desbloquear al menos 6 medallas y completar tu preparación',
    description: 'Diploma oficial personalizable para imprimir en papel o guardar en PDF con tu nombre y el sello de Einstein.',
    einsteinPraise: '¡Es un honor firmar tu Diploma de Honor! Que este sea solo el comienzo de una vida llena de descubrimientos fascinantes.'
  }
];

interface Props {
  unlockedMedals: string[];
  studentXP: number;
  studentName: string;
  onUpdateName: (name: string) => void;
  onClaimMedal: (medalId: string) => void;
  onGoToExam: () => void;
  onGoToTopic: (topicId: string) => void;
}

export const StudentMedalsHonor: React.FC<Props> = ({
  unlockedMedals,
  studentXP,
  studentName,
  onUpdateName,
  onClaimMedal,
  onGoToExam,
  onGoToTopic
}) => {
  const [filter, setFilter] = useState<'todas' | 'ganadas' | 'pendientes'>('todas');
  const [selectedMedalModal, setSelectedMedalModal] = useState<StudentMedal | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showCertificateView, setShowCertificateView] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(studentName || '');

  // Level Calculation
  const getLevelInfo = (xp: number) => {
    if (xp < 300) {
      return { level: 1, title: 'Explorador Numérico', next: 300, color: 'text-cyan-400', badge: 'Nivel 1' };
    }
    if (xp < 700) {
      return { level: 2, title: 'Aprendiz de Pitágoras', next: 700, color: 'text-indigo-400', badge: 'Nivel 2' };
    }
    if (xp < 1200) {
      return { level: 3, title: 'Calculador Experto', next: 1200, color: 'text-emerald-400', badge: 'Nivel 3' };
    }
    if (xp < 1800) {
      return { level: 4, title: 'Maestro Geómetra', next: 1800, color: 'text-amber-400', badge: 'Nivel 4' };
    }
    return { level: 5, title: 'Genio Cuántico de Einstein', next: 2500, color: 'text-purple-400', badge: 'Nivel Máximo' };
  };

  const levelInfo = getLevelInfo(studentXP);
  const unlockedCount = unlockedMedals.length;
  const totalMedals = OFFICIAL_MEDALS.length;
  const progressPercent = Math.round((unlockedCount / totalMedals) * 100);

  const filteredMedals = OFFICIAL_MEDALS.filter(m => {
    const isUnlocked = unlockedMedals.includes(m.id);
    if (filter === 'ganadas') return isUnlocked;
    if (filter === 'pendientes') return !isUnlocked;
    return true;
  });

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrintCertificate = () => {
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
    window.print();
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Salón de Premios y Medallero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/50 via-slate-900 to-indigo-950 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>SALÓN DE LA FAMA • PREMIOS & MEDALLERO OFICIAL MEP 6°</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Medallas de Honor para Alumnos</span>
              <span className="text-2xl">🏅</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cada ejercicio, laboratorio y prueba superada recompensa el esfuerzo de los estudiantes con <strong>Puntos Einstein (XP)</strong>, <strong>medallas coleccionables</strong> y el <strong>Diploma Oficial de Reconocimiento</strong> firmado por Albert Einstein.
            </p>

            {/* Student Name Input Bar */}
            <form onSubmit={handleSaveName} className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-amber-300 font-bold font-mono">Nombre del Alumno(a):</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ej: Sofía Rojas / Sebastián Castro"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-amber-500/50 text-white text-xs font-bold focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black font-mono transition-all"
                >
                  Guardar Nombre
                </button>
              </div>
              {studentName && (
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Registrado para el Diploma
                </span>
              )}
            </form>
          </div>

          {/* Level & XP Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 min-w-[280px] space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold">Rango Escolar</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold">
                {levelInfo.badge}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm leading-tight">{levelInfo.title}</h4>
                <p className="text-xs text-amber-400 font-mono font-bold">{studentXP} Puntos Einstein (XP)</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Progreso a Nivel {levelInfo.level + 1}</span>
                <span>{studentXP} / {levelInfo.next} XP</span>
              </div>
              <div className="w-full h-2 bg-slate-850 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((studentXP / levelInfo.next) * 100))}%` }}
                />
              </div>
            </div>

            {/* Quick Diploma button */}
            <button
              onClick={() => setShowCertificateView(true)}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ver Diploma de Honor Escolar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Medallas Ganadas</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {unlockedCount} <span className="text-xs text-slate-500 font-normal">/ {totalMedals}</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono font-bold">{progressPercent}% del Medallero</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Puntos Totales (XP)</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-black text-yellow-400 font-mono">{studentXP}</div>
          <div className="text-[10px] text-slate-400 font-mono">+100 XP por examen resuelto</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Racha de Estudio</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-orange-400 font-mono">
            {unlockedCount > 0 ? `${unlockedCount} Días` : 'Comienza hoy'}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Constancia escolar diaria</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Estado de Graduación</span>
            <GraduationCap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-sm font-bold text-white leading-tight">
            {unlockedCount >= 6 ? '¡Apto para Diploma!' : `Faltan ${Math.max(0, 6 - unlockedCount)} medallas`}
          </div>
          <div className="text-[10px] text-indigo-400 font-mono">6 medallas para Diploma</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('todas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === 'todas'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Todas ({totalMedals})
          </button>
          <button
            onClick={() => setFilter('ganadas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === 'ganadas'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Desbloqueadas ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('pendientes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === 'pendientes'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Por Ganar ({totalMedals - unlockedCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToExam}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Ir al Simulador de Examen</span>
          </button>

          <button
            onClick={() => setShowCertificateView(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Diploma</span>
          </button>
        </div>
      </div>

      {/* Medals Grid (12 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedals.map(medal => {
          const isUnlocked = unlockedMedals.includes(medal.id);
          const Icon = medal.icon;

          let metalBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
          if (medal.metal === 'diamante') metalBadgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
          if (medal.metal === 'plata') metalBadgeColor = 'bg-slate-400/20 text-slate-300 border-slate-400/30';
          if (medal.metal === 'bronce') metalBadgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/30';

          return (
            <div
              key={medal.id}
              onClick={() => setSelectedMedalModal(medal)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-amber-500/40 hover:border-amber-400 shadow-lg hover:shadow-amber-500/10'
                  : 'bg-slate-950/60 border-slate-850 text-slate-500 hover:border-slate-800'
              }`}
            >
              {/* Unlocked Sparkle Indicator */}
              {isUnlocked && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>GANADA</span>
                </div>
              )}
              {!isUnlocked && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-500 border border-slate-800">
                  <Lock className="w-3 h-3" />
                  <span>BLOQUEADA</span>
                </div>
              )}

              <div className="space-y-3">
                {/* Medal Icon & Metal Pill */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-600 border-slate-800'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${metalBadgeColor}`}>
                      {medal.metal.toUpperCase()} • +{medal.pointsXP} XP
                    </span>
                    <h4 className={`text-sm font-bold mt-1 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {medal.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {medal.description}
                </p>

                {/* Requirement */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-[11px] text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Requisito:</strong> {medal.requirement}
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-850/80 flex items-center justify-between text-xs mt-3">
                {isUnlocked ? (
                  <span className="text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Ver Elogio de Einstein
                  </span>
                ) : (
                  <span className="text-slate-500 font-mono text-[11px]">
                    Clic para ver cómo ganarla
                  </span>
                )}
                <span className="text-slate-400 text-xs font-bold">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: DETALLES DE MEDALLA & ELOGIO DE EINSTEIN */}
      {selectedMedalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-left space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedMedalModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold"
            >
              ✕ Cerrar
            </button>

            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${
                unlockedMedals.includes(selectedMedalModal.id)
                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 border-amber-300 shadow-amber-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}>
                {React.createElement(selectedMedalModal.icon, { className: 'w-7 h-7' })}
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  Medalla MEP • {selectedMedalModal.metal.toUpperCase()}
                </span>
                <h3 className="text-lg font-black text-white">{selectedMedalModal.title}</h3>
                <p className="text-xs text-amber-300 font-mono">+{selectedMedalModal.pointsXP} Puntos Einstein (XP)</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <h5 className="font-bold text-white text-sm">¿De qué trata este logro?</h5>
              <p className="leading-relaxed text-slate-300">{selectedMedalModal.description}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <TargetIcon />
                <span>¿Cómo desbloquearla?</span>
              </div>
              <p className="text-slate-400">{selectedMedalModal.requirement}</p>
            </div>

            {/* Einstein Praise Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 border border-amber-400/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 font-bold font-mono text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Mensaje de Albert Einstein para el Alumno:</span>
                </div>
                <button
                  onClick={() => handleSpeak(selectedMedalModal.einsteinPraise)}
                  className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-all"
                  title="Escuchar con voz de Einstein"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-slate-200 text-xs italic leading-relaxed">
                "{selectedMedalModal.einsteinPraise}"
              </p>
            </div>

            {/* Buttons inside modal */}
            <div className="flex items-center gap-2 pt-2">
              {!unlockedMedals.includes(selectedMedalModal.id) ? (
                <button
                  onClick={() => {
                    onClaimMedal(selectedMedalModal.id);
                    setSelectedMedalModal(null);
                    try {
                      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
                    } catch (e) {}
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black transition-all shadow-lg"
                >
                  🏅 Reclamar Medalla (Estudié este tema)
                </button>
              ) : (
                <div className="flex-1 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>¡Esta medalla ya brilla en tu vitrina!</span>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedMedalModal(null);
                  onGoToExam();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition-all"
              >
                Ir a Practicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE / DIPLOMA MODAL VIEW (PRINT READY) */}
      {showCertificateView && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-10 max-w-3xl w-full text-left space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setShowCertificateView(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold"
            >
              ✕ Cerrar
            </button>

            {/* Printable Diploma Card */}
            <div id="diploma-print-area" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 text-stone-900 border-8 border-amber-400/80 shadow-2xl relative overflow-hidden text-center space-y-6">
              
              {/* Decorative Corner Filigrees */}
              <div className="absolute top-2 left-2 text-amber-500 font-serif text-2xl select-none">⚜</div>
              <div className="absolute top-2 right-2 text-amber-500 font-serif text-2xl select-none">⚜</div>
              <div className="absolute bottom-2 left-2 text-amber-500 font-serif text-2xl select-none">⚜</div>
              <div className="absolute bottom-2 right-2 text-amber-500 font-serif text-2xl select-none">⚜</div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/80 border border-amber-400 text-amber-900 font-mono text-[10px] font-black uppercase tracking-wider">
                  <Crown className="w-3.5 h-3.5 text-amber-700" />
                  <span>MINISTERIO DE EDUCACIÓN PÚBLICA • COSTA RICA</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-serif uppercase">
                  Diploma de Honor Escolar
                </h1>
                <p className="text-xs sm:text-sm text-stone-700 font-serif italic">
                  Por Excelencia y Dedicación en la Preparación para las Pruebas Estandarizadas de 6to Grado
                </p>
              </div>

              {/* Recipient Name */}
              <div className="py-3 border-b-2 border-stone-800 max-w-md mx-auto space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-600 block">
                  Se confiere el presente reconocimiento a:
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-900 font-serif underline decoration-amber-500 underline-offset-8">
                  {studentName || 'Estudiante Ejemplar de Sexto Grado'}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed font-sans">
                Por haber demostrado perseverancia, curiosidad científica y dominio riguroso en los temas de <strong>Fracciones, Operaciones Combinadas PEMDAS, Sistema Métrico Nacional, Geometría Euclidiana, Sistema Monetario y Estadística</strong>.
              </p>

              {/* Medals Stamp and Signatures */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 items-center">
                {/* Left: MEP Stamp */}
                <div className="text-center space-y-1">
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-200 border-2 border-amber-600 flex items-center justify-center text-amber-800 font-serif font-black shadow-md">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <span className="text-[9px] font-mono text-stone-600 font-bold block uppercase">
                    Sello Oficial MEP 6°
                  </span>
                  <span className="text-[9px] text-stone-500 font-mono">Puntaje: {studentXP} XP</span>
                </div>

                {/* Center: Medals Count Badge */}
                <div className="p-3 rounded-2xl bg-amber-200/50 border border-amber-300 text-center space-y-0.5">
                  <span className="text-xs font-bold text-amber-900 font-serif">Medallero Acreditado</span>
                  <div className="text-xl font-black text-amber-950 font-mono">{unlockedCount} Medallas Oficiales</div>
                  <span className="text-[9px] text-stone-600 font-mono">Año Escolar 2026</span>
                </div>

                {/* Right: Albert Einstein Signature */}
                <div className="text-center space-y-1">
                  <div className="font-serif italic text-lg font-black text-stone-800 border-b border-stone-500 pb-1">
                    Prof. Albert Einstein
                  </div>
                  <span className="text-[9px] font-mono text-stone-600 font-bold block uppercase">
                    Mentor & Físico Matemático
                  </span>
                  <span className="text-[8px] text-stone-500 italic">
                    "Nunca consideres el estudio como una obligación"
                  </span>
                </div>
              </div>
            </div>

            {/* Diploma Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-400">
                💡 Consejo: Presiona <strong>«Imprimir Diploma»</strong> y selecciona <em>«Guardar como PDF»</em> para conservarlo o enmarcarlo.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar en PDF</span>
                </button>
                <button
                  onClick={() => setShowCertificateView(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition-all"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const TargetIcon = () => (
  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
