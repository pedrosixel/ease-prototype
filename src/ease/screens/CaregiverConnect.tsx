import { useState } from "react";
import { Link as LinkIcon, QrCode } from "lucide-react";
import { TopBar, PrimaryBtn, Dots } from "../primitives";
import { useEase } from "../state";
import { QrScanner } from "../QrScanner";

const PURPLE = "#7B5EA7";

export const CaregiverConnect = () => {
  const { go } = useEase();
  const [link, setLink] = useState("");
  const [mode, setMode] = useState<"scan" | "paste">("paste");

  const handleScan = (_value: string) => {
    // Demo: any valid QR scan auto-resolves to caregiverList
    go("caregiverList");
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <TopBar back="caregiverBio" />
      <div className="px-7"><Dots total={2} current={1} accent="secondary" /></div>
      <div className="px-7 mt-4 flex-1 flex flex-col">
        <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-tint text-secondary text-[11px] uppercase tracking-[0.18em] font-bold">
          <LinkIcon size={12} /> Connect
        </span>
        <h1 className="font-display text-ease-2xl text-ink leading-tight mt-4">
          Do you have a link from a parent?
        </h1>
        <p className="mt-3 text-ease-base text-muted-foreground">
          They share it from their Caregivers screen. Scan the QR code or paste the link below.
        </p>

        <div className="mt-7">
          {/* Mode toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button
              onClick={() => setMode("scan")}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                cursor: "pointer",
                background: mode === "scan" ? PURPLE : "white",
                color: mode === "scan" ? "white" : "#777777",
                border: mode === "scan" ? "none" : "1px solid #CCBFB8",
              }}
            >
              <QrCode size={16} />
              Scan QR Code
            </button>
            <button
              onClick={() => setMode("paste")}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                cursor: "pointer",
                background: mode === "paste" ? PURPLE : "white",
                color: mode === "paste" ? "white" : "#777777",
                border: mode === "paste" ? "none" : "1px solid #CCBFB8",
              }}
            >
              <LinkIcon size={16} />
              Paste Link
            </button>
          </div>

          {mode === "scan" ? (
            <>
              <QrScanner onScan={handleScan} onSwitchToPaste={() => setMode("paste")} />
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 13,
                  color: "#777777",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Point your camera at the QR code the parent shared
              </p>
            </>
          ) : (
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="ease.app/p/..."
              className="w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-secondary"
            />
          )}
        </div>

        <div className="flex-1" />

        <button
          onClick={() => go("caregiverList")}
          className="text-ease-sm text-muted-foreground underline mb-4 self-center"
        >
          I don't have a link yet. I'll add one later.
        </button>
      </div>
      <div className="px-7 pb-8">
        <PrimaryBtn
          variant="blue"
          onClick={() => go("caregiverList")}
          disabled={mode === "scan"}
        >
          Connect
        </PrimaryBtn>
      </div>
    </div>
  );
};
