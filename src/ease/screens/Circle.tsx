import { Phone, MessageSquare } from "lucide-react";
import { Avatar, ParentBottomNav } from "../primitives";
import { useEase } from "../state";
import { paulPhoto } from "../assets";

type Member = {
  name: string;
  role: string;
  initials: string;
  last: string;
  tone: "blue" | "coral" | "neutral";
  photo?: string;
  isPaul?: boolean;
  phone: string;
};

const members: Member[] = [
  { name: "Paul Smith", role: "EA · School", initials: "P", last: "Viewed 2h ago", tone: "blue", photo: paulPhoto, isPaul: true, phone: "+16045550147" },
  { name: "Anna Oliveira", role: "Grandmother", initials: "A", last: "Viewed yesterday", tone: "coral", phone: "" },
  { name: "Dr. Marcus Lee", role: "Pediatrician", initials: "M", last: "Viewed 3d ago", tone: "coral", phone: "" },
];

export const Circle = () => {
  const { playbook, go, checkedInChildId } = useEase();

  const paulActive = checkedInChildId === "tyler";
  const sortedMembers = paulActive
    ? [...members].sort((a, b) => (a.isPaul ? -1 : b.isPaul ? 1 : 0))
    : members;

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-3 shrink-0">
        <h1 className="font-display text-ease-xl text-ink">{playbook.childName}'s Caregivers</h1>
        <p className="text-ease-sm text-muted-foreground mt-1">
          People with access to {playbook.childName}'s Playbook.
        </p>
      </div>

      <div className="px-6 mt-6 space-y-3 flex-1 overflow-y-auto phone-scroll pb-4">
        {sortedMembers.map((m) => {
          const isActive = m.isPaul && paulActive;
          return (
            <div
              key={m.name}
              className="p-4 rounded-2xl bg-card border border-[#7B5EA7]"
            >
              <div className="flex items-center gap-4">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <Avatar size={48} initials={m.initials} tone={m.tone} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ease-md text-ink flex items-center whitespace-nowrap">
                    {m.name}
                    {isActive && (
                      <span className="relative inline-flex w-2 h-2 ml-2 shrink-0">
                        <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
                      </span>
                    )}
                  </div>
                  <div className="text-ease-sm text-muted-foreground">{m.role}</div>
                </div>
                <div
                  className={`text-ease-xs shrink-0 ${
                    isActive
                      ? "font-semibold text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {/* TODO: replace static time with session start timestamp */}
                  {isActive ? `In session with ${playbook.childName} · started 2:14 PM` : m.last}
                </div>
              </div>

              {isActive && (
                <div className="mt-3 flex gap-2">
                  <a
                    href={`tel:${m.phone}`}
                    className="flex-1 h-11 rounded-full border border-primary text-primary text-ease-sm font-bold inline-flex items-center justify-center gap-1.5"
                  >
                    <Phone size={14} /> Call {m.name.split(" ")[0]}
                  </a>
                  <a
                    href={`sms:${m.phone}`}
                    className="flex-1 h-11 rounded-full border border-primary text-primary text-ease-sm font-bold inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare size={14} /> Message {m.name.split(" ")[0]}
                  </a>
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={() => go("inviteCaregiver")}
          className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#CCBFB8]"
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1.5px dashed #F3768D",
              background: "transparent",
              color: "#F3768D",
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            +
          </div>
          <span className="font-semibold text-ease-md" style={{ color: "#F3768D" }}>
            Add a caregiver
          </span>
        </button>
      </div>

      <ParentBottomNav active="circle" />
    </div>
  );
};
