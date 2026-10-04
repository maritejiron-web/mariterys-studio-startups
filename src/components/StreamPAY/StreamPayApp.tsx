import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { VideoPlayerView } from './VideoPlayerView';
import { CreatorStudio } from './CreatorStudio';
import { MonetizationCalculator } from './MonetizationCalculator';
import { WalletPayouts } from './WalletPayouts';
import { UploadModal } from './UploadModal';
import { CompetitiveComparison } from './CompetitiveComparison';
import { PreRegistrationCampaign } from './PreRegistrationCampaign';
import { InformationBot } from './InformationBot';
import { FreeAffiliationOfferModal } from './FreeAffiliationOfferModal';
import { StreamerAcademy } from './StreamerAcademy';
import { CelebrityVipLounge } from './CelebrityVipLounge';
import { FEATURED_CREATORS, SAMPLE_MEDIA_ITEMS, MOCK_TRANSACTIONS, INITIAL_ANALYTICS } from '../../data/streamPayData';
import { StreamMediaItem, StreamTipTransaction, CreatorAnalytics } from '../../types';
import { 
  Play, 
  Flame, 
  Sparkles, 
  DollarSign, 
  Lock, 
  Heart, 
  Eye, 
  Users, 
  CheckCircle2, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp,
  Tv,
  Bot
} from 'lucide-react';

interface StreamPayAppProps {
  onBackToHub?: () => void;
  onNavigateToTrading?: () => void;
}

export default function StreamPayApp({
  onBackToHub,
  onNavigateToTrading
}: StreamPayAppProps = {}) {
  const [activeTab, setActiveTabState] = useState<'feed' | 'watch' | 'studio' | 'trending' | 'creators' | 'wallet' | 'campaign' | 'comparison' | 'bot' | 'academy' | 'vip'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = (params.get('tab') || '').toLowerCase();
      const viewParam = (params.get('view') || '').toLowerCase();
      const hash = (window.location.hash || '').toLowerCase();

      if (
        tabParam === 'campaign' || 
        tabParam === 'encuesta' || 
        tabParam === 'preregistro' || 
        viewParam === 'encuesta' ||
        params.has('encuesta') ||
        hash.includes('encuesta') || 
        hash.includes('campaign') ||
        hash.includes('preregistro')
      ) {
        return 'campaign';
      }
      if (tabParam === 'wallet' || tabParam === 'billetera' || hash.includes('wallet')) return 'wallet';
      if (tabParam === 'studio' || hash.includes('studio')) return 'studio';
      if (tabParam === 'creators' || hash.includes('creators')) return 'creators';
      if (tabParam === 'comparison' || hash.includes('comparison')) return 'comparison';
      if (tabParam === 'bot' || hash.includes('bot')) return 'bot';
      if (tabParam === 'academy' || tabParam === 'cursos' || hash.includes('academy') || hash.includes('cursos')) return 'academy';
      if (tabParam === 'vip' || tabParam === 'famosos' || hash.includes('vip') || hash.includes('famosos') || hash.includes('celebrity')) return 'vip';
      if (tabParam === 'trending' || hash.includes('trending')) return 'trending';
      if (tabParam === 'watch' || hash.includes('watch')) return 'watch';
    }
    return 'feed';
  });
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFloatingBot, setShowFloatingBot] = useState(false);

  const setActiveTab = (tab: 'feed' | 'watch' | 'studio' | 'trending' | 'creators' | 'wallet' | 'campaign' | 'comparison' | 'bot' | 'academy' | 'vip') => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('project', 'streampay');
      url.searchParams.set('tab', tab);
      url.searchParams.delete('view');
      url.searchParams.delete('course');
      url.searchParams.delete('subject');
      url.searchParams.delete('encuesta');
      const targetHash = tab === 'campaign' ? '#encuesta' : tab === 'academy' ? '#academy' : tab === 'vip' ? '#vip' : '#streampay';
      window.history.replaceState({}, '', url.pathname + url.search + targetHash);
    }
  };

  // Sync with URL parameter on load and on back/forward
  useEffect(() => {
    const syncTabFromUrl = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const tabParam = (params.get('tab') || '').toLowerCase();
        const hash = (window.location.hash || '').toLowerCase();

        if (
          tabParam === 'campaign' || 
          tabParam === 'encuesta' || 
          tabParam === 'preregistro' || 
          params.has('encuesta') ||
          hash.includes('encuesta') || 
          hash.includes('campaign')
        ) {
          setActiveTabState('campaign');
          return;
        }

        const validTabs = ['feed', 'watch', 'studio', 'trending', 'creators', 'wallet', 'campaign', 'comparison', 'bot', 'academy', 'vip'];
        if (tabParam && validTabs.includes(tabParam)) {
          setActiveTabState(tabParam as any);
        }
      }
    };

    syncTabFromUrl();
    window.addEventListener('popstate', syncTabFromUrl);
    window.addEventListener('hashchange', syncTabFromUrl);
    return () => {
      window.removeEventListener('popstate', syncTabFromUrl);
      window.removeEventListener('hashchange', syncTabFromUrl);
    };
  }, []);
  
  // Media items state
  const [mediaItems, setMediaItems] = useState<StreamMediaItem[]>(SAMPLE_MEDIA_ITEMS);
  const [selectedMedia, setSelectedMedia] = useState<StreamMediaItem>(SAMPLE_MEDIA_ITEMS[0]);
  
  // Wallet & Analytics state
  const [userBalanceUSD, setUserBalanceUSD] = useState<number>(3840.50);
  const [analytics, setAnalytics] = useState<CreatorAnalytics>(INITIAL_ANALYTICS);
  const [transactions, setTransactions] = useState<StreamTipTransaction[]>(MOCK_TRANSACTIONS);

  // Modals state
  const [showCalculator, setShowCalculator] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFreeAffiliationModal, setShowFreeAffiliationModal] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const hash = (window.location.hash || '').toLowerCase();
      return (
        params.has('oferta') || 
        params.has('afiliacion') || 
        params.has('gratis') || 
        params.has('top10') ||
        hash.includes('oferta') || 
        hash.includes('afiliacion') ||
        hash.includes('gratis')
      );
    }
    return false;
  });

  // Handlers
  const handleSelectMedia = (item: StreamMediaItem) => {
    setSelectedMedia(item);
    setActiveTab('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendTip = (mediaId: string, amountUSD: number, commentText?: string) => {
    // Deduct/Add tip
    const updatedMedia = mediaItems.map(m => {
      if (m.id === mediaId) {
        const updatedComments = commentText ? [
          {
            id: `c-tip-${Date.now()}`,
            authorName: 'Tú (Seguidor VIP)',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
            text: commentText,
            timestamp: 'Ahora mismo',
            tipAmount: amountUSD,
            isPinned: true,
            likes: 1
          },
          ...m.comments
        ] : m.comments;

        return {
          ...m,
          tipsCount: m.tipsCount + 1,
          totalTipsAmountUSD: m.totalTipsAmountUSD + amountUSD,
          comments: updatedComments
        };
      }
      return m;
    });

    setMediaItems(updatedMedia);
    if (selectedMedia.id === mediaId) {
      const target = updatedMedia.find(m => m.id === mediaId);
      if (target) setSelectedMedia(target);
    }

    // Add transaction
    const newTx: StreamTipTransaction = {
      id: `tx-${Date.now()}`,
      type: 'micro_tip',
      amountUSD,
      senderName: 'Tú (Seguidor VIP)',
      recipientCreator: selectedMedia.creatorName,
      mediaTitle: selectedMedia.title,
      timestamp: 'Ahora mismo',
      status: 'Completado',
      paymentMethod: 'Saldo StreamPAY'
    };

    setTransactions([newTx, ...transactions]);
    setUserBalanceUSD(prev => prev + amountUSD);
    setAnalytics(prev => ({
      ...prev,
      totalBalanceUSD: prev.totalBalanceUSD + amountUSD,
      totalTipsUSD: prev.totalTipsUSD + amountUSD
    }));
  };

  const handleUnlockPpv = (mediaId: string) => {
    const target = mediaItems.find(m => m.id === mediaId);
    if (!target || !target.ppvPriceUSD) return;

    const updatedMedia = mediaItems.map(m => {
      if (m.id === mediaId) {
        return {
          ...m,
          isLockedForUser: false
        };
      }
      return m;
    });

    setMediaItems(updatedMedia);
    if (selectedMedia.id === mediaId) {
      setSelectedMedia({ ...selectedMedia, isLockedForUser: false });
    }

    // Add transaction
    const newTx: StreamTipTransaction = {
      id: `tx-ppv-${Date.now()}`,
      type: 'ppv_purchase',
      amountUSD: target.ppvPriceUSD,
      senderName: 'Tú (Usuario StreamPAY)',
      recipientCreator: target.creatorName,
      mediaTitle: target.title,
      timestamp: 'Ahora mismo',
      status: 'Completado',
      paymentMethod: 'Tarjeta / Saldo'
    };

    setTransactions([newTx, ...transactions]);
  };

  const handleToggleLike = (mediaId: string) => {
    setMediaItems(prev => prev.map(m => {
      if (m.id === mediaId) {
        return { ...m, likes: m.likes + 1 };
      }
      return m;
    }));
  };

  const handlePublishMedia = (newItemData: Omit<StreamMediaItem, 'id' | 'views' | 'likes' | 'tipsCount' | 'totalTipsAmountUSD' | 'createdAt' | 'comments'>) => {
    const newItem: StreamMediaItem = {
      ...newItemData,
      id: `media-${Date.now()}`,
      views: 1,
      likes: 1,
      tipsCount: 0,
      totalTipsAmountUSD: 0,
      createdAt: 'Ahora mismo',
      comments: []
    };

    setMediaItems([newItem, ...mediaItems]);
    setSelectedMedia(newItem);
    setActiveTab('watch');
  };

  const handleWithdrawFunds = (amountUSD: number, method: string) => {
    setUserBalanceUSD(prev => Math.max(0, prev - amountUSD));
    setAnalytics(prev => ({
      ...prev,
      totalBalanceUSD: Math.max(0, prev.totalBalanceUSD - amountUSD)
    }));

    const newTx: StreamTipTransaction = {
      id: `tx-w-${Date.now()}`,
      type: 'micro_tip',
      amountUSD: -amountUSD,
      senderName: 'Retiro a Cuenta',
      recipientCreator: 'Tu Cuenta Bancaria',
      timestamp: 'Ahora mismo',
      status: 'Depositado',
      paymentMethod: method
    };

    setTransactions([newTx, ...transactions]);
  };

  // Filtered media
  const filteredMedia = mediaItems.filter(m => {
    const matchesCat = selectedCategory === 'Todas' || m.category === selectedCategory;
    const matchesSearch = !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userBalanceUSD={userBalanceUSD}
        onOpenUpload={() => setShowUploadModal(true)}
        onOpenCalculator={() => setShowCalculator(true)}
        onOpenFreeAffiliationModal={() => setShowFreeAffiliationModal(true)}
        onBackToHub={onBackToHub}
        onNavigateToTrading={onNavigateToTrading}
      />

      {/* Main Body Layout (Widescreen Sidebar + Flexible Center Canvas) */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        
        {/* Left Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenCalculator={() => setShowCalculator(true)}
          onOpenFreeAffiliationModal={() => setShowFreeAffiliationModal(true)}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 pb-16">
          
          {/* VIEW: Watch Video / Photo Player */}
          {activeTab === 'watch' && (
            <VideoPlayerView
              mediaItem={selectedMedia}
              allMedia={mediaItems}
              onSelectMedia={handleSelectMedia}
              onSendTip={handleSendTip}
              onUnlockPpv={handleUnlockPpv}
              onToggleLike={handleToggleLike}
            />
          )}

          {/* VIEW: Feed Principal & Trending */}
          {(activeTab === 'feed' || activeTab === 'trending') && (
            <div className="p-4 lg:p-8 space-y-6">
              
              {/* Hero Banner for Widescreen Desktop */}
              <div className="relative p-6 lg:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-950 border border-cyan-500/30 overflow-hidden shadow-2xl">
                <div className="relative z-10 max-w-3xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Plataforma Oficial de Streaming & Monetización</span>
                  </div>
                  <h1 className="text-2xl lg:text-4xl font-black text-white leading-tight">
                    Videos, Cursos & Fotografías con <span className="text-cyan-400">Ingreso Directo Día 1</span>
                  </h1>
                  <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
                    Apoya a tus creadores favoritos con micro-propinas desde $0.50 o publica tu propio contenido sin cumplir las 4,000 horas de espera que impone YouTube.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveTab('campaign')}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs transition-all shadow-lg shadow-pink-500/20 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Encuesta Viral Redes Social (TikTok/IG)</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('comparison')}
                      className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Matriz vs Competencia</span>
                    </button>

                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4 text-cyan-400" />
                      <span>Publicar Mi Contenido</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed Grid (3 or 4 Columns on Large Desktop) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base lg:text-lg font-bold text-white flex items-center gap-2">
                    {activeTab === 'trending' ? (
                      <>
                        <Flame className="w-5 h-5 text-amber-400" />
                        <span>Tendencias que Más Están Monetizando</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                        <span>Publicaciones Recientes ({filteredMedia.length})</span>
                      </>
                    )}
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">Categoría: <strong className="text-cyan-400">{selectedCategory}</strong></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectMedia(item)}
                      className="group p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all shadow-xl space-y-3 flex flex-col justify-between"
                    >
                      {/* Media Card Stage */}
                      <div className="space-y-3">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                          <img 
                            src={item.posterUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Access Badge */}
                          <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/30">
                            {item.accessType === 'free' ? 'Gratis (Propinas)' : item.accessType === 'ppv' ? `PPV $${item.ppvPriceUSD?.toFixed(2)}` : 'VIP Suscriptores'}
                          </span>

                          {/* Duration Badge */}
                          {item.duration && (
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white">
                              {item.duration}
                            </span>
                          )}

                          {/* Play Hover Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="p-3 rounded-full bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/30">
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Title & Category */}
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 line-clamp-2 transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Creator Info Footer */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img 
                            src={item.creatorAvatar} 
                            alt={item.creatorName}
                            className="w-7 h-7 rounded-lg object-cover border border-slate-700" 
                          />
                          <span className="font-semibold text-slate-300 truncate max-w-[120px]">{item.creatorName}</span>
                        </div>

                        <div className="text-right font-mono">
                          <span className="text-emerald-400 font-bold block">${item.totalTipsAmountUSD.toFixed(0)}</span>
                          <span className="text-[9px] text-slate-500">en propinas</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEW: Creator Studio */}
          {activeTab === 'studio' && (
            <CreatorStudio
              creatorMedia={mediaItems}
              analytics={analytics}
              transactions={transactions}
              onOpenUploadModal={() => setShowUploadModal(true)}
              onOpenPayoutModal={() => setActiveTab('wallet')}
            />
          )}

          {/* VIEW: Creators Directory */}
          {activeTab === 'creators' && (
            <div className="p-4 lg:p-8 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <h1 className="text-2xl font-black text-white">Directorio de Creadores Certificados</h1>
                <p className="text-xs text-slate-300">Suscríbete a sus niveles mensuales para desbloquear material exclusivo.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURED_CREATORS.map((creator) => (
                  <div key={creator.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/40" />
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                          <span>{creator.name}</span>
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        </h3>
                        <span className="text-xs text-slate-400">{creator.handle}</span>
                        <div className="text-xs text-emerald-400 font-mono mt-1">
                          {creator.subscribersCount.toLocaleString()} seguidores
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {creator.bio}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Niveles de Membresía:</span>
                      {creator.membershipTiers.map((tier) => (
                        <div key={tier.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-white block">{tier.name}</span>
                            <span className="text-[10px] text-slate-400">{tier.perks[0]}</span>
                          </div>
                          <button className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono">
                            ${tier.priceUSD}/mes
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: Wallet & Payouts */}
          {activeTab === 'wallet' && (
            <WalletPayouts
              userBalanceUSD={userBalanceUSD}
              onWithdrawFunds={handleWithdrawFunds}
            />
          )}

          {/* VIEW: Campaign & Social Poll */}
          {activeTab === 'campaign' && (
            <PreRegistrationCampaign 
              onOpenFreeAffiliationModal={() => setShowFreeAffiliationModal(true)}
            />
          )}

          {/* VIEW: Competitive Matrix */}
          {activeTab === 'comparison' && (
            <CompetitiveComparison
              onOpenCalculator={() => setShowCalculator(true)}
              onOpenCampaign={() => setActiveTab('campaign')}
            />
          )}

          {/* VIEW: Bot de Información I.A. */}
          {activeTab === 'bot' && (
            <div className="p-4 lg:p-8">
              <InformationBot
                onNavigateToTab={(tab) => setActiveTab(tab as any)}
              />
            </div>
          )}

          {/* VIEW: Academia de Superación & Cursos */}
          {activeTab === 'academy' && (
            <div className="p-4 lg:p-8">
              <StreamerAcademy />
            </div>
          )}

          {/* VIEW: Zona VIP Celebridades & Famosos (StreamPAY Black) */}
          {activeTab === 'vip' && (
            <div className="p-4 lg:p-8">
              <CelebrityVipLounge />
            </div>
          )}

        </main>
      </div>

      {/* Floating Quick Bot Launcher (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowFloatingBot(!showFloatingBot)}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-2xl shadow-cyan-500/50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
          title="Abrir Bot de Información I.A. (24/7)"
        >
          <Bot className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          <span className="absolute right-16 bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            💬 Duda de Afiliación o Clientes
          </span>
        </button>
      </div>

      {/* Floating Bot Drawer Modal */}
      {showFloatingBot && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4">
          <InformationBot
            isFloating={true}
            onCloseFloating={() => setShowFloatingBot(false)}
            onNavigateToTab={(tab) => {
              setActiveTab(tab as any);
              setShowFloatingBot(false);
            }}
          />
        </div>
      )}

      {/* Floating Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-slate-950 border border-slate-800 rounded-3xl max-w-5xl w-full my-8">
            <button
              onClick={() => setShowCalculator(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              Cerrar ✕
            </button>
            <MonetizationCalculator />
          </div>
        </div>
      )}

      {/* Floating Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onPublishMedia={handlePublishMedia}
      />

      {/* Top 10 Free Affiliation Offer Modal */}
      <FreeAffiliationOfferModal
        isOpen={showFreeAffiliationModal}
        onClose={() => setShowFreeAffiliationModal(false)}
        onClaimSuccess={() => {
          setActiveTab('campaign');
        }}
      />

    </div>
  );
}
