import { TradingAsset, BotStrategyConfig } from '../types/tradingTypes';

export const INITIAL_TRADING_ASSETS: TradingAsset[] = [
  // CRYPTO
  {
    id: 'btc-usd',
    symbol: 'BTC/USD',
    name: 'Bitcoin Core 2026',
    category: 'crypto',
    price: 88450.25,
    change24h: 3.84,
    high24h: 89800.00,
    low24h: 85200.10,
    volume24h: 42890500120,
    decimals: 2,
    iconColor: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    spread: 0.8,
    leverageMax: 100,
    description: 'La principal criptomoneda mundial con alta liquidez y volatilidad óptima para trading cuantitativo.',
    sparkline: [85200, 85600, 86100, 85900, 86800, 87400, 87100, 88000, 88450.25]
  },
  {
    id: 'eth-usd',
    symbol: 'ETH/USD',
    name: 'Ethereum Network',
    category: 'crypto',
    price: 3420.80,
    change24h: 5.12,
    high24h: 3480.00,
    low24h: 3240.50,
    volume24h: 18450200800,
    decimals: 2,
    iconColor: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.15)',
    spread: 0.15,
    leverageMax: 100,
    description: 'Red descentralizada líder en contratos inteligentes y finanzas descentralizadas.',
    sparkline: [3240, 3280, 3310, 3290, 3350, 3390, 3380, 3410, 3420.80]
  },
  {
    id: 'sol-usd',
    symbol: 'SOL/USD',
    name: 'Solana High-Speed',
    category: 'crypto',
    price: 198.45,
    change24h: 8.75,
    high24h: 204.10,
    low24h: 181.20,
    volume24h: 7650400100,
    decimals: 2,
    iconColor: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.15)',
    spread: 0.05,
    leverageMax: 75,
    description: 'Blockchain de capa 1 de ultra alta velocidad con transacciones instantáneas.',
    sparkline: [181.2, 184.0, 187.5, 186.0, 191.0, 194.5, 193.0, 197.0, 198.45]
  },
  {
    id: 'xrp-usd',
    symbol: 'XRP/USD',
    name: 'Ripple Interbank Ledger',
    category: 'crypto',
    price: 1.4850,
    change24h: -1.24,
    high24h: 1.5400,
    low24h: 1.4200,
    volume24h: 3100500200,
    decimals: 4,
    iconColor: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    spread: 0.0008,
    leverageMax: 50,
    description: 'Protocolo de liquidación bruta en tiempo real para instituciones financieras bancarias.',
    sparkline: [1.51, 1.53, 1.52, 1.49, 1.47, 1.48, 1.46, 1.47, 1.485]
  },

  // FOREX
  {
    id: 'eur-usd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'forex',
    price: 1.0874,
    change24h: 0.42,
    high24h: 1.0910,
    low24h: 1.0825,
    volume24h: 185000000000,
    decimals: 4,
    iconColor: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    spread: 0.0001,
    leverageMax: 500,
    description: 'El par de divisas más negociado del mundo con spreads ultra ajustados.',
    sparkline: [1.0825, 1.0835, 1.0850, 1.0845, 1.0860, 1.0870, 1.0865, 1.0872, 1.0874]
  },
  {
    id: 'gbp-usd',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    category: 'forex',
    price: 1.2945,
    change24h: -0.18,
    high24h: 1.3010,
    low24h: 1.2890,
    volume24h: 98000000000,
    decimals: 4,
    iconColor: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    spread: 0.0002,
    leverageMax: 500,
    description: 'Conocido como "Cable", caracterizado por fuerte impulso en sesiones de Londres y New York.',
    sparkline: [1.299, 1.301, 1.298, 1.295, 1.292, 1.293, 1.291, 1.293, 1.2945]
  },
  {
    id: 'usd-jpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    category: 'forex',
    price: 154.22,
    change24h: 0.85,
    high24h: 154.95,
    low24h: 153.10,
    volume24h: 120000000000,
    decimals: 2,
    iconColor: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    spread: 0.015,
    leverageMax: 500,
    description: 'Par preferido para estrategias de carry trade y correlación con bonos del Tesoro de EE.UU.',
    sparkline: [153.1, 153.4, 153.8, 153.6, 154.0, 154.5, 154.1, 154.3, 154.22]
  },

  // COMMODITIES
  {
    id: 'xau-usd',
    symbol: 'GOLD (XAU/USD)',
    name: 'Gold Spot Bullion',
    category: 'commodities',
    price: 2748.50,
    change24h: 1.65,
    high24h: 2765.00,
    low24h: 2710.20,
    volume24h: 65000000000,
    decimals: 2,
    iconColor: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.15)',
    spread: 0.25,
    leverageMax: 200,
    description: 'El activo refugio por excelencia con máxima demanda institucional y apreciación histórica.',
    sparkline: [2710, 2722, 2730, 2725, 2738, 2745, 2740, 2746, 2748.5]
  },
  {
    id: 'wti-usd',
    symbol: 'OIL (WTI)',
    name: 'Crude Oil Light Sweet',
    category: 'commodities',
    price: 74.35,
    change24h: -2.15,
    high24h: 76.80,
    low24h: 73.50,
    volume24h: 29000000000,
    decimals: 2,
    iconColor: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    spread: 0.03,
    leverageMax: 100,
    description: 'Petróleo crudo West Texas Intermediate, barómetro de la economía y transporte industrial.',
    sparkline: [76.5, 76.8, 76.0, 75.2, 74.8, 74.1, 74.5, 74.0, 74.35]
  },

  // STOCKS & INDICES
  {
    id: 'nasdaq100',
    symbol: 'NAS100 (NDX)',
    name: 'Nasdaq 100 Tech Giants',
    category: 'indices',
    price: 21180.40,
    change24h: 2.30,
    high24h: 21320.00,
    low24h: 20750.00,
    volume24h: 88000000000,
    decimals: 2,
    iconColor: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.15)',
    spread: 1.2,
    leverageMax: 200,
    description: 'Índice de las 100 compañías tecnológicas más grandes: Apple, Microsoft, NVIDIA, Amazon, Google.',
    sparkline: [20750, 20850, 20980, 20920, 21050, 21140, 21100, 21160, 21180.4]
  },
  {
    id: 'sp500',
    symbol: 'US500 (S&P 500)',
    name: 'Standard & Poor 500',
    category: 'indices',
    price: 5942.15,
    change24h: 1.15,
    high24h: 5970.00,
    low24h: 5880.50,
    volume24h: 95000000000,
    decimals: 2,
    iconColor: '#14b8a6',
    bgColor: 'rgba(20, 184, 166, 0.15)',
    spread: 0.4,
    leverageMax: 200,
    description: 'Referente principal del mercado bursátil estadounidense que agrupa las 500 corporaciones líderes.',
    sparkline: [5880, 5895, 5910, 5905, 5925, 5938, 5930, 5940, 5942.15]
  },
  {
    id: 'nvda-stock',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'stocks',
    price: 146.80,
    change24h: 6.45,
    high24h: 149.20,
    low24h: 138.50,
    volume24h: 34000000000,
    decimals: 2,
    iconColor: '#84cc16',
    bgColor: 'rgba(132, 204, 22, 0.15)',
    spread: 0.05,
    leverageMax: 50,
    description: 'Líder absoluto de microchips y computación cuántica de Inteligencia Artificial a nivel mundial.',
    sparkline: [138.5, 140.2, 142.8, 141.5, 144.0, 146.1, 145.2, 146.5, 146.8]
  }
];

export const INITIAL_BOT_STRATEGIES: BotStrategyConfig[] = [
  {
    id: 'bot-quantum-ai',
    name: '🧠 Quantum Gemini AI Multiplier',
    tagline: 'Algoritmo de Frecuencia Neural con Aprendizaje Profundo',
    algorithmType: 'quantum_momentum',
    riskLevel: 'balanced',
    color: '#8b5cf6',
    accentGradient: 'from-purple-600 via-indigo-600 to-cyan-500',
    targetMonthlyROI: 34.8,
    winRate: 88.6,
    tradesCount: 1420,
    allocatedCapitalUSD: 15000,
    isActive: true,
    maxDrawdown: 3.8,
    preferredAssets: ['BTC/USD', 'GOLD (XAU/USD)', 'NAS100 (NDX)', 'NVDA'],
    takeProfitPct: 4.5,
    stopLossPct: 1.2,
    autoReinvest: true,
    description: 'Escanea patrones de velas fractales y volumen institucional con modelos Gemini para ejecutar entradas de alta probabilidad.',
    recentSignals: [
      { symbol: 'BTC/USD', action: 'BUY', price: 86400, confidence: 96, timestamp: 'Hace 4 min', pnl: 480.20 },
      { symbol: 'GOLD (XAU/USD)', action: 'BUY', price: 2728, confidence: 93, timestamp: 'Hace 18 min', pnl: 340.50 },
      { symbol: 'NVDA', action: 'BUY', price: 141.2, confidence: 91, timestamp: 'Hace 45 min', pnl: 215.80 }
    ]
  },
  {
    id: 'bot-scalp-sniper',
    name: '⚡ Scalper Sniper Turbo Pro',
    tagline: 'Micro-Operaciones de Alta Velocidad (1s - 5m)',
    algorithmType: 'scalp_sniper',
    riskLevel: 'aggressive',
    color: '#06b6d4',
    accentGradient: 'from-cyan-500 via-blue-600 to-teal-400',
    targetMonthlyROI: 48.2,
    winRate: 83.4,
    tradesCount: 3890,
    allocatedCapitalUSD: 8500,
    isActive: true,
    maxDrawdown: 5.5,
    preferredAssets: ['EUR/USD', 'ETH/USD', 'SOL/USD', 'USD/JPY'],
    takeProfitPct: 1.8,
    stopLossPct: 0.8,
    autoReinvest: true,
    description: 'Aprovecha las micro fluctuaciones de precios y rebotes en el libro de órdenes (Order Book) con ejecución sub-segundo.',
    recentSignals: [
      { symbol: 'SOL/USD', action: 'BUY', price: 192.4, confidence: 89, timestamp: 'Hace 2 min', pnl: 142.60 },
      { symbol: 'EUR/USD', action: 'SELL', price: 1.0882, confidence: 87, timestamp: 'Hace 12 min', pnl: 95.20 },
      { symbol: 'ETH/USD', action: 'BUY', price: 3390, confidence: 92, timestamp: 'Hace 28 min', pnl: 280.00 }
    ]
  },
  {
    id: 'bot-gold-forex-grid',
    name: '🛡️ Grid Master Institucional',
    tagline: 'Malla Geométrica de Compras/Ventas Automatizadas',
    algorithmType: 'grid_arbitrage',
    riskLevel: 'conservative',
    color: '#eab308',
    accentGradient: 'from-amber-500 via-yellow-500 to-orange-500',
    targetMonthlyROI: 22.4,
    winRate: 94.1,
    tradesCount: 890,
    allocatedCapitalUSD: 25000,
    isActive: true,
    maxDrawdown: 2.1,
    preferredAssets: ['GOLD (XAU/USD)', 'EUR/USD', 'US500 (S&P 500)'],
    takeProfitPct: 2.2,
    stopLossPct: 1.0,
    autoReinvest: true,
    description: 'Estrategia conservadora sin pérdidas acumulativas: genera ganancias constantes en mercados laterales y rangos de consolidación.',
    recentSignals: [
      { symbol: 'GOLD (XAU/USD)', action: 'BUY', price: 2735, confidence: 95, timestamp: 'Hace 8 min', pnl: 520.00 },
      { symbol: 'US500 (S&P 500)', action: 'BUY', price: 5920, confidence: 94, timestamp: 'Hace 35 min', pnl: 410.30 }
    ]
  }
];

// Generador de velas japonesas históricas de alta fidelidad
export function generateCandlesticks(basePrice: number, count: number = 40, volatility: number = 0.008): any[] {
  const candles = [];
  let currentPrice = basePrice * (1 - volatility * (count / 3));
  const now = Date.now();
  const stepMs = 60 * 1000 * 5; // 5 minutos por vela

  for (let i = count; i >= 0; i--) {
    const timestamp = now - i * stepMs;
    const dateObj = new Date(timestamp);
    const timeStr = dateObj.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' });

    const change = (Math.random() - 0.48) * (currentPrice * volatility);
    const open = currentPrice;
    const close = Math.max(0.0001, open + change);
    const high = Math.max(open, close) + Math.random() * (currentPrice * volatility * 0.6);
    const low = Math.min(open, close) - Math.random() * (currentPrice * volatility * 0.6);
    const volume = Math.floor(Math.random() * 500000 + 100000);

    candles.push({
      time: timeStr,
      timestamp,
      open: Number(open.toFixed(basePrice < 5 ? 4 : 2)),
      high: Number(high.toFixed(basePrice < 5 ? 4 : 2)),
      low: Number(low.toFixed(basePrice < 5 ? 4 : 2)),
      close: Number(close.toFixed(basePrice < 5 ? 4 : 2)),
      volume
    });

    currentPrice = close;
  }

  return candles;
}
