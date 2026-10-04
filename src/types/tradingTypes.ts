// Types and interfaces for the Real-Time Multi-Asset Color Trading Platform, Bot Engine & Payment Gateways

export type AssetCategory = 'crypto' | 'forex' | 'stocks' | 'commodities' | 'indices';

export interface TradingAsset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  change24h: number; // percentage
  high24h: number;
  low24h: number;
  volume24h: number;
  decimals: number;
  iconColor: string;
  bgColor: string;
  sparkline: number[];
  spread: number;
  leverageMax: number;
  description: string;
}

export interface CandleData {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[]; // Buyers (Green)
  asks: OrderBookEntry[]; // Sellers (Red)
  lastPrice: number;
}

export type OrderType = 'market' | 'limit' | 'stop_loss';
export type OrderSide = 'buy' | 'sell';
export type OrderStatus = 'open' | 'filled' | 'cancelled' | 'closed';

export interface Position {
  id: string;
  assetId: string;
  symbol: string;
  side: OrderSide;
  entryPrice: number;
  currentPrice: number;
  amount: number; // in base units
  lotSize: number;
  leverage: number;
  marginUSD: number;
  pnlUSD: number;
  pnlPercentage: number;
  takeProfit?: number;
  stopLoss?: number;
  openedAt: string;
  status: 'open' | 'closed';
  closedAt?: string;
  closedPrice?: number;
  source: 'manual' | 'bot';
  botStrategy?: string;
}

export interface BotStrategyConfig {
  id: string;
  name: string;
  tagline: string;
  algorithmType: 'quantum_momentum' | 'scalp_sniper' | 'grid_arbitrage' | 'ai_deep_trend' | 'neural_breakout';
  riskLevel: 'conservative' | 'balanced' | 'aggressive' | 'extreme';
  color: string;
  accentGradient: string;
  targetMonthlyROI: number; // e.g. 28.5%
  winRate: number; // e.g. 84.2%
  tradesCount: number;
  allocatedCapitalUSD: number;
  isActive: boolean;
  maxDrawdown: number; // e.g. 4.2%
  preferredAssets: string[];
  takeProfitPct: number;
  stopLossPct: number;
  autoReinvest: boolean;
  description: string;
  recentSignals: {
    symbol: string;
    action: 'BUY' | 'SELL';
    price: number;
    confidence: number;
    timestamp: string;
    pnl?: number;
  }[];
}

export interface DepositTransaction {
  id: string;
  method: 'card_visa' | 'card_mastercard' | 'card_amex' | 'stripe' | 'crypto_usdt' | 'sinpe_movil' | 'bank_transfer';
  cardBrand?: string;
  lastFour?: string;
  amountUSD: number;
  amountCRC?: number;
  feeUSD: number;
  netUSD: number;
  status: 'completed' | 'processing' | 'pending_verification';
  clientName: string;
  clientEmail: string;
  referenceNumber: string;
  timestamp: string;
}

export interface WithdrawalRequest {
  id: string;
  method: string;
  destinationDetails: string;
  amountUSD: number;
  feeUSD: number;
  netUSD: number;
  status: 'approved' | 'processing' | 'pending';
  requestedAt: string;
}

export interface TradingAccountProfile {
  accountNumber: string;
  ownerName: string;
  ownerEmail: string;
  role: 'owner_master' | 'client_vip' | 'client_standard';
  accountType: 'live_real' | 'demo_practice';
  balanceUSD: number;
  equityUSD: number;
  freeMarginUSD: number;
  usedMarginUSD: number;
  marginLevelPct: number;
  totalProfitUSD: number;
  totalDepositedUSD: number;
  totalWithdrawnUSD: number;
  dailyPnLUSD: number;
  dailyPnLPercentage: number;
  botTotalGainUSD: number;
  botWinRate: number;
  tier: 'Diamond Master VIP' | 'Gold Pro' | 'Standard';
  ownerProfitSharePct: number; // e.g. 20% performance fee or 0% for master
  affiliateCommissionEarnedUSD: number;
}
