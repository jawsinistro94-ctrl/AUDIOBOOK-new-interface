import { MapPin, Crosshair, Flame, Droplets, Heart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { BestSellerItem } from "@shared/schema";

interface BestSellersPanelProps {
  items: BestSellerItem[];
  onUpdate: (id: string, updates: Partial<BestSellerItem>) => void;
  isGlobalActive: boolean;
}

export function BestSellersPanel({ items, onUpdate, isGlobalActive }: BestSellersPanelProps) {
  return (
    <div className="p-3 space-y-2" data-testid="panel-best-sellers">
      {items.map((item) => (
        <BestSellerRow
          key={item.id}
          item={item}
          onUpdate={(updates) => onUpdate(item.id, updates)}
          isGlobalActive={isGlobalActive}
        />
      ))}
    </div>
  );
}

interface BestSellerRowProps {
  item: BestSellerItem;
  onUpdate: (updates: Partial<BestSellerItem>) => void;
  isGlobalActive: boolean;
}

function getItemIcon(name: string) {
  if (name.includes("SD")) return <Crosshair className="w-4 h-4 text-amber-500" />;
  if (name.includes("EXPLO")) return <Flame className="w-4 h-4 text-orange-500" />;
  if (name.includes("UH")) return <Heart className="w-4 h-4 text-red-500" />;
  if (name.includes("Mana")) return <Droplets className="w-4 h-4 text-blue-500" />;
  return <Crosshair className="w-4 h-4 text-muted-foreground" />;
}

function BestSellerRow({ item, onUpdate, isGlobalActive }: BestSellerRowProps) {
  const isDisabled = !isGlobalActive;

  return (
    <div 
      className={`flex items-center gap-2 p-2 rounded bg-card/50 border border-ember-rust/20 transition-opacity ${
        isDisabled ? "opacity-50" : ""
      }`}
      data-testid={`row-best-seller-${item.id}`}
    >
      <Switch
        checked={item.enabled && isGlobalActive}
        onCheckedChange={(checked) => onUpdate({ enabled: checked })}
        disabled={isDisabled}
        className="scale-75"
        data-testid={`switch-enable-${item.id}`}
      />

      {getItemIcon(item.name)}

      <span className="text-xs font-medium text-foreground w-20 truncate" data-testid={`text-name-${item.id}`}>
        {item.name}
      </span>

      <span className="hotkey-badge text-[10px] px-1.5 py-0.5" data-testid={`badge-hotkey-${item.id}`}>
        {item.hotkey}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onUpdate({ hasLocation: !item.hasLocation })}
        disabled={isDisabled}
        className={`w-6 h-6 ${item.hasLocation ? "text-status-on" : "text-muted-foreground"}`}
        data-testid={`button-location-${item.id}`}
      >
        <MapPin className="w-3 h-3" />
      </Button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Slider
          value={[item.delay]}
          onValueChange={([value]) => onUpdate({ delay: value })}
          min={10}
          max={500}
          step={1}
          disabled={isDisabled}
          className="flex-1"
          data-testid={`slider-delay-${item.id}`}
        />
        <span className="text-[10px] text-muted-foreground font-mono w-12 text-right" data-testid={`text-delay-${item.id}`}>
          {item.delay}ms
        </span>
      </div>
    </div>
  );
}
