import React, { useState } from 'react';
import { 
  Crown, 
  ShieldCheck, 
  Sparkles, 
  Gem, 
  DollarSign, 
  Video, 
  Users, 
  Lock, 
  Star, 
  Check, 
  TrendingUp, 
  Flame, 
  Ticket, 
  MessageSquare, 
  Calendar, 
  Eye, 
  Briefcase, 
  KeyRound,
  ExternalLink,
  ChevronRight,
  Shield,
  Clock,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  FileCheck,
  Scale,
  RefreshCw,
  Ban,
  CheckCircle2,
  HelpCircle,
  Fingerprint
} from 'lucide-react';

interface CelebrityGreetingRequest {
  id: string;
  fanName: string;
  occasion: string;
  instructions: string;
  offerUSD: number;
  deadlineHours: number;
  status: 'pendiente' | 'grabado' | 'entregado';
}

export const CelebrityVipLounge: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'security' | 'recommendations' | 'pricing' | 'apply'>('security');
  
  // Celebrity Simulator State
  const [fanBaseCount, setFanBaseCount] = useState<number>(50000);
  const [ticketPriceUSD, setTicketPriceUSD] = useState<number>(25);
  const [attendancePercent, setAttendancePercent] = useState<number>(3); // 3% of fans buy ticket
  const [monthlyGreetingsCount, setMonthlyGreetingsCount] = useState<number>(20);
  const [greetingPriceUSD, setGreetingPriceUSD] = useState<number>(150);

  // Anti-Scam Interactive Simulator State
  const [simulatedAccountStatus, setSimulatedAccountStatus] = useState<'normal' | 'frozen' | 'banned'>('normal');
  const [frozenAmount, setFrozenAmount] = useState<number>(1250);
  const [showFreezeBanner, setShowFreezeBanner] = useState<boolean>(false);

  // Form Checkboxes State
  const [acceptVerificationCode, setAcceptVerificationCode] = useState(false);
  const [acceptEscrowCustody, setAcceptEscrowCustody] = useState(false);
  const [acceptEthicalPolicies, setAcceptEthicalPolicies] = useState(false);

  // VIP Dashboard state
  const [greetings, setGreetings] = useState<CelebrityGreetingRequest[]>([
    {
      id: 'greet-1',
      fanName: 'Esteban Ramírez',
      occasion: 'Cumpleaños 30 de mi hermano Carlos',
      instructions: 'Es su fanático número 1, salúdalo y dile que siga entrenando fuerte.',
      offerUSD: 150,
      deadlineHours: 24,
      status: 'pendiente'
    },
    {
      id: 'greet-2',
      fanName: 'Compañía Tech Latam',
      occasion: 'Aniversario Corporativo',
      instructions: 'Felicita a nuestro equipo de ingenieros por el lanzamiento.',
      offerUSD: 350,
      deadlineHours: 48,
      status: 'pendiente'
    }
  ]);

  // Form Application State
  const [applicantName, setApplicantName] = useState('');
  const [applicantHandle, setApplicantHandle] = useState('');
  const [applicantFollowers, setApplicantFollowers] = useState('');
  const [applicantManagerEmail, setApplicantManagerEmail] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Calculations
  const estimatedTicketBuyers = Math.round(fanBaseCount * (attendancePercent / 100));
  const estimatedLiveEventGross = estimatedTicketBuyers * ticketPriceUSD;
  const estimatedGreetingsGross = monthlyGreetingsCount * greetingPriceUSD;
  const totalMonthlyPotentialUSD = estimatedLiveEventGross + estimatedGreetingsGross;

  const handleMarkGreetingDone = (id: string) => {
    setGreetings(prev => prev.map(g => g.id === id ? { ...g, status: 'grabado' } : g));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantHandle) return;
    setApplicationSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      
      {/* VIP Luxury Header Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-amber-950 via-slate-950 to-black border-2 border-amber-500/50 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/50 text-xs font-mono font-bold uppercase tracking-wider">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>StreamPAY Black • Zona VIP de Celebridades & Famosos</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Dashboard Exclusivo & Sala de Alta Privacidad para <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">Figuras Públicas</span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Diseñado especialmente para celebridades, influencers top, deportistas, conferencistas y artistas que mueven miles de seguidores y requieren <strong>servidores blindados anti-caídas, sub-cuentas para sus mánagers, boletería virtual Pay-Per-View de alta taquilla y monetización de video-saludos VIP</strong>.
            </p>
          </div>

          {/* Luxury Badge Card */}
          <div className="w-full lg:w-auto shrink-0 bg-slate-950/90 border border-amber-500/40 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center font-black">
                <Gem className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Plan VIP Élite</span>
                <div className="text-lg font-black text-white">StreamPAY Black</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 pt-1 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Marca de Agua Forense Anti-Piratería</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Panel Multi-Usuario para tu Mánager</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Insignia Black Diamond Verificada</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'security'
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md shadow-red-500/30'
              : 'text-red-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Blindaje Anti-Suplantación & Fraude</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-mono">SEGURIDAD</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'dashboard'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>Dashboard VIP de Famosos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('recommendations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'recommendations'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Estrategia & ¿Por qué Cobrarles Más?</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pricing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'pricing'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Simulador de Ingresos Famosos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('apply')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'apply'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Solicitar Acceso VIP</span>
        </button>
      </div>

      {/* SUBTAB: PROTOCOLO DE SEGURIDAD & BLINDAJE ANTI-ESTAFAS */}
      {activeSubTab === 'security' && (
        <div className="space-y-6">
          
          {/* Main Alert Banner: The Threads Problem vs StreamPAY Solution */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/70 via-slate-950 to-slate-900 border-2 border-red-500/50 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-mono font-bold">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>BLINDAJE DE IDENTIDAD & REGLAMENTO ESTRICTO DE ACCESO</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Protección Activa 24/7 con Bóveda Escrow</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              ¿Por qué pagar la cuota NO es el único requisito? Caso Threads & Redes Sociales
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              En redes como <strong>Threads, Instagram o X (Twitter)</strong> abundan los estafadores porque cualquiera puede descargar fotos de un famoso, crear un perfil idéntico y empezar a mandar mensajes privados pidiendo dinero a cambio de <em>"fotos exclusivas", "reuniones íntimas" o "ayudas benéficas falsas"</em>.
              <br /><br />
              En <strong>StreamPAY Black</strong> eso es <strong>técnicamente imposible</strong>. Pagar la membresía no te da acceso directo; debes pasar una rigurosa validación notarial, biométrica y jurídica antes de recibir un solo centavo de los usuarios.
            </p>
          </div>

          {/* 4 Mandatory Strict Requirements */}
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Filtros Obligatorios Innegociables
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                Los 4 Requisitos que Todo Famoso Debe Cumplir para Entrar:
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Req 1 */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Verificación Cruzada Obligatoria en Bio Oficial</h5>
                    <span className="text-[10px] text-emerald-400 font-mono">CERO POSIBILIDAD DE CUENTAS FALSAS</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Para activar su cuenta VIP, el artista debe colocar un código temporal generado por StreamPAY en la biografía de su Instagram o TikTok verificado por 15 minutos, o enviar un breve video selfie diciendo su nombre y confirmando que es su cuenta oficial. Un estafador jamás podrá hacer esto.
                </p>
              </div>

              {/* Req 2 */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Audiencia Comprobable o Trayectoria Pública</h5>
                    <span className="text-[10px] text-cyan-400 font-mono">FILTRO DE EXCLUSIVIDAD BLACK</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mínimo 50,000 seguidores en redes, o perfil verificado en Spotify, trayectoria deportiva profesional, autor de libros publicados o representación mediante agencia artística legalmente registrada con personería jurídica.
                </p>
              </div>

              {/* Req 3 */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Bóveda Escrow: El Dinero NO se Libera por Anticipado</h5>
                    <span className="text-[10px] text-emerald-400 font-mono">PROTECCIÓN BANCARIA AL FAN</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cuando un fanático paga $150 USD por un saludo en video o $25 por una entrada, el dinero <strong>NO va a los bolsillos del famoso al instante</strong>; queda retenido en una cuenta de custodia protegida (*Escrow*). Solo se transfiere cuando el video es grabado y entregado. Si no se entrega en 7 días, se reembolsa el 100% al fan.
                </p>
              </div>

              {/* Req 4 */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Prohibición Absoluta de Venta de Fotos Privadas o DMs</h5>
                    <span className="text-[10px] text-purple-400 font-mono">POLÍTICA CERO TOLERANCIA</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  En StreamPAY está terminantemente prohibido pedir pagos a cambio de fotos íntimas, citas privadas no reguladas o supuestas inversiones en criptomonedas. Cualquier creador que intente esto es baneado y denunciado judicialmente.
                </p>
              </div>

            </div>
          </div>

          {/* Interactive Protocol: What to do if an impersonator appears */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                  Protocolo de Intervención Rápida
                </span>
                <h4 className="text-xl font-bold text-white mt-1">
                  ¿Qué hacemos si una persona intenta estafar o suplantar en StreamPAY?
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSimulatedAccountStatus(prev => prev === 'normal' ? 'frozen' : prev === 'frozen' ? 'banned' : 'normal');
                    setShowFreezeBanner(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-600/30"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Probar Simulador de Bloqueo en Vivo</span>
                </button>
              </div>
            </div>

            {/* Live Interactive State Display */}
            <div className={`p-4 rounded-2xl border transition-all ${
              simulatedAccountStatus === 'normal'
                ? 'bg-slate-950 border-slate-800 text-slate-300'
                : simulatedAccountStatus === 'frozen'
                ? 'bg-red-950/40 border-red-500 text-red-200'
                : 'bg-zinc-950 border-zinc-800 text-slate-400'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-bold">
                  {simulatedAccountStatus === 'normal' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Estado Actual: Creador Verificado Operando Normalmente</span>
                    </>
                  )}
                  {simulatedAccountStatus === 'frozen' && (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                      <span className="text-red-400 font-mono uppercase">ALERTA ROJA: FONDOS CONGELADOS EN 60 SEGUNDOS ($1,250 USD EN CUSTODIA)</span>
                    </>
                  )}
                  {simulatedAccountStatus === 'banned' && (
                    <>
                      <Ban className="w-4 h-4 text-red-500" />
                      <span className="text-red-400 font-mono uppercase">USUARIO EXPULSADO & DENUNCIA JUDICIAL ENVIADA</span>
                    </>
                  )}
                </div>

                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {simulatedAccountStatus === 'normal' ? 'Sin reportes sospechosos' : simulatedAccountStatus === 'frozen' ? 'Reporte por suplantación en investigación' : 'IP y Cuentas Bancarias Bloqueadas'}
                </span>
              </div>
            </div>

            {/* 4 Steps to Deal with Scammers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  1
                </div>
                <h5 className="font-bold text-white text-sm">Botón de Denuncia Ciudadana</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cualquier fan o usuario que detecte una cuenta sospechosa puede presionar "Reportar Suplantación" adjuntando capturas de pantalla de chats.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  2
                </div>
                <h5 className="font-bold text-white text-sm">Congelamiento Automático (Freeze)</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  El sistema bloquea inmediatamente todos los retiros a cuentas bancarias. El dinero queda protegido en la plataforma sin que el estafador pueda huir con él.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  3
                </div>
                <h5 className="font-bold text-white text-sm">Reembolso 100% a los Fans</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Como el dinero estuvo en custodia protegida (Escrow) y nunca se entregó al impostor, se devuelve de forma automática a las tarjetas o cuentas de los fans afectados.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  4
                </div>
                <h5 className="font-bold text-white text-sm">Baneo Definitivo y Acción Penal</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Se veta la dirección IP, pasarelas de pago y datos de identidad del estafador. Se emite reporte formal a las autoridades por delito de suplantación y estafa cibernética.
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 1: DASHBOARD VIP EXCLUSIVO */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Top VIP Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                <span>RECAUDACIÓN EVENTO VIP</span>
                <Ticket className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white font-mono">$32,450.00 <span className="text-xs font-normal text-slate-400">USD</span></div>
              <div className="text-[11px] text-emerald-400 font-semibold">1,298 boletos vendidos a $25</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-purple-400 font-mono">
                <span>VIDEO-SALUDOS VIP</span>
                <Video className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white font-mono">$4,800.00 <span className="text-xs font-normal text-slate-400">USD</span></div>
              <div className="text-[11px] text-purple-300 font-semibold">32 saludos completados este mes</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>MEET & GREET 1-A-1</span>
                <Users className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white font-mono">$7,500.00 <span className="text-xs font-normal text-slate-400">USD</span></div>
              <div className="text-[11px] text-cyan-300 font-semibold">15 videollamadas privadas ($500 c/u)</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-slate-900 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-300 font-mono font-bold">
                <span>DISPONIBLE PARA RETIRO</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">$44,750.00 <span className="text-xs font-normal text-slate-400">USD</span></div>
              <div className="text-[11px] text-slate-300 font-semibold">Transferencia Swift / IBAN prioritaria</div>
            </div>
          </div>

          {/* Active Features for Celebrities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Video Greetings Management (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-white text-base">Solicitudes de Video-Saludos VIP (Cameo Style)</h4>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  Tarifa Activa: $150 USD/video
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Tus fans pagan por adelantado a través de StreamPAY. El dinero queda protegido en garantía y se libera en tu cuenta en cuanto subes el video grabado desde tu teléfono o webcam.
              </p>

              <div className="space-y-3">
                {greetings.map((g) => (
                  <div key={g.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{g.fanName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {g.occasion}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-emerald-400 font-bold text-sm">+${g.offerUSD} USD</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                      "{g.instructions}"
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Plazo restante: {g.deadlineHours} horas</span>
                      </div>

                      {g.status === 'pendiente' ? (
                        <button
                          onClick={() => handleMarkGreetingDone(g.id)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs hover:from-amber-300 hover:to-yellow-400 flex items-center gap-1.5 transition-all"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Grabar y Entregar Saludo</span>
                        </button>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          <span>Video Enviado • Fondos Liberados</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Security & Manager Permissions (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Blindaje de Seguridad VIP & Control de Mánager</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Herramientas corporativas diseñadas para equipos de artistas y figuras públicas.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      Marca de Agua Dinámica Forense
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">ACTIVA</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Cada usuario que mira tu show Pay-Per-View tiene su ID y correo impreso de forma semi-invisible en la pantalla. Si alguien graba la pantalla, se identifica de inmediato quién filtró el contenido.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      Acceso para Agencia / Representante
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">2 Miembros</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Tu mánager puede agendar eventos, responder preguntas de prensa y revisar estadísticas sin tener acceso a cambiar tus cuentas bancarias.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      Próximo Evento Masivo Pay-Per-View
                    </span>
                    <span className="text-[10px] font-mono text-amber-300">Viernes 8:00 PM</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    "Acústico Exclusivo & Preguntas Íntimas en Vivo" • Servidor CDN 4K reservado para 15,000 espectadores simultáneos.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 2: RECOMENDACIONES DE NEGOCIO & POR QUÉ COBRAR MÁS */}
      {activeSubTab === 'recommendations' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              Análisis Estratégico de Monetización I.A.
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              ¿Por qué las Celebridades y Famosos Deben Pagar una Cuota Mucho Más Alta?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Respuesta y recomendación personalizada para el modelo de negocio de StreamPAY.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-white text-base">Consumo Masivo de Servidores (CDN)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Un creador común transmite para 50 o 200 personas. Una celebridad puede convocar a <strong>15,000 a 100,000 personas al mismo segundo</strong>. Ese tráfico masivo cuesta dinero en ancho de banda de alta velocidad y servidores dedicados anti-caídas. La cuota alta cubre esta infraestructura sin riesgo para ti.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-white text-base">Estatus, Exclusividad & No Mezclarse</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Los famosos <strong>desconfían de las plataformas donde todo es gratis</strong> porque no quieren parecer aficionados ni que su imagen se devalúe. Pagar una cuota de $299 a $499 USD/mes les otorga el prestigio de pertenecer al círculo "StreamPAY Black" y les garantiza que su perfil está verificado legalmente.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-white text-base">Soporte de Conserjería & Mánagers</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Una celebridad nunca habla con un formulario de soporte genérico; exige un número de teléfono directo o WhatsApp con un <strong>Ejecutivo de Cuentas VIP</strong> que le resuelva problemas en 5 minutos antes de su transmisión en vivo. Ese servicio humano de lujo justifica con creces el precio premium.
              </p>
            </div>

          </div>

          {/* Recommended Pricing Table */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Gem className="w-5 h-5 text-amber-400" />
              Estructura de Precios VIP Recomendada para StreamPAY:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-mono font-bold text-amber-400 uppercase text-[11px]">Opción A: Membresía Mensual Fija</span>
                <div className="text-2xl font-black text-white font-mono">$499.00 <span className="text-xs font-normal text-slate-400">USD/mes</span></div>
                <ul className="space-y-1 text-slate-300">
                  <li>• Servidores blindados 4K ilimitados.</li>
                  <li>• 0% de comisión en venta de boletos Pay-Per-View.</li>
                  <li>• Panel para hasta 3 managers y representantes.</li>
                  <li>• Conserjería telefónica 24/7.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-mono font-bold text-yellow-400 uppercase text-[11px]">Opción B: Modelo Híbrido (Cuota de Activación + % de Taquilla)</span>
                <div className="text-2xl font-black text-white font-mono">$199 <span className="text-xs font-normal text-slate-400">USD/mes + 5% de taquilla de eventos</span></div>
                <ul className="space-y-1 text-slate-300">
                  <li>• Si el famoso vende $50,000 en un concierto o show, tú ganas $2,500 USD en una sola noche.</li>
                  <li>• Atractivo para famosos que solo hacen 1 o 2 eventos grandes al año.</li>
                  <li>• Incluye marcas de agua forenses y contratos de exclusividad.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: SIMULADOR DE INGRESOS DE FAMOSOS */}
      {activeSubTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Calculadora de Facturación Celebrity
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Simula el Poder de Convocatoria</h3>
              <p className="text-xs text-slate-400">
                Ajusta los seguidores y precios para ver cuánto genera un famoso en un solo show o mes.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>Audiencia / Seguidores Totales del Famoso:</span>
                  <span className="font-mono text-amber-400 font-bold">{fanBaseCount.toLocaleString()} fans</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={fanBaseCount}
                  onChange={(e) => setFanBaseCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>% que compra boleto al Live Privado:</span>
                  <span className="font-mono text-amber-400 font-bold">{attendancePercent}% ({estimatedTicketBuyers.toLocaleString()} boletos)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={attendancePercent}
                  onChange={(e) => setAttendancePercent(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>Precio de Entrada al Show Virtual:</span>
                  <span className="font-mono text-emerald-400 font-bold">${ticketPriceUSD}.00 USD</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={ticketPriceUSD}
                  onChange={(e) => setTicketPriceUSD(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>Video-Saludos VIP al Mes (Cameos):</span>
                  <span className="font-mono text-purple-400 font-bold">{monthlyGreetingsCount} saludos a ${greetingPriceUSD} USD</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={monthlyGreetingsCount}
                  onChange={(e) => setMonthlyGreetingsCount(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results Display (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-amber-500/50 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>POTENCIAL DE RECAUDACIÓN EN STREAMPLAY BLACK</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
                <span className="text-xs text-slate-400 block">Recaudación de 1 Solo Evento Pay-Per-View:</span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  ${estimatedLiveEventGross.toLocaleString()} <span className="text-sm font-normal text-slate-400">USD</span>
                </div>
                <div className="text-xs text-slate-300">
                  {estimatedTicketBuyers.toLocaleString()} boletos vendidos a ${ticketPriceUSD} USD por persona.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-1">
                <span className="text-xs text-slate-400 block">Ingreso Adicional por Video-Saludos:</span>
                <div className="text-2xl font-black text-purple-300 font-mono">
                  +${estimatedGreetingsGross.toLocaleString()} USD/mes
                </div>
                <div className="text-xs text-slate-400">
                  {monthlyGreetingsCount} felicitaciones de 1 minuto grabadas desde su teléfono.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white font-bold">
                <span>Ingreso Total Estimado para la Celebridad:</span>
                <span className="font-mono text-base text-emerald-400 font-black">
                  ${totalMonthlyPotentialUSD.toLocaleString()} USD
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                👉 Al generar más de <strong>${totalMonthlyPotentialUSD.toLocaleString()} USD</strong>, una cuota de <strong>$499 USD/mes</strong> representa menos del 1% de sus ganancias. ¡Por eso la pagarán felices!
              </p>
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 4: FORMULARIO DE SOLICITUD VIP */}
      {activeSubTab === 'apply' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Solicitud de Admisión a StreamPAY Black</h3>
            <p className="text-xs text-slate-400">
              Para figuras públicas auténticas, artistas o sus agencias de representación. Revisión rigurosa en menos de 12 horas.
            </p>
          </div>

          {/* Anti-Scam Notice before applying */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-red-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Aviso Anti-Suplantación (Cero Tolerancia a Perfiles Falsos)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              No basta con pagar la membresía. Para proteger a los fanáticos contra estafas y suplantaciones tipo Threads o Instagram, todo solicitante deberá superar la prueba de validación oficial en Bio o biometría antes de que su canal sea activado.
            </p>
          </div>

          {applicationSubmitted ? (
            <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-lg">¡Solicitud VIP Recibida con Éxito!</h4>
              <p className="text-xs text-slate-300">
                Hemos enviado las credenciales temporales y el código secreto de validación al correo de tu mánager: <strong>{applicantManagerEmail || 'manager@vip.com'}</strong>. Nuestro director de talento y seguridad verificará las redes antes de admitir la cuenta.
              </p>
              <button
                onClick={() => setApplicationSubmitted(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nombre Artístico o de la Figura Pública:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sebastián Yatra, Dj Tiësto, Coach Carlos Master..."
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Usuario de Instagram / TikTok / YouTube Oficial:</label>
                  <input
                    type="text"
                    required
                    placeholder="@usuario_oficial"
                    value={applicantHandle}
                    onChange={(e) => setApplicantHandle(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Seguidores Totales:</label>
                  <input
                    type="text"
                    placeholder="Ej: 250,000 seguidores"
                    value={applicantFollowers}
                    onChange={(e) => setApplicantFollowers(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Correo del Mánager o Representante Legal:</label>
                <input
                  type="email"
                  required
                  placeholder="manager@agencia.com"
                  value={applicantManagerEmail}
                  onChange={(e) => setApplicantManagerEmail(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                />
              </div>

              {/* Mandatory Anti-Scam Checkboxes */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-mono text-amber-400 font-bold uppercase text-[10px] block">
                  Compromiso de Autenticidad & Seguridad Obligatoria:
                </span>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 text-[11px]">
                  <input
                    type="checkbox"
                    required
                    checked={acceptVerificationCode}
                    onChange={(e) => setAcceptVerificationCode(e.target.checked)}
                    className="mt-0.5 accent-amber-400 cursor-pointer"
                  />
                  <span>
                    Acepto validar la autenticidad colocando un código temporal en la Bio de Instagram/TikTok o enviando un video selfie de confirmación.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 text-[11px]">
                  <input
                    type="checkbox"
                    required
                    checked={acceptEscrowCustody}
                    onChange={(e) => setAcceptEscrowCustody(e.target.checked)}
                    className="mt-0.5 accent-amber-400 cursor-pointer"
                  />
                  <span>
                    Entiendo que los pagos de fans quedan en custodia protegida (*Escrow*) y solo se liberan tras entregar el video-saludo o show en vivo.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 text-[11px]">
                  <input
                    type="checkbox"
                    required
                    checked={acceptEthicalPolicies}
                    onChange={(e) => setAcceptEthicalPolicies(e.target.checked)}
                    className="mt-0.5 accent-amber-400 cursor-pointer"
                  />
                  <span>
                    Certifico que jamás se solicitará dinero por mensajes privados (DMs) a cambio de fotos íntimas, citas privadas ni falsas inversiones (sanción: congelamiento de fondos y denuncia judicial).
                  </span>
                </label>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 text-slate-400 text-[11px]">
                🔒 <strong>Garantía de Confidencialidad:</strong> Tus datos y los de tu agencia están protegidos por contrato de no divulgación (NDA).
              </div>

              <button
                type="submit"
                disabled={!acceptVerificationCode || !acceptEscrowCustody || !acceptEthicalPolicies}
                className={`w-full py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                  acceptVerificationCode && acceptEscrowCustody && acceptEthicalPolicies
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-yellow-300 cursor-pointer shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>Solicitar Acceso StreamPAY Black</span>
              </button>
            </form>
          )}

        </div>
      )}

    </div>
  );
};
