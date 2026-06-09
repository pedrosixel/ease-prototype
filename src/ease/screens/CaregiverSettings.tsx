import { useState } from "react";
import { Pencil, ShieldCheck } from "lucide-react";
import { TopBar } from "../primitives";
import { useEase } from "../state";
import paulPhoto from "@/assets/paul-profile.jpg";

type FieldKey = "fullName" | "role" | "school" | "email" | "phone";

const FIELDS: { key: FieldKey; label: string; initial: string }[] = [
  { key: "fullName", label: "FULL NAME", initial: "Paul Smith" },
  { key: "role", label: "ROLE", initial: "Educational Assistant" },
  { key: "school", label: "SCHOOL", initial: "Maple Grove Elementary" },
  { key: "email", label: "EMAIL", initial: "paul.smith@maplegrove.ca" },
  { key: "phone", label: "PHONE", initial: "+1 (604) 555-0147" },
];

export const CaregiverSettings = () => {
  const { go, setIsNewUser, setIndexOpen } = useEase();
  const [values, setValues] = useState<Record<FieldKey, string>>(() =>
    FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: f.initial }), {} as Record<FieldKey, string>),
  );
  const [expanded, setExpanded] = useState<FieldKey | null>(null);
  const [draft, setDraft] = useState<string>("");

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
      localStorage.removeItem("ease.hasSeenCaregiverWelcome");
    }
    setIsNewUser(true);
    // TODO: route to caregiver entry point instead of welcome when caregiver reset flow is built
    go("welcome");
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "#FFFFFF" }}>
      <TopBar back="caregiverList" title="Settings" />
      <div className="flex-1 overflow-y-auto phone-scroll px-6 pb-8">
        {/* Profile */}
        <div className="flex flex-col items-center" style={{ marginTop: 8 }}>
          <img
            src={paulPhoto}
            alt="Paul Smith"
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #7B5EA7",
            }}
          />
          <button
            style={{
              fontSize: 13,
              color: "#7B5EA7",
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
            {values.role}
          </div>
        </div>

        {/* Editable fields */}
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
                    <Pencil size={16} color="#7B5EA7" />
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
                          background: "#7B5EA7",
                          color: "#FFFFFF",
                          height: 40,
                          borderRadius: 12,
                          padding: "0 18px",
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setExpanded(null)}
                        style={{
                          color: "#7B5EA7",
                          fontSize: 14,
                          fontWeight: 600,
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

        <div className="border-t border-border" style={{ marginTop: 24, marginBottom: 24 }} />

        {/* Coming soon */}
        <div className="space-y-3">
          {["Notifications", "Privacy", "About"].map((s) => (
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
            marginTop: 24,
            background: "#F5F8FF",
            border: "1px solid #EDE5F7",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <ShieldCheck size={32} color="#7B5EA7" style={{ flexShrink: 0 }} />
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
                fontSize: 13,
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
          className="mt-8 mx-auto block text-ease-xs underline"
          style={{ color: "#777777", fontSize: 13 }}
        >
          Reset demo
        </button>

        <button
          onClick={() => setIndexOpen(true)}
          style={{
            color: "#777777",
            fontSize: 13,
            textDecoration: "underline",
            textAlign: "center",
            marginTop: 8,
            marginBottom: 16,
            cursor: "pointer",
            display: "block",
            width: "100%",
            background: "transparent",
            border: "none",
          }}
        >
          Screen Index
        </button>
      </div>
    </div>
  );
};
