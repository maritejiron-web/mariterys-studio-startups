import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Calculator, GraduationCap, Sparkles, CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, Gem, Diamond, DollarSign } from 'lucide-react';
import { MATH_KIDS_QUESTIONS, MATH_TEENS_QUESTIONS } from './gameData';
import { MathQuestion } from './types';

interface MathGamesProps {
  onQuestionAnswered: (rewardUSD: number, rewardGems: number, rewardDiamonds: number) => void;
}

export const MathGames: React.FC<MathGamesProps> = ({ onQuestionAnswered }) => {
  const [level, setLevel] = useState<'kids' | 'teens'>('kids');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);

  const questionsList = level === 'kids' ? MATH_KIDS_QUESTIONS : MATH_TEENS_QUESTIONS;
  const currentQ: MathQuestion = questionsList[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;

    if (isCorrect) {
      setScore((s) => s + 1);
      if (!answeredIds.includes(currentQ.id)) {
        setAnsweredIds((prev) => [...prev, currentQ.id]);
        onQuestionAnswered(currentQ.rewardUSD, currentQ.rewardGems, currentQ.rewardDiamonds);
      }

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % questionsList.length);
  };

  const handleSwitchLevel = (newLevel: 'kids' | 'teens') => {
    setLevel(newLevel);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Academia de Retos Numéricos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          🧮 Matemáticas Interactivas por Premios
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Pon a prueba tu agilidad mental resolviendo problemas matemáticos. Selecciona tu nivel según tu edad y gana recompensas por cada respuesta correcta.
        </p>
      </div>

      {/* Selector de Nivel (Kids hasta 12 años vs Colegio) */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => handleSwitchLevel('kids')}
          className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
            level === 'kids'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Niños (Hasta 12 años)</span>
        </button>

        <button
          onClick={() => handleSwitchLevel('teens')}
          className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
            level === 'teens'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-500/20'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Jóvenes de Colegio (Secundaria)</span>
        </button>
      </div>

      {/* Tarjeta de Pregunta */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg font-bold">
              Tema: {currentQ.topic}
            </span>
            <span className="bg-slate-800/80 text-amber-400 px-2.5 py-1 rounded-lg">
              Dificultad: {currentQ.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span>+${currentQ.rewardUSD.toFixed(2)} USD</span>
            <span>+{currentQ.rewardGems} 💎</span>
            <span>+{currentQ.rewardDiamonds} 💠</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-mono text-slate-500 uppercase block mb-1">
            Pregunta {currentIdx + 1} de {questionsList.length}:
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Opciones de respuesta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswerIndex;

            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
              }
            } else if (isSelected) {
              btnStyle = 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-500/10';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`p-4 rounded-xl border text-left font-mono text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Explicación y botón de avanzar */}
        {isAnswerSubmitted && (
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              💡 Explicación del Resultado:
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20"
            >
              Comprobar Respuesta ✓
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Siguiente Pregunta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
