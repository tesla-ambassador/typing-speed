import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { RestartIcon } from "./icons";
import complete from "@/public/images/icon-completed.svg";

interface SuccessPageProps {
  wpm: number;
  accuracy: number;
  characters: number;
}

export default function SuccessPage({
  wpm,
  accuracy,
  characters,
}: SuccessPageProps) {
  return (
    <div className="w-full flex flex-col items-center mt-16 space-y-8">
      <Image src={complete} alt="Complete Icon" />
      <div className="space-y-2.5 text-center">
        <h1 className="text-[40px] tracking-[0.4px] leading-[136%] font-bold">
          Test Complete
        </h1>
        <p className="text-xl tracking-[-0.6px] leading-[120%] text-neutral-400">
          Solid run. Keep pushing to beat your highscore.
        </p>
      </div>
      <div className="w-full flex items-center gap-5 pt-5 pb-8 justify-center">
        <div className="border border-neutral-700 rounded-lg px-6 py-4 flex flex-col gap-1">
          <h2 className="text-xl tracking-[-0.6px] leading-[120%] text-neutral-400">
            WPM:
          </h2>
          <h3 className="text-2xl tracking-[0px] leading-[100%] font-bold">
            {wpm}
          </h3>
        </div>
        <div className="border border-neutral-700 rounded-lg px-6 py-4 flex flex-col gap-1">
          <h2 className="text-xl tracking-[-0.6px] leading-[120%] text-neutral-400">
            Accuracy:
          </h2>
          <h3 className="text-2xl tracking-[0px] leading-[100%] font-bold text-red-500">
            {accuracy}%
          </h3>
        </div>
        <div className="border border-neutral-700 rounded-lg px-6 py-4 flex flex-col gap-1">
          <h2 className="text-xl tracking-[-0.6px] leading-[120%] text-neutral-400">
            Characters:
          </h2>
          <h3 className="text-2xl tracking-[0px] leading-[100%] font-bold text-green-500">
            {characters}
            <span className="text-neutral-400">/</span>
            <span className="text-red-500">5</span>
          </h3>
        </div>
      </div>
      <div>
        <Button className="bg-white text-neutral-900 hover:bg-white hover:text-neutral-900 px-4 py-2.5 text-xl tracking-[-0.6px] leading-[120%] cursor-pointer">
          Go Again <RestartIcon className="fill-neutral-900" />
        </Button>
      </div>
    </div>
  );
}
