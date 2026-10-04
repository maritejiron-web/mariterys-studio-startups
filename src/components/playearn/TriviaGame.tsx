import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  Trophy,
  Flame,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  DollarSign,
  Gem,
  Diamond,
  ShieldCheck,
  Tv,
  HelpCircle as QuestionIcon,
  Play
} from 'lucide-react';
import { TRIVIA_QUESTIONS } from './gameData';
import { TriviaQuestion } from './types';

interface TriviaGameProps {
  userGems: number;
  onTriviaAnswered: (
    isCorrect: boolean,
    rewardUSD: number,
    gems: number,
    diamonds: number,
    streak: number,
    category: string
  ) => void;
  onOpenAdModal?: () => void;
}

export const TriviaGame: React.FC<TriviaGameProps> = ({
  userGems,
  onTriviaAnswered,
  onOpenAdModal
}) => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>(TRIVIA_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Temporizador por pregunta
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Comodines
  const [removedOptions, setRemovedOptions] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Bono de anuncio patrocinado post-victoria
  const [isBonusAdPlaying, setIsBonusAdPlaying] = useState(false);
  const [bonusAdCountdown, setBonusAdCountdown] = useState(12);
  const [bonusAdClaimed, setBonusAdClaimed] = useState(false);

  const currentQ = questions[currentIndex] || TRIVIA_QUESTIONS[0];

  // Categorías disponibles
  const categories = ['Todas', ...Array.from(new Set(TRIVIA_QUESTIONS.map((q) => q.category)))];

  // Filtrado por categoría
  const filteredQuestions = selectedCategory === 'Todas'
    ? questions
    : questions.filter((q) => q.category === selectedCategory);

  const activeQuestion = filteredQuestions[currentIndex % filteredQuestions.length] || TRIVIA_QUESTIONS[0];

  // Temporizador de 15s por pregunta
  useEffect(() => {
    let timer: any = null;
    if (isTimerActive && !isAnswerSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, isAnswerSubmitted, timeLeft]);

  // Si se agota el tiempo
  const handleTimeOut = () => {
    setIsAnswerSubmitted(true);
    setStreak(0);
    onTriviaAnswered(false, 0, 0, 0, 0, activeQuestion.category);
  };

  // Seleccionar respuesta
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);
    setIsTimerActive(false);

    const isCorrect = index === activeQuestion.correctAnswerIndex;

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);

      // Multiplicador según racha
      let multiplier = 1.0;
      if (nextStreak === 2) multiplier = 1.2;
      else if (nextStreak === 3) multiplier = 1.5;
      else if (nextStreak === 4) multiplier = 2.0;
      else if (nextStreak >= 5) multiplier = 3.0;

      const finalUSD = Number((activeQuestion.rewardUSD * multiplier).toFixed(2));
      const finalGems = Math.round(activeQuestion.rewardGems * multiplier);
      const finalDiamonds = Math.round(activeQuestion.rewardDiamonds * multiplier);

      onTriviaAnswered(true, finalUSD, finalGems, finalDiamonds, nextStreak, activeQuestion.category);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      setStreak(0);
      onTriviaAnswered(false, 0, 0, 0, 0, activeQuestion.category);
    }
  };

  // Comodín 50/50 (elimina 2 opciones incorrectas)
  const handleUse5050 = () => {
    if (removedOptions.length > 0 || isAnswerSubmitted) return;
    const incorrectIndices = activeQuestion.options
      .map((_, i) => i)
      .filter((i) => i !== activeQuestion.correctAnswerIndex);
    // Eliminar los primeros dos incorrectos
    setRemovedOptions(incorrectIndices.slice(0, 2));
  };

  // Comodín Pista Inteligente
  const handleUseHint = () => {
    setShowHint(true);
  };

  // Siguiente pregunta
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(15);
    setIsTimerActive(true);
    setRemovedOptions([]);
    setShowHint(false);
    setBonusAdClaimed(false);
    setIsBonusAdPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  // Anuncio Patrocinado para Duplicar Recompensa
  const handleStartBonusAd = () => {
    setIsBonusAdPlaying(true);
    setBonusAdCountdown(12);
  };

  // Temporizador del Anuncio Patrocinado de Trivia (con regla de cuenta regresiva)
  useEffect(() => {
    let adTimer: any = null;
    if (isBonusAdPlaying && bonusAdCountdown > 0) {
      adTimer = setInterval(() => {
        setBonusAdCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(adTimer);
            handleFinishBonusAd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (adTimer) clearInterval(adTimer);
    };
  }, [isBonusAdPlaying, bonusAdCountdown]);

  const handleFinishBonusAd = () => {
    setIsBonusAdPlaying(false);
    setBonusAdClaimed(true);
    // Duplicar el premio otorgando un bono extra igual
    const bonusUSD = activeQuestion.rewardUSD;
    const bonusGems = activeQuestion.rewardGems;
    const bonusDiamonds = activeQuestion.rewardDiamonds;
    onTriviaAnswered(true, bonusUSD, bonusGems, bonusDiamonds, streak, activeQuestion.category);

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  const isCorrectAnswer = selectedOption === activeQuestion.correctAnswerIndex;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* HEADER DE TRIVIA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Trivias Monetizadas en Vivo</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            🎯 Reto de Preguntas & Ganancia Real
          </h2>
        </div>

        {/* CONTADOR DE RACHA Y MULTIPLICADOR */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 px-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 font-mono">
            <Flame className={`w-5 h-5 ${streak > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-600'}`} />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Racha Activa</span>
              <span className="text-sm font-black text-amber-300">
                {streak} {streak === 1 ? 'Acierto' : 'Aciertos'}
              </span>
            </div>
          </div>

          <div className="h-7 w-px bg-slate-800" />

          <div className="font-mono">
            <span className="text-[10px] text-slate-400 block font-bold">Multiplicador</span>
            <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {streak >= 5 ? 'x3.0 🔥' : streak === 4 ? 'x2.0' : streak === 3 ? 'x1.5' : streak === 2 ? 'x1.2' : 'x1.0'}
            </span>
          </div>
        </div>
      </div>

      {/* SELECTOR DE CATEGORÍA */}
      <div className="my-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswerSubmitted(false);
              setTimeLeft(15);
              setIsTimerActive(true);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono whitespace-nowrap cursor-pointer transition-all border ${
              selectedCategory === cat
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TARJETA DE PREGUNTA */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-5 relative">
        {/* BARRA SUPERIOR DE TIEMPO Y DIFICULTAD */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
              {activeQuestion.category}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              activeQuestion.difficulty === 'Fácil'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : activeQuestion.difficulty === 'Medio'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {activeQuestion.difficulty}
            </span>
          </div>

          {/* CRONÓMETRO REGRESIVO */}
          <div className="flex items-center gap-2 font-mono">
            <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-400 animate-spin' : 'text-cyan-400'}`} />
            <span className={`text-sm font-black ${
              timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'
            }`}>
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
            </span>
          </div>
        </div>

        {/* BARRA DE PROGRESO DEL TIEMPO */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-5">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              timeLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-500 to-teal-400'
            }`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>

        {/* ENUNCIADO DE LA PREGUNTA */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
          {activeQuestion.question}
        </h3>

        {/* OPCIONES DE RESPUESTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {activeQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === activeQuestion.correctAnswerIndex;
            const isRemoved = removedOptions.includes(idx);

            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
              } else {
                btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-40';
              }
            }

            if (isRemoved) {
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-dashed border-slate-800 text-slate-600 text-xs font-mono line-through flex items-center justify-center opacity-30"
                >
                  Opción descartada (50/50)
                </div>
              );
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* COMODINES DE APOYO */}
        {!isAnswerSubmitted && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs font-mono">
            <span className="text-slate-500">Comodines de ayuda:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUse5050}
                disabled={removedOptions.length > 0}
                className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                <span>50/50</span>
              </button>
              <button
                onClick={handleUseHint}
                disabled={showHint}
                className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pista</span>
              </button>
            </div>
          </div>
        )}

        {/* PISTA INTELIGENTE DESPLEGADA */}
        {showHint && !isAnswerSubmitted && (
          <div className="mt-3 p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-200">
            💡 <strong>Pista de la Trivia:</strong> Piensa en los orígenes históricos o el contexto de la época de la pregunta.
          </div>
        )}

        {/* EXPLICACIÓN Y RESULTADO DE LA RESPUESTA */}
        <AnimatePresence>
          {isAnswerSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl border ${
                isCorrectAnswer
                  ? 'bg-emerald-950/50 border-emerald-500/40'
                  : 'bg-rose-950/40 border-rose-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className={`text-sm font-bold font-mono ${
                    isCorrectAnswer ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isCorrectAnswer ? '¡CORRECTO! 🎉' : 'RESPUESTA INCORRECTA ❌'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {activeQuestion.explanation}
                  </p>
                </div>

                {isCorrectAnswer && (
                  <div className="text-right shrink-0 font-mono">
                    <span className="text-xs text-emerald-400 font-bold block">
                      +${activeQuestion.rewardUSD.toFixed(2)} USD
                    </span>
                    <span className="text-[11px] text-amber-400 block">
                      +{activeQuestion.rewardGems} 💎
                    </span>
                  </div>
                )}
              </div>

              {/* OPCIÓN DE DUPLICAR CON ANUNCIO PATROCINADO */}
              {isCorrectAnswer && !bonusAdClaimed && !isBonusAdPlaying && (
                <div className="mt-3 pt-3 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>¿Quieres duplicar tu ganancia a <strong>+${(activeQuestion.rewardUSD * 2).toFixed(2)} USD</strong>?</span>
                  </div>
                  <button
                    onClick={handleStartBonusAd}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Ver Anuncio Corto (12s)</span>
                  </button>
                </div>
              )}

              {/* REPRODUCTOR EN VIVO DE ANUNCIO BONO */}
              {isBonusAdPlaying && (
                <div className="mt-3 p-3 bg-slate-950 border border-amber-500 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-xs font-mono text-white">
                      Mirando Anuncio Patrocinado de Trivia: <strong>00:{bonusAdCountdown < 10 ? `0${bonusAdCountdown}` : bonusAdCountdown}s</strong>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    Regla Anti-Corte Activa
                  </span>
                </div>
              )}

              {bonusAdClaimed && (
                <div className="mt-3 p-2.5 bg-emerald-900/80 border border-emerald-600 rounded-xl text-center text-xs font-mono text-emerald-200 font-bold">
                  🎉 ¡Bono de Anuncio Acreditado! Ganancia duplicada con éxito.
                </div>
              )}

              {/* BOTÓN PARA SIGUIENTE PREGUNTA */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/10"
                >
                  <span>Siguiente Pregunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RECOMPENSAS DESTACADAS Y RECORDATORIO */}
      <div className="grid grid-cols-3 gap-3 text-center font-mono">
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block font-bold">Ganancia Base</span>
          <span className="text-sm font-black text-emerald-400">+${activeQuestion.rewardUSD.toFixed(2)} USD</span>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block font-bold">Gemas Ganadas</span>
          <span className="text-sm font-black text-amber-400">+{activeQuestion.rewardGems} 💎</span>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block font-bold">Diamantes VIP</span>
          <span className="text-sm font-black text-purple-400">+{activeQuestion.rewardDiamonds} 💠</span>
        </div>
      </div>
    </div>
  );
};
