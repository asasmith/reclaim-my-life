import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

const supportedTypes = new Set(["homePage", "aboutPage", "contactPage", "registerPage"]);

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
  if (!documentType || !supportedTypes.has(documentType)) {
    return NextResponse.json({ message: "Unsupported document type" }, { status: 400 });
  }

  const pathsByType: Record<string, string> = {
    homePage: "/",
    aboutPage: "/about",
    contactPage: "/contact",
    registerPage: "/register",
  };

  const path = pathsByType[documentType];

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path });
}
