import { useEase } from "../state";
import EaseLogoColor from "@/assets/Ease_Logo_Pink.svg";
import PipAsset from "@/assets/Pip_Happy.svg";

export const Welcome = () => {
  const { go } = useEase();
  // Synchronous check — no useEffect flash. On mobile there's no 44px status bar
  // padding to cancel, so the negative margin would bleed above the viewport.
  const onMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return (
    <div
      style={{
        width: "100%",
        height: onMobile ? "100%" : "calc(100% + 44px)",
        minHeight: onMobile ? "100%" : "calc(100% + 44px)",
        marginTop: onMobile ? 0 : "-44px",
        background: "#7B5EA7",
        position: "relative",
        zIndex: 45,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15.3%",
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <img
          src={PipAsset}
          alt="Pip"
          style={{ width: "156px", height: "auto", display: "block", flexShrink: 0 }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "40.5%",
          left: "50%",
          width: "142%",
          height: "59.5%",
          transform: "translateX(-50%)",
          background: "#FEF2F1",
          borderRadius: "50% 50% 0 0 / 10% 10% 0 0",
          overflow: "hidden",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: "52.2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 32px 54px 32px",
          gap: 20,
          flexShrink: 0,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <img
          src={EaseLogoColor}
          alt="ease"
          style={{ width: "202px", height: "auto", display: "block", flexShrink: 0 }}
        />

        <p
          style={{
            fontSize: 20,
            color: "#171717",
            textAlign: "center",
            fontFamily: "Nunito Sans",
            lineHeight: 1.35,
            margin: 0,
            flexShrink: 0,
            maxWidth: "620px",
          }}
        >
          Support for caregivers of children with autism.
        </p>

        <div style={{ flex: 1 }} />

        <div
          style={{
            width: "100%",
            maxWidth: "626px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => go("signup")}
            style={{
              width: "100%",
              height: "52px",
              background: "#FFFFFF",
              border: "none",
              borderRadius: 16,
              color: "#7B5EA7",
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "Nunito Sans",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Sign Up
          </button>

          <button
            onClick={() => go("login")}
            style={{
              width: "100%",
              height: "52px",
              background: "#7B5EA7",
              border: "none",
              borderRadius: 16,
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "Nunito Sans",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
