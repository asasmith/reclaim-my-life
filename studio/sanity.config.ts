import { createElement } from "react";
import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const previewBaseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

function buildPreviewUrl(type: string) {
  if (!previewSecret) {
    return previewBaseUrl;
  }

  const url = new URL("/api/preview", previewBaseUrl);
  url.searchParams.set("secret", previewSecret);
  url.searchParams.set("type", type);
  return url.toString();
}

function createPreviewFrame(type: string) {
  const url = buildPreviewUrl(type);

  return createElement("iframe", {
    src: url,
    style: { width: "100%", height: "100%", border: "none" },
    title: "Preview",
  });
}

export default defineConfig({
  name: "default",
  title: "Reclaim My Life CMS",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title("Content")
          .items([
            // Singleton for Site Settings
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            // Singleton for Home Page
            S.listItem()
              .title("Home Page")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .views([
                    S.view.form(),
                    S.view
                      .component(() => createPreviewFrame("homePage"))
                      .title("Preview"),
                  ])
              ),
            S.listItem()
              .title("About Page")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .views([
                    S.view.form(),
                    S.view
                      .component(() => createPreviewFrame("aboutPage"))
                      .title("Preview"),
                  ])
              ),
            S.listItem()
              .title("Contact Page")
              .child(
                S.document()
                  .schemaType("contactPage")
                  .documentId("contactPage")
                  .views([
                    S.view.form(),
                    S.view
                      .component(() => createPreviewFrame("contactPage"))
                      .title("Preview"),
                  ])
              ),
            S.listItem()
              .title("Register Page")
              .child(
                S.document()
                  .schemaType("registerPage")
                  .documentId("registerPage")
                  .views([
                    S.view.form(),
                    S.view
                      .component(() => createPreviewFrame("registerPage"))
                      .title("Preview"),
                  ])
              ),
            // Divider
            S.divider(),
            // Rest of the content types (for future expansion)
            ...S.documentTypeListItems().filter(
              (listItem) =>
                ![
                  "siteSettings",
                  "homePage",
                  "aboutPage",
                  "contactPage",
                  "registerPage",
                ].includes(listItem.getId() ?? "")
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
