export interface Player {
  id: string;
  name: string;
  score: number;
  acumulatedScore: number;
  turn: boolean;
  isHost: boolean;
  ip: string;
  isActive: boolean;
  victories: number;
  isReady: boolean;
}