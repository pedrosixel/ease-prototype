import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TopBar, PrimaryBtn, StepLabel, Dots } from "../primitives";
import { useEase, ScreenId, Playbook } from "../state";
import { useBackGestures } from "../useBackGestures";
import pipHappy from "@/assets/Pip_Happy.svg";
import pipSad from "@/assets/Pip_Sad.svg";

type Field = "triggers" | "calming" | "avoid";

const META: Record<
  Field,
  {
    back: ScreenId;
    next: ScreenId;
    step: (n: string) => string;
    title: (n: string) => string;
    sub: string;
    contextLine: (n: string) => string;
    placeholder: string;
    chipClass: string;
  }
> = {
  triggers: {
    back: "meet",
    next: "calming",
    step: () => "STEP 3 — WHAT TO WATCH FOR",
    title: (n) => `What patterns or moments tend to overwhelm ${n?.trim() || "your child"}?`,
    sub: "",
    contextLine: () => "A caregiver sees this before walking through the door.",
    placeholder: "e.g. Sudden plan changes",
    chipClass: "chip",
  },
  calming: {
    back: "triggers",
    next: "avoid",
    step: () => "STEP 4 — WHAT ACTUALLY HELPS",
    title: () => `What actually helps during a crisis?`,
    sub: "",
    contextLine: () => "This becomes a caregiver's guide the moment things get hard.",
    placeholder: "e.g. Hand them their weighted bear",
    chipClass: "chip",
  },
  avoid: {
    back: "calming",
    next: "emergency",
    step: () => "STEP 5 — HARD RULES",
    title: () => `What should a caregiver avoid?`,
    sub: "",
    contextLine: (n) => `This protects ${n} when things escalate.`,
    placeholder: "e.g. Raising your voice",
    chipClass: "chip chip-parent",
  },
};

const SUGGESTIONS: Record<Field, string[]> = {
  triggers: [
    "Loud unexpected noises",
    "Crowded spaces",
    "Sudden plan changes",
    "Bright lights",
    "Being touched without warning",
    "Transitions without notice",
  ],
  calming: [
    "Ask for a hug",
    "Move to quiet space",
    "Give 5 minutes of silence",
    "Offer favourite toy",
    "Speak in a calm low voice",
    "Reduce visual stimulation",
  ],
  avoid: [
    "Raising your voice",
    "Forcing eye contact",
    "Blocking his exit",
    "Picking them up suddenly",
    "Rushing transitions",
    "Overwhelming them with questions",
  ],
};

export const ChipScreen = ({ field }: { field: Field }) => {
  const meta = META[field];
  const { go, playbook, setPlaybook } = useEase();
  const [draft, setDraft] = useState("");
  const items = playbook[field] as string[];
  const remaining = SUGGESTIONS[field].filter((s) => !items.includes(s));

  const append = (val: string) => {
    if (!val.trim()) return;
    setPlaybook({ ...playbook, [field]: [...items, val.trim()] } as Playbook);
  };
  const add = () => {
    append(draft);
    setDraft("");
  };
  const remove = (i: number) =>
    setPlaybook({ ...playbook, [field]: items.filter((_, idx) => idx !== i) } as Playbook);

  const childName = playbook.childName?.trim() || "your child";
  const stepIdx = field === "triggers" ? 2 : field === "calming" ? 3 : 4;
  const { handlers, TapBack } = useBackGestures(meta.back);
  return (
    <div className="h-full flex flex-col relative" {...handlers}>
      <TapBack />
      <TopBar back={meta.back} title={`${playbook.childName}'s Playbook`} />
      <div className="px-7 mt-3 shrink-0"><Dots total={6} current={stepIdx} /></div>
      <div className="px-7 mt-3 shrink-0" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src={field === "triggers" ? pipSad : pipHappy} alt="Pip" style={{ width: 120, height: 120, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ background: "#FFFFFF", border: "1.5px solid #CCBFB8", borderRadius: 16, padding: "12px 16px", position: "relative", flex: 1 }}>
          <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#F3768D", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
            Step {stepIdx + 1} of 6
          </div>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.4 }}>
            {meta.title(childName)}
          </span>
          <div style={{ position: "absolute", left: -8, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #CCBFB8" }} />
          <div style={{ position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #FFFFFF" }} />
        </div>
      </div>

      <div className="px-7 flex-1 overflow-y-auto phone-scroll pb-3 mt-4">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {items.map((it, i) => {
            const isAvoid = field === "avoid";
            const chipBg = isAvoid ? "#FCE8ED" : "#E8F7F2";
            const chipBorder = isAvoid ? "#F3768D" : "#1D9E75";
            const chipColor = isAvoid ? "#F3768D" : "#1D9E75";
            return (
              <span
                key={i}
                style={{
                  background: chipBg,
                  border: `1px solid ${chipBorder}`,
                  color: chipColor,
                  borderRadius: 999,
                  padding: "8px 14px",
                  fontSize: 13,
                  fontFamily: "Nunito Sans",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                {it}
                <button
                  onClick={() => remove(i)}
                  aria-label={`Remove ${it}`}
                  style={{
                    color: chipColor,
                    width: 44,
                    height: 44,
                    margin: "-12px -14px -12px -8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <X size={13} />
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {remaining.length > 0 && (
        <div className="px-7 shrink-0 mb-2">
          {field === "avoid" && (
            <div className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold mb-2">
              Ease suggestions — tap to add
            </div>
          )}
          <div
            className="phone-scroll scrollbar-hide -mx-7 px-7"
            style={{
              overflowX: "scroll",
              display: "flex",
              flexDirection: "row",
              gap: 8,
              paddingBottom: 8,
            }}
          >
            {remaining.map((s) => (
              <button
                key={s}
                onClick={() => append(s)}
                style={{
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  height: 36,
                  padding: "0 16px",
                  background: "#F7F7F7",
                  border: "1.5px solid #CCBFB8",
                  borderRadius: 999,
                  fontSize: 13,
                  color: "#444444",
                  fontFamily: "Nunito Sans",
                  cursor: "pointer",
                }}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}


      <div className="px-7 shrink-0">
        <div
          className="flex items-center gap-2 rounded-full pl-4 pr-1 py-1 bg-card"
          style={{ border: "1.5px solid #CCBFB8" }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={meta.placeholder}
            className="flex-1 bg-transparent text-ease-sm focus:outline-none py-2"
          />
          <button
            onClick={add}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-primary"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="px-7 pb-8 pt-3 shrink-0">
        <PrimaryBtn onClick={() => go(meta.next)}>Continue</PrimaryBtn>
      </div>
    </div>
  );
};
