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
  Stack,
  Typography,
} from "@mui/material";
import { Player } from "../interfaces/player";
import { useSocket } from "../providers/use-socket";

interface FinishDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  playAgain: () => void;
  players: Array<Player>;
}

export default function FinishDialog({ isOpen, handleClose, playAgain, players }: FinishDialogProps) {
  const { getWinner } = useSocket();
  const winner = getWinner();
  const avatarSize = 96;
  const iconSize = avatarSize * 0.75; 
  
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
          <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
            <Avatar
              sx={{ width: avatarSize, height: avatarSize }}
            >
              <Typography color={"white"}>{winner?.name}</Typography>
            </Avatar>
            <Box
              ml={1}
              component={"img"}
              src={"src/assets/champion_icon.png"}
              height={iconSize}
              width={iconSize}
            />
          </Stack>
          <Box height={24} />
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
                  {player.acumulatedScore}
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
