"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  hasAnalyticsConsent,
  trackAgencyEvent,
  type AgencyAnalyticsEvent,
} from "@/lib/analytics";

export function AgencyPageTracker() {
  useEffect(() => {
    let tracked = false;

    const trackPageView = () => {
      if (tracked || !hasAnalyticsConsent()) return;

      tracked = true;
      trackAgencyEvent("agency_page_view");
    };

    trackPageView();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, trackPageView);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, trackPageView);
    };
  }, []);

  return null;
}

type TrackedAgencyLinkProps = {
  href: string;
  event: AgencyAnalyticsEvent;
  className: string;
  children: ReactNode;
};

export function TrackedAgencyLink({
  href,
  event,
  className,
  children,
}: TrackedAgencyLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackAgencyEvent(event)}
      className={className}
    >
      {children}
    </a>
  );
}
