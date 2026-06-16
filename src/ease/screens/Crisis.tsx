import { useState } from "react";
import { X, Phone } from "lucide-react";
import { useEase } from "../state";
import { CHILD_PHOTOS } from "../assets";

type Tab = "plan" | "emergency";

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: 11,
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
  letterSpacing: "1.5px",
  fontWeight: 700,
};

export const Crisis = () => {
  const { go, playbook, crisisOrigin, activeChildId } = useEase();
  const [tab, setTab] = useState<Tab>("plan");
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const [show911Modal, setShow911Modal] = useState(false);
  const closeTo = crisisOrigin === "caregiver" ? "caregiverHome" : "homeV2";

  const handleTap = (i: number) => {
    setTappedIdx(i);
    window.setTimeout(() => setTappedIdx((v) => (v === i ? null : v)), 150);
  };

  return (
    <div className="h-full flex flex-col bg-crisis text-white">
      {/* Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={CHILD_PHOTOS[activeChildId]}
            alt={playbook.childName}
            className="w-12 h-12 rounded-full object-cover"
            style={{ border: "3px solid #7B5EA7" }}
          />
          <div>
            <div className="text-ease-xs uppercase tracking-[0.18em] text-primary font-bold">
              Help Now
            </div>
            <div className="font-display text-ease-lg text-white mt-0.5">
              {playbook.childName}
            </div>
          </div>
        </div>
        <button
          onClick={() => go(closeTo)}
          className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Tab pills */}
      <div className="px-5 mb-3 flex gap-2 shrink-0">
        <button
          onClick={() => setTab("plan")}
          className={`flex-1 h-10 rounded-full text-[11px] uppercase tracking-[0.16em] font-bold transition ${
            tab === "plan" ? "bg-white text-[#1A1A1A]" : "bg-[#2A2A2A] text-[#AAAAAA]"
          }`}
        >
          Crisis Plan
        </button>
        <button
          onClick={() => setTab("emergency")}
          className={`flex-1 h-10 rounded-full text-[11px] uppercase tracking-[0.16em] font-bold transition ${
            tab === "emergency" ? "bg-white text-[#1A1A1A]" : "bg-[#2A2A2A] text-[#AAAAAA]"
          }`}
        >
          Emergency
        </button>
      </div>

      <div className="flex-1 px-5 overflow-y-auto phone-scroll pb-4">
        {tab === "plan" && (
          <>
            <div style={sectionLabelStyle}>What to do</div>
            {playbook.calming.length === 0 ? (
              <div className="mt-3"><EmptyState /></div>
            ) : (
              <div className="space-y-3 mt-3">
                {playbook.calming.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleTap(i)}
                    className={`w-full text-left rounded-2xl bg-crisis-card border py-5 px-5 min-h-[96px] flex items-center gap-4 transition-all duration-150 ease-out ${
                      tappedIdx === i ? "scale-[0.97] border-primary" : "border-white/10"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-white text-ink font-sans font-extrabold text-ease-lg flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-ease-md text-white leading-snug font-semibold">{c}</p>
                  </button>
                ))}
              </div>
            )}

            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "20px 0" }} />

            <div style={sectionLabelStyle}>AVOID</div>
            {playbook.avoid.length === 0 ? (
              <div className="mt-3"><EmptyState /></div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                {playbook.avoid.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderLeft: "3px solid #F3768D",
                      color: "#FFFFFF",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 15,
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "emergency" && (
          <>
            <div style={sectionLabelStyle}>Emergency contacts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {playbook.emergencyContacts.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 12,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                      {c.name}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "'Nunito Sans', sans-serif" }}>
                      {c.relation}
                    </span>
                  </div>
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "#F3768D",
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {c.phone}
                    <Phone size={16} />
                  </a>
                </div>
              ))}

              {/* Hardcoded 911 — always last, not editable */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 12,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                    Emergency Services
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "'Nunito Sans', sans-serif" }}>
                    911
                  </span>
                </div>
                <button
                  onClick={() => setShow911Modal(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#FFFFFF",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  911
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#CC0000",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone size={18} color="#FFFFFF" />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="px-5 pb-5 shrink-0">
        <button
          onClick={() => go("postCrisis")}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
            padding: 14,
            color: "#FFFFFF",
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Add Log
        </button>
      </div>

      {show911Modal && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: 24,
              width: "100%",
            }}
          >
            <p
              style={{
                color: "#FFFFFF",
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 17,
                fontWeight: 600,
                textAlign: "center",
                marginBottom: 24,
                lineHeight: 1.4,
              }}
            >
              This would call 911 in the live app.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                style={{
                  width: "100%",
                  height: 52,
                  background: "#CC0000",
                  color: "#FFFFFF",
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 12,
                  border: "none",
                }}
              >
                Call 911
              </button>
              <button
                onClick={() => setShow911Modal(false)}
                style={{
                  width: "100%",
                  height: 52,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 12,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center px-6 py-8">
    <p className="text-ease-base italic text-white/60">No tactics added yet.</p>
    <p className="text-ease-sm text-white/40 mt-2">
      Ask the parent to complete their Playbook.
    </p>
  </div>
);
