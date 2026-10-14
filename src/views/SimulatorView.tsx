import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Award, 
  AlertTriangle, 
  ShieldCheck,
  Check,
  Zap,
  Info
} from 'lucide-react';
import { DrillScenario, SimulationResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { INITIAL_DRILLS, StorageService } from '../services/storage';

interface SimulatorViewProps {
  language: SupportedLanguage;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const drills = INITIAL_DRILLS;

  const [selectedDrill, setSelectedDrill] = useState<DrillScenario>(drills[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(drills[0].durationSeconds);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [drillResults, setDrillResults] = useState<SimulationResult[]>(() => StorageService.getDrillResults());
  const timerRef = useRef<number | null>(null);

  // When changing scenario
  const handleSelectDrill = (drill: DrillScenario) => {
    if (isRunning) {
      if (!window.confirm('A drill is currently running. Switch scenario anyway?')) return;
      handleAbort();
    }
    setSelectedDrill(drill);
    setSecondsRemaining(drill.durationSeconds);
    setCheckedSteps({});
  };

  const handleStartDrill = () => {
    setIsRunning(true);
    setCheckedSteps({});
    setSecondsRemaining(selectedDrill.durationSeconds);
  };

  const handleAbort = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setSecondsRemaining(selectedDrill.durationSeconds);
  };

  const handleCompleteDrill = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);

    const timeTaken = selectedDrill.durationSeconds - secondsRemaining;
    const completedCount = Object.values(checkedSteps).filter(Boolean).length;
    const totalCount = selectedDrill.instructions.length;
    
    // Calculate Score (combination of time adherence and checklist completed)
    const stepRatio = totalCount > 0 ? completedCount / totalCount : 1;
    const score = Math.round(stepRatio * 100);
    const passed = score >= 75;

    const newResult: SimulationResult = {
      id: `sim-${Date.now()}`,
      drillId: selectedDrill.id,
      drillTitle: selectedDrill.title,
      timestamp: Date.now(),
      durationTakenSeconds: timeTaken > 0 ? timeTaken : selectedDrill.durationSeconds,
      completedStepsCount: completedCount,
      totalStepsCount: totalCount,
      passed,
      score,
    };

    StorageService.saveDrillResult(newResult);
    setDrillResults(StorageService.getDrillResults());
    alert(`Drill Finished!\nScore: ${score}%\nStatus: ${passed ? 'PASSED ✅' : 'NEEDS PRACTICE ⚠️'}`);
  };

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Auto complete or time out
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate Average Readiness Score
  const averageScore = drillResults.length > 0 
    ? Math.round(drillResults.reduce((acc, curr) => acc + curr.score, 0) / drillResults.length)
    : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Target className="w-7 h-7 text-amber-400" />
          <span>{t.simulator.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.simulator.subtitle}
        </p>
      </div>

      {/* Mandatory High-Visibility Drill Notice */}
      <div className="p-4 rounded-2xl bg-amber-950/60 border-2 border-amber-600/80 shadow-lg text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
        <div className="space-y-0.5">
          <div className="font-extrabold text-xs sm:text-sm tracking-wide uppercase text-amber-300">
            {t.simulator.drillBanner}
          </div>
          <p className="text-xs text-amber-200/80 leading-relaxed">
            All timers, steps, and sounds in this module are safe simulations to train instinctive personal reaction times.
          </p>
        </div>
      </div>

      {/* Readiness Rating Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-xl">
            {averageScore}%
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.simulator.score}</div>
            <div className="text-base font-bold text-white">
              {drillResults.length === 0
                ? 'Uncalibrated (Complete a Drill)'
                : averageScore >= 80
                ? 'High Operational Readiness'
                : 'Developing Preparedness'}
            </div>
            <div className="text-[11px] text-slate-400">
              Based on {drillResults.length} logged training exercises
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-teal-400" />
          <span className="text-xs text-slate-300 font-semibold">Muscle Memory Calibration</span>
        </div>
      </div>

      {/* Scenario Selector & Active Drill Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Select Drill Scenario */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            {t.simulator.selectDrill}
          </div>

          <div className="space-y-2">
            {drills.map((drill) => {
              const isCurrent = selectedDrill.id === drill.id;
              return (
                <div
                  key={drill.id}
                  onClick={() => handleSelectDrill(drill)}
                  className={`p-4 rounded-2xl border transition cursor-pointer select-none ${
                    isCurrent
                      ? 'bg-slate-900 border-amber-500/80 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">{drill.title}</span>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold">
                      {drill.durationSeconds}s
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {drill.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Drill Workspace */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          
          {/* Active Drill Title & Countdown Timer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 uppercase tracking-wider">
                {selectedDrill.category}
              </span>
              <h2 className="text-lg font-black text-white mt-1.5">{selectedDrill.title}</h2>
            </div>

            {/* Big Countdown Timer Display */}
            <div className="flex items-center gap-3">
              <div className={`px-5 py-3 rounded-2xl font-mono text-3xl font-black tracking-widest border ${
                isRunning
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600 animate-pulse'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}>
                {formatTime(secondsRemaining)}
              </div>
            </div>
          </div>

          {/* Controls: Start, Complete, Abort */}
          <div className="flex flex-wrap items-center gap-3">
            {!isRunning ? (
              <button
                onClick={handleStartDrill}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t.simulator.startDrill}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleCompleteDrill}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-lg transition active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.simulator.completeDrill}</span>
                </button>

                <button
                  onClick={handleAbort}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.simulator.abortDrill}</span>
                </button>
              </>
            )}
          </div>

          {/* Drill Checklist Action Steps */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t.simulator.instructions}
            </div>
            <div className="space-y-2">
              {selectedDrill.instructions.map((instr, idx) => {
                const isChecked = !!checkedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                      isChecked
                        ? 'bg-slate-950/90 border-teal-500/50 text-slate-200'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-950/70'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                      isChecked ? 'bg-teal-500 border-teal-500 text-slate-950' : 'border-slate-600'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium leading-relaxed">{instr}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips Box */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.simulator.tips}</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {selectedDrill.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* History Log of Drills */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-white">{t.simulator.resultsHistory}</h3>

        {drillResults.length === 0 ? (
          <p className="text-xs text-slate-500">{t.simulator.noResults}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {drillResults.slice(0, 6).map((res) => (
              <div key={res.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white line-clamp-1">{res.drillTitle}</div>
                  <div className="text-[11px] text-slate-400">
                    {new Date(res.timestamp).toLocaleDateString()} · {res.durationTakenSeconds}s
                  </div>
                </div>
                <div className={`text-xs font-black px-2 py-1 rounded-lg ${
                  res.passed ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {res.score}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
