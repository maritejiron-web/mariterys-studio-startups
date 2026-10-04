import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'course-fs',
    title: 'Carrera de Ingeniería de Software & Full Stack Developer',
    description: 'De cero a Senior. Aprenda arquitectura de bases de datos, APIs robustas en Node.js, interfaces reactivas modernas en React, despliegues DevOps y optimización de latencia. Disponible en cómodas mensualidades de ₡35,000.',
    priceCRC: 180000,
    priceUSD: 349,
    durationHours: 120,
    difficulty: 'Intermedio',
    instructor: 'Instructora de la Academia',
    iconName: 'GraduationCap',
    colorTheme: 'from-amber-500 to-amber-900',
    modules: [
      {
        title: 'Módulo 1: Frontend Moderno y React 19',
        duration: '35 horas',
        topics: [
          {
            title: 'Virtual DOM, JSX y Hooks avanzados',
            content: 'React utiliza un Virtual DOM para optimizar las actualizaciones de UI. En este nivel dominaremos hooks clave como useState, useEffect, y el nuevo hook use de React 19, evitando ciclos infinitos de re-renderizado.',
            codeSnippet: `import { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}`,
            quizQuestion: {
              question: '¿Por qué no se debe actualizar el estado directamente dentro del cuerpo de un componente de React?',
              options: [
                'Porque genera un error de compilación instantáneo en TypeScript.',
                'Porque provoca re-renders infinitos al evaluar el estado recursivamente.',
                'Porque deshabilita el recolector de basura del navegador.'
              ],
              answerIndex: 1,
              explanation: 'Actualizar el estado en el cuerpo del componente dispara un re-render inmediato, el cual vuelve a ejecutar el cuerpo y vuelve a actualizar el estado, creando un ciclo infinito.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Backend Asíncrono de Alto Desempeño',
        duration: '45 horas',
        topics: [
          {
            title: 'Express, Middlewares y Controladores',
            content: 'Node.js ejecuta JavaScript en el servidor mediante un bucle de eventos asíncronos monohilo. Diseñaremos controladores REST limpios con inyección de dependencias implícita y manejo centralizado de excepciones.',
            codeSnippet: `import express from 'express';\nconst app = express();\n\napp.use(express.json());\n\napp.post('/api/v1/users', (req, res) => {\n  const { username } = req.body;\n  res.status(201).json({ status: 'user_created', username });\n});`,
            quizQuestion: {
              question: '¿Qué ventaja principal aporta la arquitectura monohilo asíncrona de Node.js?',
              options: [
                'Facilidad para ejecutar tareas computacionales intensivas de CPU en paralelo.',
                'Alta eficiencia en operaciones de Entrada/Salida (I/O) sin bloquear hilos del sistema.',
                'Elimina la necesidad de usar bases de datos relacionales.'
              ],
              answerIndex: 1,
              explanation: 'El bucle de eventos delega operaciones I/O al sistema operativo, permitiendo que un único hilo atienda miles de conexiones entrantes concurrentes de forma eficiente.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-react',
    title: 'Especialización Avanzada en React 19 & Tailwind CSS',
    description: 'Domine el diseño de interfaces de usuario atómicas, estados reactivos ultra-rápidos con Zustand, animaciones fluidas por hardware y optimización de renderizados.',
    priceCRC: 95000,
    priceUSD: 185,
    durationHours: 40,
    difficulty: 'Avanzado',
    instructor: 'Instructora de la Academia',
    iconName: 'Cpu',
    colorTheme: 'from-blue-500 to-indigo-950',
    modules: [
      {
        title: 'Módulo 1: Tailwind CSS y Arquitectura Atómica',
        duration: '15 horas',
        topics: [
          {
            title: 'Layouts Reactivos y Optimización CSS',
            content: 'Utilice el poder de Tailwind para construir sistemas de diseño basados en tokens sin escribir archivos de estilos separados. Entienda cómo combinar clases con utilidades como cn() utilizando clsx y tailwind-merge.',
            codeSnippet: `import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`,
            quizQuestion: {
              question: '¿Cuál es la función principal de tailwind-merge en un proyecto de React?',
              options: [
                'Convertir código TypeScript a clases CSS nativas.',
                'Combinar clases de Tailwind resolviendo conflictos de precedencia de forma automática.',
                'Inyectar estilos globales directamente en el head del documento.'
              ],
              answerIndex: 1,
              explanation: 'tailwind-merge asegura que la última clase aplicada sobreescriba correctamente las clases anteriores (ej. "bg-red-500 bg-blue-500" se resuelve correctamente a "bg-blue-500").'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: State Managers Minimalistas con Zustand',
        duration: '25 horas',
        topics: [
          {
            title: 'Sustituyendo Redux con Zustand',
            content: 'Zustand ofrece una gestión de estado global sumamente veloz mediante cierres de función nativos, sin necesidad de envolver la aplicación en un Context Provider complejo.',
            codeSnippet: `import { create } from 'zustand';\n\ninterface CartStore {\n  itemsCount: number;\n  addItem: () => void;\n}\n\nexport const useCartStore = create<CartStore>((set) => ({\n  itemsCount: 0,\n  addItem: () => set((state) => ({ itemsCount: state.itemsCount + 1 })),\n}));`,
            quizQuestion: {
              question: '¿Por qué Zustand rinde mejor que React Context por defecto?',
              options: [
                'Porque almacena el estado en la nube directamente.',
                'Porque previene que los componentes que no están suscritos a campos específicos se vuelvan a renderizar.',
                'Porque autocompila el JavaScript a código WebAssembly.'
              ],
              answerIndex: 1,
              explanation: 'Zustand permite seleccionar porciones específicas del estado mediante selectores. Los componentes solo se re-renderizan si el valor retornado por el selector cambia.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-nodejs',
    title: 'Desarrollo Backend Profesional con Node.js & Express',
    description: 'Aprenda a construir microservicios rápidos, seguros, con validaciones automatizadas, autenticación JWT, hashing bcrypt y bases de datos relacionales en la nube.',
    priceCRC: 110000,
    priceUSD: 215,
    durationHours: 50,
    difficulty: 'Intermedio',
    instructor: 'Instructora de la Academia',
    iconName: 'Server',
    colorTheme: 'from-emerald-600 to-teal-950',
    modules: [
      {
        title: 'Módulo 1: Autenticación Segura y JWT',
        duration: '20 horas',
        topics: [
          {
            title: 'Estrategias de Token y Seguridad de Cabeceras',
            content: 'JWT (JSON Web Tokens) permite autenticar peticiones de forma apátrida (stateless). Utilice firmas criptográficas HS256 y guarde tokens en cookies httpOnly para mitigar ataques XSS.',
            codeSnippet: `import jwt from 'jsonwebtoken';\n\nconst token = jwt.sign(\n  { userId: 'u123', email: 'user@domain.com' },\n  process.env.JWT_SECRET || 'secreto',\n  { expiresIn: '2h' }\n);`,
            quizQuestion: {
              question: '¿Qué ventaja clave provee guardar un JWT en una cookie httpOnly en comparación con localStorage?',
              options: [
                'El token es cifrado automáticamente por la tarjeta de red.',
                'Previene que scripts de terceros de JavaScript leer el token directamente, protegiendo contra XSS.',
                'Habilita la compresión de datos gzip por defecto.'
              ],
              answerIndex: 1,
              explanation: 'Las cookies httpOnly no pueden ser leídas por la API de JavaScript en el navegador (document.cookie), reduciendo la posibilidad de robo de tokens por scripts maliciosos inyectados.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-graphic-design',
    title: 'Carrera Profesional de Diseño Gráfico Digital & Comunicación Visual',
    description: 'La carrera completa de Diseño Gráfico de 6 meses de duración (pago mensual de ₡35,000). Domine composición, teoría del color, ilustración vectorial, retoque fotográfico digital, diseño editorial de impacto, manuales de marca institucional y prototipado UI/UX en Figma.',
    priceCRC: 35000,
    priceUSD: 68,
    durationHours: 180,
    difficulty: 'Principiante',
    instructor: 'Instructora de la Academia',
    iconName: 'Palette',
    colorTheme: 'from-fuchsia-500 to-pink-950',
    modules: [
      {
        title: 'Mes 1: Composición Visual & Teoría de Color',
        duration: '30 horas',
        topics: [
          {
            title: 'Psicología del color, contraste cromático y proporción áurea',
            content: 'El color no es meramente estético, sino una herramienta de comunicación psicológica y de marca. Aprenderemos las diferencias entre modelos RGB (pantallas) y CMYK (impresión), contraste tonal, y el uso de retículas basadas en la proporción áurea para distribuir el espacio visual de forma balanceada.',
            codeSnippet: `/* Configuración de variables de color con tokens semánticos modernos */\n:root {\n  --color-primary: #ec4899; /* Fuchsia */\n  --color-secondary: #f43f5e; /* Rose */\n  --color-accent: #f59e0b; /* Amber */\n  --color-background-dark: #0c0a09; /* Stone */\n  --font-display: 'Outfit', sans-serif;\n}`,
            quizQuestion: {
              question: '¿Cuál es la diferencia primordial entre el modelo de color RGB y el modelo CMYK?',
              options: [
                'RGB se utiliza para diseño de impresión industrial y CMYK es el estándar exclusivo de Apple.',
                'RGB es un modelo aditivo de luz ideal para pantallas digitales, mientras que CMYK es un modelo sustractivo de tintas físicas optimizado para impresión.',
                'RGB es únicamente blanco y negro, mientras que CMYK provee color completo de alta densidad cromática.'
              ],
              answerIndex: 1,
              explanation: 'El modelo RGB (Red, Green, Blue) es el espectro de luz emitido por pantallas. El modelo CMYK (Cyan, Magenta, Yellow, Key/Black) se basa en la absorción y reflejo de luz de pigmentos físicos impresos sobre papel o tela.'
            }
          }
        ]
      },
      {
        title: 'Mes 2: Ilustración Vectorial con Adobe Illustrator',
        duration: '30 horas',
        topics: [
          {
            title: 'Curvas de Bézier, nodos y diseño geométrico de logotipos',
            content: 'La ilustración vectorial representa formas mediante fórmulas matemáticas de puntos, líneas y curvas. Aprenderemos a esculpir iconos icónicos con la herramienta pluma de Illustrator, combinando círculos áureos y retículas constructivas mediante lógica booleana de busca-trazos, permitiendo re-escalar cualquier elemento al infinito sin perder calidad.',
            codeSnippet: `<!-- Estructura de un icono SVG vectorial de alta fidelidad dibujado con código semántico -->\n<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="50" cy="50" r="40" stroke="#ec4899" stroke-width="8" />\n  <path d="M35 50 L45 60 L65 40" stroke="#f43f5e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />\n</svg>`,
            quizQuestion: {
              question: '¿Por qué se prefiere el formato vectorial (SVG/EPS) sobre el formato de mapa de bits (PNG/JPG) al diseñar la marca gráfica de una empresa?',
              options: [
                'Porque las imágenes vectoriales se pueden escalar a cualquier tamaño (desde un sticker hasta una valla en carretera) sin pixelarse ni degradarse.',
                'Porque las imágenes de mapa de bits son incompatibles con los navegadores modernos.',
                'Porque las leyes internacionales exigen que todo logotipo esté registrado únicamente como curvas Bezier.'
              ],
              answerIndex: 0,
              explanation: 'Los vectores representan formas mediante fórmulas matemáticas de puntos, líneas y curvas. Esto permite ampliarlos sin límite conservando bordes perfectos, mientras que los mapas de bits se componen de una cuadrícula de píxeles fijos que se distorsiona al estirarse.'
            }
          }
        ]
      },
      {
        title: 'Mes 3: Retoque Digital con Photoshop',
        duration: '30 horas',
        topics: [
          {
            title: 'Capas de ajuste, fotomontajes realistas y máscaras de capa',
            content: 'Photoshop es el software estándar de la industria para edición y procesamiento de imágenes basadas en píxeles. Dominaremos el revelado RAW no destructivo, la separación de frecuencias para retoque estético de piel, el uso avanzado de canales para selecciones complejas de cabello y la integración armónica de luces para fotomontajes espectaculares.',
            codeSnippet: `/* Filtro CSS que emula el procesado no destructivo de curvas tonales */\n.fotomontaje-blend {\n  filter: contrast(1.15) brightness(0.95) saturate(1.1);\n  mix-blend-mode: multiply;\n  opacity: 0.9;\n}`,
            quizQuestion: {
              question: '¿Cuál es la regla fundamental para realizar un retoque fotográfico "no destructivo" en Adobe Photoshop?',
              options: [
                'Trabajar directamente sobre la capa original "Fondo" y guardar constantemente para no perder avances.',
                'Utilizar capas de ajuste independientes y máscaras de capa en vez de aplicar filtros o el borrador directamente sobre los píxeles originales.',
                'Exportar cada 5 minutos la imagen en formato JPG de baja resolución para conservar los metadatos.'
              ],
              answerIndex: 1,
              explanation: 'Las capas de ajuste (como Curvas o Tono/Saturación) y las máscaras de capa ocultan o alteran visualmente la imagen de abajo sin modificar permanentemente los píxeles originales, permitiendo realizar cambios en cualquier momento del flujo de trabajo.'
            }
          }
        ]
      },
      {
        title: 'Mes 4: Maquetación Editorial con InDesign',
        duration: '30 horas',
        topics: [
          {
            title: 'Clasificación tipográfica, rejilla base, estilos de párrafo y layouts legibles',
            content: 'La tipografía es la voz del texto. Analizaremos las familias Serif (con remates para textos largos impresos), Sans-Serif (palo seco para pantallas digitales), Monospace (código) y Script (decorativas). Dominaremos la escala armónica de tipografía, el kerning (espaciado entre letras) y el leading (interlineado) para estructurar layouts editoriales memorables de libros, revistas y catálogos.',
            codeSnippet: `/* Escala jerárquica tipográfica fluida en CSS con diseño responsive */\n.heading-hero {\n  font-size: clamp(2rem, 5vw, 4rem);\n  font-weight: 900;\n  line-height: 1.1;\n  letter-spacing: -0.05em;\n}`,
            quizQuestion: {
              question: '¿En qué caso práctico se recomienda aplicar una fuente tipográfica "Serif" sobre una "Sans-Serif"?',
              options: [
                'Para interfaces web que serán visualizadas en pantallas de ultra-baja resolución.',
                'Para bloques largos de texto impreso (como novelas o periódicos), ya que los remates guían la vista y reducen la fatiga ocular.',
                'Para títulos de botones táctiles en dispositivos móviles.'
              ],
              answerIndex: 1,
              explanation: 'Las fuentes Serif (como Garamond o Georgia) cuentan con remates ("patitas") que crean una línea horizontal virtual para el ojo, facilitando el seguimiento de los renglones impresos de corrido y mejorando la fluidez lectora en papel físico.'
            }
          }
        ]
      },
      {
        title: 'Mes 5: Identidad Corporativa & Branding',
        duration: '30 horas',
        topics: [
          {
            title: 'Branding estratégico, manuales de marca y diseño de papelería',
            content: 'El diseño de identidad visual o branding trasciende un simple logotipo. Comprende el estudio estratégico del público meta, la creación del sistema visual coherente, la definición de paletas de color institucionales y tipografías corporativas, así como el diseño de aplicaciones de papelería, uniformes y empaques representados en un Manual de Normas Gráficas Profesional.',
            codeSnippet: `/* Estilos de marca institucionales unificados en una hoja de estilo modular */\n.brand-palette {\n  --color-primary-brand: #c026d3; /* Magenta Corporativo */\n  --color-neutral-dark: #1e1b4b; /* Indigo Oscuro */\n  --font-corporate: 'Outfit', sans-serif;\n}`,
            quizQuestion: {
              question: '¿Qué es y para qué sirve un Manual de Identidad Corporativa?',
              options: [
                'Un libro de historia de la empresa que se le regala a clientes selectos.',
                'Un documento normativo detallado que recopila las reglas de uso correcto e incorrecto del logotipo, colores y tipografía para asegurar la consistencia de la marca en cualquier medio.',
                'Un folleto publicitario con los precios de todos los productos de la empresa.'
              ],
              answerIndex: 1,
              explanation: 'El manual recopila de forma estructurada todas las pautas de diseño del sistema gráfico (tamaños mínimos, variaciones de color, usos no permitidos, retícula de construcción) para que cualquier diseñador o imprenta reproduzca la identidad visual de forma consistente.'
            }
          }
        ]
      },
      {
        title: 'Mes 6: Prototipado y Diseño de Interfaces UX/UI',
        duration: '30 horas',
        topics: [
          {
            title: 'UX/UI con Figma, auto-layout, componentes atómicos y flujos interactivos',
            content: 'Aprenderemos a diseñar wireframes y mockups interactivos de alta fidelidad para aplicaciones y sitios web modernos en Figma. Dominaremos conceptos avanzados como Auto-Layout para diseños adaptativos automáticos, Variantes de componentes para estados hover/active, y transiciones dinámicas ("Smart Animate") para presentar prototipos navegables espectaculares a clientes reales.',
            codeSnippet: `/* Estilos CSS inspirados en los diseños modernos de Figma con efectos de desenfoque */\n.glass-panel {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);\n  border-radius: 16px;\n}`,
            quizQuestion: {
              question: '¿Qué ventaja principal aporta utilizar la funcionalidad de "Auto-Layout" en Figma?',
              options: [
                'Traduce el diseño automáticamente a código ensamblador.',
                'Permite crear marcos dinámicos que se expanden, contraen o reordenan automáticamente cuando se agrega texto o se cambia el tamaño de pantalla, emulando Flexbox.',
                'Genera contraseñas seguras para los desarrolladores.'
              ],
              answerIndex: 1,
              explanation: 'Auto-layout en Figma funciona de manera muy similar a CSS Flexbox. Facilita que botones, listas y layouts completos se adapten dinámicamente al contenido (por ejemplo, que un botón crezca horizontalmente si el texto que contiene es más largo).'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-html',
    title: 'Maquetación Atómica Profesional con HTML5 & CSS3 Moderno',
    description: 'La base absoluta de toda la web. Aprenda CSS Grid, Flexbox fluidos, accesibilidad web semántica WCAG, optimización de velocidad SEO y diseño responsive.',
    priceCRC: 45000,
    priceUSD: 88,
    durationHours: 25,
    difficulty: 'Principiante',
    instructor: 'Instructora de la Academia',
    iconName: 'FileCode',
    colorTheme: 'from-orange-500 to-red-950',
    modules: [
      {
        title: 'Módulo 1: CSS Grid Layouts & Responsive Design',
        duration: '12 horas',
        topics: [
          {
            title: 'Retículas fluidas mediante fr, minmax y auto-fill',
            content: 'CSS Grid permite el diseño bidimensional directo sobre el contenedor, abstrayendo cálculos matemáticos complejos para acomodar bento-grids y tarjetas adaptativas en cualquier pantalla.',
            codeSnippet: `.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1rem;\n}`,
            quizQuestion: {
              question: '¿Qué significa "minmax(280px, 1fr)" en una retícula de CSS Grid?',
              options: [
                'La columna medirá exactamente 280px y se duplicará al presionar un botón.',
                'Establece que la columna tendrá un tamaño mínimo de 280px y se expandirá proporcionalmente usando el espacio sobrante.',
                'La retícula se limitará a un máximo de 280 columnas de una fracción.'
              ],
              answerIndex: 1,
              explanation: 'minmax define un rango de tamaño. En este caso, la columna nunca medirá menos de 280px, y si hay espacio extra, ocupará fracciones equitativas del contenedor.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-python',
    title: 'Ingeniería Backend con Python & Django Enterprise',
    description: 'Construya sistemas monolíticos altamente escalables, paneles de administración nativos, ORM robusto e integración de inteligencia artificial. Disponible en mensualidades de ₡35,000.',
    priceCRC: 105000,
    priceUSD: 205,
    durationHours: 60,
    difficulty: 'Intermedio',
    instructor: 'Instructora de la Academia',
    iconName: 'Layers',
    colorTheme: 'from-sky-600 to-indigo-950',
    modules: [
      {
        title: 'Módulo 1: ORM de Django y Migraciones',
        duration: '25 horas',
        topics: [
          {
            title: 'Modelado Relacional y optimización de consultas select_related',
            content: 'El mapeador objeto-relacional (ORM) de Django permite interactuar con bases de datos SQL escribiendo clases en Python. Dominaremos la optimización de consultas para mitigar el problema de consultas N+1.',
            codeSnippet: `# models.py\nfrom django.db import models\n\nclass Author(models.Model):\n    name = models.CharField(max_length=100)\n\nclass Book(models.Model):\n    title = models.CharField(max_length=200)\n    author = models.ForeignKey(Author, on_delete=models.CASCADE)`,
            quizQuestion: {
              question: '¿Qué problema resuelve el uso de "select_related" o "prefetch_related" en Django?',
              options: [
                'Resuelve bugs de cifrado de contraseñas de usuarios.',
                'Elimina el problema de consultas redundantes (N+1 SQL queries) pre-cargando llaves foráneas en un solo JOIN.',
                'Permite exportar tablas de SQL directamente a archivos de Excel.'
              ],
              answerIndex: 1,
              explanation: 'Por defecto, Django evalúa las llaves foráneas de forma diferida (lazy), ejecutando un query adicional para cada registro. select_related realiza un JOIN en la base de datos de inmediato.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-cpp',
    title: 'Ingeniería de Sistemas con C++ Moderno',
    description: 'La clave del máximo rendimiento. Gestión directa de memoria, punteros inteligentes, programación multihilo y optimización a nivel de compilador. Disponible en mensualidades de ₡35,000.',
    priceCRC: 110000,
    priceUSD: 215,
    durationHours: 70,
    difficulty: 'Avanzado',
    instructor: 'Instructora de la Academia',
    iconName: 'Cpu',
    colorTheme: 'from-rose-600 to-rose-950',
    modules: [
      {
        title: 'Módulo 1: Gestión de Memoria y Punteros Inteligentes',
        duration: '30 horas',
        topics: [
          {
            title: 'std::unique_ptr y std::shared_ptr en C++11/20',
            content: 'El manejo manual de memoria mediante raw pointers (new/delete) introduce fugas de memoria (memory leaks). Los Smart Pointers de C++ modernos liberan automáticamente la memoria mediante la técnica RAII.',
            codeSnippet: `#include <memory>\n#include <iostream>\n\nstruct Device {\n    void ping() { std::cout << "Online\\n"; }\n};\n\nint main() {\n    std::unique_ptr<Device> dev = std::make_unique<Device>();\n    dev->ping();\n    // Liberación automática de memoria al salir del scope\n}`,
            quizQuestion: {
              question: '¿Qué es std::unique_ptr en C++ moderno?',
              options: [
                'Un puntero que duplica el almacenamiento en disco de forma paralela.',
                'Un puntero inteligente con propiedad exclusiva sobre un recurso de memoria heap, previniendo copias.',
                'Un optimizador automático que convierte código C++ a lenguaje ensamblador x86.'
              ],
              answerIndex: 1,
              explanation: 'std::unique_ptr posee la propiedad exclusiva del objeto al que apunta. Al destruirse el puntero, se libera automáticamente la memoria. No se puede copiar, solo transferir mediante std::move.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-r',
    title: 'Ciencia de Datos e Ingeniería Estadística con Lenguaje R',
    description: 'Aprenda modelado predictivo, regresiones estadísticas avanzadas, visualización de datos profesionales mediante ggplot2 y manipulación eficiente. Disponible en mensualidades de ₡35,000.',
    priceCRC: 95000,
    priceUSD: 185,
    durationHours: 55,
    difficulty: 'Intermedio',
    instructor: 'Instructora de la Academia',
    iconName: 'FileSpreadsheet',
    colorTheme: 'from-purple-600 to-purple-950',
    modules: [
      {
        title: 'Módulo 1: Programación Funcional y Tidyverse',
        duration: '25 horas',
        topics: [
          {
            title: 'Operadores Pipe (%>%) y manipulación con dplyr',
            content: 'El ecosistema tidyverse en el Lenguaje R revoluciona la manipulación de dataframes masivos mediante pipelines limpios y comprensibles de flujo de datos estadísticos.',
            codeSnippet: `library(dplyr)\n\nsummary_data <- mtcars %>%\n  filter(mpg > 20) %>%\n  group_by(cyl) %>%\n  summarise(mean_hp = mean(hp))`,
            quizQuestion: {
              question: '¿Para qué sirve el operador pipe (%>%) en R?',
              options: [
                'Para compilar código estadístico a formato HTML.',
                'Para pasar el resultado de una expresión anterior como primer argumento de la siguiente función de forma limpia.',
                'Para acelerar la velocidad de carga de archivos CSV cifrados.'
              ],
              answerIndex: 1,
              explanation: 'El operador pipe (%>%) mejora drásticamente la legibilidad del código al permitir encadenar funciones de manipulación en lugar de anidarlas de forma compleja.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-fintech',
    title: 'Postgrado Universitario en FinTech Ledger, Arquitectura Bancaria & Sistemas de Alta Disponibilidad',
    description: 'Postgrado avanzado completo de 6 meses de duración (pago mensual de ₡35,000). Domine la ingeniería detrás de los cores bancarios de alta disponibilidad: contabilidad de partida doble criptográfica, conciliación SINPE en milisegundos, arquitecturas de eventos con Kafka, prevención de fraude (AML/KYC), motores de scoring de riesgo y Open Banking bajo estándares de seguridad militar.',
    priceCRC: 35000,
    priceUSD: 68,
    durationHours: 180,
    difficulty: 'Avanzado',
    instructor: 'Instructora de la Academia',
    iconName: 'Coins',
    colorTheme: 'from-amber-600 to-amber-900',
    modules: [
      {
        title: 'Módulo 1: Libro Mayor de Doble Entrada & Consistencia Criptográfica',
        duration: '30 horas',
        topics: [
          {
            title: 'Libro Mayor de Doble Entrada Criptográfico',
            content: 'El principio de partida doble exige que cada transacción tenga un emisor y un receptor balanceados. Diseñaremos un motor ultra-veloz en Go con base de datos relacional aislada ACID y guardas de concurrencia optimista.',
            codeSnippet: `// Estructura de Transacción Segura en Go\ntype Transaction struct {\n  ID        string    \`json:"id"\`\n  Sender    string    \`json:"sender_account"\`\n  Receiver  string    \`json:"receiver_account"\`\n  Amount    float64   \`json:"amount"\`\n  Hash      string    \`json:"cryptographic_hash"\`\n}`,
            quizQuestion: {
              question: '¿Por qué se usa el Ledger de Doble Entrada (Double-Entry Bookkeeping) en sistemas FinTech bancarios?',
              options: [
                'Para duplicar las ganancias cobradas a los clientes de forma aleatoria.',
                'Para garantizar la consistencia matemática absoluta donde la suma de débitos sea igual a créditos.',
                'Para convertir automáticamente las transacciones a criptomonedas.'
              ],
              answerIndex: 1,
              explanation: 'El sistema de partida doble asegura que todo cambio financiero se registre en al menos dos cuentas, manteniendo la ecuación contable equilibrada y facilitando auditorías estrictas.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Conciliación de SINPE Móvil y API de Transacciones',
        duration: '30 horas',
        topics: [
          {
            title: 'Sincronización en tiempo real y webhook transaccional',
            content: 'Domine el diseño de flujos asíncronos para capturar y procesar de forma inmediata comprobantes de SINPE Móvil mediante colas de mensajería asíncronas y disparadores webhook con firma de seguridad TLS.',
            codeSnippet: `// Ejemplo de validación de firma de Webhook transaccional\nimport crypto\n\nfunc VerifySignature(payload []byte, signature string, secret string) bool {\n    mac := hmac.New(sha256.New, []byte(secret))\n    mac.Write(payload)\n    expected := hex.EncodeToString(mac.Sum(nil))\n    return hmac.Equal([]byte(expected), []byte(signature))\n}`,
            quizQuestion: {
              question: '¿Cómo mitigan los webhooks de FinTech los ataques de repetición (Replay Attacks)?',
              options: [
                'Cambiando el número de puerto del servidor Express en cada petición.',
                'Incluyendo una marca de tiempo (timestamp) firmada criptográficamente en los encabezados del webhook.',
                'Eliminando las conexiones HTTPS para acelerar las respuestas.'
              ],
              answerIndex: 1,
              explanation: 'Las firmas con timestamp permiten al servidor verificar que el mensaje se generó hace pocos segundos y que no ha sido interceptado ni re-enviado por un atacante.'
            }
          }
        ]
      },
      {
        title: 'Módulo 3: Microservicios Distribuidos & Arquitecturas de Eventos (EDA)',
        duration: '30 horas',
        topics: [
          {
            title: 'Procesamiento Asíncrono, Kafka, Event Sourcing y Outbox Pattern',
            content: 'En la arquitectura de microservicios financieros, la consistencia eventual y la resiliencia son vitales. Aprenderemos a implementar el patrón Transactional Outbox para garantizar que las transacciones e ingresos se publiquen de manera "exactly-once" (exactamente una vez) en brokers como Apache Kafka, evitando duplicidades de saldo o fallos de red silenciosos.',
            codeSnippet: `// Ejemplo de Publicación de Evento Transaccional con Outbox Pattern\nconst dbTransaction = await pool.connect();\ntry {\n  await dbTransaction.query('BEGIN');\n  // 1. Guardar estado de transferencia en el ledger principal\n  await dbTransaction.query('INSERT INTO transfers ...');\n  // 2. Insertar evento en la tabla Outbox en la misma transacción atómica\n  await dbTransaction.query('INSERT INTO outbox_events (event_type, payload) VALUES ($1, $2)', ['TransferCreated', payload]);\n  await dbTransaction.query('COMMIT');\n} catch (e) {\n  await dbTransaction.query('ROLLBACK');\n}`,
            quizQuestion: {
              question: '¿Qué problema crítico del sistema distribuido resuelve el "Transactional Outbox Pattern"?',
              options: [
                'La velocidad de compresión de los paquetes TCP.',
                'Garantiza la consistencia atómica entre la base de datos relacional y el broker de mensajes de manera que ambos se actualicen o ambos fallen.',
                'Permite que los microservicios compartan la misma base de datos en caliente sin aislamiento.'
              ],
              answerIndex: 1,
              explanation: 'El patrón Outbox asegura que el cambio en la base de datos y la publicación del evento ocurran en una única transacción atómica local, eliminando escenarios donde la base de datos se guarda pero el mensaje a Kafka no se envía por fallo de red.'
            }
          }
        ]
      },
      {
        title: 'Módulo 4: Ciberseguridad Bancaria, Prevención de Fraude (AML/KYC) & mTLS',
        duration: '30 horas',
        topics: [
          {
            title: 'mTLS, Heurística Antifraude y Normativas Internacionales AML/CFT',
            content: 'La seguridad de las conexiones interbancarias y de clientes es estricta. Veremos cómo configurar Mutual TLS (mTLS) para que tanto servidor como cliente se validen mediante certificados criptográficos X.509 de confianza. Además, diseñaremos analizadores de transacciones en tiempo real usando heurísticas y modelos para detectar anomalías sospechosas de lavado de dinero (AML).',
            codeSnippet: `// Scoring de Riesgo Antifraude Heurístico\nfunction evaluateTransactionRisk(tx) {\n  let riskScore = 0;\n  if (tx.amount > 5000000) riskScore += 40; // Transacción mayor al límite estándar\n  if (tx.isInternational) riskScore += 20;\n  if (tx.timeBetweenTransactionsSec < 5) riskScore += 30; // Velocidad de ráfaga física imposible\n  return {\n    riskScore,\n    requiresManualReview: riskScore >= 70,\n    status: riskScore >= 70 ? 'BLOCKED_PENDING_AML' : 'APPROVED'\n  };\n}`,
            quizQuestion: {
              question: '¿En qué consiste la autenticación mTLS (Mutual TLS)?',
              options: [
                'Es un cifrado de extremo a extremo que solo encripta la contraseña del usuario en base64.',
                'Es un protocolo de red donde tanto el cliente como el servidor se autentican mutuamente mediante certificados digitales antes de establecer el canal seguro.',
                'Un estándar de inicio de sesión social mediante Google o Microsoft.'
              ],
              answerIndex: 1,
              explanation: 'A diferencia de TLS estándar donde solo el cliente verifica al servidor, en mTLS el servidor también exige un certificado válido al cliente, garantizando que solo socios financieros pre-autorizados puedan invocar la API.'
            }
          }
        ]
      },
      {
        title: 'Módulo 5: Motores de Crédito, Scoring de Riesgo Dinámico & Amortizaciones',
        duration: '30 horas',
        topics: [
          {
            title: 'Algoritmos de Scoring Crediticio, Matrices de Decisión e Intereses Compuestos',
            content: 'Construcción y calibración de un motor de reglas de negocio para la aprobación o rechazo de productos financieros de inmediato. Implementaremos algoritmos que calculen la capacidad de pago del solicitante basándose en deudas actuales, ingresos comprobados y su historial en la central de riesgo. Además, crearemos generadores de tablas de amortización (Sistemas Francés y Alemán) para simular cuotas e intereses de créditos.',
            codeSnippet: `// Generador de Tabla de Amortización bajo el Sistema Francés (Cuota Fija)\nfunction generateFrenchAmortization(principal, annualRate, months) {\n  const monthlyRate = (annualRate / 100) / 12;\n  const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));\n  const schedule = [];\n  let balance = principal;\n  for (let i = 1; i <= months; i++) {\n    const interest = balance * monthlyRate;\n    const amortization = monthlyPayment - interest;\n    balance -= amortization;\n    schedule.push({ month: i, payment: monthlyPayment, interest, amortization, balance: Math.max(0, balance) });\n  }\n  return schedule;\n}`,
            quizQuestion: {
              question: '¿Cuál es la característica principal del Sistema de Amortización Francés?',
              options: [
                'La cuota total mensual a pagar permanece constante a lo largo de todo el crédito (donde el interés disminuye y la amortización de capital aumenta en cada cuota).',
                'El capital amortizado es constante en cada cuota, por lo que la cuota total a pagar decrece gradualmente.',
                'No se cobran intereses y se paga todo el capital al vencimiento final.'
              ],
              answerIndex: 0,
              explanation: 'El sistema francés se caracteriza por cuotas mensuales fijas. En las primeras cuotas, la mayor parte del pago corresponde a intereses acumulados, mientras que al final, la mayor parte se destina a amortizar el capital prestado.'
            }
          }
        ]
      },
      {
        title: 'Módulo 6: Open Banking (PSD2), Tokenización de Activos & ISO 20022',
        duration: '30 horas',
        topics: [
          {
            title: 'APIs Financieras Abiertas, Criptografía de Depósitos y Mensajería ISO 20022',
            content: 'Estudio de la directiva europea de servicios de pago PSD2 y el diseño de APIs unificadas de Open Banking para permitir la iniciación de pagos y agregación de cuentas por terceros autorizados de manera segura. Analizaremos además el nuevo estándar universal de mensajería financiera ISO 20022 y los fundamentos de tokenización de activos e interfaces de liquidación automatizada.',
            codeSnippet: `// Ejemplo de plantilla de Mensaje ISO 20022 XML (pain.001.001.08) simplificado\nconst iso20022Message = \`\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.08">\n  <CstmrCdtTrfInitn>\n    <GrpHdr>\n      <MsgId>ACAD-FINTECH-20260713-01</MsgId>\n      <CreDtTm>2026-07-13T00:30:00Z</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n    </GrpHdr>\n    <Dbtr>\n      <Nm>FullStack Academy</Nm>\n    </Dbtr>\n  </CstmrCdtTrfInitn>\n</Document>\`;`,
            quizQuestion: {
              question: '¿Qué es y por qué se está adoptando el estándar global ISO 20022 en la banca internacional?',
              options: [
                'Es un formato de audio comprimido para almacenar llamadas telefónicas de reclamos bancarios.',
                'Es un estándar de mensajería financiera estructurado en XML/JSON que sustituye formatos heredados (MT de SWIFT) aportando datos más detallados, estructurados y de mayor calidad.',
                'Un tipo de tarjeta de débito con microchip cuántico de alta resistencia.'
              ],
              answerIndex: 1,
              explanation: 'El estándar ISO 20022 permite a las entidades financieras del mundo hablar el mismo lenguaje estructurado con gran cantidad de metadatos de las transacciones, mejorando la automatización, previniendo errores de interpretación de giros internacionales y agilizando la prevención de delitos.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-ai',
    title: 'Especialización en Inteligencia Artificial & Agentes con Gemini API',
    description: 'Aprenda a integrar modelos de lenguaje de última generación, diseñar prompts estructurados de alta precisión, implementar llamadas a funciones (Function Calling) y orquestar agentes autónomos. Disponible en cómodas mensualidades de ₡35,000.',
    priceCRC: 95000,
    priceUSD: 185,
    durationHours: 40,
    difficulty: 'Intermedio',
    instructor: 'Instructora de la Academia',
    iconName: 'Sparkles',
    colorTheme: 'from-violet-600 to-indigo-950',
    modules: [
      {
        title: 'Módulo 1: Prompt Engineering y Salidas Estructuradas',
        duration: '15 horas',
        topics: [
          {
            title: 'Modelos de Lenguaje, System Instructions y Formato JSON',
            content: 'Los LLMs operan prediciendo el token más probable. Aprenderemos a programar instrucciones de sistema (System Instructions) inviolables, y a forzar al modelo a responder con esquemas JSON estrictos (Structured Outputs) para integrarlos de manera directa a nuestros sistemas sin fallas de formateo.',
            codeSnippet: `import { GoogleGenAI, Type } from '@google/genai';\nconst ai = new GoogleGenAI();\n\nconst response = await ai.models.generateContent({\n  model: 'gemini-2.5-flash',\n  contents: 'List 3 programming languages with their year of creation',\n  config: {\n    responseMimeType: 'application/json',\n    responseSchema: {\n      type: Type.ARRAY,\n      items: {\n        type: Type.OBJECT,\n        properties: {\n          name: { type: Type.STRING },\n          year: { type: Type.INTEGER }\n        }\n      }\n    }\n  }\n});`,
            quizQuestion: {
              question: '¿Cuál es la ventaja principal de definir un esquema JSON (Structured Output) al invocar un modelo de IA?',
              options: [
                'Permite que el modelo se ejecute directamente en el navegador del cliente sin usar red.',
                'Garantiza que la respuesta de la IA tendrá un formato predecible que nuestro código puede parsear con seguridad sin romperse.',
                'Acelera la respuesta del modelo multiplicando su ancho de banda.'
              ],
              answerIndex: 1,
              explanation: 'Al definir un esquema JSON (responseSchema), el decodificador del LLM restringe la salida para que coincida exactamente con la estructura de datos requerida, eliminando respuestas de texto libre difíciles de parsear.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Agentes y Herramientas (Function Calling)',
        duration: '25 horas',
        topics: [
          {
            title: 'Llamada de Funciones y Orquestación de Agentes',
            content: 'Los agentes interactúan con el mundo real mediante herramientas. Aprenderemos a registrar funciones nativas en el SDK de Gemini para que el modelo decida cuándo y con qué parámetros ejecutarlas de forma autónoma, creando flujos de trabajo inteligentes.',
            codeSnippet: `const getStockPrice = ({ ticker }) => ({ price: ticker === 'GOOG' ? 190.5 : 150.0 });\n\nconst response = await ai.models.generateContent({\n  model: 'gemini-2.5-flash',\n  contents: '¿Cuál es el precio de las acciones de GOOG?',\n  config: {\n    tools: [{ functionDeclarations: [{\n      name: 'getStockPrice',\n      parameters: { type: Type.OBJECT, properties: { ticker: { type: Type.STRING } } }\n    }]}]\n  }\n});`,
            quizQuestion: {
              question: '¿Qué es "Function Calling" (Llamada de Funciones) en el contexto de las APIs de IA?',
              options: [
                'Una técnica para que la IA escriba funciones de TypeScript de forma recursiva.',
                'Un mecanismo donde el modelo decide de forma autónoma qué función local llamar y con qué argumentos, devolviendo las instrucciones de ejecución.',
                'Una forma de optimizar el consumo de RAM del servidor de base de datos.'
              ],
              answerIndex: 1,
              explanation: 'Function Calling permite que el modelo analice la solicitud del usuario, detecte si necesita usar una herramienta, y devuelva un objeto estructurado indicando el nombre de la función y los argumentos ideales para ejecutarla.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-cybersecurity',
    title: 'Especialización Profesional en Ciberseguridad & Pentesting',
    description: 'Aprenda a auditar aplicaciones web bajo los estándares OWASP Top 10, implementar sistemas criptográficos robustos, entender exploits y proteger arquitecturas en la nube.',
    priceCRC: 110000,
    priceUSD: 215,
    durationHours: 45,
    difficulty: 'Avanzado',
    instructor: 'Instructora de la Academia',
    iconName: 'ShieldAlert',
    colorTheme: 'from-red-600 to-slate-950',
    modules: [
      {
        title: 'Módulo 1: Seguridad Web y Mitigación de Vulnerabilidades',
        duration: '20 horas',
        topics: [
          {
            title: 'Inyecciones SQL (SQLi) y Ataques XSS',
            content: 'Las inyecciones de código ocurren cuando datos no saneados son interpretados como comandos de ejecución. Aprenderemos a auditar vulnerabilidades clásicas de la web, implementar consultas preparadas parametrizadas y configurar políticas de seguridad de contenido (CSP) estrictas.',
            codeSnippet: `// Consulta Segura mediante SQL Parametrizado para evitar SQLi\nconst query = 'SELECT * FROM users WHERE email = $1 AND password_hash = $2';\nconst values = [userInputEmail, hashedUserPassword];\nconst result = await db.query(query, values);`,
            quizQuestion: {
              question: '¿Cómo mitigan las consultas preparadas (Prepared Statements) el riesgo de una Inyección SQL?',
              options: [
                'Cifrando el código fuente de la aplicación en el servidor.',
                'Tratando los datos del usuario estrictamente como parámetros aislados del motor SQL, sin interpretarlos jamás como comandos ejecutables.',
                'Impidiendo que los usuarios utilicen caracteres especiales en sus contraseñas.'
              ],
              answerIndex: 1,
              explanation: 'Las consultas preparadas compilan la estructura SQL de forma previa. Cuando entran los parámetros del usuario, se insertan directamente en las posiciones indicadas como datos puros, imposibilitando que alteren la lógica del query original.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Criptografía Práctica y Hardening',
        duration: '25 horas',
        topics: [
          {
            title: 'Hashing de Contraseñas y Gestión de Secretos',
            content: 'Las contraseñas nunca deben guardarse en texto plano. Utilizaremos el algoritmo de derivación de claves adaptativo Argon2id o bcrypt con salting dinámico para resistir ataques de fuerza bruta y Rainbow Tables.',
            codeSnippet: `import bcrypt from 'bcrypt';\n\nconst password = 'UserSecurePassword123!';\nconst saltRounds = 12;\nconst hash = await bcrypt.hash(password, saltRounds);\n\n// Verificación\nconst isMatch = await bcrypt.compare(password, hash);`,
            quizQuestion: {
              question: '¿Qué función cumple la "sal" (salt) al hashear una contraseña?',
              options: [
                'Hace que la contraseña sea legible en caso de que el administrador de TI la necesite.',
                'Añade un valor aleatorio único a la contraseña antes de hashearla para asegurar que dos contraseñas idénticas produzcan hashes distintos, evitando ataques de Rainbow Tables.',
                'Acelera el cálculo del hash disminuyendo el consumo de CPU.'
              ],
              answerIndex: 1,
              explanation: 'La sal es un fragmento aleatorio único para cada usuario. Al combinarse con la contraseña antes del hasheo, previene que un atacante use tablas de hashes precalculadas (Rainbow Tables) para descifrar contraseñas comunes.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-english',
    title: 'Especialización en Inglés Profesional y de Negocios',
    description: 'Domine el idioma global de la tecnología y los negocios. Desde fundamentos de comunicación corporativa hasta preparación para entrevistas técnicas, redacción de correos profesionales y standups diarios de alto impacto. Disponible en cómodas mensualidades de ₡30,000.',
    priceCRC: 75000,
    priceUSD: 145,
    durationHours: 32,
    difficulty: 'Intermedio',
    instructor: 'Instructora de la Academia',
    iconName: 'Globe',
    colorTheme: 'from-sky-500 to-indigo-900',
    modules: [
      {
        title: 'Módulo 1: Correspondencia Comercial y Escrita (Emails & Slack)',
        duration: '16 horas',
        topics: [
          {
            title: 'Estructuración de Correos Profesionales y Mensajería de Trabajo',
            content: 'Aprenda la estructura formal e informal de los correos y mensajes de trabajo en inglés. Estudiaremos fórmulas de saludo, planteamiento de requerimientos, seguimiento de proyectos (follow-up) y despedidas educadas según el contexto de negocios.',
            codeSnippet: `// Plantillas útiles de comunicación para Slack y Email:\n// 1. Actualización de Proyecto (Project Update):\n"Hi team, just a quick update on the latest deployment: everything is live on production and latency is stable. Let me know if you encounter any issues!"\n\n// 2. Solicitud de Ayuda (Requesting Help):\n"Hi [Name], hope you are well. Could you please review the API endpoint schema when you have a moment? I want to ensure we align on the database keys. Thanks!"`,
            quizQuestion: {
              question: '¿Cuál es la forma más profesional y común de solicitar amablemente una revisión en un entorno de trabajo tecnológico?',
              options: [
                '"Hey! Do my review now, please."',
                '"Could you please review the API endpoint schema when you have a moment? Thanks!"',
                '"Review this code for me, I have no time."'
              ],
              answerIndex: 1,
              explanation: 'Usar expresiones de cortesía como "Could you please..." y "when you have a moment" mantiene un tono profesional, respetuoso y colaborativo en el equipo.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Entrevistas Técnicas y Standups Diarios',
        duration: '16 horas',
        topics: [
          {
            title: 'Dominando el Daily Standup y Explicación de Código',
            content: 'El standup diario requiere concisión y claridad. Aprenderemos a estructurar nuestra intervención usando tres pilares: lo que completamos ayer, lo que haremos hoy, y si tenemos algún impedimento (blocker). Utilizaremos verbos en pasado simple, presente continuo y futuro.',
            codeSnippet: `// Plantilla Estándar para Daily Standup:\nconst dailyStandup = {\n  yesterday: "Yesterday, I resolved the state re-rendering bug and updated the courses database schema.",\n  today: "Today, I am going to implement the English and Mathematics modules and write their translations.",\n  blockers: "I have no blockers at the moment. Everything is running smoothly."\n};`,
            quizQuestion: {
              question: '¿Qué tres elementos clave componen un reporte de Daily Standup profesional en inglés?',
              options: [
                'Tu salario actual, las quejas del servidor y tus planes de vacaciones.',
                'Lo que hiciste ayer, lo que planeas hacer hoy y si tienes algún impedimento (blocker).',
                'Una explicación detallada de cada línea de código escrita en el mes.'
              ],
              answerIndex: 1,
              explanation: 'La estructura estándar del Daily Standup es concisa y se enfoca en el progreso diario: Yesterday (Pasado), Today (Presente/Futuro) y Blockers (Impedimentos).'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-math6',
    title: 'Preparación Integral de Matemáticas • Sexto Grado Primaria',
    description: 'El curso definitivo de preparación matemática para estudiantes de sexto grado. Explicaciones paso a paso, ejercicios prácticos interactivos, resolución de fracciones, decimales, razones, proporciones, geometría básica y fundamentos de álgebra.',
    priceCRC: 45000,
    priceUSD: 90,
    durationHours: 36,
    difficulty: 'Principiante',
    instructor: 'Instructora de la Academia',
    iconName: 'BookOpenCheck',
    colorTheme: 'from-emerald-500 to-teal-950',
    modules: [
      {
        title: 'Módulo 1: Operaciones con Fracciones y Decimales Paso a Paso',
        duration: '18 horas',
        topics: [
          {
            title: 'Suma y Resta de Fracciones con Diferente Denominador (Mínimo Común Múltiplo)',
            content: 'Para sumar o restar fracciones con diferente denominador, debemos encontrar un denominador común. Esto se logra calculando el Mínimo Común Múltiplo (MCM). \n\n**Paso 1:** Identificar los denominadores. Por ejemplo, en 1/4 + 1/6, los denominadores son 4 y 6.\n**Paso 2:** Calcular el MCM de 4 y 6 (que es 12).\n**Paso 3:** Convertir cada fracción a su equivalente con denominador 12: \n* 1/4 se multiplica por 3/3 = 3/12 \n* 1/6 se multiplica por 2/2 = 2/12\n**Paso 4:** Sumar los numeradores: 3/12 + 2/12 = 5/12.',
            codeSnippet: `// Resolución matemática paso a paso en código interactivo:\nfunction sumarFracciones(num1, den1, num2, den2) {\n  const mcm = 12; // Mínimo Común Múltiplo de 4 y 6\n  const nuevoNum1 = num1 * (mcm / den1);             // 1 * (12/4) = 3\n  const nuevoNum2 = num2 * (mcm / den2);             // 1 * (12/6) = 2\n  const numResultado = nuevoNum1 + nuevoNum2;        // 3 + 2 = 5\n  return \`Resultado de la suma: \${numResultado}/\${mcm}\`;  // "5/12"\n}`,
            quizQuestion: {
              question: '¿Cuál es el resultado simplificado de sumar 1/3 + 1/6?',
              options: [
                '2/9',
                '1/2 (que equivale a 3/6)',
                '2/6'
              ],
              answerIndex: 1,
              explanation: 'El MCM de 3 y 6 es 6. Convertimos 1/3 a 2/6. Luego sumamos 2/6 + 1/6 = 3/6. Al simplificar 3/6 dividiendo el numerador y el denominador entre 3, obtenemos 1/2.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Razones, Proporciones y Regla de Tres',
        duration: '18 horas',
        topics: [
          {
            title: 'Resolución de Problemas con la Regla de Tres Simple',
            content: 'La Regla de Tres es una herramienta matemática indispensable para resolver problemas de proporcionalidad directa. \n\n**Ejemplo Práctico:** Si 3 cuadernos cuestan ₡4,500 colones, ¿cuánto costarán 7 cuadernos? \n\n**Paso a Paso:**\n1. Alinear las variables: \n   * 3 cuadernos ---> ₡4,500 colones\n   * 7 cuadernos ---> X colones\n2. Multiplicar en cruz: multiplicamos los dos valores conocidos que están en diagonal: 7 * 4,500 = 31,500.\n3. Dividir por el valor restante: dividimos el resultado entre el tercer número: 31,500 / 3 = 10,500.\n\n¡Por lo tanto, 7 cuadernos cuestan ₡10,500 colones!',
            codeSnippet: `// Algoritmo de Regla de Tres Simple Directa:\n// Si A cuadernos dan B colones, ¿cuánto dan C cuadernos?\nconst calcularReglaDeTres = (a, b, c) => {\n  const resultado = (c * b) / a;\n  return resultado;\n};\n\n// Ejemplo: A = 3 cuadernos, B = 4500 colones, C = 7 cuadernos\nconst precioSieteCuadernos = calcularReglaDeTres(3, 4500, 7); // Retorna 10500`,
            quizQuestion: {
              question: 'Si un automóvil recorre 180 kilómetros en 2 horas a velocidad constante, ¿cuántos kilómetros recorrerá en 5 horas?',
              options: [
                '360 kilómetros',
                '450 kilómetros',
                '500 kilómetros'
              ],
              answerIndex: 1,
              explanation: 'Aplicamos Regla de Tres: 2 horas -> 180 km, entonces 5 horas -> X. Multiplicamos en cruz: 5 * 180 = 900. Dividimos por 2: 900 / 2 = 450 km.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-postgresql',
    title: 'Master en Bases de Datos Relacionales: PostgreSQL 17 Avanzado, Índices & Optimización',
    description: 'Especialización de élite en ingeniería de datos relacionales: diseño de esquemas en 3FN/BCNF, planes de ejecución con EXPLAIN ANALYZE, índices B-Tree/GIN/GiST, particionamiento masivo por rango y hash, transacciones concurrentes MVCC y réplica en streaming.',
    priceCRC: 125000,
    priceUSD: 240,
    durationHours: 60,
    difficulty: 'Avanzado',
    instructor: 'Facultad de Ingeniería de Datos',
    iconName: 'Database',
    colorTheme: 'from-cyan-600 to-blue-950',
    modules: [
      {
        title: 'Módulo 1: Indexación Estratégica, MVCC & Planes de Ejecución Forenses',
        duration: '30 horas',
        topics: [
          {
            title: 'Anatomía de Índices B-Tree, GIN, GiST y Consultas con EXPLAIN ANALYZE',
            content: 'En bases de datos de alta concurrencia, una mala indexación degrada la latencia drásticamente. Aprenderemos a interpretar salidas de EXPLAIN (ANALYZE, BUFFERS, VERBOSE) para detectar Sequential Scans costosos, calcular el impacto del Shared Buffer Cache y crear índices parciales y compuestos con predicados optimizados.',
            codeSnippet: `-- Diagnóstico de Consulta y Optimización de Índice B-Tree Compuesto:\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT c.id, c.nombre, COUNT(t.id) AS total_transacciones,\n       SUM(t.monto_usd) AS volumen_total\nFROM clientes c\nJOIN transacciones t ON c.id = t.cliente_id\nWHERE t.fecha_creacion >= NOW() - INTERVAL '30 days'\n  AND t.estado = 'COMPLETADA'\nGROUP BY c.id, c.nombre\nHAVING SUM(t.monto_usd) > 10000;\n\n-- Creación de Índice Parcial para eliminar escaneos secuenciales:\nCREATE INDEX CONCURRENTLY idx_transacciones_completadas_mes\nON transacciones (cliente_id, fecha_creacion DESC)\nINCLUDE (monto_usd)\nWHERE estado = 'COMPLETADA';`,
            quizQuestion: {
              question: '¿Por qué la cláusula CONCURRENTLY es crítica al crear índices en tablas de producción en PostgreSQL?',
              options: [
                'Porque permite que el índice utilice múltiples núcleos de CPU para comprimir los datos.',
                'Porque crea el índice sin bloquear escrituras concurrentes (evita bloqueos exclusivos SHARE LOCK en la tabla).',
                'Porque deshabilita el motor MVCC durante la transacción.'
              ],
              answerIndex: 1,
              explanation: 'CREATE INDEX regular adquiere un SHARE lock que bloquea INSERTs, UPDATEs y DELETEs concurrentes. CONCURRENTLY realiza pasadas adicionales sin bloquear operaciones de escritura en vivo.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Particionamiento Masivo, Procedimientos Almacenados y ACID',
        duration: '30 horas',
        topics: [
          {
            title: 'Particionamiento Declarativo por Rango y Hash en Terabytes',
            content: 'Cuando una tabla supera decenas de millones de filas, el particionamiento divide la carga física. Dominaremos la técnica de Partition Pruning en tiempo de ejecución, migración transparente de llaves foráneas y automatización de tablas hijas mediante pg_partman.',
            codeSnippet: `-- Tabla Maestra Particionada por Rango de Fechas:\nCREATE TABLE registro_auditoria (\n    id BIGINT GENERATED ALWAYS AS IDENTITY,\n    servicio_id VARCHAR(50) NOT NULL,\n    nivel VARCHAR(20) NOT NULL,\n    mensaje TEXT NOT NULL,\n    creado_en TIMESTAMPTZ NOT NULL\n) PARTITION BY RANGE (creado_en);\n\n-- Partición para Septiembre 2026:\nCREATE TABLE registro_auditoria_2026_09 PARTITION OF registro_auditoria\n    FOR VALUES FROM ('2026-09-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');`,
            quizQuestion: {
              question: '¿Qué ventaja directa aporta la técnica de "Partition Pruning" en PostgreSQL?',
              options: [
                'Elimina físicamente los registros antiguos sin necesidad de usar VACUUM.',
                'Permite al optimizador ignorar por completo las particiones que no coinciden con las condiciones del WHERE, ahorrando I/O de disco.',
                'Convierte automáticamente la tabla relacional en una base de datos NoSQL columnar.'
              ],
              answerIndex: 1,
              explanation: 'El planificador analiza las cláusulas del WHERE y excluye del plan de escaneo físico cualquier partición fuera del rango buscado, reduciendo dramáticamente las lecturas de disco.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-nosql',
    title: 'Ingeniería de Bases de Datos NoSQL & Caché Distribuido: MongoDB Enterprise & Redis',
    description: 'Domine la persistencia no relacional a escala planetaria: pipelines de agregación complejos en MongoDB, modelado desnormalizado de alto rendimiento, clústeres sharded con tolerancia a particiones (CAP) y caché de latencia sub-milisegundo con Redis.',
    priceCRC: 110000,
    priceUSD: 215,
    durationHours: 50,
    difficulty: 'Intermedio',
    instructor: 'Facultad de Arquitectura de Software',
    iconName: 'Server',
    colorTheme: 'from-emerald-600 to-teal-950',
    modules: [
      {
        title: 'Módulo 1: MongoDB Enterprise & Aggregation Pipeline de Alto Rendimiento',
        duration: '25 horas',
        topics: [
          {
            title: 'Aggregation Framework: $match, $lookup, $unwind y $facet',
            content: 'El framework de agregación de MongoDB permite procesar flujos de datos analíticos en memoria sin exportar datos al backend. Diseñaremos pipelines multi-etapa con índices compuestos que soportan consultas analíticas en sub-segundos.',
            codeSnippet: `// Pipeline de Agregación MongoDB en Node.js / Mongoose:\nconst metricasVentas = await db.collection('pedidos').aggregate([\n  { $match: { estado: 'entregado', fecha: { $gte: new Date('2026-01-01') } } },\n  { $unwind: '$items' },\n  {\n    $group: {\n      _id: '$items.categoria',\n      ingresosTotales: { $sum: { $multiply: ['$items.cantidad', '$items.precioUnitario'] } },\n      unidadesVendidas: { $sum: '$items.cantidad' },\n      ticketPromedio: { $avg: '$items.precioUnitario' }\n    }\n  },\n  { $sort: { ingresosTotales: -1 } },\n  { $limit: 10 }\n]).toArray();`,
            quizQuestion: {
              question: '¿Por qué la etapa $match debe ubicarse idealmente al inicio de un pipeline de agregación en MongoDB?',
              options: [
                'Porque es la única posición donde la consulta puede aprovechar los índices definidos en la colección para filtrar documentos antes de cargarlos en memoria.',
                'Porque $match bloquea la colección entera para evitar inconsistencias concurrentes.',
                'Porque de lo contrario MongoDB cancela la ejecución por límite de memoria RAM.'
              ],
              answerIndex: 0,
              explanation: 'Al colocar $match en la primera etapa, MongoDB aprovecha los índices existentes y reduce inmediatamente el volumen de documentos que pasarán a las siguientes etapas más costosas como $unwind o $group.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Redis In-Memory & Arquitectura de Ultra-Baja Latencia',
        duration: '25 horas',
        topics: [
          {
            title: 'Estructuras de Datos Avanzadas en Redis y Rate Limiting Distribuido',
            content: 'Redis no es un simple almacén clave-valor: es un servidor de estructuras de datos en memoria (Strings, Hashes, Sorted Sets, Bitmaps, HyperLogLog). Implementaremos algoritmos de Token Bucket y Sliding Window para protección DDoS y control de límites de tasa en APIs de millones de peticiones/minuto.',
            codeSnippet: `// Rate Limiter con Redis Sliding Window Log en TypeScript:\nasync function checkRateLimit(userId: string, limit: number, windowSecs: number): Promise<boolean> {\n  const now = Date.now();\n  const windowStart = now - (windowSecs * 1000);\n  const key = \`rate_limit:\${userId}\`;\n\n  const multi = redis.multi();\n  multi.zremrangebyscore(key, '-inf', windowStart); // Eliminar timestamps antiguos\n  multi.zadd(key, now, String(now));               // Registrar solicitud actual\n  multi.zcard(key);                                // Contar solicitudes vigentes\n  multi.expire(key, windowSecs);                   // Auto-limpieza TTL\n\n  const results = await multi.exec();\n  const currentCount = results[2][1] as number;\n  return currentCount <= limit;\n}`,
            quizQuestion: {
              question: '¿Qué estructura de datos de Redis es óptima para implementar tablas de clasificación (Leaderboards) en tiempo real con millones de usuarios?',
              options: [
                'Redis Hashes (HSET/HGET)',
                'Redis Sorted Sets (ZSET con ZADD y ZREVRANGEBYSCORE)',
                'Redis Pub/Sub Channels'
              ],
              answerIndex: 1,
              explanation: 'Sorted Sets (ZSET) ordenan automáticamente los elementos por una puntuación numérica interna (score) con complejidad logarítmica O(log N), lo que permite consultar posiciones y rangos al instante.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-cloud-db',
    title: 'Arquitectura de Datos en la Nube: Cloud SQL, BigQuery & Cloud Spanner',
    description: 'Aprenda a orquestar bases de datos globales de disponibilidad 99.999%: bases de datos serverless en la nube, analítica masiva petabyte-scale con Google BigQuery, y bases de datos transaccionales globales con Google Cloud Spanner.',
    priceCRC: 135000,
    priceUSD: 260,
    durationHours: 55,
    difficulty: 'Avanzado',
    instructor: 'Facultad de Cloud Computing & Big Data',
    iconName: 'Cloud',
    colorTheme: 'from-indigo-600 to-purple-950',
    modules: [
      {
        title: 'Módulo 1: Almacenes Analíticos Petabyte-Scale con Google BigQuery',
        duration: '28 horas',
        topics: [
          {
            title: 'Arquitectura Desacoplada de Almacenamiento/Cómputo y Consultas Federadas',
            content: 'BigQuery utiliza el motor Dremel y almacenamiento columnar Capacitor. Diseñaremos esquemas particionados por tiempo con clustering de múltiples columnas para ejecutar análisis sobre miles de millones de filas en segundos, optimizando slots y eliminando costos innecesarios de escaneo.',
            codeSnippet: `-- Consulta SQL Optimizada en BigQuery con Particionamiento y Clustering:\nSELECT \n  DATE(timestamp) AS fecha,\n  pais_origen,\n  dispositivo_tipo,\n  COUNT(DISTINCT session_id) AS sesiones_unicas,\n  APPROX_QUANTILES(tiempo_carga_ms, 100)[OFFSET(95)] AS p95_latencia_ms\nFROM \`proyecto_cloud.telemetria.eventos_app\`\nWHERE _PARTITIONDATE BETWEEN '2026-09-01' AND '2026-09-10'\n  AND pais_origen = 'Costa Rica'\nGROUP BY 1, 2, 3\nORDER BY fecha DESC, sesiones_unicas DESC;`,
            quizQuestion: {
              question: '¿Por qué el modelo de precios bajo demanda de BigQuery premia el uso estricto de tablas particionadas y con clustering?',
              options: [
                'Porque BigQuery cobra por cantidad de columnas indexadas en el servidor.',
                'Porque cobra por el número exacto de bytes escaneados de disco durante la consulta; las particiones y el clustering evitan leer bloques innecesarios.',
                'Porque el clustering convierte automáticamente la base de datos a formato JSON no estructurado.'
              ],
              answerIndex: 1,
              explanation: 'BigQuery cobra por terabytes de datos leídos. Si una tabla está particionada por fecha y clusterizada, el motor solo lee las particiones y bloques relevantes para los filtros del WHERE, reduciendo el costo hasta un 99%.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Bases de Datos Globales con Cloud Spanner & TrueTime',
        duration: '27 horas',
        topics: [
          {
            title: 'Consistencia Externa Estricta, TrueTime API y Replicación Multirregional',
            content: 'Cloud Spanner es la primera base de datos relacional globalmente distribuida con consistencia ACID estricta que supera el Teorema CAP gracias al hardware de sincronización atómica TrueTime (relojes atómicos y GPS en datacenters de Google). Diseñaremos llaves primarias anti-hotspotting y esquemas intercalados para latencias mínimas transcontinentales.',
            codeSnippet: `-- Esquema Spanner con Interleaved Tables para Co-localización Física de Datos:\nCREATE TABLE CuentasBancarias (\n    CuentaId STRING(36) NOT NULL,\n    TitularNombre STRING(100) NOT NULL,\n    SaldoTotal NUMERIC NOT NULL,\n    CreadoEn TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)\n) PRIMARY KEY (CuentaId);\n\n-- Tabla intercalada en el mismo fragmento físico (Split):\nCREATE TABLE MovimientosCuenta (\n    CuentaId STRING(36) NOT NULL,\n    MovimientoId STRING(36) NOT NULL,\n    Monto NUMERIC NOT NULL,\n    TipoOperacion STRING(20) NOT NULL,\n    FechaOperacion TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)\n) PRIMARY KEY (CuentaId, MovimientoId),\n  INTERLEAVE IN PARENT CuentasBancarias ON DELETE CASCADE;`,
            quizQuestion: {
              question: '¿Qué problema crítico evita la técnica de "Interleaved Tables" en Cloud Spanner?',
              options: [
                'Evita bloqueos de red transregionales al almacenar los registros hijos físicamente juntos con su registro padre en el mismo fragmento (split).',
                'Deshabilita la necesidad de contar con réplicas de lectura secundarias.',
                'Permite que Spanner funcione en memoria RAM sin escribir en almacenamiento persistente.'
              ],
              answerIndex: 0,
              explanation: 'Al intercalar una tabla hija dentro de la tabla padre, Spanner almacena los datos contiguamente en los mismos splits de almacenamiento, logrando lecturas y escrituras transaccionales ultrarrápidas sin latencia de red entre servidores distribuidos.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-devops-k8s',
    title: 'Carrera de Microservicios, Contenedores Docker & Orquestación con Kubernetes',
    description: 'La especialización más cotizada en la industria de software moderna: diseño de microservicios resilientes con gRPC y REST, contenedorización multi-etapa con Docker, orquestación en clústeres Kubernetes (K8s), Service Mesh y pipelines CI/CD automatizados.',
    priceCRC: 155000,
    priceUSD: 299,
    durationHours: 75,
    difficulty: 'Avanzado',
    instructor: 'Facultad DevOps & Cloud Systems',
    iconName: 'Layers',
    colorTheme: 'from-sky-500 to-blue-900',
    modules: [
      {
        title: 'Módulo 1: Docker Avanzado y Contenedorización de Producción',
        duration: '35 horas',
        topics: [
          {
            title: 'Multi-Stage Builds, Seguridad de Imágenes y Redes de Contenedores',
            content: 'Construir imágenes Docker ligeras y seguras es vital para despliegues rápidos en producción. Dominaremos multi-stage builds para reducir imágenes de 1.5 GB a menos de 50 MB, ejecución con usuarios no privilegiados (non-root) y escaneo de vulnerabilidades con Trivy.',
            codeSnippet: `# Dockerfile Multi-Stage optimizado para producción en Node.js / TypeScript:\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --prefer-offline\nCOPY . .\nRUN npm run build\n\n# Stage 2: Runtime Minimalista y Seguro\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\n# Ejecución con usuario sin privilegios por seguridad:\nUSER node\nCOPY package*.json ./\nRUN npm ci --only=production --ignore-scripts\nCOPY --from=builder /app/dist ./dist\n\nEXPOSE 3000\nCMD ["node", "dist/server.cjs"]`,
            quizQuestion: {
              question: '¿Cuál es la principal ventaja de utilizar Multi-Stage Builds en Docker?',
              options: [
                'Permite compilar en una imagen completa y copiar solo los binarios compilados a una imagen final diminuta sin herramientas de compilación pesadas.',
                'Permite que el contenedor se ejecute simultáneamente en múltiples servidores sin Kubernetes.',
                'Aumenta la memoria RAM disponible para el sistema operativo anfitrión.'
              ],
              answerIndex: 0,
              explanation: 'Multi-stage builds separan el entorno de compilación (compiladores, SDKs, dependencias de desarrollo) del entorno de ejecución, resultando en imágenes mucho más pequeñas, rápidas de descargar y sin superficies de ataque innecesarias.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Orquestación y Clústeres con Kubernetes (K8s)',
        duration: '40 horas',
        topics: [
          {
            title: 'Pods, Deployments, Services, Ingress y Autoescalado Horizontal (HPA)',
            content: 'Aprenderemos a administrar clústeres de Kubernetes en producción: definición declarativa de Pods con probes de salud (liveness/readiness), balanceo de carga mediante Ingress Nginx, gestión de secretos encriptados y autoescalado horizontal automático (HPA) según métricas de CPU y latencia HTTP.',
            codeSnippet: `# Manifiesto Kubernetes para Deployment de Alta Disponibilidad:\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: microservicio-pagos\n  labels:\n    app: pagos-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: pagos-api\n  template:\n    metadata:\n      labels:\n        app: pagos-api\n    spec:\n      containers:\n      - name: pagos\n        image: gcr.io/empresa-cloud/pagos-api:v2.4.0\n        ports:\n        - containerPort: 3000\n        resources:\n          limits:\n            cpu: "500m"\n            memory: "512Mi"\n          requests:\n            cpu: "100m"\n            memory: "128Mi"\n        livenessProbe:\n          httpGet:\n            path: /api/health\n            port: 3000\n          initialDelaySeconds: 15\n          periodSeconds: 10`,
            quizQuestion: {
              question: '¿Cuál es la diferencia entre un "Liveness Probe" y un "Readiness Probe" en Kubernetes?',
              options: [
                'Liveness comprueba si el Pod debe ser reiniciado; Readiness comprueba si el Pod está listo para recibir tráfico del Service.',
                'Liveness solo se ejecuta una vez al iniciar el Pod; Readiness se ejecuta constantemente.',
                'Liveness controla la memoria RAM; Readiness controla el consumo de CPU.'
              ],
              answerIndex: 0,
              explanation: 'Si el Liveness Probe falla, Kubernetes destruye y recrea el contenedor (reinicio). Si el Readiness Probe falla, Kubernetes deja vivo el contenedor pero deja de enviarle tráfico a través del Service hasta que se recupere.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-flutter',
    title: 'Carrera de Desarrollo de Aplicaciones Móviles con Flutter & Dart',
    description: 'Cree aplicaciones móviles nativas de altísimo impacto para iOS y Android con una sola base de código: arquitectura reactiva de widgets, gestión de estado escalable con BLoC Pattern y Riverpod, integración de hardware nativo y publicación en tiendas.',
    priceCRC: 120000,
    priceUSD: 230,
    durationHours: 65,
    difficulty: 'Intermedio',
    instructor: 'Facultad de Ingeniería Móvil',
    iconName: 'Smartphone',
    colorTheme: 'from-cyan-500 to-indigo-900',
    modules: [
      {
        title: 'Módulo 1: Arquitectura de Widgets y BLoC Pattern Reactivo',
        duration: '35 horas',
        topics: [
          {
            title: 'Gestión de Estado Predictiva con BLoC (Business Logic Component)',
            content: 'El patrón BLoC desacopla por completo la interfaz gráfica de la lógica de negocio mediante Streams reactivos de Dart. Aprenderemos a estructurar Eventos, Estados inmutables y Repositorios con arquitectura limpia (Clean Architecture).',
            codeSnippet: `// Implementación de BLoC en Dart / Flutter:\nimport 'package:flutter_bloc/flutter_bloc.dart';\n\n// Eventos:\nabstract class PaymentEvent {}\nclass ProcessTransaction extends PaymentEvent {\n  final double amount;\n  ProcessTransaction(this.amount);\n}\n\n// Estados:\nabstract class PaymentState {}\nclass PaymentInitial extends PaymentState {}\nclass PaymentLoading extends PaymentState {}\nclass PaymentSuccess extends PaymentState {\n  final String referenceId;\n  PaymentSuccess(this.referenceId);\n}\n\n// BLoC:\nclass PaymentBloc extends Bloc<PaymentEvent, PaymentState> {\n  PaymentBloc() : super(PaymentInitial()) {\n    on<ProcessTransaction>((event, emit) async {\n      emit(PaymentLoading());\n      await Future.delayed(const Duration(seconds: 2));\n      emit(PaymentSuccess('SINPE-2026-OK'));\n    });\n  }\n}`,
            quizQuestion: {
              question: '¿Por qué el patrón BLoC es ampliamente preferido en aplicaciones móviles empresariales de gran escala?',
              options: [
                'Porque convierte el código Dart a Java automáticamente para evitar compilaciones en iOS.',
                'Porque separa de forma estricta la UI de la lógica de negocio mediante flujos unidireccionales y estados inmutables predecibles y testeables.',
                'Porque elimina la necesidad de usar paquetes externos en pubspec.yaml.'
              ],
              answerIndex: 1,
              explanation: 'BLoC garantiza que la UI solo reaccione a cambios de estado emitidos por eventos concretos, facilitando pruebas unitarias de la lógica sin depender del árbol de widgets.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Integración Nativa, Persistencia Offline y Despliegue',
        duration: '30 horas',
        topics: [
          {
            title: 'Persistencia Local con Hive/Isar, Notificaciones Push y Compilación',
            content: 'Dominaremos el almacenamiento ultrarrápido sin SQL en el dispositivo con bases de datos embebidas (Hive e Isar), autenticación biométrica (FaceID / Huella dactilar) y automatización de firmado de binarios APK/AAB e IPA para producción.',
            codeSnippet: `// Inicialización de Base de Datos Embebida Isar en Flutter:\nimport 'package:isar/isar.dart';\nimport 'package:path_provider/path_provider.dart';\n\n@collection\nclass UserProfileEntity {\n  Id id = Isar.autoIncrement;\n  late String fullName;\n  late String email;\n  late bool isPremiumMember;\n}\n\nFuture<Isar> initLocalDatabase() async {\n  final dir = await getApplicationDocumentsDirectory();\n  return await Isar.open(\n    [UserProfileEntitySchema],\n    directory: dir.path,\n    inspector: true,\n  );\n}`,
            quizQuestion: {
              question: '¿Qué formato de empaquetado es requerido de forma obligatoria por Google Play Console para publicar nuevas aplicaciones en Android?',
              options: [
                'Android App Bundle (.aab)',
                'Paquete ZIP clásico (.zip)',
                'Archivo APK monofirmado (.apk)'
              ],
              answerIndex: 0,
              explanation: 'Google Play exige Android App Bundles (.aab), permitiendo que la tienda genere binarios optimizados (Split APKs) reduciendo el tamaño de descarga para la arquitectura específica de cada teléfono.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-ml-pytorch',
    title: 'Especialización en Machine Learning, Redes Neuronales & Deep Learning con PyTorch',
    description: 'Construya y entrene modelos predictivos de inteligencia artificial de nivel industrial: álgebra tensorial en GPU, redes neuronales profundas (CNNs, Transformers), backpropagation matemático, transfer learning y empaquetado de modelos en producción con FastAPI.',
    priceCRC: 140000,
    priceUSD: 275,
    durationHours: 70,
    difficulty: 'Avanzado',
    instructor: 'Facultad de Inteligencia Artificial',
    iconName: 'Bot',
    colorTheme: 'from-amber-600 to-rose-950',
    modules: [
      {
        title: 'Módulo 1: Tensores en GPU, Autograd y Redes Neuronales Profundas',
        duration: '35 horas',
        topics: [
          {
            title: 'Grafos Computacionales Dinámicos, Backpropagation y Optimizador AdamW',
            content: 'PyTorch calcula gradientes automáticamente sobre grafos dinámicos. Aprenderemos a programar redes neuronales multicapa personalizadas heredando de torch.nn.Module, aplicando normalización por lotes (BatchNorm), Dropout para evitar sobreajuste (overfitting) y optimizadores con decaimiento de peso (AdamW).',
            codeSnippet: `# Red Neuronal en PyTorch con GPU y ciclo de entrenamiento:\nimport torch\nimport torch.nn as nn\nimport torch.optim as optim\n\nclass DeepClassifier(nn.Module):\n    def __init__(self, input_dim, hidden_dim, num_classes):\n        super(DeepClassifier, self).__init__()\n        self.net = nn.Sequential(\n            nn.Linear(input_dim, hidden_dim),\n            nn.BatchNorm1d(hidden_dim),\n            nn.ReLU(),\n            nn.Dropout(0.3),\n            nn.Linear(hidden_dim, num_classes)\n        )\n    \n    def forward(self, x):\n        return self.net(x)\n\n# Inicialización en GPU CUDA / MPS de Apple:\ndevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')\nmodel = DeepClassifier(input_dim=64, hidden_dim=128, num_classes=5).to(device)\ncriterion = nn.CrossEntropyLoss()\noptimizer = optim.AdamW(model.parameters(), lr=0.001, weight_decay=1e-4)`,
            quizQuestion: {
              question: '¿Qué hace la instrucción "loss.backward()" en el ciclo de entrenamiento de PyTorch?',
              options: [
                'Actualiza los pesos de las capas convolucionales directamente.',
                'Calcula el gradiente de la función de pérdida con respecto a cada parámetro del modelo mediante diferenciación automática.',
                'Reinicia a cero el acumulador de gradientes del optimizador.'
              ],
              answerIndex: 1,
              explanation: 'loss.backward() recorre el grafo computacional en sentido inverso (backpropagation) acumulando los gradientes de la pérdida en el atributo .grad de cada tensor con requires_grad=True.'
            }
          }
        ]
      },
      {
        title: 'Módulo 2: Modelos Avanzados, Transfer Learning y MLOps con FastAPI',
        duration: '35 horas',
        topics: [
          {
            title: 'Transfer Learning, Exportación a ONNX y Servido de Inferencia de Alta Velocidad',
            content: 'Reutilizaremos pesos pre-entrenados de modelos del estado del arte (ResNet, Vision Transformers) congelando capas base para adaptarlos a conjuntos de datos propietarios con pocas muestras. Exportaremos los modelos a formato ONNX para ejecutar inferencias ultra-rápidas en producción montadas sobre APIs asíncronas con FastAPI.',
            codeSnippet: `# API de Inferencia de Modelo PyTorch / ONNX con FastAPI:\nfrom fastapi import FastAPI, HTTPException\nimport torch\nfrom pydantic import BaseModel\n\napp = FastAPI(title="Motor de Inferencia Neuronal")\n\nclass PredictRequest(BaseModel):\n    features: list[float]\n\n@app.post("/api/v1/predict")\nasync def predict(req: PredictRequest):\n    if len(req.features) != 64:\n        raise HTTPException(status_code=400, detail="Se requieren exactamente 64 características.")\n    \n    with torch.no_grad():\n        input_tensor = torch.tensor([req.features], dtype=torch.float32).to(device)\n        outputs = model(input_tensor)\n        probabilities = torch.softmax(outputs, dim=1)\n        predicted_class = torch.argmax(probabilities, dim=1).item()\n        confidence = probabilities[0][predicted_class].item()\n        \n    return {\n        "clase_predicha": predicted_class,\n        "confianza": round(confidence * 100, 2),\n        "estado": "inferencia_exitosa"\n    }`,
            quizQuestion: {
              question: '¿Por qué es indispensable envolver el código de inferencia dentro del bloque "with torch.no_grad():"?',
              options: [
                'Porque desactiva el rastreo de gradientes, reduciendo drásticamente el consumo de memoria RAM/VRAM y acelerando los cálculos matemáticos.',
                'Porque evita que el modelo modifique sus hiperparámetros durante la llamada HTTP.',
                'Porque convierte automáticamente la GPU en una TPU de Google.'
              ],
              answerIndex: 0,
              explanation: 'Durante la inferencia no se requiere calcular derivadas ni actualizar pesos. torch.no_grad() deshabilita el motor de autograd, ahorrando enormes cantidades de memoria de GPU y acelerando el tiempo de respuesta.'
            }
          }
        ]
      }
    ]
  }
];

