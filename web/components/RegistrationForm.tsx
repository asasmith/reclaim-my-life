"use client";

import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  preferredMoveInDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  referralSource: string;
  additionalInfo: string;
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    preferredMoveInDate: "",
    emergencyContact: "",
    emergencyPhone: "",
    referralSource: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Replace with actual form submission service (Formspree, Web3Forms, etc.)
      console.log("Form data:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus("success");
      
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        preferredMoveInDate: "",
        emergencyContact: "",
        emergencyPhone: "",
        referralSource: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-lg bg-[color:var(--color-surface)] p-8">
      {/* Personal Information */}
      <div>
        <h2 className="text-2xl font-semibold text-[color:var(--color-foreground)]">
          Personal Information
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              First Name <span className="text-[color:var(--color-accent)]">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Last Name <span className="text-[color:var(--color-accent)]">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Email <span className="text-[color:var(--color-accent)]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Phone Number <span className="text-[color:var(--color-accent)]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Date of Birth <span className="text-[color:var(--color-accent)]">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="preferredMoveInDate"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Preferred Move-In Date
            </label>
            <input
              type="date"
              id="preferredMoveInDate"
              name="preferredMoveInDate"
              value={formData.preferredMoveInDate}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h2 className="text-2xl font-semibold text-[color:var(--color-foreground)]">
          Emergency Contact
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="emergencyContact"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Emergency Contact Name <span className="text-[color:var(--color-accent)]">*</span>
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              required
              value={formData.emergencyContact}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="emergencyPhone"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Emergency Contact Phone <span className="text-[color:var(--color-accent)]">*</span>
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              name="emergencyPhone"
              required
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h2 className="text-2xl font-semibold text-[color:var(--color-foreground)]">
          Additional Information
        </h2>
        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="referralSource"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              How did you hear about us?
            </label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            >
              <option value="">Select an option</option>
              <option value="search">Search Engine</option>
              <option value="social">Social Media</option>
              <option value="referral">Friend/Family Referral</option>
              <option value="professional">Healthcare Professional</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-[color:var(--color-muted)]"
            >
              Additional Information or Questions
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              rows={4}
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Please share anything else you'd like us to know..."
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
            />
          </div>
        </div>
      </div>

      {/* Submit Button and Status Messages */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-[color:var(--color-accent)] px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-secondary)] disabled:bg-[color:var(--color-border)] disabled:text-[color:var(--color-muted)] disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>

        {submitStatus === "success" && (
          <div
            className="mt-4 rounded-md bg-[color:var(--color-surface)] p-4 text-[color:var(--color-foreground)]"
            data-testid="registration-success"
          >
            Thank you for your registration! We'll contact you within 24 hours.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 rounded-md bg-[color:var(--color-surface)] p-4 text-[color:var(--color-foreground)]">
            There was an error submitting your registration. Please try again or contact us directly.
          </div>
        )}
      </div>
    </form>
  );
}
