import { ReactNode } from "react";
import { LayoutGrid } from "lucide-react";
import { useEase } from "./state";
import heart from "@/assets/ease-heart.svg";

export const PhoneFrame = ({ children }: { children: ReactNode }) => {
  const { setIndexOpen, screen, toast } = useEase();
  const dark = screen === "crisis" || screen === "postCrisis";
  const caregiverScreens = new Set([
    "caregiverBio",
    "caregiverConnect",
    "caregiverList",
    "bridge",
    "caregiverHome",
  ]);
  const fullBleedCream = screen === "homeV2" || screen === "insightsAll";
  const bgClass = dark
    ? "bg-crisis"
    : caregiverScreens.has(screen)
    ? "bg-background"
    : fullBleedCream
    ? "bg-[#FEF2F1]"
    : "bg-[hsl(var(--parent-bg))]";

  return (
    <div className="relative">
      {/* Phone */}
      <div className="relative w-[402px] h-[874px] rounded-[48px] bg-[#0e0e10] p-[6px] ease-shadow">
        <div
          className={`relative w-full h-full rounded-[42px] overflow-hidden ${bgClass}`}
        >
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-[110px] h-[30px] bg-black rounded-full" />
          {/* Status bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-[44px] z-40 flex items-end justify-between px-7 pb-1 text-[13px] font-semibold ${
              dark ? "text-white" : "text-ink"
            }`}
          >
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-3 border-[1.5px] border-current rounded-[2px] relative">
                <span className="absolute inset-[2px] bg-current rounded-[1px]" />
              </span>
            </span>
          </div>

          {/* Content */}
          <div className={`absolute inset-0 ${fullBleedCream ? "" : "pt-[44px]"} phone-scroll overflow-hidden`}>
            {children}
          </div>

          {/* Toast slot */}
          {toast && (
            <div
              key={toast.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 24px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.97)',
                border: '1px solid #F3768D',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                zIndex: 9999,
                opacity: toast.phase === 'out' ? 0 : 1,
                transition: 'opacity 500ms ease',
              }}
            >
              <img src={heart} alt="" style={{ width: '22px', height: '22px', flexShrink: 0 }} />
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#F3768D' }}>{toast.text}</span>
            </div>
          )}

          {/* Home indicator */}
          <div
            className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full z-50 ${
              dark ? "bg-white/70" : "bg-black/80"
            }`}
          />
        </div>
      </div>

      {/* Index toggle */}
      <button
        onClick={() => setIndexOpen(true)}
        className="absolute -right-14 top-6 w-11 h-11 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition"
        aria-label="Open screen index"
      >
        <LayoutGrid size={18} />
      </button>
    </div>
  );
};
