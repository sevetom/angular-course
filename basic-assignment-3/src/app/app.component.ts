import { Component } from '@angular/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = false;
  clicks = 0;
  clickLog = [];

  onDisplayClick() {
    this.clicks++;
    this.display = !this.display;
    this.clickLog.push(new Date());
  }
}
