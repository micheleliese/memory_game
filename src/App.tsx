import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomDrawer from "./components/custom-drawer";
import Board from "./components/board";
import Login from "./components/login";
import { useSocket } from "./providers/use-socket";

export default function App() {
  const { ready, isOpen, handleClose, message } = useSocket();

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

      <Dialog open={isOpen} onClose={handleClose} maxWidth={"sm"} fullWidth>
        <DialogTitle variant="h5" fontWeight={"bold"} textAlign={"center"}>
          Fim de Jogo!
        </DialogTitle>
        <DialogContent>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box height={24} />
            <Box
              component={"img"}
              src={
                message.includes("ganho")
                  ? "src/assets/champion_icon.png"
                  : "src/assets/tie.png"
              }
              height={128}
              width={128}
            />
            <Box height={48} />
            <DialogContentText variant="h6">{message}</DialogContentText>
          </Box>
        </DialogContent>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button variant="contained" onClick={handleClose}>
            Fechar e continuar
          </Button>
        </Box>
        <Box height={16} />
      </Dialog>
    </>
  );
}
