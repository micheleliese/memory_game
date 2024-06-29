/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MemoryCard } from "../interfaces/card";
import { Player } from "../interfaces/player";

export interface SocketContextProps {
  gameBoard: Array<MemoryCard>;
  players: Array<Player>;
  gameStarted: boolean;
  playerName: string;
  setPlayerName: (name: string) => void;
  joinGame: () => void;
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = io("http://localhost:3000");
  const [gameBoard, setGameBoard] = useState<Array<MemoryCard>>([]);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    socket.on("gameJoined", ({ success, gameBoard, players }) => {
      console.log("Game joined", success);
      if (success) {
        setGameBoard(gameBoard);
        setPlayers(players);
        setGameStarted(true);
      }
    });

    socket.on("playerJoined", (players) => {
      console.log("player joined", players);
      setPlayers(players);
    });

    socket.on("startGame", (gameBoard) => {
      console.log("start game", gameBoard);
      setGameBoard(gameBoard);
      setGameStarted(true);
    });

    socket.on("playerLeft", (players) => {
      console.log("player left", players);
      setPlayers(players);
    });

    socket.on("cardFlipped", ({ cardIndex, card }) => {
      console.log("card flipped", cardIndex, card);
      setGameBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[cardIndex] = card;
        return newBoard;
      });
    });

    socket.on("gameStopped", () => {
      console.log("game stopped");
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
    if (!playerName) {
      alert("Please enter a player name");
      return;
    }
    console.log("Joining game");
    socket.emit("joinGame", playerName);
    setGameStarted(true);
  };
  
  return (
    <SocketContext.Provider
      value={{
        gameBoard,
        players,
        gameStarted,
        playerName,
        setPlayerName,
        joinGame,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};


