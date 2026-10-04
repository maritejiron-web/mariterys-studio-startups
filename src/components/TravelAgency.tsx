import React, { useState } from 'react';
import { 
  Palmtree, 
  Ship, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  Send, 
  Sun, 
  Waves, 
  Anchor, 
  Navigation, 
  Heart, 
  Star, 
  Search, 
  Download, 
  Printer, 
  Share2, 
  Image,
  ExternalLink, 
  Bed, 
  ShieldCheck, 
  Utensils, 
  Clock, 
  ChevronRight, 
  Filter, 
  ArrowRight, 
  Bot, 
  MessageSquare, 
  Globe, 
  Luggage, 
  Ticket, 
  X, 
  Coffee,
  Check,
  Compass,
  FileText,
  Award,
  CreditCard,
  HelpCircle,
  Shield,
  Plane
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface TourItem {
  id: string;
  title: string;
  category: 'selva' | 'playa' | 'volcan' | 'aventura' | 'cultura';
  location: string;
  priceUsd: number;
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Avanzado';
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  includes: string[];
  schedule: string;
  highlights: string[];
}

export interface CruiseItem {
  id: string;
  title: string;
  shipName: string;
  durationDays: number;
  departurePort: string;
  route: string[];
  priceUsdFrom: number;
  rating: number;
  image: string;
  description: string;
  cabins: {
    type: string;
    priceUsd: number;
    description: string;
    perks: string[];
  }[];
  includedServices: string[];
}

export interface ParadiseDestination {
  id: string;
  name: string;
  region: string;
  country: string;
  image: string;
  tagline: string;
  description: string;
  bestSeason: string;
  tourCount: number;
  highlights: string[];
}

export interface ClientReview {
  id: string;
  name: string;
  country: string;
  destination: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

const PARADISE_DESTINATIONS: ParadiseDestination[] = [
  {
    id: 'manuel-antonio',
    name: 'Manuel Antonio & Parque Nacional',
    region: 'Pacífico Central',
    country: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Playas turquesa de arena blanca y densa selva tropical',
    description: 'Reconocido mundialmente como uno de los parques nacionales más deslumbrantes. Avistamiento de perezosos, monos cariblanco, tucanes y paseos en catamarán al atardecer.',
    bestSeason: 'Diciembre a Mayo',
    tourCount: 6,
    highlights: ['Avistamiento de Fauna', 'Playa de Esmeralda', 'Catamarán al Atardecer', 'Snorkeling']
  },
  {
    id: 'arenal-fortuna',
    name: 'Volcán Arenal & La Fortuna',
    region: 'Zona Norte',
    country: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Aguas termales volcánicas, cataratas e imponentes paisajes',
    description: 'El destino por excelencia para el bienestar y la aventura. Disfrute de baños termales termominerales de origen volcánico, puentes colgantes sobre la copa de los árboles y canopy.',
    bestSeason: 'Todo el año',
    tourCount: 8,
    highlights: ['Aguas Termales VIP', 'Catarata Río Fortuna', 'Puentes Colgantes', 'Canopy & Zip Line']
  },
  {
    id: 'tortuguero',
    name: 'Parque Nacional Tortuguero',
    region: 'Caribe Norte',
    country: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tagline: 'La pequeña Amazonía del Caribe de Costa Rica',
    description: 'Canales naturales rodeados de densa selva tropical, desove de tortugas verdes gigantes marinas y navegación silenciosa en bote eléctrico por senderos acuáticos.',
    bestSeason: 'Julio a Octubre (Desove)',
    tourCount: 4,
    highlights: ['Navegación en Canales', 'Desove de Tortugas', 'Guías Bilingües', 'Lodge de Selva']
  },
  {
    id: 'isla-tortuga',
    name: 'Isla Tortuga & Golfito',
    region: 'Pacífico / Golfo de Nicoya',
    country: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Isla virgen de cocoteros y arrecifes de coral cristalinos',
    description: 'Navegue en nuestro Catamarán VIP con red de solárium, música en vivo, almuerzo de mariscos y filete a la parrilla, snorkeling y deportes acuáticos en la playa.',
    bestSeason: 'Todo el año',
    tourCount: 3,
    highlights: ['Catamarán All Inclusive', 'Snorkeling en Arrecife', 'Música & DJ', 'Almuerzo Gourmet']
  },
  {
    id: 'monteverde',
    name: 'Bosque Nuboso de Monteverde',
    region: 'Cordillera de Tilarán',
    country: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1511497584788-876761c11969?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Místico bosque en las nubes, cuna del Quetzal Resplandeciente',
    description: 'Camina entre las nubes en una de las reservas biológicas más famosas del mundo. Descubre el hábitat místico del Quetzal, orquídeas milenarias y puentes sostenidos a 100m de altura.',
    bestSeason: 'Noviembre a Mayo',
    tourCount: 5,
    highlights: ['Caminata nocturna', 'Reserva Biológica', 'Paseo en las nubes', 'Jardín de Colibríes']
  },
  {
    id: 'corcovado',
    name: 'Parque Nacional Corcovado & Bahía Drake',
    region: 'Península de Osa',
    country: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    tagline: 'El lugar biológicamente más intenso de la Tierra según National Geographic',
    description: 'Una expedición salvaje única donde habitan los 4 tipos de monos de Costa Rica, jaguares, dantas, guacamayas rojas y ballenas jorobadas en la bahía.',
    bestSeason: 'Diciembre a Abril',
    tourCount: 4,
    highlights: ['Caminata Científica', 'Avistamiento de Ballenas', 'Estación Sirena', 'Selva Virgen']
  }
];

const TOURS_LIST: TourItem[] = [
  {
    id: 'tour-1',
    title: 'Aventura Exclusiva en Canopy & Puentes Colgantes Arenal',
    category: 'aventura',
    location: 'La Fortuna, San Carlos',
    priceUsd: 85,
    duration: '5 Horas',
    difficulty: 'Moderado',
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Vuele sobre la copa de los árboles con vistas panorámicas al Volcán Arenal. Incluye 12 cables de tirolesa, cable Tarzán, caminata guiada por 6 puentes colgantes e hidratación.',
    includes: ['Equipo de seguridad de alta tecnología', 'Guías certificados ICT', 'Transporte desde hoteles de La Fortuna', 'Almuerzo buffet típico costarricense'],
    schedule: 'Diario: 8:00 AM y 1:00 PM',
    highlights: ['12 Cables de Zip-line', 'Vista al cráter del Volcán', 'Paseo en puentes colgantes']
  },
  {
    id: 'tour-2',
    title: 'Paseo VIP en Catamarán a Isla Tortuga (All Inclusive)',
    category: 'playa',
    location: 'Golfo de Nicoya / Puntarenas',
    priceUsd: 135,
    duration: 'Día Completo (10 Horas)',
    difficulty: 'Fácil',
    rating: 5.0,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    description: 'Disfrute de un día en el mar abordo de nuestro catamarán VIP de lujo. Redes para tomar el sol, frutas frescas al zarpar, almuerzo gourmet marinero en la isla, bebidas y tour de snorkeling en arrecife coralino.',
    includes: ['Transporte en autobús de lujo A/C', 'Desayuno ligero a bordo', 'Almuerzo buffet en Isla Tortuga', 'Bebidas ilimitadas', 'Snorkeling y banana boat'],
    schedule: 'Diario saliendo de San José / Puntarenas a las 6:00 AM',
    highlights: ['Redes solárium VIP', 'Playa de agua cristalina', 'Música y animación a bordo']
  },
  {
    id: 'tour-3',
    title: 'Expedición Guiada Manuel Antonio & Playas Esmeralda',
    category: 'selva',
    location: 'Quepos / Manuel Antonio',
    priceUsd: 65,
    duration: '6 Horas',
    difficulty: 'Fácil',
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    description: 'Caminata educacional guiada por el Parque Nacional Manuel Antonio utilizando telescopios de alta definición para observar perezosos de 2 y 3 dedos, monos cariblanco, iguanas y venados.',
    includes: ['Entrada oficial al Parque Nacional', 'Guía naturalista certificado por ICT', 'Telescopio óptico profesional', 'Tiempo libre en la playa dentro del parque'],
    schedule: 'Martes a Domingo: 7:30 AM',
    highlights: ['Fotografía a través del telescopio', 'Baño en playa virgen', 'Avistamiento garantizado de perezosos']
  },
  {
    id: 'tour-4',
    title: 'Rafting Río Pacuare - Rápidos Clase III-IV',
    category: 'aventura',
    location: 'Turrialba / Limón',
    priceUsd: 110,
    duration: '8 Horas',
    difficulty: 'Avanzado',
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=80',
    description: 'Elegido entre los 5 mejores ríos del mundo para hacer rafting. Reme por impresionantes cañones tropicales, cataratas que caen directamente al río y frondosa selva virgen.',
    includes: ['Equipo completo de rafting y chalecos de rescate', 'Guías fluviales certificados en rescate acuático', 'Desayuno y almuerzo en la ribera del río'],
    schedule: 'Diario saliendo a las 6:30 AM',
    highlights: ['Rápidos de nivel mundial', 'Canyon tropical milenario', 'Almuerzo buffet en la playa del río']
  },
  {
    id: 'tour-5',
    title: 'Paseo Nocturno en Bosque Nuboso de Monteverde',
    category: 'cultura',
    location: 'Monteverde, Puntarenas',
    priceUsd: 45,
    duration: '2.5 Horas',
    difficulty: 'Fácil',
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1511497584788-876761c11969?auto=format&fit=crop&w=1200&q=80',
    description: 'Descubra la vida salvaje que despierta al caer la noche en el bosque nuboso. Camaleones, ranas de ojos rojos, tarentolas, perezosos en actividad y aves nocturnas.',
    includes: ['Foco / linterna profesional para cada visitante', 'Guía especialista en fauna nocturna', 'Entrada a la reserva'],
    schedule: 'Todos los días: 5:30 PM y 7:30 PM',
    highlights: ['Rana verde de ojos rojos', 'Observación de mamíferos nocturnos', 'Sonidos de la selva mística']
  },
  {
    id: 'tour-6',
    title: 'Day Pass VIP Aguas Termales Tabacón & Cena Gourmet',
    category: 'volcan',
    location: 'La Fortuna, San Carlos',
    priceUsd: 125,
    duration: '7 Horas',
    difficulty: 'Fácil',
    rating: 5.0,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Relájese en las piscinas termales naturales de río de agua caliente mineralizada rodeadas de jardines tropicales exóticos a los pies del majestuoso Volcán Arenal.',
    includes: ['Pase de día completo a las instalaciones de termales', 'Uso de casilleros y toallas', 'Cena gourmet a la carta en el restaurante del complejo'],
    schedule: 'Diario de 10:00 AM a 9:00 PM',
    highlights: ['Río termal mineralizado 100% natural', 'Cena Gourmet', 'Jardines botánicos exóticos']
  }
];

const CRUISES_LIST: CruiseItem[] = [
  {
    id: 'cruise-royal-caribbean-universal',
    title: 'Crucero Royal Caribbean & Universal Studios Orlando Experience',
    shipName: 'Royal Caribbean Symphony of the Seas & Universal Studios',
    durationDays: 7,
    departurePort: 'Puerto Cañaveral / Miami (EE.UU.) & Caribe',
    route: ['Miami', 'Perfect Day at CocoCay (Bahamas)', 'Cozumel (México)', 'Orlando Universal Studios', 'Miami'],
    priceUsdFrom: 980,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1548574505-5e2386903f87?auto=format&fit=crop&w=1200&q=80',
    description: 'La combinación perfecta de aventura en alta mar y la magia temática de Universal Studios. Disfrute de toboganes de última generación, parques acuáticos, espectáculos de nivel internacional y pases preferenciales para Universal Studios Orlando.',
    includedServices: [
      'Pensión completa gourmet y restaurantes temáticos',
      'Pases de acceso preferencial a Universal Studios & Islands of Adventure',
      'Espectáculos nocturnos en el AquaTheater y musicales estilo Broadway',
      'Acceso a Perfect Day at CocoCay (Isla Privada de Royal Caribbean)',
      'Club de niños y simuladores de surf FlowRider'
    ],
    cabins: [
      {
        type: 'Camarote Interior Confort + Entradas Universal',
        priceUsd: 980,
        description: 'Amplio camarote equipado con cama King, pantalla HD y paquete de entradas a Universal Studios.',
        perks: ['Entradas a Universal Studios incluidas', 'Pensión Completa']
      },
      {
        type: 'Camarote Exterior Vista al Mar',
        priceUsd: 1250,
        description: 'Ventanal panorámico al océano con prioridad para espectáculos a bordo y traslados.',
        perks: ['Vista al mar', 'Prioridad en embarque', 'Pases Express Universal']
      },
      {
        type: 'Royal Suite Imperial con Balcón & Jacuzzi',
        priceUsd: 1950,
        description: 'La máxima expresión de lujo con balcón privado, jacuzzi hidromasaje y Mayordomo dedicado.',
        perks: ['Mayordomo personal 24/7', 'Paquete de bebidas Premium', 'Acceso VIP Lounge', 'Wi-Fi Ilimitado']
      }
    ]
  },
  {
    id: 'cruise-celebrity-x',
    title: 'Crucero Celebrity X Cruises - Experiencia de Lujo Caribe & Pacífico',
    shipName: 'Celebrity X Cruises (Celebrity Beyond / Edge)',
    durationDays: 8,
    departurePort: 'Fort Lauderdale (EE.UU.) / Puerto Caldera (Costa Rica)',
    route: ['Fort Lauderdale', 'Roatán (Honduras)', 'Puerto Limón (Costa Rica)', 'Aruba', 'Curaçao'],
    priceUsdFrom: 1150,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Elegancia, diseño vanguardista y gastronomía galardonada a bordo de la flota de Celebrity X Cruises. Viva una experiencia vacacional premium rodeado de sofisticación.',
    includedServices: [
      'Gastronomía de autor curada por chefs reconocidos mundialmente',
      'Bebidas premium, Wi-Fi ilimitado y propinas incluidas',
      'The Retreat: Área privada exclusiva con terraza y piscina privada',
      'Magic Carpet: Plataforma flotante sobre el mar para cenas al atardecer'
    ],
    cabins: [
      {
        type: 'Veranda Suite con Balcón Infinito',
        priceUsd: 1150,
        description: 'Balcón integrado con ventanal automático que transforma la habitación en una terraza sobre el océano.',
        perks: ['Balcón Infinito', 'Bebidas Premium Incluidas', 'Wi-Fi']
      },
      {
        type: 'AquaClass Suite con Acceso a Spa Térmico',
        priceUsd: 1680,
        description: 'Diseñada para el bienestar con menú saludable exclusivo en Restaurante Blu y acceso ilimitado al SEA Thermal Suite.',
        perks: ['Restaurante Blu Exclusivo', 'Spa Térmico Ilimitado', 'Atención Personalizada']
      }
    ]
  },
  {
    id: 'cruise-tortuga-vip',
    title: 'Travesía de 1 Día en Catamarán VIP Isla Tortuga (Paseo All-Inclusive)',
    shipName: 'Royal Caribbean & Celebrity X Sea Spirit',
    durationDays: 1,
    departurePort: 'Muelle Turístico de Puntarenas',
    route: ['Puntarenas', 'Isla San Lucas', 'Isla Tortuga', 'Puntarenas'],
    priceUsdFrom: 135,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Paseo exclusivo en catamarán respaldado por los estándares de Royal Caribbean & Celebrity X. Red de proa para tomar el sol, música bailable con DJ en vivo, almuerzo buffet marinero y snorkeling.',
    includedServices: [
      'Desayuno liviano a bordo al zarpar',
      'Almuerzo buffet completo en la orilla de Isla Tortuga',
      'Bebidas refrescantes y cócteles tropicales ilimitados',
      'Equipo de snorkeling con guías en arrecife',
      'Sillas de playa reservadas'
    ],
    cabins: [
      {
        type: 'Pase General All Inclusive',
        priceUsd: 135,
        description: 'Acceso completo al catamarán, red de solarium, alimentos, bebidas y tour de snorkeling.',
        perks: ['Todo Incluido', 'Música DJ', 'Snorkeling']
      },
      {
        type: 'Pase VIP Cubierta Alta con Reserva de Sombrilla Privada',
        priceUsd: 175,
        description: 'Atención personalizada en zona lounge ejecutiva del catamarán y toldo de playa reservado.',
        perks: ['Zona Lounge Preferencial', 'Toldo de Playa Privado', 'Cócteles de Autor']
      }
    ]
  }
];

const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    name: 'Carlos & Sofia Méndez',
    country: 'México / Costa Rica',
    destination: 'Crucero Royal Caribbean & Universal Studios',
    rating: 5,
    date: 'Junio 2026',
    comment: '¡Una experiencia inolvidable! Reservamos el Crucero Royal Caribbean con entradas para Universal Studios desde la plataforma de Travel Agency Rain Forest and Land. La atención por WhatsApp fue inmediata, todo el itinerario estuvo perfectamente coordinado y el comprobante fue aceptado sin contratiempos.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    name: 'Michael Miller',
    country: 'Estados Unidos',
    destination: 'Volcán Arenal & Catamarán Isla Tortuga',
    rating: 5,
    date: 'Mayo 2026',
    comment: 'Travel Agency Rain Forest and Land is hands down the best tour operator in Costa Rica. Our private transfers were punctual, the certified bilingual guide knew everything about nature, and Isla Tortuga was pure paradise!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    country: 'Canadá',
    destination: 'Celebrity X Cruises - Lujo Caribe',
    rating: 5,
    date: 'Abril 2026',
    comment: 'Increíble nivel de profesionalismo. La agencia cuenta con licencia ICT y nos dio total tranquilidad desde el primer momento. La habitación Veranda Suite en Celebrity X fue fantástica.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  }
];

export interface TravelAgencyProps {
  onSwitchProject?: (project: 'academy' | 'travel' | 'hub') => void;
}

export default function TravelAgency({ onSwitchProject }: TravelAgencyProps = {}) {
  const [activeTab, setActiveTab] = useState<'destinos' | 'tours' | 'cruceros' | 'cotizador' | 'testimonios' | 'preguntas' | 'asistente' | 'googleads'>('destinos');
  const [currency, setCurrency] = useState<'USD' | 'CRC'>('USD');
  const [exchangeRate] = useState<number>(530); // 1 USD = 530 CRC
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTourCategory, setSelectedTourCategory] = useState<string>('todos');

  // Interactive Quote Engine state
  const [quoteDestination, setQuoteDestination] = useState<string>('tour-2');
  const [quoteAdults, setQuoteAdults] = useState<number>(2);
  const [quoteChildren, setQuoteChildren] = useState<number>(0);
  const [quoteTravelDate, setQuoteTravelDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [quoteIncludeTransfer, setQuoteIncludeTransfer] = useState<boolean>(true);
  const [quoteIncludeHotel, setQuoteIncludeHotel] = useState<boolean>(false);
  const [quoteIncludeInsurance, setQuoteIncludeInsurance] = useState<boolean>(true);
  const [quoteIncludeFlight, setQuoteIncludeFlight] = useState<boolean>(false);
  
  const [quoteCustomerName, setQuoteCustomerName] = useState<string>('');
  const [quoteCustomerPhone, setQuoteCustomerPhone] = useState<string>('');
  const [quoteCustomerEmail, setQuoteCustomerEmail] = useState<string>('');
  const [quoteGeneratedCode, setQuoteGeneratedCode] = useState<string | null>(null);

  // AI Assistant chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: '¡Hola! Bienvenido a Travel Agency Rain Forest and Land. Soy su Asistente Virtual de Viajes. ¿A dónde le gustaría viajar? Cuénteme sobre sus fechas, presupuesto, o si prefiere excursiones de selva, volcanes, playas o la Línea de Cruceros Royal Caribbean & Celebrity X.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Helper format price
  const formatPrice = (priceUsd: number) => {
    if (currency === 'CRC') {
      const crcVal = Math.round(priceUsd * exchangeRate);
      return `₡${crcVal.toLocaleString('es-CR')}`;
    }
    return `$${priceUsd.toLocaleString('en-US')}`;
  };

  // Filter tours
  const filteredTours = TOURS_LIST.filter(tour => {
    const matchCategory = selectedTourCategory === 'todos' || tour.category === selectedTourCategory;
    const matchSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Calculate quote price
  const selectedTourForQuote = TOURS_LIST.find(t => t.id === quoteDestination) || TOURS_LIST[0];
  const selectedCruiseForQuote = CRUISES_LIST.find(c => c.id === quoteDestination);

  const basePricePerPerson = selectedCruiseForQuote 
    ? selectedCruiseForQuote.priceUsdFrom 
    : selectedTourForQuote 
      ? selectedTourForQuote.priceUsd 
      : 100;

  const totalPassengers = quoteAdults + quoteChildren;
  const subtotalAdults = basePricePerPerson * quoteAdults;
  const subtotalChildren = (basePricePerPerson * 0.6) * quoteChildren; // 40% discount for children
  const transferCost = quoteIncludeTransfer ? (25 * totalPassengers) : 0;
  const hotelCost = quoteIncludeHotel ? (85 * totalPassengers) : 0;
  const insuranceCost = quoteIncludeInsurance ? (15 * totalPassengers) : 0;
  const flightCost = quoteIncludeFlight ? (120 * totalPassengers) : 0;
  
  const totalPriceUsd = subtotalAdults + subtotalChildren + transferCost + hotelCost + insuranceCost + flightCost;
  const depositHoldUsd = Math.round(totalPriceUsd * 0.20); // 20% deposit reserve

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `RFL-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteGeneratedCode(code);
  };

  const handleSendWhatsappQuote = () => {
    const titleItem = selectedCruiseForQuote ? selectedCruiseForQuote.title : selectedTourForQuote.title;
    const clientName = quoteCustomerName || 'Estimado Pasajero';
    const clientPhone = quoteCustomerPhone || '+506 7019-3160';
    const clientEmail = quoteCustomerEmail || 'cliente@rainforestlandtravel.com';

    const msg = `🌿 *SOLICITUD DE RESERVA - TRAVEL AGENCY RAIN FOREST AND LAND* 🌿
📌 *Código de Cotización Oficial:* ${quoteGeneratedCode || 'RFL-SOLICITUD'}
👤 *Pasajero Principal:* ${clientName}
📱 *Teléfono:* ${clientPhone}
📧 *Email:* ${clientEmail}

📍 *Paquete / Destino:* ${titleItem}
📅 *Fecha de Viaje:* ${quoteTravelDate}
👥 *Pasajeros:* ${quoteAdults} Adulto(s) ${quoteChildren > 0 ? `y ${quoteChildren} Niño(s)` : ''}
🚘 *Traslado Privado A/C:* ${quoteIncludeTransfer ? 'SÍ (Incluido)' : 'NO'}
🏨 *Hospedaje Ecolodge:* ${quoteIncludeHotel ? 'SÍ (Incluido)' : 'NO'}
🛡️ *Seguro de Viaje Internacional:* ${quoteIncludeInsurance ? 'SÍ (Incluido)' : 'NO'}
✈️ *Vuelo Nacional / Conexión:* ${quoteIncludeFlight ? 'SÍ (Incluido)' : 'NO'}

💰 *Monto Total Estancia:* ${formatPrice(totalPriceUsd)} (${totalPriceUsd} USD)
🔒 *Depósito de Reserva (20%):* ${formatPrice(depositHoldUsd)} (${depositHoldUsd} USD)

Solicito la confirmación de espacios y las instrucciones de pago. ¡Muchas gracias!`;

    const cleanPhone = '50670193160';
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleAiChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setChatInput('');
    setChatLoading(true);

    setTimeout(() => {
      let reply = '';
      const query = userText.toLowerCase();

      if (query.includes('crucero') || query.includes('barco') || query.includes('caribe') || query.includes('mar') || query.includes('royal') || query.includes('celebrity')) {
        reply = '🚢 *Cruceros Oficiales Royal Caribbean Universal Studios & Celebrity X Cruises*:\nOfrecemos travesías de lujo con Royal Caribbean (incluyendo parques de Universal Studios) y Celebrity X Cruises por el Caribe y Pacífico desde $980 USD con All-Inclusive, así como pasadías VIP en Catamarán a Isla Tortuga desde $135 USD con almuerzo gourmet y bebidas ilimitadas. ¿Desea que preparemos su itinerario?';
      } else if (query.includes('precio') || query.includes('costo') || query.includes('cotiz') || query.includes('cuanto')) {
        reply = '💰 *Tarifas Oficiales de Travel Agency Rain Forest and Land*:\n• Canopy & Tirolesas Volcán Arenal: $85 USD (₡45,050)\n• Catamarán VIP Isla Tortuga All-Inclusive: $135 USD (₡71,550)\n• Tour Manuel Antonio con Guía ICT: $65 USD (₡34,450)\n• Rafting Río Pacuare: $110 USD (₡58,300)\n• Crucero Royal Caribbean & Universal: $980 USD\n\nPuede utilizar nuestra pestaña *Cotizador Express* para descargar su comprobante oficial.';
      } else if (query.includes('contacto') || query.includes('telefono') || query.includes('whatsapp') || query.includes('ubicacion')) {
        reply = '🏛️ *Travel Agency Rain Forest and Land*\n• Agencia de Viajes Digital & Asesoría Especializada\n• WhatsApp Directo: *+506 7019-3160*\n• Correo Electrónico: *info@rainforestlandtravel.com*\n• Horarios de atención: Lunes a Domingo de 7:00 AM a 9:00 PM';
      } else if (query.includes('arenal') || query.includes('fortuna') || query.includes('volcan')) {
        reply = '🌋 *La Fortuna & Volcán Arenal*: Ofrecemos pases VIP con aguas termales Tabacón / Baldi, puentes colgantes sobre la selva, caminatas al cráter y cataratas. ¿Desea viajar en pareja o en grupo familiar?';
      } else {
        reply = `🌿 ¡Excelente consulta! En *Travel Agency Rain Forest and Land* organizamos itinerarios a la medida para ${userText}. Le recomendamos combinar excursiones ecoturísticas en la selva costarricense con una estancia en la Línea de Cruceros Royal Caribbean. ¿Gusta que generemos un voucher de cotización?`;
      }

      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setChatLoading(false);
    }, 1000);
  };

  return (
    <div id="rainforest-and-land-agency" className="min-h-screen bg-stone-950 text-stone-100 font-sans pb-16 selection:bg-emerald-500 selection:text-white">
      
      {/* HEADER PRINCIPAL - TRAVEL AGENCY RAIN FOREST AND LAND */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-emerald-900/40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Public Image */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-0.5 shadow-md shadow-emerald-900/40 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <Palmtree className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white font-serif">
                  TRAVEL AGENCY <span className="text-emerald-400 font-sans font-semibold">RAIN FOREST AND LAND</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[8.5px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  AGENCIA DIGITAL 100% ONLINE
                </span>
              </div>
              <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                <Award className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Operador Turístico Certificado • Royal Caribbean & Celebrity X Official Partner</span>
              </p>
            </div>
          </div>

          {/* Quick Info & Currency Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Direct Phone / WhatsApp button */}
            <a 
              href="https://wa.me/50670193160?text=Hola%20Travel%20Agency%20Rain%20Forest%20and%20Land,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20tours%20y%20cruceros" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-900/30"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+506 7019-3160</span>
            </a>

            {/* Currency Switcher */}
            <div className="bg-stone-800/80 border border-stone-700/60 rounded-xl p-0.5 flex items-center text-xs">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-lg font-bold transition ${
                  currency === 'USD' ? 'bg-emerald-500 text-white shadow' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('CRC')}
                className={`px-2 py-1 rounded-lg font-bold transition ${
                  currency === 'CRC' ? 'bg-emerald-500 text-white shadow' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                CRC (₡)
              </button>
            </div>
          </div>

        </div>

        {/* NAVIGATION BAR - TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/60 overflow-x-auto no-scrollbar">
          <nav className="flex space-x-1.5 py-1.5">
            <button
              onClick={() => setActiveTab('destinos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'destinos'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Palmtree className="w-3.5 h-3.5 text-emerald-400" />
              <span>Destinos Paradisíacos</span>
            </button>

            <button
              onClick={() => setActiveTab('tours')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'tours'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Tours & Excursiones</span>
            </button>

            <button
              onClick={() => setActiveTab('cruceros')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'cruceros'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Ship className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cruceros Royal Caribbean & Celebrity X</span>
              <span className="px-1 py-0.2 bg-cyan-500 text-stone-950 font-black text-[8.5px] rounded">OFICIAL</span>
            </button>

            <button
              onClick={() => setActiveTab('cotizador')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'cotizador'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Ticket className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cotizador Express & Voucher</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonios')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'testimonios'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Reseñas de Clientes</span>
            </button>

            <button
              onClick={() => setActiveTab('preguntas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'preguntas'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Requisitos & FAQs</span>
            </button>

            <button
              onClick={() => setActiveTab('asistente')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'asistente'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-teal-400" />
              <span>Asistente AI de Viajes</span>
            </button>

          </nav>
        </div>
      </header>

      {/* HERO BANNER PUBLICO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-stone-800/50">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[11px] font-semibold mb-2.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Agencia Registrada ICT N° 3842-A • Rain Forest and Land</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug font-serif">
              Explore los Destinos Ecoturísticos y <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Cruceros de Lujo Más Espectaculares</span>
            </h2>
            <p className="mt-2 text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Expediciones guiadas en selvas virgen y volcanes de Costa Rica, playas paradisíacas de arena blanca y travesías internacionales en cruceros Royal Caribbean & Celebrity X.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('cotizador')}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-bold rounded-xl shadow-md shadow-emerald-900/30 transition flex items-center gap-1.5 text-xs cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5 text-stone-950" />
                <span>Cotizar Mi Paquete</span>
              </button>

              <button
                onClick={() => setActiveTab('cruceros')}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-cyan-300 border border-cyan-500/40 font-semibold rounded-xl transition flex items-center gap-1.5 text-xs cursor-pointer"
              >
                <Ship className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ver Cruceros</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full md:w-auto">
            <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl text-center">
              <div className="text-base sm:text-lg font-bold text-emerald-400">ICT 100%</div>
              <p className="text-[10px] text-stone-400 mt-0.5">Licencia & Guías Certificados</p>
            </div>
            <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl text-center">
              <div className="text-base sm:text-lg font-bold text-cyan-400">+30</div>
              <p className="text-[10px] text-stone-400 mt-0.5">Destinos & Cruceros VIP</p>
            </div>
            <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl text-center col-span-2 sm:col-span-1">
              <div className="text-base sm:text-lg font-bold text-amber-400">5.0 ★</div>
              <p className="text-[10px] text-stone-400 mt-0.5">Garantía de Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA BY TAB */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* TAB 1: DESTINOS PARADISÍACOS */}
        {activeTab === 'destinos' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-serif">
                  <Palmtree className="w-5 h-5 text-emerald-400" />
                  Destinos Paradisíacos Seleccionados
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                  Explora las reservas ecoturísticas más impresionantes de Costa Rica y el Caribe
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PARADISE_DESTINATIONS.map(dest => (
                <div 
                  key={dest.id}
                  className="bg-stone-900 border border-stone-800/80 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition duration-300 shadow-lg group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={dest.image} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                      <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                        📍 {dest.region}, {dest.country}
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <h4 className="text-base font-bold text-white font-serif">{dest.name}</h4>
                        <p className="text-[11px] text-stone-300 line-clamp-1 italic">{dest.tagline}</p>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-stone-300 leading-relaxed">{dest.description}</p>
                      
                      <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Sun className="w-3 h-3 text-amber-400" />
                          <span>Mejor época: <strong className="text-stone-200">{dest.bestSeason}</strong></span>
                        </span>
                        <span className="text-emerald-400 text-[11px] font-semibold">{dest.tourCount} Tours Disponibles</span>
                      </div>

                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {dest.highlights.map((h, i) => (
                          <span key={i} className="px-2 py-0.5 bg-stone-800 text-stone-300 text-[9.5px] rounded-md">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => {
                        setActiveTab('tours');
                        setSearchQuery(dest.name.split(' ')[0]);
                      }}
                      className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Ver Tours en {dest.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: TOURS Y EXCURSIONES */}
        {activeTab === 'tours' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-serif">
                  <Compass className="w-5 h-5 text-amber-400" />
                  Catálogo de Tours & Excursiones Ecoturísticas
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                  Guías certificados por el ICT y transporte en unidades de lujo con aire acondicionado
                </p>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar tour o lugar..."
                    className="w-full pl-8 pr-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-200 text-xs">✕</button>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-stone-900 p-1 border border-stone-800 rounded-lg text-xs">
                  {[
                    { id: 'todos', label: 'Todos' },
                    { id: 'aventura', label: 'Aventura' },
                    { id: 'playa', label: 'Playas' },
                    { id: 'selva', label: 'Selva' },
                    { id: 'volcan', label: 'Volcanes' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedTourCategory(cat.id)}
                      className={`px-2 py-1 rounded font-medium transition cursor-pointer text-[11px] ${
                        selectedTourCategory === cat.id ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTours.map(tour => (
                <div key={tour.id} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-amber-500/50 transition duration-300">
                  <div>
                    <div className="relative h-44">
                      <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{tour.location}</span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-stone-950 px-2.5 py-0.5 rounded-lg text-xs font-black shadow-md">
                        {formatPrice(tour.priceUsd)} / pers
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5">
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                          ★ {tour.rating} <span className="text-stone-400 font-normal">({tour.reviewsCount} reseñas)</span>
                        </span>
                        <span className="px-2 py-0.5 bg-stone-800 rounded text-stone-300 font-mono text-[9.5px]">
                          {tour.duration}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white font-serif mb-1.5 line-clamp-2">{tour.title}</h4>
                      <p className="text-xs text-stone-300 leading-relaxed mb-3 line-clamp-3">{tour.description}</p>

                      <div className="space-y-1 pt-2.5 border-t border-stone-800/80 text-[11px]">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Servicios Incluidos:</span>
                        {tour.includes.slice(0, 3).map((inc, i) => (
                          <div key={i} className="flex items-center gap-1 text-stone-300 text-[10.5px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="line-clamp-1">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => {
                        setQuoteDestination(tour.id);
                        setActiveTab('cotizador');
                      }}
                      className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/20 cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Cotizar Este Tour</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: CRUCEROS ROYAL CARIBBEAN & CELEBRITY X */}
        {activeTab === 'cruceros' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gradient-to-r from-cyan-950/60 via-stone-900 to-stone-900 p-5 rounded-2xl border border-cyan-800/40 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-cyan-300 text-[11px] font-bold mb-1.5">
                  <Ship className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Royal Caribbean Universal Studios & Celebrity X Cruises</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
                  Travesías Inolvidables en Alta Mar
                </h3>
                <p className="text-stone-300 text-xs mt-0.5">
                  Cruceros transatlánticos de lujo, diversión temática con Universal Studios, recorridos insulares por el Caribe y catamarán VIP a Isla Tortuga.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => {
                    setQuoteDestination('cruise-royal-caribbean-universal');
                    setActiveTab('cotizador');
                  }}
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-stone-950 font-bold rounded-xl text-xs transition shadow-md shadow-cyan-900/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Cotizar Paquete de Crucero</span>
                </button>
              </div>
            </div>

            {/* Cruise Cards */}
            <div className="space-y-6">
              {CRUISES_LIST.map(cruise => (
                <div key={cruise.id} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 relative min-h-[220px]">
                    <img src={cruise.image} alt={cruise.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent lg:hidden"></div>
                    <div className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-cyan-300 border border-cyan-500/30">
                      🚢 {cruise.shipName}
                    </div>
                  </div>

                  <div className="lg:w-3/5 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400 mb-1.5">
                        <span className="text-cyan-400 font-semibold flex items-center gap-1">
                          <Anchor className="w-3.5 h-3.5" />
                          <span>Zarpe: {cruise.departurePort}</span>
                        </span>
                        <span className="px-2 py-0.5 bg-stone-800 text-amber-300 font-bold rounded">
                          {cruise.durationDays} {cruise.durationDays === 1 ? 'Día (Full Day)' : 'Días / Noches'}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white font-serif mb-1.5">{cruise.title}</h4>
                      <p className="text-xs text-stone-300 leading-relaxed mb-3">{cruise.description}</p>

                      {/* Route Ports */}
                      <div className="mb-4 bg-stone-950/80 p-3 rounded-xl border border-stone-800/80">
                        <div className="text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">Itinerario y Puertos de Escala:</div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {cruise.route.map((port, idx) => (
                            <React.Fragment key={idx}>
                              <span className="px-2 py-0.5 bg-stone-800 text-stone-200 text-[11px] font-medium rounded-md border border-stone-700/60">
                                📍 {port}
                              </span>
                              {idx < cruise.route.length - 1 && <span className="text-stone-500 text-[10px]">➔</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Cabins Types Preview */}
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Opciones de Camarotes y Tarifas:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cruise.cabins.map((cabin, cIdx) => (
                            <div key={cIdx} className="bg-stone-800/50 p-2.5 rounded-lg border border-stone-700/50 text-xs">
                              <div className="flex items-center justify-between font-bold text-stone-200 mb-0.5">
                                <span className="text-xs">{cabin.type}</span>
                                <span className="text-emerald-400">{formatPrice(cabin.priceUsd)}</span>
                              </div>
                              <p className="text-[10.5px] text-stone-400">{cabin.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-stone-400">Tarifa desde:</span>
                        <div className="text-lg font-bold text-emerald-400">{formatPrice(cruise.priceUsdFrom)} <span className="text-xs font-normal text-stone-400">/ persona</span></div>
                      </div>

                      <button
                        onClick={() => {
                          setQuoteDestination(cruise.id);
                          setActiveTab('cotizador');
                        }}
                        className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-stone-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/30 cursor-pointer"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Cotizar Este Crucero</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: COTIZADOR INTERACTIVO & COMPROBANTE DE RESERVA */}
        {activeTab === 'cotizador' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-serif">Cotizador de Viaje & Voucher Oficial de Reserva</h3>
                  <p className="text-xs text-stone-400">Calcule su itinerario en tiempo real con precios garantizados y seguro de viaje</p>
                </div>
              </div>

              <form onSubmit={handleGenerateQuote} className="space-y-5">
                
                {/* Seleccionar Destino o Crucero */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    1. Seleccione Tour o Crucero deseado:
                  </label>
                  <select
                    value={quoteDestination}
                    onChange={e => setQuoteDestination(e.target.value)}
                    className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-emerald-500 font-semibold"
                  >
                    <optgroup label="🚢 CRUCEROS ROYAL CARIBBEAN UNIVERSAL STUDIOS & CELEBRITY X">
                      {CRUISES_LIST.map(c => (
                        <option key={c.id} value={c.id}>
                          🚢 {c.title} — desde ${c.priceUsdFrom} USD
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🌴 TOURS Y EXCURSIONES EN COSTA RICA">
                      {TOURS_LIST.map(t => (
                        <option key={t.id} value={t.id}>
                          🌴 {t.title} ({t.location}) — ${t.priceUsd} USD
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Datos del Cliente */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">Nombre Completo:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Juan Pérez"
                      value={quoteCustomerName}
                      onChange={e => setQuoteCustomerName(e.target.value)}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">Teléfono / WhatsApp:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: +506 8888-8888"
                      value={quoteCustomerPhone}
                      onChange={e => setQuoteCustomerPhone(e.target.value)}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">Correo Electrónico:</label>
                    <input
                      type="email"
                      required
                      placeholder="Ej: cliente@correo.com"
                      value={quoteCustomerEmail}
                      onChange={e => setQuoteCustomerEmail(e.target.value)}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Pasajeros y Fecha */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">Adultos (+12 años):</label>
                    <div className="flex items-center bg-stone-950 border border-stone-800 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setQuoteAdults(Math.max(1, quoteAdults - 1))}
                        className="w-7 h-7 bg-stone-800 text-stone-300 rounded font-bold cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-xs text-stone-200">{quoteAdults}</span>
                      <button
                        type="button"
                        onClick={() => setQuoteAdults(quoteAdults + 1)}
                        className="w-7 h-7 bg-stone-800 text-stone-300 rounded font-bold cursor-pointer text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">Niños (3-11 años):</label>
                    <div className="flex items-center bg-stone-950 border border-stone-800 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setQuoteChildren(Math.max(0, quoteChildren - 1))}
                        className="w-7 h-7 bg-stone-800 text-stone-300 rounded font-bold cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-xs text-stone-200">{quoteChildren}</span>
                      <button
                        type="button"
                        onClick={() => setQuoteChildren(quoteChildren + 1)}
                        className="w-7 h-7 bg-stone-800 text-stone-300 rounded font-bold cursor-pointer text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">Fecha Tentativa:</label>
                    <input
                      type="date"
                      value={quoteTravelDate}
                      onChange={e => setQuoteTravelDate(e.target.value)}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Servicios Adicionales */}
                <div className="p-3.5 bg-stone-950/80 rounded-xl border border-stone-800/80 space-y-2.5">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Servicios Complementarios de Viaje:</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                    <label className="flex items-center gap-2 cursor-pointer p-2 bg-stone-900 rounded-lg border border-stone-800 text-[11px]">
                      <input
                        type="checkbox"
                        checked={quoteIncludeTransfer}
                        onChange={e => setQuoteIncludeTransfer(e.target.checked)}
                        className="w-3.5 h-3.5 accent-emerald-500 rounded"
                      />
                      <span>Traslado Privado con A/C (+ $25 USD / pers)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 bg-stone-900 rounded-lg border border-stone-800 text-[11px]">
                      <input
                        type="checkbox"
                        checked={quoteIncludeHotel}
                        onChange={e => setQuoteIncludeHotel(e.target.checked)}
                        className="w-3.5 h-3.5 accent-emerald-500 rounded"
                      />
                      <span>Noche de Hospedaje Ecolodge (+ $85 USD / pers)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 bg-stone-900 rounded-lg border border-stone-800 text-[11px]">
                      <input
                        type="checkbox"
                        checked={quoteIncludeInsurance}
                        onChange={e => setQuoteIncludeInsurance(e.target.checked)}
                        className="w-3.5 h-3.5 accent-emerald-500 rounded"
                      />
                      <span>Seguro Médico & Cancelación (+ $15 USD / pers)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 bg-stone-900 rounded-lg border border-stone-800 text-[11px]">
                      <input
                        type="checkbox"
                        checked={quoteIncludeFlight}
                        onChange={e => setQuoteIncludeFlight(e.target.checked)}
                        className="w-3.5 h-3.5 accent-emerald-500 rounded"
                      />
                      <span>Conexión Vuelo Doméstico (+ $120 USD / pers)</span>
                    </label>
                  </div>
                </div>

                {/* Resumen de Tarifas */}
                <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-stone-950 to-stone-950 rounded-xl border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider">Monto Total Estimado del Paquete:</span>
                    <div className="text-xl font-bold text-emerald-400">{formatPrice(totalPriceUsd)} <span className="text-xs font-normal text-stone-400">({totalPriceUsd} USD)</span></div>
                    <div className="text-[10.5px] text-amber-300 font-semibold mt-0.5">
                      Depósito de Garantía (20%): {formatPrice(depositHoldUsd)} USD
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Generar Voucher Oficial</span>
                  </button>
                </div>
              </form>

              {/* VOUCHER GENERADO VISTA PREVIA */}
              {quoteGeneratedCode && (
                <div className="mt-6 pt-6 border-t border-stone-800">
                  <div id="rainforest-receipt-print" className="bg-stone-950 p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/40 shadow-xl text-left relative overflow-hidden">
                    
                    <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Palmtree className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-base font-bold text-white font-serif tracking-tight">TRAVEL AGENCY RAIN FOREST AND LAND</h4>
                        </div>
                        <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Agencia Digital de Viajes • Voucher Oficial de Pre-Reserva</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-md border border-emerald-500/30">
                          {quoteGeneratedCode}
                        </span>
                        <p className="text-[9.5px] text-stone-400 mt-0.5">Emisión: {new Date().toLocaleDateString('es-CR')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                      <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                        <span className="text-stone-400 text-[10.5px]">Titular del Paquete:</span>
                        <div className="font-bold text-stone-100 text-xs">{quoteCustomerName || 'Pasajero Confirmado'}</div>
                        <div className="text-stone-300 text-[11px]">{quoteCustomerPhone || '+506 7019-3160'} • {quoteCustomerEmail || 'info@rainforestlandtravel.com'}</div>
                      </div>
                      <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                        <span className="text-stone-400 text-[10.5px]">Detalles de Pasajeros & Fecha:</span>
                        <div className="font-bold text-stone-100 text-xs">{quoteAdults} Adulto(s) {quoteChildren > 0 ? `+ ${quoteChildren} Niño(s)` : ''}</div>
                        <div className="text-stone-300 text-[11px]">Fecha de Salida: {quoteTravelDate}</div>
                      </div>
                    </div>

                    <div className="bg-stone-900/60 p-3.5 rounded-xl border border-stone-800/80 text-xs mb-4">
                      <div className="font-bold text-amber-400 mb-0.5 text-xs">Paquete / Excursión Reservada:</div>
                      <div className="text-xs font-bold text-white mb-1">
                        {selectedCruiseForQuote ? `🚢 ${selectedCruiseForQuote.title}` : `🌴 ${selectedTourForQuote.title}`}
                      </div>
                      <p className="text-stone-300 text-[10.5px] mb-2">
                        {selectedCruiseForQuote ? selectedCruiseForQuote.description : selectedTourForQuote.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 text-[9.5px] text-stone-400">
                        {quoteIncludeTransfer && <span className="bg-stone-800 px-2 py-0.5 rounded text-emerald-300">✓ Traslado A/C</span>}
                        {quoteIncludeHotel && <span className="bg-stone-800 px-2 py-0.5 rounded text-emerald-300">✓ Hospedaje Ecolodge</span>}
                        {quoteIncludeInsurance && <span className="bg-stone-800 px-2 py-0.5 rounded text-emerald-300">✓ Seguro Médico</span>}
                        {quoteIncludeFlight && <span className="bg-stone-800 px-2 py-0.5 rounded text-emerald-300">✓ Vuelo de Conexión</span>}
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-900/50 flex items-center justify-between text-xs mb-4">
                      <div>
                        <span className="text-stone-300 font-bold text-xs block">Reserva de Cupos (20% Depósito):</span>
                        <span className="text-[10px] text-stone-400">Saldo restante a cancelar 7 días antes del viaje</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-amber-400">{formatPrice(depositHoldUsd)}</span>
                        <span className="text-[9.5px] text-stone-400 block">(Total Paquete: {formatPrice(totalPriceUsd)})</span>
                      </div>
                    </div>

                    {/* Botón WhatsApp de Confirmación */}
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={handleSendWhatsappQuote}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirmar Reserva con Agente ICT (+506 7019-3160)</span>
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Imprimir Voucher</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* TAB 5: RESEÑAS Y TESTIMONIOS DE CLIENTES */}
        {activeTab === 'testimonios' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-[11px] font-bold mb-2">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Experiencias Reales de Nuestros Pasajeros</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-serif">Lo Que Dicen Quienes Viajan Con Nosotros</h3>
              <p className="text-stone-400 text-xs mt-1">
                Reseñas verificadas de viajeros nacionales e internacionales que han disfrutado de nuestras excursiones y cruceros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CLIENT_REVIEWS.map(rev => (
                <div key={rev.id} className="bg-stone-900 border border-stone-800 p-5 rounded-xl flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed italic mb-4">"{rev.comment}"</p>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex items-center gap-2.5">
                    <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover border border-emerald-500/40" />
                    <div>
                      <h5 className="text-xs font-bold text-white">{rev.name}</h5>
                      <p className="text-[9.5px] text-emerald-400 font-semibold">{rev.destination}</p>
                      <p className="text-[9.5px] text-stone-500">{rev.country} • {rev.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 6: REQUISITOS Y FAQS */}
        {activeTab === 'preguntas' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-5">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-serif">Requisitos de Viaje, Licencias & Preguntas Frecuentes</h3>
                  <p className="text-xs text-stone-400">Información pública sobre la agencia, políticas de cancelación y seguridad sanitaria</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>1. ¿Cómo opera y respalda sus reservas la agencia?</span>
                  </h4>
                  <p className="text-stone-300 leading-relaxed">
                    **Travel Agency Rain Forest and Land** opera como una agencia de viajes digital especializada. Trabajamos únicamente con guías de turismo certificados, operadores con pólizas de transporte al día y socios mayoristas consolidados (como líneas de cruceros y proveedores globales como Expedia TAAP) para garantizar viajes 100% seguros y respaldados.
                  </p>
                </div>

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>2. ¿Cómo se realizan los pagos y la reserva?</span>
                  </h4>
                  <p className="text-stone-300 leading-relaxed">
                    Puede bloquear su paquete con un depósito del 20%. Aceptamos pagos seguros mediante transferencia bancaria (SINPE Móvil en Costa Rica), tarjetas de crédito Visa, MasterCard, American Express y PayPal. El saldo restante se cancela 7 días antes de la fecha de viaje.
                  </p>
                </div>

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>3. ¿Qué políticas de cancelación aplican?</span>
                  </h4>
                  <p className="text-stone-300 leading-relaxed">
                    Ofrecemos cancelación 100% reembolsable si se notifica con al menos 14 días de anticipación para tours ecoturísticos. Para paquetes de Cruceros Royal Caribbean y Celebrity X, las condiciones se rigen por la política del operador marítimo con opción de reprogramación de fechas.
                  </p>
                </div>

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1 flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    <span>4. ¿Qué requisitos de pasaporte o visado se necesitan para cruceros?</span>
                  </h4>
                  <p className="text-stone-300 leading-relaxed">
                    Para cruceros que zarpan de Miami o Fort Lauderdale, se requiere pasaporte con vigencia mínima de 6 meses y Visa estadounidense (o permiso ESTA). Para pasadías en Isla Tortuga o tours nacionales en Costa Rica, solo se requiere documento de identidad o pasaporte vigente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 7: ASISTENTE AI DE VIAJES */}
        {activeTab === 'asistente' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl flex flex-col h-[600px]">
              
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-800">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Rain Forest and Land AI Travel Assistant</h3>
                  <p className="text-xs text-stone-400">Asistencia automatizada sobre itinerarios, presupuestos y recomendaciones turísticas</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none shadow'
                        : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-bl-none shadow'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      <div className="text-[10px] text-stone-400 mt-1 text-right">{msg.time}</div>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-stone-950 border border-stone-800 p-3 rounded-2xl text-xs text-teal-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Generando recomendación de itinerario...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleAiChatSubmit} className="flex gap-2 pt-2 border-t border-stone-800">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ej: Quiero ir a la playa 3 días con $500 de presupuesto..."
                  className="flex-1 px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="px-5 py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-stone-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar</span>
                </button>
              </form>

            </div>
          </motion.div>
        )}

        {/* TAB 8: KIT DE IMÁGENES Y LOGOS PARA GOOGLE ADS */}
        {activeTab === 'googleads' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-6">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Image className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-serif">Imágenes y Logos requeridos para Google Ads</h3>
                  <p className="text-xs text-stone-400">Descargue o use las URLs oficiales preparadas para su campaña publicitaria en Google Ads</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 1. Foto Cuadrada */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">1. Foto Cuadrada (1:1)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">1200 x 1200 px</span>
                    </div>
                    <p className="text-xs text-stone-300 mb-3">Foto atractiva de turismo en Costa Rica para el público viajero.</p>
                    <div className="relative rounded-lg overflow-hidden border border-stone-800 aspect-square mb-3">
                      <img src="/google-ads/foto_cuadrada_viajes.jpg" alt="Foto Cuadrada Google Ads" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/google-ads/foto_cuadrada_viajes.jpg"
                      download="foto_cuadrada_viajes.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Foto</span>
                    </a>
                  </div>
                </div>

                {/* 2. Foto Horizontal */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">2. Foto Horizontal (16:9)</span>
                      <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">1200 x 628 px</span>
                    </div>
                    <p className="text-xs text-stone-300 mb-3">Panorámica de crucero y playa caribeña de lujo.</p>
                    <div className="relative rounded-lg overflow-hidden border border-stone-800 aspect-video mb-3">
                      <img src="/google-ads/foto_horizontal_viajes.jpg" alt="Foto Horizontal Google Ads" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/google-ads/foto_horizontal_viajes.jpg"
                      download="foto_horizontal_viajes.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Foto</span>
                    </a>
                  </div>
                </div>

                {/* 3. Logo Cuadrado */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. Logo Cuadrado de la Empresa</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">1:1 Logo</span>
                    </div>
                    <p className="text-xs text-stone-300 mb-3">Emblema oficial de Travel Agency Rain Forest and Land.</p>
                    <div className="relative rounded-lg overflow-hidden border border-stone-800 aspect-square mb-3">
                      <img src="/google-ads/logo_cuadrado.jpg" alt="Logo Cuadrado Empresa" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/google-ads/logo_cuadrado.jpg"
                      download="logo_cuadrado.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Logo</span>
                    </a>
                  </div>
                </div>

                {/* 4. Logo Horizontal */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">4. Logo Horizontal de la Empresa</span>
                      <span className="text-[10px] bg-blue-500/10 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono">16:9 / 4:1 Banner Logo</span>
                    </div>
                    <p className="text-xs text-stone-300 mb-3">Banner horizontal para cabeceras y anuncios adaptativos.</p>
                    <div className="relative rounded-lg overflow-hidden border border-stone-800 aspect-video mb-3">
                      <img src="/google-ads/logo_horizontal.jpg" alt="Logo Horizontal Empresa" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/google-ads/logo_horizontal.jpg"
                      download="logo_horizontal.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Logo</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* FOOTER OFICIAL PUBLICO - TRAVEL AGENCY RAIN FOREST AND LAND */}
      <footer className="mt-16 bg-stone-950 border-t border-stone-900 py-12 px-4 sm:px-6 lg:px-8 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palmtree className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-white font-serif text-sm">RAIN FOREST AND LAND</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Agencia de viajes digital de Costa Rica. Especialistas en ecoturismo, conservación ambiental, tours personalizados y cruceros internacionales.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Líneas de Atención</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: <strong className="text-white">+506 7019-3160</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Correo: info@rainforestlandtravel.com</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Oficinas Centrales: San José, Costa Rica</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Garantía y Acreditaciones</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li>✓ Agencia de Viajes Digital</li>
              <li>✓ Guías & Operadores Certificados</li>
              <li>✓ Royal Caribbean & Celebrity X Partner</li>
              <li>✓ Asistencia Personalizada 24/7</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Formas de Pago Aceptadas</h5>
            <p className="text-[11px] text-stone-400 mb-2">Transacciones seguras cifradas:</p>
            <div className="flex flex-wrap gap-1.5 font-bold text-[10px] text-stone-300">
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">VISA</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">MasterCard</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">AMEX</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">PayPal</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-emerald-400">SINPE Móvil</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>© {new Date().getFullYear()} Travel Agency Rain Forest and Land. Todos los derechos reservados.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('preguntas')} className="hover:text-stone-300 transition cursor-pointer">Términos de Servicio</button>
            <span>•</span>
            <button onClick={() => setActiveTab('preguntas')} className="hover:text-stone-300 transition cursor-pointer">Políticas de Privacidad</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
