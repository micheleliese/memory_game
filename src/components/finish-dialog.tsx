import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  Typography,
} from "@mui/material";
import { Player } from "../interfaces/player";

interface FinishDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  players: Array<Player>;
}

export default function FinishDialog({
  isOpen,
  handleClose,
  players,
}: FinishDialogProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth={"lg"} fullWidth>
      <DialogTitle variant="h5" fontWeight={"bold"} textAlign={"center"}>
        Fim de Jogo!
      </DialogTitle>
      <DialogContent>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"stretch"}
        >
          {players.sort((a, b) => b.score - a.score).map((player, index) => (
            <ListItem
              key={index}
              sx={{
                margin: 1,
                pl: 1,
                pr: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                borderRadius: 8,
              }}
            >
              <Avatar>
                <Typography color={"white"}>{player.name[0]}</Typography>
              </Avatar>
              <Typography variant="body1" fontWeight={"bold"}>
                {player.name}
              </Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                {player.victories === 0 ? 0 : [...Array(player.victories)].map((_, index) => (
                  <Box
                    ml={1}
                    key={index}
                    component={"img"}
                    src={"src/assets/champion_icon.png"}
                    height={32}
                    width={32}
                  />
                ))}
              </Typography>
            </ListItem>
          ))}
        </Box>
      </DialogContent>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button variant="contained" onClick={handleClose}>
          Fechar e sair
        </Button>
      </Box>
      <Box height={16} />
    </Dialog>
  );
}
