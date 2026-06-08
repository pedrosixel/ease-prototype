import { useState } from "react";
import { Settings as SettingsIcon, BookOpen, Pencil, Phone, Plus } from "lucide-react";
import { Avatar, ParentBottomNav, ScrollFade, ScrollHint } from "../primitives";
import { useEase, calcCompletion, FeedbackEntry } from "../state";
import { CHILD_PHOTOS, CHILD_FAVOURITE_TOY, paulPhoto } from "../assets";
import star from "@/assets/ease-star.svg";
import { CrisisLog } from "./CrisisLog";

type Tab = "profile" | "crisis" | "care" | "emergency";

export const Home = () => {
  const { go, playbook, user, activeTab, setActiveTab } = useEase();
  const tab = activeTab;
  const setTab = setActiveTab;
  const [scrolled, setScrolled] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "crisis", label: "Crisis Plan" },
    { id: "care", label: "Care & Meds" },
    { id: "emergency", label: "Emergency" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between shrink-0">
        <div>
          <p className="text-ease-sm text-muted-foreground">Good morning,</p>
          <h1 className="font-display text-ease-xl text-ink">{user.firstName}</h1>
        </div>
        <button
          onClick={() => go("settings")}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
        >
          <SettingsIcon size={18} className="text-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-2 flex gap-2 overflow-x-auto whitespace-nowrap phone-scroll shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-4 h-9 rounded-full text-ease-sm font-semibold transition ${
              tab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="relative flex-1 overflow-hidden mt-5">
        <div
          className="h-full overflow-y-auto phone-scroll px-6 pb-4"
          onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 20)}
        >
          {tab === "profile" && <ProfileTab />}
          {tab === "crisis" && <CrisisTab />}
          {tab === "care" && <CareTab />}
          {tab === "emergency" && <EmergencyTab />}
        </div>
        <ScrollFade tone="parent" />
        <ScrollHint visible={!scrolled} tone="parent" />
      </div>

      <ParentBottomNav active="home" />
    </div>
  );
};

const ProfileTab = () => {
  const { go, playbook, openEdit, setActiveFeedback, activeChildId } = useEase();
  const completion = calcCompletion(playbook);
  const fav = CHILD_FAVOURITE_TOY[activeChildId];
  const visibleFeedback = playbook.feedbackEntries.slice(0, 3);
  const newCount = playbook.feedbackEntries.length;

  const scrollToCrisisLog = () => {
    const el = document.querySelector('[data-section="crisis-log"]');
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-4">
      {/* Combined Tyler card */}
      <div className="rounded-2xl border border-border p-5 bg-card">
        <div className="flex items-center gap-4">
          <Avatar size={64} initials={playbook.childName[0]} tone="coral" src={CHILD_PHOTOS[activeChildId]} />
          <div className="flex-1">
            <div className="font-display text-ease-lg text-ink">{playbook.childName}</div>
            <div className="text-ease-sm text-muted-foreground">
              Age {playbook.childAge} · {playbook.diagnosis}
            </div>
          </div>
        </div>
        <button
          onClick={() => go("playbook")}
          className="mt-3 text-ease-sm font-semibold text-primary"
        >
          See full profile →
        </button>
        {completion < 100 && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-ease-xs text-muted-foreground mb-1.5">
              <span className="uppercase tracking-[0.12em] font-semibold">Playbook complete</span>
              <span className="text-primary font-bold">{completion}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-ease-xs text-muted-foreground">
              <Pencil size={12} />
              <span>Add more to {playbook.childName}'s Playbook</span>
            </div>
          </div>
        )}
      </div>

      {/* Favourite Toy + Insights — 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Favourite Toy tile */}
        <button
          onClick={() =>
            openEdit({
              kind: "favouriteToy",
              index: 0,
              value: playbook.favouriteToy,
              returnTo: "home",
              breadcrumb: "PROFILE · FAVOURITE THINGS",
              returnTab: "profile",
            })
          }
          className="rounded-2xl border border-border bg-card p-3 text-left h-full flex flex-col"
        >
          <div className="aspect-square w-full rounded-xl bg-muted overflow-hidden flex items-center justify-center text-4xl">
            {playbook.favouriteToyPhoto ? (
              <img src={playbook.favouriteToyPhoto} alt={playbook.favouriteToy} className="w-full h-full object-cover" />
            ) : fav.photo ? (
              <img src={fav.photo} alt={playbook.favouriteToy} className="w-full h-full object-cover" />
            ) : (
              <span>🦕</span>
            )}
          </div>
          <div className="mt-3 text-ease-sm font-semibold text-ink">Favourite toy</div>
          <span className="inline-flex items-center gap-1.5 text-ease-xs text-muted-foreground">
            <span className="truncate">{playbook.favouriteToy}</span>
            <Pencil size={14} className="text-muted-foreground shrink-0" />
          </span>
        </button>

        {/* Insights tile */}
        <button
          onClick={scrollToCrisisLog}
          className="relative rounded-2xl border border-primary/30 bg-primary/10 p-3 h-full flex flex-col text-left"
        >
          {newCount > 0 && (
            <span className="absolute top-3 right-3 text-ease-xs font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">
              {newCount} new
            </span>
          )}
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
            <img src={star} alt="" className="w-5 h-5 brightness-0 invert" />
          </div>
          <div className="mt-auto pt-3">
            <div className="text-ease-sm font-bold text-ink">Insights</div>
            <div className="text-ease-xs font-semibold text-primary">Crisis log + tips →</div>
          </div>
        </button>
      </div>

      {/* Shared scroll target: feedback feed + crisis log */}
      <div data-section="crisis-log">
        {playbook.feedbackEntries.length > 0 && (
          <div className="pt-4">
            <h2 className="font-display text-ease-lg text-ink mb-3">Recent from caregivers</h2>
            <div className="space-y-3">
              {visibleFeedback.map((f) => (
                <FeedbackCard
                  key={f.id}
                  entry={f}
                  onAdd={() => {
                    setActiveFeedback(f.id);
                    go("addToPlaybook");
                  }}
                />
              ))}
            </div>
            {playbook.feedbackEntries.length > 3 && (
              <button
                onClick={scrollToCrisisLog}
                className="w-full text-center text-ease-sm font-semibold text-primary mt-3"
              >
                See all in Insights →
              </button>
            )}
          </div>
        )}

        {/* Crisis Log calendar */}
        <CrisisLog entries={playbook.feedbackEntries} />
      </div>
    </div>
  );
};

const FeedbackCard = ({ entry, onAdd }: { entry: FeedbackEntry; onAdd: () => void }) => {
  const { dismissFeedback } = useEase();
  const [dismissing, setDismissing] = useState(false);
  const helpedLabel = entry.helped === "yes" ? "Tactics helped" : "Not fully";
  const helpedClass =
    entry.helped === "yes"
      ? "bg-green-500/15 text-green-600 dark:text-green-400"
      : "bg-amber-500/15 text-amber-600 dark:text-amber-400";

  const handleDismiss = () => {
    setDismissing(true);
    window.setTimeout(() => dismissFeedback(entry.id), 300);
  };

  return (
    <div
      data-entry-id={entry.id}
      className={`relative rounded-2xl border border-border bg-card p-4 pt-5 transition-opacity duration-300 ${
        dismissing ? "opacity-0" : "opacity-100"
      }`}
    >
      <img src={star} alt="" className="absolute top-3 left-3 w-4 h-4" />
      <div className="flex items-start justify-between pl-6 mb-2 gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={paulPhoto}
            alt={entry.caregiverName}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div className="text-ease-sm font-bold text-ink truncate">
            {entry.caregiverName} · {entry.caregiverRole}
          </div>
        </div>
        <div className="text-ease-xs text-muted-foreground shrink-0">{entry.dateLabel}</div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-ease-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold">
          {entry.duration}
        </span>
        <span className={`text-ease-xs px-2.5 py-1 rounded-full font-semibold ${helpedClass}`}>
          {helpedLabel}
        </span>
      </div>

      {entry.note && (
        <p className="text-ease-sm italic text-muted-foreground leading-snug mb-3">
          "{entry.note}"
        </p>
      )}

      <button
        onClick={onAdd}
        className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-full border border-primary text-primary text-ease-sm font-bold hover:bg-primary-tint/40 transition"
      >
        <img src={star} alt="" className="w-4 h-4" />
        Add to Playbook →
      </button>
      <button
        onClick={handleDismiss}
        className="block mx-auto mt-2 text-ease-xs text-muted-foreground hover:text-foreground"
      >
        Dismiss
      </button>
    </div>
  );
};

const AddBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="w-full mt-3 rounded-2xl border-2 border-dashed border-primary/40 p-4 flex items-center justify-center gap-2 text-primary hover:bg-primary-tint/40 transition"
  >
    <Plus size={18} />
    <span className="text-ease-sm font-semibold">{label}</span>
  </button>
);

const CrisisTab = () => {
  const { playbook, openEdit } = useEase();
  return (
    <div className="space-y-5">
      <div>
        <div className="text-ease-xs uppercase tracking-[0.14em] text-primary font-bold mb-2">
          What to do
        </div>
        <div className="space-y-3">
          {playbook.calming.map((c, i) => (
            <button
              key={i}
              onClick={() =>
                openEdit({ kind: "tactic", index: i, value: c, returnTo: "home", breadcrumb: "CRISIS PLAN · WHAT TO DO", returnTab: "crisis" })
              }
              className="w-full text-left rounded-2xl bg-card border border-border p-4 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white font-display text-ease-md flex items-center justify-center font-bold shrink-0">
                {i + 1}
              </div>
              <p className="text-ease-base text-ink leading-snug font-semibold pt-1.5 flex-1">
                {c}
                <Pencil size={14} className="inline-block ml-1.5 align-baseline text-muted-foreground" />
              </p>
            </button>
          ))}
        </div>
        <AddBtn
          onClick={() =>
            openEdit({ kind: "tactic", index: -1, value: "", returnTo: "home", breadcrumb: "CRISIS PLAN · WHAT TO DO", returnTab: "crisis" })
          }
          label="Add a tactic"
        />
      </div>

      <div>
        <div className="text-ease-xs uppercase tracking-[0.14em] text-primary font-bold mb-2">
          What NOT to Do
        </div>
        <div className="space-y-3">
          {playbook.avoid.map((a, i) => (
            <button
              key={i}
              onClick={() =>
                openEdit({ kind: "avoid", index: i, value: a, returnTo: "home", breadcrumb: "CRISIS PLAN · WHAT NOT TO DO", returnTab: "crisis" })
              }
              className="w-full text-left rounded-2xl bg-card border border-border p-4"
            >
              <p className="text-ease-base text-ink leading-snug font-semibold">
                {a}
                <Pencil size={14} className="inline-block ml-1.5 align-baseline text-muted-foreground" />
              </p>
            </button>
          ))}
        </div>
        <AddBtn
          onClick={() =>
            openEdit({ kind: "avoid", index: -1, value: "", returnTo: "home", breadcrumb: "CRISIS PLAN · WHAT NOT TO DO", returnTab: "crisis" })
          }
          label="Add a What NOT to Do"
        />
      </div>
    </div>
  );
};

const CareTab = () => {
  const { playbook, openEdit } = useEase();
  return (
    <div className="space-y-5">
      <div>
        <div className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold mb-2">
          Daily Medications
        </div>
        <div className="space-y-2">
          {playbook.medications.map((m, i) => (
            <CareCard
              key={i}
              text={m}
              onEdit={() =>
                openEdit({ kind: "med", index: i, value: m, returnTo: "home", breadcrumb: "CARE & MEDS · MEDICATION", returnTab: "care" })
              }
            />
          ))}
        </div>
        <AddBtn
          onClick={() =>
            openEdit({ kind: "med", index: -1, value: "", returnTo: "home", breadcrumb: "CARE & MEDS · MEDICATION", returnTab: "care" })
          }
          label="Add a medication"
        />
      </div>
      <div>
        <div className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold mb-2">
          Dietary Notes
        </div>
        <div className="space-y-2">
          {playbook.dietary.map((d, i) => (
            <CareCard
              key={i}
              text={d}
              onEdit={() =>
                openEdit({ kind: "dietary", index: i, value: d, returnTo: "home", breadcrumb: "CARE & MEDS · DIETARY", returnTab: "care" })
              }
            />
          ))}
        </div>
        <AddBtn
          onClick={() =>
            openEdit({ kind: "dietary", index: -1, value: "", returnTo: "home", breadcrumb: "CARE & MEDS · DIETARY", returnTab: "care" })
          }
          label="Add a dietary note"
        />
      </div>
    </div>
  );
};

const CareCard = ({ text, onEdit }: { text: string; onEdit: () => void }) => (
  <button
    onClick={onEdit}
    className="w-full text-left rounded-2xl border border-border bg-card p-4"
  >
    <div className="text-ease-base text-ink font-semibold leading-snug">
      {text}
      <Pencil size={14} className="inline-block ml-1.5 align-baseline text-muted-foreground" />
    </div>
  </button>
);

const EmergencyTab = () => {
  const { go, playbook } = useEase();
  return (
    <div className="space-y-3">
      {playbook.emergencyContacts.map((c, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4"
        >
          <div className="flex-1 min-w-0">
            <div className="text-ease-base text-ink font-semibold truncate">
              {c.name} · {c.relation} · {c.phone}
            </div>
          </div>
          <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
            <Phone size={18} />
          </button>
        </div>
      ))}

      <button
        onClick={() => go("addContact")}
        className="w-full rounded-2xl border-2 border-dashed border-primary/40 p-4 flex items-center justify-center gap-2 text-primary"
      >
        <Plus size={18} />
        <span className="text-ease-sm font-semibold">Add another emergency contact</span>
      </button>
    </div>
  );
};
