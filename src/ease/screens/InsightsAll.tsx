import { TopBar, ParentBottomNav } from "../primitives";
import pipHappy from "@/assets/Pip_Happy.svg";

const CREAM = "#FEF2F1";
const MUTED = "#777777";

export const InsightsAll = () => {
  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
      <div className="flex-1 overflow-y-auto phone-scroll" style={{ background: "transparent" }}>
        <TopBar back="homeV2" title="All Insights" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}>
          <img src={pipHappy} alt="" style={{ width: 100, height: 100 }} />
          <div style={{ marginTop: 48, textAlign: "center", padding: "0 32px" }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#444444" }}>
              Insights are on their way.
            </div>
            <div style={{ fontSize: 14, color: MUTED, marginTop: 12, lineHeight: 1.5 }}>
              When caregivers log a session, their notes and feedback will appear here.
            </div>
          </div>
        </div>
      </div>
      <ParentBottomNav active="home" />
    </div>
  );
};
