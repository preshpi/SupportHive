import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextProps {
  viewCampaign: boolean | null;
  setViewCampaign: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const CampaignFormContext = createContext<AppContextProps | undefined>(
  undefined
);

export const ViewCampaignProvider = ({ children }: { children: ReactNode }) => {
  const [viewCampaign, setViewCampaign] = useState<boolean | null>(false);

  return (
    <CampaignFormContext.Provider value={{ viewCampaign, setViewCampaign }}>
      {children}
    </CampaignFormContext.Provider>
  );
};

// Custom hook to access the app context
export function useViewCampaignContext() {
  const context = useContext(CampaignFormContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
