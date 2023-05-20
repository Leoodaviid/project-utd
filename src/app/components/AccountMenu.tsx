import React from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

interface AccoutMenuProps {
  visible?: boolean;
}

export const AccountMenu = ({ visible }: AccoutMenuProps) => {
  const router = useRouter();

  const { data: user } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          {user?.user?.image ? (
            <Image
              width={100}
              height={100}
              className="w-8 rouded-md"
              src={user.user.image}
              alt=""
            />
          ) : (
            <Image className="w-8 rouded-md" src="" alt="" />
          )}
          <p className="text-white text-sm group-hover/item:underline">
            {user?.user?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => router.push("/upload")}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Upload New video
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          sign out VideoHub
        </div>
      </div>
    </div>
  );
};
