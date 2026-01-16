import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

const SECRET = process.env.PREVIEW_SECRET;

const pathsByType: Record<string, string> = {
  homePage: "/",
  aboutPage: "/about",
  contactPage: "/contact",
  registerPage: "/register",
};

export async function GET(request: Request) {
  if (!SECRET) {
    return NextResponse.json({ message: "Missing PREVIEW_SECRET" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const type = searchParams.get("type");

  if (secret !== SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!type || !pathsByType[type]) {
    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  }

  const path = pathsByType[type];

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(path, request.url));
}
