import { useState } from "react";
import { Pencil } from "lucide-react";
import { TopBar } from "../primitives";
import { Switch } from "@/components/ui/switch";
import { useEase } from "../state";

const PINK = "#F3768D";

type FieldKey = "fullName" | "childName" | "relationship" | "phone" | "email";

export const Settings = () => {
  const { darkMode, toggleDarkMode, setIsNewUser, go, playbook } = useEase();

  const [values, setValues] = useState<Record<FieldKey, string>>({
    fullName: playbook.parentName || "",
    childName: playbook.childName || "",
    relationship: "Mother",
    phone: playbook.emergencyContacts[0]?.phone || "+1 (604) 555-0182",
    email: "",
  });
  const [expanded, setExpanded] = useState<FieldKey | null>(null);
  const [draft, setDraft] = useState("");

  const FIELDS: { key: FieldKey; label: string }[] = [
    { key: "fullName", label: "FULL NAME" },
    { key: "childName", label: "CHILD'S NAME" },
    { key: "relationship", label: "RELATIONSHIP" },
    { key: "phone", label: "PHONE" },
    { key: "email", label: "EMAIL" },
  ];

  const openField = (key: FieldKey) => {
    setExpanded(key);
    setDraft(values[key]);
  };

  const saveField = () => {
    if (!expanded) return;
    setValues((v) => ({ ...v, [expanded]: draft }));
    setExpanded(null);
  };

  const resetDemo = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ease.termsAccepted");
    }
    setIsNewUser(true);
    go("welcome");
  };

  return (
    <div className="h-full flex flex-col">
      <TopBar back="homeV2" title="Settings" />
      <div className="flex-1 overflow-y-auto phone-scroll px-6 pb-8">

        {/* Profile header */}
        <div className="flex flex-col items-center" style={{ marginTop: 8 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "#FCE8ED",
              border: `3px solid ${PINK}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: PINK,
                letterSpacing: "-0.5px",
              }}
            >
              MO
            </span>
          </div>
          <button
            style={{
              fontSize: 13,
              color: PINK,
              fontWeight: 600,
              marginTop: 8,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            Change photo
          </button>
          <div
            className="font-display"
            style={{ fontSize: 22, color: "#1A1A1A", marginTop: 8 }}
          >
            {values.fullName}
          </div>
          <div
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              color: "#777777",
              marginTop: 2,
            }}
          >
            {values.relationship}
          </div>
        </div>

        {/* Editable profile fields */}
        <div style={{ marginTop: 24 }}>
          {FIELDS.map((f) => {
            const isOpen = expanded === f.key;
            return (
              <div
                key={f.key}
                style={{
                  border: "1px solid #CCBFB8",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  background: "#FFFFFF",
                }}
              >
                {!isOpen ? (
                  <button
                    onClick={() => openField(f.key)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          fontSize: 12,
                          color: "#777777",
                          letterSpacing: "0.08em",
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        {f.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          fontSize: 15,
                          color: "#1A1A1A",
                        }}
                      >
                        {values[f.key]}
                      </div>
                    </div>
                    <Pencil size={16} color={PINK} />
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        fontSize: 12,
                        color: "#777777",
                        letterSpacing: "0.08em",
                        fontWeight: 700,
                      }}
                    >
                      {f.label}
                    </div>
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      autoFocus
                      style={{
                        height: 44,
                        borderRadius: 12,
                        border: "1px solid #CCBFB8",
                        padding: "0 12px",
                        fontSize: 15,
                        outline: "none",
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <button
                        onClick={saveField}
                        style={{
                          background: PINK,
                          color: "#FFFFFF",
                          height: 40,
                          borderRadius: 12,
                          padding: "0 18px",
                          fontWeight: 700,
                          fontSize: 14,
                          fontFamily: "'Nunito Sans', sans-serif",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setExpanded(null)}
                        style={{
                          color: PINK,
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "'Nunito Sans', sans-serif",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Existing settings rows */}
        <div className="space-y-3" style={{ marginTop: 8 }}>
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

        {/* Security badge */}
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
              background: PINK,
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
