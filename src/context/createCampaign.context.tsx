import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextProps {
  showForm: boolean | null;
  setShowForm: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const CampaignFormContext = createContext<AppContextProps | undefined>(
  undefined
);

export const CampaignFormProvider = ({ children }: { children: ReactNode }) => {
  const [showForm, setShowForm] = useState<boolean | null>(false);

  return (
    <CampaignFormContext.Provider value={{ showForm, setShowForm }}>
      {children}
    </CampaignFormContext.Provider>
  );
};

// Custom hook to access the app context
export function useAppContext() {
  const context = useContext(CampaignFormContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
