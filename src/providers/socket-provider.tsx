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

    socket.on("playerJoined", (players) => {
      console.log("player joined", players);
      setPlayers(players);
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
  };

  const startGame = () => {
    console.log("Starting game");
    socket.emit("startGame");
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};


