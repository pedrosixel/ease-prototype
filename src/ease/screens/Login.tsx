import { useState } from "react";
import { TopBar, PrimaryBtn } from "../primitives";
import { useEase } from "../state";

export const Login = () => {
  const { go, setIsNewUser } = useEase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const accepted =
      typeof window !== "undefined" && localStorage.getItem("ease.termsAccepted") === "1";
    setIsNewUser(false);
    go(accepted ? "homeV2" : "terms");
  };

  return (
    <div className="h-full flex flex-col ">
      <TopBar back="welcome" />
      <div className="px-7 mt-2 flex-1 flex flex-col">
        <h1 className="font-display text-ease-2xl text-ink leading-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-ease-base text-muted-foreground">
          Sign in to continue.
        </p>

        <div className="mt-7 space-y-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" />
        </div>

        <div className="flex-1" />

        <button className="text-ease-sm text-muted-foreground underline self-center mb-2">
          Forgot password?
        </button>
        <button
          onClick={() => go("signup")}
          className="text-ease-sm text-muted-foreground self-center mb-4"
        >
          Don't have an account? <span className="text-secondary font-semibold underline">Sign Up</span>
        </button>
      </div>
      <div className="px-7 pb-8">
        <PrimaryBtn onClick={handleLogin}>Log In</PrimaryBtn>
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
