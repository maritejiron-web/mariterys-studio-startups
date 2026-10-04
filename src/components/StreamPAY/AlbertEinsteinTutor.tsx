import React, { useState } from 'react';
import {
  Sparkles,
  Lightbulb,
  Volume2,
  VolumeX,
  Send,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Calculator,
  Award,
  ChevronRight,
  Brain,
  MessageSquare,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

export interface EinsteinStepExplanation {
  topic: string;
  question: string;
  step1: string; // Datos y comprensión
  step2: string; // Concepto o fórmula
  step3: string; // Desarrollo numérico paso a paso
  step4: string; // Comprobación y respuesta clara
  einsteinAdvice: string;
}

export const PRESET_EINSTEIN_TOPICS: { label: string; icon: string; data: EinsteinStepExplanation }[] = [
  {
    label: '🥧 Fracciones Impropias a Mixtas',
    icon: '🥧',
    data: {
      topic: 'Representación de Fracciones',
      question: '¿Cómo convierto la fracción 11/4 a un número mixto y cómo se ubica en la recta numérica?',
      step1: 'Identificamos las partes: El numerador es 11 (partes que tenemos) y el denominador es 4 (partes en que se divide cada entero). Como 11 es mayor que 4, es una fracción impropia (¡tenemos más de una unidad entera!).',
      step2: 'La regla de oro: Dividimos el numerador entre el denominador (11 ÷ 4). El cociente será la parte entera y el residuo será el nuevo numerador sobre el mismo denominador 4.',
      step3: 'Hacemos la división:\n• 11 ÷ 4 = 2 (porque 4 × 2 = 8)\n• Nos sobran: 11 - 8 = 3 de residuo.\n• Por lo tanto: 11/4 = 2 enteros con 3/4 (2 3/4).',
      step4: 'En la recta numérica: Buscamos el número 2, y en el espacio entre el 2 y el 3 lo dividimos en 4 partes iguales y avanzamos 3 pasitos. ¡Queda exactamente en 2.75!',
      einsteinAdvice: '¡Recuerda siempre querida estudiante! Si el número de arriba es más grande que el de abajo, imagínalo como pizzas: si cada pizza tiene 4 pedazos y tienes 11 pedazos, ¡tienes 2 pizzas enteras y te sobran 3 pedazos!'
    }
  },
  {
    label: '🔢 Operaciones Combinadas (PEMDAS)',
    icon: '🔢',
    data: {
      topic: 'Números Naturales & Jerarquía',
      question: 'No entiendo por qué 20 - 3 × (4 + 2) no da 102. ¿Cuál es el orden correcto?',
      step1: 'El error común es hacer las operaciones en el orden en que aparecen de izquierda a derecha. En matemáticas hay una ley universal: ¡la jerarquía de operaciones!',
      step2: 'Acrónimo salvavidas PEMDAS:\n1. Paréntesis (lo más urgente)\n2. Potencias\n3. Multiplicaciones y Divisiones\n4. Sumas y Restas (al final)',
      step3: 'Resolvamos juntos paso a paso:\n• Paso 1 (Paréntesis): (4 + 2) = 6. Ahora la expresión es: 20 - 3 × 6.\n• Paso 2 (Multiplicación): ¡NO restes 20 - 3 todavía! Primero multiplicamos 3 × 6 = 18.\n• Paso 3 (Resta final): 20 - 18 = 2.',
      step4: 'Resultado exacto = 2. Si hubieses restado 20 - 3 primero, te habría dado un resultado completamente equivocado.',
      einsteinAdvice: 'La naturaleza tiene orden y las matemáticas también. Imagina que los paréntesis son cajas blindadas: ¡siempre debes abrir y resolver lo que hay dentro de la caja antes de tocar lo que está afuera!'
    }
  },
  {
    label: '📏 Conversión de Kilómetros a Metros',
    icon: '📏',
    data: {
      topic: 'Sistema Métrico Nacional',
      question: 'Si una atleta corre 3.75 kilómetros, ¿cuántos metros y centímetros recorrió?',
      step1: 'Datos del problema: Tenemos una distancia expresada en una unidad grande (kilómetros: km) y queremos pasarla a unidades más pequeñas (metros: m y centímetros: cm).',
      step2: 'La regla de la escalera métrica: "De unidad mayor a menor, MULTIPLICAMOS por 10 por cada escalón".\n• 1 km = 1,000 metros (3 escalones: hm, dam, m).\n• 1 metro = 100 centímetros.',
      step3: 'Cálculo paso a paso:\n• A metros: 3.75 km × 1,000 = Corremos la coma 3 lugares a la derecha ➔ 3,750 metros.\n• A centímetros: 3,750 m × 100 = 375,000 centímetros.',
      step4: 'Respuesta completa: La atleta recorrió 3,750 metros (o 375,000 cm).',
      einsteinAdvice: 'Un truco visual: el prefijo "Kilo" siempre significa mil (1,000). Así que cada vez que veas "km" o "kg", solo piensa en multiplicar por mil.'
    }
  },
  {
    label: '🔄 Decimales a Fracciones Irreducibles',
    icon: '🔄',
    data: {
      topic: 'Conversión Decimal y Fraccionaria',
      question: '¿Cómo transformo el decimal 0.35 a su fracción más pequeña (irreducible)?',
      step1: 'Leemos el número correctamente: 0.35 se lee "35 centésimas" porque tiene dos dígitos después de la coma decimal (décimas, centésimas).',
      step2: 'Escribimos la fracción base: Ponemos el número sin coma (35) como numerador y abajo un 1 seguido de dos ceros (100) ➔ 35/100.',
      step3: 'Simplificamos buscando el divisor común: Como 35 termina en 5 y 100 termina en 0, ambos se pueden dividir entre 5:\n• 35 ÷ 5 = 7\n• 100 ÷ 5 = 20\n• Fracción resultante: 7/20.',
      step4: 'Comprobamos: 7 es un número primo y no divide a 20, por lo que 7/20 ya no se puede simplificar más. ¡Es la fracción irreducible!',
      einsteinAdvice: 'Simplificar es como podar un árbol: le quitas lo que sobra para que quede en su forma más pura y hermosa.'
    }
  },
  {
    label: '📐 Área y Perímetro de Círculo (π = 3.14)',
    icon: '📐',
    data: {
      topic: 'Geometría y Medición',
      question: 'Tengo una piscina circular con un radio de 6 metros. ¿Cuál es su perímetro (circunferencia) y su área?',
      step1: 'Identificamos los datos: Radio (r) = 6 m. Usaremos el valor oficial para primaria del número Pi: π ≈ 3.14.',
      step2: 'Recordamos las dos fórmulas mágicas:\n• Perímetro (borde de la piscina): P = 2 × π × r (o Diámetro × π)\n• Área (superficie del agua): A = π × r²',
      step3: 'Desarrollo matemático:\n• Perímetro: 2 × 3.14 × 6 = 6.28 × 6 = 37.68 metros.\n• Área: Primero calculamos r² = 6 × 6 = 36. Luego: 3.14 × 36 = 113.04 m².',
      step4: 'Respuesta con unidades: El perímetro es 37.68 metros y el área es 113.04 metros cuadrados (m²).',
      einsteinAdvice: '¡Cuidado con el error clásico! r² NO es 6 × 2 (eso sería 12). r² es multiplicar el 6 por sí mismo: 6 × 6 = 36. ¡Nunca lo olvides!'
    }
  },
  {
    label: '💰 Descuentos, Vueltos e IVA del 13%',
    icon: '💰',
    data: {
      topic: 'Sistema Monetario de Negocios',
      question: 'Un uniforme escolar vale ₡15,000. Tiene 20% de descuento. Si pago con un billete de ₡20,000, ¿cuánto es el vuelto?',
      step1: 'Datos: Precio de lista = ₡15,000. Descuento = 20%. Pago con = ₡20,000. Queremos saber el vuelto.',
      step2: 'Fórmula de porcentaje: Multiplicamos el precio por el porcentaje y dividimos entre 100, o sacamos el 10% y lo duplicamos.',
      step3: 'Cálculo paso a paso:\n• 10% de ₡15,000 = ₡1,500.\n• 20% de descuento = ₡1,500 × 2 = ₡3,000.\n• Precio con descuento = ₡15,000 - ₡3,000 = ₡12,000 a pagar.\n• Vuelto = Billete entregado (₡20,000) - Total a pagar (₡12,000) = ₡8,000.',
      step4: 'Conclusión: Te aplican un descuento de ₡3,000 y el cajero debe entregarte exactamente ₡8,000 colones de vuelto.',
      einsteinAdvice: 'Saber calcular porcentajes rápidamente te dará un superpoder en la vida real para que nunca nadie te cobre de más ni te dé mal un vuelto en el supermercado.'
    }
  },
  {
    label: '🧭 Secuencias & Regla de Tres',
    icon: '🧭',
    data: {
      topic: 'Relaciones y Proporciones',
      question: 'Si 4 libros iguales pesan 1,200 gramos, ¿cuánto pesarán 9 libros iguales?',
      step1: 'Datos: 4 libros ➔ 1,200 g. Queremos saber el peso de 9 libros. Es proporcionalidad directa: a más libros, más peso.',
      step2: 'El secreto infalible: Método del Valor Unitario (averiguar primero cuánto pesa 1 solo libro).',
      step3: 'Cálculo paso a paso:\n• Paso 1 (Peso de 1 libro): Dividimos 1,200 ÷ 4 = 300 gramos cada libro.\n• Paso 2 (Peso de 9 libros): Multiplicamos el valor unitario por 9 ➔ 300 × 9 = 2,700 gramos.\n• (O en kilogramos: 2,700 ÷ 1,000 = 2.7 kg).',
      step4: 'Respuesta: Los 9 libros pesan exactamente 2,700 gramos (2.7 kg).',
      einsteinAdvice: 'Cuando enfrentes un problema de regla de tres, siempre pregúntate: "¿Cuánto vale UNO solo?". Una vez que sabes cuánto vale uno, puedes calcular diez, cien o un millón.'
    }
  },
  {
    label: '📊 Media, Moda y Probabilidades',
    icon: '📊',
    data: {
      topic: 'Estadística y Probabilidad',
      question: 'En una caja hay 3 canicas rojas, 5 azules y 2 amarillas. ¿Cuál es la probabilidad de sacar una azul sin mirar?',
      step1: 'Casos totales: Sumamos todas las canicas que hay en la caja: 3 rojas + 5 azules + 2 amarillas = 10 canicas en total.',
      step2: 'Casos favorables: ¿Cuántas cumplen la condición de ser azules? Hay 5 canicas azules.',
      step3: 'Fórmula de Laplace: Probabilidad = Casos favorables ÷ Casos totales = 5/10.',
      step4: 'Simplificamos la fracción: 5/10 dividiendo entre 5 = 1/2. En decimal = 0.5. En porcentaje = 50%.',
      einsteinAdvice: 'La probabilidad nos ayuda a tomar decisiones inteligentes. Tener un 50% de probabilidad significa que exactamente la mitad de las oportunidades están a tu favor.'
    }
  },
  {
    label: '🏆 Premios, Medallas & Diploma de Honor',
    icon: '🏆',
    data: {
      topic: 'Sistema de Premios y Medallero Escolar',
      question: '¿Cómo gano todas las medallas escolares y obtengo mi Diploma de Honor de 6to Grado firmado por ti, Profesor Einstein?',
      step1: 'El Sistema de Reconocimiento Escolar premia tu constancia: Cada vez que resuelves ejercicios, interactúas con los laboratorios y respondes el examen de práctica, ganas Puntos Einstein (XP) y medallas de Oro, Plata y Diamante.',
      step2: 'Las 12 Medallas Disponibles:\n• 🥇 Oro en Fracciones\n• ⚡ Relámpago PEMDAS\n• 📏 Gran Agrimensor Métrico\n• 🎯 Precisión Decimal y Recta\n• 📐 Euclides Geométrico\n• 💰 Pequeño Banquero\n• ⚖️ Mente Analítica\n• 🎲 Sabio de Probabilidad\n• 🏆 Copa de Honor Simulador MEP (70%+)\n• 👑 Insignia de Perfección (10 de 10)\n• 👨‍🏫 Pupilo Favorito de Einstein\n• 🎓 Gran Diploma de Graduación.',
      step3: 'Cómo desbloquearlas paso a paso:\n1. Ve a la pestaña "🏆 Premios & Medallero" para ver cuáles tienes y cuáles te faltan.\n2. Haz clic en "📝 Simulador Oficial" y responde las 10 preguntas: ¡cada acierto suma 50 XP y desbloquea medallas automáticamente!\n3. Ingresa tu nombre en el Medallero para que aparezca impreso en tu Diploma Oficial de Costa Rica.',
      step4: 'El Gran Diploma de Honor: Cuando alcances 6 o más medallas, podrás presionar el botón "Imprimir Diploma" o "Guardar en PDF" con tu nombre, sello dorado del MEP y mi firma personal para colgar en tu cuarto o mostrarle a tu maestra.',
      einsteinAdvice: '«El genio se compone de 1% de talento y 99% de perseverancia». Cada medalla es un recordatorio de tu capacidad ilimitada. ¡Estoy muy orgulloso de ser tu profesor!'
    }
  }
];

export const AlbertEinsteinTutor: React.FC = () => {
  const [selectedExplanation, setSelectedExplanation] = useState<EinsteinStepExplanation>(PRESET_EINSTEIN_TOPICS[0].data);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [copiedExplanation, setCopiedExplanation] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSelectPreset = (data: EinsteinStepExplanation) => {
    setSelectedExplanation(data);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeakAloud = (textToRead: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAskEinsteinCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsAnswering(true);

    const query = customQuestion.toLowerCase();

    setTimeout(() => {
      // Find matching preset or generate intelligent structured answer
      let matched = PRESET_EINSTEIN_TOPICS.find(p => 
        query.includes(p.data.topic.toLowerCase()) || 
        p.data.question.toLowerCase().split(' ').some(w => w.length > 4 && query.includes(w))
      );

      if (!matched) {
        if (query.includes('fraccion') || query.includes('fracción') || query.includes('mixto') || query.includes('propia') || query.includes('impropia')) {
          matched = PRESET_EINSTEIN_TOPICS[0];
        } else if (query.includes('operacion') || query.includes('operación') || query.includes('pemdas') || query.includes('parentesis') || query.includes('paréntesis')) {
          matched = PRESET_EINSTEIN_TOPICS[1];
        } else if (query.includes('metro') || query.includes('kilometro') || query.includes('kilómetro') || query.includes('métrica') || query.includes('medida')) {
          matched = PRESET_EINSTEIN_TOPICS[2];
        } else if (query.includes('decimal') || query.includes('coma') || query.includes('simplificar')) {
          matched = PRESET_EINSTEIN_TOPICS[3];
        } else if (query.includes('area') || query.includes('área') || query.includes('perimetro') || query.includes('perímetro') || query.includes('circulo') || query.includes('círculo') || query.includes('pi')) {
          matched = PRESET_EINSTEIN_TOPICS[4];
        } else if (query.includes('descuento') || query.includes('dinero') || query.includes('vuelto') || query.includes('colon') || query.includes('colón') || query.includes('iva')) {
          matched = PRESET_EINSTEIN_TOPICS[5];
        } else if (query.includes('secuencia') || query.includes('proporcion') || query.includes('proporción') || query.includes('regla de tres') || query.includes('patron') || query.includes('patrón')) {
          matched = PRESET_EINSTEIN_TOPICS[6];
        } else {
          matched = PRESET_EINSTEIN_TOPICS[7];
        }
      }

      setSelectedExplanation({
        topic: 'Consulta del Estudiante: ' + customQuestion.slice(0, 40) + '...',
        question: customQuestion,
        step1: `Paso 1 (Comprender los datos): Analizamos tu pregunta: "${customQuestion}". Lo primero que debemos hacer es separar los números conocidos de lo que nos están pidiendo calcular.`,
        step2: `Paso 2 (Elegir la fórmula o método): ${matched.data.step2}`,
        step3: `Paso 3 (Desarrollo matemático paso a paso):\n${matched.data.step3}`,
        step4: `Paso 4 (Conclusión y comprobación): ${matched.data.step4}`,
        einsteinAdvice: `¡Excelente pregunta, joven investigadora! Como solía decir: "Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el bello y maravilloso mundo del saber". ¡Sigue practicando!`
      });

      setIsAnswering(false);
      setCustomQuestion('');
    }, 400);
  };

  const handleCopyExplanation = () => {
    const fullText = `Explicación de Albert Einstein:\n\nTema: ${selectedExplanation.topic}\nPregunta: ${selectedExplanation.question}\n\n1. ${selectedExplanation.step1}\n\n2. ${selectedExplanation.step2}\n\n3. ${selectedExplanation.step3}\n\n4. ${selectedExplanation.step4}\n\nConsejo del Profesor Einstein: ${selectedExplanation.einsteinAdvice}`;
    navigator.clipboard.writeText(fullText);
    setCopiedExplanation(true);
    setTimeout(() => setCopiedExplanation(false), 2500);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-amber-500/40 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background Einstein Aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header with Albert Einstein Persona */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl shadow-amber-500/20 bg-slate-900 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
                alt="Profesor Albert Einstein"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[9px] font-mono shadow-md">
              TUTOR
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Profesor Albert Einstein
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono text-[10px] font-bold">
                I.A. Paso a Paso
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              "No te preocupes por tus dificultades en matemáticas; te aseguro que las mías son aún mayores. Dime qué tema no entiendes y te lo explicaré paso a paso con paciencia y ejemplos claros."
            </p>
          </div>
        </div>

        {/* Audio Button */}
        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => handleSpeakAloud(`${selectedExplanation.step1} ${selectedExplanation.step2} ${selectedExplanation.step3} ${selectedExplanation.step4}`)}
            className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl border text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all shadow-md ${
              isSpeaking
                ? 'bg-red-500/20 text-red-300 border-red-500 animate-pulse'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-400/40'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Detener Voz' : 'Escuchar a Einstein'}</span>
          </button>

          <button
            onClick={handleCopyExplanation}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs transition-all"
            title="Copiar explicación completa"
          >
            {copiedExplanation ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Selectors for what the student doesn't understand */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
          ¿En qué tema tienes dudas? Selecciona para ver la explicación detallada:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_EINSTEIN_TOPICS.map((preset, idx) => {
            const isSelected = selectedExplanation.question === preset.data.question;
            return (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset.data)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-md'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <span className="text-base">{preset.icon}</span>
                <span className="truncate text-[11px]">{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ask custom question to Einstein */}
      <form onSubmit={handleAskEinsteinCustom} className="flex gap-2">
        <input
          type="text"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          placeholder="O escribe aquí tu ejercicio (ej: 'No entiendo cómo calcular el área del trapecio con bases 12 y 8')..."
          className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={isAnswering || !customQuestion.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-black text-xs font-mono flex items-center gap-2 transition-all shrink-0 shadow-lg shadow-amber-500/20"
        >
          {isAnswering ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>Preguntar al Profe</span>
        </button>
      </form>

      {/* The 4-Step Einstein Breakdown Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
              {selectedExplanation.topic}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
              "{selectedExplanation.question}"
            </h4>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
            Método Didáctico de 4 Pasos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* STEP 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold font-mono">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
                1
              </div>
              <span>Paso 1: ¿Qué datos tenemos y qué buscamos?</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed whitespace-pre-line">
              {selectedExplanation.step1}
            </p>
          </div>

          {/* STEP 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">
                2
              </div>
              <span>Paso 2: La regla, fórmula o concepto clave</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed whitespace-pre-line">
              {selectedExplanation.step2}
            </p>
          </div>

          {/* STEP 3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-xs">
                3
              </div>
              <span>Paso 3: Realizamos las operaciones paso a paso</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300 whitespace-pre-line leading-relaxed">
              {selectedExplanation.step3}
            </div>
          </div>

          {/* STEP 4 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">
                4
              </div>
              <span>Paso 4: Comprobación y Respuesta Final</span>
            </div>
            <p className="text-slate-200 text-[11px] leading-relaxed whitespace-pre-line font-medium">
              {selectedExplanation.step4}
            </p>
          </div>

        </div>

        {/* Einstein's personal motivation quote */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-slate-950 border border-amber-500/30 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300 text-xs font-mono">
              Consejo Sabio del Profesor Einstein:
            </span>
            <p className="text-slate-300 text-[11px] italic leading-relaxed">
              "{selectedExplanation.einsteinAdvice}"
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
