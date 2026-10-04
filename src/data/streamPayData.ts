import { StreamMediaItem, StreamCreator, StreamTipTransaction, CreatorAnalytics } from '../types';

export const FEATURED_CREATORS: StreamCreator[] = [
  {
    id: 'creator-1',
    name: 'Carlos Mendoza',
    handle: '@carlos_tech_stream',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    bio: 'Creador Full Stack & Especialista en Inteligencia Artificial. Publico tutoriales semanales y masterclasses exclusivas para monetizar código.',
    isVerified: true,
    subscribersCount: 14200,
    totalEarningsUSD: 3840.50,
    joinedDate: 'Marzo 2025',
    membershipTiers: [
      { id: 'tier-1', name: 'Fan Plata', priceUSD: 2.99, perks: ['Insignia de Fan en Chat', 'Acceso a Videos 24h antes', 'Descuento en PPV'], color: 'from-slate-600 to-slate-800' },
      { id: 'tier-2', name: 'Socio Oro', priceUSD: 4.99, perks: ['Todo lo anterior', 'Acceso ilimitado a Cursos PPV', 'Grupo Privado de Telegram'], color: 'from-amber-500 to-amber-700' },
      { id: 'tier-3', name: 'Sponsor VIP', priceUSD: 9.99, perks: ['Todo lo de Oro', 'Revisión mensual de proyectos 1-a-1', 'Mención especial en cada video'], color: 'from-purple-600 to-indigo-800' }
    ]
  },
  {
    id: 'creator-2',
    name: 'Valeria Solís',
    handle: '@valeria_design_fit',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    banner: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200',
    bio: 'Diseñadora UX/UI & Coach de Vida Saludable. Comparto rutinas de alta intensidad, presets de diseño y consejos de monetización rápida.',
    isVerified: true,
    subscribersCount: 28900,
    totalEarningsUSD: 7910.00,
    joinedDate: 'Enero 2025',
    membershipTiers: [
      { id: 'tier-val-1', name: 'Club Básico', priceUSD: 1.99, perks: ['Rutinas semanales en PDF', 'Chat exclusivo de miembros'], color: 'from-rose-500 to-pink-600' },
      { id: 'tier-val-2', name: 'PRO Workout', priceUSD: 5.99, perks: ['Planes de nutrición personalizados', 'Videos exclusivos de entrenamiento'], color: 'from-rose-600 to-red-700' }
    ]
  },
  {
    id: 'creator-3',
    name: 'Diego & Mariana Vlogs',
    handle: '@diegoymariana_trips',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    banner: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    bio: 'Viajeros fotógrafos alrededor del mundo. Mostramos gemas ocultas, guías completas de presupuesto y galerías en alta resolución.',
    isVerified: true,
    subscribersCount: 8400,
    totalEarningsUSD: 1950.25,
    joinedDate: 'Mayo 2025',
    membershipTiers: [
      { id: 'tier-dm-1', name: 'Nómada Digital', priceUSD: 3.99, perks: ['Mapa interactivo con nuestras ubicaciones secretas', 'Wallpapers 4K en alta resolución'], color: 'from-cyan-500 to-blue-600' }
    ]
  }
];

export const SAMPLE_MEDIA_ITEMS: StreamMediaItem[] = [
  {
    id: 'media-1',
    title: '🚀 Cómo Crear una App con Monetización Instantánea desde el Día 1',
    description: 'En esta clase explicamos la arquitectura completa de micro-propinas, pasarelas de pago directo, suscripciones mensuales y pago por visión sin esperar 1,000 suscriptores.',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    creatorId: 'creator-1',
    creatorName: 'Carlos Mendoza',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    creatorHandle: '@carlos_tech_stream',
    duration: '14:20',
    category: 'Tecnología',
    views: 12450,
    likes: 1890,
    tipsCount: 342,
    totalTipsAmountUSD: 684.50,
    accessType: 'free',
    tags: ['StreamPAY', 'Monetización', 'Software', 'I.A.', 'IngresosDirectos'],
    createdAt: 'Hace 2 horas',
    comments: [
      {
        id: 'c-1',
        authorName: 'María Fernanda R.',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        text: '¡Increíble explicación! Me encantó el sistema de micro-propinas, envié $5.00 para apoyar la plataforma.',
        timestamp: 'Hace 45 min',
        tipAmount: 5.00,
        isPinned: true,
        likes: 24
      },
      {
        id: 'c-2',
        authorName: 'Esteban Castro',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        text: 'Por fin una alternativa real a YouTube donde no perdemos miles de horas para empezar a cobrar.',
        timestamp: 'Hace 1 hora',
        tipAmount: 2.50,
        likes: 15
      }
    ],
    sponsorLinks: [
      { id: 's-1', brandName: 'Hosting Cloud PRO', productName: 'Servidor VPS Serverless $5/mes', url: 'https://example.com/cloud', discountCode: 'STREAMPAY50', badge: 'Patrocinador Oficial' },
      { id: 's-2', brandName: 'DevTools Suite', productName: 'Editor de Código con I.A.', url: 'https://example.com/devtools', discountCode: 'PROMO2026' }
    ]
  },
  {
    id: 'media-2',
    title: '👑 Masterclass Exclusiva: Guía de Estrategias de Venta Directa en Redes 2026',
    description: 'Acceso especial Pay-Per-View ($1.99) para desbloquear la guía completa en formato HD de 45 minutos con plantillas descargables de alta conversión.',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    creatorId: 'creator-1',
    creatorName: 'Carlos Mendoza',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    creatorHandle: '@carlos_tech_stream',
    duration: '42:10',
    category: 'Negocios & Finanzas',
    views: 4890,
    likes: 820,
    tipsCount: 112,
    totalTipsAmountUSD: 410.00,
    accessType: 'ppv',
    ppvPriceUSD: 1.99,
    isLockedForUser: true,
    tags: ['Negocios', 'Estrategia', 'PPV', 'VentasDirectas'],
    createdAt: 'Ayer',
    comments: [
      {
        id: 'c-ppv-1',
        authorName: 'Gabriel S.',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        text: 'Vale cada centavo de los $1.99. Las plantillas me sirvieron de inmediato para cerrar 2 clientes.',
        timestamp: 'Hace 3 horas',
        tipAmount: 10.00,
        isPinned: true,
        likes: 38
      }
    ]
  },
  {
    id: 'media-3',
    title: '🏋️‍♀️ Rutina de Cardio & Fuerza de 20 Minutos para Quemar Calorías en Casa',
    description: 'Entrenamiento guiado con música enérgica, temporizador en pantalla y modificaciones para principiantes y avanzados.',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200',
    creatorId: 'creator-2',
    creatorName: 'Valeria Solís',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    creatorHandle: '@valeria_design_fit',
    duration: '21:05',
    category: 'Fitness & Salud',
    views: 18900,
    likes: 3100,
    tipsCount: 520,
    totalTipsAmountUSD: 1040.00,
    accessType: 'free',
    tags: ['Fitness', 'Workout', 'Salud', 'EjerciciosEnCasa'],
    createdAt: 'Hace 3 días',
    comments: [
      {
        id: 'c-fit-1',
        authorName: 'Karla B.',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        text: '¡Terminé sudando a mares! Ya envié mi propina mensual de $5 por el excelente trabajo.',
        timestamp: 'Ayer',
        tipAmount: 5.00,
        likes: 19
      }
    ]
  },
  {
    id: 'media-4',
    title: '📸 Galería Fotográfica HD: Secretos de Costa Rica & Playas Paradisiacas',
    description: 'Set exclusivo de 12 fotografías en ultra alta resolución (4K) con metadatos de cámara, presets de Lightroom y coordenadas exactas.',
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600',
    posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    creatorId: 'creator-3',
    creatorName: 'Diego & Mariana Vlogs',
    creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    creatorHandle: '@diegoymariana_trips',
    category: 'Fotografía',
    views: 9300,
    likes: 1420,
    tipsCount: 180,
    totalTipsAmountUSD: 360.00,
    accessType: 'free',
    tags: ['Fotografía', 'CostaRica', 'Viajes', 'LightroomPresets'],
    createdAt: 'Hace 4 días',
    comments: []
  },
  {
    id: 'media-5',
    title: '🔒 Módulo VIP: Sistema de Arquitectura Limpia & Pruebas Unitarias',
    description: 'Lección exclusiva únicamente para suscriptores de los niveles Socio Oro y Sponsor VIP.',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    creatorId: 'creator-1',
    creatorName: 'Carlos Mendoza',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    creatorHandle: '@carlos_tech_stream',
    duration: '35:40',
    category: 'Cursos & Masterclass',
    views: 2100,
    likes: 410,
    tipsCount: 95,
    totalTipsAmountUSD: 285.00,
    accessType: 'subscribers',
    isLockedForUser: false,
    tags: ['VIP', 'Suscriptores', 'CleanCode'],
    createdAt: 'Hace 5 días',
    comments: []
  }
];

export const MOCK_TRANSACTIONS: StreamTipTransaction[] = [
  {
    id: 'tx-1',
    type: 'micro_tip',
    amountUSD: 5.00,
    senderName: 'María Fernanda R.',
    recipientCreator: 'Carlos Mendoza',
    mediaTitle: '🚀 Cómo Crear una App con Monetización Instantánea',
    timestamp: 'Hoy, 08:30 PM',
    status: 'Completado',
    paymentMethod: 'Tarjeta / SINPE'
  },
  {
    id: 'tx-2',
    type: 'ppv_purchase',
    amountUSD: 1.99,
    senderName: 'Gabriel S.',
    recipientCreator: 'Carlos Mendoza',
    mediaTitle: '👑 Masterclass Exclusiva: Guía de Estrategias de Venta',
    timestamp: 'Hoy, 05:12 PM',
    status: 'Completado',
    paymentMethod: 'Saldo StreamPAY'
  },
  {
    id: 'tx-3',
    type: 'subscription',
    amountUSD: 4.99,
    senderName: 'Alejandro M.',
    recipientCreator: 'Carlos Mendoza',
    mediaTitle: 'Suscripción Mensual - Nivel Socio Oro',
    timestamp: 'Ayer, 02:40 PM',
    status: 'Completado',
    paymentMethod: 'Tarjeta Visa / MC'
  },
  {
    id: 'tx-4',
    type: 'micro_tip',
    amountUSD: 10.00,
    senderName: 'Sponsor Anónimo',
    recipientCreator: 'Valeria Solís',
    mediaTitle: '🏋️‍♀️ Rutina de Cardio & Fuerza de 20 Minutos',
    timestamp: '31 Jul, 11:15 AM',
    status: 'Depositado',
    paymentMethod: 'PayPal / Stripe'
  }
];

export const INITIAL_ANALYTICS: CreatorAnalytics = {
  totalViews: 47640,
  totalTipsUSD: 1444.50,
  totalPpvUSD: 680.00,
  totalSubscriptionsUSD: 1716.00,
  totalBalanceUSD: 3840.50,
  dailyEarnings: [
    { date: 'Lun', amountUSD: 120.50 },
    { date: 'Mar', amountUSD: 245.00 },
    { date: 'Mié', amountUSD: 180.00 },
    { date: 'Jue', amountUSD: 310.25 },
    { date: 'Vie', amountUSD: 420.00 },
    { date: 'Sáb', amountUSD: 580.75 },
    { date: 'Dom', amountUSD: 640.00 }
  ]
};
