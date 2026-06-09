import { PrimaryBtn, Dots } from "../primitives";
import { useEase } from "../state";
import PipContent from "@/assets/Pip_Content.svg";

export const Complete = () => {
  const { go, playbook } = useEase();
  return (
    <div className="h-full flex flex-col px-8 pb-10">
      <div className="pt-6 shrink-0"><Dots total={7} current={6} /></div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <img src={PipContent} alt="" style={{ width: "160px", height: "auto", display: "block" }} />
        <h1 className="font-display text-ease-2xl text-ink mt-8">
          {playbook.childName}'s Playbook<br />is ready.
        </h1>
        <p className="mt-4 text-ease-base text-muted-foreground max-w-[280px]">
          You can keep building it any time. Share it with your caregivers when you're ready.
        </p>
      </div>
      <PrimaryBtn onClick={() => go("homeV2")}>Go to Home</PrimaryBtn>
    </div>
  );
};
