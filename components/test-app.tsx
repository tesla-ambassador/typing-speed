"use client";
import { Separator } from "./ui/separator";
import { CustomRadioButtons } from "./radio-buttons";
import { useState, useRef, useEffect } from "react";
import { useTestStore } from "@/providers/test-store-provider";

import { Button } from "./ui/button";
import { RestartIcon } from "./icons";
import { clearInterval } from "timers";

export default function TestApp() {
  return (
    <>
      <TestBody />
    </>
  );
}

const TestDifficulty: string[] = ["Easy", "Medium", "Hard"];
const TestModes: string[] = ["Timed (60s)", "Passage"];

interface TestHeaderProps {
  wpm: number;
  accuracy: number;
  timer: number | string;
}
export function TestHeader({ wpm, accuracy, timer }: TestHeaderProps) {
  const { mode, difficulty } = useTestStore((state) => state);
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-3 h-5">
        <p className="text-neutral-400 leading-[120%] tracking-[-0.6px] text-xl">
          WPM: <span className="text-white font-semibold">{wpm}</span>
        </p>
        <Separator orientation="vertical" className="bg-neutral-500" />
        <p className="text-neutral-400 leading-[120%] tracking-[-0.6px] text-xl">
          Accuracy:{" "}
          <span className="text-white font-semibold">{accuracy}%</span>
        </p>
        <Separator orientation="vertical" className="bg-neutral-500" />
        <p className="text-neutral-400 leading-[120%] tracking-[-0.6px] text-xl">
          Time:{" "}
          {mode === "Timed (60s)" ? (
            <span className="text-white font-semibold">0:{timer}</span>
          ) : (
            <span className="text-white font-semibold">{timer}</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-3 h-8">
        <div className="flex items-center gap-3">
          <p className="text-neutral-400 leading-[120%] text-[16px] tracking-[-0.16px]">
            Difficulty:
          </p>
          <div className="flex items-center gap-2">
            {TestDifficulty.map((val, index) => (
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
            {TestModes.map((val, index) => (
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
  const TIME_LIMIT = 60;
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { mode, difficulty, stopTest } = useTestStore((state) => state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const newValue = e.target.value;

    if (newValue.length < userInput.length) {
      const deletedIndex = newValue.length;

      if (userInput[deletedIndex] === targetText[deletedIndex]) {
        return;
      }
    }

    if (newValue.length === targetText.length) {
      setIsComplete(true);
      stopTest();
    }

    setUserInput(newValue);
  };

  useEffect(() => {
    if (!startTime || isComplete) return;

    const interval = window.setInterval(() => {
      if (mode === "Timed (60s)") {
        // Countdown timer
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = TIME_LIMIT - elapsed;

        setTimeLeft(remaining);

        if (remaining <= 0) {
          setIsComplete(true);
          setTimeLeft(0);
        }
      } else {
        // Count up timer
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setCurrentTime(elapsed);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startTime, isComplete, mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateStats = () => {
    if (!startTime) return { wpm: 0, accuracy: 0 };
    const timeInSeconds = (Date.now() - startTime) / 1000;
    const characters = userInput.length;

    let correctCharacters = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctCharacters++;
      }
    }

    const wpm = Math.round(correctCharacters / 5 / (timeInSeconds / 60));
    const accuracy =
      userInput.length > 0
        ? Math.round((correctCharacters / characters) * 100)
        : 0;

    return { wpm, accuracy };
  };

  const resetTest = () => {
    setUserInput("");
    setCurrentTime(0);
    setIsComplete(false);
    setTimeLeft(TIME_LIMIT);
  };

  const { wpm, accuracy } = calculateStats();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <TestHeader
        wpm={wpm}
        accuracy={accuracy}
        timer={mode === "Timed (60s)" ? timeLeft : formatTime(currentTime)}
      />
      <Separator className="my-4 bg-neutral-500" />
      <div
        className="relative h-109.5 md:h-162 lg:h-135"
        onClick={() => inputRef.current?.focus()}
      >
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
          onChange={handleInputChange}
          onBlur={() => inputRef.current?.focus()}
          maxLength={targetText.length}
        />
      </div>
      <Separator className="my-4 bg-neutral-500" />
      <div className="w-full mt-8 flex justify-center">
        <Button
          className="cursor-pointer bg-neutral-800 hover:bg-neutral-800"
          onClick={resetTest}
        >
          Restart Test <RestartIcon />
        </Button>
      </div>
    </>
  );
}
