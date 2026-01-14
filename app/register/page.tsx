import type { Metadata } from "next";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "Register - Reclaim My Life",
  description: "Begin your journey to recovery. Register for our sober living home program.",
};

export default function Register() {
  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Start Your Journey
          </h1>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            Take the first step towards recovery. Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="mt-12">
          <RegistrationForm />
        </div>

        <div className="mt-12 rounded-lg bg-blue-50 p-6 dark:bg-slate-800">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            What Happens Next?
          </h2>
          <ul className="mt-4 space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>We'll review your application within 24 hours</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>A member of our team will contact you for an initial consultation</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>We'll discuss your needs and determine the best path forward</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">4.</span>
              <span>If approved, we'll work together to plan your move-in date</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
