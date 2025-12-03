import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  results = input.required<number | null>();
}