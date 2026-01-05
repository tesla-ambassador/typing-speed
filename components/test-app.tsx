"use client";
import { Separator } from "./ui/separator";
import { CustomRadioButtons } from "./radio-buttons";
import { useState, useRef, useEffect } from "react";

export default function TestApp() {
  return (
    <>
      <TestHeader />
      <Separator className="my-4 bg-neutral-500" />
      <TestBody />
    </>
  );
}

const difficulty: string[] = ["Easy", "Medium", "Hard"];
const modes: string[] = ["Timed (60s)", "Passage"];

export function TestHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-3 h-5">
        <p className="text-neutral-400 leading-[120%] tracking-[-0.6px] text-xl">
          WPM: <span className="text-white font-semibold">0</span>
        </p>
        <Separator orientation="vertical" className="bg-neutral-500" />
        <p className="text-neutral-400 leading-[120%] tracking-[-0.6px] text-xl">
          Accuracy: <span className="text-white font-semibold">100%</span>
        </p>
        <Separator orientation="vertical" className="bg-neutral-500" />
        <p className="text-neutral-400 leading-[120%] tracking-[-0.6px] text-xl">
          Time: <span className="text-white font-semibold">0:60</span>
        </p>
      </div>
      <div className="flex items-center gap-3 h-8">
        <div className="flex items-center gap-3">
          <p className="text-neutral-400 leading-[120%] text-[16px] tracking-[-0.16px]">
            Difficulty:
          </p>
          <div className="flex items-center gap-2">
            {difficulty.map((val, index) => (
              <CustomRadioButtons
                key={index}
                value={val}
                name="difficulty"
                defaultValue="Easy"
              />
            ))}
          </div>
        </div>
        <Separator orientation="vertical" className="bg-neutral-500" />
        <div className="flex items-center gap-3">
          <p className="text-neutral-400 leading-[120%] text-[16px] tracking-[-0.16px]">
            Mode:
          </p>
          <div className="flex items-center gap-2">
            {modes.map((val, index) => (
              <CustomRadioButtons
                key={index}
                value={val}
                name="mode"
                defaultValue="Timed (60s)"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestBody() {
  const [targetText] = useState<string>(
    "Drake is the goat and it's not even debatable @ 101."
  );
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="relative" onClick={() => inputRef.current?.focus()}>
      <div className="text-[40px] tracking-[0.4px] leading-[136%]">
        {targetText.split("").map((char, index) => {
          let colorClass = "text-neutral-400";
          let displayChar = char;

          if (index < userInput.length) {
            const isCorrect = userInput[index] === char;
            colorClass = isCorrect ? "text-green-500" : "text-red-500";

            if (!isCorrect && displayChar === " ") {
              displayChar = "_";
              colorClass = "bg-red-500/30";
            }
          }

          if (index === userInput.length) {
            colorClass = "bg-neutral-500/50 rounded-sm";
          }

          return (
            <span key={index} className={colorClass}>
              {char}
            </span>
          );
        })}
      </div>
      <input
        className="absolute opacity-0 pointer-events-none"
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onBlur={() => inputRef.current?.focus()}
        maxLength={targetText.length}
      />
    </div>
  );
}
