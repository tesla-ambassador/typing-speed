import { createStore } from "zustand";

export type TestState = {
  highScore: number;
  startGame: boolean;
  mode: "Timed (60s)" | "Passage";
  difficulty: "Easy" | "Medium" | "Hard";
};

export type TestActions = {
  setHighScore: (newHighScore: number) => void;
  setStartGame: () => void;
  stopGame: () => void;
  setMode: (altMode: "Timed (60s)" | "Passage") => void;
  setDifficulty: (altDiff: "Easy" | "Medium" | "Hard") => void;
};

export type TestStore = TestState & TestActions;

export const defaultInitState: TestState = {
  highScore: 0,
  startGame: false,
  mode: "Timed (60s)",
  difficulty: "Easy",
};

export const createTestStore = (initState: TestState = defaultInitState) => {
  return createStore<TestStore>()((set) => ({
    ...initState,
    setHighScore: (newHighScore) => set(() => ({ highScore: newHighScore })),
    setStartGame: () => set(() => ({ startGame: true })),
    stopGame: () => set(() => ({ startGame: false })),
    setMode: (altMode) => set(() => ({ mode: altMode })),
    setDifficulty: (altDiff) => set(() => ({ difficulty: altDiff })),
  }));
};
