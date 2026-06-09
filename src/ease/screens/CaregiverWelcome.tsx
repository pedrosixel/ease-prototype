import { useEase } from "../state";
import easeLogo from "@/assets/Ease_Logo_Pink.svg";

const CARDS = [
  {
    title: "The Playbook",
    body: "Each child's parent builds a personal guide with triggers, tactics, and what to avoid.",
  },
  {
    title: "Crisis Support",
    body: "When a child is overwhelmed, get the right response in under 10 seconds.",
  },
  {
    title: "Feedback Loop",
    body: "After each session, log what happened. Parents see your insights directly.",
  },
];

export const CaregiverWelcome = () => {
  const { go, setHasSeenCaregiverWelcome } = useEase();

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: "#EDE5F7", minHeight: "100vh" }}
    >
      <div className="flex flex-col items-center px-6" style={{ marginTop: 64 }}>
        <img src={easeLogo} alt="Ease" style={{ width: 120 }} />
        <h1
          className="font-display"
          style={{
            fontSize: 26,
            color: "#1A1A1A",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Welcome to Ease
        </h1>
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 16,
            color: "#777777",
            maxWidth: 280,
            marginTop: 12,
            marginBottom: 32,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Everything you need to support the children in your care — in one place.
        </p>
      </div>

      <div className="px-6" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {CARDS.map((c) => (
          <div
            key={c.title}
            style={{
              background: "#FFFFFF",
              border: "1px solid #EDE5F7",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  marginBottom: 4,
                }}
              >
                {c.title}
              </div>
              <div
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 13,
                  color: "#777777",
                  lineHeight: 1.5,
                }}
              >
                {c.body}
              </div>
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#EDE5F7",
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 48,
        }}
      >
        <button
          onClick={() => {
            setHasSeenCaregiverWelcome(true);
            go("caregiverList");
          }}
          style={{
            background: "#7B5EA7",
            color: "#FFFFFF",
            height: 52,
            borderRadius: 14,
            width: "100%",
            fontWeight: 700,
            fontSize: 16,
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          Got it, show my list
        </button>
      </div>
    </div>
  );
};
