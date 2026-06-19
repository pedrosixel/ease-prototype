import { useState } from "react";
import { Info } from "lucide-react";
import { CaregiverBottomNav, PrimaryBtn, CaregiverTopBarGear } from "../primitives";
import { useEase } from "../state";
import { CHILD_PHOTOS } from "../assets";
import pipSad from "@/assets/Pip_Sad.svg";

const PURPLE = "#7B5EA7";
const PURPLE_TINT = "#EDE5F7";
const PINK = "#F3768D";
const PINK_TINT = "#FCE8ED";
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
  const [levelInfoOpen, setLevelInfoOpen] = useState(false);

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
    <div className="h-full flex flex-col" style={{ background: PURPLE_TINT }}>
      <div className="flex-1 overflow-y-auto phone-scroll" style={{ background: "transparent" }}>
        {/* Greeting row */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "56px 20px 0", marginBottom: 12 }}
        >
          <div
            className="font-display"
            style={{ fontSize: 20, color: INK, fontWeight: 500 }}
          >
            Hey Paul
          </div>
          <CaregiverTopBarGear />
        </div>

        {/* Photo above the wave */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: 3,
            marginBottom: -60,
            paddingTop: 16,
          }}
        >
          <img
            src={CHILD_PHOTOS[activeChildId]}
            alt={playbook.childName}
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              border: "5px solid #7B5EA7",
              objectFit: "cover",
              boxShadow: "0 0 0 4px #EDE5F7",
            }}
          />
        </div>

        {/* White wave card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "50% 50% 0 0 / 40px 40px 0 0",
            width: "100%",
            paddingTop: 72,
            paddingBottom: 24,
            paddingLeft: 20,
            paddingRight: 20,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Name + age + badge */}
          <div className="relative flex flex-col items-center" style={{ gap: 6, marginBottom: 16 }}>
            <div
              className="font-display"
              style={{ fontSize: 22, color: INK, fontWeight: 700, lineHeight: 1.1 }}
            >
              {playbook.childName}
            </div>
            <div style={{ fontSize: 12, color: MUTED }}>
              {playbook.childAge} years old · Vancouver, BC
            </div>
            <div className="flex items-center gap-1.5" style={{ marginBottom: 8 }}>
              <div
                style={{
                  background: PURPLE,
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 12px",
                  borderRadius: 20,
                }}
              >
                {playbook.diagnosis}
              </div>
              <button
                onClick={() => setLevelInfoOpen(true)}
                className="w-[44px] h-[44px] flex items-center justify-center"
                aria-label="What do the autism levels mean?"
              >
                <Info size={14} color="#7B5EA7" />
              </button>
            </div>
            {levelInfoOpen && (
              <>
                <div
                  onClick={() => setLevelInfoOpen(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 40 }}
                />
                <div
                  className="animate-in fade-in zoom-in-95 duration-[180ms]"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    marginTop: 4,
                    transformOrigin: "top center",
                    background: "#FFFFFF",
                    border: "1px solid #CCBFB8",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#444444", marginBottom: 10 }}>
                    What does this mean?
                  </div>
                  {[
                    { label: "Level 1 — Needs support", desc: "Often has strong communication skills, but social situations and unexpected changes can be challenging." },
                    { label: "Level 2 — Needs substantial support", desc: "Social communication is more affected. Behaviors may be more noticeable in daily settings." },
                    { label: "Level 3 — Needs very substantial support", desc: "Communication is significantly impacted. Intensive daily support is essential." },
                  ].map((d, i) => (
                    <div key={i} style={{ marginTop: i > 0 ? 10 : 0 }}>
                      <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#7B5EA7" }}>{d.label}</div>
                      <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 400, color: "#777777", marginTop: 2 }}>{d.desc}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

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
                      background: "#FFFFFF",
                      color: TEXT,
                      border: "1px solid #CCBFB8",
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
                      background: "#FFFFFF",
                      color: TEXT,
                      border: "1px solid #CCBFB8",
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

            <Section label="WHAT TO AVOID">
              <div className="flex flex-col" style={{ gap: 4 }}>
                {playbook.avoid.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#FFFFFF",
                      color: PINK,
                      fontWeight: 600,
                      border: "1px solid #CCBFB8",
                      borderLeft: "3px solid #F3768D",
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
              {playbook.medications.length === 0 && playbook.dietary.length === 0 ? (
                <div className="italic" style={{ fontSize: 15, color: MUTED }}>
                  Nothing added yet.
                </div>
              ) : (
                <div className="flex flex-col" style={{ gap: 8 }}>
                  {playbook.medications.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#FFFFFF",
                        color: TEXT,
                        border: "1px solid #CCBFB8",
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 15,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                  {playbook.dietary.length > 0 && (
                    <>
                      <div className="uppercase mt-2" style={sectionLabelStyle}>
                        Dietary
                      </div>
                      {playbook.dietary.map((d, i) => (
                        <span
                          key={i}
                          style={{
                            background: "#FFFFFF",
                            color: TEXT,
                            border: "1px solid #CCBFB8",
                            borderRadius: 8,
                            padding: "8px 12px",
                            fontSize: 15,
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              )}
            </Section>

            <Divider />

            <Section label="FAVOURITE TOY">
              {playbook.favouriteToy ? (
                <span
                  style={{
                    background: "#FFFFFF",
                    color: TEXT,
                    border: "1px solid #CCBFB8",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 15,
                    display: "inline-block",
                  }}
                >
                  {playbook.favouriteToy}
                </span>
              ) : (
                <div className="italic" style={{ fontSize: 15, color: MUTED }}>
                  Not added yet.
                </div>
              )}
            </Section>

            <Divider />

            <Section label="COMFORT SONG">
              {playbook.comfortSong ? (
                <span
                  style={{
                    background: "#FFFFFF",
                    color: TEXT,
                    border: "1px solid #CCBFB8",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 15,
                    display: "inline-block",
                  }}
                >
                  {playbook.comfortSong}
                </span>
              ) : (
                <div className="italic" style={{ fontSize: 15, color: MUTED }}>
                  Not added yet.
                </div>
              )}
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
