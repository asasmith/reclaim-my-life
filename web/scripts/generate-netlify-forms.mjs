import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { buildNetlifyFormsHtml } from "./netlifyForms.mjs";

const getEnvValue = (key) => {
  const value = process.env[key];
  return value && value.length > 0 ? value : null;
};

const projectId =
  getEnvValue("SANITY_STUDIO_PROJECT_ID") || getEnvValue("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset =
  getEnvValue("SANITY_STUDIO_DATASET") || getEnvValue("NEXT_PUBLIC_SANITY_DATASET");
const apiVersion = getEnvValue("NEXT_PUBLIC_SANITY_API_VERSION");
const token = getEnvValue("SANITY_API_READ_TOKEN");

if (!projectId || !dataset || !apiVersion) {
  throw new Error("Missing Sanity environment variables for Netlify forms generation.");
}

const query = `*[_type == "registerPage"][0]{ formFields[]{ fieldKey } }`;
const url = new URL(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
);
url.searchParams.set("query", query);

const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
const response = await fetch(url, { headers });

if (!response.ok) {
  throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`);
}

const data = await response.json();
const formFields = data?.result?.formFields;

if (!Array.isArray(formFields) || formFields.length === 0) {
  throw new Error("Sanity registerPage formFields are missing or empty.");
}

const fieldKeys = formFields.map((field) => field?.fieldKey ?? "");
const html = buildNetlifyFormsHtml(fieldKeys);
const outputUrl = new URL("../public/netlify-forms.html", import.meta.url);

await writeFile(fileURLToPath(outputUrl), html, "utf8");
