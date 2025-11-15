import { Brain, TrendingUp, Calendar, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const Insights = () => {
  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Brain className="w-12 h-12 text-primary glow-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AI Insights</h1>
          <p className="text-muted-foreground">Personalized respiratory analysis</p>
        </div>

        {/* Daily Summary */}
        <Card className="bg-card/30 backdrop-blur-sm border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Today's Summary</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on your respiratory data throughout the day, your AirBand score remains
            stable at <span className="text-success font-semibold">86/100</span>. Your breathing
            patterns show consistent rhythm with minimal irregularities.
          </p>
        </Card>

        {/* AI Analysis */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-primary/30 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">AI Analysis</h2>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Cough Analysis:</span> Recent cough patterns
                appear normal with 94% confidence. No concerning trends detected.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Breathing Rhythm:</span> Stable breathing
                pattern at 14 breaths per minute with 88% stability score.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Overall Health:</span> Your respiratory
                metrics are within normal range for your age and activity level.
              </p>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="bg-card/30 backdrop-blur-sm border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Recommendations</h2>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-success/10 border border-success/30 rounded-xl">
              <p className="text-sm font-semibold text-foreground mb-1">
                ✓ Continue Current Activity
              </p>
              <p className="text-xs text-muted-foreground">
                Your current lifestyle supports healthy respiratory function
              </p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-sm font-semibold text-foreground mb-1">
                💡 Monitor Regularly
              </p>
              <p className="text-xs text-muted-foreground">
                Daily measurements help detect early changes in respiratory health
              </p>
            </div>
          </div>
        </Card>

        {/* Weekly Trend */}
        <Card className="bg-card/30 backdrop-blur-sm border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">7-Day Trend</h2>
          </div>
          <div className="h-32 flex items-end gap-2">
            {[82, 85, 83, 87, 86, 84, 86].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Your AirBand score has remained stable this week
          </p>
        </Card>

        {/* Footnote */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            AirBand detects slight abnormalities — recommended to monitor
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
