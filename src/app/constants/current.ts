import { Game } from '../models/Game';
import { Player } from '../models/Player';
import { Room } from '../models/Room';

export const current: {
  room: Room;
  game: Game;
  player: Player;
  move: number | undefined;
} = {
  room: new Room(),
  game: new Game(),
  player: new Player(),
  move: undefined,
};
