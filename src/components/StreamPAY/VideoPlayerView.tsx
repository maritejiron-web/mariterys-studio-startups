import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  DollarSign, 
  Heart, 
  Share2, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Award, 
  Tag, 
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  ShieldAlert,
  Info,
  Tv,
  Eye
} from 'lucide-react';
import { StreamMediaItem, StreamComment } from '../../types';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface VideoPlayerViewProps {
  mediaItem: StreamMediaItem;
  allMedia: StreamMediaItem[];
  onSelectMedia: (item: StreamMediaItem) => void;
  onSendTip: (mediaId: string, amountUSD: number, commentText?: string) => void;
  onUnlockPpv: (mediaId: string) => void;
  onToggleLike: (mediaId: string) => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  mediaItem,
  allMedia,
  onSelectMedia,
  onSendTip,
  onUnlockPpv,
  onToggleLike
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [customTipAmount, setCustomTipAmount] = useState('5.00');
  const [showTipModal, setShowTipModal] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(mediaItem.likes);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Payment Gateway Modal State
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    title: string;
    amountUSD: number;
    description: string;
    recipientName?: string;
    actionType: 'ppv' | 'tip' | 'subscription';
  }>({
    title: 'Desbloquear Contenido PPV',
    amountUSD: 1.99,
    description: 'Acceso de por vida',
    actionType: 'ppv'
  });

  const triggerPpvCheckout = () => {
    setCheckoutData({
      title: `Desbloquear PPV: ${mediaItem.title}`,
      amountUSD: mediaItem.ppvPriceUSD || 1.99,
      description: `Desbloqueo de contenido exclusivo de ${mediaItem.creatorName}`,
      recipientName: mediaItem.creatorName,
      actionType: 'ppv'
    });
    setShowCheckoutModal(true);
  };

  const triggerTipCheckout = (amount: number) => {
    setCheckoutData({
      title: `Enviar Propina a ${mediaItem.creatorName}`,
      amountUSD: amount,
      description: commentInput ? `Comentario: "${commentInput}"` : 'Apoyo directo al creador',
      recipientName: mediaItem.creatorName,
      actionType: 'tip'
    });
    setShowCheckoutModal(true);
  };

  const triggerSubscriptionCheckout = () => {
    setCheckoutData({
      title: `Suscripción Mensual a ${mediaItem.creatorName}`,
      amountUSD: 2.99,
      description: 'Acceso VIP a todas las clases y videos del creador durante 30 días',
      recipientName: mediaItem.creatorName,
      actionType: 'subscription'
    });
    setShowCheckoutModal(true);
  };

  const handleCheckoutSuccess = (methodUsed: string) => {
    if (checkoutData.actionType === 'ppv') {
      onUnlockPpv(mediaItem.id);
    } else if (checkoutData.actionType === 'tip') {
      onSendTip(mediaItem.id, checkoutData.amountUSD, commentInput || undefined);
      setShowTipModal(false);
      setCommentInput('');
    } else if (checkoutData.actionType === 'subscription') {
      setIsSubscribed(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTipSubmit = (amount: number) => {
    onSendTip(mediaItem.id, amount, commentInput || undefined);
    setShowTipModal(false);
    setCommentInput('');
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    }
    onToggleLike(mediaItem.id);
  };

  const relatedMedia = allMedia.filter(m => m.id !== mediaItem.id);

  return (
    <div className="max-w-[1700px] mx-auto p-4 lg:p-6 space-y-6">
      
      {/* Main Grid: Wide Video Stage on Left, Related & Chat on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 or 9 cols on large screen): Player & Main Details */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          
          {/* Large Screen Widescreen Media Stage (16:9 Aspect) */}
          <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
            
            {mediaItem.isLockedForUser && mediaItem.accessType === 'ppv' ? (
              /* Pay-Per-View Locked Overlay */
              <div 
                className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center p-6 text-center"
                style={{ backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.75)), url(${mediaItem.posterUrl})` }}
              >
                <div className="p-4 rounded-full bg-amber-500/20 border-2 border-amber-500/50 text-amber-400 mb-4 animate-bounce">
                  <Lock className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono uppercase tracking-widest mb-2">
                  Contenido Premium Pay-Per-View
                </span>
                <h2 className="text-2xl lg:text-3xl font-black text-white max-w-2xl leading-tight">
                  {mediaItem.title}
                </h2>
                <p className="text-slate-300 text-sm max-w-xl mt-2">
                  Desbloquea el video completo y material descargable por una pequeña tarifa única de ${mediaItem.ppvPriceUSD?.toFixed(2) || '1.99'}.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={triggerPpvCheckout}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 fill-current" />
                    <span>Desbloquear con Pasarela por ${mediaItem.ppvPriceUSD?.toFixed(2) || '1.99'}</span>
                  </button>
                  <span className="text-xs text-slate-400">PayPal · Visa · MasterCard · Amex · SINPE</span>
                </div>
              </div>
            ) : mediaItem.mediaType === 'photo' ? (
              /* Photo Viewer Stage */
              <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                <img 
                  src={mediaItem.mediaUrl || mediaItem.posterUrl} 
                  alt={mediaItem.title} 
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/90 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-mono">
                  Galería HD 4K
                </div>
              </div>
            ) : (
              /* HTML5 Widescreen Video Player */
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={mediaItem.mediaUrl}
                  poster={mediaItem.posterUrl}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={togglePlay}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                    <button 
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted;
                          setIsMuted(!isMuted);
                        }
                      }}
                      className="p-2 text-white/80 hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <span className="text-xs text-slate-300 font-mono">{mediaItem.duration || '14:20'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={selectedQuality}
                      onChange={(e) => setSelectedQuality(e.target.value)}
                      className="bg-black/60 border border-slate-700 text-xs text-slate-200 rounded-lg px-2 py-1 font-mono focus:outline-none"
                    >
                      <option value="4K">4K UHD</option>
                      <option value="1080p">1080p HD</option>
                      <option value="720p">720p</option>
                    </select>

                    <button 
                      onClick={() => videoRef.current?.requestFullscreen()}
                      className="p-2 text-white/80 hover:text-white transition-colors"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Micro-Tips Direct Monetization Banner (The Core Highlight) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <span>Enviar Micro-Propina Instantánea</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">100% Directo al Creador</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Apoya a {mediaItem.creatorName} sin suscripciones obligatorias. Aparece destacado en los comentarios.
                </p>
              </div>
            </div>

            {/* Micro-Tip Amount Options */}
            <div className="flex items-center gap-2 flex-wrap">
              {[0.50, 1.00, 5.00, 10.00].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleTipSubmit(amt)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 text-xs font-bold font-mono text-cyan-300 hover:text-white transition-all active:scale-95"
                >
                  ${amt.toFixed(2)}
                </button>
              ))}

              <button
                onClick={() => setShowTipModal(true)}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Otro Monto</span>
              </button>
            </div>
          </div>

          {/* Video Title & Primary Metadata */}
          <div className="space-y-4">
            <h1 className="text-xl lg:text-2xl font-black text-white leading-snug">
              {mediaItem.title}
            </h1>

            {/* Creator Info & Action Buttons Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              
              {/* Creator Profile */}
              <div className="flex items-center gap-3">
                <img 
                  src={mediaItem.creatorAvatar} 
                  alt={mediaItem.creatorName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-700" 
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{mediaItem.creatorName}</span>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{mediaItem.creatorHandle}</span>
                    <span>•</span>
                    <span className="font-mono text-emerald-400">${mediaItem.totalTipsAmountUSD.toFixed(2)} acumulados</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (isSubscribed) {
                      setIsSubscribed(false);
                    } else {
                      triggerSubscriptionCheckout();
                    }
                  }}
                  className={`ml-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSubscribed 
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-md'
                  }`}
                >
                  {isSubscribed ? 'Suscrito ✓' : 'Suscribirse $2.99/mes'}
                </button>
              </div>

              {/* Engagement Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isLiked
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                  <span>{likesCount}</span>
                </button>

                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{mediaItem.views.toLocaleString()} vistas</span>
                </div>

                <button className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Description & Tags Box */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Publicado {mediaItem.createdAt} · Categoría: <strong className="text-cyan-400">{mediaItem.category}</strong></span>
                <span className="font-mono text-emerald-400 font-semibold">{mediaItem.tipsCount} Propinas Enviadas</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {mediaItem.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {mediaItem.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-[11px] text-cyan-300 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tagged Sponsor Products / Direct Links */}
            {mediaItem.sponsorLinks && mediaItem.sponsorLinks.length > 0 && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-purple-400" />
                  <span>Enlaces de Patrocinador & Tienda Directa</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mediaItem.sponsorLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 flex items-center justify-between text-xs group transition-all"
                    >
                      <div>
                        <div className="font-bold text-white group-hover:text-purple-300 transition-colors">{s.productName}</div>
                        <div className="text-[11px] text-slate-400">{s.brandName} {s.discountCode && `· Código: ${s.discountCode}`}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Comment Section with Tip Badges */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Comentarios & Propinas de la Comunidad</span>
              </h3>
              <span className="text-xs text-slate-400">{mediaItem.comments.length} Comentarios</span>
            </div>

            {/* Comment Input Box */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                alt="Your Avatar" 
                className="w-9 h-9 rounded-xl object-cover"
              />
              <div className="flex-1 space-y-2">
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Escribe un comentario o mensaje con propina..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Envía desde $0.50 para fijar tu mensaje arriba</span>
                  </div>
                  <button
                    onClick={() => triggerTipCheckout(5.00)}
                    className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publicar con Propina $5.00</span>
                  </button>
                </div>
              </div>
            </div>

            {/* List of Comments */}
            <div className="space-y-3">
              {mediaItem.comments.map((c) => (
                <div 
                  key={c.id} 
                  className={`p-3.5 rounded-2xl border transition-all ${
                    c.tipAmount 
                      ? 'bg-gradient-to-r from-slate-900 to-cyan-950/30 border-cyan-500/40' 
                      : 'bg-slate-900/50 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={c.authorAvatar} 
                        alt={c.authorName} 
                        className="w-8 h-8 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{c.authorName}</span>
                          {c.tipAmount && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              Propina de ${c.tipAmount.toFixed(2)}
                            </span>
                          )}
                          {c.isPinned && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                              Fijado
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 pl-10 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column (4 or 3 cols on large screen): Related Media Queue */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Recomendados en StreamPAY
            </h3>
            <span className="text-[11px] text-cyan-400">Autoplay</span>
          </div>

          <div className="space-y-3">
            {relatedMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectMedia(item)}
                className="group flex gap-3 p-2 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-cyan-500/40 cursor-pointer transition-all"
              >
                {/* Thumbnail */}
                <div className="relative w-32 aspect-video rounded-xl overflow-hidden shrink-0 bg-slate-950">
                  <img 
                    src={item.posterUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {item.duration && (
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-white rounded">
                      {item.duration}
                    </span>
                  )}
                  {item.accessType === 'ppv' && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-bold font-mono rounded">
                      PPV ${item.ppvPriceUSD?.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 line-clamp-2 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.creatorName}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                    <span>{item.views.toLocaleString()} vistas</span>
                    <span>•</span>
                    <span className="text-emerald-400">${item.totalTipsAmountUSD.toFixed(0)} propinas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Custom Tip Modal Dialog */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Enviar Propina Personalizada</span>
              </div>
              <button 
                onClick={() => setShowTipModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300">
                Monto en USD ($):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-mono font-bold text-cyan-400">$</span>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={customTipAmount}
                  onChange={(e) => setCustomTipAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xl font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <label className="text-xs font-semibold text-slate-300 block pt-2">
                Mensaje especial para el creador:
              </label>
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="¡Escribe tu mensaje especial aquí!"
                rows={3}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowTipModal(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => triggerTipCheckout(parseFloat(customTipAmount) || 5.00)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
              >
                Pagar Propina con Pasarela
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Payment Checkout Gateway Modal */}
      <PaymentCheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title={checkoutData.title}
        amountUSD={checkoutData.amountUSD}
        itemDescription={checkoutData.description}
        recipientName={checkoutData.recipientName}
        onPaymentSuccess={handleCheckoutSuccess}
      />

    </div>
  );
};
