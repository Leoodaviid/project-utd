import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/auth");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) {
      return NextResponse.json({ status: 400, message: "User not found" });
    }

    const movies = await prisma.movie.findMany({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/auth");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) {
      return NextResponse.json({ status: 400, message: "User not found" });
    }

    const newMovie = await prisma.movie.create({
      data: {
        title: body.title as string,
        description: body.description,
        videoUrl: body.videoUrl,
        thumbnailUrl: body.thumbnailUrl,
        gender: body.gender,
        duration: body.duration,
        userId: user.id,
      },
    });

    return NextResponse.json(newMovie);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}
