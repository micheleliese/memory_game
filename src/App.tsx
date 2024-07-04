import { Box } from "@mui/material";
import CustomDrawer from "./components/custom-drawer";
import Board from "./components/board";
import Login from "./components/login";
import { useSocket } from "./providers/use-socket";

export default function App() {
  const { ready } = useSocket();

  return (
    <Box width="100vw" height="100vh">
      {ready ? (
        <Box sx={{ display: "flex" }}>
          <Board />
          <CustomDrawer />
        </Box>
      ) : (
        <Login/>
      )}
    </Box>
  );
}
