# EASE — Post-Color-Swap Fixes

Apply six targeted edits. No files outside the list below are touched.

## 1. `src/ease/screens/Welcome.tsx`
- Change the outer container `background: "#F3768D"` → `"#7B5EA7"`.
- Change the Log In button `background: "#F3768D"` → `"#7B5EA7"`.
- Leave the Sign Up button, Pip image, logo, copy, and curved cream panel untouched.

## 2. `src/ease/screens/Meet.tsx`
- Add `import pipStarstruck from "@/assets/Pip_Starstruck.svg"`.
- Replace the existing Pip `<img src>` to use `pipStarstruck` (was `Pip_Happy.svg`).
- Remove the now-unused `Pip_Happy` import on this screen.

## 3. `src/ease/screens/ChipScreen.tsx`
- Add `import pipSad from "@/assets/Pip_Sad.svg"` alongside the existing `pipDefault` (Pip_Happy) import; rename local var for clarity: `pipHappy`.
- In the JSX, set the Pip `<img src>` to `field === "triggers" ? pipSad : pipHappy`.
- Calming and Avoid steps continue to render Pip_Happy.

## 4. `src/ease/screens/Circle.tsx`
- Change the H1 text from `{playbook.childName}'s Circle` → `{playbook.childName}'s Caregivers`.
- Leave the `TopBar` title ("Caregivers"), bottom nav, and all other copy untouched.

## 5. `src/ease/screens/CaregiverWelcome.tsx`
- Change the root container `background: "#FFFFFF"` → `"#EDE5F7"`.
- Change each of the three info card `background: "#F5F8FF"` → `"#FFFFFF"` (per spec: cards stay white).
- CTA button, logo, heading, body copy untouched.

## 6. `src/ease/screens/CaregiverList.tsx` — Check In confirmation dialog
- Import `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogTrigger` from `@/components/ui/alert-dialog`.
- Track a local `pendingChildId` state (or use AlertDialog `open`/`onOpenChange` per child).
- Wrap each child's "Check In" button in an `AlertDialogTrigger`.
  - Dialog title: `Check in with {child.name}?`
  - Confirm button styled `background:#7B5EA7; color:#FFFFFF` — sets `checkedInChildId` via the existing context setter and closes dialog.
  - Cancel button: shadcn outline variant — closes dialog, no state change.
- "Check Out" button (shown when `checkedInChildId === child.id`) clears `checkedInChildId` immediately — no dialog. Styled `background:#7B5EA7; color:#FFFFFF`.

## 7. `src/ease/screens/CaregiverHome.tsx` — empty state
- Add `import pipSad from "@/assets/Pip_Sad.svg"`.
- In the "No child selected yet" empty state, remove the dashed purple placeholder box and the "Pip illustration" text.
- Render `<img src={pipSad} width={160} height={160} alt="Pip" />` in its place.
- Keep heading, body text, and "Go to My List" purple button unchanged.

## Verification
- Visual sweep of: Welcome, Meet, ChipScreen (triggers/calming/avoid), Circle, CaregiverWelcome, CaregiverList (check-in flow), CaregiverHome empty state.
- Confirm dialog opens on Check In, dismisses on Cancel, toggles to Check Out on Confirm; Check Out is one-tap.
