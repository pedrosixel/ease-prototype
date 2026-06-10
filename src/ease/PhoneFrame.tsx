import { ReactNode, useEffect } from "react";
import { useEase } from "./state";
import { useIsMobile } from "@/hooks/use-mobile";
import heart from "@/assets/Ease_heart_Pink.svg";

export const PhoneFrame = ({ children }: { children: ReactNode }) => {
  const { screen, toast } = useEase();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    // Prevent body canvas color from showing through transparent screens
    document.body.style.backgroundColor = "white";

    // Force white status bar on Android Chrome (prevents purple bleed from Welcome screen)
    let meta = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "#FFFFFF");

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isMobile]);

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

  if (isMobile) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          // Hard clip — prevents Welcome screen's negative-margin purple from
          // bleeding above the viewport on Android Chrome
          clipPath: "inset(0 0 0 0)",
          position: "fixed",
          top: 0,
          left: 0,
          background: "transparent",
          backgroundColor: "transparent",
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
              opacity: toast.phase === "out" ? 0 : 1,
              transition: "opacity 500ms ease",
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
      {/* Phone */}
      <div className="relative w-[402px] h-[874px] rounded-[48px] bg-[#0e0e10] p-[6px] ease-shadow">
        <div
          className={`relative w-full h-full rounded-[42px] overflow-hidden ${bgClass}`}
        >
          {/* Notch */}
          {!isMobile && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-[110px] h-[30px] bg-black rounded-full" />
          )}
          {/* Status bar */}
          {!isMobile && (
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
          )}

          {/* Content */}
          <div className={`absolute inset-0 ${fullBleedCream ? "" : "pt-[44px]"} phone-scroll overflow-hidden`}>
            {children}
          </div>

          {/* Toast slot */}
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
                opacity: toast.phase === "out" ? 0 : 1,
                transition: "opacity 500ms ease",
              }}
            >
              <img src={heart} alt="" style={{ width: "22px", height: "22px", flexShrink: 0 }} />
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#F3768D" }}>{toast.text}</span>
            </div>
          )}

          {/* Home indicator */}
          {!isMobile && (
            <div
              className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full z-50 ${
                dark ? "bg-white/70" : "bg-black/80"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
