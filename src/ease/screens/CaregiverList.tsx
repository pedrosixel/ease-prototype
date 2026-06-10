import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Avatar, CaregiverBottomNav, CaregiverTopBarGear } from "../primitives";
import { useEase, ChildId } from "../state";
import { CHILD_PHOTOS } from "../assets";
import starBlue from "@/assets/Ease_Star_Purple.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Modal =
  | { kind: "confirmCheckOut"; childId: ChildId }
  | { kind: "confirmSwitch"; from: ChildId; to: ChildId }
  | { kind: "switchedToast"; toName: string }
  | null;

export const CaregiverList = () => {
  const { go, children, checkedInChildId, checkIn, checkOut, setActiveChild, showToast, hasSeenCaregiverWelcome } = useEase();
  const ids: ChildId[] = ["tyler", "heitor"];
  const [modal, setModal] = useState<Modal>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addLink, setAddLink] = useState("");
  const [pendingCheckInId, setPendingCheckInId] = useState<ChildId | null>(null);

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
    checkOut();
  };

  const handleCheckIn = (id: ChildId) => {
    if (checkedInChildId && checkedInChildId !== id) {
      setModal({ kind: "confirmSwitch", from: checkedInChildId, to: id });
    } else {
      setPendingCheckInId(id);
    }
  };

  const confirmCheckIn = () => {
    if (!pendingCheckInId) return;
    checkIn(pendingCheckInId);
    setActiveChild(pendingCheckInId);
    setPendingCheckInId(null);
    go("bridge");
  };

  return (
    <div className="h-full flex flex-col">
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
              className="rounded-2xl bg-card border border-[#CCBFB8] border-l-[3px] border-l-[#7B5EA7] p-4"
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
                  <div className="text-ease-sm text-muted-foreground">
                    Age {c.childAge} · {c.diagnosis}
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
                    setActiveChild(id);
                    go("bridge");
                  }}
                  className="text-ease-sm font-semibold text-secondary"
                >
                  View Profile →
                </button>
                {isCheckedIn ? (
                  <button
                    onClick={() => handleCheckOut(id)}
                    className="px-5 h-10 rounded-full text-ease-sm font-bold text-white"
                    style={{ background: "#7B5EA7" }}
                  >
                    Check Out
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckIn(id)}
                    className="px-5 h-10 rounded-full text-ease-sm font-bold bg-white"
                    style={{ border: "2px solid #7B5EA7", color: "#7B5EA7" }}
                  >
                    Check In
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #CCBFB8",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <button
            onClick={() => !addOpen && setAddOpen(true)}
            className="w-full flex items-center gap-3 text-left"
            disabled={addOpen}
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

          {addOpen && (
            <div className="mt-3 flex flex-col gap-3">
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
                }}
              />
              <button
                onClick={() => {
                  if (!addLink.trim()) return;
                  showToast("Child added successfully");
                  setAddLink("");
                  setAddOpen(false);
                }}
                disabled={!addLink.trim()}
                style={{
                  background: "#7B5EA7",
                  color: "#FFFFFF",
                  height: 40,
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  width: "100%",
                  opacity: addLink.trim() ? 1 : 0.5,
                }}
              >
                Add Child
              </button>
              <button
                onClick={() => {
                  setAddOpen(false);
                  setAddLink("");
                }}
                style={{
                  background: "transparent",
                  color: "#7B5EA7",
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <CaregiverBottomNav active="caregiverList" />

      {modal?.kind === "confirmCheckOut" && (
        <Overlay>
          <h2 className="font-display text-ease-lg text-ink">
            Check out of {children[modal.childId].childName}'s session?
          </h2>
          <p className="mt-2 text-ease-sm text-muted-foreground">
            You'll need to check in again to access {children[modal.childId].childName.split(" ")[0]}'s Playbook.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 h-11 rounded-full bg-muted text-foreground text-ease-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                checkOut();
                setModal(null);
              }}
              className="flex-1 h-11 rounded-full bg-[#7B5EA7] text-white text-ease-sm font-bold"
            >
              Check Out
            </button>
          </div>
        </Overlay>
      )}

      {modal?.kind === "confirmSwitch" && (
        <Overlay>
          <h2 className="font-display text-ease-lg text-ink">
            You're currently with {children[modal.from].childName.split(" ")[0]} — check out first?
          </h2>
          <p className="mt-2 text-ease-sm text-muted-foreground">
            Switching will check you out of {children[modal.from].childName.split(" ")[0]} and into {children[modal.to].childName.split(" ")[0]}.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setModal(null)}
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
        <Overlay>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 bg-green-500">
              <Check size={20} strokeWidth={3} />
            </div>
            <div className="font-display text-ease-md text-ink font-bold">Now with {modal.toName}</div>
          </div>
        </Overlay>
      )}

      <AlertDialog open={pendingCheckInId !== null} onOpenChange={(open) => { if (!open) setPendingCheckInId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingCheckInId ? `Check in with ${children[pendingCheckInId].childName.split(" ")[0]}?` : ""}
            </AlertDialogTitle>
            <AlertDialogDescription>
              You'll have access to their Playbook for this session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCheckIn}
              style={{ background: "#7B5EA7", color: "#FFFFFF" }}
            >
              Check In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const Overlay = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
    <div className="w-full bg-card rounded-2xl p-5 shadow-xl">{children}</div>
  </div>
);
