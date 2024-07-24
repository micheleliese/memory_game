export interface Player {
  id: string;
  name: string;
  score: number;
  turn: boolean;
  isHost: boolean;
  ip: string;
  isActive: boolean;
  victories: number;
}