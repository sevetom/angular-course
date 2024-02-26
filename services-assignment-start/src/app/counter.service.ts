import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CounterService {
  active = 0;
  inactive = 0;

  activeToInactive() {
    this.inactive++;
    console.log('Active to Inactive: ' + this.active + ' to ' + this.inactive);
  }

  inactiveToActive() {
    this.active++;
    console.log('Inactive to Active: ' + this.inactive + ' to ' + this.active);
  }
}