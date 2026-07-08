import { useEffect, useState } from "react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";
import heart from "@/assets/Ease_heart_Pink.svg";
import starBlue from "@/assets/Ease_Star_Purple.svg";
import pipIdle from "@/assets/Pip_Happy.svg";

export const Role = () => {
  const { go, setSelectedRole } = useEase();
  const [role, setRole] = useState<"parent" | "caregiver" | null>(null);
  const [phase, setPhase] = useState<"phase1" | "phase2">("phase1");
  const [mounted, setMounted] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const m = setTimeout(() => setMounted(true), 50);
    const b = setTimeout(() => setBubbleVisible(true), 450);
    const h = setTimeout(() => setHintVisible(true), 800);
    return () => {
      clearTimeout(m);
      clearTimeout(b);
      clearTimeout(h);
    };
  }, []);

  const handleTap = () => {
    if (phase !== "phase1") return;
    setPhase("phase2");
  };

  const isPhase2 = phase === "phase2";
  const ctaLabel =
    role === "parent" ? "Continue as Parent" : role === "caregiver" ? "Continue as Caregiver" : "Get Started";

  const pipSize = isPhase2 ? 100 : 180;
  const pipTop: number | string = isPhase2 ? 32 : "30%";
  const bubbleTop: number | string = isPhase2 ? 144 : `calc(30% + 196px)`;
  const stackZ = isPhase2 ? 11 : 8;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 30 }}>
        <TopBar back="terms" />
      </div>

      {/* Role cards */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: stackZ,
          top: isPhase2 ? 220 : undefined,
          bottom: isPhase2 ? undefined : 100,
        }}
      >
        {(["parent", "caregiver"] as const).map((r) => {
          const active = role === r;
          const isParent = r === "parent";
          return (
            <button
              key={r}
              onClick={() => setRole(r)}
              disabled={!isPhase2}
              style={!active ? { border: "1px solid #CCBFB8" } : undefined}
              className={`w-full rounded-2xl bg-card border-[1.5px] p-5 text-left flex items-center gap-4 transition ${
                active ? (isParent ? "border-primary" : "border-secondary") : "border-transparent"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  isParent ? "bg-primary-tint" : "bg-secondary-tint"
                }`}
              >
                <img src={isParent ? heart : starBlue} alt="" className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="font-display text-ease-md text-ink">
                  {isParent ? "I'm a parent" : "I'm a caregiver"}
                </div>
                <div className="text-ease-sm text-muted-foreground mt-0.5">
                  {isParent ? "I'm a parent of a child with autism" : "I'm a caregiver for a child with autism"}
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  active ? (isParent ? "border-primary" : "border-secondary") : "border-border"
                }`}
              >
                {active && (
                  <span className={`w-2.5 h-2.5 rounded-full ${isParent ? "bg-primary" : "bg-secondary"}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA button */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 20,
          right: 20,
          zIndex: stackZ,
        }}
      >
        <PrimaryBtn
          variant={role === "caregiver" ? "blue" : "coral"}
          disabled={!isPhase2}
          onClick={() => {
            if (!role) return;
            setSelectedRole(role);
            if (role === "caregiver") {
              go("caregiverBio");
            } else {
              go("playbookIntro");
            }
          }}
        >
          {ctaLabel}
        </PrimaryBtn>
      </div>

      {/* Dark overlay - fades out on phase transition */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 9,
          opacity: isPhase2 ? 0 : 1,
          transition: "opacity 250ms ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Tap overlay - disabled after phase changes */}
      <button
        onClick={handleTap}
        aria-label="Continue"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          background: "transparent",
          border: "none",
          opacity: isPhase2 ? 0 : 1,
          transition: "opacity 250ms ease-out",
          pointerEvents: isPhase2 ? "none" : "auto",
          cursor: isPhase2 ? "default" : "pointer",
        }}
      />

      {/* Pip */}
      <img
        src={pipIdle}
        alt="Pip"
        style={{
          position: "absolute",
          left: "50%",
          top: pipTop,
          width: pipSize,
          height: pipSize,
          objectFit: "contain",
          opacity: mounted ? 1 : 0,
          transform: `translateX(-50%) translateY(${mounted ? "0px" : "60px"})`,
          transition:
            "opacity 600ms ease-out, transform 600ms ease-out, top 500ms cubic-bezier(0.77, 0, 0.175, 1), width 500ms ease-out, height 500ms ease-out",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* Speech bubble */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: bubbleTop,
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          opacity: isPhase2 ? 1 : bubbleVisible ? 1 : 0,
          transition: "opacity 300ms ease-out, top 500ms ease-in-out",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #CCBFB8",
            borderRadius: 16,
            padding: "12px 18px",
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: isPhase2 ? 14 : 16,
              fontWeight: isPhase2 ? 400 : 600,
              color: "#1A1A1A",
              textAlign: "center",
              display: "block",
            }}
          >
            {isPhase2 ? "First, are you a parent or a caregiver?" : "Welcome to Ease!"}
          </span>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -9,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "11px solid transparent",
              borderRight: "11px solid transparent",
              borderBottom: "9px solid #CCBFB8",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -7,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "8px solid #FFFFFF",
            }}
          />
        </div>
      </div>

      {/* Tap-to-continue hint (phase 1 only) */}
      {!isPhase2 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "calc(30% + 265px)",
            transform: "translateX(-50%)",
            zIndex: 20,
            opacity: hintVisible ? 1 : 0,
            transition: "opacity 500ms ease-out",
            pointerEvents: "none",
          }}
        >
          <span
            className="animate-pulse"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 13,
              color: "#777777",
              whiteSpace: "nowrap",
            }}
          >
            Tap to continue
          </span>
        </div>
      )}
    </div>
  );
};
