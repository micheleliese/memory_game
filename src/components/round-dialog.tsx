import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface RoundDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
}

export default function RoundDialog({
  isOpen,
  handleClose,
  message,
}: RoundDialogProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth={"sm"} fullWidth>
      <DialogTitle variant="h5" fontWeight={"bold"} textAlign={"center"}>
        Fim da Rodada!
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
  );
}
