import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-prediction-form',
  imports: [],
  templateUrl: './prediction-form.component.html',
  styleUrl: './prediction-form.component.scss'
})
export class PredictionFormComponent {
  tags = signal<string[]>([]);
  publishers = signal<string[]>([]);

  addTag(tag: string) {
    // TODO
  }

  addPublisher(publisher: string) {
    // TODO
  }

  removeTag(name: string) {
    // TODO
  }

  removePublisher(name: string) {
    // TODO
  }
}