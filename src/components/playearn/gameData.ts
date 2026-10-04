import { VideoAdTask, WheelPrize, CraftMaterial, CraftRecipe, EbookItem, MathQuestion } from './types';

export const INITIAL_VIDEO_ADS: VideoAdTask[] = [
  {
    id: 'vid-1',
    title: 'Nueva Bebida Energética Natural BioBoost 🌿',
    brand: 'BioBoost Labs',
    category: 'Salud & Energía',
    durationSeconds: 15,
    rewardUSD: 1.25,
    rewardGems: 40,
    rewardDiamonds: 8,
    videoUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    description: 'Conoce la fórmula 100% orgánica sin taurina artificial diseñada para desarrolladores y gamers.',
    productName: 'BioBoost Smart Energy Drink',
    productImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&auto=format&fit=crop&q=80',
    likesCount: 1420,
    ratingAverage: 4.8
  },
  {
    id: 'vid-2',
    title: 'Auriculares Inalámbricos Pro ANC SonicWave 🎧',
    brand: 'SonicWave Audio',
    category: 'Tecnología & Gadgets',
    durationSeconds: 20,
    rewardUSD: 1.80,
    rewardGems: 60,
    rewardDiamonds: 12,
    videoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Cancelación activa de ruido inteligente con 40 horas de batería continua y sonido Hi-Res.',
    productName: 'SonicWave Pro Headphones',
    productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80',
    likesCount: 2890,
    ratingAverage: 4.9
  },
  {
    id: 'vid-3',
    title: 'Reloj Inteligente TitanFit Ultra Resistente ⌚',
    brand: 'Titan Gear',
    category: 'Deportes & Smartwatches',
    durationSeconds: 15,
    rewardUSD: 1.50,
    rewardGems: 50,
    rewardDiamonds: 10,
    videoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Monitoreo de frecuencia cardiaca, GPS integrado y resistencia al agua de 50 metros.',
    productName: 'TitanFit Ultra Smartwatch',
    productImage: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=80',
    likesCount: 950,
    ratingAverage: 4.7
  },
  {
    id: 'vid-4',
    title: 'Cafetera Espresso Barista Compacta ☕',
    brand: 'AromaCraft Co.',
    category: 'Hogar & Gourmet',
    durationSeconds: 18,
    rewardUSD: 1.65,
    rewardGems: 55,
    rewardDiamonds: 11,
    videoUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
    description: 'La experiencia de un espresso italiano en tu cocina con bomba de 19 bares de presión.',
    productName: 'AromaCraft Barista Touch',
    productImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    likesCount: 1820,
    ratingAverage: 4.8
  }
];

export const WHEEL_PRIZES: WheelPrize[] = [
  { id: 0, label: '$2.50 USD', type: 'usd', value: 2.50, color: '#10b981', textColor: '#ffffff', icon: '💵' },
  { id: 1, label: '100 Gemas', type: 'gems', value: 100, color: '#3b82f6', textColor: '#ffffff', icon: '💎' },
  { id: 2, label: '15 Diamantes', type: 'diamonds', value: 15, color: '#8b5cf6', textColor: '#ffffff', icon: '💠' },
  { id: 3, label: '$5.00 USD', type: 'usd', value: 5.00, color: '#059669', textColor: '#ffffff', icon: '💰' },
  { id: 4, label: '+2 Giros Extra', type: 'spin', value: 2, color: '#f59e0b', textColor: '#ffffff', icon: '🎡' },
  { id: 5, label: '250 Gemas', type: 'gems', value: 250, color: '#2563eb', textColor: '#ffffff', icon: '💎' },
  { id: 6, label: '35 Diamantes', type: 'diamonds', value: 35, color: '#7c3aed', textColor: '#ffffff', icon: '💠' },
  { id: 7, label: 'JACKPOT $10', type: 'jackpot', value: 10.00, color: '#dc2626', textColor: '#ffffff', icon: '🔥' },
];

export const CRAFT_MATERIALS: CraftMaterial[] = [
  { id: 'wood', name: 'Madera de Roble', icon: '🪵', costGems: 25, stock: 12 },
  { id: 'clay', name: 'Arcilla Esmaltada', icon: '🏺', costGems: 35, stock: 8 },
  { id: 'crystal', name: 'Cristal Pulido', icon: '🔮', costGems: 50, stock: 6 },
  { id: 'gold_thread', name: 'Hilo de Oro Fino', icon: '🧵', costGems: 80, stock: 4 },
  { id: 'gemstone', name: 'Gema Esmeralda', icon: '💎', costGems: 120, stock: 3 }
];

export const CRAFT_RECIPES: CraftRecipe[] = [
  {
    id: 'craft-1',
    name: 'Jarrón de Cerámica Artesanal Ancestral',
    description: 'Moldeado a torno manual con detalles pulidos y sellado térmico.',
    requiredMaterials: [
      { materialId: 'clay', amount: 2 },
      { materialId: 'wood', amount: 1 }
    ],
    craftTimeSeconds: 5,
    sellPriceUSD: 2.20,
    sellPriceDiamonds: 15,
    image: '🏺'
  },
  {
    id: 'craft-2',
    name: 'Amuleto Guardián de Cristal & Roble',
    description: 'Engaste protector artesanal tallado a mano con runas tradicionales.',
    requiredMaterials: [
      { materialId: 'wood', amount: 2 },
      { materialId: 'crystal', amount: 1 }
    ],
    craftTimeSeconds: 7,
    sellPriceUSD: 3.50,
    sellPriceDiamonds: 25,
    image: '🧿'
  },
  {
    id: 'craft-3',
    name: 'Tapiz Bordado con Filigrana de Oro',
    description: 'Tejido exclusivo de seda y hebras áureas con motivos solares.',
    requiredMaterials: [
      { materialId: 'gold_thread', amount: 2 },
      { materialId: 'crystal', amount: 1 }
    ],
    craftTimeSeconds: 10,
    sellPriceUSD: 5.80,
    sellPriceDiamonds: 40,
    image: '🖼️'
  },
  {
    id: 'craft-4',
    name: 'Cofre Real con Incrustación de Esmeralda',
    description: 'Pieza maestra de ebanistería con cerradura de latón y gemas auténticas.',
    requiredMaterials: [
      { materialId: 'wood', amount: 3 },
      { materialId: 'gold_thread', amount: 1 },
      { materialId: 'gemstone', amount: 1 }
    ],
    craftTimeSeconds: 12,
    sellPriceUSD: 9.50,
    sellPriceDiamonds: 60,
    image: '👑'
  }
];

export const EBOOKS_CATALOG: EbookItem[] = [
  {
    id: 'ebook-1',
    title: 'Finanzas Inteligentes: Cómo Multiplicar Tus Ahorros',
    author: 'Lic. Andrés Valenzuela',
    category: 'Educación Financiera',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80',
    summary: 'Guía práctica para crear presupuestos reales, liquidar deudas e invertir en activos que generen flujo de caja constante.',
    rewardPerChapterUSD: 0.85,
    rewardPerChapterDiamonds: 10,
    chapters: [
      {
        chapterNumber: 1,
        title: 'El Mito del Salario Fijo y el Flujo de Efectivo',
        content: [
          'La mayoría de las personas confunden los ingresos con la riqueza. La riqueza no es la cantidad de dinero que entra cada mes, sino cuántos días puedes vivir manteniendo tu estándar de vida sin tener que trabajar activamente.',
          'Para dar el primer salto hacia la libertad financiera, es imprescindible crear un colchón de seguridad equivalente a tres meses de gastos fijos. Este fondo de emergencia te da la tranquilidad mental necesaria para buscar nuevas oportunidades de inversión sin temor a imprevistos.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'El Interés Compuesto: La Octava Maravilla del Mundo',
        content: [
          'Albert Einstein llamó al interés compuesto la fuerza más poderosa del universo. Cuando reinviertes las ganancias generadas por tu capital, tus ganancias comienzan a generar nuevas ganancias por sí mismas de forma exponencial.',
          'Comenzar con apenas $10 o $20 al mes a una edad temprana supera con creces el ahorro tardío de grandes sumas de dinero debido al factor tiempo. La constancia supera siempre a la intensidad.'
        ]
      },
      {
        chapterNumber: 3,
        title: 'Activos Digitales y Micro-negocios Rentables',
        content: [
          'En el siglo XXI, el capital de trabajo más valioso no son las fábricas físicas ni los almacenes, sino la propiedad intelectual, el software y los canales directos de distribución digital.',
          'Construir o monetizar micro-servicios, creación de contenido educativo o tiendas automatizadas permite diversificar los ingresos y reducir la dependencia de un solo empleador.'
        ]
      }
    ]
  },
  {
    id: 'ebook-2',
    title: 'El Poder de la Mente Creativa y el Enfoque',
    author: 'Dra. Marcela Rivas',
    category: 'Desarrollo Personal',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=80',
    summary: 'Estrategias basadas en neurociencia para eliminar la distracción digital y desbloquear tu potencial creador.',
    rewardPerChapterUSD: 0.90,
    rewardPerChapterDiamonds: 12,
    chapters: [
      {
        chapterNumber: 1,
        title: 'La Batalla por Tu Atención en la Era de los Algoritmos',
        content: [
          'Cada notificación en tu teléfono celular está diseñada por expertos en psicología conductual para secuestrar tu sistema de dopamina y fragmentar tus períodos de concentración profunda.',
          'Recuperar la capacidad de concentrarte durante 45 minutos seguidos en una sola tarea te coloca inmediatamente en el 5% superior de cualquier profesión.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'El Estado de Flujo (Flow State) y la Creación',
        content: [
          'Cuando el nivel de desafío de una tarea se equilibra perfectamente con tus habilidades, entras en lo que los psicólogos denominan estado de flujo.',
          'En este estado, la noción del tiempo desaparece, la autocrítica se silencia y la productividad puede multiplicarse hasta en un 500% según estudios recientes de la Universidad de Harvard.'
        ]
      }
    ]
  },
  {
    id: 'ebook-3',
    title: 'Aventuras en el Reino de los Números Mágicos',
    author: 'Prof. Sofía Montes',
    category: 'Infantil & Juvenil',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=500&auto=format&fit=crop&q=80',
    summary: 'Una fascinante travesía donde los teoremas y las formas geométricas cobran vida en un mundo de fantasía.',
    rewardPerChapterUSD: 0.75,
    rewardPerChapterDiamonds: 8,
    chapters: [
      {
        chapterNumber: 1,
        title: 'El Misterio de la Pirámide de los Números Primos',
        content: [
          'Lucas y Maya descubrieron una cueva secreta detrás de la cascada azul. En la entrada, grabada sobre piedra brillante, había una lista de números que solo podían dividirse entre ellos mismos y el número uno: 2, 3, 5, 7, 11...',
          '—¡Son los guardianes del portal! —exclamó Maya—. ¡Si encontramos el siguiente guardián después del 11, la puerta de oro se abrirá!'
        ]
      },
      {
        chapterNumber: 2,
        title: 'El Dragón del Círculo y el Secreto de Pi',
        content: [
          'Para cruzar el lago circular sin despertar a la bestia durmiente, los viajeros debían calcular cuántos pasos medía la orilla completa.',
          'El sabio búho les susurró la fórmula mágica: "Multiplica el ancho del lago por 3.1416 y conocerás el camino exacto para llegar a salvo a la otra orilla".'
        ]
      }
    ]
  }
];

export const MATH_KIDS_QUESTIONS: MathQuestion[] = [
  {
    id: 'mk-1',
    question: 'Si Lucas tiene 14 gemas y en la rueda de la fortuna gana 8 gemas más, ¿cuántas gemas tiene en total?',
    options: ['20 gemas', '22 gemas', '24 gemas', '21 gemas'],
    correctAnswerIndex: 1,
    explanation: '¡Excelente! 14 + 8 = 22 gemas.',
    topic: 'Sumas Divertidas',
    difficulty: 'fácil',
    rewardGems: 25,
    rewardDiamonds: 3,
    rewardUSD: 0.25
  },
  {
    id: 'mk-2',
    question: 'Un cofre del tesoro contiene 35 monedas de oro. Un pirata retira 17 monedas. ¿Cuántas monedas quedan?',
    options: ['18 monedas', '16 monedas', '19 monedas', '20 monedas'],
    correctAnswerIndex: 0,
    explanation: '¡Muy bien! 35 - 17 = 18 monedas en el cofre.',
    topic: 'Restas de Aventura',
    difficulty: 'fácil',
    rewardGems: 30,
    rewardDiamonds: 4,
    rewardUSD: 0.30
  },
  {
    id: 'mk-3',
    question: 'En una granja hay 6 corrales y cada corral tiene 4 simpáticos conejitos. ¿Cuántos conejitos hay en total?',
    options: ['20 conejitos', '26 conejitos', '24 conejitos', '28 conejitos'],
    correctAnswerIndex: 2,
    explanation: '¡Magnífico! 6 corrales × 4 conejitos = 24 conejitos.',
    topic: 'Tablas de Multiplicar',
    difficulty: 'medio',
    rewardGems: 40,
    rewardDiamonds: 5,
    rewardUSD: 0.40
  },
  {
    id: 'mk-4',
    question: '¿Cuántos lados tiene un hexágono regular?',
    options: ['5 lados', '6 lados', '7 lados', '8 lados'],
    correctAnswerIndex: 1,
    explanation: '¡Exacto! El prefijo "hexa" significa 6 lados.',
    topic: 'Geometría Elemental',
    difficulty: 'fácil',
    rewardGems: 20,
    rewardDiamonds: 2,
    rewardUSD: 0.20
  },
  {
    id: 'mk-5',
    question: 'Tienes 48 caramelos y deseas repartirlos en partes iguales entre 6 amigos. ¿Cuántos caramelos recibe cada uno?',
    options: ['7 caramelos', '8 caramelos', '9 caramelos', '6 caramelos'],
    correctAnswerIndex: 1,
    explanation: '¡Correcto! 48 ÷ 6 = 8 caramelos para cada amigo.',
    topic: 'Repartos y Divisiones',
    difficulty: 'medio',
    rewardGems: 45,
    rewardDiamonds: 6,
    rewardUSD: 0.45
  },
  {
    id: 'mk-6',
    question: '¿Cuál es el doble de 15 sumado al triple de 4?',
    options: ['38', '42', '45', '40'],
    correctAnswerIndex: 1,
    explanation: 'El doble de 15 es 30 (15 × 2 = 30). El triple de 4 es 12 (4 × 3 = 12). 30 + 12 = 42.',
    topic: 'Cálculo Mental Ninja',
    difficulty: 'reto',
    rewardGems: 60,
    rewardDiamonds: 8,
    rewardUSD: 0.60
  }
];

export const MATH_TEENS_QUESTIONS: MathQuestion[] = [
  {
    id: 'mt-1',
    question: 'Resuelve la ecuación lineal: 3x - 7 = 2x + 8. ¿Cuál es el valor de x?',
    options: ['x = 12', 'x = 15', 'x = 14', 'x = 1'],
    correctAnswerIndex: 1,
    explanation: '3x - 2x = 8 + 7 => x = 15.',
    topic: 'Álgebra Lineal',
    difficulty: 'fácil',
    rewardGems: 50,
    rewardDiamonds: 8,
    rewardUSD: 0.65
  },
  {
    id: 'mt-2',
    question: 'Encuentra las raíces de la ecuación cuadrática: x² - 5x + 6 = 0.',
    options: ['x = 1 y x = 6', 'x = 2 y x = 3', 'x = -2 y x = -3', 'x = 3 y x = 5'],
    correctAnswerIndex: 1,
    explanation: 'Factorizando: (x - 2)(x - 3) = 0 => x₁ = 2, x₂ = 3.',
    topic: 'Ecuaciones Cuadráticas',
    difficulty: 'medio',
    rewardGems: 70,
    rewardDiamonds: 12,
    rewardUSD: 0.85
  },
  {
    id: 'mt-3',
    question: 'En un triángulo rectángulo, si el cateto opuesto mide 6 cm y el cateto adyacente mide 8 cm, ¿cuánto mide la hipotenusa?',
    options: ['9 cm', '10 cm', '12 cm', '14 cm'],
    correctAnswerIndex: 1,
    explanation: 'Por Teorema de Pitágoras: h = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.',
    topic: 'Trigonometría & Pitágoras',
    difficulty: 'medio',
    rewardGems: 75,
    rewardDiamonds: 14,
    rewardUSD: 0.90
  },
  {
    id: 'mt-4',
    question: 'Calcula el valor exacto de: sen²(45°) + cos²(45°).',
    options: ['0', '0.5', '1', '√2'],
    correctAnswerIndex: 2,
    explanation: 'Por la identidad trigonométrica fundamental pitagórica, sen²(θ) + cos²(θ) = 1 para cualquier ángulo.',
    topic: 'Identidades Trigonométricas',
    difficulty: 'medio',
    rewardGems: 65,
    rewardDiamonds: 10,
    rewardUSD: 0.80
  },
  {
    id: 'mt-5',
    question: '¿Cuál es la derivada de f(x) = 4x³ - 5x² + 7x - 9 con respecto a x?',
    options: ['12x² - 10x + 7', '12x³ - 10x + 7', '4x² - 5x + 7', '12x² - 5x'],
    correctAnswerIndex: 0,
    explanation: 'Regla de la potencia: d/dx[4x³] = 12x², d/dx[-5x²] = -10x, d/dx[7x] = 7, d/dx[-9] = 0. Resultado: 12x² - 10x + 7.',
    topic: 'Cálculo Diferencial',
    difficulty: 'reto',
    rewardGems: 100,
    rewardDiamonds: 20,
    rewardUSD: 1.25
  },
  {
    id: 'mt-6',
    question: 'Si lanzas dos dados estándar de 6 caras, ¿cuál es la probabilidad de que la suma de los puntos sea igual a 7?',
    options: ['1/12', '1/6', '7/36', '5/36'],
    correctAnswerIndex: 1,
    explanation: 'Hay 6 combinaciones que suman 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) de un total de 36 posibilidades. 6/36 = 1/6.',
    topic: 'Probabilidad & Estadística',
    difficulty: 'reto',
    rewardGems: 90,
    rewardDiamonds: 18,
    rewardUSD: 1.10
  }
];

export const TRIVIA_QUESTIONS: import('./types').TriviaQuestion[] = [
  {
    id: 'triv-1',
    category: 'Cultura General',
    difficulty: 'Fácil',
    question: '¿Cuál es el océano más grande y profundo de la Tierra?',
    options: ['Océano Atlántico', 'Océano Índico', 'Océano Pacífico', 'Océano Ártico'],
    correctAnswerIndex: 2,
    explanation: 'El Océano Pacífico es el más grande y contiene la Fosa de las Marianas, el punto más profundo del planeta.',
    rewardUSD: 0.40,
    rewardGems: 25,
    rewardDiamonds: 5,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-2',
    category: 'Ciencia & Tech',
    difficulty: 'Medio',
    question: '¿Qué elemento de la tabla periódica tiene el símbolo químico "Au"?',
    options: ['Plata', 'Oro', 'Aluminio', 'Cobre'],
    correctAnswerIndex: 1,
    explanation: '"Au" proviene del latín "aurum", que significa brillante amanecer o resplandor de oro.',
    rewardUSD: 0.55,
    rewardGems: 35,
    rewardDiamonds: 7,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-3',
    category: 'Historia & Geografía',
    difficulty: 'Medio',
    question: '¿En qué año llegó el ser humano a la Luna por primera vez con la misión Apolo 11?',
    options: ['1965', '1969', '1972', '1975'],
    correctAnswerIndex: 1,
    explanation: 'Neil Armstrong y Buzz Aldrin alunizaron el 20 de julio de 1969.',
    rewardUSD: 0.60,
    rewardGems: 40,
    rewardDiamonds: 8,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-4',
    category: 'Ciencia & Tech',
    difficulty: 'Experto',
    question: '¿Quién es considerado el padre del lenguaje de programación Python?',
    options: ['Dennis Ritchie', 'James Gosling', 'Guido van Rossum', 'Bjarne Stroustrup'],
    correctAnswerIndex: 2,
    explanation: 'Guido van Rossum creó Python a finales de 1989 y lo publicó formalmente en 1991.',
    rewardUSD: 0.85,
    rewardGems: 50,
    rewardDiamonds: 10,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-5',
    category: 'Cine & TV',
    difficulty: 'Fácil',
    question: '¿Qué actor interpreta a Iron Man (Tony Stark) en el Universo Cinematográfico de Marvel?',
    options: ['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
    correctAnswerIndex: 1,
    explanation: 'Robert Downey Jr. inmortalizó el papel de Iron Man desde la película pionera de 2008 hasta Avengers: Endgame.',
    rewardUSD: 0.45,
    rewardGems: 30,
    rewardDiamonds: 6,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-6',
    category: 'Videojuegos',
    difficulty: 'Medio',
    question: '¿Cuál es el videojuego más vendido de todos los tiempos con más de 300 millones de copias?',
    options: ['Grand Theft Auto V', 'Tetris', 'Minecraft', 'Super Mario Bros'],
    correctAnswerIndex: 2,
    explanation: 'Minecraft superó los 300 millones de copias vendidas en múltiples plataformas mundiales.',
    rewardUSD: 0.50,
    rewardGems: 35,
    rewardDiamonds: 7,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-7',
    category: 'Deportes',
    difficulty: 'Fácil',
    question: '¿Cada cuántos años se celebran normalmente los Juegos Olímpicos de Verano?',
    options: ['Cada 2 años', 'Cada 3 años', 'Cada 4 años', 'Cada 5 años'],
    correctAnswerIndex: 2,
    explanation: 'Los Juegos Olímpicos de Verano se organizan cada 4 años desde la primera edición moderna en Atenas 1896.',
    rewardUSD: 0.40,
    rewardGems: 25,
    rewardDiamonds: 5,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-8',
    category: 'Arte & Música',
    difficulty: 'Medio',
    question: '¿Quién pintó la famosa obra maestra renacentista "La Mona Lisa" (La Gioconda)?',
    options: ['Miguel Ángel', 'Leonardo da Vinci', 'Rafael Sanzio', 'Sandro Botticelli'],
    correctAnswerIndex: 1,
    explanation: 'Leonardo da Vinci pintó La Mona Lisa en Florencia a principios del siglo XVI.',
    rewardUSD: 0.50,
    rewardGems: 30,
    rewardDiamonds: 6,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-9',
    category: 'Cultura General',
    difficulty: 'Experto',
    question: '¿Cuál es el país con mayor cantidad de volcanes activos en el mundo?',
    options: ['Japón', 'Estados Unidos', 'Indonesia', 'Islandia'],
    correctAnswerIndex: 2,
    explanation: 'Indonesia cuenta con más de 130 volcanes activos a lo largo del Cinturón de Fuego del Pacífico.',
    rewardUSD: 0.75,
    rewardGems: 45,
    rewardDiamonds: 9,
    timeLimitSeconds: 15
  },
  {
    id: 'triv-10',
    category: 'Ciencia & Tech',
    difficulty: 'Fácil',
    question: '¿A qué velocidad viaja la luz en el vacío aproximadamente?',
    options: ['300.000 km/s', '150.000 km/s', '1.000.000 km/s', '30.000 km/s'],
    correctAnswerIndex: 0,
    explanation: 'La velocidad de la luz en el vacío es de aproximadamente 299.792 kilómetros por segundo.',
    rewardUSD: 0.50,
    rewardGems: 30,
    rewardDiamonds: 6,
    timeLimitSeconds: 15
  }
];

