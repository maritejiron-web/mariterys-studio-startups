import React, { useState } from 'react';
import { 
  GraduationCap, 
  Megaphone, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Volume2, 
  DollarSign, 
  TrendingUp, 
  Share2, 
  Award, 
  BookOpen, 
  Lightbulb, 
  Copy, 
  Check, 
  Layers, 
  Zap, 
  HelpCircle,
  BarChart3,
  Flame,
  ArrowRight,
  Smartphone,
  Video,
  Target,
  MessageCircle
} from 'lucide-react';

interface CourseModule {
  id: string;
  category: 'marketing' | 'ads' | 'english';
  title: string;
  duration: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  description: string;
  lessonsCount: number;
  highlightBenefit: string;
}

export const StreamerAcademy: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'marketing' | 'ads' | 'english'>('marketing');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('mkt-1');
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('streampay_completed_lessons');
      return saved ? JSON.parse(saved) : ['mkt-1'];
    }
    return ['mkt-1'];
  });
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  // Interactive English Audio Pronunciation
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Ads Simulator State
  const [adBudgetUSD, setAdBudgetUSD] = useState<number>(5);
  const [adPlatform, setAdPlatform] = useState<'meta' | 'tiktok'>('tiktok');
  const [adNiche, setAdNiche] = useState<'education' | 'streaming' | 'fitness'>('education');

  // TikTok Toolkit States
  const [tiktokNiche, setTiktokNiche] = useState<'education' | 'streaming' | 'music' | 'fitness' | 'humor'>('streaming');
  const [tiktokGoal, setTiktokGoal] = useState<'micro_tips' | 'ppv_workshop' | 'founder_offer'>('micro_tips');
  const [copiedTikTokKey, setCopiedTikTokKey] = useState<string | null>(null);

  const handleCopyTikTok = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTikTokKey(key);
    setTimeout(() => setCopiedTikTokKey(null), 2500);
  };

  const handleSpeakEnglish = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      setSpeakingText(text);
      utterance.onend = () => setSpeakingText(null);
      utterance.onerror = () => setSpeakingText(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleCompleteLesson = (lessonId: string) => {
    setCompletedLessons(prev => {
      const next = prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('streampay_completed_lessons', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2500);
  };

  // Estimated Ads Calculation
  const estimatedReach = adBudgetUSD * (adPlatform === 'tiktok' ? 650 : 450);
  const estimatedClicks = Math.round(adBudgetUSD * (adPlatform === 'tiktok' ? 24 : 19));
  const estimatedNewMembers = Math.round(estimatedClicks * (adNiche === 'education' ? 0.12 : 0.08));
  const estimatedRevenueMin = estimatedNewMembers * (adNiche === 'education' ? 15 : 8);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      
      {/* Hero Banner with Academic Motivation */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-indigo-500/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Academia de Creadores StreamPAY • 100% Gratuita para Afiliados</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Herramientas de Superación & Cursos Prácticos para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Multiplicar tus Ingresos</span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              En StreamPAY no solo te damos la tecnología para cobrar al 0% de comisión; también te enseñamos cómo atraer miles de personas a tus clases y transmisiones con <strong>Marketing Orgánico</strong>, guías de <strong>Anuncios de Bajo Presupuesto ($1-$5/día)</strong> y un curso intensivo de <strong>Inglés Básico para Creadores</strong>.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="w-full md:w-auto shrink-0 bg-slate-950/80 border border-indigo-500/40 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-400 font-semibold">Tu Progreso de Superación:</span>
              <span className="text-indigo-400 font-mono font-black">{completedLessons.length} / 9 Lecciones</span>
            </div>
            
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 min-w-[200px]">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (completedLessons.length / 9) * 100)}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <Award className="w-4 h-4" />
              <span>{completedLessons.length >= 6 ? 'Certificado Streamer PRO Desbloqueado' : 'Completa 6 lecciones para tu Certificado'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => {
            setActiveTrack('marketing');
            setSelectedLessonId('mkt-1');
          }}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
            activeTrack === 'marketing'
              ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400 text-white shadow-lg'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            activeTrack === 'marketing' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">Módulo 1</div>
            <div className="font-bold text-sm text-white">Marketing & Viralidad</div>
            <div className="text-[11px] text-slate-400">Algoritmos y conversión</div>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveTrack('ads');
            setSelectedLessonId('ads-1');
          }}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
            activeTrack === 'ads'
              ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-pink-500/10 border-emerald-400 text-white shadow-lg'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            activeTrack === 'ads' ? 'bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
          }`}>
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Módulo 2</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 font-mono font-bold">TIKTOK</span>
            </div>
            <div className="font-bold text-sm text-white">Anuncios ($1-$5)</div>
            <div className="text-[11px] text-slate-400">Spark Ads y guiones</div>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveTrack('english');
            setSelectedLessonId('eng-1');
          }}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
            activeTrack === 'english'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400 text-white shadow-lg'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            activeTrack === 'english' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">Módulo 3</div>
            <div className="font-bold text-sm text-white">Inglés de Streaming</div>
            <div className="text-[11px] text-slate-400">Audiencia global y tips</div>
          </div>
        </button>
      </div>

      {/* TRACK 1: MARKETING CONTENT */}
      {activeTrack === 'marketing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Lessons List (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold px-1">
              Lecciones del Módulo Marketing
            </div>

            <button
              onClick={() => setSelectedLessonId('mkt-1')}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedLessonId === 'mkt-1'
                  ? 'bg-slate-900 border-indigo-400 text-white'
                  : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-bold">Lección 1.1</span>
                {completedLessons.includes('mkt-1') && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <h4 className="font-bold text-sm text-white mt-1">El Gancho de 3 Segundos</h4>
              <p className="text-xs text-slate-400 mt-1">Cómo evitar que hagan swipe en TikTok, Reels y Shorts.</p>
            </button>

            <button
              onClick={() => setSelectedLessonId('mkt-2')}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedLessonId === 'mkt-2'
                  ? 'bg-slate-900 border-indigo-400 text-white'
                  : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-bold">Lección 1.2</span>
                {completedLessons.includes('mkt-2') && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <h4 className="font-bold text-sm text-white mt-1">Psicología de la Micro-Propina</h4>
              <p className="text-xs text-slate-400 mt-1">Cómo pedir apoyo voluntario sin sonar pedigüeño.</p>
            </button>

            <button
              onClick={() => setSelectedLessonId('mkt-3')}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedLessonId === 'mkt-3'
                  ? 'bg-slate-900 border-indigo-400 text-white'
                  : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-bold">Lección 1.3</span>
                {completedLessons.includes('mkt-3') && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <h4 className="font-bold text-sm text-white mt-1">Embudos de Creadores a Clientes</h4>
              <p className="text-xs text-slate-400 mt-1">Llevar alumnos de videos gratuitos a cursos Pay-Per-View.</p>
            </button>
          </div>

          {/* Lesson Content Area (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            
            {selectedLessonId === 'mkt-1' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-bold">Módulo 1 • Lección 1</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">La Regla de los 3 Segundos para Creadores y Maestros</h3>
                  </div>
                  <button
                    onClick={() => toggleCompleteLesson('mkt-1')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      completedLessons.includes('mkt-1')
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{completedLessons.includes('mkt-1') ? 'Completada' : 'Marcar Completada'}</span>
                  </button>
                </div>

                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p>
                    En plataformas de video corto y streaming, el 78% de los espectadores decide si se queda o pasa al siguiente video en los <strong>primeros 3 segundos</strong>.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <strong className="text-amber-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-400" />
                      Los 3 Pecados Mortales que Matan la Retención:
                    </strong>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
                      <li>Empezar diciendo: <em>"Hola amigos, ¿cómo están? Hoy les vengo a hablar de..."</em> (¡Aburrido, la gente ya se fue!).</li>
                      <li>Poner intros con logotipos largos de más de 2 segundos.</li>
                      <li>No mostrar el resultado o el dolor antes de explicar la solución.</li>
                    </ul>
                  </div>

                  <h4 className="font-bold text-white text-base pt-2">Plantillas de Guiones Virales Listos para Usar:</h4>
                  
                  {/* Copyable Scripts */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-300">Plantilla A: Para Maestros y Educadores</span>
                        <button
                          onClick={() => handleCopy('Si a tus hijos o a ti les cuesta entender fracciones/inglés, es porque te lo explicaron al revés. Quédate 30 segundos y te prometo que nunca se te volverá a olvidar:', 'script-edu')}
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          {copiedScript === 'script-edu' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedScript === 'script-edu' ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                        "Si a tus hijos o a ti les cuesta entender [Tema difícil], es porque te lo explicaron al revés. Quédate 30 segundos y te prometo que nunca se te volverá a olvidar:"
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300">Plantilla B: Para Streamers y Gamers</span>
                        <button
                          onClick={() => handleCopy('El 99% de los jugadores comete este error garrafal en esta partida. Mira exactamente qué hice para dar vuelta el juego en 10 segundos:', 'script-stream')}
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          {copiedScript === 'script-stream' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedScript === 'script-stream' ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                        "El 99% de la gente comete este error garrafal. Mira exactamente qué hice para dar vuelta este resultado en 10 segundos:"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedLessonId === 'mkt-2' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-bold">Módulo 1 • Lección 2</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">Psicología de la Micro-Propina: Reciprocidad Directa</h3>
                  </div>
                  <button
                    onClick={() => toggleCompleteLesson('mkt-2')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      completedLessons.includes('mkt-2')
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{completedLessons.includes('mkt-2') ? 'Completada' : 'Marcar Completada'}</span>
                  </button>
                </div>

                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p>
                    La mayoría de creadores siente vergüenza de pedir apoyo económico porque lo plantean como una limosna. En StreamPAY, el modelo se basa en el principio de <strong>"Valor Entregado Primero, Agradecimiento Voluntario Después"</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1 text-xs">
                      <span className="text-red-400 font-bold">❌ Cómo NO pedirlo:</span>
                      <p className="text-slate-400 italic">"Por favor suscríbanse y déjenme algo de plata que tengo que pagar el internet."</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1 text-xs">
                      <span className="text-emerald-400 font-bold">✅ Cómo SÍ pedirlo (Conversión 400% mayor):</span>
                      <p className="text-slate-300 italic">"Si esta clase te ahorró 3 horas de frustración, puedes invitarme un café virtual de $1 con SINPE o tarjeta en mi link de StreamPAY. ¡El 100% va para comprar mejor material educativo!"</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-2 text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      Estrategia de Metas de Streaming (Goal Bars):
                    </span>
                    <p className="text-slate-400">
                      Pon una meta clara en tus transmisiones: <em>"Meta: $25 para comprar la pizarra digital para la clase de mañana ($18 / $25)"</em>. La gente dona cuando ve que su $1 ayuda a completar un objetivo tangible.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedLessonId === 'mkt-3' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-bold">Módulo 1 • Lección 3</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">El Embudo de Creador: De Gratuito a Pay-Per-View</h3>
                  </div>
                  <button
                    onClick={() => toggleCompleteLesson('mkt-3')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      completedLessons.includes('mkt-3')
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{completedLessons.includes('mkt-3') ? 'Completada' : 'Marcar Completada'}</span>
                  </button>
                </div>

                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p>
                    El secreto de los streamers que ganan más de $1,000 USD al mes es no depender de una sola fuente. Utilizan una estructura en escalera:
                  </p>

                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">1</span>
                      <div>
                        <strong className="text-white text-xs block">Nivel 1: Clips Gratuitos (Atracción Masiva)</strong>
                        <span className="text-slate-400 text-xs">Videos de 30-60 segundos en TikTok, Shorts o Instagram para captar atención y ganar seguidores.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">2</span>
                      <div>
                        <strong className="text-white text-xs block">Nivel 2: Lives Abiertos con Micro-Propinas</strong>
                        <span className="text-slate-400 text-xs">Transmisiones en StreamPAY donde respondes preguntas en vivo y recibes propinas de $1, $3 o $5 directo a tu cuenta.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">3</span>
                      <div>
                        <strong className="text-white text-xs block">Nivel 3: Masterclasses Pay-Per-View ($4.99 a $19.99)</strong>
                        <span className="text-slate-400 text-xs">Talleres intensivos de 90 minutos con acceso pagado para tus seguidores más leales. Al 0% de comisión, todo el dinero es tuyo.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TRACK 2: GUÍA DE ANUNCIOS ($1 A $5 AL DÍA) */}
      {activeTrack === 'ads' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Step-by-Step Practical Blueprint (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Guía Maestra Paso a Paso</span>
                  <h3 className="text-xl font-bold text-white">Cómo Lanzar Anuncios Efectivos con $1 a $5 USD/día</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                  Bajo Riesgo • Alto Retorno
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <p>
                  No necesitas miles de dólares para conseguir tus primeros 500 alumnos o espectadores leales. Con solo <strong>$1.50 a $3.00 USD al día</strong> en Meta Ads (Instagram/Facebook) o TikTok Ads puedes promocionar tus mejores videos.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">1</span>
                      Elige el Objetivo Correcto: "Tráfico" o "Interacción"
                    </span>
                    <p className="text-slate-400 text-xs pl-7">
                      En el administrador de anuncios, nunca elijas objetivos corporativos complicados. Si eres educador, elige <strong>"Mensajes a WhatsApp"</strong> o <strong>"Visitas al Perfil de StreamPAY"</strong> para hablar directamente con el interesado.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">2</span>
                      Segmentación Ultra-Específica (El Secreto de la Rentabilidad)
                    </span>
                    <p className="text-slate-400 text-xs pl-7">
                      <strong>Para Maestros:</strong> Segmenta tu provincia o ciudad (ej: San José, Heredia, CDMX, Bogotá) a mujeres y hombres de 28 a 48 años con intereses en <em>"Educación Primaria"</em> o <em>"Padres de familia"</em>.
                      <br/>
                      <strong>Para Streamers:</strong> Segmenta por videojuegos específicos (Fortnite, Valorant, League of Legends) de 16 a 28 años en tu país o toda Latinoamérica.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">3</span>
                      No crees un anuncio que parezca anuncio
                    </span>
                    <p className="text-slate-400 text-xs pl-7">
                      Grábate con la cámara frontal de tu celular en formato vertical (9:16) con buena luz. Las personas ignoran los comerciales de televisión; prefieren videos naturales de persona a persona.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive ROI Ads Simulator (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border-2 border-emerald-500/40 space-y-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <BarChart3 className="w-4 h-4" />
                  <span>SIMULADOR DE PUBLICIDAD LOW-COST</span>
                </div>
                <h4 className="font-bold text-white text-base">Calcula tu Retorno Publicitario</h4>
              </div>

              {/* Controls */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-300 mb-1">
                    <span>Presupuesto Diario:</span>
                    <span className="font-mono text-emerald-400 font-bold">${adBudgetUSD}.00 USD/día</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={1}
                    value={adBudgetUSD}
                    onChange={(e) => setAdBudgetUSD(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>$1/día</span>
                    <span>$10/día</span>
                    <span>$20/día</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAdPlatform('meta')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all border ${
                      adPlatform === 'meta'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Meta (Instagram/FB)
                  </button>

                  <button
                    onClick={() => setAdPlatform('tiktok')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all border ${
                      adPlatform === 'tiktok'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    TikTok Ads
                  </button>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Nicho de tu contenido:</label>
                  <select
                    value={adNiche}
                    onChange={(e) => setAdNiche(e.target.value as any)}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200"
                  >
                    <option value="education">Cursos & Tutorías Educativas</option>
                    <option value="streaming">Gaming & Streaming Entretenimiento</option>
                    <option value="fitness">Fitness, Salud & Deportes</option>
                  </select>
                </div>
              </div>

              {/* Estimated Results Card */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
                <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                  Proyección Estimada con ${adBudgetUSD * 30} USD/mes:
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Alcance de Personas:</span>
                    <strong className="text-white font-mono text-sm">~{estimatedReach.toLocaleString()} personas</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Clics Interesados:</span>
                    <strong className="text-cyan-400 font-mono text-sm">~{estimatedClicks} alumnos/fans</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Alumnos/Donantes Nuevos:</span>
                    <strong className="text-amber-400 font-mono text-sm">~{estimatedNewMembers} activos</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Ingreso Estimado al Mes:</span>
                    <strong className="text-emerald-400 font-mono text-sm">${estimatedRevenueMin} - ${estimatedRevenueMin * 2} USD</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  💡 Inviertes ${adBudgetUSD * 30}/mes y recuperas potencialmente entre ${estimatedRevenueMin} y ${estimatedRevenueMin * 2} USD en propinas y cursos al 0% de comisión.
                </div>
              </div>

            </div>

          </div>

          {/* DEDICATED TIKTOK CREATOR ADS & VIRAL HOOKS TOOLKIT */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-pink-500/30 space-y-6 shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-mono text-xs font-bold">
                  <Smartphone className="w-3.5 h-3.5 text-pink-400" />
                  <span>PACK DE ANUNCIOS & GUIONES VIRALES PARA TIKTOKERS</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  Cómo Captar Seguidores y Convertirlos en Ingresos Reales en TikTok
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  En TikTok los anuncios corporativos fracasan. Lo que genera millones de clics son los videos en formato <strong>UGC (User-Generated Content)</strong> grabados con la cámara frontal, con ganchos polémicos en los primeros 2 segundos y llamados a la acción claros hacia tu link de StreamPAY.
                </p>
              </div>

              {/* TikTok Metrics Badge */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 text-xs space-y-2 shrink-0">
                <div className="text-slate-400 text-[10px] font-mono uppercase">Ventaja Publicitaria TikTok:</div>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Costo por Clic:</span>
                    <strong className="text-emerald-400 font-mono text-sm">$0.03 - $0.07 USD</strong>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Comisión TikTok Live:</span>
                    <strong className="text-red-400 font-mono text-sm">~50% de retención</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 High-Conversion TikTok Scripts Ready-to-Record */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  3 Guiones de Anuncios Listos para Grabar con tu Teléfono (UGC)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Formato Vertical 9:16 • 25 a 35 seg</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Script 1: El escándalo de las comisiones */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold font-mono">GUION 1 • POLÉMICO</span>
                      <span className="text-[10px] text-slate-400">Streamers & Gamers</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">"El Secreto de las Monedas de TikTok Live"</h4>
                    
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                      <div className="text-[11px] text-amber-400 font-semibold">🎬 Visual: Sosteniendo el teléfono mostrando la pantalla.</div>
                      <p className="italic text-[11px] leading-relaxed">
                        "¿Sabías que cuando te mandan un león o rosas en TikTok Live, la plataforma se queda con el 50% de tu dinero? 😱 Estuve meses regalando la mitad de mis ganancias hasta que descubrí StreamPAY. Ahora en mis transmisiones mis seguidores me apoyan con un clic desde $1 USD y el 100% llega limpio a mi banco."
                      </p>
                      <div className="text-[11px] text-cyan-400 font-semibold">🚀 CTA: "El link está en mi bio con afiliación gratis al 0% de comisión."</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyTikTok(`¿Sabías que cuando te mandan un león o rosas en TikTok Live, la plataforma se queda con el 50% de tu dinero? 😱 Estuve meses regalando la mitad de mis ganancias hasta que descubrí StreamPAY. Ahora en mis transmisiones mis seguidores me apoyan con un clic desde $1 USD por tarjeta o SINPE y el 100% llega limpio a mi cuenta bancaria. Si eres streamer o creador, ve al link de mi biografía y asegura tu afiliación al 0% antes de que se acaben los cupos fundadores.`, 'tiktok-1')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-all font-mono"
                  >
                    {copiedTikTokKey === 'tiktok-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTikTokKey === 'tiktok-1' ? '¡Guion 1 Copiado!' : 'Copiar Guion 1'}</span>
                  </button>
                </div>

                {/* Script 2: El mito de los 100k seguidores */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold font-mono">GUION 2 • REVELACIÓN</span>
                      <span className="text-[10px] text-slate-400">Micro-Influencers</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">"De 800 Seguidores a $240 USD Netos"</h4>
                    
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                      <div className="text-[11px] text-amber-400 font-semibold">🎬 Visual: Mostrando tus seguidores y un comprobante de cobro.</div>
                      <p className="italic text-[11px] leading-relaxed">
                        "Te mintieron: NO necesitas 100 mil seguidores para vivir de internet. Con solo 40 personas leales que paguen $5 dólares por tu taller o clase al mes, ya estás ganando $200 USD netos. En StreamPAY creé mi enlace privado en 2 minutos y mis alumnos pagan sin aplicaciones raras."
                      </p>
                      <div className="text-[11px] text-cyan-400 font-semibold">🚀 CTA: "Entra a mi perfil y aparta tu handle único hoy."</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyTikTok(`Te mintieron: NO necesitas 100 mil seguidores para vivir de internet. Con solo 40 personas leales que paguen $5 dólares por tu taller o clase al mes, ya estás ganando $200 USD netos. En StreamPAY creé mi enlace privado en 2 minutos y mis alumnos pagan con tarjeta o transferencia sin aplicaciones raras ni comisiones abusivas. Entra al enlace de mi perfil y aparta tu usuario único hoy mismo.`, 'tiktok-2')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-all font-mono"
                  >
                    {copiedTikTokKey === 'tiktok-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTikTokKey === 'tiktok-2' ? '¡Guion 2 Copiado!' : 'Copiar Guion 2'}</span>
                  </button>
                </div>

                {/* Script 3: Para Educadores y Profesores */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">GUION 3 • EDUCATIVO</span>
                      <span className="text-[10px] text-slate-400">Maestros & Tutores</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">"No Regales Más Clases de 60 Segundos"</h4>
                    
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                      <div className="text-[11px] text-amber-400 font-semibold">🎬 Visual: Docente frente a su libreta, pizarra o computadora.</div>
                      <p className="italic text-[11px] leading-relaxed">
                        "¿Explicas cosas increíbles en TikTok pero tu cuenta bancaria sigue en cero? Sigue subiendo clips gratis para viralizarte, pero a quienes quieran la clase completa de 1 hora, invítalos a tu sala Pay-Per-View en StreamPAY. Pagan $1.99 USD y recibes el dinero en tu cuenta sin trámites."
                      </p>
                      <div className="text-[11px] text-cyan-400 font-semibold">🚀 CTA: "Haz clic en mi biografía para sumarte al grupo fundador."</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyTikTok(`¿Explicas cosas increíbles en TikTok pero tu cuenta bancaria sigue en cero? Sigue subiendo clips gratis para viralizarte, pero a quienes quieran la clase completa de 1 hora o resolver ejercicios difíciles, invítalos a tu sala Pay-Per-View en StreamPAY. Pagan $1.99 USD y recibes el dinero directamente en tu cuenta sin trámites ni requisitos de 4000 horas. Haz clic en mi biografía para sumarte al grupo fundador.`, 'tiktok-3')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-all font-mono"
                  >
                    {copiedTikTokKey === 'tiktok-3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTikTokKey === 'tiktok-3' ? '¡Guion 3 Copiado!' : 'Copiar Guion 3'}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Interactive Dynamic Script Studio */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <h4 className="font-bold text-white text-base">Generador Interactivo de Guiones para TikTok</h4>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Personaliza tu nicho y meta de conversión</span>
              </div>

              {/* Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">¿Cuál es tu tipo de contenido?</label>
                  <select
                    value={tiktokNiche}
                    onChange={(e) => setTiktokNiche(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium"
                  >
                    <option value="streaming">Streamer / Gamer (Fortnite, Valorant, Free Fire)</option>
                    <option value="education">Maestro / Profesor (Matemáticas, Inglés, Primaria)</option>
                    <option value="fitness">Fitness & Salud (Rutinas, Dietas, Desafíos)</option>
                    <option value="music">Músico / Cantante (Covers, Clases, Acústicos)</option>
                    <option value="humor">Comedia / Vlogger / Entretenimiento</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">¿Qué quieres lograr con el anuncio?</label>
                  <select
                    value={tiktokGoal}
                    onChange={(e) => setTiktokGoal(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium"
                  >
                    <option value="micro_tips">Recibir Micro-Propinas ($1 a $5 USD) en mis transmisiones</option>
                    <option value="ppv_workshop">Vender accesos a un Taller o Clase Privada ($2 a $15 USD)</option>
                    <option value="founder_offer">Conseguir afiliados con la Oferta 0% Comisión</option>
                  </select>
                </div>
              </div>

              {/* Generated Interactive Teleprompter Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-pink-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-mono font-bold text-pink-300 uppercase">
                      Guion Generado para Grabar en TikTok:
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const fullText = `[GANCHO 0-3s]: ${
                        tiktokNiche === 'education'
                          ? 'Si te cuesta entender este tema en la escuela o universidad, deja de sufrir.'
                          : tiktokNiche === 'streaming'
                          ? 'Si juegas o haces streams, TikTok se está quedando con la mitad de tus donaciones.'
                          : tiktokNiche === 'fitness'
                          ? '3 errores que cometes al entrenar y por qué no ves resultados en el espejo.'
                          : tiktokNiche === 'music'
                          ? 'Cantar en vivo en internet no debería darte solo monedas virtuales que no puedes cobrar.'
                          : 'Lo que nadie te dice sobre vivir de crear videos en internet.'
                      } \n\n[CUERPO]: ${
                        tiktokGoal === 'micro_tips'
                          ? 'Ahora en mis directos utilizo StreamPAY. Mis seguidores me apoyan desde $1 USD directo por tarjeta o transferencia y no me descuentan comisiones abusivas.'
                          : tiktokGoal === 'ppv_workshop'
                          ? 'Voy a dar una masterclass privada donde resuelvo dudas en vivo. El boleto cuesta solo $2 USD y entras con un clic seguro.'
                          : 'StreamPAY abrió cupos para los primeros creadores fundadores al 0% de comisión de por vida. Es una locura para no perder tus ganancias.'
                      } \n\n[CTA]: Revisa el enlace en mi biografía antes de que cierren los cupos.`;
                      handleCopyTikTok(fullText, 'custom-generated');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-md shadow-pink-600/30"
                  >
                    {copiedTikTokKey === 'custom-generated' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTikTokKey === 'custom-generated' ? '¡Guion Copiado!' : 'Copiar Teleprompter'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-200 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-amber-400 font-bold font-mono block text-[10px] uppercase">⚡ Gancho (Segundos 0 a 3):</span>
                    <p className="italic text-slate-300">
                      {tiktokNiche === 'education' && '"Si te cuesta entender este tema en la escuela o universidad, quédate 30 segundos porque te lo explico sin rodeos:"'}
                      {tiktokNiche === 'streaming' && '"Si haces transmisiones en vivo, TikTok se está quedando con la mitad de tus donaciones y nadie habla de esto:"'}
                      {tiktokNiche === 'fitness' && '"3 errores que cometes al entrenar y por qué no bajas de peso aunque hagas cardio todos los días:"'}
                      {tiktokNiche === 'music' && '"Cantar en vivo en redes no debería darte solo monedas virtuales que después no puedes retirar a tu banco:"'}
                      {tiktokNiche === 'humor' && '"Lo que las plataformas de video no quieren que sepas sobre monetizar tu contenido en 2026:"'}
                    </p>
                  </div>

                  <div>
                    <span className="text-cyan-400 font-bold font-mono block text-[10px] uppercase">🎯 Desarrollo & Problema (Segundos 4 a 22):</span>
                    <p className="text-slate-300">
                      {tiktokGoal === 'micro_tips' && 'Empecé a usar mi canal de StreamPAY para que mis seguidores me apoyen desde $1 USD por tarjeta o SINPE Móvil. No hay comisiones abusivas y el dinero se retira directo a mi cuenta bancaria.'}
                      {tiktokGoal === 'ppv_workshop' && 'Por eso organicé una sesión intensiva y privada en video donde te enseño el paso a paso completo. La entrada cuesta solo $2.50 USD y puedes verla desde tu teléfono sin instalar nada raro.'}
                      {tiktokGoal === 'founder_offer' && 'StreamPAY está entregando afiliación al 0% de comisión de por vida para los primeros creadores que se registren. Es la mejor oportunidad para empezar a cobrar sin requisitos de 4000 horas.'}
                    </p>
                  </div>

                  <div>
                    <span className="text-pink-400 font-bold font-mono block text-[10px] uppercase">🚀 Llamada a la Acción (CTA Final):</span>
                    <p className="font-semibold text-white">
                      "Toca el enlace de mi biografía o escribe 'INFO' en los comentarios para pasarte el acceso directo."
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Step Checklist for Launching on TikTok Ads with $1-$3/day */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-2">
                  Checklist Rápido: Cómo Pautar este Video en TikTok Ads con $2 USD/día:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-pink-400 font-bold font-mono">1. Graba y Publica</span>
                    <p className="text-slate-400">Sube el video normal a tu perfil de TikTok con buen audio e iluminación.</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-pink-400 font-bold font-mono">2. Código Spark</span>
                    <p className="text-slate-400">En los 3 puntos del video &gt; Ajustes de publicidad &gt; Generar código de autorización.</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-pink-400 font-bold font-mono">3. TikTok Ads Manager</span>
                    <p className="text-slate-400">Crea una campaña con objetivo "Tráfico" o "Interacción con la comunidad".</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-pink-400 font-bold font-mono">4. Presupuesto $2/día</span>
                    <p className="text-slate-400">Segmenta a tu país o ciudades principales de 18 a 40 años.</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-pink-400 font-bold font-mono">5. Botón a StreamPAY</span>
                    <p className="text-slate-400">Pega el link de tu perfil de StreamPAY en el botón de "Más Información".</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TRACK 3: INGLÉS BÁSICO PARA STREAMERS */}
      {activeTrack === 'english' && (
        <div className="space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Streamer English Starter Kit</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">Inglés Práctico para Transmisiones & Audiencia Global</h3>
                <p className="text-xs text-slate-400">
                  Aprende las frases exactas para interactuar con espectadores de Estados Unidos y Europa y recibir propinas en dólares. Haz clic en el parlante para escuchar la pronunciación en vivo.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono text-cyan-300 shrink-0">
                🔊 Pronunciación con I.A. Nativa
              </div>
            </div>

            {/* Interactive Flashcards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase">Bienvenida al Live</span>
                  <button
                    onClick={() => handleSpeakEnglish("Welcome to the stream everyone! Make sure to drop a follow.")}
                    className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                    title="Escuchar Pronunciación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">"Welcome to the stream everyone! Make sure to drop a follow."</h5>
                  <p className="text-xs text-slate-400 mt-1">¡Bienvenidos al stream a todos! Asegúrense de dejar su follow.</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-900 p-1.5 rounded">
                  Fonética: <em>Uél-kom tu de strim, méik chur tu drop a fó-lou</em>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">Agradecer Propinas / Tips</span>
                  <button
                    onClick={() => handleSpeakEnglish("Thank you so much for the tip! That really supports the channel.")}
                    className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                    title="Escuchar Pronunciación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">"Thank you so much for the tip! That really supports the channel."</h5>
                  <p className="text-xs text-slate-400 mt-1">¡Muchísimas gracias por la propina! Eso apoya un montón al canal.</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-900 p-1.5 rounded">
                  Fonética: <em>Zen-kiu so mach for de tip! Dat ríali su-pórts de chá-nel</em>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Preguntar de dónde son</span>
                  <button
                    onClick={() => handleSpeakEnglish("Where are you guys watching from? Let me know in the chat!")}
                    className="p-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all"
                    title="Escuchar Pronunciación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">"Where are you guys watching from? Let me know in the chat!"</h5>
                  <p className="text-xs text-slate-400 mt-1">¿Desde dónde están viendo el directo? ¡Cuéntenme en el chat!</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-900 p-1.5 rounded">
                  Fonética: <em>Uér ar iu gais uáchin from? Let mi nóu in de chat!</em>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-purple-400 font-bold uppercase">Promocionar Masterclass PPV</span>
                  <button
                    onClick={() => handleSpeakEnglish("You can unlock the full masterclass with the link down below.")}
                    className="p-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-slate-950 transition-all"
                    title="Escuchar Pronunciación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">"You can unlock the full masterclass with the link down below."</h5>
                  <p className="text-xs text-slate-400 mt-1">Pueden desbloquear la clase completa en el enlace de abajo.</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-900 p-1.5 rounded">
                  Fonética: <em>Iu kan an-lok de ful más-ter-clas uid de link daun bi-lóu</em>
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-pink-400 font-bold uppercase">Negociar Patrocinios / Sponsor</span>
                  <button
                    onClick={() => handleSpeakEnglish("Please send your sponsorship proposal to my official email address.")}
                    className="p-2 rounded-xl bg-pink-500/20 text-pink-300 hover:bg-pink-500 hover:text-slate-950 transition-all"
                    title="Escuchar Pronunciación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">"Please send your sponsorship proposal to my official email address."</h5>
                  <p className="text-xs text-slate-400 mt-1">Por favor envía tu propuesta de patrocinio a mi correo oficial.</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-900 p-1.5 rounded">
                  Fonética: <em>Plis send iur spón-sor-chip pro-póu-sal tu mai o-fí-chal i-méil</em>
                </div>
              </div>

              {/* Card 6 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase">Despedida del Stream</span>
                  <button
                    onClick={() => handleSpeakEnglish("That is all for today's stream guys! See you in the next one.")}
                    className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-slate-950 transition-all"
                    title="Escuchar Pronunciación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">"That is all for today's stream guys! See you in the next one."</h5>
                  <p className="text-xs text-slate-400 mt-1">¡Eso es todo por el stream de hoy muchachos! Nos vemos en el próximo.</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-900 p-1.5 rounded">
                  Fonética: <em>Dat is ol for tu-déiz strim gais! Si iu in de nekst uan</em>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Direct Community Help Banner */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">¿Quieres que agreguemos un curso específico?</h4>
            <p className="text-xs text-slate-400">Todos los afiliados tienen derecho a proponer temas de formación para seguir superándose.</p>
          </div>
        </div>

        <button
          onClick={() => {
            const text = '¡Hola StreamPAY! Me gustaría sugerir un nuevo curso de entrenamiento para los afiliados:';
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 shrink-0 transition-all"
        >
          <span>Sugerir Nuevo Tema</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
