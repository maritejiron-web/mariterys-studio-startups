import React, { useState } from 'react';
import { 
  Play, 
  Search, 
  PlusCircle, 
  Wallet, 
  Bell, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Layers,
  ChevronDown,
  UserCheck,
  Bot,
  Share2,
  Copy,
  Check,
  Globe2,
  MessageSquare,
  Gift,
  Crown,
  GraduationCap,
  Gem
} from 'lucide-react';
import { getStreamPaySurveyUrl, getStreamPayAppUrl } from '../../utils/streamPayUrls';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  userBalanceUSD: number;
  onOpenUpload: () => void;
  onOpenCalculator: () => void;
  onOpenFreeAffiliationModal?: () => void;
  onBackToHub?: () => void;
  onNavigateToTrading?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  userBalanceUSD,
  onOpenUpload,
  onOpenCalculator,
  onOpenFreeAffiliationModal,
  onBackToHub,
  onNavigateToTrading
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const getCampaignUrl = () => {
    return getStreamPaySurveyUrl();
  };

  const getAppUrl = () => {
    return getStreamPayAppUrl();
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-mono">
                  Stream<span className="text-cyan-400">PAY</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                by Pass Media Monetik
              </p>
            </div>
          </div>

          {/* Quick Info Badge for Large Screen */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Monetización Directa Día 1 · Sin Requisitos Mínimos</span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar videos, cursos, fotos o creadores..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Right Actions & Balance */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Top 10 Free Affiliation Offer Button */}
          {onOpenFreeAffiliationModal && (
            <button
              onClick={onOpenFreeAffiliationModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 active:scale-95 transition-all animate-pulse"
              title="Oferta de Afiliación GRATIS para las Primeras 10 Personas"
            >
              <Gift className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="hidden sm:inline">Afiliación GRATIS (10 Cupos)</span>
              <span className="sm:hidden">10 Cupos</span>
            </button>
          )}

          {/* Academia & Cursos Button */}
          <button
            onClick={() => setActiveTab('academy')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'academy'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-md shadow-indigo-500/20'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Academia de Superación: Marketing, Anuncios e Inglés para Afiliados"
          >
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span className="hidden xl:inline">Academia</span>
          </button>

          {/* Zona VIP Celebridades Button */}
          <button
            onClick={() => setActiveTab('vip')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'vip'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 hover:bg-slate-800 border-amber-500/30 text-amber-300 hover:text-amber-200'
            }`}
            title="StreamPAY Black: Zona VIP para Famosos y Celebridades"
          >
            <Gem className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline">Zona VIP</span>
          </button>

          {/* Bot I.A. Button */}
          <button
            onClick={() => setActiveTab('bot')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'bot'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Bot de Información I.A. de Afiliaciones y Clientes"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Bot I.A.</span>
          </button>

          {/* Calculator Button */}
          <button
            onClick={onOpenCalculator}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-all"
            title="Calculadora de Ganancias Comparativa vs YouTube"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Calculadora ROI</span>
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Publicar</span>
          </button>

          {/* Share Links Popover Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareModal(!showShareModal)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold transition-all shadow-sm"
              title="Obtener Links Oficiales de StreamPay y Encuesta"
            >
              <Share2 className="w-4 h-4 text-pink-400" />
              <span className="hidden sm:inline">Compartir Links</span>
            </button>

            {showShareModal && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">Enlaces Directos de StreamPAY</span>
                  </div>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Option 1: Survey Link */}
                <div className="p-3 rounded-xl bg-slate-950 border border-pink-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-pink-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Link de la Encuesta Viral
                    </span>
                    <span className="text-[10px] text-pink-400 font-mono">TikTok / IG</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Abre directo el formulario y encuesta de pre-registro sin pasar por los cursos.
                  </p>
                  <button
                    onClick={() => handleCopy(getCampaignUrl(), 'campaign')}
                    className="w-full py-2 px-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copiedType === 'campaign' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'campaign' ? '¡Enlace de Encuesta Copiado!' : 'Copiar Link Encuesta'}</span>
                  </button>
                </div>

                {/* Option 2: App Link */}
                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5" />
                      Link de StreamPAY App
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">Feed & Billetera</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Abre directamente la plataforma principal de videos y pagos de StreamPAY.
                  </p>
                  <button
                    onClick={() => handleCopy(getAppUrl(), 'app')}
                    className="w-full py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copiedType === 'app' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'app' ? '¡Enlace StreamPAY Copiado!' : 'Copiar Link StreamPAY'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wallet Balance Widget */}
          <button
            onClick={() => setActiveTab('wallet')}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all"
          >
            <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-emerald-400/80 font-medium uppercase tracking-wider leading-none">Mi Saldo</div>
              <div className="text-xs font-black font-mono text-emerald-300">${userBalanceUSD.toFixed(2)}</div>
            </div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 relative transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white">Notificaciones</span>
                  <span className="text-[10px] text-cyan-400">Recientes</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <p className="font-semibold text-emerald-300">🎉 ¡Propinas Recibidas!</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">María Fernanda te ha enviado $5.00 en tu video reciente.</p>
                    <span className="text-[9px] text-slate-500">Hace 12 min</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 text-xs">
                    <p className="font-semibold text-white">⭐ Nuevo Suscriptor VIP</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Alejandro M. se unió al nivel Socio Oro ($4.99/mes).</p>
                    <span className="text-[9px] text-slate-500">Hace 1 hora</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="Avatar"
              className="w-8 h-8 rounded-lg object-cover border border-slate-700"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:block" />
          </button>

        </div>

      </div>
    </header>
  );
};
