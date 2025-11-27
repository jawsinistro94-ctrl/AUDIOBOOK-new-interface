import { useState } from "react";
import { Crosshair, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Target {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
}

interface TargetingPanelProps {
  isGlobalActive: boolean;
}

export function TargetingPanel({ isGlobalActive }: TargetingPanelProps) {
  const [targets, setTargets] = useState<Target[]>([
    { id: "1", name: "Demon", enabled: true, priority: 1 },
    { id: "2", name: "Dragon Lord", enabled: true, priority: 2 },
    { id: "3", name: "Hydra", enabled: false, priority: 3 },
  ]);
  const [newTargetName, setNewTargetName] = useState("");

  const isDisabled = !isGlobalActive;

  const addTarget = () => {
    if (newTargetName.trim()) {
      setTargets([
        ...targets,
        {
          id: Date.now().toString(),
          name: newTargetName.trim(),
          enabled: true,
          priority: targets.length + 1,
        },
      ]);
      setNewTargetName("");
    }
  };

  const removeTarget = (id: string) => {
    setTargets(targets.filter((t) => t.id !== id));
  };

  const toggleTarget = (id: string) => {
    setTargets(
      targets.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  return (
    <div className={`p-3 space-y-3 transition-opacity ${isDisabled ? "opacity-50" : ""}`} data-testid="panel-targeting">
      {/* Add New Target */}
      <div className="flex items-center gap-2">
        <Input
          value={newTargetName}
          onChange={(e) => setNewTargetName(e.target.value)}
          placeholder="Nome do alvo..."
          disabled={isDisabled}
          className="flex-1 h-7 text-xs bg-background border-ember-rust/50"
          onKeyDown={(e) => e.key === "Enter" && addTarget()}
          data-testid="input-new-target"
        />
        <Button
          variant="default"
          size="sm"
          onClick={addTarget}
          disabled={isDisabled || !newTargetName.trim()}
          className="h-7 px-2"
          data-testid="button-add-target"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Target List */}
      <div className="space-y-1.5">
        {targets.length === 0 ? (
          <div className="p-3 text-center text-muted-foreground text-[10px]">
            Nenhum alvo configurado. Adicione alvos acima.
          </div>
        ) : (
          targets.map((target, index) => (
            <div
              key={target.id}
              className="flex items-center gap-2 p-2 rounded bg-card/50 border border-ember-rust/20"
              data-testid={`row-target-${target.id}`}
            >
              <Switch
                checked={target.enabled}
                onCheckedChange={() => toggleTarget(target.id)}
                disabled={isDisabled}
                className="scale-75"
                data-testid={`switch-target-${target.id}`}
              />
              <Crosshair className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-foreground flex-1 truncate">
                {target.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                #{index + 1}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTarget(target.id)}
                disabled={isDisabled}
                className="w-5 h-5 text-destructive hover:text-destructive"
                data-testid={`button-remove-target-${target.id}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Info */}
      <div className="p-2 rounded bg-card/30 border border-ember-rust/20">
        <p className="text-[10px] text-muted-foreground text-center">
          Alvos são atacados por ordem de prioridade (menor número = maior prioridade).
        </p>
      </div>
    </div>
  );
}
