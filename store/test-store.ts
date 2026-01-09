import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { Results } from "@/types/resuts";

export type TestState = {
  highScore: number;
  startTest: boolean;
  finishTest: boolean;
  mode: string;
  difficulty: string;
  score: Results;
};

export type TestActions = {
  setHighScore: (newHighScore: number) => void;
  setStartTest: () => void;
  stopTest: () => void;
  setMode: (altMode: string) => void;
  setDifficulty: (altDiff: string) => void;
  setScore: (newScore: Results) => void;
  resetTest: () => void;
};

export type TestStore = TestState & TestActions;

export const defaultInitState: TestState = {
  highScore: 0,
  startTest: false,
  finishTest: false,
  mode: "Timed (60s)",
  difficulty: "Easy",
  score: {
    wpm: 0,
    accuracy: 0,
    characters: 0,
  },
};

export const createTestStore = (initState: TestState = defaultInitState) => {
  return createStore<TestStore>()((set) => ({
    ...initState,
    setHighScore: (newHighScore) => set(() => ({ highScore: newHighScore })),
    setStartTest: () => set(() => ({ startTest: true })),
    stopTest: () => set(() => ({ startTest: false, finishTest: true })),
    setMode: (altMode) => set(() => ({ mode: altMode })),
    setDifficulty: (altDiff) => set(() => ({ difficulty: altDiff })),
    setScore: (newScore) => set(() => ({ score: newScore })),
    resetTest: () => set(() => ({ finishTest: false })),
  }));
};
