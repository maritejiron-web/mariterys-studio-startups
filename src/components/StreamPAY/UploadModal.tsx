import React, { useState } from 'react';
import { 
  PlusCircle, 
  Video, 
  Camera, 
  Lock, 
  Sparkles, 
  DollarSign, 
  Tag, 
  X,
  UploadCloud
} from 'lucide-react';
import { StreamMediaItem } from '../../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishMedia: (item: Omit<StreamMediaItem, 'id' | 'views' | 'likes' | 'tipsCount' | 'totalTipsAmountUSD' | 'createdAt' | 'comments'>) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onPublishMedia
}) => {
  const [mediaType, setMediaType] = useState<'video' | 'photo'>('video');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<StreamMediaItem['category']>('Tecnología');
  const [accessType, setAccessType] = useState<'free' | 'ppv' | 'subscribers'>('free');
  const [ppvPriceUSD, setPpvPriceUSD] = useState('1.99');
  const [tags, setTags] = useState('StreamPAY, Monetización, Creadores');
  const [posterUrl, setPosterUrl] = useState('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onPublishMedia({
      title,
      description,
      mediaType,
      mediaUrl: mediaType === 'video' ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' : posterUrl,
      posterUrl,
      creatorId: 'creator-1',
      creatorName: 'Carlos Mendoza',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      creatorHandle: '@carlos_tech_stream',
      duration: mediaType === 'video' ? '12:45' : undefined,
      category,
      accessType,
      ppvPriceUSD: accessType === 'ppv' ? parseFloat(ppvPriceUSD) || 1.99 : undefined,
      tags: tags.split(',').map(t => t.trim())
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full space-y-6 my-8 animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Publicar en StreamPAY</h2>
              <p className="text-xs text-slate-400">Monetización inmediata con micro-propinas o Pay-Per-View</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Format Selector */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMediaType('video')}
              className={`flex-1 p-3 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-all ${
                mediaType === 'video'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video en Alta Definición</span>
            </button>

            <button
              type="button"
              onClick={() => setMediaType('photo')}
              className={`flex-1 p-3 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-all ${
                mediaType === 'photo'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Set / Galería Fotográfica</span>
            </button>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Título de la Publicación:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Masterclass de Programación Full Stack 2026"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Descripción & Material:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explica qué incluye este video o galería fotográfica..."
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Categoría:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Tecnología">Tecnología</option>
              <option value="Educación">Educación</option>
              <option value="Gaming">Gaming</option>
              <option value="Vlogs">Vlogs</option>
              <option value="Cursos & Masterclass">Cursos & Masterclass</option>
              <option value="Fitness & Salud">Fitness & Salud</option>
              <option value="Negocios & Finanzas">Negocios & Finanzas</option>
              <option value="Fotografía">Fotografía</option>
            </select>
          </div>

          {/* Access & Price Type */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="font-semibold text-slate-300 block">Modelo de Monetización:</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setAccessType('free')}
                className={`p-3 rounded-2xl border font-bold text-left transition-all ${
                  accessType === 'free'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Sparkles className="w-4 h-4 mb-1 text-emerald-400" />
                <span>Gratis (Micro-Propinas)</span>
              </button>

              <button
                type="button"
                onClick={() => setAccessType('ppv')}
                className={`p-3 rounded-2xl border font-bold text-left transition-all ${
                  accessType === 'ppv'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Lock className="w-4 h-4 mb-1 text-amber-400" />
                <span>Pay-Per-View (PPV)</span>
              </button>

              <button
                type="button"
                onClick={() => setAccessType('subscribers')}
                className={`p-3 rounded-2xl border font-bold text-left transition-all ${
                  accessType === 'subscribers'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <DollarSign className="w-4 h-4 mb-1 text-purple-400" />
                <span>Solo Suscriptores VIP</span>
              </button>
            </div>

            {accessType === 'ppv' && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 mt-2">
                <span className="text-amber-300 font-semibold">Precio de Desbloqueo USD ($):</span>
                <input
                  type="number"
                  step="0.5"
                  min="0.99"
                  value={ppvPriceUSD}
                  onChange={(e) => setPpvPriceUSD(e.target.value)}
                  className="w-28 p-2 bg-slate-950 border border-slate-800 rounded-xl font-mono font-bold text-amber-300 text-right focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20"
            >
              Publicar Inmediatamente
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
