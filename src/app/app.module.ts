import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsModule } from './features/rooms/rooms.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PlayerModule } from './features/player/player.module';
import { GamesModule } from './features/games/games.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RoomsModule,
    GamesModule,
    PlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
