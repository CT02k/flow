import { useEffect, useState } from "react";

export function useOnboarding() {
  const [isOnboarded, setIsOnboarded] = useState(true);

  useEffect(() => {
    async function setData() {
      const req = await fetch("/api/me");
      const data: { onboarded: boolean } = await req.json();
      setIsOnboarded(data.onboarded);
    }
    setData();
  });

  const handleOnboard = async () => {
    const req = await fetch("/api/me/onboarded", { method: "POST" });
    const data: { onboarded: boolean } = await req.json();

    setIsOnboarded(data.onboarded);
  };

  return { isOnboarded, handleOnboard };
}
