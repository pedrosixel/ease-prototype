import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SCREENS, useEase } from "./state";

// Dev/showcase-only navigation panel — rendered outside the phone frame on
// desktop so the prototype can be jumped between screens during a demo.
// Collapsed behind a small toggle button by default so it stays out of the
// way; opens into the grouped screen list on click.
export const ScreenNavPanel = () => {
  const { go, screen } = useEase();
  const [open, setOpen] = useState(false);
  const flows = Array.from(new Set(SCREENS.map((s) => s.flow)));

  return (
    <div className="shrink-0 flex flex-col items-start" style={{ width: open ? 260 : "auto" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5"
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          color: "#666666",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "8px 14px",
          borderRadius: 999,
          border: "1px solid #E0E0E0",
          background: "#FAFAFA",
          cursor: "pointer",
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        Screens
      </button>

      {open && (
        <div
          className="overflow-y-auto"
          style={{
            width: 260,
            maxHeight: "780px",
            marginTop: 8,
            padding: 16,
            borderRadius: 20,
            border: "1px solid #E0E0E0",
            background: "#FAFAFA",
          }}
        >
          {flows.map((flow) => (
            <div key={flow} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#B0B0B0",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {flow}
              </div>
              <div className="flex flex-col gap-1">
                {SCREENS.filter((s) => s.flow === flow).map((s) => {
                  const active = screen === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        go(s.id);
                        setOpen(false);
                      }}
                      style={{
                        textAlign: "left",
                        fontFamily: "'Nunito Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: active ? 700 : 500,
                        padding: "6px 10px",
                        borderRadius: 8,
                        border: `1px solid ${active ? "#999999" : "#E5E5E5"}`,
                        background: active ? "#EAEAEA" : "#FFFFFF",
                        color: "#333333",
                        cursor: "pointer",
                      }}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
