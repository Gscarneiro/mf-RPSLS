import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { PlayerNameComponent } from '../player/pages/player-name/player-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [ListComponent],
})
export class RoomsModule {}
