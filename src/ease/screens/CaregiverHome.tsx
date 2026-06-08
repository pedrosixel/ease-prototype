import { CaregiverBottomNav, PrimaryBtn, CaregiverTopBarGear } from "../primitives";
import { useEase } from "../state";
import { CHILD_PHOTOS } from "../assets";
import pipSad from "@/assets/Pip_Sad.svg";

const PURPLE = "#7B5EA7";
const PURPLE_TINT = "#EDE5F7";
const PINK = "#7B5EA7";
const PINK_TINT = "#EDE5F7";
const INK = "#1A1A1A";
const TEXT = "#444444";
const MUTED = "#777777";
const DIVIDER = "#F0EBE8";

const sectionLabelStyle = {
  color: PURPLE,
  fontSize: 11,
  letterSpacing: "1.5px",
  fontWeight: 700 as const,
};

export const CaregiverHome = () => {
  const { go, playbook, activeChildId, checkedInChildId } = useEase();

  if (!checkedInChildId) {
    return (
      <div className="h-full flex flex-col" style={{ background: "#FFFFFF" }}>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <img src={pipSad} alt="Pip" width={160} height={160} />
          <h1 className="font-display" style={{ fontSize: 18, color: "#1A1A1A", fontWeight: 600, marginTop: 20, textAlign: "center" }}>
            No child selected yet.
          </h1>
          <p style={{ fontSize: 14, color: "#777777", marginTop: 8, padding: "0 32px", textAlign: "center" }}>
            Check in with a child from My List to see their Playbook.
          </p>
          <div style={{ marginTop: 24, width: "100%", maxWidth: 280 }}>
            <PrimaryBtn variant="blue" onClick={() => go("caregiverList")}>
              Go to My List
            </PrimaryBtn>
          </div>
        </div>
        <CaregiverBottomNav active="caregiverHome" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ background: "#FFFFFF" }}>
      <div className="flex-1 overflow-y-auto phone-scroll">
        {/* Greeting row */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "14px 20px 0", marginBottom: 12 }}
        >
          <div
            className="font-display"
            style={{ fontSize: 20, color: INK, fontWeight: 500 }}
          >
            Hey Paul
          </div>
          <CaregiverTopBarGear />

        </div>

        {/* Centered child block */}
        <div
          className="flex flex-col items-center"
          style={{ padding: "20px", gap: 6, marginTop: 8 }}
        >
          <img
            src={CHILD_PHOTOS[activeChildId]}
            alt={playbook.childName}
            className="object-cover"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "3px solid #7B5EA7",
            }}
          />
          <div
            className="font-display"
            style={{ fontSize: 22, color: INK, fontWeight: 700, lineHeight: 1.1 }}
          >
            {playbook.childName}
          </div>
          <div style={{ fontSize: 12, color: MUTED }}>
            {playbook.childAge} years old · Vancouver, BC
          </div>
          <div
            style={{
              background: "#7B5EA7",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 12px",
              borderRadius: 20,
            }}
          >
            {playbook.diagnosis}
          </div>
        </div>

        {/* White card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px 20px 0 0",
            padding: 16,
            border: "1px solid #CCBFB8",
          }}
        >
          <div className="flex flex-col" style={{ gap: 20 }}>
            <div>
              <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.6 }}>
                {playbook.meet}
              </p>
            </div>

            <Divider />

            <Section label="KNOWN TRIGGERS">
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {playbook.triggers.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      background: PURPLE_TINT,
                      color: PURPLE,
                      border: "1px solid #7B5EA7",
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontSize: 15,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            <Divider />

            <Section label="CALMING TACTICS">
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {playbook.calming.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      background: PURPLE_TINT,
                      color: PURPLE,
                      border: "1px solid #7B5EA7",
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontSize: 15,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Section>


            <Divider />

            <Section label="WHAT NOT TO DO">
              <div className="flex flex-col" style={{ gap: 4 }}>
                {playbook.avoid.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      background: PINK_TINT,
                      color: PINK,
                      fontWeight: 600,
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontSize: 15,
                    }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </Section>

            <Divider />

            <Section label="CARE & MEDS">
              <div className="italic" style={{ fontSize: 15, color: MUTED }}>
                Nothing added yet.
              </div>
            </Section>
          </div>
        </div>
      </div>

      <CaregiverBottomNav active="caregiverHome" />
    </div>
  );
};

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="uppercase mb-2" style={sectionLabelStyle}>
      {label}
    </div>
    {children}
  </div>
);

const Divider = () => (
  <div style={{ height: 1, background: DIVIDER, margin: "8px 0" }} />
);
