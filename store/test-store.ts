import { createStore } from "zustand";

export type TestState = {
  highScore: number;
  startTest: boolean;
  mode: string;
  difficulty: string;
};

export type TestActions = {
  setHighScore: (newHighScore: number) => void;
  setStartTest: () => void;
  stopTest: () => void;
  setMode: (altMode: string) => void;
  setDifficulty: (altDiff: string) => void;
};

export type TestStore = TestState & TestActions;

export const defaultInitState: TestState = {
  highScore: 0,
  startTest: false,
  mode: "Timed (60s)",
  difficulty: "Easy",
};

export const createTestStore = (initState: TestState = defaultInitState) => {
  return createStore<TestStore>()((set) => ({
    ...initState,
    setHighScore: (newHighScore) => set(() => ({ highScore: newHighScore })),
    setStartTest: () => set(() => ({ startTest: true })),
    stopTest: () => set(() => ({ startTest: false })),
    setMode: (altMode) => set(() => ({ mode: altMode })),
    setDifficulty: (altDiff) => set(() => ({ difficulty: altDiff })),
  }));
};
