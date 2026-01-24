"use client";

import { useRef, useState } from "react";

import type { RegisterFormField } from "@/lib/sanity/types";

type RegistrationFormProps = Readonly<{
  formFields: RegisterFormField[] | null | undefined;
  isPreview?: boolean;
  thankYou?: {
    title: string;
    message: string;
  };
}>;

type SubmitStatus = "idle" | "success" | "error";

// Keep in sync with normalizeFieldKey in studio/schemas/registerPage.ts.
const normalizeFieldKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

const isFullWidth = (type: RegisterFormField["type"]) =>
  type === "textarea" || type === "radio" || type === "checkbox";

const getNormalizedFields = (formFields: RegisterFormField[]) =>
  formFields
    .map((field) => ({
      ...field,
      normalizedKey: normalizeFieldKey(field.fieldKey || field.label || ""),
    }))
    .filter((field) => field.normalizedKey.length > 0);

export default function RegistrationForm({
  formFields,
  isPreview,
  thankYou,
}: RegistrationFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!formFields && isPreview) {
    return (
      <div className="rounded-lg bg-surface p-8 text-center text-muted">
        Loading draft form fields...
      </div>
    );
  }

  const fields = getNormalizedFields(formFields ?? []);

  if (fields.length === 0) {
    return (
      <div className="rounded-lg bg-surface p-8 text-center text-muted">
        Form fields are empty. Please add fields in the Register Page document.
      </div>
    );
  }

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

      const response = await fetch("/", {
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
      data-netlify-recaptcha="true"
      onSubmit={handleSubmit}
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
        {fields.map((field) => {
          const fieldId = field.normalizedKey;
          const requiredMark = field.required ? (
            <span className="text-accent">*</span>
          ) : null;
          const fieldWrapperClass = isFullWidth(field.type)
            ? "space-y-2 md:col-span-2"
            : "space-y-2";

          if (field.type === "textarea") {
            return (
              <div key={fieldId} className={fieldWrapperClass}>
                <label
                  htmlFor={fieldId}
                  className="block text-sm font-medium text-muted"
                >
                  {field.label} {requiredMark}
                </label>
                <textarea
                  id={fieldId}
                  name={fieldId}
                  rows={4}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {field.helpText ? (
                  <p className="text-sm text-muted">{field.helpText}</p>
                ) : null}
              </div>
            );
          }

          if (field.type === "select") {
            return (
              <div key={fieldId} className={fieldWrapperClass}>
                <label
                  htmlFor={fieldId}
                  className="block text-sm font-medium text-muted"
                >
                  {field.label} {requiredMark}
                </label>
                <select
                  id={fieldId}
                  name={fieldId}
                  required={field.required}
                  className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select an option</option>
                  {(field.options ?? []).map((option) => (
                    <option key={`${fieldId}-${option}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {field.helpText ? (
                  <p className="text-sm text-muted">{field.helpText}</p>
                ) : null}
              </div>
            );
          }

          if (field.type === "radio") {
            return (
              <fieldset key={fieldId} className={fieldWrapperClass}>
                <legend className="block text-sm font-medium text-muted">
                  {field.label} {requiredMark}
                </legend>
                <div className="mt-3 space-y-2">
                  {(field.options ?? []).map((option, index) => {
                    const optionId = `${fieldId}-${index}`;
                    return (
                      <label key={optionId} className="flex items-center gap-3">
                        <input
                          id={optionId}
                          type="radio"
                          name={fieldId}
                          value={option}
                          required={field.required && index === 0}
                          className="h-4 w-4 border-border text-accent focus:ring-accent"
                        />
                        <span className="text-foreground">{option}</span>
                      </label>
                    );
                  })}
                </div>
                {field.helpText ? (
                  <p className="mt-2 text-sm text-muted">{field.helpText}</p>
                ) : null}
              </fieldset>
            );
          }

          if (field.type === "checkbox") {
            return (
              <div key={fieldId} className={fieldWrapperClass}>
                <label className="flex items-start gap-3">
                  <input
                    id={fieldId}
                    type="checkbox"
                    name={fieldId}
                    value="yes"
                    required={field.required}
                    className="self-center h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm font-medium text-muted">
                    {field.label} {requiredMark}
                  </span>
                </label>
                {field.helpText ? (
                  <p className="text-sm text-muted">{field.helpText}</p>
                ) : null}
              </div>
            );
          }

          return (
            <div key={fieldId} className={fieldWrapperClass}>
              <label
                htmlFor={fieldId}
                className="block text-sm font-medium text-muted"
              >
                {field.label} {requiredMark}
              </label>
              <input
                id={fieldId}
                type={field.type}
                name={fieldId}
                required={field.required}
                placeholder={field.placeholder}
                className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {field.helpText ? (
                <p className="text-sm text-muted">{field.helpText}</p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {submitStatus !== "success" ? <div data-netlify-recaptcha="true"></div> : null}
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
