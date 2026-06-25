import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { TopBar, PrimaryBtn, StepLabel, Dots } from "../primitives";
import { useEase } from "../state";
import { useBackGestures } from "../useBackGestures";
import pipDefault from "@/assets/Pip_Curious.svg";

type LevelOpt = "1" | "2" | "3" | "d" | "nd";

export const ChildInfo = () => {
  const { go, playbook, setPlaybook } = useEase();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [levelInfoOpen, setLevelInfoOpen] = useState(false);
  const current: LevelOpt =
    playbook.diagnosis === "Not Diagnosed"
      ? "nd"
      : playbook.diagnosis === "Diagnosed"
      ? "d"
      : ((playbook.diagnosis.match(/Level (\d)/)?.[1] ?? "1") as LevelOpt);

  const setLevel = (l: LevelOpt) =>
    setPlaybook({
      ...playbook,
      diagnosis:
        l === "nd" ? "Not Diagnosed" : l === "d" ? "Diagnosed" : `Autism Level ${l}`,
    });

  const name = playbook.childName?.trim() || "your child";
  const { handlers, TapBack } = useBackGestures("role");
  return (
    <div className="h-full flex flex-col relative" {...handlers}>
      <TapBack />
      <TopBar back="role" />
      <div className="px-7 mt-3 shrink-0"><Dots total={7} current={0} /></div>
      <div className="px-7 mt-3 shrink-0" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src={pipDefault} alt="Pip" style={{ width: 120, height: 120, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ background: "#FFFFFF", border: "1.5px solid #CCBFB8", borderRadius: 16, padding: "12px 16px", position: "relative", flex: 1 }}>
          <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#F3768D", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
            Step 1 of 6
          </div>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.4 }}>
            Tell us about your child.
          </span>
          <div style={{ position: "absolute", left: -8, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #CCBFB8" }} />
          <div style={{ position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #FFFFFF" }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto phone-scroll px-7 pb-4 mt-4">
        {/* Name */}
        <div>
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            First name
          </label>
          <input
            value={playbook.childName}
            onChange={(e) => setPlaybook({ ...playbook, childName: e.target.value })}
            className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-primary"
            placeholder="Tyler"
          />
        </div>

        {/* Age */}
        <div className="mt-5">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Age
          </label>
          <div className="relative mt-2">
            <select
              value={playbook.childAge}
              onChange={(e) => setPlaybook({ ...playbook, childAge: Number(e.target.value) })}
              className="appearance-none w-full h-12 rounded-[14px] border border-border bg-card pl-4 pr-10 text-ease-base text-foreground focus:outline-none focus:border-primary"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "year" : "years"} old</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <ChevronDown size={18} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Autism level */}
        <div className="mt-5">
          <div className="relative">
            <div className="flex items-center gap-1.5">
              <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
                Autism level
              </label>
              <button
                onClick={() => setLevelInfoOpen(true)}
                className="w-[44px] h-[44px] flex items-center justify-center -ml-2"
                aria-label="What do the autism levels mean?"
              >
                <Info size={15} color="#F3768D" />
              </button>
            </div>
            {levelInfoOpen && (
              <>
                <div
                  onClick={() => setLevelInfoOpen(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 40 }}
                />
                <div
                  className="animate-in fade-in zoom-in-95 duration-[180ms]"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    marginTop: 6,
                    transformOrigin: "top left",
                    background: "#FFFFFF",
                    border: "1px solid #CCBFB8",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#444444", marginBottom: 10 }}>
                    What does this mean?
                  </div>
                  {[
                    { label: "Level 1 — Needs support", desc: "Often has strong communication skills, but social situations and unexpected changes can be challenging." },
                    { label: "Level 2 — Needs substantial support", desc: "Social communication is more affected. Behaviors may be more noticeable in daily settings." },
                    { label: "Level 3 — Needs very substantial support", desc: "Communication is significantly impacted. Intensive daily support is essential." },
                  ].map((d, i) => (
                    <div key={i} style={{ marginTop: i > 0 ? 10 : 0 }}>
                      <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#F3768D" }}>{d.label}</div>
                      <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 400, color: "#777777", marginTop: 2 }}>{d.desc}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {([
              { v: "1" as LevelOpt, label: "Level 1", span: false },
              { v: "2" as LevelOpt, label: "Level 2", span: false },
              { v: "3" as LevelOpt, label: "Level 3", span: false },
              { v: "d" as LevelOpt, label: "Diagnosed", span: false },
              { v: "nd" as LevelOpt, label: "Not Diagnosed", span: true },
            ]).map((opt) => {
              const active = current === opt.v;
              return (
                <button
                  key={opt.v}
                  onClick={() => setLevel(opt.v)}
                  style={!active ? { border: "1px solid #CCBFB8" } : undefined}
                  className={`h-12 rounded-full text-ease-sm font-bold transition ${
                    opt.span ? "col-span-2" : ""
                  } ${
                    active
                      ? "bg-primary text-white border-[1.5px] border-primary"
                      : "bg-card text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-7 pb-8 pt-3 shrink-0">
        <PrimaryBtn onClick={() => go("meet")}>
          Continue
        </PrimaryBtn>
        <button
          onClick={() => setShowPrivacy(true)}
          style={{ display: "block", margin: "10px auto 0", fontFamily: "'Nunito Sans', sans-serif", fontSize: "12px", color: "#777777", background: "none", border: "none" }}
        >
          How we protect your data →
        </button>
      </div>
      {showPrivacy && (
        <div
          onClick={() => setShowPrivacy(false)}
          className="animate-in fade-in duration-[200ms]"
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", zIndex: 50 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-in slide-in-from-bottom duration-[250ms] ease-out"
            style={{ width: "100%", background: "#fff", borderRadius: "20px 20px 0 0", padding: "24px" }}
          >
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "14px", color: "#444", lineHeight: 1.6, margin: 0 }}>
              Your child's information is stored securely and never shared without your permission. Ease complies with PIPEDA (Personal Information Protection and Electronic Documents Act), Canada's federal privacy law for the protection of personal information. You can review, update, or delete your data at any time from Settings.
            </p>
            <button
              onClick={() => setShowPrivacy(false)}
              style={{ marginTop: "20px", width: "100%", height: "48px", background: "#F3768D", color: "#fff", fontFamily: "'Nunito Sans', sans-serif", fontSize: "15px", border: "none", borderRadius: "999px" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
