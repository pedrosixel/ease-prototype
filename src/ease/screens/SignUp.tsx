import { useState } from "react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";

export const SignUp = () => {
  const { go, setUser, setIsNewUser } = useEase();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const proceed = () => {
    setUser({
      firstName: firstName.trim() || "Mariana",
      lastName: lastName.trim() || "Oliveira",
    });
    setIsNewUser(true);
    go("terms");
  };

  return (
    <div className="h-full flex flex-col ">
      <TopBar back="welcome" />
      <div className="px-7 mt-2 flex-1 flex flex-col overflow-y-auto phone-scroll pb-6">
        <h1 className="font-display text-ease-2xl text-ink leading-tight">
          Create your account
        </h1>
        <p className="mt-2 text-ease-base text-muted-foreground">
          Start your child's shared playbook.
        </p>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" type="text" value={firstName} onChange={setFirstName} placeholder="Mariana" />
            <Field label="Last Name" type="text" value={lastName} onChange={setLastName} placeholder="Oliveira" />
          </div>
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" />
          <Field label="Confirm password" type="password" value={confirm} onChange={setConfirm} placeholder="Re-enter password" />
        </div>

        <div className="mt-6">
          <PrimaryBtn onClick={proceed}>Create Account</PrimaryBtn>
        </div>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-ease-xs text-muted-foreground uppercase tracking-[0.14em]">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social */}
        <div className="mt-5 space-y-3">
          <button
            onClick={proceed}
            className="w-full h-12 rounded-full bg-black text-white font-semibold inline-flex items-center justify-center gap-2 text-ease-base"
          >
            <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16.365 1.43c0 1.14-.42 2.21-1.18 3.02-.79.85-2.07 1.5-3.32 1.4-.14-1.13.42-2.31 1.16-3.05.81-.83 2.18-1.45 3.34-1.37zM20.5 17.4c-.55 1.27-.81 1.84-1.52 2.96-.99 1.55-2.39 3.48-4.12 3.5-1.54.02-1.93-1-4.02-.99-2.09.01-2.52 1.01-4.06.99-1.73-.02-3.06-1.77-4.05-3.32C.16 16.5-.18 11.18 1.5 8.36c1.18-1.99 3.05-3.16 4.79-3.16 1.78 0 2.9.97 4.37.97 1.43 0 2.3-.97 4.36-.97 1.55 0 3.2.84 4.37 2.3-3.84 2.1-3.21 7.58.21 8.9z" />
            </svg>
            Continue with Apple
          </button>
          <button
            onClick={proceed}
            className="w-full h-12 rounded-full bg-card border border-border text-ink font-semibold inline-flex items-center justify-center gap-2 text-ease-base"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.6 35.1 44 30 44 24c0-1.3-.1-2.4-.4-3.5z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <button
          onClick={() => go("login")}
          className="mt-6 text-ease-sm text-muted-foreground self-center"
        >
          Already have an account? <span className="text-secondary font-semibold underline">Log In</span>
        </button>
      </div>
    </div>
  );
};

const Field = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="text-ease-xs uppercase tracking-[0.14em] text-muted-foreground font-bold">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-2 w-full h-12 rounded-[14px] border border-border bg-card px-4 text-ease-base text-foreground focus:outline-none focus:border-primary"
    />
  </div>
);
