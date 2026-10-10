import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Plus, 
  Sparkles, 
  ExternalLink, 
  Flame, 
  Check, 
  Info, 
  Filter, 
  AlertCircle,
  X
} from 'lucide-react';
import { NUTRITION_DATABASE } from '../data/nutritionData';
import { FoodItem, DietaryPreference, FoodLog } from '../types';

interface NutritionFuelViewProps {
  onLogFood: (log: Omit<FoodLog, 'id' | 'timestamp'>) => void;
  todayLogs: FoodLog[];
}

export const NutritionFuelView: React.FC<NutritionFuelViewProps> = ({
  onLogFood,
  todayLogs
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [goalFilter, setGoalFilter] = useState<'all' | 'bulking' | 'cutting'>('all');
  const [dietFilter, setDietFilter] = useState<'all' | DietaryPreference>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [loggedAlert, setLoggedAlert] = useState<string | null>(null);

  // Filtered food list
  const filteredFoods = NUTRITION_DATABASE.filter((food) => {
    // Search
    const matchesQuery = 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.preparation.toLowerCase().includes(searchQuery.toLowerCase());

    // Goal
    const matchesGoal = 
      goalFilter === 'all' || 
      food.goalSuitability === 'both' || 
      food.goalSuitability === goalFilter;

    // Diet
    const matchesDiet = 
      dietFilter === 'all' || 
      food.dietaryTypes.includes(dietFilter);

    return matchesQuery && matchesGoal && matchesDiet;
  });

  const handleQuickLog = (food: FoodItem, servings: number = 1) => {
    onLogFood({
      foodId: food.id,
      foodName: food.name,
      servings,
      calories: Math.round(food.calories * servings),
      protein: Math.round(food.protein * servings * 10) / 10,
      carbs: Math.round(food.carbs * servings * 10) / 10,
      fats: Math.round(food.fats * servings * 10) / 10,
      mealType: 'lunch'
    });

    setLoggedAlert(`Logged ${servings}x ${food.name} to Today's Fuel!`);
    setTimeout(() => setLoggedAlert(null), 3000);
    setSelectedFood(null);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION matching Screenshot 3 */}
      <section className="relative overflow-hidden rounded-3xl gym-card border border-zinc-800/80 p-6 sm:p-10">
        
        {/* Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          NUTRITIONAL ARCHITECTURE & MACRO FUEL
        </div>

        {/* Wellcore Partner Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/40 text-amber-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>WELLCORE NUTRITION PARTNER</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          NUTRITION & <br className="sm:hidden" />
          <span className="text-emerald-400">FOOD ITEMS</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Muscles are built in the kitchen with precision biology. Explore complete biological value proteins, low-glycemic slow-burning carbohydrates, vital fatty acids for hormonal synthesis, and pharmaceutical-grade performance supplements from <strong className="text-white">Wellcore</strong>.
        </p>

        {/* Partner Action Buttons matching Screenshot 3 */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
          <button
            onClick={() => setSearchQuery('Wellcore')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-heading font-black tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-950"
          >
            <span>EXPLORE WELLCORE PRODUCTS (CREATINE, WHEY, PRE-WORKOUT)</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <a
            href="https://wellcore.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-heading font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <span>OPEN WELLCORE OFFICIAL STORE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* SEARCH BAR & GOAL FILTERS matching Screenshot 3 */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search foods or brands (wellcore, chicken, oats, paneer...)"
              className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Goal Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase text-zinc-500 mr-2">
              GOAL:
            </span>
            {[
              { id: 'all', label: 'ALL' },
              { id: 'bulking', label: 'BULKING' },
              { id: 'cutting', label: 'CUTTING' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setGoalFilter(g.id as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  goalFilter === g.id
                    ? 'bg-emerald-500 text-black font-extrabold shadow-md'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}

            <span className="text-zinc-700 mx-2">|</span>

            {/* Diet Filter Buttons */}
            <span className="text-[11px] font-mono uppercase text-zinc-500 mr-1">
              DIET:
            </span>
            {[
              { id: 'all', label: 'ALL DIETS' },
              { id: 'vegetarian', label: 'VEGETARIAN' },
              { id: 'eggetarian', label: 'EGGETARIAN' },
              { id: 'non-vegetarian', label: 'NON-VEG' },
              { id: 'vegan', label: 'VEGAN' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDietFilter(d.id as any)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  dietFilter === d.id
                    ? 'bg-zinc-700 text-white font-bold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

        </div>

      </section>

      {/* Logged feedback toast */}
      {loggedAlert && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{loggedAlert}</span>
        </div>
      )}

      {/* FOOD CARDS GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            SHOWING {filteredFoods.length} ANABOLIC FOOD ITEMS
          </span>
          <span className="text-xs font-mono text-zinc-500">
            TAP CARD FOR RECIPE & ALLERGENS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              onClick={() => setSelectedFood(food)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                food.isPartner
                  ? 'bg-gradient-to-b from-amber-950/30 to-black border-amber-600/40 hover:border-amber-500'
                  : 'gym-card border-zinc-800/80 hover:border-emerald-500/50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
                    {food.category.replace('_', ' ').toUpperCase()}
                  </span>

                  {food.isPartner && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold uppercase">
                      OFFICIAL PARTNER
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {food.name}
                </h3>

                <span className="text-[11px] font-mono text-zinc-500 block mt-0.5">
                  Serving: {food.serving}
                </span>

                {/* Macro Row */}
                <div className="mt-4 grid grid-cols-4 gap-1.5 text-center">
                  <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                    <span className="text-[9px] font-mono text-zinc-500 block">KCAL</span>
                    <span className="font-mono text-xs font-bold text-white">{food.calories}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                    <span className="text-[9px] font-mono text-red-400 block">PROT</span>
                    <span className="font-mono text-xs font-bold text-white">{food.protein}g</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                    <span className="text-[9px] font-mono text-amber-400 block">CARB</span>
                    <span className="font-mono text-xs font-bold text-white">{food.carbs}g</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                    <span className="text-[9px] font-mono text-emerald-400 block">FAT</span>
                    <span className="font-mono text-xs font-bold text-white">{food.fats}g</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white">
                  Timing: {food.timing.split(' ')[0]}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickLog(food, 1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold font-heading tracking-wider flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> + Log
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOD DETAILS & SERVING ADJUSTER MODAL */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/30 my-6">
            
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
              {selectedFood.category.toUpperCase()} • {selectedFood.dietaryTypes.join(', ').toUpperCase()}
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white mt-2">
              {selectedFood.name}
            </h2>
            <span className="text-xs font-mono text-zinc-400 block mt-0.5">
              Standard Serving: {selectedFood.serving}
            </span>

            {/* Serving Multiplier Selector */}
            <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-400 block">LOG SERVINGS</span>
                <span className="text-xs text-zinc-500">Scale macros by portion</span>
              </div>
              <div className="flex items-center gap-2">
                {[0.5, 1, 1.5, 2].map((mult) => (
                  <button
                    key={mult}
                    type="button"
                    onClick={() => setServingMultiplier(mult)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      servingMultiplier === mult
                        ? 'bg-emerald-500 text-black font-extrabold'
                        : 'bg-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Macros for chosen servings */}
            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[9px] font-mono text-zinc-500 block">TOTAL KCAL</span>
                <span className="font-mono text-base font-bold text-white">
                  {Math.round(selectedFood.calories * servingMultiplier)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[9px] font-mono text-red-400 block">PROTEIN</span>
                <span className="font-mono text-base font-bold text-white">
                  {(selectedFood.protein * servingMultiplier).toFixed(1)}g
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[9px] font-mono text-amber-400 block">CARBS</span>
                <span className="font-mono text-base font-bold text-white">
                  {(selectedFood.carbs * servingMultiplier).toFixed(1)}g
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[9px] font-mono text-emerald-400 block">FATS</span>
                <span className="font-mono text-base font-bold text-white">
                  {(selectedFood.fats * servingMultiplier).toFixed(1)}g
                </span>
              </div>
            </div>

            {/* Preparation Instructions */}
            <div className="mt-5 space-y-2 text-xs">
              <h4 className="font-mono uppercase text-zinc-400 tracking-wider">
                PREPARATION & ANABOLIC TIMING
              </h4>
              <p className="text-zinc-300 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 leading-relaxed">
                {selectedFood.preparation}
              </p>
              <p className="text-zinc-400 pt-1">
                <strong className="text-white">Optimal Window:</strong> {selectedFood.timing}
              </p>
              {selectedFood.substitutes.length > 0 && (
                <p className="text-zinc-400">
                  <strong className="text-white">Substitutes:</strong> {selectedFood.substitutes.join(', ')}
                </p>
              )}
              {selectedFood.allergens.length > 0 && (
                <p className="text-rose-400">
                  <strong>Allergens:</strong> {selectedFood.allergens.join(', ')}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                onClick={() => setSelectedFood(null)}
                className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => handleQuickLog(selectedFood, servingMultiplier)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-black tracking-widest text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-950 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> LOG {servingMultiplier}x TO TODAY'S DIARY
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
