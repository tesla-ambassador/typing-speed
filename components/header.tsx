"use client";
import Image from "next/image";
import { useRef } from "react";
import LogoLarge from "@/public/images/logo-large.svg";
import Trophy from "@/public/images/icon-personal-best.svg";
import { useTestStore } from "@/providers/test-store-provider";

export default function Header() {
  const { highScore } = useTestStore((state) => state);
  return (
    <header className="w-full flex justify-between items-center mb-8">
      <div>
        <Image src={LogoLarge} alt="logo" />
      </div>
      {highScore > 0 && (
        <div className="flex items-center gap-2">
          <Image src={Trophy} alt="Personal best trophy" />
          <div>
            <p className="text-lg tracking-[-0.6px] leading-[120%] text-neutral-400">
              Personal best:{" "}
              <span className="text-foreground">{highScore} WPM</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
