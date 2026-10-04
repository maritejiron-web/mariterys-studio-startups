import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Zap, 
  CheckCircle2, 
  Globe2, 
  GraduationCap, 
  Wallet, 
  Copy, 
  PhoneCall, 
  ArrowRight,
  RefreshCw,
  User,
  ShieldCheck,
  Megaphone,
  BookOpen,
  MessageSquare,
  Gift,
  Crown,
  Gem,
  ShieldAlert,
  Smartphone,
  Award
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

const PRESET_PROMPTS = [
  {
    icon: Sparkles,
    label: '👨‍🏫 Bot Albert Einstein: Explicaciones Paso a Paso (6to Grado)',
    prompt: '¿Cómo funciona el Bot de Albert Einstein para explicar paso a paso lo que el alumno no entiende en matemáticas?'
  },
  {
    icon: Award,
    label: '🏆 Premios, Medallas & Diplomas de Honor Escolar (6to Grado)',
    prompt: '¿Cómo funciona el sistema de premios, medallas y diplomas de honor para los alumnos en el aula de matemáticas de 6to grado?'
  },
  {
    icon: Smartphone,
    label: '📱 Anuncios & Guiones para TikTokers ($1 a $3/día)',
    prompt: '¿Cómo funcionan los anuncios para TikTokers en StreamPAY y por qué es mejor que las monedas de TikTok Live?'
  },
  {
    icon: ShieldAlert,
    label: '🛡️ Blindaje Anti-Estafas & Suplantación (Threads/Redes)',
    prompt: '¿Qué hace StreamPAY contra estafadores que suplantan a famosos o piden dinero por fotos como en Threads?'
  },
  {
    icon: Crown,
    label: '🎁 Oferta Afiliación GRATIS (Primeras 10 Personas)',
    prompt: '¿Cómo funciona la oferta de afiliación GRATIS para las primeras 10 personas en StreamPAY?'
  },
  {
    icon: GraduationCap,
    label: '📚 Academia de Creadores (Marketing, Ads, Inglés)',
    prompt: '¿Qué cursos gratuitos incluye la Academia para creadores afiliados (Marketing, Anuncios en Facebook/TikTok e Inglés básico)?'
  },
  {
    icon: Gem,
    label: '💎 Zona VIP para Famosos & Celebridades (Black)',
    prompt: '¿Cómo funciona la Zona VIP StreamPAY Black para famosos y por qué deben pagar una cuota más alta?'
  },
  {
    icon: GraduationCap,
    label: '🎒 Afiliación para Maestros & Profesores',
    prompt: '¿Cómo funciona StreamPAY para maestros de primaria, profesores de secundaria y tutores?'
  },
  {
    icon: Wallet,
    label: '💳 Métodos de Pago y Retiro (IBAN / SINPE / Crypto)',
    prompt: '¿Cuáles son los métodos de retiro para los creadores e IBAN local o SINPE Móvil?'
  },
  {
    icon: Zap,
    label: '🚀 Monetización en < 1 Semana (vs YouTube)',
    prompt: '¿Por qué no tengo que esperar 1,000 suscriptores ni 4,000 horas como en YouTube?'
  },
  {
    icon: ShieldCheck,
    label: '📝 Pre-Registro Creador Fundador VIP (0% Comisión)',
    prompt: '¿Cuáles son los beneficios de la pre-campaña y cómo reservo mi usuario @handle VIP?'
  },
  {
    icon: Globe2,
    label: '🌐 Restricciones de País y Alcance Global',
    prompt: '¿Se puede usar StreamPAY desde cualquier país sin bloqueos bancarios?'
  },
  {
    icon: BookOpen,
    label: '🔒 Vender Clases en Pay-Per-View (PPV)',
    prompt: '¿Cómo cobro por un video, curso individual o guía educativa?'
  }
];

const KNOWLEDGE_BASE_RESPONSES: Record<string, string> = {
  oferta10: `👑 **¡OFERTA DE AFILIACIÓN 100% GRATIS (Primeras 10 Personas)!** 🎁

Para celebrar el lanzamiento de StreamPAY, activamos una oferta oficial para los primeros 10 creadores y profesores:

✨ **Beneficios Exclusivos de los 10 Cupos**:
1. **0% Comisión de por Vida**: Recibes el 100% de tus ventas de videos, cursos y propinas sin deducción porcentual de por vida.
2. **Costo de Afiliación $0.00**: Membresía de Creador Fundador gratis (Precio habitual: ~~$299 USD/año~~).
3. **Insignia Dorada Oficial #1 a #10**: Distintivo verificado de "Creador Fundador" en tu perfil y videos.
4. **Retiros Locales en < 24h**: Por SINPE Móvil, transferencia bancaria IBAN o Crypto USDT sin mínimos altos.
5. **Soporte VIP 1-a-1 por WhatsApp**.

⚡ **Disponibilidad Actual**: ¡Quedan solo **3 cupos libres de 10**!
👉 Haz clic en el botón dorado **"Afiliación GRATIS (10 Cupos)"** de la barra superior o en el formulario de la Encuesta Viral para reclamar el tuyo antes de que se agoten.`,

  maestros: `🎒 **StreamPAY para Maestros, Profesores y Educadores**:

StreamPAY ha sido especialmente optimizado para que docentes y creadores educativos moneticen sus conocimientos de forma directa:

1. **Venta por Clase (Pay-Per-View)**: Publica tus clases grabadas, talleres o tutorías de matemáticas, idiomas o primaria. Ponle un precio accesible (ej: $1.99 o ₡1,200 colones) y tus estudiantes pagarán al instante para ver la clase.
2. **Suscripción Mensual Estudiantil**: Crea un canal para tus suscriptores donde paguen una cuota mensual por recibir guías, ejercicios y videos semanales.
3. **Propinas e Interacción Directa**: En tus clases o transmisiones en vivo, los alumnos o padres pueden enviarte micro-propinas desde $0.50 como agradecimiento.
4. **Estado de Cuenta Transparente**: Monitorea tus ingresos clase por clase con reportes detallados y retira tus ganancias a tu IBAN local o SINPE Móvil sin esperar acumulados de $100.`,

  retiros: `💳 **Pasarelas de Pago e Ingresos Flexibles**:

StreamPAY soporta las mejores pasarelas de pago del mundo para tus clientes y creadores:

1. **PayPal Express Checkout**: Permite a tus suscriptores y clientes pagarte en 1-clic usando su saldo PayPal o tarjetas vinculadas.
2. **Stripe Direct Checkout**: Recomendada como la pasarela principal de tarjetas. Acepta **Visa, MasterCard, American Express, Apple Pay y Google Pay** con conversión automática de divisas.
3. **Mercado Pago LATAM**: Ideal para cobros locales en tarjetas de débito/crédito en México, Colombia, Argentina y América Latina.
4. **SINPE Móvil & IBAN Local**: Transferencias instantáneas en Costa Rica las 24 horas del día.

*Monetización en tiempo real con depósitos seguros SSL de 256 bits.*`,

  youtube: `🚀 **Monetización en Menos de 1 Semana vs YouTube**:

En YouTube debes esperar a reunir **1,000 suscriptores y 4,000 horas de reproducción**, lo cual puede tomar más de 1 año sin garantía de aprobación.

Con **StreamPAY**:
✅ **Monetizas desde el DÍA 1**: Ganas dinero desde tu primer video o clase publicada.
✅ **Micro-Propinas Directas**: Tus seguidores te apoyan voluntariamente desde $0.50.
✅ **Precios Libres por Video (PPV)**: Tú decides cuánto vale tu contenido.
✅ **0% Comisión Promocional**: Para los creadores que se inscriban en nuestra pre-campaña de lanzamiento.`,

  preregistro: `📝 **Pre-Registro Creador Fundador VIP**:

Participa en nuestra Encuesta Pública y asegura tu usuario **@handle VIP**:

🎁 **Beneficios de Pre-Registro**:
1. **0% de Comisión Promocional** durante el primer año de lanzamiento.
2. **Insignia VIP de Creador Fundador** en tu perfil.
3. **Reserva de tu Nombre de Usuario**: Asegura tu marca personal o institucional antes que nadie.
4. **Soporte Prioritario 24/7** y acceso anticipado a la plataforma.

👉 ¡Pulsando en la pestaña "Encuesta Viral TikTok/IG" del menú puedes registrar tus datos en menos de 30 segundos!`,

  ppv: `🔒 **Contenido Pay-Per-View (PPV) y Cursos**:

Puedes bloquear cualquier video o material exclusivo con un candado digital.
• El usuario ve una vista previa atractiva de 15 segundos o una portada HD.
• Para desbloquear el contenido completo, realiza un pago rápido por tarjeta o saldo.
• El dinero entra inmediatamente a tu monedero digital.`,

  global: `🌐 **Alcance 100% Global sin Restricciones**:

StreamPAY es una infraestructura verdaderamente global:
• Tus clientes y suscriptores pueden pagarte desde cualquier parte del mundo.
• Procesamos múltiples divisas y las convertimos automáticamente.
• Sin bloqueos por país ni trámites burocráticos.`,

  academia: `🎓 **Academia de Superación para Streamers y Afiliados**:

Para que todos los streamers afiliados crezcan y se superen, StreamPAY incluye **3 cursos prácticos 100% gratuitos**:

1. 📢 **Marketing & Psicología de Micro-Propinas**:
   • Fórmulas de ganchos virales (hooks) para TikTok e Instagram Reels.
   • Psicología de precios: Por qué fijar $0.99 o $1.99 genera 10x más compras impulsivas.
   • Construcción de embudos orgánicos hacia tu canal de StreamPAY.

2. 🎯 **Guía Práctica de Anuncios (Ads de Bajo Presupuesto)**:
   • Cómo crear campañas efectivas invirtiendo solo **$1 a $5 USD/día** en Facebook, Instagram y TikTok Ads.
   • Segmentación por intereses y públicos similares (Lookalike).
   • Incluye un **Simulador Interactivo de Retorno de Inversión (ROI)** para calcular ganancias antes de invertir.

3. 🇺🇸 **Inglés Básico para Streamers Internacionales**:
   • Tarjetas interactivas con **Pronunciación con Voz Real (Audio)** para saludar a fans en inglés, pedir likes, anunciar suscripciones y agradecer propinas ("Thank you for the tip!").

👉 Puedes ingresar a la **Academia & Cursos** desde la barra superior o el menú lateral.`,

  famosos: `💎 **StreamPAY Black • Zona VIP de Celebridades & Famosos**:

Diseñada específicamente para figuras públicas, deportistas, conferencistas y artistas con alta audiencia.

**¿Por qué pagan una cuota mucho más alta ($499 USD/mes)?**
1. 🚀 **Servidores Blindados Anti-Caídas (CDN 4K)**: Un famoso convoca de 10,000 a 50,000 personas en simultáneo. El tráfico masivo exige servidores dedicados que soportan picos brutales de tráfico.
2. 🔒 **Marcas de Agua Forenses Anti-Piratería**: Se imprime el ID del usuario en pantalla de manera semi-invisible para evitar que graben y revendan sus lives o clases.
3. 👥 **Sub-cuentas para Mánagers y Agencias**: Permite que el representante programe eventos y revise números sin acceder a las cuentas bancarias del artista.
4. 🎥 **Monetización de Video-Saludos VIP (Cameo Style)**: Configuración de tarifas desde $100 a $500 por cada saludo personalizado de 1 minuto.
5. 🎟️ **Boletería Virtual Pay-Per-View**: Conciertos acústicos o conferencias privadas donde 1,000 boletos a $25 generan $25,000 USD en una sola noche.

👉 Visita la pestaña **"Zona VIP Famosos"** para probar el Simulador de Recaudación Celebrity.`,

  estafas: `🛡️ **Blindaje Anti-Suplantación y Fraude (Caso Threads & Redes Sociales)**:

En redes como **Threads, Instagram o X**, cualquier estafador puede descargar fotos de un famoso, crear un perfil idéntico y empezar a mandar mensajes privados pidiendo dinero a cambio de *"fotos exclusivas", "reuniones íntimas" o "ayuda caritativa falsa"*.

En **StreamPAY** esto es **técnicamente imposible** gracias a nuestro sistema de 4 capas:

1. 🚫 **No basta con pagar la cuota**: Pagar los $499 USD no da acceso directo. Toda celebridad debe validar su autenticidad colocando un código temporal secreto en la Bio de su cuenta oficial verificada de Instagram/TikTok o mediante video biométrico.
2. 🏛️ **Bóveda de Custodia Bancaria (Escrow)**: Cuando un fanático paga por un video-saludo o boleto, el dinero **NO va al creador de inmediato**; queda retenido en custodia. Solo se libera cuando el video es grabado, entregado y verificado. Si en 7 días no cumple, el sistema reembolsa el 100% al fan.
3. 🚨 **Protocolo de Congelamiento Preventivo en 60 Segundos**: Si un usuario reporta una cuenta por pedir dinero para fotos privadas por chat, sus fondos quedan automáticamente retenidos.
4. ⚖️ **Baneo Definitivo y Denuncia Penal**: Expulsión de la plataforma, bloqueo de tarjetas/IP y remisión del expediente a las autoridades judiciales por delito de suplantación y estafa cibernética.

👉 Puedes revisar la pestaña **"Zona VIP Famosos" > "Blindaje Anti-Suplantación"** para probar el simulador de congelamiento en tiempo real.`,

  tiktok: `📱 **Anuncios & Estrategia para TikTokers en StreamPAY**:

En TikTok, millones de creadores tienen visitas virales pero sufren de monetización deficiente:
- Las **monedas de TikTok Live** le descuentan hasta el **50% de comisión** al creador.
- El fondo para creadores paga centavos por cada mil visitas.

🔥 **La Estrategia Ganadora con StreamPAY**:
1. 🎬 **Formato UGC (User-Generated Content)**: Videos de 25-35 segundos grabados en vertical con cámara frontal. Ganchos de 2 segundos que rompen el patrón (ej: *"¿Sabías que TikTok se queda con la mitad de tus donaciones?"*).
2. 🚀 **TikTok Spark Ads con $1 a $3 USD/día**: Promocionas un TikTok orgánico que ya funcionó bien usando el código de autorización publicitaria. Con apenas $2 USD/día logras entre 25 y 60 clics interesados.
3. 🔗 **Embudo Link en Bio**: Tus seguidores van directo a tu sala de StreamPAY, donde te pagan por tarjeta de débito/crédito, transferencias locales o SINPE Móvil.
4. 💸 **100% de Ganancia Limpia**: Con la oferta de lanzamiento de StreamPAY recibes el 0% de comisión y retiros a tu banco en menos de 24 horas.

👉 Visita la pestaña **"Academia de Creadores" > "Módulo 2: Anuncios & TikTokers"** para probar el Generador de Guiones y el Simulador de Retorno.`
};

interface InformationBotProps {
  onNavigateToTab?: (tab: string) => void;
  isFloating?: boolean;
  onCloseFloating?: () => void;
}

export const InformationBot: React.FC<InformationBotProps> = ({
  onNavigateToTab,
  isFloating = false,
  onCloseFloating
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '¡Hola! 👋 Soy el **Bot de Información I.A. de StreamPAY**. Estoy programado para resolver todas las dudas de tus clientes, suscriptores, profesores y creadores de contenido.\n\n¿En qué te puedo ayudar hoy? Selecciona una de las preguntas frecuentes o escribe tu duda abajo:',
      timestamp: 'Ahora mismo'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // First check local keyword matches for instant high-accuracy answer
    const lowerText = text.toLowerCase();
    let localAnswer: string | null = null;

    if (lowerText.includes('tiktok') || lowerText.includes('tiktoker') || lowerText.includes('spark') || lowerText.includes('moneda') || lowerText.includes('monedas') || lowerText.includes('ugc')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.tiktok;
    } else if (lowerText.includes('estafa') || lowerText.includes('estafador') || lowerText.includes('suplantar') || lowerText.includes('suplantación') || lowerText.includes('suplantacion') || lowerText.includes('threads') || lowerText.includes('foto') || lowerText.includes('falsa') || lowerText.includes('fraude') || lowerText.includes('scam')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.estafas;
    } else if (lowerText.includes('gratis') || lowerText.includes('10') || lowerText.includes('afiliacion') || lowerText.includes('afiliación') || lowerText.includes('oferta') || lowerText.includes('cupo')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.oferta10;
    } else if (lowerText.includes('academia') || lowerText.includes('curso') || lowerText.includes('marketing') || lowerText.includes('anuncio') || lowerText.includes('ads') || lowerText.includes('inglés') || lowerText.includes('ingles') || lowerText.includes('aprendizaje') || lowerText.includes('superarse')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.academia;
    } else if (lowerText.includes('famoso') || lowerText.includes('famosos') || lowerText.includes('celebridad') || lowerText.includes('celebrities') || lowerText.includes('black') || lowerText.includes('cuota mas alta') || lowerText.includes('cuota más alta')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.famosos;
    } else if (lowerText.includes('maestro') || lowerText.includes('profesor') || lowerText.includes('docente') || lowerText.includes('escuela') || lowerText.includes('matematica')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.maestros;
    } else if (lowerText.includes('retiro') || lowerText.includes('iban') || lowerText.includes('sinpe') || lowerText.includes('crypto') || lowerText.includes('metodo')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.retiros;
    } else if (lowerText.includes('youtube') || lowerText.includes('requisito') || lowerText.includes('4000') || lowerText.includes('1000')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.youtube;
    } else if (lowerText.includes('pre-registro') || lowerText.includes('preregistro') || lowerText.includes('encuesta') || lowerText.includes('handle')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.preregistro;
    } else if (lowerText.includes('ppv') || lowerText.includes('vender clase') || lowerText.includes('bloquear')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.ppv;
    } else if (lowerText.includes('pais') || lowerText.includes('país') || lowerText.includes('global') || lowerText.includes('internacional')) {
      localAnswer = KNOWLEDGE_BASE_RESPONSES.global;
    }

    try {
      // Try calling Gemini API on the backend for smart natural conversation
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          lessonTitle: 'StreamPAY Platform Monetization & Affiliation Assistant',
          lessonContent: `StreamPAY es la plataforma de monetización instantánea para creadores de contenido, maestros, profesores de secundaria, tutores de matemáticas y emprendedores. Permite ganar dinero en menos de 1 semana sin requisitos de 1,000 suscriptores ni 4,000 horas de YouTube. Admite contenido gratuito con micro-propinas, Pay-Per-View (PPV) y suscripciones. Retiros inmediatos por IBAN local, SINPE Móvil, Crypto USDT o PayPal.`
        })
      });

      const data = await response.json();

      if (data.success && data.text) {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else if (localAnswer) {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: localAnswer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `¡Excelente pregunta! StreamPAY permite a creadores, profesores y emprendedores monetizar su contenido sin restricciones de país. Puedes publicar videos, clases en vivo o material educativo con retiros a tu cuenta IBAN o SINPE Móvil.\n\n¿Te gustaría pre-registrarte gratis para obtener 0% de comisión?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      console.warn("API Call fallback to knowledge base:", err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: localAnswer || `StreamPAY te permite ganar dinero desde tu primer video o clase publicada. Aceptamos retiros a IBAN local, SINPE Móvil y Crypto USDT. ¡Sin esperar 1,000 suscriptores ni 4,000 horas de vistas como en YouTube!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl ${isFloating ? 'h-[600px] w-full max-w-lg' : 'min-h-[750px] max-w-[1400px] mx-auto p-4 lg:p-8 space-y-6'}`}>
      
      {/* Bot Header */}
      <div className="p-6 bg-gradient-to-r from-slate-950 via-cyan-950/60 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
            <Bot className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base lg:text-lg font-black text-white">Bot de Información I.A.</h2>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                Online 24/7
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Asistente para Afiliaciones, Dudas de Suscriptores y Métodos de Retiro
            </p>
          </div>
        </div>

        {isFloating && onCloseFloating && (
          <button
            onClick={onCloseFloating}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Preset Fast Prompts Carousel / Grid */}
      <div className="px-6 pt-4 pb-2 space-y-2 border-b border-slate-800/80 bg-slate-950/40">
        <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Consultas Rápidas Frecuentes:</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PRESET_PROMPTS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-left text-xs text-slate-200 transition-all flex items-center gap-2 group"
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shrink-0">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="font-medium line-clamp-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages Display Canvas */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-[350px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${msg.sender === 'user' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'}`}>
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div className={`max-w-[85%] p-4 rounded-2xl text-xs lg:text-sm leading-relaxed space-y-2 ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-tr-none shadow-lg' : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'}`}>
              <div className="whitespace-pre-wrap font-sans">
                {msg.text}
              </div>

              <div className={`text-[10px] font-mono ${msg.sender === 'user' ? 'text-cyan-100' : 'text-slate-500'} text-right`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>El Bot de I.A. está procesando tu consulta...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Direct Contact & Action Bar */}
      <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <span>Soporte Directo por WhatsApp: <strong className="text-emerald-400 font-mono">+506 7019-3160</strong></span>
        </div>

        {onNavigateToTab && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToTab('campaign')}
              className="px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 font-bold border border-pink-500/40 text-xs flex items-center gap-1.5 transition-all"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Ir a Encuesta / Pre-Registro</span>
            </button>
            <button
              onClick={() => onNavigateToTab('comparison')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 text-xs flex items-center gap-1.5 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Ver Matriz Comparativa</span>
            </button>
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Escribe tu consulta sobre afiliación, retiros o clientes..."
          className="flex-1 p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs lg:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || isTyping}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-lg"
        >
          <Send className="w-5 h-5 text-slate-950 fill-current" />
        </button>
      </form>

    </div>
  );
};
