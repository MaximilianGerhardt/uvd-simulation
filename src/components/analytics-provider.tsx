"use client";

import { useEffect } from "react";
import { initConsentMode, loadGA4Script } from "@/lib/analytics";

export function AnalyticsProvider() {
  useEffect(() => {
    initConsentMode();
    loadGA4Script();
  }, []);

  return null;
}
