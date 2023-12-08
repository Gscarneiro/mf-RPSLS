import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoomComponent } from './pages/game-room/game-room.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GameRoomComponent],
  imports: [CommonModule, FormsModule],
  exports: [GameRoomComponent],
})
export class GamesModule {}
