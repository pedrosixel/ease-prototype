import { useEffect, useState } from "react";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";
import { useEase } from "../state";
import { ScrollFade, ScrollHint } from "../primitives";
import star from "@/assets/Ease_heart_Pink.svg";
import starPurple from "@/assets/Ease_Star_Purple.svg";
import pipContent from "@/assets/Pip_Content.svg";

const DURATIONS = ["Under 5 min", "5-15 min", "15-30 min", "Over 30 min"];
const TACTICS = ["Yes, they helped", "Not Fully", "No, not really"];
const CONTEXT = ["Yes", "Not Sure", "No"];

const Pill = ({
  label,
  active,
  onClick,
  isCaregiver = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  isCaregiver?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`h-11 px-5 rounded-full text-ease-sm font-semibold border transition inline-flex w-auto items-center justify-center ${
      active
        ? isCaregiver
          ? "bg-[#7B5EA7] text-white border-[#7B5EA7]"
          : "bg-[#F3768D] text-white border-[#F3768D]"
        : "bg-transparent text-white/70 border-white/25"
    }`}
  >
    {label}
  </button>
);

export const PostCrisis = () => {
  const { go, playbook, crisisOrigin, caregiver, user, addFeedbackEntry } = useEase();
  const returnTo = crisisOrigin === "caregiver" ? "caregiverHome" : "homeV2";
  const isCaregiver = crisisOrigin === "caregiver";
  const [duration, setDuration] = useState<string>("Under 5 min");
  const [tactic, setTactic] = useState<string | null>(null);
  const [ctx, setCtx] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [overlayPhase, setOverlayPhase] = useState<"hidden" | "in" | "out">("hidden");
  const [scrolled, setScrolled] = useState(false);

  const persistEntry = (noteText: string) => {
    const helpedVal: "yes" | "not_fully" | "no" =
      tactic === "Yes, they helped" ? "yes" : tactic === "No, not really" ? "no" : "not_fully";
    addFeedbackEntry({
      caregiverName: caregiver.firstName,
      caregiverRole: caregiver.role,
      dateLabel: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      duration,
      helped: helpedVal,
      note: noteText.trim() || undefined,
      context: (ctx as "Yes" | "No" | "Not Sure" | null) ?? undefined,
      timestamp: Date.now(),
    });
  };

  const finish = () => {
    persistEntry(notes);
    setOverlayPhase("in");
  };

  const handleSkip = () => {
    setNotes("");
    persistEntry("");
    setOverlayPhase("in");
  };

  useEffect(() => {
    if (overlayPhase === "in") {
      const t1 = window.setTimeout(() => setOverlayPhase("out"), 1500);
      return () => window.clearTimeout(t1);
    }
    if (overlayPhase === "out") {
      const t2 = window.setTimeout(() => go(returnTo), 300);
      return () => window.clearTimeout(t2);
    }
  }, [overlayPhase, go, returnTo]);

  return (
    <div className="h-full flex flex-col bg-[#1A1A1A] text-white relative">
      {/* Header */}
      <div className="px-5 pt-3 pb-2 shrink-0">
        <button
          onClick={() => go(returnTo)}
          className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-white/80 hover:bg-white/5"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      <div className="px-7 text-center shrink-0">
        <h1 className="font-display text-ease-2xl text-white leading-tight">How did it go?</h1>
        <p className="mt-2 text-ease-sm text-white/55">
          This helps improve {playbook.childName}'s playbook over time.
        </p>
      </div>

      {/* Body */}
      <div className="relative flex-1 overflow-hidden mt-6">
        <div
          className="h-full overflow-y-auto phone-scroll px-6 pb-4 space-y-7"
          onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 20)}
        >
        {/* DURATION */}
        <section>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-bold mb-2">
            Duration
          </div>
          <div className="text-ease-base text-white font-semibold mb-3">
            How long did this difficult moment last?
          </div>
          <div className="flex flex-wrap gap-2.5">
            {DURATIONS.map((d) => (
              <Pill
                key={d}
                label={d}
                active={duration === d}
                onClick={() => setDuration(d)}
                isCaregiver={isCaregiver}
              />
            ))}
          </div>
        </section>

        {/* TACTICS */}
        <section>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-bold mb-2 inline-flex items-center">
            <img src={isCaregiver ? starPurple : star} alt="" className="w-4 h-4 mr-1.5" />
            Tactics
          </div>
          <div className="text-ease-base text-white font-semibold mb-3">
            Did the tactics in the playbook help?
          </div>
          <div className="flex flex-wrap gap-2.5">
            {TACTICS.map((t) => (
              <Pill key={t} label={t} active={tactic === t} onClick={() => setTactic(t)} isCaregiver={isCaregiver} />
            ))}
          </div>

          <div className="mt-5">
            <div className="text-ease-sm text-white font-semibold inline-flex items-center">
              <img src={isCaregiver ? starPurple : star} alt="" className="w-4 h-4 mr-1.5" />
              {isCaregiver
                ? `Any insight for ${user.firstName || "the parent"}?`
                : "Add a note to this log entry"}
            </div>
            <div className="text-ease-xs text-white/45 mt-0.5">
              {isCaregiver
                ? `This helps ${user.firstName || "the parent"} refine the playbook.`
                : "Optional — you can add details about what happened."}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. he didn't respond to the weighted blanket this time..."
              className={`mt-3 w-full rounded-[15px] border ${isCaregiver ? "border-[#7B5EA7]" : "border-primary"} bg-transparent text-white placeholder:italic placeholder:text-white/40 px-4 py-3 text-ease-sm focus:outline-none resize-none`}
            />
          </div>
        </section>

        {/* CONTEXT */}
        <section>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-bold mb-2">
            Context
          </div>
          <div className="text-ease-base text-white font-semibold mb-3">
            Was there a clear trigger?
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CONTEXT.map((c) => (
              <Pill key={c} label={c} active={ctx === c} onClick={() => setCtx(c)} isCaregiver={isCaregiver} />
            ))}
          </div>
        </section>
        </div>
        <ScrollFade tone="dark" />
        <ScrollHint visible={!scrolled} tone="dark" />
      </div>

      {/* Bottom */}
      <div className="px-5 pb-6 pt-3 shrink-0 flex gap-3">
        <button
          onClick={handleSkip}
          className="flex-1 h-[52px] rounded-full border border-white/25 text-white/70 font-semibold"
        >
          Skip
        </button>
        <button
          onClick={finish}
          className="flex-1 h-[52px] rounded-full bg-white text-ink font-semibold inline-flex items-center justify-center gap-2 px-6"
        >
          {isCaregiver ? (
            <>Share with {user.firstName || "the parent"} <ArrowRight size={18} /></>
          ) : (
            <>Save to Log <Check size={18} /></>
          )}
        </button>
      </div>

      {/* Completion overlay */}
      {overlayPhase !== "hidden" && (
        <div
          className={`absolute inset-0 z-[70] bg-[#1A1A1A]/95 flex flex-col items-center justify-center transition-opacity ${
            overlayPhase === "in" ? "opacity-100 duration-200" : "opacity-0 duration-150"
          }`}
        >
          <img src={pipContent} alt="" style={{ width: 80, height: 80 }} />
          <h2 className="font-display text-ease-2xl text-white mt-5">Session logged.</h2>
          <p className="mt-2 text-ease-sm text-white/55">
            {playbook.childName}'s parent will be notified.
          </p>
        </div>
      )}
    </div>
  );
};
