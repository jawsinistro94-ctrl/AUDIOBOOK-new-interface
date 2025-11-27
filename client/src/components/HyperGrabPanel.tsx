import { Hand } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { HyperGrabSettings } from "@shared/schema";

interface HyperGrabPanelProps {
  settings: HyperGrabSettings;
  onUpdate: (updates: Partial<HyperGrabSettings>) => void;
  isGlobalActive: boolean;
}

export function HyperGrabPanel({ settings, onUpdate, isGlobalActive }: HyperGrabPanelProps) {
  const isDisabled = !isGlobalActive;

  return (
    <div className={`p-3 space-y-3 transition-opacity ${isDisabled ? "opacity-50" : ""}`} data-testid="panel-hyper-grab">
      {/* Activation Row */}
      <div className="flex items-center justify-between p-2 rounded bg-card/50 border border-ember-rust/20">
        <div className="flex items-center gap-2">
          <Hand className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Ativar Hyper Grab</span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
              settings.isActive && isGlobalActive
                ? "bg-status-on/20 text-status-on" 
                : "bg-status-off/20 text-status-off"
            }`}
            data-testid="text-hyper-grab-status"
          >
            {settings.isActive && isGlobalActive ? "ON" : "OFF"}
          </span>
          <Switch
            checked={settings.isActive && isGlobalActive}
            onCheckedChange={(checked) => onUpdate({ isActive: checked })}
            disabled={isDisabled}
            className="scale-75"
            data-testid="switch-hyper-grab-active"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="p-2 rounded bg-card/30 border border-ember-rust/20">
        <p className="text-[10px] text-muted-foreground text-center">
          Automatiza a coleta rápida de itens no chão quando disponíveis.
        </p>
      </div>
    </div>
  );
}
