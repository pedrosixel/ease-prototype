import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";

const TERMS_TEXT = `Effective date: January 1, 2026

Ease is committed to protecting the privacy of every family and caregiver who uses this platform. This agreement explains how we collect, use, and protect your personal information in compliance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation.

1. What information we collect
Ease collects information you voluntarily provide, including your name, email address, and the child profile data you enter into the Playbook. This includes behavioural information, known triggers, calming strategies, and emergency contacts relating to a child with autism spectrum disorder.

2. Sensitive information about children with autism
Ease recognises that information about a child's autism diagnosis, behavioural profile, and caregiving strategies is sensitive personal information. We treat this data with the highest level of care. This information is: stored with end-to-end encryption; never sold, rented, or shared with third parties for commercial purposes; only accessible to individuals you explicitly invite through the Circle sharing feature; and retained only for as long as your account remains active. You may request deletion of all data at any time by contacting privacy@ease.app.

3. How we use your information
We use your information solely to provide the Ease service — including building and sharing the Playbook, enabling Crisis View, and facilitating caregiver communication. We do not use your information to build advertising profiles or share it with data brokers.

4. Consent and control
Under PIPEDA, you have the right to access the personal information we hold about you, withdraw consent at any time, request corrections to inaccurate data, and request deletion of your account and all associated data. To exercise any of these rights, contact us at privacy@ease.app.

5. Caregiver access
When a parent shares a Playbook with a caregiver through the Circle feature, the caregiver receives read-only access to the child's profile. Caregivers may not download, copy, or redistribute this information. Access can be revoked by the parent at any time.

6. Data storage
All data is stored on servers located in Canada. Ease does not transfer personal information outside of Canada without your explicit consent.

7. Contact
For any privacy-related questions or requests, contact our Privacy Officer at privacy@ease.app.`;

export const Terms = () => {
  const { go, isNewUser } = useEase();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Enable checkbox if content fits without scrolling
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight + 10) setReachedBottom(true);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) setReachedBottom(true);
  };

  const handleContinue = () => {
    if (!agreed) return;
    if (typeof window !== "undefined") localStorage.setItem("ease.termsAccepted", "1");
    go(isNewUser ? "role" : "homeV2");
  };

  return (
    <div className="h-full flex flex-col ">
      <TopBar back="signup" />
      <div className="px-7 pt-2 shrink-0">
        <h1 className="font-display text-ease-2xl text-ink leading-tight">Privacy & Terms</h1>
        <p className="mt-1 text-ease-sm text-muted-foreground">Please read and accept to continue.</p>
      </div>

      <div className="px-7 mt-4 flex-1 flex flex-col min-h-0">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto rounded-2xl border border-border bg-muted/40 p-4 text-ease-sm text-foreground leading-relaxed whitespace-pre-line"
        >
          {TERMS_TEXT}
        </div>

        <button
          onClick={() => reachedBottom && setAgreed((v) => !v)}
          disabled={!reachedBottom}
          className={`mt-4 flex items-center gap-3 text-left ${
            reachedBottom ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition ${
              agreed ? "bg-primary border-primary" : "bg-card border-border"
            }`}
          >
            {agreed && <Check size={14} className="text-white" strokeWidth={3} />}
          </span>
          <span className="text-ease-sm text-foreground">
            I have read and agree to the Privacy & Terms
          </span>
        </button>

        {!reachedBottom && (
          <p className="mt-2 text-ease-xs text-muted-foreground italic">
            Scroll to the bottom to enable
          </p>
        )}
      </div>

      <div className="px-7 pb-8 pt-4">
        <div className={agreed ? "opacity-100" : "opacity-50 pointer-events-none"}>
          <PrimaryBtn onClick={handleContinue}>Continue</PrimaryBtn>
        </div>
      </div>
    </div>
  );
};
