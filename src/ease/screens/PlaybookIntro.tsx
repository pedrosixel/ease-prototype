import { Clock, Users, RefreshCw, LucideIcon } from "lucide-react";
import { PrimaryBtn } from "../primitives";
import { useEase } from "../state";
import pipSurprised from "@/assets/Pip_Surprised.svg";

const ROWS: { Icon: LucideIcon; label: string }[] = [
  { Icon: Clock, label: "Takes about 5 minutes" },
  { Icon: Users, label: "Every caregiver sees it before they start" },
  { Icon: RefreshCw, label: "You can update it any time" },
];

export const PlaybookIntro = () => {
  const { go, playbook } = useEase();
  const name = playbook.childName?.trim() || "your child";

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#FFFFFF", padding: "40px 24px 32px" }}
    >
      {/* Centered Pip */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <img
          src={pipSurprised}
          alt="Pip"
          style={{ width: 120, height: 120, objectFit: "contain" }}
        />
      </div>

      {/* Headline */}
      <h1
        className="font-display text-ease-xl"
        style={{
          color: "#1A1A1A",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        Build it once.<br />{name}'s caregivers will always know what to do.
      </h1>

      {/* Subheading */}
      <p
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: 15,
          color: "#777777",
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        The Playbook is {name}'s personal guide — triggers, what helps, and what to avoid. Every caregiver gets it instantly.
      </p>

      {/* Feature rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ROWS.map(({ Icon, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#FCE8ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={18} color="#F3768D" />
            </div>
            <span
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 15,
                color: "#444444",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <PrimaryBtn onClick={() => go("childInfo")}>Let's build it</PrimaryBtn>
    </div>
  );
};
