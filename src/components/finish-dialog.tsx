import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import { Player } from "../interfaces/player";

interface FinishDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  playAgain: () => void;
  players: Array<Player>;
}

export default function FinishDialog({
  isOpen,
  handleClose,
  playAgain,
  players,
}: FinishDialogProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth={"md"} fullWidth>
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
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
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
                  {player.victories === 0
                    ? 0
                    : [...Array(player.victories)].map((_, index) => (
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
      <DialogActions>
        <Grid container spacing={2} direction="row" justifyContent="center">
          <Grid item md={6}>
            <Button fullWidth variant="contained" onClick={handleClose}>
              Sair
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button fullWidth variant="contained" onClick={playAgain}>
              Jogar novamente
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
