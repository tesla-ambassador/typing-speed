"use client";
import { useStore } from "zustand";
import { useState, ReactNode, useContext, createContext } from "react";
import { createTestStore, type TestStore } from "@/store/test-store";

export type TestStoreAPI = ReturnType<typeof createTestStore>;

export const TestStoreContext = createContext<TestStoreAPI | undefined>(
  undefined
);

interface TestStoreProviderProps {
  children: ReactNode;
}

export const TestStoreProvider = ({ children }: TestStoreProviderProps) => {
  const [store] = useState(() => createTestStore());
  return (
    <TestStoreContext.Provider value={store}>
      {children}
    </TestStoreContext.Provider>
  );
};

export const useTestStore = <T,>(selector: (store: TestStore) => T): T => {
  const testStoreContext = useContext(TestStoreContext);

  if (!testStoreContext) {
    throw new Error(
      `You can't use TestStoreContext outside of the TestStoreProvider`
    );
  }

  return useStore(testStoreContext, selector);
};
