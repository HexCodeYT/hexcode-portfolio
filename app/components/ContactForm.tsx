"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { projectTypes } from "@/lib/contact";

type FormState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const inputClass =
  "mt-2 w-full rounded-xl border border-neutral-800 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-neutral-700 hover:border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export function ContactForm({
  audience = "contact",
}: {
  audience?: "contact" | "agency";
}) {
  const eventName = (action: "start" | "error" | "submit") =>
    audience === "agency"
      ? (`agency_form_${action}` as const)
      : (`contact_form_${action}` as const);
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const hasStarted = useRef(false);
  const isSubmitting = useRef(false);

  const handleStart = () => {
    if (hasStarted.current) return;

    hasStarted.current = true;
    trackEvent(eventName("start"));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting.current) return;

    isSubmitting.current = true;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    setFormState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        trackEvent(eventName("error"), {
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
      trackEvent(eventName("submit"));
      setFormState({
        status: "success",
        message:
          "Thanks — your system details have been sent. We’ll be in touch.",
      });
    } catch {
      trackEvent(eventName("error"), { reason: "network" });
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
      className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-5 sm:p-8"
    >
      <input type="hidden" name="source" value={audience} />
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
          {audience === "agency" ? "Agency" : "Company / team (optional)"}
          <input
            name="agency"
            type="text"
            required={audience === "agency"}
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
          <select
            name="projectType"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
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
          placeholder="What is the system, what needs to work, and where is it currently blocked? Include the stack and any deadline."
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
          className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black outline-none transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:opacity-60"
        >
          {formState.status === "submitting"
            ? "Sending…"
            : "Send project details"}
        </button>

        <p className="text-sm text-neutral-500">
          Prefer email?{" "}
          <a
            href="mailto:pawan@hexcode.au?subject=Engineering%20engagement"
            onClick={() =>
              trackEvent(
                audience === "agency"
                  ? "agency_email_click"
                  : "contact_email_click",
              )
            }
            className="rounded-sm text-neutral-300 underline decoration-neutral-600 underline-offset-4 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            pawan@hexcode.au
          </a>
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
