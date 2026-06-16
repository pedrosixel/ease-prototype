import { AlertCircle, Heart, Ban } from "lucide-react";
import { TopBar, PrimaryBtn, Avatar } from "../primitives";
import { useEase } from "../state";
import { CHILD_PHOTOS } from "../assets";
import starBlue from "@/assets/Ease_Star_Purple.svg";

export const Bridge = () => {
  const { go, playbook, activeChildId } = useEase();
  return (
    <div className="h-full flex flex-col bg-background">
      <TopBar back="caregiverList" />
      <div className="px-7 mt-2 flex-1 overflow-y-auto phone-scroll">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-tint text-secondary text-[11px] uppercase tracking-[0.18em] font-bold">
          <img src={starBlue} alt="" className="w-4 h-4 mr-1.5" />
          Before you start
        </span>
        <div className="mt-5 flex items-center gap-4">
          <Avatar size={80} initials={playbook.childName[0]} tone="blue" src={CHILD_PHOTOS[activeChildId]} ring="#7B5EA7" />
          <h1 className="font-display text-ease-xl text-ink leading-tight">
            {playbook.childName}, Age {playbook.childAge}
            <div className="text-ease-sm text-muted-foreground font-sans font-normal mt-1">{playbook.diagnosis}</div>
          </h1>
        </div>

        <div className="mt-7 space-y-3">
          <Row
            icon={<AlertCircle size={18} className="text-secondary" />}
            label="Primary trigger"
            value={playbook.triggers[0] ?? "Not specified"}
          />
          <Row
            icon={<Heart size={18} className="text-secondary" />}
            label="Best tactic"
            value={playbook.calming[0] ?? "Not specified"}
          />
          <Row
            icon={<Ban size={18} className="text-secondary" />}
            label="Avoid"
            value={playbook.avoid[0] ?? "Not specified"}
          />
        </div>
      </div>

      <div className="px-7 pb-8 pt-4">
        <PrimaryBtn variant="blue" onClick={() => go("caregiverHome")}>
          I'm ready
        </PrimaryBtn>
      </div>
    </div>
  );
};

const Row = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-card border border-[#CCBFB8] border-l-[3px] border-l-secondary p-4 flex gap-3">
    <div className="w-9 h-9 rounded-full bg-secondary-tint flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-[11px] uppercase tracking-[0.18em] text-secondary font-bold">
        {label}
      </div>
      <div className="text-ease-base text-ink leading-snug font-semibold mt-1">{value}</div>
    </div>
  </div>
);
