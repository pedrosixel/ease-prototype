import { useState } from "react";
import { TopBar, PrimaryBtn, StepLabel, Dots } from "../primitives";
import { useEase } from "../state";
import { useBackGestures } from "../useBackGestures";
import pipStarstruck from "@/assets/Pip_Starstruck.svg";

export const Meet = () => {
  const { go, playbook, setPlaybook, caregiver } = useEase();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyClosing, setPrivacyClosing] = useState(false);

  const closePrivacy = () => {
    setPrivacyClosing(true);
    setTimeout(() => {
      setShowPrivacy(false);
      setPrivacyClosing(false);
    }, 150);
  };
  const name = playbook.childName?.trim() || "your child";
  const cgName = caregiver?.firstName || "a caregiver";
  const { handlers, TapBack } = useBackGestures("childInfo");
  return (
    <div className="h-full flex flex-col relative" {...handlers}>
      <TapBack />
      <TopBar back="childInfo" title={`${playbook.childName}'s Playbook`} />
      <div className="px-7 mt-3 shrink-0"><Dots total={6} current={1} /></div>
      <div className="px-7 mt-3 shrink-0" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src={pipStarstruck} alt="Pip" style={{ width: 120, height: 120, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ background: "#FFFFFF", border: "1.5px solid #CCBFB8", borderRadius: 16, padding: "12px 16px", position: "relative", flex: 1 }}>
          <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#F3768D", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
            Step 2 of 6
          </div>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.4 }}>
            What makes {name}, {name}?
          </span>
          <div style={{ position: "absolute", left: -8, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #CCBFB8" }} />
          <div style={{ position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "9px solid #FFFFFF" }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto phone-scroll px-7 pb-4" style={{ marginTop: 24 }}>
        <textarea
          value={playbook.meet}
          onChange={(e) => setPlaybook({ ...playbook, meet: e.target.value })}
          rows={6}
          style={{
            height: "140px",
            resize: "none",
            overflowY: "auto",
            fontSize: "14px",
            color: "#444444",
            lineHeight: 1.6,
          }}
          className="w-full rounded-2xl border border-border bg-card p-4 focus:outline-none focus:border-primary"
          placeholder="What's their favourite topic? Do they have a favourite toy or activity they always come back to?"
        />
      </div>
      <div className="px-7 pb-8 pt-3 shrink-0">
        <PrimaryBtn onClick={() => go("triggers")}>Continue</PrimaryBtn>
        <button
          onClick={() => setShowPrivacy(true)}
          style={{ display: "block", margin: "10px auto 0", fontFamily: "'Nunito Sans', sans-serif", fontSize: "12px", color: "#777777", background: "none", border: "none" }}
        >
          How we protect your data →
        </button>
      </div>
      {showPrivacy && (
        <div
          onClick={closePrivacy}
          className={
            privacyClosing
              ? "animate-out fade-out fill-mode-forwards duration-[150ms]"
              : "animate-in fade-in duration-[200ms]"
          }
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", zIndex: 50 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={
              privacyClosing
                ? "animate-out fade-out slide-out-to-bottom fill-mode-forwards duration-[150ms]"
                : "animate-in slide-in-from-bottom duration-[250ms] ease-out"
            }
            style={{ width: "100%", background: "#fff", borderRadius: "20px 20px 0 0", padding: "24px" }}
          >
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "14px", color: "#444", lineHeight: 1.6, margin: 0 }}>
              Your child's information is stored securely and never shared without your permission. Ease complies with PIPEDA (Personal Information Protection and Electronic Documents Act), Canada's federal privacy law for the protection of personal information. You can review, update, or delete your data at any time from Settings.
            </p>
            <button
              onClick={closePrivacy}
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
