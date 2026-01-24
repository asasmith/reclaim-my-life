import type { Metadata } from "next";
import { draftMode } from "next/headers";
import RegistrationForm from "@/components/RegistrationForm";
import { getRegisterPage } from "@/lib/sanity/queries";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const registerPage = await getRegisterPage({ preview: isEnabled });

  if (!registerPage?.seo) {
    return {
      title: "Register - Reclaim My Life",
      description: "Begin your journey to recovery. Register for our sober living home program.",
    };
  }

  return {
    title: registerPage.seo.metaTitle || "Register - Reclaim My Life",
    description:
      registerPage.seo.metaDescription ||
      "Begin your journey to recovery. Register for our sober living home program.",
    openGraph: {
      title: registerPage.seo.metaTitle || "Register - Reclaim My Life",
      description: registerPage.seo.metaDescription || "",
      images: registerPage.seo.ogImage?.asset?.url
        ? [registerPage.seo.ogImage.asset.url]
        : [],
    },
  };
}

export default async function Register() {
  const { isEnabled } = await draftMode();
  const registerPage = await getRegisterPage({ preview: isEnabled });

  if (!registerPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Content not available
          </h1>
          <p className="mt-2 text-muted">
            Please check back later or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">
            {registerPage.title}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {registerPage.subtitle}
          </p>
        </div>

        <div className="mt-12">
          <RegistrationForm
            formFields={registerPage.formFields}
            isPreview={isEnabled}
            thankYou={registerPage.thankYou}
          />
        </div>

        <div className="mt-12 rounded-lg bg-surface p-6">
          <h2 className="text-xl font-semibold text-foreground">
            {registerPage.nextSteps.title}
          </h2>
          <ul className="mt-4 space-y-3 text-muted">
            {registerPage.nextSteps.steps.map((step, index) => (
              <li key={`${step.description}-${index}`} className="flex items-start">
                <span className="mr-2">{index + 1}.</span>
                <span>{step.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
