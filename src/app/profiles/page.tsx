"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useCallback } from "react";
import ImageBlue from "@/../public/img/default-blue.png";
import ImageRed from "@/../public/img/default-red.png";
import ImageGreen from "@/../public/img/default-green.png";
import ImageSlate from "@/../public/img/default-slate.png";

const images = [ImageBlue, ImageRed, ImageGreen, ImageSlate];

interface UserCardProps {
  name: string;
}

const UserCard = ({ name }: UserCardProps) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <Image
          width={100}
          height={100}
          draggable={false}
          className="w-max h-max object-contain"
          src={imgSrc}
          alt=""
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};

const Profiles = () => {
  const router = useRouter();

  const { data: currentUser } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex flex-center justify-center items-center h-[100vh]">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard name={currentUser?.user?.name!!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
