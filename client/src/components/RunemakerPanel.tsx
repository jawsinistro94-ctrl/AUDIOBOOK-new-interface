import { MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RunemakerSettings } from "@shared/schema";

interface RunemakerPanelProps {
  settings: RunemakerSettings;
  onUpdate: (updates: Partial<RunemakerSettings>) => void;
  isGlobalActive: boolean;
}

export function RunemakerPanel({ settings, onUpdate, isGlobalActive }: RunemakerPanelProps) {
  const isDisabled = !isGlobalActive;

  return (
    <div className={`p-3 space-y-3 transition-opacity ${isDisabled ? "opacity-50" : ""}`} data-testid="panel-runemaker">
      {/* Activation Row */}
      <div className="flex items-center justify-between p-2 rounded bg-card/50 border border-ember-rust/20">
        <span className="text-xs font-medium text-foreground">Ativar Runemaker</span>
        <div className="flex items-center gap-2">
          <span 
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
              settings.isActive && isGlobalActive
                ? "bg-status-on/20 text-status-on" 
                : "bg-status-off/20 text-status-off"
            }`}
            data-testid="text-runemaker-status"
          >
            {settings.isActive && isGlobalActive ? "ATIVO" : "PARADO"}
          </span>
          <Switch
            checked={settings.isActive && isGlobalActive}
            onCheckedChange={(checked) => onUpdate({ isActive: checked })}
            disabled={isDisabled}
            className="scale-75"
            data-testid="switch-runemaker-active"
          />
        </div>
      </div>

      {/* Settings Grid */}
      <div className="space-y-2">
        {/* Potion */}
        <div className="flex items-center gap-2 text-xs">
          <Label className="w-16 text-foreground">Potion:</Label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdate({ potionRecorded: !settings.potionRecorded })}
            disabled={isDisabled}
            className={`w-6 h-6 ${settings.potionRecorded ? "text-status-on" : "text-muted-foreground"}`}
            data-testid="button-potion-location"
          >
            <MapPin className="w-3 h-3" />
          </Button>
          <span className="text-muted-foreground text-[10px]" data-testid="text-potion-status">
            {settings.potionRecorded ? "[Gravado]" : "[Não gravado]"}
          </span>
        </div>

        {/* Spell Hotkey */}
        <div className="flex items-center gap-2 text-xs">
          <Label className="w-16 text-foreground">Spell:</Label>
          <span className="hotkey-badge text-[10px] px-1.5 py-0.5" data-testid="badge-spell-hotkey">
            {settings.spellHotkey}
          </span>
        </div>

        {/* Delay Slider */}
        <div className="flex items-center gap-2 text-xs">
          <Label className="w-16 text-foreground">Delay:</Label>
          <Slider
            value={[settings.delay]}
            onValueChange={([value]) => onUpdate({ delay: value })}
            min={100}
            max={2000}
            step={10}
            disabled={isDisabled}
            className="flex-1"
            data-testid="slider-runemaker-delay"
          />
          <span className="text-[10px] text-muted-foreground font-mono w-12 text-right" data-testid="text-runemaker-delay">
            {settings.delay}ms
          </span>
        </div>

        {/* Potions per Cycle */}
        <div className="flex items-center gap-2 text-xs">
          <Label className="w-16 text-foreground">Potions:</Label>
          <Input
            type="number"
            value={settings.potionsPerCycle}
            onChange={(e) => onUpdate({ potionsPerCycle: Math.max(1, Math.min(10, parseInt(e.target.value) || 1)) })}
            min={1}
            max={10}
            disabled={isDisabled}
            className="w-12 h-6 text-xs text-center bg-background border-ember-rust/50"
            data-testid="input-potions-per-cycle"
          />
          <span className="text-muted-foreground text-[10px]">por ciclo</span>
        </div>

        {/* Casts per Cycle */}
        <div className="flex items-center gap-2 text-xs">
          <Label className="w-16 text-foreground">Casts:</Label>
          <Input
            type="number"
            value={settings.castsPerCycle}
            onChange={(e) => onUpdate({ castsPerCycle: Math.max(1, Math.min(10, parseInt(e.target.value) || 1)) })}
            min={1}
            max={10}
            disabled={isDisabled}
            className="w-12 h-6 text-xs text-center bg-background border-ember-rust/50"
            data-testid="input-casts-per-cycle"
          />
          <span className="text-muted-foreground text-[10px]">por ciclo</span>
        </div>

        {/* Pause Hotkey */}
        <div className="flex items-center gap-2 text-xs">
          <Label className="w-16 text-foreground">Pausar:</Label>
          <span className="hotkey-badge text-[10px] px-1.5 py-0.5" data-testid="badge-pause-hotkey">
            {settings.pauseHotkey}
          </span>
        </div>
      </div>

      {/* Cycle Summary */}
      <div className="p-2 rounded bg-card border border-ember-rust/30 text-center">
        <span className="text-[10px] text-foreground" data-testid="text-cycle-summary">
          Ciclo: {settings.potionsPerCycle} potions + {settings.castsPerCycle} cast(s) → repete
        </span>
      </div>
    </div>
  );
}
