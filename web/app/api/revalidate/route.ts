import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

const pathsByType = {
  homePage: ["/"],
  aboutPage: ["/about"],
  contactPage: ["/contact"],
  registerPage: ["/register"],
  siteSettings: ["/", "/about", "/contact", "/register"],
} as const;

type DocumentType = keyof typeof pathsByType;


export async function POST(request: Request) {
  if (!SECRET) {
    return NextResponse.json({ message: "Missing REVALIDATE_SECRET" }, { status: 500 });
  }

  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload: { _type?: string } | undefined;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const documentType = payload?._type;
  if (!documentType || !Object.hasOwn(pathsByType, documentType)) {
    return NextResponse.json({ message: "Unsupported document type" }, { status: 400 });
  }

  const paths = pathsByType[documentType as DocumentType];

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}
