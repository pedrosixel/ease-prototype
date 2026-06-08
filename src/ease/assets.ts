import tylerPhoto from "@/assets/tyler-profile.jpg";
import heitorPhoto from "@/assets/heitor-profile.jpg";
import paulPhoto from "@/assets/paul-profile.jpg";
import dinosaurToy from "@/assets/dinosaur-toy.jpg";
import type { ChildId } from "./state";

export const CHILD_PHOTOS: Record<ChildId, string> = {
  tyler: tylerPhoto,
  heitor: heitorPhoto,
};

export const CHILD_FAVOURITE_TOY: Record<ChildId, { photo?: string; label: string }> = {
  tyler: { photo: dinosaurToy, label: "Rex the T-Rex" },
  heitor: { label: "Fidget cube" },
};

export { paulPhoto, dinosaurToy };
