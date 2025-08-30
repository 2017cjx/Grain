import { NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";

export const runtime = "nodejs";

export async function GET() {
  const [users, accounts, sessions] = await Promise.all([
    prisma.user.count(),
    prisma.account.count(),
    prisma.session.count(),
  ]);
  return NextResponse.json({ users, accounts, sessions });
}
