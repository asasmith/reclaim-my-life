"use client";

import { useRef, useState } from "react";

type SubmitStatus = "idle" | "success" | "error";

type ContactInfoError = string | null;

type ContactFormProps = Readonly<{
  formTitle: string;
}>;

export default function ContactForm({ formTitle }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfoError, setContactInfoError] = useState<ContactInfoError>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setContactInfoError(null);

    if (!formRef.current) {
      setIsSubmitting(false);
      setSubmitStatus("error");
      return;
    }

    const formData = new FormData(formRef.current);

    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!email && !phone) {
      setIsSubmitting(false);
      setContactInfoError("Please provide an email or phone number.");
      return;
    }

    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      params.append(key, String(value));
    });

    try {
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
      console.error("Contact submission failed", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactFieldChange = () => {
    if (!formRef.current) {
      return;
    }

    const email = formRef.current.querySelector<HTMLInputElement>("#email")?.value?.trim();
    const phone = formRef.current.querySelector<HTMLInputElement>("#phone")?.value?.trim();

    if (email || phone) {
      setContactInfoError(null);
    }
  };

  const contactInfoErrorId = "contact-info-error";
  const contactInfoInvalidAttributes = contactInfoError
    ? { "aria-invalid": true, "aria-describedby": contactInfoErrorId }
    : undefined;

  return (
    <div className="rounded-lg bg-surface p-8">
      <h2 className="text-2xl font-semibold text-foreground">
        {formTitle}
      </h2>
      <form
        ref={formRef}
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        <input type="hidden" name="form-name" value="contact" />
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

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-muted"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={handleContactFieldChange}
            {...contactInfoInvalidAttributes}
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-muted"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            onChange={handleContactFieldChange}
            {...contactInfoInvalidAttributes}
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {contactInfoError ? (
            <p
              id={contactInfoErrorId}
              role="alert"
              className="mt-2 text-sm text-muted"
            >
              {contactInfoError}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-4">
          {submitStatus !== "success" ? <div data-netlify-recaptcha="true"></div> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-accent px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-accent-secondary disabled:bg-border disabled:text-muted disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {submitStatus === "success" ? (
            <div className="rounded-md border border-accent-secondary bg-accent-secondary/10 px-4 py-3 text-foreground">
              <p className="text-base font-semibold">Thanks for reaching out.</p>
              <p className="mt-1 text-sm text-muted">
                We will respond within one business day.
              </p>
            </div>
          ) : null}
          {submitStatus === "error" ? (
            <p className="text-sm text-muted">
              We could not send your message. Please try again or contact us directly.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
