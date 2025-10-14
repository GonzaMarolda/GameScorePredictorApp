import { Component, inject, signal } from '@angular/core';
import { ResultsComponent } from '../results/results.component';
import { PredictionFormComponent } from '../prediction-form/prediction-form.component';
import { PredictionService } from '../../services/PredictionService';

@Component({
  selector: 'app-body',
  imports: [ResultsComponent, PredictionFormComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  predictionService = inject(PredictionService);
  loading = signal(false);
  result = signal<number | null>(null);

  handlePredict(event: any) {
    this.loading.set(true);
    this.predictionService.predict(event).then((res) => {
      this.result.set(res);
      this.loading.set(false);
    });
  }
}