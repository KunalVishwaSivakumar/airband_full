import { Activity, Wind, Heart, AlertTriangle } from "lucide-react";
import ScoreCircle from "@/components/ScoreCircle";
import DataChip from "@/components/DataChip";

const Home = () => {
  // Mock data
  const score = 86;
  const respiratoryRate = 16;
  const coughStrength = 82;
  const heartRate = 72;
  const riskLevel = "Low";

  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AirBand
          </h1>
          <p className="text-muted-foreground">Live Respiratory Monitor</p>
        </div>

        {/* Score Circle */}
        <div className="flex justify-center py-8">
          <ScoreCircle score={score} size={240} />
        </div>

        {/* Score Label */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">AirBand Score</h2>
          <p className="text-sm text-muted-foreground">
            Your respiratory health is <span className="text-success font-semibold">excellent</span>
          </p>
        </div>

        {/* Data Chips */}
        <div className="space-y-3">
          <DataChip
            icon={<Wind className="w-5 h-5" />}
            label="Respiratory Rate"
            value={`${respiratoryRate} bpm`}
            variant="success"
          />
          <DataChip
            icon={<Activity className="w-5 h-5" />}
            label="Cough Strength"
            value={`${coughStrength}%`}
            variant="success"
          />
          <DataChip
            icon={<Heart className="w-5 h-5" />}
            label="Heart Rate"
            value={`${heartRate} bpm`}
            variant="default"
          />
          <DataChip
            icon={<AlertTriangle className="w-5 h-5" />}
            label="Risk Level"
            value={riskLevel}
            variant="success"
          />
        </div>

        {/* Info Card */}
        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-3xl p-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Today's Summary</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your respiratory metrics are within normal range. Continue monitoring
            throughout the day for optimal health tracking.
          </p>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="px-3 py-1 bg-primary/10 rounded-full">Normal breathing</span>
            <span className="px-3 py-1 bg-primary/10 rounded-full">Stable pattern</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
