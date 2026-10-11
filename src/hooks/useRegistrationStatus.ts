import { useEffect, useState } from "react";

import { Competition } from "@/data/competition";

type RegistrationStatus = "upcoming" | "open" | "closed";

const registration = Competition[0];
const MAX_TIMEOUT = 2_147_483_647;

export function getRegistrationStatus(now = Date.now()): RegistrationStatus {
  if (now < registration.startDate) return "upcoming";
  if (now <= registration.endDate) return "open";
  return "closed";
}

export function useRegistrationStatus() {
  const [status, setStatus] = useState(getRegistrationStatus);

  useEffect(() => {
    let timer: number | undefined;

    const updateStatus = () => {
      window.clearTimeout(timer);

      const now = Date.now();
      const currentStatus = getRegistrationStatus(now);
      setStatus(currentStatus);

      if (currentStatus === "closed") return;

      const nextTransition =
        currentStatus === "upcoming"
          ? registration.startDate
          : registration.endDate + 1;

      // Long waits must stay below the browser's signed 32-bit timer limit.
      timer = window.setTimeout(
        updateStatus,
        Math.min(nextTransition - now, MAX_TIMEOUT),
      );
    };

    const onVisibilityChange = () => {
      if (!document.hidden) updateStatus();
    };

    updateStatus();
    window.addEventListener("focus", updateStatus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", updateStatus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return status;
}
