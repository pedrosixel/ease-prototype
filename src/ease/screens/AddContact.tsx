import { useState } from "react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";

const RELATIONS = ["Mother", "Father", "Grandparent", "Doctor", "Other"];

export const AddContact = () => {
  const { go, addEmergencyContact, setActiveTab } = useEase();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState<string>("Other");

  const save = () => {
    if (!name.trim() || !phone.trim()) return;
    addEmergencyContact({ name: name.trim(), phone: phone.trim(), relation });
    setActiveTab("emergency");
    go("homeV2");
  };

  return (
    <div className="h-full flex flex-col ">
      <TopBar back="homeV2" title="Add contact" />
      <div className="px-7 mt-4 flex-1 flex flex-col">
        <h1 className="font-display text-ease-2xl text-ink leading-tight">
          New emergency contact
        </h1>
        <p className="mt-2 text-ease-sm text-muted-foreground">
          They'll appear on the Emergency tab so you can call fast.
        </p>

        <div className="mt-6">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aunt Sofia"
            className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mt-5">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 0100"
            className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mt-5">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Relation
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {RELATIONS.map((r) => {
              const active = relation === r;
              return (
                <button
                  key={r}
                  onClick={() => setRelation(r)}
                  className={`h-9 px-4 rounded-full text-ease-sm font-semibold border transition ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-7 pb-8 pt-4">
        <PrimaryBtn onClick={save}>Save contact</PrimaryBtn>
      </div>
    </div>
  );
};
