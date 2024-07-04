/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MemoryCard } from "../interfaces/card";
import { Player } from "../interfaces/player";
import { Config } from "../config";
import { useSnackbar } from "notistack";

export interface SocketContextProps {
  gameBoard: Array<MemoryCard>;
  players: Array<Player>;
  gameStarted: boolean;
  ready: boolean;
  isHost: boolean;
  playerName: string;
  setPlayerName: (name: string) => void;
  joinGame: () => void;
  startGame: () => void;
  isMyTurn: () => boolean;
  flipCard: (index: number) => void;
  currentUser: () => Player | undefined;
  myUser(): Player | undefined;
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

const socket = io(Config.API_URL);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [gameBoard, setGameBoard] = useState<Array<MemoryCard>>([]);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [cardsFlipped, setCardsFlipped] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socket.on("gameJoined", ({ success, message }) => {
      console.log("Game joined", success);
      if (success) {
        console.log("Game joined successfully");
        setReady(true);
      } else {
        alert(message);
        setReady(false);
      }
    });

    socket.on("players", (players) => {
      const isHost = players.find((player: Player) => player.id === socket.id)?.isHost;
      setIsHost(isHost);
      setPlayers(players);
      setCardsFlipped(0);
    });

    socket.on("startedGame", (gameBoard) => {
      enqueueSnackbar("Jogo Iniciado", { variant: "info" });
      setGameBoard(gameBoard);
      setGameStarted(true);
    });

    socket.on("playerLeft", (players) => {
      enqueueSnackbar("Um jogador saiu", { variant: "warning" });
      setPlayers(players);
    });

    socket.on("cardFlipped", ({ gameBoard, message, variant }) => {
      if (message) {
        enqueueSnackbar(message,  { variant: variant });
      }
      setGameBoard(gameBoard);
    });

    socket.on("gameStopped", () => {
      enqueueSnackbar("Jogo Encerrado", { variant: "error" });
      setGameStarted(false);
    });

    socket.on("gameTied", (duplicates) => {
      enqueueSnackbar(`Jogo Empatado entre ${duplicates.map((player: Player) => player.name).join(", ")}`,  { variant: "info" });
    });

    socket.on("gameWon", (winner) => {
      enqueueSnackbar(`Jogo ganho por ${winner.name}`, { variant: "success" });
    });

    return () => {
      socket.off("gameJoined");
      socket.off("players");
      socket.off("startedGame");
      socket.off("host");
      socket.off("playerLeft");
      socket.off("cardFlipped");
      socket.off("gameStopped");
      socket.off("gameTied");
      socket.off("gameWon");
    };
  }, []);

  const joinGame = () => {
    if (!playerName) {
      enqueueSnackbar("Por favor digite seu nome", { variant: "error" });
      return;
    }
    console.log("Joining game");
    socket.emit("joinGame", playerName);
  };

  const startGame = () => {
    console.log("Starting game");
    socket.emit("startGame");
  }

  const currentUser = () => players.find((player) => player.turn === true);

  const myUser = () => players.find((player) => player.id === socket.id);

  const isMyTurn = () => myUser()?.turn || false;

  const flipCard = (index: number) => {
    if (isMyTurn() && cardsFlipped < 2 && !gameBoard[index].isFlipped) {
      setCardsFlipped(cardsFlipped + 1);
      socket.emit("flipCard", index);
    } else {
      enqueueSnackbar("Não é sua vez de virar uma carta", { variant: "warning" });
    }
  }
  
  return (
    <SocketContext.Provider
      value={{
        gameBoard,
        isHost,
        players,
        gameStarted,
        ready,
        playerName,
        setPlayerName,
        joinGame,
        startGame,
        isMyTurn,
        flipCard,
        currentUser,
        myUser
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};


