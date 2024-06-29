import { useContext } from "react";
import { SocketContext, SocketContextProps } from "./socket-provider";

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
