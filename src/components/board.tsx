import { Box, Button, Card, Grid, Typography } from "@mui/material";
import CustomAppBar from "./custom-app-bar";
import { useDrawer } from "../providers/use-drawer";
import { MemoryCard } from "../interfaces/card";
import { useSocket } from "../providers/use-socket";

interface BoardProps {
  gameBoard: Array<MemoryCard>;
}

export default function Board({ gameBoard }: BoardProps) {
  const { drawerWidth } = useDrawer();
  const { isHost, gameStarted, players, startGame } = useSocket();

  const Main = () => {
    if (gameStarted) {
      return (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems={"center"}
          spacing={2}
        >
          {gameBoard.map((card, index) => (
            <Grid key={index} item md={2}>
              <Card sx={{ background: "black" }}>
                <img src={card.image} alt="card" height={160} />
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    } else if (isHost) {
      return (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={4}>
            <Grid
              container
              direction="column"
              spacing={2}
              justifyContent="center"
            >
              <Grid item>
                <Typography variant="h4" textAlign="center">
                  {players.length} players waiting
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={startGame}
                  fullWidth
                >
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return <>Waiting for host to start the game, {players.length} players waiting</>;
    }
  };
  return (
    <Box
      px={2}
      component={"main"}
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <CustomAppBar />
      <Box height={64} />
      <Main />
    </Box>
  );
}
