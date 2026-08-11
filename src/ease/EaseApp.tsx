import { EaseProvider, useEase } from "./state";
import { PhoneFrame } from "./PhoneFrame";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScreenIndex } from "./ScreenIndex";
import { ScreenNavPanel } from "./ScreenNavPanel";
import { Welcome } from "./screens/Welcome";
import { Role } from "./screens/Role";
import { ChildInfo } from "./screens/ChildInfo";
import { Meet } from "./screens/Meet";
import { ChipScreen } from "./screens/ChipScreen";
import { Emergency } from "./screens/Emergency";
import { Complete } from "./screens/Complete";
import { Home } from "./screens/Home";
import { PlaybookView } from "./screens/Playbook";
import { Circle } from "./screens/Circle";
import { Crisis } from "./screens/Crisis";
import { PostCrisis } from "./screens/PostCrisis";
import { CaregiverBio } from "./screens/CaregiverBio";
import { CaregiverConnect } from "./screens/CaregiverConnect";
import { CaregiverList } from "./screens/CaregiverList";
import { Bridge } from "./screens/Bridge";
import { CaregiverHome } from "./screens/CaregiverHome";
import { CaregiverWelcome } from "./screens/CaregiverWelcome";
import { CaregiverSettings } from "./screens/CaregiverSettings";
import { EditField } from "./screens/EditField";
import { AddContact } from "./screens/AddContact";
import { Settings } from "./screens/Settings";
import { SignUp } from "./screens/SignUp";
import { Login } from "./screens/Login";
import { Terms } from "./screens/Terms";
import { AddToPlaybook } from "./screens/AddToPlaybook";
import { PlaybookIntro } from "./screens/PlaybookIntro";
import { HomeV2 } from "./screens/HomeV2";
import { InsightsAll } from "./screens/InsightsAll";


const Router = () => {
  const { screen } = useEase();
  switch (screen) {
    case "welcome": return <Welcome />;
    case "role": return <Role />;
    case "childInfo": return <ChildInfo />;
    case "meet": return <Meet />;
    case "triggers": return <ChipScreen field="triggers" />;
    case "calming": return <ChipScreen field="calming" />;
    case "avoid": return <ChipScreen field="avoid" />;
    case "emergency": return <Emergency />;
    case "complete": return <Complete />;
    case "home": return <Home />;
    case "playbook": return <PlaybookView />;
    case "circle": return <Circle />;
    case "crisis": return <Crisis />;
    case "postCrisis": return <PostCrisis />;
    case "caregiverBio": return <CaregiverBio />;
    case "caregiverConnect": return <CaregiverConnect />;
    case "caregiverList": return <CaregiverList />;
    case "bridge": return <Bridge />;
    case "caregiverHome": return <CaregiverHome />;
    case "caregiverWelcome": return <CaregiverWelcome />;
    case "caregiverSettings": return <CaregiverSettings />;
    case "editField": return <EditField />;
    case "addContact": return <AddContact />;
    case "settings": return <Settings />;
    case "signup": return <SignUp />;
    case "login": return <Login />;
    case "terms": return <Terms />;
    case "addToPlaybook": return <AddToPlaybook />;
    case "playbookIntro": return <PlaybookIntro />;
    case "homeV2": return <HomeV2 />;
    case "insightsAll": return <InsightsAll />;
    default: return <Welcome />;
  }
};

const RouterWithTransition = () => {
  const { screen, direction } = useEase();
  return (
    <div
      key={screen}
      className={`h-full w-full ${direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left"}`}
    >
      <Router />
    </div>
  );
};

export const EaseApp = () => {
  const isMobileHook = useIsMobile();
  // useIsMobile() returns false on frame 1 (!!undefined). On mobile devices that causes
  // the desktop phone-frame branch to render and paint first — iOS caches its dominant
  // color (Welcome's purple) as the safe-area background, creating a persistent strip.
  // Synchronous matchMedia gives the correct value on frame 1 with no useEffect lag.
  const isMobile =
    isMobileHook ||
    (typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches);

  return (
    <EaseProvider>
      {isMobile ? (
        <>
          <PhoneFrame>
            <RouterWithTransition />
          </PhoneFrame>
          <ScreenIndex />
        </>
      ) : (
        <div className="min-h-screen w-full bg-canvas flex items-center justify-center gap-8 p-10">
          {/* Demo label */}
          <div className="absolute top-6 left-8">
            <div className="font-display text-ease-md text-ink lowercase">ease</div>
            <div className="text-ease-xs text-muted-foreground uppercase tracking-[0.18em]">
              High-fidelity prototype
            </div>
          </div>

          <PhoneFrame>
            <RouterWithTransition />
          </PhoneFrame>
          <ScreenNavPanel />
          <ScreenIndex />
        </div>
      )}
    </EaseProvider>
  );
};
