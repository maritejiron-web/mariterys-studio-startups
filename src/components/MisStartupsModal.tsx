import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Copy,
  Check,
  Globe,
  Coins,
  CreditCard,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Shapes,
  Award,
  Search,
  X,
  Share2,
  Sparkles,
  Layers,
  ArrowRight,
  Maximize2,
  Gamepad2,
  MessageCircle
} from 'lucide-react';

export interface StartupItem {
  id: string;
  name: string;
  category: 'negocios' | 'educacion' | 'turismo' | 'fintech' | 'entretenimiento';
  categoryLabel: string;
  tagline: string;
  description: string;
  badge: string;
  queryStr: string;
  project: 'hub' | 'trading' | 'streampay' | 'academy' | 'fintech' | 'travel' | 'certificate' | 'playearn';
  viewMode?: 'student' | 'teacher' | 'facebook' | 'engineering' | 'sexto-grado' | 'certificate' | 'geometria';
  extraParams?: Record<string, string>;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: {
    bg: string;
    border: string;
    text: string;
    hoverBorder: string;
    btnBg: string;
    btnHover: string;
    btnText: string;
  };
  features: string[];
}

// Catálogo maestro con enlaces claros y limpios para cada una de las Startups y módulos con Nombre Propio
export const STARTUPS_CATALOG: StartupItem[] = [
  {
    id: 'playearn',
    name: 'Play & Earn · Consola de Videojuegos VIP',
    category: 'entretenimiento',
    categoryLabel: 'Consola de Videojuegos & Ganancias',
    tagline: 'Consola Interactiva con Billar Pool 8-Ball VIP, Arkanoid Cristal 60 FPS, Anuncios y Premios Reales',
    description: 'Consola de videojuegos y plataforma de entretenimiento con Backend Firebase (play-and-earn-money-aap): incluye Billar Pool 8-Ball Club VIP (física real de bolas a 60 FPS y puntería láser), Arkanoid Crystal Breaker 60 FPS, Cofres Sorpresa, Mascota Minera PixiBot y Retiros Reales.',
    badge: '🎮 PLAY & EARN · CONSOLA DE VIDEOJUEGOS',
    queryStr: '?project=playearn',
    project: 'playearn',
    icon: Gamepad2,
    accentColor: {
      bg: 'bg-rose-950/40',
      border: 'border-rose-800/50',
      text: 'text-rose-400',
      hoverBorder: 'hover:border-rose-500',
      btnBg: 'bg-gradient-to-r from-rose-600 to-amber-500',
      btnHover: 'hover:from-rose-500 hover:to-amber-400',
      btnText: 'text-white'
    },
    features: [
      '🎱 Billar Pool 8-Ball VIP: Mesa profesional con física elástica real a 60 FPS y taco con guía láser',
      '🧱 Arkanoid Crystal Breaker: Rompe-bloques de cristal a 60 FPS con lluvia de monedas doradas',
      '🎁 Bóveda de Cofres Sorpresa, Mascota Minera PixiBot y Torneo de $250 USD',
      '📺 Monetización por ver anuncios con cronómetro 100% verificado y trivias',
      '💵 Retiros reales por PayPal, SINPE Móvil, Banco y USDT con Firebase Auth'
    ]
  },
  {
    id: 'travel',
    name: 'Travel Agency Rain Forest and Land',
    category: 'turismo',
    categoryLabel: 'Turismo & Cruceros',
    tagline: 'Agencia Digital de Viajes Ecoturísticos & Cruceros de Lujo',
    description: 'Plataforma integral de viajes ecoturísticos, expediciones a volcanes, selvas tropicales, playas de Costa Rica y venta oficial de Cruceros Royal Caribbean & Celebrity X.',
    badge: '🌴 TRAVEL AGENCY RAIN FOREST',
    queryStr: '?project=travel',
    project: 'travel',
    icon: Globe,
    accentColor: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-800/50',
      text: 'text-emerald-400',
      hoverBorder: 'hover:border-emerald-500',
      btnBg: 'bg-emerald-600',
      btnHover: 'hover:bg-emerald-500',
      btnText: 'text-white'
    },
    features: [
      'Expediciones a volcanes y reservas biológicas',
      'Cruceros Royal Caribbean & Celebrity X',
      'Cotizador de paquetes en tiempo real (USD y CRC)',
      'Asistente de itinerarios turísticos con IA'
    ]
  },
  {
    id: 'streampay',
    name: 'StreamPAY Pro',
    category: 'fintech',
    categoryLabel: 'Fintech & Monetización',
    tagline: 'Pasarela de Cobros Digitales & Monetización para Creadores',
    description: 'Sistema financiero para procesar pagos con tarjeta en línea, microcobros instantáneos por streaming, campañas de financiamiento y enlaces directos de cobro por WhatsApp.',
    badge: '💳 STREAMPAY PRO',
    queryStr: '?project=streampay',
    project: 'streampay',
    icon: CreditCard,
    accentColor: {
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-800/50',
      text: 'text-cyan-400',
      hoverBorder: 'hover:border-cyan-500',
      btnBg: 'bg-cyan-500',
      btnHover: 'hover:bg-cyan-400',
      btnText: 'text-slate-950'
    },
    features: [
      'Cobros con tarjeta de crédito/débito y link de pago',
      'Monetización directa para creadores de contenido',
      'Encuesta de validación de mercado y pre-registro',
      'Panel transaccional y retiro de fondos'
    ]
  },
  {
    id: 'fintech',
    name: 'CardPay Fintech Leader',
    category: 'fintech',
    categoryLabel: 'Banca Digital & Créditos',
    tagline: 'Core Bancario Transaccional, CFO A.I. 24/7 & Control Dual',
    description: 'Solución corporativa de intermediación financiera con libro contable de doble entrada (double-entry ledger ACID), Director Financiero con IA (Alex Morgan) y Protocolo de Control Dual (Maker-Checker) para firma gerencial.',
    badge: '💎 EN VENTA: $50,000 USD (₡26M CRC)',
    queryStr: '?project=fintech',
    project: 'fintech',
    icon: Coins,
    accentColor: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-800/50',
      text: 'text-amber-400',
      hoverBorder: 'hover:border-amber-500',
      btnBg: 'bg-gradient-to-r from-amber-500 to-amber-600',
      btnHover: 'hover:from-amber-400 hover:to-amber-500',
      btnText: 'text-stone-950'
    },
    features: [
      '🏷️ Adquisición Disponible: $50,000 USD (100% Código & Propiedad Intelectual)',
      'Libro contable inmutable de doble entrada (ACID Compliant)',
      'Alex Morgan (CFO A.I. 24/7): Atiende y evalúa hasta 3,000 clientes/minuto',
      'Protocolo de Control Dual (Maker-Checker): Fondos blindados bajo firma gerencial',
      'Simulador de préstamos con amortización francesa y alemana en tiempo real',
      'Bóveda multidivisa (CRC, USD, EUR) y hashes criptográficos inmutables'
    ]
  },
  {
    id: 'trading',
    name: 'QuantumTrade VIP A.I',
    category: 'fintech',
    categoryLabel: 'Mercados Financieros',
    tagline: 'Terminal Multiactivo Profesional & Algoritmos Cuánticos',
    description: 'Consola de trading institucional con cotizaciones en vivo (Forex, Cripto, Acciones, Metales), gráficos avanzados y bots de inteligencia artificial con pasarela de saldo.',
    badge: '📈 QUANTUMTRADE VIP',
    queryStr: '?project=trading',
    project: 'trading',
    icon: TrendingUp,
    accentColor: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-800/50',
      text: 'text-purple-400',
      hoverBorder: 'hover:border-purple-500',
      btnBg: 'bg-purple-600',
      btnHover: 'hover:bg-purple-500',
      btnText: 'text-white'
    },
    features: [
      'Gráficos interactivos de precios en tiempo real',
      'Bots algorítmicos automatizados con IA',
      'Gestión de órdenes de compra/venta instantáneas',
      'Pasarela de depósitos y balances seguros'
    ]
  },
  {
    id: 'academy',
    name: "FullStack Academy",
    category: 'educacion',
    categoryLabel: 'Academia de Programación & IA',
    tagline: 'Plataforma de Formación Técnica, 13 Cursos & Tutor Einstein',
    description: 'Plataforma de software educativo con 13 cursos profesionales completos (React, Node.js, Python, C++, FinTech, IA), laboratorio interactivo de código con ejecución en vivo y el Tutor Albert Einstein.',
    badge: '🎓 FULLSTACK ACADEMY',
    queryStr: '?project=academy',
    project: 'academy',
    viewMode: 'student',
    icon: GraduationCap,
    accentColor: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-800/50',
      text: 'text-amber-400',
      hoverBorder: 'hover:border-amber-500',
      btnBg: 'bg-amber-500',
      btnHover: 'hover:bg-amber-400',
      btnText: 'text-stone-950'
    },
    features: [
      '13 especialidades de software completamente abiertas',
      'Editor de código con consola y compilador en vivo',
      'Tutor virtual de IA Albert Einstein disponible 24/7',
      'Módulos de evaluación práctica y certificación digital'
    ]
  },
  {
    id: 'sexto-grado',
    name: 'EduSexto MEP',
    category: 'educacion',
    categoryLabel: 'Educación Oficial MEP',
    tagline: 'Portal Oficial Interactivo y Simuladores de 6° Grado Primaria',
    description: 'Portal educativo oficial del Ministerio de Educación Pública de Costa Rica con materias completas (Matemáticas, Ciencias, Español, Estudios Sociales) y simuladores de exámenes estandarizados.',
    badge: '🎒 EDUSEXTO MEP',
    queryStr: '?project=sexto-grado',
    project: 'academy',
    viewMode: 'sexto-grado',
    icon: BookOpen,
    accentColor: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-800/50',
      text: 'text-emerald-400',
      hoverBorder: 'hover:border-emerald-500',
      btnBg: 'bg-emerald-600',
      btnHover: 'hover:bg-emerald-500',
      btnText: 'text-white'
    },
    features: [
      'Simulador interactivo de pruebas estandarizadas MEP',
      'Explicaciones paso a paso con voz de Albert Einstein',
      '12 medallas de honor y diplomas de reconocimiento',
      'Descarga de temarios y resúmenes para imprimir'
    ]
  },
  {
    id: 'sociales-1948',
    name: 'Reto 1948 Costa Rica',
    category: 'educacion',
    categoryLabel: 'Historia & Cívica MEP',
    tagline: 'Simulador Histórico Especializado: Guerra de 1948 y Logros Sociales',
    description: 'Módulo de 20 preguntas oficiales MEP sobre la Guerra Civil de 1948, Abolición del Ejército por don Pepe Figueres, creación del Estado Benefactor e Instituciones Autónomas (ICE, INVU, AyA, CCSS).',
    badge: '🇨🇷 RETO 1948 MEP',
    queryStr: '?project=sociales-1948',
    project: 'academy',
    viewMode: 'sexto-grado',
    extraParams: { sextoTab: 'sociales' },
    icon: Award,
    accentColor: {
      bg: 'bg-rose-950/40',
      border: 'border-rose-800/50',
      text: 'text-rose-400',
      hoverBorder: 'hover:border-rose-500',
      btnBg: 'bg-rose-600',
      btnHover: 'hover:bg-rose-500',
      btnText: 'text-white'
    },
    features: [
      '20 preguntas de examen MEP con retroalimentación inmediata',
      'Línea de tiempo histórica interactiva de 1940 a la actualidad',
      'Juego de emparejar instituciones autónomas (ICE, INVU, AyA)',
      'Medalla Bicentenario 1948 y ficha de estudio imprimible'
    ]
  },
  {
    id: 'geometria',
    name: 'GeometryStudio',
    category: 'educacion',
    categoryLabel: 'Laboratorio Matemático',
    tagline: 'Pizarra Digital de Dibujo Libre y Laboratorio de Polígonos',
    description: 'Entorno interactivo para dibujar y trazar figuras geométricas libremente con sellos de polígonos (hexágonos, heptágonos, pentágonos), fórmulas de perímetro/área y voz de Einstein.',
    badge: '📐 GEOMETRYSTUDIO',
    queryStr: '?project=geometria',
    project: 'academy',
    viewMode: 'geometria',
    icon: Shapes,
    accentColor: {
      bg: 'bg-yellow-950/40',
      border: 'border-yellow-800/50',
      text: 'text-yellow-400',
      hoverBorder: 'hover:border-yellow-500',
      btnBg: 'bg-yellow-500',
      btnHover: 'hover:bg-yellow-400',
      btnText: 'text-stone-950'
    },
    features: [
      'Pizarra digital interactiva de dibujo y trazo con ratón o táctil',
      'Sellos automáticos de polígonos regulares y círculos',
      'Cálculo dinámico en vivo de perímetros, áreas y ángulos',
      'Consejos auditivos del profesor Einstein para el examen'
    ]
  },
  {
    id: 'certificate',
    name: 'CertiDigital Studio',
    category: 'negocios',
    categoryLabel: 'Acreditación & Títulos',
    tagline: 'Generador y Validador Oficial de Títulos Universitarios y Certificados',
    description: 'Herramienta de grado institucional para emitir certificados profesionales y diplomas universitarios con sellos dorados, firmas digitales y código de verificación.',
    badge: '📜 CERTIDIGITAL STUDIO',
    queryStr: '?project=certificate',
    project: 'certificate',
    icon: Award,
    accentColor: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-800/50',
      text: 'text-amber-400',
      hoverBorder: 'hover:border-amber-500',
      btnBg: 'bg-amber-500',
      btnHover: 'hover:bg-amber-400',
      btnText: 'text-stone-950'
    },
    features: [
      'Plantillas oficiales para títulos universitarios',
      'Personalización de estudiante, carrera, fecha y rectoría',
      'Sellos y timbres digitales de alta resolución',
      'Exportación e impresión directa para enmarcar'
    ]
  }
];

// URL base oficial de la plataforma
export const DEV_APP_BASE_URL = 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';

// Helper para obtener URL limpia, permanente y directa para clientes y usuarios
export const getCleanStartupUrl = (queryStr: string): string => {
  const cleanQuery = queryStr.startsWith('?') ? queryStr : `?${queryStr}`;
  let base = DEV_APP_BASE_URL;
  if (typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('run.app')) {
    base = window.location.origin;
  }
  base = base.replace(/\/+$/, '');
  return `${base}/${cleanQuery}`;
};

export interface MisStartupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStartup: (startup: StartupItem) => void;
  activeProjectId?: string;
}

export default function MisStartupsModal({
  isOpen,
  onClose,
  onSelectStartup,
  activeProjectId
}: MisStartupsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [sharedKey, setSharedKey] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<{ title: string; url: string } | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [showGithubExport, setShowGithubExport] = useState<boolean>(false);
  const [ghToken, setGhToken] = useState<string>('');
  const [ghRepoName, setGhRepoName] = useState<string>('mariterys-studio-startups');
  const [ghIsPushing, setGhIsPushing] = useState<boolean>(false);
  const [ghFeedback, setGhFeedback] = useState<{ ok: boolean; msg: string; url?: string } | null>(null);

  const handlePushStartupsToGithub = async () => {
    if (!ghToken.trim()) {
      setGhFeedback({
        ok: false,
        msg: '⚠️ Pega tu Token Personal de GitHub (empieza con ghp_ o github_pat_) o usa el ícono de GitHub arriba a la derecha de tu pantalla.'
      });
      return;
    }
    setGhIsPushing(true);
    setGhFeedback({ ok: true, msg: '🛰️ Conectando con GitHub y subiendo el código fuente de tus Startups...' });
    try {
      const res = await fetch('/api/github/push-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: ghToken.trim(),
          repoName: ghRepoName.trim() || 'mariterys-studio-startups',
          isPrivate: false
        })
      });
      const data = await res.json();
      if (data && data.success) {
        setGhFeedback({
          ok: true,
          msg: `✅ ¡ÉXITO! Se subieron ${data.filesCount} archivos de tus Startups a tu cuenta de GitHub.`,
          url: data.repoUrl
        });
      } else {
        setGhFeedback({
          ok: false,
          msg: `❌ ${data?.error || 'No se pudo subir a GitHub. Verifica tu token.'}`
        });
      }
    } catch {
      setGhFeedback({
        ok: false,
        msg: '❌ Error de red al conectar con GitHub.'
      });
    } finally {
      setGhIsPushing(false);
    }
  };

  if (!isOpen) return null;

  const filteredStartups = STARTUPS_CATALOG.filter((item) => {
    const matchesCategory = selectedCategory === 'todas' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.queryStr.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopySingleUrl = (startup: StartupItem) => {
    const fullUrl = getCleanStartupUrl(startup.queryStr);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
    }
    setCopiedKey(startup.id);
    setShareToast({ title: startup.name, url: fullUrl });
    setTimeout(() => setCopiedKey(null), 3000);
    setTimeout(() => setShareToast(null), 3500);
  };

  const handleShareSingle = async (startup: StartupItem) => {
    const fullUrl = getCleanStartupUrl(startup.queryStr);
    const shareText = `🚀 *${startup.name}* (${startup.categoryLabel})\n${startup.tagline}\n\n🔗 Acceso permanente y demostración en vivo:\n${fullUrl}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${startup.name} - Plataforma Oficial`,
          text: `Te comparto la startup ${startup.name}: ${startup.tagline}`,
          url: fullUrl
        });
        setSharedKey(startup.id);
        setShareToast({ title: startup.name, url: fullUrl });
        setTimeout(() => setSharedKey(null), 3000);
        setTimeout(() => setShareToast(null), 3500);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log('Error sharing:', err);
        }
      }
    }

    // Fallback portapapeles
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}`);
    }
    setCopiedKey(startup.id);
    setSharedKey(startup.id);
    setShareToast({ title: startup.name, url: fullUrl });
    setTimeout(() => {
      setCopiedKey(null);
      setSharedKey(null);
    }, 3000);
    setTimeout(() => setShareToast(null), 3500);
  };

  const handleWhatsAppShare = (startup: StartupItem) => {
    const fullUrl = getCleanStartupUrl(startup.queryStr);
    const msg = encodeURIComponent(`🚀 *${startup.name}* (${startup.categoryLabel})\n${startup.tagline}\n\n👉 Enlace oficial para clientes e inversionistas:\n${fullUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const handleOpenExternalTab = (startup: StartupItem) => {
    const fullUrl = getCleanStartupUrl(startup.queryStr);
    window.open(fullUrl, '_blank');
  };

  const handleCopyAllLinks = () => {
    let text = `🚀 *PORTAFOLIO DE STARTUPS & SOLUCIONES TECNOLÓGICAS*\n\n`;
    text += `Todos los módulos operan de forma independiente con enlaces públicos permanentes para demostración, venta y uso 24/7:\n\n`;
    STARTUPS_CATALOG.forEach((st, idx) => {
      text += `${idx + 1}. *${st.name}* (${st.categoryLabel})\n`;
      text += `   📝 ${st.tagline}\n`;
      text += `   🔗 Enlace permanente: ${getCleanStartupUrl(st.queryStr)}\n\n`;
    });
    text += `Para soporte, compra de licencias o adquisición de startups, contactar al equipo de administración.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 4000);
  };

  return (
    <div
      id="mis-startups-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-left"
        id="mis-startups-modal-content"
      >
        {/* ENCABEZADO SUPERIOR */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-gradient-to-tr from-amber-600 to-amber-500 text-stone-950 rounded-2xl shrink-0 shadow-lg shadow-amber-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2.5 py-0.5 rounded-full uppercase">
                  STARTUPS & SAAS • CATÁLOGO OFICIAL
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  10 Startups en Línea
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                Enlaces Claros & Despliegue Inmediato de Startups
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Haz clic en <strong className="text-white">"Desplegar Pantalla"</strong> para abrir cualquier proyecto en pantalla completa al instante, o copia el enlace limpio para enviarlo a clientes o inversionistas.
              </p>
            </div>
          </div>

          <button
            id="close-startups-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer shrink-0"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BARRA DE CONTROLES: BÚSQUEDA, CATEGORÍAS & COPIAR TODO */}
        <div className="p-4 bg-stone-950/70 border-b border-stone-800/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* BUSCADOR */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar startup o materia..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* FILTROS POR CATEGORÍA */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {[
              { id: 'todas', label: 'Todas (10)' },
              { id: 'entretenimiento', label: '🎮 Entretenimiento' },
              { id: 'turismo', label: '🌴 Turismo' },
              { id: 'fintech', label: '💳 Fintech' },
              { id: 'educacion', label: '🎓 Educación MEP' },
              { id: 'negocios', label: '📜 Acreditación' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* BOTÓN GITHUB & COPIAR TODO */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowGithubExport((prev) => !prev)}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-emerald-400 border border-emerald-500/40 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              title="Pasar todas mis Startups a GitHub"
            >
              <span>🐙 Pasar a GitHub</span>
            </button>
            <button
              id="copy-all-startups-btn"
              onClick={handleCopyAllLinks}
              className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md shadow-emerald-950/50"
              title="Copiar lista completa de enlaces para WhatsApp o correo de inversionistas"
            >
              {copiedAll ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedAll ? '¡Catálogo Copiado!' : 'Copiar Todas'}</span>
            </button>
          </div>
        </div>

        {/* PANEL DESPLEGABLE DE EXPORTACIÓN A GITHUB */}
        {showGithubExport && (
          <div className="p-4 bg-gradient-to-r from-stone-950 via-emerald-950/25 to-stone-950 border-b border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-emerald-400 uppercase">
                🐙 Cómo Pasar Todas Tus Startups a GitHub
              </span>
              <button
                type="button"
                onClick={() => setShowGithubExport(false)}
                className="text-xs text-stone-400 hover:text-white cursor-pointer"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
                  ⭐ Opción 1 (Directa en la Barra Superior):
                </span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Arriba a la derecha de la pantalla de <strong>Google AI Studio</strong>, haz clic en el ícono de <strong>GitHub (el gatito)</strong> o en <strong>Descargar ZIP</strong> para guardar todas tus Startups en tu cuenta de GitHub sin necesidad de claves.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900 border border-emerald-500/30 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">
                    🚀 Opción 2 (Subida Automática en 1 Clic con Token):
                  </span>
                  <a
                    href="https://github.com/settings/tokens/new?description=Mariterys+Studio+Startups&scopes=repo"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-black text-[10px] rounded-lg inline-flex items-center gap-1 shadow shrink-0"
                  >
                    🔑 1. Clic aquí para sacar tu Token →
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={ghRepoName}
                    onChange={(e) => setGhRepoName(e.target.value)}
                    placeholder="Nombre del repo (ej: mariterys-studio)"
                    className="bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-100"
                  />
                  <input
                    type="password"
                    value={ghToken}
                    onChange={(e) => setGhToken(e.target.value)}
                    placeholder="Tu Token de GitHub (ghp_...)"
                    className="bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePushStartupsToGithub}
                  disabled={ghIsPushing}
                  className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono font-black text-xs uppercase rounded-lg cursor-pointer"
                >
                  {ghIsPushing ? 'Subiendo a GitHub...' : '🐙 Subir Mis Startups a GitHub'}
                </button>
                {ghFeedback && (
                  <div className={`p-2 rounded-lg text-[11px] font-mono ${ghFeedback.ok ? 'bg-emerald-950/60 text-emerald-300' : 'bg-rose-950/60 text-rose-300'}`}>
                    <p>{ghFeedback.msg}</p>
                    {ghFeedback.url && (
                      <a href={ghFeedback.url} target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold block mt-1">
                        🔗 Ver en GitHub: {ghFeedback.url}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LISTA GRID DE STARTUPS */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3.5 custom-scrollbar">
          {filteredStartups.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Search className="w-8 h-8 mx-auto text-stone-600" />
              <p className="text-sm font-bold">No se encontraron startups con esa búsqueda.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('todas');
                }}
                className="text-xs text-amber-400 underline cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            filteredStartups.map((startup) => {
              const IconComp = startup.icon;
              const isCurrentActive = activeProjectId === startup.project;
              const fullCleanUrl = getCleanStartupUrl(startup.queryStr);

              return (
                <div
                  key={startup.id}
                  id={`startup-card-${startup.id}`}
                  className={`p-4 sm:p-5 rounded-2xl bg-stone-950/80 border transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                    isCurrentActive
                      ? 'border-amber-500/70 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                      : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {/* INFORMACIÓN DE LA STARTUP */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-2.5 flex-wrap">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <div className={`p-2 rounded-xl ${startup.accentColor.bg} ${startup.accentColor.text} border ${startup.accentColor.border}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-sm sm:text-base font-black text-white tracking-tight">
                          {startup.name}
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${startup.accentColor.bg} ${startup.accentColor.text} ${startup.accentColor.border}`}>
                          {startup.badge}
                        </span>
                        {isCurrentActive && (
                          <span className="text-[9px] font-mono font-black bg-amber-500 text-stone-950 px-2 py-0.5 rounded">
                            ACTUALMENTE ABIERTA
                          </span>
                        )}
                      </div>

                      {/* ÍCONOS RÁPIDOS DE COMPARTIR POR APARTE PARA ESTA STARTUP */}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <button
                          type="button"
                          onClick={() => handleWhatsAppShare(startup)}
                          className="px-2 py-1 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 hover:text-emerald-300 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer"
                          title={`Compartir ${startup.name} directamente por WhatsApp`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShareSingle(startup)}
                          className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer ${
                            sharedKey === startup.id
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-stone-900 hover:bg-stone-850 border-stone-800 hover:border-amber-500 text-amber-400 hover:text-amber-300'
                          }`}
                          title={`Compartir ${startup.name} por WhatsApp, redes o copiar enlace permanente`}
                        >
                          {sharedKey === startup.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>¡Compartido!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Compartir</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {startup.description}
                    </p>

                    {/* CARACTERÍSTICAS RÁPIDAS */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {startup.features.map((feat, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono bg-stone-900/90 text-stone-400 border border-stone-850 px-2 py-0.5 rounded-md"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    {/* ENLACE PERMANENTE Y PÚBLICO PARA ANUNCIOS */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] font-mono">
                      <span className="text-emerald-400 font-bold uppercase text-[9px] tracking-wider shrink-0 flex items-center gap-1">
                        🌐 Enlace Permanente (Para Anuncios / Clientes):
                      </span>
                      <div className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-amber-400/90 font-bold select-all break-all flex-1 flex items-center justify-between gap-2">
                        <span className="truncate">{fullCleanUrl}</span>
                        <span className="text-[9px] bg-stone-950 text-stone-400 px-1.5 py-0.5 rounded border border-stone-800 shrink-0">
                          {startup.queryStr}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BOTONES DE ACCIÓN: ABRIR / DESPLEGAR, COMPARTIR, NUEVA PESTAÑA, COPIAR */}
                  <div className="flex flex-row lg:flex-col items-center gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-stone-850 pt-3 lg:pt-0 lg:pl-4 w-full lg:w-56">
                    {/* 1. BOTÓN PRINCIPAL: DESPLEGAR PANTALLA COMPLETA */}
                    <button
                      id={`btn-deploy-${startup.id}`}
                      onClick={() => {
                        onSelectStartup(startup);
                        onClose();
                      }}
                      className={`w-full py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${startup.accentColor.btnBg} ${startup.accentColor.btnHover} ${startup.accentColor.btnText}`}
                      title="Abrir y desplegar la pantalla completa de esta startup inmediatamente"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Desplegar Pantalla</span>
                    </button>

                    {/* 2. FILA DE BOTONES: COMPARTIR, PESTAÑA, COPIAR */}
                    <div className="grid grid-cols-3 gap-1.5 w-full">
                      {/* BOTÓN COMPARTIR INDIVIDUAL */}
                      <button
                        id={`btn-share-${startup.id}`}
                        onClick={() => handleShareSingle(startup)}
                        className={`py-2 px-1.5 rounded-xl text-[10.5px] font-bold font-mono transition flex items-center justify-center gap-1 cursor-pointer border ${
                          sharedKey === startup.id
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-sm'
                            : 'bg-stone-900 hover:bg-stone-850 border-stone-800 hover:border-amber-500/80 text-amber-400 hover:text-amber-300'
                        }`}
                        title={`Compartir ${startup.name} (WhatsApp, Redes o Sistema)`}
                      >
                        {sharedKey === startup.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{sharedKey === startup.id ? '¡Listo!' : 'Compartir'}</span>
                      </button>

                      {/* BOTÓN ABRIR EN NUEVA PESTAÑA */}
                      <button
                        id={`btn-tab-${startup.id}`}
                        onClick={() => handleOpenExternalTab(startup)}
                        className="py-2 px-1.5 bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white rounded-xl text-[10.5px] font-bold font-mono transition flex items-center justify-center gap-1 cursor-pointer"
                        title="Abrir en una nueva pestaña del navegador"
                      >
                        <ExternalLink className="w-3 h-3 text-cyan-400" />
                        <span>Pestaña ↗</span>
                      </button>

                      {/* BOTÓN COPIAR ENLACE PERMANENTE PARA ANUNCIOS */}
                      <button
                        id={`btn-copy-${startup.id}`}
                        onClick={() => handleCopySingleUrl(startup)}
                        className="py-2 px-1.5 bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white rounded-xl text-[10.5px] font-bold font-mono transition flex items-center justify-center gap-1 cursor-pointer"
                        title="Copiar enlace permanente directo al portapapeles"
                      >
                        {copiedKey === startup.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{copiedKey === startup.id ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* NOTIFICACIÓN FLOTANTE AL COMPARTIR O COPIAR */}
        {shareToast && (
          <div className="mx-6 mb-3 p-3 bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border border-emerald-500/50 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs text-stone-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 truncate">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="font-bold text-emerald-300">¡Enlace de {shareToast.title} listo!</span>{' '}
                <span className="text-[11px] text-stone-400 font-mono truncate hidden sm:inline">({shareToast.url})</span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50 shrink-0">
              ✓ Compartido
            </span>
          </div>
        )}

        {/* PIE DE PÁGINA DEL MODAL */}
        <div className="p-4 bg-stone-950 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">💡 Consejo:</span>
            <span>Los enlaces son permanentes y pueden añadirse a marcadores o enviarse a inversores.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl transition cursor-pointer text-xs"
          >
            Cerrar Ventana
          </button>
        </div>
      </motion.div>
    </div>
  );
}
