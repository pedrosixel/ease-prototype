import { useMemo, useState } from "react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";
import star from "@/assets/ease-star.svg";

type Section = "calming" | "triggers" | "avoid";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "calming", label: "Calming Strategies" },
  { id: "triggers", label: "Known Triggers" },
  { id: "avoid", label: "What NOT to Do" },
];

const guessSection = (note: string): Section => {
  const n = note.toLowerCase();
  if (n.includes("trigger") || n.includes("set him off") || n.includes("set off")) return "triggers";
  if (n.includes("do not") || n.includes("don't") || n.includes("avoid")) return "avoid";
  return "calming";
};

export const AddToPlaybook = () => {
  const { go, playbook, activeFeedbackId, addFeedbackToSection, dismissFeedback, showToast } = useEase();
  const entry = useMemo(
    () => playbook.feedbackEntries.find((e) => e.id === activeFeedbackId),
    [playbook.feedbackEntries, activeFeedbackId],
  );

  const initialNote = entry?.note ?? "";
  const [section, setSection] = useState<Section>(guessSection(initialNote));
  const [text, setText] = useState(initialNote);
  const [attempted, setAttempted] = useState(false);

  if (!entry) {
    return (
      <div className="h-full flex flex-col ">
        <TopBar back="homeV2" title="Add to Playbook" />
        <div className="flex-1 flex items-center justify-center text-ease-base text-muted-foreground">
          No insight selected.
        </div>
      </div>
    );
  }

  const save = () => {
    if (!text.trim()) {
      setAttempted(true);
      return;
    }
    addFeedbackToSection(entry.id, section, text.trim());
    showToast(`Added to ${playbook.childName}'s Playbook`);
    go("homeV2");
  };

  const dismiss = () => {
    dismissFeedback(entry.id);
    go("homeV2");
  };

  return (
    <div className="h-full flex flex-col ">
      <TopBar back="homeV2" />
      <div className="flex-1 overflow-y-auto phone-scroll px-7 pb-6">
        <div className="flex items-center gap-2 mt-1">
          <img src={star} alt="" className="w-4 h-4" />
          <span className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Insight from {entry.caregiverName}
          </span>
        </div>
        <h1 className="font-display text-ease-2xl text-ink leading-tight mt-3">
          Add to {playbook.childName}'s Playbook?
        </h1>

        <div className="mt-6">
          <div className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold mb-2">
            Add to which section?
          </div>
          <div className="flex gap-2 overflow-x-auto phone-scroll -mx-1 px-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`shrink-0 h-10 px-4 rounded-full text-ease-sm font-semibold border transition ${
                  section === s.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {entry.note && (
          <div className="mt-5 rounded-2xl bg-muted p-4">
            <div className="text-ease-xs uppercase tracking-[0.12em] text-muted-foreground font-bold mb-1.5">
              Caregiver's note
            </div>
            <p className="text-ease-sm italic text-foreground leading-relaxed">
              "{entry.note}"
            </p>
          </div>
        )}

        <div className="mt-5">
          <div className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold mb-2">
            Edit before saving
          </div>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (attempted) setAttempted(false);
            }}
            rows={5}
            placeholder="Refine this insight…"
            className="w-full rounded-[14px] border border-border bg-card px-4 py-3 text-ease-base text-foreground focus:outline-none focus:border-primary resize-none"
          />
          {attempted && !text.trim() && (
            <p style={{ color: "#F3768D", fontSize: "12px", fontFamily: "Nunito Sans, sans-serif", marginTop: "8px" }}>
              Add a note before saving — even a few words help.
            </p>
          )}
        </div>
      </div>

      <div className="px-7 pb-6 pt-2 shrink-0 space-y-3">
        <div style={{ opacity: text.trim() ? 1 : 0.5 }}>
          <PrimaryBtn onClick={save}>Save to Playbook</PrimaryBtn>
        </div>
        <button
          onClick={dismiss}
          className="w-full text-ease-sm text-muted-foreground underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
