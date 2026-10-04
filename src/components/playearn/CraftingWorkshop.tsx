import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Hammer, Sparkles, Gem, Diamond, DollarSign, Clock, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { CRAFT_MATERIALS, CRAFT_RECIPES } from './gameData';
import { CraftMaterial, CraftRecipe } from './types';

interface CraftingWorkshopProps {
  userGems: number;
  onBuyMaterial: (material: CraftMaterial) => void;
  onCompleteCraft: (recipe: CraftRecipe) => void;
}

export const CraftingWorkshop: React.FC<CraftingWorkshopProps> = ({
  userGems,
  onBuyMaterial,
  onCompleteCraft
}) => {
  const [materials, setMaterials] = useState<CraftMaterial[]>(CRAFT_MATERIALS);
  const [selectedRecipe, setSelectedRecipe] = useState<CraftRecipe | null>(null);
  const [isCrafting, setIsCrafting] = useState(false);
  const [craftProgress, setCraftProgress] = useState(0);
  const [craftedInventory, setCraftedInventory] = useState<CraftRecipe[]>([]);

  // Comprar material con gemas
  const handleBuy = (mat: CraftMaterial) => {
    if (userGems < mat.costGems) return;
    onBuyMaterial(mat);
    setMaterials((prev) =>
      prev.map((m) => (m.id === mat.id ? { ...m, stock: m.stock + 1 } : m))
    );
  };

  // Verificar si hay materiales suficientes para la receta
  const canCraft = (recipe: CraftRecipe) => {
    return recipe.requiredMaterials.every((req) => {
      const mat = materials.find((m) => m.id === req.materialId);
      return mat && mat.stock >= req.amount;
    });
  };

  // Fabricar la pieza
  const startCrafting = (recipe: CraftRecipe) => {
    if (!canCraft(recipe) || isCrafting) return;

    // Descontar materiales
    setMaterials((prev) =>
      prev.map((m) => {
        const req = recipe.requiredMaterials.find((r) => r.materialId === m.id);
        if (req) {
          return { ...m, stock: m.stock - req.amount };
        }
        return m;
      })
    );

    setSelectedRecipe(recipe);
    setIsCrafting(true);
    setCraftProgress(0);

    const totalSteps = 20;
    const stepInterval = (recipe.craftTimeSeconds * 1000) / totalSteps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCraftProgress((step / totalSteps) * 100);
      if (step >= totalSteps) {
        clearInterval(timer);
        setIsCrafting(false);
        setCraftedInventory((inv) => [...inv, recipe]);

        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    }, stepInterval);
  };

  // Vender pieza fabricada en el mercado artesanal
  const sellCraft = (index: number) => {
    const item = craftedInventory[index];
    if (!item) return;

    onCompleteCraft(item);
    setCraftedInventory((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Hammer className="w-3.5 h-3.5" />
          <span>Taller & Forja Creativa</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          🔨 Taller de Artesanía & Venta en Mercado
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Adquiere materiales con tus gemas, forja artesanías exclusivas con tus manos y véndelas en el mercado digital por dólares ($ USD) y diamantes (💠).
        </p>
      </div>

      {/* Almacén de Materiales Disponibles */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">
            📦 Tus Materiales en Taller:
          </h3>
          <span className="text-xs text-amber-400 font-mono">
            Tus Gemas: {userGems} 💎
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {materials.map((mat) => {
            const canAfford = userGems >= mat.costGems;
            return (
              <div
                key={mat.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{mat.icon}</span>
                  <span className="text-xs font-mono font-bold bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-full">
                    x{mat.stock}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block leading-tight mb-1">
                    {mat.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 block mb-2">
                    Costo: {mat.costGems} 💎
                  </span>
                </div>
                <button
                  onClick={() => handleBuy(mat)}
                  disabled={!canAfford}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-amber-300 font-mono text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Comprar +1</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recetas de Artesanía */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono mb-4">
          🎨 Recetas de Artesanía Disponibles:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CRAFT_RECIPES.map((recipe) => {
            const hasMaterials = canCraft(recipe);

            return (
              <div
                key={recipe.id}
                className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl p-2 bg-slate-900 rounded-2xl border border-slate-800">
                    {recipe.image}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white leading-tight">
                      {recipe.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-900/40">
                        Venta: ${recipe.sellPriceUSD.toFixed(2)} USD
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-purple-950 text-purple-300 px-2 py-0.5 rounded-md border border-purple-900/40">
                        +{recipe.sellPriceDiamonds} 💠
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {recipe.craftTimeSeconds}s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Materiales requeridos */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="text-slate-400">Req:</span>
                    {recipe.requiredMaterials.map((req) => {
                      const mat = materials.find((m) => m.id === req.materialId);
                      const isEnough = mat ? mat.stock >= req.amount : false;
                      return (
                        <span
                          key={req.materialId}
                          className={`px-1.5 py-0.5 rounded ${
                            isEnough ? 'bg-slate-800 text-emerald-400' : 'bg-rose-950 text-rose-400'
                          }`}
                        >
                          {mat?.icon} {req.amount}
                        </span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => startCrafting(recipe)}
                    disabled={!hasMaterials || isCrafting}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/10 flex items-center gap-1.5"
                  >
                    <Hammer className="w-3.5 h-3.5" />
                    <span>Forjar Pieza</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progreso de Forja Activa */}
      {isCrafting && selectedRecipe && (
        <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-2xl mb-8 animate-pulse">
          <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
            <span className="flex items-center gap-2">
              <Hammer className="w-4 h-4 animate-bounce" />
              Forjando: <strong>{selectedRecipe.name}</strong>...
            </span>
            <span>{Math.round(craftProgress)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-amber-500/30">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-200"
              style={{ width: `${craftProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Inventario de Artesanías Listas para Venta */}
      <div className="p-5 bg-slate-950/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
            <span>🏷️ Mercado de Artesanías Forjadas ({craftedInventory.length}):</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            Vende tus piezas para transferir el dinero a tu saldo retirable
          </span>
        </div>

        {craftedInventory.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-slate-800 rounded-xl">
            <p className="text-xs text-slate-500 font-mono">
              Aún no tienes artesanías forjadas en tu inventario. Selecciona una receta arriba y forja tu primera obra de arte.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {craftedInventory.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.image}</span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{item.name}</h5>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 mt-0.5">
                      <span>+${item.sellPriceUSD.toFixed(2)} USD</span>
                      <span>+{item.sellPriceDiamonds} 💠</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => sellCraft(idx)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Vender</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
