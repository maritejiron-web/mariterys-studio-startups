import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Sparkles, 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Compass, 
  Trophy, 
  Gamepad2, 
  RefreshCw, 
  Play, 
  Smile, 
  Star, 
  ArrowRight, 
  ChevronRight, 
  Info,
  Check,
  X,
  Volume2,
  VolumeX,
  FileText,
  Upload,
  FileUp,
  Download,
  Eye,
  FilePlus,
  Paperclip,
  Clock,
  Send,
  FileCheck,
  Shapes,
  Share2
} from 'lucide-react';
import { GeometryStudio } from './StreamPAY/GeometryStudio';
import EstudiosSociales1948Practice from './EstudiosSociales1948Practice';

// Motivation quotes in Spanish (Albert Einstein Style)
const EINSTEIN_QUOTES = [
  "¡La mente que se abre a una nueva idea jamás volverá a su tamaño original! ¡Sigue adelante, mi joven amigo!",
  "El genio se hace con 1% de talento y 99% de trabajo. ¡Tú tienes todo para ser un genio hoy!",
  "Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el bello mundo del saber.",
  "Hay una fuerza motriz más poderosa que el vapor, la electricidad y la energía atómica: la voluntad. ¡Tu voluntad es invencible!",
  "El juego es la forma más alta de investigación. ¡Diviértete aprendiendo hoy matemáticas y ciencias!",
  "Si no puedes explicarlo de forma sencilla, es que no lo has entendido lo suficiente. ¡Aquí lo haremos súper fácil!",
  "La curiosidad tiene su propia razón de existir. ¡Nunca dejes de hacerte preguntas!"
];

// Structural Types for Sciences Temario & PDF Documents
export interface ScienceTemarioUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  topics: string[];
  mepStandardCompetencies: string[];
  sampleQuestion: string;
  sampleAnswer: string;
}

export interface ScienceExamQuestion {
  id: string;
  topicTitle: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface UploadedPdfDocument {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  subject: string;
  status: 'ready' | 'processing';
  pageCount: number;
  extractedTopics: string[];
}

export const CIENCIAS_TEMARIO_MEP: ScienceTemarioUnit[] = [
  {
    id: 'cuerpo_salud',
    unitNumber: 1,
    title: 'Cuerpo Humano, Nutrición y Salud Integral',
    description: 'Estudio detallado del sistema circulatorio, respiratorio y excretor humano. Hábitos de higiene en la pubertad y prevención de enfermedades.',
    topics: [
      'El corazón como bomba muscular y los vasos sanguíneos (arterias, venas, capilares)',
      'Intercambio de oxígeno y CO2 en los alvéolos pulmonares',
      'Filtración de la sangre y formación de orina en los riñones',
      'Cambios morfofisiológicos en la pubertad y desarrollo de glándulas apocrinas',
      'Prevención de enfermedades infectocontagiosas y alimentación balanceada'
    ],
    mepStandardCompetencies: [
      'Reconocer la función e interrelación de los órganos principales del sistema circulatorio, respiratorio y urinario.',
      'Promover prácticas cotidianas de salud, aseo personal y prevención en la etapa escolar.'
    ],
    sampleQuestion: '¿En qué estructura microscópica de los pulmones ocurre el intercambio de oxígeno y dióxido de carbono?',
    sampleAnswer: 'En los alvéolos pulmonares, donde la pared capilar sumamente delgada permite la difusión rápida de gases con la sangre.'
  },
  {
    id: 'biodiversidad_ecosistemas',
    unitNumber: 2,
    title: 'Biodiversidad, Ecosistemas y Sostenibilidad',
    description: 'Análisis de las interacciones interespecíficas, redes tróficas y conservación del patrimonio natural de Costa Rica.',
    topics: [
      'Mutualismo, comensalismo, parasitismo y depredación',
      'Organismos autótrofos (productores) y heterótrofos (consumidores y descomponedores)',
      'Especies endémicas e importancia de los Parques Nacionales de Costa Rica',
      'Consecuencias de la deforestación y la contaminación de acuíferos'
    ],
    mepStandardCompetencies: [
      'Clasificar las relaciones simbióticas y de dependencia en diversos ecosistemas tropicales.',
      'Fundamentar la importancia biológica y económica de las Áreas Silvestres Protegidas de Costa Rica.'
    ],
    sampleQuestion: '¿Qué diferencia existe entre una relación de mutualismo y una de parasitismo?',
    sampleAnswer: 'En el mutualismo ambos organismos se benefician mutuamente (ej. abeja y flor), mientras que en el parasitismo un organismo perjudica al otro hospedero.'
  },
  {
    id: 'materia_energia',
    unitNumber: 3,
    title: 'Materia, Energía y sus Transformaciones',
    description: 'Propiedades físicas de la materia, fuentes limpias e inagotables de energía y leyes de conservación energética.',
    topics: [
      'Estados de agregación de la materia y cambios de fase (fusión, evaporación, condensación, solidificación)',
      'Transformaciones de energía química, eléctrica, térmica, eólica, solar y geotérmica',
      'Circuitos eléctricos simples, fuentes de potencia y materiales conductores',
      'Matriz energética renovable de Costa Rica (hidroeléctrica, eólica, geotérmica)'
    ],
    mepStandardCompetencies: [
      'Demostrar experimentalmente cómo la energía se transforma de una forma a otra sin destruirse.',
      'Identificar el uso responsable de la electricidad y la importancia de las energías limpias para el país.'
    ],
    sampleQuestion: '¿Qué transformación energética ocurre al encender un foco de mano que utiliza baterías?',
    sampleAnswer: 'La energía química almacenada en la batería se convierte en energía eléctrica y posteriormente en energía lumínica y calórica.'
  },
  {
    id: 'tierra_universo',
    unitNumber: 4,
    title: 'La Tierra, el Agua y la Sostenibilidad Global',
    description: 'Ciclo hidrológico, estructura de la atmósfera terrestre, astronomía básica del Sistema Solar y resiliencia climática.',
    topics: [
      'Etapas del ciclo del agua (evaporación, condensación, precipitación, escorrentía, infiltración)',
      'Capas atmosféricas (troposfera, estratosfera y capa de ozono)',
      'Cuerpos celestes del Sistema Solar y movimientos terrestres (rotación y traslación)',
      'Medidas frente al cambio climático y protección de cuencas hidrográficas'
    ],
    mepStandardCompetencies: [
      'Explicar la dinámica del ciclo del agua y su influencia fundamental en el clima de las regiones costarricenses.',
      'Proponer iniciativas escolares para la recolección de aguas pluviales y la reducción de la huella hídrica.'
    ],
    sampleQuestion: '¿Cómo influye la vegetación de los bosques en la infiltración y conservación del ciclo del agua?',
    sampleAnswer: 'Las raíces sujetan el suelo y favorecen que el agua de lluvia penetre hacia los acuíferos subterráneos, reduciendo la erosión.'
  }
];

export const CIENCIAS_EXAM_QUESTIONS: ScienceExamQuestion[] = [
  {
    id: 'q1',
    topicTitle: 'Cuerpo Humano',
    question: '¿Cuál es el órgano muscular hueco responsable de impulsar la sangre a través del sistema circulatorio en el ser humano?',
    options: ['El hígado', 'El pulmón izquierdo', 'El corazón', 'El riñón derecho'],
    correctIdx: 2,
    explanation: 'El corazón funciona como una bomba autorregulada que genera la presión necesaria para distribuir sangre oxigenada a todas las células del cuerpo.'
  },
  {
    id: 'q2',
    topicTitle: 'Sistema Respiratorio',
    question: '¿En qué estructura microscópica del sistema respiratorio se efectúa el intercambio gaseoso de oxígeno por dióxido de carbono?',
    options: ['En las fosas nasales', 'En la tráquea', 'En los alvéolos pulmonares', 'En la laringe'],
    correctIdx: 2,
    explanation: 'Los alvéolos pulmonares son diminutos sacos revestidos de vasos capilares donde los gases pasan a través de membranas celulares ultradelgadas.'
  },
  {
    id: 'q3',
    topicTitle: 'Sistema Excretor',
    question: '¿Cuál es la función principal de los riñones dentro del sistema excretor de un estudiante de sexto grado?',
    options: ['Producir bilis para digerir grasas', 'Filtrar la sangre para eliminar desechos y formar la orina', 'Bombear oxígeno a los músculos', 'Procesar el aire que respiramos'],
    correctIdx: 1,
    explanation: 'Los riñones actúan como potentes filtros biológicos que remueven toxinas metabólicas y mantienen el equilibrio de agua y sales minerales.'
  },
  {
    id: 'q4',
    topicTitle: 'Ecosistemas y Mutualismo',
    question: '¿Cómo se denomina la relación ecológica en la que dos especies diferentes conviven y ambas obtienen beneficios para su supervivencia?',
    options: ['Parasitismo', 'Competencia', 'Depredación', 'Mutualismo'],
    correctIdx: 3,
    explanation: 'El mutualismo beneficia a ambos organismos. Un ejemplo clásico en Costa Rica son las abejas y las flores que se polinizan.'
  },
  {
    id: 'q5',
    topicTitle: 'Energía y sus Transformaciones',
    question: 'Al encender una linterna operada con baterías, ¿qué secuencia de transformación energética se produce principalmente?',
    options: ['Energía solar a energía geotérmica', 'Energía química de las baterías -> Energía eléctrica -> Energía lumínica', 'Energía eólica a energía nuclear', 'Energía gravitatoria a sonora'],
    correctIdx: 1,
    explanation: 'La reacción química dentro de las celdas de la batería libera electrones (energía eléctrica), los cuales alimentan la bombilla o LED proyectando luz.'
  },
  {
    id: 'q6',
    topicTitle: 'Energías Renovables en Costa Rica',
    question: '¿Cuál de los siguientes recursos energéticos es considerado inagotable y limpio para la producción eléctrica nacional?',
    options: ['El carbón mineral', 'La energía solar fotovoltaica', 'El petróleo pesado', 'El gas metano no controlado'],
    correctIdx: 1,
    explanation: 'La energía solar proviene directamente del Sol y es limpia e inagotable, clave para la matriz verde y descarbonizada de Costa Rica.'
  },
  {
    id: 'q7',
    topicTitle: 'Ciclo del Agua',
    question: '¿Qué proceso del ciclo hidrológico ocurre cuando el agua líquida de ríos y mares se calienta por la radiación solar y sube a la atmósfera en forma de vapor?',
    options: ['Condensación', 'Evaporación', 'Solidificación', 'Precipitación'],
    correctIdx: 1,
    explanation: 'La evaporación es el cambio de estado de líquido a gas cuando las moléculas de agua absorben suficiente energía térmica del sol.'
  },
  {
    id: 'q8',
    topicTitle: 'Atmósfera y Capa de Ozono',
    question: '¿Cuál es la función protectora fundamental de la capa de ozono ubicada en la estratosfera terrestre?',
    options: ['Producir lluvias torrenciales constantes', 'Absorber y filtrar la radiación ultravioleta (UV) nociva proveniente del Sol', 'Proveer dióxido de carbono a las plantas', 'Evitar que los aviones se caigan'],
    correctIdx: 1,
    explanation: 'La capa de ozono (O3) actúa como un filtro solar natural que bloquea los rayos UV-B y UV-C dañinos para la piel y la visión de los seres vivos.'
  },
  {
    id: 'q9',
    topicTitle: 'Pubertad e Higiene',
    question: '¿Por qué es fundamental intensificar el baño diario y el uso de desodorante durante la pubertad?',
    options: ['Porque los huesos crecen demasiado rápido', 'Debido a la mayor actividad de las glándulas sudoríparas apocrinas y sebáceas', 'Para no tener que estudiar ciencias', 'Porque la piel pierde su color natural'],
    correctIdx: 1,
    explanation: 'Durante la pubertad las hormonas activan las glándulas apocrinas. El aseo con agua y jabón evita la proliferación de bacterias que causan mal olor.'
  },
  {
    id: 'q10',
    topicTitle: 'Sostenibilidad y Conservación',
    question: '¿Qué medida escolar favorece directamente la conservación de la biodiversidad y el recurso agua en la comunidad?',
    options: ['Desechar plásticos en los ríos', 'Crear jardines polinizadores y recolectar aguas pluviales para riego', 'Talar los árboles del patio escolar', 'Dejar los tubos abiertos'],
    correctIdx: 1,
    explanation: 'Los jardines polinizadores apoyan a insectos y colibríes autóctonos, mientras que cosechar agua de lluvia ahorra consumo de agua potable en las escuelas.'
  }
];

// Interactive FAQ with Einstein
const EINSTEIN_FAQ = [
  {
    q: "¿Por qué son importantes los números primos?",
    a: "¡Ah, mi joven colega! Los números primos son como los átomos de la matemática: bloques de construcción indivisibles. ¡Cualquier otro número entero se puede construir multiplicando números primos! Son la base de los códigos secretos y la seguridad de las computadoras."
  },
  {
    q: "¿Cuál es el secreto de las potencias de base 10?",
    a: "¡Es el truco más maravilloso del universo! El numerito pequeño de arriba (el exponente) te dice exactamente cuántos ceros debes escribir después del número 1. Por ejemplo, 10³ es simplemente un 1 con tres ceros: ¡1000! ¡Es magia pura!"
  },
  {
    q: "¿Qué diferencia hay entre la circunferencia y el círculo?",
    a: "¡Muy fácil! Imagina un anillo de oro: la circunferencia es solo la línea del borde exterior (un hilo). El círculo es todo lo que hay por dentro, incluyendo el relleno, como una deliciosa tortilla de queso o una pizza costarricense."
  },
  {
    q: "¿Para qué nos sirve dividir fracciones?",
    a: "Dividir fracciones es como repartir partes de partes. Si tienes media sandía (1/2) y la divides entre porciones de un cuarto (1/4), ¡obtienes 2 porciones! El truco para calcularlo en un abrir y cerrar de ojos es multiplicar cruzado."
  },
  {
    q: "¿Por qué se abolió el ejército en Costa Rica en 1948?",
    a: "¡Una decisión genial que asombró a la humanidad! El 1 de diciembre de 1948, don José Figueres Ferrer abolió el ejército para cambiar las armas por cuadernos y hospitales. Al no gastar en tanques ni fusiles, Costa Rica pudo construir escuelas en cada rincón y llevar salud a todas las familias."
  },
  {
    q: "¿Qué fue el Estado Benefactor de Costa Rica?",
    a: "¡Fue el gran motor de desarrollo moderno! El Estado asumió la misión de proteger a la ciudadanía creando instituciones autónomas como el ICE (electricidad), el INVU (casas dignas), AyA (agua pura) y la CCSS (salud y pensiones). ¡Eso creó una fuerte clase media costarricense!"
  }
];

// Trivia Questions for Spanish, Science, and Social Studies
const TRIVIA_DATA: Record<string, Array<{
  id: string;
  question: string;
  options: string[];
  answerIdx: number;
  explanation: string;
}>> = {
  espanol: [
    {
      id: "esp-1",
      question: "¿Cuál de las siguientes palabras es aguda y lleva tilde por terminar en vocal, 'n' o 's'?",
      options: ["Árbol", "Café", "Lápiz", "Música"],
      answerIdx: 1,
      explanation: "Las palabras agudas tienen la sílaba tónica en la última sílaba. 'Café' es aguda y lleva tilde porque termina en vocal."
    },
    {
      id: "esp-2",
      question: "Identifique el tipo de palabra según su acento: 'Sílaba' o 'Música'.",
      options: ["Aguda", "Grave", "Esdrújula", "Sobreesdrújula"],
      answerIdx: 2,
      explanation: "Las palabras esdrújulas tienen el acento en la antepenúltima sílaba y siempre, sin excepción, llevan tilde."
    },
    {
      id: "esp-3",
      question: "¿Qué es un sinónimo?",
      options: ["Una palabra con significado opuesto", "Una palabra que suena igual pero se escribe diferente", "Una palabra con significado idéntico o muy parecido", "Una palabra que no tiene vocales"],
      answerIdx: 2,
      explanation: "Los sinónimos son palabras diferentes que comparten el mismo significado, como 'feliz' y 'alegre'."
    },
    {
      id: "esp-4",
      question: "En la oración 'La astuta María Teresa estudia con mucha alegría', ¿cuál palabra funciona como un adjetivo calificativo?",
      options: ["estudia", "astuta", "alegría", "con"],
      answerIdx: 1,
      explanation: "Los adjetivos calificativos describen cualidades directas del sustantivo. En este caso, 'astuta' califica a 'María Teresa'."
    },
    {
      id: "esp-5",
      question: "Identifique cuál de las siguientes palabras presenta un hiato (separación de dos vocales contiguas en sílabas distintas):",
      options: ["Canción", "Cielo", "Poeta", "Causa"],
      answerIdx: 2,
      explanation: "El hiato ocurre cuando dos vocales fuertes (a, e, o) se encuentran juntas y se pronuncian en sílabas separadas (po-e-ta). En cambio, 'canción', 'cielo' y 'causa' contienen diptongos."
    },
    {
      id: "esp-6",
      question: "¿Cuál de las siguientes opciones representa una oración unimembre?",
      options: ["¡Qué tarde es!", "Ella estudia mucho.", "Nosotros viajamos a Cartago.", "El perro corre en el parque."],
      answerIdx: 0,
      explanation: "Las oraciones unimembres no poseen sujeto y predicado disociables. Suelen ser interjecciones, exclamaciones o verbos impersonales como 'Hace frío' o 'Llueve mucho'."
    },
    {
      id: "esp-7",
      question: "Identifique la opción que contiene únicamente preposiciones del idioma español:",
      options: ["y, o, pero, mas", "a, ante, bajo, con, contra, de, desde", "él, ella, nosotros, ellos", "rápido, alegremente, ayer"],
      answerIdx: 1,
      explanation: "Las preposiciones son nexos invariables que relacionan palabras. La lista oficial incluye 'a, ante, bajo, cabe, con, contra, de, desde, durante, en, entre, hacia, hasta, mediante, para, por, según, sin, so, sobre, tras, versus y vía'."
    },
    {
      id: "esp-8",
      question: "En la frase: 'Mañana nosotros resolveremos todos los problemas', ¿en qué tiempo y modo verbal está conjugado el verbo?",
      options: ["Pasado, Modo Indicativo", "Presente, Modo Subjuntivo", "Futuro simple, Modo Indicativo", "Condicional, Modo Imperativo"],
      answerIdx: 2,
      explanation: "El verbo 'resolveremos' indica una acción que se llevará a cabo con posterioridad (futuro) expresada como un hecho real y seguro (modo indicativo)."
    },
    {
      id: "esp-9",
      question: "¿Qué significado aporta principalmente el sufijo '-azo' en palabras como 'golazo' o 'perrazo'?",
      options: ["Aminoración o pequeñez", "Aumento, golpe o gran intensidad", "Origen geográfico (gentilicio)", "Profesión u oficio"],
      answerIdx: 1,
      explanation: "El sufijo '-azo' / '-aza' se utiliza como aumentativo para denotar tamaño grande, fuerza, un golpe (ej. 'portazo') o una valoración de excelencia o sorpresa."
    }
  ],
  ciencias: [
    {
      id: "cie-1",
      question: "¿Cuál es el órgano muscular principal del sistema circulatorio encargado de impulsar la sangre a todo el cuerpo?",
      options: ["El cerebro", "El pulmón", "El corazón", "El estómago"],
      answerIdx: 2,
      explanation: "El corazón es un órgano muscular hueco que actúa como una bomba aspirante e impelente para mantener la circulación de la sangre por todo el organismo."
    },
    {
      id: "cie-2",
      question: "¿Cuál de los siguientes se considera un recurso natural inagotable y renovable para la generación de energía limpia en Costa Rica?",
      options: ["El petróleo", "La energía solar", "El carbón de hulla", "El gas natural licuado"],
      answerIdx: 1,
      explanation: "La energía solar es un recurso abundante, limpio e inagotable a escala humana, clave en los planes de descarbonización y sostenibilidad costarricenses."
    },
    {
      id: "cie-3",
      question: "¿Qué proceso vital realizan las plantas utilizando la clorofila y la luz solar para sintetizar su propio alimento?",
      options: ["Respiración celular", "Fotosíntesis", "Polinización cruzada", "Transpiración foliar"],
      answerIdx: 1,
      explanation: "Mediante la fotosíntesis, los organismos autótrofos convierten dióxido de carbono y agua en azúcares, liberando oxígeno como subproducto gracias a la energía de la luz solar."
    },
    {
      id: "cie-4",
      question: "¿Cuáles son los órganos encargados de filtrar las impurezas y toxinas de la sangre para producir la orina en el sistema excretor?",
      options: ["Los pulmones", "Los riñones", "Los intestinos", "Las glándulas sudoríparas"],
      answerIdx: 1,
      explanation: "Los riñones actúan como coladores sofisticados que filtran la sangre de forma continua, excretando desechos metabólicos y exceso de agua en forma de orina."
    },
    {
      id: "cie-5",
      question: "Al encender una linterna de baterías, ¿qué transformación energética ocurre principalmente?",
      options: ["Energía eólica a sonora", "Energía química de las baterías a energía eléctrica y luego a lumínica", "Energía potencial gravitatoria a cinética", "Energía térmica a nuclear"],
      answerIdx: 1,
      explanation: "La energía química almacenada en las pilas se transforma en energía eléctrica al cerrar el circuito, la cual a su vez pasa a ser energía lumínica y algo de calor residual en el bombillo o LED."
    },
    {
      id: "cie-6",
      question: "¿En qué estructuras microscópicas de los pulmones se produce el intercambio de gases (oxígeno por dióxido de carbono) con la sangre?",
      options: ["Tráquea", "Bronquios principales", "Alvéolos pulmonares", "Laringe"],
      answerIdx: 2,
      explanation: "Los alvéolos son pequeños sacos de aire al final de las ramificaciones bronquiales, rodeados de vasos sanguíneos delgados donde ocurre el intercambio de oxígeno y dióxido de carbono."
    },
    {
      id: "cie-7",
      question: "¿Cuál es una medida de higiene fundamental para acompañar los cambios físicos producidos durante la pubertad?",
      options: ["Limitar el aseo personal", "Bañarse diariamente, usar desodorante y vestir ropa limpia para controlar el sudor de las glándulas apocrinas", "Consumir alimentos ricos en grasas saturadas", "Suprimir la práctica de deportes"],
      answerIdx: 1,
      explanation: "La pubertad activa glándulas sudoríparas y sebáceas intensamente. El aseo diario con agua y jabón previene infecciones, irritaciones y olores corporales incómodos."
    },
    {
      id: "cie-8",
      question: "¿Cómo se denomina la interacción biológica en la que ambos organismos de distintas especies cooperan y obtienen beneficio mutuo?",
      options: ["Parasitismo", "Competencia interespecífica", "Depredación", "Mutualismo"],
      answerIdx: 3,
      explanation: "El mutualismo beneficia a ambos participantes, como las plantas con flores y los insectos polinizadores (ej. abejas), o los colibríes que beben néctar y transportan polen."
    },
    {
      id: "cie-9",
      question: "¿Qué cambio de estado experimenta el agua cuando pasa de estado líquido a estado gaseoso al absorber calor en la superficie terrestre?",
      options: ["Solidificación", "Fusión", "Evaporación o Vaporización", "Condensación"],
      answerIdx: 2,
      explanation: "La evaporación es la transición de fase en la cual moléculas en estado líquido adquieren suficiente energía térmica para escapar al estado gaseoso."
    }
  ],
  sociales: [
    {
      id: "soc-1",
      question: "¿En qué año se libró la Batalla de Santa Rosa en Costa Rica contra los invasores filibusteros?",
      options: ["1821", "1856", "1948", "1910"],
      answerIdx: 1,
      explanation: "La Batalla de Santa Rosa ocurrió el 20 de marzo de 1856, logrando expulsar en pocos minutos a las fuerzas invasoras que comandaba William Walker."
    },
    {
      id: "soc-2",
      question: "¿Cuál es el símbolo patrio de Costa Rica que representa el trabajo esforzado, la perseverancia y la paz nacional?",
      options: ["El Yigüirro", "La Carreta Típica", "La Guaria Morada", "El Venado Cola Blanca"],
      answerIdx: 1,
      explanation: "La carreta típica costarricense fue declarada símbolo nacional del trabajo en 1988, honrando el papel vital del arriero y el transporte del café en la economía histórica del país."
    },
    {
      id: "soc-3",
      question: "¿Cómo se llama la fosa o sistema de relieve donde se ubican las principales ciudades del país y se asienta la mayoría de los costarricenses?",
      options: ["Cordillera de Talamanca", "Valle Central o Depresión Tectónica Central", "Llanuras del Norte", "Península de Nicoya"],
      answerIdx: 1,
      explanation: "La Depresión Tectónica Central o Valle Central posee un clima templado y suelos fértiles, albergando la mayor concentración urbana e institucional del territorio nacional."
    },
    {
      id: "soc-4",
      question: "¿En qué gesta heroica de la Campaña Nacional de 1856 destacó el alajuelense Juan Santamaría al incendiar el Mesón de Guerra?",
      options: ["Batalla de Santa Rosa", "Batalla de Rivas", "Combate de la Trinidad", "Batalla de Sardinal"],
      answerIdx: 1,
      explanation: "El 11 de abril de 1856, durante la Batalla de Rivas en Nicaragua, Juan Santamaría mostró un valor supremo al prender fuego al Mesón donde se atrincheraba el enemigo filibustero."
    },
    {
      id: "soc-5",
      question: "¿En qué fecha histórica se oficializó la Anexión del Partido de Nicoya a Costa Rica de manera libre y soberana?",
      options: ["15 de setiembre de 1821", "25 de julio de 1824", "11 de abril de 1856", "1 de diciembre de 1948"],
      answerIdx: 1,
      explanation: "El 25 de julio de 1824, los pueblos de Nicoya y Santa Cruz decidieron unirse voluntariamente a Costa Rica bajo la máxima de 'De la patria por nuestra voluntad', ampliando nuestro territorio y cultura."
    },
    {
      id: "soc-6",
      question: "¿Cuál es el sistema montañoso más antiguo, de mayor elevación y no volcánico de Costa Rica, donde se alza el Cerro Chirripó?",
      options: ["Cordillera Volcánica Central", "Cordillera de Tilarán", "Cordillera de Talamanca", "Cordillera Volcánica de Guanacaste"],
      answerIdx: 2,
      explanation: "La Cordillera de Talamanca, en el sur del país, ostenta las cumbres más elevadas de América Central meridional, incluyendo el imponente Cerro Chirripó a 3820 metros de altitud."
    },
    {
      id: "soc-7",
      question: "¿Cuáles fueron tres grandes reformas de la década de 1940 en Costa Rica que consolidaron el Estado social de derecho bajo el mandato de Calderón Guardia?",
      options: ["El ferrocarril al Pacífico, puerto Caldera e Himno Nacional", "La Universidad de Costa Rica (UCR), la Caja Costarricense de Seguro Social (CCSS) y las Garantías Sociales constitucionales", "Teatro Nacional, el papel moneda y los museos", "La pena de muerte, el voto para la mujer y el escudo de armas"],
      answerIdx: 1,
      explanation: "En la década de 1940 se promulgaron hitos de bienestar colectivo: la creación de la CCSS para la salud, la UCR para la educación superior y el capítulo de Garantías Sociales y el Código de Trabajo."
    },
    {
      id: "soc-8",
      question: "¿Qué célebre gobernante abolió formalmente el ejército en Costa Rica el 1 de diciembre de 1948, apostando por la educación y la salud?",
      options: ["Juan Rafael Mora Porras", "José Figueres Ferrer", "Cleto González Víquez", "Braulio Carrillo Colina"],
      answerIdx: 1,
      explanation: "Don José Figueres Ferrer abolió el ejército en el Cuartel Bellavista en 1948, transformándolo en museo y destinando ese presupuesto militar a fortalecer la educación pública y la salud costarricenses."
    },
    {
      id: "soc-9",
      question: "¿Qué tipo de clima predomina en la vertiente del Caribe de Costa Rica, caracterizado por altos niveles de precipitación todo el año sin estación seca definida?",
      options: ["Clima Tropical Seco", "Clima de Montaña frío", "Clima Tropical Muy Húmedo", "Clima Templado continental"],
      answerIdx: 2,
      explanation: "La vertiente del Caribe posee un clima tropical muy húmedo con precipitaciones constantes causadas por los vientos alisios que recogen humedad sobre el Mar Caribe, manteniendo los bosques siempre verdes."
    }
  ]
};

export default function SextoGradoPortal({ onBackToAcademia }: { onBackToAcademia?: () => void }) {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'inicio' | 'practicas' | 'sociales_1948' | 'geometria' | 'juegos_premios'>('inicio');
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Helper to ensure we share the active URL
  const getShareableUrl = (customTab?: string) => {
    const base = (typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('run.app'))
      ? window.location.origin.replace(/\/+$/, '')
      : 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';
    const tabParam = customTab ? `&sextoTab=${customTab}` : (activeTab === 'sociales_1948' ? '&sextoTab=sociales' : activeTab === 'geometria' ? '&sextoTab=geometria' : '');
    return `${base}/?project=sexto-grado${tabParam}`;
  };

  // URL sync for direct geometry / math / sociales portal links
  useEffect(() => {
    const handleSextoUrlSync = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const sTab = params.get('sextoTab') || params.get('subtopic') || params.get('tab');
      const hash = window.location.hash;
      if (sTab === 'geometria' || sTab === 'poligonos' || sTab === 'figuras' || hash === '#geometria' || hash === '#poligonos') {
        setActiveTab('geometria');
      } else if (sTab === 'sociales' || sTab === 'sociales-1948' || sTab === '1948' || sTab === 'estudios-sociales' || hash === '#sociales' || hash === '#1948') {
        setActiveTab('sociales_1948');
      } else if (sTab === 'practicas' || hash === '#practicas') {
        setActiveTab('practicas');
      }
    };

    handleSextoUrlSync();
    window.addEventListener('popstate', handleSextoUrlSync);
    window.addEventListener('hashchange', handleSextoUrlSync);
    return () => {
      window.removeEventListener('popstate', handleSextoUrlSync);
      window.removeEventListener('hashchange', handleSextoUrlSync);
    };
  }, []);
  const [selectedSubject, setSelectedSubject] = useState<'matematicas' | 'espanol' | 'ciencias' | 'sociales'>('matematicas');
  const [selectedMathTopic, setSelectedMathTopic] = useState<string>('multiplos_divisores');

  // Ciencias 6° Grado - Pruebas Estandarizadas State
  const [activeScienceTab, setActiveScienceTab] = useState<'temario' | 'pdf_manager' | 'evaluaciones'>('temario');
  const [selectedScienceUnit, setSelectedScienceUnit] = useState<string>('cuerpo_salud');
  
  // PDF Upload & Document Manager State
  const [uploadedPdfs, setUploadedPdfs] = useState<UploadedPdfDocument[]>([
    {
      id: 'pdf-mep-ciencias-2026',
      name: 'Temario_Oficial_Pruebas_Estandarizadas_Ciencias_6to_MEP.pdf',
      size: '2.4 MB',
      uploadDate: '2026-08-01',
      subject: 'Ciencias - Sexto Grado',
      status: 'ready',
      pageCount: 18,
      extractedTopics: [
        'Unidad 1: Sistema Circulatorio, Respiratorio y Excretor',
        'Unidad 2: Ecosistemas, Redes Tróficas y Conservación',
        'Unidad 3: Transformaciones de Energía y Circuitos',
        'Unidad 4: Ciclo Hidrológico, Atmósfera y Cambio Climático'
      ]
    },
    {
      id: 'pdf-mep-evaluacion-diag',
      name: 'Prueba_Diagnostica_Nacional_Ciencias_6to_Grado_2026.pdf',
      size: '1.8 MB',
      uploadDate: '2026-08-05',
      subject: 'Ciencias - Evaluaciones',
      status: 'ready',
      pageCount: 12,
      extractedTopics: [
        'Tabla de especificaciones MEP 2026',
        'Ítems de selección única de Ciencias',
        'Rúbricas de evaluación diagnóstica'
      ]
    }
  ]);
  const [previewPdf, setPreviewPdf] = useState<UploadedPdfDocument | null>(null);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [pdfUploadSuccessMsg, setPdfUploadSuccessMsg] = useState<string | null>(null);

  // Science Exam Simulator state
  const [scienceExamAnswers, setScienceExamAnswers] = useState<Record<number, number>>({});
  const [scienceExamSubmitted, setScienceExamSubmitted] = useState<boolean>(false);
  const [scienceExamScore, setScienceExamScore] = useState<number>(0);

  // Helper for PDF upload handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploadingPdf(true);
    setPdfUploadSuccessMsg(null);

    setTimeout(() => {
      const newPdf: UploadedPdfDocument = {
        id: `pdf-upload-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        subject: 'Ciencias - Sexto Grado (Adjunto)',
        status: 'ready',
        pageCount: Math.floor(Math.random() * 15) + 5,
        extractedTopics: [
          'Contenido extraído del documento PDF adjuntado',
          'Conceptos clave para las Pruebas Estandarizadas de Ciencias',
          'Preguntas de repaso integradas al simulador de sexto grado'
        ]
      };

      setUploadedPdfs(prev => [newPdf, ...prev]);
      setIsUploadingPdf(false);
      setPdfUploadSuccessMsg(`¡El documento "${file.name}" fue cargado con éxito! He analizado los temas y los he vinculado al aula virtual de Ciencias.`);
      setEinsteinMessage(`¡Fabuloso! He leído tu archivo PDF "${file.name}" y lo he integrado a la evaluación de Ciencias de 6° grado.`);
      speak(`¡Excelente! He analizado el documento PDF ${file.name} y ya está listo en tus evaluaciones de Ciencias.`);
    }, 1200);
  };

  const handleAnswerScienceExam = (qIndex: number, optionIndex: number) => {
    if (scienceExamSubmitted) return;
    setScienceExamAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const handleSubmitScienceExam = () => {
    let correctCount = 0;
    CIENCIAS_EXAM_QUESTIONS.forEach((q, idx) => {
      if (scienceExamAnswers[idx] === q.correctIdx) {
        correctCount += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / CIENCIAS_EXAM_QUESTIONS.length) * 100);
    setScienceExamScore(scorePercentage);
    setScienceExamSubmitted(true);

    if (scorePercentage >= 70) {
      if (!unlockedMedals.includes('med_ciencias_mep')) {
        setUnlockedMedals(prev => [...prev, 'med_ciencias_mep']);
      }
      setEinsteinMessage(`¡Felicidades mi genio! Obtuviste un ${scorePercentage}% en el Examen de Pruebas Estandarizadas de Ciencias. ¡Tu medalla ha sido desbloqueada!`);
      speak(`¡Excelente trabajo! Has obtenido un ${scorePercentage} por ciento en tu examen de Pruebas Estandarizadas de Ciencias. ¡Felicidades!`);
    } else {
      setEinsteinMessage(`Obtuviste un ${scorePercentage}%. ¡No te preocupes! Revisa las explicaciones de cada pregunta y vuelve a intentarlo, ¡la práctica hace al maestro!`);
      speak(`Obtuviste un ${scorePercentage} por ciento. Revisa los conceptos del temario y vuelve a intentarlo.`);
    }
  };

  const handleResetScienceExam = () => {
    setScienceExamAnswers({});
    setScienceExamSubmitted(false);
    setScienceExamScore(0);
  };

  // Einstein bot bubble state
  const [einsteinMessage, setEinsteinMessage] = useState<string>(EINSTEIN_QUOTES[0]);
  const [einsteinFAQResponse, setEinsteinFAQResponse] = useState<string | null>(null);

  // Voice Synthesis (TTS) for Albert Einstein
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('albert_voice_enabled');
      return saved !== 'false'; // default to true
    }
    return true;
  });
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Helper to save setting
  const toggleVoiceEnabled = () => {
    setIsVoiceEnabled(prev => {
      const next = !prev;
      localStorage.setItem('albert_voice_enabled', String(next));
      if (!next) {
        stopSpeaking();
      }
      return next;
    });
  };

  const speak = (text: string, force: boolean = false) => {
    if (!force && !isVoiceEnabled) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Stop previous
    window.speechSynthesis.cancel();

    // Remove emojis or special symbols so the voice reader reads cleanly
    const cleanText = text
      ? text
          .replace(/[🎒👴🎓✨🎉📢🏆🟢💬⭐💡🎨✏️💌⚙️🛡️🧩🔢🔍🌟]/g, '')
          .replace(/SINPE/gi, 'sinpe')
          .trim()
      : '';

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Set natural Spanish (Costa Rica / Mexico / General Latin American)
    utterance.lang = 'es-MX';
    
    // Attempt to select a Spanish speaking voice if available
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es-MX') || v.lang.startsWith('es-ES') || v.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.rate = 0.95; // A little bit relaxed so kids can follow easily
    utterance.pitch = 0.85; // Wise older Albert tone

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Stop speaking when switching tab or on unmount
  useEffect(() => {
    stopSpeaking();
    return () => stopSpeaking();
  }, [activeTab]);

  // Rewards and Medals (stored in localStorage)
  const [unlockedMedals, setUnlockedMedals] = useState<string[]>(() => {
    const saved = localStorage.getItem('sexto_unlocked_medals');
    return saved ? JSON.parse(saved) : [];
  });
  const [studyStreak, setStudyStreak] = useState<number>(() => {
    const saved = localStorage.getItem('sexto_study_streak');
    return saved ? parseInt(saved, 10) : 3; // default initial fun streak
  });

  // Math Practice States
  // 1. Multiples and Divisors
  const [multiplesTarget, setMultiplesTarget] = useState<number>(3);
  const [selectedNumbersGrid, setSelectedNumbersGrid] = useState<number[]>([]);
  const [multAnswerCorrect, setMultAnswerCorrect] = useState<boolean | null>(null);

  // 2. Primes and Composites
  const [primeTargetNum, setPrimeTargetNum] = useState<number>(17);
  const [primeAnswerFeedback, setPrimeAnswerFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 3. Powers and Base 10
  const [powerBase, setPowerBase] = useState<number>(2);
  const [powerExponent, setPowerExponent] = useState<number>(4);
  const [powerUserInput, setPowerUserInput] = useState<string>('');
  const [powerFeedback, setPowerFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  
  const [powerBase10Exp, setPowerBase10Exp] = useState<number>(5);
  const [powerBase10Input, setPowerBase10Input] = useState<string>('');
  const [powerBase10Feedback, setPowerBase10Feedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 4. Circumference and Circle
  const [circleQuizAnswer, setCircleQuizAnswer] = useState<number | null>(null);
  const [circleQuizFeedback, setCircleQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 5. Notable Segments
  const [selectedNotableSegment, setSelectedNotableSegment] = useState<string>('');
  const [notableSegmentsFeedback, setNotableSegmentsFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 6. Division with and without fractions
  const [fracNum1, setFracNum1] = useState(2);
  const [fracDen1, setFracDen1] = useState(3);
  const [fracNum2, setFracNum2] = useState(3);
  const [fracDen2, setFracDen2] = useState(4);
  const [fracAnswerNum, setFracAnswerNum] = useState('');
  const [fracAnswerDen, setFracAnswerDen] = useState('');
  const [fracFeedback, setFracFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const [noFracDividend, setNoFracDividend] = useState(135);
  const [noFracDivisor, setNoFracDivisor] = useState(5);
  const [noFracInput, setNoFracInput] = useState('');
  const [noFracFeedback, setNoFracFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // New Basic Arithmetic State (Restas, Multiplicaciones, Divisiones con y sin cifras)
  const [basicOpTab, setBasicOpTab] = useState<'divs_mep' | 'restas' | 'mults' | 'fracs'>('divs_mep');
  
  // Restas (Subtraction) states
  const [subMinuend, setSubMinuend] = useState<number>(8524);
  const [subSubtrahend, setSubSubtrahend] = useState<number>(3768);
  const [subInput, setSubInput] = useState<string>('');
  const [subFeedback, setSubFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Multiplicaciones (Multiplication) states
  const [multFactor1, setMultFactor1] = useState<number>(345);
  const [multFactor2, setMultFactor2] = useState<number>(12);
  const [multInput, setMultInput] = useState<string>('');
  const [multFeedback, setMultFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Divisiones states (con y sin cifra)
  const [divType, setDivType] = useState<'una_cifra' | 'dos_cifras' | 'con_decimal'>('una_cifra');
  const [divDividend, setDivDividend] = useState<number>(345);
  const [divDivisor, setDivDivisor] = useState<number>(5);
  const [divInput, setDivInput] = useState<string>('');
  const [divFeedback, setDivFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Other subjects trivia states
  const [triviaSubject, setTriviaSubject] = useState<'espanol' | 'ciencias' | 'sociales'>('espanol');
  const [triviaIdx, setTriviaIdx] = useState<number>(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<number | null>(null);
  const [triviaIsAnswered, setTriviaIsAnswered] = useState<boolean>(false);
  const [triviaIsCorrect, setTriviaIsCorrect] = useState<boolean | null>(null);

  // Tic-Tac-Toe Game (Gato contra Einstein) states
  const [tttBoard, setTttBoard] = useState<string[]>(Array(9).fill('')); // '', 'X', 'O'
  const [tttIsActive, setTttIsActive] = useState<boolean>(false);
  const [tttStatusMessage, setTttStatusMessage] = useState<string>('¡Haz clic en una casilla para colocar tu X respondiendo una pregunta!');
  const [tttActiveCellIndex, setTttActiveCellIndex] = useState<number | null>(null);
  const [tttActiveQuestion, setTttActiveQuestion] = useState<{ q: string; opt: string[]; ansIdx: number; exp: string } | null>(null);
  const [tttSelectedOption, setTttSelectedOption] = useState<number | null>(null);
  const [tttQuestionAnswered, setTttQuestionAnswered] = useState<boolean>(false);
  const [tttQuestionCorrect, setTttQuestionCorrect] = useState<boolean | null>(null);
  const [tttWinner, setTttWinner] = useState<string | null>(null); // 'X' (Student), 'O' (Einstein), 'draw'

  // 7. Ángulo central y cuadrante
  const [angCentralValue, setAngCentralValue] = useState<number>(120);
  const [angCentralOption, setAngCentralOption] = useState<string>(''); // 'I', 'II', 'III', 'IV'
  const [angCentralFeedback, setAngCentralFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 8. Área del círculo y perímetro de la circunferencia
  const [circlePracticeRadius, setCirclePracticeRadius] = useState<number>(5);
  const [circlePracticeType, setCirclePracticeType] = useState<'area' | 'perimetro'>('area');
  const [circlePracticeInput, setCirclePracticeInput] = useState<string>('');
  const [circlePracticeFeedback, setCirclePracticeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 9. Evaluación de Competencias (Número 50 y Números Perfectos)
  const [competenciaQ1Input, setCompetenciaQ1Input] = useState<string>('');
  const [competenciaQ2Option, setCompetenciaQ2Option] = useState<string>('');
  const [competenciaQ1Feedback, setCompetenciaQ1Feedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [competenciaQ2Feedback, setCompetenciaQ2Feedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 10. Metro cúbico y conversiones
  const [volumeValue, setVolumeValue] = useState<number>(5);
  const [volumeFrom, setVolumeFrom] = useState<string>('m3'); // 'm3', 'dm3', 'cm3', 'mm3', 'dam3'
  const [volumeTo, setVolumeTo] = useState<string>('dm3');
  const [volumeInput, setVolumeInput] = useState<string>('');
  const [volumeFeedback, setVolumeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 11. Proporcionalidad directa y regla de tres
  const [propItem1Name, setPropItem1Name] = useState<string>('cuadernos');
  const [propItem2Name, setPropItem2Name] = useState<string>('colones');
  const [propQuantity1, setPropQuantity1] = useState<number>(3);
  const [propQuantity2, setPropQuantity2] = useState<number>(1500);
  const [propQuantity3, setPropQuantity3] = useState<number>(5);
  const [propInput, setPropInput] = useState<string>('');
  const [propFeedback, setPropFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 12. Interés Simple
  const [interestPrincipal, setInterestPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6); // percent e.g. 6%
  const [interestYears, setInterestYears] = useState<number>(3);
  const [interestInput, setInterestInput] = useState<string>('');
  const [interestFeedback, setInterestFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Persist medals
  useEffect(() => {
    localStorage.setItem('sexto_unlocked_medals', JSON.stringify(unlockedMedals));
  }, [unlockedMedals]);

  // Persist streak
  useEffect(() => {
    localStorage.setItem('sexto_study_streak', studyStreak.toString());
  }, [studyStreak]);

  // Helper function to check/trigger medal unlock
  const unlockMedal = (medalId: string, medalName: string) => {
    if (!unlockedMedals.includes(medalId)) {
      const updated = [...unlockedMedals, medalId];
      setUnlockedMedals(updated);
      const msg = `¡ALERTA DE GENIO! Acabas de desbloquear la medalla: "${medalName}". ¡Tu esfuerzo está dando frutos increíbles!`;
      setEinsteinMessage(`🎉 ¡ALERTA DE GENIO! Acabas de desbloquear la medalla: "${medalName}". ¡Tu esfuerzo está dando frutos increíbles!`);
      speak(msg);
      // Increment streak
      setStudyStreak(prev => prev + 1);
    }
  };

  // Generate random Einstein quote
  const nextEinsteinQuote = () => {
    const randomIdx = Math.floor(Math.random() * EINSTEIN_QUOTES.length);
    const quote = EINSTEIN_QUOTES[randomIdx];
    setEinsteinMessage(quote);
    setEinsteinFAQResponse(null);
    speak(quote);
  };

  // Generate math variables on mount
  useEffect(() => {
    resetMultiplesGame();
    resetPrimesGame();
    resetPowersGame();
    resetFractionsGame();
    generateSubProblem();
    generateMultProblem();
    generateDivProblem('una_cifra');
  }, []);

  // --- MATH EXERCISE GAME GENERATORS & CHECKERS ---
  
  // 1. Multiples and Divisors
  const resetMultiplesGame = () => {
    const targets = [3, 4, 5, 6, 8, 9];
    const picked = targets[Math.floor(Math.random() * targets.length)];
    setMultiplesTarget(picked);
    setSelectedNumbersGrid([]);
    setMultAnswerCorrect(null);
  };

  const handleNumberGridClick = (num: number) => {
    if (selectedNumbersGrid.includes(num)) {
      setSelectedNumbersGrid(prev => prev.filter(n => n !== num));
    } else {
      setSelectedNumbersGrid(prev => [...prev, num]);
    }
  };

  const checkMultiplesAnswer = () => {
    // Generate actual correct answers in the default 1-30 numbers we render
    const allNumbers = Array.from({ length: 15 }, (_, i) => (i + 1) * 2 + 1); // some semi-random numbers
    // Let's use a fixed set of test numbers to make it clear and highly interactive
    const testNumbers = [3, 6, 8, 10, 12, 15, 16, 18, 20, 21, 24, 25, 27, 30, 35];
    const correctMultiples = testNumbers.filter(n => n % multiplesTarget === 0);
    
    // Check if player selected exactly the correct multiples
    const userCorrects = selectedNumbersGrid.filter(n => n % multiplesTarget === 0);
    const userIncorrects = selectedNumbersGrid.filter(n => n % multiplesTarget !== 0);

    if (userCorrects.length === correctMultiples.length && userIncorrects.length === 0) {
      setMultAnswerCorrect(true);
      setEinsteinMessage(`¡Excelente trabajo! Has identificado perfectamente todos los múltiplos de ${multiplesTarget}. ¡Los múltiplos son infinitos y tú los dominas!`);
      unlockMedal('med_multiplos', 'Medalla de Oro Pitágoras (Múltiplos y Divisores)');
    } else {
      setMultAnswerCorrect(false);
      setEinsteinMessage(`¡Casi lo logras! Revisa bien los números seleccionados. Recuerda que un múltiplo es el resultado de multiplicar ${multiplesTarget} por cualquier número entero.`);
    }
  };

  // 2. Primes and Composites
  const resetPrimesGame = () => {
    const primesAndComposites = [2, 3, 4, 7, 9, 11, 13, 15, 17, 21, 23, 27, 29, 33, 37, 45, 49];
    const picked = primesAndComposites[Math.floor(Math.random() * primesAndComposites.length)];
    setPrimeTargetNum(picked);
    setPrimeAnswerFeedback(null);
  };

  const checkPrimeAnswer = (userType: 'primo' | 'compuesto') => {
    // Is prime checker
    const isPrime = (num: number) => {
      if (num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };

    const actualIsPrime = isPrime(primeTargetNum);
    const correct = (userType === 'primo' && actualIsPrime) || (userType === 'compuesto' && !actualIsPrime);

    if (correct) {
      setPrimeAnswerFeedback({
        isCorrect: true,
        text: `¡Fabuloso! El número ${primeTargetNum} es efectivamente ${userType.toUpperCase()}. ${
          actualIsPrime 
            ? "Solo tiene dos divisores: el 1 y él mismo." 
            : `Tiene más de dos divisores. Por ejemplo, se puede dividir de forma exacta por otros números.`
        }`
      });
      setEinsteinMessage(`¡Magnífico! Entender la diferencia entre primos y compuestos es fundamental para descifrar el cosmos numérico.`);
      unlockMedal('med_primos', 'Medalla de Plata de Primos (Primos y Compuestos)');
    } else {
      setPrimeAnswerFeedback({
        isCorrect: false,
        text: `¡Oops! Inténtalo de nuevo. El número ${primeTargetNum} no es ${userType.toUpperCase()}.`
      });
      setEinsteinMessage(`No te preocupes por el error, mi amigo. ¡Errar es el primer paso hacia el descubrimiento! Revisa los divisores del número.`);
    }
  };

  // 3. Powers and Base 10
  const resetPowersGame = () => {
    const bases = [2, 3, 4, 5, 10];
    const pickedBase = bases[Math.floor(Math.random() * bases.length)];
    let exponent = 2;
    if (pickedBase === 2) exponent = Math.floor(Math.random() * 3) + 3; // 2^3, 2^4, 2^5
    else if (pickedBase === 3) exponent = Math.floor(Math.random() * 2) + 2; // 3^2, 3^3
    else if (pickedBase === 10) exponent = Math.floor(Math.random() * 3) + 1; // 10^1 to 10^3
    else exponent = 2; // 4^2, 5^2

    setPowerBase(pickedBase);
    setPowerExponent(exponent);
    setPowerUserInput('');
    setPowerFeedback(null);

    // Also reset base 10 separately for double fun
    setPowerBase10Exp(Math.floor(Math.random() * 5) + 2); // 10^2 to 10^6
    setPowerBase10Input('');
    setPowerBase10Feedback(null);
  };

  const checkPowerAnswer = () => {
    const expected = Math.pow(powerBase, powerExponent);
    const userVal = parseInt(powerUserInput.trim(), 10);

    if (userVal === expected) {
      setPowerFeedback({
        isCorrect: true,
        text: `¡Correctísimo! ${powerBase} elevado a la ${powerExponent} es exactamente ${expected}. ¡Multiplicaste el ${powerBase} por sí mismo ${powerExponent} veces!`
      });
      setEinsteinMessage(`¡Increíble potencia cerebral! Las potencias crecen extremadamente rápido, ¡justo como el conocimiento!`);
      unlockMedal('med_potencias', 'Medalla de Energía Cuántica (Potencias y Base 10)');
    } else {
      setPowerFeedback({
        isCorrect: false,
        text: `Incorrecto. Recuerda que no debes multiplicar base x exponente (ej. ${powerBase} x ${powerExponent} es incorrecto). Debes multiplicar ${powerBase} por sí mismo ${powerExponent} veces.`
      });
    }
  };

  const checkPowerBase10Answer = () => {
    const expected = Math.pow(10, powerBase10Exp);
    const userVal = parseInt(powerBase10Input.trim().replace(/,/g, ''), 10);

    if (userVal === expected) {
      setPowerBase10Feedback({
        isCorrect: true,
        text: `¡Perfecto! 10 elevado a la ${powerBase10Exp} es ${expected.toLocaleString('es-CR')}. Un 1 seguido de exactamente ${powerBase10Exp} ceros.`
      });
      setEinsteinMessage(`¡Truco maestro aprendido! Las potencias de base 10 son la clave de nuestro sistema de numeración decimal.`);
      unlockMedal('med_potencias', 'Medalla de Energía Cuántica (Potencias y Base 10)');
    } else {
      setPowerBase10Feedback({
        isCorrect: false,
        text: `Cerca, pero cuenta bien los ceros. Para 10 elevado a la ${powerBase10Exp}, la respuesta debe tener un 1 y luego ${powerBase10Exp} ceros.`
      });
    }
  };

  // 4. Circumference and Circle
  const checkCircleQuiz = (optionIdx: number) => {
    setCircleQuizAnswer(optionIdx);
    if (optionIdx === 1) { // option 1 is correct (La circunferencia es el borde exterior y el círculo es la superficie interior)
      setCircleQuizFeedback({
        isCorrect: true,
        text: "¡Respuesta Correcta! ¡Exactamente! El borde o perímetro es la circunferencia, y el relleno o área interior es el círculo. ¡No los confundas nunca más!"
      });
      setEinsteinMessage("¡Eso es física y geometría pura! Entender los límites y el contenido es vital para medir nuestro redondo universo.");
      unlockMedal('med_circulo', 'Medalla del Círculo Infinito (Circunferencia y Círculo)');
    } else {
      setCircleQuizFeedback({
        isCorrect: false,
        text: "Incorrecto. Recuerda: el borde delgado exterior es la 'Circunferencia', mientras que el área o superficie de adentro es el 'Círculo'."
      });
    }
  };

  // 5. Notable Segments interactive checker
  const checkNotableSegmentSelection = (segment: string) => {
    setSelectedNotableSegment(segment);
    // Correct matches based on colored lines drawn in our SVG:
    // Radio = Roja
    // Diámetro = Verde
    // Cuerda = Azul
    // Tangente = Amarilla / Oro
    // Secante = Purpura / Magenta
    let text = "";
    let isCorrect = false;

    if (segment === 'diámetro') {
      isCorrect = true;
      text = "¡Excelente! El diámetro (línea VERDE) es el segmento que une dos puntos de la circunferencia pasando exactamente por el centro del círculo. ¡Mide el doble que el radio!";
    } else if (segment === 'radio') {
      isCorrect = true;
      text = "¡Genial! El radio (línea ROJA) va desde el centro del círculo hacia cualquier punto de la circunferencia exterior. ¡Es la mitad de un diámetro!";
    } else if (segment === 'cuerda') {
      isCorrect = true;
      text = "¡Correcto! La cuerda (línea AZUL) une dos puntos de la circunferencia pero sin la obligación de pasar por el centro.";
    } else if (segment === 'tangente') {
      isCorrect = true;
      text = "¡Bravo! La línea tangente (color AMARILLO) es una recta exterior que toca a la circunferencia en un único y exclusivo punto.";
    } else if (segment === 'secante') {
      isCorrect = true;
      text = "¡Soberbio! La línea secante (color PÚRPURA) es la recta que pasa cortando la circunferencia en dos puntos distintos.";
    }

    setNotableSegmentsFeedback({ isCorrect, text });
    if (isCorrect) {
      setEinsteinMessage(`¡Felicidades! Reconocer los segmentos notables como el ${segment} te dará una gran ventaja en los exámenes de geometría.`);
      unlockMedal('med_segmentos', 'Medalla de la Geometría Euclidiana (Segmentos Notables)');
    }
  };

  // 6. Fractions and Non-fraction division
  const resetFractionsGame = () => {
    const numerators = [1, 2, 3, 4, 5];
    const denominators = [2, 3, 4, 5, 6];
    
    setFracNum1(numerators[Math.floor(Math.random() * numerators.length)]);
    setFracDen1(denominators[Math.floor(Math.random() * denominators.length)]);
    setFracNum2(numerators[Math.floor(Math.random() * numerators.length)]);
    setFracDen2(denominators[Math.floor(Math.random() * denominators.length)]);
    
    setFracAnswerNum('');
    setFracAnswerDen('');
    setFracFeedback(null);

    // Non fraction
    const dividends = [120, 144, 225, 360, 450, 180, 240];
    const divisors = [4, 5, 6, 8, 9, 12, 15];
    const pickedDiv = dividends[Math.floor(Math.random() * dividends.length)];
    // Make sure it divides exactly for simple interactive verification
    let pickedSor = divisors[Math.floor(Math.random() * divisors.length)];
    while (pickedDiv % pickedSor !== 0) {
      pickedSor = Math.floor(Math.random() * 12) + 2;
    }
    
    setNoFracDividend(pickedDiv);
    setNoFracDivisor(pickedSor);
    setNoFracInput('');
    setNoFracFeedback(null);
  };

  const checkFractionDivision = () => {
    // division: a/b : c/d = (a*d)/(b*c)
    const expectedNum = fracNum1 * fracDen2;
    const expectedDen = fracDen1 * fracNum2;

    const userNum = parseInt(fracAnswerNum.trim(), 10);
    const userDen = parseInt(fracAnswerDen.trim(), 10);

    // Simplify fractions for validation
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
    const commonExpected = gcd(expectedNum, expectedDen);
    const simplifiedExpectedNum = expectedNum / commonExpected;
    const simplifiedExpectedDen = expectedDen / commonExpected;

    const commonUser = gcd(userNum, userDen);
    const simplifiedUserNum = userNum / commonUser;
    const simplifiedUserDen = userDen / commonUser;

    if (simplifiedUserNum === simplifiedExpectedNum && simplifiedUserDen === simplifiedExpectedDen) {
      setFracFeedback({
        isCorrect: true,
        text: `¡Perfecto! La división de ${fracNum1}/${fracDen1} ÷ ${fracNum2}/${fracDen2} da como resultado simplificado ${simplifiedExpectedNum}/${simplifiedExpectedDen} (original: ${expectedNum}/${expectedDen}). Multiplicaste en cruz de manera magnífica.`
      });
      setEinsteinMessage(`¡Increíble destreza algebraica! Dividir fracciones es solo multiplicar en cruz de forma astuta.`);
      unlockMedal('med_divisiones', 'Medalla de la División Perfecta (Divisiones con y sin Fracción)');
    } else {
      setFracFeedback({
        isCorrect: false,
        text: `Incorrecto. Recuerda el truco de la cruz: multiplica el numerador de arriba (${fracNum1}) por el denominador de abajo (${fracDen2}) para obtener el nuevo numerador (${expectedNum}). Y multiplica el de abajo (${fracDen1}) por el de arriba (${fracNum2}) para obtener el denominador (${expectedDen}).`
      });
    }
  };

  const checkNoFractionDivision = () => {
    const expected = noFracDividend / noFracDivisor;
    const userVal = parseInt(noFracInput.trim(), 10);

    if (userVal === expected) {
      setNoFracFeedback({
        isCorrect: true,
        text: `¡Sensacional! ${noFracDividend} ÷ ${noFracDivisor} es exactamente ${expected}. ¡Excelente cálculo de división entera sin residuo!`
      });
      setEinsteinMessage(`¡Mente brillante y precisa! Las divisiones exactas demuestran tu alta concentración de matemática escolar.`);
      unlockMedal('med_divisiones', 'Medalla de la División Perfecta (Divisiones con y sin Fracción)');
    } else {
      setNoFracFeedback({
        isCorrect: false,
        text: `Incorrecto. Repasa la división paso a paso. Recuerda buscar cuántas veces cabe el ${noFracDivisor} en el ${noFracDividend}.`
      });
    }
  };

  // Basic Arithmetic Helpers (Restas, Multiplicaciones, Divisiones con y sin cifras)
  const generateSubProblem = () => {
    const min = Math.floor(Math.random() * 8000) + 1500; // 1500 to 9500
    const sub = Math.floor(Math.random() * (min - 500)) + 200; // sub < min
    setSubMinuend(min);
    setSubSubtrahend(sub);
    setSubInput('');
    setSubFeedback(null);
  };

  const checkSubAnswer = () => {
    const expected = subMinuend - subSubtrahend;
    const user = parseInt(subInput.trim(), 10);
    if (user === expected) {
      setSubFeedback({
        isCorrect: true,
        text: `¡Excelente resta! ${subMinuend} - ${subSubtrahend} es exactamente ${expected}. ¡Tu cálculo es digno de elogios!`
      });
      setEinsteinMessage(`¡Genial resta! Restar es calcular la diferencia entre magnitudes. ¡Dominado de forma magnífica!`);
      unlockMedal('med_divisiones', 'Medalla de la División Perfecta (Divisiones con y sin Fracción)');
    } else {
      setSubFeedback({
        isCorrect: false,
        text: `Incorrecto. Repasa los valores y recuerda pedir prestado si es necesario. La respuesta es ${expected}.`
      });
    }
  };

  const generateMultProblem = () => {
    const mode = Math.random() > 0.5 ? 'easy' : 'adv';
    if (mode === 'easy') {
      setMultFactor1(Math.floor(Math.random() * 80) + 15); // 15 to 95
      setMultFactor2(Math.floor(Math.random() * 8) + 2);   // 2 to 9
    } else {
      setMultFactor1(Math.floor(Math.random() * 400) + 100); // 100 to 500
      setMultFactor2(Math.floor(Math.random() * 15) + 11);  // 11 to 25
    }
    setMultInput('');
    setMultFeedback(null);
  };

  const checkMultAnswer = () => {
    const expected = multFactor1 * multFactor2;
    const user = parseInt(multInput.trim(), 10);
    if (user === expected) {
      setMultFeedback({
        isCorrect: true,
        text: `¡Fantástico! El producto de ${multFactor1} × ${multFactor2} es efectivamente ${expected}. ¡Tu dominio de las tablas es perfecto!`
      });
      setEinsteinMessage(`¡Sorprendente multiplicación! La multiplicación no es más que una adición repetida acelerada. ¡Lo has resuelto con velocidad de la luz!`);
      unlockMedal('med_divisiones', 'Medalla de la División Perfecta (Divisiones con y sin Fracción)');
    } else {
      setMultFeedback({
        isCorrect: false,
        text: `Incorrecto. Recuerda ir sumando las llevadas. La respuesta correcta es ${expected}.`
      });
    }
  };

  const generateDivProblem = (type: 'una_cifra' | 'dos_cifras' | 'con_decimal') => {
    if (type === 'una_cifra') {
      const sor = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const quotient = Math.floor(Math.random() * 120) + 15; // 15 to 135
      const dividend = sor * quotient;
      setDivDividend(dividend);
      setDivDivisor(sor);
    } else if (type === 'dos_cifras') {
      const sor = Math.floor(Math.random() * 15) + 11; // 11 to 25
      const quotient = Math.floor(Math.random() * 80) + 10;  // 10 to 90
      const dividend = sor * quotient;
      setDivDividend(dividend);
      setDivDivisor(sor);
    } else {
      const sor = Math.random() > 0.5 ? 5 : 4;
      const quotientFloat = (Math.floor(Math.random() * 80) + 15) / 2; // e.g. 7.5, 12.0, 34.5
      const dividendFloat = sor * quotientFloat;
      setDivDividend(dividendFloat);
      setDivDivisor(sor);
    }
    setDivInput('');
    setDivFeedback(null);
  };

  const checkDivAnswer = () => {
    const expected = divDividend / divDivisor;
    const user = parseFloat(divInput.trim().replace(',', '.'));
    
    if (Math.abs(user - expected) < 0.01) {
      setDivFeedback({
        isCorrect: true,
        text: `¡Sublime! ${divDividend} ÷ ${divDivisor} es exactamente ${expected}. ¡Excelente cálculo de división con precisión matemática!`
      });
      setEinsteinMessage(`¡Mente analítica impecable! Las divisiones nos enseñan a repartir equitativamente los componentes del universo.`);
      unlockMedal('med_divisiones', 'Medalla de la División Perfecta (Divisiones con y sin Fracción)');
    } else {
      setDivFeedback({
        isCorrect: false,
        text: `Incorrecto. Revisa los cálculos de la división. La respuesta correcta es ${expected}.`
      });
    }
  };

  // 7. Ángulo central y cuadrante
  const resetAngCentralGame = () => {
    const angles = [35, 60, 85, 110, 145, 170, 195, 225, 260, 280, 315, 345];
    const pick = angles[Math.floor(Math.random() * angles.length)];
    setAngCentralValue(pick);
    setAngCentralOption('');
    setAngCentralFeedback(null);
  };

  const checkAngCentral = (option: string) => {
    setAngCentralOption(option);
    
    let expected = 'I';
    if (angCentralValue > 0 && angCentralValue < 90) expected = 'I';
    else if (angCentralValue > 90 && angCentralValue < 180) expected = 'II';
    else if (angCentralValue > 180 && angCentralValue < 270) expected = 'III';
    else if (angCentralValue > 270 && angCentralValue < 360) expected = 'IV';

    if (option === expected) {
      setAngCentralFeedback({
        isCorrect: true,
        text: `¡Fantástico! Un ángulo central de ${angCentralValue}° se ubica exactamente en el Cuadrante ${expected}. ¡Recuerda que giramos en sentido contrario a las manecillas del reloj partiendo desde el eje positivo de las X (hacia arriba)!`
      });
      setEinsteinMessage(`¡Genial discernimiento angular! Los cuadrantes nos sirven para ubicar cualquier punto en el plano cartesiano de forma perfecta.`);
      unlockMedal('med_angulos', 'Medalla de Ángulos y Giros (Ángulo Central y Cuadrantes)');
    } else {
      setAngCentralFeedback({
        isCorrect: false,
        text: `Cerca, pero ese no es el cuadrante. Recuerda: Cuadrante I (0° a 90°), Cuadrante II (90° a 180°), Cuadrante III (180° a 270°), y Cuadrante IV (270° a 360°).`
      });
    }
  };

  // 8. Área del círculo y perímetro de la circunferencia
  const resetCirclePractice = () => {
    const radii = [2, 3, 5, 10, 20];
    const pickRadius = radii[Math.floor(Math.random() * radii.length)];
    const pickType = Math.random() > 0.5 ? 'area' : 'perimetro';
    setCirclePracticeRadius(pickRadius);
    setCirclePracticeType(pickType);
    setCirclePracticeInput('');
    setCirclePracticeFeedback(null);
  };

  const checkCirclePractice = () => {
    const r = circlePracticeRadius;
    const pi = 3.14;
    let expected = 0;
    let explanation = '';

    if (circlePracticeType === 'area') {
      expected = pi * r * r;
      explanation = `Área = π · r² = 3.14 · ${r}² = 3.14 · ${r * r} = ${expected}`;
    } else {
      expected = 2 * pi * r;
      explanation = `Perímetro = 2 · π · r = 2 · 3.14 · ${r} = ${expected}`;
    }

    const userVal = parseFloat(circlePracticeInput.trim().replace(',', '.'));

    if (!isNaN(userVal) && Math.abs(userVal - expected) < 0.2) {
      setCirclePracticeFeedback({
        isCorrect: true,
        text: `¡Excelente cálculo! Tu respuesta de ${userVal} está súper cerca de ${expected}. Fórmula utilizada: ${explanation}.`
      });
      setEinsteinMessage(`¡Geometría de alta precisión! El valor aproximado pi (3.14) nos abre la puerta a la simetría perfecta.`);
      unlockMedal('med_area_circulo', 'Medalla del Señor del Círculo (Área y Perímetro Circular)');
    } else {
      setCirclePracticeFeedback({
        isCorrect: false,
        text: `Incorrecto. Usa pi = 3.14. Pista de cálculo: ${explanation}`
      });
    }
  };

  // 9. Evaluación de Competencias (Número 50 y Números Perfectos)
  const checkCompetenciaQ1 = () => {
    const val = parseInt(competenciaQ1Input.trim(), 10);
    if (val === 6) {
      setCompetenciaQ1Feedback({
        isCorrect: true,
        text: `¡Fabuloso! El número 50 posee exactamente 6 divisores: {1, 2, 5, 10, 25, 50}. ¡Lo has analizado de forma excepcional!`
      });
      setEinsteinMessage(`¡Gran ojo analítico! Contar divisores nos permite entender la estructura íntima de los números compuestos.`);
      if (competenciaQ2Option === '28') {
        unlockMedal('med_competencias', 'Medalla de Genio Competente (Divisores de 50 y Números Perfectos)');
      }
    } else {
      setCompetenciaQ1Feedback({
        isCorrect: false,
        text: `Incorrecto. Vamos a contar juntos: ¿cuáles números dividen a 50 exactamente? El 1 (1x50), el 2 (2x25), el 5 (5x10), el 10, el 25 y el 50. ¡Cuéntalos todos!`
      });
    }
  };

  const checkCompetenciaQ2 = (option: string) => {
    setCompetenciaQ2Option(option);
    if (option === '28') {
      setCompetenciaQ2Feedback({
        isCorrect: true,
        text: `¡Impresionante! El 28 es de hecho un NÚMERO PERFECTO. Sus divisores propios son 1, 2, 4, 7 y 14. Al sumarlos todos: 1 + 2 + 4 + 7 + 14 = 28. ¡Qué elegancia de la naturaleza!`
      });
      setEinsteinMessage(`¡Un número perfecto! Los números perfectos son joyas raras en el océano de la matemática.`);
      if (parseInt(competenciaQ1Input.trim(), 10) === 6) {
        unlockMedal('med_competencias', 'Medalla de Genio Competente (Divisores de 50 y Números Perfectos)');
      }
    } else {
      setCompetenciaQ2Feedback({
        isCorrect: false,
        text: `Incorrecto. El número ${option} no es un número perfecto. Recuerda que la suma de sus divisores propios (excluyendo al propio número) debe ser igual al mismo número. ¡Prueba otra opción!`
      });
    }
  };

  const resetCompetencias = () => {
    setCompetenciaQ1Input('');
    setCompetenciaQ2Option('');
    setCompetenciaQ1Feedback(null);
    setCompetenciaQ2Feedback(null);
  };

  // 10. Metro cúbico y conversiones
  const resetVolumeGame = () => {
    const values = [1, 5, 8, 12, 0.5, 2.5, 10];
    const units = ['m3', 'dm3', 'cm3', 'mm3'];
    const fromUnit = units[Math.floor(Math.random() * (units.length - 1))];
    const toUnit = units[units.indexOf(fromUnit) + 1]; // Let's keep it next-neighbor or adjacent for easy understanding
    
    setVolumeValue(values[Math.floor(Math.random() * values.length)]);
    setVolumeFrom(fromUnit);
    setVolumeTo(toUnit);
    setVolumeInput('');
    setVolumeFeedback(null);
  };

  const checkVolumeConversion = () => {
    const units = ['m3', 'dm3', 'cm3', 'mm3'];
    const idxFrom = units.indexOf(volumeFrom);
    const idxTo = units.indexOf(volumeTo);
    const diff = idxTo - idxFrom;
    
    const expected = volumeValue * Math.pow(1000, diff);
    const userVal = parseFloat(volumeInput.trim().replace(',', '.'));

    if (!isNaN(userVal) && Math.abs(userVal - expected) < 0.0001) {
      setVolumeFeedback({
        isCorrect: true,
        text: `¡Brillante! ${volumeValue} ${volumeFrom} es exactamente ${expected.toLocaleString('es-CR')} ${volumeTo}. Al bajar una grada en las unidades de volumen, multiplicamos por 1000.`
      });
      setEinsteinMessage(`¡Excelente dominio del espacio tridimensional! El metro cúbico mide volumen (largo por ancho por alto).`);
      unlockMedal('med_metro_cubico', 'Medalla de Maestro de Volumen (Metro Cúbico y Conversiones)');
    } else {
      setVolumeFeedback({
        isCorrect: false,
        text: `Incorrecto. Recuerda que al convertir entre unidades de volumen (3D), cada salto o grada equivale a multiplicar o dividir por 1000. Pista: debes obtener ${expected.toLocaleString('es-CR')}.`
      });
    }
  };

  // 11. Proporcionalidad directa y regla de tres
  const resetPropGame = () => {
    const problems = [
      { item1: 'cuadernos', item2: 'colones', q1: 3, q2: 1500, q3: 5 },
      { item1: 'manzanas', item2: 'colones', q1: 4, q2: 1200, q3: 10 },
      { item1: 'horas', item2: 'kilómetros', q1: 2, q2: 160, q3: 5 },
      { item1: 'paredes', item2: 'bolsas de cemento', q1: 2, q2: 12, q3: 5 }
    ];
    const prob = problems[Math.floor(Math.random() * problems.length)];
    setPropItem1Name(prob.item1);
    setPropItem2Name(prob.item2);
    setPropQuantity1(prob.q1);
    setPropQuantity2(prob.q2);
    setPropQuantity3(prob.q3);
    setPropInput('');
    setPropFeedback(null);
  };

  const checkPropGame = () => {
    const expected = (propQuantity2 * propQuantity3) / propQuantity1;
    const userVal = parseInt(propInput.trim(), 10);

    if (userVal === expected) {
      setPropFeedback({
        isCorrect: true,
        text: `¡Extraordinario! La respuesta es ${expected}. Multiplicaste en cruz (${propQuantity2} · ${propQuantity3}) y dividiste entre el término restante (${propQuantity1}). ¡Regla de tres directa perfecta!`
      });
      setEinsteinMessage(`¡Proporcionalidad dominada! Si una variable aumenta, la otra lo hace en la misma proporción. ¡Eso es ley matemática!`);
      unlockMedal('med_regla_tres', 'Medalla de la Regla del Saber (Proporcionalidad y Regla de 3)');
    } else {
      setPropFeedback({
        isCorrect: false,
        text: `Cerca, pero calcula de nuevo. Aplica la Regla de Tres: Multiplica ${propQuantity2} por ${propQuantity3} y luego divide el resultado entre ${propQuantity1}.`
      });
    }
  };

  // 12. Interés Simple
  const resetInterestGame = () => {
    const principals = [50000, 100000, 150000, 200000];
    const rates = [4, 5, 6, 8, 10]; // %
    const years = [1, 2, 3, 5];
    
    setInterestPrincipal(principals[Math.floor(Math.random() * principals.length)]);
    setInterestRate(rates[Math.floor(Math.random() * rates.length)]);
    setInterestYears(years[Math.floor(Math.random() * years.length)]);
    setInterestInput('');
    setInterestFeedback(null);
  };

  const checkInterestGame = () => {
    const expected = interestPrincipal * (interestRate / 100) * interestYears;
    const userVal = parseInt(interestInput.trim(), 10);

    if (userVal === expected) {
      setInterestFeedback({
        isCorrect: true,
        text: `¡Soberbio! El interés simple calculado es de ₡${expected.toLocaleString('es-CR')}. Fórmula: I = C · i · t (₡${interestPrincipal.toLocaleString('es-CR')} · ${interestRate}% · ${interestYears} años).`
      });
      setEinsteinMessage(`¡Habilidades financieras activadas! El interés simple te permite calcular el costo o ganancia del dinero a través del tiempo.`);
      unlockMedal('med_interes_simple', 'Medalla de Pequeño Financiero (Cálculo de Interés Simple)');
    } else {
      setInterestFeedback({
        isCorrect: false,
        text: `Incorrecto. Aplica la fórmula: multiplica el Capital (₡${interestPrincipal.toLocaleString('es-CR')}) por la Tasa en decimales (${interestRate / 100}) y luego por los Años (${interestYears}).`
      });
    }
  };

  // --- TRIVIA EXERCISES FOR OTHER SUBJECTS ---
  const handleAnswerTrivia = (optionIdx: number) => {
    if (triviaIsAnswered) return;
    
    setSelectedTriviaOption(optionIdx);
    setTriviaIsAnswered(true);
    
    const questions = TRIVIA_DATA[triviaSubject];
    const currentQ = questions[triviaIdx];
    const correct = optionIdx === currentQ.answerIdx;
    setTriviaIsCorrect(correct);

    if (correct) {
      setEinsteinMessage(`¡Genial! Tu respuesta en ${triviaSubject.toUpperCase()} es correcta. ¡Sabes muchísimo de temas oficiales del MEP!`);
      // Check if all subject trivia is done
      if (triviaIdx === questions.length - 1) {
        unlockMedal(`med_${triviaSubject}`, `Medalla de Excelencia de ${triviaSubject.toUpperCase()}`);
      }
    } else {
      setEinsteinMessage(`¡Una oportunidad para aprender! Revisa la explicación de este tema. ¡La próxima vez lo harás de forma brillante!`);
    }
  };

  const handleNextTrivia = () => {
    const questions = TRIVIA_DATA[triviaSubject];
    if (triviaIdx < questions.length - 1) {
      setTriviaIdx(prev => prev + 1);
    } else {
      setTriviaIdx(0); // loop
    }
    setSelectedTriviaOption(null);
    setTriviaIsAnswered(false);
    setTriviaIsCorrect(null);
  };

  const handleSubjectChange = (subject: 'espanol' | 'ciencias' | 'sociales') => {
    setTriviaSubject(subject);
    setTriviaIdx(0);
    setSelectedTriviaOption(null);
    setTriviaIsAnswered(false);
    setTriviaIsCorrect(null);
  };

  // --- REWARD GAME: TIC-TAC-TOE VS EINSTEIN ---
  const startTttGame = () => {
    setTttBoard(Array(9).fill(''));
    setTttWinner(null);
    setTttIsActive(true);
    setTttActiveCellIndex(null);
    setTttActiveQuestion(null);
    setTttSelectedOption(null);
    setTttQuestionAnswered(false);
    setTttQuestionCorrect(null);
    setTttStatusMessage('¡Haz clic en cualquier casilla de la cuadrícula para intentar marcar tu jugada!');
    setEinsteinMessage('¡Ah, un reto intelectual! Juguemos al Gato Matemático. Responde mis preguntas correctamente para colocar tus fichas "X" y ganarme. ¡Que gane la ciencia!');
  };

  const handleTttCellClick = (idx: number) => {
    if (!tttIsActive || tttBoard[idx] !== '' || tttWinner) return;

    // Trigger a question to unlock this cell
    setTttActiveCellIndex(idx);
    setTttSelectedOption(null);
    setTttQuestionAnswered(false);
    setTttQuestionCorrect(null);

    // Generate a fun 6th-grade math question for this cell
    const mathQuestions = [
      {
        q: "¿Cuál de estos números es divisible por 3 de forma exacta?",
        opt: ["14", "25", "27", "32"],
        ansIdx: 2,
        exp: "El 27 es divisible por 3 (27 ÷ 3 = 9) y la suma de sus dígitos (2+7=9) es múltiplo de 3."
      },
      {
        q: "¿Cuál es el único número primo que es par?",
        opt: ["2", "4", "6", "8"],
        ansIdx: 0,
        exp: "El número 2 es el único número primo par en todo el universo. ¡Todos los demás pares son compuestos!"
      },
      {
        q: "Calcula el valor de 3 elevado al cubo (3³).",
        opt: ["9", "27", "81", "12"],
        ansIdx: 1,
        exp: "3³ significa 3 x 3 x 3 = 27."
      },
      {
        q: "Si el radio de una circunferencia es de 7 cm, ¿cuánto mide su diámetro?",
        opt: ["3.5 cm", "7 cm", "14 cm", "21 cm"],
        ansIdx: 2,
        exp: "El diámetro es siempre el doble del radio, por lo que 7 x 2 = 14 cm."
      },
      {
        q: "¿Cuál es el resultado de la división de fracciones: 1/2 ÷ 1/2?",
        opt: ["1/4", "1", "1/2", "2"],
        ansIdx: 1,
        exp: "Cualquier cantidad dividida entre sí misma da como resultado 1."
      },
      {
        q: "Representa 10⁴ (diez a la cuatro) como número natural entero.",
        opt: ["100", "1,000", "10,000", "100,000"],
        ansIdx: 2,
        exp: "10⁴ es un 1 seguido de 4 ceros, es decir, 10,000."
      },
      {
        q: "¿Cuál de estos números es un número compuesto?",
        opt: ["3", "5", "9", "11"],
        ansIdx: 2,
        exp: "El 9 es compuesto porque se puede dividir por 1, por 3 y por 9."
      },
      {
        q: "¿Cómo se llama la línea que toca la circunferencia en un solo punto exterior?",
        opt: ["Radio", "Secante", "Tangente", "Cuerda"],
        ansIdx: 2,
        exp: "La tangente es la recta que hace contacto con la circunferencia en un único punto."
      },
      {
        q: "Calcula el resultado exacto de: 240 ÷ 12.",
        opt: ["15", "18", "20", "24"],
        ansIdx: 2,
        exp: "240 ÷ 12 es exactamente 20."
      }
    ];

    // Pick a semi-random question
    const pickedQ = mathQuestions[idx % mathQuestions.length];
    setTttActiveQuestion(pickedQ);
    setTttStatusMessage(`Resuelve la pregunta para reclamar la casilla número ${idx + 1}...`);
  };

  const handleAnswerTttQuestion = (optionIdx: number) => {
    if (tttQuestionAnswered || tttActiveCellIndex === null || !tttActiveQuestion) return;

    setTttSelectedOption(optionIdx);
    setTttQuestionAnswered(true);

    const isCorrect = optionIdx === tttActiveQuestion.ansIdx;
    setTttQuestionCorrect(isCorrect);

    if (isCorrect) {
      // Claim cell with 'X'
      const newBoard = [...tttBoard];
      newBoard[tttActiveCellIndex] = 'X';
      setTttBoard(newBoard);
      setTttStatusMessage(`¡Excelente! Respondiste bien. Reclamaste la casilla ${tttActiveCellIndex + 1} con tu X.`);
      setEinsteinMessage("¡Impresionante! Has resuelto mi acertijo a la perfección. Es tu turno de brillar.");

      // Check if Player Won immediately
      if (checkWin(newBoard, 'X')) {
        setTttWinner('X');
        setTttStatusMessage('🏆 ¡Felicidades! Le has ganado al Gato de Albert Einstein. ¡Tu pensamiento analítico es de nivel superior!');
        setEinsteinMessage('¡Increíble! Me has derrotado de forma justa en el Gato Matemático. Te otorgo la Gran Medalla Einstein de Excelencia.');
        unlockMedal('med_einstein_master', 'Gran Medalla de Honor de Albert Einstein (Campeón de Gato)');
        return;
      }

      // Check if Draw
      if (!newBoard.includes('')) {
        setTttWinner('draw');
        setTttStatusMessage('🤝 ¡Es un empate técnico! Dos grandes mentes piensan igual.');
        setEinsteinMessage('¡Un empate honorable! Ambos demostramos un gran intelecto matemático en el tablero.');
        return;
      }

      // Einstein's counter-move (O) after a small delay
      setTimeout(() => {
        makeEinsteinMove(newBoard);
      }, 1000);

    } else {
      setTttStatusMessage(`¡Oops! Respuesta incorrecta. Perdiste la oportunidad de marcar esta casilla.`);
      setEinsteinMessage(`¡Ay caramba! La respuesta correcta era: "${tttActiveQuestion.opt[tttActiveQuestion.ansIdx]}". No te preocupes, ¡aprende la lección y sigue intentando!`);
      
      // Close modal after delay so they can try another cell
      setTimeout(() => {
        setTttActiveCellIndex(null);
        setTttActiveQuestion(null);
      }, 3500);
    }
  };

  const makeEinsteinMove = (currentBoard: string[]) => {
    // Basic AI move: find first empty cell, or block, or win
    // Look for empty cells
    const emptyIndices: number[] = [];
    currentBoard.forEach((cell, i) => {
      if (cell === '') emptyIndices.push(i);
    });

    if (emptyIndices.length === 0) return;

    // Check if Einstein can win in one move
    let moveIdx = -1;
    for (let i = 0; i < emptyIndices.length; i++) {
      const idx = emptyIndices[i];
      const tempBoard = [...currentBoard];
      tempBoard[idx] = 'O';
      if (checkWin(tempBoard, 'O')) {
        moveIdx = idx;
        break;
      }
    }

    // Otherwise check if he needs to block player (X) from winning
    if (moveIdx === -1) {
      for (let i = 0; i < emptyIndices.length; i++) {
        const idx = emptyIndices[i];
        const tempBoard = [...currentBoard];
        tempBoard[idx] = 'X';
        if (checkWin(tempBoard, 'X')) {
          moveIdx = idx;
          break;
        }
      }
    }

    // Default to random empty cell
    if (moveIdx === -1) {
      const rand = Math.floor(Math.random() * emptyIndices.length);
      moveIdx = emptyIndices[rand];
    }

    const nextBoard = [...currentBoard];
    nextBoard[moveIdx] = 'O';
    setTttBoard(nextBoard);
    
    // Reset active modal
    setTttActiveCellIndex(null);
    setTttActiveQuestion(null);

    // Check if Einstein won
    if (checkWin(nextBoard, 'O')) {
      setTttWinner('O');
      setTttStatusMessage('👴 Albert Einstein ha ganado la partida. ¡Estudia un poco más de matemáticas y pídele la revancha!');
      setEinsteinMessage('¡Ajá! He conseguido alinear tres de mis órbitas de conocimiento. ¡No te desanimes! Practica y vuelve a intentarlo.');
      return;
    }

    // Check Draw
    if (!nextBoard.includes('')) {
      setTttWinner('draw');
      setTttStatusMessage('🤝 ¡Es un empate técnico! Dos grandes mentes piensan igual.');
      return;
    }

    setTttStatusMessage('¡Es tu turno de nuevo! Haz clic en otra casilla vacía.');
  };

  const checkWin = (board: string[], player: string) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winPatterns.some(pattern => 
      pattern.every(idx => board[idx] === player)
    );
  };

  return (
    <div className="space-y-6">
      {/* SECCIÓN INFORMATIVA DEL PORTAL (BIENVENIDA) */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-stone-900 to-teal-950/30 border border-emerald-900/30 rounded-2xl p-4 sm:p-6 space-y-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30 font-bold block w-fit">
                PRIMARIA MEJORADA • COSTA RICA
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/50 px-2.5 py-0.5 rounded border border-amber-500/20 font-bold block w-fit">
                100% Alineado al Programa Oficial MEP
              </span>
            </div>
            
            <h2 className="text-base sm:text-lg md:text-2xl font-black uppercase text-stone-100 tracking-tight flex flex-wrap items-center gap-1.5">
              🎒 Aula Virtual: <span className="text-emerald-400">Sexto Grado de Primaria</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
              Bienvenido al portal oficial de estudio lúdico y repaso interactivo para el último año de educación primaria. Estudie de forma divertida, acumule medallas reales por cada tema dominado, gane premios y resuelva problemas con el mentor más brillante del mundo.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-2.5 items-start sm:items-center">
              <button
                id="copy-sexto-grado-link-btn"
                onClick={() => {
                  const url = getShareableUrl();
                  navigator.clipboard.writeText(url);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 4000);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 border rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                  copiedLink 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border-emerald-500/20'
                }`}
              >
                {copiedLink ? (
                  <>✨ ¡Enlace Copiado! 🔗</>
                ) : (
                  <>🔗 Copiar Enlace Público Sin Permisos 📱</>
                )}
              </button>



              {copiedLink && (
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/20 animate-pulse">
                  ¡Listo! Se copió el enlace público sin restricciones. Compártelo con total libertad.
                </span>
              )}
            </div>
          </div>

          {/* TARJETA DE ESTADÍSTICAS RÁPIDAS */}
          <div className="bg-stone-950/95 border border-emerald-950 p-4 rounded-xl flex items-center gap-4 w-full md:w-auto md:min-w-[240px] shrink-0 shadow-lg relative">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-5 h-5 text-emerald-400 animate-bounce" />
            </div>
            <div className="text-left font-mono space-y-0.5">
              <span className="text-[8px] text-stone-500 uppercase tracking-widest block font-bold">Rendimiento Actual</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-emerald-400">{unlockedMedals.length}</span>
                <span className="text-[10px] text-stone-400">Medallas</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-stone-400">
                <span>Racha:</span>
                <span className="text-amber-400 font-bold flex items-center gap-0.5">
                  🔥 {studyStreak} días de estudio
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS PRINCIPALES */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-850 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('inicio')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inicio'
                  ? 'bg-emerald-600 text-stone-950 font-black shadow-lg shadow-emerald-900/10'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              👴 Albert Einstein Bot
            </button>
            <button
              onClick={() => setActiveTab('practicas')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'practicas'
                  ? 'bg-emerald-600 text-stone-950 font-black shadow-lg shadow-emerald-900/10'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              📝 Prácticas MEP Evaluadas
            </button>
            <button
              onClick={() => setActiveTab('sociales_1948')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'sociales_1948'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-900/30'
                  : 'text-amber-400 hover:text-amber-200 hover:bg-stone-850 border border-amber-500/30'
              }`}
            >
              <span>🇨🇷</span>
              <span>Estudios Sociales: 1948 & Bienestar</span>
              <span className="bg-amber-950 text-amber-300 text-[8.5px] px-1.5 py-0.5 rounded font-black uppercase">Examen</span>
            </button>
            <button
              onClick={() => setActiveTab('geometria')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'geometria'
                  ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-amber-400 text-slate-950 font-black shadow-lg shadow-cyan-900/20'
                  : 'text-cyan-400 hover:text-cyan-200 hover:bg-stone-850'
              }`}
            >
              🎨 Geometría, Polígonos & Pizarra Libre
            </button>
            <button
              onClick={() => setActiveTab('juegos_premios')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'juegos_premios'
                  ? 'bg-emerald-600 text-stone-950 font-black shadow-lg shadow-emerald-900/10'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              🎮 Gato Matemático & Medallero
            </button>
          </div>
          {onBackToAcademia && (
            <button
              onClick={onBackToAcademia}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold text-amber-500 hover:text-amber-400 hover:bg-stone-850/50 transition-all border border-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              🏫 Volver a Cursos Academia
            </button>
          )}
        </div>
      </div>

      {/* CONTENIDO ACTIVO SEGÚN PESTAÑA */}
      <AnimatePresence mode="wait">
        
        {/* PESTAÑA 1: ALBERT EINSTEIN BOT */}
        {activeTab === 'inicio' && (
          <motion.div
            key="einstein-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* PERSONAJE EINSTEIN CHAT */}
            <div className="md:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                {/* EINSTEIN AVATAR */}
                <div className={`w-28 h-28 rounded-full bg-gradient-to-br from-teal-800 to-emerald-950 flex items-center justify-center border-4 overflow-hidden shadow-xl transition-all duration-300 ${isSpeaking ? 'border-emerald-400 scale-105 shadow-emerald-500/20' : 'border-emerald-500/30'}`}>
                  <span className={`text-5xl font-sans transition-transform duration-300 ${isSpeaking ? 'scale-110 animate-pulse' : ''}`} role="img" aria-label="Albert Einstein">👴</span>
                </div>
                {isSpeaking ? (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border-2 border-stone-900 shadow animate-bounce">
                    👴 HABLANDO...
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-stone-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border-2 border-stone-900 shadow">
                    TUTOR ACTIVO
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-black text-sm text-stone-100 uppercase tracking-tight">Albert Einstein Virtual</h3>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center justify-center gap-1">
                  <span>Guía de Motivación & Apoyo</span>
                  {isSpeaking && (
                    <span className="flex items-center gap-0.5 h-3 ml-1">
                      <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </span>
                  )}
                </span>
              </div>

              <div className="w-full bg-stone-950 p-4 rounded-xl border border-stone-850 relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-stone-950 rotate-45 border-t border-l border-stone-850" />
                <p className="text-xs text-stone-300 leading-relaxed italic">
                  "{einsteinMessage}"
                </p>

                {/* BOTÓN DE VOZ PARA EL MENSAJE PRINCIPAL */}
                <div className="mt-3.5 pt-3 border-t border-stone-900 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (isSpeaking) {
                        stopSpeaking();
                      } else {
                        speak(einsteinMessage, true);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      isSpeaking 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                        : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <span className="flex gap-0.5 items-center justify-center h-2.5 w-2.5">
                          <span className="animate-bounce bg-rose-400 w-0.5 h-2.5 rounded-full" style={{ animationDelay: '0.1s' }} />
                          <span className="animate-bounce bg-rose-400 w-0.5 h-1.5 rounded-full" style={{ animationDelay: '0.3s' }} />
                          <span className="animate-bounce bg-rose-400 w-0.5 h-2 rounded-full" style={{ animationDelay: '0.5s' }} />
                        </span>
                        <span>Detener Voz ⏹️</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>Escuchar Voz 🔊</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={toggleVoiceEnabled}
                    className="text-[9px] font-semibold text-stone-400 hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
                    title={isVoiceEnabled ? "Desactivar lectura automática" : "Activar lectura automática"}
                  >
                    {isVoiceEnabled ? (
                      <span className="text-emerald-500 font-bold">📢 Lectura: Sí</span>
                    ) : (
                      <span className="text-stone-500 font-bold">🔇 Lectura: No</span>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={nextEinsteinQuote}
                className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-stone-950 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <Sparkles className="w-3.5 h-3.5" /> ¡Pedir otro consejo!
              </button>
            </div>

            {/* PREGUNTALE AL GENIO */}
            <div className="md:col-span-8 bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 text-left">
              <span className="text-[9px] font-mono uppercase bg-amber-950/60 text-amber-400 px-2.5 py-0.5 rounded border border-amber-900/30 font-bold block w-fit">
                CONSULTA INTERACTIVA RÁPIDA
              </span>
              <h3 className="text-sm font-black text-stone-100 uppercase tracking-tight">
                ¿Tienes dudas con algún tema de Sexto? ¡Pregúntale a Albert!
              </h3>
              <p className="text-xs text-stone-400">
                Haz clic en cualquiera de las siguientes preguntas comunes del plan del MEP de Costa Rica, y observa la explicación divertida y lúdica de Albert Einstein para entender el concepto de inmediato.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {EINSTEIN_FAQ.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setEinsteinFAQResponse(faq.a);
                      speak(faq.a);
                    }}
                    className="p-3 bg-stone-950 hover:bg-stone-850 border border-stone-850/70 rounded-xl text-left hover:border-emerald-500/40 transition-all group flex items-start gap-2.5 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-stone-300 font-semibold group-hover:text-emerald-300 transition-colors">
                      {faq.q}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {einsteinFAQResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl mt-4 text-xs text-stone-200 leading-relaxed space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-500/10">
                      <div className="flex items-center gap-2 font-black text-emerald-400 uppercase tracking-wide">
                        <Smile className="w-4 h-4 text-emerald-400" />
                        Albert explica:
                      </div>

                      <button
                        onClick={() => {
                          if (isSpeaking) {
                            stopSpeaking();
                          } else {
                            speak(einsteinFAQResponse, true);
                          }
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          isSpeaking 
                            ? 'bg-rose-500/20 text-rose-300' 
                            : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        }`}
                      >
                        {isSpeaking ? (
                          <>⏹️ Detener Voz</>
                        ) : (
                          <>🔊 Escuchar Respuesta</>
                        )}
                      </button>
                    </div>
                    
                    <p className="italic">
                      "{einsteinFAQResponse}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* PESTAÑA 2: PRÁCTICAS MEP EVALUADAS */}
        {activeTab === 'practicas' && (
          <motion.div
            key="practicas-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* SELECCIÓN DE MATERIA */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-850">
              <button
                onClick={() => setSelectedSubject('matematicas')}
                className={`p-3 rounded-xl text-xs font-black uppercase flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer transition-all ${
                  selectedSubject === 'matematicas'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-stone-950'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Matemáticas</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSubject('espanol');
                  handleSubjectChange('espanol');
                }}
                className={`p-3 rounded-xl text-xs font-black uppercase flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer transition-all ${
                  selectedSubject === 'espanol'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-stone-950'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Español</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSubject('ciencias');
                  handleSubjectChange('ciencias');
                }}
                className={`p-3 rounded-xl text-xs font-black uppercase flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer transition-all ${
                  selectedSubject === 'ciencias'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-stone-950'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Ciencias</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSubject('sociales');
                  handleSubjectChange('sociales');
                }}
                className={`p-3 rounded-xl text-xs font-black uppercase flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer transition-all ${
                  selectedSubject === 'sociales'
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-stone-950 font-black shadow-md'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Estudios Sociales</span>
                <span className="bg-amber-950 text-amber-300 text-[8.5px] px-1.5 py-0.5 rounded font-black">1948</span>
              </button>
            </div>

            {/* CONTENIDO DETALLADO DE MATEMÁTICAS (DEEP FOCUS) */}
            {selectedSubject === 'matematicas' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                
                {/* SUB-TÓPICOS DE MATEMÁTICAS */}
                <div className="lg:col-span-4 space-y-2 bg-stone-900 p-4 border border-stone-800 rounded-2xl">
                  <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest block font-bold border-b border-stone-850 pb-2 mb-2">
                    SECCIONES CLAVE DE EXAMEN MEP
                  </span>
                  
                  {[
                    { id: 'multiplos_divisores', label: '1. Múltiplos, Divisibilidad y Divisores' },
                    { id: 'primos_compuestos', label: '2. Números Primos y Compuestos' },
                    { id: 'potencias', label: '3. Potencias y Potencias de Base 10' },
                    { id: 'circunferencia_circulo', label: '4. Circunferencia y Círculo' },
                    { id: 'segmentos_notables', label: '5. Segmentos Notables del Círculo' },
                    { id: 'divisiones', label: '6. Operaciones Básicas (Restas, Multiplicaciones y Divisiones)' },
                    { id: 'angulo_central_cuadrante', label: '7. Ángulo Central y Cuadrantes' },
                    { id: 'area_perimetro_circulo', label: '8. Área y Perímetro de Círculos' },
                    { id: 'evaluacion_competencias', label: '9. Evaluación: Divisores de 50 y Perfectos' },
                    { id: 'metro_cubico_conversiones', label: '10. Metro Cúbico y Conversiones' },
                    { id: 'proporcionalidad_regla_tres', label: '11. Proporcionalidad y Regla de Tres' },
                    { id: 'interes_simple', label: '12. Interés Simple Financiero' }
                  ].map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedMathTopic(topic.id)}
                      className={`w-full p-2.5 rounded-xl text-xs text-left font-bold transition-all flex items-center justify-between cursor-pointer border ${
                        selectedMathTopic === topic.id
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                          : 'text-stone-300 hover:text-stone-100 bg-stone-950 hover:bg-stone-850/80 border-stone-850'
                      }`}
                    >
                      <span>{topic.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  ))}
                </div>

                {/* AREA DE TRABAJO DEL SUB-TÓPICO ACTIVO */}
                <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4">
                  
                  {/* TEMA 1: MÚLTIPLOS Y DIVISORES */}
                  {selectedMathTopic === 'multiplos_divisores' && (
                    <div className="space-y-4">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 1 • Práctica Activa</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Encuentre los múltiplos</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Haga clic en todos los números de la cuadrícula que son <strong>múltiplos de {multiplesTarget}</strong> de forma exacta. Una vez seleccionados todos, presione "Verificar Respuestas".
                        </p>
                      </div>

                      {/* GRID DE NÚMEROS */}
                      <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
                        {[3, 6, 8, 10, 12, 15, 16, 18, 20, 21, 24, 25, 27, 30, 35].map(num => {
                          const isSelected = selectedNumbersGrid.includes(num);
                          return (
                            <button
                              key={num}
                              onClick={() => handleNumberGridClick(num)}
                              className={`p-3 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-600 text-stone-950 border-emerald-500 scale-105'
                                  : 'bg-stone-950 text-stone-300 border-stone-850 hover:bg-stone-850'
                              }`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>

                      {/* CONTROLES Y FEEDBACK */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                        <button
                          onClick={checkMultiplesAnswer}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-stone-950 font-black uppercase text-xs rounded-xl cursor-pointer hover:from-emerald-500 transition-all flex items-center gap-1.5"
                        >
                          Verificar Respuestas ✓
                        </button>
                        <button
                          onClick={resetMultiplesGame}
                          className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-300 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                        >
                          Generar Nuevo Número
                        </button>
                      </div>

                      {multAnswerCorrect !== null && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          multAnswerCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          <div className="flex items-center gap-2 font-bold mb-1">
                            {multAnswerCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                            {multAnswerCorrect ? '¡Excelente!' : '¡Ay, casi lo tienes!'}
                          </div>
                          {multAnswerCorrect 
                            ? 'Has encontrado todos los múltiplos de forma magistral. ¡Continúa con el siguiente tema!' 
                            : 'Faltan números o marcaste algunos que no son múltiplos correctos de ' + multiplesTarget + '. Recuerda usar la tabla del multiplicar de este número.'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 2: PRIMOS Y COMPUESTOS */}
                  {selectedMathTopic === 'primos_compuestos' && (
                    <div className="space-y-4">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 2 • Clasificador Sencillo</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Primos vs Compuestos</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Un número es <strong>Primo</strong> si solo se divide de forma exacta por 1 y por sí mismo. Es <strong>Compuesto</strong> si tiene más divisores.
                        </p>
                      </div>

                      <div className="py-6 flex flex-col items-center justify-center space-y-4 bg-stone-950 rounded-xl border border-stone-850 max-w-sm mx-auto">
                        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block font-bold">Número Evaluado</span>
                        <span className="text-5xl font-mono font-black text-amber-400 animate-pulse">{primeTargetNum}</span>
                        
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => checkPrimeAnswer('primo')}
                            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 text-stone-950 text-xs font-black uppercase rounded-xl cursor-pointer transition-all shadow"
                          >
                            💎 Es PRIMO
                          </button>
                          <button
                            onClick={() => checkPrimeAnswer('compuesto')}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 text-white text-xs font-black uppercase rounded-xl cursor-pointer transition-all shadow"
                          >
                            🧱 Es COMPUESTO
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={resetPrimesGame}
                          className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                        >
                          Generar Siguiente Número 🔄
                        </button>
                      </div>

                      {primeAnswerFeedback && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          primeAnswerFeedback.isCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          <div className="flex items-center gap-2 font-bold mb-1">
                            {primeAnswerFeedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                            {primeAnswerFeedback.isCorrect ? '¡Correcto!' : '¡Oops!'}
                          </div>
                          {primeAnswerFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 3: POTENCIAS Y BASE 10 */}
                  {selectedMathTopic === 'potencias' && (
                    <div className="space-y-6">
                      
                      {/* SUB-SECCIÓN A: POTENCIAS NORMALES */}
                      <div className="space-y-4 border-b border-stone-850 pb-5">
                        <div className="border-b border-stone-800 pb-2">
                          <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 3 • Parte A</span>
                          <h4 className="text-sm font-black uppercase text-stone-100">Cálculo de Potencias Básicas</h4>
                          <p className="text-xs text-stone-400 leading-relaxed">
                            Resuelva la siguiente operación multiplicando la base tantas veces como indica el exponente.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-stone-950 rounded-xl border border-stone-850 gap-4">
                          <div className="flex items-center gap-1">
                            <span className="text-3xl font-mono font-black text-stone-100">{powerBase}</span>
                            <span className="text-lg font-mono font-bold text-emerald-400 -mt-6 align-top">{powerExponent}</span>
                            <span className="text-2xl font-mono font-bold text-stone-400 ml-3">=</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={powerUserInput}
                              onChange={(e) => setPowerUserInput(e.target.value)}
                              placeholder="Ej: 8"
                              className="w-24 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              onClick={checkPowerAnswer}
                              className="px-3.5 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                            >
                              Verificar
                            </button>
                          </div>
                        </div>

                        {powerFeedback && (
                          <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                            powerFeedback.isCorrect 
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                              : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                          }`}>
                            {powerFeedback.text}
                          </div>
                        )}
                      </div>

                      {/* SUB-SECCIÓN B: POTENCIAS DE BASE 10 */}
                      <div className="space-y-4">
                        <div className="border-b border-stone-800 pb-2">
                          <span className="text-[8px] font-mono text-amber-400 font-bold uppercase">Tema 3 • Parte B</span>
                          <h4 className="text-sm font-black uppercase text-stone-100">Potencias de Base 10</h4>
                          <p className="text-xs text-stone-400 leading-relaxed">
                            ¡Recuerda el truco de Albert! El exponente es igual a la cantidad de ceros del resultado final.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-stone-950 rounded-xl border border-stone-850 gap-4">
                          <div className="flex items-center gap-1">
                            <span className="text-3xl font-mono font-black text-stone-100">10</span>
                            <span className="text-lg font-mono font-bold text-amber-400 -mt-6 align-top">{powerBase10Exp}</span>
                            <span className="text-2xl font-mono font-bold text-stone-400 ml-3">=</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={powerBase10Input}
                              onChange={(e) => setPowerBase10Input(e.target.value)}
                              placeholder="Ej: 10000"
                              className="w-36 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-amber-500"
                            />
                            <button
                              onClick={checkPowerBase10Answer}
                              className="px-3.5 py-1.5 bg-amber-500 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-amber-400 cursor-pointer"
                            >
                              Verificar
                            </button>
                          </div>
                        </div>

                        {powerBase10Feedback && (
                          <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                            powerBase10Feedback.isCorrect 
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                              : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                          }`}>
                            {powerBase10Feedback.text}
                          </div>
                        )}

                        <div className="flex justify-center">
                          <button
                            onClick={resetPowersGame}
                            className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                          >
                            Generar Nuevos Ejercicios 🔄
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TEMA 4: CIRCUNFERENCIA Y CÍRCULO */}
                  {selectedMathTopic === 'circunferencia_circulo' && (
                    <div className="space-y-4">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 4 • Conceptos Geométricos</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">¿Circunferencia o Círculo?</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          La diferencia visual y de concepto es sumamente evaluada en 6° grado. Resuelva la pregunta de análisis:
                        </p>
                      </div>

                      <div className="p-4 bg-stone-950 rounded-xl border border-stone-850 space-y-3">
                        <p className="text-xs font-semibold text-stone-200">
                          Pregunta: Si el maestro en la pizarra dibuja únicamente un hilo curvo cerrado y no pinta nada adentro, ¿qué dibujó?
                        </p>

                        <div className="grid grid-cols-1 gap-2">
                          {[
                            "Dibujó un Círculo, ya que es el perímetro.",
                            "Dibujó una Circunferencia, ya que es únicamente la línea límite exterior.",
                            "Dibujó una Elipse, porque es de Costa Rica.",
                            "Ambas palabras significan exactamente lo mismo geométricamente."
                          ].map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => checkCircleQuiz(idx)}
                              className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                                circleQuizAnswer === idx
                                  ? idx === 1
                                    ? 'bg-emerald-950/45 text-emerald-300 border-emerald-500/40 font-bold'
                                    : 'bg-rose-950/45 text-rose-300 border-rose-500/40'
                                  : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-stone-800/60'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {circleQuizFeedback && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          circleQuizFeedback.isCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          {circleQuizFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 5: SEGMENTOS NOTABLES */}
                  {selectedMathTopic === 'segmentos_notables' && (
                    <div className="space-y-4">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 5 • Identificador Visual SVG</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Líneas y Segmentos del Círculo</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Haga clic en cualquiera de los botones de segmentos para verificar de qué color se dibuja en la pizarra virtual interactiva.
                        </p>
                      </div>

                      {/* SVG INTERACTIVO */}
                      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                        <div className="relative w-48 h-48 bg-stone-950 rounded-2xl border border-stone-800/80 flex items-center justify-center shadow-lg shrink-0">
                          <svg width="180" height="180" viewBox="0 0 180 180" className="overflow-visible">
                            {/* Circumference */}
                            <circle cx="90" cy="90" r="70" fill="none" stroke="#2dd4bf" strokeWidth="2.5" />
                            
                            {/* Centro point */}
                            <circle cx="90" cy="90" r="4" fill="#fbbf24" />
                            <text x="88" y="84" fill="#fbbf24" fontSize="8" fontFamily="monospace">O (Centro)</text>

                            {/* Radio - Roja */}
                            <line x1="90" y1="90" x2="160" y2="90" stroke="#f43f5e" strokeWidth="3" />
                            
                            {/* Diámetro - Verde */}
                            <line x1="20" y1="90" x2="160" y2="90" stroke="#10b981" strokeWidth="3" strokeDasharray="2,2" />

                            {/* Cuerda - Azul */}
                            <line x1="40" y1="40" x2="140" y2="40" stroke="#3b82f6" strokeWidth="3" />

                            {/* Tangente - Amarilla */}
                            <line x1="160" y1="20" x2="160" y2="160" stroke="#fbbf24" strokeWidth="3" />

                            {/* Secante - Purpura */}
                            <line x1="10" y1="130" x2="170" y2="130" stroke="#a855f7" strokeWidth="3" />
                          </svg>
                        </div>

                        {/* MENU DE SELECCION */}
                        <div className="space-y-1.5 w-full">
                          <span className="text-[8px] font-mono text-stone-500 font-bold block uppercase mb-1">HAGA CLIC EN UN SEGMENTO:</span>
                          
                          <div className="grid grid-cols-1 gap-1.5">
                            {[
                              { id: 'radio', color: '#f43f5e', label: 'Radio (Línea ROJA)' },
                              { id: 'diámetro', color: '#10b981', label: 'Diámetro (Línea VERDE segmentada)' },
                              { id: 'cuerda', color: '#3b82f6', label: 'Cuerda (Línea AZUL superior)' },
                              { id: 'tangente', color: '#fbbf24', label: 'Tangente (Línea AMARILLA exterior)' },
                              { id: 'secante', color: '#a855f7', label: 'Secante (Línea PÚRPURA interior de lado a lado)' }
                            ].map(item => (
                              <button
                                key={item.id}
                                onClick={() => checkNotableSegmentSelection(item.id)}
                                className={`px-3 py-2 text-left rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-between border ${
                                  selectedNotableSegment === item.id
                                    ? 'bg-stone-950 text-stone-100 border-stone-850'
                                    : 'bg-stone-950/40 text-stone-300 border-transparent hover:bg-stone-950'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                  {item.label}
                                </span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {notableSegmentsFeedback && (
                        <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-xs leading-relaxed text-stone-200">
                          {notableSegmentsFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 6: OPERACIONES BÁSICAS (RESTAS, MULTIPLICACIONES Y DIVISIONES) */}
                  {selectedMathTopic === 'divisiones' && (
                    <div className="space-y-6">
                      
                      {/* SUB-PESTAÑAS DE ARITMÉTICA */}
                      <div className="flex flex-wrap gap-2 bg-stone-950 p-2 rounded-xl border border-stone-850">
                        <button
                          onClick={() => setBasicOpTab('divs_mep')}
                          className={`flex-1 py-2 px-3 text-[10px] sm:text-xs font-bold uppercase rounded-lg transition-all cursor-pointer text-center ${
                            basicOpTab === 'divs_mep'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg'
                              : 'text-stone-400 hover:text-stone-200 border border-transparent'
                          }`}
                        >
                          ➗ Divisiones (Con/Sin Cifra)
                        </button>
                        <button
                          onClick={() => setBasicOpTab('restas')}
                          className={`flex-1 py-2 px-3 text-[10px] sm:text-xs font-bold uppercase rounded-lg transition-all cursor-pointer text-center ${
                            basicOpTab === 'restas'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg'
                              : 'text-stone-400 hover:text-stone-200 border border-transparent'
                          }`}
                        >
                          ➖ Restas Complejas
                        </button>
                        <button
                          onClick={() => setBasicOpTab('mults')}
                          className={`flex-1 py-2 px-3 text-[10px] sm:text-xs font-bold uppercase rounded-lg transition-all cursor-pointer text-center ${
                            basicOpTab === 'mults'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg'
                              : 'text-stone-400 hover:text-stone-200 border border-transparent'
                          }`}
                        >
                          ✖️ Multiplicaciones
                        </button>
                        <button
                          onClick={() => setBasicOpTab('fracs')}
                          className={`flex-1 py-2 px-3 text-[10px] sm:text-xs font-bold uppercase rounded-lg transition-all cursor-pointer text-center ${
                            basicOpTab === 'fracs'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg'
                              : 'text-stone-400 hover:text-stone-200 border border-transparent'
                          }`}
                        >
                          🥞 Fracciones
                        </button>
                      </div>

                      {/* DETALLE SUB-PESTAÑA 1: DIVISIONES CON Y SIN CIFRA */}
                      {basicOpTab === 'divs_mep' && (
                        <div className="space-y-4">
                          <div className="border-b border-stone-800 pb-2">
                            <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Práctica Aritmética • Divisiones</span>
                            <h4 className="text-sm font-black uppercase text-stone-100">Divisiones de una y varias cifras (Enteras y Decimales)</h4>
                            <p className="text-xs text-stone-400 leading-relaxed">
                              Seleccione el tipo de división que desea practicar. Escriba el resultado exacto (use coma o punto para decimales).
                            </p>
                          </div>

                          {/* SELECTOR DE DIFICULTAD/TIPO DE DIVISION */}
                          <div className="grid grid-cols-3 gap-2 bg-stone-900/40 p-1.5 rounded-lg border border-stone-850">
                            {[
                              { id: 'una_cifra', label: 'Una Cifra (Simple)' },
                              { id: 'dos_cifras', label: 'Varias Cifras' },
                              { id: 'con_decimal', label: 'Con Cifra Decimal' }
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  setDivType(opt.id as any);
                                  generateDivProblem(opt.id as any);
                                }}
                                className={`py-1.5 px-2 text-[9px] font-bold uppercase rounded transition-all cursor-pointer text-center ${
                                  divType === opt.id
                                    ? 'bg-stone-800 text-emerald-400 border border-emerald-500/20 shadow'
                                    : 'text-stone-400 hover:text-stone-200 border border-transparent'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-stone-950 rounded-xl border border-stone-850 gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-mono font-black text-stone-100">{divDividend}</span>
                              <span className="text-xl font-bold text-emerald-400">÷</span>
                              <span className="text-2xl font-mono font-black text-stone-100">{divDivisor}</span>
                              <span className="text-2xl font-mono font-bold text-stone-400 ml-2">=</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={divInput}
                                onChange={(e) => setDivInput(e.target.value)}
                                placeholder="Ej: 4.5 o 25"
                                className="w-32 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                              />
                              <button
                                onClick={checkDivAnswer}
                                className="px-3.5 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                              >
                                Verificar
                              </button>
                            </div>
                          </div>

                          {divFeedback && (
                            <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                              divFeedback.isCorrect 
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                                : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                            }`}>
                              {divFeedback.text}
                            </div>
                          )}

                          <div className="flex justify-center">
                            <button
                              onClick={() => generateDivProblem(divType)}
                              className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                            >
                              Siguiente División 🔄
                            </button>
                          </div>
                        </div>
                      )}

                      {/* DETALLE SUB-PESTAÑA 2: RESTAS COMPLEJAS */}
                      {basicOpTab === 'restas' && (
                        <div className="space-y-4">
                          <div className="border-b border-stone-800 pb-2">
                            <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Práctica Aritmética • Restas</span>
                            <h4 className="text-sm font-black uppercase text-stone-100">Restas de Varias Cifras (Con y Sin Llevada)</h4>
                            <p className="text-xs text-stone-400 leading-relaxed">
                              Resuelva la resta mentalmente o en papel y anote el resultado exacto. ¡Cuidado con pedir prestado!
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-stone-950 rounded-xl border border-stone-850 gap-4">
                            {/* Pizarra de suma vertical */}
                            <div className="flex flex-col items-end pr-6 font-mono font-black text-2xl text-stone-100 border-r border-stone-850">
                              <div>{subMinuend}</div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-lg font-bold text-red-400">-</span>
                                <span>{subSubtrahend}</span>
                              </div>
                              <div className="w-28 h-[2px] bg-stone-100 my-1" />
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={subInput}
                                onChange={(e) => setSubInput(e.target.value)}
                                placeholder="Resultado"
                                className="w-28 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                              />
                              <button
                                onClick={checkSubAnswer}
                                className="px-3.5 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                              >
                                Verificar
                              </button>
                            </div>
                          </div>

                          {subFeedback && (
                            <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                              subFeedback.isCorrect 
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                                : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                            }`}>
                              {subFeedback.text}
                            </div>
                          )}

                          <div className="flex justify-center">
                            <button
                              onClick={generateSubProblem}
                              className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                            >
                              Siguiente Resta 🔄
                            </button>
                          </div>
                        </div>
                      )}

                      {/* DETALLE SUB-PESTAÑA 3: MULTIPLICACIONES */}
                      {basicOpTab === 'mults' && (
                        <div className="space-y-4">
                          <div className="border-b border-stone-800 pb-2">
                            <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Práctica Aritmética • Multiplicaciones</span>
                            <h4 className="text-sm font-black uppercase text-stone-100">Multiplicaciones con y sin Llevada</h4>
                            <p className="text-xs text-stone-400 leading-relaxed">
                              Multiplique dígito por dígito, anote el producto final y verifique si está correcto.
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-stone-950 rounded-xl border border-stone-850 gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-mono font-black text-stone-100">{multFactor1}</span>
                              <span className="text-xl font-bold text-emerald-400">×</span>
                              <span className="text-2xl font-mono font-black text-stone-100">{multFactor2}</span>
                              <span className="text-2xl font-mono font-bold text-stone-400 ml-2">=</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={multInput}
                                onChange={(e) => setMultInput(e.target.value)}
                                placeholder="Producto"
                                className="w-28 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                              />
                              <button
                                onClick={checkMultAnswer}
                                className="px-3.5 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                              >
                                Verificar
                              </button>
                            </div>
                          </div>

                          {multFeedback && (
                            <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                              multFeedback.isCorrect 
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                                : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                            }`}>
                              {multFeedback.text}
                            </div>
                          )}

                          <div className="flex justify-center">
                            <button
                              onClick={generateMultProblem}
                              className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                            >
                              Siguiente Multiplicación 🔄
                            </button>
                          </div>
                        </div>
                      )}

                      {/* DETALLE SUB-PESTAÑA 4: DIVISIONES CON FRACCIONES */}
                      {basicOpTab === 'fracs' && (
                        <div className="space-y-4">
                          <div className="border-b border-stone-800 pb-2">
                            <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 6 • Parte D</span>
                            <h4 className="text-sm font-black uppercase text-stone-100">Divisiones con Fracciones</h4>
                            <p className="text-xs text-stone-400 leading-relaxed">
                              Resuelva dividiendo las siguientes fracciones. Recuerda multiplicar de forma cruzada.
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-stone-950 rounded-xl border border-stone-850 gap-4">
                            <div className="flex items-center gap-3">
                              {/* Frac 1 */}
                              <div className="flex flex-col items-center font-mono font-bold text-lg">
                                <span>{fracNum1}</span>
                                <div className="w-6 h-[2px] bg-stone-100 my-0.5" />
                                <span>{fracDen1}</span>
                              </div>
                              
                              <span className="text-xl font-bold text-emerald-400">÷</span>

                              {/* Frac 2 */}
                              <div className="flex flex-col items-center font-mono font-bold text-lg">
                                <span>{fracNum2}</span>
                                <div className="w-6 h-[2px] bg-stone-100 my-0.5" />
                                <span>{fracDen2}</span>
                              </div>

                              <span className="text-xl font-bold text-stone-400 ml-2">=</span>
                            </div>

                            {/* Inputs */}
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-center">
                                <input
                                  type="number"
                                  value={fracAnswerNum}
                                  onChange={(e) => setFracAnswerNum(e.target.value)}
                                  placeholder="Num"
                                  className="w-16 bg-stone-900 border border-stone-800 text-center font-mono text-xs text-stone-100 rounded py-1 focus:outline-none focus:border-emerald-500"
                                />
                                <div className="w-16 h-[2px] bg-stone-100 my-1" />
                                <input
                                  type="number"
                                  value={fracAnswerDen}
                                  onChange={(e) => setFracAnswerDen(e.target.value)}
                                  placeholder="Den"
                                  className="w-16 bg-stone-900 border border-stone-800 text-center font-mono text-xs text-stone-100 rounded py-1 focus:outline-none focus:border-emerald-500"
                                />
                              </div>
                              <button
                                onClick={checkFractionDivision}
                                className="px-3.5 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer ml-2"
                              >
                                Verificar
                              </button>
                            </div>
                          </div>

                          {fracFeedback && (
                            <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                              fracFeedback.isCorrect 
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                                : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                            }`}>
                              {fracFeedback.text}
                            </div>
                          )}

                          <div className="flex justify-center">
                            <button
                              onClick={resetFractionsGame}
                              className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                            >
                              Siguiente Problema de Fracción 🔄
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* TEMA 7: ÁNGULO CENTRAL Y CUADRANTE */}
                  {selectedMathTopic === 'angulo_central_cuadrante' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 7 • Lección e Interacción</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Ángulo Central y Cuadrantes</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Un <strong>ángulo central</strong> tiene su vértice en el centro del círculo. El plano se divide en <strong>4 cuadrantes</strong> (I, II, III, IV), girando en contra de las manecillas del reloj.
                        </p>
                      </div>

                      {/* SVG VISUALIZER */}
                      <div className="flex flex-col md:flex-row items-center gap-6 bg-stone-950 p-5 rounded-2xl border border-stone-850">
                        <div className="relative w-44 h-44 shrink-0 bg-stone-900/60 rounded-full border border-stone-800 flex items-center justify-center p-2">
                          <svg width="150" height="150" viewBox="0 0 150 150" className="overflow-visible">
                            {/* Ejes cartesianos */}
                            <line x1="10" y1="75" x2="140" y2="75" stroke="#444" strokeWidth="1" strokeDasharray="3,3" />
                            <line x1="75" y1="10" x2="75" y2="140" stroke="#444" strokeWidth="1" strokeDasharray="3,3" />
                            
                            {/* Círculo base */}
                            <circle cx="75" cy="75" r="55" fill="none" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.4" />
                            
                            {/* Cuadrantes text */}
                            <text x="115" y="35" fill="#a8a29e" fontSize="10" fontWeight="bold">I</text>
                            <text x="30" y="35" fill="#a8a29e" fontSize="10" fontWeight="bold">II</text>
                            <text x="30" y="125" fill="#a8a29e" fontSize="10" fontWeight="bold">III</text>
                            <text x="115" y="125" fill="#a8a29e" fontSize="10" fontWeight="bold">IV</text>

                            {/* Centro */}
                            <circle cx="75" cy="75" r="3" fill="#fbbf24" />

                            {/* Línea fija (0 grados - Eje X positivo) */}
                            <line x1="75" y1="75" x2="130" y2="75" stroke="#fbbf24" strokeWidth="2" />

                            {/* Línea rotatoria basada en angCentralValue */}
                            {(() => {
                              const rad = (angCentralValue * Math.PI) / 180;
                              const targetX = 75 + 55 * Math.cos(rad);
                              const targetY = 75 - 55 * Math.sin(rad);
                              return (
                                <>
                                  {/* Línea del ángulo */}
                                  <line x1="75" y1="75" x2={targetX} y2={targetY} stroke="#10b981" strokeWidth="3" />
                                  
                                  {/* Relleno del arco */}
                                  <path 
                                    d={`M 100,75 A 25,25 0 ${angCentralValue > 180 ? 1 : 0},0 ${75 + 25 * Math.cos(rad)},${75 - 25 * Math.sin(rad)}`}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="1.5"
                                    strokeDasharray="2,2"
                                    strokeOpacity="0.8"
                                  />
                                </>
                              );
                            })()}
                          </svg>
                          <div className="absolute top-2 right-2 bg-stone-950 px-2 py-0.5 rounded text-[9px] font-mono font-black text-amber-400">
                            {angCentralValue}°
                          </div>
                        </div>

                        <div className="space-y-3 flex-1 text-left">
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Entrenamiento Guiado</span>
                          <h5 className="text-xs font-black text-stone-100">Práctica: ¿En cuál cuadrante se ubica?</h5>
                          <p className="text-xs text-stone-300">
                            Albert ha girado la manecilla hasta los <strong>{angCentralValue}°</strong>. Observa el plano e indica en cuál de los cuadrantes ha quedado posicionado.
                          </p>
                          
                          <div className="grid grid-cols-4 gap-2 pt-1.5">
                            {['I', 'II', 'III', 'IV'].map(quad => (
                              <button
                                key={quad}
                                onClick={() => checkAngCentral(quad)}
                                className={`py-1.5 rounded-lg font-black text-xs border cursor-pointer transition-all ${
                                  angCentralOption === quad
                                    ? quad === (angCentralValue < 90 ? 'I' : angCentralValue < 180 ? 'II' : angCentralValue < 270 ? 'III' : 'IV')
                                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                                      : 'bg-rose-950 text-rose-400 border-rose-500'
                                    : 'bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-850'
                                }`}
                              >
                                {quad}
                              </button>
                            ))}
                          </div>

                          <div className="flex pt-1">
                            <button
                              onClick={resetAngCentralGame}
                              className="px-3 py-1 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-[10px] font-bold text-stone-400 cursor-pointer flex items-center gap-1"
                            >
                              Girar de nuevo 🔄
                            </button>
                          </div>
                        </div>
                      </div>

                      {angCentralFeedback && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          angCentralFeedback.isCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          {angCentralFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 8: ÁREA Y PERÍMETRO DEL CÍRCULO */}
                  {selectedMathTopic === 'area_perimetro_circulo' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 8 • Fórmulas Geométricas</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Área del Círculo y Perímetro de la Circunferencia</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          ¡Hora de calcular! Recuerde las dos fórmulas maestras utilizando <strong>π ≈ 3.14</strong>:
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-2.5">
                          <div className="p-2.5 bg-stone-950 border border-stone-850 rounded-xl text-center">
                            <span className="text-[9px] font-mono text-amber-400 block font-bold uppercase">Área del Círculo</span>
                            <span className="text-xs font-mono font-black text-stone-200">A = π · r²</span>
                          </div>
                          <div className="p-2.5 bg-stone-950 border border-stone-850 rounded-xl text-center">
                            <span className="text-[9px] font-mono text-teal-400 block font-bold uppercase">Perímetro (Circunferencia)</span>
                            <span className="text-xs font-mono font-black text-stone-200">C = 2 · π · r</span>
                          </div>
                        </div>
                      </div>

                      {/* AREA DE PRÁCTICA */}
                      <div className="flex flex-col md:flex-row items-center gap-6 bg-stone-950 p-5 rounded-2xl border border-stone-850">
                        <div className="relative w-36 h-36 shrink-0 bg-stone-900/60 rounded-full border border-stone-800 flex items-center justify-center p-2">
                          <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
                            {/* Relleno círculo */}
                            <circle cx="60" cy="60" r="45" fill={circlePracticeType === 'area' ? 'rgba(16, 185, 129, 0.15)' : 'none'} stroke="#10b981" strokeWidth="2.5" />
                            {/* Centro */}
                            <circle cx="60" cy="60" r="3.5" fill="#fbbf24" />
                            {/* Radio línea */}
                            <line x1="60" y1="60" x2="105" y2="60" stroke="#fbbf24" strokeWidth="2" strokeDasharray={circlePracticeType === 'perimetro' ? '0' : '2,2'} />
                            {/* Texto r */}
                            <text x="80" y="52" fill="#fbbf24" fontSize="10" fontWeight="bold">r = {circlePracticeRadius}</text>
                          </svg>
                          <div className="absolute bottom-2 bg-stone-950 px-2 py-0.5 rounded text-[8px] font-mono font-black text-emerald-400 uppercase tracking-wide">
                            {circlePracticeType === 'area' ? 'Superficie (Área)' : 'Borde (Perímetro)'}
                          </div>
                        </div>

                        <div className="space-y-3 flex-1 text-left">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Desafío Matemático</span>
                          <h5 className="text-xs font-black text-stone-100 uppercase font-bold">
                            Calcular el {circlePracticeType === 'area' ? 'ÁREA' : 'PERÍMETRO'}
                          </h5>
                          <p className="text-xs text-stone-300">
                            Un círculo tiene un radio <strong>r = {circlePracticeRadius}</strong>. Usando <strong>π = 3.14</strong>, calcula su {circlePracticeType === 'area' ? 'área total' : 'perímetro exterior'} de forma exacta.
                          </p>

                          <div className="flex items-center gap-2 pt-1.5">
                            <input
                              type="text"
                              value={circlePracticeInput}
                              onChange={(e) => setCirclePracticeInput(e.target.value)}
                              placeholder="Ej: 78.5"
                              className="w-32 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              onClick={checkCirclePractice}
                              className="px-4 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                            >
                              Verificar 🔮
                            </button>
                          </div>

                          <button
                            onClick={resetCirclePractice}
                            className="px-3 py-1 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-[10px] font-bold text-stone-400 cursor-pointer"
                          >
                            Otro Círculo 🔄
                          </button>
                        </div>
                      </div>

                      {circlePracticeFeedback && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          circlePracticeFeedback.isCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          {circlePracticeFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 9: EVALUACIÓN DE COMPETENCIAS MEP */}
                  {selectedMathTopic === 'evaluacion_competencias' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 9 • Competencias Especiales MEP</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Evaluación de Competencias Matemáticas</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Resuelva estas dos preguntas específicas del plan nacional para demostrar su absoluto dominio y ganar la Medalla de Honor.
                        </p>
                      </div>

                      {/* PREGUNTA 1: DIVISORES DE 50 */}
                      <div className="bg-stone-950 p-4 border border-stone-850 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🔢</span>
                          <h5 className="text-xs font-black text-stone-100 uppercase tracking-tight">Pregunta 1: Divisores del Número 50</h5>
                        </div>
                        <p className="text-xs text-stone-300">
                          ¿Cuál es la <strong>cantidad total de divisores</strong> que posee el número 50 de forma exacta? (Considere divisores positivos).
                        </p>

                        <div className="flex items-center gap-2.5 pt-1">
                          <input
                            type="number"
                            value={competenciaQ1Input}
                            onChange={(e) => setCompetenciaQ1Input(e.target.value)}
                            placeholder="Cantidad"
                            className="w-24 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            onClick={checkCompetenciaQ1}
                            className="px-4 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                          >
                            Verificar Q1 🎯
                          </button>
                        </div>

                        {competenciaQ1Feedback && (
                          <div className={`p-3 rounded-xl text-xs leading-relaxed border mt-2 ${
                            competenciaQ1Feedback.isCorrect 
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                              : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                          }`}>
                            {competenciaQ1Feedback.text}
                          </div>
                        )}
                      </div>

                      {/* PREGUNTA 2: NÚMERO PERFECTO */}
                      <div className="bg-stone-950 p-4 border border-stone-850 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">👑</span>
                          <h5 className="text-xs font-black text-stone-100 uppercase tracking-tight">Pregunta 2: El Secreto del Número Perfecto</h5>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed font-medium">
                          Un <strong>número perfecto</strong> es igual a la suma de sus divisores propios (excluyendo al propio número). Por ejemplo, el 6 es perfecto porque sus divisores propios son 1, 2 y 3, y 1+2+3 = 6. 
                          <br /><strong className="text-amber-400">¿Cuál de los siguientes números es también un número perfecto?</strong>
                        </p>

                        <div className="grid grid-cols-4 gap-2 pt-1.5">
                          {['12', '18', '28', '50'].map(num => (
                            <button
                              key={num}
                              onClick={() => checkCompetenciaQ2(num)}
                              className={`py-1.5 rounded-lg font-black text-xs border cursor-pointer transition-all ${
                                competenciaQ2Option === num
                                  ? num === '28'
                                    ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                                    : 'bg-rose-950 text-rose-400 border-rose-500'
                                  : 'bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-850'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>

                        {competenciaQ2Feedback && (
                          <div className={`p-3 rounded-xl text-xs leading-relaxed border mt-2 ${
                            competenciaQ2Feedback.isCorrect 
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                              : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                          }`}>
                            {competenciaQ2Feedback.text}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={resetCompetencias}
                          className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                        >
                          Reiniciar Evaluación 🔄
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TEMA 10: METRO CÚBICO Y CONVERSIONES */}
                  {selectedMathTopic === 'metro_cubico_conversiones' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 10 • Conversión de Volumen 3D</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">El Metro Cúbico (m³) y sus Conversiones</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          La unidad principal de volumen es el <strong>metro cúbico (m³)</strong>. Al ser unidades cúbicas, cada paso de la escalera equivale a multiplicar o dividir por <strong>1000</strong>:
                        </p>
                        <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-850 text-center font-mono text-[10px] text-stone-300 mt-2">
                          m³ ➔ (x1000) ➔ dm³ ➔ (x1000) ➔ cm³ ➔ (x1000) ➔ mm³
                        </div>
                      </div>

                      {/* CONVERSION CARD */}
                      <div className="flex flex-col md:flex-row items-center gap-6 bg-stone-950 p-5 rounded-2xl border border-stone-850">
                        <div className="relative w-28 h-28 bg-emerald-950/10 rounded-xl border border-emerald-500/10 flex flex-col items-center justify-center p-3 text-center shrink-0">
                          {/* 3D Cube representation */}
                          <div className="w-12 h-12 border border-emerald-500/30 relative transform rotate-12 flex items-center justify-center">
                            <div className="absolute inset-0 border border-emerald-400/20 translate-x-2 -translate-y-2" />
                            <span className="text-[10px] font-mono font-bold text-emerald-400">1 m³</span>
                          </div>
                        </div>

                        <div className="space-y-3 flex-1 text-left">
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Entrenamiento de Escala</span>
                          <h5 className="text-xs font-black text-stone-100 uppercase">Conversión Interactiva</h5>
                          <p className="text-xs text-stone-300 leading-relaxed">
                            Convertir exactamente <strong>{volumeValue} {volumeFrom}</strong> a la unidad <strong>{volumeTo}</strong>. ¿Cuál es el resultado matemático?
                          </p>

                          <div className="flex items-center gap-2 pt-1.5">
                            <input
                              type="text"
                              value={volumeInput}
                              onChange={(e) => setVolumeInput(e.target.value)}
                              placeholder="Ej: 5000"
                              className="w-36 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                            />
                            <span className="text-xs font-black text-emerald-400">{volumeTo}</span>
                            <button
                              onClick={checkVolumeConversion}
                              className="px-4 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                            >
                              Verificar 📦
                            </button>
                          </div>

                          <button
                            onClick={resetVolumeGame}
                            className="px-3 py-1 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-[10px] font-bold text-stone-400 cursor-pointer"
                          >
                            Generar Nueva Conversión 🔄
                          </button>
                        </div>
                      </div>

                      {volumeFeedback && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          volumeFeedback.isCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          {volumeFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 11: PROPORCIONALIDAD DIRECTA Y REGLA DE TRES */}
                  {selectedMathTopic === 'proporcionalidad_regla_tres' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 11 • Relación de Variables</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Proporcionalidad Directa y Regla de Tres</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          La proporcionalidad directa ocurre cuando al aumentar una cantidad, la otra aumenta en la misma proporción. Se resuelve fácilmente con la <strong>Regla de Tres Simple</strong>.
                        </p>
                      </div>

                      {/* PROBLEM SHEET */}
                      <div className="bg-stone-950 p-5 rounded-2xl border border-stone-850 space-y-4 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-base">⚖️</span>
                          <h5 className="text-xs font-black text-stone-100 uppercase tracking-tight">Problema Escolar MEP</h5>
                        </div>
                        
                        <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-200 leading-relaxed italic">
                          "Si {propQuantity1} {propItem1Name} equivalen a {propQuantity2} {propItem2Name}, ¿cuántos {propItem2Name} equivaldrán exactamente a {propQuantity3} {propItem1Name}?"
                        </div>

                        {/* RULE OF THREE SCHEME VISUAL */}
                        <div className="grid grid-cols-3 gap-2 py-2 max-w-xs mx-auto text-center font-mono text-xs font-bold bg-stone-900/40 p-3 rounded-xl border border-stone-850">
                          <div className="text-stone-400">{propQuantity1}</div>
                          <div className="text-emerald-500">➔</div>
                          <div className="text-amber-400">{propQuantity2}</div>
                          <div className="text-stone-400">{propQuantity3}</div>
                          <div className="text-emerald-500">➔</div>
                          <div className="text-emerald-400 font-black">X</div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <input
                            type="number"
                            value={propInput}
                            onChange={(e) => setPropInput(e.target.value)}
                            placeholder="Anote el valor de X"
                            className="w-40 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            onClick={checkPropGame}
                            className="px-4 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                          >
                            Verificar Regla de 3 ⚖️
                          </button>
                        </div>

                        <button
                          onClick={resetPropGame}
                          className="px-3 py-1 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-[10px] font-bold text-stone-400 cursor-pointer"
                        >
                          Generar Nuevo Problema 🔄
                        </button>
                      </div>

                      {propFeedback && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          propFeedback.isCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          {propFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEMA 12: INTERÉS SIMPLE FINANCIERO */}
                  {selectedMathTopic === 'interes_simple' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-800 pb-3">
                        <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">Tema 12 • Educación Financiera Escolar</span>
                        <h4 className="text-sm font-black uppercase text-stone-100">Cálculo de Interés Simple</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          El interés simple calcula la ganancia de un capital prestado o ahorrado. Se calcula multiplicando: <strong>Capital (C)</strong> por la <strong>Tasa de Interés (i)</strong> por el <strong>Tiempo (t)</strong>.
                        </p>
                        <div className="mt-2.5 p-3 bg-stone-950 border border-stone-850 rounded-xl text-center font-mono text-xs text-stone-200">
                          Fórmula: <strong className="text-amber-400">I = C · i · t</strong>
                        </div>
                      </div>

                      {/* INTEREST SIMULATION CARD */}
                      <div className="bg-stone-950 p-5 rounded-2xl border border-stone-850 space-y-4 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-base">💰</span>
                          <h5 className="text-xs font-black text-stone-100 uppercase tracking-tight">Préstamo o Ahorro</h5>
                        </div>

                        <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 space-y-2 text-xs">
                          <div className="flex justify-between border-b border-stone-850 pb-1.5 text-stone-300">
                            <span>Capital Inicial (C):</span>
                            <span className="font-mono font-bold text-stone-100">₡{interestPrincipal.toLocaleString('es-CR')}</span>
                          </div>
                          <div className="flex justify-between border-b border-stone-850 pb-1.5 text-stone-300">
                            <span>Tasa de Interés Anual (i):</span>
                            <span className="font-mono font-bold text-amber-400">{interestRate}%</span>
                          </div>
                          <div className="flex justify-between pb-1 text-stone-300">
                            <span>Tiempo en Años (t):</span>
                            <span className="font-mono font-bold text-teal-400">{interestYears} {interestYears === 1 ? 'año' : 'años'}</span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-300 font-medium">
                          ¿Cuánto dinero de <strong>interés simple</strong> acumulado se pagará al terminar este plazo?
                        </p>

                        <div className="flex items-center gap-3 pt-1">
                          <input
                            type="number"
                            value={interestInput}
                            onChange={(e) => setInterestInput(e.target.value)}
                            placeholder="Anote el interés"
                            className="w-40 bg-stone-900 border border-stone-800 text-center font-mono text-sm text-stone-100 rounded-lg py-1.5 focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            onClick={checkInterestGame}
                            className="px-4 py-1.5 bg-emerald-600 text-stone-950 text-xs font-black uppercase rounded-lg hover:bg-emerald-500 cursor-pointer"
                          >
                            Calcular Interés 💰
                          </button>
                        </div>

                        <button
                          onClick={resetInterestGame}
                          className="px-3 py-1 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-[10px] font-bold text-stone-400 cursor-pointer"
                        >
                          Generar Nueva Tasa 🔄
                        </button>
                      </div>

                      {interestFeedback && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          interestFeedback.isCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          {interestFeedback.text}
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* VISTA ESPECIALIZADA: CIENCIAS - PRUEBAS ESTANDARIZADAS Y GESTOR DE PDFs */}
            {selectedSubject === 'ciencias' && (
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 md:p-6 text-left space-y-6 max-w-4xl mx-auto shadow-2xl shadow-stone-950">
                {/* HEADER Y NAVEGACIÓN INTERNA DE CIENCIAS */}
                <div className="border-b border-stone-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded font-bold border border-emerald-500/30">
                        MEP SEXTO GRADO 2026
                      </span>
                      <span className="text-xs font-mono bg-teal-500/20 text-teal-300 px-2.5 py-0.5 rounded font-bold border border-teal-500/30">
                        Pruebas Estandarizadas
                      </span>
                    </div>
                    <h3 className="text-lg font-black uppercase text-stone-100 mt-1 flex items-center gap-2">
                      <span>🔬</span>
                      <span>Ciencias - Aula Virtual y Evaluaciones</span>
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Consulta el temario oficial de la Prueba Nacional Estandarizada, adjunta documentos PDF del curso y realiza la evaluación en línea.
                    </p>
                  </div>

                  {/* NAV TABS INTERNOS */}
                  <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-850 shrink-0">
                    <button
                      onClick={() => setActiveScienceTab('temario')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeScienceTab === 'temario'
                          ? 'bg-emerald-600 text-stone-950 shadow-md shadow-emerald-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Temario Oficial</span>
                    </button>

                    <button
                      onClick={() => setActiveScienceTab('pdf_manager')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeScienceTab === 'pdf_manager'
                          ? 'bg-teal-600 text-stone-950 shadow-md shadow-teal-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Adjuntar PDF</span>
                      {uploadedPdfs.length > 0 && (
                        <span className="ml-1 px-1.5 py-0.2 bg-stone-900 text-teal-300 font-mono text-[9px] rounded-full font-bold">
                          {uploadedPdfs.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveScienceTab('evaluaciones')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeScienceTab === 'evaluaciones'
                          ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Evaluación Nivelatorio</span>
                    </button>
                  </div>
                </div>

                {/* SUB-PESTAÑA 1: TEMARIO OFICIAL PRUEBAS ESTANDARIZADAS CIENCIAS */}
                {activeScienceTab === 'temario' && (
                  <div className="space-y-6">
                    <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-850 flex items-start gap-3">
                      <div className="p-2 bg-emerald-950/50 rounded-lg border border-emerald-500/30 shrink-0 text-emerald-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-stone-200">Estructura del Temario Nacional MEP 2026</div>
                        <p className="text-stone-400 leading-relaxed">
                          El temario de Ciencias para 6° grado evalúa 4 unidades principales de aprendizaje. Haz clic en cada unidad para repasar los contenidos, las competencias y la pregunta tipo examen.
                        </p>
                      </div>
                    </div>

                    {/* SELECTOR DE UNIDAD DE TEMARIO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {CIENCIAS_TEMARIO_MEP.map((unit) => {
                        const isSelected = selectedScienceUnit === unit.id;
                        return (
                          <button
                            key={unit.id}
                            onClick={() => setSelectedScienceUnit(unit.id)}
                            className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-950/50 border-emerald-500/50 text-stone-100 shadow-md shadow-emerald-500/10'
                                : 'bg-stone-950 hover:bg-stone-850 border-stone-850 text-stone-400'
                            }`}
                          >
                            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase block">
                              Unidad {unit.unitNumber}
                            </span>
                            <h4 className="text-xs font-black uppercase text-stone-100 line-clamp-1 mt-0.5">
                              {unit.title}
                            </h4>
                            <p className="text-[10px] text-stone-400 line-clamp-2 mt-1">
                              {unit.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* DETALLE DE LA UNIDAD SELECCIONADA */}
                    {(() => {
                      const currentUnit = CIENCIAS_TEMARIO_MEP.find(u => u.id === selectedScienceUnit) || CIENCIAS_TEMARIO_MEP[0];
                      return (
                        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-850 space-y-5">
                          <div className="border-b border-stone-850 pb-3 flex items-center justify-between">
                            <div>
                              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">
                                Unidad {currentUnit.unitNumber} de Ciencias • MEP
                              </span>
                              <h4 className="text-sm font-black text-stone-100 uppercase mt-0.5">
                                {currentUnit.title}
                              </h4>
                            </div>
                            <span className="text-[10px] font-mono bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30 text-emerald-300">
                              Prueba Estandarizada
                            </span>
                          </div>

                          <p className="text-xs text-stone-300 leading-relaxed">
                            {currentUnit.description}
                          </p>

                          {/* TOPICS LIST */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                              Contenidos Fundamentales a Evaluar:
                            </span>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              {currentUnit.topics.map((topic, idx) => (
                                <li key={idx} className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 text-stone-300 flex items-start gap-2">
                                  <span className="text-emerald-400 font-black">✓</span>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* MEP COMPETENCIES */}
                          <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-800 space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-teal-300 uppercase">
                              Competencias Oficiales del Programa de Estudios MEP:
                            </span>
                            <ul className="list-disc list-inside text-xs text-stone-400 space-y-1">
                              {currentUnit.mepStandardCompetencies.map((comp, idx) => (
                                <li key={idx}>{comp}</li>
                              ))}
                            </ul>
                          </div>

                          {/* SAMPLE EXAM QUESTION */}
                          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                                <FileCheck className="w-3.5 h-3.5" />
                                Ejercicio Modelo de Prueba Estandarizada:
                              </span>
                            </div>
                            <p className="text-xs font-bold text-stone-200">
                              "{currentUnit.sampleQuestion}"
                            </p>
                            <div className="text-xs text-emerald-300 bg-stone-950 p-3 rounded-lg border border-emerald-500/20 leading-relaxed">
                              <strong>Respuesta explicada:</strong> {currentUnit.sampleAnswer}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* SUB-PESTAÑA 2: ADJUNTAR / GESTOR DE DOCUMENTOS PDF */}
                {activeScienceTab === 'pdf_manager' && (
                  <div className="space-y-6">
                    <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-850 flex items-start gap-3">
                      <div className="p-2 bg-teal-950/50 rounded-lg border border-teal-500/30 shrink-0 text-teal-400">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-stone-200">Módulo de Carga de Archivos y Temarios en PDF</div>
                        <p className="text-stone-400 leading-relaxed">
                          Puedes adjuntar aquí cualquier documento PDF (ej. Temarios del MEP, guías de práctica o resúmenes de Ciencias). El sistema procesará los contenidos y los incorporará a tus evaluaciones virtuales.
                        </p>
                      </div>
                    </div>

                    {/* PDF UPLOAD DROPZONE */}
                    <div className="border-2 border-dashed border-stone-800 hover:border-teal-500/50 bg-stone-950/40 p-6 rounded-2xl text-center space-y-3 transition-colors relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        disabled={isUploadingPdf}
                      />
                      <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto text-teal-400">
                        <FileUp className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-stone-200">
                          {isUploadingPdf ? 'Procesando y Analizando PDF...' : 'Haz clic o arrastra aquí tu archivo PDF'}
                        </h4>
                        <p className="text-[11px] text-stone-400 mt-1">
                          Formatos soportados: Documentos PDF de Ciencias o Guías MEP (Máx. 25 MB)
                        </p>
                      </div>

                      {isUploadingPdf && (
                        <div className="flex items-center justify-center gap-2 text-xs text-teal-300 font-mono pt-2">
                          <span className="animate-spin">⏳</span>
                          <span>Extrayendo temas y vinculando preguntas al aula...</span>
                        </div>
                      )}
                    </div>

                    {pdfUploadSuccessMsg && (
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pdfUploadSuccessMsg}</span>
                      </div>
                    )}

                    {/* LIST OF ATTACHED PDF DOCUMENTS */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase text-stone-200 flex items-center gap-1.5">
                          <Paperclip className="w-4 h-4 text-teal-400" />
                          <span>Documentos PDF Vincularos ({uploadedPdfs.length})</span>
                        </h4>
                        <span className="text-[10px] font-mono text-stone-400">
                          Integración Activa con Evaluaciones
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {uploadedPdfs.map((pdf) => (
                          <div
                            key={pdf.id}
                            className="p-4 bg-stone-950 rounded-xl border border-stone-850 hover:border-stone-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2.5 bg-rose-950/40 border border-rose-500/30 text-rose-400 rounded-lg shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="font-bold text-stone-100 flex items-center gap-2 flex-wrap">
                                  <span>{pdf.name}</span>
                                  <span className="px-2 py-0.5 bg-teal-950 text-teal-300 font-mono text-[9px] rounded border border-teal-500/30">
                                    {pdf.subject}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-mono text-stone-400">
                                  <span>Tamaño: {pdf.size}</span>
                                  <span>•</span>
                                  <span>{pdf.pageCount} páginas</span>
                                  <span>•</span>
                                  <span>Cargado: {pdf.uploadDate}</span>
                                </div>
                                <div className="pt-1 flex flex-wrap gap-1">
                                  {pdf.extractedTopics.map((top, tIdx) => (
                                    <span key={tIdx} className="text-[9px] bg-stone-900 text-stone-300 px-2 py-0.5 rounded border border-stone-800">
                                      {top}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => setPreviewPdf(pdf)}
                                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-xs font-bold text-stone-300 flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Vista Previa</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveScienceTab('evaluaciones');
                                  setEinsteinMessage(`¡Genial! Hemos aplicado la guía "${pdf.name}" a las evaluaciones de Ciencias.`);
                                }}
                                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-stone-950 rounded-lg text-xs font-black uppercase flex items-center gap-1 cursor-pointer"
                              >
                                <FileCheck className="w-3.5 h-3.5" />
                                <span>Ver en Evaluación</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-PESTAÑA 3: EVALUACIONES - SIMULADOR PRUEBAS ESTANDARIZADAS CIENCIAS */}
                {activeScienceTab === 'evaluaciones' && (
                  <div className="space-y-6">
                    <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-850 flex items-start gap-3 justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-950/50 rounded-lg border border-amber-500/30 shrink-0 text-amber-400">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="font-bold text-stone-200">Examen de Pruebas Estandarizadas MEP - Ciencias 6° Grado</div>
                          <p className="text-stone-400 leading-relaxed">
                            Responde las 10 preguntas preparadas según la tabla de especificaciones del Ministerio de Educación Pública (MEP). Aprueba con al menos 70% para desbloquear tu medalla nacional.
                          </p>
                        </div>
                      </div>

                      {scienceExamSubmitted && (
                        <button
                          onClick={handleResetScienceExam}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 font-mono text-xs font-bold rounded-lg cursor-pointer shrink-0"
                        >
                          Reintentar Examen 🔄
                        </button>
                      )}
                    </div>

                    {/* SCORE BOARD WHEN SUBMITTED */}
                    {scienceExamSubmitted && (
                      <div className={`p-5 rounded-2xl border text-center space-y-2 ${
                        scienceExamScore >= 70
                          ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                          : 'bg-amber-950/50 border-amber-500/40 text-amber-200'
                      }`}>
                        <div className="text-3xl font-black font-mono">
                          {scienceExamScore}%
                        </div>
                        <h4 className="text-sm font-black uppercase">
                          {scienceExamScore >= 70 ? '¡Aprobado con Excelencia MEP!' : 'Revisión Necesaria'}
                        </h4>
                        <p className="text-xs opacity-90 max-w-lg mx-auto leading-relaxed">
                          {scienceExamScore >= 70
                            ? 'Has demostrado un dominio sólido del temario de Ciencias de sexto grado. Tu medalla oficial ha sido registrada en el medallero.'
                            : 'Revisa las respuestas correctas y sus explicaciones detalladas abajo para reforzar tus conocimientos.'}
                        </p>
                      </div>
                    )}

                    {/* QUESTIONS LIST */}
                    <div className="space-y-4">
                      {CIENCIAS_EXAM_QUESTIONS.map((q, idx) => {
                        const selectedOpt = scienceExamAnswers[idx];
                        const isAnswered = selectedOpt !== undefined;

                        return (
                          <div
                            key={q.id}
                            className="bg-stone-950 p-5 rounded-2xl border border-stone-850 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/20">
                                Pregunta {idx + 1} de {CIENCIAS_EXAM_QUESTIONS.length} • {q.topicTitle}
                              </span>
                              {scienceExamSubmitted && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                                  selectedOpt === q.correctIdx
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                                }`}>
                                  {selectedOpt === q.correctIdx ? '✓ Correcto' : '✗ Incorrecto'}
                                </span>
                              )}
                            </div>

                            <p className="text-xs font-bold text-stone-100 leading-relaxed">
                              {q.question}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {q.options.map((option, oIdx) => {
                                const isThisSelected = selectedOpt === oIdx;
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => handleAnswerScienceExam(idx, oIdx)}
                                    disabled={scienceExamSubmitted}
                                    className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                                      isThisSelected
                                        ? scienceExamSubmitted
                                          ? oIdx === q.correctIdx
                                            ? 'bg-emerald-950/60 text-emerald-200 border-emerald-500/50 font-bold'
                                            : 'bg-rose-950/60 text-rose-200 border-rose-500/50 font-bold'
                                          : 'bg-amber-950/60 text-amber-200 border-amber-500/50 font-bold'
                                        : scienceExamSubmitted && oIdx === q.correctIdx
                                        ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30'
                                        : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-stone-800'
                                    }`}
                                  >
                                    <span className="font-mono font-bold mr-2 text-stone-400">
                                      {String.fromCharCode(65 + oIdx)})
                                    </span>
                                    <span>{option}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {scienceExamSubmitted && (
                              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 text-[11px] text-stone-300 leading-relaxed mt-2">
                                <strong className="text-emerald-400">Explicación Oficial MEP:</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {!scienceExamSubmitted && (
                      <div className="text-center pt-3">
                        <button
                          onClick={handleSubmitScienceExam}
                          disabled={Object.keys(scienceExamAnswers).length < CIENCIAS_EXAM_QUESTIONS.length}
                          className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all shadow-lg ${
                            Object.keys(scienceExamAnswers).length < CIENCIAS_EXAM_QUESTIONS.length
                              ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                              : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20 cursor-pointer'
                          }`}
                        >
                          {Object.keys(scienceExamAnswers).length < CIENCIAS_EXAM_QUESTIONS.length
                            ? `Responde todas las preguntas (${Object.keys(scienceExamAnswers).length}/${CIENCIAS_EXAM_QUESTIONS.length})`
                            : 'Enviar Examen y Calificar 📝'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TRIVIA INTERACTIVA PARA ESPAÑOL */}
            {selectedSubject === 'espanol' && (
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-left space-y-4 max-w-xl mx-auto">
                <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-mono text-amber-400 font-bold uppercase">Repaso Oficial MEP</span>
                    <h4 className="text-sm font-black uppercase text-stone-100">
                      Trivia Interactiva de ESPAÑOL
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-stone-400">
                    Pregunta {triviaIdx + 1} de {TRIVIA_DATA.espanol?.length || 3}
                  </span>
                </div>

                {(() => {
                  const questions = TRIVIA_DATA.espanol;
                  if (!questions || questions.length === 0) return null;
                  const currentQ = questions[triviaIdx];

                  return (
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-stone-200">
                        {currentQ.question}
                      </p>

                      <div className="grid grid-cols-1 gap-2 pt-2">
                        {currentQ.options.map((opt, oIdx) => {
                          const isSelected = selectedTriviaOption === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswerTrivia(oIdx)}
                              className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                                isSelected
                                  ? oIdx === currentQ.answerIdx
                                    ? 'bg-emerald-950/45 text-emerald-300 border-emerald-500/40 font-bold'
                                    : 'bg-rose-950/45 text-rose-300 border-rose-500/40'
                                  : triviaIsAnswered && oIdx === currentQ.answerIdx
                                  ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20'
                                  : 'bg-stone-950 hover:bg-stone-850 text-stone-300 border-stone-850/60'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {triviaIsAnswered && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                          triviaIsCorrect 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/20'
                        }`}>
                          <div className="flex items-center gap-2 font-bold mb-1">
                            {triviaIsCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                            {triviaIsCorrect ? '¡Correcto!' : '¡Aprende con Albert!'}
                          </div>
                          <p className="mb-2">{currentQ.explanation}</p>
                          <button
                            onClick={handleNextTrivia}
                            className="px-3.5 py-1.5 bg-stone-950 hover:bg-stone-850 text-stone-200 border border-stone-800 text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1 ml-auto"
                          >
                            Siguiente Pregunta <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* MÓDULO OFICIAL Y PRÁCTICA COMPLETA DE ESTUDIOS SOCIALES (GUERRA 1948 Y ESTADO BENEFACTOR) */}
            {selectedSubject === 'sociales' && (
              <EstudiosSociales1948Practice
                onUnlockMedal={unlockMedal}
                onAskEinstein={(question) => {
                  setActiveTab('inicio');
                  setEinsteinMessage(`¡Hola mi genio! Me preguntaste sobre "${question}". Te explico con orgullo: En 1948 Costa Rica abolió su ejército para invertir en educación y salud. Se fundaron instituciones como el ICE, INVU, AyA y la CCSS, llevando luz eléctrica, agua pura y vacunas a todos los hogares. ¡Pregúntame cualquier duda de tu examen!`);
                  speak(`¡Hola mi genio! En 1948 Costa Rica abolió su ejército para invertir en educación y salud.`);
                }}
              />
            )}

          </motion.div>
        )}

        {/* PESTAÑA PRINCIPAL: ESTUDIOS SOCIALES 1948 & ESTADO BIENESTAR (ACCESO DIRECTO) */}
        {activeTab === 'sociales_1948' && (
          <motion.div
            key="sociales-1948-main-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 text-left"
          >
            <EstudiosSociales1948Practice
              onUnlockMedal={unlockMedal}
              onAskEinstein={(question) => {
                setActiveTab('inicio');
                setEinsteinMessage(`¡Hola mi genio! Me preguntaste sobre "${question}". Te explico con gusto: En 1948 Costa Rica abolió su ejército y apostó por la educación y la salud, creando instituciones como el ICE, INVU, AyA y la CCSS.`);
                speak(`¡Hola mi genio! En 1948 Costa Rica abolió su ejército y apostó por la educación y la salud.`);
              }}
            />
          </motion.div>
        )}

        {/* PESTAÑA: GEOMETRÍA, POLÍGONOS & PIZARRA LIBRE DE TRAZO */}
        {activeTab === 'geometria' && (
          <motion.div
            key="geometria-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 text-left"
          >
            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-800/50 uppercase">
                    MEP 6° Grado • Geometría Oficial
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    ★ Pizarra Interactiva & Sellos de Polígonos
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <Shapes className="w-5 h-5 text-cyan-400" />
                  <span>Estudio de Polígonos, Figuras y Pizarra Libre de Trazo</span>
                </h4>
                <p className="text-xs text-stone-300">
                  Traza con el lápiz o el dedo, usa la cuadrícula, estampa heptágonos, hexágonos, triángulos, cuadrados o círculos, y resuelve los retos con Albert Einstein para desbloquear medallas.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    const url = getShareableUrl('geometria');
                    navigator.clipboard.writeText(url);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2500);
                  }}
                  className="px-3 py-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? '¡Enlace Copiado! ✓' : 'Compartir Esta Pizarra'}</span>
                </button>
              </div>
            </div>

            <GeometryStudio
              onAddXp={(points, reason) => {
                unlockMedal('med_geometria', 'Medalla de Geometría, Polígonos & Dibujo Libre');
              }}
              onAskEinstein={(question) => {
                setActiveTab('inicio');
                setEinsteinMessage(`¡Hola mi genio! Me preguntaste sobre ${question}. Te explico paso a paso: En un polígono regular todos los lados miden exactamente lo mismo. El perímetro es sumar todos sus lados (o multiplicar n × lado), y el área se obtiene multiplicando el perímetro por la apotema y dividiendo entre dos. ¡Intenta trazarlo en la pizarra!`);
                speak(`¡Hola mi genio! En un polígono regular todos los lados miden lo mismo. El perímetro es la suma de sus lados y el área es perímetro por apotema dividido entre dos.`);
              }}
            />
          </motion.div>
        )}

        {/* PESTAÑA 3: JUEGOS Y MEDALLERO RECOMPENSA */}
        {activeTab === 'juegos_premios' && (
          <motion.div
            key="premios-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* PANEL DE MEDALLAS DESBLOQUEADAS */}
            <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl p-5 text-left space-y-4">
              <span className="text-[8px] font-mono uppercase bg-emerald-950/80 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/30 font-bold block w-fit">
                COLECCIÓN DE LOGROS ADQUIRIDOS
              </span>
              <h3 className="text-sm font-black text-stone-100 uppercase tracking-tight">
                Mis Medallas de Sexto Grado
              </h3>
              <p className="text-xs text-stone-400">
                Resuelva los temas del examen de Matemáticas, Español, Ciencias y Estudios Sociales para desbloquear cada una de las 15 medallas e insignias escolares del MEP oficiales de Costa Rica.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'med_multiplos', title: '🥇 Oro Pitágoras', desc: 'Múltiplos y Divisores' },
                  { id: 'med_primos', title: '🥈 Plata de Primos', desc: 'Primos y Compuestos' },
                  { id: 'med_potencias', title: '⚡ Energía Cuántica', desc: 'Potencias y Base 10' },
                  { id: 'med_circulo', title: '⭕ Círculo Infinito', desc: 'Circunferencia y Círculo' },
                  { id: 'med_segmentos', title: '📐 Geometría Euclid', desc: 'Segmentos Notables' },
                  { id: 'med_divisiones', title: '➗ División Perfecta', desc: 'Divisiones con/sin Frac' },
                  { id: 'med_angulos', title: '📐 Ángulos y Giros', desc: 'Ángulo Central y Cuadrantes' },
                  { id: 'med_area_circulo', title: '🌀 Señor del Círculo', desc: 'Área y Perímetro Circular' },
                  { id: 'med_competencias', title: '👑 Genio Competente', desc: 'Divisores 50 y Perfección' },
                  { id: 'med_metro_cubico', title: '📦 Maestro de Volumen', desc: 'Metro Cúbico y Conversiones' },
                  { id: 'med_regla_tres', title: '⚖️ Regla del Saber', desc: 'Proporcionalidad y Regla de 3' },
                  { id: 'med_interes_simple', title: '💰 Pequeño Financiero', desc: 'Cálculo de Interés Simple' },
                  { id: 'med_sociales_1948', title: '🇨🇷 Bicentenario 1948', desc: 'Guerra 1948 & Estado Benefactor' },
                  { id: 'med_instituciones_bienestar', title: '🏛️ Constructora Nacional', desc: 'Instituciones Autónomas' },
                  { id: 'med_einstein_master', title: '🏆 Gran Copa Einstein', desc: 'Campeón contra Albert' }
                ].map(medal => {
                  const isUnlocked = unlockedMedals.includes(medal.id);
                  return (
                    <div
                      key={medal.id}
                      className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                        isUnlocked
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-stone-100'
                          : 'bg-stone-950/40 border-stone-850/60 text-stone-500 opacity-60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                        isUnlocked 
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30 animate-pulse' 
                          : 'bg-stone-900 border-stone-800'
                      }`}>
                        {isUnlocked ? <Award className="w-5 h-5 text-amber-400" /> : <Star className="w-5 h-5 text-stone-600" />}
                      </div>
                      <div className="text-left font-sans space-y-0.5">
                        <span className={`text-[11px] font-black uppercase block ${isUnlocked ? 'text-amber-400' : 'text-stone-500'}`}>
                          {medal.title}
                        </span>
                        <span className="text-[9px] font-mono text-stone-400 block">{medal.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* JUEGO: GATO MATEMÁTICO CONTRA ALBERT */}
            <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-5 text-left space-y-4 relative">
              <span className="text-[8px] font-mono uppercase bg-amber-950/60 text-amber-400 px-2.5 py-0.5 rounded border border-amber-900/30 font-bold block w-fit">
                ZONA DE JUEGO & RECOMPENSA
              </span>
              <h3 className="text-sm font-black text-stone-100 uppercase tracking-tight flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-emerald-400 animate-spin" />
                Gato Matemático contra Albert Einstein
              </h3>
              <p className="text-xs text-stone-400">
                ¡Demuestra tu intelecto escolar! Haz clic en "Iniciar Partida", selecciona una casilla e intenta ganarle al Gato de Einstein respondiendo correctamente problemas de Matemáticas oficiales de 6° Grado.
              </p>

              {!tttIsActive ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 bg-stone-950 rounded-2xl border border-stone-850">
                  <span className="text-4xl">🎲</span>
                  <p className="text-xs font-mono text-stone-400">¿Estás listo para desafiar al científico más famoso?</p>
                  <button
                    onClick={startTttGame}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-stone-950 text-xs font-black uppercase rounded-xl cursor-pointer hover:opacity-90 shadow-lg"
                  >
                    Iniciar Partida de Gato 🎮
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* BARRA DE STATUS */}
                  <div className="p-3 bg-stone-950 rounded-xl border border-stone-850 text-xs font-mono text-stone-300 text-center leading-relaxed">
                    {tttStatusMessage}
                  </div>

                  {/* TABLERO DE GATO */}
                  <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto pt-2">
                    {tttBoard.map((cell, idx) => (
                      <button
                        key={idx}
                        disabled={cell !== '' || tttWinner !== null || tttActiveCellIndex !== null}
                        onClick={() => handleTttCellClick(idx)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border flex items-center justify-center font-sans text-3xl font-black transition-all cursor-pointer ${
                          cell === 'X'
                            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-400'
                            : cell === 'O'
                            ? 'bg-amber-950/30 border-amber-500/50 text-amber-400'
                            : tttActiveCellIndex === idx
                            ? 'bg-stone-950 border-emerald-400 animate-pulse'
                            : 'bg-stone-950 border-stone-850 hover:bg-stone-850 text-stone-300'
                        }`}
                      >
                        {cell}
                      </button>
                    ))}
                  </div>

                  {/* MODAL DE PREGUNTA INTERACTIVA (SI SELECCIONA CASILLA) */}
                  <AnimatePresence>
                    {tttActiveCellIndex !== null && tttActiveQuestion && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-stone-950 rounded-xl border border-emerald-500/20 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Pregunta del Tablero</span>
                          <span className="text-[8px] font-mono text-stone-500">Celda {tttActiveCellIndex + 1}</span>
                        </div>
                        <p className="text-xs font-bold text-stone-200">
                          {tttActiveQuestion.q}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {tttActiveQuestion.opt.map((option, opIdx) => {
                            const isChosen = tttSelectedOption === opIdx;
                            return (
                              <button
                                key={opIdx}
                                disabled={tttQuestionAnswered}
                                onClick={() => handleAnswerTttQuestion(opIdx)}
                                className={`p-2.5 rounded-lg text-xs text-left font-medium border transition-all cursor-pointer ${
                                  isChosen
                                    ? opIdx === tttActiveQuestion.ansIdx
                                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                                      : 'bg-rose-950 text-rose-300 border-rose-500'
                                    : tttQuestionAnswered && opIdx === tttActiveQuestion.ansIdx
                                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900'
                                    : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-stone-800'
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CONTROLES EXTRA */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={startTttGame}
                      className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-400 font-mono text-xs rounded-xl border border-stone-800 cursor-pointer"
                    >
                      Reiniciar Tablero 🔄
                    </button>
                    <button
                      onClick={() => setTttIsActive(false)}
                      className="px-4 py-2 bg-stone-950 hover:bg-stone-850 text-stone-500 font-mono text-xs rounded-xl border border-stone-850 cursor-pointer"
                    >
                      Salir del Juego
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* MODAL DE VISTA PREVIA DE DOCUMENTO PDF */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="text-xs font-black text-stone-100 line-clamp-1">{previewPdf.name}</h3>
                  <span className="text-[10px] text-stone-400 font-mono">{previewPdf.size} • {previewPdf.pageCount} páginas • {previewPdf.uploadDate}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewPdf(null)}
                className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-left">
              <div className="p-4 bg-teal-950/30 border border-teal-500/30 rounded-xl space-y-2">
                <span className="text-[10px] font-mono font-bold text-teal-300 uppercase">
                  Análisis Automático de IA para Sexto Grado:
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Documento escaneado y procesado exitosamente. Se identificaron <strong>{previewPdf.pageCount} páginas</strong> de contenidos curriculares alineados al Programa Oficial de Ciencias del Ministerio de Educación Pública (MEP).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black text-stone-200 uppercase font-mono">
                  Índice de Contenidos Extraídos:
                </h4>
                <ul className="space-y-2 text-xs">
                  {previewPdf.extractedTopics.map((topic, idx) => (
                    <li key={idx} className="p-3 bg-stone-950 rounded-xl border border-stone-850 text-stone-300 flex items-start gap-2">
                      <span className="text-teal-400 font-bold">📄 Pág. {idx * 3 + 1}:</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-850 space-y-2">
                <h5 className="text-xs font-bold text-stone-300">Vinculación con las Evaluaciones del Aula:</h5>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Las preguntas de selección única y rúbricas diagnósticas de este PDF han sido sincronizadas con el simulador de <strong>Pruebas Estandarizadas de Ciencias</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-end gap-3">
              <button
                onClick={() => setPreviewPdf(null)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 text-xs font-bold rounded-xl border border-stone-800 cursor-pointer"
              >
                Cerrar Vista Previa
              </button>
              <button
                onClick={() => {
                  setPreviewPdf(null);
                  setActiveScienceTab('evaluaciones');
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-stone-950 text-xs font-black uppercase rounded-xl cursor-pointer"
              >
                Ir a las Evaluaciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
