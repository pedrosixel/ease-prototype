import { useRef } from "react";
import { ScreenId, useEase } from "./state";

export const useBackGestures = (back: ScreenId) => {
  const { go } = useEase();
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const goBack = () => go(back);

  const handlers = {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current == null || startY.current == null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = Math.abs(e.changedTouches[0].clientY - startY.current);
      startX.current = null;
      startY.current = null;
      if (dx > 80 && dy < 60) goBack();
    },
  };

  // Tap-back overlay disabled — it intercepted input/chip/dropdown taps.
  // Swipe-back gesture remains active via `handlers`.
  const TapBack = () => null;

  return { handlers, TapBack, goBack };
};
