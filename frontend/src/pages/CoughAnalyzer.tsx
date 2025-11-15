
import { useRef, useState } from "react";
import { Mic, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type AnalysisResult = {
  status: "normal" | "irregular" | "distress";
  message: string;
  confidence: number;
};

type ApiResponse = {
  status: AnalysisResult["status"];
  message: string;
  confidence: number;
  score: number;
  features: Record<string, unknown>;
};

const API_BASE = "http://localhost:8000";

const CoughAnalyzer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [waveIntensity, setWaveIntensity] = useState(0);

  // Store synthetic sensor samples while the ring is "recording"
  const samplesRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const handleRecord = async () => {
    if (isRecording || isAnalyzing) return;

    setIsRecording(true);
    setIsAnalyzing(false);
    setResult(null);
    setWaveIntensity(0);
    samplesRef.current = [];

    // Simulate sensor waveform for 3 seconds
    const id = window.setInterval(() => {
      const value = Math.random() * 100;
      samplesRef.current.push(value);
      setWaveIntensity(value);
    }, 120);
    intervalRef.current = id;

    // Stop after ~3 seconds and call backend
    window.setTimeout(async () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRecording(false);
      setIsAnalyzing(true);

      try {
        const response = await fetch(`${API_BASE}/api/cough/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ samples: samplesRef.current }),
        });

        if (!response.ok) {
          throw new Error("Backend error");
        }

        const data: ApiResponse = await response.json();
        setResult({
          status: data.status,
          message: data.message,
          confidence: Math.round(data.confidence),
        });
      } catch (error) {
        console.error(error);
        setResult({
          status: "irregular",
          message: "Could not reach AI backend. Showing demo result instead.",
          confidence: 50,
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 3000);
  };

  const getResultIcon = () => {
    if (!result) return null;
    switch (result.status) {
      case "normal":
        return <CheckCircle className="w-12 h-12 text-success" />;
      case "irregular":
        return <AlertTriangle className="w-12 h-12 text-warning" />;
      case "distress":
        return <AlertCircle className="w-12 h-12 text-destructive" />;
    }
  };

  const getResultVariant = () => {
    if (!result) return "default";
    switch (result.status) {
      case "normal":
        return "success";
      case "irregular":
        return "warning";
      case "distress":
        return "danger";
    }
  };

  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Cough Analyzer</h1>
          <p className="text-muted-foreground">
            Tap to simulate a short cough reading. The backend ML model will classify the pattern.
          </p>
        </div>

        {/* Microphone Button */}
        <div className="flex justify-center py-12 relative">
          {/* Sound waves */}
          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 rounded-full border-2 border-primary animate-ping"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    opacity: waveIntensity / 100,
                  }}
                />
              ))}
            </div>
          )}

          <Button
            size="lg"
            onClick={handleRecord}
            disabled={isAnalyzing}
            className={cn(
              "w-32 h-32 rounded-full transition-all duration-300",
              isRecording
                ? "bg-destructive hover:bg-destructive/90 animate-pulse-glow"
                : "bg-primary hover:bg-primary/90 glow-primary"
            )}
          >
            <Mic className="w-12 h-12" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-foreground">
            {isRecording
              ? "Recording synthetic cough pattern..."
              : isAnalyzing
              ? "Sending data to AI model..."
              : "Tap to start"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            This prototype uses a small ML model on random waveform samples to simulate real analysis.
          </p>
        </div>

        {/* Live intensity bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Wave Intensity</span>
            <span>{Math.round(waveIntensity)}%</span>
          </div>
          <Progress value={waveIntensity} className="h-2" />
        </div>

        {/* Result card */}
        {result && (
          <div
            className={cn(
              "mt-6 rounded-3xl border p-6 space-y-4 bg-card/40 backdrop-blur-sm",
              getResultVariant() === "success" && "border-success/40",
              getResultVariant() === "warning" && "border-warning/40",
              getResultVariant() === "danger" && "border-destructive/40"
            )}
          >
            <div className="flex items-center gap-3">
              {getResultIcon()}
              <div className="space-y-1 text-left">
                <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {result.status === "normal"
                    ? "Normal pattern"
                    : result.status === "irregular"
                    ? "Irregular pattern"
                    : "Possible distress"}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {result.message}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-sm text-muted-foreground">
                Model confidence in this classification:
              </p>
              <Progress value={result.confidence} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {result.confidence}% confidence
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoughAnalyzer;
