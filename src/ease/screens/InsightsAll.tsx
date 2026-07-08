import { useEase } from "../state";
import { TopBar, ParentBottomNav } from "../primitives";
import { FeedbackCard } from "./HomeV2";
import pipHappy from "@/assets/Pip_Happy.svg";

export const InsightsAll = () => {
  const { playbook } = useEase();
  const entries = playbook.feedbackEntries;

  return (
    <div className="h-full flex flex-col" style={{ background: "#FFFFFF" }}>
      <div className="flex-1 overflow-y-auto phone-scroll" style={{ background: "transparent" }}>
        <TopBar back="homeV2" title="All Insights" />
        {entries.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 32px 0",
              textAlign: "center",
            }}
          >
            <img src={pipHappy} alt="" style={{ width: 100, height: 100 }} />
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#444444",
                marginTop: 24,
              }}
            >
              No insights yet.
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#777777",
                marginTop: 12,
                lineHeight: 1.5,
              }}
            >
              When caregivers log a session, their notes will appear here.
            </div>
          </div>
        ) : (
          <div style={{ padding: "16px 20px 100px" }}>
            {entries.map((entry) => (
              <div key={entry.id} style={{ marginBottom: 12 }}>
                <FeedbackCard entry={entry} />
              </div>
            ))}
          </div>
        )}
      </div>
      <ParentBottomNav active="home" />
    </div>
  );
};
