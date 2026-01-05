"use client";
import Image from "next/image";
import LogoLarge from "@/public/images/logo-large.svg";
import Trophy from "@/public/images/icon-personal-best.svg";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center mb-8">
      <div>
        <Image src={LogoLarge} alt="logo" />
      </div>
      <div className="flex items-center gap-2">
        <Image src={Trophy} alt="Personal best trophy" />
        <div>
          <p className="text-lg tracking-[-0.6px] leading-[120%] text-neutral-400">
            Personal best: <span className="text-foreground">92 WPM</span>
          </p>
        </div>
      </div>
    </header>
  );
}