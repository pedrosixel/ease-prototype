import { useEffect, useState } from "react";
import { Clock, Users, RefreshCw, LucideIcon } from "lucide-react";
import { PrimaryBtn } from "../primitives";
import { useEase } from "../state";
import pipSurprised from "@/assets/Pip_Surprised.svg";
const pipDefault = pipSurprised;

const ROWS: { Icon: LucideIcon; label: string }[] = [
  { Icon: Clock, label: "Takes about 5 minutes to set up" },
  { Icon: Users, label: "Caregivers see it before every session" },
  { Icon: RefreshCw, label: "You can update it any time" },
];

export const PlaybookIntro = () => {
  const { go, playbook } = useEase();
  const name = playbook.childName?.trim() || "your child";
  const [pipPhase, setPipPhase] = useState<"greeting" | "inline">("greeting");
  const [mounted, setMounted] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const m = setTimeout(() => setMounted(true), 50);
    const b = setTimeout(() => setBubbleVisible(true), 450);
    return () => {
      clearTimeout(m);
      clearTimeout(b);
    };
  }, []);

  const handleGreetingTap = () => {
    if (pipPhase !== "greeting") return;
    setBubbleVisible(false);
    setPipPhase("inline");
    setTimeout(() => setContentVisible(true), 400);
  };

  const isGreeting = pipPhase === "greeting";
  const contentOpacity = isGreeting ? 1 : contentVisible ? 1 : 0;

  return (
    <div
      className="h-full flex flex-col relative"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "32px 24px",
          opacity: contentOpacity,
          transition: "opacity 400ms ease-out",
        }}
      >
        {/* Heading row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: 32,
              color: "#1A1A1A",
              lineHeight: 1.15,
              flex: 1,
            }}
          >
            {`Build it once. ${name}'s caregivers will always know what to do.`}
          </h1>
          {isGreeting ? (
            <div style={{ width: 48, height: 48, flexShrink: 0 }} />
          ) : (
            <img
              src={pipDefault}
              alt="Pip"
              style={{
                width: 48,
                height: 48,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          )}
        </div>

        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 15,
            color: "#777777",
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          {`The Playbook is ${name}'s personal guide. You'll add ${name}'s triggers, what calms ${name}, and what caregivers should avoid. Every caregiver who works with ${name} gets instant access — especially in moments that matter most.`}
        </p>

        {/* Info rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {ROWS.map(({ Icon, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#FCE8ED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color="#F3768D" />
              </div>
              <span
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 15,
                  color: "#1A1A1A",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 32 }}>
          <PrimaryBtn onClick={() => go("childInfo")}>Continue</PrimaryBtn>
        </div>
      </div>

      {/* Greeting overlay */}
      {isGreeting && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 9,
            }}
          />
          <button
            onClick={handleGreetingTap}
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
            }}
          />
          <img
            src={pipSurprised}
            alt="Pip"
            style={{
              position: "absolute",
              left: "50%",
              top: mounted ? "240px" : "100%",
              width: "160px",
              height: "160px",
              objectFit: "contain",
              transform: "translateX(-50%)",
              opacity: mounted ? 1 : 0,
              transition: "opacity 600ms ease-out, top 600ms ease-out",
              zIndex: 20,
              background: "transparent",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 240 + 160 + 16,
              transform: "translateX(-50%)",
              opacity: bubbleVisible ? 1 : 0,
              transition: "opacity 300ms ease-out",
              zIndex: 20,
              pointerEvents: "none",
              maxWidth: 280,
              width: "max-content",
            }}
          >
            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #CCBFB8",
                borderRadius: 16,
                padding: "12px 18px",
                position: "relative",
                maxWidth: 280,
              }}
            >
              <span
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 15,
                  color: "#1A1A1A",
                  textAlign: "center",
                  display: "block",
                  lineHeight: 1.4,
                }}
              >
                We're glad you're here! Let's start by building your child's Playbook.
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
        </>
      )}
    </div>
  );
};
