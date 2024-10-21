import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextProps {
  isSideBarOpen: boolean | null;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean | null>(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSideBarOpen(false);
      } else {
        setIsSideBarOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsSideBarOpen]);

  return (
    <AppContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the app context
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
