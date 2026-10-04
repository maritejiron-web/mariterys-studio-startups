import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { BookOpen, Award, Sparkles, ChevronLeft, ChevronRight, Moon, Sun, CheckCircle2, Bookmark, Diamond, DollarSign } from 'lucide-react';
import { EBOOKS_CATALOG } from './gameData';
import { EbookItem } from './types';

interface EbookReaderProps {
  onChapterCompleted: (rewardUSD: number, rewardDiamonds: number) => void;
}

export const EbookReader: React.FC<EbookReaderProps> = ({ onChapterCompleted }) => {
  const [selectedBook, setSelectedBook] = useState<EbookItem | null>(EBOOKS_CATALOG[0]);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const chapter = selectedBook?.chapters[currentChapterIdx];
  const chapterKey = `${selectedBook?.id}-ch-${currentChapterIdx}`;
  const isChapterClaimed = completedChapters.includes(chapterKey);

  const handleClaimReward = () => {
    if (!selectedBook || isChapterClaimed) return;

    setCompletedChapters((prev) => [...prev, chapterKey]);
    onChapterCompleted(selectedBook.rewardPerChapterUSD, selectedBook.rewardPerChapterDiamonds);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Biblioteca Digital & Lectura Recompensada</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          📖 Biblioteca de Ebooks & Sabiduría
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Lee resúmenes y capítulos seleccionados de finanzas, tecnología y ciencia. Recibe dólares reales ($ USD) y diamantes (💠) al terminar cada capítulo.
        </p>
      </div>

      {/* Selector de Libros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {EBOOKS_CATALOG.map((book) => {
          const isSelected = selectedBook?.id === book.id;
          return (
            <button
              key={book.id}
              onClick={() => {
                setSelectedBook(book);
                setCurrentChapterIdx(0);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded-lg border border-slate-700 shadow-md shrink-0"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                    {book.category}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                    {book.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {book.author}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{book.chapters.length} Capítulos</span>
                <span className="text-emerald-400 font-bold">
                  +${book.rewardPerChapterUSD.toFixed(2)}/cap
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lector Activo */}
      {selectedBook && chapter && (
        <div className={`rounded-3xl border transition-colors ${
          isDarkMode
            ? 'bg-slate-950 border-slate-800 text-slate-200'
            : 'bg-amber-50/95 border-amber-200 text-stone-900'
        }`}>
          {/* Barra de herramientas del lector */}
          <div className="p-4 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-500 font-bold block">
                {selectedBook.title}
              </span>
              <h3 className="text-base font-bold">
                Capítulo {chapter.chapterNumber}: {chapter.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Cambiar tamaño de fuente"
              >
                {fontSize === 'normal' ? 'A+' : 'A-'}
              </button>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Modo Lectura Noche / Día"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            </div>
          </div>

          {/* Contenido del Capítulo */}
          <div className={`p-6 sm:p-8 space-y-4 leading-relaxed ${
            fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
          }`}>
            {chapter.content.map((paragraph, idx) => (
              <p key={idx} className="indent-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pie del Lector & Reclamar Recompensa */}
          <div className="p-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentChapterIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentChapterIdx === 0}
                className="p-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 rounded-xl border border-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono">
                Capítulo {currentChapterIdx + 1} de {selectedBook.chapters.length}
              </span>
              <button
                onClick={() =>
                  setCurrentChapterIdx((prev) =>
                    Math.min(selectedBook.chapters.length - 1, prev + 1)
                  )
                }
                disabled={currentChapterIdx === selectedBook.chapters.length - 1}
                className="p-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 rounded-xl border border-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div>
              {isChapterClaimed ? (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recompensa de capítulo reclamada ✓</span>
                </div>
              ) : (
                <button
                  onClick={handleClaimReward}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>He leído el capítulo • Reclamar +${selectedBook.rewardPerChapterUSD.toFixed(2)} USD</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
