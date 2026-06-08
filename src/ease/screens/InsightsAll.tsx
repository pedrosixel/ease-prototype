import { ChevronLeft } from "lucide-react";
import { useEase } from "../state";
import { ParentBottomNav } from "../primitives";

const CREAM = "#FEF2F1";
const INK = "#1A1A1A";
const MUTED = "#777777";

export const InsightsAll = () => {
  const { go } = useEase();
  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
      <div className="flex-1 overflow-y-auto phone-scroll" style={{ background: "transparent" }}>
        <div style={{ paddingTop: 56 }}>
          <div style={{ padding: "0 12px" }}>
            <button
              onClick={() => go("homeV2")}
              aria-label="Back"
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ color: INK, background: "transparent" }}
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 24,
              color: INK,
              fontWeight: 600,
              padding: "8px 20px 0",
            }}
          >
            All Insights
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "120px 20px",
            }}
          >
            <div style={{ fontSize: 15, color: MUTED, textAlign: "center" }}>
              More insights coming soon.
            </div>
          </div>
        </div>
      </div>
      <ParentBottomNav active="home" />
    </div>
  );
};
