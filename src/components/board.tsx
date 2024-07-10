import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import CustomAppBar from "./custom-app-bar";
import { useDrawer } from "../providers/use-drawer";
import { useSocket } from "../providers/use-socket";
import { PlayArrow } from "@mui/icons-material";
import GameCard from "./game-card";

export default function Board() {
  const { drawerWidth } = useDrawer();
  const { isHost, gameStarted, gameBoard, players, startGame, flipCard } = useSocket();

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
            <GameCard key={index} card={card} onClick={() => flipCard(index)} />
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
                <Box pt={5}>
                  <Typography variant="h5" textAlign="center">
                    Anfitrião do Jogo
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="h6" textAlign="center">
                  {players.length === 1
                    ? "Apenas você está no jogo"
                    : `Você e mais ${players.length - 1} jogadores estão no jogo`}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={startGame}
                  fullWidth
                  endIcon={<PlayArrow />}
                  disabled={players.length < 2}
                >
                  Iniciar o Jogo
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box height={48} />
          <CircularProgress />
          <Box height={16} />
          <Typography variant="h6">
            Aguardando o anfitrião iniciar o jogo
          </Typography>
          <Typography variant="h6">
            Você e mais {players.length - 1} jogadores estão no jogo
          </Typography>
        </Box>
      );
    }
  };
  return (
    <Box
      px={2}
      component={"main"}
      sx={{
        backgroundImage: `url("src/assets/background-board.png")`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <CustomAppBar />
      <Box height={64} />
      <Main />
    </Box>
  );
}
