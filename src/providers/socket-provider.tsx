/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MemoryCard } from "../interfaces/card";
import { Player } from "../interfaces/player";
import { Config } from "../config";

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
      console.log("player joined", players);
      setPlayers(players);
      setCardsFlipped(0);
    });

    socket.on("startedGame", (gameBoard) => {
      console.log("started game", gameBoard);
      setGameBoard(gameBoard);
      setGameStarted(true);
    });

    socket.on("host", (host) => {
      console.log("host", host);
      console.log("socket id", socket.id);
      if (host === socket.id) {
        setIsHost(true);
      }
    });

    socket.on("playerLeft", (players) => {
      console.log("player left", players);
      setPlayers(players);
    });

    socket.on("cardFlipped", ({ gameBoard, matched }) => {
      // alert(matched ? "Matched" : "Not matched");
      console.log(matched ? "Matched" : "Not matched");
      setGameBoard(gameBoard);
    });

    socket.on("gameStopped", () => {
      console.log("game stopped");
      setGameStarted(false);
    });

    socket.on("gameTied", (duplicates) => {
      console.log("game tied", duplicates);
      alert(`Game tied between ${duplicates.map((player: Player) => player.name).join(", ")}`)
    });

    socket.on("gameWon", (winner) => {
      console.log(`Game won by ${winner.name}`);
      alert(`Game won by ${winner.name}`);
    });

    return () => {
      socket.off("gameJoined");
      socket.off("players");
      socket.off("startGame");
      socket.off("playerLeft");
      socket.off("cardFlipped");
      socket.off("gameStopped");
    };
  }, []);

  const joinGame = () => {
    if (!playerName) {
      alert("Please enter a player name");
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

  const isMyTurn = () => {
    const user = myUser();
    if (user?.turn) {
      return true;
    } else {
      return false;
    }
  }

  const flipCard = (index: number) => {
    if (isMyTurn() && cardsFlipped < 2 && !gameBoard[index].isFlipped) {
      console.log("Flipping card", index);
      setCardsFlipped(cardsFlipped + 1);
      socket.emit("flipCard", index);
    } else {
      console.log("It's not my turn to flip a card");
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


