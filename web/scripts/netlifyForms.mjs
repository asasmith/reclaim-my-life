const normalizeFieldKey = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

const CONTACT_FIELDS = [
  { name: "name", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "tel" },
  { name: "message", type: "textarea" },
];

const renderHiddenInput = (name, type = "text") =>
  `<input type="${type}" name="${name}" style="display: none" />`;

const renderHiddenTextarea = (name) =>
  `<textarea name="${name}" style="display: none"></textarea>`;

const renderContactInputs = () =>
  CONTACT_FIELDS.map((field) =>
    field.type === "textarea"
      ? renderHiddenTextarea(field.name)
      : renderHiddenInput(field.name, field.type)
  ).join("\n      ");

const renderRegistrationInputs = (fields) => {
  if (!fields.length) {
    throw new Error("Registration fields are required to generate Netlify forms.");
  }

  return fields.map((field) => renderHiddenInput(field)).join("\n      ");
};

const buildNetlifyFormsHtml = (registrationFields) => {
  const normalizedFields = registrationFields
    .map((field) => normalizeFieldKey(String(field ?? "")))
    .filter((field) => field.length > 0);
  const uniqueFields = Array.from(new Set(normalizedFields));

  if (uniqueFields.length === 0) {
    throw new Error("Registration fields are required to generate Netlify forms.");
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Netlify Forms</title>
  </head>
  <body>
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      style="display: none"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input
        id="bot-field"
        name="bot-field"
        type="text"
        tabindex="-1"
        autocomplete="off"
        style="display: none"
      />
      ${renderContactInputs()}
    </form>

    <form
      name="registration"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      style="display: none"
    >
      <input type="hidden" name="form-name" value="registration" />
      <input
        id="bot-field"
        name="bot-field"
        type="text"
        tabindex="-1"
        autocomplete="off"
        style="display: none"
      />
      ${renderRegistrationInputs(uniqueFields)}
    </form>
  </body>
</html>
`;
};

export { buildNetlifyFormsHtml, normalizeFieldKey };
