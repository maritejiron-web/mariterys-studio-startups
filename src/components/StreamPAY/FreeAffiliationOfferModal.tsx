import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  X, 
  Copy, 
  Check, 
  Share2, 
  ShieldCheck, 
  Users, 
  Zap, 
  Award, 
  Send,
  MessageSquare,
  Globe2,
  Lock
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStreamPaySurveyUrl, getStreamPayWhatsAppShareText } from '../../utils/streamPayUrls';

interface FreeAffiliationOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimSuccess?: (data: { name: string; handle: string; spotNumber: number }) => void;
}

interface FounderSpot {
  spot: number;
  name: string;
  handle: string;
  niche: string;
  country: string;
  claimedAt: string;
}

const INITIAL_FOUNDERS: FounderSpot[] = [
  { spot: 1, name: 'Prof. Mario Vargas', handle: '@profe_mario_mate', niche: 'Tutor Matemáticas', country: 'Costa Rica 🇨🇷', claimedAt: 'Ayer' },
  { spot: 2, name: 'Elena Ramírez', handle: '@elena_primaria_edu', niche: 'Maestra Primaria', country: 'México 🇲🇽', claimedAt: 'Ayer' },
  { spot: 3, name: 'Carlos Tech', handle: '@carlos_creador', niche: 'Tecnología & Creador', country: 'Costa Rica 🇨🇷', claimedAt: 'Ayer' },
  { spot: 4, name: 'Valentina Silva', handle: '@valen_fit', niche: 'Entrenadora Fitness', country: 'Colombia 🇨🇴', claimedAt: 'Hoy' },
  { spot: 5, name: 'Prof. Roberto Gómez', handle: '@roberto_fisica', niche: 'Física y Ciencias', country: 'España 🇪🇸', claimedAt: 'Hoy' },
  { spot: 6, name: 'Daniela Castro', handle: '@daniela_musica', niche: 'Clases de Piano', country: 'Chile 🇨🇱', claimedAt: 'Hoy' },
  { spot: 7, name: 'Andrés Morales', handle: '@andres_finanzas', niche: 'Educación Financiera', country: 'Panamá 🇵🇦', claimedAt: 'Hace unas horas' },
];

export const FreeAffiliationOfferModal: React.FC<FreeAffiliationOfferModalProps> = ({
  isOpen,
  onClose,
  onClaimSuccess
}) => {
  const [claimedCount, setClaimedCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('streampay_free_spots_claimed');
      if (saved) {
        const parsed = parseInt(saved, 10);
        return isNaN(parsed) ? 7 : Math.min(10, Math.max(7, parsed));
      }
    }
    return 7;
  });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [niche, setNiche] = useState('Educación / Clases');
  const [country, setCountry] = useState('Costa Rica 🇨🇷');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimedSpotData, setClaimedSpotData] = useState<{ name: string; handle: string; spot: number } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('streampay_user_claimed_spot');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const totalSpots = 10;
  const spotsLeft = Math.max(0, totalSpots - claimedCount);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('streampay_free_spots_claimed', claimedCount.toString());
    }
  }, [claimedCount]);

  if (!isOpen) return null;

  const handleClaimSpot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !handle || spotsLeft <= 0) return;

    setIsSubmitting(true);
    const assignedSpot = claimedCount + 1;
    const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;

    try {
      if (db) {
        await addDoc(collection(db, 'free_affiliations_top10'), {
          fullName,
          email,
          handle: formattedHandle,
          niche,
          country,
          spotNumber: assignedSpot,
          plan: 'AFILIACION_GRATIS_TOP10_DE_POR_VIDA',
          commissionRate: 0,
          claimedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.warn('Firebase write warning (handled gracefully):', err);
    }

    const claimResult = {
      name: fullName,
      handle: formattedHandle,
      spot: assignedSpot
    };

    setClaimedCount(assignedSpot);
    setClaimedSpotData(claimResult);
    if (typeof window !== 'undefined') {
      localStorage.setItem('streampay_user_claimed_spot', JSON.stringify(claimResult));
      localStorage.setItem('streampay_free_spots_claimed', assignedSpot.toString());
    }

    setIsSubmitting(false);
    if (onClaimSuccess) {
      onClaimSuccess({
        name: fullName,
        handle: formattedHandle,
        spotNumber: assignedSpot
      });
    }
  };

  const handleCopyLink = () => {
    const url = getStreamPaySurveyUrl();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const spotMsg = claimedSpotData ? `¡Aseguré mi Cupo #${claimedSpotData.spot} de Afiliación 100% Gratis en StreamPAY! 🚀` : `¡Atención Creadores! Hay una oferta de Afiliación GRATIS para los primeros 10 en StreamPAY:`;
    const text = `🎁 *${spotMsg}*\n\n0% de comisión en streaming, clases y videos de por vida.\nReclama uno de los últimos cupos aquí:\n👉 ${getStreamPaySurveyUrl()}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-400/80 rounded-3xl shadow-[0_0_60px_rgba(251,191,36,0.25)] overflow-hidden my-6">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
          
          {/* Header Banner */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-black uppercase tracking-wider">
              <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Oferta Exclusiva de Lanzamiento • Primeras 10 Personas</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2 justify-center sm:justify-start">
                  <Crown className="w-7 h-7 text-amber-400" />
                  <span>Afiliación VIP PRO 100% GRATIS</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Membresía Vitalicia de Creador Fundador en StreamPAY con 0% de comisión de por vida.
                </p>
              </div>

              {/* Price comparison badge */}
              <div className="text-center sm:text-right shrink-0 bg-slate-950/80 border border-amber-400/30 p-2.5 rounded-2xl">
                <span className="text-[10px] text-slate-400 block line-through">Precio Normal: $299 USD/año</span>
                <span className="text-xl font-black text-emerald-400">$0.00 / GRATIS</span>
              </div>
            </div>
          </div>

          {/* SPOTS LEFT COUNTER & PROGRESS BAR */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/40 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Estado de Cupos Oficiales:</span>
              </span>
              <span className={spotsLeft > 0 ? "text-emerald-400 font-black text-sm" : "text-red-400 font-black"}>
                {spotsLeft > 0 ? `¡Solo quedan ${spotsLeft} de ${totalSpots} cupos!` : '¡Cupos Agotados!'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                style={{ width: `${(claimedCount / totalSpots) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{claimedCount} de {totalSpots} personas ya aseguraron su afiliación gratis</span>
              <span className="text-cyan-400 font-mono font-bold">{Math.round((claimedCount / totalSpots) * 100)}% Reclamado</span>
            </div>
          </div>

          {/* EXCLUSIVE BENEFITS CHECKLIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">0% Comisión de por Vida</strong>
                <span className="text-slate-400 text-[11px]">Recibes el 100% de tus propinas, ventas y cursos sin deducciones.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <Crown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">Insignia Dorada VIP #1 a #10</strong>
                <span className="text-slate-400 text-[11px]">Distintivo de Creador Fundador verificado en tus videos y perfil.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">Prioridad en el Algoritmo</strong>
                <span className="text-slate-400 text-[11px]">Tus clases y videos aparecerán en la pestaña de Tendencias desde el día 1.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">Retiros Rápidos & Locales</strong>
                <span className="text-slate-400 text-[11px]">SINPE Móvil, transferencia bancaria o Crypto USDT en menos de 24h.</span>
              </div>
            </div>
          </div>

          {/* IF ALREADY CLAIMED: DIGITAL FOUNDER BADGE & CERTIFICATE */}
          {claimedSpotData ? (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-500/10 via-slate-950 to-slate-950 border-2 border-amber-400 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 text-slate-950 mx-auto flex items-center justify-center font-black shadow-lg shadow-amber-500/30">
                <Crown className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest font-black block">
                  ¡Afiliación Oficial Confirmada!
                </span>
                <h3 className="text-xl font-black text-white">
                  {claimedSpotData.name}
                </h3>
                <p className="text-xs text-cyan-300 font-mono font-bold mt-0.5">
                  {claimedSpotData.handle} • Creador Fundador Cupo #{claimedSpotData.spot} de 10
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-400/30 text-xs text-slate-300 text-left space-y-1.5">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>✓ Estado de Afiliación:</span>
                  <span className="font-mono bg-amber-400/20 px-2 py-0.5 rounded text-amber-300">ACTIVA GRATIS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>✓ Comisión Aplicada:</span>
                  <span className="text-emerald-400 font-mono font-bold">0% Permanente</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>✓ Soporte VIP:</span>
                  <span className="text-cyan-300 font-mono">1-a-1 WhatsApp</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>✓ Cupón Canjeado:</span>
                  <span className="text-slate-400 font-mono">TOP10-CREADOR-GRATIS</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Compartir Mi Logro en WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Link StreamPAY'}</span>
                </button>
              </div>
            </div>
          ) : spotsLeft > 0 ? (
            /* CLAIM FORM */
            <form onSubmit={handleClaimSpot} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Formulario Rápido: Reclamar Cupo #{claimedCount + 1} de 10</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  $0.00 Automático
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Nombre Completo o Docente:</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej: Prof. María José Tejirón"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Correo Electrónico:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="docente@ejemplo.com"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Usuario Deseado (@handle):</label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@mi_canal_docente"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-300 font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Área de Contenido:</label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Matemáticas & Ciencias">Matemáticas & Ciencias</option>
                    <option value="Educación Primaria / Secundaria">Educación Primaria / Secundaria</option>
                    <option value="Idiomas (Inglés, etc.)">Idiomas (Inglés, etc.)</option>
                    <option value="Tecnología & Programación">Tecnología & Programación</option>
                    <option value="Arte, Música & Diseño">Arte, Música & Diseño</option>
                    <option value="Fitness & Salud">Fitness & Salud</option>
                    <option value="Negocios & Finanzas">Negocios & Finanzas</option>
                    <option value="Entretenimiento & Streaming">Entretenimiento & Streaming</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">País de Residencia:</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Costa Rica, México, Colombia, etc."
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Asegurando tu Cupo #{claimedCount + 1}...</span>
                ) : (
                  <>
                    <Crown className="w-4 h-4" />
                    <span>Reclamar Mi Afiliación VIP Gratis (Cupo #{claimedCount + 1}/10)</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-center space-y-2">
              <span className="text-red-400 font-bold text-sm block">Los 10 Cupos Gratuitos han sido Completados</span>
              <p className="text-xs text-slate-400">
                Puedes registrarte en la lista de espera estándar con 0% de comisión durante el primer mes de lanzamiento.
              </p>
            </div>
          )}

          {/* LIST OF THE 10 FOUNDER SPOTS (CLAIMED + AVAILABLE) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Muro de Creadores Fundadores (10 Cupos Oficiales)</span>
              </span>
              <span className="font-mono text-[10px] text-amber-300">Oficial StreamPAY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {Array.from({ length: 10 }).map((_, idx) => {
                const spotNum = idx + 1;
                const founder = INITIAL_FOUNDERS.find(f => f.spot === spotNum);
                const isUserClaim = claimedSpotData && claimedSpotData.spot === spotNum;

                if (isUserClaim) {
                  return (
                    <div key={spotNum} className="p-2 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-[10px]">
                          #{spotNum}
                        </span>
                        <div>
                          <strong className="text-white block">{claimedSpotData.name} (Tú)</strong>
                          <span className="text-amber-300 font-mono text-[10px]">{claimedSpotData.handle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-300 font-bold font-mono">¡RECLAMADO!</span>
                    </div>
                  );
                }

                if (founder) {
                  return (
                    <div key={spotNum} className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[10px]">
                          #{spotNum}
                        </span>
                        <div>
                          <span className="text-slate-200 block font-semibold">{founder.name}</span>
                          <span className="text-cyan-400 font-mono text-[10px]">{founder.handle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">Asignado</span>
                    </div>
                  );
                }

                // Empty / Available Spot
                return (
                  <div key={spotNum} className="p-2 rounded-xl bg-slate-950/40 border border-dashed border-amber-400/40 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center text-[10px]">
                        #{spotNum}
                      </span>
                      <span className="text-amber-300 font-medium italic">¡Cupo Disponible!</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">GRATIS</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            Sin tarjeta de crédito requerida • 100% Gratuito
          </span>
          <button onClick={onClose} className="hover:text-white font-bold">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
