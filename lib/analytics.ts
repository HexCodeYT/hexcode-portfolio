export const ANALYTICS_CONSENT_KEY = "hexcode-analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "hexcode:analytics-consent";

export type AgencyAnalyticsEvent =
  | "agency_page_view"
  | "agency_primary_cta_click"
  | "agency_email_click"
  | "agency_form_start"
  | "agency_form_submit"
  | "agency_form_error";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsConsent() {
  try {
    return (
      typeof window !== "undefined" &&
      window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted"
    );
  } catch {
    return false;
  }
}

export function trackAgencyEvent(
  event: AgencyAnalyticsEvent,
  parameters: Record<string, string> = {},
) {
  try {
    if (!hasAnalyticsConsent()) return;

    window.dataLayer ??= [];
    window.gtag ??= (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag?.("event", event, parameters);
  } catch {
    // Analytics must never interrupt a user action.
  }
}
