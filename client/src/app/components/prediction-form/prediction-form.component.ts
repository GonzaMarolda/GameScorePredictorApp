import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionService } from '../../services/PredictionService';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-prediction-form',
  imports: [CommonModule, DropdownComponent],
  templateUrl: './prediction-form.component.html',
  styleUrl: './prediction-form.component.scss'
})
export class PredictionFormComponent {
  predictionService = inject(PredictionService);
  title = signal<string | null>(null);
  price = signal<number | null>(null);
  requiredAge = signal<number | null>(null);
  releaseYear = signal<number | null>(null);
  isIndie = signal<boolean>(false);
  supportsEnglish = signal<boolean>(false);
  supportedLanguagesAmount = signal<number | null>(null);

  availableTags = signal<string[]>([]);
  tags = signal<string[]>([]);

  availablePublishers = signal<string[]>([]);
  publishers = signal<string[]>([]);
  
  constructor() {
    this.predictionService.getTags().then(tags => {
      this.availableTags.set(tags);
    }).catch(err => {
      console.error("Error fetching tags:", this.predictionService.errorMessage());
    });

    this.predictionService.getPublishers().then(publishers => {
      this.availablePublishers.set(publishers);
    }).catch(err => {
      console.error("Error fetching publishers:", this.predictionService.errorMessage());
    });
  }

  submit() {
    if (!this.isValidInput()) return;

    const input = {
      price: this.price()!,
      requiredAge: this.requiredAge()!,
      releaseYear: this.releaseYear()!,
      isIndie: this.isIndie()!,
      supportsEnglish: this.supportsEnglish()!,
      supportedLanguagesAmount: this.supportedLanguagesAmount()!,
      tags: this.tags(),
      publishers: this.publishers()
    };

    this.predictionService.predict(input).then(result => {
      console.log("Predicted score:", result);
    }).catch(err => {
      console.error("Error:", this.predictionService.errorMessage());
    });
  }

  isValidInput(): boolean {
    return true; // TODO
  }

  handleTagsOutput(tags: string[]) {
    this.tags.set(tags);
  }

  handlePublishersOutput(publishers: string[]) {
    this.publishers.set(publishers);
  }

  setPrice(event: Event) {
    const input = (event.target as HTMLInputElement);
    const raw = (event.target as HTMLInputElement).value;
    const value = (Number)(raw);

    if (raw.length >= 4) {
      input.value = this.price() !== null ? String(this.price()) : '';
      return;
    }

    this.price.set(value);
  }

  setRequiredAge(event: Event) {
    const input = (event.target as HTMLInputElement);
    const raw = (event.target as HTMLInputElement).value;
    const value = (Number)(raw);

    if (raw.length >= 3) {
      input.value = this.requiredAge() !== null ? String(this.requiredAge()) : '';
      return;
    }

    this.requiredAge.set(value);
  }

  setReleaseYear(event: Event) {
    const input = (event.target as HTMLInputElement);
    const raw = (event.target as HTMLInputElement).value;
    const value = (Number)(raw);

    if (raw.length >= 5) {
      input.value = this.releaseYear() !== null ? String(this.releaseYear()) : '';
      return;
    }

    this.releaseYear.set(value);
  }

  setIsIndie(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.isIndie.set(value);
  }

  setSupportsEnglish(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.supportsEnglish.set(value);
  }

  setSupportedLanguagesAmount(event: Event) {
    const input = (event.target as HTMLInputElement);
    const raw = (event.target as HTMLInputElement).value;
    const value = (Number)(raw);

    if (raw.length >= 3) {
      input.value = this.supportedLanguagesAmount() !== null ? String(this.supportedLanguagesAmount()) : '';
      return;
    }

    this.supportedLanguagesAmount.set(value);
  }

  setTitle(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.title.set(value);
  }
}