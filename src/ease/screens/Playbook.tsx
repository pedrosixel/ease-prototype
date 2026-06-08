import { useState } from "react";
import { Pencil } from "lucide-react";
import { TopBar, Avatar, ScrollFade, ScrollHint } from "../primitives";
import { useEase, relativeTime } from "../state";
import { CHILD_PHOTOS } from "../assets";

const Section = ({
  label,
  updatedAt,
  children,
  tone = "default",
}: {
  label: string;
  updatedAt?: number;
  children: React.ReactNode;
  tone?: "default" | "coral";
}) => (
  <div className="px-6 py-5 border-b border-border">
    <div
      className={`text-ease-xs uppercase tracking-[0.14em] font-bold mb-3 ${
        tone === "coral" ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {label}
    </div>
    <div className="inline-flex items-start gap-1.5 w-full">
      <div className="flex-1">{children}</div>
      <Pencil size={14} className="text-muted-foreground shrink-0 mt-1" />
    </div>
    {updatedAt !== undefined && (
      <div className="mt-2 text-ease-xs text-muted-foreground">
        {relativeTime(updatedAt)}
      </div>
    )}
  </div>
);

export const PlaybookView = () => {
  const { playbook, activeChildId } = useEase();
  const [scrolled, setScrolled] = useState(false);
  return (
    <div className="h-full flex flex-col">
      <TopBar back="homeV2" title={`${playbook.childName}'s Playbook`} />
      <div className="relative flex-1 overflow-hidden">
        <div
          className="h-full overflow-y-auto pb-10"
          onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 20)}
        >
        <div className="px-6 pt-2 pb-6 flex items-center gap-4">
          <Avatar size={104} initials={playbook.childName[0]} tone="coral" src={CHILD_PHOTOS[activeChildId]} />
          <div>
            <h1 className="font-display text-ease-xl text-ink">{playbook.childName}</h1>
            <div className="text-ease-sm text-muted-foreground">
              Age {playbook.childAge} · {playbook.diagnosis}
            </div>
          </div>
        </div>

        <Section label={`Meet ${playbook.childName}`} updatedAt={playbook.updatedAt.meet}>
          <p className="text-ease-base text-foreground leading-relaxed">{playbook.meet}</p>
        </Section>

        <Section label="Known triggers" updatedAt={playbook.updatedAt.triggers}>
          <div className="flex flex-wrap gap-2">
            {playbook.triggers.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </Section>

        <Section label="What helps" updatedAt={playbook.updatedAt.calming}>
          <ul className="space-y-3">
            {playbook.calming.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-primary-tint text-primary text-ease-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-ease-base text-foreground leading-snug">{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Never" tone="coral" updatedAt={playbook.updatedAt.avoid}>
          <div className="flex flex-wrap gap-2">
            {playbook.avoid.map((a) => (
              <span key={a} className="chip chip-parent">{a}</span>
            ))}
          </div>
        </Section>

        {playbook.emergencyContacts.length > 0 && (
          <Section label="Emergency contact" updatedAt={playbook.updatedAt.emergency}>
            <div className="space-y-1">
              {playbook.emergencyContacts.map((c, i) => (
                <div key={i} className="text-ease-base text-foreground">
                  <span className="font-semibold text-ink">{c.name}</span>
                  <span className="text-muted-foreground"> · {c.phone}</span>
                </div>
              ))}
            </div>
          </Section>
        )}
        </div>
        <ScrollFade tone="parent" />
        <ScrollHint visible={!scrolled} tone="parent" />
      </div>
    </div>
  );
};
