import { Game } from './Game';
import { Player } from './Player';

export class Room {
  id: string = '';
  name: string = '';
  playerOne?: Player;
  playerTwo?: Player;
  public: boolean = true;
  playerCount: number = 0;
  gamesList: Game[] = [];
}
