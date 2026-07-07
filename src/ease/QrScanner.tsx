import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const SCANNER_ID = "ease-qr-scanner";
const PURPLE = "#7B5EA7";

const CORNERS: CSSProperties[] = [
  { top: "12%", left: "12%", borderWidth: "2px 0 0 2px" },
  { top: "12%", right: "12%", borderWidth: "2px 2px 0 0" },
  { bottom: "12%", left: "12%", borderWidth: "0 0 2px 2px" },
  { bottom: "12%", right: "12%", borderWidth: "0 2px 2px 0" },
];

interface QrScannerProps {
  onScan: (value: string) => void;
  onSwitchToPaste: () => void;
}

export const QrScanner = ({ onScan, onSwitchToPaste }: QrScannerProps) => {
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scannerInstance: any = null;

    const init = async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        const scanner = new Html5Qrcode(SCANNER_ID);

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 200, height: 200 } },
          (decodedText: string) => {
            if (!active) return;
            active = false;
            scanner.stop().catch(() => {});
            onScan(decodedText);
          },
          () => {}
        );

        if (!active) {
          scanner.stop().catch(() => {});
          return;
        }
        scannerInstance = scanner;
      } catch {
        if (active) setUnavailable(true);
      }
    };

    init();

    return () => {
      active = false;
      if (scannerInstance) {
        scannerInstance.stop().catch(() => {});
        scannerInstance = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #CCBFB8",
        background: "#1A1A1A",
        position: "relative",
      }}
    >
      <style>{`
        #${SCANNER_ID} video {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        #${SCANNER_ID} button { display: none !important; }
        #${SCANNER_ID} img { display: none !important; }
        @keyframes ease-scan-line {
          0%   { top: 10%; }
          100% { top: 90%; }
        }
      `}</style>

      {/* html5-qrcode mount target */}
      <div id={SCANNER_ID} style={{ position: "absolute", inset: 0 }} />

      {unavailable ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#1A1A1A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 24,
            zIndex: 20,
          }}
        >
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 13,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Camera not available. Use Paste Link instead.
          </p>
          <button
            onClick={onSwitchToPaste}
            style={{
              background: PURPLE,
              color: "white",
              border: "none",
              borderRadius: 10,
              height: 40,
              padding: "0 20px",
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Switch to Paste Link
          </button>
        </div>
      ) : (
        /* Scan overlay: line + corner markers */
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Animated scan line */}
          <div
            style={{
              position: "absolute",
              left: "10%",
              right: "10%",
              height: 2,
              background: PURPLE,
              borderRadius: 1,
              animation: "ease-scan-line 2s linear infinite",
            }}
          />

          {/* L-shaped corner markers */}
          {CORNERS.map((corner, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                borderStyle: "solid",
                borderColor: PURPLE,
                borderRadius: 2,
                ...corner,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
