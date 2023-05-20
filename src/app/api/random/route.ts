import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/auth");
  }
  try {
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400 });
  }
}
