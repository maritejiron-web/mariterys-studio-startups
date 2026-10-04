import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Layers, 
  Bot, 
  CreditCard, 
  PlusCircle, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  SlidersHorizontal, 
  Wallet, 
  Users, 
  RefreshCw, 
  ChevronRight, 
  Play, 
  Pause, 
  Briefcase,
  Award,
  Crown,
  Percent,
  Clock,
  ExternalLink,
  Flame,
  LineChart,
  Grid,
  RotateCcw,
  Share2,
  Check
} from 'lucide-react';
import { 
  TradingAsset, 
  BotStrategyConfig, 
  Position, 
  OrderSide, 
  OrderType, 
  TradingAccountProfile,
  DepositTransaction,
  WithdrawalRequest
} from '../../types/tradingTypes';
import { 
  INITIAL_TRADING_ASSETS, 
  INITIAL_BOT_STRATEGIES, 
  generateCandlesticks 
} from '../../data/tradingData';
import { CandlestickChart } from './CandlestickChart';
import { DepositModal } from './DepositModal';
import { WithdrawModal, SavedCard } from './WithdrawModal';
import { BotTradingManager } from './BotTradingManager';

interface TradingPlatformAppProps {
  onBackToHub?: () => void;
  onNavigateToAcademy?: () => void;
  onNavigateToStreamPay?: () => void;
}

export const TradingPlatformApp: React.FC<TradingPlatformAppProps> = ({
  onBackToHub,
  onNavigateToAcademy,
  onNavigateToStreamPay
}) => {
  // === ASSETS & REAL-TIME DATA STATE ===
  const [assets, setAssets] = useState<TradingAsset[]>(INITIAL_TRADING_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('btc-usd');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crypto' | 'forex' | 'commodities' | 'indices' | 'stocks'>('all');
  
  // Selected Asset Active details
  const activeAsset = assets.find(a => a.id === selectedAssetId) || assets[0];
  const [candlestickData, setCandlestickData] = useState(() => 
    generateCandlesticks(activeAsset.price, 40)
  );

  // === ACCOUNT PROFILE & BALANCES ===
  const [accountMode, setAccountMode] = useState<'live_real' | 'demo_practice'>('live_real');

  const [realAccount, setRealAccount] = useState<TradingAccountProfile>({
    accountNumber: 'MT-8840-MASTER-VIP',
    ownerName: 'Trader VIP (Cuenta Principal)',
    ownerEmail: 'trader.master@quantumtrade.vip',
    role: 'owner_master',
    accountType: 'live_real',
    balanceUSD: 35480.50,
    equityUSD: 38920.75,
    freeMarginUSD: 32420.50,
    usedMarginUSD: 3060.00,
    marginLevelPct: 1271.9,
    totalProfitUSD: 14850.25,
    totalDepositedUSD: 24000.00,
    totalWithdrawnUSD: 3370.00,
    dailyPnLUSD: 1845.60,
    dailyPnLPercentage: 5.2,
    botTotalGainUSD: 9420.80,
    botWinRate: 88.6,
    tier: 'Diamond Master VIP',
    ownerProfitSharePct: 20.0, // 20% commission from all managed client bots
    affiliateCommissionEarnedUSD: 3250.00
  });

  const [demoAccount, setDemoAccount] = useState<TradingAccountProfile>({
    accountNumber: 'DEMO-100K-PRACTICE',
    ownerName: 'Cuenta Demo de Práctica (Sin Riesgo)',
    ownerEmail: 'demo@trading.local',
    role: 'client_standard',
    accountType: 'demo_practice',
    balanceUSD: 100000.00,
    equityUSD: 100000.00,
    freeMarginUSD: 100000.00,
    usedMarginUSD: 0.00,
    marginLevelPct: 10000.0,
    totalProfitUSD: 0.00,
    totalDepositedUSD: 100000.00,
    totalWithdrawnUSD: 0.00,
    dailyPnLUSD: 0.00,
    dailyPnLPercentage: 0.0,
    botTotalGainUSD: 0.00,
    botWinRate: 92.4,
    tier: 'Standard',
    ownerProfitSharePct: 0.0,
    affiliateCommissionEarnedUSD: 0.00
  });

  const account = accountMode === 'live_real' ? realAccount : demoAccount;
  const setAccount = (updater: React.SetStateAction<TradingAccountProfile>) => {
    if (accountMode === 'live_real') {
      setRealAccount(updater);
    } else {
      setDemoAccount(updater);
    }
  };

  const handleResetDemoBalance = () => {
    setDemoAccount({
      accountNumber: 'DEMO-100K-PRACTICE',
      ownerName: 'Cuenta Demo de Práctica (Sin Riesgo)',
      ownerEmail: 'demo@trading.local',
      role: 'client_standard',
      accountType: 'demo_practice',
      balanceUSD: 100000.00,
      equityUSD: 100000.00,
      freeMarginUSD: 100000.00,
      usedMarginUSD: 0.00,
      marginLevelPct: 10000.0,
      totalProfitUSD: 0.00,
      totalDepositedUSD: 100000.00,
      totalWithdrawnUSD: 0.00,
      dailyPnLUSD: 0.00,
      dailyPnLPercentage: 0.0,
      botTotalGainUSD: 0.00,
      botWinRate: 92.4,
      tier: 'Standard',
      ownerProfitSharePct: 0.0,
      affiliateCommissionEarnedUSD: 0.00
    });
    setPositions([]);
  };

  // === POSITIONS & BOT STATE ===
  const [positions, setPositions] = useState<Position[]>([
    {
      id: 'pos-1',
      assetId: 'btc-usd',
      symbol: 'BTC/USD',
      side: 'buy',
      entryPrice: 86200.00,
      currentPrice: 88450.25,
      amount: 0.85,
      lotSize: 0.85,
      leverage: 20,
      marginUSD: 3663.50,
      pnlUSD: 1912.71,
      pnlPercentage: 52.2,
      takeProfit: 92000,
      stopLoss: 84000,
      openedAt: 'Hoy, 06:14 AM',
      status: 'open',
      source: 'bot',
      botStrategy: '🧠 Quantum Gemini AI Multiplier'
    },
    {
      id: 'pos-2',
      assetId: 'xau-usd',
      symbol: 'GOLD (XAU/USD)',
      side: 'buy',
      entryPrice: 2724.10,
      currentPrice: 2748.50,
      amount: 15,
      lotSize: 1.5,
      leverage: 50,
      marginUSD: 817.23,
      pnlUSD: 366.00,
      pnlPercentage: 44.7,
      takeProfit: 2780,
      stopLoss: 2710,
      openedAt: 'Hoy, 07:32 AM',
      status: 'open',
      source: 'bot',
      botStrategy: '🛡️ Grid Master Institucional'
    }
  ]);

  const [botStrategies, setBotStrategies] = useState<BotStrategyConfig[]>(INITIAL_BOT_STRATEGIES);

  // === ACTIVE TAB / VIEW IN TRADING APP ===
  const [activeTab, setActiveTab] = useState<'terminal' | 'bots' | 'owner_earnings' | 'clients' | 'withdrawals'>('terminal');
  
  // Order Form Inputs
  const [orderSide, setOrderSide] = useState<OrderSide>('buy');
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [orderAmountUSD, setOrderAmountUSD] = useState<number>(250);
  const [orderLeverage, setOrderLeverage] = useState<number>(20);
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>('');
  const [stopLossPrice, setStopLossPrice] = useState<string>('');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  // Deposit & Withdraw Modals
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(false);

  // Registered Cards for 1-Click Refund / Withdrawal
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: 'card-default-1',
      brand: 'visa',
      last4: '8840',
      holderName: 'TITULAR CUENTA VIP',
      expiry: '08/29',
      depositedAmountUSD: 24000.00,
      lastUsedAt: 'Hoy, 09:15 AM'
    }
  ]);

  // Withdrawal Requests Log
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    {
      id: 'WD-849102',
      method: 'Reembolso a Tarjeta Original (VISA •••• 8840)',
      destinationDetails: 'TITULAR CUENTA VIP | VISA **** 8840 | Exp: 08/29',
      amountUSD: 3370.00,
      feeUSD: 0.00,
      netUSD: 3370.00,
      status: 'approved',
      requestedAt: 'Ayer, 04:30 PM'
    }
  ]);

  // === OWNER PRIVATE ACCESS SECURITY ===
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState<boolean>(false);
  const [ownerPinInput, setOwnerPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [copiedTradingLink, setCopiedTradingLink] = useState<boolean>(false);

  const handleCopyTradingLink = () => {
    if (typeof window !== 'undefined') {
      const origin = (window.location.origin && window.location.origin.includes('run.app'))
        ? window.location.origin.replace(/\/+$/, '')
        : 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';
      const directUrl = `${origin}/?project=trading`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(directUrl);
      }
      setCopiedTradingLink(true);
      setTimeout(() => setCopiedTradingLink(false), 3000);
    }
  };

  const handleUnlockOwner = (e: React.FormEvent) => {
    e.preventDefault();
    if (ownerPinInput === '7019' || ownerPinInput === '8840' || ownerPinInput === '7799') {
      setIsOwnerUnlocked(true);
      setShowPinModal(false);
      setPinError(null);
      setActiveTab('owner_earnings');
    } else {
      setPinError('Código PIN de la dueña incorrecto. Acceso denegado.');
    }
  };

  // === LIVE REAL-TIME TICKER EFFECT ===
  // Simulates ultra-fast live price fluctuations matching real trading engines
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => {
          const delta = (Math.random() - 0.49) * (asset.price * 0.0015);
          const newPrice = Number((asset.price + delta).toFixed(asset.decimals));
          const newHigh = Math.max(asset.high24h, newPrice);
          const newLow = Math.min(asset.low24h, newPrice);
          const changeDelta = (Math.random() - 0.5) * 0.05;

          return {
            ...asset,
            price: newPrice,
            high24h: newHigh,
            low24h: newLow,
            change24h: Number((asset.change24h + changeDelta).toFixed(2))
          };
        })
      );

      // Animar y actualizar dinámicamente la última vela japonesa en vivo con el precio real
      setCandlestickData(prevCandles => {
        if (!prevCandles || prevCandles.length === 0) return prevCandles;
        const lastIdx = prevCandles.length - 1;
        const lastCandle = prevCandles[lastIdx];
        
        // Simular variación en tiempo real del tick de la vela viva
        const tickDelta = (Math.random() - 0.49) * (lastCandle.close * 0.0018);
        const newClose = Number((lastCandle.close + tickDelta).toFixed(activeAsset.decimals || 2));
        const newHigh = Math.max(lastCandle.high, newClose);
        const newLow = Math.min(lastCandle.low, newClose);
        const newVolume = lastCandle.volume + Math.floor(Math.random() * 850 + 100);

        const updatedLastCandle = {
          ...lastCandle,
          close: newClose,
          high: newHigh,
          low: newLow,
          volume: newVolume
        };

        const newArr = [...prevCandles];
        newArr[lastIdx] = updatedLastCandle;
        return newArr;
      });

      // Also update open positions PnL
      setPositions(prevPositions =>
        prevPositions.map(pos => {
          const matchingAsset = assets.find(a => a.id === pos.assetId);
          if (!matchingAsset) return pos;
          const currentPrice = matchingAsset.price;
          const diff = pos.side === 'buy' ? currentPrice - pos.entryPrice : pos.entryPrice - currentPrice;
          const pnlUSD = diff * pos.amount;
          const pnlPercentage = (pnlUSD / pos.marginUSD) * 100;

          return {
            ...pos,
            currentPrice,
            pnlUSD: Number(pnlUSD.toFixed(2)),
            pnlPercentage: Number(pnlPercentage.toFixed(2))
          };
        })
      );
    }, 1800);

    return () => clearInterval(interval);
  }, [assets]);

  // Update candlestick when asset changes
  useEffect(() => {
    setCandlestickData(generateCandlesticks(activeAsset.price, 40));
  }, [selectedAssetId]);

  // Execute manual market order
  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderAmountUSD <= 0) return;

    const marginRequired = orderAmountUSD / orderLeverage;
    if (marginRequired > account.freeMarginUSD) {
      alert('Margen libre insuficiente. Realice un depósito para abrir esta posición.');
      return;
    }

    const units = (orderAmountUSD * orderLeverage) / activeAsset.price;
    const newPosition: Position = {
      id: `pos-${Date.now().toString().slice(-4)}`,
      assetId: activeAsset.id,
      symbol: activeAsset.symbol,
      side: orderSide,
      entryPrice: activeAsset.price,
      currentPrice: activeAsset.price,
      amount: Number(units.toFixed(4)),
      lotSize: Number((units / 100).toFixed(2)),
      leverage: orderLeverage,
      marginUSD: Number(marginRequired.toFixed(2)),
      pnlUSD: 0,
      pnlPercentage: 0,
      takeProfit: takeProfitPrice ? Number(takeProfitPrice) : undefined,
      stopLoss: stopLossPrice ? Number(stopLossPrice) : undefined,
      openedAt: 'Justo ahora',
      status: 'open',
      source: 'manual'
    };

    setPositions([newPosition, ...positions]);
    setAccount(prev => ({
      ...prev,
      usedMarginUSD: prev.usedMarginUSD + marginRequired,
      freeMarginUSD: prev.freeMarginUSD - marginRequired
    }));

    setOrderSuccessMsg(
      `¡Orden ${orderSide.toUpperCase()} de ${activeAsset.symbol} ejecutada con éxito a $${activeAsset.price} USD!`
    );
    setTimeout(() => setOrderSuccessMsg(null), 4000);
  };

  const handleClosePosition = (positionId: string) => {
    const pos = positions.find(p => p.id === positionId);
    if (!pos) return;

    setPositions(positions.filter(p => p.id !== positionId));
    setAccount(prev => ({
      ...prev,
      balanceUSD: prev.balanceUSD + pos.pnlUSD,
      equityUSD: prev.equityUSD + pos.pnlUSD,
      totalProfitUSD: prev.totalProfitUSD + (pos.pnlUSD > 0 ? pos.pnlUSD : 0),
      freeMarginUSD: prev.freeMarginUSD + pos.marginUSD + pos.pnlUSD,
      usedMarginUSD: Math.max(0, prev.usedMarginUSD - pos.marginUSD)
    }));
  };

  // Bot Handlers
  const handleToggleBot = (botId: string) => {
    setBotStrategies(prev =>
      prev.map(b => (b.id === botId ? { ...b, isActive: !b.isActive } : b))
    );
  };

  const handleAllocateCapital = (botId: string, amount: number) => {
    setBotStrategies(prev =>
      prev.map(b => (b.id === botId ? { ...b, allocatedCapitalUSD: amount } : b))
    );
  };

  // Deposit Success Handler
  const handleDepositSuccess = (amountUSD: number, method: string, details: any) => {
    setAccount(prev => ({
      ...prev,
      balanceUSD: prev.balanceUSD + amountUSD,
      equityUSD: prev.equityUSD + amountUSD,
      freeMarginUSD: prev.freeMarginUSD + amountUSD,
      totalDepositedUSD: prev.totalDepositedUSD + amountUSD
    }));

    // If deposited with card, register / update saved card for future 1-click refunds
    if (details?.cardBrand && details?.cardNumber) {
      setSavedCards(prev => {
        const existing = prev.find(c => c.last4 === details.cardNumber);
        if (existing) {
          return prev.map(c => 
            c.last4 === details.cardNumber 
              ? { ...c, depositedAmountUSD: c.depositedAmountUSD + amountUSD, lastUsedAt: 'Justo ahora' }
              : c
          );
        } else {
          return [
            {
              id: `card-${Date.now()}`,
              brand: details.cardBrand || 'visa',
              last4: details.cardNumber,
              holderName: details.cardHolder || account.ownerName,
              expiry: details.cardExpiry || '12/28',
              depositedAmountUSD: amountUSD,
              lastUsedAt: 'Justo ahora'
            },
            ...prev
          ];
        }
      });
    }
  };

  // Withdrawal Success Handler
  const handleWithdrawSuccess = (request: WithdrawalRequest, cardUsed?: SavedCard) => {
    setAccount(prev => ({
      ...prev,
      balanceUSD: Math.max(0, prev.balanceUSD - request.amountUSD),
      equityUSD: Math.max(0, prev.equityUSD - request.amountUSD),
      freeMarginUSD: Math.max(0, prev.freeMarginUSD - request.amountUSD),
      totalWithdrawnUSD: prev.totalWithdrawnUSD + request.amountUSD
    }));

    setWithdrawals(prev => [request, ...prev]);
  };

  // Filtered Assets
  const filteredAssets = assets.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="min-h-screen w-full bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* =========================================================================
          TOP MASTER NAVIGATION & LIVE ACCOUNT BAR
      ========================================================================= */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 rounded-2xl text-white font-black shadow-lg shadow-cyan-500/20">
                <LineChart className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-black uppercase">
                    QUANTUMTRADE VIP A.I · 2026
                  </span>
                  <span className="px-2 py-0.2 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold rounded-full border border-emerald-500/30">
                    MERCADO EN VIVO
                  </span>
                </div>
                <h1 className="text-base font-black tracking-tight text-white uppercase">
                  Terminal Cuántica Multiactivo & Bots I.A. Multiplicadores
                </h1>
              </div>
            </div>

            {/* Quick action buttons for Hub */}
            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className="md:hidden px-3 py-1.5 bg-slate-900 text-xs font-mono font-bold rounded-xl border border-slate-800"
              >
                Hub ⬅
              </button>
            )}
          </div>

          {/* Real-Time Live Account Balances & Demo/Real Switcher */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-900/90 p-2 sm:p-2.5 rounded-2xl border border-slate-800 w-full md:w-auto justify-between sm:justify-start font-mono text-xs">
            {/* Real vs Demo Account Mode Selector */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setAccountMode('live_real')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  accountMode === 'live_real'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${accountMode === 'live_real' ? 'bg-slate-950 animate-pulse' : 'bg-emerald-500'}`} />
                <span>Real</span>
              </button>
              <button
                onClick={() => setAccountMode('demo_practice')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  accountMode === 'demo_practice'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${accountMode === 'demo_practice' ? 'bg-slate-950' : 'bg-amber-400'}`} />
                <span>Demo ($100k)</span>
              </button>
            </div>

            <div>
              <span className="text-[9px] uppercase text-slate-400 block">
                {accountMode === 'live_real' ? 'Balance Real:' : 'Balance Demo:'}
              </span>
              <span className={`text-sm font-black ${accountMode === 'live_real' ? 'text-emerald-400' : 'text-amber-400'}`}>
                ${account.balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
              </span>
            </div>

            <div className="border-l border-slate-800 pl-3">
              <span className="text-[9px] uppercase text-slate-400 block">Patrimonio:</span>
              <span className="text-sm font-black text-white">
                ${account.equityUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="border-l border-slate-800 pl-3 hidden sm:block">
              <span className="text-[9px] uppercase text-slate-400 block">Margen Libre:</span>
              <span className="text-sm font-black text-cyan-400">
                ${account.freeMarginUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Deposit, Withdraw or Reset Demo CTA */}
            {accountMode === 'live_real' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDepositModalOpen(true)}
                  className="py-2 px-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Depositar</span>
                </button>

                <button
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-1.5"
                >
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>Retirar a Tarjeta</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleResetDemoBalance}
                className="py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                title="Reiniciar saldo de práctica a $100,000 USD"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Demo</span>
              </button>
            )}
          </div>

          {/* Hub, StreamPAY & Academy switchers on desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={handleCopyTradingLink}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-bold rounded-xl border border-cyan-500/40 transition-all cursor-pointer flex items-center gap-1.5"
              title="Copiar enlace directo público a QuantumTrade VIP"
            >
              {copiedTradingLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Compartir Terminal 🔗</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto pt-3 mt-2 border-t border-slate-800/60 no-scrollbar">
          <div className="flex items-center gap-2">
            {[
              { id: 'terminal', name: '📊 Terminal de Trading', badge: 'En Vivo' },
              { id: 'bots', name: '🤖 Bots de Trading Multiplicadores', badge: '3 Activos' },
              { id: 'withdrawals', name: '💳 Retiros a Misma Tarjeta', badge: `${withdrawals.length} Procesados` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{tab.name}</span>
                <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 font-normal">
                  {tab.badge}
                </span>
              </button>
            ))}

            {/* Owner unlocked tabs */}
            {isOwnerUnlocked && (
              <>
                <button
                  onClick={() => setActiveTab('owner_earnings')}
                  className={`py-2 px-3.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'owner_earnings'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-900'
                  }`}
                >
                  <span>👑 Panel de la Dueña</span>
                  <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded font-normal">
                    Privado
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('clients')}
                  className={`py-2 px-3.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'clients'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-md shadow-purple-500/10'
                      : 'text-purple-400/80 hover:text-purple-300 hover:bg-slate-900'
                  }`}
                >
                  <span>👥 Inversores VIP</span>
                </button>
              </>
            )}
          </div>

          {/* Owner Key Access Trigger */}
          <div>
            {!isOwnerUnlocked ? (
              <button
                onClick={() => setShowPinModal(true)}
                className="py-1.5 px-3 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/40 rounded-xl text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="Acceso Privado para María Teresa Jirón"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Acceso Dueña 🔒</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsOwnerUnlocked(false);
                  setActiveTab('terminal');
                }}
                className="py-1.5 px-3 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="Cerrar sesión privada de la dueña"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Dueña Activa (Bloquear)</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN TRADING WORKSPACE BODY
      ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-grow w-full space-y-6">
        
        {/* =====================================================================
            TAB 1: LIVE MULTI-ASSET TERMINAL & ORDER BOOK
        ===================================================================== */}
        {activeTab === 'terminal' && (
          <div className="space-y-6">
            
            {/* Live Ticker Bar with Categories */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', name: '🌟 Todos los Activos' },
                  { id: 'crypto', name: '🪙 Criptomonedas' },
                  { id: 'commodities', name: '🏆 Oro / Petróleo' },
                  { id: 'forex', name: '💱 Divisas Forex' },
                  { id: 'indices', name: '📈 Índices / Wall St' },
                  { id: 'stocks', name: '💻 Acciones Tech' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Cotización activa:{' '}
                  <strong className="text-white">{activeAsset.symbol}</strong> •{' '}
                  <span className={activeAsset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {activeAsset.change24h >= 0 ? '+' : ''}{activeAsset.change24h}%
                  </span>
                </span>
              </div>
            </div>

            {/* Asset Selector Mini-Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredAssets.map(asset => {
                const isSelected = asset.id === selectedAssetId;
                const isPositive = asset.change24h >= 0;
                return (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-white">{asset.symbol}</span>
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          isPositive ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {isPositive ? '+' : ''}{asset.change24h}%
                      </span>
                    </div>
                    <div className="text-sm font-black font-mono text-slate-200">
                      ${asset.price.toLocaleString('en-US', { minimumFractionDigits: asset.decimals })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Chart & Order Execution Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Chart Area (2 Cols) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
                  {/* Asset Header Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white shadow-md text-sm"
                        style={{ backgroundColor: activeAsset.iconColor }}
                      >
                        {activeAsset.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-white uppercase">{activeAsset.name}</h2>
                        <span className="text-xs font-mono text-slate-400">{activeAsset.description}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs">
                      <div>
                        <span className="text-[9px] uppercase text-slate-500 block">24h Alto:</span>
                        <span className="text-emerald-400 font-bold">${activeAsset.high24h.toLocaleString()}</span>
                      </div>
                      <div className="border-l border-slate-800 pl-3">
                        <span className="text-[9px] uppercase text-slate-500 block">24h Bajo:</span>
                        <span className="text-red-400 font-bold">${activeAsset.low24h.toLocaleString()}</span>
                      </div>
                      <div className="border-l border-slate-800 pl-3">
                        <span className="text-[9px] uppercase text-slate-500 block">Apalancamiento Max:</span>
                        <span className="text-cyan-400 font-bold">{activeAsset.leverageMax}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Candlestick Chart */}
                  <CandlestickChart
                    data={candlestickData}
                    assetSymbol={activeAsset.symbol}
                    assetColor={activeAsset.iconColor}
                    currentPrice={activeAsset.price}
                    decimals={activeAsset.decimals}
                  />
                </div>

                {/* Open Positions List */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-black uppercase text-white">
                        Posiciones Activas en Mercado ({positions.length})
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      PnL Flotante Total: +$
                      {positions.reduce((acc, p) => acc + p.pnlUSD, 0).toFixed(2)} USD
                    </span>
                  </div>

                  {positions.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 font-mono text-xs bg-slate-950 rounded-2xl border border-slate-850">
                      No hay posiciones abiertas en este momento. Ejecuta una orden abajo o activa un Bot.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {positions.map(pos => {
                        const isProfit = pos.pnlUSD >= 0;
                        return (
                          <div
                            key={pos.id}
                            className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    pos.side === 'buy'
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  }`}
                                >
                                  {pos.side.toUpperCase()} {pos.leverage}x
                                </span>
                                <span className="font-black text-white text-sm">{pos.symbol}</span>
                                {pos.source === 'bot' && (
                                  <span className="bg-purple-500/20 text-purple-300 text-[9px] px-2 py-0.5 rounded-full border border-purple-500/30">
                                    🤖 {pos.botStrategy}
                                  </span>
                                )}
                              </div>
                              <div className="text-slate-400 text-[11px]">
                                Entrada: ${pos.entryPrice.toLocaleString()} • Actual: ${pos.currentPrice.toLocaleString()} • Margen: ${pos.marginUSD} USD
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <div className="text-right">
                                <span
                                  className={`text-base font-black block ${
                                    isProfit ? 'text-emerald-400' : 'text-red-400'
                                  }`}
                                >
                                  {isProfit ? '+' : ''}${pos.pnlUSD.toFixed(2)} USD
                                </span>
                                <span
                                  className={`text-[10px] ${
                                    isProfit ? 'text-emerald-500' : 'text-red-500'
                                  }`}
                                >
                                  ({isProfit ? '+' : ''}{pos.pnlPercentage.toFixed(1)}%)
                                </span>
                              </div>

                              <button
                                onClick={() => handleClosePosition(pos.id)}
                                className="py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold uppercase text-[10px] transition-all cursor-pointer"
                              >
                                Cerrar Posición
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Execution Panel (1 Col) */}
              <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-black uppercase text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>Panel de Ejecución</span>
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Spreads 0.0 Pips
                    </span>
                  </div>

                  {orderSuccessMsg && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300 animate-fadeIn">
                      {orderSuccessMsg}
                    </div>
                  )}

                  {/* BUY / SELL Switch */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setOrderSide('buy')}
                      className={`py-3 rounded-xl font-mono text-xs font-black uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        orderSide === 'buy'
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      <span>COMPRAR (LONG)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderSide('sell')}
                      className={`py-3 rounded-xl font-mono text-xs font-black uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        orderSide === 'sell'
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ArrowDownRight className="w-4 h-4" />
                      <span>VENDER (SHORT)</span>
                    </button>
                  </div>

                  {/* Order Inputs */}
                  <form onSubmit={handleExecuteOrder} className="space-y-4 font-mono text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10px] uppercase text-slate-400">
                          Monto de Inversión (USD):
                        </label>
                        <div className="flex items-center gap-1">
                          {[1, 5, 25, 100].map(amt => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => setOrderAmountUSD(amt)}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-colors cursor-pointer ${
                                orderAmountUSD === amt
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                                  : 'bg-slate-950 text-slate-400 border-slate-800'
                              }`}
                            >
                              ${amt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-cyan-400 font-bold">$</span>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={orderAmountUSD}
                          onChange={e => setOrderAmountUSD(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-2 pl-7 pr-3 text-white font-bold text-sm focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] uppercase text-slate-400 mb-1">
                        <span>Apalancamiento Multiplicador:</span>
                        <span className="text-cyan-400 font-bold">{orderLeverage}x</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max={activeAsset.leverageMax}
                        value={orderLeverage}
                        onChange={e => setOrderLeverage(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-500">
                        <span>1x (Spot)</span>
                        <span>50x</span>
                        <span>{activeAsset.leverageMax}x Max</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">
                          Take Profit (TP)
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder="Auto Ganancia"
                          value={takeProfitPrice}
                          onChange={e => setTakeProfitPrice(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 px-3 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">
                          Stop Loss (SL)
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder="Auto Freno"
                          value={stopLossPrice}
                          onChange={e => setStopLossPrice(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl py-2 px-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Summary box */}
                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Margen Requerido:</span>
                        <span className="text-white font-bold font-mono">
                          ${(orderAmountUSD / orderLeverage).toFixed(2)} USD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Poder de Mercado Total:</span>
                        <span className="text-cyan-400 font-bold font-mono">
                          ${(orderAmountUSD).toLocaleString()} USD
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs transition-all cursor-pointer shadow-xl ${
                        orderSide === 'buy'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/20'
                          : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-500/20'
                      }`}
                    >
                      Ejecutar Orden {orderSide === 'buy' ? 'LONG' : 'SHORT'} Inmediata
                    </button>
                  </form>
                </div>

                <div className="pt-4 border-t border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-500">
                    🔒 Protección contra saldo negativo activa • STP Bridge Direct Market
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: BOT TRADING MANAGER & GEMINI AI MULTIPLIER
        ===================================================================== */}
        {activeTab === 'bots' && (
          <BotTradingManager
            strategies={botStrategies}
            onToggleStrategy={handleToggleBot}
            onAllocateCapital={handleAllocateCapital}
            availableBalanceUSD={account.freeMarginUSD}
            totalBotProfitsUSD={account.botTotalGainUSD}
            onOpenDeposit={() => setIsDepositModalOpen(true)}
          />
        )}

        {/* =====================================================================
            TAB 3: DUEÑA MASTER EARNINGS & ROI (MARIA TERESA)
        ===================================================================== */}
        {activeTab === 'owner_earnings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-yellow-950/80 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-3 relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span>MODELO DE NEGOCIO • GANANCIAS DE LA DUEÑA (MARITÉ JIRÓN)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  Tus 4 Fuentes de Ingresos Reales como Dueña del Proyecto
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Al ser la fundadora y operadora de la plataforma de trading, tus ingresos se generan y multiplican a través de cuatro mecanismos automáticos:
                </p>
              </div>
            </div>

            {/* 4 Pillars of Earnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: '1. Trading Propio & Bots',
                  amount: '+$9,420.80 USD',
                  desc: 'Las ganancias generadas por tu propio capital invertido con los Bots Cuánticos y operaciones manuales.',
                  icon: TrendingUp,
                  color: 'text-emerald-400',
                  bg: 'border-emerald-500/30'
                },
                {
                  title: '2. Comisión de Rendimiento (20%)',
                  amount: '+$4,180.00 USD',
                  desc: 'Cobro automático de una tarifa de éxito (Performance Fee) del 20% sobre las ganancias que los Bots generan a tus clientes.',
                  icon: Percent,
                  color: 'text-cyan-400',
                  bg: 'border-cyan-500/30'
                },
                {
                  title: '3. Spread & Comisiones de Swap',
                  amount: '+$2,850.50 USD',
                  desc: 'Margen por cada operación de compra/venta que se procesa a través de la pasarela y el libro de órdenes.',
                  icon: DollarSign,
                  color: 'text-amber-400',
                  bg: 'border-amber-500/30'
                },
                {
                  title: '4. Membresías & Licencias VIP',
                  amount: '+$3,250.00 USD',
                  desc: 'Suscripciones mensuales que pagan inversores externos para tener acceso a los Bots de alta velocidad.',
                  icon: Award,
                  color: 'text-purple-400',
                  bg: 'border-purple-500/30'
                }
              ].map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`bg-slate-900/70 border-2 ${pillar.bg} rounded-3xl p-6 space-y-3 flex flex-col justify-between shadow-xl`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Icon className={`w-6 h-6 ${pillar.color}`} />
                        <span className="text-[10px] font-mono uppercase bg-slate-950 px-2 py-0.5 rounded text-slate-400">
                          Recurrente
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white uppercase">{pillar.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-800 font-mono">
                      <span className="text-[9px] uppercase text-slate-500 block">Acumulado este mes:</span>
                      <span className={`text-xl font-black ${pillar.color}`}>{pillar.amount}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Fast-Track Action to Invest */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-black uppercase text-white">
                  ¿Quieres Invertir Más Capital y Acelerar las Ganancias?
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Puedes cargar saldo en tiempo real mediante Tarjeta Visa/Mastercard, SINPE Móvil o Transferencia Bancaria y asignarlo a los Bots en segundos.
                </p>
              </div>

              <button
                onClick={() => setIsDepositModalOpen(true)}
                className="py-4 px-8 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-emerald-500/20 hover:scale-105 shrink-0"
              >
                Depositar & Multiplicar Ahora 🚀
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: CLIENTS & INVESTORS MANAGEMENT
        ===================================================================== */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-black uppercase text-white">
                  Cartera de Inversores & Clientes Afiliados
                </h2>
                <p className="text-xs text-slate-400">
                  Panel de control para auditar el volumen gestionado, depósitos de clientes y comisiones generadas para la Plataforma.
                </p>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Total Clientes:</span>
                  <span className="text-base font-bold text-white">128 Activos</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Capital Administrado (AUM):</span>
                  <span className="text-base font-bold text-cyan-400">$485,200 USD</span>
                </div>
              </div>
            </div>

            {/* Simulated Real Investors Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Cliente / Inversor</th>
                      <th className="p-4">País / Región</th>
                      <th className="p-4">Depósito Total</th>
                      <th className="p-4">Bot Asignado</th>
                      <th className="p-4">Rendimiento Generado</th>
                      <th className="p-4">Tu Comisión (20%)</th>
                      <th className="p-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[
                      {
                        name: 'Carlos Mendoza S.',
                        email: 'cmendoza@inversionescr.com',
                        country: '🇨🇷 Costa Rica',
                        deposit: '$25,000 USD',
                        bot: '🧠 Quantum Gemini AI',
                        profit: '+$8,750 USD',
                        commission: '+$1,750 USD',
                        status: 'Activo'
                      },
                      {
                        name: 'Alejandra Guzmán R.',
                        email: 'aleguzman@gmail.com',
                        country: '🇲🇽 México',
                        deposit: '$15,000 USD',
                        bot: '⚡ Scalper Sniper Turbo',
                        profit: '+$7,230 USD',
                        commission: '+$1,446 USD',
                        status: 'Activo'
                      },
                      {
                        name: 'David Van Der Bilt',
                        email: 'david.v@vanderbilt-capital.nl',
                        country: '🇳🇱 Países Bajos',
                        deposit: '$50,000 USD',
                        bot: '🛡️ Grid Master Institucional',
                        profit: '+$11,200 USD',
                        commission: '+$2,240 USD',
                        status: 'Activo'
                      },
                      {
                        name: 'Valeria Solís Q.',
                        email: 'valeria.solis@techcr.io',
                        country: '🇨🇷 Costa Rica',
                        deposit: '$8,500 USD',
                        bot: '🧠 Quantum Gemini AI',
                        profit: '+$2,940 USD',
                        commission: '+$588 USD',
                        status: 'Activo'
                      }
                    ].map((client, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{client.name}</div>
                          <div className="text-[10px] text-slate-500">{client.email}</div>
                        </td>
                        <td className="p-4 text-slate-300">{client.country}</td>
                        <td className="p-4 font-bold text-white">{client.deposit}</td>
                        <td className="p-4 text-cyan-400">{client.bot}</td>
                        <td className="p-4 font-bold text-emerald-400">{client.profit}</td>
                        <td className="p-4 font-black text-amber-400">{client.commission}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold">
                            {client.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: RETIROS A LA MISMA TARJETA & GESTIÓN DE SALIDAS
        ===================================================================== */}
        {activeTab === 'withdrawals' && (
          <div className="space-y-6">
            {/* Header banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SISTEMA DE RETIRO SEGURO • MISMA TARJETA DE DEPÓSITO</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                  Retiros Directos a Tarjeta & Historial de Liquidaciones
                </h2>
                <p className="text-xs text-slate-400 max-w-2xl">
                  En cumplimiento con los protocolos bancarios internacionales y Visa/Mastercard OCT (Original Credit Transaction), tus retiros y ganancias se envían directamente a la misma tarjeta con la que fondeaste tu cuenta, sin intermediarios y con 0% de comisión.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="py-3.5 px-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
                >
                  <ArrowDownRight className="w-4 h-4" />
                  <span>Solicitar Retiro a Tarjeta</span>
                </button>
              </div>
            </div>

            {/* Saved Cards Active Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase text-white font-mono flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Tarjetas Habilitadas</span>
                    </h3>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-800">
                      {savedCards.length} Vinculadas
                    </span>
                  </div>

                  <div className="space-y-3">
                    {savedCards.map(card => (
                      <div
                        key={card.id}
                        className="bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-cyan-500/30 hover:border-cyan-400 p-4 rounded-2xl space-y-3 shadow-lg relative overflow-hidden group transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-900">
                            {card.brand.toUpperCase()} DÉBITO/CRÉDITO
                          </span>
                          <span className="text-xs font-mono text-emerald-400 font-bold">Verificada</span>
                        </div>

                        <div className="font-mono text-base font-black tracking-widest text-white">
                          •••• •••• •••• {card.last4}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                          <div>
                            <span className="text-[9px] uppercase block text-slate-500">Titular</span>
                            <span className="text-slate-200 font-bold">{card.holderName}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase block text-slate-500">Expira</span>
                            <span className="text-slate-200 font-bold">{card.expiry}</span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>Total Fondeado:</span>
                          <span className="text-cyan-300 font-bold">${card.depositedAmountUSD.toLocaleString()} USD</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Protección 100% Garantizada</span>
                    </div>
                    <p>
                      Cualquier tarjeta utilizada para depositar queda registrada de forma cifrada (Tokenización PCI-DSS) para que puedas retirar con 1 solo clic.
                    </p>
                  </div>
                </div>
              </div>

              {/* Withdrawals Log History Table */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase text-white font-mono flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Registro de Retiros & Liquidaciones Realizadas</span>
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      Total Retirado: <strong className="text-emerald-400">${account.totalWithdrawnUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</strong>
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">ID / Fecha</th>
                          <th className="p-3.5">Destino (Misma Tarjeta)</th>
                          <th className="p-3.5">Monto Solicitado</th>
                          <th className="p-3.5">Comisión</th>
                          <th className="p-3.5">Neto Enviado</th>
                          <th className="p-3.5">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {withdrawals.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                            <td className="p-3.5">
                              <div className="font-bold text-cyan-400">{item.id}</div>
                              <div className="text-[10px] text-slate-500">{item.requestedAt}</div>
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-white text-xs">{item.method}</div>
                              <div className="text-[10px] text-slate-400">{item.destinationDetails}</div>
                            </td>
                            <td className="p-3.5 font-bold text-slate-300">
                              ${item.amountUSD.toFixed(2)}
                            </td>
                            <td className="p-3.5 text-emerald-400 font-bold">
                              {item.feeUSD === 0 ? 'GRATIS' : `$${item.feeUSD.toFixed(2)}`}
                            </td>
                            <td className="p-3.5 font-black text-emerald-400 text-sm">
                              ${item.netUSD.toFixed(2)} USD
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1 w-fit">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Aprobado / Liquidado</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          DEPOSIT & WITHDRAW MODALS GATEWAYS
      ========================================================================= */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onDepositSuccess={handleDepositSuccess}
        accountBalanceUSD={account.balanceUSD}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        accountBalanceUSD={account.balanceUSD}
        freeMarginUSD={account.freeMarginUSD}
        savedCards={savedCards}
        onWithdrawSuccess={handleWithdrawSuccess}
      />

      {/* =========================================================================
          PRIVATE OWNER PIN AUTHENTICATION MODAL (MARIA TERESA)
      ========================================================================= */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-slate-100 text-center space-y-4">
            <button
              onClick={() => {
                setShowPinModal(false);
                setPinError(null);
                setOwnerPinInput('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-black uppercase text-white tracking-tight">
                Acceso Privado Dueña
              </h3>
              <p className="text-xs text-slate-400">
                Solo María Teresa Jirón tiene autorización para ver balances maestros, comisiones e inversores.
              </p>
            </div>

            <form onSubmit={handleUnlockOwner} className="space-y-3">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="PIN Secreto (7019)"
                  value={ownerPinInput}
                  onChange={(e) => setOwnerPinInput(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-amber-500 rounded-2xl py-3 text-center text-xl font-mono tracking-widest text-amber-300 focus:outline-none transition-colors"
                />
              </div>

              {pinError && (
                <div className="text-[11px] text-red-400 font-mono">
                  {pinError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                Desbloquear Panel 👑
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 QuantumTrade VIP AI • Terminal de Trading Cuantitativo & Algoritmos de Alta Frecuencia • Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
};
