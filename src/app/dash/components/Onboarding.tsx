"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useOnboarding } from "../hooks/useOnboarding";

type Preferences = {
  language: string;
  currency: string;
  theme: string;
};

function InitialSetupStep({
  preferences,
  setPreferences,
}: {
  preferences: Preferences;
  setPreferences: Dispatch<
    SetStateAction<{
      language: string;
      currency: string;
      theme: string;
    }>
  >;
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Language
        </label>
        <select
          value={preferences.language}
          onChange={(e) =>
            setPreferences({ ...preferences, language: e.target.value })
          }
          className="w-full border border-zinc-300 rounded-lg p-2"
        >
          <option value="en">English</option>
          {/* <option value="pt">Português</option> */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Currency
        </label>
        <select
          value={preferences.currency}
          onChange={(e) =>
            setPreferences({ ...preferences, currency: e.target.value })
          }
          className="w-full border border-zinc-300 rounded-lg p-2"
        >
          <option value="usd">USD - Dollar</option>
          {/* <option value="brl">BRL - Real</option>
          <option value="eur">EUR - Euro</option> */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Theme
        </label>
        <div className="flex gap-4">
          {["light", "system"].map((theme) => (
            <button
              key={theme}
              onClick={() => setPreferences({ ...preferences, theme })}
              className={`flex-1 p-3 rounded-lg border cursor-pointer ${
                preferences.theme === theme
                  ? "border-black bg-black text-white"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              } transition`}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinalStep() {
  return (
    <div className="text-sm text-zinc-500">
      <span>Tip:</span> You can change these anytime in your settings.
    </div>
  );
}

const steps = [
  {
    title: "Welcome to the platform!",
    description:
      "Let's walk you through the first steps to set up your account.",
  },
  {
    title: "Initial setup",
    description: "Choose your language, currency, and theme.",
    page: InitialSetupStep,
  },
  {
    emoji: "🎉",
    title: "All done!",
    description: "Everything’s ready. You’re good to go.",
    page: FinalStep,
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "usd",
    theme: "system",
  });

  const { isOnboarded, handleOnboard } = useOnboarding();
  if (isOnboarded) return null;

  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleOnboard();
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const CurrentStep = steps[step].page;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[600px] bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8">
        <div className="flex w-full gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i <= step ? "bg-black" : "bg-zinc-200"
              }`}
            />
          ))}
        </div>

        <div className="text-center space-y-3">
          {steps[step].emoji && (
            <div className="text-5xl">{steps[step].emoji}</div>
          )}
          <h2 className="text-2xl font-semibold">{steps[step].title}</h2>
          <p className="text-zinc-600">{steps[step].description}</p>
        </div>

        {CurrentStep && (
          <CurrentStep
            preferences={preferences}
            setPreferences={setPreferences}
          />
        )}

        <div className="flex gap-3 mt-4">
          {step > 0 && (
            <button
              className="border border-black/25 text-lg px-8 py-1 rounded-lg hover:opacity-80 transition cursor-pointer"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <button
            className="bg-black text-white text-lg px-8 py-1 rounded-lg hover:opacity-80 transition cursor-pointer"
            onClick={handleNext}
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
