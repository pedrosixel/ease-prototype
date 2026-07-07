import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";

export type ScreenId =
  | "welcome"
  | "role"
  | "childInfo"
  | "meet"
  | "triggers"
  | "calming"
  | "avoid"
  | "emergency"
  | "complete"
  | "home"
  | "playbook"
  | "circle"
  | "crisis"
  | "postCrisis"
  | "caregiverBio"
  | "caregiverConnect"
  | "caregiverList"
  | "caregiverWelcome"
  | "caregiverSettings"
  | "bridge"
  | "caregiverHome"
  | "editField"
  | "addContact"
  | "settings"
  | "signup"
  | "login"
  | "terms"
  | "addToPlaybook"
  | "playbookIntro"
  | "homeV2"
  | "insightsAll"
  | "inviteCaregiver";

export const SCREENS: { id: ScreenId; label: string; flow: string }[] = [
  // Onboarding (numbered 1–13 in flow order)
  { id: "welcome", label: "1 · Welcome", flow: "Onboarding" },
  { id: "signup", label: "2 · Sign Up", flow: "Onboarding" },
  { id: "login", label: "3 · Log In", flow: "Onboarding" },
  { id: "terms", label: "4 · Privacy & Terms", flow: "Onboarding" },
  { id: "role", label: "5 · Role Selection", flow: "Onboarding" },
  { id: "playbookIntro", label: "6 · Playbook Intro", flow: "Onboarding" },
  { id: "childInfo", label: "7 · Child Info", flow: "Onboarding" },
  { id: "meet", label: "8 · Meet This Child", flow: "Onboarding" },
  { id: "triggers", label: "9 · Known Triggers", flow: "Onboarding" },
  { id: "calming", label: "10 · Calming Strategies", flow: "Onboarding" },
  { id: "avoid", label: "11 · What to Avoid", flow: "Onboarding" },
  { id: "emergency", label: "12 · Emergency Contact", flow: "Onboarding" },
  { id: "complete", label: "13 · Onboarding Complete", flow: "Onboarding" },
  // Parent
  { id: "homeV2", label: "Home Screen", flow: "Parent" },
  { id: "circle", label: "Caregivers", flow: "Parent" },
  { id: "settings", label: "Settings", flow: "Parent" },
  { id: "insightsAll", label: "All Insights", flow: "Parent" },
  { id: "editField", label: "Edit Field", flow: "Parent" },
  { id: "addContact", label: "Add Contact", flow: "Parent" },
  { id: "addToPlaybook", label: "Add to Playbook", flow: "Parent" },
  { id: "inviteCaregiver", label: "Invite Caregiver", flow: "Parent" },
  // Crisis
  { id: "crisis", label: "Crisis View", flow: "Crisis" },
  { id: "postCrisis", label: "Post-Crisis", flow: "Crisis" },
  // Caregiver
  { id: "caregiverWelcome", label: "Caregiver Welcome", flow: "Caregiver" },
  { id: "caregiverList", label: "My List", flow: "Caregiver" },
  { id: "caregiverBio", label: "Caregiver Bio", flow: "Caregiver" },
  { id: "bridge", label: "Pre-Session Bridge", flow: "Caregiver" },
  { id: "caregiverHome", label: "Caregiver Home", flow: "Caregiver" },
  { id: "caregiverSettings", label: "Caregiver Settings", flow: "Caregiver" },
  { id: "caregiverConnect", label: "Connect to Profile", flow: "Caregiver" },
  // Outdated
  { id: "home", label: "Home Screen (Outdated)", flow: "Outdated Screens" },
  { id: "playbook", label: "Playbook (Outdated)", flow: "Outdated Screens" },
];

// Screen depth ranking for slide direction
const SCREEN_DEPTH: Record<ScreenId, number> = {
  welcome: 0,
  signup: 1,
  login: 1,
  terms: 2,
  role: 3,
  playbookIntro: 4,
  childInfo: 5,
  meet: 6,
  triggers: 7,
  calming: 8,
  avoid: 9,
  emergency: 10,
  complete: 10,
  home: 10,
  playbook: 11,
  circle: 11,
  editField: 12,
  addContact: 12,
  addToPlaybook: 12,
  settings: 11,
  crisis: 20,
  postCrisis: 21,
  caregiverBio: 5,
  caregiverConnect: 6,
  caregiverHome: 13,
  caregiverList: 11,
  caregiverWelcome: 10,
  caregiverSettings: 14,
  bridge: 12,
  homeV2: 11,
  insightsAll: 12,
  inviteCaregiver: 12,
};

export type EmergencyContact = { name: string; phone: string; relation: string };

export type ChildId = "tyler" | "heitor";

export type SectionKey =
  | "meet"
  | "triggers"
  | "calming"
  | "avoid"
  | "emergency"
  | "favouriteToy"
  | "comfortSong";

export type FeedbackEntry = {
  id: string;
  caregiverName: string;
  caregiverRole: string;
  dateLabel: string;
  duration: string;
  helped: "yes" | "not_fully" | "no";
  note?: string;
  timestamp: number;
  context?: "Yes" | "No" | "Not Sure";
};

export type ChildPlaybook = {
  id: ChildId;
  childName: string;
  childAge: number;
  diagnosis: string;
  parentName: string;
  meet: string;
  triggers: string[];
  calming: string[];
  avoid: string[];
  emergencyContacts: EmergencyContact[];
  medications: string[];
  dietary: string[];
  favouriteToy: string;
  comfortSong: string;
  favouriteToyPhoto?: string;
  comfortSongPhoto?: string;
  updatedAt: Record<SectionKey, number>;
  feedbackEntries: FeedbackEntry[];
};

// Backwards-compat alias used by existing screens
export type Playbook = ChildPlaybook;

// Snapshot of Tyler's original demo data for the nine fields cleared/restored
// by User Test Mode. Used as the restore source when toggling off.
const TYLER_DEMO_DATA = {
  childName: "Tyler",
  childAge: 5,
  diagnosis: "Autism Level 1",
  meet:
    "Tyler is a curious, soft-hearted 5-year-old who loves dinosaurs, building train tracks, and singing the same three songs on repeat. He notices everything (the hum of the fridge, a new sticker on the wall) and gives the best slow hugs once he trusts you.",
  triggers: ["Loud unexpected noises", "Crowded rooms", "Sudden plan changes"],
  calming: [
    "Ask Tyler for a hug. Hold gently until he calms.",
    "Move to a quiet space. Reduce all noise immediately.",
    "Give him 5 minutes without speaking. Let him reset.",
  ],
  avoid: ["Raising your voice", "Forcing eye contact", "Blocking his exit"],
  medications: ["Omega-3, 1 capsule with breakfast"],
  emergencyContacts: [
    { name: "Mariana Oliveira", phone: "+1 604 555 0182", relation: "Primary" },
    { name: "Ewerton Santos", phone: "+1 604 555 0199", relation: "Father" },
  ],
} as const;

const now = Date.now();
const dayMs = 24 * 60 * 60 * 1000;

const seedUpdatedAt = (offsets: Partial<Record<SectionKey, number>> = {}): Record<SectionKey, number> => ({
  meet: now - (offsets.meet ?? 2) * dayMs,
  triggers: now - (offsets.triggers ?? 5) * dayMs,
  calming: now - (offsets.calming ?? 1) * dayMs,
  avoid: now - (offsets.avoid ?? 3) * dayMs,
  emergency: now - (offsets.emergency ?? 7) * dayMs,
  favouriteToy: now - (offsets.favouriteToy ?? 0) * dayMs,
  comfortSong: now - (offsets.comfortSong ?? 4) * dayMs,
});

const tyler: ChildPlaybook = {
  id: "tyler",
  childName: "Tyler",
  childAge: 5,
  diagnosis: "Autism Level 1",
  parentName: "Mariana Oliveira",
  meet:
    "Tyler is a curious, soft-hearted 5-year-old who loves dinosaurs, building train tracks, and singing the same three songs on repeat. He notices everything (the hum of the fridge, a new sticker on the wall) and gives the best slow hugs once he trusts you.",
  triggers: ["Loud unexpected noises", "Crowded rooms", "Sudden plan changes"],
  calming: [
    "Ask Tyler for a hug. Hold gently until he calms.",
    "Move to a quiet space. Reduce all noise immediately.",
    "Give him 5 minutes without speaking. Let him reset.",
  ],
  avoid: ["Raising your voice", "Forcing eye contact", "Blocking his exit"],
  emergencyContacts: [
    { name: "Mariana Oliveira", phone: "+1 604 555 0182", relation: "Primary" },
    { name: "Ewerton Santos", phone: "+1 604 555 0199", relation: "Father" },
  ],
  medications: ["Omega-3, 1 capsule with breakfast"],
  dietary: ["No sugar after 2pm. Affects behaviour significantly."],
  favouriteToy: "Rex the T-Rex",
  comfortSong: "Twinkle Twinkle",
  updatedAt: seedUpdatedAt(),
  feedbackEntries: [
    {
      id: "fb-0",
      caregiverName: "Paul Smith",
      caregiverRole: "EA",
      dateLabel: "Apr 3",
      duration: "Under 5 min",
      helped: "yes",
      timestamp: new Date(2026, 3, 3, 14, 20).getTime(),
      context: "Yes",
    },
    {
      id: "fb-1",
      caregiverName: "Paul Smith",
      caregiverRole: "EA",
      dateLabel: "Apr 8",
      duration: "Under 5 min",
      helped: "not_fully",
      note: "He didn't respond to the hug this time. Needed the quiet room first.",
      timestamp: new Date(2026, 3, 8, 9, 42).getTime(),
      context: "Not Sure",
    },
    {
      id: "fb-2",
      caregiverName: "Paul Smith",
      caregiverRole: "EA",
      dateLabel: "Apr 14",
      duration: "5-15 min",
      helped: "yes",
      timestamp: new Date(2026, 3, 14, 15, 10).getTime(),
      context: "No",
    },
    {
      id: "fb-3",
      caregiverName: "Paul Smith",
      caregiverRole: "EA",
      dateLabel: "Apr 18",
      duration: "15-30 min",
      helped: "not_fully",
      note: "Crowded hallway before class — environment was the trigger.",
      timestamp: new Date(2026, 3, 18, 11, 35).getTime(),
      context: "Yes",
    },
  ],
};

const heitor: ChildPlaybook = {
  id: "heitor",
  childName: "Heitor Lima",
  childAge: 6,
  diagnosis: "Autism Level 1",
  parentName: "Beatriz Lima",
  meet:
    "Heitor is a focused, observant 6-year-old who loves space, drawing detailed maps, and quiet corners with soft lighting. He warms up slowly but once he trusts you, he wants to teach you everything about the planets.",
  triggers: ["Sudden loud sounds", "Bright fluorescent lights", "Being rushed"],
  calming: [
    "Ask Heitor to sit in his calm corner.",
    "Give him his noise-cancelling headphones.",
    "Count slowly to 10 together.",
  ],
  avoid: ["Raising your voice", "Taking away his headphones", "Forcing interaction"],
  emergencyContacts: [
    { name: "Beatriz Lima", phone: "+1 604 555 0144", relation: "Primary" },
  ],
  medications: [],
  dietary: ["No artificial dyes. Causes restlessness."],
  favouriteToy: "Solar System Puzzle",
  comfortSong: "Twinkle Twinkle",
  updatedAt: seedUpdatedAt({ meet: 6, triggers: 8, calming: 4, avoid: 6, emergency: 10, favouriteToy: 2, comfortSong: 5 }),
  feedbackEntries: [],
};

export type EditKind = "favouriteToy" | "comfortSong" | "tactic" | "avoid" | "med" | "dietary";
export type HomeTab = "profile" | "crisis" | "care" | "emergency";
export type EditContext = {
  kind: EditKind;
  index: number;
  value: string;
  returnTo: ScreenId;
  breadcrumb?: string;
  returnTab?: HomeTab;
} | null;

export type AppUser = { firstName: string; lastName: string };

export type CaregiverProfile = { firstName: string; role: string; org: string; photo?: string; phone?: string };

export type CrisisOrigin = "parent" | "caregiver";

// Completion calculator (weighted)
export const calcCompletion = (p: ChildPlaybook): number => {
  let score = 0;
  if (p.meet && p.meet.trim().length > 0) score += 20;
  if (p.triggers.length > 0) score += 15;
  if (p.calming.length > 0) score += 15;
  if (p.avoid.length > 0) score += 15;
  if (p.emergencyContacts.length > 0 && p.emergencyContacts[0].name && p.emergencyContacts[0].phone) score += 15;
  if (p.favouriteToy && p.favouriteToy.trim().length > 0) score += 10;
  if (p.comfortSong && p.comfortSong.trim().length > 0) score += 10;
  return score;
};

export const relativeTime = (ts: number): string => {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / dayMs);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  return `Updated ${days} days ago`;
};

type Toast = { id: number; text: string; phase: "in" | "out" } | null;

type Ctx = {
  screen: ScreenId;
  direction: "forward" | "back";
  go: (s: ScreenId) => void;
  playbook: ChildPlaybook;
  setPlaybook: (p: ChildPlaybook, section?: SectionKey) => void;
  indexOpen: boolean;
  setIndexOpen: (b: boolean) => void;
  // multi-child
  children: Record<ChildId, ChildPlaybook>;
  activeChildId: ChildId;
  setActiveChild: (id: ChildId) => void;
  checkedInChildId: ChildId | null;
  checkIn: (id: ChildId) => void;
  checkOut: () => void;
  // caregiver bio
  caregiver: CaregiverProfile;
  setCaregiver: (c: CaregiverProfile) => void;
  // edit context
  editContext: EditContext;
  openEdit: (ctx: NonNullable<EditContext>) => void;
  saveEdit: (newValue: string, photo?: string) => void;
  deleteEdit: () => void;
  // crisis origin routing
  crisisOrigin: CrisisOrigin;
  setCrisisOrigin: (o: CrisisOrigin) => void;
  // emergency contacts
  addEmergencyContact: (c: EmergencyContact) => void;
  // feedback inbox
  activeFeedbackId: string | null;
  setActiveFeedback: (id: string | null) => void;
  addFeedbackToSection: (entryId: string, section: "calming" | "triggers" | "avoid", text: string) => void;
  addFeedbackEntry: (entry: Omit<FeedbackEntry, "id">) => void;
  dismissFeedback: (entryId: string) => void;
  // toast
  toast: Toast;
  showToast: (text: string) => void;
  // dark mode
  darkMode: boolean;
  toggleDarkMode: () => void;
  // user identity + flow
  user: AppUser;
  setUser: (u: AppUser) => void;
  isNewUser: boolean;
  setIsNewUser: (b: boolean) => void;
  // home tab
  activeTab: HomeTab;
  setActiveTab: (t: HomeTab) => void;
  // user intents
  userIntents: string[];
  setUserIntents: (v: string[]) => void;
  // selected role during onboarding
  selectedRole: "parent" | "caregiver" | null;
  setSelectedRole: (r: "parent" | "caregiver" | null) => void;
  // user test mode (clears active child's demo data)
  userTestMode: boolean;
  setUserTestMode: (val: boolean) => void;
  // first-open caregiver welcome gate (persisted)
  hasSeenCaregiverWelcome: boolean;
  setHasSeenCaregiverWelcome: (b: boolean) => void;
};

const EaseCtx = createContext<Ctx | null>(null);

export const EaseProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState<ScreenId>("welcome");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [childrenMap, setChildrenMap] = useState<Record<ChildId, ChildPlaybook>>({
    tyler,
    heitor,
  });
  const [activeChildId, setActiveChildId] = useState<ChildId>("tyler");
  const [checkedInChildId, setCheckedInChildId] = useState<ChildId | null>("tyler");
  const [caregiver, setCaregiver] = useState<CaregiverProfile>({
    firstName: "",
    role: "Educational Assistant",
    org: "",
    phone: "+1 604 555 0147",
  });
  const [editContext, setEditContext] = useState<EditContext>(null);
  const [indexOpen, setIndexOpen] = useState(false);
  const [crisisOrigin, setCrisisOrigin] = useState<CrisisOrigin>("parent");
  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const toastTimers = useRef<{ fade: number | null; clear: number | null }>({ fade: null, clear: null });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("ease.darkMode") === "1";
  });
  const [user, setUser] = useState<AppUser>({ firstName: "Mariana", lastName: "Oliveira" });
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<HomeTab>("profile");
  const [userIntents, setUserIntents] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<"parent" | "caregiver" | null>(null);
  const [userTestMode, setUserTestModeState] = useState<boolean>(false);
  const [hasSeenCaregiverWelcome, setHasSeenCaregiverWelcomeState] = useState<boolean>(false);
  const setHasSeenCaregiverWelcome = (b: boolean) => {
    setHasSeenCaregiverWelcomeState(b);
    if (typeof window !== "undefined") {
      localStorage.setItem("ease.hasSeenCaregiverWelcome", b ? "1" : "0");
    }
  };

  const setUserTestMode = (val: boolean) => {
    setUserTestModeState(val);
    setChildrenMap((m) => {
      const child = m[activeChildId];
      if (val) {
        return {
          ...m,
          [activeChildId]: {
            ...child,
            childName: "",
            // TODO: retype childAge as number | "" to support proper empty state — currently resets to 0 as a workaround
            childAge: 0,
            diagnosis: "",
            meet: "",
            triggers: [],
            calming: [],
            avoid: [],
            medications: [],
            emergencyContacts: [],
          },
        };
      }
      return {
        ...m,
        [activeChildId]: {
          ...child,
          childName: TYLER_DEMO_DATA.childName,
          childAge: TYLER_DEMO_DATA.childAge,
          diagnosis: TYLER_DEMO_DATA.diagnosis,
          meet: TYLER_DEMO_DATA.meet,
          triggers: [...TYLER_DEMO_DATA.triggers],
          calming: [...TYLER_DEMO_DATA.calming],
          avoid: [...TYLER_DEMO_DATA.avoid],
          medications: [...TYLER_DEMO_DATA.medications],
          emergencyContacts: TYLER_DEMO_DATA.emergencyContacts.map((c) => ({ ...c })),
        },
      };
    });
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const showToast = (text: string) => {
    const id = Date.now();
    setToast({ id, text, phase: "in" });
    if (toastTimers.current.fade) window.clearTimeout(toastTimers.current.fade);
    if (toastTimers.current.clear) window.clearTimeout(toastTimers.current.clear);
    toastTimers.current.fade = window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? { ...t, phase: "out" } : t));
    }, 4500);
    toastTimers.current.clear = window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, 5000);
  };

  const value = useMemo<Ctx>(
    () => ({
      screen,
      direction,
      go: (s) => {
        setDirection((SCREEN_DEPTH[s] ?? 0) >= (SCREEN_DEPTH[screen] ?? 0) ? "forward" : "back");
        setScreen(s);
        setIndexOpen(false);
      },
      playbook: childrenMap[activeChildId],
      setPlaybook: (p, section) =>
        setChildrenMap((m) => {
          const updatedAt = section
            ? { ...p.updatedAt, [section]: Date.now() }
            : p.updatedAt;
          return { ...m, [activeChildId]: { ...p, id: activeChildId, updatedAt } };
        }),
      indexOpen,
      setIndexOpen,
      children: childrenMap,
      activeChildId,
      setActiveChild: setActiveChildId,
      checkedInChildId,
      checkIn: (id) => {
        setCheckedInChildId(id);
        setActiveChildId(id);
      },
      checkOut: () => setCheckedInChildId(null),
      caregiver,
      setCaregiver,
      editContext,
      openEdit: (ctx) => {
        setEditContext(ctx);
        setDirection("forward");
        setScreen("editField");
      },
      saveEdit: (newValue, photo) => {
        if (!editContext) return;
        let touchedSection: SectionKey | null = null;
        setChildrenMap((m) => {
          const child = m[activeChildId];
          const updated: ChildPlaybook = { ...child };
          switch (editContext.kind) {
            case "favouriteToy":
              updated.favouriteToy = newValue;
              if (photo !== undefined) updated.favouriteToyPhoto = photo;
              touchedSection = "favouriteToy";
              break;
            case "comfortSong":
              updated.comfortSong = newValue;
              if (photo !== undefined) updated.comfortSongPhoto = photo;
              touchedSection = "comfortSong";
              break;
            case "tactic":
              updated.calming =
                editContext.index === -1
                  ? [...child.calming, newValue]
                  : child.calming.map((c, i) => (i === editContext.index ? newValue : c));
              touchedSection = "calming";
              break;
            case "avoid":
              updated.avoid =
                editContext.index === -1
                  ? [...child.avoid, newValue]
                  : child.avoid.map((c, i) => (i === editContext.index ? newValue : c));
              touchedSection = "avoid";
              break;
            case "med":
              updated.medications =
                editContext.index === -1
                  ? [...child.medications, newValue]
                  : child.medications.map((c, i) => (i === editContext.index ? newValue : c));
              break;
            case "dietary":
              updated.dietary =
                editContext.index === -1
                  ? [...child.dietary, newValue]
                  : child.dietary.map((c, i) => (i === editContext.index ? newValue : c));
              break;
          }
          if (touchedSection) {
            updated.updatedAt = { ...updated.updatedAt, [touchedSection]: Date.now() };
          }
          return { ...m, [activeChildId]: updated };
        });
        showToast(`Saved to ${childrenMap[activeChildId].childName}'s Playbook`);
        const target = editContext.returnTo;
        setDirection((SCREEN_DEPTH[target] ?? 0) >= (SCREEN_DEPTH[screen] ?? 0) ? "forward" : "back");
        setScreen(target);
        setEditContext(null);
      },
      deleteEdit: () => {
        if (!editContext) return;
        let touchedSection: SectionKey | null = null;
        setChildrenMap((m) => {
          const child = m[activeChildId];
          const updated: ChildPlaybook = { ...child };
          switch (editContext.kind) {
            case "favouriteToy":
              updated.favouriteToy = "";
              updated.favouriteToyPhoto = undefined;
              touchedSection = "favouriteToy";
              break;
            case "comfortSong":
              updated.comfortSong = "";
              updated.comfortSongPhoto = undefined;
              touchedSection = "comfortSong";
              break;
            case "tactic":
              updated.calming = child.calming.filter((_, i) => i !== editContext.index);
              touchedSection = "calming";
              break;
            case "avoid":
              updated.avoid = child.avoid.filter((_, i) => i !== editContext.index);
              touchedSection = "avoid";
              break;
            case "med":
              updated.medications = child.medications.filter((_, i) => i !== editContext.index);
              break;
            case "dietary":
              updated.dietary = child.dietary.filter((_, i) => i !== editContext.index);
              break;
          }
          if (touchedSection) {
            updated.updatedAt = { ...updated.updatedAt, [touchedSection]: Date.now() };
          }
          return { ...m, [activeChildId]: updated };
        });
        const target = editContext.returnTo;
        setDirection((SCREEN_DEPTH[target] ?? 0) >= (SCREEN_DEPTH[screen] ?? 0) ? "forward" : "back");
        setScreen(target);
        setEditContext(null);
      },
      crisisOrigin,
      setCrisisOrigin,
      addEmergencyContact: (c) => {
        setChildrenMap((m) => {
          const child = m[activeChildId];
          return {
            ...m,
            [activeChildId]: {
              ...child,
              emergencyContacts: [...child.emergencyContacts, c],
              updatedAt: { ...child.updatedAt, emergency: Date.now() },
            },
          };
        });
      },
      activeFeedbackId,
      setActiveFeedback: setActiveFeedbackId,
      addFeedbackToSection: (entryId, section, text) => {
        setChildrenMap((m) => {
          const child = m[activeChildId];
          const updated: ChildPlaybook = {
            ...child,
            feedbackEntries: child.feedbackEntries.filter((e) => e.id !== entryId),
          };
          if (section === "calming") updated.calming = [...child.calming, text];
          else if (section === "triggers") updated.triggers = [...child.triggers, text];
          else updated.avoid = [...child.avoid, text];
          updated.updatedAt = { ...child.updatedAt, [section]: Date.now() };
          return { ...m, [activeChildId]: updated };
        });
      },
      addFeedbackEntry: (entry) => {
        setChildrenMap((m) => {
          const child = m[activeChildId];
          const newEntry: FeedbackEntry = { ...entry, id: `fb-${Date.now()}` };
          return {
            ...m,
            [activeChildId]: {
              ...child,
              feedbackEntries: [newEntry, ...child.feedbackEntries],
            },
          };
        });
      },
      dismissFeedback: (entryId) => {
        setChildrenMap((m) => {
          const child = m[activeChildId];
          return {
            ...m,
            [activeChildId]: {
              ...child,
              feedbackEntries: child.feedbackEntries.filter((e) => e.id !== entryId),
            },
          };
        });
      },
      toast,
      showToast,
      darkMode,
      toggleDarkMode: () => {
        setDarkMode((v) => {
          const nv = !v;
          if (typeof window !== "undefined") {
            localStorage.setItem("ease.darkMode", nv ? "1" : "0");
          }
          return nv;
        });
      },
      user,
      setUser,
      isNewUser,
      setIsNewUser,
      activeTab,
      setActiveTab,
      userIntents,
      setUserIntents,
      selectedRole,
      setSelectedRole,
      userTestMode,
      setUserTestMode,
      hasSeenCaregiverWelcome,
      setHasSeenCaregiverWelcome,
    }),
    [screen, direction, childrenMap, activeChildId, checkedInChildId, caregiver, editContext, indexOpen, crisisOrigin, activeFeedbackId, toast, darkMode, user, isNewUser, activeTab, userIntents, selectedRole, userTestMode, hasSeenCaregiverWelcome],
  );

  return <EaseCtx.Provider value={value}>{children}</EaseCtx.Provider>;
};

export const useEase = () => {
  const ctx = useContext(EaseCtx);
  if (!ctx) {
    return {
      screen: "welcome" as ScreenId,
      direction: "forward" as const,
      go: () => {},
      playbook: tyler,
      setPlaybook: () => {},
      indexOpen: false,
      setIndexOpen: () => {},
      children: { tyler, heitor },
      activeChildId: "tyler" as ChildId,
      setActiveChild: () => {},
      checkedInChildId: null,
      checkIn: () => {},
      checkOut: () => {},
      caregiver: { firstName: "Paul", role: "Educational Assistant", org: "" },
      setCaregiver: () => {},
      editContext: null,
      openEdit: () => {},
      saveEdit: () => {},
      deleteEdit: () => {},
      crisisOrigin: "parent" as CrisisOrigin,
      setCrisisOrigin: () => {},
      addEmergencyContact: () => {},
      activeFeedbackId: null,
      setActiveFeedback: () => {},
      addFeedbackToSection: () => {},
      addFeedbackEntry: () => {},
      dismissFeedback: () => {},
      toast: null,
      showToast: () => {},
      darkMode: false,
      toggleDarkMode: () => {},
      user: { firstName: "Mariana", lastName: "Oliveira" },
      setUser: () => {},
      isNewUser: false,
      setIsNewUser: () => {},
      activeTab: "profile" as HomeTab,
      setActiveTab: () => {},
      userIntents: [],
      setUserIntents: () => {},
      selectedRole: null,
      setSelectedRole: () => {},
      userTestMode: false,
      setUserTestMode: () => {},
      hasSeenCaregiverWelcome: false,
      setHasSeenCaregiverWelcome: () => {},
    } as Ctx;
  }
  return ctx;
};
