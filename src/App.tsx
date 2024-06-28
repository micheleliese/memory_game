import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CustomDrawer from "./components/custom-drawer";
import Board from "./components/board";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3000");

export default function App() {
  const [gameBoard, setGameBoard] = useState<Array<any>>([]);
  const [players, setPlayers] = useState<Array<any>>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    socket.on("gameJoined", ({ success, gameBoard, players }) => {
      if (success) {
        setGameBoard(gameBoard);
        setPlayers(players);
        setGameStarted(true);
      }
    });

    socket.on("playerJoined", (players) => {
      setPlayers(players);
    });

    socket.on("startGame", (gameBoard) => {
      setGameBoard(gameBoard);
      setGameStarted(true);
    });

    socket.on("playerLeft", (players) => {
      setPlayers(players);
    });

    socket.on("cardFlipped", ({ cardIndex, card }) => {
      setGameBoard((prevBoard) => {
        const newBoard: Array<any> = [...prevBoard];
        newBoard[cardIndex] = card;
        return newBoard;
      });
    });

    socket.on("gameStopped", () => {
      setGameStarted(false);
    });

    return () => {
      socket.off("gameJoined");
      socket.off("playerJoined");
      socket.off("startGame");
      socket.off("playerLeft");
      socket.off("cardFlipped");
      socket.off("gameStopped");
    };
  }, []);

  const joinGame = () => {
    socket.emit("joinGame", playerName);
    setGameStarted(true);
  };

  return gameStarted ? (
    <Box width="100vw" height="100vh" bgcolor="lightgray">
      <Box sx={{ display: "flex" }}>
        <Board />
        <CustomDrawer />
      </Box>
    </Box>
  ) : (
    <Box width="100vw" height="100vh" bgcolor="lightgray">
      <Box
        component={"img"}
        src="src/assets/background.jpeg"
        position="absolute"
        width={"100%"}
        height={"100%"}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Grid
                container
                direction="column"
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="h4" textAlign="center">
                    Entrar no jogo
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    label="Nome do jogador"
                    onChange={(e) => setPlayerName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={joinGame}
                    fullWidth
                  >
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
