import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";

const HEADINGS: Record<string, string> = {
  favouriteToy: "Favourite toy",
  comfortSong: "Comfort song",
  tactic: "Edit tactic",
  avoid: "Edit rule",
  med: "Edit medication",
  dietary: "Edit dietary note",
};

export const EditField = () => {
  const { editContext, saveEdit, deleteEdit, playbook, setActiveTab } = useEase();
  const [value, setValue] = useState(editContext?.value ?? "");
  const initialPhoto =
    editContext?.kind === "favouriteToy"
      ? playbook.favouriteToyPhoto
      : editContext?.kind === "comfortSong"
        ? playbook.comfortSongPhoto
        : undefined;
  const [photo, setPhoto] = useState<string | undefined>(initialPhoto);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!editContext) {
    return (
      <div className="h-full flex flex-col ">
        <TopBar back="homeV2" />
        <div className="flex-1 px-7 flex items-center justify-center">
          <p className="text-ease-base text-muted-foreground">No item selected</p>
        </div>
      </div>
    );
  }

  const heading = HEADINGS[editContext.kind] ?? "Edit";
  const showPhoto = editContext.kind === "favouriteToy" || editContext.kind === "comfortSong";

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full flex flex-col ">
      <TopBar back={editContext.returnTo} title={heading} />
      {editContext.breadcrumb && (
        <div className="px-7 mt-3 text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
          {editContext.breadcrumb}
        </div>
      )}
      <div className="px-7 mt-2 flex-1 flex flex-col overflow-y-auto phone-scroll">
        <h1 className="font-display text-ease-2xl text-ink leading-tight">{heading}</h1>
        <p className="mt-2 text-ease-sm text-muted-foreground">
          Update the wording. It saves to the playbook immediately.
        </p>

        {showPhoto && (
          <div className="mt-6">
            <button
              onClick={() => fileRef.current?.click()}
              className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center overflow-hidden border border-border"
            >
              {photo ? (
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera size={22} className="text-muted-foreground" />
              )}
            </button>
            <p className="mt-2 text-ease-xs text-muted-foreground">Add photo (optional)</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickPhoto}
            />
          </div>
        )}

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          className="mt-6 w-full rounded-[14px] border border-border bg-card px-4 py-3 text-ease-base text-foreground focus:outline-none focus:border-primary resize-none"
        />
      </div>
      <div className="px-7 pb-8 pt-4">
        <PrimaryBtn
          onClick={() => {
            setActiveTab(editContext.returnTab ?? "profile");
            saveEdit(value.trim() || editContext.value, photo);
          }}
        >
          Save
        </PrimaryBtn>
        {editContext.index !== -1 && (
          <div className="mt-4 text-center">
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-ease-sm font-semibold text-destructive hover:underline"
              >
                Delete
              </button>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className="text-ease-sm text-foreground">Are you sure?</span>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-ease-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setActiveTab(editContext.returnTab ?? "profile");
                    deleteEdit();
                  }}
                  className="text-ease-sm font-bold text-destructive hover:underline"
                >
                  Yes, delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
