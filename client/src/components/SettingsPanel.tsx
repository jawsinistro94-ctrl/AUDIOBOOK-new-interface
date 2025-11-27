import { useState } from "react";
import { Monitor, Volume2, Bell, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function SettingsPanel() {
  const { toast } = useToast();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [volume, setVolume] = useState(80);
  const [autoStart, setAutoStart] = useState(false);

  const handleSave = () => {
    toast({
      title: "Configurações Salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="p-3 space-y-3" data-testid="panel-settings">
      {/* Sound */}
      <div className="flex items-center justify-between p-2 rounded bg-card/50 border border-ember-rust/20">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Som</span>
        </div>
        <Switch
          checked={soundEnabled}
          onCheckedChange={setSoundEnabled}
          className="scale-75"
          data-testid="switch-sound"
        />
      </div>

      {/* Volume Slider */}
      {soundEnabled && (
        <div className="flex items-center gap-2 px-2">
          <Label className="w-16 text-xs text-foreground">Volume:</Label>
          <Slider
            value={[volume]}
            onValueChange={([v]) => setVolume(v)}
            min={0}
            max={100}
            step={5}
            className="flex-1"
            data-testid="slider-volume"
          />
          <span className="text-[10px] text-muted-foreground font-mono w-8 text-right">
            {volume}%
          </span>
        </div>
      )}

      {/* Notifications */}
      <div className="flex items-center justify-between p-2 rounded bg-card/50 border border-ember-rust/20">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Notificações</span>
        </div>
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={setNotificationsEnabled}
          className="scale-75"
          data-testid="switch-notifications"
        />
      </div>

      {/* Auto Start */}
      <div className="flex items-center justify-between p-2 rounded bg-card/50 border border-ember-rust/20">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Iniciar com Windows</span>
        </div>
        <Switch
          checked={autoStart}
          onCheckedChange={setAutoStart}
          className="scale-75"
          data-testid="switch-autostart"
        />
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full h-8 text-xs gap-1"
        data-testid="button-save-settings"
      >
        <Save className="w-3 h-3" />
        Salvar Configurações
      </Button>
    </div>
  );
}
