import { GameStatus } from '../constants/gameStatus';

export class Game {
  id: string = '';
  roomId: string = '';
  date: Date = new Date();
  status: GameStatus = GameStatus.WaitingForPlayerToJoin;
  playerOneMove?: number;
  playerTwoMove?: number;
  result?: string;
}
