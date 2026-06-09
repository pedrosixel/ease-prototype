import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FeedbackEntry } from "../state";
import star from "@/assets/Ease_heart_Pink.svg";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const formatTime = (ts: number) => {
  const d = new Date(ts);
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
};

const helpedClassFor = (helped: FeedbackEntry["helped"]) =>
  helped === "yes"
    ? "bg-green-500/15 text-green-600 dark:text-green-400"
    : helped === "no"
    ? "bg-red-500/15 text-red-600 dark:text-red-400"
    : "bg-amber-500/15 text-amber-600 dark:text-amber-400";

const helpedLabelFor = (helped: FeedbackEntry["helped"]) =>
  helped === "yes" ? "Tactics helped" : helped === "no" ? "Did not help" : "Not fully";

export const CrisisLog = ({ entries }: { entries: FeedbackEntry[] }) => {
  // Default seed view to April 2026 since that's where data lives
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(3); // April = 3 (0-indexed)
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const entriesByDay = useMemo(() => {
    const map: Record<string, FeedbackEntry[]> = {};
    entries.forEach((e) => {
      if (!e.timestamp) return;
      const k = dayKey(new Date(e.timestamp));
      if (!map[k]) map[k] = [];
      map[k].push(e);
    });
    return map;
  }, [entries]);

  const monthHasEntries = useMemo(() => {
    return Object.keys(entriesByDay).some((k) => {
      const [y, m] = k.split("-").map(Number);
      return y === viewYear && m === viewMonth + 1;
    });
  }, [entriesByDay, viewYear, viewMonth]);

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    // Mon-first offset: Sun=0 → 6, Mon=1 → 0
    const offset = (first.getDay() + 6) % 7;
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
    const arr: { date: Date; inMonth: boolean }[] = [];
    for (let i = offset - 1; i >= 0; i--) {
      arr.push({
        date: new Date(viewYear, viewMonth - 1, prevMonthDays - i),
        inMonth: false,
      });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push({ date: new Date(viewYear, viewMonth, d), inMonth: true });
    }
    while (arr.length % 7 !== 0) {
      const last = arr[arr.length - 1].date;
      arr.push({
        date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
        inMonth: false,
      });
    }
    return arr;
  }, [viewYear, viewMonth]);

  const today = new Date();
  const todayKey = dayKey(today);

  const goPrev = () => {
    setSelectedDay(null);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goNext = () => {
    setSelectedDay(null);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const selectedEntries = selectedDay ? entriesByDay[selectedDay] ?? [] : [];

  const scrollToFeedEntry = (id: string) => {
    const el = document.querySelector(`[data-entry-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-4">
      <h2 className="font-display text-ease-lg text-ink mb-3">Crisis Log</h2>
      <div className="rounded-2xl border border-border bg-card p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={goPrev}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="font-display text-ease-md text-ink">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </div>
          <button
            onClick={goNext}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day-of-week */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DOW.map((d) => (
            <div
              key={d}
              className="text-ease-xs uppercase text-muted-foreground text-center font-semibold tracking-[0.08em]"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((c, i) => {
            const k = dayKey(c.date);
            const has = c.inMonth && entriesByDay[k]?.length > 0;
            const isToday = k === todayKey;
            const isSelected = selectedDay === k;
            return (
              <button
                key={i}
                onClick={() => {
                  if (!c.inMonth || !has) return;
                  setSelectedDay(isSelected ? null : k);
                }}
                disabled={!c.inMonth || !has}
                className="relative aspect-square flex items-center justify-center text-ease-sm"
              >
                <span
                  className={`relative z-10 w-7 h-7 flex items-center justify-center rounded-full ${
                    isToday
                      ? "bg-primary text-primary-foreground font-bold"
                      : isSelected
                      ? "bg-primary-tint text-foreground font-semibold"
                      : c.inMonth
                      ? "text-foreground"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {c.date.getDate()}
                </span>
                {has && !isToday && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {!monthHasEntries && (
          <p className="text-center italic text-muted-foreground text-ease-sm py-6">
            No crises logged this month.
          </p>
        )}

        {/* Detail expansion */}
        <div
          style={{ maxHeight: selectedDay && selectedEntries.length > 0 ? 800 : 0 }}
          className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
        >
          <div className="mt-3 pt-3 border-t border-border space-y-3">
            {selectedEntries.map((e) => (
              <div key={e.id} className="space-y-1.5">
                <div className="text-ease-xs text-muted-foreground">
                  {formatTime(e.timestamp)}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-ease-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold">
                    {e.duration}
                  </span>
                  <span
                    className={`text-ease-xs px-2.5 py-1 rounded-full font-semibold ${helpedClassFor(
                      e.helped,
                    )}`}
                  >
                    {helpedLabelFor(e.helped)}
                  </span>
                </div>
                <div className="text-ease-xs text-muted-foreground">
                  Trigger identified: {e.context ?? "—"}
                </div>
                {e.note && (
                  <div className="text-ease-sm text-muted-foreground italic flex items-start gap-1.5">
                    <img src={star} alt="" className="w-3.5 h-3.5 mt-1 shrink-0" />
                    <span>
                      <span className="not-italic font-semibold text-ink">
                        {e.caregiverName.split(" ")[0]}:
                      </span>{" "}
                      "{e.note}"
                    </span>
                  </div>
                )}
                {e.note && (
                  <button
                    onClick={() => scrollToFeedEntry(e.id)}
                    className="text-ease-xs text-muted-foreground underline"
                  >
                    View full note →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
