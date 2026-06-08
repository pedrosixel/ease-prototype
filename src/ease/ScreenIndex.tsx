import { X } from "lucide-react";
import { SCREENS, useEase } from "./state";

export const ScreenIndex = () => {
  const { indexOpen, setIndexOpen, go, screen, userTestMode, setUserTestMode } = useEase();
  if (!indexOpen) return null;

  const flows = Array.from(new Set(SCREENS.map((s) => s.flow)));

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="bg-background rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-ease-xl text-ink">Screen index</h2>
            <p className="text-ease-sm text-muted-foreground">Jump to any screen for the demo</p>
          </div>
          <button
            onClick={() => setIndexOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-6 pb-6 border-b border-border">
          <div className="flex items-center justify-between">
            <span style={{ color: "#1A1A1A", fontSize: 14, fontWeight: 600 }}>User Test Mode</span>
            <button
              role="switch"
              aria-checked={userTestMode}
              onClick={() => setUserTestMode(!userTestMode)}
              className="relative rounded-full transition-colors"
              style={{
                width: 44,
                height: 24,
                backgroundColor: userTestMode ? "#7B5EA7" : "#CCBFB8",
              }}
            >
              <span
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-all shadow"
                style={{
                  width: 20,
                  height: 20,
                  left: userTestMode ? 22 : 2,
                }}
              />
            </button>
          </div>
          <div style={{ color: "#777777", fontSize: 11, marginTop: 6 }}>
            Clears all demo data for usability testing
          </div>
        </div>


        {flows.map((flow) => {
          const outdated = flow === "Outdated Screens";
          return (
            <div key={flow} className="mb-6">
              <div className="text-ease-xs uppercase tracking-[0.12em] text-muted-foreground mb-2 font-semibold">
                {flow}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SCREENS.filter((s) => s.flow === flow).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => go(s.id)}
                    className={`text-left px-4 py-3 rounded-lg border transition ${
                      screen === s.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : outdated
                        ? "bg-card border-border/50 hover:border-primary/40"
                        : "bg-card border-border hover:border-primary/40"
                    }`}
                    style={outdated && screen !== s.id ? { color: "#CCCCCC" } : undefined}
                  >
                    <div className="text-ease-sm font-semibold">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
