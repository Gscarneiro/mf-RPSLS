import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Player } from './models/Player';
import { Room } from './models/Room';
import { Game } from './models/Game';
import { current } from './constants/current';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public hubConnection: HubConnection | undefined;

  currentGame: Game = new Game();

  showModules: {
    showPlayerName: boolean;
    showRoomsList: boolean;
    showGameRoom: boolean;
  } = {
    showPlayerName: true,
    showRoomsList: false,
    showGameRoom: false,
  };

  ngOnInit() {
    this.buildConnection();
  }

  buildConnection() {
    let builder = new HubConnectionBuilder();
    this.hubConnection = builder
      .withUrl('https://localhost:44374/gameHub')
      .build();
    this.hubConnection.start();

    this.connectionsReceivers();
  }

  connectionsReceivers() {
    this.hubConnection?.on('PlayerJoined', (type: string, message: any) => {
      current.game.status = message;
      this.currentGame = current.game;
    });

    this.hubConnection?.on('PlayerLeft', (type: string, message: string) => {});
    this.hubConnection?.on(
      'MakeMove',
      (type: string, status: number, playerId: string, result: string) => {
        if (status == 3) {
          current.game.result = result;
          current.game.status = status;
          this.currentGame = current.game;
        } else {
          if (playerId == current.player.id) {
            current.game.status = status;
          }
        }
      }
    );
    this.hubConnection?.on('StartNewGame', (type: string, game: Game) => {
      this.currentGame = current.game = game;
    });
  }

  listRooms(player: Player) {
    current.player = player;
    this.showModules.showPlayerName = false;
    this.showModules.showRoomsList = true;
  }

  joinRoom(data: any, action: string) {
    current.room = Object.assign(new Room(), data);
    this.showModules.showRoomsList = false;
    this.showModules.showGameRoom = true;

    this.hubConnection?.invoke(action, current.room.id);
  }

  makeMove(move: any) {
    this.hubConnection?.invoke(
      'MakeMove',
      current.room.id,
      current.game.id,
      current.player.id,
      move
    );
  }

  newGame() {
    this.hubConnection?.invoke('CreateNewGame', current.room.id);
  }
}
