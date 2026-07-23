"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
} from "@/lib/analytics";

type Consent = "granted" | "denied" | "unknown";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
  };
}

function getConsentSnapshot(): Consent {
  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unknown";
  } catch {
    return "denied";
  }
}

export function AnalyticsConsent() {
  const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const measurementId = /^G-[A-Z0-9]+$/.test(configuredMeasurementId ?? "")
    ? configuredMeasurementId
    : undefined;
  const consent = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    () => "unknown",
  );

  if (!measurementId) return null;

  const updateConsent = (nextConsent: Exclude<Consent, "unknown">) => {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_KEY, nextConsent);
      window.dispatchEvent(
        new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: nextConsent }),
      );
    } catch {
      // Storage restrictions leave analytics disabled.
    }
  };

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="hexcode-google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${measurementId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {consent === "unknown" ? (
        <aside
          aria-label="Analytics consent"
          className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur sm:right-6 sm:bottom-6 sm:left-auto"
        >
          <p className="text-sm leading-6 text-neutral-300">
            HexCode uses optional analytics to understand which pages and
            enquiries are useful. No analytics load unless you accept.
          </p>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => updateConsent("granted")}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black outline-none transition hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => updateConsent("denied")}
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 outline-none transition hover:border-neutral-500 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Decline
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
