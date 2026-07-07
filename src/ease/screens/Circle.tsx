import { useState } from "react";
import { Phone, MessageSquare, X, Copy, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Avatar, ParentBottomNav } from "../primitives";
import { useEase } from "../state";
import { paulPhoto } from "../assets";

const INVITE_URL = "https://ease.app/join/TYL-8472";
const INVITE_DISPLAY = "ease.app/join/TYL-8472";

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
  const { playbook, showToast, checkedInChildId } = useEase();
  const [showInvite, setShowInvite] = useState(false);

  const paulActive = checkedInChildId === "tyler";
  const sortedMembers = paulActive
    ? [...members].sort((a, b) => (a.isPaul ? -1 : b.isPaul ? 1 : 0))
    : members;

  const copyLink = async () => {
    await navigator.clipboard.writeText(INVITE_URL);
    showToast("Link copied");
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${playbook.childName}'s Care Circle`,
          text: `You've been invited to access ${playbook.childName}'s Ease Playbook.`,
          url: INVITE_URL,
        });
      } catch {
        // dismissed or cancelled
      }
    } else {
      await navigator.clipboard.writeText(INVITE_URL);
      showToast("Link copied");
    }
  };

  return (
    <div className="relative h-full flex flex-col">
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
          onClick={() => setShowInvite(true)}
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

      {showInvite && (
        <>
          {/* Layer A — Backdrop */}
          <div
            className="absolute inset-0 z-40 animate-in fade-in duration-[200ms]"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowInvite(false)}
          />

          {/* Layer B — Card */}
          <div
            className="absolute z-50 animate-in fade-in zoom-in-95 duration-[200ms]"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "calc(100% - 48px)",
              maxWidth: 360,
              background: "#FFFFFF",
              borderRadius: 24,
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* A — Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#444444",
                }}
              >
                Invite to {playbook.childName}'s Playbook
              </span>
              <button
                onClick={() => setShowInvite(false)}
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

            {/* B — Subtext */}
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 13,
                color: "#777777",
                marginTop: 4,
              }}
            >
              Share this QR code or link with a caregiver.
            </p>

            {/* C — QR Code */}
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  border: "1px solid #CCBFB8",
                  borderRadius: 12,
                  padding: 16,
                  display: "inline-flex",
                }}
              >
                <QRCodeSVG
                  value={INVITE_URL}
                  size={180}
                  fgColor="#1A1A1A"
                  bgColor="#FFFFFF"
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>

            {/* D — Link row */}
            <p
              style={{
                marginTop: 16,
                background: "#F9F9F9",
                border: "1px solid #CCBFB8",
                borderRadius: 8,
                padding: "10px 14px",
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 13,
                color: "#444444",
              }}
            >
              {INVITE_DISPLAY}
            </p>

            {/* E — Two buttons */}
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button
                onClick={copyLink}
                style={{
                  flex: 1,
                  background: "white",
                  border: "1px solid #CCBFB8",
                  borderRadius: 12,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#444444",
                  cursor: "pointer",
                }}
              >
                <Copy size={16} />
                Copy Link
              </button>
              <button
                onClick={shareLink}
                style={{
                  flex: 1,
                  background: "#F3768D",
                  border: "none",
                  borderRadius: 12,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Share2 size={16} />
                Share
              </button>
            </div>

            {/* F — Bottom note */}
            <p
              style={{
                marginTop: 12,
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 11,
                color: "#777777",
                textAlign: "center",
              }}
            >
              Only people with this link can view {playbook.childName}'s Playbook.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
