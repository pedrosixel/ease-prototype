import { useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import { TopBar, PrimaryBtn, Dots } from "../primitives";
import { useEase } from "../state";
import { paulPhoto } from "../assets";

const ROLES = [
  "Educational Assistant",
  "Teacher",
  "Babysitter",
  "Family Member",
  "Other",
];

export const CaregiverBio = () => {
  const { go, caregiver, setCaregiver } = useEase();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!caregiver.photo) {
      setCaregiver({ ...caregiver, photo: paulPhoto });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCaregiver({ ...caregiver, photo: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <TopBar back="role" />
      <div className="px-7"><Dots total={2} current={0} accent="secondary" /></div>
      <div className="px-7 mt-4 flex-1 overflow-y-auto phone-scroll">
        <h1 className="font-display text-ease-2xl text-ink leading-tight">
          Tell us a bit about yourself.
        </h1>
        <p className="mt-3 text-ease-base text-muted-foreground">
          Parents will see this when you're in their caregivers list.
        </p>

        {/* Photo */}
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="relative w-[104px] h-[104px] rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border"
          >
            {caregiver.photo ? (
              <img src={caregiver.photo} alt="You" className="w-full h-full object-cover" />
            ) : (
              <Camera size={26} className="text-muted-foreground" />
            )}
            <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary text-white text-lg font-bold flex items-center justify-center">
              +
            </span>
          </button>
          <p className="mt-2 text-ease-xs text-muted-foreground">Add your photo (optional)</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickPhoto} />
        </div>

        <div className="mt-7">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            First name
          </label>
          <input
            value={caregiver.firstName}
            onChange={(e) => setCaregiver({ ...caregiver, firstName: e.target.value })}
            placeholder="e.g. Paul"
            className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="mt-5">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Role
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ROLES.map((r) => {
              const active = caregiver.role === r;
              return (
                <button
                  key={r}
                  onClick={() => setCaregiver({ ...caregiver, role: r })}
                  className={`px-4 h-10 rounded-full text-ease-sm font-semibold border transition ${
                    active
                      ? "bg-secondary text-white border-secondary"
                      : "bg-card text-foreground border-border"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            Phone number <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            value={caregiver.phone ?? ""}
            onChange={(e) => setCaregiver({ ...caregiver, phone: e.target.value })}
            placeholder="+1 604 555 0147"
            className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-secondary"
          />
          <p className="mt-1.5 text-ease-xs text-muted-foreground">
            Parents can reach you directly during sessions.
          </p>
        </div>

        <div className="mt-5">
          <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
            School or organisation <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span>
          </label>
          <input
            value={caregiver.org}
            onChange={(e) => setCaregiver({ ...caregiver, org: e.target.value })}
            placeholder="e.g. Sunrise Elementary"
            className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-secondary"
          />
        </div>
      </div>
      <div className="px-7 pb-8 pt-4">
        <PrimaryBtn variant="blue" onClick={() => go("caregiverConnect")}>
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
};
