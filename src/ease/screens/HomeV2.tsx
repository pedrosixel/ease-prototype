import { useRef, useState } from "react";
import { Phone, Pencil, Settings, X } from "lucide-react";
import { useEase, FeedbackEntry } from "../state";
import { CHILD_PHOTOS, paulPhoto } from "../assets";
import { ParentBottomNav } from "../primitives";
import InsightStarBlue from "@/assets/Ease_InsightStar_Blue.svg";
import { CrisisLog } from "./CrisisLog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Tab = "profile" | "insights" | "emergency";

const CORAL = "#F3768D";
const CREAM = "#FEF2F1";
const DIVIDER = "#F0EBE8";
const TEXT = "#444444";
const MUTED = "#777777";
const INK = "#1A1A1A";
const BLUE = "#7B5EA7";

const sectionLabelCls = "text-[11px] uppercase font-semibold mb-3";
const sectionLabelStyle = { color: CORAL, letterSpacing: "1.5px" };

const profileSectionLabelCls = "uppercase font-bold mb-2";
const profileSectionLabelStyle = {
  color: CORAL,
  fontSize: 11,
  letterSpacing: "1.5px",
  fontWeight: 700 as const,
};

const formatPhone = (p: string) =>
  p.replace(/^(\+\d+)\s+(\d{3})\s+(\d{3})\s+(\d{4})$/, "$1 ($2) $3-$4");

const WaveCard = ({ children, topPad = 32 }: { children: React.ReactNode; topPad?: number }) => (
  <div
    style={{
      background: "#FFFFFF",
      borderRadius: "50% 50% 0 0 / 40px 40px 0 0",
      width: "100%",
      marginTop: 40,
      paddingTop: topPad,
      paddingBottom: 24,
      paddingLeft: 20,
      paddingRight: 20,
    }}
  >
    {children}
  </div>
);

export const HomeV2 = () => {
  const { go } = useEase();
  const [tab, setTab] = useState<Tab>("profile");

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "insights", label: "Insights" },
    { id: "emergency", label: "Emergency" },
  ];

  return (
    <div className="h-full flex flex-col" style={{ background: CREAM }}>
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
            Hey Mariana
          </div>
          <button
            onClick={() => go("settings")}
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              background: "#F0F0F0",
              borderRadius: "50%",
            }}
            aria-label="Settings"
          >
            <Settings size={16} color={TEXT} />
          </button>
        </div>

        {/* Tab pills */}
        <div className="flex" style={{ padding: "4px 20px 0", gap: 6 }}>
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="transition"
                style={{
                  flex: 1,
                  height: 34,
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  background: active ? CORAL : "rgba(0,0,0,0.06)",
                  color: active ? "#ffffff" : "#666666",
                  border: "none",
                  outline: "none",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "profile" && <ProfileTab />}
        {tab === "insights" && <InsightsTab />}
        {tab === "emergency" && <EmergencyTab />}
      </div>

      <ParentBottomNav active="home" />
    </div>
  );
};

type EditSection = "triggers" | "calming" | "avoid" | "careMeds";

const ProfileTab = () => {
  const { playbook, setPlaybook, activeChildId } = useEase();
  const [editMode, setEditMode] = useState(false);
  const [meetExpanded, setMeetExpanded] = useState(false);
  const [draft, setDraft] = useState({
    meet: playbook.meet,
    triggers: [...playbook.triggers],
    calming: [...playbook.calming],
    avoid: [...playbook.avoid],
    careMeds: [...playbook.medications],
  });
  const [confirmRemove, setConfirmRemove] = useState<
    { section: EditSection; index: number } | null
  >(null);
  const lastInputRef = useRef<HTMLInputElement | null>(null);
  const focusNextRef = useRef<{ section: EditSection; index: number } | null>(null);

  const startEdit = () => {
    setDraft({
      meet: playbook.meet,
      triggers: [...playbook.triggers],
      calming: [...playbook.calming],
      avoid: [...playbook.avoid],
      careMeds: [...playbook.medications],
    });
    setEditMode(true);
  };

  const commit = () => {
    setPlaybook({
      ...playbook,
      meet: draft.meet,
      triggers: draft.triggers.filter((s) => s.trim().length > 0),
      calming: draft.calming.filter((s) => s.trim().length > 0),
      avoid: draft.avoid.filter((s) => s.trim().length > 0),
      medications: draft.careMeds.filter((s) => s.trim().length > 0),
    });
    setEditMode(false);
  };

  const updateAt = (section: EditSection, index: number, value: string) => {
    setDraft((d) => {
      const next = [...d[section]];
      next[index] = value;
      return { ...d, [section]: next };
    });
  };

  const removeAt = (section: EditSection, index: number) => {
    setDraft((d) => {
      const next = [...d[section]];
      next.splice(index, 1);
      return { ...d, [section]: next };
    });
  };

  const addEmpty = (section: EditSection) => {
    setDraft((d) => {
      const next = [...d[section], ""];
      focusNextRef.current = { section, index: next.length - 1 };
      return { ...d, [section]: next };
    });
  };

  const bareInputCls =
    "w-full bg-transparent border-0 outline-none p-0 text-[15px]";
  const bareInputStyle = { color: TEXT };
  const bareRedInputStyle = { color: CORAL, fontWeight: 600 as const };

  const chipPad = { padding: "12px 14px" };
  // Non-edit base chip styles
  const triggerChipStyle = {
    background: CREAM,
    color: TEXT,
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    ...chipPad,
  } as const;
  const calmingChipReadStyle = {
    background: "#ffffff",
    color: TEXT,
    border: "1px solid #CCBFB8",
    borderRadius: 8,
    fontSize: 15,
    ...chipPad,
  } as const;
  const avoidChipReadStyle = {
    background: CREAM,
    color: CORAL,
    fontWeight: 600 as const,
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    ...chipPad,
  } as const;
  const careChipReadStyle = triggerChipStyle;

  // Edit-mode chip: cream bg, 1px solid #CCBFB8, room for X
  const editChipStyle = {
    background: CREAM,
    border: "1px solid #CCBFB8",
    borderRadius: 8,
    padding: "12px 36px 12px 14px",
    position: "relative" as const,
  };

  const renderEditCard = (
    section: EditSection,
    value: string,
    index: number,
    coral = false,
  ) => (
    <div key={index} style={editChipStyle}>
      <input
        ref={(el) => {
          if (
            focusNextRef.current &&
            focusNextRef.current.section === section &&
            focusNextRef.current.index === index &&
            el
          ) {
            el.focus();
            focusNextRef.current = null;
          }
          if (index === 0) lastInputRef.current = el;
        }}
        className={bareInputCls}
        style={coral ? bareRedInputStyle : bareInputStyle}
        value={value}
        placeholder="Type here…"
        onChange={(e) => updateAt(section, index, e.target.value)}
      />
      <button
        onClick={() => setConfirmRemove({ section, index })}
        aria-label="Remove"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          borderRadius: 12,
          background: "transparent",
          border: "none",
          color: MUTED,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );

  const addBtn = (section: EditSection) => (
    <button
      onClick={() => addEmpty(section)}
      style={{
        color: CORAL,
        fontSize: 14,
        fontWeight: 600,
        background: "transparent",
        border: "none",
        padding: "8px 0 0",
        alignSelf: "flex-start",
      }}
    >
      + Add
    </button>
  );

  return (
    <div className="flex flex-col" style={{ background: "transparent" }}>
      {/* Photo sits above the wave */}
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
            border: "5px solid #F3768D",
            objectFit: "cover",
            boxShadow: "0 0 0 4px #FEF2F1",
          }}
        />
      </div>

      {/* White card with elliptical wave top */}
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
        <div
          className="flex flex-col items-center"
          style={{ gap: 6, marginBottom: 16 }}
        >
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
              background: "#F3768D",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 12px",
              borderRadius: 20,
              marginBottom: 8,
            }}
          >
            {playbook.diagnosis}
          </div>
        </div>

        <div>
          <div className="flex justify-end" style={{ padding: 0 }}>
            <button
              onClick={editMode ? commit : startEdit}
              style={{
                color: CORAL,
                fontSize: 15,
                fontWeight: 600,
                background: "transparent",
                border: "none",
                marginTop: 20,
              }}
            >
              {editMode ? "Done" : "Edit Playbook"}
            </button>
          </div>

          <div className="flex flex-col" style={{ gap: 20 }}>
            <div>
              {editMode ? (
                <textarea
                  className="w-full bg-transparent border-0 outline-none p-0"
                  style={{
                    color: TEXT,
                    fontSize: 15,
                    lineHeight: 1.6,
                    resize: "none",
                  }}
                  rows={6}
                  value={draft.meet}
                  onChange={(e) => setDraft({ ...draft, meet: e.target.value })}
                />
              ) : (
                <>
                  <p
                    className={meetExpanded ? "" : "line-clamp-2"}
                    style={{ fontSize: 15, color: TEXT, lineHeight: 1.6 }}
                  >
                    {playbook.meet}
                  </p>
                  <button
                    onClick={() => setMeetExpanded((v) => !v)}
                    className="mt-1"
                    style={{ color: CORAL, fontSize: 14, fontWeight: 600 }}
                  >
                    {meetExpanded ? "Read less" : "Read more"}
                  </button>
                </>
              )}
            </div>

            <div style={{ marginTop: 20 }}>
              <ProfileSection label="KNOWN TRIGGERS">
                <div className="flex flex-col" style={{ gap: 8 }}>
                  {editMode
                    ? draft.triggers.map((t, i) => renderEditCard("triggers", t, i))
                    : playbook.triggers.map((t, i) => (
                        <div key={i} style={triggerChipStyle}>
                          {t}
                        </div>
                      ))}
                  {editMode && addBtn("triggers")}
                </div>
              </ProfileSection>
            </div>

            <ProfileDivider />

            <ProfileSection label="CALMING TACTICS">
              <div className="flex flex-col" style={{ gap: 8 }}>
                {editMode
                  ? draft.calming.map((t, i) => renderEditCard("calming", t, i))
                  : playbook.calming.map((t, i) => (
                      <div key={i} style={calmingChipReadStyle}>
                        {t}
                      </div>
                    ))}
                {editMode && addBtn("calming")}
              </div>
            </ProfileSection>

            <ProfileDivider />

            <ProfileSection label="WHAT NOT TO DO">
              <div className="flex flex-col" style={{ gap: 8 }}>
                {editMode
                  ? draft.avoid.map((t, i) => renderEditCard("avoid", t, i, true))
                  : playbook.avoid.map((t, i) => (
                      <div key={i} style={avoidChipReadStyle}>
                        {t}
                      </div>
                    ))}
                {editMode && addBtn("avoid")}
              </div>
            </ProfileSection>

            <ProfileDivider />

            <ProfileSection label="CARE & MEDS">
              <div className="flex flex-col" style={{ gap: 8 }}>
                {editMode ? (
                  <>
                    {draft.careMeds.map((t, i) => renderEditCard("careMeds", t, i))}
                    {addBtn("careMeds")}
                  </>
                ) : playbook.medications.length === 0 ? (
                  <div className="italic" style={{ fontSize: 15, color: MUTED }}>
                    Nothing added yet.
                  </div>
                ) : (
                  playbook.medications.map((t, i) => (
                    <div key={i} style={careChipReadStyle}>
                      {t}
                    </div>
                  ))
                )}
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>

      <AlertDialog
        open={confirmRemove !== null}
        onOpenChange={(open) => !open && setConfirmRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the entry from your playbook.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmRemove) {
                  removeAt(confirmRemove.section, confirmRemove.index);
                  setConfirmRemove(null);
                }
              }}
              className="bg-[#F3768D] text-white hover:bg-[#F3768D]/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const ProfileSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className={profileSectionLabelCls} style={profileSectionLabelStyle}>
      {label}
    </div>
    {children}
  </div>
);

const ProfileDivider = () => (
  <div style={{ height: 1, background: DIVIDER, margin: "8px 0" }} />
);

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className={sectionLabelCls} style={sectionLabelStyle}>
      {label}
    </div>
    {children}
  </div>
);

const Divider = () => <div style={{ height: 1, background: "#CCBFB8" }} />;

const InsightsTab = () => {
  const { playbook, go } = useEase();
  const visible = playbook.feedbackEntries.slice(0, 2);

  return (
    <div style={{ background: "transparent" }}>
      <WaveCard>
        <div className="pb-8" style={{ paddingTop: 28 }}>
          <Section label="RECENT FROM CAREGIVERS">
            <div className="space-y-3">
              {visible.map((f) => (
                <FeedbackCard key={f.id} entry={f} />
              ))}
            </div>
            {playbook.feedbackEntries.length > 2 && (
              <button
                onClick={() => go("insightsAll")}
                className="mt-3 text-[14px] font-semibold"
                style={{ color: CORAL }}
              >
                See all →
              </button>
            )}
          </Section>

          <Divider />

          <div className="pt-2">
            <CrisisLog entries={playbook.feedbackEntries} />
          </div>
        </div>
      </WaveCard>
    </div>
  );
};

const FeedbackCard = ({ entry }: { entry: FeedbackEntry }) => {
  const helpedYes = entry.helped === "yes";
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1px solid ${BLUE}`,
        borderRadius: 12,
        padding: 16,
      }}
    >
      {/* Row 1 */}
      <div className="flex items-center" style={{ gap: 10 }}>
        <img
          src={paulPhoto}
          alt={entry.caregiverName}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `2px solid ${BLUE}`,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: INK,
            whiteSpace: "nowrap",
          }}
        >
          {entry.caregiverName} · {entry.caregiverRole}
        </div>
        <img
          src={InsightStarBlue}
          alt=""
          style={{ width: 16, height: 16, flexShrink: 0 }}
        />
        <div style={{ marginLeft: "auto", fontSize: 12, color: MUTED, flexShrink: 0 }}>
          {entry.dateLabel}
        </div>
      </div>

      {/* Row 2: chips */}
      <div className="flex flex-wrap" style={{ gap: 8, marginTop: 12 }}>
        <span
          style={{
            background: "#EDE5F7",
            color: BLUE,
            borderRadius: 999,
            padding: "4px 12px",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {/* TODO: fix at data source level when Supabase is connected */}
          {entry.duration === "5-15 min" ? "Under 5 min" : entry.duration}
        </span>
        <span
          style={{
            background: helpedYes ? "#D4EDDA" : "#FFF3CD",
            color: helpedYes ? "#1D9E75" : "#856404",
            borderRadius: 999,
            padding: "4px 12px",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {helpedYes ? "Tactics Helped" : "Not Fully"}
        </span>
      </div>

      {/* Optional note + Read more */}
      {entry.note && (
        <>
          <p
            className="italic"
            style={{ fontSize: 14, color: TEXT, marginTop: 10, lineHeight: 1.5 }}
          >
            "{entry.note}"
          </p>
          <div className="flex justify-end" style={{ marginTop: 10 }}>
            <button
              style={{
                color: CORAL,
                fontSize: 13,
                fontWeight: 600,
                background: "transparent",
                border: "none",
              }}
            >
              Read more
            </button>
          </div>
        </>
      )}
    </div>
  );
};

type OtherContact = { role: string; name: string; phone: string };

const EmergencyTab = () => {
  const { playbook, setPlaybook } = useEase();
  const [others, setOthers] = useState<OtherContact[]>([
    { role: "THERAPIST", name: "", phone: "" },
    { role: "PEDIATRICIAN", name: "", phone: "" },
    { role: "HOSPITAL", name: "", phone: "" },
    { role: "EMERGENCY SERVICES", name: "Emergency Services", phone: "911" },
  ]);
  const [editingPrimary, setEditingPrimary] = useState<number | null>(null);
  const [editingOther, setEditingOther] = useState<number | null>(null);

  const savePrimary = (index: number, name: string, phone: string) => {
    const next = [...playbook.emergencyContacts];
    next[index] = { ...next[index], name, phone };
    setPlaybook({ ...playbook, emergencyContacts: next }, "emergency");
    setEditingPrimary(null);
  };

  const saveOther = (index: number, name: string, phone: string) => {
    setOthers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], name, phone };
      return next;
    });
    setEditingOther(null);
  };

  return (
    <div style={{ background: "transparent" }}>
      <WaveCard>
        <div className="pb-8" style={{ paddingTop: 28 }}>
          <Section label="EMERGENCY CONTACTS">
            <div className="space-y-3">
              {playbook.emergencyContacts.map((c, i) => {
                const suffix = c.relation === "Primary" ? "You" : c.relation;
                const isEditing = editingPrimary === i;
                if (isEditing) {
                  return (
                    <ContactEditor
                      key={i}
                      initialName={c.name}
                      initialPhone={c.phone}
                      onSave={(n, p) => savePrimary(i, n, p)}
                      onCancel={() => setEditingPrimary(null)}
                    />
                  );
                }
                return (
                  <FilledContactCard
                    key={i}
                    title={`${c.name} - ${suffix}`}
                    phone={c.phone}
                    onEdit={() => setEditingPrimary(i)}
                  />
                );
              })}
            </div>
          </Section>

          <div style={{ marginTop: 28 }}>
            <Section label="OTHER CONTACTS">
              <div className="space-y-3">
                {others.map((c, i) => {
                  const isEditing = editingOther === i;
                  const isEmpty = !c.name;
                  if (isEditing) {
                    return (
                      <ContactEditor
                        key={i}
                        roleLabel={c.role}
                        initialName={c.name}
                        initialPhone={c.phone}
                        onSave={(n, p) => saveOther(i, n, p)}
                        onCancel={() => setEditingOther(null)}
                      />
                    );
                  }
                  if (isEmpty) {
                    return (
                      <button
                        key={i}
                        onClick={() => setEditingOther(i)}
                        className="rounded-2xl flex items-center w-full text-left"
                        style={{
                          background: "#F7F7F7",
                          border: "1px solid #CCBFB8",
                          padding: 16,
                          gap: 12,
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-[12px] uppercase font-semibold"
                            style={{ color: MUTED, letterSpacing: "1.2px" }}
                          >
                            {c.role}
                          </div>
                          <div className="text-[15px] italic" style={{ color: "#AAAAAA" }}>
                            Not added yet
                          </div>
                        </div>
                        <div
                          className="flex items-center justify-center shrink-0"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "1.5px dashed #CCCCCC",
                            background: "transparent",
                            color: "#CCCCCC",
                            fontSize: 18,
                            lineHeight: 1,
                          }}
                        >
                          +
                        </div>
                      </button>
                    );
                  }
                  return (
                    <FilledContactCard
                      key={i}
                      roleLabel={c.role}
                      title={c.name}
                      phone={c.phone}
                      onEdit={() => setEditingOther(i)}
                    />
                  );
                })}
              </div>
            </Section>
          </div>
        </div>
      </WaveCard>
    </div>
  );
};

const FilledContactCard = ({
  title,
  phone,
  roleLabel,
  onEdit,
}: {
  title: string;
  phone: string;
  roleLabel?: string;
  onEdit: () => void;
}) => {
  const phoneDisplay = formatPhone(phone);
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  return (
    <div
      className="rounded-2xl bg-white p-4 flex items-center"
      style={{ border: "1px solid #CCBFB8", gap: 12 }}
    >
      <div className="flex-1 min-w-0">
        {roleLabel && (
          <div
            className="text-[12px] uppercase font-semibold mb-1"
            style={{ color: MUTED, letterSpacing: "1.2px" }}
          >
            {roleLabel}
          </div>
        )}
        <div className="text-[15px] font-semibold truncate" style={{ color: TEXT }}>
          {title}
        </div>
        {phone && (
          <a
            href={telHref}
            className="text-[14px] font-semibold"
            style={{ color: CORAL }}
          >
            {phoneDisplay}
          </a>
        )}
      </div>
      <div className="flex items-center shrink-0" style={{ gap: 8 }}>
        <a
          href={telHref}
          className="rounded-full flex items-center justify-center"
          style={{ background: CORAL, color: "#fff", width: 44, height: 44 }}
          aria-label="Call"
        >
          <Phone size={16} />
        </a>
        <button
          onClick={onEdit}
          className="rounded-full flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            padding: 6,
            background: "transparent",
            border: `1px solid ${CORAL}`,
            color: CORAL,
          }}
          aria-label="Edit contact"
        >
          <Pencil size={14} />
        </button>
      </div>
    </div>
  );
};

const ContactEditor = ({
  initialName,
  initialPhone,
  roleLabel,
  onSave,
  onCancel,
}: {
  initialName: string;
  initialPhone: string;
  roleLabel?: string;
  onSave: (name: string, phone: string) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  return (
    <div
      className="rounded-2xl bg-white p-4"
      style={{ border: "1px solid #CCBFB8" }}
    >
      {roleLabel && (
        <div
          className="text-[12px] uppercase font-semibold mb-2"
          style={{ color: MUTED, letterSpacing: "1.2px" }}
        >
          {roleLabel}
        </div>
      )}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full outline-none"
        style={{
          background: CREAM,
          border: "1px solid #CCBFB8",
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 15,
          color: TEXT,
          marginBottom: 8,
        }}
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full outline-none"
        style={{
          background: CREAM,
          border: "1px solid #CCBFB8",
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 15,
          color: TEXT,
        }}
      />
      <div className="flex items-center justify-end" style={{ gap: 12, marginTop: 12 }}>
        <button
          onClick={onCancel}
          style={{
            color: CORAL,
            fontSize: 14,
            fontWeight: 600,
            background: "transparent",
            border: "none",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(name.trim(), phone.trim())}
          style={{
            background: CORAL,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            height: 40,
            borderRadius: 12,
            padding: "0 18px",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
