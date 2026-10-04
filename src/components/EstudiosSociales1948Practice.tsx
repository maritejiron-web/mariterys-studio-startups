import React, { useState, useEffect } from 'react';
import {
  ESTUDIOS_SOCIALES_CARDS,
  PREGUNTAS_EXAMEN_SOCIALES_1948,
  INSTITUCIONES_ESTADO_BIENESTAR,
  ESTUDIOS_SOCIALES_TIMELINE,
  SocialQuestion,
  StudyCard
} from '../data/estudiosSociales1948Data';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Users,
  Home,
  HeartPulse,
  Zap,
  Droplets,
  Shield,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Printer,
  FileText,
  Lightbulb,
  GraduationCap,
  Trophy,
  Filter,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  onUnlockMedal?: (id: string, name: string) => void;
  onAskEinstein?: (question: string) => void;
}

export default function EstudiosSociales1948Practice({ onUnlockMedal, onAskEinstein }: Props) {
  // Navigation tabs within Estudios Sociales
  const [activeTab, setActiveTab] = useState<'guia' | 'examen' | 'emparejamiento' | 'linea_tiempo' | 'imprimir'>('examen');

  // Voice synthesis state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeSpeechCardId, setActiveSpeechCardId] = useState<string | null>(null);

  // Card expansion state
  const [expandedCardId, setExpandedCardId] = useState<string>('card-1');

  // Exam Simulator state
  const [examMode, setExamMode] = useState<'all' | 'guerra_1948' | 'estado_bienestar' | 'vida_cotidiana' | 'retos_sociedad' | 'participacion_ciudadana'>('all');
  const [currentExamQuestions, setCurrentExamQuestions] = useState<SocialQuestion[]>(PREGUNTAS_EXAMEN_SOCIALES_1948);
  const [examIdx, setExamIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [userAnswersRecord, setUserAnswersRecord] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});

  // Matching Game state (Instituciones del Estado Benefactor)
  const [selectedInstId, setSelectedInstId] = useState<string | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchWrongAttempt, setMatchWrongAttempt] = useState<boolean>(false);
  const [isMatchGameWon, setIsMatchGameWon] = useState<boolean>(false);
  const [shuffledMissions, setShuffledMissions] = useState<Array<{ id: string; mission: string; acronym: string }>>([]);

  // Initialize shuffled missions for matching game
  useEffect(() => {
    resetMatchingGame();
  }, []);

  const resetMatchingGame = () => {
    const list = INSTITUCIONES_ESTADO_BIENESTAR.map(item => ({
      id: item.id,
      mission: item.mission,
      acronym: item.acronym
    }));
    // Fisher-Yates shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setShuffledMissions(list);
    setMatchedPairs([]);
    setSelectedInstId(null);
    setSelectedMissionId(null);
    setMatchWrongAttempt(false);
    setIsMatchGameWon(false);
  };

  // Filter exam questions when mode changes
  useEffect(() => {
    let filtered = PREGUNTAS_EXAMEN_SOCIALES_1948;
    if (examMode !== 'all') {
      filtered = PREGUNTAS_EXAMEN_SOCIALES_1948.filter(q => q.topic === examMode);
    }
    setCurrentExamQuestions(filtered);
    resetExam();
  }, [examMode]);

  const resetExam = () => {
    setExamIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnsweredCount(0);
    setIsExamCompleted(false);
    setUserAnswersRecord({});
    stopSpeaking();
  };

  // Text to Speech
  const speakText = (text: string, cardId?: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeechCardId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (cardId) setActiveSpeechCardId(cardId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeechCardId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeechCardId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeechCardId(null);
    }
  };

  // Exam handler
  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const currentQ = currentExamQuestions[examIdx];
    const isCorrect = selectedOption === currentQ.answerIdx;

    setIsAnswerSubmitted(true);
    setAnsweredCount(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswersRecord(prev => ({
      ...prev,
      [examIdx]: { selected: selectedOption, isCorrect }
    }));

    // Voice feedback if user likes
    if (isCorrect) {
      // Optional sound / prompt
    }
  };

  const handleNextQuestion = () => {
    if (examIdx < currentExamQuestions.length - 1) {
      setExamIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsExamCompleted(true);
      const finalScorePct = Math.round(((score + (selectedOption === currentExamQuestions[examIdx].answerIdx && !isAnswerSubmitted ? 1 : 0)) / currentExamQuestions.length) * 100);
      if (finalScorePct >= 80 && onUnlockMedal) {
        onUnlockMedal('med_sociales_1948', 'Medalla de Oro: Bicentenario y Estado Benefactor (MEP 6° Grado)');
      }
    }
  };

  // Handle Matching Game Logic
  const handleSelectInstitution = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setSelectedInstId(id);
    setMatchWrongAttempt(false);

    if (selectedMissionId) {
      // Check match
      checkMatch(id, selectedMissionId);
    }
  };

  const handleSelectMission = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setSelectedMissionId(id);
    setMatchWrongAttempt(false);

    if (selectedInstId) {
      // Check match
      checkMatch(selectedInstId, id);
    }
  };

  const checkMatch = (instId: string, missionId: string) => {
    if (instId === missionId) {
      // Correct!
      const newMatches = [...matchedPairs, instId];
      setMatchedPairs(newMatches);
      setSelectedInstId(null);
      setSelectedMissionId(null);
      setMatchWrongAttempt(false);

      if (newMatches.length === INSTITUCIONES_ESTADO_BIENESTAR.length) {
        setIsMatchGameWon(true);
        if (onUnlockMedal) {
          onUnlockMedal('med_instituciones_bienestar', 'Insignia de Constructora de Instituciones (MEP 6° Grado)');
        }
      }
    } else {
      // Wrong
      setMatchWrongAttempt(true);
      setTimeout(() => {
        setSelectedInstId(null);
        setSelectedMissionId(null);
        setMatchWrongAttempt(false);
      }, 1000);
    }
  };

  const currentQ = currentExamQuestions[examIdx];
  const examPercentage = Math.round((score / (currentExamQuestions.length || 1)) * 100);

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* HEADER PRINCIPAL CON TEMÁTICA HISTÓRICA */}
      <div className="bg-gradient-to-r from-amber-950/70 via-stone-900 to-emerald-950/70 border border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase bg-amber-500 text-stone-950 px-3 py-1 rounded-full shadow-md">
                🇨🇷 MEP • ESTUDIOS SOCIALES 6° GRADO
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                ★ PRÁCTICA OFICIAL PARA EXAMEN
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
              <span>🏛️</span>
              <span>La Guerra de 1948 & El Estado de Bienestar</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Guía completa e interactiva para que tu hija domine con 100% de éxito los temas clave: <strong>Abolición del Ejército</strong>, <strong>Logros de las Instituciones Autónomas (ICE, INVU, AyA, CCSS, CNP)</strong>, <strong>Impacto en la vida cotidiana</strong>, <strong>Desafíos de la sociedad actual</strong> y <strong>Espacios de participación ciudadana</strong>.
            </p>
          </div>

          {/* BOTÓN ALBERT EINSTEIN CONSEJERO */}
          <div className="bg-stone-950/90 border border-amber-500/40 rounded-2xl p-3.5 flex items-center gap-3 shrink-0 shadow-xl max-w-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
              👴
            </div>
            <div className="text-left">
              <span className="text-[9px] font-mono font-black text-amber-400 uppercase block">Tutor Albert Einstein</span>
              <p className="text-[11px] text-stone-300 italic leading-snug">
                "Costa Rica cambió los cuarteles por aulas escolares. ¡Aprende con orgullo tu historia!"
              </p>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN ENTRE SECCIONES DE ESTUDIOS SOCIALES */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-stone-800">
          <button
            onClick={() => { setActiveTab('examen'); stopSpeaking(); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'examen'
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30 font-black'
                : 'bg-stone-950 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Simulador de Examen (20 Preguntas)</span>
          </button>

          <button
            onClick={() => { setActiveTab('guia'); stopSpeaking(); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'guia'
                ? 'bg-emerald-600 text-stone-950 shadow-lg shadow-emerald-500/30 font-black'
                : 'bg-stone-950 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fichas de Estudio & Resúmenes</span>
          </button>

          <button
            onClick={() => { setActiveTab('emparejamiento'); stopSpeaking(); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'emparejamiento'
                ? 'bg-cyan-500 text-stone-950 shadow-lg shadow-cyan-500/30 font-black'
                : 'bg-stone-950 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Juego: Instituciones Benefactoras</span>
          </button>

          <button
            onClick={() => { setActiveTab('linea_tiempo'); stopSpeaking(); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'linea_tiempo'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 font-black'
                : 'bg-stone-950 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Línea del Tiempo (1940 - Hoy)</span>
          </button>

          <button
            onClick={() => { setActiveTab('imprimir'); stopSpeaking(); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'imprimir'
                ? 'bg-stone-200 text-stone-950 font-black'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Ficha para Imprimir</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SECCIÓN: SIMULADOR DE EXAMEN INTERACTIVO */}
      {/* ========================================================================= */}
      {activeTab === 'examen' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          {/* HEADER DEL EXAMEN */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded font-bold border border-amber-500/30">
                  EVALUACIÓN SUMATIVA
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  Tipo: Selección Única (MEP Costa Rica)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase mt-1">
                Práctica de Examen: 1948, Estado de Bienestar & Desafíos
              </h3>
            </div>

            {/* FILTRO DE TEMAS DEL EXAMEN */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={examMode}
                onChange={(e) => setExamMode(e.target.value as any)}
                className="bg-stone-950 text-stone-200 text-xs font-bold rounded-xl px-3 py-2 border border-stone-800 focus:outline-none focus:border-amber-500"
              >
                <option value="all">Todas las 20 Preguntas (Examen Completo)</option>
                <option value="guerra_1948">1. Guerra de 1948 & Abolición del Ejército</option>
                <option value="estado_bienestar">2. Estado Benefactor & Instituciones</option>
                <option value="vida_cotidiana">3. Impacto en la Vida Cotidiana</option>
                <option value="retos_sociedad">4. Desafíos de la Sociedad Costarricense</option>
                <option value="participacion_ciudadana">5. Espacios de Participación Ciudadana</option>
              </select>
            </div>
          </div>

          {!isExamCompleted && currentQ ? (
            <div className="space-y-6">
              {/* PROGRESS BAR */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>Pregunta <strong>{examIdx + 1}</strong> de {currentExamQuestions.length}</span>
                  <span>Aciertos: <strong className="text-emerald-400">{score}</strong> / {answeredCount}</span>
                </div>
                <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${((examIdx + 1) / currentExamQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* CARD DE LA PREGUNTA */}
              <div className="bg-stone-950/80 border border-stone-800 p-5 sm:p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase bg-amber-950/60 text-amber-300 px-3 py-1 rounded-full border border-amber-900/30">
                    {currentQ.unit}
                  </span>
                  <button
                    onClick={() => speakText(`${currentQ.question}. Las opciones son: ${currentQ.options.join('. ')}`)}
                    className="flex items-center gap-1 text-stone-400 hover:text-amber-400 text-xs font-mono transition cursor-pointer"
                    title="Escuchar pregunta en voz alta"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isSpeaking ? 'Detener voz' : 'Escuchar pregunta'}</span>
                  </button>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-stone-100 leading-relaxed">
                  {currentQ.question}
                </h4>

                {/* OPCIONES DE RESPUESTA */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentQ.options.map((option, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    let optionStyle = 'bg-stone-900/90 text-stone-300 border-stone-800 hover:border-amber-500/50 hover:bg-stone-850';

                    if (isAnswerSubmitted) {
                      if (oIdx === currentQ.answerIdx) {
                        optionStyle = 'bg-emerald-950/60 text-emerald-200 border-emerald-500 font-bold';
                      } else if (isSelected && oIdx !== currentQ.answerIdx) {
                        optionStyle = 'bg-rose-950/60 text-rose-200 border-rose-500';
                      } else {
                        optionStyle = 'bg-stone-950/40 text-stone-500 border-stone-850 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-amber-950/40 text-amber-300 border-amber-500 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectOption(oIdx)}
                        className={`p-4 rounded-xl text-xs sm:text-sm text-left border transition-all cursor-pointer flex items-start gap-3 ${optionStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{option}</span>
                        {isAnswerSubmitted && oIdx === currentQ.answerIdx && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {isAnswerSubmitted && isSelected && oIdx !== currentQ.answerIdx && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* BOTÓN CALIFICAR O RETROALIMENTACIÓN */}
                {!isAnswerSubmitted ? (
                  <div className="pt-2 flex justify-end">
                    <button
                      disabled={selectedOption === null}
                      onClick={handleSubmitAnswer}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-emerald-500 text-stone-950 font-black rounded-xl text-xs uppercase cursor-pointer hover:opacity-95 disabled:opacity-40 shadow-lg"
                    >
                      Verificar Respuesta 📝
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-3 border-t border-stone-800">
                    <div className={`p-4 rounded-2xl border ${
                      selectedOption === currentQ.answerIdx
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    }`}>
                      <div className="flex items-center gap-2 font-black text-xs uppercase mb-1">
                        {selectedOption === currentQ.answerIdx ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>¡Excelente! Respuesta Correcta</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Respuesta Incorrecta • ¡Aprende para el Examen!</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed mb-2">
                        {currentQ.explanation}
                      </p>
                      <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-[11px] text-amber-300 italic flex items-center gap-2">
                        <span>👴</span>
                        <span>Consejo de Albert Einstein: "{currentQ.einsteinAdvice}"</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => speakText(`${currentQ.explanation}. Consejo de Albert Einstein: ${currentQ.einsteinAdvice}`)}
                        className="px-3 py-1.5 bg-stone-950 hover:bg-stone-850 text-stone-300 border border-stone-800 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Escuchar Explicación</span>
                      </button>

                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase cursor-pointer flex items-center gap-2 shadow-lg"
                      >
                        <span>{examIdx < currentExamQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados Finales'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* PANTALLA DE RESULTADOS FINALES */
            <div className="text-center py-8 space-y-6 bg-stone-950 rounded-3xl border border-amber-500/30 p-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-4xl shadow-2xl">
                {examPercentage >= 80 ? '🏆' : examPercentage >= 65 ? '🎖️' : '📚'}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase bg-amber-950 text-amber-400 px-3 py-1 rounded-full border border-amber-800/40">
                  REPORTE OFICIAL DE PRÁCTICA
                </span>
                <h3 className="text-2xl font-black text-white uppercase">
                  {examPercentage >= 80 ? '¡Dominio Extraordinario del Tema!' : examPercentage >= 65 ? '¡Muy Buen Trabajo!' : '¡Sigue Practicando!'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
                  Tu hija obtuvo una calificación de <strong>{examPercentage}%</strong> ({score} de {currentExamQuestions.length} respuestas correctas).
                </p>
              </div>

              <div className="max-w-xs mx-auto p-4 bg-stone-900 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>Nota Obtenida:</span>
                  <strong className={`font-mono text-base ${examPercentage >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {examPercentage} / 100
                  </strong>
                </div>
                <div className="flex justify-between text-xs text-stone-300">
                  <span>Condición MEP:</span>
                  <strong className={examPercentage >= 65 ? 'text-emerald-400' : 'text-amber-400'}>
                    {examPercentage >= 65 ? 'APROBADA CON DISTINCIÓN' : 'EN PROCESO DE MEJORA'}
                  </strong>
                </div>
                {examPercentage >= 80 && (
                  <div className="pt-2 border-t border-stone-800 text-[11px] text-amber-400 font-bold flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>¡Medalla Bicentenario Desbloqueada!</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetExam}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repetir Examen Completo</span>
                </button>

                <button
                  onClick={() => setActiveTab('guia')}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 font-bold rounded-xl text-xs uppercase cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Repasar Fichas de Estudio</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SECCIÓN: FICHAS DE ESTUDIO Y RESÚMENES DIDÁCTICOS */}
      {/* ========================================================================= */}
      {activeTab === 'guia' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-300">
            <p>
              Haz clic en cada unidad temática para desplegar los <strong>puntos clave que entran en el examen</strong> y presiona el botón de audio para que Albert Einstein se lo lea a tu hija.
            </p>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-3 py-1 rounded-full shrink-0">
              5 UNIDADES COMPLETAS
            </span>
          </div>

          <div className="space-y-3">
            {ESTUDIOS_SOCIALES_CARDS.map(card => {
              const isExpanded = expandedCardId === card.id;
              const isCardSpeaking = isSpeaking && activeSpeechCardId === card.id;

              return (
                <div
                  key={card.id}
                  className={`bg-stone-900 border rounded-2xl transition-all overflow-hidden ${
                    isExpanded ? 'border-amber-500/50 shadow-xl' : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {/* CARD HEADER */}
                  <div
                    onClick={() => setExpandedCardId(isExpanded ? '' : card.id)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none bg-stone-900 hover:bg-stone-850/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                        {card.unitNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold uppercase bg-stone-950 text-stone-400 px-2 py-0.5 rounded border border-stone-800">
                            {card.unit}
                          </span>
                          <span className="text-[9px] font-mono text-amber-400 font-bold">
                            {card.badge}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
                          {card.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${card.title}. ${card.summary}. Puntos clave: ${card.keyPoints.join('. ')}. Consejo de Albert: ${card.einsteinTip}`, card.id);
                        }}
                        className={`p-2 rounded-xl border transition cursor-pointer ${
                          isCardSpeaking
                            ? 'bg-amber-500 text-stone-950 border-amber-400'
                            : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border-stone-800'
                        }`}
                        title="Escuchar esta unidad en voz alta"
                      >
                        {isCardSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <div className="p-2 text-stone-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* CARD BODY EXPANDIDO */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-stone-950/80 border-t border-stone-850 space-y-5 text-left">
                      <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800">
                        <span className="text-[9px] font-mono uppercase text-amber-400 font-bold block mb-1">
                          Resumen General de la Unidad:
                        </span>
                        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                          {card.summary}
                        </p>
                      </div>

                      {/* PUNTOS CLAVE PARA EL EXAMEN */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                          🎯 Puntos Clave Preguntados en el Examen MEP:
                        </span>
                        <div className="grid grid-cols-1 gap-2.5">
                          {card.keyPoints.map((point, pIdx) => (
                            <div
                              key={pIdx}
                              className="p-3 rounded-xl bg-stone-900 border border-stone-850 text-xs text-stone-300 leading-relaxed flex items-start gap-2.5"
                            >
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="flex-1">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* IMPACTO EN LA VIDA REAL */}
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed space-y-1">
                        <span className="font-bold flex items-center gap-1.5 text-emerald-400 uppercase text-[10px] font-mono">
                          <Home className="w-3.5 h-3.5" />
                          <span>¿Cómo cambió esto la vida cotidiana de las familias?</span>
                        </span>
                        <p>{card.realLifeImpact}</p>
                      </div>

                      {/* CONSEJO DE ALBERT EINSTEIN */}
                      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
                        <span className="text-xl shrink-0">👴</span>
                        <div>
                          <span className="font-bold block uppercase text-[10px] font-mono text-amber-400">
                            Consejo Mnemotécnico de Albert Einstein:
                          </span>
                          <p className="italic leading-relaxed">{card.einsteinTip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SECCIÓN: JUEGO DE EMPAREJAMIENTO DE INSTITUCIONES */}
      {/* ========================================================================= */}
      {activeTab === 'emparejamiento' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded font-bold border border-cyan-500/30">
                JUEGO DIDÁCTICO MEP
              </span>
              <h3 className="text-base sm:text-lg font-black text-white uppercase mt-1">
                Empareja cada Institución con su Misión y Beneficio
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Haz clic primero en la tarjeta de una institución y luego en su descripción correcta. ¡Empareja todas para ganar!
              </p>
            </div>
            <button
              onClick={resetMatchingGame}
              className="px-3 py-1.5 bg-stone-950 hover:bg-stone-850 text-stone-300 border border-stone-800 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 w-fit cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Juego</span>
            </button>
          </div>

          {isMatchGameWon ? (
            <div className="text-center py-10 space-y-4 bg-stone-950 rounded-2xl border border-emerald-500/40 p-6">
              <div className="text-5xl animate-bounce">🎉</div>
              <h4 className="text-xl font-black text-emerald-400 uppercase">
                ¡Felicidades! Has dominado las Instituciones del Estado Benefactor
              </h4>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Tu hija comprende perfectamente el papel del <strong>ICE</strong> (electricidad), <strong>INVU</strong> (vivienda), <strong>AyA</strong> (agua potable), <strong>CNP</strong> (alimentos), <strong>CCSS</strong> (salud) y <strong>TSE</strong> (elecciones libres).
              </p>
              <button
                onClick={resetMatchingGame}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-xl text-xs uppercase cursor-pointer shadow-lg"
              >
                Jugar de Nuevo 🔄
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* COLUMNA IZQUIERDA: INSTITUCIONES */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-bold block border-b border-stone-800 pb-1.5">
                  1. Elige una Institución:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {INSTITUCIONES_ESTADO_BIENESTAR.map(inst => {
                    const isMatched = matchedPairs.includes(inst.id);
                    const isSelected = selectedInstId === inst.id;

                    return (
                      <button
                        key={inst.id}
                        disabled={isMatched}
                        onClick={() => handleSelectInstitution(inst.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                          isMatched
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 opacity-80'
                            : isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                            : 'bg-stone-950 hover:bg-stone-850 text-stone-200 border-stone-800'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center font-black text-xs font-mono shrink-0">
                          {inst.acronym}
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-black block">{inst.fullName}</span>
                          <span className="text-[10px] font-mono text-stone-400">Año: {inst.foundedYear}</span>
                        </div>
                        {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COLUMNA DERECHA: MISIONES DESORDENADAS */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-bold block border-b border-stone-800 pb-1.5">
                  2. Haz clic en su Misión Correspondiente:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {shuffledMissions.map(m => {
                    const isMatched = matchedPairs.includes(m.id);
                    const isSelected = selectedMissionId === m.id;

                    return (
                      <button
                        key={m.id}
                        disabled={isMatched}
                        onClick={() => handleSelectMission(m.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                          isMatched
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 opacity-80'
                            : isSelected
                            ? matchWrongAttempt
                              ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                            : 'bg-stone-950 hover:bg-stone-850 text-stone-300 border-stone-800'
                        }`}
                      >
                        <span className="text-xs leading-relaxed flex-1">{m.mission}</span>
                        {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SECCIÓN: LÍNEA DEL TIEMPO CRONOLÓGICA */}
      {/* ========================================================================= */}
      {activeTab === 'linea_tiempo' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded font-bold border border-purple-500/30">
              CRONOLOGÍA HISTÓRICA MEP
            </span>
            <h3 className="text-base sm:text-lg font-black text-white uppercase mt-1">
              Línea del Tiempo: De las Garantías Sociales a los Retos del Siglo XXI
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Orden cronológico de los hitos que definieron la Costa Rica moderna para memorizar fácilmente las fechas del examen.
            </p>
          </div>

          <div className="relative border-l-2 border-amber-500/40 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-6">
            {ESTUDIOS_SOCIALES_TIMELINE.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* PUNTO DE LA LÍNEA */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-stone-950 border-2 border-amber-400 group-hover:bg-amber-400 group-hover:scale-125 transition-all shadow-md" />

                <div className="bg-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 group-hover:border-amber-500/40 transition-all space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-900/40">
                      {event.year}
                    </span>
                    <span className="text-[9px] font-mono uppercase text-stone-400 bg-stone-900 px-2 py-0.5 rounded">
                      {event.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-stone-100">
                    {event.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SECCIÓN: FICHA PARA IMPRIMIR / DESCARGAR EN PDF */}
      {/* ========================================================================= */}
      {activeTab === 'imprimir' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase bg-stone-800 text-stone-300 px-2.5 py-0.5 rounded font-bold">
                HOJA DE REPASO OFICIAL
              </span>
              <h3 className="text-base sm:text-lg font-black text-white uppercase mt-1">
                Ficha Resumen Lista para Estudiar o Imprimir
              </h3>
            </div>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') window.print();
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Hoja de Repaso</span>
            </button>
          </div>

          <div className="bg-white text-stone-900 p-6 sm:p-8 rounded-2xl space-y-6 text-xs leading-relaxed font-sans shadow-xl">
            <div className="border-b-2 border-stone-900 pb-4 text-center space-y-1">
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
                REPÚBLICA DE COSTA RICA • MINISTERIO DE EDUCACIÓN PÚBLICA
              </h2>
              <h3 className="text-sm font-bold uppercase text-stone-700">
                GUÍA DE ESTUDIO OFICIAL: ESTUDIOS SOCIALES - 6° GRADO
              </h3>
              <p className="text-[11px] text-stone-600">
                Tema: Guerra de 1948, Estado Benefactor, Vida Cotidiana, Retos Ciudadanos y Participación Democrática
              </p>
            </div>

            {/* TABLA SINTÉTICA */}
            <div className="space-y-4">
              <div>
                <h4 className="font-black text-xs uppercase text-amber-800 border-b border-stone-300 pb-1 mb-2">
                  1. La Guerra Civil de 1948 y la Abolición del Ejército
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-[11.5px] text-stone-800">
                  <li><strong>Detonante:</strong> El Congreso anuló las elecciones presidenciales del 8 de febrero de 1948 donde ganó Otilio Ulate.</li>
                  <li><strong>Líder:</strong> Don José Figueres Ferrer lideró el Ejército de Liberación Nacional desde la finca "La Lucha".</li>
                  <li><strong>1 de diciembre de 1948:</strong> Don Pepe Figueres dio un mazazo en el Cuartel Bellavista aboliendo el ejército nacional (hoy Museo Nacional). Se cambió el gasto militar por educación y salud pública.</li>
                  <li><strong>Constitución de 1949:</strong> Otorgó el voto universal a las mujeres (1949), creó el Tribunal Supremo de Elecciones (TSE) independiente y prohibió el ejército permanente (Artículo 12).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase text-emerald-800 border-b border-stone-300 pb-1 mb-2">
                  2. Instituciones Clave del Estado Benefactor y su Misión
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 border rounded bg-stone-50">
                    <strong>⚡ ICE (1949):</strong> Electrificación y telecomunicaciones en todo el país con energía hidroeléctrica limpia.
                  </div>
                  <div className="p-2 border rounded bg-stone-50">
                    <strong>🏠 INVU (1954):</strong> Viviendas de interés social, planificación de barriadas y erradicación de tugurios.
                  </div>
                  <div className="p-2 border rounded bg-stone-50">
                    <strong>💧 AyA (1961):</strong> Agua potable por cañería y saneamiento, reduciendo muertes infantiles por parásitos.
                  </div>
                  <div className="p-2 border rounded bg-stone-50">
                    <strong>🌾 CNP (1948):</strong> Precios justos para granos básicos de agricultores y abastecimiento de alimentos.
                  </div>
                  <div className="p-2 border rounded bg-stone-50">
                    <strong>🏥 CCSS (Universal):</strong> Hospitales, clínicas, vacunas y pensiones de invalidez y vejez para el pueblo.
                  </div>
                  <div className="p-2 border rounded bg-stone-50">
                    <strong>🗳️ TSE (1949):</strong> Elecciones libres, transparentes e imparciales; entrega de la cédula de identidad.
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase text-blue-800 border-b border-stone-300 pb-1 mb-2">
                  3. Impacto en la Vida Cotidiana & Nacimiento de la Clase Media
                </h4>
                <p className="text-[11.5px] text-stone-800">
                  La llegada de la luz y el agua potable permitió el uso de refrigeradoras, planchas y mejor higiene; la vacunación y la CCSS elevaron la esperanza de vida de 46 a más de 76 años; en 1959 se aprobó el Aguinaldo (mes 13); y la educación gratuita permitió a hijos de campesinos convertirse en profesionales.
                </p>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase text-rose-800 border-b border-stone-300 pb-1 mb-2">
                  4. Retos Contemporáneos de la Sociedad Costarricense
                </h4>
                <p className="text-[11.5px] text-stone-800">
                  Erradicar la pobreza (que afecta al 20% de las familias), cerrar la brecha regional y digital entre la GAM y las costas/zonas rurales, proteger los ríos y mantos acuíferos frente a la contaminación, y generar empleo digno para jóvenes y mujeres.
                </p>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase text-purple-800 border-b border-stone-300 pb-1 mb-2">
                  5. Espacios de Participación Ciudadana
                </h4>
                <p className="text-[11.5px] text-stone-800">
                  <strong>ADI:</strong> Asociaciones de desarrollo que mejoran el barrio. • <strong>Juntas de Educación:</strong> Mantienen comedores y escuelas. • <strong>CCDR:</strong> Comités de deportes y recreación cantonal. • <strong>Gobiernos Estudiantiles:</strong> Elecciones en escuelas donde los niños aprenden a dialogar y elegir con responsabilidad.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-300 text-center font-mono text-[10px] text-stone-500">
              Documento de Preparación para Examen MEP 6° Grado • Academia Virtual Educativa
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
