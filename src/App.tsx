import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  Database, 
  Coins,
  Server, 
  Layers, 
  Code2, 
  Send, 
  CheckCircle2, 
  Play, 
  Settings, 
  RefreshCw, 
  FileCode, 
  Layers3, 
  Sparkles, 
  GitBranch, 
  Clock, 
  DollarSign, 
  Phone, 
  Mail, 
  ArrowRight, 
  Check, 
  Copy, 
  ShieldAlert, 
  Activity, 
  ExternalLink,
  ChevronRight,
  HardDrive,
  Cloud,
  FileSpreadsheet,
  BookOpen,
  GraduationCap,
  Award,
  LockKeyhole,
  Unlock,
  BookOpenCheck,
  MessageSquareCode,
  Bot,
  Download,
  Globe,
  Printer,
  Search,
  Trash2,
  Camera,
  Megaphone,
  X,
  Share2,
  Youtube,
  Flame,
  TrendingUp,
  Loader2,
  Video,
  FileText,
  Shapes,
  Maximize2,
  Link,
  MessageCircle,
  Filter,
  Smartphone
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'motion/react';
import { TechNode, ArchitecturePreset, ApiEndpoint, SimulatedDatabaseRow, FullStackProject, Course, CourseModule, CourseTopic } from './types';
import { COURSES } from './coursesData';
import { STATIC_COURSE_TRANSLATIONS } from './courseTranslations';
import SextoGradoPortal from './components/SextoGradoPortal';
import { GeometryStudio } from './components/StreamPAY/GeometryStudio';
import FintechSimulator from './components/FintechSimulator';
import TravelAgency from './components/TravelAgency';
import CertificateEditor from './components/CertificateEditor';
import StreamPayApp from './components/StreamPAY/StreamPayApp';
import { TradingPlatformApp } from './components/Trading/TradingPlatformApp';
import { PlayEarnApp } from './components/playearn/PlayEarnApp';
import MisStartupsModal, { STARTUPS_CATALOG, StartupItem, getCleanStartupUrl } from './components/MisStartupsModal';

// Definition of tech nodes for the designer
const TECH_NODES: TechNode[] = [
  // Frontend
  { id: 'react', name: 'React 19 (SPA)', category: 'frontend', description: 'Biblioteca de UI declarativa y reactiva con optimizaciones de carga virtual.', latencyRating: '1.2ms', reliability: '99.9%', iconName: 'Layout' },
  { id: 'nextjs', name: 'Next.js (SSR/RSC)', category: 'frontend', description: 'Ecosistema de renderizado del lado del servidor (SSR) para SEO de alto rendimiento y caching.', latencyRating: '0.8ms', reliability: '99.95%', iconName: 'Layers' },
  { id: 'vue', name: 'Vue 3 (Vite)', category: 'frontend', description: 'Sistema reactivo progresivo y ligero para interfaces modulares y fluidas.', latencyRating: '1.5ms', reliability: '99.8%', iconName: 'Layout' },
  
  // State/Style
  { id: 'tailwind', name: 'Tailwind CSS + Motion', category: 'state_style', description: 'Diseño utilitario atómico con animaciones fluidas aceleradas por hardware.', latencyRating: '0.1ms', reliability: '100%', iconName: 'Sparkles' },
  { id: 'redux', name: 'Redux Toolkit', category: 'state_style', description: 'Almacén de estado global determinista, óptimo para flujos financieros robustos.', latencyRating: '0.4ms', reliability: '99.9%', iconName: 'Cpu' },
  { id: 'zustand', name: 'Zustand + Immer', category: 'state_style', description: 'Gestión de estado minimalista y reactiva, sin sobrecarga de boilerplate.', latencyRating: '0.1ms', reliability: '99.99%', iconName: 'Cpu' },

  // Backend
  { id: 'express', name: 'Node.js (Express)', category: 'backend', description: 'Servidor asíncrono conducido por eventos, ideal para microservicios de alta E/S.', latencyRating: '8ms', reliability: '99.9%', iconName: 'Server' },
  { id: 'nestjs', name: 'NestJS (TypeScript)', category: 'backend', description: 'Arquitectura empresarial sólida con inyección de dependencias y tipado estricto.', latencyRating: '11ms', reliability: '99.95%', iconName: 'Server' },
  { id: 'go', name: 'Go (Fiber Framework)', category: 'backend', description: 'Compilación nativa ultra veloz con concurrencia nativa mediante Goroutines.', latencyRating: '1.8ms', reliability: '99.99%', iconName: 'Cpu' },
  { id: 'fastapi', name: 'Python (FastAPI)', category: 'backend', description: 'Backend rápido con documentación OpenAPI automática y validación mediante Pydantic.', latencyRating: '9ms', reliability: '99.85%', iconName: 'Server' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL SQL', category: 'database', description: 'Motor relacional ACID con soporte avanzado de JSON, transacciones y concurrencia.', latencyRating: '4.5ms', reliability: '99.99%', iconName: 'Database' },
  { id: 'mongodb', name: 'MongoDB NoSQL', category: 'database', description: 'Persistencia documental dinámica, óptima para catálogos y esquemas flexibles.', latencyRating: '3.8ms', reliability: '99.9%', iconName: 'HardDrive' },
  { id: 'mysql', name: 'MySQL Enterprise', category: 'database', description: 'Base de datos relacional robusta con indexación de lectura de alta velocidad.', latencyRating: '5.1ms', reliability: '99.85%', iconName: 'Database' },

  // Cache & Messaging
  { id: 'redis', name: 'Redis In-Memory', category: 'cache_msg', description: 'Base de datos clave-valor ultra rápida en memoria para caching de sesiones y límites de tasa.', latencyRating: '0.3ms', reliability: '99.99%', iconName: 'Activity' },
  { id: 'rabbitmq', name: 'RabbitMQ', category: 'cache_msg', description: 'Broker de mensajería asíncrona para comunicación desacoplada de microservicios.', latencyRating: '1.5ms', reliability: '99.9%', iconName: 'RefreshCw' },
  { id: 'kafka', name: 'Apache Kafka', category: 'cache_msg', description: 'Ecosistema de streaming de eventos de alta escala para telemetría y logs distribuidos.', latencyRating: '2.1ms', reliability: '99.95%', iconName: 'RefreshCw' },
  { id: 'none_cache', name: 'Sin Capa de Mensajería', category: 'cache_msg', description: 'Llamadas API síncronas directas entre cliente y base de datos.', latencyRating: '0ms', reliability: '100%', iconName: 'FileCode' },

  // Cloud/DevOps
  { id: 'docker_k8s', name: 'Docker + Kubernetes', category: 'cloud_devops', description: 'Contenedores portables con auto-escalado horizontal y balanceo de carga nativo.', latencyRating: '0.2ms', reliability: '99.99%', iconName: 'Cloud' },
  { id: 'gcp_run', name: 'Google Cloud Run', category: 'cloud_devops', description: 'Computación serverless escalable a cero con despliegues continuos automáticos.', latencyRating: '0.5ms', reliability: '99.95%', iconName: 'Cloud' },
  { id: 'aws', name: 'AWS (ECS / RDS)', category: 'cloud_devops', description: 'Infraestructura global con alta disponibilidad y tolerancia a fallos multi-zona.', latencyRating: '0.6ms', reliability: '99.99%', iconName: 'Cloud' }
];

const PRESETS: ArchitecturePreset[] = [
  {
    name: '🚀 MVP Corporativo de Alta Velocidad',
    description: 'Estructura óptima para startups y productos interactivos que necesitan salir al mercado rápido con excelente rendimiento.',
    frontend: 'react',
    state_style: 'zustand',
    backend: 'express',
    database: 'postgresql',
    cache_msg: 'redis',
    cloud_devops: 'gcp_run'
  },
  {
    name: '🛡️ Arquitectura Bancaria / FinTech',
    description: 'Enfoque estricto en seguridad, transacciones ACID consistentes, cola de mensajes asíncrona y redundancia global.',
    frontend: 'nextjs',
    state_style: 'redux',
    backend: 'go',
    database: 'postgresql',
    cache_msg: 'rabbitmq',
    cloud_devops: 'aws'
  },
  {
    name: '⚡ Sistema NoSQL de Alta Escala',
    description: 'Ideal para catálogos dinámicos, mensajería instantánea o streaming de datos con esquemas variables de documentos.',
    frontend: 'vue',
    state_style: 'zustand',
    backend: 'fastapi',
    database: 'mongodb',
    cache_msg: 'kafka',
    cloud_devops: 'docker_k8s'
  }
];

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/register',
    description: 'Registra un usuario, genera hashes criptográficos de contraseña, guarda en base de datos e inicializa caché.',
    parameters: [
      { name: 'username', type: 'string', placeholder: 'Ej: diseno_digital', required: true },
      { name: 'email', type: 'string', placeholder: 'Ej: estudiante@academia.cr', required: true },
      { name: 'role', type: 'string', placeholder: 'Ej: Senior Designer', required: false }
    ]
  },
  {
    method: 'POST',
    path: '/api/v1/deploy/pipeline',
    description: 'Simula un despliegue CI/CD real de Kubernetes. Compila la imagen, ejecuta linter y publica a la nube.',
    parameters: [
      { name: 'projectName', type: 'string', placeholder: 'Ej: core-banking-api', required: true },
      { name: 'branch', type: 'string', placeholder: 'Ej: main', required: true },
      { name: 'environment', type: 'string', placeholder: 'Ej: producción', required: true }
    ]
  },
  {
    method: 'POST',
    path: '/api/v1/payment/checkout',
    description: 'Simula el checkout seguro mediante Stripe/PayPal. Registra orden en PostgreSQL y envía webhook de éxito.',
    parameters: [
      { name: 'customerEmail', type: 'string', placeholder: 'Ej: cliente@bancocr.com', required: true },
      { name: 'amount', type: 'number', placeholder: 'Ej: 750000', required: true },
      { name: 'currency', type: 'string', placeholder: 'Ej: CRC / USD', required: true }
    ]
  }
];

const PORTFOLIO_PROJECTS: FullStackProject[] = [
  {
    id: 'proj-1',
    title: 'FinTech Ledger Core',
    subtitle: 'Motor de transacciones financieras en tiempo real',
    description: 'Arquitectura distribuida construida para la conciliación de saldos de tarjetas y SINPE en milisegundos con cero pérdida de datos.',
    tags: ['Next.js', 'Go', 'PostgreSQL', 'Redis', 'Kafka', 'AWS'],
    metrics: {
      latency: '2.4ms',
      throughput: '18,500 req/s',
      uptime: '99.999%',
      dbQueries: '34.2M / día'
    },
    colorTheme: 'from-amber-600 to-amber-900'
  },
  {
    id: 'proj-2',
    title: 'SaaS Telehealth Platform',
    subtitle: 'Expediente digital y videoconsultas cifradas',
    description: 'Plataforma médica con sincronización instantánea de registros de pacientes, firmas criptográficas y cumplimiento de seguridad HIPAA.',
    tags: ['React', 'NestJS', 'MongoDB', 'Redis', 'WebSockets', 'Docker'],
    metrics: {
      latency: '14ms',
      throughput: '5,200 req/s',
      uptime: '99.95%',
      dbQueries: '11.8M / día'
    },
    colorTheme: 'from-emerald-600 to-emerald-950'
  },
  {
    id: 'proj-3',
    title: 'IoT Telemetry Grid',
    subtitle: 'Procesamiento de eventos industriales masivos',
    description: 'Consola analítica y base de datos de series temporales conectada a más de 5,000 sensores distribuidos con triggers automatizados.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'RabbitMQ', 'TimescaleDB', 'GCP'],
    metrics: {
      latency: '8.2ms',
      throughput: '45,000 req/s',
      uptime: '99.98%',
      dbQueries: '150M / día'
    },
    colorTheme: 'from-cyan-600 to-cyan-950'
  }
];

const generateYoutubeContent = (course: any, vibe: 'academic' | 'sales' | 'short', phone: string, url: string) => {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const waLink = `https://wa.me/${cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone}`;
  const title = course.title;
  const desc = course.description;
  const hours = course.durationHours;

  if (vibe === 'short') {
    return {
      titles: [
        `🔥 ¡No cometas este error en ${title}! 😱`,
        `🧠 Aprende ${title} en tiempo récord (Fácil y Rápido)`,
        `💼 La habilidad mejor pagada en 2026: ${title}`
      ],
      script: `[0:00 - 0:10] EL GANCHO (Hook de Retención Máxima)\n👉 Mira a la cámara con energía: "¿Sabías que la mayoría de personas que intentan aprender ${title} tiran la toalla en el primer mes? Y no es porque sea difícil, ¡es porque usan el método equivocado! Quédate en este video porque te voy a revelar el mapa de ruta exacto."\n\n[0:10 - 0:30] EL PROBLEMA Y LA SOLUCIÓN\n👉 "Pasas horas viendo tutoriales fragmentados en YouTube que solo te confunden más. En nuestra Academia, diseñamos la Carrera de ${title} desde cero hasta nivel profesional. Con solo ${hours} horas de entrenamiento práctico y tutorías personalizadas por Inteligencia Artificial, vas a dominarlo."\n\n[0:30 - 0:50] LA OFERTA Y LA ACCIÓN (CTA)\n👉 "Y lo mejor de todo es la matrícula de apertura con mensualidades súper cómodas. Olvídate de cursos de miles de dólares."\n\n[0:50 - 1:00] LLAMADO A LA ACCIÓN FINAL\n👉 "Escríbeme ahora mismo al WhatsApp: ${phone} o haz clic en el enlace fijado de abajo para asegurar tu cupo antes de que se llenen. ¡Te veo dentro de la clase!"`,
      description: `🔥 ¡Domina ${title} Hoy Mismo! 🔥\n¿Quieres aprender ${title} de manera práctica y sin perder el tiempo con rodeos teóricos?\n\n👉 Haz clic aquí para ver el temario y matricularte de inmediato:\n🔗 ${url}\n\n📲 O escríbenos directamente por WhatsApp para atención personalizada e inmediata:\n💬 ${waLink} (Teléfono: ${phone})\n\n---\nEn este Short te explico por qué la mayoría de personas falla al estudiar ${title} y cuál es el camino directo al éxito profesional.\n\n✅ Carrera de ${hours} Horas Académicas de especialización.\n✅ Tutor de Inteligencia Artificial disponible 24/7 para revisar tu código.\n✅ Certificación Oficial avalada por nuestra Academia.\n\n🔔 No olvides suscribirte, darle like y dejar tus dudas en los comentarios.`,
      tags: `${title.toLowerCase()}, curso de ${title.toLowerCase()}, tutorial ${title.toLowerCase()}, aprender ${title.toLowerCase()}, carrera full stack, programacion, desarrollo software, fullstack studio`
    };
  }

  if (vibe === 'sales') {
    return {
      titles: [
        `💰 ¡Trabaja de esto en 2026! Carrera Profesional en ${title}`,
        `📈 De Cero a Profesional en ${title} (¿Vale la pena?)`,
        `🚀 Guía Definitiva de ${title}: Estudia con nosotros`
      ],
      script: `[0:00 - 0:30] INTRODUCCIÓN IMPACTANTE\n👉 "Hola, futuro profesional. Si estás buscando dar un salto cuántico en tu carrera, ganar en dólares o simplemente dominar la tecnología de mayor demanda en el mercado internacional, este video es para ti. Hoy te presento la Especialidad en ${title}."\n\n[0:30 - 1:30] EL VALOR DIFERENCIAL Y METODOLOGÍA\n👉 "En internet hay miles de cursos grabados del 2020 que ya no sirven. En nuestra Academia te entrenamos con React 19, Inteligencia Artificial avanzada, arquitecturas limpias y bases de datos reales. Son ${hours} horas de puro código, proyectos reales para tu portafolio y un soporte directo que no vas a encontrar en ningún otro lado."\n\n[1:30 - 2:30] ESTRUCTURA DE MÓDULOS Y FLEXIBILIDAD\n👉 "Aprenderás desde los fundamentos absolutos hasta integraciones empresariales avanzadas. Y lo mejor de todo: a tu propio ritmo, 100% online, y con facilidades de pago mensuales inigualables de tan solo ₡35,000 colones. ¡Una inversión mínima para una carrera con alta salida laboral!"\n\n[2:30 - 3:00] CIERRE Y LLAMADO A LA ACCIÓN (CTA)\n👉 "Las inscripciones están abiertas y los cupos son sumamente limitados para darte un acompañamiento de calidad. Haz clic en el enlace que está en la descripción de este video o envíanos un WhatsApp directo al ${phone} para reservar tu lugar con el descuento de apertura. ¡No dejes tu futuro para mañana, inicia hoy!"`,
      description: `🚀 ¡Estudia la Especialidad en ${title} y asegura tu futuro profesional!\nToda la información de la matrícula, facilidades de pago y temarios oficiales aquí:\n🔗 ${url}\n\n💬 WhatsApp Directo para Inscripción Inmediata:\n👉 ${waLink} o al teléfono ${phone}\n\n---\n¿Buscas un cambio de carrera o especializarte en las tecnologías más cotizadas del mercado? En este video te muestro todo lo que aprenderás en nuestra carrera de ${title}.\n\n¿Qué incluye este programa académico?\n📌 ${hours} Horas de lecciones prácticas estructuradas de cero a cien.\n📌 Proyectos reales para crear un portafolio profesional de alto nivel.\n📌 Tutorías personalizadas y acceso ilimitado a nuestra plataforma.\n📌 Certificación oficial emitida al graduarte para mejorar tu currículum.\n\n¡Es el momento de invertir en ti! Escríbenos hoy mismo y solicita tu clase de prueba gratuita.\n\n#EstudiarProgramacion #DesarrolloWeb #${title.replace(/\s+/g, '')} #AcademiaTecnologia`,
      tags: `curso de ${title.toLowerCase()}, carrera ${title.toLowerCase()}, especialidad ${title.toLowerCase()}, estudiar programacion 2026, academia fullstack, aprender ${title.toLowerCase()} costa rica, desarrollo de software`
    };
  }

  // default: academic
  return {
    titles: [
      `🎓 Explicación Completa: ¿Qué es ${title} y cómo dominarlo?`,
      `🛠️ Guía Técnica de ${title} para Principiantes`,
      `📚 Todo sobre la Especialidad Profesional en ${title}`
    ],
    script: `[0:00 - 0:40] INTRODUCCIÓN Y CONTEXTO ACADÉMICO\n👉 "Bienvenidos a este análisis técnico. Hoy vamos a desglosar una de las disciplinas más importantes del desarrollo moderno: ${title}. Vamos a explicar qué es, por qué las empresas lo exigen tanto en sus vacantes y cómo puedes trazar un camino sólido para dominarlo de forma estructurada."\n\n[0:40 - 2:00] EXPLICACIÓN TÉCNICA CLAVE\n👉 "Para entender ${title}, primero debemos comprender el problema que resuelve. ${desc} Esto nos permite construir sistemas escalables y eficientes. A lo largo de nuestro plan de estudios de ${hours} horas académicas, desglosamos cada uno de estos conceptos en módulos interactivos paso a paso."\n\n[2:00 - 3:15] DETALLE DEL PLAN DE ESTUDIOS\n👉 "Nuestra currícula está diseñada cuidadosamente por ingenieros activos en la industria. Empezamos con los fundamentos lógicos, avanzamos hacia arquitecturas asíncronas y culminamos con despliegues en servidores de producción y uso de agentes de Inteligencia Artificial para automatizar tareas diarias."\n\n[3:15 - 4:00] CONCLUSIÓN Y ORIENTACIÓN ESTUDIANTIL\n👉 "Si deseas revisar el temario interactivo detallado de esta especialidad o realizar un test de aptitud técnica, te invito a ingresar a nuestro portal web oficial en el enlace de abajo o escribir a nuestro WhatsApp académico ${phone} para que un asesor te guíe. ¡Nos vemos en la primera sesión!"`,
    description: `🎓 Guía Técnica y Académica Completa sobre ${title}.\nDescarga el temario oficial del curso y explora el portal estudiantil aquí:\n🔗 ${url}\n\n💬 ¿Tienes dudas sobre el plan de estudios o requisitos? Escríbenos por WhatsApp:\n👉 ${waLink} o al teléfono ${phone}\n\n---\nEn este video realizamos un recorrido detallado por la especialidad de ${title}. Analizamos las tecnologías que aprenderás, los casos prácticos que desarrollaremos y cómo esta certificación te preparará para afrontar retos reales en empresas de software nacionales e internacionales.\n\nContenido del Video:\n0:00 - Introducción y Contexto de la disciplina\n0:40 - Qué problema técnico resuelve y conceptos clave\n2:00 - Estructura de Módulos del Plan de Estudios (${hours} horas)\n3:15 - Salida laboral, certificación oficial y cómo matricularse\n\n¡Estudia bajo un modelo flexible y de alta calidad!\n\n#IngenieriaDeSoftware #Tutorial${title.replace(/\s+/g, '')} #AprenderTecnologia #AcademiaVirtual`,
    tags: `que es ${title.toLowerCase()}, tutorial ${title.toLowerCase()} español, como aprender ${title.toLowerCase()}, ingenieria de software, certificacion ${title.toLowerCase()}, carrera de tecnologia`
  };
};

export default function App() {
  // Current designer selection
  const [selectedFrontend, setSelectedFrontend] = useState('react');
  const [selectedStateStyle, setSelectedStateStyle] = useState('zustand');
  const [selectedBackend, setSelectedBackend] = useState('express');
  const [selectedDatabase, setSelectedDatabase] = useState('postgresql');
  const [selectedCacheMsg, setSelectedCacheMsg] = useState('redis');
  const [selectedCloudDevops, setSelectedCloudDevops] = useState('gcp_run');

  // Terminal Simulator states
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [inputParams, setInputParams] = useState<Record<string, string>>({
    username: 'diseno_digital',
    email: 'estudiante@academia.cr',
    role: 'Senior Designer'
  });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '💾 [SYSTEM] Consola de desarrollo inicializada.',
    '💾 [SYSTEM] Base de datos local PostgreSQL online (puerto 5432).',
    '💾 [SYSTEM] Servidor Express escuchando en puerto 3000.',
    '💾 [SYSTEM] Digite parámetros y haga clic en "Ejecutar Endpoint" para testear...'
  ]);
  const [simulatedDatabase, setSimulatedDatabase] = useState<SimulatedDatabaseRow[]>([
    { id: '1', createdAt: '28/06/2026, 10:14 AM', type: 'User', fieldA: 'diseno_digital', fieldB: 'estudiante@academia.cr', fieldC: 'Senior Designer' },
    { id: '2', createdAt: '28/06/2026, 11:22 AM', type: 'Project', fieldA: 'Plataforma Core BCR', fieldB: 'API de pagos', fieldC: 'Rama main' }
  ]);
  const [isTerminalExecuting, setIsTerminalExecuting] = useState(false);

  // Estimator Form states
  const [projectScale, setProjectScale] = useState<'mvp' | 'mid' | 'enterprise'>('mid');
  const [complianceNeeded, setComplianceNeeded] = useState(false);
  const [extraAuth, setExtraAuth] = useState(true);
  const [extraDatabaseReplica, setExtraDatabaseReplica] = useState(false);
  const [extraRealtime, setExtraRealtime] = useState(false);
  const [clientBudget, setClientBudget] = useState('10000000'); // 10 Million Colones
  const [currencySymbol, setCurrencySymbol] = useState<'CRC' | 'USD'>('CRC');

  const [selectedCountry, setSelectedCountry] = useState<string>('CR');
  const [targetLanguage, setTargetLanguage] = useState<string>('es');
  const [isTranslatingCourse, setIsTranslatingCourse] = useState<boolean>(false);
  const [translatedCourses, setTranslatedCourses] = useState<Record<string, Course>>({});

  const LANGUAGE_NAMES: Record<string, string> = {
    es: 'Spanish',
    en: 'English',
    pt: 'Portuguese',
    fr: 'French',
    de: 'German'
  };

  const COUNTRY_OPTIONS = [
    { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', lang: 'es', currency: 'CRC' },
    { code: 'US', name: 'United States', flag: '🇺🇸', lang: 'en', currency: 'USD' },
    { code: 'BR', name: 'Brasil', flag: '🇧🇷', lang: 'pt', currency: 'USD' },
    { code: 'FR', name: 'France', flag: '🇫🇷', lang: 'fr', currency: 'USD' },
    { code: 'DE', name: 'Deutschland', flag: '🇩🇪', lang: 'de', currency: 'USD' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', lang: 'es', currency: 'USD' },
  ];

  const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
    es: {
      title: 'Software Development Full Stack',
      coursesTab: '🎓 Cursos',
      adsTab: '📢 Publicidad',
      engTab: '🛠️ Ingeniería',
      welcomeTitle: 'Academia Virtual de Software & Tecnología',
      welcomeSubtitle: 'Conviértase en un profesional de alto nivel con planes de estudio interactivos basados en proyectos del mundo real.',
      studyNow: 'Estudiar Ahora',
      enrollCourse: 'Matricular Curso',
      viewSyllabus: 'Ver Temario',
      pendingApproval: 'Matrícula Pendiente de Validación',
      installmentPay: 'Pagar Mensualidad',
      totalInvestment: 'Inversión Total',
      monthlyFee: 'Mensualidad',
      curriculum: 'Temario y Plan de Estudios',
      instructor: 'Instructor(a)',
      duration: 'Duración Académica',
      difficulty: 'Dificultad',
      modules: 'Módulos Académicos',
      activeCourse: 'Curso Activo',
      interactiveLessons: 'Lecciones Interactivas',
      aiTutorChat: 'Chat de Tutor I.A.',
      quizTitle: 'Cuestionario de Autoevaluación',
      verifyAnswer: 'Verificar Respuesta',
      correctAnswer: '¡Respuesta Correcta!',
      incorrectAnswer: 'Respuesta Incorrecta',
      explanation: 'Explicación',
      classroomCode: 'Espacio de Código Práctico',
      loadingTranslation: 'I.A. Traduciendo contenido...',
      contactWhatsApp: 'Contacto para Matrícula',
      mepCertified: 'MEP Costa Rica Certificaciones',
      allRightsReserved: 'Todos los derechos reservados.',
      checkoutTitle: 'Pasarela de Pago Segura',
      cardPayment: 'Tarjeta de Crédito / Débito',
      sinpePayment: 'SINPE Móvil / Transferencia',
      processPayment: 'Procesar Pago Seguro',
      confirmEnrollment: 'Confirmar Matrícula',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      cardNumber: 'Número de Tarjeta',
      cardName: 'Nombre en la Tarjeta',
      expiry: 'Expiración (MM/AA)',
      cvc: 'Código de Seguridad (CVC)',
      paymentSuccess: '¡Pago Procesado con Éxito!',
      paymentDescription: 'Su matrícula ha sido registrada y el contenido ya está desbloqueado.',
      selectCountry: 'País / Idioma',
      studyButton: 'Estudiar',
      syllabusDownloaded: 'Syllabus descargado',
      activeLesson: 'Lección Activa',
    },
    en: {
      title: 'Software Development Full Stack',
      coursesTab: '🎓 Courses',
      adsTab: '📢 Ads & Socials',
      engTab: '🛠️ Engineering',
      welcomeTitle: 'Virtual Software & Technology Academy',
      welcomeSubtitle: 'Become a high-level developer with interactive curriculums based on real-world projects.',
      studyNow: 'Study Now',
      enrollCourse: 'Enroll in Course',
      viewSyllabus: 'View Syllabus',
      pendingApproval: 'Enrollment Pending Validation',
      installmentPay: 'Pay Monthly Installment',
      totalInvestment: 'Total Investment',
      monthlyFee: 'Monthly Fee',
      curriculum: 'Syllabus & Curriculums',
      instructor: 'Instructor',
      duration: 'Academic Duration',
      difficulty: 'Difficulty',
      modules: 'Academic Modules',
      activeCourse: 'Active Course',
      interactiveLessons: 'Interactive Lessons',
      aiTutorChat: 'A.I. Tutor Chat',
      quizTitle: 'Self-Assessment Quiz',
      verifyAnswer: 'Verify Answer',
      correctAnswer: 'Correct Answer!',
      incorrectAnswer: 'Incorrect Answer',
      explanation: 'Explanation',
      classroomCode: 'Practical Code Playground',
      loadingTranslation: 'A.I. Translating content...',
      contactWhatsApp: 'Contact for Enrollment',
      mepCertified: 'MEP Costa Rica Certifications',
      allRightsReserved: 'All rights reserved.',
      checkoutTitle: 'Secure Checkout Gateway',
      cardPayment: 'Credit / Debit Card',
      sinpePayment: 'SINPE Móvil / Wire Transfer',
      processPayment: 'Process Secure Payment',
      confirmEnrollment: 'Confirm Enrollment',
      name: 'Full Name',
      email: 'Email Address',
      cardNumber: 'Card Number',
      cardName: 'Name on Card',
      expiry: 'Expiration (MM/YY)',
      cvc: 'Security Code (CVC)',
      paymentSuccess: 'Payment Processed Successfully!',
      paymentDescription: 'Your enrollment has been registered and the content is now fully unlocked.',
      selectCountry: 'Country / Language',
      studyButton: 'Study',
      syllabusDownloaded: 'Syllabus downloaded',
      activeLesson: 'Active Lesson',
    },
    pt: {
      title: 'Software Development Full Stack',
      coursesTab: '🎓 Cursos',
      adsTab: '📢 Divulgação',
      engTab: '🛠️ Engenharia',
      welcomeTitle: 'Academia Virtual de Software e Tecnologia',
      welcomeSubtitle: 'Torne-se um desenvolvedor de alto nível com planos de estudo interativos baseados em projetos reais.',
      studyNow: 'Estudar Agora',
      enrollCourse: 'Matricular no Curso',
      viewSyllabus: 'Ver Conteúdo',
      pendingApproval: 'Matrícula Pendente de Validação',
      installmentPay: 'Pagar Mensalidade',
      totalInvestment: 'Investimento Total',
      monthlyFee: 'Mensalidade',
      curriculum: 'Conteúdo e Plano de Estudos',
      instructor: 'Instrutor(a)',
      duration: 'Duração Acadêmica',
      difficulty: 'Dificuldade',
      modules: 'Módulos Acadêmicos',
      activeCourse: 'Curso Activo',
      interactiveLessons: 'Lições Interativas',
      aiTutorChat: 'Chat com Tutor I.A.',
      quizTitle: 'Questionário de Autoavaliação',
      verifyAnswer: 'Verificar Resposta',
      correctAnswer: 'Resposta Correta!',
      incorrectAnswer: 'Resposta Incorreta',
      explanation: 'Explicação',
      classroomCode: 'Espaço de Código Prático',
      loadingTranslation: 'I.A. Traduzindo conteúdo...',
      contactWhatsApp: 'Contato para Matrícula',
      mepCertified: 'Certificações MEP Costa Rica',
      allRightsReserved: 'Todos os direitos reservados.',
      checkoutTitle: 'Gateway de Pagamento Seguro',
      cardPayment: 'Cartão de Crédito / Débito',
      sinpePayment: 'SINPE Móvil / Transferência',
      processPayment: 'Processar Pagamento Seguro',
      confirmEnrollment: 'Confirmar Matrícula',
      name: 'Nome Completo',
      email: 'E-mail',
      cardNumber: 'Número do Cartão',
      cardName: 'Nome no Cartão',
      expiry: 'Validade (MM/AA)',
      cvc: 'Código de Segurança (CVC)',
      paymentSuccess: 'Pagamento Processado com Sucesso!',
      paymentDescription: 'Sua matrícula foi registrada e o conteúdo já está totalmente desbloqueado.',
      selectCountry: 'País / Idioma',
      studyButton: 'Estudar',
      syllabusDownloaded: 'Syllabus baixado',
      activeLesson: 'Lição Ativa',
    },
    fr: {
      title: 'Software Development Full Stack',
      coursesTab: '🎓 Cours',
      adsTab: '📢 Publicité',
      engTab: '🛠️ Ingénierie',
      welcomeTitle: 'Académie Virtuelle de Logiciel & Technologie',
      welcomeSubtitle: 'Devenez un développeur de haut niveau grâce à des programmes interactifs basés sur des projets réels.',
      studyNow: 'Étudier Maintenant',
      enrollCourse: 'S\'inscrire au Cours',
      viewSyllabus: 'Voir le Programme',
      pendingApproval: 'Inscription en attente de validation',
      installmentPay: 'Payer la Mensualité',
      totalInvestment: 'Investissement Total',
      monthlyFee: 'Frais Mensuels',
      curriculum: 'Syllabus & Programmes d\'Études',
      instructor: 'Instructeur',
      duration: 'Durée Académique',
      difficulty: 'Difficulté',
      modules: 'Modules Académiques',
      activeCourse: 'Cours Actif',
      interactiveLessons: 'Leçons Interactives',
      aiTutorChat: 'Chat avec Tuteur I.A.',
      quizTitle: 'Quiz d\'Auto-évaluation',
      verifyAnswer: 'Vérifier la Réponse',
      correctAnswer: 'Bonne Réponse !',
      incorrectAnswer: 'Mauvaise Réponse',
      explanation: 'Explication',
      classroomCode: 'Espace de Code Pratique',
      loadingTranslation: 'I.A. Traduction du contenu...',
      contactWhatsApp: 'Contact pour Inscription',
      mepCertified: 'Certifications MEP Costa Rica',
      allRightsReserved: 'Tous droits réservés.',
      checkoutTitle: 'Passerelle de Paiement Sécurisée',
      cardPayment: 'Carte de Crédit / Débit',
      sinpePayment: 'SINPE Móvil / Virement',
      processPayment: 'Procéder au Paiement Sécurisé',
      confirmEnrollment: 'Confirmer l\'Inscription',
      name: 'Nom Complet',
      email: 'Adresse E-mail',
      cardNumber: 'Numéro de Carte',
      cardName: 'Nom sur la Carte',
      expiry: 'Date d\'Expiration (MM/AA)',
      cvc: 'Code de Sécurité (CVC)',
      paymentSuccess: 'Paiement Traité avec Succès !',
      paymentDescription: 'Votre inscription a été enregistrée et le contenu est désormais entièrement déverrouillé.',
      selectCountry: 'Pays / Langue',
      studyButton: 'Étudier',
      syllabusDownloaded: 'Syllabus téléchargé',
      activeLesson: 'Leçon Active',
    },
    de: {
      title: 'Software Development Full Stack',
      coursesTab: '🎓 Kurse',
      adsTab: '📢 Werbung',
      engTab: '🛠️ Ingenieurwesen',
      welcomeTitle: 'Virtuelle Software- & Technologie-Akademie',
      welcomeSubtitle: 'Werden Sie ein hochqualifizierter Entwickler mit interaktiven Lehrplänen, die auf realen Projekten basieren.',
      studyNow: 'Jetzt Studieren',
      enrollCourse: 'Kurs Einschreiben',
      viewSyllabus: 'Lehrplan Anzeigen',
      pendingApproval: 'Anmeldung wartet auf Bestätigung',
      installmentPay: 'Monatsrate Bezahlen',
      totalInvestment: 'Gesamtinvestition',
      monthlyFee: 'Monatsgebühr',
      curriculum: 'Lehrplan & Studienpläne',
      instructor: 'Dozent',
      duration: 'Akademische Dauer',
      difficulty: 'Schwierigkeitsgrad',
      modules: 'Akademische Module',
      activeCourse: 'Aktiver Kurs',
      interactiveLessons: 'Interaktive Lektionen',
      aiTutorChat: 'KI-Tutor Chat',
      quizTitle: 'Selbstbeurteilungs-Quiz',
      verifyAnswer: 'Antwort Überprüfen',
      correctAnswer: 'Richtige Antwort!',
      incorrectAnswer: 'Falsche Antwort',
      explanation: 'Erklärung',
      classroomCode: 'Praktischer Code-Spielplatz',
      loadingTranslation: 'KI übersetzt Inhalte...',
      contactWhatsApp: 'Kontakt für Anmeldung',
      mepCertified: 'MEP Costa Rica Zertifizierungen',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      checkoutTitle: 'Sicheres Zahlungs-Gateway',
      cardPayment: 'Kredit- / Debitkarte',
      sinpePayment: 'SINPE Móvil / Überweisung',
      processPayment: 'Sichere Zahlung Abwickeln',
      confirmEnrollment: 'Anmeldung Bestätigen',
      name: 'Vollständiger Name',
      email: 'E-Mail-Adresse',
      cardNumber: 'Kartennummer',
      cardName: 'Name auf der Karte',
      expiry: 'Ablaufdatum (MM/JJ)',
      cvc: 'Sicherheitscode (CVC)',
      paymentSuccess: 'Zahlung Erfolgreich Abgewickelt!',
      paymentDescription: 'Ihre Anmeldung wurde registriert und die Inhalte sind nun freigeschaltet.',
      selectCountry: 'Land / Sprache',
      studyButton: 'Studieren',
      syllabusDownloaded: 'Lehrplan heruntergeladen',
      activeLesson: 'Aktive Lektion',
    }
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[targetLanguage]?.[key] || UI_TRANSLATIONS['es']?.[key] || key;
  };

  const resolveCourseTranslation = (course: Course, lang: string): Course => {
    if (lang === 'es') return course;

    // 1. Check dynamic cache in state
    const cacheKey = `${course.id}-${lang}`;
    if (translatedCourses[cacheKey]) {
      return translatedCourses[cacheKey];
    }

    // 2. Check static pre-translated dictionary
    const staticTrans = STATIC_COURSE_TRANSLATIONS[lang]?.[course.id];
    if (staticTrans) {
      return {
        ...course,
        ...staticTrans,
        modules: staticTrans.modules 
          ? course.modules.map((mod, modIdx) => {
              const staticMod = staticTrans.modules?.[modIdx];
              if (!staticMod) return mod;
              return {
                ...mod,
                ...staticMod,
                topics: staticMod.topics
                  ? mod.topics.map((topic, topicIdx) => {
                      const staticTopic = staticMod.topics?.[topicIdx];
                      if (!staticTopic) return topic;
                      return {
                        ...topic,
                        ...staticTopic,
                        quizQuestion: staticTopic.quizQuestion
                          ? {
                              ...topic.quizQuestion,
                              ...staticTopic.quizQuestion
                            }
                          : topic.quizQuestion
                      };
                    })
                  : mod.topics
              };
            })
          : course.modules
      };
    }

    return course;
  };

  const translateCourseIfNeeded = async (course: Course, lang: string) => {
    if (lang === 'es') return;

    const cacheKey = `${course.id}-${lang}`;
    if (translatedCourses[cacheKey]) return;

    setIsTranslatingCourse(true);
    try {
      const response = await fetch('/api/gemini/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: course,
          targetLanguage: LANGUAGE_NAMES[lang],
          isJsonObject: true
        })
      });

      const data = await response.json();
      if (data.success && data.translated) {
        setTranslatedCourses(prev => ({
          ...prev,
          [cacheKey]: data.translated
        }));
      }
    } catch (error) {
      console.error('Error translating course via Gemini API:', error);
    } finally {
      setIsTranslatingCourse(false);
    }
  };

  const handleCountryChange = async (countryCode: string) => {
    const option = COUNTRY_OPTIONS.find(opt => opt.code === countryCode);
    if (!option) return;

    setSelectedCountry(countryCode);
    setTargetLanguage(option.lang);
    setCurrencySymbol(option.currency as 'CRC' | 'USD');
  };

  // Client inquiry form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientDetails, setClientDetails] = useState('');
  const [submittedBrief, setSubmittedBrief] = useState<any | null>(null);
  const [copiedInquiryText, setCopiedInquiryText] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const [copiedCourseId, setCopiedCourseId] = useState<string | null>(null);
  const [copiedPitchCourseId, setCopiedPitchCourseId] = useState<string | null>(null);
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>('all');
  const [courseSearchTerm, setCourseSearchTerm] = useState<string>('');
  const [salesModalCourse, setSalesModalCourse] = useState<Course | null>(null);
  const [showAllSalesLinksModal, setShowAllSalesLinksModal] = useState<boolean>(false);

  const getCourseCategory = (courseId: string): string => {
    if (['course-postgresql', 'course-nosql', 'course-cloud-db'].includes(courseId)) return 'database';
    if (['course-fs', 'course-react', 'course-nodejs', 'course-html', 'course-python', 'course-cpp'].includes(courseId)) return 'programming';
    if (['course-ai', 'course-ml-pytorch', 'course-r'].includes(courseId)) return 'ai';
    if (['course-cybersecurity', 'course-devops-k8s'].includes(courseId)) return 'devops';
    if (['course-flutter'].includes(courseId)) return 'mobile';
    return 'other';
  };

  const getCourseDirectLink = (courseId: string) => {
    const cleanId = courseId.replace('course-', '');
    const baseUrl = (typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('run.app'))
      ? window.location.origin.replace(/\/+$/, '')
      : 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';
    return `${baseUrl}/?project=academy&course=${cleanId}`;
  };

  const handleCopyCourseLink = (courseId: string) => {
    const urlToCopy = getCourseDirectLink(courseId);
    navigator.clipboard.writeText(urlToCopy);
    setCopiedCourseId(courseId);
    setTimeout(() => setCopiedCourseId(null), 3000);
  };

  const handleCopySalesPitch = (course: Course) => {
    const link = getCourseDirectLink(course.id);
    const pitchText = `🎓 *${course.title}* (${course.durationHours} horas de formación especializada)\n\n` +
      `📖 *Descripción:* ${course.description}\n\n` +
      `📊 *Nivel:* ${course.difficulty} | *Facultad:* ${course.instructor}\n` +
      `💰 *Inversión única:* ₡${course.priceCRC.toLocaleString('es-CR')} CRC / $${course.priceUSD.toLocaleString('en-US')} USD\n\n` +
      `🚀 *Inscríbete y accede de inmediato aquí:* \n${link}\n\n` +
      `✨ Incluye temario oficial descargable en PDF, módulos interactivos con código real, simulador IDE, autoevaluaciones y certificación oficial emitida por FullStack Academy.`;

    navigator.clipboard.writeText(pitchText);
    setCopiedPitchCourseId(course.id);
    setTimeout(() => setCopiedPitchCourseId(null), 3000);
  };

  const handleCopyShareLink = () => {
    const urlToCopy = (typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('run.app'))
      ? window.location.origin.replace(/\/+$/, '')
      : 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';
    if (urlToCopy) {
      navigator.clipboard.writeText(urlToCopy);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 3000);
    }
  };

  const saveAcademyConfig = (updatedFields: Record<string, any>) => {
    try {
      localStorage.setItem('academy_config_cache', JSON.stringify({
        checkoutAcademyPhone,
        fbCustomPhone,
        fbCustomCost,
        fbCustomPromo,
        fbCustomUrl,
        fbCustomWaLink,
        ...updatedFields
      }));
    } catch {}

    fetch('/api/academy-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    })
    .then(r => {
      if (!r.ok) return null;
      return r.json();
    })
    .then(res => {
      if (res) console.log("Academy config saved successfully:", res);
    })
    .catch(err => {
      console.warn("Notice saving academy config to server:", err?.message || err);
    });
  };

  useEffect(() => {
    // Attempt to load from localStorage cache first for instant hydration
    try {
      const cached = localStorage.getItem('academy_config_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.checkoutAcademyPhone) setCheckoutAcademyPhone(parsed.checkoutAcademyPhone);
        if (parsed.fbCustomPhone) setFbCustomPhone(parsed.fbCustomPhone);
        if (parsed.fbCustomCost) setFbCustomCost(parsed.fbCustomCost);
        if (parsed.fbCustomPromo) setFbCustomPromo(parsed.fbCustomPromo);
        if (parsed.fbCustomUrl) setFbCustomUrl(parsed.fbCustomUrl);
        if (parsed.fbCustomWaLink) setFbCustomWaLink(parsed.fbCustomWaLink);
      }
    } catch {}

    // Fetch server-persisted academy configuration
    fetch('/api/academy-config')
      .then(r => {
        if (!r.ok) return null;
        return r.json();
      })
      .then(config => {
        if (config) {
          if (config.checkoutAcademyPhone) setCheckoutAcademyPhone(config.checkoutAcademyPhone);
          if (config.fbCustomPhone) setFbCustomPhone(config.fbCustomPhone);
          if (config.fbCustomCost) setFbCustomCost(config.fbCustomCost);
          if (config.fbCustomPromo) setFbCustomPromo(config.fbCustomPromo);
          if (config.fbCustomUrl) setFbCustomUrl(config.fbCustomUrl);
          if (config.fbCustomWaLink) setFbCustomWaLink(config.fbCustomWaLink);
          try {
            localStorage.setItem('academy_config_cache', JSON.stringify(config));
          } catch {}
        }
      })
      .catch(err => console.warn("Using local academy configuration:", err?.message || err));

    if (typeof window !== 'undefined') {
      const originPath = (window.location.origin && window.location.origin.includes('run.app'))
        ? window.location.origin.replace(/\/+$/, '')
        : 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';
      setShareUrl(originPath);

      // Parse query parameters or hash for specific courses
      const params = new URLSearchParams(window.location.search);
      const hash = (window.location.hash || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      const courseQuery = params.get('course');
      const viewQuery = params.get('view');
      const subjectQuery = params.get('subject');
      const tabQuery = params.get('tab');
      const projectQuery = (params.get('project') || params.get('app') || '').toLowerCase();

      // If opening Play & Earn, StreamPAY, survey, or any independent project, bypass courses router completely
      if (
        projectQuery === 'playearn' ||
        projectQuery === 'play-earn' ||
        projectQuery === 'playandearn' ||
        projectQuery === 'juegos' ||
        projectQuery === 'ganar-dinero' ||
        projectQuery === 'dinero' ||
        hash.includes('playearn') ||
        pathname.includes('/playearn') ||
        projectQuery === 'streampay' ||
        projectQuery === 'stream' ||
        projectQuery === 'passmedia' ||
        projectQuery === 'monetik' ||
        projectQuery === 'encuesta' ||
        tabQuery === 'campaign' ||
        tabQuery === 'encuesta' ||
        tabQuery === 'preregistro' ||
        tabQuery === 'streampay' ||
        params.has('encuesta') ||
        params.has('streampay') ||
        params.has('campaign') ||
        hash.includes('streampay') ||
        hash.includes('encuesta') ||
        hash.includes('campaign') ||
        hash.includes('preregistro') ||
        pathname.includes('/streampay') ||
        pathname.includes('/encuesta') ||
        projectQuery === 'trading' ||
        projectQuery === 'travel' ||
        projectQuery === 'fintech'
      ) {
        return;
      }

      if (viewQuery === 'certificate' || viewQuery === 'certificado' || viewQuery === 'titulo' || projectQuery === 'certificate' || hash === '#certificate' || hash === '#titulo') {
        setViewMode('certificate');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else if (viewQuery === 'geometria' || viewQuery === 'poligonos' || viewQuery === 'figuras' || projectQuery === 'geometria' || hash === '#geometria' || hash === '#poligonos') {
        setViewMode('geometria');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else if (viewQuery === 'sexto-grado' || viewQuery === 'sextogrado' || projectQuery === 'sexto-grado' || projectQuery === 'sociales-1948' || hash === '#sexto-grado' || hash === '#sociales') {
        setViewMode('sexto-grado');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        const isFintechQuery = courseQuery === 'fintech' || 
                               courseQuery === 'course-fintech' || 
                               hash === '#fintech' || 
                               hash === '#course-fintech';
        
        if (isFintechQuery) {
          const fintechCourse = COURSES.find(c => c.id === 'course-fintech');
          if (fintechCourse) {
            setViewMode('student');
            setActiveCourseInWorkspace(fintechCourse);
            if (fintechCourse.modules[0]?.topics[0]) {
              setActiveTopic(fintechCourse.modules[0].topics[0]);
              setSelectedTopicKey('course-fintech-0-0');
            }
            setTimeout(() => {
              const el = document.getElementById('courses');
              el?.scrollIntoView({ behavior: 'smooth' });
            }, 400);
          }
        } else if (courseQuery) {
          const matchedCourse = COURSES.find(c => c.id === `course-${courseQuery}` || c.id === courseQuery);
          if (matchedCourse) {
            setViewMode('student');
            setActiveCourseInWorkspace(matchedCourse);
            if (matchedCourse.modules[0]?.topics[0]) {
              setActiveTopic(matchedCourse.modules[0].topics[0]);
              setSelectedTopicKey(`${matchedCourse.id}-0-0`);
            }
            setTimeout(() => {
              const el = document.getElementById('courses');
              el?.scrollIntoView({ behavior: 'smooth' });
            }, 400);
          }
        }
      }
    }
  }, []);

  // Helper to accurately resolve active project from URL, hash, or pathname
  const detectActiveProjectFromLocation = (): 'hub' | 'trading' | 'streampay' | 'academy' | 'fintech' | 'travel' | 'certificate' | 'playearn' => {
    if (typeof window === 'undefined') return 'hub';
    const params = new URLSearchParams(window.location.search);
    const proj = (params.get('project') || params.get('app') || '').toLowerCase();
    const v = (params.get('view') || '').toLowerCase();
    const tab = (params.get('tab') || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();
    const pathname = (window.location.pathname || '').toLowerCase();

    // 0. EXPLICIT PROJECT OVERRIDES FIRST
    // When ?project= or ?app= is specifically set, honor that exact project!
    if (
      proj === 'playearn' || 
      proj === 'play-earn' || 
      proj === 'playandearn' || 
      proj === 'juegos' || 
      proj === 'ganar-dinero' || 
      proj === 'dinero' ||
      hash.includes('playearn') || 
      pathname.includes('/playearn')
    ) {
      return 'playearn';
    }

    if (proj === 'trading' || proj === 'trade' || proj === 'bot' || proj === 'quant' || hash.includes('trading') || pathname.includes('/trading')) {
      return 'trading';
    }

    if (proj === 'travel' || proj === 'landforest' || proj === 'agencia' || hash.includes('travel') || pathname.includes('/travel')) {
      return 'travel';
    }

    if (proj === 'fintech' || proj === 'cardpay' || proj === 'banco' || hash.includes('fintech') || pathname.includes('/fintech')) {
      return 'fintech';
    }

    if (proj === 'certificate' || proj === 'certificado' || proj === 'titulo' || v === 'certificate' || v === 'certificado' || hash.includes('certificate')) {
      return 'certificate';
    }

    if (
      proj === 'streampay' || 
      proj === 'stream' || 
      proj === 'passmedia' || 
      proj === 'monetik' ||
      proj === 'encuesta' ||
      v === 'streampay' || 
      v === 'encuesta' || 
      tab === 'campaign' || 
      tab === 'encuesta' || 
      tab === 'preregistro' || 
      tab === 'streampay' ||
      params.has('encuesta') ||
      params.has('streampay') ||
      params.has('campaign') ||
      hash.includes('streampay') || 
      hash.includes('encuesta') || 
      hash.includes('campaign') || 
      hash.includes('preregistro') ||
      pathname.includes('/streampay') ||
      pathname.includes('/encuesta') ||
      pathname.includes('/campaign') ||
      pathname.includes('/preregistro')
    ) {
      return 'streampay';
    }

    // 1. Direct Academy & Educational Submodules Priority check
    if (
      params.has('course') || hash.includes('course') ||
      proj === 'academy' || proj === 'academia' || proj === 'cursos' || proj === 'aula' || proj === 'aula-virtual' || proj === 'aulavirtual' || pathname.includes('/academy') || pathname.includes('/aula') ||
      proj === 'sexto-grado' || proj === 'sextogrado' || v === 'sexto-grado' || v === 'sexto' || hash.includes('sexto-grado') ||
      proj === 'sociales' || proj === 'sociales-1948' || proj === '1948' || v === 'sociales' || v === 'sociales-1948' || hash.includes('sociales') || hash.includes('1948') ||
      proj === 'geometria' || proj === 'poligonos' || proj === 'figuras' || (v === 'geometria' && proj !== 'streampay') ||
      v === 'student' || v === 'teacher' || v === 'aula' || v === 'aula-virtual' || v === 'aulavirtual' || hash.includes('aula') || hash.includes('academy') || hash.includes('academia') || hash.includes('student')
    ) {
      return 'academy';
    }

    if (proj === 'hub' || hash.includes('hub')) return 'hub';

    return 'hub';
  };

  // === ROOT NAVIGATION ===
  const [activeProject, setActiveProject] = useState<'hub' | 'trading' | 'streampay' | 'academy' | 'fintech' | 'travel' | 'certificate' | 'playearn'>(() => {
    return detectActiveProjectFromLocation();
  });

  // Modal para ver y desplegar Startups de forma limpia y transparente
  const [isStartupsModalOpen, setIsStartupsModalOpen] = useState<boolean>(false);

  const changeActiveProject = (project: 'hub' | 'trading' | 'streampay' | 'academy' | 'fintech' | 'travel' | 'certificate' | 'playearn') => {
    setActiveProject(project);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (project === 'hub') {
        url.searchParams.delete('project');
        url.searchParams.delete('app');
        url.searchParams.delete('view');
        url.searchParams.delete('tab');
      } else {
        url.searchParams.set('project', project);
        url.searchParams.delete('app');
        url.searchParams.delete('view');
        if (project !== 'streampay') {
          url.searchParams.delete('tab');
        }
      }
      window.history.pushState(null, '', url.pathname + url.search);
    }
  };

  // Despliegue de Startup directo a pantalla completa
  const handleDeployStartup = (startup: StartupItem) => {
    changeActiveProject(startup.project);
    if (startup.viewMode) {
      changeViewMode(startup.viewMode);
    }
    if (startup.extraParams) {
      const url = new URL(window.location.href);
      Object.entries(startup.extraParams).forEach(([k, v]) => {
        url.searchParams.set(k, v);
      });
      window.history.pushState(null, '', url.pathname + url.search);
      window.dispatchEvent(new Event('popstate'));
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 80);
  };

  const handleOpenStartupNewTab = (queryStr: string) => {
    if (typeof window !== 'undefined') {
      const fullUrl = getCleanStartupUrl(queryStr);
      window.open(fullUrl, '_blank');
    }
  };

  const [hubCopiedMathLink, setHubCopiedMathLink] = useState(false);
  const [hubCopiedTradingLink, setHubCopiedTradingLink] = useState(false);
  const [hubCopiedAcademyLink, setHubCopiedAcademyLink] = useState(false);
  const [hubCopiedPlayEarnLink, setHubCopiedPlayEarnLink] = useState(false);
  const navigateToMathAcademy = (subtopic: string = 'geometria') => {
    setActiveProject('streampay');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('project', 'streampay');
      url.searchParams.set('tab', 'math');
      url.searchParams.set('subtopic', subtopic);
      window.history.pushState(null, '', url.pathname + url.search);
    }
  };

  const handleCopyMathDirectLink = () => {
    if (typeof window !== 'undefined') {
      const fullUrl = getCleanStartupUrl('?project=geometria');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(fullUrl);
      }
      setHubCopiedMathLink(true);
      setTimeout(() => setHubCopiedMathLink(false), 4000);
    }
  };

  const [copiedStartupKey, setCopiedStartupKey] = useState<string | null>(null);
  const [sharedStartupKey, setSharedStartupKey] = useState<string | null>(null);
  const [hubShareToast, setHubShareToast] = useState<{ title: string; url: string } | null>(null);

  const handleCopyStartupUrl = (key: string, queryStr: string) => {
    if (typeof window !== 'undefined') {
      const fullUrl = getCleanStartupUrl(queryStr);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(fullUrl);
      }
      setCopiedStartupKey(key);
      setHubShareToast({ title: key, url: fullUrl });
      setTimeout(() => setCopiedStartupKey(null), 3000);
      setTimeout(() => setHubShareToast(null), 3500);
    }
  };

  const handleShareStartupDirect = async (startup: { id: string; name: string; tagline?: string; queryStr: string }) => {
    const fullUrl = getCleanStartupUrl(startup.queryStr);
    const title = startup.name;
    const text = `🚀 *${startup.name}*\n${startup.tagline || 'Plataforma Oficial'}\n\n🔗 Enlace de acceso en vivo:\n${fullUrl}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Plataforma Oficial`,
          text: `Te comparto ${startup.name}`,
          url: fullUrl
        });
        setSharedStartupKey(startup.id);
        setHubShareToast({ title: startup.name, url: fullUrl });
        setTimeout(() => setSharedStartupKey(null), 3000);
        setTimeout(() => setHubShareToast(null), 3500);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log('Error sharing:', err);
        }
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedStartupKey(startup.id);
    setSharedStartupKey(startup.id);
    setHubShareToast({ title: startup.name, url: fullUrl });
    setTimeout(() => {
      setCopiedStartupKey(null);
      setSharedStartupKey(null);
    }, 3000);
    setTimeout(() => setHubShareToast(null), 3500);
  };

  const handleWhatsAppShareDirect = (startup: { name: string; tagline?: string; queryStr: string }) => {
    const fullUrl = getCleanStartupUrl(startup.queryStr);
    const msg = encodeURIComponent(`🚀 *${startup.name}*\n${startup.tagline || 'Plataforma Oficial'}\n\n👉 Enlace oficial para clientes e inversionistas:\n${fullUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const handleShareFeaturedStartup = async (projectKey: string, name: string, description: string) => {
    const query = `?project=${projectKey}`;
    const fullUrl = getCleanStartupUrl(query);
    const text = `🚀 *${name}*\n${description}\n\n🔗 Enlace directo oficial:\n${fullUrl}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${name} | Plataforma Oficial`,
          text: description,
          url: fullUrl
        });
        setSharedStartupKey(projectKey);
        setHubShareToast({ title: name, url: fullUrl });
        setTimeout(() => setSharedStartupKey(null), 3000);
        setTimeout(() => setHubShareToast(null), 3500);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log('Error sharing:', err);
        }
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setSharedStartupKey(projectKey);
    setHubShareToast({ title: name, url: fullUrl });
    setTimeout(() => {
      setSharedStartupKey(null);
      setHubShareToast(null);
    }, 3500);
  };

  // === CURSOS Y ACADEMIA STATES ===
  const [unlockedCourseIds, setUnlockedCourseIds] = useState<string[]>([
    'course-fs', 'course-react', 'course-nodejs', 'course-graphic-design',
    'course-html', 'course-python', 'course-cpp', 'course-r',
    'course-fintech', 'course-ai', 'course-cybersecurity', 'course-english', 'course-math6'
  ]); // Todos los cursos y prácticas desbloqueados por defecto para que la hija y cualquier usuario tengan acceso completo inmediato
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'student' | 'teacher' | 'facebook' | 'engineering' | 'sexto-grado' | 'certificate' | 'geometria'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = (params.get('view') || params.get('tab') || '').toLowerCase();
      const proj = (params.get('project') || params.get('app') || '').toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (v === 'sociales' || v === 'sociales-1948' || proj === 'sociales' || proj === 'sociales-1948' || hash.includes('sociales') || hash.includes('1948')) return 'sexto-grado';
      if (v === 'geometria' || v === 'poligonos' || v === 'figuras' || proj === 'geometria' || hash.includes('geometria') || hash.includes('poligonos')) return 'geometria';
      if (v === 'certificate' || v === 'certificado' || proj === 'certificate' || proj === 'certificado') return 'certificate';
      if (v === 'sexto-grado' || v === 'sextogrado' || v === 'sexto' || proj === 'sexto-grado' || proj === 'sextogrado' || proj === 'sexto' || hash.includes('sexto-grado')) return 'sexto-grado';
      if (v === 'engineering' || proj === 'engineering') return 'engineering';
      if (v === 'teacher') return 'teacher';
      if (v === 'facebook') return 'facebook';
      if (v === 'student' || proj === 'academy' || proj === 'academia' || proj === 'aula' || proj === 'aula-virtual' || proj === 'aulavirtual' || v === 'aula' || v === 'aula-virtual') return 'student';
    }
    return 'student';
  });

  // URL synchronization on back/forward or programmatic navigation
  useEffect(() => {
    const handleUrlSync = () => {
      if (typeof window === 'undefined') return;
      const detected = detectActiveProjectFromLocation();
      setActiveProject(detected);

      const params = new URLSearchParams(window.location.search);
      const v = (params.get('view') || params.get('tab') || '').toLowerCase();
      const proj = (params.get('project') || params.get('app') || '').toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (v === 'sociales' || v === 'sociales-1948' || proj === 'sociales' || proj === 'sociales-1948' || hash.includes('sociales') || hash.includes('1948')) setViewMode('sexto-grado');
      else if (v === 'geometria' || v === 'poligonos' || v === 'figuras' || proj === 'geometria' || hash.includes('geometria') || hash.includes('poligonos')) setViewMode('geometria');
      else if (v === 'certificate' || v === 'certificado' || proj === 'certificate' || proj === 'certificado') setViewMode('certificate');
      else if (v === 'sexto-grado' || v === 'sextogrado' || v === 'sexto' || proj === 'sexto-grado' || proj === 'sextogrado' || hash.includes('sexto-grado')) setViewMode('sexto-grado');
      else if (v === 'engineering' || proj === 'engineering') setViewMode('engineering');
      else if (v === 'teacher') { setViewMode('teacher'); setIsAdminMode(true); }
      else if (v === 'facebook') setViewMode('facebook');
      else if (v === 'student' || proj === 'academy' || proj === 'academia' || proj === 'aula' || proj === 'aula-virtual' || proj === 'aulavirtual' || v === 'aula' || v === 'aula-virtual') setViewMode('student');
    };

    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  const changeViewMode = (mode: 'student' | 'teacher' | 'facebook' | 'engineering' | 'sexto-grado' | 'certificate' | 'geometria') => {
    setViewMode(mode);
    setIsAdminMode(mode === 'teacher');
    
    // Update the URL to make it easily shareable and linkable!
    if (typeof window !== 'undefined') {
      if (mode === 'student') {
        window.history.pushState(null, '', '?project=academy');
      } else {
        window.history.pushState(null, '', `?project=academy&view=${mode}`);
      }
    }

    if (mode === 'engineering' || mode === 'sexto-grado' || mode === 'certificate' || mode === 'geometria') {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };
  const [pendingEnrollments, setPendingEnrollments] = useState<Array<{
    id: string;
    studentName: string;
    studentEmail: string;
    courseId: string;
    courseTitle: string;
    paymentMethod: 'card' | 'sinpe';
    amount: number;
    date: string;
    reference: string;
    status: 'pending' | 'approved';
  }>>([
    {
      id: "MTR-8219",
      studentName: "Andrés Delgado",
      studentEmail: "andres.d@gmail.com",
      courseId: "course-react",
      courseTitle: "Desarrollo con React & TypeScript",
      paymentMethod: 'sinpe',
      amount: 45000,
      date: new Date().toLocaleDateString('es-CR'),
      reference: "Comprobante SINPE #9948",
      status: 'pending'
    }
  ]);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [activeCourseInWorkspace, setActiveCourseInWorkspace] = useState<Course | null>(null);

  // --- Teacher View Security & Certificate State ---
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('isTeacherUnlocked') === 'true';
  });
  const [teacherPinInput, setTeacherPinInput] = useState<string>('');
  const [teacherPinError, setTeacherPinError] = useState<string>('');
  const [teacherSubTab, setTeacherSubTab] = useState<'enrollments' | 'certificates' | 'facebook'>('enrollments');
  const [issuedCertificates, setIssuedCertificates] = useState<Array<{
    id: string;
    studentName: string;
    studentEmail: string;
    technicalCareer: string;
    issueDate: string;
    distinction: string;
    verificationCode: string;
  }>>(() => {
    const saved = localStorage.getItem('issuedCertificates');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: "CERT-2026-001",
        studentName: "Mariana Rojas Castro",
        studentEmail: "mari.rojas@outlook.com",
        technicalCareer: "Técnico Profesional en Desarrollo Full-Stack & Agentes",
        issueDate: "30/06/2026",
        distinction: "Graduada con Honores • Summa Cum Laude",
        verificationCode: "MTR-DS-8849-2026"
      },
      {
        id: "CERT-2026-002",
        studentName: "Carlos Arguedas Solano",
        studentEmail: "carguedas@gmail.com",
        technicalCareer: "Técnico Especialista en Ciberseguridad & Pentesting",
        issueDate: "28/06/2026",
        distinction: "Aprobado con Excelente Rendimiento",
        verificationCode: "MTR-CS-2391-2026"
      }
    ];
  });

  const [newCertStudentName, setNewCertStudentName] = useState('');
  const [newCertStudentEmail, setNewCertStudentEmail] = useState('');
  const [newCertCareer, setNewCertCareer] = useState('Técnico Profesional en Desarrollo Full-Stack & Agentes');
  const [newCertDistinction, setNewCertDistinction] = useState('Graduado(a) con Honores (Summa Cum Laude)');
  const [newCertDate, setNewCertDate] = useState(new Date().toLocaleDateString('es-CR'));
  const [selectedCertificateForView, setSelectedCertificateForView] = useState<any | null>(null);

  // Sync certificates to localstorage
  useEffect(() => {
    localStorage.setItem('issuedCertificates', JSON.stringify(issuedCertificates));
  }, [issuedCertificates]);

  const handleTeacherUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherPinInput === '7019' || teacherPinInput.toLowerCase() === 'admin') {
      setIsTeacherUnlocked(true);
      setTeacherPinError('');
      localStorage.setItem('isTeacherUnlocked', 'true');
    } else {
      setTeacherPinError('Código PIN de seguridad incorrecto. Intente de nuevo.');
    }
  };

  const handleTeacherLock = () => {
    setIsTeacherUnlocked(false);
    setTeacherPinInput('');
    localStorage.removeItem('isTeacherUnlocked');
  };

  useEffect(() => {
    if (activeCourseInWorkspace) {
      translateCourseIfNeeded(activeCourseInWorkspace, targetLanguage);
    }
  }, [activeCourseInWorkspace, targetLanguage]);
  const [activeTopic, setActiveTopic] = useState<CourseTopic | null>(null);
  const [selectedTopicKey, setSelectedTopicKey] = useState<string | null>(null); // "courseId-modIdx-topicIdx"
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState<boolean>(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean | null>(null);

  // AI Chat Assistant / Tutor states
  const [workspaceActiveTab, setWorkspaceActiveTab] = useState<'lesson' | 'ai-tutor' | 'simulator'>('lesson');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; timestamp: string }>>([
    {
      sender: 'ai',
      text: '¡Hola! Soy el Profesor Albert Einstein, tu tutor pedagógico de Inteligencia Artificial en la Academia Full Stack. 🧠✨ "El aprendizaje es experiencia, todo lo demás es solo información." Pregúntame sobre cualquier concepto de programación, código, dudas de lógica o ejercicios prácticos de tu lección y con gusto te guiaré paso a paso.',
      timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiIsLoading, setAiIsLoading] = useState(false);
  
  // Checkout states
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState<'card' | 'sinpe'>('sinpe'); // Por defecto SINPE móvil ya que es el más real y común
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutCardNum, setCheckoutCardNum] = useState('');
  const [checkoutCardName, setCheckoutCardName] = useState('');
  const [checkoutCardExpiry, setCheckoutCardExpiry] = useState('');
  const [checkoutCardCvc, setCheckoutCardCvc] = useState('');
  const [checkoutSinpePhone, setCheckoutSinpePhone] = useState('');
  const [checkoutSinpeSender, setCheckoutSinpeSender] = useState('');
  const [checkoutSinpeComprobante, setCheckoutSinpeComprobante] = useState('');
  const [checkoutSinpeFileName, setCheckoutSinpeFileName] = useState('');
  const [checkoutAcademyPhone, setCheckoutAcademyPhone] = useState('+506 7019-3160'); // Teléfono por defecto de la Academia
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState<string>('');
  const [lastEnrollmentId, setLastEnrollmentId] = useState<string>('');
  const [checkoutPriceOverride, setCheckoutPriceOverride] = useState<string>('');
  const [simulatedBank, setSimulatedBank] = useState<'bac' | 'bcr' | 'bncr' | 'davivienda'>('bac');
  const [simulatedSenderPhone, setSimulatedSenderPhone] = useState('8888-7777');
  const [simulatedVoucherGenerated, setSimulatedVoucherGenerated] = useState(false);
  const [simulatedReferenceCode, setSimulatedReferenceCode] = useState('');
  
  // States for Graphic Design Monthly Installments (6-month course, 35,000 colones per month)
  const [graphicDesignPaidMonths, setGraphicDesignPaidMonths] = useState<Record<number, boolean>>({
    0: false, // Todos bloqueados al inicio para cumplir con que deban pagar primero
    1: false, // Month 2 is locked
    2: false, // Month 3 is locked
    3: false, // Month 4 is locked
    4: false, // Month 5 is locked
    5: false, // Month 6 is locked
  });
  
  // States for course monthly installments (₡35,000 colones per month, fijos!)
  const [coursePaidMonths, setCoursePaidMonths] = useState<Record<string, Record<number, boolean>>>({
    'course-graphic-design': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-fs': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-python': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-cpp': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-r': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-nodejs': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-react': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-html': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    'course-fintech': { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
  });
  const [checkoutMonthIndex, setCheckoutMonthIndex] = useState<number | null>(null); // null = full course purchase, 0-5 = specific month installment
  const [currentMotivationMessage, setCurrentMotivationMessage] = useState('');

  // States for Facebook Post & Mini Interface Generator
  const [fbSelectedCourseId, setFbSelectedCourseId] = useState<string>('course-fintech');
  const [fbCustomPhone, setFbCustomPhone] = useState<string>('506 7019-3160');
  const [fbCustomCost, setFbCustomCost] = useState<number>(35000);
  const [fbCustomPromo, setFbCustomPromo] = useState<string>('🔥 ¡ÚLTIMOS CUPOS CON DESCUENTO DE MATRÍCULA DE APERTURA! 🔥');
  const [fbCustomUrl, setFbCustomUrl] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('run.app')) {
      return window.location.origin.replace(/\/+$/, '');
    }
    return 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';
  });
  const [fbCustomWaLink, setFbCustomWaLink] = useState<string>(() => {
    // Generar un Wa.link o wa.me por defecto con el teléfono del facilitador
    return 'https://wa.link/ykdhlk';
  });
  const [copiedFbText, setCopiedFbText] = useState<boolean>(false);
  const [copiedFbImage, setCopiedFbImage] = useState<boolean>(false);
  const [isCopyingImage, setIsCopyingImage] = useState<boolean>(false);
  const [isCapturingAd, setIsCapturingAd] = useState<boolean>(false);
  const [fbNotification, setFbNotification] = useState<{ show: boolean; courseTitle: string; url: string } | null>(null);
  const [blockedDownloadCourse, setBlockedDownloadCourse] = useState<Course | null>(null);
  const [showFloatingClientBanner, setShowFloatingClientBanner] = useState<boolean>(true);
  const [copiedFloatingBannerText, setCopiedFloatingBannerText] = useState<boolean>(false);
  const [marketingMode, setMarketingMode] = useState<'facebook' | 'youtube'>('facebook');
  const [copiedYtText, setCopiedYtText] = useState<boolean>(false);
  const [youtubeVibe, setYoutubeVibe] = useState<'academic' | 'sales' | 'short'>('academic');

  // === CURSOS Y ACADEMIA FUNCIONES ===
  const handleCaptureAdFlyer = async () => {
    const element = document.getElementById('facebook-flyer-capture');
    if (!element) return;
    try {
      setIsCapturingAd(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0c0a09',
        scale: 2.5,
      });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const course = COURSES.find(c => c.id === fbSelectedCourseId) || COURSES[0];
      link.download = `Anuncio_Academia_${course.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error capturing ad flyer:', error);
    } finally {
      setIsCapturingAd(false);
    }
  };

  const handleCopyAdFlyerImage = async () => {
    const element = document.getElementById('facebook-flyer-capture');
    if (!element) return;
    try {
      setIsCopyingImage(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0c0a09',
        scale: 2.0,
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("No se pudo generar el Blob de la imagen");
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          setCopiedFbImage(true);
          setTimeout(() => setCopiedFbImage(false), 3000);
        } catch (clipboardErr) {
          console.warn("Fallo al copiar imagen al portapapeles directamente. Guardando como descarga de seguridad...", clipboardErr);
          // Fallback download if navigator.clipboard.write isn't fully permitted or active inside preview frame
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          const course = COURSES.find(c => c.id === fbSelectedCourseId) || COURSES[0];
          link.download = `Anuncio_Academia_${course.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
          link.href = imgData;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setCopiedFbImage(true);
          setTimeout(() => setCopiedFbImage(false), 3000);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error copying ad flyer image:', error);
    } finally {
      setIsCopyingImage(false);
    }
  };

  const handleSimulateClientClick = () => {
    const course = COURSES.find(c => c.id === fbSelectedCourseId) || COURSES[0];
    
    // Switch to student view
    changeViewMode('student');
    
    // Set active course in workspace so they enter the information immediately
    setActiveCourseInWorkspace(course);
    
    // Trigger floating notification
    setFbNotification({
      show: true,
      courseTitle: course.title,
      url: fbCustomUrl
    });
    
    // Scroll smoothly to academy section / active course info
    setTimeout(() => {
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleFacebookLinkClick = (e: React.MouseEvent, url: string, courseId: string) => {
    e.preventDefault();
    
    // 1. Switch to 'student' mode
    setViewMode('student');

    // 2. Select course & set active lesson to simulate landing on the course page
    const selectedCourse = COURSES.find(c => c.id === courseId);
    if (selectedCourse) {
      setActiveCourseInWorkspace(selectedCourse);
      if (selectedCourse.modules[0]?.topics[0]) {
        handleSelectTopic(selectedCourse.modules[0].topics[0], `${selectedCourse.id}-0-0`);
      }
    }

    // 3. Show notification
    setFbNotification({
      show: true,
      courseTitle: selectedCourse ? selectedCourse.title : 'Especialización Seleccionada',
      url: url
    });

    // 4. Try opening the URL in a new window (in case browser popups are allowed)
    if (typeof window !== 'undefined') {
      try {
        let targetUrl = url;
        const currentHref = window.location.href;
        // Si estamos en entorno de desarrollo (-dev-) pero el enlace apunta a (-pre-),
        // lo convertimos a -dev- para que la pestaña se abra correctamente sin dar error de página.
        if (currentHref.includes('-dev-') && targetUrl.includes('-pre-')) {
          targetUrl = targetUrl.replace('-pre-', '-dev-');
        }
        window.open(targetUrl, '_blank');
      } catch (err) {
        console.error("Popup blocked or not permitted in sandbox.", err);
      }
    }

    // 5. Scroll down to Section 4
    setTimeout(() => {
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleDownloadSyllabus = (course: Course) => {
    const isUnlocked = unlockedCourseIds.includes(course.id) || isTeacherUnlocked;
    if (!isUnlocked && !isAdminMode) {
      setBlockedDownloadCourse(course);
      return;
    }

    let text = `====================================================\n`;
    text += `   FULLSTACK ACADEMY - TEMARIO OFICIAL DE CURSO\n`;
    text += `====================================================\n\n`;
    text += `📚 Curso: ${course.title}\n`;
    text += `⏱️ Duración: ${course.durationHours} horas académicas\n`;
    text += `📈 Dificultad: ${course.difficulty}\n`;
    text += `💰 Inversión mensual / única: ₡${course.priceCRC.toLocaleString('es-CR')} CRC / $${course.priceUSD} USD\n`;
    text += `💬 Contacto para Matrícula: https://wa.me/50670193160\n\n`;
    text += `----------------------------------------------------\n`;
    text += `📝 ESTRUCTURA DE MÓDULOS Y CONTENIDO DEL CURSO\n`;
    text += `----------------------------------------------------\n\n`;
    course.modules.forEach((mod, modIdx) => {
      text += `📂 MÓDULO ${modIdx + 1}: ${mod.title}\n`;
      text += `⏱️ Duración Módulo: ${mod.duration}\n\n`;
      mod.topics.forEach((topic, topicIdx) => {
        text += `   🔹 Lección ${topicIdx + 1}: ${topic.title}\n`;
        text += `      📄 Contenido Teórico:\n`;
        text += `      ${topic.content.replace(/\n/g, '\n      ')}\n\n`;
        text += `      💻 Código Práctico & Ejemplos:\n`;
        text += `      [El código fuente de ejemplo y proyectos guiados están reservados para estudiantes activos durante las lecciones]\n\n`;
      });
      text += `----------------------------------------------------\n`;
    });
    text += `\n© 2026 FullStack Studio. Reservados todos los derechos.\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Syllabus_${course.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTerminalLogs(prev => [
      `💾 [SISTEMA] Archivo del temario generado y descargado con éxito para: ${course.title}`,
      ...prev
    ]);
  };

  const sendAiMessageText = async (text: string) => {
    if (aiIsLoading || !text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: text,
      timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
    };

    setAiMessages(prev => [...prev, userMsg]);
    setAiIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          lessonTitle: activeTopic?.title || '',
          lessonContent: activeTopic?.content || '',
          history: aiMessages.slice(-10).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiMessages(prev => [
          ...prev,
          {
            sender: 'ai' as const,
            text: data.text,
            timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setAiMessages(prev => [
          ...prev,
          {
            sender: 'ai' as const,
            text: `Lo siento, ocurrió un error al procesar tu solicitud: ${data.message || 'Error desconocido'}.`,
            timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (error: any) {
      console.error("AI Assistant request failed:", error);
      setAiMessages(prev => [
        ...prev,
        {
          sender: 'ai' as const,
          text: `Hubo un problema de conexión con el servidor del Tutor de Inteligencia Artificial. Por favor, inténtalo de nuevo más tarde.`,
          timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setAiIsLoading(false);
    }
  };

  const handleSendAiMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim() || aiIsLoading) return;
    const query = aiInput;
    setAiInput('');
    await sendAiMessageText(query);
  };

  const handleSelectTopic = (topic: CourseTopic, key: string) => {
    setActiveTopic(topic);
    setSelectedTopicKey(key);
    setQuizSelectedOption(null);
    setQuizIsAnswered(false);
    setIsQuizCorrect(null);
  };

  const handleVerifyQuiz = () => {
    if (!activeTopic || !activeTopic.quizQuestion || quizSelectedOption === null) return;
    setQuizIsAnswered(true);
    const correct = quizSelectedOption === activeTopic.quizQuestion.answerIndex;
    setIsQuizCorrect(correct);

    // Push quiz event log to the API console
    const timestamp = new Date().toLocaleTimeString('es-CR');
    setTerminalLogs(prev => [
      ...prev,
      `✏️ [${timestamp}] [ACADEMIA] Resp. de Cuestionario: "${activeTopic.title}" | Enviada Opción: [${quizSelectedOption}] | Resultado: ${correct ? 'APROBADO ✓' : 'INCORRECTO ✗'}`
    ]);
  };

  const handleStartCheckout = (course: Course) => {
    setCheckoutCourse(course);
    setCheckoutMonthIndex(null);
    setCheckoutEmail(clientEmail || 'cliente@estudiante.cr');
    setCheckoutName(clientName || 'Estudiante Full-Stack');
    setCheckoutCardNum('');
    setCheckoutSinpePhone('');
    setCheckoutSinpeSender(clientName || '');
    setCheckoutSinpeComprobante('');
    setCheckoutSinpeFileName('');
    setCheckoutStatus('idle');
    const defaultPrice = currencySymbol === 'CRC' ? course.priceCRC.toString() : course.priceUSD.toString();
    setCheckoutPriceOverride(defaultPrice);
    setSimulatedVoucherGenerated(false);
    setSimulatedReferenceCode(Math.floor(10000000 + Math.random() * 90000000).toString());
    setSimulatedSenderPhone('8888-7777');
    setSimulatedBank('bac');
  };

  const handleStartMonthlyCheckout = (course: Course, monthIdx: number) => {
    setCheckoutCourse(course);
    setCheckoutMonthIndex(monthIdx);
    setCheckoutEmail(clientEmail || 'cliente@estudiante.cr');
    setCheckoutName(clientName || 'Estudiante de Diseño');
    setCheckoutCardNum('');
    setCheckoutSinpePhone('');
    setCheckoutSinpeSender(clientName || '');
    setCheckoutSinpeComprobante('');
    setCheckoutSinpeFileName('');
    setCheckoutStatus('idle');
    const defaultPrice = currencySymbol === 'CRC' ? '35000' : '68';
    setCheckoutPriceOverride(defaultPrice);
    setSimulatedVoucherGenerated(false);
    setSimulatedReferenceCode(Math.floor(10000000 + Math.random() * 90000000).toString());
    setSimulatedSenderPhone('8888-7777');
    setSimulatedBank('bac');
  };

  const handleProcessCheckout = () => {
    if (!checkoutCourse) return;
    setCheckoutStatus('processing');

    const amount = parseFloat(checkoutPriceOverride) || (currencySymbol === 'CRC' ? checkoutCourse.priceCRC : checkoutCourse.priceUSD);
    const currency = currencySymbol;
    const dateStr = new Date().toLocaleString('es-CR');
    const isMonthly = checkoutMonthIndex !== null;
    const itemTitle = isMonthly 
      ? `${checkoutCourse.title} (Mensualidad Mes ${checkoutMonthIndex + 1})`
      : checkoutCourse.title;

    // Generate random motivation message and greeting
    const motivationalMessages = [
      "🌟 ¡El éxito es la suma de pequeños esfuerzos repetidos día tras día! Felicidades por invertir en tu futuro con este pago en FullStack Academy. ¡Vamos con todo! 💪",
      "🚀 ¡Tu decisión de aprender hoy construirá tu éxito de mañana! Te felicitamos y te enviamos un saludo lleno de energía y motivación. ¡Nos emociona acompañarte en tu carrera! 🎓",
      "✨ ¡El talento gana juegos, pero la constancia y disciplina construyen profesionales increíbles! Gracias por tu confianza en FullStack Academy. ¡A darlo todo en este módulo! 🎨",
      "🔥 ¡El único modo de hacer un gran trabajo es amar lo que haces! Tu matrícula está registrada con éxito. ¡Deseamos que este mes esté lleno de descubrimientos e innovación! 💻"
    ];
    const chosenMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setCurrentMotivationMessage(chosenMessage);

    const refCode = checkoutPaymentMethod === 'sinpe' 
      ? (checkoutSinpeComprobante || `SINPE-${Math.floor(100000 + Math.random() * 900000)}`)
      : `CARD-${Math.floor(1000000 + Math.random() * 9000000)}`;

    // Build the WhatsApp message for direct real-life confirmation
    const messageTemplate = isMonthly
      ? `¡Hola! Acabo de realizar el pago de mi MENSUALIDAD en FullStack Academy:\n\n` +
        `📚 *Carrera/Curso:* ${checkoutCourse.title}\n` +
        `🗓️ *Mensualidad:* Mes ${checkoutMonthIndex + 1} de ${checkoutCourse.modules.length}\n` +
        `👤 *Estudiante:* ${checkoutName}\n` +
        `📧 *Correo:* ${checkoutEmail}\n` +
        `💰 *Monto:* ₡${amount.toLocaleString('es-CR')} (₡35.000 fijos)\n` +
        `💳 *Método:* ${checkoutPaymentMethod === 'sinpe' ? 'SINPE Móvil 📲' : 'Tarjeta de Crédito / Débito 💳'}\n` +
        `🔢 *Comprobante / Referencia:* ${refCode}\n` +
        (checkoutPaymentMethod === 'sinpe' 
          ? `📱 *Teléfono Emisor:* ${checkoutSinpePhone || 'No especificado'}\n` +
            `📝 *Nombre Emisor:* ${checkoutSinpeSender || 'No especificado'}\n\n`
          : `🔒 *Marca de Tarjeta:* Detectada automáticamente por pasarela\n\n`) +
        `💌 *Mensaje Recibido de la Academia:*\n"${chosenMessage}"`
      : `¡Hola! Acabo de matricular un curso en FullStack Academy:\n\n` +
        `📚 *Curso:* ${checkoutCourse.title}\n` +
        `👤 *Estudiante:* ${checkoutName}\n` +
        `📧 *Correo:* ${checkoutEmail}\n` +
        `💰 *Monto:* ${amount.toLocaleString('es-CR')} ${currency}\n` +
        `💳 *Método:* ${checkoutPaymentMethod === 'sinpe' ? 'SINPE Móvil 📲' : 'Tarjeta de Crédito / Débito 💳'}\n` +
        `🔢 *Referencia de Pago:* ${refCode}\n` +
        (checkoutPaymentMethod === 'sinpe' 
          ? `📱 *Teléfono Emisor:* ${checkoutSinpePhone || 'No especificado'}\n` +
            `📝 *Nombre Emisor:* ${checkoutSinpeSender || 'No especificado'}\n\n`
          : `🔒 *Matrícula:* Directa autorizada mediante pasarela virtual\n\n`) +
        `💌 *Mensaje Recibido de la Academia:*\n"${chosenMessage}"`;

    // Log the transaction sequence
    setTerminalLogs(prev => [
      ...prev,
      `\n--------------------------------------------`,
      `📦 [${new Date().toLocaleTimeString()}] COMPRA: ${itemTitle}`,
      `🔐 [ENCRIPTACIÓN] Guardando registro de pago para ${checkoutName} (${checkoutEmail})...`,
      `💾 [BASE DE DATOS] INSERT INTO payments (item, student_name, payment_method, status) VALUES ('${itemTitle}', '${checkoutName}', '${checkoutPaymentMethod}', 'APROBADO');`,
      `📲 [WHATSAPP] Generando enlace de redirección segura a WhatsApp del facilitador...`,
      `🟢 [COMPLETADO] Pago aprobado y curso desbloqueado. Redirigiendo a WhatsApp de FullStack Academy.`
    ]);

    setTimeout(() => {
      // Create a unique registration ID for the student
      const enrollmentId = `${isMonthly ? 'MS' : 'MTR'}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Save in our approved list
      const newEnrollment = {
        id: enrollmentId,
        studentName: checkoutName,
        studentEmail: checkoutEmail,
        courseId: checkoutCourse.id,
        courseTitle: itemTitle,
        paymentMethod: checkoutPaymentMethod,
        amount: amount,
        date: dateStr,
        reference: refCode,
        status: 'approved' as const // Immediately approved upon card or completed sinpe form submit!
      };
      setPendingEnrollments(prev => [newEnrollment, ...prev]);

      // Unlock the main course in unlockedCourseIds so they can access the class immediately
      setUnlockedCourseIds(prev => {
        if (prev.includes(checkoutCourse.id)) return prev;
        return [...prev, checkoutCourse.id];
      });

      // Handle monthly payments for ANY course
      if (checkoutMonthIndex !== null) {
        setCoursePaidMonths(prev => {
          const currentCourseMonths = prev[checkoutCourse.id] || {};
          return {
            ...prev,
            [checkoutCourse.id]: {
              ...currentCourseMonths,
              [checkoutMonthIndex]: true
            }
          };
        });

        // Legacy graphic design compatibility
        if (checkoutCourse.id === 'course-graphic-design') {
          setGraphicDesignPaidMonths(prev => ({
            ...prev,
            [checkoutMonthIndex]: true
          }));
        }
      }

      // Save in simulated database so they can see the records
      const dbRow: SimulatedDatabaseRow = {
        id: enrollmentId.replace('MTR-', '').replace('MS-', ''),
        createdAt: dateStr,
        type: isMonthly ? 'Log' : 'Project',
        fieldA: isMonthly ? `Mensualidad: Mes ${checkoutMonthIndex + 1}` : `Matrícula: ${checkoutCourse.title.substring(0, 30)}...`,
        fieldB: checkoutEmail,
        fieldC: `${checkoutPaymentMethod === 'sinpe' ? 'SINPE' : 'TARJETA'}: ${refCode} | ${amount.toLocaleString('es-CR')} ${currency} | APROBADO ✓`
      };
      setSimulatedDatabase(prev => [dbRow, ...prev]);
      
      // Launch WhatsApp message to the teacher's phone number
      const cleanPhone = checkoutAcademyPhone.replace(/[^0-9]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageTemplate)}`;
      
      setLastWhatsappUrl(whatsappUrl);
      setLastEnrollmentId(enrollmentId);
      
      if (typeof window !== 'undefined') {
        try {
          const opened = window.open(whatsappUrl, '_blank');
          if (!opened) {
            console.warn("La ventana emergente de WhatsApp fue bloqueada por el navegador. El usuario puede abrir el chat usando el botón verde.");
          }
        } catch (err) {
          console.error("No se pudo abrir WhatsApp automáticamente por restricciones de seguridad del iframe:", err);
        }
      }

      setCheckoutStatus('success');
    }, 1800);
  };

  const handleApproveEnrollment = (enrollmentId: string) => {
    const enrollment = pendingEnrollments.find(e => e.id === enrollmentId);
    if (!enrollment) return;

    // Add to unlocked courses
    setUnlockedCourseIds(prev => {
      if (prev.includes(enrollment.courseId)) return prev;
      return [...prev, enrollment.courseId];
    });

    // Update enrollment status
    setPendingEnrollments(prev => 
      prev.map(e => e.id === enrollmentId ? { ...e, status: 'approved' as const } : e)
    );

    // Update simulated database row to APPROVED if present
    setSimulatedDatabase(prev => 
      prev.map(row => {
        if (row.id === enrollmentId.replace('MTR-', '')) {
          return {
            ...row,
            fieldC: row.fieldC.replace('PENDIENTE', 'APROBADO ✓')
          };
        }
        return row;
      })
    );

    // Add log to terminal
    setTerminalLogs(prev => [
      ...prev,
      `\n--------------------------------------------`,
      `✅ [${new Date().toLocaleTimeString()}] PAGO APROBADO MANUALMENTE POR LA INSTRUCTORA`,
      `👨‍🎓 Estudiante: ${enrollment.studentName}`,
      `📚 Curso Activado: ${enrollment.courseTitle}`,
      `💸 Monto Verificado: ${enrollment.amount.toLocaleString('es-CR')} ${currencySymbol}`,
      `🟢 [ESTADO] Acceso académico activado para el aula virtual.`
    ]);
  };

  // Auto scroll terminal ref
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Utility to find node details
  const getNode = (id: string) => TECH_NODES.find(n => n.id === id) || TECH_NODES[0];

  // Auto parameter setup when endpoint changes
  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    const initialParams: Record<string, string> = {};
    endpoint.parameters.forEach(p => {
      initialParams[p.name] = p.placeholder.replace('Ej: ', '');
    });
    setInputParams(initialParams);
  };

  // Preset Applier
  const applyPreset = (preset: ArchitecturePreset) => {
    setSelectedFrontend(preset.frontend);
    setSelectedStateStyle(preset.state_style);
    setSelectedBackend(preset.backend);
    setSelectedDatabase(preset.database);
    setSelectedCacheMsg(preset.cache_msg);
    setSelectedCloudDevops(preset.cloud_devops);

    // Push system log
    setTerminalLogs(prev => [
      ...prev,
      `🔄 [ARCHITECT] Aplicando plantilla preestablecida: "${preset.name}"`,
      `⚙️ Frontend: ${getNode(preset.frontend).name} | Base de datos: ${getNode(preset.database).name}`
    ]);
  };

  // Execute Simulated Endpoint
  const executeEndpointSimulated = () => {
    if (isTerminalExecuting) return;
    setIsTerminalExecuting(true);

    const now = new Date();
    const timestamp = now.toLocaleTimeString('es-CR');
    const fullDate = now.toLocaleString('es-CR');

    // Add initial execution log
    setTerminalLogs(prev => [
      ...prev,
      `\n--------------------------------------------`,
      `🚀 [${timestamp}] HTTP ${selectedEndpoint.method} ${selectedEndpoint.path}`,
      `📥 [HEADERS] Content-Type: application/json | Authorization: Bearer jw_token_2026`,
      `📥 [PAYLOAD] ${JSON.stringify(inputParams)}`
    ]);

    let logSequence: string[] = [];
    let databaseInsertion: SimulatedDatabaseRow | null = null;

    if (selectedEndpoint.path.includes('register')) {
      const username = inputParams.username || 'usuario_anonimo';
      const email = inputParams.email || 'correo@ejemplo.com';
      const role = inputParams.role || 'Invitado';

      logSequence = [
        `🔍 [AUTH] Verificando existencia de correo: ${email}...`,
        `🔑 [CRYPTO] Generando salt de hash PBKDF2 para contraseña...`,
        `⚙️ [DB] Iniciando conexión hacia pool postgres://${getNode(selectedDatabase).id}_cluster:5432/app_db`,
        `📝 [SQL] INSERT INTO users (username, email, role, created_at) VALUES ('${username}', '${email}', '${role}', NOW()) RETURNING id;`,
        `✓ [DB] Guardado exitoso con ID de registro #${Math.floor(100 + Math.random() * 900)}`,
        `⚡ [REDIS] Sincronizando clave de sesión 'session:user:${username}' en memoria (Expiración: 3600s)`,
        `📧 [EMAIL] Cola de tareas: Notificación de bienvenida programada en SMTP local.`,
        `🟢 [RESPONSE] HTTP 201 Created | Tiempo de procesamiento: 14.2ms`
      ];

      databaseInsertion = {
        id: Math.floor(3 + Math.random() * 100).toString(),
        createdAt: fullDate,
        type: 'User',
        fieldA: username,
        fieldB: email,
        fieldC: `Role: ${role} | Cache: Redis OK`
      };
    } else if (selectedEndpoint.path.includes('pipeline')) {
      const projName = inputParams.projectName || 'my-app';
      const branch = inputParams.branch || 'main';
      const env = inputParams.environment || 'producción';

      logSequence = [
        `🔗 [GITHUB] Recibiendo webhook de despliegue en rama '${branch}'...`,
        `🐳 [DOCKER] Leyendo Dockerfile multifase de la aplicación...`,
        `🏗️ [BUILD] Generando imagen de compilación: ${projName}:${branch}-${Math.floor(1000 + Math.random() * 9000)}`,
        `🧪 [LINT] Ejecutando verificación estática de TypeScript (tsc --noEmit)...`,
        `🟢 [LINT] Código limpio. Cero advertencias ni errores de tipos detectados.`,
        `📦 [CLOUD] Subiendo imagen docker consolidada a repositorio privado...`,
        `☸️ [K8s] Actualizando manifiesto de Kubernetes en cluster principal...`,
        `⚡ [SYSTEM] Despliegue en ${env.toUpperCase()} completado en la nube serverless.`,
        `🟢 [RESPONSE] HTTP 200 OK | Canal de despliegue consolidado.`
      ];

      databaseInsertion = {
        id: Math.floor(100 + Math.random() * 900).toString(),
        createdAt: fullDate,
        type: 'Log',
        fieldA: projName,
        fieldB: `Rama: ${branch} | Entorno: ${env}`,
        fieldC: `Uptime: 100% | Despliegue de Nube`
      };
    } else {
      // Checkout
      const email = inputParams.customerEmail || 'compras@cliente.cr';
      const amount = parseInt(inputParams.amount) || 250000;
      const currency = inputParams.currency || 'CRC';

      logSequence = [
        `💳 [STRIPE] Iniciando comunicación segura de Token de Pago PCI-DSS...`,
        `🪙 [LEDGER] Reservando transacción por un valor de ${amount} ${currency}...`,
        `📝 [DB] INSERT INTO sales (customer_email, amount, state, created_at) VALUES ('${email}', ${amount}, 'pending', NOW()) RETURNING invoice_id;`,
        `⚡ [REDIS] Incrementando métrica de transacciones totales por hora...`,
        `✓ [GATEWAY] Cobro procesado con éxito. Autorización #TX-STRIPE-${Math.floor(100000 + Math.random() * 900000)}`,
        `🎉 [WEBHOOK] Recibido callback de depósito permanente. Marcando como COMPLETADO.`,
        `🟢 [RESPONSE] HTTP 200 OK | Pago confirmado y registrado en balance consolidado.`
      ];

      databaseInsertion = {
        id: Math.floor(500 + Math.random() * 500).toString(),
        createdAt: fullDate,
        type: 'Project',
        fieldA: `Cobro Stripe`,
        fieldB: email,
        fieldC: `Suma: ${amount.toLocaleString('es-CR')} ${currency}`
      };
    }

    // Interval logging emulation
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < logSequence.length) {
        setTerminalLogs(prev => [...prev, logSequence[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsTerminalExecuting(false);
        if (databaseInsertion) {
          setSimulatedDatabase(prev => [databaseInsertion!, ...prev]);
        }
      }
    }, 400);
  };

  // Clear Terminal Logs
  const clearTerminalLogs = () => {
    setTerminalLogs([
      '🗑️ [SYSTEM] Consola de desarrollo vaciada.',
      '💾 [SYSTEM] Escriba parámetros y presione "Ejecutar Endpoint" para iniciar el flujo.'
    ]);
  };

  // Scroll to bottom whenever logs update
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Calculate project cost & timeline dynamically
  const calculateEstimate = () => {
    let baseCost = 0;
    let baseWeeks = 0;

    switch (projectScale) {
      case 'mvp':
        baseCost = 350000; // 350k colones
        baseWeeks = 6;
        break;
      case 'mid':
        baseCost = 650000; // 650k colones
        baseWeeks = 12;
        break;
      case 'enterprise':
        baseCost = 950000; // 950k colones
        baseWeeks = 24;
        break;
    }

    if (complianceNeeded) {
      baseCost += 120000;
      baseWeeks += 3;
    }
    if (extraAuth) {
      baseCost += 45000;
      baseWeeks += 1;
    }
    if (extraDatabaseReplica) {
      baseCost += 95000;
      baseWeeks += 2;
    }
    if (extraRealtime) {
      baseCost += 75000;
      baseWeeks += 2;
    }

    // Convert to USD if selected
    const colonToDollarRate = 515;
    const finalCost = currencySymbol === 'CRC' ? baseCost : Math.round(baseCost / colonToDollarRate);

    return {
      cost: finalCost,
      weeks: baseWeeks,
      hours: baseWeeks * 40,
      complexity: projectScale === 'mvp' ? 'Modular Estándar' : projectScale === 'mid' ? 'Avanzada Sincronizada' : 'Distribuida Corporativa'
    };
  };

  const currentEstimate = calculateEstimate();

  // Handle Client Form Submission
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    const brief = {
      id: 'PROP-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('es-CR'),
      clientName,
      clientEmail,
      clientDetails: clientDetails || 'Desarrollo de Software Full Stack a la medida.',
      selectedStack: {
        frontend: getNode(selectedFrontend).name,
        backend: getNode(selectedBackend).name,
        database: getNode(selectedDatabase).name,
        cache: getNode(selectedCacheMsg).name,
        infra: getNode(selectedCloudDevops).name
      },
      estimate: currentEstimate
    };

    setSubmittedBrief(brief);

    // Push log to terminal too
    setTerminalLogs(prev => [
      ...prev,
      `\n--------------------------------------------`,
      `💼 [NEW LEAD] Propuesta y PRD Generado para: ${clientName}`,
      `📧 Correo: ${clientEmail}`,
      `🛠️ Arquitectura propuesta: ${brief.selectedStack.frontend} + ${brief.selectedStack.backend}`,
      `💰 Presupuesto estimado: ${brief.estimate.cost.toLocaleString('es-CR')} ${currencySymbol}`,
      `✓ [SYSTEM] Propuesta guardada temporalmente.`
    ]);
  };

  const handleCopyInquiry = () => {
    if (!submittedBrief) return;
    const text = `PROYECTO: PROPUESTA DE DESARROLLO DE SOFTWARE FULL-STACK
-----------------------------------------------------------
ID: ${submittedBrief.id}
FECHA: ${submittedBrief.date}
CLIENTE: ${submittedBrief.clientName} (${submittedBrief.clientEmail})
DESCRIPCIÓN: ${submittedBrief.clientDetails}

TECNOLOGÍAS SELECCIONADAS:
- Frontend: ${submittedBrief.selectedStack.frontend}
- Backend: ${submittedBrief.selectedStack.backend}
- Base de Datos: ${submittedBrief.selectedStack.database}
- Caching / Mensajería: ${submittedBrief.selectedStack.cache}
- Despliegue e Infraestructura: ${submittedBrief.selectedStack.infra}

ESTIMACIÓN COMERCIAL:
- Costo Total: ${submittedBrief.estimate.cost.toLocaleString('es-CR')} ${currencySymbol}
- Duración Estimada: ${submittedBrief.estimate.weeks} semanas
- Horas de Ingeniería: ${submittedBrief.estimate.hours} horas
- Nivel de Arquitectura: ${submittedBrief.estimate.complexity}
-----------------------------------------------------------`;
    navigator.clipboard.writeText(text);
    setCopiedInquiryText(true);
    setTimeout(() => setCopiedInquiryText(false), 2500);
  };

  const handleSendProposalWhatsApp = () => {
    if (!submittedBrief) return;
    const text = `PROYECTO: PROPUESTA DE DESARROLLO DE SOFTWARE FULL-STACK
-----------------------------------------------------------
ID: ${submittedBrief.id}
FECHA: ${submittedBrief.date}
CLIENTE: ${submittedBrief.clientName} (${submittedBrief.clientEmail})
DESCRIPCIÓN: ${submittedBrief.clientDetails || 'Sin detalles adicionales'}

TECNOLOGÍAS SELECCIONADAS:
- Frontend: ${submittedBrief.selectedStack.frontend}
- Backend: ${submittedBrief.selectedStack.backend}
- Base de Datos: ${submittedBrief.selectedStack.database}
- Caching: ${submittedBrief.selectedStack.cache}
- Infraestructura: ${submittedBrief.selectedStack.infra}

ESTIMACIÓN COMERCIAL:
- Costo Total: ${submittedBrief.estimate.cost.toLocaleString('es-CR')} ${currencySymbol}
- Duración Estimada: ${submittedBrief.estimate.weeks} semanas
-----------------------------------------------------------`;
    const cleanPhone = checkoutAcademyPhone.replace(/[^0-9]/g, '');
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') {
      try {
        window.open(url, '_blank');
      } catch (err) {
        console.error("Fallo al abrir WhatsApp para propuesta técnica:", err);
      }
    }
  };

  if (activeProject === 'hub') {
    return (
      <div className="min-h-screen w-full bg-stone-950 text-stone-100 font-sans relative overflow-hidden selection:bg-amber-500 selection:text-stone-950 flex flex-col justify-between">
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

        {/* Top Header */}
        <header className="border-b border-stone-900 bg-stone-950/80 backdrop-blur px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-amber-600 to-amber-500 rounded-xl text-stone-950 font-black shadow-lg shadow-amber-500/10">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold block">FULLSTACK STUDIO</span>
                <h1 className="text-sm font-black tracking-tight text-stone-100 uppercase">Proyectos Independientes & Soluciones</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="hub-header-aula-virtual-btn"
                onClick={() => { changeActiveProject('academy'); changeViewMode('student'); }}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black rounded-xl text-xs font-mono transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
                title="Entrar directamente a la Academia de Cursos con todos los módulos y temarios"
              >
                <GraduationCap className="w-4 h-4 text-stone-950" />
                <span>🎓 Entrar a la Academia</span>
              </button>
              <button
                id="hub-header-startups-modal-btn"
                onClick={() => setIsStartupsModalOpen(true)}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 rounded-xl text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
                title="Abrir directorio completo de Mis Startups con enlaces limpios"
              >
                <span>🚀 Mis Startups ({STARTUPS_CATALOG.length})</span>
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Servidor de Producción En Línea</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace Selector */}
        <main className="max-w-7xl mx-auto px-6 py-12 sm:py-20 flex-grow flex flex-col justify-center space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 border border-stone-800 rounded-full text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider animate-pulse">
              ✨ ENTORNO DE TRABAJO INDEPENDIENTE & DESACOPLADO
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100 leading-none">
              Consola de Sistemas <br/>
              <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">Profesionales & Aprendizaje</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Bienvenido a la Consola de Sistemas. Aquí puede acceder a Travel Agency Rain Forest and Land, QuantumTrade VIP A.I, o ingresar a FullStack Academy con 13 especialidades de programación, inteligencia artificial y ciberseguridad.
            </p>

            {/* DIRECT INVESTOR LINKS & STARTUPS DIRECTORY */}
            <div className="p-5 sm:p-7 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-2xl text-left space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                        Mis Startups • Enlaces Claros & Despliegue de Pantalla
                      </h3>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                        ● {STARTUPS_CATALOG.length} Startups Activas
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Haz clic en <strong className="text-amber-400">"Desplegar Pantalla"</strong> para abrir cualquier proyecto a pantalla completa al instante, o copia el enlace limpio para enviarlo a clientes o inversionistas.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    id="hub-trigger-startups-modal-btn"
                    onClick={() => setIsStartupsModalOpen(true)}
                    className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black rounded-xl text-xs uppercase font-mono transition flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer"
                    title="Abrir catálogo detallado con filtros y buscador"
                  >
                    <span>🚀 Catálogo & Buscador</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* GRID OF 10 CLEAR STARTUPS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {STARTUPS_CATALOG.map((st) => {
                  const IconC = st.icon;
                  const fullCleanUrl = getCleanStartupUrl(st.queryStr);
                  return (
                    <div
                      key={st.id}
                      id={`hub-startup-card-${st.id}`}
                      className={`p-4 rounded-2xl bg-stone-950/90 border border-stone-800 ${st.accentColor.hoverBorder} transition-all duration-200 flex flex-col justify-between gap-3.5 shadow-lg group hover:bg-stone-950`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-bold ${st.accentColor.text} flex items-center gap-1.5 truncate`}>
                            <IconC className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{st.name}</span>
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            {/* BOTÓN RÁPIDO WHATSAPP */}
                            <button
                              type="button"
                              onClick={() => handleWhatsAppShareDirect(st)}
                              className="p-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-400 transition cursor-pointer"
                              title={`Compartir ${st.name} por WhatsApp`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>

                            {/* BOTÓN RÁPIDO COMPARTIR CON ÍCONO SHARE2 */}
                            <button
                              type="button"
                              onClick={() => handleShareStartupDirect(st)}
                              className={`p-1 rounded-md border transition cursor-pointer ${
                                sharedStartupKey === st.id
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                  : 'bg-stone-900 hover:bg-stone-850 border-stone-800 hover:border-amber-500/80 text-amber-400'
                              }`}
                              title={`Compartir enlace oficial de ${st.name}`}
                            >
                              {sharedStartupKey === st.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Share2 className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <span className="text-[9px] font-mono bg-stone-900 text-stone-400 px-2 py-0.5 rounded border border-stone-800 shrink-0">
                              {st.queryStr}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11.5px] text-stone-400 line-clamp-2 leading-relaxed">
                          {st.tagline}
                        </p>
                        {/* URL visible box */}
                        <div className="bg-stone-900/90 border border-stone-850 rounded-lg px-2.5 py-1 text-[10px] font-mono text-amber-400/90 truncate select-all flex items-center justify-between gap-1">
                          <span className="truncate">{fullCleanUrl}</span>
                          <span className="text-[8.5px] uppercase font-bold text-stone-500 shrink-0">Limpio</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 pt-2 border-t border-stone-900">
                        {/* ABRIR Y DESPLEGAR PANTALLA */}
                        <button
                          id={`hub-deploy-${st.id}`}
                          onClick={() => handleDeployStartup(st)}
                          className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-black uppercase tracking-wider font-mono transition text-center cursor-pointer flex items-center justify-center gap-1 ${st.accentColor.btnBg} ${st.accentColor.btnHover} ${st.accentColor.btnText} shadow-md`}
                          title="Abrir y desplegar la pantalla completa de esta startup inmediatamente"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Desplegar</span>
                        </button>

                        {/* COMPARTIR POR APARTE */}
                        <button
                          id={`hub-share-${st.id}`}
                          onClick={() => handleShareStartupDirect(st)}
                          className={`px-2 py-2 rounded-xl text-[11px] font-mono font-bold transition flex items-center justify-center gap-1 border cursor-pointer ${
                            sharedStartupKey === st.id
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-stone-900 hover:bg-stone-850 text-amber-400 hover:text-amber-300 border-stone-800 hover:border-amber-500/80'
                          }`}
                          title={`Compartir ${st.name} por WhatsApp, redes o copiar enlace`}
                        >
                          {sharedStartupKey === st.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Share2 className="w-3 h-3 text-amber-400" />
                          )}
                          <span className="hidden xl:inline">{sharedStartupKey === st.id ? '¡Listo!' : 'Compartir'}</span>
                        </button>

                        {/* ABRIR EN PESTAÑA */}
                        <button
                          id={`hub-tab-${st.id}`}
                          onClick={() => handleOpenStartupNewTab(st.queryStr)}
                          className="px-2 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-white rounded-xl text-[11px] font-mono font-bold transition flex items-center justify-center gap-1 border border-stone-800 cursor-pointer"
                          title="Abrir en una nueva pestaña del navegador"
                        >
                          <ExternalLink className="w-3 h-3 text-cyan-400" />
                          <span className="hidden sm:inline">Pestaña</span>
                        </button>

                        {/* COPIAR ENLACE LIMPIO */}
                        <button
                          id={`hub-copy-${st.id}`}
                          onClick={() => handleCopyStartupUrl(st.id, st.queryStr)}
                          className="px-2 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-white rounded-xl text-[11px] font-mono font-bold transition flex items-center justify-center gap-1 border border-stone-800 cursor-pointer"
                          title="Copiar enlace limpio"
                        >
                          {copiedStartupKey === st.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                          <span className="hidden sm:inline">{copiedStartupKey === st.id ? '¡Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* TOAST DE ENLACE COMPARTIDO EN EL HUB */}
              {hubShareToast && (
                <div className="mt-4 p-3 bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border border-emerald-500/50 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs text-stone-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-center gap-2 truncate">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-emerald-300">¡Enlace de {hubShareToast.title} listo!</span>{' '}
                      <span className="text-[11px] text-stone-400 font-mono truncate hidden sm:inline">({hubShareToast.url})</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50 shrink-0">
                    ✓ Enlace Compartido
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
            {/* PORTAL DESTACADO: PLAY & EARN MONEY VIP AAP */}
            <div className="group bg-gradient-to-br from-rose-950/50 via-slate-900 to-amber-950/40 rounded-3xl border-2 border-rose-500/50 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-2xl relative col-span-1 md:col-span-2 lg:col-span-3">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-300" />
              
              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-rose-500 to-amber-500 text-slate-950 font-black text-2xl rounded-2xl shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                      🎮
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-rose-400 block">
                        NUEVA APLICACIÓN OFICIAL • BACKEND FIREBASE
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                        Play & Earn Money VIP AAP
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-black uppercase bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/40 animate-pulse">
                      ● FIREBASE: play-and-earn-money-aap
                    </span>
                    <span className="text-[9px] font-mono font-black uppercase bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800/40">
                      RETIROS PAYPAL & SINPE
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-5xl">
                  Plataforma completa de entretenimiento y ganancias de dinero real: visualiza videos y anuncios comerciales con recompensas inmediatas, califica y da likes a productos, gira la Rueda de la Fortuna diaria con Jackpot de $10 USD, resuelve rompecabezas deslizantes 3x3 y 4x4, forja artesanías en el taller creativo, lee ebooks con capítulos pagados y reta tu mente con matemáticas interactivas para niños y jóvenes de colegio.
                </p>

                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-bold block mb-2">
                    Módulos y Juegos Integrados con Dinero Real:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px] font-mono text-slate-200">
                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-rose-400 block font-bold">📺 Videos & Likes</span>
                      <span className="text-[10px] text-slate-400">+$1.80/video</span>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-amber-400 block font-bold">🎡 Gira y Gana</span>
                      <span className="text-[10px] text-slate-400">Jackpot $10 USD</span>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-blue-400 block font-bold">🧩 Rompecabezas</span>
                      <span className="text-[10px] text-slate-400">3x3 y 4x4 mental</span>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-amber-500 block font-bold">🔨 Artesanías</span>
                      <span className="text-[10px] text-slate-400">Taller y forja</span>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-emerald-400 block font-bold">📖 Lectura Ebooks</span>
                      <span className="text-[10px] text-slate-400">Pago por capítulo</span>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-cyan-400 block font-bold">🧮 Matemáticas</span>
                      <span className="text-[10px] text-slate-400">Kids & Colegio</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => changeActiveProject('playearn')}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-400 hover:from-rose-400 hover:to-yellow-300 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-rose-500/20 hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <span>🎮 Abrir Play & Earn Money VIP AAP 🚀</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShareFeaturedStartup('playearn', 'Play & Earn Money VIP AAP', 'Gana dinero por ver videos, publicidad, dar likes, opiniones y juegos interactivos')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-rose-500 text-rose-300 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir enlace oficial de Play & Earn Money VIP AAP"
                  >
                    {sharedStartupKey === 'playearn' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Enlace Compartido! ✓</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>🔗 Compartir Startup Play & Earn</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppShareDirect({ name: 'Play & Earn Money VIP AAP', queryStr: '?project=playearn', tagline: 'Gana dinero por ver videos, anuncios, likes y juegos interactivos' })}
                    className="w-full py-2.5 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir Play & Earn por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Compartir por WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PORTAL 1: TRAVEL AGENCY RAIN FOREST AND LAND */}
            <div className="group bg-stone-900/40 rounded-3xl border border-stone-850 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-2xl relative col-span-1 md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-300" />
              
              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShareFeaturedStartup('travel', 'Travel Agency Rain Forest and Land', 'Plataforma oficial de turismo, selvas, volcanes y cruceros')}
                      className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500/80 text-emerald-400 transition cursor-pointer"
                      title="Compartir Travel Agency"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-900/30">
                      AGENCIA DE VIAJES DIGITAL
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-100 uppercase tracking-tight group-hover:text-emerald-400 transition-colors font-serif">
                    Travel Agency Rain Forest and Land
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Plataforma pública de viajes ecoturísticos, expediciones a volcanes y selvas tropicales, playas paradisíacas y la exclusiva Línea de Cruceros Royal Caribbean & Celebrity X.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-850/60 space-y-2">
                  <span className="text-[9px] font-mono uppercase text-stone-500 tracking-wider font-bold block">Servicios Turísticos Especiales:</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Atención Personalizada 24/7
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Tours de Selva & Volcanes
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Royal Caribbean & Celebrity X
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Cotizaciones en Tiempo Real
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-stone-950 border-t border-stone-850/60 space-y-2">
                <button
                  onClick={() => changeActiveProject('travel')}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/10 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Ingresar a Travel Agency Rain Forest and Land 🌿</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShareFeaturedStartup('travel', 'Travel Agency Rain Forest and Land', 'Agencia Digital de Viajes Ecoturísticos, Selvas, Playas & Cruceros Royal Caribbean')}
                    className="w-full py-2 bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir enlace oficial de Travel Agency"
                  >
                    {sharedStartupKey === 'travel' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Compartido!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Compartir</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppShareDirect({ name: 'Travel Agency Rain Forest and Land', queryStr: '?project=travel', tagline: 'Agencia Digital de Viajes Ecoturísticos, Selvas, Playas & Cruceros' })}
                    className="w-full py-2 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Compartir Travel Agency por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PORTAL 1: FINTECH SYSTEM */}
            <div className="group bg-stone-900/40 rounded-3xl border border-stone-850 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-300" />
              
              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShareFeaturedStartup('fintech', 'CardPay Fintech Leader', 'Core Bancario Transaccional con Libro Contable Double-Entry')}
                      className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-blue-500/80 text-blue-400 transition cursor-pointer"
                      title="Compartir CardPay Fintech"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase bg-blue-950 text-blue-400 px-3 py-1 rounded-full border border-blue-900/30">
                      CARDPAY FINTECH LEADER
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-100 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                    CardPay Fintech Leader
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Aplicación bancaria transaccional de microcréditos con libro contable real (Double-Entry Ledger). Permite gestionar desembolsos de créditos multidivisa (CRC/USD), control automatizado de tasas de interés de usura, análisis de riesgo y flujos de amortización.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-850/60 space-y-2">
                  <span className="text-[9px] font-mono uppercase text-stone-500 tracking-wider font-bold block">Módulos de Producción:</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-400">✓</span> Double-Entry Core Ledger
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-400">✓</span> Tabla de Amortizaciones
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-400">✓</span> Análisis de Riesgo & AML
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-400">✓</span> API Sandbox Financiera
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-stone-950 border-t border-stone-850/60 space-y-2">
                <button
                  onClick={() => changeActiveProject('fintech')}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-500/10 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Lanzar CardPay Fintech Leader 💻</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShareFeaturedStartup('fintech', 'CardPay Fintech Leader', 'Core Bancario Transaccional con Libro Contable Double-Entry, Microcréditos y Gestión SUGEF')}
                    className="w-full py-2 bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-blue-500 text-blue-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir enlace oficial de CardPay Fintech"
                  >
                    {sharedStartupKey === 'fintech' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Compartido!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Compartir</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppShareDirect({ name: 'CardPay Fintech Leader', queryStr: '?project=fintech', tagline: 'Core Bancario Transaccional con Libro Contable Real y Microcréditos' })}
                    className="w-full py-2 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Compartir CardPay Fintech por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PORTAL 2: EDUCATION ACADEMY */}
            <div className="group bg-stone-900/40 rounded-3xl border border-stone-850 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-300" />
              
              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShareFeaturedStartup('academy', 'FullStack Academy', '13 Cursos Profesionales, Tutor Albert Einstein IA y Certificaciones Oficiales')}
                      className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/80 text-amber-400 transition cursor-pointer"
                      title="Compartir FullStack Academy"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase bg-amber-950 text-amber-400 px-3 py-1 rounded-full border border-amber-900/30">
                      FULLSTACK ACADEMY
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-amber-400 uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                    🎓 FullStack Academy
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Plataforma didáctica integral: 13 cursos de programación Full-Stack, Ciberseguridad, Inteligencia Artificial, laboratorios interactivos con Albert Einstein, y emisión de certificaciones oficiales digitales.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-850/60 space-y-2">
                  <span className="text-[9px] font-mono uppercase text-stone-500 tracking-wider font-bold block">Módulos de la Academia:</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500">✓</span> 13 Cursos Profesionales
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500">✓</span> Tutor Albert Einstein IA
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500">✓</span> Laboratorio en Vivo
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500">✓</span> Certificaciones Oficiales
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-stone-950 border-t border-stone-850/60 space-y-2">
                <button
                  id="hub-card-enter-aula-virtual-btn"
                  onClick={() => { changeActiveProject('academy'); changeViewMode('student'); }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/10 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Entrar a FullStack Academy 🎓</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShareFeaturedStartup('academy', 'FullStack Academy', '13 Cursos Profesionales, Tutor Albert Einstein IA y Certificaciones Oficiales')}
                    className="w-full py-2 bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500 text-amber-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir FullStack Academy"
                  >
                    {sharedStartupKey === 'academy' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Compartido!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Compartir</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppShareDirect({ name: 'FullStack Academy', queryStr: '?project=academy', tagline: '13 Cursos Profesionales, Tutor Albert Einstein IA y Certificaciones Oficiales' })}
                    className="w-full py-2 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Compartir FullStack Academy por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PORTAL 4: QUANTUMTRADE VIP A.I & BOT MULTIPLIER */}
            <div className="group bg-slate-900/60 rounded-3xl border-2 border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-2xl relative col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-300" />
              
              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShareFeaturedStartup('trading', 'QuantumTrade VIP A.I', 'Terminal Cuántica de Trading Multiactivo con Bots de Inteligencia Artificial')}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/80 text-cyan-400 transition cursor-pointer"
                      title="Compartir QuantumTrade VIP"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-900/30 animate-pulse">
                      ● MERCADO EN VIVO & PAYPAL ACTIVO
                    </span>
                    <span className="text-[9px] font-mono font-black uppercase bg-purple-950 text-purple-300 px-3 py-1 rounded-full border border-purple-900/30">
                      GEMINI QUANTUM A.I
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                    QuantumTrade VIP A.I
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                    Terminal cuántica de alta tecnología para trading multiactivo profesional. Opera Criptomonedas (BTC, ETH, SOL), Divisas Forex (EUR/USD, GBP/USD), Commodities (Oro Bullion, Petróleo WTI) e Índices bursátiles (Nasdaq 100, S&P 500). Equipado con pasarela PayPal & Tarjetas conectada, bots multiplicadores con 88.6% de efectividad y bóveda de retiros protegida.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-bold block">Capacidades QuantumTrade VIP:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono text-slate-200">
                    <div className="flex items-center gap-1.5 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-cyan-400">✓</span> Velas Cuánticas + Indicadores
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-emerald-400">✓</span> PayPal Checkout & Tarjetas
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-purple-400">✓</span> Bots Multiplicadores Gemini AI
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-yellow-400">✓</span> Panel Privado Dueña (PIN 7019)
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => changeActiveProject('trading')}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-cyan-500/20 hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <span>Abrir QuantumTrade VIP A.I 🚀</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShareFeaturedStartup('trading', 'QuantumTrade VIP A.I', 'Terminal Cuántica de Trading Multiactivo y Bots con IA')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-300 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir QuantumTrade VIP"
                  >
                    {sharedStartupKey === 'trading' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Enlace Compartido! ✓</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>🔗 Compartir Startup Trading</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppShareDirect({ name: 'QuantumTrade VIP A.I', queryStr: '?project=trading', tagline: 'Terminal Cuántica de Trading Multiactivo y Bots Multiplicadores con IA' })}
                    className="w-full py-2.5 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir QuantumTrade por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Compartir por WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PORTAL 5: STREAMPAY PASS MEDIA & MONETIK */}
            <div className="group bg-slate-900/60 rounded-3xl border-2 border-indigo-500/40 hover:border-indigo-400 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-2xl relative col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950/40">
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-300" />
              
              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleShareFeaturedStartup('streampay', 'StreamPAY Pro', 'Ecosistema de Pagos para Creadores, Streaming, SINPE y PayPal')}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/80 text-cyan-400 transition cursor-pointer"
                      title="Compartir StreamPAY"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/40">
                      PASARELA STREAMPAY
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                    Stream<span className="text-cyan-400">PAY</span> Pro
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Módulo y ecosistema de pagos directos para creadores, streaming y venta de contenidos Pay-Per-View. Cobros instantáneos con PayPal, SINPE Móvil y WhatsApp wa.link sin comisiones abusivas.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-bold block">Funciones de Pago Integradas:</span>
                  <div className="grid grid-cols-1 gap-1.5 text-[10px] font-mono text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-400">✓</span> Micro-propinas en Video en Vivo
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Pasarela Multipasarela & SINPE
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-purple-400">✓</span> Bot I.A. 24/7 de Afiliados
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => changeActiveProject('streampay')}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-500/20 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Entrar a StreamPAY 💳</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShareFeaturedStartup('streampay', 'StreamPAY Pro', 'Ecosistema de Pagos para Creadores, Streaming, SINPE y PayPal')}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500 text-cyan-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir StreamPAY"
                  >
                    {sharedStartupKey === 'streampay' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Compartido!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Compartir</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppShareDirect({ name: 'StreamPAY Pro', queryStr: '?project=streampay', tagline: 'Ecosistema de Pagos para Creadores, Streaming, SINPE y PayPal' })}
                    className="w-full py-2 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Compartir StreamPAY por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PORTAL 6: AULA DE MATEMÁTICAS 6° GRADO, POLÍGONOS & ALBERT EINSTEIN */}
            <div className="group bg-slate-900/60 rounded-3xl border-2 border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-2xl relative col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-b from-slate-950 via-slate-900 to-cyan-950/40">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300" />
              
              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gradient-to-tr from-cyan-500 to-amber-400 text-slate-950 rounded-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Shapes className="w-6 h-6 text-slate-950 font-black" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleShareFeaturedStartup('geometria', 'Matemáticas 6° MEP & Einstein', 'Pizarra Libre de Polígonos y Tutor Albert Einstein MEP')}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/80 text-cyan-400 transition cursor-pointer"
                      title="Compartir Matemáticas 6°"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/40">
                      MEP 6° • PIZARRA & TRAZO LIBRE
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                    Matemáticas 6° & <span className="text-amber-400">Einstein</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pizarra interactiva para trazar y dibujar figuras libremente (heptágonos, hexágonos, cuadrados, triángulos, círculos), tutor inteligente Albert Einstein con explicaciones paso a paso y medallero de honor con 12 diplomas descargables.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-bold block">Herramientas Educativas MEP:</span>
                  <div className="grid grid-cols-1 gap-1.5 text-[10px] font-mono text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-400">✓</span> Pizarra Libre de Trazo, Dibujo y Sellos
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Polígonos (Heptágonos, Hexágonos, Triángulos...)
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400">✓</span> Tutor Albert Einstein (Paso a Paso)
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-purple-400">✓</span> Medallero de Honor con 12 Diplomas
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => navigateToMathAcademy('geometria')}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-500/20 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Abrir Aula de Matemáticas 📐</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShareFeaturedStartup('geometria', 'Matemáticas 6° MEP & Einstein', 'Pizarra Libre de Polígonos y Tutor Albert Einstein MEP')}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-300 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Compartir Aula de Matemáticas"
                  >
                    {sharedStartupKey === 'geometria' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Compartido!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Compartir</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppShareDirect({ name: 'Matemáticas 6° MEP & Einstein', queryStr: '?project=geometria', tagline: 'Pizarra Libre de Polígonos y Tutor Albert Einstein MEP' })}
                    className="w-full py-2 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 font-bold rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Compartir Aula de Matemáticas por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-900 bg-stone-950/80 backdrop-blur py-6 px-6 text-center text-xs text-stone-500 font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>© 2026 FullStack Studio. Todos los derechos reservados.</span>
            <span className="text-stone-600">Sistemas Avanzados Desacoplados • Costa Rica</span>
          </div>
        </footer>

        {/* Modal Interactivo de Startups */}
        <MisStartupsModal
          isOpen={isStartupsModalOpen}
          onClose={() => setIsStartupsModalOpen(false)}
          onSelectStartup={handleDeployStartup}
        />
      </div>
    );
  }

  if (activeProject === 'playearn') {
    return (
      <PlayEarnApp
        onBackToHub={() => changeActiveProject('hub')}
        onNavigateToAcademy={() => changeActiveProject('academy')}
      />
    );
  }

  if (activeProject === 'trading') {
    return (
      <TradingPlatformApp
        onBackToHub={() => changeActiveProject('hub')}
        onNavigateToAcademy={() => changeActiveProject('academy')}
        onNavigateToStreamPay={() => changeActiveProject('streampay')}
      />
    );
  }

  if (activeProject === 'streampay') {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans relative">
        <StreamPayApp
          onBackToHub={() => changeActiveProject('hub')}
          onNavigateToTrading={() => changeActiveProject('trading')}
        />
        <footer className="bg-slate-950 border-t border-slate-900 py-3 px-6 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 StreamPAY Pro • Plataforma Global de Streaming, Creadores y Monetización Digital • Todos los derechos reservados.</span>
        </footer>
      </div>
    );
  }

  if (activeProject === 'travel') {
    return (
      <div className="min-h-screen w-full bg-stone-950 text-stone-100 font-sans relative">
        <TravelAgency onSwitchProject={(proj) => changeActiveProject(proj)} />
        <footer className="bg-stone-950 border-t border-stone-900 py-4 px-6 text-center text-xs text-stone-500 font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© 2026 Travel Agency Rain Forest and Land • Agencia Digital de Viajes • Royal Caribbean & Celebrity X Official Partner</span>
          </div>
        </footer>
      </div>
    );
  }

  if (activeProject === 'certificate') {
    return (
      <div className="min-h-screen w-full bg-stone-950 text-stone-100 font-sans relative">
        <CertificateEditor onBack={() => changeActiveProject('academy')} />
        <footer className="bg-stone-950 border-t border-stone-900 py-4 px-6 text-center text-xs text-stone-500 font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© 2026 Editor de Título Digital Universitario • Sistema Oficial de Certificados</span>
          </div>
        </footer>
      </div>
    );
  }

  if (activeProject === 'fintech') {
    return (
      <div className="min-h-screen w-full bg-stone-950 text-stone-100 font-sans relative flex flex-col justify-between">
        <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-stone-850 px-4 py-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40 shadow-lg shadow-amber-500/10">
                <Coins className="w-5 h-5 animate-pulse text-amber-400" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-black">
                    CARDPAY FINTECH • CORE LEDGER & CFO A.I.
                  </span>
                  <span className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
                    ONLINE
                  </span>
                </div>
                <h1 className="text-sm font-black tracking-tight text-white uppercase">
                  Sistema Bancario de Crédito & Control Dual
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => changeActiveProject('hub')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-800 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-mono transition cursor-pointer"
                title="Volver al Portal Central de Startups"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180 text-amber-400" />
                <span>Volver al Catálogo</span>
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4 sm:p-6 flex-grow w-full">
          <FintechSimulator onBackToHub={() => changeActiveProject('hub')} />
        </main>
        <footer className="bg-stone-950 border-t border-stone-900 py-4 px-6 text-center text-xs text-stone-500 font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© 2026 CardPay Fintech • Double-Entry Core Ledger & CFO A.I. • Fundadora: María Teresa Jirón Bermúdez</span>
            <span className="text-amber-500 font-bold">En Venta: $50,000 USD (WhatsApp: 506 7019-3160)</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* FLOATING FB NOTIFICATION BANNER */}
      <AnimatePresence>
        {fbNotification?.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-stone-900 border-2 border-amber-500/80 rounded-2xl p-4.5 shadow-2xl text-left"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest">
                    🔗 Enlace Simulado con Éxito
                  </span>
                  <button
                    onClick={() => setFbNotification(null)}
                    className="text-stone-500 hover:text-stone-300 font-mono text-[9px] font-bold uppercase transition-colors cursor-pointer"
                  >
                    [Cerrar]
                  </button>
                </div>
                <h4 className="text-xs font-bold text-stone-100 uppercase tracking-tight">
                  Vista Estudiante Activada
                </h4>
                <p className="text-[11px] text-stone-400 leading-normal">
                  Se ha intentado abrir el enlace oficial (<strong className="text-stone-300 break-all">{fbNotification.url}</strong>) en una nueva pestaña.
                </p>
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-850 mt-1">
                  <p className="text-[10px] font-mono text-emerald-400 leading-tight">
                    💡 <strong>Transacción de cliente exitosa:</strong> Le hemos redirigido a la sección de la Academia y cargado el temario del curso <strong>{fbNotification.courseTitle}</strong> para que vea exactamente lo que experimentan sus clientes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOWING AMBIENT BACKGROUND */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-50 bg-stone-950/85 backdrop-blur-md border-b border-stone-900 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-600/15 rounded-xl border border-amber-600/30 text-amber-500">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-black block">
                  🎓 ACADEMIA FULL STACK • SOFTWARE & SISTEMAS
                </span>
                <span className="text-[9px] font-mono text-stone-400 border border-stone-800 px-1.5 py-0.2 rounded">
                  EDICIÓN PROFESIONAL
                </span>
              </div>
              <h1 className="text-sm font-black tracking-tight text-stone-100 uppercase">
                FullStack Academy • 13 Cursos de Programación, Laboratorio & Tutor Einstein
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-stone-900 p-1 rounded-xl border border-stone-850 shrink-0">
            <button
              onClick={() => changeActiveProject('hub')}
              className="px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-mono text-amber-500 hover:text-amber-400 hover:bg-stone-950 transition-all cursor-pointer flex items-center gap-1 shrink-0 bg-stone-900 border border-stone-800/20"
              title="Regresar al Hub Principal"
            >
              <span>⬅ Menú Principal</span>
            </button>
            <button
              onClick={() => {
                const fullUrl = getCleanStartupUrl('?project=academy#academy');
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(fullUrl);
                }
                setHubCopiedAcademyLink(true);
                setTimeout(() => setHubCopiedAcademyLink(false), 4000);
              }}
              className="px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-mono text-stone-300 hover:text-amber-400 hover:bg-stone-950 transition-all cursor-pointer flex items-center gap-1 shrink-0 border border-stone-800"
              title="Copiar Enlace Directo Público para compartir la Academia"
            >
              {hubCopiedAcademyLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Compartir Link</span>
                </>
              )}
            </button>
            <div className="w-px h-4 bg-stone-800 mx-0.5" />
            <button
              onClick={() => changeViewMode('student')}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-mono transition-all cursor-pointer ${
                viewMode === 'student' && workspaceActiveTab !== 'ai-tutor'
                  ? 'bg-amber-600 text-stone-950 font-black'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {t('coursesTab')}
            </button>
            <button
              onClick={() => {
                changeViewMode('student');
                setWorkspaceActiveTab('ai-tutor');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'student' && workspaceActiveTab === 'ai-tutor'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-amber-950/40 text-amber-400 hover:text-amber-300 border border-amber-500/30'
              }`}
              title="Abrir Tutor Inteligente Albert Einstein"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Tutor Einstein</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline" />
            </button>
            <button
              onClick={() => changeViewMode('engineering')}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'engineering'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/10'
                  : 'text-amber-500 hover:text-amber-400'
              }`}
              title="Consola de Ingeniería (Arquetipo, Consola API, Proyectos, Cotizador)"
            >
              {t('engTab')}
            </button>

            {/* SEPARADOR */}
            <div className="w-px h-4 bg-stone-800 mx-1 hidden sm:block" />

            {/* SELECTOR DE PAÍS / IDIOMA */}
            <div className="flex items-center gap-1 px-2 py-1 bg-stone-950 rounded-lg border border-stone-850">
              <Globe className="w-3 h-3 text-amber-500 shrink-0" />
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="bg-transparent text-[10px] font-mono font-bold text-stone-300 outline-none cursor-pointer pr-1"
                title={t('selectCountry')}
              >
                {COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code} className="bg-stone-900 text-stone-300">
                    {opt.flag} {opt.name} ({opt.lang.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* VISTA DE CONSOLA DE INGENIERÍA COMPLETA (BAJO DEMANDA) */}
      {viewMode === 'engineering' && (
        <div id="engineering-console-root" className="w-full max-w-full overflow-hidden px-1 sm:px-2">
          {/* HERO SECTION / INTRO */}
          <section className="relative px-3 pt-6 pb-8 sm:px-4 max-w-6xl mx-auto text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-stone-900 border border-stone-800 rounded-full text-[9px] font-mono text-amber-500 font-bold uppercase">
            <Sparkles className="w-3 h-3" /> Arquitecto de Sistemas & Soluciones Integrales
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-[1.1] text-stone-100">
            Ingeniería de Software <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">Full Stack</span> Completa
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-xl mx-auto">
            Diseñamos y desplegamos infraestructuras de backend escalables, bases de datos consistentes con transaccionalidad robusta y aplicaciones frontend con interfaces ultra reactivas y optimizadas.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono bg-stone-900/60 px-3 py-1.5 rounded-lg border border-stone-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cero Caídas (Redundancia)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono bg-stone-900/60 px-3 py-1.5 rounded-lg border border-stone-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> APIs REST / gRPC de Alta Velocidad
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono bg-stone-900/60 px-3 py-1.5 rounded-lg border border-stone-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Seguridad Criptográfica
            </div>
          </div>

          {/* BARRA DE COPIADO RÁPIDO PARA COMPARTIR */}
          <div className="max-w-xl mx-auto bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl space-y-3 mt-8 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-amber-500/10 text-amber-500 text-[8px] font-mono tracking-widest uppercase rounded-bl border-l border-b border-amber-500/20 font-bold">
              PROYECTO LISTO
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold">Enlace Público Directo de Tu Proyecto</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-normal">
              Copie este enlace directo para compartir su portafolio, cotizador interactivo y academia con sus clientes por WhatsApp, correo o redes sociales. Es completamente real, funcional y listo para exhibición.
            </p>
            <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-xl border border-stone-850">
              <input 
                type="text" 
                readOnly 
                value={shareUrl || 'Cargando enlace...'}
                className="bg-transparent text-[11px] font-mono text-stone-300 outline-none flex-grow overflow-x-auto select-all px-1"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={handleCopyShareLink}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black font-mono transition-all duration-300 shrink-0 flex items-center gap-1 cursor-pointer ${
                  copiedShareLink 
                    ? 'bg-emerald-600 text-stone-950 scale-105' 
                    : 'bg-amber-600 hover:bg-amber-500 text-stone-950 hover:scale-105'
                }`}
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedShareLink ? 'Copiado ✓' : 'Copiar Link'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE PRESETS BLOCK */}
      <section className="px-4 pb-8 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-stone-900/40 border border-stone-850 p-4 sm:p-5 rounded-2xl">
          <h3 className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold mb-3 text-center sm:text-left">
            Seleccionar una Plantilla de Arquitectura de Producción
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="p-3.5 bg-stone-950/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-xl text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-black text-stone-200 group-hover:text-amber-400 transition-colors">
                    {preset.name}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[10px] text-stone-400 leading-normal mb-3">
                  {preset.description}
                </p>
                <div className="flex flex-wrap gap-1 font-mono text-[8px] uppercase">
                  <span className="bg-stone-900 text-stone-300 px-1.5 py-0.5 rounded border border-stone-800">
                    {preset.frontend}
                  </span>
                  <span className="bg-stone-900 text-stone-300 px-1.5 py-0.5 rounded border border-stone-800">
                    {preset.backend}
                  </span>
                  <span className="bg-stone-900 text-stone-300 px-1.5 py-0.5 rounded border border-stone-800">
                    {preset.database}
                  </span>
                  <span className="bg-emerald-950/30 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900/30">
                    {preset.cache_msg}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: INTERACTIVE ARCHITECTURE DESIGNER */}
      <section id="designer" className="px-4 py-8 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="border-l-4 border-amber-500 pl-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 block font-bold">MÓDULO INTERACTIVO [01]</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-stone-100">
            Diseñador y Modelador de Stack Tecnológico
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Configure sus tecnologías ideales en cada nivel. El sistema diagramará el arquetipo tecnológico y calculará las métricas de rendimiento en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SELECTION PANEL */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* FRONTEND */}
            <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-2.5">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-stone-400 flex items-center gap-1.5">
                <Layers3 className="w-3.5 h-3.5 text-amber-500" /> 1. Interfaz de Usuario / Frontend
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TECH_NODES.filter(n => n.category === 'frontend').map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedFrontend(node.id)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedFrontend === node.id 
                        ? 'bg-amber-600/15 border-amber-500 text-amber-400 font-bold shadow-sm' 
                        : 'bg-stone-950/50 border-stone-850 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] block leading-tight">{node.name.split(' ')[0]}</span>
                    <span className="text-[7px] text-stone-500 font-mono block mt-0.5">{node.latencyRating}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STATE & STYLE */}
            <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-2.5">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-stone-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 2. Estado Global & Maquetación
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TECH_NODES.filter(n => n.category === 'state_style').map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedStateStyle(node.id)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedStateStyle === node.id 
                        ? 'bg-amber-600/15 border-amber-500 text-amber-400 font-bold shadow-sm' 
                        : 'bg-stone-950/50 border-stone-850 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] block leading-tight">{node.name.split(' ')[0]}</span>
                    <span className="text-[7px] text-stone-500 font-mono block mt-0.5">{node.latencyRating}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BACKEND SERVER */}
            <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-2.5">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-stone-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-amber-500" /> 3. Servidor de API / Backend
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {TECH_NODES.filter(n => n.category === 'backend').map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedBackend(node.id)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedBackend === node.id 
                        ? 'bg-amber-600/15 border-amber-500 text-amber-400 font-bold shadow-sm' 
                        : 'bg-stone-950/50 border-stone-850 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] block leading-tight truncate">{node.name.replace('Node.js ', '').replace(' (TypeScript)', '').replace(' Framework', '')}</span>
                    <span className="text-[7px] text-stone-500 font-mono block mt-0.5">{node.latencyRating}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PRIMARY DATABASE */}
            <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-2.5">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-stone-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-500" /> 4. Base de Datos Principal
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TECH_NODES.filter(n => n.category === 'database').map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedDatabase(node.id)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedDatabase === node.id 
                        ? 'bg-amber-600/15 border-amber-500 text-amber-400 font-bold shadow-sm' 
                        : 'bg-stone-950/50 border-stone-850 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] block leading-tight">{node.name.split(' ')[0]}</span>
                    <span className="text-[7px] text-stone-500 font-mono block mt-0.5">{node.latencyRating}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CACHING / MESSAGING */}
            <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-2.5">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-stone-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-500" /> 5. Cache & Mensajería de Mensajes
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {TECH_NODES.filter(n => n.category === 'cache_msg').map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedCacheMsg(node.id)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedCacheMsg === node.id 
                        ? 'bg-amber-600/15 border-amber-500 text-amber-400 font-bold shadow-sm' 
                        : 'bg-stone-950/50 border-stone-850 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] block leading-tight truncate">{node.name.replace(' In-Memory', '')}</span>
                    <span className="text-[7px] text-stone-500 font-mono block mt-0.5">{node.latencyRating}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CLOUD / DEVOPS */}
            <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-850 space-y-2.5">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-stone-400 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-amber-500" /> 6. Entorno de Despliegue Nube
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TECH_NODES.filter(n => n.category === 'cloud_devops').map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedCloudDevops(node.id)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedCloudDevops === node.id 
                        ? 'bg-amber-600/15 border-amber-500 text-amber-400 font-bold shadow-sm' 
                        : 'bg-stone-950/50 border-stone-850 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] block leading-tight">{node.name.replace('Google ', '').replace('Docker + ', '')}</span>
                    <span className="text-[7px] text-stone-500 font-mono block mt-0.5">{node.latencyRating}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* VISUAL DIAGRAM DISPLAY */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-stone-900/60 p-5 rounded-2xl border border-stone-800 space-y-6">
            
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <div>
                <span className="text-[8px] uppercase font-mono tracking-widest text-amber-500 font-bold block">MODELO DE ARQUITECTURA</span>
                <span className="text-xs text-stone-300 font-bold font-mono">blueprint_visualizer.yaml</span>
              </div>
              <div className="flex gap-2 font-mono text-[9px]">
                <div className="flex items-center gap-1 bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Consistente
                </div>
                <div className="flex items-center gap-1 bg-amber-950/40 text-amber-500 px-2 py-0.5 rounded border border-amber-900/30">
                  Complejidad: Óptima
                </div>
              </div>
            </div>

            {/* DYNAMIC CONNECTOR VISUALIZATION */}
            <div className="flex flex-col items-center justify-center space-y-5 py-2">
              
              {/* TOP LAYERS: CLIENT SIDE */}
              <div className="w-full grid grid-cols-2 gap-4">
                {/* Frontend Node Box */}
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex flex-col items-center text-center shadow-md relative">
                  <div className="absolute -top-2.5 bg-amber-500/10 border border-amber-500/30 px-2 py-0.2 rounded text-[7px] text-amber-400 uppercase font-mono">
                    FRONTEND
                  </div>
                  <Cpu className="w-6 h-6 text-amber-500 mt-1 mb-1.5" />
                  <span className="text-[11px] font-bold text-stone-200">{getNode(selectedFrontend).name}</span>
                  <p className="text-[8px] text-stone-500 leading-normal mt-1">{getNode(selectedFrontend).description}</p>
                </div>

                {/* State/Style Node Box */}
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex flex-col items-center text-center shadow-md relative">
                  <div className="absolute -top-2.5 bg-amber-500/10 border border-amber-500/30 px-2 py-0.2 rounded text-[7px] text-amber-400 uppercase font-mono">
                    STATE / STYLES
                  </div>
                  <Sparkles className="w-6 h-6 text-amber-500 mt-1 mb-1.5" />
                  <span className="text-[11px] font-bold text-stone-200">{getNode(selectedStateStyle).name}</span>
                  <p className="text-[8px] text-stone-500 leading-normal mt-1">{getNode(selectedStateStyle).description}</p>
                </div>
              </div>

              {/* FLOW ARROW DOWN */}
              <div className="flex flex-col items-center text-[8px] font-mono text-stone-600">
                <span className="animate-bounce">↓</span>
                <span>HTTPS API REQUEST (SSL)</span>
                <span>↓</span>
              </div>

              {/* MIDDLE LAYER: BACKEND / MICROSERVICE */}
              <div className="w-full max-w-sm bg-stone-950 p-4 rounded-xl border border-amber-500/40 flex flex-col items-center text-center shadow-lg relative">
                <div className="absolute -top-2.5 bg-amber-500 text-stone-950 px-2 py-0.2 rounded text-[8px] font-black uppercase font-mono tracking-wider">
                  MICROSERVICIO BACKEND DE SERVICIO
                </div>
                <Server className="w-7 h-7 text-amber-500 mt-1 mb-1.5" />
                <span className="text-xs font-black text-amber-400">{getNode(selectedBackend).name}</span>
                <p className="text-[9px] text-stone-400 mt-1 leading-normal">
                  {getNode(selectedBackend).description} 
                </p>
                
                {/* Nested metrics */}
                <div className="mt-2.5 pt-2 border-t border-stone-900 w-full grid grid-cols-2 text-[8px] font-mono text-stone-500">
                  <div>LATENCIA API: <span className="text-stone-300 font-bold">{getNode(selectedBackend).latencyRating}</span></div>
                  <div>FIABILIDAD: <span className="text-emerald-400 font-bold">{getNode(selectedBackend).reliability}</span></div>
                </div>
              </div>

              {/* MULTI DIRECTIONAL ARROWS */}
              <div className="w-full flex justify-around items-center text-[8px] font-mono text-stone-600 px-6">
                <div className="flex flex-col items-center">
                  <span>↙ SQL / Documental</span>
                  <span>↓</span>
                </div>
                {selectedCacheMsg !== 'none_cache' && (
                  <div className="flex flex-col items-center">
                    <span>In-Memory Caching / Streams ↘</span>
                    <span>↓</span>
                  </div>
                )}
              </div>

              {/* BOTTOM LAYERS: DATA & CASHING */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Primary DB Node Box */}
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex flex-col items-center text-center shadow-md relative">
                  <div className="absolute -top-2.5 bg-emerald-950/60 border border-emerald-900 px-2 py-0.2 rounded text-[7px] text-emerald-400 uppercase font-mono">
                    PERSISTENCIA DE DATOS
                  </div>
                  <Database className="w-6 h-6 text-emerald-400 mt-1 mb-1.5" />
                  <span className="text-[11px] font-bold text-stone-200">{getNode(selectedDatabase).name}</span>
                  <p className="text-[8px] text-stone-500 leading-normal mt-1">{getNode(selectedDatabase).description}</p>
                </div>

                {/* Caching/Messaging Node Box */}
                <div className={`p-3 rounded-xl border flex flex-col items-center text-center shadow-md relative transition-all ${
                  selectedCacheMsg === 'none_cache' 
                    ? 'border-stone-900 bg-stone-950/20 opacity-40' 
                    : 'border-stone-800 bg-stone-950'
                }`}>
                  <div className="absolute -top-2.5 bg-blue-950/60 border border-blue-900 px-2 py-0.2 rounded text-[7px] text-blue-400 uppercase font-mono">
                    ACELERACIÓN / COLA
                  </div>
                  <Activity className="w-6 h-6 text-blue-400 mt-1 mb-1.5" />
                  <span className="text-[11px] font-bold text-stone-200">{getNode(selectedCacheMsg).name}</span>
                  <p className="text-[8px] text-stone-500 leading-normal mt-1">{getNode(selectedCacheMsg).description}</p>
                </div>

              </div>

              {/* CLOUD ENVIRONMENT BAR */}
              <div className="w-full bg-stone-950/80 p-3 rounded-xl border border-stone-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="text-left">
                    <span className="text-[7px] uppercase font-mono text-stone-500 block">DESPLIEGUE CLOUD Y INFRAESTRUCTURA</span>
                    <strong className="text-[10px] text-stone-200 block leading-none">{getNode(selectedCloudDevops).name}</strong>
                  </div>
                </div>
                <div className="text-[8px] font-mono text-stone-400 max-w-xs text-right leading-tight">
                  {getNode(selectedCloudDevops).description}
                </div>
              </div>

            </div>

            {/* PERFORMANCE METRICS CALCULATOR FOOTER */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-850">
              <span className="text-[8px] uppercase font-mono tracking-widest text-stone-500 font-bold block mb-2 text-left">
                Análisis de Rendimiento Estimado del Stack Diseñado
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                
                <div className="bg-stone-900/40 p-2 rounded border border-stone-900">
                  <span className="text-[7px] font-mono text-stone-500 block">TIEMPO RESPUESTA</span>
                  <span className="text-xs font-black text-amber-500 font-mono">
                    {(parseFloat(getNode(selectedFrontend).latencyRating) + parseFloat(getNode(selectedBackend).latencyRating) + parseFloat(getNode(selectedDatabase).latencyRating) + (selectedCacheMsg !== 'none_cache' ? 0.3 : 1.5)).toFixed(1)} ms
                  </span>
                </div>

                <div className="bg-stone-900/40 p-2 rounded border border-stone-900">
                  <span className="text-[7px] font-mono text-stone-500 block">LÍMITE DE CONCURRENCIA</span>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    {selectedBackend === 'go' ? '120k req/s' : selectedBackend === 'nestjs' ? '65k req/s' : '45k req/s'}
                  </span>
                </div>

                <div className="bg-stone-900/40 p-2 rounded border border-stone-900">
                  <span className="text-[7px] font-mono text-stone-500 block">REDUNDANCIA</span>
                  <span className="text-xs font-black text-stone-300 font-mono">
                    {selectedCloudDevops === 'aws' || selectedCloudDevops === 'docker_k8s' ? 'Multi-Zona Activa' : 'Auto-Escalable'}
                  </span>
                </div>

                <div className="bg-stone-900/40 p-2 rounded border border-stone-900">
                  <span className="text-[7px] font-mono text-stone-500 block">SOPORTE TRANSACCIONAL</span>
                  <span className="text-xs font-black text-blue-400 font-mono">
                    {selectedDatabase === 'postgresql' || selectedDatabase === 'mysql' ? 'ACID Completo' : 'Eventual NoSQL'}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: LIVE SIMULATED API TERMINAL & DATABASE */}
      <section id="terminal" className="px-4 py-8 bg-stone-900/25 border-y border-stone-900 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="border-l-4 border-amber-500 pl-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 block font-bold">MÓDULO INTERACTIVO [02]</span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-stone-100">
              Consola de API & Base de Datos
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Pruebe cómo interactúan las peticiones HTTP con los servidores lógicos y modifican las tablas de bases de datos persistentes en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* API SELECTOR & INPUT FORM */}
            <div className="lg:col-span-4 bg-stone-950 p-4 rounded-2xl border border-stone-850 flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                <span className="text-[8px] uppercase font-mono tracking-widest text-amber-500 font-bold block">ENDPOINT API DISPONIBLE</span>
                
                <div className="space-y-1.5">
                  {API_ENDPOINTS.map((ep, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleEndpointSelect(ep)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        selectedEndpoint.path === ep.path
                          ? 'bg-stone-900 border-amber-500/80 text-stone-100'
                          : 'bg-stone-950 border-stone-900 text-stone-400 hover:border-stone-800'
                      }`}
                    >
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded font-mono shrink-0 mt-0.5 ${
                        ep.method === 'POST' ? 'bg-amber-600/20 text-amber-500' : 'bg-stone-900 text-stone-400'
                      }`}>
                        {ep.method}
                      </span>
                      <div className="text-left">
                        <span className="text-[10px] font-bold block font-mono leading-none mb-1">{ep.path}</span>
                        <p className="text-[8px] text-stone-500 leading-normal">{ep.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC PARAMETERS CARD */}
              <div className="bg-stone-900/40 p-3.5 rounded-xl border border-stone-900 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] uppercase font-mono tracking-widest text-stone-500 font-bold">PARÁMETROS BODY (JSON)</span>
                  <span className="text-[8px] text-amber-500 font-mono font-bold">req.body</span>
                </div>

                <div className="space-y-2">
                  {selectedEndpoint.parameters.map((param, i) => (
                    <div key={i}>
                      <label className="block text-[8px] font-mono text-stone-500 font-bold uppercase mb-0.5">
                        {param.name} {param.required && <span className="text-amber-500">*</span>}
                      </label>
                      <input 
                        type={param.type === 'number' ? 'number' : 'text'}
                        value={inputParams[param.name] || ''}
                        onChange={(e) => setInputParams({ ...inputParams, [param.name]: e.target.value })}
                        placeholder={param.placeholder}
                        className="w-full bg-stone-950 text-stone-200 px-2.5 py-1 text-xs rounded border border-stone-800 font-mono focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* EXECUTION BUTTON */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isTerminalExecuting}
                  onClick={executeEndpointSimulated}
                  className={`w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    isTerminalExecuting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isTerminalExecuting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Procesando Servidor...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
                      Ejecutar Endpoint API
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* LIVE TERMINAL CONSOLE */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* TERMINAL PANEL */}
              <div className="md:col-span-7 bg-stone-950 rounded-2xl border border-stone-850 overflow-hidden flex flex-col justify-between h-[380px] shadow-lg">
                <div className="bg-stone-900 px-4 py-2 flex items-center justify-between border-b border-stone-950">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-stone-300 font-bold">Node.js Server Output Logs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={clearTerminalLogs}
                      className="text-[8px] bg-stone-950 hover:bg-stone-850 border border-stone-800 text-stone-400 px-1.5 py-0.5 rounded font-mono"
                    >
                      Limpiar
                    </button>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                </div>

                {/* LOG BODY */}
                <div className="p-3 bg-stone-950 font-mono text-[9px] text-stone-300 overflow-y-auto flex-1 space-y-1 scrollbar-thin scrollbar-thumb-stone-800">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-tight font-medium">
                      {log.startsWith('🚀') || log.startsWith('📥') ? (
                        <span className="text-amber-400">{log}</span>
                      ) : log.startsWith('🟢') || log.startsWith('✓') ? (
                        <span className="text-emerald-400">{log}</span>
                      ) : log.startsWith('⚠️') ? (
                        <span className="text-amber-500 font-bold">{log}</span>
                      ) : (
                        <span>{log}</span>
                      )}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                <div className="bg-stone-900 px-3 py-1.5 text-[8px] font-mono text-stone-500 border-t border-stone-950 flex justify-between">
                  <span>host: 127.0.0.1:3000 (Vite proxy)</span>
                  <span>SSL: Activo</span>
                </div>
              </div>

              {/* SIMULATED RELATIONAL DATABASE DISPLAY */}
              <div className="md:col-span-5 bg-stone-950 rounded-2xl border border-stone-850 overflow-hidden flex flex-col h-[380px] shadow-lg justify-between">
                
                <div>
                  <div className="bg-stone-900 px-3.5 py-2 flex items-center justify-between border-b border-stone-950">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-mono text-stone-300 font-bold">PostgreSQL [app_db]</span>
                    </div>
                    <span className="text-[8px] uppercase font-mono text-stone-500">TABLA INTEGRAL</span>
                  </div>

                  {/* DATABASE GRID/TABLE */}
                  <div className="p-2.5 space-y-2 max-h-[300px] overflow-y-auto">
                    {simulatedDatabase.map((row, idx) => (
                      <div key={idx} className="bg-stone-900/60 p-2 rounded-lg border border-stone-900 font-mono text-[8px] space-y-1.5">
                        <div className="flex justify-between items-center border-b border-stone-950 pb-1">
                          <span className={`px-1 rounded font-black text-[7px] uppercase ${
                            row.type === 'User' ? 'bg-blue-950 text-blue-400' : row.type === 'Project' ? 'bg-amber-950 text-amber-500' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {row.type} (ID: {row.id})
                          </span>
                          <span className="text-stone-500">{row.createdAt.split(',')[1]}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-stone-300">
                          <div>
                            <span className="text-stone-500 block uppercase text-[6px]">Campo A</span>
                            <span className="truncate block font-bold">{row.fieldA}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block uppercase text-[6px]">Campo B</span>
                            <span className="truncate block">{row.fieldB}</span>
                          </div>
                        </div>
                        <div className="text-stone-400 text-[7px] leading-snug pt-1 border-t border-stone-950/40">
                          <span className="text-stone-500 uppercase text-[6px] block">Metadata</span>
                          {row.fieldC}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-900 px-3 py-1.5 text-[8px] font-mono text-stone-500 border-t border-stone-950 text-center">
                  Base de Datos Relacional Activa
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: COMPLETED PROJECTS CASE STUDIES */}
      <section id="projects" className="px-4 py-8 sm:px-6 max-w-7xl mx-auto space-y-6">
        
        <div className="border-l-4 border-amber-500 pl-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 block font-bold">PORTFOLIO DE INGENIERÍA [03]</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-stone-100">
            Sistemas Desplegados en Producción Reales
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Revisión técnica de proyectos de software construidos con arquitectura integral de punta a punta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project, idx) => (
            <div 
              key={idx}
              className="bg-stone-900/40 rounded-2xl border border-stone-850 overflow-hidden flex flex-col justify-between group hover:border-amber-500/30 transition-all hover:-translate-y-1"
            >
              <div className={`h-2 bg-gradient-to-r ${project.colorTheme}`} />
              
              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[8.5px] uppercase font-mono tracking-wider text-amber-500 font-bold block mb-1">
                    {project.subtitle}
                  </span>
                  <h3 className="text-base font-black text-stone-100 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed mt-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[8px] uppercase">
                  {project.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="bg-stone-950 text-stone-400 px-2 py-0.5 rounded border border-stone-850"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* METRICS INSIDE CARD */}
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-850 grid grid-cols-2 gap-2.5 font-mono text-[9px]">
                  <div>
                    <span className="text-stone-500 block text-[7px] uppercase">LATENCIA BASE</span>
                    <strong className="text-amber-500">{project.metrics.latency}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[7px] uppercase">UPTIME REAL</span>
                    <strong className="text-emerald-400">{project.metrics.uptime}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[7px] uppercase">CONCURRENCIA</span>
                    <strong className="text-stone-300">{project.metrics.throughput}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[7px] uppercase">PETICIONES DB</span>
                    <strong className="text-stone-300">{project.metrics.dbQueries}</strong>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-stone-950/80 border-t border-stone-900 flex justify-between items-center text-[10px] text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Producción Estable
                </span>
                <span className="text-amber-500 hover:underline cursor-pointer flex items-center gap-1">
                  Ver Arquitectura <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 4: BUDGET & SCOPE ESTIMATOR */}
      <section id="estimator" className="px-4 py-8 bg-stone-900/25 border-y border-stone-900 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="border-l-4 border-amber-500 pl-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 block font-bold">PLANIFICACIÓN FINANCIERA [04]</span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-stone-100">
              Cotizador & Estimador de Proyectos de Software
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Seleccione la complejidad comercial y los complementos que requiere su sistema para cotizar el costo, horas de ingeniería y cronograma.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* PARAMETERS SELECTION */}
            <div className="lg:col-span-5 bg-stone-950 p-5 rounded-2xl border border-stone-850 space-y-4 text-left">
              
              {/* Currency Selector */}
              <div className="flex justify-between items-center border-b border-stone-900 pb-3">
                <span className="text-xs font-bold text-stone-300">Moneda del Presupuesto</span>
                <div className="flex bg-stone-900 p-0.5 rounded-lg border border-stone-800">
                  <button
                    onClick={() => setCurrencySymbol('CRC')}
                    className={`px-2 py-1 text-[9px] font-bold rounded-md font-mono ${
                      currencySymbol === 'CRC' ? 'bg-amber-600 text-stone-950' : 'text-stone-400'
                    }`}
                  >
                    CRC (₡)
                  </button>
                  <button
                    onClick={() => setCurrencySymbol('USD')}
                    className={`px-2 py-1 text-[9px] font-bold rounded-md font-mono ${
                      currencySymbol === 'USD' ? 'bg-amber-600 text-stone-950' : 'text-stone-400'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* Project scale radio */}
              <div className="space-y-2">
                <label className="block text-[9.5px] uppercase font-mono font-bold text-stone-400 tracking-wider">
                  Escala y Complejidad del Software
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setProjectScale('mvp')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      projectScale === 'mvp' 
                        ? 'bg-stone-900 border-amber-500/80' 
                        : 'bg-stone-950 border-stone-900 hover:border-stone-800'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-bold block text-stone-200">Producto Mínimo Viable (MVP)</span>
                      <span className="text-[8px] text-stone-500">Diseñado para pruebas tempranas de mercado. 6 semanas de desarrollo.</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-500">
                      {currencySymbol === 'CRC' ? '₡350.000' : '$680'}
                    </span>
                  </button>

                  <button
                    onClick={() => setProjectScale('mid')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      projectScale === 'mid' 
                        ? 'bg-stone-900 border-amber-500/80' 
                        : 'bg-stone-950 border-stone-900 hover:border-stone-800'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-bold block text-stone-200">Plataforma Escalable Comercial</span>
                      <span className="text-[8px] text-stone-500">Integración de pasarelas, base de datos óptima y microservicios. 12 semanas.</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-500">
                      {currencySymbol === 'CRC' ? '₡650.000' : '$1,260'}
                    </span>
                  </button>

                  <button
                    onClick={() => setProjectScale('enterprise')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      projectScale === 'enterprise' 
                        ? 'bg-stone-900 border-amber-500/80' 
                        : 'bg-stone-950 border-stone-900 hover:border-stone-800'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-bold block text-stone-200">Sistema Distribuido Corporativo</span>
                      <span className="text-[8px] text-stone-500">Alta disponibilidad, seguridad robusta y colas asíncronas masivas. 24 semanas.</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-500">
                      {currencySymbol === 'CRC' ? '₡950.000' : '$1,845'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Extras Switch */}
              <div className="space-y-2 pt-1">
                <label className="block text-[9.5px] uppercase font-mono font-bold text-stone-400 tracking-wider">
                  Módulos de Ingeniería Adicionales
                </label>
                <div className="space-y-2 font-mono text-[10px]">
                  
                  <label className="flex items-center justify-between p-2.5 bg-stone-900/60 rounded-lg border border-stone-900 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={complianceNeeded} 
                        onChange={(e) => setComplianceNeeded(e.target.checked)}
                        className="rounded border-stone-800 text-amber-500 focus:ring-0 bg-stone-950" 
                      />
                      <span>Cifrado HIPAA / PCI de Datos</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-500">
                      +{currencySymbol === 'CRC' ? '₡120.000' : '$230'}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 bg-stone-900/60 rounded-lg border border-stone-900 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={extraAuth} 
                        onChange={(e) => setExtraAuth(e.target.checked)}
                        className="rounded border-stone-800 text-amber-500 focus:ring-0 bg-stone-950" 
                      />
                      <span>Multi-Autenticación (OAuth + JWT)</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-500">
                      +{currencySymbol === 'CRC' ? '₡45.000' : '$85'}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 bg-stone-900/60 rounded-lg border border-stone-900 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={extraDatabaseReplica} 
                        onChange={(e) => setExtraDatabaseReplica(e.target.checked)}
                        className="rounded border-stone-800 text-amber-500 focus:ring-0 bg-stone-950" 
                      />
                      <span>Réplica de Base de Datos Redundante</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-500">
                      +{currencySymbol === 'CRC' ? '₡95.000' : '$185'}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 bg-stone-900/60 rounded-lg border border-stone-900 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={extraRealtime} 
                        onChange={(e) => setExtraRealtime(e.target.checked)}
                        className="rounded border-stone-800 text-amber-500 focus:ring-0 bg-stone-950" 
                      />
                      <span>Sincronización WebSockets Tiempo Real</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-500">
                      +{currencySymbol === 'CRC' ? '₡75.000' : '$145'}
                    </span>
                  </label>

                </div>
              </div>

            </div>

            {/* ESTIMATION BOARD OUT */}
            <div className="lg:col-span-7 bg-stone-900/60 p-5 rounded-2xl border border-stone-800 flex flex-col justify-between space-y-4">
              
              <div>
                <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[8px] uppercase font-mono tracking-widest text-amber-500 font-bold block">TABLERO DE COTIZACIÓN</span>
                    <span className="text-xs text-stone-300 font-bold font-mono">presupuesto_detallado.json</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">
                    Soporte Técnico Incluido
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
                  
                  <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-900 text-left">
                    <span className="text-[7.5px] uppercase font-mono text-stone-500 block">COSTO TOTAL ESTIMADO</span>
                    <strong className="text-lg font-black text-amber-500 font-mono">
                      {currencySymbol === 'CRC' ? '₡' : '$'}
                      {currentEstimate.cost.toLocaleString('es-CR')}
                    </strong>
                    <span className="text-[7px] text-stone-500 block mt-0.5">Basado en el alcance actual</span>
                  </div>

                  <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-900 text-left">
                    <span className="text-[7.5px] uppercase font-mono text-stone-500 block">DURACIÓN ESTIMADA</span>
                    <strong className="text-lg font-black text-stone-200 font-mono">
                      {currentEstimate.weeks} Semanas
                    </strong>
                    <span className="text-[7px] text-stone-500 block mt-0.5">Sprints de 2 semanas c/u</span>
                  </div>

                  <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-900 text-left col-span-2 sm:col-span-1">
                    <span className="text-[7.5px] uppercase font-mono text-stone-500 block">HORAS DE INGENIERÍA</span>
                    <strong className="text-lg font-black text-stone-200 font-mono">
                      {currentEstimate.hours} Horas
                    </strong>
                    <span className="text-[7px] text-stone-500 block mt-0.5">Desarrollo y Pruebas QA</span>
                  </div>

                </div>

                {/* SPRINT TIMELINE BAR */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 text-left space-y-2.5">
                  <span className="text-[8px] uppercase font-mono text-stone-500 font-bold block">
                    Cronograma de Entrega y Despliegue de Sprint
                  </span>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-amber-600 h-full text-center" style={{ width: '20%' }} />
                    <div className="bg-amber-500 h-full text-center" style={{ width: '40%' }} />
                    <div className="bg-emerald-500 h-full text-center" style={{ width: '30%' }} />
                    <div className="bg-emerald-400 h-full text-center" style={{ width: '10%' }} />
                  </div>
                  <div className="grid grid-cols-4 text-[7px] font-mono text-stone-500">
                    <div>
                      <span className="text-amber-500 font-bold block">20% MVP ALCANCE</span>
                      Planificación & Modelado
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block">40% ESTRUCTURA</span>
                      API Backend & Base Datos
                    </div>
                    <div>
                      <span className="text-emerald-500 font-bold block">30% INTEGRACIÓN</span>
                      Frontend Consolidado
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold block">10% LANZAMIENTO</span>
                      Pruebas QA & Despliegue
                    </div>
                  </div>
                </div>

              </div>

              {/* TECHNICAL STACK DETAILED SUMMARY */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-850 text-left text-xs text-stone-400 leading-normal">
                <span className="text-[8px] uppercase font-mono text-stone-500 font-bold block mb-1">ARQUITECTURA SELECCIONADA DETALLE</span>
                Su propuesta técnica incluye el uso de <strong className="text-stone-200">{getNode(selectedFrontend).name}</strong> en el cliente, conectado de forma asíncrona mediante HTTPS seguro a un microservicio de <strong className="text-stone-200">{getNode(selectedBackend).name}</strong>. Los datos serán persistidos de manera consistente en <strong className="text-stone-200">{getNode(selectedDatabase).name}</strong> con una capa acelerada de <strong className="text-stone-200">{getNode(selectedCacheMsg).name}</strong> en caché de memoria, desplegado de forma redundante en <strong className="text-stone-200">{getNode(selectedCloudDevops).name}</strong>.
              </div>

            </div>

          </div>

        </div>
      </section>
        </div>
      )}

      {/* SECCIÓN 4: ACADEMIA DE PROGRAMACIÓN INTERACTIVA */}
      <section id="courses" className="px-4 py-8 sm:px-6 max-w-7xl mx-auto space-y-6">
        
        <div className="border-l-4 border-amber-500 pl-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 block font-bold">MÓDULO ACADÉMICO [04]</span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-stone-100">
              Academia de Programación Full-Stack & Sistemas
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Matricule cursos interactivos dictados por mí, resuelva cuestionarios de evaluación de código y descargue recursos listos para usar en producción de inmediato.
            </p>
          </div>
        </div>

        {/* CONTENEDOR DE SELECCIÓN DE ROL */}
        <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase text-amber-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Gestión de Matrícula y Activación de Accesos (WhatsApp/SINPE)
            </h4>
            <p className="text-[11.5px] text-stone-400 max-w-2xl leading-relaxed">
              Consola operativa 100% real: el estudiante se registra e inicia la confirmación del pago en la <strong>Vista Estudiante</strong>, y usted autoriza y activa de forma definitiva su acceso en la <strong>Vista Docente / Admin</strong>.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-850 w-full sm:w-auto shrink-0">
            <button
              onClick={() => changeViewMode('student')}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-[10px] sm:text-[11px] font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                viewMode === 'student'
                  ? 'bg-amber-600 text-stone-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>🎓</span>
              <span>Vista Estudiante</span>
            </button>
            <button
              onClick={() => changeViewMode('teacher')}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-[10px] sm:text-[11px] font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                viewMode === 'teacher'
                  ? 'bg-amber-600 text-stone-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>👩‍🏫</span>
              <span>Vista Docente / Admin</span>
            </button>
          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL DEL AULA VIRTUAL (WORKSPACE ACTIVO / CATALOG / ADMIN MODE) */}
        <AnimatePresence mode="wait">
          {viewMode === 'teacher' ? (
            !isTeacherUnlocked ? (
              <motion.div
                key="teacher-lock-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-stone-900 border border-amber-500/20 rounded-2xl p-6 sm:p-10 max-w-md mx-auto text-center space-y-6 shadow-2xl my-8"
              >
                <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30 text-amber-500">
                  <LockKeyhole className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-2 text-center">
                  <span className="text-[9px] font-mono uppercase bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-bold tracking-wider">
                    Panel Privado • Dirección Académica & Administración
                  </span>
                  <h3 className="text-lg font-black text-stone-100 uppercase tracking-tight">
                    Acceso Docente / Admin Bloqueado
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Por favor introduzca su PIN de seguridad de 4 dígitos para ingresar al control de matrículas, pagos y graduaciones académicas.
                  </p>
                </div>

                <form onSubmit={handleTeacherUnlock} className="space-y-4">
                  <div className="space-y-1 text-left font-mono">
                    <label className="text-[10px] font-mono text-stone-500 uppercase font-bold px-1 block text-center">PIN DE SEGURIDAD</label>
                    <input 
                      type="password" 
                      placeholder="••••"
                      value={teacherPinInput}
                      onChange={(e) => {
                        setTeacherPinInput(e.target.value);
                        setTeacherPinError('');
                      }}
                      className="w-full bg-stone-950 border border-stone-800 text-center font-mono text-2xl tracking-[0.5em] text-amber-500 py-3 rounded-xl outline-none focus:border-amber-500 transition-colors"
                      autoFocus
                    />
                    {teacherPinError && (
                      <p className="text-[10.5px] text-rose-500 font-bold font-mono mt-1 text-center">
                        ⚠ {teacherPinError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/15"
                  >
                    Desbloquear Panel 🔓
                  </button>
                  <p className="text-[10px] text-stone-500 font-mono text-center leading-relaxed">
                    💡 Tip: Su PIN son los primeros 4 dígitos de su teléfono SINPE (+506 <strong className="text-stone-400">7019</strong>-3160)
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="admin-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-stone-900 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xl w-full max-w-full overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-850 pb-3">
                  <div className="space-y-1 text-left">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 block font-bold">Consola de Control Docente & Administrativa</span>
                    <h3 className="text-xs sm:text-sm font-black text-stone-100 uppercase tracking-tight">
                      {teacherSubTab === 'enrollments' ? 'Matrículas Registradas y Control de Pagos' : 'Emisor de Títulos y Certificados Técnicos'}
                    </h3>
                    <p className="text-[10.5px] text-stone-400">
                      {teacherSubTab === 'enrollments' 
                        ? 'Verifique los comprobantes SINPE o coordine los enlaces de tarjeta. Active el acceso académico del estudiante una vez confirmado el depósito real.'
                        : 'Registre y administre las credenciales oficiales de sus egresados y genere títulos académicos estructurados y profesionales listos para imprimir.'}
                    </p>
                  </div>

                  <button
                    onClick={handleTeacherLock}
                    className="px-2.5 py-1.5 bg-stone-950 hover:bg-stone-850 text-stone-400 hover:text-amber-500 text-[10px] font-mono rounded-lg border border-stone-850/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Bloquear Panel Docente / Admin"
                  >
                    <LockKeyhole className="w-3.5 h-3.5" /> Cerrar Sesión
                  </button>
                </div>

                {/* BARRA DE SUB-TABS INTERNAS DEL PANEL */}
                <div className="flex flex-wrap items-center gap-2 border-b border-stone-850/40 pb-3">
                  <button
                    onClick={() => setTeacherSubTab('enrollments')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      teacherSubTab === 'enrollments'
                        ? 'bg-amber-600/15 text-amber-500 border border-amber-500/30 font-black shadow'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                    }`}
                  >
                    📲 Control de Matrículas
                  </button>
                  <button
                    onClick={() => setTeacherSubTab('certificates')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      teacherSubTab === 'certificates'
                        ? 'bg-amber-600/15 text-amber-500 border border-amber-500/30 font-black shadow'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                    }`}
                  >
                    🎓 Títulos y Graduaciones
                  </button>
                  <button
                    onClick={() => setTeacherSubTab('facebook')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      teacherSubTab === 'facebook'
                        ? 'bg-amber-600/15 text-amber-500 border border-amber-500/30 font-black shadow'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                    }`}
                  >
                    📢 Generador de Publicidad (Privado)
                  </button>
                </div>

                {teacherSubTab === 'enrollments' ? (
                  pendingEnrollments.length === 0 ? (
                    <div className="py-12 text-center text-stone-500 text-xs font-mono">
                      No hay solicitudes de matrícula registradas en este momento.
                    </div>
                  ) : (
                    <div className="overflow-x-auto text-left">
                      <table className="w-full text-left border-collapse font-mono text-[11px] whitespace-nowrap md:whitespace-normal">
                        <thead>
                          <tr className="border-b border-stone-850 text-stone-500 uppercase text-[9px] tracking-wider">
                            <th className="py-3 px-4">ID / Registro</th>
                            <th className="py-3 px-4">Estudiante</th>
                            <th className="py-3 px-4">Curso Solicitado</th>
                            <th className="py-3 px-4">Método / Pago</th>
                            <th className="py-3 px-4">Inversión</th>
                            <th className="py-3 px-4 text-center">Estado</th>
                            <th className="py-3 px-4 text-right">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-850/40 text-stone-300">
                          {pendingEnrollments.map((enrollment) => (
                            <tr key={enrollment.id} className="hover:bg-stone-950/40 transition-colors">
                              <td className="py-3 px-4 text-stone-500 font-bold">
                                #{enrollment.id}
                                <span className="block text-[8px] text-stone-600 font-normal mt-0.5">{enrollment.date.split(',')[0]}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-bold text-stone-200 block">{enrollment.studentName}</span>
                                <span className="text-[9px] text-stone-500 block mt-0.5">{enrollment.studentEmail}</span>
                              </td>
                              <td className="py-3 px-4 text-stone-400">
                                {enrollment.courseTitle}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase inline-block ${
                                  enrollment.paymentMethod === 'sinpe' ? 'bg-amber-950 text-amber-400' : 'bg-blue-950 text-blue-400'
                                }}`}>
                                  {enrollment.paymentMethod === 'sinpe' ? '📲 SINPE Móvil' : '💳 Tarjeta / Link'}
                                </span>
                                <span className="block text-[9px] text-stone-500 mt-1 truncate max-w-[150px]" title={enrollment.reference}>
                                  Ref: {enrollment.reference}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-stone-200 font-bold">
                                {currencySymbol === 'CRC' 
                                  ? `₡${enrollment.amount.toLocaleString('es-CR')}` 
                                  : `$${enrollment.amount.toLocaleString('en-US')}`
                                }
                              </td>
                              <td className="py-3 px-4 text-center">
                                {enrollment.status === 'pending' ? (
                                  <span className="text-amber-500 bg-amber-950/50 border border-amber-900/40 px-2 py-0.5 rounded font-black uppercase text-[8.5px] inline-block">
                                    ⏳ PENDIENTE
                                  </span>
                                ) : (
                                  <span className="text-emerald-400 bg-emerald-950/50 border border-emerald-900/40 px-2 py-0.5 rounded font-black uppercase text-[8.5px] inline-block">
                                    🟢 ACTIVADO ✓
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right">
                                {enrollment.status === 'pending' ? (
                                  <button
                                    onClick={() => handleApproveEnrollment(enrollment.id)}
                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black rounded-lg text-[9.5px] uppercase cursor-pointer transition-all hover:scale-105"
                                  >
                                    Aprobar y Activar
                                  </button>
                                ) : (
                                  <div className="text-stone-500 text-[10px] flex items-center justify-end gap-1 font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Listo
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                ) : teacherSubTab === 'certificates' ? (
                  /* TAB DE EMISIÓN DE TÍTULOS Y GRADUACIONES PROFESIONALES */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                    
                    {/* FORMULARIO DE CREACIÓN */}
                    <div className="lg:col-span-5 bg-stone-950/40 p-4 sm:p-5 rounded-xl border border-stone-850 space-y-4 text-left">
                      <div className="flex items-center gap-1.5 border-b border-stone-850 pb-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <h4 className="text-xs font-mono font-black text-amber-400 uppercase tracking-wider">
                          Emitir Credencial Oficial
                        </h4>
                      </div>
                      
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newCertStudentName.trim() || !newCertStudentEmail.trim()) return;
                        const newId = `CERT-2026-${String(issuedCertificates.length + 1).padStart(3, '0')}`;
                        const uniqueVerif = `MTR-TIT-${Math.floor(1000 + Math.random() * 9000)}-2026`;
                        const newCert = {
                          id: newId,
                          studentName: newCertStudentName,
                          studentEmail: newCertStudentEmail,
                          technicalCareer: newCertCareer,
                          issueDate: newCertDate,
                          distinction: newCertDistinction,
                          verificationCode: uniqueVerif
                        };
                        setIssuedCertificates([newCert, ...issuedCertificates]);
                        setNewCertStudentName('');
                        setNewCertStudentEmail('');
                        
                        // Show success banner
                        const successBanner = document.getElementById('cert-success-toast');
                        if (successBanner) {
                          successBanner.innerText = `¡Credencial registrada con éxito para ${newCert.studentName}! Código: ${newCert.id}`;
                          successBanner.className = "p-3 bg-emerald-950/60 border border-emerald-900/40 text-emerald-400 text-xs rounded-xl font-mono font-bold block text-center animate-pulse";
                          setTimeout(() => {
                            successBanner.className = "hidden";
                          }, 5000);
                        }
                      }} className="space-y-4 text-xs font-sans">
                        
                        <div className="space-y-1.5">
                          <label className="font-mono text-stone-500 uppercase font-bold text-[9px] block">Nombre Completo del Alumno</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ej: Sofía González Valverde"
                            value={newCertStudentName}
                            onChange={(e) => setNewCertStudentName(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-200 outline-none focus:border-amber-500 font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-stone-500 uppercase font-bold text-[9px] block">Correo Electrónico</label>
                          <input 
                            type="email" 
                            required
                            placeholder="Ej: sgonzalez@estudiante.com"
                            value={newCertStudentEmail}
                            onChange={(e) => setNewCertStudentEmail(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-200 outline-none focus:border-amber-500 font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-stone-500 uppercase font-bold text-[9px] block">Especialidad o Carrera Técnica</label>
                          <select
                            value={newCertCareer}
                            onChange={(e) => setNewCertCareer(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-300 outline-none focus:border-amber-500 font-medium"
                          >
                            <option value="Técnico Profesional en Desarrollo Full-Stack & Agentes">Técnico Profesional en Desarrollo Full-Stack & Agentes</option>
                            <option value="Técnico Especialista en Inteligencia Artificial y Agentes con Gemini API">Técnico Especialista en Inteligencia Artificial y Agentes</option>
                            <option value="Técnico Especialista en Ciberseguridad & Pentesting Profesional">Técnico Especialista en Ciberseguridad & Pentesting</option>
                            <option value="Técnico Especialista en Diseño Gráfico & UX/UI Moderno">Técnico Especialista en Diseño Gráfico & UX/UI</option>
                            <option value="Técnico en Ingeniería de Software (React, Node, SQL, Docker)">Técnico en Ingeniería de Software</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-stone-500 uppercase font-bold text-[9px] block">Distinción o Mérito Académico</label>
                          <select
                            value={newCertDistinction}
                            onChange={(e) => setNewCertDistinction(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-300 outline-none focus:border-amber-500 font-medium"
                          >
                            <option value="Graduado(a) con Honores (Summa Cum Laude)">Graduado(a) con Honores (Summa Cum Laude)</option>
                            <option value="Aprobado con Excelente Rendimiento">Aprobado con Excelente Rendimiento</option>
                            <option value="Aprobado con Mención de Honor">Aprobado con Mención de Honor</option>
                            <option value="Aprobado Satisfactoriamente">Aprobado Satisfactoriamente</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-stone-500 uppercase font-bold text-[9px] block">Fecha de Emisión</label>
                          <input 
                            type="text" 
                            required
                            value={newCertDate}
                            onChange={(e) => setNewCertDate(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-200 outline-none focus:border-amber-500 font-mono font-medium"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                        >
                          <Award className="w-4 h-4" /> Registrar y Emitir Título
                        </button>

                        <div id="cert-success-toast" className="hidden"></div>
                      </form>
                    </div>

                    {/* REGISTRO HISTÓRICO */}
                    <div className="lg:col-span-7 bg-stone-950/20 p-4 rounded-xl border border-stone-850 space-y-4 text-left">
                      <div className="flex items-center justify-between border-b border-stone-850 pb-2">
                        <div className="flex items-center gap-1.5">
                          <BookOpenCheck className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-xs font-mono font-black text-amber-400 uppercase tracking-wider">
                            Registro de Diplomas Emitidos
                          </h4>
                        </div>
                        <span className="text-[9px] text-stone-500 font-mono uppercase font-bold bg-stone-900 px-2 py-0.5 rounded">
                          {issuedCertificates.length} Títulos
                        </span>
                      </div>

                      {issuedCertificates.length === 0 ? (
                        <div className="py-16 text-center text-stone-600 font-mono text-[11px] italic">
                          No hay títulos académicos registrados en el historial de la academia.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse font-mono text-[10.5px]">
                            <thead>
                              <tr className="border-b border-stone-850/60 text-stone-500 uppercase text-[8px] tracking-wider">
                                <th className="py-2 px-3">Credencial</th>
                                <th className="py-2 px-3">Egresado(a)</th>
                                <th className="py-2 px-3">Carrera Técnica</th>
                                <th className="py-2 px-3 text-right">Acciones</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-850/30 text-stone-300">
                              {issuedCertificates.map((cert) => (
                                <tr key={cert.id} className="hover:bg-stone-950/30 transition-colors">
                                  <td className="py-3 px-3 text-amber-500 font-bold">
                                    {cert.id}
                                    <span className="block text-[7.5px] text-stone-600 font-normal mt-0.5">{cert.verificationCode}</span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className="font-bold text-stone-200 block">{cert.studentName}</span>
                                    <span className="text-[8.5px] text-stone-500 block truncate max-w-[120px]" title={cert.studentEmail}>{cert.studentEmail}</span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className="text-stone-300 font-medium block truncate max-w-[180px]" title={cert.technicalCareer}>
                                      {cert.technicalCareer}
                                    </span>
                                    <span className="text-[7.5px] text-emerald-400 block font-bold">{cert.distinction}</span>
                                  </td>
                                  <td className="py-3 px-3 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => setSelectedCertificateForView(cert)}
                                        className="px-2 py-1 bg-amber-600/10 hover:bg-amber-600 text-amber-500 hover:text-stone-950 border border-amber-500/30 font-bold rounded text-[9.5px] cursor-pointer transition-colors"
                                        title="Ver Título Imprimible"
                                      >
                                        Ver Título
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (confirm(`¿Seguro que desea eliminar de forma permanente la credencial oficial del alumno(a) ${cert.studentName}?`)) {
                                            setIssuedCertificates(issuedCertificates.filter(c => c.id !== cert.id));
                                          }
                                        }}
                                        className="p-1 text-stone-600 hover:text-rose-400 hover:bg-rose-950/20 rounded transition-colors"
                                        title="Eliminar Credencial"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                  </div>
                ) : (
                  /* TAB DE GENERACIÓN DE FICHA PUBLICITARIA PARA FACEBOOK & YOUTUBE (PRIVADO) */
                  <div className="space-y-6 text-left pt-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-850 pb-4">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-mono uppercase tracking-widest text-amber-500 block font-bold">
                          Herramientas de Marketing Digital
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-stone-100 uppercase tracking-tight flex items-center gap-2">
                          📢 Consola de Difusión y Generador de Publicidad
                        </h3>
                        <p className="text-[10.5px] text-stone-400">
                          Diseñe material persuasivo y genere guiones para Facebook y YouTube para promocionar sus cursos sin límites.
                        </p>
                      </div>

                      {/* SWITCHER DE SUB-TAB DE MARKETING */}
                      <div className="flex items-center gap-2 bg-stone-950 p-1 rounded-xl border border-stone-850 shrink-0 self-stretch sm:self-auto justify-center">
                        <button
                          type="button"
                          onClick={() => setMarketingMode('facebook')}
                          className={`px-3 py-1.5 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            marketingMode === 'facebook'
                              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-black shadow'
                              : 'text-stone-400 hover:text-stone-200 border border-transparent hover:bg-stone-900'
                          }`}
                        >
                          🔵 Facebook & Post
                        </button>
                        <button
                          type="button"
                          onClick={() => setMarketingMode('youtube')}
                          className={`px-3 py-1.5 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            marketingMode === 'youtube'
                              ? 'bg-red-600/20 text-red-400 border border-red-500/30 font-black shadow'
                              : 'text-stone-400 hover:text-stone-200 border border-transparent hover:bg-stone-900'
                          }`}
                        >
                          🔴 YouTube Script
                        </button>
                      </div>
                    </div>

                    {marketingMode === 'facebook' ? (
                      /* CONTENIDO DEL GENERADOR DE FACEBOOK: DOS COLUMNAS */
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* COLUMNA 1: AJUSTES Y CONTROLES (Lg: 5/12) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-wider font-bold block border-b border-stone-900 pb-1.5">
                      ⚙️ CONFIGURACIÓN DE PARÁMETROS
                    </span>

                    {/* SELECCIONAR CURSO */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">
                        1. Seleccione el Curso:
                      </label>
                      <select
                        value={fbSelectedCourseId}
                        onChange={(e) => setFbSelectedCourseId(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-sans focus:outline-none focus:border-amber-500"
                      >
                        {COURSES.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ENLACE DE WHATSAPP / TELÉFONO */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold flex items-center justify-between">
                        <span>2. WhatsApp de Contacto:</span>
                        <span className="text-[8px] text-stone-500 font-normal">Formato internacional</span>
                      </label>
                      <input
                        type="text"
                        value={fbCustomPhone}
                        onChange={(e) => setFbCustomPhone(e.target.value)}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const normalizedPhone = val.trim().startsWith('+') ? val.trim() : '+506 ' + val.trim();
                          setCheckoutAcademyPhone(normalizedPhone);
                          saveAcademyConfig({ fbCustomPhone: val, checkoutAcademyPhone: normalizedPhone });
                        }}
                        placeholder="Ej: 506 7019-3160"
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* TÍTULO PROMOCIONAL */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">
                        3. Eslogan o Título Promocional:
                      </label>
                      <textarea
                        value={fbCustomPromo}
                        onChange={(e) => setFbCustomPromo(e.target.value)}
                        onBlur={(e) => saveAcademyConfig({ fbCustomPromo: e.target.value })}
                        rows={3}
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-lg p-2 text-xs font-sans focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>

                    {/* ENLACE PERSONALIZADO DE LA ACADEMIA */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold flex items-center justify-between">
                        <span>4. Enlace (Link) de la Academia:</span>
                        <span className="text-[8px] text-[#fcf6ba] font-bold">¡Limpio para Clientes!</span>
                      </label>
                      <input
                        type="text"
                        value={fbCustomUrl}
                        onChange={(e) => setFbCustomUrl(e.target.value)}
                        onBlur={(e) => {
                          const val = e.target.value;
                          setFbCustomUrl(val);
                          saveAcademyConfig({ fbCustomUrl: val });
                        }}
                        placeholder="https://..."
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                      />
                      
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            const cleanUrl = fbCustomUrl || 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';
                            navigator.clipboard.writeText(cleanUrl);
                            setCopiedFloatingBannerText(true);
                            setTimeout(() => setCopiedFloatingBannerText(false), 3000);
                          }}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold font-mono transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                            copiedFloatingBannerText 
                              ? 'bg-emerald-600 text-stone-950 font-black' 
                              : 'bg-blue-600/25 hover:bg-blue-500 hover:text-stone-950 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedFloatingBannerText ? '¡Enlace Público Copiado! ✓' : 'Copiar Enlace para Clientes'}
                        </button>
                      </div>

                      <div className="bg-blue-950/40 p-2.5 rounded-lg border border-blue-500/25 text-[10px] leading-relaxed text-stone-300 space-y-1">
                        <span className="font-extrabold text-blue-400 flex items-center gap-1">
                          ⚠️ EXPLICACIÓN CLAVE DEL ENLACE:
                        </span>
                        <p>
                          Tu navegador actualmente muestra un enlace privado de desarrollo con <strong>-dev-</strong> (solo funciona para ti que estás logueado). 
                        </p>
                        <p>
                          Para tus clientes, debes usar el enlace que tiene <strong>-pre-</strong>. El botón azul de arriba lo corrige automáticamente y te copia el enlace público listo para enviar por WhatsApp o Facebook.
                        </p>
                      </div>
                    </div>

                    {/* BOTÓN DESCARGAR TEMARIO DESDE AQUÍ */}
                    <div className="pt-2 border-t border-stone-900">
                      <button
                        type="button"
                        onClick={() => {
                          const course = COURSES.find(c => c.id === fbSelectedCourseId) || COURSES[0];
                          handleDownloadSyllabus(course);
                        }}
                        className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black text-xs uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-950/20"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar Temario (Syllabus .TXT)
                      </button>
                    </div>

                  </div>
                </div>

                {/* COLUMNA 2: PREVISUALIZACIÓN EN FORMATO DE ANUNCIO DE FACEBOOK (Lg: 7/12) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider font-bold block text-center sm:text-left">
                      📢 VISTA PREVIA DEL ANUNCIO EN FACEBOOK (SISTEMA DE CAPTURA)
                    </span>

                    {(() => {
                      const course = COURSES.find(c => c.id === fbSelectedCourseId) || COURSES[0];
                      const cleanPhone = fbCustomPhone.replace(/[^0-9]/g, '');
                      const destinationUrl = fbCustomUrl;
                      
                      return (
                        <div className="bg-stone-950 rounded-2xl border border-stone-800 shadow-2xl overflow-hidden max-w-md mx-auto">
                          
                          {/* CABECERA DEL POST PATROCINADO (TIPO FACEBOOK) */}
                          <div className="p-4 flex items-center justify-between border-b border-stone-900 bg-stone-950">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#fcf6ba] via-[#bf953f] to-[#aa771c] flex items-center justify-center font-black text-stone-950 font-sans text-xs shadow-md shadow-amber-500/15 shrink-0 border border-amber-400/30">
                                <GraduationCap className="w-5.5 h-5.5 text-stone-950" />
                              </div>
                              <div className="text-left">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-[11px] text-[#fcf6ba] hover:underline cursor-pointer leading-tight block">
                                    Academia de Programación Full Stack y Sistemas
                                  </span>
                                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[7.5px] text-white font-black shrink-0" title="Página Verificada">
                                    ✓
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] text-stone-400 font-mono">
                                  <span className="text-amber-500 font-bold">FullStack Academy • Software Development</span>
                                  <span>·</span>
                                  <span>Publicidad Patrocinada</span>
                                </div>
                              </div>
                            </div>

                            {/* BOTÓN CONTEXTUAL DE COPIAR */}
                            {isTeacherUnlocked && (
                              <button
                                type="button"
                                onClick={() => {
                                  const postText = `📢 ACADEMIA DE PROGRAMACIÓN FULL STACK Y SISTEMAS\n🏢 FULLSTACK ACADEMY • SOFTWARE DEVELOPMENT\n\n${fbCustomPromo}\n\n🎯 ${course.title.toUpperCase()}: ${course.description}\n\n⏱️ Duración: ${course.durationHours} horas académicas\n📋 Acreditación: Certificación Oficial de la Academia\n\n📲 ¡Cupos limitados! Escríbenos al WhatsApp: ${fbCustomPhone}\n\n🔗 Entra aquí para ver los cursos completos:\n👉 ${destinationUrl}`;
                                  navigator.clipboard.writeText(postText);
                                  setCopiedFbText(true);
                                  setTimeout(() => setCopiedFbText(false), 3000);
                                }}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shrink-0 ${
                                  copiedFbText 
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                    : 'bg-stone-900 hover:bg-stone-850 text-amber-500 border border-stone-800'
                                }`}
                                title="Copiar texto del post al portapapeles"
                              >
                                {copiedFbText ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400 animate-bounce" /> ¡Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-amber-500" /> Copiar Texto
                                  </>
                                )}
                              </button>
                            )}
                          </div>

                          {/* TEXTO DEL POST DE ANUNCIO */}
                          <div className="px-4 py-3 text-xs text-stone-300 space-y-2 leading-relaxed text-left bg-stone-950">
                            <p className="text-amber-400 font-bold whitespace-pre-wrap">
                              {fbCustomPromo}
                            </p>
                            <p>
                              🎯 <strong>{course.title.toUpperCase()}</strong>: {course.description}
                            </p>
                            <p className="font-mono text-[11px] text-stone-400">
                              ⏱️ <strong>Duración:</strong> {course.durationHours} horas académicas <br />
                              📋 <strong>Acreditación:</strong> Certificación Oficial de la Academia
                            </p>
                            <p className="text-emerald-400 font-semibold">
                              📲 ¡Cupos limitados! Escríbenos al WhatsApp: {fbCustomPhone}
                            </p>
                            <div className="pt-1.5 border-t border-stone-900 space-y-0.5">
                              <p className="text-amber-400 font-bold text-[10.5px]">
                                🔗 Ver todos los cursos e inscribirse aquí:
                              </p>
                              <a 
                                href={destinationUrl} 
                                onClick={(e) => handleFacebookLinkClick(e, destinationUrl, course.id)}
                                className="text-sky-400 font-bold hover:underline break-all block text-[11px] cursor-pointer"
                              >
                                {destinationUrl} ↗
                              </a>
                            </div>
                          </div>

                          {/* IMAGEN DEL ANUNCIO (CARRUSEL / FLYER CARD DE ALTA CALIDAD - CAPTURABLE EN DETALLE) */}
                          <div 
                            id="facebook-flyer-capture" 
                            className="w-full p-6 bg-gradient-to-br from-stone-950 via-stone-900 to-[#12110e] border-t border-b border-stone-900 relative flex flex-col items-center space-y-4"
                          >
                            {/* GLOWS DE FONDO VIBRANTES */}
                            <div className="absolute top-4 left-4 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-4 right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                            {/* LOGOTIPO DE LA ACADEMIA Y NOMBRE EN VIVO */}
                            <div className="text-center w-full border-b border-amber-500/20 pb-3 space-y-1 z-10">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#fcf6ba] via-[#bf953f] to-[#aa771c] flex items-center justify-center font-black text-stone-950 shadow-md shadow-amber-500/20 border border-amber-400/30">
                                  <GraduationCap className="w-5.5 h-5.5 text-stone-950" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[12px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fcf6ba] via-[#bf953f] to-[#aa771c] block uppercase leading-none">
                                    Academia de Programación Full Stack y Sistemas
                                  </span>
                                  <span className="text-[8.5px] font-mono font-bold tracking-widest text-stone-400 block uppercase leading-tight mt-0.5">
                                    FullStack Academy • Software Development
                                  </span>
                                </div>
                              </div>
                              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-2" />
                            </div>

                            {/* CARD DEL CURSO CON VIVOS COLORES */}
                            <div className="w-full bg-stone-950/90 rounded-xl border-2 border-amber-500/30 p-4.5 space-y-4 shadow-2xl relative overflow-hidden z-10">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 animate-pulse" />
                              
                              <div className="flex items-center justify-between pl-1">
                                <span className="text-[8.5px] uppercase font-mono tracking-widest font-black px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/35">
                                  {course.difficulty} • MATRÍCULA ABIERTA
                                </span>
                                <span className="text-[9px] font-mono text-amber-400/90 font-bold bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                                  ⏱️ {course.durationHours} Horas Académicas
                                </span>
                              </div>

                              <h4 className="text-sm sm:text-base font-black text-[#fcf6ba] uppercase tracking-tight text-center leading-snug pl-1">
                                {course.title}
                              </h4>

                              <p className="text-[11px] text-stone-300 text-center leading-normal line-clamp-3 px-2 font-medium">
                                {course.description}
                              </p>

                              <div className="bg-stone-900/95 p-3.5 rounded-lg border border-amber-500/15 text-[10.5px] font-mono text-stone-300 space-y-2">
                                <div className="flex justify-between items-center border-b border-stone-850 pb-1.5">
                                  <span className="text-stone-400">🔥 Estado Matriculación:</span>
                                  <span className="text-emerald-400 font-extrabold uppercase text-[9.5px] bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30 shadow-sm">
                                    Activa 100% Online ✓
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-stone-400">🏆 Acreditación:</span>
                                  <span className="text-amber-400 font-bold text-[9px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                                    Certificación de Especialidad Oficial
                                  </span>
                                </div>
                              </div>

                              {/* BANNER DE INCENTIVO INFERIOR */}
                              <div className="text-center pt-1">
                                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">
                                  🔴 ¡Inicia hoy mismo con tutores virtuales de IA! 🔴
                                </span>
                              </div>

                              {/* ENLACE EN EL FLYER CARD */}
                              <div className="pt-2 border-t border-stone-900 text-center space-y-1">
                                <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest block">
                                  🔗 ENLACE DE MATRÍCULA Y TEMARIOS:
                                </span>
                                <span className="text-[10px] font-sans font-black text-[#fcf6ba] tracking-wider underline bg-stone-900/80 px-2.5 py-1 rounded border border-amber-500/20 inline-block uppercase">
                                  {destinationUrl.replace(/^https?:\/\//, '')}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* BARRA DE ENLACE DE FACEBOOK (INTERACTIVA EN LA MINI PANTALLA) */}
                          <a
                            href={destinationUrl}
                            onClick={(e) => handleFacebookLinkClick(e, destinationUrl, course.id)}
                            className="flex items-center justify-between p-3.5 bg-stone-900 hover:bg-stone-850/90 border-t border-stone-850 transition-colors cursor-pointer group text-left"
                            title="Haz clic para ver toda la oferta de cursos real"
                          >
                            <div className="space-y-0.5 max-w-[70%]">
                              <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block">
                                FULLSTACK.STUDIO
                              </span>
                              <span className="text-[11px] font-bold text-stone-200 block truncate group-hover:text-amber-400 transition-colors">
                                Clases Disponibles ¡Haz Clic para Entrar y Ver los Cursos!
                              </span>
                              <span className="text-[9px] text-stone-400 block line-clamp-1">
                                Explora planes de estudio, tutores virtuales de IA y matrícula inmediata.
                              </span>
                            </div>
                            
                            {/* BOTÓN "MÁS INFORMACIÓN / ENTRAR" */}
                            <div className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-[10px] font-black uppercase rounded-lg transition-all flex items-center gap-1 shrink-0 shadow-lg shadow-amber-500/10 group-hover:scale-105 active:scale-95">
                              Entrar al Enlace ↗
                            </div>
                          </a>

                        </div>
                      );
                    })()}

                    {/* BOTONES PRINCIPALES DE ACCIÓN DE ANUNCIO */}
                    {isTeacherUnlocked && (
                      <div className="space-y-3 max-w-md mx-auto pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           <button
                            type="button"
                            onClick={() => {
                              const course = COURSES.find(c => c.id === fbSelectedCourseId) || COURSES[0];
                              const destinationUrl = fbCustomUrl;
                              const postText = `📢 ACADEMIA DE PROGRAMACIÓN FULL STACK Y SISTEMAS\n🏢 FULLSTACK ACADEMY • SOFTWARE DEVELOPMENT\n\n${fbCustomPromo}\n\n🎯 ${course.title.toUpperCase()}: ${course.description}\n\n⏱️ Duración: ${course.durationHours} horas académicas\n📋 Acreditación: Certificación Oficial de la Academia\n\n📲 ¡Cupos limitados! Escríbenos al WhatsApp: ${fbCustomPhone}\n\n🔗 Entra aquí para ver los cursos completos:\n👉 ${destinationUrl}`;
                              navigator.clipboard.writeText(postText);
                              setCopiedFbText(true);
                              setTimeout(() => setCopiedFbText(false), 3000);
                            }}
                            className={`py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95 ${
                              copiedFbText 
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 shadow-emerald-950/20' 
                                : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-950/20'
                            }`}
                          >
                            {copiedFbText ? (
                              <>
                                <Check className="w-4 h-4 text-stone-950 animate-bounce" /> ¡Texto Copiado!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-stone-950" /> Copiar Texto
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={isCopyingImage}
                            onClick={handleCopyAdFlyerImage}
                            className={`py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95 ${
                              copiedFbImage
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 shadow-emerald-950/20'
                                : isCopyingImage
                                ? 'bg-stone-850 text-stone-500 border border-stone-850 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-indigo-950/20 border border-indigo-500/30'
                            }`}
                          >
                            {isCopyingImage ? (
                              <>
                                <RefreshCw className="w-4 h-4 text-stone-500 animate-spin" /> Renderizando...
                              </>
                            ) : copiedFbImage ? (
                              <>
                                <Check className="w-4 h-4 text-stone-950 animate-bounce" /> ¡Imagen Copiada!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-white" /> Copiar Imagen 🖼️
                              </>
                            )}
                          </button>
                        </div>

                        <button
                          type="button"
                          disabled={isCapturingAd}
                          onClick={handleCaptureAdFlyer}
                          className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95 ${
                            isCapturingAd
                              ? 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 shadow-emerald-950/20'
                          }`}
                        >
                          {isCapturingAd ? (
                            <>
                              <RefreshCw className="w-4 h-4 text-stone-500 animate-spin" /> Generando Flyer...
                            </>
                          ) : (
                            <>
                              <Camera className="w-4 h-4 text-stone-950" /> Descargar Flyer (PNG)
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <div className="mt-4 text-[9px] font-mono text-stone-500 text-center leading-relaxed max-w-sm mx-auto">
                      💡 <strong>Estructura lista como anuncio publicitario:</strong> Se eliminó el panel superior redundante y se centralizó el enlace directo en la barra de acción del anuncio. Tus clientes podrán hacer clic directamente en <strong>"Entrar al Enlace"</strong> para ser redirigidos de inmediato a tu web para ver los temarios completos.
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* CONTENIDO DEL GENERADOR DE YOUTUBE: DOS COLUMNAS */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                {/* COLUMNA 1: AJUSTES Y CONTROLES */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
                    <span className="text-[9px] font-mono text-red-500 uppercase tracking-wider font-bold block border-b border-stone-900 pb-1.5">
                      ⚙️ CONFIGURACIÓN DE YOUTUBE
                    </span>

                    {/* SELECCIONAR CURSO */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">
                        1. Seleccione el Curso:
                      </label>
                      <select
                        value={fbSelectedCourseId}
                        onChange={(e) => setFbSelectedCourseId(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-sans focus:outline-none focus:border-red-500"
                      >
                        {COURSES.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ESTILO DEL VIDEO (VIBE) */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">
                        2. Enfoque o Estilo del Video:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setYoutubeVibe('academic')}
                          className={`px-2 py-1.5 rounded-lg text-[9px] font-bold text-center border transition-all cursor-pointer ${
                            youtubeVibe === 'academic'
                              ? 'bg-red-600/20 text-red-400 border-red-500/40 font-black'
                              : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-300'
                          }`}
                        >
                          🎓 Académico
                        </button>
                        <button
                          type="button"
                          onClick={() => setYoutubeVibe('sales')}
                          className={`px-2 py-1.5 rounded-lg text-[9px] font-bold text-center border transition-all cursor-pointer ${
                            youtubeVibe === 'sales'
                              ? 'bg-red-600/20 text-red-400 border-red-500/40 font-black'
                              : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-300'
                          }`}
                        >
                          💼 Comercial
                        </button>
                        <button
                          type="button"
                          onClick={() => setYoutubeVibe('short')}
                          className={`px-2 py-1.5 rounded-lg text-[9px] font-bold text-center border transition-all cursor-pointer ${
                            youtubeVibe === 'short'
                              ? 'bg-red-600/20 text-red-400 border-red-500/40 font-black'
                              : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-300'
                          }`}
                        >
                          ⚡ Shorts/Reels
                        </button>
                      </div>
                    </div>

                    {/* TELÉFONO DE WHATSAPP */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold flex items-center justify-between">
                        <span>3. WhatsApp para Consultas:</span>
                      </label>
                      <input
                        type="text"
                        value={fbCustomPhone}
                        onChange={(e) => setFbCustomPhone(e.target.value)}
                        placeholder="Ej: 506 7019-3160"
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>

                    {/* ENLACE DE REDIRECCIÓN */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold flex items-center justify-between">
                        <span>4. Enlace de Destino (Matrícula):</span>
                      </label>
                      <input
                        type="text"
                        value={fbCustomUrl}
                        onChange={(e) => setFbCustomUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>

                    {/* INFORMACIÓN DE UTILIDAD */}
                    <div className="bg-red-950/20 p-2.5 rounded-lg border border-red-500/10 text-[10px] leading-relaxed text-stone-400 space-y-1.5">
                      <span className="font-extrabold text-red-400 block">
                        💡 TRUCO DE CRECIMIENTO:
                      </span>
                      <p>
                        Graba videos cortos explicando conceptos clave del curso (ej: "¿Cómo funciona un ledger bancario?") y coloca el guion y enlaces optimizados en la descripción y comentario fijado del video para conseguir inscripciones orgánicas automáticas 24/7.
                      </p>
                    </div>
                  </div>
                </div>

                {/* COLUMNA 2: MATERIAL GENERADO */}
                <div className="lg:col-span-7 space-y-4">
                  {(() => {
                    const course = COURSES.find(c => c.id === fbSelectedCourseId) || COURSES[0];
                    const content = generateYoutubeContent(course, youtubeVibe, fbCustomPhone, fbCustomUrl);

                    return (
                      <div className="bg-stone-950 rounded-xl border border-stone-850 p-4 space-y-5">
                        <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🎬</span>
                            <div>
                              <span className="text-[8.5px] font-mono text-red-500 font-bold uppercase tracking-widest block">
                                Material Listo para Producción
                              </span>
                              <h4 className="text-xs font-extrabold text-stone-200 uppercase tracking-tight">
                                Guion y SEO de YouTube
                              </h4>
                            </div>
                          </div>

                          <div className="text-[8.5px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-black uppercase">
                            Modo {youtubeVibe === 'short' ? 'Short/TikTok' : youtubeVibe === 'sales' ? 'Venta Comercial' : 'Educativo/SEO'}
                          </div>
                        </div>

                        {/* PROPUESTA DE TÍTULOS */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold">
                            💡 OPCIONES DE TÍTULOS (ALTA TASA DE CLICK):
                          </span>
                          <div className="space-y-1.5">
                            {content.titles.map((t, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                                <p className="text-xs text-stone-200 font-semibold italic">"{t}"</p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(t);
                                    setCopiedYtText(true);
                                    setTimeout(() => setCopiedYtText(false), 2000);
                                  }}
                                  className="text-[9.5px] font-bold text-red-400 hover:text-red-300 font-mono px-2 py-0.5 rounded hover:bg-stone-850 transition-all cursor-pointer"
                                >
                                  Copiar
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* GUION TÉCNICO DE VIDEO */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold">
                              📝 GUION PARA GRABAR (SCRIPT DE VIDEO):
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(content.script);
                                setCopiedYtText(true);
                                setTimeout(() => setCopiedYtText(false), 2000);
                              }}
                              className="text-[9px] font-mono text-red-400 hover:text-red-300 font-black cursor-pointer bg-red-950/25 px-2.5 py-1 rounded border border-red-500/20"
                            >
                              Copiar Guion Completo
                            </button>
                          </div>
                          <div className="bg-stone-900/90 rounded-lg p-3 border border-stone-850 max-h-48 overflow-y-auto font-mono text-[10px] leading-relaxed whitespace-pre-wrap text-stone-300">
                            {content.script}
                          </div>
                        </div>

                        {/* DESCRIPCIÓN RECOMENDADA */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold">
                              📥 DESCRIPCIÓN OPTIMIZADA (COPIAR EN YOUTUBE):
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(content.description);
                                setCopiedYtText(true);
                                setTimeout(() => setCopiedYtText(false), 2000);
                              }}
                              className="text-[9px] font-mono text-red-400 hover:text-red-300 font-black cursor-pointer bg-red-950/25 px-2.5 py-1 rounded border border-red-500/20"
                            >
                              Copiar Descripción
                            </button>
                          </div>
                          <div className="bg-stone-900/90 rounded-lg p-3 border border-stone-850 max-h-40 overflow-y-auto font-sans text-[10px] leading-relaxed whitespace-pre-wrap text-stone-300">
                            {content.description}
                          </div>
                        </div>

                        {/* PALABRAS CLAVE (SEO TAGS) */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold">
                              🏷️ ETIQUETAS DE BÚSQUEDA (SEO TAGS):
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(content.tags);
                                setCopiedYtText(true);
                                setTimeout(() => setCopiedYtText(false), 2000);
                              }}
                              className="text-[9px] font-mono text-red-400 hover:text-red-300 font-black cursor-pointer bg-red-950/25 px-2.5 py-1 rounded border border-red-500/20"
                            >
                              Copiar Etiquetas
                            </button>
                          </div>
                          <div className="bg-stone-900/40 rounded-lg p-2.5 border border-stone-850 text-[10px] font-mono text-stone-400 leading-normal">
                            {content.tags}
                          </div>
                        </div>

                        {copiedYtText && (
                          <div className="text-center text-[10px] font-bold text-emerald-400 bg-emerald-950/50 py-1.5 rounded border border-emerald-500/20 animate-pulse">
                            ¡Texto copiado exitosamente al portapapeles! ✓
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

          </div>
        )}

        </motion.div>
      )
    ) : viewMode === 'certificate' ? (
      <motion.div
        key="certificate-view"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="w-full"
      >
        <CertificateEditor onBack={() => changeViewMode('student')} />
      </motion.div>
    ) : viewMode === 'sexto-grado' ? (
            <motion.div
              key="sexto-grado-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-stone-900 border border-emerald-950 rounded-2xl p-4 sm:p-6 space-y-6 shadow-2xl text-left"
            >
              <SextoGradoPortal onBackToAcademia={() => changeViewMode('student')} />
            </motion.div>
          ) : viewMode === 'geometria' ? (
            <motion.div
              key="geometria-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-950 border border-cyan-900/50 rounded-2xl p-4 sm:p-6 space-y-6 shadow-2xl text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-800/40 uppercase">
                      Aula Virtual • Sexto Grado MEP
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">
                      ★ Pizarra Libre de Trazo, Polígonos & Albert Einstein
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Shapes className="w-6 h-6 text-cyan-400" />
                    <span>Estudio Geométrico, Polígonos y Dibujo Libre</span>
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeViewMode('sexto-grado')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>🎒 Ir a Sexto Grado</span>
                  </button>
                  <button
                    onClick={() => changeViewMode('student')}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-750 text-stone-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>🏫 Catálogo de Cursos</span>
                  </button>
                </div>
              </div>

              <GeometryStudio
                onAskEinstein={() => changeViewMode('sexto-grado')}
              />
            </motion.div>
          ) : activeCourseInWorkspace ? (() => {
            const activeCourseResolved = resolveCourseTranslation(activeCourseInWorkspace, targetLanguage);
            
            // Resolve activeTopicResolved dynamically from the translated active course structure
            const activeTopicResolved = (() => {
              if (!activeTopic) return null;
              for (const mod of activeCourseResolved.modules) {
                for (const t of mod.topics) {
                  if (t.title === activeTopic.title || t.quizQuestion?.question === activeTopic.quizQuestion?.question) {
                    return t;
                  }
                }
              }
              return activeTopic;
            })();

            return (
              <motion.div 
                key="workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-stone-900 border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* HEADER DEL AULA VIRTUAL */}
                <div className="bg-stone-950 px-4 py-2 border-b border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
                    <BookOpenCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 block font-bold">
                      Plataforma de Aprendizaje • Activa
                    </span>
                    <h3 className="text-xs font-black text-stone-100 uppercase">
                      {activeCourseResolved.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900 rounded-md">
                    Acceso Autorizado ✓
                  </span>
                  <button 
                    onClick={() => setActiveCourseInWorkspace(null)}
                    className="text-[10.5px] font-mono font-bold text-stone-400 hover:text-stone-100 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 hover:border-stone-700 transition-colors cursor-pointer"
                  >
                    Salir de Clase
                  </button>
                </div>
              </div>

              {/* CUERPO DEL AULA VIRTUAL (SPLIT-PANE) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[450px]">
                
                {/* PANEL IZQUIERDO: SELECCIÓN DE LECCIONES / TEMARIO */}
                <div className="lg:col-span-4 bg-stone-950/60 border-r border-stone-850 p-3 space-y-3 max-h-[500px] overflow-y-auto">
                  
                  {/* CONTROL DE MENSUALIDADES (DISPONIBLE PARA CARRERAS Y CURSOS MULTI-MÓDULO) */}
                  {activeCourseResolved.modules.length > 1 && (
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between border-b border-stone-800/80 pb-1.5">
                        <span className="text-[9.5px] font-mono font-black text-amber-500 uppercase tracking-wider flex items-center gap-1">
                          🗓️ Mensualidades de la Carrera
                        </span>
                        <span className="text-[8.5px] text-emerald-400 font-mono font-bold bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-900/30">
                          ₡35.000 / mes
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-stone-400 leading-tight">
                        La carrera tiene una duración de <strong className="text-stone-300">{activeCourseResolved.modules.length} meses</strong>. Al completar el pago mensual vía walink/SINPE, se desbloquean inmediatamente las lecciones del mes correspondiente:
                      </p>

                      <div className="grid grid-cols-3 gap-1 pt-1">
                        {activeCourseResolved.modules.map((mod, idx) => {
                          const isPaid = coursePaidMonths[activeCourseResolved.id]?.[idx] || unlockedCourseIds.includes(activeCourseResolved.id) || (activeCourseResolved.id === 'course-graphic-design' && graphicDesignPaidMonths[idx]) || isTeacherUnlocked;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (!isPaid) {
                                  handleStartMonthlyCheckout(activeCourseResolved, idx);
                                } else {
                                  const topicKey = `${activeCourseResolved.id}-${idx}-0`;
                                  const module = activeCourseResolved.modules[idx];
                                  if (module && module.topics[0]) {
                                    handleSelectTopic(module.topics[0], topicKey);
                                  }
                                }
                              }}
                              className={`p-1.5 rounded-lg text-center transition-all flex flex-col items-center justify-center border cursor-pointer ${
                                isPaid 
                                  ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400 hover:bg-emerald-950/40' 
                                  : 'bg-stone-950 border-stone-850 hover:border-amber-500/30 text-stone-500 hover:text-stone-300'
                              }`}
                            >
                              <span className="text-[8px] font-black font-mono block">MES {idx + 1}</span>
                              {isPaid ? (
                                <span className="text-[8px] font-semibold text-emerald-400 block mt-0.5">Activo ✓</span>
                              ) : (
                                <span className="text-[8px] text-amber-500 font-black flex items-center gap-0.5 mt-0.5">
                                  🔒 Pagar
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest border-b border-stone-900 pb-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>Syllabus / Temario Oficial</span>
                      <button
                        onClick={() => handleDownloadSyllabus(activeCourseResolved)}
                        className="text-[9px] font-mono text-amber-500 hover:text-amber-400 flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/20 active:scale-95 transition-all cursor-pointer"
                        title="Descargar el temario de este curso en un archivo de texto listo para usar"
                      >
                        <Download className="w-2.5 h-2.5" /> Bajar Temario (TXT)
                      </button>
                    </div>
                    {activeCourseResolved.modules.length > 1 && (
                      <span className="text-[8px] font-mono text-amber-500 lowercase bg-amber-950/20 px-1 py-0.2 rounded">
                        duración: {activeCourseResolved.modules.length} meses
                      </span>
                    )}
                  </div>

                  {activeCourseResolved.modules.map((mod, modIdx) => {
                    const isModuleLocked = (() => {
                      if (unlockedCourseIds.includes(activeCourseResolved.id)) return false;
                      const paidMonths = coursePaidMonths[activeCourseResolved.id];
                      if (paidMonths) {
                        return !paidMonths[modIdx];
                      }
                      if (activeCourseResolved.id === 'course-graphic-design') {
                        return !graphicDesignPaidMonths[modIdx];
                      }
                      return true;
                    })();
                    return (
                      <div key={modIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-black text-stone-300 px-1 py-1">
                          <span className={`truncate ${isModuleLocked ? 'text-stone-500' : ''}`}>{mod.title}</span>
                          <span className="text-[9px] font-mono text-amber-500 font-normal shrink-0">{mod.duration}</span>
                        </div>

                        <div className="space-y-1 pl-2 border-l border-stone-800">
                          {mod.topics.map((topic, topicIdx) => {
                            const topicKey = `${activeCourseResolved.id}-${modIdx}-${topicIdx}`;
                            const isCurrent = selectedTopicKey === topicKey;
                            return (
                              <button
                                key={topicIdx}
                                onClick={() => {
                                  if (isModuleLocked) {
                                    handleStartMonthlyCheckout(activeCourseResolved, modIdx);
                                  } else {
                                    handleSelectTopic(topic, topicKey);
                                  }
                                }}
                                className={`w-full text-left text-xs p-2 rounded-lg transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                  isCurrent 
                                    ? 'bg-amber-600/15 border border-amber-500/40 text-amber-400 font-bold' 
                                    : isModuleLocked
                                      ? 'hover:bg-stone-900/50 text-stone-600'
                                      : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    isCurrent 
                                      ? 'bg-amber-500 animate-pulse' 
                                      : isModuleLocked 
                                        ? 'bg-stone-850' 
                                        : 'bg-stone-700'
                                  }`} />
                                  <span className="truncate">{topic.title}</span>
                                </div>
                                {isModuleLocked && (
                                  <span className="text-[9px] text-amber-500/80 font-mono">
                                    🔒
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PANEL DERECHO: VISOR DE LECCIÓN Y EVALUACIÓN INTERACTIVA */}
                <div className="lg:col-span-8 p-3 sm:p-4.5 space-y-4 max-h-[500px] overflow-y-auto bg-stone-900/30 animate-fade-in flex flex-col justify-between">
                  
                  {/* SELECCIÓN DE PESTAÑA: LECCIÓN VS TUTOR IA VS SIMULADOR */}
                  <div className="flex items-center justify-between border-b border-stone-850 pb-3 gap-3">
                    <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-850">
                      <button
                        onClick={() => setWorkspaceActiveTab('lesson')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          workspaceActiveTab === 'lesson'
                            ? 'bg-amber-600 text-stone-950 font-black'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        📖 Contenido de Lección
                      </button>

                      {activeCourseResolved.id === 'course-fintech' && (
                        <button
                          onClick={() => setWorkspaceActiveTab('simulator')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            workspaceActiveTab === 'simulator'
                              ? 'bg-amber-600 text-stone-950 font-black'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          <Coins className="w-3.5 h-3.5" />
                          ⚡ Plataforma Fintech
                        </button>
                      )}

                      <button
                        onClick={() => setWorkspaceActiveTab('ai-tutor')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          workspaceActiveTab === 'ai-tutor'
                            ? 'bg-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/20'
                            : 'text-stone-300 hover:text-white bg-stone-900/60'
                        }`}
                      >
                        <Bot className="w-3.5 h-3.5 text-amber-400" />
                        <span>🤖 Tutor Albert Einstein (I.A.)</span>
                        <span className="bg-amber-950 text-amber-400 text-[8.5px] px-1.5 py-0.5 rounded font-black uppercase animate-pulse border border-amber-800/40">Activo 24/7</span>
                      </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9.5px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-stone-500 font-bold uppercase tracking-wider">AULA 100% VIRTUAL</span>
                    </div>
                  </div>

                  {(() => {
                    const isCurrentTopicLocked = (() => {
                      if (!selectedTopicKey) return true;
                      const parts = selectedTopicKey.split('-');
                      if (parts.length < 3) return true;
                      const courseId = parts.slice(0, parts.length - 2).join('-');
                      const modIdx = parseInt(parts[parts.length - 2], 10);
                      
                      if (unlockedCourseIds.includes(courseId)) return false;
                      const paidMonths = coursePaidMonths[courseId];
                      if (paidMonths) {
                        return !paidMonths[modIdx];
                      }
                      if (courseId === 'course-graphic-design') {
                        return !graphicDesignPaidMonths[modIdx];
                      }
                      return true;
                    })();

                    const currentTopicMonthIndex = (() => {
                      if (!selectedTopicKey) return 0;
                      const parts = selectedTopicKey.split('-');
                      if (parts.length < 3) return 0;
                      return parseInt(parts[parts.length - 2], 10);
                    })();

                    if (workspaceActiveTab === 'simulator') {
                      return <FintechSimulator />;
                    }

                    if (workspaceActiveTab === 'lesson') {
                      if (isCurrentTopicLocked) {
                        return (
                          <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-stone-950/80 border border-amber-500/20 rounded-2xl space-y-6 my-auto min-h-[400px]">
                            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                              <LockKeyhole className="w-8 h-8" />
                            </div>
                            
                            <div className="space-y-2 max-w-md">
                              <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-900/30 font-bold">
                                ACCESO RESTRINGIDO • ADQUIERA EL CURSO
                              </span>
                              <h4 className="text-lg font-black text-stone-100 tracking-tight uppercase">
                                {activeCourseResolved.modules.length > 1 
                                  ? `Módulo ${currentTopicMonthIndex + 1}: ${activeCourseResolved.modules[currentTopicMonthIndex]?.title || 'Contenido Premium'}`
                                  : activeCourseResolved.title
                                }
                              </h4>
                              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                                Para acceder a las lecciones de código interactivo, arquitectura del sistema, cuestionarios de autoevaluación y tutorías guiadas de esta unidad de <strong>{activeCourseResolved.title}</strong>, es necesario completar el pago correspondiente.
                              </p>
                            </div>

                            <div className="bg-stone-900/80 border border-stone-850 p-4 rounded-xl w-full max-w-sm flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                              <div className="text-center sm:text-left">
                                <span className="text-[10px] text-stone-500 uppercase font-mono block">
                                  {activeCourseResolved.modules.length > 1 ? 'Pago Mensual' : 'Inversión Única'}
                                </span>
                                <span className="text-base font-black text-emerald-400">
                                  {currencySymbol === 'CRC'
                                    ? `₡${(activeCourseResolved.modules.length > 1 ? 35000 : activeCourseResolved.priceCRC).toLocaleString('es-CR')} CRC`
                                    : `$${(activeCourseResolved.modules.length > 1 ? 68 : activeCourseResolved.priceUSD).toLocaleString('en-US')} USD`
                                  }
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  if (activeCourseResolved.modules.length > 1) {
                                    handleStartMonthlyCheckout(activeCourseResolved, currentTopicMonthIndex);
                                  } else {
                                    handleStartCheckout(activeCourseResolved);
                                  }
                                }}
                                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black px-4 py-2.5 rounded-lg transition-all shadow-[0_4px_12px_rgba(245,158,11,0.2)] cursor-pointer"
                              >
                                {activeCourseResolved.modules.length > 1 ? 'Pagar Mensualidad' : 'Matricular y Desbloquear'}
                              </button>
                            </div>
                            
                            <p className="text-[9px] text-stone-500 font-mono">
                              * El desbloqueo se procesa al instante tras procesar su tarjeta o confirmar la transferencia SINPE.
                            </p>
                          </div>
                        );
                      }

                      return activeTopicResolved ? (
                        <div className="space-y-5 pt-2">
                          
                          {/* TÍTULO DE LA LECCIÓN */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono bg-stone-800 text-stone-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                              Lección Interactiva Activa • Virtual
                            </span>
                            <h4 className="text-lg font-black text-stone-100 tracking-tight mt-1">
                              {activeTopicResolved.title}
                            </h4>
                          </div>

                          {/* CONTENIDO TEÓRICO */}
                          <div className="text-stone-300 text-xs sm:text-sm leading-relaxed bg-stone-950/40 p-4 rounded-xl border border-stone-850/60 font-sans">
                            {activeTopicResolved.content}
                          </div>

                          {/* EDITOR DE CÓDIGO DE MUESTRA / RECURSOS DE DISEÑO (Oculto para alumnos, visible para profesora) */}
                          {isAdminMode && activeTopicResolved.codeSnippet && (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 uppercase px-1">
                                <span>{activeCourseResolved.id === 'course-graphic-design' ? 'Sintaxis de Estructura de Diseño / Recursos SVG' : 'Sintaxis Real Destacada (Copia Inteligente)'}</span>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(activeTopicResolved.codeSnippet || '');
                                  }}
                                  className="hover:text-amber-500 transition-colors cursor-pointer"
                                >
                                  [Copiar Código]
                                </button>
                              </div>
                              <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 overflow-x-auto font-mono text-xs text-stone-300 shadow-inner">
                                <pre>{activeTopicResolved.codeSnippet}</pre>
                              </div>
                            </div>
                          )}

                          {/* EVALUADOR AUTOMATIZADO / CUESTIONARIO */}
                          {activeTopicResolved.quizQuestion && (
                            <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-850 space-y-4">
                              <div className="flex items-center gap-2 border-b border-stone-900 pb-2">
                                <Award className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-black uppercase font-mono tracking-wider text-amber-400">
                                  Autoevaluación de Código
                                </span>
                              </div>

                              <div className="text-xs sm:text-sm font-semibold text-stone-200">
                                {activeTopicResolved.quizQuestion.question}
                              </div>

                              <div className="space-y-2">
                                {activeTopicResolved.quizQuestion.options.map((option, optIdx) => (
                                  <button
                                    key={optIdx}
                                    onClick={() => !quizIsAnswered && setQuizSelectedOption(optIdx)}
                                    className={`w-full text-left text-xs p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                                      quizSelectedOption === optIdx 
                                        ? 'bg-amber-600/10 border-amber-500/60 text-amber-300 font-semibold' 
                                        : 'bg-stone-900/40 border-stone-850 hover:border-stone-800 text-stone-400 hover:text-stone-200'
                                    }`}
                                    disabled={quizIsAnswered}
                                  >
                                    <span className="font-mono text-amber-500 font-bold shrink-0">[{optIdx + 1}]</span>
                                    <span>{option}</span>
                                  </button>
                                ))}
                              </div>

                              {/* ACCIONES DEL CUESTIONARIO */}
                              <div className="flex items-center justify-between pt-2">
                                <span className="text-[10px] font-mono text-stone-500">
                                  Seleccione una opción y presione Verificar
                                </span>

                                {!quizIsAnswered ? (
                                  <button
                                    onClick={handleVerifyQuiz}
                                    disabled={quizSelectedOption === null}
                                    className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 text-xs font-black rounded-lg transition-colors cursor-pointer"
                                  >
                                    Verificar Respuesta
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setQuizSelectedOption(null);
                                      setQuizIsAnswered(false);
                                      setIsQuizCorrect(null);
                                    }}
                                    className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                  >
                                    Intentar de Nuevo
                                  </button>
                                )}
                              </div>

                              {/* COMPROBANTE DE EVALUACIÓN FEEDBACK */}
                              {quizIsAnswered && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`p-3.5 rounded-lg border text-xs leading-normal ${
                                    isQuizCorrect 
                                      ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300' 
                                      : 'bg-rose-950/50 border-rose-500/30 text-rose-300'
                                  }`}
                                >
                                  <div className="font-black mb-1 flex items-center gap-1.5">
                                    {isQuizCorrect ? (
                                      <>✓ ¡EXCELENTE! RESPUESTA CORRECTA</>
                                    ) : (
                                      <>✗ RESPUESTA INCORRECTA</>
                                    )}
                                  </div>
                                  <p className="opacity-95 font-sans leading-relaxed">
                                    {activeTopicResolved.quizQuestion.explanation}
                                  </p>
                                </motion.div>
                              )}

                            </div>
                          )}

                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-3 flex-1">
                          <BookOpen className="w-12 h-12 text-stone-700 animate-bounce" />
                          <div className="text-stone-400 text-xs max-w-xs leading-relaxed font-mono">
                            Seleccione una lección del syllabus de la izquierda para comenzar su sesión de entrenamiento interactivo.
                          </div>
                        </div>
                      );
                    } else {
                      /* PESTAÑA: TUTOR INTELIGENTE IA (CHAT EN VIVO CON GEMINI) */
                      if (isCurrentTopicLocked) {
                        return (
                          <div className="flex flex-col items-center justify-center text-center p-6 bg-stone-950/80 border border-amber-500/20 rounded-2xl space-y-4 my-auto min-h-[300px]">
                            <LockKeyhole className="w-8 h-8 text-amber-500 animate-pulse" />
                            <h4 className="text-sm font-black text-stone-100 uppercase">Soporte Académico Bloqueado para esta Lección</h4>
                            <p className="text-xs text-stone-400 max-w-sm">
                              Para consultar a su Mentor de Soporte sobre el temario del <strong className="text-stone-300">Mes {currentTopicMonthIndex + 1}</strong>, debes activar este mes efectuando el pago de tu mensualidad de la carrera.
                            </p>
                            <button
                              onClick={() => handleStartMonthlyCheckout(activeCourseResolved, currentTopicMonthIndex)}
                              className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-[11px] font-black px-4 py-2 rounded-lg cursor-pointer transition-all"
                            >
                              Pagar Mensualidad ₡35,000 CRC
                            </button>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="flex flex-col h-full justify-between space-y-4 pt-2 flex-1">
                          {/* Header Context Bar with Albert Einstein */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-950 p-3 rounded-2xl border border-amber-500/30 text-[10px] font-mono shadow-xl gap-2">
                            <div className="flex items-center gap-3 text-stone-200">
                              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-0.5 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                                <div className="w-full h-full rounded-2xl bg-stone-950 flex items-center justify-center text-lg">
                                  👴
                                </div>
                              </div>
                              <div className="text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-xs text-amber-400 uppercase tracking-tight">Profesor Albert Einstein</span>
                                  <span className="bg-emerald-950/80 text-emerald-300 text-[8px] px-2 py-0.5 rounded-full border border-emerald-800/50 font-black tracking-wide">
                                    TUTOR I.A. ACTIVO 24/7
                                  </span>
                                </div>
                                <div className="text-[10px] text-stone-400">
                                  {activeTopicResolved ? (
                                    <span>Tutoría pedagógica para: <strong className="text-stone-200">{activeTopicResolved.title}</strong></span>
                                  ) : (
                                    <span>Tutor oficial de programación, lógica de software y matemáticas</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-stone-400 text-[9px] font-mono border-t sm:border-t-0 border-stone-850 pt-1.5 sm:pt-0">
                              <span className="text-amber-400 font-bold italic">"El aprendizaje es experiencia"</span>
                              <span className="text-stone-500 text-[8px]">Gemini 2.5 Flash • Explicaciones Paso a Paso</span>
                            </div>
                          </div>

                          {/* Messages Container */}
                          <div className="flex-1 min-h-[220px] max-h-[320px] overflow-y-auto space-y-3 p-3 bg-stone-950/40 rounded-xl border border-stone-850/60 font-mono text-[11px] leading-relaxed text-left">
                            {aiMessages.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                              >
                                {msg.sender === 'ai' && (
                                  <div className="flex items-center gap-1.5 mb-1 px-1">
                                    <span className="text-xs">👴</span>
                                    <span className="text-[9px] font-black text-amber-400 uppercase tracking-wider">
                                      Profesor Albert Einstein (Tutor I.A.)
                                    </span>
                                  </div>
                                )}
                                <div
                                  className={`p-3 rounded-2xl max-w-[88%] whitespace-pre-wrap leading-relaxed shadow-sm ${
                                    msg.sender === 'user'
                                      ? 'bg-amber-600/20 border border-amber-500/40 text-stone-100 rounded-tr-none'
                                      : 'bg-stone-950/95 border border-stone-800 text-stone-200 rounded-tl-none'
                                  }`}
                                >
                                  {msg.text}
                                </div>
                                <span className="text-[8.5px] text-stone-500 mt-1 px-1">{msg.timestamp}</span>
                              </div>
                            ))}
                            
                            {aiIsLoading && (
                              <div className="flex items-center gap-2 text-stone-400 italic text-[10.5px] bg-stone-950/60 p-2.5 rounded-xl border border-stone-850 w-fit">
                                <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                                <span>El Profesor Albert Einstein está formulando su respuesta pedagógica...</span>
                              </div>
                            )}
                          </div>

                          {/* Quick Prompts Chips */}
                          <div className="space-y-1.5">
                            <span className="text-[9.5px] font-mono text-stone-500 uppercase tracking-wider block font-bold">Consultas Pedagógicas Sugeridas:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeTopicResolved && (
                                <button
                                  onClick={() => sendAiMessageText(`Profesor Albert Einstein, por favor explícame detalladamente la lección "${activeTopicResolved.title}" con un ejemplo práctico de código paso a paso.`)}
                                  disabled={aiIsLoading}
                                  className="px-2.5 py-1 bg-stone-950 hover:bg-stone-850 text-amber-300 border border-amber-500/30 hover:border-amber-500/50 rounded-lg text-[10px] cursor-pointer transition-colors disabled:opacity-50 font-bold"
                                >
                                  💡 Explicar lección paso a paso
                                </button>
                              )}
                              <button
                                onClick={() => sendAiMessageText("Profesor Einstein, ¿cuál es la mejor metodología para razonar la lógica de un algoritmo antes de escribir código?")}
                                disabled={aiIsLoading}
                                className="px-2.5 py-1 bg-stone-950 hover:bg-stone-850 text-stone-300 border border-stone-850 hover:border-stone-750 rounded-lg text-[10px] cursor-pointer transition-colors disabled:opacity-50"
                              >
                                🧠 Cómo razonar la lógica
                              </button>
                              <button
                                onClick={() => sendAiMessageText("Profesor Einstein, ¿puedes darme un ejemplo práctico del mundo real de cómo se aplica este conocimiento en una empresa de software?")}
                                disabled={aiIsLoading}
                                className="px-2.5 py-1 bg-stone-950 hover:bg-stone-850 text-stone-300 border border-stone-850 hover:border-stone-750 rounded-lg text-[10px] cursor-pointer transition-colors disabled:opacity-50"
                              >
                                🔬 Ejemplo del mundo real
                              </button>
                              <button
                                onClick={() => sendAiMessageText("Profesor Einstein, ¿qué errores comunes cometen los principiantes al programar y cómo evitarlos?")}
                                disabled={aiIsLoading}
                                className="px-2.5 py-1 bg-stone-950 hover:bg-stone-850 text-stone-300 border border-stone-850 hover:border-stone-750 rounded-lg text-[10px] cursor-pointer transition-colors disabled:opacity-50"
                              >
                                🛠️ Errores comunes a evitar
                              </button>
                            </div>
                          </div>

                          {/* Input Form */}
                          <form onSubmit={handleSendAiMessage} className="flex gap-2">
                            <input
                              type="text"
                              value={aiInput}
                              onChange={(e) => setAiInput(e.target.value)}
                              placeholder={activeTopicResolved ? `Preguntar sobre "${activeTopicResolved.title}"...` : "Pregunta sobre programación o dudas conceptuales..."}
                              className="flex-1 bg-stone-950 border border-stone-850 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                              disabled={aiIsLoading}
                            />
                            <button
                              type="submit"
                              disabled={!aiInput.trim() || aiIsLoading}
                              className="px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1 shrink-0"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Enviar</span>
                            </button>
                          </form>
                        </div>
                      );
                    }
                  })()}
                </div>

              </div>
            </motion.div>
          );
        })() : (
            /* SECCIÓN DE CATÁLOGO */
            <div key="catalog" className="space-y-6">
              {/* BANNER DE DESCARGA RÁPIDA DE LA CARRERA DE FINTECH PARA BANCOS */}
              <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/20 border border-stone-850 hover:border-amber-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-left transition-all">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[8px] font-mono font-black text-amber-500 uppercase tracking-wider px-1.5 py-0.5 bg-amber-950/60 rounded border border-amber-900/40 w-fit block">
                      📥 Descarga de Temario Oficial
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider px-1.5 py-0.5 bg-emerald-950/60 rounded border border-emerald-900/40 w-fit block font-bold">
                      Para Bancos
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-stone-100 uppercase tracking-tight">
                    Especialización Avanzada en FinTech Ledger & Arquitectura Bancaria
                  </h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed max-w-3xl">
                    Obtenga el plan de estudios completo, competencias y temario oficial de la carrera de <strong className="text-stone-300">FinTech para Bancos</strong> en formato portable de manera inmediata y sin necesidad de ingresar al curso o registrarse.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch gap-2 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => {
                      const fintechCourse = COURSES.find(c => c.id === 'course-fintech');
                      if (fintechCourse) handleDownloadSyllabus(fintechCourse);
                    }}
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-[10.5px] uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 shadow-md shadow-amber-950/20"
                  >
                    <Download className="w-3.5 h-3.5" /> Bajar Temario (Syllabus)
                  </button>
                  <button
                    onClick={() => handleCopyCourseLink('course-fintech')}
                    className="px-3 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800 rounded-xl font-bold text-[10.5px] uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copiar Enlace
                  </button>
                </div>
              </div>

              {/* BARRA DE NAVEGACIÓN, BÚSQUEDA Y CENTRO DE VENTAS */}
              {(() => {
                const filteredCourses = COURSES.filter(course => {
                  const matchesCategory = courseCategoryFilter === 'all' || getCourseCategory(course.id) === courseCategoryFilter;
                  const matchesSearch = !courseSearchTerm.trim() || 
                    course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                    course.description.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                    course.difficulty.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                    course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                    course.modules.some(m => m.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) || m.topics.some(t => t.title.toLowerCase().includes(courseSearchTerm.toLowerCase())));
                  return matchesCategory && matchesSearch;
                });

                const dbCount = COURSES.filter(c => getCourseCategory(c.id) === 'database').length;
                const progCount = COURSES.filter(c => getCourseCategory(c.id) === 'programming').length;
                const aiCount = COURSES.filter(c => getCourseCategory(c.id) === 'ai').length;
                const devopsCount = COURSES.filter(c => getCourseCategory(c.id) === 'devops').length;
                const mobileCount = COURSES.filter(c => ['mobile', 'other'].includes(getCourseCategory(c.id))).length;

                return (
                  <div className="space-y-4">
                    {/* PANEL DE CONTROL: BUSCADOR, CATEGORÍAS Y BOTÓN DE ENLACES */}
                    <div className="bg-stone-900/90 border border-stone-850 rounded-2xl p-4 space-y-3.5 text-left shadow-xl">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        {/* Buscador Interactivo en Tiempo Real */}
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={courseSearchTerm}
                            onChange={(e) => setCourseSearchTerm(e.target.value)}
                            placeholder="🔍 Buscar por nombre, tecnología (Postgres, Python, Docker, Redis, etc.) o temario..."
                            className="w-full bg-stone-950/80 border border-stone-800 rounded-xl pl-9 pr-8 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60"
                          />
                          {courseSearchTerm && (
                            <button
                              onClick={() => setCourseSearchTerm('')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 p-0.5 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Botón Maestro: Centro de Enlaces de Venta Individual */}
                        <button
                          onClick={() => setShowAllSalesLinksModal(true)}
                          className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-xs uppercase tracking-tight rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
                        >
                          <Link className="w-4 h-4" />
                          <span>💼 Enlaces de Venta Individual ({COURSES.length} Cursos)</span>
                          <span className="bg-stone-950/25 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold">
                            Para Afiliados y Redes
                          </span>
                        </button>
                      </div>

                      {/* Filtros por Categoría */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
                        <span className="text-stone-500 text-[10px] flex items-center gap-1 mr-1 uppercase shrink-0 font-bold">
                          <Filter className="w-3 h-3 text-amber-500" /> Especialidad:
                        </span>
                        
                        <button
                          onClick={() => setCourseCategoryFilter('all')}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                            courseCategoryFilter === 'all'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-850'
                          }`}
                        >
                          Todos ({COURSES.length})
                        </button>

                        <button
                          onClick={() => setCourseCategoryFilter('database')}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                            courseCategoryFilter === 'database'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-850'
                          }`}
                        >
                          🗄️ Bases de Datos ({dbCount})
                        </button>

                        <button
                          onClick={() => setCourseCategoryFilter('programming')}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                            courseCategoryFilter === 'programming'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-850'
                          }`}
                        >
                          💻 Programación & Software ({progCount})
                        </button>

                        <button
                          onClick={() => setCourseCategoryFilter('ai')}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                            courseCategoryFilter === 'ai'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-850'
                          }`}
                        >
                          🤖 IA & Data Science ({aiCount})
                        </button>

                        <button
                          onClick={() => setCourseCategoryFilter('devops')}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                            courseCategoryFilter === 'devops'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-850'
                          }`}
                        >
                          🛡️ DevOps & Cloud ({devopsCount})
                        </button>

                        <button
                          onClick={() => setCourseCategoryFilter('mobile')}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                            courseCategoryFilter === 'mobile'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-850'
                          }`}
                        >
                          📱 Móvil, FinTech & Otros ({mobileCount})
                        </button>
                      </div>

                      {/* Contador de cursos activos y enlace para limpiar */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-1 border-t border-stone-850/60">
                        <span>
                          Mostrando <strong className="text-amber-400">{filteredCourses.length}</strong> de <strong className="text-stone-300">{COURSES.length}</strong> cursos de especialización técnica.
                        </span>
                        {(courseCategoryFilter !== 'all' || courseSearchTerm) && (
                          <button
                            onClick={() => {
                              setCourseCategoryFilter('all');
                              setCourseSearchTerm('');
                            }}
                            className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
                          >
                            Restablecer filtros
                          </button>
                        )}
                      </div>
                    </div>

                    {/* RETÍCULA DE CURSOS DISPONIBLES */}
                    {filteredCourses.length === 0 ? (
                      <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-8 text-center space-y-3">
                        <Search className="w-8 h-8 text-stone-500 mx-auto" />
                        <h4 className="text-sm font-bold text-stone-300">No se encontraron cursos con este criterio</h4>
                        <p className="text-xs text-stone-500 max-w-md mx-auto">
                          Intenta con otro término de búsqueda o pulsa en el botón para ver todo el catálogo.
                        </p>
                        <button
                          onClick={() => {
                            setCourseCategoryFilter('all');
                            setCourseSearchTerm('');
                          }}
                          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl cursor-pointer"
                        >
                          Mostrar todos los {COURSES.length} cursos
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => {
                          const isUnlocked = unlockedCourseIds.includes(course.id) || isTeacherUnlocked;
                          const themeClasses = course.colorTheme;
                          const categoryKey = getCourseCategory(course.id);
                          const categoryLabel = 
                            categoryKey === 'database' ? '🗄️ Base de Datos' :
                            categoryKey === 'programming' ? '💻 Programación' :
                            categoryKey === 'ai' ? '🤖 Inteligencia Artificial' :
                            categoryKey === 'devops' ? '🛡️ DevOps & Cloud' :
                            categoryKey === 'mobile' ? '📱 Móvil' : '🎓 Especialidad';

                          return (
                            <div 
                              key={course.id}
                              className="bg-stone-900/40 rounded-2xl border border-stone-850 overflow-hidden flex flex-col justify-between hover:border-amber-500/30 transition-all hover:-translate-y-1 text-left"
                            >
                              <div className={`h-1.5 bg-gradient-to-r ${themeClasses}`} />
                              
                              <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                                <div className="space-y-1.5">
                                  {/* BADGES */}
                                  <div className="flex items-center justify-between gap-1 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`text-[8px] uppercase font-mono tracking-wider font-black px-2 py-0.5 rounded ${
                                        course.difficulty === 'Principiante' 
                                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40'
                                          : course.difficulty === 'Intermedio'
                                          ? 'bg-blue-950 text-blue-400 border border-blue-900/40'
                                          : 'bg-rose-950 text-rose-400 border border-rose-900/40'
                                      }`}>
                                        {course.difficulty}
                                      </span>
                                      <span className="text-[7.5px] uppercase font-mono text-amber-400/90 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/30 font-bold">
                                        {categoryLabel}
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5">
                                      {isUnlocked ? (
                                        <span className="text-[8px] uppercase font-mono font-black text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 flex items-center gap-1">
                                          <Unlock className="w-2.5 h-2.5" /> Matriculado ✓
                                        </span>
                                      ) : pendingEnrollments.some(e => e.courseId === course.id && e.status === 'pending') ? (
                                        <span className="text-[8px] uppercase font-mono font-black text-amber-500 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30 flex items-center gap-1 animate-pulse">
                                          <Clock className="w-2.5 h-2.5 animate-spin-slow" /> Esperando Pago
                                        </span>
                                      ) : (
                                        <span className="text-[8px] uppercase font-mono font-black text-stone-500 bg-stone-900 px-2 py-0.5 rounded border border-stone-800 flex items-center gap-1">
                                          <LockKeyhole className="w-2.5 h-2.5" /> No Adquirido
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* TÍTULO */}
                                  <h3 className="text-xs sm:text-sm font-black text-stone-100 uppercase tracking-tight">
                                    {course.title}
                                  </h3>

                                  {/* DESCRIPCIÓN */}
                                  <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-3">
                                    {course.description}
                                  </p>
                                </div>

                                {/* DETALLES DE INSTRUCTOR Y DURACIÓN */}
                                <div className="pt-2 border-t border-stone-850/40 mt-2 space-y-1 text-[9px] font-mono text-stone-500">
                                  <div className="flex justify-between">
                                    <span>Duración Académica:</span>
                                    <span className="text-stone-300 font-bold">{course.durationHours} horas de especialización</span>
                                  </div>
                                </div>

                                {/* PRECIO & ACCIÓN */}
                                <div className="pt-3 flex items-center justify-between mt-auto">
                                  <div>
                                    <span className="text-[8px] uppercase font-mono text-stone-500 block">Inversión única</span>
                                    <span className="text-base font-black text-stone-100">
                                      {currencySymbol === 'CRC' 
                                        ? `₡${course.priceCRC.toLocaleString('es-CR')}` 
                                        : `$${course.priceUSD.toLocaleString('en-US')}`
                                      }
                                    </span>
                                  </div>

                                  <div className="flex flex-col gap-2 shrink-0">
                                    <div className="flex items-center gap-1.5 justify-end">
                                      {/* Botón Ficha Comercial / Vender */}
                                      <button
                                        onClick={() => setSalesModalCourse(course)}
                                        className="p-2 bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 hover:text-amber-300 rounded-xl border border-amber-500/30 transition-all cursor-pointer flex items-center justify-center relative group"
                                        title="Abrir ficha y enlace de venta individual para WhatsApp o redes"
                                      >
                                        <Link className="w-3.5 h-3.5" />
                                        <span className="absolute bottom-full mb-1.5 hidden group-hover:block bg-stone-950 text-[8px] font-mono text-amber-400 px-2 py-0.5 rounded border border-amber-500/40 whitespace-nowrap z-10 shadow-lg">
                                          Vender por Aparte
                                        </span>
                                      </button>

                                      {/* Copiar enlace directo */}
                                      <button
                                        onClick={() => handleCopyCourseLink(course.id)}
                                        className="p-2 bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-amber-500 rounded-xl border border-stone-800 transition-all cursor-pointer flex items-center justify-center relative group"
                                        title="Copiar enlace directo de este curso"
                                      >
                                        {copiedCourseId === course.id ? (
                                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        ) : (
                                          <Copy className="w-3.5 h-3.5" />
                                        )}
                                        <span className="absolute bottom-full mb-1.5 hidden group-hover:block bg-stone-950 text-[8px] font-mono text-stone-300 px-1.5 py-0.5 rounded border border-stone-800 whitespace-nowrap z-10">
                                          {copiedCourseId === course.id ? '¡Link Copiado!' : 'Copiar Link'}
                                        </span>
                                      </button>

                                      {/* Descargar temario oficial */}
                                      <button
                                        onClick={() => handleDownloadSyllabus(course)}
                                        className="p-2 bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-amber-500 rounded-xl border border-stone-800 transition-all cursor-pointer flex items-center justify-center relative group"
                                        title="Descargar temario oficial (Syllabus) de este curso"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                        <span className="absolute bottom-full mb-1.5 hidden group-hover:block bg-stone-950 text-[8px] font-mono text-stone-300 px-1.5 py-0.5 rounded border border-stone-800 whitespace-nowrap z-10">
                                          Descargar Temario
                                        </span>
                                      </button>

                                      {isUnlocked ? (
                                        <button
                                          onClick={() => {
                                            setActiveCourseInWorkspace(course);
                                            if (course.modules[0]?.topics[0]) {
                                              handleSelectTopic(course.modules[0].topics[0], `${course.id}-0-0`);
                                            }
                                          }}
                                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer hover:scale-105"
                                        >
                                          <BookOpen className="w-3.5 h-3.5" /> Estudiar
                                        </button>
                                      ) : pendingEnrollments.some(e => e.courseId === course.id && e.status === 'pending') ? (
                                        <div className="flex gap-1.5">
                                          <button
                                            onClick={() => {
                                              setActiveCourseInWorkspace(course);
                                              if (course.modules[0]?.topics[0]) {
                                                handleSelectTopic(course.modules[0].topics[0], `${course.id}-0-0`);
                                              }
                                            }}
                                            className="px-2.5 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 font-bold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer border border-stone-800"
                                          >
                                            Ver Temario
                                          </button>
                                          <button
                                            onClick={() => {
                                              const modalContainer = document.createElement('div');
                                              modalContainer.innerText = `Su solicitud de matrícula para "${course.title}" está siendo validada por la administración de la Academia. Por favor, asegúrese de haber enviado el comprobante SINPE al +506 7019-3160.`;
                                              modalContainer.className = "fixed top-4 right-4 bg-amber-950 border border-amber-500/50 text-amber-300 text-xs p-4 rounded-xl z-50 max-w-sm shadow-2xl animate-bounce";
                                              document.body.appendChild(modalContainer);
                                              setTimeout(() => modalContainer.remove(), 6000);
                                            }}
                                            className="px-2.5 py-2 bg-stone-900 border border-amber-500/20 text-amber-500 hover:border-amber-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                                          >
                                            <Clock className="w-3 h-3 text-amber-500 animate-pulse" /> Pendiente
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="flex gap-1.5">
                                          <button
                                            onClick={() => {
                                              setActiveCourseInWorkspace(course);
                                              if (course.modules[0]?.topics[0]) {
                                                handleSelectTopic(course.modules[0].topics[0], `${course.id}-0-0`);
                                              }
                                            }}
                                            className="px-2.5 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 font-bold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer border border-stone-800"
                                          >
                                            Ver Temario
                                          </button>
                                          <button
                                            onClick={() => handleStartCheckout(course)}
                                            className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
                                          >
                                            Matricular
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
          </div>
          )}
        </AnimatePresence>

        {/* MODAL DE DESCARGA BLOQUEADA POR FALTA DE PAGO */}
        <AnimatePresence>
          {blockedDownloadCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
              <motion.div 
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                className="bg-stone-900 border-2 border-amber-500/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20 shrink-0">
                    <LockKeyhole className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
                      ⚠️ DESCARGA PROTEGIDA
                    </span>
                    <h3 className="text-sm font-black text-stone-100 uppercase tracking-tight">
                      Requiere Matrícula Activa
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">
                      La descarga del temario oficial completo en formato portable (Syllabus TXT) está reservada exclusivamente para estudiantes con matrícula confirmada y pago aprobado.
                    </p>
                  </div>
                </div>

                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-850 space-y-1.5">
                  <div className="text-[10px] font-mono text-stone-400">
                    📖 Curso: <span className="text-stone-200 font-bold">{blockedDownloadCourse.title}</span>
                  </div>
                  <p className="text-[10px] text-amber-500 font-mono leading-normal">
                    💡 <strong>¿Qué puede hacer ahora?</strong> Puede seguir explorando la estructura de módulos de forma interactiva en la pantalla de la Academia presionando el botón <strong>"Ver Temario"</strong> de forma 100% gratuita.
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      const courseToUnlock = blockedDownloadCourse;
                      setBlockedDownloadCourse(null);
                      handleStartCheckout(courseToUnlock);
                    }}
                    className="flex-1 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-mono font-black text-[11px] uppercase rounded-xl transition-all cursor-pointer text-center"
                  >
                    Matricular Curso ⚡
                  </button>
                  <button
                    onClick={() => setBlockedDownloadCourse(null)}
                    className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 hover:text-stone-200 font-mono font-bold text-[11px] uppercase rounded-xl border border-stone-850 transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL DE MATRÍCULA Y PAGO SEGURO (CHECKOUT OVERLAY) */}
        <AnimatePresence>
          {checkoutCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-stone-900 border border-stone-850 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
              >
                
                {/* HEADER CHECKOUT */}
                <div className="bg-stone-950 px-5 py-4 border-b border-stone-850 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 block">Comprobante de Matrícula</span>
                    <h3 className="text-xs sm:text-sm font-black text-stone-100 uppercase truncate max-w-xs">
                      {checkoutCourse.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => checkoutStatus !== 'processing' && setCheckoutCourse(null)}
                    className="text-stone-500 hover:text-stone-300 text-xs font-mono font-bold cursor-pointer"
                  >
                    [CERRAR]
                  </button>
                </div>

                {/* CUERPO DEL CHECKOUT */}
                <div className="p-5 space-y-4">
                  
                  {checkoutStatus === 'idle' && (
                    <div className="space-y-4">
                      
                      {/* CONFIGURACIÓN DEL TELÉFONO DE LA ACADEMIA */}
                      <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-850 space-y-1">
                        <label className="text-[9px] font-mono text-stone-400 block uppercase font-bold flex items-center justify-between">
                          <span>⚙️ Teléfono de la Academia (Tuyo)</span>
                          <span className="text-[8px] text-amber-500 font-bold lowercase">Configurable</span>
                        </label>
                        <input
                          type="text"
                          value={checkoutAcademyPhone}
                          onChange={(e) => setCheckoutAcademyPhone(e.target.value)}
                          onBlur={(e) => {
                            const val = e.target.value;
                            setFbCustomPhone(val);
                            saveAcademyConfig({ checkoutAcademyPhone: val, fbCustomPhone: val });
                          }}
                          placeholder="Tu WhatsApp / SINPE (Ej: +506 7019-3160)"
                          className="w-full bg-stone-900 text-[11px] font-mono p-1.5 rounded border border-stone-800 text-amber-400 focus:border-amber-500/50 outline-none"
                        />
                        <p className="text-[8px] text-stone-500">
                          Aquí es donde tus clientes reales te enviarán los comprobantes de pago por WhatsApp y SINPE. Puedes cambiarlo libremente.
                        </p>
                      </div>

                      {/* MÉTODO DE PAGO */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-stone-400 block uppercase">Método de Pago Preferido</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setCheckoutPaymentMethod('sinpe')}
                            className={`p-2.5 rounded-lg border text-xs font-bold text-center cursor-pointer transition-all ${
                              checkoutPaymentMethod === 'sinpe'
                                ? 'bg-amber-600/15 border-amber-500/50 text-amber-400 font-bold'
                                : 'bg-stone-950/60 border-stone-850 text-stone-500 hover:text-stone-300'
                            }`}
                          >
                            SINPE Móvil
                          </button>
                          <button
                            type="button"
                            onClick={() => setCheckoutPaymentMethod('card')}
                            className={`p-2.5 rounded-lg border text-xs font-bold text-center cursor-pointer transition-all ${
                              checkoutPaymentMethod === 'card'
                                ? 'bg-amber-600/15 border-amber-500/50 text-amber-400 font-bold'
                                : 'bg-stone-950/60 border-stone-850 text-stone-500 hover:text-stone-300'
                            }`}
                          >
                            Tarjeta de Crédito
                          </button>
                        </div>
                      </div>

                      {/* CORREO DEL ESTUDIANTE */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-stone-500 uppercase block">Nombre de Estudiante</label>
                        <input
                          type="text"
                          value={checkoutName}
                          onChange={(e) => setCheckoutName(e.target.value)}
                          className="w-full bg-stone-950 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none focus:border-amber-500/50"
                          placeholder="Nombre Completo"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-stone-500 uppercase block">Correo Electrónico para Factura y Aula</label>
                        <input
                          type="email"
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          className="w-full bg-stone-950 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none focus:border-amber-500/50"
                          placeholder="correo@estudiante.cr"
                        />
                      </div>

                      {/* DETALLE SEGÚN EL MÉTODO DE PAGO */}
                      {checkoutPaymentMethod === 'card' ? (
                        <div className="p-4 bg-stone-950 border border-stone-850 rounded-2xl space-y-4 text-left">
                          <div className="flex items-center justify-between">
                            <div className="text-[10.5px] text-amber-500 font-mono uppercase font-black flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              Pasarela de Pagos Directa y Segura
                            </div>
                            <span className="text-[8px] font-mono text-stone-500 tracking-wider">SECURE PCI-DSS</span>
                          </div>

                          {/* VISTA PREVIA INTERACTIVA DE TARJETA DE CRÉDITO */}
                          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-stone-800 to-stone-950 border border-stone-700/80 p-4 flex flex-col justify-between text-stone-100 shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                            
                            {/* Chip y Logotipo Dinámico */}
                            <div className="flex items-center justify-between">
                              {/* Chip */}
                              <div className="w-10 h-7 bg-amber-500/10 rounded border border-amber-500/30 flex items-center justify-center relative">
                                <span className="absolute inset-y-0 left-3.5 w-[1px] bg-amber-500/30" />
                                <span className="absolute inset-x-0 top-3 h-[1px] bg-amber-500/30" />
                                <div className="w-3.5 h-2.5 bg-amber-600/40 rounded-sm" />
                              </div>
                              
                              {/* Marca Dinámica */}
                              <div className="font-mono text-xs font-black uppercase italic tracking-widest text-amber-500 flex items-center gap-1">
                                {(() => {
                                  const num = checkoutCardNum.replace(/\D/g, '');
                                  if (num.startsWith('4')) return '💳 VISA';
                                  if (/^(5[1-5]|2[2-7])/.test(num)) return '💳 MASTERCARD';
                                  if (/^(34|37)/.test(num)) return '💳 AMEX';
                                  return '💳 MULTITARJETA';
                                })()}
                              </div>
                            </div>

                            {/* Número de Tarjeta */}
                            <div className="font-mono text-sm tracking-[0.18em] font-black text-center text-stone-100 py-1.5">
                              {checkoutCardNum || '•••• •••• •••• ••••'}
                            </div>

                            {/* Nombre de Tarjeta y Expiración */}
                            <div className="flex items-end justify-between text-[10px] font-mono">
                              <div className="space-y-0.5 max-w-[190px]">
                                <span className="text-[7.5px] text-stone-500 uppercase block tracking-wider">Tarjetahabiente</span>
                                <span className="font-black text-stone-200 uppercase truncate block">
                                  {checkoutCardName || 'NOMBRE COMPLETO'}
                                </span>
                              </div>
                              <div className="space-y-0.5 text-right shrink-0">
                                <span className="text-[7.5px] text-stone-500 uppercase block tracking-wider">Vence</span>
                                <span className="font-black text-stone-200">
                                  {checkoutCardExpiry || 'MM/AA'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Formulario de Entrada */}
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-stone-400 block uppercase font-bold">Nombre en la Tarjeta</label>
                              <input
                                type="text"
                                value={checkoutCardName}
                                onChange={(e) => setCheckoutCardName(e.target.value.toUpperCase())}
                                className="w-full bg-stone-900 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none focus:border-amber-500/50 uppercase"
                                placeholder="EJ. MARÍA FERNANDA QUIRÓS"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-stone-400 block uppercase font-bold">Número de Tarjeta</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={checkoutCardNum}
                                  onChange={(e) => {
                                    let val = e.target.value.replace(/\s?/g, '').replace(/\D/g, '');
                                    if (val.length > 16) val = val.substring(0, 16);
                                    let parts = [];
                                    for (let i = 0; i < val.length; i += 4) {
                                      parts.push(val.substring(i, i + 4));
                                    }
                                    setCheckoutCardNum(parts.join(' '));
                                  }}
                                  className="w-full bg-stone-900 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none focus:border-amber-500/50 font-mono tracking-wider"
                                  placeholder="4000 1234 5678 9010"
                                />
                                <div className="absolute right-2 top-2.5 flex gap-1 items-center bg-stone-950 px-1.5 py-0.5 rounded border border-stone-800">
                                  <span className="text-[7px] text-stone-400 font-bold font-mono">VISA</span>
                                  <span className="text-[7px] text-stone-400 font-bold font-mono border-l border-stone-800 pl-1">MC</span>
                                  <span className="text-[7px] text-stone-400 font-bold font-mono border-l border-stone-800 pl-1">AMEX</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-stone-400 block uppercase font-bold">Expiración (MM/AA)</label>
                                <input
                                  type="text"
                                  value={checkoutCardExpiry}
                                  onChange={(e) => {
                                    let val = e.target.value.replace(/\//g, '').replace(/\D/g, '');
                                    if (val.length > 4) val = val.substring(0, 4);
                                    if (val.length > 2) {
                                      setCheckoutCardExpiry(val.substring(0, 2) + '/' + val.substring(2));
                                    } else {
                                      setCheckoutCardExpiry(val);
                                    }
                                  }}
                                  className="w-full bg-stone-900 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none focus:border-amber-500/50 font-mono text-center"
                                  placeholder="MM/AA"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-stone-400 block uppercase font-bold">Código CVC / CVV</label>
                                <input
                                  type="password"
                                  value={checkoutCardCvc}
                                  onChange={(e) => setCheckoutCardCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                  className="w-full bg-stone-900 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none focus:border-amber-500/50 font-mono text-center"
                                  placeholder="•••"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="text-[9px] text-stone-500 font-mono text-center pt-2 border-t border-stone-900 leading-relaxed">
                            🔒 Los cobros son procesados de forma inmediata. Al confirmar, recibirá el recibo electrónico detallado para habilitar su cuenta al instante.
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-stone-950/60 border border-stone-850/60 rounded-xl space-y-2.5">
                          <div className="text-[10px] text-amber-500/90 leading-relaxed font-mono font-bold">
                            📲 PASOS PARA EL PAGO REAL POR SINPE:
                          </div>
                          <div className="text-[10.5px] text-stone-300 space-y-1 font-mono text-left list-decimal pl-1">
                            <div>1. Realice la transferencia SINPE al teléfono: <strong className="text-amber-400 text-xs">{checkoutAcademyPhone}</strong></div>
                            <div>2. Por el monto de: <strong className="text-amber-400 text-xs">{currencySymbol === 'CRC' ? `₡${(parseFloat(checkoutPriceOverride) || 0).toLocaleString('es-CR')}` : `$${(parseFloat(checkoutPriceOverride) || 0).toLocaleString('en-US')}`}</strong></div>
                            <div>3. Ingrese el número de comprobante y/o foto abajo:</div>
                          </div>

                          {/* INSTRUCCIONES DE REGISTRO DE COMPROBANTE REAL */}
                          <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-850/80 text-left space-y-1.5">
                            <span className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                              🛡️ Registro de Transacción Oficial
                            </span>
                            <p className="text-[9.5px] text-stone-400 leading-relaxed">
                              Por favor, ingrese los datos de su transferencia SINPE Móvil a continuación. Una vez completado, nuestro sistema registrará su matrícula de inmediato.
                            </p>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-mono text-stone-500 uppercase block">Número de Referencia / Comprobante</label>
                            <input
                              type="text"
                              value={checkoutSinpeComprobante}
                              onChange={(e) => setCheckoutSinpeComprobante(e.target.value)}
                              className="w-full bg-stone-900 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none"
                              placeholder="Ej: 20260628..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8.5px] font-mono text-stone-500 uppercase block">Teléfono Emisor</label>
                              <input
                                type="text"
                                value={checkoutSinpePhone}
                                onChange={(e) => setCheckoutSinpePhone(e.target.value)}
                                className="w-full bg-stone-900 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none"
                                placeholder="Ej: 7019-3160"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8.5px] font-mono text-stone-500 uppercase block">Nombre Emisor</label>
                              <input
                                type="text"
                                value={checkoutSinpeSender}
                                onChange={(e) => setCheckoutSinpeSender(e.target.value)}
                                className="w-full bg-stone-900 text-xs p-2.5 rounded-lg border border-stone-850 text-stone-200 outline-none"
                                placeholder="Ej: Juan Pérez"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8.5px] font-mono text-stone-500 uppercase block">Adjuntar Foto del Comprobante (Opcional)</label>
                            <div className="relative flex items-center justify-center border border-dashed border-stone-800 rounded-lg p-2 bg-stone-900 cursor-pointer hover:border-amber-500/40 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    setCheckoutSinpeFileName(e.target.files[0].name);
                                  }
                                }}
                              />
                              <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1.5 truncate">
                                {checkoutSinpeFileName ? `📎 ${checkoutSinpeFileName}` : "📁 Seleccionar Captura de Pantalla"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* INFORMACIÓN DE SEGURIDAD REAL */}
                      <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-850/80 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <p className="text-[9px] text-stone-400 leading-tight">
                          Su transacción es encriptada de extremo a extremo. El facilitador validará su inscripción de inmediato vía WhatsApp.
                        </p>
                      </div>

                      {/* PRECIO RESUMEN */}
                      <div className="pt-2 flex justify-between items-center border-t border-stone-850">
                        <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">Monto de Matrícula Final:</span>
                        <strong className="text-amber-500 text-sm font-black font-mono">
                          {currencySymbol === 'CRC' 
                            ? `₡${(parseFloat(checkoutPriceOverride) || 0).toLocaleString('es-CR')}` 
                            : `$${(parseFloat(checkoutPriceOverride) || 0).toLocaleString('en-US')}`
                          }
                        </strong>
                      </div>

                      {/* INSTRUCCIÓN ACLARATORIA */}
                      <p className="text-[8.5px] text-stone-500 font-mono text-center leading-normal">
                        ✨ Al confirmar, se habilitará el acceso inmediato al curso y se le enviarán los datos estructurados a su WhatsApp para validación administrativa.
                      </p>

                      {/* ACCIÓN DE PAGO */}
                      <button
                        onClick={handleProcessCheckout}
                        disabled={
                          !checkoutName || 
                          !checkoutEmail || 
                          (checkoutPaymentMethod === 'card' && (!checkoutCardNum || !checkoutCardName || !checkoutCardExpiry || !checkoutCardCvc)) ||
                          (checkoutPaymentMethod === 'sinpe' && !checkoutSinpeComprobante)
                        }
                        className={`w-full py-2.5 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                          (!checkoutName || 
                           !checkoutEmail || 
                           (checkoutPaymentMethod === 'card' && (!checkoutCardNum || !checkoutCardName || !checkoutCardExpiry || !checkoutCardCvc)) ||
                           (checkoutPaymentMethod === 'sinpe' && !checkoutSinpeComprobante))
                            ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                            : 'bg-amber-600 hover:bg-amber-500 hover:scale-[1.02] cursor-pointer'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        {checkoutPaymentMethod === 'card' ? 'Procesar Pago con Tarjeta' : 'Confirmar SINPE Móvil y Matricular'}
                      </button>

                    </div>
                  )}

                  {/* PROCESANDO PAGO (PANTALLA DE CARGA) */}
                  {checkoutStatus === 'processing' && (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                      <RefreshCw className="w-10 h-10 text-amber-500 animate-spin" />
                      <div>
                        <h4 className="text-xs font-black uppercase font-mono tracking-widest text-amber-400">
                          Procesando Transacción Segura
                        </h4>
                        <p className="text-[10px] text-stone-500 font-mono max-w-xs leading-relaxed mt-1">
                          Consolidador financiero procesando pasarela de pago PCI-DSS y asignando aula académica en tiempo real. Espere un momento...
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ÉXITO EN EL CHECKOUT */}
                  {checkoutStatus === 'success' && (
                    <div className="py-6 flex flex-col items-center justify-center space-y-4 p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-500/55 flex items-center justify-center text-amber-400">
                        <Clock className="w-6 h-6 animate-pulse" />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-black uppercase text-amber-400">
                          ¡Matrícula Registrada con Éxito!
                        </h4>
                        <p className="text-[10px] text-stone-300 font-mono max-w-xs leading-relaxed mt-2 text-left">
                          Tu solicitud de acceso ha sido guardada de forma segura en la base de datos de <strong>FULLSTACK ACADEMY</strong>.
                        </p>
                        
                        {currentMotivationMessage && (
                          <div className="mt-3.5 p-3 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl text-left space-y-1 relative overflow-hidden">
                            <span className="text-[8.5px] font-mono font-black text-amber-400 uppercase tracking-wider block">
                              💌 MENSAJE DE BIENVENIDA Y SALUDOS:
                            </span>
                            <p className="text-[10px] text-stone-200 italic leading-normal">
                              "{currentMotivationMessage}"
                            </p>
                          </div>
                        )}

                        <div className="mt-3.5 p-3 bg-stone-950 rounded-xl border border-stone-850 text-left text-[9.5px] text-stone-450 space-y-2 leading-relaxed">
                          <p className="font-bold text-amber-500 font-mono uppercase text-[9px] tracking-wide">📌 SIGUIENTE PASO:</p>
                          <p>
                            1. Envía el comprobante de pago por WhatsApp al <strong className="text-stone-200">{checkoutAcademyPhone}</strong>.
                          </p>
                          <p>
                            2. El equipo de admisiones verificará la transferencia y <strong>activará tu acceso</strong> al aula de inmediato.
                          </p>
                        </div>
                      </div>

                      {/* ENLACE DIRECTO SEGURO DE WHATSAPP CON BOTÓN ANCHOR CLICABLE */}
                      {lastWhatsappUrl && (
                        <div className="w-full space-y-1.5 pt-1">
                          <a
                            href={lastWhatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 hover:scale-[1.01]"
                          >
                            <span>📲 Abrir WhatsApp y Enviar Mensaje Directo</span>
                          </a>
                          <p className="text-[9px] text-stone-500 font-mono leading-normal">
                            ⚠️ Si tu navegador bloqueó la ventana automática, presiona este botón verde para abrir el chat de WhatsApp con soporte académico de forma 100% segura.
                          </p>
                        </div>
                      )}

                      {/* ACCIONES DEL ALUMNO */}
                      <div className="w-full border-t border-stone-850 pt-3 mt-1 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            if (lastEnrollmentId) {
                              handleApproveEnrollment(lastEnrollmentId);
                              if (checkoutCourse) {
                                setActiveCourseInWorkspace(checkoutCourse);
                              }
                              setCheckoutCourse(null);
                              setCheckoutStatus('idle');
                              setWorkspaceActiveTab('lesson');
                            }
                          }}
                          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-950/20 hover:scale-[1.01]"
                        >
                          💻 Ingresar Directo al Aula de Clases
                        </button>
                        
                        <button
                          onClick={() => {
                            setCheckoutCourse(null);
                            setCheckoutStatus('idle');
                          }}
                          className="w-full py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Volver al Catálogo de Cursos
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 1: FICHA DE VENTA INDIVIDUAL CON ENLACE DIRECTO Y PITCH */}
        <AnimatePresence>
          {salesModalCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-stone-900 border border-amber-500/50 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl text-left flex flex-col max-h-[90vh]"
              >
                {/* Header */}
                <div className="p-4 bg-stone-950 border-b border-stone-850 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                      <Link className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-stone-100 uppercase tracking-tight">
                        Ficha de Venta Individual y Enlace de Matrícula
                      </h3>
                      <p className="text-[10px] font-mono text-stone-400">
                        Comparte este enlace para comercializar este curso por separado
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSalesModalCourse(null)}
                    className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-850 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4 overflow-y-auto">
                  {/* Tarjeta Resumen del Curso */}
                  <div className="bg-stone-950/70 border border-stone-850 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/50 text-amber-400 border border-amber-900/40 font-bold">
                        {salesModalCourse.difficulty}
                      </span>
                      <span className="text-sm font-black text-emerald-400">
                        ₡{salesModalCourse.priceCRC.toLocaleString('es-CR')} CRC / ${salesModalCourse.priceUSD.toLocaleString('en-US')} USD
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-stone-100 uppercase tracking-tight">
                      {salesModalCourse.title}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {salesModalCourse.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-stone-500 pt-1">
                      <span>⏱️ {salesModalCourse.durationHours} Horas</span>
                      <span>👨‍🏫 {salesModalCourse.instructor}</span>
                      <span>📚 {salesModalCourse.modules.length} Módulos</span>
                    </div>
                  </div>

                  {/* Enlace Directo para el Alumno */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300 flex items-center justify-between">
                      <span>🔗 Enlace Directo de Matrícula:</span>
                      <span className="text-[10px] font-mono text-stone-500">Carga este curso automáticamente</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={getCourseDirectLink(salesModalCourse.id)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-400 select-all focus:outline-none"
                      />
                      <button
                        onClick={() => handleCopyCourseLink(salesModalCourse.id)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow"
                      >
                        {copiedCourseId === salesModalCourse.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-stone-950" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mensaje de Venta para WhatsApp y Redes */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-stone-300">
                        💬 Mensaje Promocional Listo para WhatsApp / Redes:
                      </label>
                      <button
                        onClick={() => handleCopySalesPitch(salesModalCourse)}
                        className="text-[10.5px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPitchCourseId === salesModalCourse.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>¡Mensaje Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar Mensaje</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-300 font-sans whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                      {`🎓 *${salesModalCourse.title}* (${salesModalCourse.durationHours} horas de especialización)\n\n` +
                       `📖 *Descripción:* ${salesModalCourse.description}\n\n` +
                       `📊 *Nivel:* ${salesModalCourse.difficulty} | *Facultad:* ${salesModalCourse.instructor}\n` +
                       `💰 *Inversión única:* ₡${salesModalCourse.priceCRC.toLocaleString('es-CR')} CRC / $${salesModalCourse.priceUSD.toLocaleString('en-US')} USD\n\n` +
                       `🚀 *Inscríbete y accede de inmediato aquí:* \n${getCourseDirectLink(salesModalCourse.id)}\n\n` +
                       `✨ Incluye temario oficial descargable en PDF, módulos interactivos con código real, simulador IDE, autoevaluaciones y certificación oficial emitida por FullStack Academy.`}
                    </div>
                  </div>

                  {/* Acciones de Venta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `🎓 *${salesModalCourse.title}* (${salesModalCourse.durationHours} horas)\n\n` +
                        `📖 ${salesModalCourse.description}\n\n` +
                        `💰 Inversión: ₡${salesModalCourse.priceCRC.toLocaleString('es-CR')} CRC / $${salesModalCourse.priceUSD.toLocaleString('en-US')} USD\n\n` +
                        `🚀 Inscríbete aquí: ${getCourseDirectLink(salesModalCourse.id)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black text-xs uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enviar por WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        const target = salesModalCourse;
                        setSalesModalCourse(null);
                        setActiveCourseInWorkspace(target);
                        if (target.modules[0]?.topics[0]) {
                          handleSelectTopic(target.modules[0].topics[0], `${target.id}-0-0`);
                        }
                      }}
                      className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Abrir en el Aula</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 2: CENTRO MAESTRO DE ENLACES DE VENTA (LOS 19 CURSOS) */}
        <AnimatePresence>
          {showAllSalesLinksModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-stone-900 border border-amber-500/50 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl text-left flex flex-col max-h-[92vh]"
              >
                {/* Header */}
                <div className="p-4 bg-stone-950 border-b border-stone-850 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 rounded-xl font-bold">
                      <Link className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-stone-100 uppercase tracking-tight">
                        💼 Centro Maestro de Enlaces de Venta Individual ({COURSES.length} Cursos)
                      </h3>
                      <p className="text-[10.5px] font-mono text-stone-400">
                        Links directos y mensajes de venta para WhatsApp listos para comercializar cada curso por separado
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAllSalesLinksModal(false)}
                    className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-850 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Subheader Toolbar */}
                <div className="p-3.5 bg-stone-900 border-b border-stone-850 space-y-2.5">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative flex-1 w-full">
                      <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={courseSearchTerm}
                        onChange={(e) => setCourseSearchTerm(e.target.value)}
                        placeholder="Filtrar por curso, base de datos, lenguaje..."
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const fullCatalogText = `🎓 *CATÁLOGO OFICIAL DE CURSOS Y ESPECIALIZACIONES DE LA ACADEMIA* 🎓\n\n` +
                          COURSES.map((c, i) => 
                            `${i + 1}. *${c.title}* (${c.durationHours}h)\n` +
                            `   💰 Inversión: ₡${c.priceCRC.toLocaleString('es-CR')} CRC / $${c.priceUSD.toLocaleString('en-US')} USD\n` +
                            `   🔗 Inscríbete aquí: ${getCourseDirectLink(c.id)}\n`
                          ).join('\n') +
                          `\n📲 Matrículas abiertas con acceso inmediato, simuladores interactivos y certificación oficial.`;

                        navigator.clipboard.writeText(fullCatalogText);
                        const toast = document.createElement('div');
                        toast.innerText = '¡Catálogo completo con todos los links copiado al portapapeles!';
                        toast.className = 'fixed top-4 right-4 bg-emerald-600 text-stone-950 font-bold text-xs p-3 rounded-xl z-50 shadow-2xl';
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 4000);
                      }}
                      className="px-3.5 py-1.5 bg-stone-950 hover:bg-stone-850 text-amber-400 border border-amber-500/30 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Catálogo Completo</span>
                    </button>
                  </div>
                </div>

                {/* Course List */}
                <div className="p-4 space-y-3 overflow-y-auto flex-1">
                  {(() => {
                    const filteredModalCourses = COURSES.filter(course => {
                      const matchesCategory = courseCategoryFilter === 'all' || getCourseCategory(course.id) === courseCategoryFilter;
                      const matchesSearch = !courseSearchTerm.trim() || 
                        course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                        course.description.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                        course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase());
                      return matchesCategory && matchesSearch;
                    });

                    if (filteredModalCourses.length === 0) {
                      return (
                        <div className="py-12 text-center text-stone-500 text-xs font-mono">
                          No se encontraron cursos con este término.
                        </div>
                      );
                    }

                    return filteredModalCourses.map((course) => {
                      const directLink = getCourseDirectLink(course.id);

                      return (
                        <div
                          key={course.id}
                          className="bg-stone-950/70 border border-stone-850 hover:border-amber-500/30 rounded-xl p-3.5 space-y-2.5 transition-all"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-900/40">
                                  {course.difficulty}
                                </span>
                                <span className="text-[8px] font-mono text-stone-500">
                                  {course.durationHours} Horas • {course.instructor}
                                </span>
                              </div>
                              <h4 className="text-xs sm:text-sm font-black text-stone-100 uppercase tracking-tight">
                                {course.title}
                              </h4>
                            </div>

                            <div className="text-left sm:text-right shrink-0">
                              <span className="text-[9px] font-mono text-stone-500 block">Precio de venta</span>
                              <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">
                                ₡{course.priceCRC.toLocaleString('es-CR')} / ${course.priceUSD.toLocaleString('en-US')}
                              </span>
                            </div>
                          </div>

                          {/* Enlace Directo y Botones de Acción */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-stone-850/60">
                            <input
                              type="text"
                              readOnly
                              value={directLink}
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-[10.5px] font-mono text-amber-400 flex-1 select-all focus:outline-none"
                            />

                            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                              {/* Copiar Link */}
                              <button
                                onClick={() => handleCopyCourseLink(course.id)}
                                className="px-2.5 py-1.5 bg-stone-900 hover:bg-stone-850 text-stone-300 font-bold text-xs rounded-lg border border-stone-800 flex items-center gap-1 transition-all cursor-pointer"
                                title="Copiar enlace directo"
                              >
                                {copiedCourseId === course.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">¡Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-stone-400" />
                                    <span>Copiar Link</span>
                                  </>
                                )}
                              </button>

                              {/* Copiar Pitch para WhatsApp */}
                              <button
                                onClick={() => handleCopySalesPitch(course)}
                                className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-xs rounded-lg border border-amber-500/30 flex items-center gap-1 transition-all cursor-pointer"
                                title="Copiar texto listo para promocionar en WhatsApp"
                              >
                                {copiedPitchCourseId === course.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">¡Pitch Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <MessageCircle className="w-3 h-3" />
                                    <span>Pitch WhatsApp</span>
                                  </>
                                )}
                              </button>

                              {/* Enviar WhatsApp Directo */}
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                  `🎓 *${course.title}* (${course.durationHours} horas)\n\n` +
                                  `📖 ${course.description}\n\n` +
                                  `💰 Inversión: ₡${course.priceCRC.toLocaleString('es-CR')} CRC / $${course.priceUSD.toLocaleString('en-US')} USD\n\n` +
                                  `🚀 Inscríbete aquí: ${directLink}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg transition-all cursor-pointer"
                                title="Enviar mensaje por WhatsApp"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>

                              {/* Ver Ficha Completa */}
                              <button
                                onClick={() => {
                                  setShowAllSalesLinksModal(false);
                                  setSalesModalCourse(course);
                                }}
                                className="p-1.5 bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-800 rounded-lg transition-all cursor-pointer"
                                title="Ver ficha comercial detallada"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Footer */}
                <div className="p-3.5 bg-stone-950 border-t border-stone-850 text-left flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-stone-500">
                    💡 Cada enlace abre la plataforma con el curso preseleccionado para matrícula y pago inmediato.
                  </span>
                  <button
                    onClick={() => setShowAllSalesLinksModal(false)}
                    className="px-4 py-1.5 bg-stone-900 hover:bg-stone-850 text-stone-300 font-mono font-bold text-xs rounded-xl border border-stone-850 transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>

      {/* SECTION 5: CONTACT / HIRE TEAM PORTAL (SOLO EN MODO CONSOLA / INGENIERÍA) */}
      {viewMode === 'engineering' && (
        <section id="contact" className="px-4 py-8 sm:px-6 max-w-7xl mx-auto space-y-6">
        
        <div className="border-l-4 border-amber-500 pl-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 block font-bold">CONTRATACIÓN Y ASESORÍA [05]</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-stone-100">
            Formular Propuesta & Requerimientos Técnicos
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Envíe los detalles de su proyecto. Nuestro sistema generará un Documento de Requerimientos (PRD) listo para cotizar de manera inmediata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* INQUIRY FORM */}
          <div className="lg:col-span-5 bg-stone-900/40 p-5 rounded-2xl border border-stone-850 space-y-4 text-left">
            <span className="text-[8.5px] uppercase font-mono tracking-wider text-amber-500 font-bold block">
              FORMULARIO DE CONTACTO DIRECTO
            </span>

            <form onSubmit={handleClientSubmit} className="space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-mono text-stone-500 font-bold mb-0.5">
                  Nombre Completo / Empresa
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Juan Pérez Mora"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-stone-950 text-stone-200 px-3 py-1.5 text-xs rounded-xl border border-stone-800 uppercase font-semibold focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono text-stone-500 font-bold mb-0.5">
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="Ej: contacto@ejemplo.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-stone-950 text-stone-200 px-3 py-1.5 text-xs rounded-xl border border-stone-800 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono text-stone-500 font-bold mb-0.5">
                  Descripción del Software a Desarrollar (Opcional)
                </label>
                <textarea 
                  rows={4}
                  placeholder="Ej: Requiero una app de expedientes para control de ventas con base de datos en tiempo real..."
                  value={clientDetails}
                  onChange={(e) => setClientDetails(e.target.value)}
                  className="w-full bg-stone-950 text-stone-200 px-3 py-1.5 text-xs rounded-xl border border-stone-800 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="bg-amber-600/5 p-2.5 rounded-lg border border-amber-600/10 text-[9px] text-stone-400 leading-normal">
                <strong>Ingeniería Estricta:</strong> Se utilizará la configuración de stack seleccionada en el módulo [01] para formular el presupuesto oficial en el PDF de propuesta.
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
              >
                Generar Propuesta y PRD
              </button>
            </form>
          </div>

          {/* DYNAMIC BLUEPRINT PROPOSAL DOCUMENT */}
          <div className="lg:col-span-7 bg-stone-950 p-5 rounded-2xl border border-stone-850 text-left flex flex-col justify-between min-h-[380px] shadow-lg relative">
            
            <AnimatePresence mode="wait">
              {submittedBrief ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-stone-900 pb-3">
                    <div>
                      <span className="text-[8px] uppercase font-mono tracking-widest text-amber-500 font-bold block">
                        DOCUMENTO OFICIAL GENERADO
                      </span>
                      <h3 className="text-xs text-stone-200 font-bold font-mono">
                        {submittedBrief.id} // PRD_ESTIMATE.md
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopyInquiry}
                        className="flex items-center gap-1 text-[8.5px] bg-stone-900 hover:bg-stone-850 border border-stone-800 text-amber-500 px-2 py-1 rounded font-mono cursor-pointer transition-colors"
                      >
                        {copiedInquiryText ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copiar Texto
                          </>
                        )}
                      </button>
                      {(() => {
                        const proposalText = submittedBrief ? `PROYECTO: PROPUESTA DE DESARROLLO DE SOFTWARE FULL-STACK
-----------------------------------------------------------
ID: ${submittedBrief.id}
FECHA: ${submittedBrief.date}
CLIENTE: ${submittedBrief.clientName} (${submittedBrief.clientEmail})
DESCRIPCIÓN: ${submittedBrief.clientDetails || 'Sin detalles adicionales'}

TECNOLOGÍAS SELECCIONADAS:
- Frontend: ${submittedBrief.selectedStack.frontend}
- Backend: ${submittedBrief.selectedStack.backend}
- Base de Datos: ${submittedBrief.selectedStack.database}
- Caching: ${submittedBrief.selectedStack.cache}
- Infraestructura: ${submittedBrief.selectedStack.infra}

ESTIMACIÓN COMERCIAL:
- Costo Total: ${submittedBrief.estimate.cost.toLocaleString('es-CR')} ${currencySymbol}
- Duración Estimada: ${submittedBrief.estimate.weeks} semanas
-----------------------------------------------------------` : '';
                        const cleanPhone = checkoutAcademyPhone.replace(/[^0-9]/g, '');
                        const proposalUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(proposalText)}`;
                        return (
                          <a
                            href={proposalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[8.5px] bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-900/60 text-emerald-400 px-2 py-1.5 rounded font-mono cursor-pointer transition-colors"
                          >
                            <Phone className="w-3 h-3 text-emerald-400" />
                            Enviar por WhatsApp
                          </a>
                        );
                      })()}
                    </div>
                  </div>

                  {/* DOCUMENT BODY */}
                  <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-900 space-y-3 font-mono text-[9px] text-stone-300 leading-relaxed overflow-y-auto max-h-[320px]">
                    <div className="border-b border-stone-800 pb-2">
                      <p><span className="text-stone-500">CLIENTE:</span> <strong className="text-stone-100 uppercase">{submittedBrief.clientName}</strong></p>
                      <p><span className="text-stone-500">CORREO:</span> <span className="text-stone-100">{submittedBrief.clientEmail}</span></p>
                      <p><span className="text-stone-500">FECHA:</span> <span className="text-stone-100">{submittedBrief.date}</span></p>
                    </div>

                    <div>
                      <strong className="text-amber-500 uppercase block mb-1">1. DESCRIPCIÓN DEL PROYECTO</strong>
                      <p className="text-stone-400 italic">"{submittedBrief.clientDetails}"</p>
                    </div>

                    <div>
                      <strong className="text-amber-500 uppercase block mb-1">2. STACK TECNOLÓGICO SUGERIDO</strong>
                      <ul className="list-disc pl-4 space-y-1 text-stone-400">
                        <li>Frontend: <strong className="text-stone-300">{submittedBrief.selectedStack.frontend}</strong></li>
                        <li>Backend: <strong className="text-stone-300">{submittedBrief.selectedStack.backend}</strong></li>
                        <li>Database: <strong className="text-stone-300">{submittedBrief.selectedStack.database}</strong></li>
                        <li>Cache / Mensajería: <strong className="text-stone-300">{submittedBrief.selectedStack.cache}</strong></li>
                        <li>Infraestructura Cloud: <strong className="text-stone-300">{submittedBrief.selectedStack.infra}</strong></li>
                      </ul>
                    </div>

                    <div className="border-t border-stone-800 pt-2 grid grid-cols-2 gap-3">
                      <div>
                        <strong className="text-emerald-400 uppercase block">3. INVERSIÓN FINAL</strong>
                        <span className="text-sm font-black text-amber-500">
                          {currencySymbol === 'CRC' ? '₡' : '$'}
                          {submittedBrief.estimate.cost.toLocaleString('es-CR')}
                        </span>
                      </div>
                      <div>
                        <strong className="text-emerald-400 uppercase block">4. CRONOGRAMA</strong>
                        <span className="text-stone-200 font-bold">{submittedBrief.estimate.weeks} semanas</span>
                        <span className="text-[7px] text-stone-500 block">({submittedBrief.estimate.hours} horas totales)</span>
                      </div>
                    </div>

                    <div className="text-[7.5px] text-stone-500 italic pt-1 border-t border-stone-900 text-center">
                      Este documento ha sido estructurado de manera modular y determinista.
                    </div>
                  </div>

                  <div className="bg-emerald-950/30 border border-emerald-900/40 p-2.5 rounded-xl text-center text-[10px] text-emerald-400 font-bold">
                    ✓ ¡Propuesta generada con éxito! Copie el texto arriba para enviarlo por correo.
                  </div>

                </motion.div>
              ) : (
                <div className="my-auto text-center space-y-2.5 py-10">
                  <FileCode className="w-12 h-12 text-stone-700 mx-auto" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase">Sin Propuesta Activa</h4>
                    <p className="text-[10px] text-stone-500 max-w-xs mx-auto mt-1">
                      Digite su nombre y correo en el panel izquierdo y presione "Generar Propuesta y PRD" para inicializar el documento de desarrollo a la medida.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>

            <div className="bg-stone-900 px-3 py-1.5 text-[8.5px] font-mono text-stone-500 border-t border-stone-950 flex justify-between mt-3">
              <span>MÓDULO: PROPOSAL_ENGINE_v1.0</span>
              <span>ESTADO: LISTO</span>
            </div>

          </div>

        </div>
      </section>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-900 py-8 px-4 text-center text-xs text-stone-500 font-mono space-y-3">
        <p className="font-bold text-stone-400">
          FULLSTACK ACADEMY • PLATAFORMA EDUCATIVA DE ALTA TECNOLOGÍA
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs text-amber-500">
          <a href="https://wa.me/50670193160" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 font-bold text-amber-400 bg-stone-900 px-3 py-1 rounded-full border border-stone-850 hover:bg-stone-800 transition-colors">
            💚 WhatsApp Directo: +506 7019-3160
          </a>
          <span className="hidden sm:inline text-stone-700">•</span>
          <a href="mailto:soporte@fullstackacademy.dev" className="hover:underline text-stone-400">
            ✉️ Contacto y Soporte Académico
          </a>
        </div>
        <p className="text-[10px] text-stone-600 pt-2">
          © 2026 Todos los derechos reservados. Diseñado bajo estándares estrictos de rendimiento y persistencia relacional modular.
        </p>
      </footer>

      {/* MODAL IMPRIMIBLE DE TÍTULO OFICIAL */}
      <AnimatePresence>
        {selectedCertificateForView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 sm:p-6 max-w-4xl w-full shadow-2xl relative"
            >
              <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                  body * {
                    visibility: hidden !important;
                  }
                  #printable-diploma-card, #printable-diploma-card * {
                    visibility: visible !important;
                  }
                  #printable-diploma-card {
                    position: fixed !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    border: 8px double #d4af37 !important;
                    background-color: #0f0e0c !important;
                    color: #f2e6cf !important;
                    padding: 3rem !important;
                    box-sizing: border-box !important;
                    print-color-adjust: exact !important;
                    -webkit-print-color-adjust: exact !important;
                    z-index: 9999999 !important;
                  }
                }
              `}} />

              {/* BOTONES DE CABECERA (NO IMPRIMIBLES) */}
              <div className="flex justify-between items-center mb-4 border-b border-stone-800 pb-3 print:hidden">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Visualizador de Título Académico</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black rounded-lg text-xs uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
                  >
                    <Printer className="w-3.5 h-3.5" /> Imprimir / Guardar PDF
                  </button>
                  <button
                    onClick={() => setSelectedCertificateForView(null)}
                    className="px-3 py-1.5 bg-stone-950 hover:bg-stone-850 text-stone-300 font-bold rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>

              {/* CONTENEDOR DEL TÍTULO (SÍ IMPRIMIBLE) */}
              <div id="printable-diploma-card" className="bg-[#0f0e0c] text-[#f2e6cf] border-8 border-double border-[#d4af37]/70 rounded-xl p-6 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-inner select-text cursor-text font-sans print:border-8 print:p-12">
                
                {/* MARCAS DE AGUA O ADORNOS DE ESQUINA EN CSS */}
                <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-[#d4af37]/40 rounded-tl"></div>
                <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr"></div>
                <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-[#d4af37]/40 rounded-bl"></div>
                <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-[#d4af37]/40 rounded-br"></div>

                {/* LOGO EN CABECERA */}
                <div className="space-y-1.5">
                  <div className="inline-block p-3.5 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/30 text-[#d4af37] mb-2 shadow-lg shadow-amber-500/5">
                    <GraduationCap className="w-9 h-9" />
                  </div>
                  <h4 className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] font-bold">Título Académico Profesional</h4>
                  <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-none uppercase bg-gradient-to-r from-[#fcf6ba] via-[#bf953f] to-[#aa771c] bg-clip-text text-transparent">
                    FullStack Academy
                  </h2>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-stone-400 mt-1">Costa Rica • Ingeniería de Software & Especialidades de Alta Tecnología</p>
                </div>

                {/* CUERPO DEL CERTIFICADO */}
                <div className="space-y-5 max-w-2xl mx-auto py-4">
                  <p className="text-xs sm:text-sm italic text-stone-300 font-serif">
                    Por cuanto se ha completado satisfactoriamente el programa de estudios riguroso, evaluaciones de código virtuales y proyectos reales definidos para la carrera técnica, otorgamos el presente título oficial de honor a:
                  </p>

                  <div className="py-2.5 border-b border-[#d4af37]/35 max-w-lg mx-auto">
                    <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-wide text-stone-100 uppercase italic">
                      {selectedCertificateForView.studentName}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm italic text-stone-300 font-serif">
                    confiriéndole la acreditación oficial de grado académico como especialista en:
                  </p>

                  <div className="py-2">
                    <h1 className="text-xl sm:text-3xl font-black uppercase text-[#d4af37] tracking-tight bg-stone-900/40 py-2.5 px-4 rounded-xl border border-[#d4af37]/20 shadow-md">
                      {selectedCertificateForView.technicalCareer}
                    </h1>
                  </div>

                  <p className="text-xs text-stone-400 italic">
                    Con la distinción académica de: <strong className="text-emerald-400 font-bold uppercase not-italic block mt-1 text-xs">{selectedCertificateForView.distinction}</strong>
                  </p>
                </div>

                {/* FIRMAS Y SELLO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 max-w-2xl mx-auto items-end">
                  
                  {/* SELLO DE LA ACADEMIA */}
                  <div className="flex flex-col items-center justify-center space-y-1 text-center order-last sm:order-first">
                    <div className="w-20 h-20 bg-[#d4af37]/5 border-2 border-dashed border-[#d4af37]/35 rounded-full flex flex-col items-center justify-center shadow-lg relative">
                      <Award className="w-10 h-10 text-[#d4af37] animate-pulse" />
                      <span className="text-[7px] font-mono text-stone-400 font-bold uppercase tracking-wider block mt-0.5">ACADEMY VERIFIED</span>
                    </div>
                    <span className="text-[8px] font-mono text-stone-500 uppercase">Sello de Autenticidad Digital</span>
                  </div>

                  {/* FIRMA DE DIRECCIÓN ACADÉMICA */}
                  <div className="space-y-1.5 text-center flex flex-col items-center">
                    <div className="font-serif italic text-xl text-[#d4af37] font-bold select-none h-10 flex items-end">
                      Dirección Académica
                    </div>
                    <div className="w-48 border-t border-stone-700/60 mt-1"></div>
                    <span className="text-[9.5px] font-mono text-stone-400 uppercase font-black tracking-wider block">Comité de Certificación</span>
                    <span className="text-[8px] font-mono text-stone-500 uppercase block">FullStack Academy • Instrucción Técnica</span>
                  </div>

                </div>

                {/* VERIFICACIÓN Y PIE DE PÁGINA */}
                <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-stone-500 gap-3">
                  <div>
                    <span>CÓDIGO DE CREDENCIAL: </span>
                    <strong className="text-stone-300 uppercase">{selectedCertificateForView.verificationCode}</strong>
                  </div>
                  <div>
                    <span>EMISIÓN: </span>
                    <strong className="text-stone-300">{selectedCertificateForView.issueDate}</strong>
                  </div>
                  <div>
                    <span>ID DE REGISTRO: </span>
                    <strong className="text-[#d4af37]">{selectedCertificateForView.id}</strong>
                  </div>
                </div>

              </div>

              {/* NOTA DE IMPRESIÓN */}
              <div className="text-center text-[10px] text-stone-500 font-mono mt-3 print:hidden">
                💡 Nota: Presione el botón de "Imprimir" para descargar en formato PDF o enviar directamente a su impresora física.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
