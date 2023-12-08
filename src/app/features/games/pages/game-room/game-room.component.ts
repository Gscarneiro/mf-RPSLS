import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { current } from 'src/app/constants/current';
import { Game } from 'src/app/models/Game';
import { Room } from 'src/app/models/Room';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css'],
})
export class GameRoomComponent implements OnChanges {
  @Output() onPlayerMove = new EventEmitter<number>();
  @Input() currentGame: Game = new Game();

  currentRoom: Room = new Room();
  playerMove?: number = undefined;
  message: string = '';

  ngOnInit() {
    this.currentRoom = current.room;

    this.updateCurrentGame(
      current.room.gamesList[current.room.gamesList.length - 1]
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    var game = Object.assign(new Game(), changes['currentGame'].currentValue);

    this.updateCurrentGame(game);
  }

  updateCurrentGame(game: Game) {
    this.currentGame = current.game = game;

    this.updateMessage(this.currentGame.status, this.currentGame.result);
  }

  makeMove(event: Event) {
    current.move = parseInt((event.target as HTMLInputElement).value);
    this.onPlayerMove.emit(current.move);
  }

  updateMessage(status: number, message?: string) {
    if (!message) {
      switch (status) {
        case 0:
          this.message = 'Waiting for player to join';
          break;
        case 1:
          this.message = 'Game started! Make your move';
          break;
        case 2:
          this.message = 'Waiting for opponent to make a move';
          break;
        case 3:
          this.message = 'Both selected! Check the result!';
          break;
      }
    } else {
      this.message = message;
    }
  }

  leaveRoom() {
    throw new Error('Method not implemented.');
  }
}
