import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SlotSchema, VariantRow } from "@/data/studioData";

interface SlotEditorProps {
  slots: SlotSchema[];
  values: Record<string, string>;
  onChange: (slotId: string, value: string) => void;
  variants: VariantRow[];
}

export function SlotEditor({ slots, values, onChange, variants }: SlotEditorProps) {
  if (slots.length === 0) {
    return (
      <p className="text-xs font-body text-muted-foreground">
        This template has no editable content slots.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {slots.map((slot) => {
        const value = values[slot.slot_id] ?? slot.default_value;
        const matchingVariants = variants.filter((v) => v.slot_type === slot.slot_id.replace(/_\d+$/, "").replace(/_(primary|secondary|value|label)$/, ""));
        const charCount = value.length;
        const overLimit = slot.max_length && charCount > slot.max_length;

        return (
          <div key={slot.slot_id} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="font-body text-xs">{slot.label}</Label>
              {slot.max_length && (
                <span className={`text-[10px] font-mono ${overLimit ? "text-destructive" : "text-muted-foreground"}`}>
                  {charCount}/{slot.max_length}
                </span>
              )}
            </div>

            {slot.type === "textarea" ? (
              <Textarea
                value={value}
                onChange={(e) => onChange(slot.slot_id, e.target.value)}
                className="text-sm font-body min-h-[60px]"
              />
            ) : (
              <Input
                value={value}
                onChange={(e) => onChange(slot.slot_id, e.target.value)}
                className="text-sm font-body"
              />
            )}

            {/* Variant picker */}
            {matchingVariants.length > 0 && (
              <Select onValueChange={(val) => onChange(slot.slot_id, val)}>
                <SelectTrigger className="h-7 text-[11px] font-body">
                  <SelectValue placeholder="Swap variant…" />
                </SelectTrigger>
                <SelectContent>
                  {matchingVariants.map((v) => (
                    <SelectItem key={v.id} value={v.content.text} className="text-xs">
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        );
      })}
    </div>
  );
}
