import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import { TopBar, PrimaryBtn, Dots } from "../primitives";
import { useEase } from "../state";

export const CaregiverConnect = () => {
  const { go } = useEase();
  const [link, setLink] = useState("");

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
          They share it from their Circle. Paste it here and you're in.
        </p>

        <div className="mt-7">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Profile link
          </label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="ease.app/p/..."
            className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="flex-1" />

        <button
          onClick={() => go("caregiverList")}
          className="text-ease-sm text-muted-foreground underline mb-4 self-center"
        >
          I don't have a link yet — I'll add one later
        </button>
      </div>
      <div className="px-7 pb-8">
        <PrimaryBtn variant="blue" onClick={() => go("caregiverList")}>
          Connect
        </PrimaryBtn>
      </div>
    </div>
  );
};
