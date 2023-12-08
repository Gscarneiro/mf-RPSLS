import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerNameComponent } from './pages/player-name/player-name.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlayerNameComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PlayerNameComponent],
})
export class PlayerModule {}
