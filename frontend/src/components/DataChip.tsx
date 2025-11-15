import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataChipProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  variant?: "default" | "success" | "warning" | "danger";
}

const DataChip = ({ icon, label, value, variant = "default" }: DataChipProps) => {
  const variants = {
    default: "border-border bg-card/50",
    success: "border-success/30 bg-success/10",
    warning: "border-warning/30 bg-warning/10",
    danger: "border-destructive/30 bg-destructive/10",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all hover:scale-105",
        variants[variant]
      )}
    >
      <div className="text-primary">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default DataChip;
