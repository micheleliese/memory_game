import { Box } from "@mui/material";
import CustomDrawer from "./components/custom-drawer";
import Board from "./components/board";
import Login from "./components/login";
import { useSocket } from "./providers/use-socket";
import RoundDialog from "./components/round-dialog";
import FinishDialog from "./components/finish-dialog";

export default function App() {
  const { ready, isOpen, isOpenFinishDialog, handleClose, handleCloseFinishDialog, playAgain, message, players } = useSocket();

  return (
    <>
      <Box width="100vw" height="100vh">
        {ready ? (
          <Box sx={{ display: "flex" }}>
            <Board />
            <CustomDrawer />
          </Box>
        ) : (
          <Login />
        )}
      </Box>

      <RoundDialog
        isOpen={isOpen}
        handleClose={handleClose}
        message={message}
      />

      {isOpenFinishDialog && <FinishDialog
        isOpen={isOpenFinishDialog}
        handleClose={handleCloseFinishDialog}
        playAgain={playAgain}
        players={players}
      />}
    </>
  );
}
