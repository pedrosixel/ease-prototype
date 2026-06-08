import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { TopBar, PrimaryBtn, StepLabel, Dots } from "../primitives";
import { useEase } from "../state";
import { useBackGestures } from "../useBackGestures";
import pipDefault from "@/assets/Pip_Happy.svg";

const RELATIONS = ["Family", "Friend", "Therapist", "School", "Other"];
const cycle = (current: string) => {
  const idx = RELATIONS.indexOf(current);
  return RELATIONS[(idx + 1) % RELATIONS.length] ?? "Family";
};

export const Emergency = () => {
  const { go, playbook, setPlaybook } = useEase();
  const c0 = playbook.emergencyContacts[0] ?? { name: "", phone: "", relation: "Family" };
  const c1 = playbook.emergencyContacts[1];
  const [showSecond, setShowSecond] = useState(!!c1);

  const updateContact = (idx: number, patch: Partial<typeof c0>) => {
    const list = [...playbook.emergencyContacts];
    list[idx] = { ...(list[idx] ?? { name: "", phone: "", relation: "Family" }), ...patch };
    setPlaybook({ ...playbook, emergencyContacts: list });
  };

  const { handlers, TapBack } = useBackGestures("avoid");
  return (
    <div className="h-full flex flex-col relative" {...handlers}>
      <TapBack />
      <TopBar back="avoid" />
      <div className="px-7 mt-3 shrink-0"><Dots total={7} current={5} /></div>
      <div className="px-7 mt-3 shrink-0" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src={pipDefault} alt="Pip" style={{ width: 120, height: 120, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ background: "#FFFFFF", border: "1.5px solid #CCBFB8", borderRadius: 16, padding: "12px 16px", position: "relative", flex: 1 }}>
          <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#F3768D", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
            Step 6 of 6
          </div>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.4 }}>
            Who do we call?
          </span>
          <div style={{ position: "absolute", left: -8, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #CCBFB8" }} />
          <div style={{ position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #FFFFFF" }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll px-7 pb-4 mt-4">
        <ContactBlock
          name={c0.name}
          phone={c0.phone}
          relation={c0.relation || "Family"}
          onName={(v) => updateContact(0, { name: v })}
          onPhone={(v) => updateContact(0, { phone: v })}
          onCycleRelation={() => updateContact(0, { relation: cycle(c0.relation || "Family") })}
        />

        {showSecond ? (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold mb-4">
              Second contact
            </div>
            <ContactBlock
              name={c1?.name ?? ""}
              phone={c1?.phone ?? ""}
              relation={c1?.relation || "Family"}
              onName={(v) => updateContact(1, { name: v, relation: c1?.relation || "Family" })}
              onPhone={(v) => updateContact(1, { phone: v, relation: c1?.relation || "Family" })}
              onCycleRelation={() => updateContact(1, {
                relation: cycle(c1?.relation || "Family"),
                name: c1?.name || "",
                phone: c1?.phone || "",
              })}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowSecond(true)}
            className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-ease-sm"
          >
            <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
              <Plus size={14} />
            </span>
            Add second contact
          </button>
        )}
      </div>
      <div className="px-7 pb-8 pt-3 shrink-0">
        <PrimaryBtn onClick={() => go("complete")}>Continue</PrimaryBtn>
        <p style={{ fontSize: "13px", color: "#777777", fontFamily: "'Nunito Sans', sans-serif", fontStyle: "italic", textAlign: "center", marginTop: "10px" }}>
          You can always add more later.
        </p>
      </div>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
    {children}
  </label>
);

const ContactBlock = ({
  name,
  phone,
  relation,
  onName,
  onPhone,
  onCycleRelation,
}: {
  name: string;
  phone: string;
  relation: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onCycleRelation: () => void;
}) => (
  <div className="space-y-4">
    <div className="flex gap-3">
      <div style={{ flex: "0 0 60%" }}>
        <Label>Name</Label>
        <input
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Mariana Oliveira"
          className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-primary"
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Label>Relation</Label>
        <button
          type="button"
          onClick={onCycleRelation}
          className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-3 flex items-center justify-between text-ease-base text-foreground"
        >
          <span style={{ fontSize: "14px", fontWeight: 600 }}>{relation}</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
    <div>
      <Label>Phone number</Label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => onPhone(e.target.value)}
        placeholder="+1 604 555 0182"
        className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-primary"
      />
    </div>
  </div>
);
