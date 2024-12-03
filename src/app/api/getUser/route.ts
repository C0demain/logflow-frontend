import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import UserCookie from "@/interfaces/userCookie";

export async function GET(): Promise<NextResponse<UserCookie>> {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value;

  const parsedUser = JSON.parse(user?.valueOf() || "{}");
  return NextResponse.json(parsedUser as UserCookie);
}
