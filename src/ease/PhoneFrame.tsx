import { ReactNode, useEffect } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";
import { useEase } from "./state";
import { useIsMobile } from "@/hooks/use-mobile";
import heart from "@/assets/Ease_heart_Pink.svg";

// Exact background color for each screen that is NOT white.
// Used for two purposes on mobile:
//   1. bgClass — fills the paddingTop (safe-area) zone with the correct color
//   2. theme-color meta + document.body — Safari reads these to paint the status
//      bar area; iOS caches the first-paint value and reuses it on every navigation,
//      so it must update on every screen change or a persistent strip appears.
const SCREEN_COLORS: Record<string, string> = {
  welcome:         "#7B5EA7",
  crisis:          "#1A1A1A",
  postCrisis:      "#1A1A1A",
  caregiverHome:   "#EDE5F7",
  caregiverWelcome:"#EDE5F7",
  homeV2:          "#FEF2F1",
  insightsAll:     "#FEF2F1",
};

export const PhoneFrame = ({ children }: { children: ReactNode }) => {
  const { screen, toast } = useEase();
  const isMobileHook = useIsMobile();
  // Same synchronous fallback as EaseApp — ensures the mobile wrapper renders on frame 1.
  const isMobile =
    isMobileHook ||
    (typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    if (!isMobile) return;
    const color = SCREEN_COLORS[screen] ?? "#FFFFFF";
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [screen, isMobile]);

  const dark = screen === "crisis" || screen === "postCrisis" || screen === "welcome";
  const caregiverScreens = new Set([
    "caregiverBio",
    "caregiverConnect",
    "caregiverList",
    "bridge",
  ]);
  const fullBleedCream = screen === "homeV2" || screen === "insightsAll";
  const fullBleedPurple = screen === "caregiverHome";
  const fullBleedWelcome = screen === "welcome";
  const noSafeArea = fullBleedCream || fullBleedPurple || fullBleedWelcome;
  // Welcome must come first — it is in the `dark` set (for desktop status bar text colour)
  // but its background is purple, not the crisis dark. The dead-code branch was the bug.
  const bgClass = screen === "welcome"
    ? "bg-[#7B5EA7]"
    : dark
    ? "bg-crisis"
    : screen === "caregiverWelcome"
    ? "bg-[#EDE5F7]"
    : fullBleedPurple
    ? "bg-[#EDE5F7]"
    : caregiverScreens.has(screen)
    ? "bg-background"
    : fullBleedCream
    ? "bg-[#FEF2F1]"
    : "bg-[hsl(var(--parent-bg))]";

  if (isMobile) {
    return (
      <div
        className={bgClass}
        style={{
          width: "100vw",
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        {children}
        {toast && (
          <div
            key={toast.id}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 24px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.97)",
              border: "1px solid #F3768D",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
              zIndex: 9999,
              opacity: toast.phase === "out" ? 0 : undefined,
              transition: "opacity 300ms ease-out",
              animation: toast.phase !== "out" ? "toast-up 300ms ease-out forwards" : undefined,
            }}
          >
            <img src={heart} alt="" style={{ width: "22px", height: "22px", flexShrink: 0 }} />
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#F3768D" }}>{toast.text}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Phone chassis — aspect-ratio drives height; no hardcoded h */}
      <div
        className="relative w-[402px] rounded-[48px] bg-[#0e0e10] p-[6px] ease-shadow"
        style={{ aspectRatio: "393/852" }}
      >
        <div
          className={`relative w-full h-full rounded-[44px] overflow-hidden ${bgClass}`}
        >
          {/* Dynamic Island */}
          <div
            className="absolute bg-black pointer-events-none"
            style={{
              width: "32%",
              height: "37px",
              top: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "20px",
              zIndex: 20,
            }}
          />

          {/* Status bar — 54px, Nunito Sans 15/600, lucide icons */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{ height: 54, zIndex: 10 }}
          >
            <div
              className="h-full flex items-end justify-between"
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 8,
                color: dark ? "#FFFFFF" : "#1A1A1A",
              }}
            >
              <span
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                9:41
              </span>
              <div className="flex items-center gap-1.5">
                <Signal size={15} />
                <Wifi size={15} />
                <BatteryFull size={15} />
              </div>
            </div>
          </div>

          {/* Content — 54px safe area; welcome/homeV2/insightsAll/caregiverHome skip it */}
          <div
            className={`absolute inset-0 ${noSafeArea ? "" : "pt-[54px]"} phone-scroll overflow-hidden`}
          >
            {children}
          </div>

          {/* Toast */}
          {toast && (
            <div
              key={toast.id}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.97)",
                border: "1px solid #F3768D",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                whiteSpace: "nowrap",
                zIndex: 9999,
                opacity: toast.phase === "out" ? 0 : undefined,
                transition: "opacity 300ms ease-out",
                animation: toast.phase !== "out" ? "toast-up 300ms ease-out forwards" : undefined,
              }}
            >
              <img src={heart} alt="" style={{ width: "22px", height: "22px", flexShrink: 0 }} />
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#F3768D" }}>{toast.text}</span>
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
    </div>
  );
};
