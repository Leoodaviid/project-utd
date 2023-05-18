import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
