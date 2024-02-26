import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
  @Output('newNumber') newNumber = new EventEmitter<number>();
  num: number;
  interval;

  constructor() {
    this.num = 0;
  }

  startGame() {
    this.interval = setInterval(() => {
      this.num++;
      this.newNumber.emit(this.num);
    }, 1000);
  }

  stopGame() {
    clearInterval(this.interval);
  }
}
