import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Globe2, 
  Flame, 
  Share2, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  Heart, 
  BarChart2, 
  Copy,
  Zap,
  GraduationCap,
  BookOpen,
  Calculator as MathIcon,
  Video,
  Check,
  Megaphone,
  Gift,
  Crown
} from 'lucide-react';
import { getStreamPaySurveyUrl, getStreamPayAppUrl, getStreamPayWhatsAppShareText } from '../../utils/streamPayUrls';

const GLOBAL_COUNTRIES = [
  'Costa Rica 🇨🇷',
  'México 🇲🇽',
  'Colombia 🇨🇴',
  'España 🇪🇸',
  'Estados Unidos 🇺🇸',
  'Argentina 🇦🇷',
  'Chile 🇨🇱',
  'Perú 🇵🇪',
  'Guatemala 🇬🇹',
  'Ecuador 🇪🇨',
  'Panamá 🇵🇦',
  'República Dominicana 🇩🇴',
  'Venezuela 🇻🇪',
  'Uruguay 🇺🇾',
  'Bolivia 🇧🇴',
  'El Salvador 🇸🇻',
  'Honduras 🇭🇳',
  'Nicaragua 🇳🇮',
  'Paraguay 🇵🇾',
  'Canadá 🇨🇦',
  'Brasil 🇧🇷',
  'Cualquier otro país del mundo 🌐'
];

const EDUCATOR_NICHES = [
  { id: 'primaria', label: '🎒 Maestro/a de Escuela Primaria', desc: 'Clases guiadas, tareas y apoyo escolar' },
  { id: 'secundaria', label: '📐 Profesor/a de Secundaria & Liceo', desc: 'Lecciones de secundaria y preparación de exámenes' },
  { id: 'matematicas', label: '📊 Tutor/a de Matemáticas & Ciencias', desc: 'Cursos, álgebra, cálculo y resolución de problemas' },
  { id: 'idiomas', label: '🗣️ Instructor/a de Idiomas (Inglés, Español, etc.)', desc: 'Conversación y gramática en vivo' },
  { id: 'tecnologia', label: '💻 Cursos de Tecnología & Programación', desc: 'Talleres prácticos y desarrollo web/IA' },
  { id: 'creador_vlogs', label: '🎥 Creador/a de Vlogs & Entretenimiento', desc: 'Videos diarios, humor, viajes y estilos de vida' },
  { id: 'arte_musica', label: '🎨 Arte, Música & Habilidades Manuales', desc: 'Clases de instrumento, dibujo y diseño' },
  { id: 'fitness', label: '🏋️‍♂️ Fitness, Deporte & Salud', desc: 'Entrenamientos en vivo y planes nutricionales' }
];

interface PreRegistrationCampaignProps {
  onPreRegisterSuccess?: (data: any) => void;
  onOpenFreeAffiliationModal?: () => void;
}

export const PreRegistrationCampaign: React.FC<PreRegistrationCampaignProps> = ({
  onPreRegisterSuccess,
  onOpenFreeAffiliationModal
}) => {
  // Survey Vote State
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [votesCount, setVotesCount] = useState({
    yesImmediate: 14820,
    yesWantTry: 4310,
    needMoreInfo: 210
  });

  // Pre-Registration Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [country, setCountry] = useState('Costa Rica 🇨🇷');
  const [primarySocial, setPrimarySocial] = useState('TikTok');
  const [socialHandle, setSocialHandle] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('matematicas');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAppDirectLink, setCopiedAppDirectLink] = useState(false);
  const [copiedAdScript, setCopiedAdScript] = useState<string | null>(null);

  // Spots tracking for the Top 10 Free Affiliation Offer
  const [claimedSpots, setClaimedSpots] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('streampay_free_spots_claimed');
      if (saved) {
        const parsed = parseInt(saved, 10);
        return isNaN(parsed) ? 7 : Math.min(10, Math.max(7, parsed));
      }
    }
    return 7;
  });

  const [assignedFounderSpot, setAssignedFounderSpot] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('streampay_user_claimed_spot');
      if (saved) {
        try {
          return JSON.parse(saved).spot;
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  });

  const totalSpots = 10;
  const spotsLeft = Math.max(0, totalSpots - claimedSpots);

  // Simulated Live Feed of Pre-registered Creators
  const [registeredList, setRegisteredList] = useState([
    { name: 'Profe Mario Vargas', handle: '@profe_mario_mate', country: 'Costa Rica 🇨🇷', social: 'Tutor Matemáticas', time: 'Hace 1 min' },
    { name: 'Elena Ramírez', handle: '@elena_primaria_edu', country: 'México 🇲🇽', social: 'Maestra Primaria', time: 'Hace 3 min' },
    { name: 'Carlos Mendoza', handle: '@carlos_tech', country: 'Costa Rica 🇨🇷', social: 'TikTok (45k)', time: 'Hace 5 min' },
    { name: 'Valentina Silva', handle: '@valen_fitness', country: 'Colombia 🇨🇴', social: 'Instagram (120k)', time: 'Hace 8 min' },
    { name: 'Profe Roberto Gómez', handle: '@roberto_fisica', country: 'España 🇪🇸', social: 'Prof. Secundaria', time: 'Hace 12 min' }
  ]);

  const totalVotes = votesCount.yesImmediate + votesCount.yesWantTry + votesCount.needMoreInfo;
  const pctYesImmediate = ((votesCount.yesImmediate / totalVotes) * 100).toFixed(1);
  const pctYesWantTry = ((votesCount.yesWantTry / totalVotes) * 100).toFixed(1);

  const handleVote = (option: 'yesImmediate' | 'yesWantTry' | 'needMoreInfo') => {
    if (hasVoted) return;
    setVotesCount(prev => ({ ...prev, [option]: prev[option] + 1 }));
    setSelectedVote(option);
    setHasVoted(true);
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !handle) return;

    setIsSubmitting(true);
    const nicheObj = EDUCATOR_NICHES.find(n => n.id === selectedNiche);
    const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const nextSpot = Math.min(10, claimedSpots + 1);

    try {
      await addDoc(collection(db, 'preregistrations'), {
        fullName,
        email,
        handle: formattedHandle,
        country,
        creatorCategory: nicheObj ? nicheObj.label : primarySocial,
        primarySocial,
        socialHandle,
        spotNumber: nextSpot,
        plan: 'AFILIACION_GRATIS_TOP10',
        createdAt: new Date().toISOString()
      });
      console.log('Pre-registration saved to Google Firestore with Free Founder Spot!');
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationComplete(true);
      setAssignedFounderSpot(nextSpot);
      setClaimedSpots(nextSpot);

      if (typeof window !== 'undefined') {
        localStorage.setItem('streampay_free_spots_claimed', nextSpot.toString());
        localStorage.setItem('streampay_user_claimed_spot', JSON.stringify({
          name: fullName,
          handle: formattedHandle,
          spot: nextSpot
        }));
      }

      const newCreator = {
        name: fullName,
        handle: formattedHandle,
        country,
        social: nicheObj ? nicheObj.label.split(' ')[1] : primarySocial,
        time: 'Ahora mismo'
      };

      setRegisteredList([newCreator, ...registeredList]);
      if (onPreRegisterSuccess) onPreRegisterSuccess(newCreator);
    }, 1000);
  };

  const getCampaignShareUrl = () => {
    return getStreamPaySurveyUrl();
  };

  const getStreamPayDirectUrl = () => {
    return getStreamPayAppUrl();
  };

  const handleCopyShareLink = () => {
    const linkToCopy = getStreamPaySurveyUrl();
    navigator.clipboard.writeText(linkToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyAppDirectLink = () => {
    const linkToCopy = getStreamPayAppUrl();
    navigator.clipboard.writeText(linkToCopy);
    setCopiedAppDirectLink(true);
    setTimeout(() => setCopiedAppDirectLink(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = getStreamPayWhatsAppShareText();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyScript = (scriptText: string, scriptId: string) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedAdScript(scriptId);
    setTimeout(() => setCopiedAdScript(null), 3000);
  };

  const TIKTOK_SCRIPT = `🚨 ATENCIÓN PROFESORES, MAESTROS Y CREADORES DE CONTENIDO 🚨

¿Qué les parecería si hubiera una plataforma que los haga ganar dinero en MENOS DE 1 SEMANA, con un sistema de Monetización rápido, en el cual ya no van a tener que esperar como en YouTube a tener 1,000 suscriptores y 4,000 horas de vistas? 🤔

Tanto para Maestros de Primaria, Profesores de Secundaria, Tutores de Matemáticas o Creadores en general:
✅ Sin restricciones por país
✅ Pagos directos desde la primera clase o video
✅ Monedero digital con retiros a IBAN local o SINPE Móvil

¡Responde la encuesta en el link de mi perfil y reserva tu usuario @handle VIP gratis antes del lanzamiento oficial! 🚀✨

👇 Entra directo a la encuesta aquí:
${getCampaignShareUrl()}`;

  const THREADS_SCRIPT = `🔥 Encuesta Rápida para Creadores y Educadores:

Si existiera una plataforma que te pague por tus clases de matemáticas, cursos o videos desde el DÍA 1 sin exigirte 1,000 suscriptores ni 4,000 horas de vistas como YouTube...

¿Te afiliarías de inmediato?
A) 🚀 ¡Sí, me cambio ya!
B) 🔥 Me interesa probarla
C) 💬 Quiero ver cómo funciona

Reserva tu @handle VIP gratis aquí 👇
${getCampaignShareUrl()}`;

  return (
    <div className="max-w-[1400px] mx-auto p-4 lg:p-8 space-y-12 animate-in fade-in">
      
      {/* VIVID HIGH-IMPACT BILLBOARD ANNOUNCEMENT BANNER */}
      <div className="relative rounded-3xl overflow-hidden p-8 lg:p-12 bg-gradient-to-br from-pink-600 via-purple-700 to-cyan-600 border-4 border-amber-400 shadow-[0_0_50px_rgba(236,72,153,0.3)] text-white space-y-6">
        
        {/* Glowing Decorative Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-3xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg animate-pulse">
              <Megaphone className="w-4 h-4 text-slate-950" />
              <span>Anuncio Especial de Lanzamiento • Redes Sociales 2026</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              ¡Atención <span className="text-amber-300 underline decoration-cyan-400">Maestros, Profesores</span> y Creadores de Todo el Mundo! 🌍
            </h1>

            <p className="text-sm lg:text-base text-slate-100 font-medium leading-relaxed drop-shadow">
              Desde Maestros de Escuela Primaria, Profesores de Secundaria, Tutores de Matemáticas, Idiomas o Tecnología... ¡Todos tienen su espacio exclusivo para monetizar clases, cursos y contenidos sin esperar aprobación de YouTube!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono font-bold">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 text-amber-300 border border-amber-400/50 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                Maestros & Profesores
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 text-cyan-300 border border-cyan-400/50 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-300" />
                Monetización en &lt; 1 Semana
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 text-emerald-300 border border-emerald-400/50 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-emerald-300" />
                Sin Restricciones de País
              </span>
            </div>
          </div>

          {/* Call to Action Card inside Billboard */}
          <div className="w-full lg:w-auto shrink-0 bg-slate-950/90 border-2 border-amber-400 p-6 rounded-3xl text-center space-y-4 shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 mx-auto flex items-center justify-center font-black text-2xl shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <div>
              <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest font-bold block">
                Campaña Encuesta Viral
              </span>
              <h3 className="text-xl font-black text-white">Únete al Pre-Registro</h3>
            </div>

            <button
              onClick={handleCopyShareLink}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace de Encuesta'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* SPECIAL HIGHLIGHT: OFERTA DE AFILIACIÓN GRATIS PARA LAS PRIMERAS 10 PERSONAS */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.2)] space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-amber-400/30 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
              <Crown className="w-4 h-4 text-slate-950" />
              <span>Oferta de Afiliación Exclusiva • Primeras 10 Personas</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              ¡Afiliación VIP PRO <span className="text-amber-300 underline decoration-amber-400">100% GRATIS</span> de por Vida! 🎁
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Para los primeros 10 educadores, profesores o creadores que se afilien a StreamPAY, su membresía vitalicia será completamente gratuita. Te quedas con el <strong className="text-emerald-400 font-bold">100% neto de tus ganancias (0% de comisión)</strong> y recibes la insignia dorada de Creador Fundador.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <div className="w-full sm:w-auto bg-slate-950/90 border border-amber-400/50 px-5 py-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 line-through block">Precio regular: $299 USD/año</span>
              <span className="text-xl font-black text-emerald-400">$0.00 / GRATIS</span>
            </div>

            <button
              onClick={() => {
                if (onOpenFreeAffiliationModal) {
                  onOpenFreeAffiliationModal();
                } else {
                  const formElement = document.getElementById('formulario-preregistro');
                  if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Reclamar Afiliación Gratis</span>
            </button>
          </div>
        </div>

        {/* Spots Left Progress & Features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Tracker Card (5 cols) */}
          <div className="md:col-span-5 p-4 rounded-2xl bg-slate-950 border border-amber-400/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Cupos de Afiliación Oficiales:</span>
              </span>
              <span className="text-emerald-400 font-black text-sm">
                {spotsLeft > 0 ? `¡Quedan ${spotsLeft} de ${totalSpots} cupos!` : '¡10 Cupos Completados!'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                style={{ width: `${(claimedSpots / totalSpots) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{claimedSpots} de {totalSpots} personas ya son Creadores Fundadores</span>
              <span className="text-cyan-400 font-mono font-bold">{Math.round((claimedSpots / totalSpots) * 100)}% Lleno</span>
            </div>
          </div>

          {/* 4 Core Pillars of Free Affiliation (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
              <div className="text-emerald-400 font-mono font-black text-base">0%</div>
              <span className="text-slate-300 text-[11px] block font-semibold">Comisión de por Vida</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
              <div className="text-amber-400 font-mono font-black text-base">#1-#10</div>
              <span className="text-slate-300 text-[11px] block font-semibold">Insignia Dorada VIP</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
              <div className="text-cyan-400 font-mono font-black text-base">&lt; 24h</div>
              <span className="text-slate-300 text-[11px] block font-semibold">Retiro SINPE / Banco</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
              <div className="text-purple-400 font-mono font-black text-base">1-a-1</div>
              <span className="text-slate-300 text-[11px] block font-semibold">Soporte WhatsApp</span>
            </div>
          </div>

        </div>

      </div>

      {/* EDUCATOR & CREATOR SPACE EXPLANATION SECTION */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Espacio Personalizado por Creador</span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Tu Propio Centro de Control, Métricas y Estado de Cuenta</span>
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
            100% Personalizable
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Espacio para Educadores</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maestros de primaria y liceo suben sus clases en video, guías educativas y tutorías en vivo de matemáticas con pago por clase (Pay-Per-View) o suscripción mensual.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Métricas en Tiempo Real</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Panel interactivo con reproducciones, horas vistas, cantidad de estudiantes inscritos, calificaciones y desglose de ingresos por publicación.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Estado de Cuenta y Retiros</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Revisa tu saldo acumulado día a día y transfiere dinero directamente a tu cuenta bancaria local (IBAN, SINPE Móvil o Crypto) sin esperas de $100 dólares.
            </p>
          </div>

        </div>
      </div>

      {/* DEDICATED INDEPENDENT URLS CARD FOR STREAMPAY & SURVEY */}
      <div className="p-6 lg:p-8 rounded-3xl bg-slate-950 border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                Enlaces Directos e Independientes
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold">
                100% StreamPAY
              </span>
            </div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-cyan-400" />
              <span>Tus Links Oficiales de StreamPAY para Compartir</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Estos enlaces abren <strong className="text-white">directamente StreamPAY</strong> y la Encuesta de Pre-Registro en cualquier celular, tablet o PC, sin mostrar la consola de cursos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Link 1: Encuesta / Pre-Registro */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-pink-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Enlace de la Encuesta Viral</h3>
                  <p className="text-[11px] text-pink-300 font-medium">Abre directo la encuesta de maestros y creadores</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold uppercase">
                Para TikTok / IG
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all">
              {getCampaignShareUrl()}
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={handleCopyShareLink}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedLink ? '¡Enlace de Encuesta Copiado!' : 'Copiar Link de Encuesta'}</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                title="Compartir por WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Link 2: StreamPay App Principal */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Enlace Directo a StreamPAY App</h3>
                  <p className="text-[11px] text-cyan-300 font-medium">Abre el Feed de videos, billetera y monetización</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase">
                App Completa
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 break-all select-all">
              {getStreamPayDirectUrl()}
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={handleCopyAppDirectLink}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedAppDirectLink ? '¡Enlace StreamPAY Copiado!' : 'Copiar Link StreamPAY'}</span>
              </button>

              <a
                href={getStreamPayDirectUrl()}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                title="Abrir en pestaña nueva"
              >
                <span>Abrir ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Campaign Survey & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Survey / Poll Box (6 cols) */}
        <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono uppercase font-bold text-cyan-400">Encuesta de Opinión Pública</span>
              <span className="text-emerald-400 font-mono">● En Vivo</span>
            </div>
            <h2 className="text-base lg:text-lg font-bold text-white leading-snug">
              ¿Te parecería genial una plataforma que te haga ganar dinero en menos de 1 semana sin esperar 1,000 suscriptores como YouTube?
            </h2>
          </div>

          {/* Voting Options */}
          <div className="space-y-3">
            <button
              onClick={() => handleVote('yesImmediate')}
              disabled={hasVoted}
              className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                selectedVote === 'yesImmediate'
                  ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500/50'
              }`}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs lg:text-sm font-semibold">
                  🚀 ¡Sí! Me afiliaría de inmediato como Educador / Creador
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{pctYesImmediate}%</span>
              </div>
              {hasVoted && (
                <div 
                  style={{ width: `${pctYesImmediate}%` }}
                  className="absolute inset-y-0 left-0 bg-emerald-500/20 transition-all duration-700"
                />
              )}
            </button>

            <button
              onClick={() => handleVote('yesWantTry')}
              disabled={hasVoted}
              className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                selectedVote === 'yesWantTry'
                  ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500/50'
              }`}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs lg:text-sm font-semibold">
                  🔥 Me interesa bastante, subiré mis cursos y clases
                </span>
                <span className="font-mono font-bold text-cyan-300 text-sm">{pctYesWantTry}%</span>
              </div>
              {hasVoted && (
                <div 
                  style={{ width: `${pctYesWantTry}%` }}
                  className="absolute inset-y-0 left-0 bg-cyan-500/20 transition-all duration-700"
                />
              )}
            </button>

            <button
              onClick={() => handleVote('needMoreInfo')}
              disabled={hasVoted}
              className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                selectedVote === 'needMoreInfo'
                  ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500/50'
              }`}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs lg:text-sm font-semibold">
                  💬 Aún tengo dudas, quiero ver cómo funciona
                </span>
                <span className="font-mono font-bold text-amber-300 text-sm">1.1%</span>
              </div>
            </button>
          </div>

          {hasVoted && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 animate-in fade-in">
              <strong className="block font-bold">¡Voto registrado con éxito!</strong>
              <p className="text-slate-300">
                Reserva tus datos a la derecha para asegurar tu usuario VIP con 0% de comisión.
              </p>
            </div>
          )}

          {/* READY-TO-COPY SOCIAL MEDIA SCRIPTS FOR TIKTOK & THREADS */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <span className="text-xs text-slate-300 font-bold block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Guiones Listos para Publicar en TikTok, Instagram & Threads:</span>
            </span>

            <div className="space-y-3">
              {/* TikTok Script */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-pink-400">
                  <span>📹 Guion de Video para TikTok & IG Reels</span>
                  <button
                    onClick={() => handleCopyScript(TIKTOK_SCRIPT, 'tiktok')}
                    className="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 font-mono text-[11px] font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedAdScript === 'tiktok' ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-3 italic">
                  "{TIKTOK_SCRIPT}"
                </p>
              </div>

              {/* Threads / FB Script */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-cyan-300">
                  <span>✍️ Texto para Publicación en Threads / Facebook</span>
                  <button
                    onClick={() => handleCopyScript(THREADS_SCRIPT, 'threads')}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedAdScript === 'threads' ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-3 italic">
                  "{THREADS_SCRIPT}"
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right: VIP Pre-Registration Form (6 cols) */}
        <div id="formulario-preregistro" className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/50 space-y-6 shadow-2xl relative">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-mono font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Oferta 10 Primeras Personas • Afiliación VIP 100% Gratis</span>
            </div>
            <h2 className="text-lg font-bold text-white">Reserva tu Afiliación Gratuita (@handle)</h2>
            <p className="text-xs text-slate-400">
              Registra tus datos y asegura uno de los últimos {spotsLeft} cupos con 0% de comisión de por vida.
            </p>
          </div>

          {/* Golden Offer Promo Strip */}
          <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-white font-bold block text-[11px]">Afiliación de Creador Fundador Aplicada</span>
                <span className="text-amber-300 text-[10px]">Cupo #{Math.min(10, claimedSpots + 1)} de 10 • Sin costo ni mensualidades</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black font-mono text-[10px]">
              $0.00
            </span>
          </div>

          {registrationComplete ? (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 via-slate-950 to-slate-950 border-2 border-amber-400 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 text-slate-950 mx-auto flex items-center justify-center font-black shadow-lg shadow-amber-500/30">
                <Crown className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest font-black block">
                  ¡Afiliación Gratuita Confirmada!
                </span>
                <h3 className="text-xl font-black text-white">
                  ¡Felicidades, {fullName}!
                </h3>
                <p className="text-xs text-cyan-300 font-mono font-bold">
                  {handle.startsWith('@') ? handle : `@${handle}`} • Creador Fundador Cupo #{assignedFounderSpot || 8} de 10
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 text-xs font-mono text-slate-300 text-left space-y-1.5 border border-amber-400/30">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>✓ Estado de Afiliación:</span>
                  <span className="bg-amber-400/20 px-2 py-0.5 rounded">GRATIS DE POR VIDA</span>
                </div>
                <div>✓ Área: {EDUCATOR_NICHES.find(n => n.id === selectedNiche)?.label}</div>
                <div>✓ País: {country}</div>
                <div>✓ Correo Oficial: {email}</div>
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>✓ Comisión Aplicada:</span>
                  <span>0% Permanente</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => {
                    const text = `🎁 ¡Acabo de conseguir uno de los 10 Cupos de Afiliación 100% GRATIS en StreamPAY! 🚀 Mi cupo asignado: #${assignedFounderSpot || 8}. 0% de comisión de por vida:\n👉 ${getStreamPaySurveyUrl()}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Compartir en WhatsApp</span>
                </button>

                <button
                  onClick={() => setRegistrationComplete(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Registrar a Otro Creador
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRegistration} className="space-y-4 text-xs">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nombre Completo o Nombre Artístico / Docente:</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej: Prof. María José Tejirón"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Email & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Correo Electrónico:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="docente@email.com"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Usuario Deseado (@handle):</label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@profe_maria"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl font-mono font-bold text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Specialization / Niche */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">¿Qué tipo de contenido o clases impartes?:</label>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
                >
                  {EDUCATOR_NICHES.map((n) => (
                    <option key={n.id} value={n.id}>{n.label}</option>
                  ))}
                </select>
              </div>

              {/* Country Selection (Global without restrictions) */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center justify-between">
                  <span>País de Residencia:</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Sin Restricciones Geográficas</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  {GLOBAL_COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Primary Social & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Red Social Principal:</label>
                  <select
                    value={primarySocial}
                    onChange={(e) => setPrimarySocial(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Threads">Threads</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tu Perfil Actual:</label>
                  <input
                    type="text"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    placeholder="@tu_perfil_actual"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Procesando Pre-Registro...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirmar Mi Pre-Registro & Reservar @Handle</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

      {/* Live Stream Feed of Registered Creators */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Últimos Profesores y Creadores Pre-Registrados en Vivo</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono font-bold">● Actualizado en tiempo real</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {registeredList.map((creator, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span>{creator.name}</span>
                <span className="text-cyan-400 font-mono">{creator.handle}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>{creator.country}</span>
                <span className="text-emerald-400 font-mono">{creator.social}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
