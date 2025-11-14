import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, BodyComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
