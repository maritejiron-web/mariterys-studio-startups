import React, { useEffect, useRef } from 'react';
import { CandleData } from '../../types/tradingTypes';

interface CandlestickChartProps {
  data: CandleData[];
  assetSymbol: string;
  assetColor: string;
  currentPrice: number;
  decimals?: number;
  showIndicators?: boolean;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  assetSymbol,
  assetColor,
  currentPrice,
  decimals = 2,
  showIndicators = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Padding
    const padding = { top: 30, right: 65, bottom: 40, left: 15 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Find min and max price
    let minPrice = Math.min(...data.map(d => d.low));
    let maxPrice = Math.max(...data.map(d => d.high));
    const priceRange = maxPrice - minPrice || 1;
    // Add 5% padding to price range
    minPrice -= priceRange * 0.05;
    maxPrice += priceRange * 0.05;
    const adjustedRange = maxPrice - minPrice;

    const getY = (price: number) => {
      return padding.top + chartHeight - ((price - minPrice) / adjustedRange) * chartHeight;
    };

    // Draw grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    const gridLinesCount = 6;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';

    for (let i = 0; i <= gridLinesCount; i++) {
      const price = minPrice + (adjustedRange / gridLinesCount) * i;
      const y = getY(price);

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Price labels on right axis
      ctx.fillText(price.toFixed(decimals), width - padding.right + 8, y + 3);
    }

    ctx.setLineDash([]); // Reset dashed

    // Candle widths
    const candleSpacing = chartWidth / data.length;
    const candleWidth = Math.max(3, candleSpacing * 0.7);

    // Calculate EMA (Exponential Moving Average 9 & 21) for colorful technical overlay
    const ema9: number[] = [];
    const ema21: number[] = [];
    const k9 = 2 / (9 + 1);
    const k21 = 2 / (21 + 1);

    data.forEach((d, idx) => {
      if (idx === 0) {
        ema9.push(d.close);
        ema21.push(d.close);
      } else {
        ema9.push(d.close * k9 + ema9[idx - 1] * (1 - k9));
        ema21.push(d.close * k21 + ema21[idx - 1] * (1 - k21));
      }
    });

    // Draw Volume bars at bottom
    const maxVolume = Math.max(...data.map(d => d.volume)) || 1;
    const volumeAreaHeight = chartHeight * 0.22;

    data.forEach((candle, i) => {
      const x = padding.left + i * candleSpacing + candleSpacing / 2;
      const isBullish = candle.close >= candle.open;
      const volHeight = (candle.volume / maxVolume) * volumeAreaHeight;
      const volY = padding.top + chartHeight - volHeight;

      ctx.fillStyle = isBullish ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
      ctx.fillRect(x - candleWidth / 2, volY, candleWidth, volHeight);
    });

    // Draw EMA Lines (Indicators)
    if (showIndicators) {
      // EMA 9 (Cyan Fast Line)
      ctx.beginPath();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      data.forEach((_, i) => {
        const x = padding.left + i * candleSpacing + candleSpacing / 2;
        const y = getY(ema9[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // EMA 21 (Yellow Slow Trend Line)
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      data.forEach((_, i) => {
        const x = padding.left + i * candleSpacing + candleSpacing / 2;
        const y = getY(ema21[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Draw Candlesticks (Velas Japonesas en Verde Neón y Rojo Vibrante)
    data.forEach((candle, i) => {
      const x = padding.left + i * candleSpacing + candleSpacing / 2;
      const isBullish = candle.close >= candle.open;

      const openY = getY(candle.open);
      const closeY = getY(candle.close);
      const highY = getY(candle.high);
      const lowY = getY(candle.low);

      const topBodyY = Math.min(openY, closeY);
      const bodyHeight = Math.max(2, Math.abs(closeY - openY));

      const bullishColor = '#10b981'; // Emerald 500
      const bearishColor = '#ef4444'; // Red 500
      const candleColor = isBullish ? bullishColor : bearishColor;

      // Draw Wick (Mecha superior e inferior)
      ctx.beginPath();
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.2;
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw Body (Cuerpo de la vela con gradiente de color brillante)
      ctx.fillStyle = candleColor;
      ctx.fillRect(x - candleWidth / 2, topBodyY, candleWidth, bodyHeight);

      // Border for aesthetics
      ctx.strokeStyle = isBullish ? '#34d399' : '#f87171';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(x - candleWidth / 2, topBodyY, candleWidth, bodyHeight);

      // Highlight current live candle with a pulsating beacon indicator
      if (i === data.length - 1) {
        ctx.save();
        ctx.strokeStyle = isBullish ? '#34d399' : '#f87171';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = isBullish ? '#10b981' : '#ef4444';
        ctx.shadowBlur = 8;
        ctx.strokeRect(x - candleWidth / 2 - 1, topBodyY - 1, candleWidth + 2, bodyHeight + 2);
        ctx.restore();
      }

      // Time labels for every 5 candles
      if (i % 6 === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(candle.time, x, height - 15);
      }
    });

    // Draw Live Current Price Line (Dashed pulsating line)
    const currentPriceY = getY(currentPrice);
    ctx.beginPath();
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.moveTo(padding.left, currentPriceY);
    ctx.lineTo(width - padding.right, currentPriceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live Price Pill on Right Axis
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(width - padding.right + 2, currentPriceY - 10, 60, 20, 4);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(currentPrice.toFixed(decimals), width - padding.right + 6, currentPriceY + 3);

  }, [data, currentPrice, decimals, showIndicators]);

  return (
    <div className="relative w-full h-[400px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
      {/* Top Overlay Indicators Badge */}
      <div className="absolute top-3 left-4 flex items-center gap-3 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono">
        <span className="font-black text-white">{assetSymbol}</span>
        <span className="text-slate-400">5M</span>
        <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-1 bg-cyan-400 rounded-sm"></span>
            <span className="text-[10px] text-cyan-400">EMA 9</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-1 bg-amber-400 rounded-sm"></span>
            <span className="text-[10px] text-amber-400">EMA 21</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2 bg-emerald-500/40 rounded-sm"></span>
            <span className="text-[10px] text-slate-300">Volumen</span>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
