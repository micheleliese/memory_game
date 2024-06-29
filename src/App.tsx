import { Box } from "@mui/material";
import CustomDrawer from "./components/custom-drawer";
import Board from "./components/board";
import Login from "./components/login";
import { useSocket } from "./providers/use-socket";

export default function App() {
  const { gameBoard, gameStarted, players } = useSocket();

  return (
    <Box width="100vw" height="100vh" bgcolor="lightgray">
      {gameStarted ? (
        <Box sx={{ display: "flex" }}>
          <Board gameBoard={gameBoard} />
          <CustomDrawer players={players} />
        </Box>
      ) : (
        <Login/>
      )}
    </Box>
  );
}
