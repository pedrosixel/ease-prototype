import { TopBar } from "../primitives";
import { Switch } from "@/components/ui/switch";
import { useEase } from "../state";

export const Settings = () => {
  const { darkMode, toggleDarkMode, setIsNewUser, go } = useEase();

  const resetDemo = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ease.termsAccepted");
    }
    setIsNewUser(true);
    go("welcome");
  };
  return (
    <div className="h-full flex flex-col ">
      <TopBar back="homeV2" title="Settings" />
      <div className="px-7 mt-4 flex-1">
        <h1 className="font-display text-ease-2xl text-ink leading-tight">Settings</h1>
        <p className="mt-3 text-ease-base text-muted-foreground">
          Account, notifications and sharing controls will live here.
        </p>
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div>
              <div className="text-ease-base text-ink font-semibold">Dark mode</div>
              <div className="text-ease-xs text-muted-foreground mt-0.5">
                Crisis View always stays dark.
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
          {["Account", "Notifications", "Sharing", "Privacy", "About"].map((s) => (
            <div
              key={s}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
            >
              <div className="text-ease-base text-ink font-semibold">{s}</div>
              <span className="text-ease-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold">
                Coming soon
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            margin: "24px 0 0 0",
            padding: "16px 20px",
            background: "#FEF2F1",
            border: "1px solid #CCBFB8",
            borderRadius: 12,
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#F3768D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1A1A1A",
                marginBottom: 4,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              Your data is protected
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#777777",
                lineHeight: 1.5,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              All information is stored securely on servers in Canada and
              protected under PIPEDA. Ease never sells or shares your data.
            </p>
          </div>
        </div>

        <button
          onClick={resetDemo}
          className="mt-8 mx-auto block text-ease-xs text-muted-foreground underline"
        >
          Reset demo
        </button>
      </div>
    </div>
  );
};
