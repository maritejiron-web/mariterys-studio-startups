// Temario Oficial MEP 6° Grado - Estudios Sociales
// Tema: La Guerra de 1948, Características y Logros del Estado de Bienestar (Benefactor),
// Impacto en la Vida Cotidiana, Retos de la Sociedad Costarricense y Espacios de Participación Ciudadana.

export interface StudyCard {
  id: string;
  unit: string;
  unitNumber: number;
  title: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  einsteinTip: string;
  realLifeImpact: string;
  iconName: string;
}

export interface SocialQuestion {
  id: string;
  unit: string;
  topic: 'guerra_1948' | 'estado_bienestar' | 'vida_cotidiana' | 'retos_sociedad' | 'participacion_ciudadana';
  question: string;
  options: [string, string, string, string];
  answerIdx: number;
  explanation: string;
  einsteinAdvice: string;
}

export interface InstitutionMatchItem {
  id: string;
  acronym: string;
  fullName: string;
  foundedYear: string;
  mission: string;
  icon: string;
  color: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'politica' | 'bienestar' | 'derechos' | 'sociedad';
}

export const ESTUDIOS_SOCIALES_TIMELINE: TimelineEvent[] = [
  {
    year: '1940 - 1943',
    title: 'Garantías Sociales y Código de Trabajo',
    description: 'Bajo el gobierno de Rafael Ángel Calderón Guardia, Monseñor Sanabria y Manuel Mora se crea la CCSS (1941), la Universidad de Costa Rica (1940) y el Código de Trabajo (1943).',
    category: 'derechos'
  },
  {
    year: 'Feb - Abr 1948',
    title: 'Guerra Civil de 1948 (Revolución del 48)',
    description: 'Conflicto armado de 44 días tras la anulación de las elecciones presidenciales por parte del Congreso. José Figueres Ferrer lidera el Ejército de Liberación Nacional.',
    category: 'politica'
  },
  {
    year: '1 Dic 1948',
    title: 'Abolición del Ejército Nacional',
    description: 'En el Cuartel Bellavista (hoy Museo Nacional), don Pepe Figueres da un mazazo histórico al muro derribando el ejército y apostando por más maestros y escuelas.',
    category: 'politica'
  },
  {
    year: '1948',
    title: 'Nacionalización de la Banca',
    description: 'El Estado asume el control de los depósitos bancarios para democratizar el crédito agrario e industrial para pequeños y medianos productores del país.',
    category: 'bienestar'
  },
  {
    year: '7 Nov 1949',
    title: 'Constitución Política de 1949',
    description: 'Crea el Tribunal Supremo de Elecciones (TSE) como árbitro electoral independiente, otorga el derecho al voto universal a la mujer y prohíbe el ejército permanente.',
    category: 'derechos'
  },
  {
    year: '1949',
    title: 'Creación del ICE (Instituto Costarricense de Electricidad)',
    description: 'Inicia el ambicioso plan de electrificación y telefonía nacional, aprovechando la fuerza hidroeléctrica de los ríos para iluminar hogares costarricenses.',
    category: 'bienestar'
  },
  {
    year: '1954',
    title: 'Creación del INVU (Vivienda y Urbanismo)',
    description: 'Se impulsa la construcción de barriadas planificadas, viviendas de interés social y erradicación de tugurios para dar techo propio a miles de familias trabajadoras.',
    category: 'bienestar'
  },
  {
    year: '1959',
    title: 'Aprobación de la Ley del Aguinaldo',
    description: 'Se establece por ley el derecho de todo trabajador costarricense a recibir un salario adicional en diciembre (el decimotercer mes) para celebrar fin de año.',
    category: 'derechos'
  },
  {
    year: '1961',
    title: 'Creación de Acueductos y Alcantarillados (AyA)',
    description: 'Se generaliza el agua potable por tubería a pueblos rurales y urbanos, disminuyendo drásticamente la mortalidad infantil por parásitos y diarreas.',
    category: 'bienestar'
  },
  {
    year: 'Siglo XXI',
    title: 'Desafíos Actuales: Retos Ciudadanos',
    description: 'Erradicación de la pobreza, cierre de la brecha digital, protección de cuencas de agua, equidad de género y fortalecimiento de la participación comunitaria.',
    category: 'sociedad'
  }
];

export const ESTUDIOS_SOCIALES_CARDS: StudyCard[] = [
  {
    id: 'card-1',
    unit: 'Unidad 1',
    unitNumber: 1,
    title: 'La Guerra Civil de 1948 y la Transformación Nacional',
    badge: 'Historia Política MEP',
    iconName: 'Shield',
    summary: 'La Guerra Civil de 1948 (llamada la Revolución del 48) fue un conflicto armado de 44 días que cambió para siempre la historia y las leyes de Costa Rica.',
    keyPoints: [
      'Causa principal: El 8 de febrero de 1948 se celebraron elecciones donde ganó Otilio Ulate Blanco sobre Rafael Ángel Calderón Guardia. El 1 de marzo, el Congreso Nacional anuló las elecciones alegando fraude y la quema de papeletas en el Colegio Superior de Señoritas.',
      'El conflicto: Don José Figueres Ferrer lideró el Ejército de Liberación Nacional desde la finca "La Lucha" en San Cristóbal de Desamparados.',
      'Fin del conflicto: Se firmaron el Pacto de Ochomogo (con Manuel Mora Valverde) y el Pacto de la Embajada de México (con Teodoro Picado) para evitar la destrucción de San José.',
      'Junta Fundadora de la Segunda República: Gobernó transitoriamente durante 18 meses para redactar nuevas leyes y restaurar el orden democrático.',
      'Hito mundial (1 de diciembre de 1948): Abolición del ejército. Don Pepe Figueres dio un mazazo simbólico en el Cuartel Bellavista, entregando las llaves al Museo Nacional de Costa Rica.',
      'Constitución Política de 1949: Promulgada el 7 de noviembre de 1949; aprobó el derecho al voto femenino (las mujeres votaron por primera vez en La Tigra de San Carlos en 1950) y fundó el Tribunal Supremo de Elecciones (TSE).'
    ],
    einsteinTip: '¡Recuerda siempre esta frase del 1 de diciembre de 1948: "En Costa Rica cambiamos los fusiles por cuadernos y maestros." ¡Es la pregunta favorita en los exámenes del MEP!',
    realLifeImpact: 'Gracias a la abolición del ejército, los fondos públicos que otros países gastan en armas, tanques y soldados se destinan en Costa Rica a construir escuelas, colegios, universidades y hospitales de la CCSS.'
  },
  {
    id: 'card-2',
    unit: 'Unidad 2',
    unitNumber: 2,
    title: 'El Estado Benefactor (o de Bienestar): Características y Logros',
    badge: 'Modelo Solidario de Desarrollo',
    iconName: 'Building',
    summary: 'El Estado Benefactor o Gestor es un modelo donde el gobierno no es un simple espectador, sino el principal motor que promueve el desarrollo económico justo, la salud, la vivienda y la educación de todos los habitantes.',
    keyPoints: [
      'Nacionalización Bancaria (1948): El Estado tomó el control de los depósitos en bancos para que el crédito no fuera privilegio de unos pocos ricos, sino que llegara a campesinos, cooperativas y productores de café, caña y granos.',
      'ICE (1949): El Instituto Costarricense de Electricidad llevó redes eléctricas y plantas hidroeléctricas a todo el país, eliminando las velas y faroles de carbón.',
      'INVU (1954): El Instituto Nacional de Vivienda y Urbanismo planificó barrios ordenados y entregó casas dignas a bajo costo a familias de clase trabajadora.',
      'CNP: El Consejo Nacional de Producción garantizó precios justos a los agricultores nacionales (comprando cosechas de frijoles, maíz y arroz) y abasteció los estantes del pueblo.',
      'AyA (1961): El Instituto de Acueductos y Alcantarillados instaló cañerías de agua limpia y potable en casi todo el territorio nacional.',
      'CCSS Universal: Se universalizaron los seguros de enfermedad y maternidad y el régimen de pensiones de Invalidez, Vejez y Muerte (IVM).'
    ],
    einsteinTip: 'Para recordar las instituciones del Estado Benefactor usa esta regla mnemotécnica: "Luz (ICE), Techo (INVU), Comida (CNP), Agua (AyA), Salud (CCSS) y Democracia (TSE)".',
    realLifeImpact: 'Hizo nacer la gran clase media costarricense: hijos de jornaleros y campesinos pudieron convertirse en ingenieros, profesoras, médicos y científicos gracias a la educación y servicios públicos.'
  },
  {
    id: 'card-3',
    unit: 'Unidad 3',
    unitNumber: 3,
    title: 'Impacto del Estado de Bienestar en la Vida Cotidiana',
    badge: 'Vida Diaria de las Familias',
    iconName: 'Home',
    summary: 'El Estado de Bienestar transformó de raíz la vida de los costarricenses en sus casas, campos, escuelas y centros de trabajo a partir de 1948.',
    keyPoints: [
      'En el hogar: Llegada de la luz eléctrica (refrigeradoras para conservar comida, planchas eléctricas, radio para informarse) y agua potable por tubería dentro de la casa (reducción de diarreas y parásitos).',
      'En la salud infantil y de adultos: Campañas masivas de vacunación gratuita contra la viruela, polio y sarampión. La esperanza de vida subió de 46 años en 1940 a más de 76 años.',
      'En el trabajo: Consolidación de la jornada máxima de 8 horas diarias, día de descanso semanal, vacaciones pagadas, cesantía y la Ley del Aguinaldo (1959) que asegura un mes extra de sueldo en diciembre.',
      'En la educación pública: Se crearon escuelas en pueblos alejados, colegios vocacionales técnicos e instituciones como el ITCR (1971), UNA (1973) y UNED (1977).',
      'Acceso a vivienda propia: Miles de familias dejaron de pagar alquileres abusivos o vivir en hacinamiento gracias a los créditos y residenciales del INVU.'
    ],
    einsteinTip: 'Pregunta típica de examen MEP: ¿Cómo cambió la salud en la vida cotidiana tras 1948? Respuesta: Aumentó la esperanza de vida y se redujo drásticamente la mortalidad infantil gracias a la vacunación y al agua potable del AyA.',
    realLifeImpact: 'Tener una refrigeradora en casa, abrir la llave y tomar agua limpia del tubo sin enfermarse, y recibir atención en una clínica u hospital cercano son conquistas directas del Estado Benefactor.'
  },
  {
    id: 'card-4',
    unit: 'Unidad 4',
    unitNumber: 4,
    title: 'Desafíos y Retos de la Sociedad Costarricense Actual',
    badge: 'Problemáticas y Metas del País',
    iconName: 'TrendingUp',
    summary: 'A pesar de los grandes logros del pasado, la Costa Rica contemporánea enfrenta serios desafíos que todos los ciudadanos debemos ayudar a resolver con solidaridad y justicia.',
    keyPoints: [
      'Pobreza y Desigualdad: Aproximadamente 1 de cada 5 hogares costarricenses (cerca del 20%) vive en situación de pobreza, existiendo una marcada brecha entre familias ricas y vulnerables.',
      'Desempleo y Subempleo: Dificultad de muchas personas, especialmente jóvenes y mujeres, para encontrar trabajos formales con seguro y salario justo.',
      'Brecha Regional y Digital: Las zonas rurales y costeras (Puntarenas, Guanacaste, Limón, Zona Norte y Sur) tienen menos acceso a internet de alta velocidad, colegios bilingües y fuentes de empleo que la Gran Área Metropolitana (GAM).',
      'Deterioro de la Infraestructura Pública: Carreteras saturadas, puentes en mal estado y hospitales con largas listas de espera.',
      'Protección Ambiental y Cuencas de Agua: Amenaza de contaminación de mantos acuíferos por pesticidas, exceso de plásticos de un solo uso y los impactos del cambio climático.',
      'Inclusión Social y Equidad de Género: Necesidad de garantizar los mismos salarios a las mujeres, proteger los territorios y culturas indígenas, y ofrecer oportunidades a personas con discapacidad.'
    ],
    einsteinTip: 'En el examen te preguntarán por "la brecha territorial": recuerda que describe la desigualdad de oportunidades entre el centro del país (GAM) y las costas o zonas fronterizas.',
    realLifeImpact: 'Reconocer estos desafíos nos permite ser ciudadanos responsables, proteger nuestros recursos naturales y buscar que todas las personas tengan una vida digna y justa.'
  },
  {
    id: 'card-5',
    unit: 'Unidad 5',
    unitNumber: 5,
    title: 'Espacios de Participación Ciudadana y Convivencia Democrática',
    badge: 'Democracia Viva en la Comunidad',
    iconName: 'Users',
    summary: 'La democracia costarricense no termina en las urnas electorales cada cuatro años; se practica activamente todos los días en la comunidad, la escuela y el barrio.',
    keyPoints: [
      'Asociaciones de Desarrollo Integral (ADI): Grupos de vecinas y vecinos organizados que gestionan mejoras para su barrio: construyen salones comunales, parques, asfaltado de calles y luminarias.',
      'Juntas de Educación y Patronatos Escolares: Madres, padres de familia y docentes que administran los comedores estudiantiles, el transporte escolar, las becas y la infraestructura de las escuelas.',
      'Comités Cantonales de Deportes y Recreación (CCDR): Promueven canchas multiuso, torneos de fútbol, básquetbol, atletismo y zumba para alejar a los jóvenes de los vicios y fomentar la salud.',
      'Gobiernos Estudiantiles: Práctica democrática en las escuelas donde los alumnos votan, eligen representantes, dialogan y defienden los derechos de los niños.',
      'ASADAS (Asociaciones Administradoras de Acueductos Rurales): Comunidades que cuidan sus propios pozos y nacientes de agua para llevar agua pura a las casas de los pueblos.',
      'Voluntariado y Grupos Cívicos: Brigadas de la Cruz Roja, comités de emergencia, grupos de rescate animal y comités de limpieza de playas y ríos.'
    ],
    einsteinTip: 'Pregunta de examen: ¿Qué espacio de participación ciudadana ayuda a mantener la escuela y su comedor? Respuesta: Las Juntas de Educación y los Patronatos Escolares.',
    realLifeImpact: 'Participar en la comunidad nos empodera: cuando los ciudadanos colaboran con respeto y diálogo, las calles son más seguras, las escuelas mejores y el país más fuerte y unido.'
  }
];

export const INSTITUCIONES_ESTADO_BIENESTAR: InstitutionMatchItem[] = [
  {
    id: 'ice',
    acronym: 'ICE',
    fullName: 'Instituto Costarricense de Electricidad',
    foundedYear: '1949',
    mission: 'Llevar energía eléctrica y telecomunicaciones a todos los hogares, escuelas y campos del territorio nacional.',
    icon: 'Zap',
    color: 'amber'
  },
  {
    id: 'invu',
    acronym: 'INVU',
    fullName: 'Instituto Nacional de Vivienda y Urbanismo',
    foundedYear: '1954',
    mission: 'Planificar el crecimiento urbano, construir ciudadelas y dar vivienda propia a familias trabajadoras humildes.',
    icon: 'Home',
    color: 'emerald'
  },
  {
    id: 'aya',
    acronym: 'AyA',
    fullName: 'Instituto Costarricense de Acueductos y Alcantarillados',
    foundedYear: '1961',
    mission: 'Suministrar agua potable pura y segura por tuberías y construir sistemas de saneamiento sanitario.',
    icon: 'Droplets',
    color: 'cyan'
  },
  {
    id: 'cnp',
    acronym: 'CNP',
    fullName: 'Consejo Nacional de Producción',
    foundedYear: '1948',
    mission: 'Comprar cosechas a precios justos a los agricultores nacionales y garantizar el abastecimiento de granos básicos.',
    icon: 'Wheat',
    color: 'yellow'
  },
  {
    id: 'ccss',
    acronym: 'CCSS',
    fullName: 'Caja Costarricense de Seguro Social',
    foundedYear: '1941 / Universal 1948+',
    mission: 'Brindar atención médica, hospitales, medicamentos, vacunación y pensiones dignas de vejez e invalidez a toda la población.',
    icon: 'HeartPulse',
    color: 'rose'
  },
  {
    id: 'tse',
    acronym: 'TSE',
    fullName: 'Tribunal Supremo de Elecciones',
    foundedYear: '1949',
    mission: 'Garantizar elecciones democráticas transparentes, imparciales y libres, otorgar la cédula de identidad y tutelar el voto.',
    icon: 'Vote',
    color: 'purple'
  }
];

export const PREGUNTAS_EXAMEN_SOCIALES_1948: SocialQuestion[] = [
  // --- GUERRA DE 1948 ---
  {
    id: 'soc-1948-1',
    unit: 'Unidad 1',
    topic: 'guerra_1948',
    question: '¿Cuál fue el hecho detonante directo que desató la Guerra Civil de 1948 en Costa Rica?',
    options: [
      'La invasión de corsarios extranjeros por la costa del Pacífico.',
      'La anulación de las elecciones presidenciales por parte del Congreso Nacional tras la victoria de Otilio Ulate.',
      'La construcción del ferrocarril al Atlántico.',
      'El cierre definitivo de la Universidad de Costa Rica.'
    ],
    answerIdx: 1,
    explanation: 'El 1 de marzo de 1948, el Congreso anuló las elecciones presidenciales del 8 de febrero argumentando fraude y quema de papeletas, desconociendo el triunfo de Otilio Ulate. Esto llevó a José Figueres a alzarse en armas.',
    einsteinAdvice: '¡Exacto! Cuando se rompe la voluntad popular en las urnas electorales, se desencadena la crisis política.'
  },
  {
    id: 'soc-1948-2',
    unit: 'Unidad 1',
    topic: 'guerra_1948',
    question: '¿Qué acontecimiento trascendental para la paz de Costa Rica se llevó a cabo el 1 de diciembre de 1948 en el Cuartel Bellavista?',
    options: [
      'La firma de la independencia de Centroamérica.',
      'La abolición formal del ejército por don José Figueres Ferrer.',
      'La inauguración del Canal de Panamá.',
      'El nombramiento de Juan Santamaría como Benemérito de la Patria.'
    ],
    answerIdx: 1,
    explanation: 'El 1 de diciembre de 1948, don Pepe Figueres dio un histórico mazazo en el muro del Cuartel Bellavista, aboliendo las fuerzas armadas y transformando ese cuartel en el actual Museo Nacional de Costa Rica.',
    einsteinAdvice: '¡Memorable! Costa Rica decidió invertir su presupuesto en educación y salud en lugar de tanques y fusiles militares.'
  },
  {
    id: 'soc-1948-3',
    unit: 'Unidad 1',
    topic: 'guerra_1948',
    question: '¿Qué órgano electoral independiente fue creado por la Constitución Política de 1949 para garantizar que nunca más hubiera fraude en las votaciones costarricenses?',
    options: [
      'La Contraloría General de la República.',
      'El Tribunal Supremo de Elecciones (TSE).',
      'El Banco Central de Costa Rica.',
      'La Corte Interamericana de Derechos Humanos.'
    ],
    answerIdx: 1,
    explanation: 'La Constitución de 1949 le otorgó al TSE rango de poder de la República, totalmente independiente del gobierno, para organizar, contar y proclamar con transparencia los votos de los ciudadanos.',
    einsteinAdvice: '¡Excelente! El TSE es el custodio de la pureza del sufragio costarricense.'
  },
  {
    id: 'soc-1948-4',
    unit: 'Unidad 1',
    topic: 'guerra_1948',
    question: '¿Qué conquista democrática fundamental para la igualdad ciudadana fue aprobada formalmente en la Constitución de 1949?',
    options: [
      'El voto exclusivo para terratenientes y dueños de fincas.',
      'El derecho al voto universal para las mujeres y la población afrocostarricense.',
      'La obligación de realizar servicio militar obligatorio a los 18 años.',
      'La prohibición de fundar escuelas públicas mixtas.'
    ],
    answerIdx: 1,
    explanation: 'La Constitución de 1949 reconoció el sufragio femenino. Las mujeres costarricenses ejercieron por primera vez su derecho al voto en el plebiscito de La Tigra y La Fortuna de San Carlos en 1950.',
    einsteinAdvice: '¡Histórico! Las mujeres representan más de la mitad del país y su voto consolidó la verdadera democracia.'
  },

  // --- CARACTERÍSTICAS Y LOGROS DEL ESTADO DE BIENESTAR ---
  {
    id: 'soc-1948-5',
    unit: 'Unidad 2',
    topic: 'estado_bienestar',
    question: '¿Por qué la Junta Fundadora de la Segunda República decretó la Nacionalización de la Banca en 1948?',
    options: [
      'Para cerrar todas las cuentas de ahorros de la población.',
      'Para que el crédito estuviera al servicio del desarrollo y llegara a los pequeños agricultores y cooperativas.',
      'Para prohibir la compra y venta de café al extranjero.',
      'Para cobrar impuestos únicamente a los campesinos.'
    ],
    answerIdx: 1,
    explanation: 'Al nacionalizar los depósitos bancarios, el Estado garantizó que el dinero ahorrado por el pueblo se prestara con bajas tasas de interés a productores agrícolas, industriales y cooperativas en todo el país.',
    einsteinAdvice: '¡Así es! Democratizar el crédito permitió que la riqueza se distribuyera entre más sectores productivos.'
  },
  {
    id: 'soc-1948-6',
    unit: 'Unidad 2',
    topic: 'estado_bienestar',
    question: '¿Cuál fue la institución autónoma fundada en 1949 con el propósito de electrificar todo el territorio nacional mediante energías limpias hidroeléctricas?',
    options: [
      'El Instituto Nacional de Aprendizaje (INA).',
      'El Instituto Costarricense de Electricidad (ICE).',
      'El Instituto Costarricense de Turismo (ICT).',
      'La Junta de Protección Social (JPS).'
    ],
    answerIdx: 1,
    explanation: 'El ICE fue creado en 1949 bajo la visión de Jorge Manuel Dengo, aprovechando los ríos del país para generar electricidad y llevar la luz a pueblos alejados.',
    einsteinAdvice: '¡Brillante! El ICE iluminó los hogares y escuelas de Costa Rica, permitiendo el desarrollo industrial y doméstico.'
  },
  {
    id: 'soc-1948-7',
    unit: 'Unidad 2',
    topic: 'estado_bienestar',
    question: '¿Qué institución creada en 1954 tuvo como misión erradicar los tugurios y brindar viviendas dignas y seguras a las familias de clase trabajadora?',
    options: [
      'El INVU (Instituto Nacional de Vivienda y Urbanismo).',
      'El Registro Nacional.',
      'El Ministerio de Seguridad Pública.',
      'La Refinadora Costarricense de Petróleo (RECOPE).'
    ],
    answerIdx: 0,
    explanation: 'El INVU impulsó residenciales y urbanizaciones planificadas, otorgando casas con cuotas mensuales muy accesibles a familias que antes vivían alquilando en condiciones precarias.',
    einsteinAdvice: '¡Muy bien! Un techo propio es la base del bienestar y la seguridad de cada familia.'
  },
  {
    id: 'soc-1948-8',
    unit: 'Unidad 2',
    topic: 'estado_bienestar',
    question: '¿Qué papel fundamental desempeñó el Consejo Nacional de Producción (CNP) durante el Estado Benefactor?',
    options: [
      'Exportar armas a otros países de Centroamérica.',
      'Asegurar precios justos y estables a los productores de granos básicos y abastecer al pueblo con alimentos.',
      'Construir aeropuertos internacionales en las playas.',
      'Administrar los parques nacionales y volcanes.'
    ],
    answerIdx: 1,
    explanation: 'El CNP compraba cosechas de frijol, maíz y arroz a precios garantizados para que el agricultor no perdiera dinero, vendiendo luego los productos a precios solidarios en los estancos del pueblo.',
    einsteinAdvice: '¡Excelente memoria! La seguridad alimentaria protege a la población frente a las crisis mundiales.'
  },

  // --- IMPACTO EN LA VIDA COTIDIANA ---
  {
    id: 'soc-1948-9',
    unit: 'Unidad 3',
    topic: 'vida_cotidiana',
    question: '¿De qué manera el acceso a la electricidad del ICE y al agua potable de AyA transformó la vida diaria de las familias en las décadas de 1950 y 1960?',
    options: [
      'Obligó a las familias a volver a cocinar solo con leña en fogones abiertos.',
      'Permitió usar electrodomésticos (refrigeradora, plancha, radio) y redujo drásticamente las infecciones diarreicas y muertes infantiles.',
      'Provocó que la población dejara de asistir a las escuelas rurales.',
      'Hizo que las personas tuvieran que mudarse obligatoriamente a otros países.'
    ],
    answerIdx: 1,
    explanation: 'La electricidad permitió conservar los alimentos en refrigeradoras y facilitó el trabajo en el hogar, mientras que el agua potable por cañería eliminó los parásitos y bacterias que causaban alta mortalidad infantil.',
    einsteinAdvice: '¡Científicamente comprobado! El agua potable y la luz eléctrica salvaron miles de vidas infantiles en Costa Rica.'
  },
  {
    id: 'soc-1948-10',
    unit: 'Unidad 3',
    topic: 'vida_cotidiana',
    question: '¿Qué importante beneficio salarial para celebrar las fiestas de fin de año fue aprobado por ley en 1959 para todos los trabajadores asalariados de Costa Rica?',
    options: [
      'El impuesto al valor agregado.',
      'La Ley del Aguinaldo (decimotercer mes de salario).',
      'El descuento obligatorio de la póliza de desempleo.',
      'El vale para compras exclusivas de café.'
    ],
    answerIdx: 1,
    explanation: 'En diciembre de 1959 se aprobó la Ley del Aguinaldo, que otorga a cada trabajador un salario completo adicional al cierre de año, dinamizando la economía familiar y el comercio navideño.',
    einsteinAdvice: '¡Así es! El aguinaldo es una conquista social que alegra las fiestas y apoya la economía de los hogares.'
  },
  {
    id: 'soc-1948-11',
    unit: 'Unidad 3',
    topic: 'vida_cotidiana',
    question: '¿Por qué se dice que el Estado Benefactor originó y consolidó una amplia "clase media" en Costa Rica?',
    options: [
      'Porque prohibió a las familias tener más de un automóvil.',
      'Porque gracias a la educación pública gratuita y empleos en instituciones autónomas, hijos de campesinos se graduaron como profesionales.',
      'Porque todas las personas recibían exactamente el mismo salario.',
      'Porque el gobierno regalaba fincas gigantes a las familias.'
    ],
    answerIdx: 1,
    explanation: 'La movilidad social fue real: personas de orígenes humildes pudieron estudiar en colegios y universidades públicas gratuitas, consiguiendo empleos calificados como maestros, ingenieros, enfermeras y contadores.',
    einsteinAdvice: '¡La educación es la mayor palanca de ascenso social que tiene un país democrático!'
  },
  {
    id: 'soc-1948-12',
    unit: 'Unidad 3',
    topic: 'vida_cotidiana',
    question: '¿Cómo impactó la universalización de la Caja Costarricense de Seguro Social (CCSS) en la esperanza de vida de los costarricenses?',
    options: [
      'La redujo a menos de 40 años por falta de medicinas.',
      'La elevó notablemente, pasando de unos 46 años en 1940 a más de 76 años en las últimas décadas del siglo XX.',
      'No tuvo ningún impacto, se mantuvo exactamente igual.',
      'Solo benefició a las personas que vivían cerca de San José.'
    ],
    answerIdx: 1,
    explanation: 'Gracias a hospitales modernos, clínicas en comunidades rurales (EBAIS) y esquemas completos de vacunación, Costa Rica alcanzó indicadores de salud infantil y longevidad comparables a países desarrollados.',
    einsteinAdvice: '¡Un logro que admiramos en todo el planeta! La salud universal alarga la vida y previene epidemias.'
  },

  // --- RETOS DE LA SOCIEDAD COSTARRICENSE ---
  {
    id: 'soc-1948-13',
    unit: 'Unidad 4',
    topic: 'retos_sociedad',
    question: '¿Cuál es uno de los principales retos socioeconómicos que Costa Rica arrastra y busca superar en la actualidad?',
    options: [
      'Tener un ejército militar demasiado costoso.',
      'La persistencia de cerca del 20% de familias en pobreza y la desigualdad en la distribución del ingreso.',
      'La falta de ríos y volcanes en el territorio nacional.',
      'Haber ganado muy pocas medallas en olimpiadas de ajedrez.'
    ],
    answerIdx: 1,
    explanation: 'A pesar del desarrollo, aproximadamente una de cada cinco familias costarricenses no tiene ingresos suficientes para satisfacer sus necesidades básicas, siendo la pobreza y desigualdad el gran desafío pendiente.',
    einsteinAdvice: '¡Cierto! Una sociedad solo es verdaderamente próspera cuando nadie se queda rezagado en la miseria.'
  },
  {
    id: 'soc-1948-14',
    unit: 'Unidad 4',
    topic: 'retos_sociedad',
    question: '¿A qué se refiere el término "brecha territorial o regional" en los desafíos contemporáneos de Costa Rica?',
    options: [
      'A las diferencias de clima entre San José y Guanacaste.',
      'A la gran desigualdad en oportunidades de empleo, internet, educación e infraestructura entre el Valle Central y las costas/zonas rurales.',
      'A la distancia en kilómetros entre el Océano Pacífico y el Mar Caribe.',
      'Al tamaño de las parcelas donde se siembra piña y banano.'
    ],
    answerIdx: 1,
    explanation: 'Las provincias costeras (Puntarenas, Limón, Guanacaste) y fronterizas sufren mayor desempleo y menor inversión educativa y tecnológica que las provincias centrales del país, requiriendo atención prioritaria.',
    einsteinAdvice: '¡Muy bien analizado! La patria debe ofrecer las mismas oportunidades a una niña de Limón que a un niño de San José.'
  },
  {
    id: 'soc-1948-15',
    unit: 'Unidad 4',
    topic: 'retos_sociedad',
    question: 'En materia ambiental, ¿cuál es un desafío crítico que enfrenta Costa Rica en el siglo XXI?',
    options: [
      'Tener demasiados árboles y plantas en los parques nacionales.',
      'La contaminación de los ríos y mantos acuíferos por desechos plásticos, aguas negras y agroquímicos.',
      'El exceso de lluvias en los bosques nubosos de Monteverde.',
      'El cierre voluntario de las minas de carbón.'
    ],
    answerIdx: 1,
    explanation: 'Aunque Costa Rica tiene fama de país verde por sus bosques protegidos, la gran mayoría de sus ríos en las ciudades están contaminados y se deben proteger las nacientes de agua dulce para las futuras generaciones.',
    einsteinAdvice: '¡Cuidar el agua es cuidar la vida! Sin agua limpia ningún Estado de Bienestar puede sostenerse.'
  },

  // --- ESPACIOS DE PARTICIPACIÓN CIUDADANA ---
  {
    id: 'soc-1948-16',
    unit: 'Unidad 5',
    topic: 'participacion_ciudadana',
    question: '¿Qué organización comunal democrática reúne a los vecinos de un barrio para gestionar arreglos en caminos, salones comunales y áreas recreativas?',
    options: [
      'Las Asociaciones de Desarrollo Integral (ADI).',
      'La Asamblea Legislativa.',
      'El Banco Mundial.',
      'El Ministerio de Relaciones Exteriores.'
    ],
    answerIdx: 0,
    explanation: 'Las Asociaciones de Desarrollo Integral (ADI) son la máxima expresión comunitaria local donde vecinos elegidos en asamblea trabajan voluntariamente por el progreso de su localidad.',
    einsteinAdvice: '¡Perfecto! La comunidad unida logra proyectos que benefician a todas las familias del vecindario.'
  },
  {
    id: 'soc-1948-17',
    unit: 'Unidad 5',
    topic: 'participacion_ciudadana',
    question: '¿Qué papel fundamental cumplen las Juntas de Educación y los Patronatos Escolares en las escuelas de primaria costarricenses?',
    options: [
      'Aplicar exámenes sorpresa y calificar a los profesores.',
      'Administrar los recursos del comedor estudiantil, mantenimiento físico de la escuela y programas de transporte y becas.',
      'Dictar las leyes de la República en el Congreso.',
      'Decidir el precio del combustible en las gasolineras.'
    ],
    answerIdx: 1,
    explanation: 'Las Juntas y Patronatos están integrados por madres, padres y miembros de la comunidad escolar que velan para que no falte comida caliente en el comedor ni pupitres en las aulas.',
    einsteinAdvice: '¡Exacto! El bienestar de la niñez en la escuela depende directamente del trabajo de estas juntas solidarias.'
  },
  {
    id: 'soc-1948-18',
    unit: 'Unidad 5',
    topic: 'participacion_ciudadana',
    question: '¿Qué espacio de participación ciudadana y deportiva existe en cada cantón para promover canchas, torneos deportivos y recreación saludable?',
    options: [
      'El Comité Cantonal de Deportes y Recreación (CCDR).',
      'La Cámara de Bancos Privados.',
      'El Instituto Geográfico Nacional.',
      'El Tribunal Contencioso Administrativo.'
    ],
    answerIdx: 0,
    explanation: 'Los Comités Cantonales de Deportes y Recreación dependen de las Municipalidades y fomentan la actividad física en niños, jóvenes y adultos mayores para prevenir enfermedades y vicios.',
    einsteinAdvice: '¡Mente sana en cuerpo sano! El deporte comunitario fortalece la convivencia pacífica.'
  },
  {
    id: 'soc-1948-19',
    unit: 'Unidad 5',
    topic: 'participacion_ciudadana',
    question: '¿Cómo aprenden los niños en la escuela primaria a vivir la democracia y los valores cívicos costarricenses?',
    options: [
      'Memorizando discursos sin poder opinar nunca en clase.',
      'Participando activamente en las elecciones de Gobiernos Estudiantiles, asambleas de aula y proyectos de servicio escolar.',
      'Pagando multas si no se presentan a desfilar el 15 de setiembre.',
      'Esperando a tener 18 años para poder dialogar con los maestros.'
    ],
    answerIdx: 1,
    explanation: 'En las elecciones estudiantiles los niños forman partidos, presentan propuestas, debaten con respeto y votan en urnas secretas, preparándose para ser ciudadanos éticos y participativos.',
    einsteinAdvice: '¡La democracia se aprende practicándola con respeto, tolerancia y propuestas constructivas!'
  },
  {
    id: 'soc-1948-20',
    unit: 'Unidad 5',
    topic: 'participacion_ciudadana',
    question: '¿Por qué la participación ciudadana en Costa Rica va mucho más allá de simplemente votar cada cuatro años en elecciones presidenciales?',
    options: [
      'Porque votar en elecciones ya no es obligatorio ni necesario.',
      'Porque una democracia madura requiere que los ciudadanos vigilen el uso de los fondos públicos, cuiden el ambiente y colaboren en su comunidad día a día.',
      'Porque solo los alcaldes tienen derecho a opinar sobre los problemas comunales.',
      'Porque los problemas comunales se resuelven solos con el paso de los años.'
    ],
    answerIdx: 1,
    explanation: 'El involucramiento activo de la ciudadanía en voluntariado, ASADAS, comités escolares y rendición de cuentas fortalece las instituciones y evita que se pierdan las conquistas del Estado de Bienestar.',
    einsteinAdvice: '¡Sabias palabras! Un pueblo vigilante, solidario y educado es el mayor tesoro de una nación en paz.'
  }
];
