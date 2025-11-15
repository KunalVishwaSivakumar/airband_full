import { useState } from "react";
import { Smartphone, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataChip from "@/components/DataChip";
import { Activity, TrendingUp, Target } from "lucide-react";

const BreathingRhythm = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleToggleMonitoring = () => {
    if (isMonitoring) {
      // Stop monitoring and show results
      setIsMonitoring(false);
      setHasResults(true);
    } else {
      // Start monitoring
      setIsMonitoring(true);
      setHasResults(false);
    }
  };

  // Mock results
  const bpm = 14;
  const irregularityIndex = 12;
  const stabilityScore = 88;

  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Breathing Rhythm</h1>
          <p className="text-muted-foreground">Place phone on your chest</p>
        </div>

        {/* Instructions */}
        {!isMonitoring && !hasResults && (
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-3xl p-6 space-y-4">
            <div className="flex justify-center">
              <Smartphone className="w-16 h-16 text-primary" />
            </div>
            <div className="space-y-3 text-center">
              <h3 className="text-lg font-semibold text-foreground">How to measure</h3>
              <ol className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                    1
                  </span>
                  <span>Lie down comfortably on your back</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                    2
                  </span>
                  <span>Place your phone on your chest</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                    3
                  </span>
                  <span>Breathe normally for 30 seconds</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Visualization */}
        {isMonitoring && (
          <div className="space-y-6">
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-3xl p-8">
              <div className="relative h-48 flex items-center justify-center">
                {/* Breathing waves */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-24 h-24 rounded-full border-2 border-primary/30 animate-breathing"
                      style={{
                        animationDelay: `${i * 0.5}s`,
                        width: `${(i + 1) * 60}px`,
                        height: `${(i + 1) * 60}px`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Center indicator */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-2xl font-bold text-foreground">Detecting breath cycles...</p>
              <p className="text-sm text-muted-foreground">Keep your phone steady</p>
            </div>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <DataChip
                icon={<Activity className="w-5 h-5" />}
                label="Breaths per Minute"
                value={`${bpm} bpm`}
                variant="success"
              />
              <DataChip
                icon={<TrendingUp className="w-5 h-5" />}
                label="Irregularity Index"
                value={`${irregularityIndex}%`}
                variant="success"
              />
              <DataChip
                icon={<Target className="w-5 h-5" />}
                label="Stability Score"
                value={`${stabilityScore}/100`}
                variant="success"
              />
            </div>

            {/* Waveform visualization */}
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Breath Pattern</h3>
              <div className="h-32 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <path
                    d="M 0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    className="animate-wave"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Regular breathing pattern detected
              </p>
            </div>

            <div className="bg-success/10 border border-success/30 rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Your breathing rhythm is stable and within normal parameters. Low irregularity
                indicates healthy respiratory function.
              </p>
            </div>
          </div>
        )}

        {/* Control Button */}
        <Button
          size="lg"
          onClick={handleToggleMonitoring}
          className="w-full h-14 text-lg font-semibold glow-primary"
        >
          {isMonitoring ? (
            <>
              <Square className="w-5 h-5 mr-2" />
              Stop Monitoring
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              {hasResults ? "Measure Again" : "Start Monitoring"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BreathingRhythm;
