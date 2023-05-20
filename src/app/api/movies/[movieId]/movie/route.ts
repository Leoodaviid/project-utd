import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
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

    const { movieId } = params;
    const deletedMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return NextResponse.json(deletedMovie);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
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

    const { movieId } = params;
    const deletedMovie = await prisma.movie.delete({
      where: {
        id: movieId,
      },
    });

    return NextResponse.json(deletedMovie);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
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

    const { movieId } = params;

    const body = await req.json();
    const editMovie = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        title: body.title as string,
        description: body.description,
        videoUrl: body.videoUrl,
        thumbnailUrl: body.thumbnailUrl,
        genre: body.genre,
        duration: body.duration,
        userId: user.id,
      },
    });

    return NextResponse.json(editMovie);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}
