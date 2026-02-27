"use client";

import { useRef, useState } from "react";

type RegistrationFormProps = Readonly<{
  thankYou?: {
    title: string;
    message: string;
  };
}>;

type SubmitStatus = "idle" | "success" | "error";

export default function RegistrationForm({ thankYou }: RegistrationFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    if (!formRef.current) {
      setIsSubmitting(false);
      setSubmitStatus("error");
      return;
    }

    const formData = new FormData(formRef.current);

    try {
      const params = new URLSearchParams();

      formData.forEach((value, key) => {
        params.append(key, String(value));
      });

      const response = await fetch("/netlify-forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      formRef.current.reset();
      setSubmitStatus("success");
    } catch (error) {
      console.error("Registration submission failed", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      name="registration"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      action="/netlify-forms.html"
      className="space-y-8 rounded-lg bg-surface p-8"
    >
      <input type="hidden" name="form-name" value="registration" />
      <label
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        htmlFor="bot-field"
      >
        Do not fill this out
      </label>
      <input
        id="bot-field"
        name="bot-field"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-muted">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Name"
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date-of-birth" className="block text-sm font-medium text-muted">
            Date of Birth <span className="text-accent">*</span>
          </label>
          <input
            id="date-of-birth"
            name="date-of-birth"
            type="date"
            required
            placeholder="Date of Birth"
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone-number" className="block text-sm font-medium text-muted">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            id="phone-number"
            name="phone-number"
            type="tel"
            required
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="drug-of-choice"
            className="block text-sm font-medium text-muted"
          >
            My drug(s) of choice (including alcohol) are <span className="text-accent">*</span>
          </label>
          <textarea
            id="drug-of-choice"
            name="drug-of-choice"
            rows={4}
            required
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <fieldset className="space-y-2 md:col-span-2">
          <legend className="block text-sm font-medium text-muted">
            I am a drug addict or an alcoholic? <span className="text-accent">*</span>
          </legend>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-3">
              <input
                id="drug-addict-alcoholic-yes"
                type="radio"
                name="drug-addict-alcoholic"
                value="Yes"
                required
                className="h-4 w-4 border-border text-accent focus:ring-accent"
              />
              <span className="text-foreground">Yes</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                id="drug-addict-alcoholic-no"
                type="radio"
                name="drug-addict-alcoholic"
                value="No"
                className="h-4 w-4 border-border text-accent focus:ring-accent"
              />
              <span className="text-foreground">No</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-2 md:col-span-2">
          <legend className="block text-sm font-medium text-muted">
            Sex Offender <span className="text-accent">*</span>
          </legend>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-3">
              <input
                id="sex-offender-yes"
                type="radio"
                name="sex-offender"
                value="Yes"
                required
                className="h-4 w-4 border-border text-accent focus:ring-accent"
              />
              <span className="text-foreground">Yes</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                id="sex-offender-no"
                type="radio"
                name="sex-offender"
                value="No"
                className="h-4 w-4 border-border text-accent focus:ring-accent"
              />
              <span className="text-foreground">No</span>
            </label>
          </div>
        </fieldset>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="medications" className="block text-sm font-medium text-muted">
            Medications, including doses, I am currently taking?
          </label>
          <textarea
            id="medications"
            name="medications"
            rows={4}
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="court-dates" className="block text-sm font-medium text-muted">
            Upcoming court dates, probation, drug court, pre-trial, etc:
          </label>
          <textarea
            id="court-dates"
            name="court-dates"
            rows={4}
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="emergency-contact-name"
            className="block text-sm font-medium text-muted"
          >
            Emergency Contact Name <span className="text-accent">*</span>
          </label>
          <input
            id="emergency-contact-name"
            name="emergency-contact-name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="emergency-contact-phone"
            className="block text-sm font-medium text-muted"
          >
            Emergency Contact Phone
          </label>
          <input
            id="emergency-contact-phone"
            name="emergency-contact-phone"
            type="tel"
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-start gap-3">
            <input
              id="twelve-step-agreement"
              type="checkbox"
              name="twelve-step-agreement"
              value="yes"
              required
              className="self-center h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm font-medium text-muted">
              I understand that Twelve-Step Recovery is a MUST to stay here
              <span className="text-accent">*</span>
            </span>
          </label>
        </div>

        <div className="space-y-2">
          <label htmlFor="todays-date" className="block text-sm font-medium text-muted">
            Today&apos;s Date <span className="text-accent">*</span>
          </label>
          <input
            id="todays-date"
            name="todays-date"
            type="date"
            required
            placeholder="Today&apos;s Date"
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-accent px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-accent-secondary disabled:bg-border disabled:text-muted disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
        {submitStatus === "success" ? (
          <div className="rounded-md border border-accent-secondary bg-accent-secondary/10 px-4 py-3 text-foreground">
            <p className="text-base font-semibold">
              {thankYou?.title ?? "Thank you for registering."}
            </p>
            <p className="mt-1 text-sm text-muted">
              {thankYou?.message ?? "We'll reach out within 24 hours to confirm next steps."}
            </p>
          </div>
        ) : null}
        {submitStatus === "error" ? (
          <p className="text-sm text-muted">
            We couldn't submit your registration. Please try again or contact us directly.
          </p>
        ) : null}
      </div>
    </form>
  );
}
