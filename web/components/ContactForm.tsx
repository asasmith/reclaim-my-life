"use client";

import { useRef, useState } from "react";

type SubmitStatus = "idle" | "success" | "error";

type ContactFormProps = Readonly<{
  formTitle: string;
}>;

export default function ContactForm({ formTitle }: ContactFormProps) {
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

  return (
    <div className="rounded-lg bg-[color:var(--color-surface)] p-8">
      <h2 className="text-2xl font-semibold text-[color:var(--color-foreground)]">
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
            className="block text-sm font-medium text-[color:var(--color-muted)]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[color:var(--color-muted)]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)]"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[color:var(--color-muted)]"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)]"
          />
        </div>

        <div className="space-y-4">
          {submitStatus !== "success" ? <div data-netlify-recaptcha="true"></div> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[color:var(--color-accent)] px-4 py-2 font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-secondary)] disabled:bg-[color:var(--color-border)] disabled:text-[color:var(--color-muted)] disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {submitStatus === "success" ? (
            <div className="rounded-md border border-[color:var(--color-accent-secondary)] bg-[color:var(--color-accent-secondary)/0.1] px-4 py-3 text-[color:var(--color-foreground)]">
              <p className="text-base font-semibold">Thanks for reaching out.</p>
              <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                We will respond within one business day.
              </p>
            </div>
          ) : null}
          {submitStatus === "error" ? (
            <p className="text-sm text-[color:var(--color-muted)]">
              We could not send your message. Please try again or contact us directly.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
