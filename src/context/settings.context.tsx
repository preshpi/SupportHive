import { createContext, ReactNode, useContext, useState } from "react";

type SettingsTabContextProps = {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

export const SettingsTabContext = createContext<
  SettingsTabContextProps | undefined
>(undefined);

export const SettingsTabProvider = ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <SettingsTabContext.Provider value={{ tab, setTab }}>
      {children}
    </SettingsTabContext.Provider>
  );
};

export function useSettingsTab() {
  const context = useContext(SettingsTabContext);

  if (!context) {
    throw new Error("useSettingsTab must be used within an AppProvider");
  }

  return context;
}
