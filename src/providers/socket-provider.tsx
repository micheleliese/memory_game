/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MemoryCard } from "../interfaces/card";
import { Player } from "../interfaces/player";
import { Config } from "../config";
import { useSnackbar } from "notistack";
import { CardOption } from "../interfaces/card-option";
import { publicIpv4 } from 'public-ip';

export interface Round {
  currentRound: number;
  maxRounds: number;
}

export interface SocketContextProps {
  gameBoard: Array<MemoryCard>;
  players: Array<Player>;
  gameStarted: boolean;
  ready: boolean;
  isHost: boolean;
  playerName: string;
  round: Round;
  isOpen: boolean;
  isOpenFinishDialog: boolean;
  message: string;
  cardOptions: Array<CardOption>
  selectedCardOption: number;
  setSelectedCardOption: (value: number) => void;
  handleClose: () => void;
  handleCloseFinishDialog: () => void;
  playAgain: () => void;
  setPlayerName: (name: string) => void;
  joinGame: () => void;
  startGame: () => void;
  isMyTurn: () => boolean;
  flipCard: (index: number) => void;
  currentUser: () => Player | undefined;
  myUser(): Player | undefined;
  getWinners(players: Player[]): Player[];
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
  const [round, setRound] = useState<Round>({ currentRound: 0, maxRounds: 0 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenFinishDialog, setIsOpenFinishDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [cardOptions, setCardOptions] = useState<Array<CardOption>>([{ value: 0, label: "Selecione o número de cartas" }]);
  const [selectedCardOption, setSelectedCardOption] = useState<number>(0);
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
      const generatedCardOptions = generateCardOptions(players);
      setIsHost(isHost);
      setPlayers(players);
      setCardsFlipped(0);
      setCardOptions([ cardOptions[0], ...generatedCardOptions]);
    });

    socket.on("startedGame", (gameBoard) => {
      enqueueSnackbar("Jogo Iniciado", { variant: "info" });
      setGameBoard(gameBoard);
      setGameStarted(true);
    });

    socket.on("playerLeft", (players) => {
      enqueueSnackbar("Um jogador saiu", { variant: "warning" });
      const generatedCardOptions = generateCardOptions(players);
      setPlayers(players);
      setCardOptions([ cardOptions[0], ...generatedCardOptions]);
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
      setReady(false);
    });

    socket.on("gameFinished", () => {
      setIsOpenFinishDialog(true);
    });

    socket.on("round", (round) => {
      setRound(round);
    });

    socket.on("gameTied", (duplicates) => {
      setIsOpen(true);
      setMessage(`Jogo empatado entre ${duplicates.map((player: Player) => player.name).join(", ")}`);
    });

    socket.on("gameWon", (winner) => {
      setIsOpen(true);
      setMessage(`Jogo ganho por ${winner.name}`);
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

  const joinGame = async () => {
    try {
      if (!playerName) {
        enqueueSnackbar("Por favor digite seu nome", { variant: "error" });
        return;
      }
      const ip = await publicIpv4();
      console.log(`Joining game as ${playerName} with ip ${ip}`);
      socket.emit("joinGame", { playerName, ip: ip });
    } catch (error) {
      console.error(`Error joining game: ${error}`);
      enqueueSnackbar(`Erro ao entrar no jogo: ${error}`, { variant: "error" });
    }
  };

  const startGame = () => {
    console.log("Starting game");
    socket.emit("startGame", selectedCardOption );
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
  
  const handleClose = () => setIsOpen(false);

  const handleCloseFinishDialog = () => {
    setIsOpenFinishDialog(false);
    setGameStarted(false);
    setReady(false);
  }

  const playAgain = () => { 
    socket.emit("playAgain");
    setIsOpenFinishDialog(false); 
    setGameStarted(false);
    setReady(true);
  }

  const generateCardOptions = (players: Array<Player>) => {
    const minValue = Math.pow(2, players.length);
    const maxValue = 50;
    const cardOptions = [];
    for (let i = minValue; i <= maxValue; i += 4) {
      cardOptions.push({ value: i, label: i.toString() });
    }
    return cardOptions;
  }

  function getWinners(players: Player[]) {
    const playerGroups: { [key: string]: Player[] } = {};
    players.forEach(player => {
      const key = `${player.acumulatedScore}-${player.victories}`;
      if (!playerGroups[key]) {
        playerGroups[key] = [];
      }
      playerGroups[key].push(player);
    });
    let maxScore = -1;
    let maxVictories = -1;
    let winners: Player[] = [];
    for (const key in playerGroups) {
      const group = playerGroups[key];
      const player = group[0];
      if (player.acumulatedScore > maxScore || (player.acumulatedScore === maxScore && player.victories > maxVictories)) {
        maxScore = player.acumulatedScore;
        maxVictories = player.victories;
        winners = group;
      }
    }
    return winners;
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
        round,
        isOpen,
        isOpenFinishDialog,
        message,
        cardOptions,
        selectedCardOption,
        setSelectedCardOption,
        handleClose,
        handleCloseFinishDialog,
        playAgain,
        setPlayerName,
        joinGame,
        startGame,
        isMyTurn,
        flipCard,
        currentUser,
        myUser,
        getWinners
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};


