"use client";
import React, { useCallback, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useRouter } from "next/navigation";
import { Input } from "../components/Input";

import axios from "axios";

export default function Upload() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [duration, setduration] = useState<string>("");

  const register = useCallback(async () => {
    try {
      await axios.post("/api/movies", {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        gender,
        duration,
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }, [title, description, videoUrl, thumbnailUrl, gender, duration]);

  return (
    <>
      <NavBar />
      <div className=" bg-white h-full w-full">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <div className="flex justify-center h-[100vh]">
            <div className="bg-black bg-opacity-70 px-10 py-16 self-center lg:w-4/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white  text-4xl mb-8 font-semibold">
                {/* {variant === "login" ? "Sign in" : "Register"} */}
                Insert New Video
              </h2>
              <div className="flex flex-col gap-4">
                <Input
                  label="Title"
                  onChange={(e: any) => setTitle(e.target.value)}
                  id="title"
                  type="text"
                  value={title}
                />
                <Input
                  label="Description"
                  onChange={(e: any) => setDescription(e.target.value)}
                  id="description"
                  type="text"
                  value={description}
                />
                <Input
                  label="Url"
                  onChange={(e: any) => setVideoUrl(e.target.value)}
                  id="videoUrl"
                  type="text"
                  value={videoUrl}
                />
                <Input
                  label="Cover"
                  onChange={(e: any) => setThumbnailUrl(e.target.value)}
                  id="thumbnailUrl"
                  type="text"
                  value={thumbnailUrl}
                />
                <Input
                  label="Gender"
                  onChange={(e: any) => setGender(e.target.value)}
                  id="gender"
                  type="text"
                  value={gender}
                />
                <Input
                  label="Duration"
                  onChange={(e: any) => setduration(e.target.value)}
                  id="duration"
                  type="text"
                  value={duration}
                />
              </div>
              <button
                onClick={register}
                className="bg-orange-500 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-600 transition"
              >
                Insert Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
