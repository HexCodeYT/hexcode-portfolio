"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackAgencyEvent } from "@/lib/analytics";
import { TrackedAgencyLink } from "./AgencyTracking";

type FormState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const inputClass =
  "mt-2 w-full rounded-xl border border-neutral-800 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-neutral-700 hover:border-neutral-700 focus:border-neutral-500 focus:ring-2 focus:ring-white/20";

export function AgencyContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const hasStarted = useRef(false);
  const isSubmitting = useRef(false);

  const handleStart = () => {
    if (hasStarted.current) return;

    hasStarted.current = true;
    trackAgencyEvent("agency_form_start");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting.current) return;

    isSubmitting.current = true;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    setFormState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/contact/agencies", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        trackAgencyEvent("agency_form_error", {
          reason: response.status === 400 ? "validation" : "delivery",
        });
        setFormState({
          status: "error",
          message:
            result.error ??
            "Your enquiry could not be sent. Please check the form and try again.",
        });
        return;
      }

      form.reset();
      hasStarted.current = false;
      trackAgencyEvent("agency_form_submit");
      setFormState({
        status: "success",
        message: "Thanks — your project details have been sent. I’ll be in touch.",
      });
    } catch {
      trackAgencyEvent("agency_form_error", { reason: "network" });
      setFormState({
        status: "error",
        message:
          "The form could not connect. Please try again or send the details by email.",
      });
    } finally {
      isSubmitting.current = false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleStart}
      noValidate
      className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-neutral-300">
          Name
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={100}
            className={inputClass}
          />
        </label>

        <label className="text-sm text-neutral-300">
          Agency
          <input
            name="agency"
            type="text"
            required
            autoComplete="organization"
            maxLength={120}
            className={inputClass}
          />
        </label>

        <label className="text-sm text-neutral-300">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            className={inputClass}
          />
        </label>

        <label className="text-sm text-neutral-300">
          Project type
          <select name="projectType" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a project type
            </option>
            <option value="Landing page or campaign site">Landing page or campaign site</option>
            <option value="Business website">Business website</option>
            <option value="Ecommerce or payments">Ecommerce or payments</option>
            <option value="Technical rescue">Technical rescue</option>
            <option value="Ongoing development capacity">Ongoing development capacity</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="text-sm text-neutral-300">
          Desired delivery date
          <input
            name="desiredDeliveryDate"
            type="date"
            required
            className={inputClass}
          />
        </label>

        <label className="text-sm text-neutral-300">
          Indicative budget
          <select name="indicativeBudget" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a budget range
            </option>
            <option value="$500–$999">$500–$999</option>
            <option value="$1,000–$1,999">$1,000–$1,999</option>
            <option value="$2,000–$4,999">$2,000–$4,999</option>
            <option value="$5,000+">$5,000+</option>
            <option value="Not confirmed">Not confirmed</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block text-sm text-neutral-300">
        Project details
        <textarea
          name="projectDetails"
          required
          rows={7}
          minLength={20}
          maxLength={4000}
          placeholder="What needs to be built, what is already supplied, and where is the project currently blocked?"
          className={`${inputClass} resize-y`}
        />
      </label>

      <div hidden aria-hidden="true">
        <label>
          Website
          <input
            name="website"
            type="text"
            maxLength={200}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={formState.status === "submitting"}
          className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black outline-none transition hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:opacity-60"
        >
          {formState.status === "submitting" ? "Sending…" : "Send project details"}
        </button>

        <p className="text-sm text-neutral-600">
          Prefer email?{" "}
          <TrackedAgencyLink
            href="mailto:pawan@hexcode.au?subject=White-label%20agency%20project"
            event="agency_email_click"
            className="rounded-sm text-neutral-400 underline decoration-neutral-700 underline-offset-4 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white"
          >
            pawan@hexcode.au
          </TrackedAgencyLink>
        </p>
      </div>

      {formState.status === "success" ? (
        <p role="status" className="mt-5 text-sm text-emerald-400">
          {formState.message}
        </p>
      ) : null}

      {formState.status === "error" ? (
        <p role="alert" className="mt-5 text-sm text-rose-400">
          {formState.message}
        </p>
      ) : null}
    </form>
  );
}
