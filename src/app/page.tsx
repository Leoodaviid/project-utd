"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NavBar } from "../app/components/NavBar";

function Home() {
  const { data: user } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <NavBar />
    </>
  );
}

export default Home;
