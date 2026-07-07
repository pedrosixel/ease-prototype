import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Link2, Share2 } from "lucide-react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";

const PINK = "#F3768D";
const INVITE_URL = "https://ease-support-playbook.lovable.app/join/tyler-demo";

export const InviteCaregiver = () => {
  const { playbook, showToast } = useEase();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${playbook.childName}'s Care Circle`,
          text: `${playbook.parentName} has invited you to access ${playbook.childName}'s Ease Playbook — a secure guide to providing the best support.`,
          url: INVITE_URL,
        });
      } catch {
        // dismissed or cancelled
      }
    } else {
      await navigator.clipboard.writeText(INVITE_URL);
      setCopied(true);
      showToast("Link copied");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <TopBar back="circle" title="Invite a Caregiver" />

      <div className="flex-1 overflow-y-auto phone-scroll px-6 pb-8">
        <div className="mt-2 mb-6">
          <h1 className="font-display text-ease-xl text-ink">
            Add someone to {playbook.childName}'s Circle
          </h1>
          <p className="text-ease-sm text-muted-foreground mt-2">
            Share this link or QR code with a caregiver. They'll get secure access to{" "}
            {playbook.childName}'s Playbook.
          </p>
        </div>

        {/* QR code */}
        <div className="rounded-2xl border border-[#CCBFB8] bg-white flex flex-col items-center py-8 px-6 mb-4">
          <QRCodeSVG
            value={INVITE_URL}
            size={180}
            fgColor="#1A1A1A"
            bgColor="#FFFFFF"
            level="M"
          />
          <p
            className="text-ease-xs text-muted-foreground mt-4 text-center"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Point your camera at this code to open the invite
          </p>
        </div>

        {/* Invite link row */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#CCBFB8] bg-white p-4 mb-6">
          <div
            className="shrink-0 flex items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: "#FCE8ED" }}
          >
            <Link2 size={18} color={PINK} />
          </div>
          <p
            className="flex-1 truncate text-ease-xs"
            style={{ fontFamily: "'Nunito Sans', sans-serif", color: "#777777" }}
          >
            {INVITE_URL}
          </p>
        </div>

        {/* Share CTA */}
        <PrimaryBtn variant="coral" onClick={handleShare}>
          <Share2 size={18} style={{ marginRight: 8, flexShrink: 0 }} />
          {copied ? "Copied!" : "Share invite link"}
        </PrimaryBtn>

        {/* Security note */}
        <p
          className="text-ease-xs text-muted-foreground text-center mt-6 px-2"
          style={{ fontFamily: "'Nunito Sans', sans-serif", lineHeight: 1.6 }}
        >
          This link expires in 7 days. Only people with the link can access{" "}
          {playbook.childName}'s Playbook.
        </p>
      </div>
    </div>
  );
};
