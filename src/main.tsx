import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { DrawerProvider } from "./providers/drawer-provider.tsx";
import { SocketProvider } from "./providers/socket-provider.tsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider
      maxSnack={3}
      TransitionProps={{ direction: "down" }}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <SocketProvider>
        <DrawerProvider>
          <App />
        </DrawerProvider>
      </SocketProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
