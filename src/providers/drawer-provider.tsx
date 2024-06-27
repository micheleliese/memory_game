import React, { createContext, useState, ReactNode } from "react";

export interface DrawerContextProps {
  drawerWidth: number;
  mobileOpen: boolean;
  isClosing: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  handleDrawerToggle: () => void;
}

export const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const drawerWidth = 280;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <DrawerContext.Provider
      value={{
        drawerWidth,
        mobileOpen,
        isClosing,
        handleDrawerClose,
        handleDrawerTransitionEnd,
        handleDrawerToggle,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};


