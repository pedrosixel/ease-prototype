import { useEffect, useState } from "react";
import { Check, Info, QrCode, Link, X } from "lucide-react";
import { Avatar, CaregiverBottomNav, CaregiverTopBarGear } from "../primitives";
import { useEase, ChildId } from "../state";
import { CHILD_PHOTOS } from "../assets";
import { QrScanner } from "../QrScanner";
import starBlue from "@/assets/Ease_Star_Purple.svg";

const PURPLE = "#7B5EA7";

type Modal =
  | { kind: "confirmCheckIn"; childId: ChildId }
  | { kind: "confirmCheckOut"; childId: ChildId }
  | { kind: "confirmSwitch"; from: ChildId; to: ChildId }
  | { kind: "switchedToast"; toName: string }
  | null;

export const CaregiverList = () => {
  const { go, children, checkedInChildId, checkIn, checkOut, setActiveChild, showToast, hasSeenCaregiverWelcome } = useEase();
  const ids: ChildId[] = ["tyler", "heitor"];
  const [modal, setModal] = useState<Modal>(null);
  const [modalClosing, setModalClosing] = useState(false);

  const dismissModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModal(null);
      setModalClosing(false);
    }, 150);
  };
  const [showAddChild, setShowAddChild] = useState(false);
  const [levelInfoOpen, setLevelInfoOpen] = useState(false);
  const [levelInfoClosing, setLevelInfoClosing] = useState(false);

  const closeLevelInfo = () => {
    setLevelInfoClosing(true);
    setTimeout(() => {
      setLevelInfoOpen(false);
      setLevelInfoClosing(false);
    }, 150);
  };
  const [addLink, setAddLink] = useState("");
  const [addMode, setAddMode] = useState<"scan" | "paste">("paste");

  useEffect(() => {
    if (!hasSeenCaregiverWelcome) {
      go("caregiverWelcome");
    }
  }, [hasSeenCaregiverWelcome, go]);

  useEffect(() => {
    if (modal?.kind === "switchedToast") {
      const t = setTimeout(() => {
        setModal(null);
        go("bridge");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [modal, go]);

  const handleCheckOut = (id: ChildId) => {
    setModal({ kind: "confirmCheckOut", childId: id });
  };

  const handleCheckIn = (id: ChildId) => {
    if (checkedInChildId && checkedInChildId !== id) {
      setModal({ kind: "confirmSwitch", from: checkedInChildId, to: id });
    } else {
      setModal({ kind: "confirmCheckIn", childId: id });
    }
  };

  const [addClosing, setAddClosing] = useState(false);

  const closeAddCard = () => {
    setAddClosing(true);
    setTimeout(() => {
      setShowAddChild(false);
      setAddLink("");
      setAddMode("paste");
      setAddClosing(false);
    }, 150);
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="px-6 pt-5 pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={starBlue} alt="" className="w-4 h-4" />
            <h1 className="font-display text-ease-xl text-ink">My List</h1>
          </div>
          <CaregiverTopBarGear />
        </div>
        <p className="text-ease-sm text-muted-foreground mt-1">
          Children whose parents have shared their profile with you.
        </p>
      </div>

      <div className="px-6 mt-5 flex-1 overflow-y-auto phone-scroll space-y-3 pb-4">
        {ids.map((id) => {
          const c = children[id];
          const isCheckedIn = checkedInChildId === id;
          const contextNotes: Record<ChildId, string> = {
            tyler: "Last trigger: loud hallway before class · Apr 18",
            heitor: "Last session: 3 days ago · no incidents",
          };
          return (
            <div
              key={id}
              className={`rounded-2xl bg-card border border-[#CCBFB8] p-4 ${isCheckedIn ? "border-l-[3px] border-l-[#7B5EA7]" : ""}`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={CHILD_PHOTOS[id]}
                  alt={c.childName}
                  className="w-[52px] h-[52px] rounded-full object-cover shrink-0"
                  style={{ border: "3px solid #7B5EA7" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-ease-lg text-ink truncate">{c.childName}</div>
                  <div className="flex items-center text-ease-sm text-muted-foreground">
                    <span>Age {c.childAge} · {c.diagnosis}</span>
                    <button
                      onClick={() => setLevelInfoOpen(true)}
                      className="w-[44px] h-[44px] flex items-center justify-center shrink-0"
                      aria-label="What do the autism levels mean?"
                    >
                      <Info size={13} color="#7B5EA7" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCheckedIn ? "bg-green-500" : "bg-muted-foreground/50"
                      }`}
                    />
                    <span
                      className={`text-ease-xs font-semibold ${
                        isCheckedIn
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {isCheckedIn ? "Currently with this child" : "Not in session"}
                    </span>
                  </div>
                  <div className="text-ease-xs text-muted-foreground mt-1">
                    {contextNotes[id]}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    checkIn(id);
                    go("bridge");
                  }}
                  className="text-ease-sm font-semibold text-secondary"
                >
                  View Profile →
                </button>
                {isCheckedIn ? (
                  <button
                    onClick={() => handleCheckOut(id)}
                    className="px-5 h-10 rounded-full text-ease-sm font-bold text-white transition-transform active:scale-[0.97]"
                    style={{ background: "#7B5EA7" }}
                  >
                    Check Out
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckIn(id)}
                    className="px-5 h-10 rounded-full text-ease-sm font-bold bg-white transition-transform active:scale-[0.97]"
                    style={{ border: "2px solid #7B5EA7", color: "#7B5EA7" }}
                  >
                    Check In
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Add a child card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #CCBFB8",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <button
            onClick={() => setShowAddChild(true)}
            className="w-full flex items-center gap-3 text-left transition-transform active:scale-[0.98]"
          >
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1.5px dashed #7B5EA7",
                background: "transparent",
                color: "#7B5EA7",
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              +
            </div>
            <span className="text-ease-sm font-semibold" style={{ color: "#7B5EA7" }}>
              Add a child — paste a link from a parent
            </span>
          </button>
        </div>
      </div>

      {levelInfoOpen && (
        <>
          <div
            onClick={closeLevelInfo}
            style={{ position: "fixed", inset: 0, zIndex: 40 }}
          />
          <div
            className={
              levelInfoClosing
                ? "animate-out fade-out zoom-out-95 fill-mode-forwards duration-[150ms]"
                : "animate-in fade-in zoom-in-95 duration-[180ms]"
            }
            style={{
              position: "fixed",
              bottom: 96,
              left: 16,
              right: 16,
              zIndex: 50,
              transformOrigin: "bottom center",
              background: "#FFFFFF",
              border: "1px solid #CCBFB8",
              borderRadius: 8,
              padding: 14,
            }}
          >
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#444444", marginBottom: 10 }}>
              What does this mean?
            </div>
            {[
              { label: "Level 1 — Needs support", desc: "Often has strong communication skills, but social situations and unexpected changes can be challenging." },
              { label: "Level 2 — Needs substantial support", desc: "Social communication is more affected. Behaviors may be more noticeable in daily settings." },
              { label: "Level 3 — Needs very substantial support", desc: "Communication is significantly impacted. Intensive daily support is essential." },
            ].map((d, i) => (
              <div key={i} style={{ marginTop: i > 0 ? 10 : 0 }}>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#7B5EA7" }}>{d.label}</div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 400, color: "#777777", marginTop: 2 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {showAddChild && (
        <>
          {/* Layer A — Backdrop */}
          <div
            className={
              addClosing
                ? "animate-out fade-out fill-mode-forwards duration-[150ms]"
                : "animate-in fade-in duration-[200ms]"
            }
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 40,
            }}
            onClick={closeAddCard}
          />

          {/* Layer B — Card (flex-centered so the zoom animation never fights a centering transform) */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
          <div
            className={
              addClosing
                ? "animate-out fade-out zoom-out-95 fill-mode-forwards duration-[150ms]"
                : "animate-in fade-in zoom-in-95 duration-[200ms]"
            }
            style={{
              width: "calc(100% - 48px)",
              maxWidth: 360,
              background: "#FFFFFF",
              borderRadius: 24,
              padding: 24,
              pointerEvents: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#444444",
                }}
              >
                Add a Child
              </span>
              <button
                onClick={closeAddCard}
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={20} color="#777777" />
              </button>
            </div>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 13,
                color: "#777777",
                marginTop: 4,
              }}
            >
              Paste a link from a parent or scan their QR code.
            </p>

            {/* Mode toggle */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 12 }}>
              <button
                onClick={() => setAddMode("scan")}
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
                  background: addMode === "scan" ? PURPLE : "white",
                  color: addMode === "scan" ? "white" : "#777777",
                  border: addMode === "scan" ? "none" : "1px solid #CCBFB8",
                }}
              >
                <QrCode size={16} />
                Scan QR Code
              </button>
              <button
                onClick={() => setAddMode("paste")}
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
                  background: addMode === "paste" ? PURPLE : "white",
                  color: addMode === "paste" ? "white" : "#777777",
                  border: addMode === "paste" ? "none" : "1px solid #CCBFB8",
                }}
              >
                <Link size={16} />
                Paste Link
              </button>
            </div>

            {/* Content */}
            {addMode === "scan" ? (
              <>
                <QrScanner
                  onScan={() => {
                    showToast("Child added successfully");
                    closeAddCard();
                  }}
                  onSwitchToPaste={() => setAddMode("paste")}
                />
                <p
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 13,
                    color: "#777777",
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  Point your camera at the QR code the parent shared
                </p>
              </>
            ) : (
              <input
                value={addLink}
                onChange={(e) => setAddLink(e.target.value)}
                placeholder="Paste link from parent"
                autoFocus
                style={{
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid #CCBFB8",
                  background: "#FFFFFF",
                  padding: "0 12px",
                  fontSize: 14,
                  width: "100%",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            )}

            {/* Add Child button */}
            <button
              onClick={() => {
                if (!addLink.trim()) return;
                showToast("Child added successfully");
                closeAddCard();
              }}
              disabled={addMode === "scan" || !addLink.trim()}
              style={{
                background: PURPLE,
                color: "#FFFFFF",
                height: 40,
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                width: "100%",
                marginTop: 16,
                opacity: addMode === "scan" || !addLink.trim() ? 0.5 : 1,
                border: "none",
                cursor: addMode === "scan" || !addLink.trim() ? "default" : "pointer",
              }}
            >
              Add Child
            </button>

            {/* Cancel */}
            <button
              onClick={closeAddCard}
              style={{
                display: "block",
                margin: "12px auto 0",
                background: "transparent",
                color: PURPLE,
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
          </div>
        </>
      )}

      <CaregiverBottomNav active="caregiverList" />

      {modal?.kind === "confirmCheckIn" && (
        <Overlay closing={modalClosing}>
          <h2 className="font-display text-ease-lg text-ink">
            Check in with {children[modal.childId].childName.split(" ")[0]}?
          </h2>
          <p className="mt-2 text-ease-sm text-muted-foreground">
            You'll have access to their Playbook for this session.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={dismissModal}
              className="flex-1 h-11 rounded-full bg-muted text-foreground text-ease-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                checkIn(modal.childId);
                setActiveChild(modal.childId);
                setModal(null);
                go("bridge");
              }}
              className="flex-1 h-11 rounded-full bg-[#7B5EA7] text-white text-ease-sm font-bold"
            >
              Check In
            </button>
          </div>
        </Overlay>
      )}

      {modal?.kind === "confirmCheckOut" && (
        <Overlay closing={modalClosing}>
          <h2 className="font-display text-ease-lg text-ink">
            Check out of {children[modal.childId].childName}'s session?
          </h2>
          <p className="mt-2 text-ease-sm text-muted-foreground">
            You'll need to check in again to access {children[modal.childId].childName.split(" ")[0]}'s Playbook.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={dismissModal}
              className="flex-1 h-11 rounded-full bg-muted text-foreground text-ease-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                checkOut();
                dismissModal();
              }}
              className="flex-1 h-11 rounded-full bg-[#7B5EA7] text-white text-ease-sm font-bold"
            >
              Check Out
            </button>
          </div>
        </Overlay>
      )}

      {modal?.kind === "confirmSwitch" && (
        <Overlay closing={modalClosing}>
          <h2 className="font-display text-ease-lg text-ink">
            You're currently with {children[modal.from].childName.split(" ")[0]} — check out first?
          </h2>
          <p className="mt-2 text-ease-sm text-muted-foreground">
            Switching will check you out of {children[modal.from].childName.split(" ")[0]} and into {children[modal.to].childName.split(" ")[0]}.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={dismissModal}
              className="flex-1 h-11 rounded-full bg-muted text-foreground text-ease-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const toName = children[modal.to].childName.split(" ")[0];
                checkIn(modal.to);
                setActiveChild(modal.to);
                setModal({ kind: "switchedToast", toName });
              }}
              className="flex-1 h-11 rounded-full bg-[#7B5EA7] text-white text-ease-sm font-bold"
            >
              Switch to {children[modal.to].childName.split(" ")[0]}
            </button>
          </div>
        </Overlay>
      )}

      {modal?.kind === "switchedToast" && (
        <Overlay closing={modalClosing}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 bg-green-500">
              <Check size={20} strokeWidth={3} />
            </div>
            <div className="font-display text-ease-md text-ink font-bold">Now with {modal.toName}</div>
          </div>
        </Overlay>
      )}

    </div>
  );
};

const Overlay = ({ children, closing = false }: { children: React.ReactNode; closing?: boolean }) => (
  <div
    className={`fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50 ${
      closing
        ? "animate-out fade-out fill-mode-forwards duration-[150ms]"
        : "animate-in fade-in duration-[150ms]"
    }`}
  >
    <div
      className={`w-full bg-card rounded-2xl p-5 shadow-xl ${
        closing
          ? "animate-out fade-out zoom-out-95 fill-mode-forwards duration-[150ms]"
          : "animate-in fade-in zoom-in-95 duration-[150ms] ease-out"
      }`}
    >
      {children}
    </div>
  </div>
);
