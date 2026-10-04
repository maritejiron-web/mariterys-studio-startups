import React, { useState } from 'react';
import { 
  Home, 
  Flame, 
  Users, 
  Tv2, 
  TrendingUp, 
  Wallet, 
  ShieldCheck, 
  Sparkles, 
  FolderPlus, 
  Video, 
  Camera, 
  Award,
  Bot,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Globe2,
  Gift,
  Crown,
  GraduationCap,
  Gem
} from 'lucide-react';
import { getStreamPaySurveyUrl, getStreamPayAppUrl } from '../../utils/streamPayUrls';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenCalculator: () => void;
  onOpenFreeAffiliationModal?: () => void;
}

const CATEGORIES = [
  'Todas',
  'Tecnología',
  'Educación',
  'Gaming',
  'Vlogs',
  'Cursos & Masterclass',
  'Fitness & Salud',
  'Negocios & Finanzas',
  'Fotografía'
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  onOpenCalculator,
  onOpenFreeAffiliationModal
}) => {
  const [copiedLinkType, setCopiedLinkType] = useState<string | null>(null);

  const handleCopy = (url: string, type: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinkType(type);
    setTimeout(() => setCopiedLinkType(null), 2500);
  };

  const getCampaignUrl = () => {
    return getStreamPaySurveyUrl();
  };

  const getAppUrl = () => {
    return getStreamPayAppUrl();
  };
  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-slate-950 border-r border-slate-800/80 p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-65px)] sticky top-[65px]">
      
      {/* Primary Navigation Menu */}
      <div className="space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          Navegación Widescreen
        </div>
        
        <button
          onClick={() => setActiveTab('feed')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'feed'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Feed Principal</span>
          </div>
          {activeTab === 'feed' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
        </button>

        <button
          onClick={() => setActiveTab('trending')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'trending'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Tendencias en Vivo</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('campaign')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'campaign'
              ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-pink-300 border border-pink-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Encuesta TikTok / Redes</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono font-bold">VIRAL</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'comparison'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Matriz vs Competencia</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('bot')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'bot'
              ? 'bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Bot I.A. Afiliaciones</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">I.A. 24/7</span>
        </button>

        <button
          onClick={() => setActiveTab('creators')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'creators'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Creadores & Perfiles</span>
          </div>
        </button>

        {/* Academia de Superación & Cursos */}
        <button
          onClick={() => setActiveTab('academy')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'academy'
              ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Academia & Cursos</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">GRATIS</span>
        </button>

        {/* Zona VIP Celebridades / Famosos */}
        <button
          onClick={() => setActiveTab('vip')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'vip'
              ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-slate-900 text-amber-300 border border-amber-400/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Gem className="w-4 h-4 text-amber-400" />
            <span>Zona VIP Famosos</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-mono font-black">BLACK</span>
        </button>
      </div>

      {/* Free Affiliation Top 10 Promo Card */}
      {onOpenFreeAffiliationModal && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border border-amber-400/60 shadow-lg shadow-amber-500/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-300 font-black text-[11px]">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Afiliación 100% GRATIS</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black font-mono text-[9px]">
              10 CUPOS
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            0% comisión de por vida para las primeras 10 personas.
          </p>
          <button
            onClick={onOpenFreeAffiliationModal}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-slate-950 font-black text-[11px] shadow hover:from-amber-300 hover:to-orange-400 transition-all flex items-center justify-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Reclamar Mi Cupo</span>
          </button>
        </div>
      )}

      {/* Creator Tools & Monetization */}
      <div className="pt-2 border-t border-slate-800/80 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          Herramientas de Creador
        </div>

        <button
          onClick={() => setActiveTab('studio')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'studio'
              ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Tv2 className="w-4 h-4 text-indigo-400" />
            <span>Estudio de Creador</span>
          </div>
        </button>

        <button
          onClick={onOpenCalculator}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-amber-300 hover:bg-amber-500/10 border border-amber-500/20 transition-all"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Calculadora ROI Día 1</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">VS YouTube</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'wallet'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Billetera & Pagos</span>
          </div>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="pt-2 border-t border-slate-800/80 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          Categorías de Contenido
        </div>

        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveTab('feed');
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Direct Monetization Advantage Box */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 text-xs space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Sparkles className="w-4 h-4" />
          <span>StreamPAY Pass Media</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Recibe micro-propinas de $0.50 a $50+, vende accesos Pay-Per-View y cobra directo a tu cuenta bancaria o SINPE sin esperas.
        </p>
        <button 
          onClick={onOpenCalculator}
          className="w-full mt-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-[11px] text-center transition-all"
        >
          Ver Tabla Comparativa
        </button>
      </div>

      {/* Quick Links Section in Sidebar */}
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase font-bold">
          <span className="flex items-center gap-1 text-cyan-400">
            <Globe2 className="w-3.5 h-3.5" />
            Links Directos
          </span>
          <span className="text-emerald-400">1-Clic</span>
        </div>

        <button
          onClick={() => handleCopy(getCampaignUrl(), 'campaign')}
          className="w-full py-1.5 px-2.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 font-medium text-[11px] flex items-center justify-between transition-all"
        >
          <span className="truncate">📋 Link Encuesta</span>
          {copiedLinkType === 'campaign' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <Copy className="w-3.5 h-3.5 shrink-0" />
          )}
        </button>

        <button
          onClick={() => handleCopy(getAppUrl(), 'app')}
          className="w-full py-1.5 px-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-medium text-[11px] flex items-center justify-between transition-all"
        >
          <span className="truncate">🌐 Link StreamPAY</span>
          {copiedLinkType === 'app' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <Copy className="w-3.5 h-3.5 shrink-0" />
          )}
        </button>
      </div>

    </aside>
  );
};
