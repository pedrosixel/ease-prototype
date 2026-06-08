import { ReactNode } from "react";
import { ChevronLeft, BookOpen, Users, ChevronDown, Settings as SettingsIcon } from "lucide-react";
import { useEase, ScreenId } from "./state";

export const CaregiverTopBarGear = () => {
  const { go } = useEase();
  return (
    <button
      onClick={() => go("caregiverSettings")}
      aria-label="Settings"
      className="flex items-center justify-center"
      style={{ width: 32, height: 32 }}
    >
      <SettingsIcon size={22} color="#7B5EA7" />
    </button>
  );
};

export const TopBar = ({
  back,
  title,
  right,
  dark,
}: {
  back?: ScreenId;
  title?: string;
  right?: ReactNode;
  dark?: boolean;
}) => {
  const { go } = useEase();
  return (
    <div className="flex items-center justify-between h-12 px-5">
      {back ? (
        <button
          onClick={() => go(back)}
          className={`w-9 h-9 -ml-2 rounded-full flex items-center justify-center ${
            dark ? "text-white/80 hover:bg-white/5" : "text-foreground hover:bg-muted"
          }`}
        >
          <ChevronLeft size={22} />
        </button>
      ) : (
        <div className="w-9" />
      )}
      <div className={`text-ease-sm font-semibold ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </div>
      <div className="w-9 flex justify-end">{right}</div>
    </div>
  );
};

export const Dots = ({ total, current, accent = "primary" }: { total: number; current: number; accent?: "primary" | "secondary" }) => (
  <div className="flex items-center gap-1.5 justify-center">
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`h-1.5 rounded-full transition-all ${
          i === current
            ? accent === "primary"
              ? "w-6 bg-primary"
              : "w-6 bg-secondary"
            : "w-1.5 bg-border"
        }`}
      />
    ))}
  </div>
);

export const StepLabel = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontSize: "11px",
      letterSpacing: "0.14em",
      color: "#777777",
      fontFamily: "'Nunito Sans', sans-serif",
      textTransform: "uppercase",
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);

export const PrimaryBtn = ({
  children,
  onClick,
  variant = "coral",
  full = true,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "coral" | "blue" | "ghost" | "dark";
  full?: boolean;
  disabled?: boolean;
}) => {
  const base =
    "rounded-[14px] px-6 h-[52px] text-ease-base font-semibold transition active:scale-[0.99] inline-flex items-center justify-center";
  const styles = {
    coral: "bg-primary text-primary-foreground hover:bg-primary/90",
    blue: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    ghost: "bg-card text-ink border border-border hover:bg-muted",
    dark: "bg-white text-ink hover:bg-white/90",
  }[variant];
  const disabledClass = disabled ? "opacity-50 pointer-events-none" : "";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${full ? "w-full" : ""} ${disabledClass}`}
    >
      {children}
    </button>
  );
};

export const ScrollFade = ({ tone = "parent" }: { tone?: "parent" | "white" | "dark" }) => {
  const fromClass =
    tone === "white"
      ? "from-white"
      : tone === "dark"
      ? "from-[#1A1A1A]"
      : "from-[hsl(var(--parent-bg))]";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t to-transparent ${fromClass}`}
    />
  );
};

export const ScrollHint = ({
  visible,
  tone = "parent",
}: {
  visible: boolean;
  tone?: "parent" | "white" | "dark";
}) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <ChevronDown size={16} className={tone === "dark" ? "text-white/30" : "text-[#CCCCCC]"} />
  </div>
);

export const Avatar = ({
  size = 56,
  initials,
  tone = "coral",
  src,
  ring,
}: {
  size?: number;
  initials: string;
  tone?: "coral" | "blue" | "neutral";
  src?: string;
  ring?: string;
}) => {
  const bg = tone === "coral" ? "bg-primary-tint text-primary" : tone === "blue" ? "bg-secondary-tint text-secondary" : "bg-muted text-foreground";
  if (src) {
    return (
      <img
        src={src}
        alt={initials}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size, border: ring ? `3px solid ${ring}` : undefined }}
      />
    );
  }
  return (
    <div
      className={`rounded-full flex items-center justify-center font-display font-semibold shrink-0 ${bg}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
};

export const CrisisFab = ({ onClick, dark }: { onClick: () => void; dark?: boolean }) => (
  <button
    onClick={onClick}
    aria-label="Open crisis view"
    className={`w-[60px] h-[60px] rounded-full bg-primary text-white shadow-[0_8px_24px_-4px_hsl(var(--primary)/0.5)] flex items-center justify-center active:scale-95 transition ${
      dark ? "ring-4 ring-white/10" : ""
    }`}
  >
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  </button>
);

const HelpTriangle = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const ParentBottomNav = ({ active }: { active: "home" | "circle" }) => {
  const { go, setCrisisOrigin, checkedInChildId, screen } = useEase();
  const helpActive = screen === "crisis";
  return (
    <div className="relative h-[88px] border-t border-border bg-card shrink-0">
      <div className="absolute inset-0 flex items-center justify-around px-8 pb-4">
        <button
          onClick={() => go("homeV2")}
          className={`flex flex-col items-center gap-1 ${active === "home" ? "text-primary" : "text-muted-foreground"}`}
        >
          <BookOpen size={22} />
          <span className="text-ease-xs font-semibold">Playbook</span>
        </button>
        <button
          onClick={() => {
            setCrisisOrigin("parent");
            go("crisis");
          }}
          className={`flex flex-col items-center gap-1 ${helpActive ? "text-primary" : "text-muted-foreground"}`}
          aria-label="Open crisis view"
        >
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: "#F3768D" }}
          >
            <HelpTriangle />
          </span>
          <span className="text-ease-xs font-semibold">Help</span>
        </button>
        <button
          onClick={() => go("circle")}
          className={`flex flex-col items-center gap-1 ${active === "circle" ? "text-primary" : "text-muted-foreground"}`}
        >
          <span className="relative inline-block">
            <Users size={22} />
            {checkedInChildId !== null && (
              <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-green-500 rounded-full" />
            )}
          </span>
          <span className="text-ease-xs font-semibold">Caregivers</span>
        </button>
      </div>
    </div>
  );
};

export const CaregiverBottomNav = ({
  active,
}: {
  active: "caregiverList" | "caregiverHome" | "playbook";
}) => {
  const { go, setCrisisOrigin, screen } = useEase();
  const helpActive = screen === "crisis";
  const listActive = active === "caregiverList";
  const playbookActive = active === "caregiverHome" || active === "playbook";
  const ACTIVE = "#7B5EA7";
  const INACTIVE = "#777777";
  return (
    <div className="relative h-[88px] border-t border-border bg-card shrink-0">
      <div className="absolute inset-0 flex items-center justify-around px-8 pb-4">
        <button
          onClick={() => go("caregiverList")}
          className="flex flex-col items-center gap-1"
          style={{ color: listActive ? ACTIVE : INACTIVE }}
        >
          <Users size={24} />
          <span className="text-ease-xs font-semibold">My List</span>
        </button>
        <button
          onClick={() => {
            setCrisisOrigin("caregiver");
            go("crisis");
          }}
          className={`flex flex-col items-center gap-1 ${helpActive ? "text-primary" : "text-muted-foreground"}`}
          aria-label="Open crisis view"
        >
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: "#F3768D" }}
          >
            <HelpTriangle />
          </span>
          <span className="text-ease-xs font-semibold">Help</span>
        </button>
        <button
          onClick={() => go("caregiverHome")}
          className="flex flex-col items-center gap-1"
          style={{ color: playbookActive ? ACTIVE : INACTIVE }}
        >
          <BookOpen size={24} />
          <span className="text-ease-xs font-semibold">Playbook</span>
        </button>
      </div>
    </div>
  );
};
