import { useContext } from "react";
import { DrawerContextProps, DrawerContext } from "./drawer-provider";

export const useDrawer = (): DrawerContextProps => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
