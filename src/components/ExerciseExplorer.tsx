import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Dumbbell,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Loader2,
  Zap,
  Globe,
  Database,
  Info,
} from 'lucide-react';
import {
  CatalogExercise,
  MUSCLE_TRANSLATIONS,
  BODY_PART_TRANSLATIONS,
  EQUIPMENT_TRANSLATIONS,
  searchRapidApiV2,
  getRapidApiKey,
} from '../utils/exercisedb';

interface UnifiedExercise {
  id: string;
  name: string;
  gifUrl: string;
  videoUrl?: string;
  targetMuscles: string[];
  secondaryMuscles: string[];
  bodyParts: string[];
  equipment: string[];
  instructions: string[];
  source: 'catalog' | 'rapidapi';
}

export const ExerciseExplorer: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogExercise[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState<boolean>(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [searchSource, setSearchSource] = useState<'all' | 'rapidapi'>('all');

  // RapidAPI Live Search State
  const [rapidResults, setRapidResults] = useState<UnifiedExercise[]>([]);
  const [isSearchingRapid, setIsSearchingRapid] = useState<boolean>(false);
  const [rapidError, setRapidError] = useState<string | null>(null);

  // Pagination
  const [displayCount, setDisplayCount] = useState<number>(18);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const hasApiKey = Boolean(getRapidApiKey());

  // Load catalog on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      try {
        setIsLoadingCatalog(true);
        const res = await fetch('/data/exercises-catalog.json');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Não foi possível carregar o catálogo.`);
        }
        const data = await res.json();
        if (isMounted) {
          setCatalog(data);
          setIsLoadingCatalog(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setCatalogError(err instanceof Error ? err.message : String(err));
          setIsLoadingCatalog(false);
        }
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Live RapidAPI Search Trigger (debounced)
  useEffect(() => {
    if (searchSource !== 'rapidapi' || !hasApiKey) {
      setRapidResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingRapid(true);
      setRapidError(null);
      const res = await searchRapidApiV2(searchTerm, 30);
      if (res.success) {
        const mapped: UnifiedExercise[] = res.data.map((item) => ({
          id: item.exerciseId,
          name: item.name,
          gifUrl: item.imageUrl || `https://static.exercisedb.dev/media/${item.exerciseId}.gif`,
          videoUrl: item.videoUrl,
          targetMuscles: item.targetMuscles || [],
          secondaryMuscles: item.secondaryMuscles || [],
          bodyParts: item.bodyParts || [],
          equipment: item.equipments || [],
          instructions: item.instructions || [],
          source: 'rapidapi',
        }));
        setRapidResults(mapped);
      } else {
        setRapidError(res.message || 'Erro ao consultar RapidAPI');
      }
      setIsSearchingRapid(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [searchTerm, searchSource, hasApiKey]);

  // Derived filter options
  const muscleOptions = useMemo(() => {
    const set = new Set<string>();
    catalog.forEach((ex) => ex.targetMuscles?.forEach((m) => set.add(m)));
    return Array.from(set).sort();
  }, [catalog]);

  const bodyPartOptions = useMemo(() => {
    const set = new Set<string>();
    catalog.forEach((ex) => ex.bodyParts?.forEach((b) => set.add(b)));
    return Array.from(set).sort();
  }, [catalog]);

  const equipmentOptions = useMemo(() => {
    const set = new Set<string>();
    catalog.forEach((ex) => ex.equipment?.forEach((e) => set.add(e)));
    return Array.from(set).sort();
  }, [catalog]);

  // Filtered Catalog Exercises
  const filteredCatalogExercises = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return catalog.filter((ex) => {
      // Text Match
      if (term) {
        const nameMatch = ex.name.toLowerCase().includes(term);
        const muscleMatch = ex.targetMuscles.some((m) =>
          m.toLowerCase().includes(term) || (MUSCLE_TRANSLATIONS[m] || '').toLowerCase().includes(term)
        );
        const eqMatch = ex.equipment.some((e) =>
          e.toLowerCase().includes(term) || (EQUIPMENT_TRANSLATIONS[e] || '').toLowerCase().includes(term)
        );
        if (!nameMatch && !muscleMatch && !eqMatch) return false;
      }

      // Muscle Filter
      if (selectedMuscle !== 'all' && !ex.targetMuscles.includes(selectedMuscle)) {
        return false;
      }

      // Body Part Filter
      if (selectedBodyPart !== 'all' && !ex.bodyParts.includes(selectedBodyPart)) {
        return false;
      }

      // Equipment Filter
      if (selectedEquipment !== 'all' && !ex.equipment.includes(selectedEquipment)) {
        return false;
      }

      return true;
    });
  }, [catalog, searchTerm, selectedMuscle, selectedBodyPart, selectedEquipment]);

  // Unified List to display
  const displayedExercises: UnifiedExercise[] = useMemo(() => {
    if (searchSource === 'rapidapi') {
      return rapidResults;
    }

    return filteredCatalogExercises.slice(0, displayCount).map((ex) => ({
      id: ex.id,
      name: ex.name,
      gifUrl: `https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs/${ex.gif}`,
      targetMuscles: ex.targetMuscles,
      secondaryMuscles: ex.secondaryMuscles,
      bodyParts: ex.bodyParts,
      equipment: ex.equipment,
      instructions: ex.instructions,
      source: 'catalog',
    }));
  }, [searchSource, rapidResults, filteredCatalogExercises, displayCount]);

  const totalAvailable =
    searchSource === 'rapidapi' ? rapidResults.length : filteredCatalogExercises.length;

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedMuscle !== 'all' ||
    selectedBodyPart !== 'all' ||
    selectedEquipment !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedMuscle('all');
    setSelectedBodyPart('all');
    setSelectedEquipment('all');
    setDisplayCount(18);
  };

  return (
    <div className="space-y-6">
      {/* Header & Source Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-mamba-surface via-[#131622] to-mamba-surface border border-mamba-border shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-mamba-cyan/10 text-mamba-cyan border border-mamba-cyan/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Explorador Global ExerciseDB
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Pesquise por nome, músculo-alvo, região anatômica ou equipamento em todo o acervo.
          </p>
        </div>

        {/* Source Badges */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setSearchSource('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              searchSource === 'all'
                ? 'bg-mamba-cyan text-slate-950 shadow-md shadow-mamba-cyan/20'
                : 'bg-mamba-dark text-slate-400 hover:text-slate-200 border border-mamba-border'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Catálogo (1.300+)</span>
          </button>

          {hasApiKey && (
            <button
              onClick={() => setSearchSource('rapidapi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                searchSource === 'rapidapi'
                  ? 'bg-mamba-gold text-slate-950 shadow-md shadow-mamba-gold/20'
                  : 'bg-mamba-dark text-slate-400 hover:text-slate-200 border border-mamba-border'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live RapidAPI V2</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setDisplayCount(18);
          }}
          placeholder="Pesquisar por exercício (ex: Spanish Squat, Trap Bar, Glute, Wall Sit, Deadlift)..."
          className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-mamba-surface border border-mamba-border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-mamba-cyan focus:ring-1 focus:ring-mamba-cyan shadow-inner"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Muscle Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-mamba-muted uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-mamba-cyan" />
            <span>Músculo-Alvo</span>
          </label>
          <select
            value={selectedMuscle}
            onChange={(e) => {
              setSelectedMuscle(e.target.value);
              setDisplayCount(18);
            }}
            className="w-full px-3 py-2 rounded-xl bg-mamba-dark border border-mamba-border text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-mamba-cyan"
          >
            <option value="all">Todos os Músculos ({muscleOptions.length})</option>
            {muscleOptions.map((m) => (
              <option key={m} value={m}>
                {MUSCLE_TRANSLATIONS[m] || m} ({m})
              </option>
            ))}
          </select>
        </div>

        {/* Body Part Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-mamba-muted uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-mamba-gold" />
            <span>Região Corporal</span>
          </label>
          <select
            value={selectedBodyPart}
            onChange={(e) => {
              setSelectedBodyPart(e.target.value);
              setDisplayCount(18);
            }}
            className="w-full px-3 py-2 rounded-xl bg-mamba-dark border border-mamba-border text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-mamba-gold"
          >
            <option value="all">Todas as Regiões ({bodyPartOptions.length})</option>
            {bodyPartOptions.map((b) => (
              <option key={b} value={b}>
                {BODY_PART_TRANSLATIONS[b] || b} ({b})
              </option>
            ))}
          </select>
        </div>

        {/* Equipment Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-mamba-muted uppercase tracking-wider flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-mamba-emerald" />
            <span>Equipamento</span>
          </label>
          <select
            value={selectedEquipment}
            onChange={(e) => {
              setSelectedEquipment(e.target.value);
              setDisplayCount(18);
            }}
            className="w-full px-3 py-2 rounded-xl bg-mamba-dark border border-mamba-border text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-mamba-emerald"
          >
            <option value="all">Todos os Equipamentos ({equipmentOptions.length})</option>
            {equipmentOptions.map((eq) => (
              <option key={eq} value={eq}>
                {EQUIPMENT_TRANSLATIONS[eq] || eq} ({eq})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary & Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-mamba-border/60 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span>
            Exibindo <strong className="text-slate-100">{displayedExercises.length}</strong> de{' '}
            <strong className="text-slate-100">{totalAvailable}</strong> exercícios encontrados
          </span>
          {isSearchingRapid && (
            <span className="flex items-center gap-1 text-mamba-gold">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Consultando RapidAPI...</span>
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-mamba-gold hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      {/* Loading & Error States */}
      {isLoadingCatalog && (
        <div className="py-16 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-mamba-cyan animate-spin mx-auto" />
          <p className="text-sm text-slate-400 font-mono">Carregando catálogo de exercícios...</p>
        </div>
      )}

      {catalogError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
          {catalogError}
        </div>
      )}

      {rapidError && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          {rapidError}
        </div>
      )}

      {/* Exercise Cards Grid */}
      {!isLoadingCatalog && displayedExercises.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedExercises.map((exercise) => {
            const isExpanded = expandedId === exercise.id;
            const primaryMuscle = exercise.targetMuscles[0] || 'Geral';
            const primaryBodyPart = exercise.bodyParts[0] || 'Corpo';
            const primaryEquipment = exercise.equipment[0] || 'Peso Corporal';

            return (
              <div
                key={exercise.id}
                className="rounded-2xl border border-mamba-border bg-mamba-surface/90 hover:border-slate-600 transition-all shadow-md flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Header */}
                  <div className="p-4 border-b border-mamba-border/80 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-mamba-cyan/15 text-mamba-cyan border border-mamba-cyan/30">
                        {MUSCLE_TRANSLATIONS[primaryMuscle] || primaryMuscle}
                      </span>
                      <span className="text-[10px] font-mono text-mamba-muted truncate max-w-[120px]">
                        {EQUIPMENT_TRANSLATIONS[primaryEquipment] || primaryEquipment}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 capitalize leading-snug line-clamp-1">
                      {exercise.name}
                    </h3>
                  </div>

                  {/* Framed Diagnostic Viewport (Media Canvas) */}
                  <div className="p-3 bg-mamba-dark/60">
                    <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-inner">
                      {/* Inner White Diagnostic Screen */}
                      <div className="w-full h-44 bg-white flex items-center justify-center p-2 relative">
                        {exercise.videoUrl ? (
                          <video
                            src={exercise.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <img
                            src={exercise.gifUrl}
                            alt={exercise.name}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain"
                          />
                        )}

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900/85 text-mamba-cyan border border-mamba-cyan/40 backdrop-blur-sm">
                            {BODY_PART_TRANSLATIONS[primaryBodyPart] || primaryBodyPart}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions Retractable Drawer */}
                  {isExpanded && exercise.instructions && exercise.instructions.length > 0 && (
                    <div className="p-4 bg-mamba-dark/90 border-t border-mamba-border space-y-2.5 animate-fadeIn">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-mamba-cyan uppercase">
                        <Info className="w-3.5 h-3.5" />
                        <span>Instruções Passo a Passo:</span>
                      </div>

                      <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                        {exercise.instructions.map((step, idx) => (
                          <li key={idx} className="pl-1">
                            <span className="text-slate-200">
                              {step.replace(/^Step:\s*\d+\s*/i, '')}
                            </span>
                          </li>
                        ))}
                      </ol>

                      {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                        <div className="pt-2 border-t border-mamba-border/60">
                          <span className="text-[10px] font-mono text-mamba-muted uppercase block mb-1">
                            Músculos Secundários:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {exercise.secondaryMuscles.map((sm, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono bg-mamba-surface text-slate-300 px-2 py-0.5 rounded border border-mamba-border"
                              >
                                {MUSCLE_TRANSLATIONS[sm] || sm}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="p-3 bg-mamba-dark/40 border-t border-mamba-border/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-mamba-muted">
                    ID: #{exercise.id.slice(0, 8)}
                  </span>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : exercise.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-mamba-surface text-slate-200 hover:text-white border border-mamba-border hover:border-slate-500 transition-all"
                  >
                    <span>{isExpanded ? 'Recolher' : 'Instruções'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-mamba-cyan" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoadingCatalog && displayedExercises.length === 0 && (
        <div className="py-16 text-center space-y-3 p-8 rounded-2xl bg-mamba-surface/60 border border-mamba-border">
          <Dumbbell className="w-10 h-10 text-slate-500 mx-auto" />
          <h4 className="text-base font-bold text-slate-200">Nenhum exercício encontrado</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Tente pesquisar por outros termos em inglês ou português (ex: &quot;squat&quot;, &quot;bench&quot;, &quot;calf&quot;, &quot;press&quot;) ou limpe os filtros de músculo e equipamento.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-mamba-cyan text-slate-950 mt-2"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Load More Button */}
      {searchSource !== 'rapidapi' && displayCount < filteredCatalogExercises.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setDisplayCount((prev) => prev + 18)}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold bg-mamba-surface hover:bg-mamba-dark text-slate-200 border border-mamba-border hover:border-slate-500 transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Carregar Mais Exercícios (+18)</span>
            <ChevronDown className="w-4 h-4 text-mamba-cyan" />
          </button>
        </div>
      )}
    </div>
  );
};
