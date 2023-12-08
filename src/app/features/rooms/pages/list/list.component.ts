import { Component, EventEmitter, Input, Output } from '@angular/core';
import { current } from 'src/app/constants/current';
import { Urls } from 'src/app/constants/urls';
import { Player } from 'src/app/models/Player';
import { Room } from 'src/app/models/Room';
import { ApiService } from 'src/app/services/api/api.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Output() onRoomCreate = new EventEmitter<Room>();
  @Output() onRoomJoin = new EventEmitter<Room>();

  roomsList: Room[] = [];

  roomName: string = '';
  publicRoom: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.list();
  }

  list() {
    this.apiService.get(Urls.room.listPublic).subscribe((data) => {
      this.roomsList = [];

      _.each(data, (item) => {
        this.roomsList.push(Object.assign(new Room(), item));
      });
    });
  }

  createRoom(roomName: string) {
    if (roomName != '') {
      this.apiService
        .post(
          Urls.room.root,
          {},
          {
            roomName: roomName,
            playerId: current.player.id,
            publicRoom: this.publicRoom,
          }
        )
        .subscribe((data) => {
          var room = Object.assign(new Room(), data);
          this.onRoomCreate.emit(room);
        });
    }
  }

  joinRoom(room: Room) {
    this.apiService
      .put(
        Urls.room.join,
        {},
        {
          playerId: current.player.id,
          roomId: room.id,
        }
      )
      .subscribe((data) => {
        var room = Object.assign(new Room(), data);

        this.onRoomJoin.emit(room);
      });
  }
}
