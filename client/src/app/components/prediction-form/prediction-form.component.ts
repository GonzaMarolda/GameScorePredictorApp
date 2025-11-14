import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionService } from '../../services/PredictionService';

@Component({
  selector: 'app-prediction-form',
  imports: [CommonModule],
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
  tagsFilter = signal<string>('');
  availablePublishers = signal<string[]>([]);
  publishers = signal<string[]>([]);
  publishersFilter = signal<string>('');

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

  addTag(tag: string) {
    const t = (tag || '').trim();
    if (!t) return;
    // prevent duplicates
    if (this.tags().includes(t)) return;
    this.tags.update(tags => [...tags, t]);
  }

  setTagsFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.tagsFilter.set(value);
  }

  filteredTags() {
    const filter = this.tagsFilter().toLowerCase();
    return this.availableTags().filter(tag => tag.toLowerCase().includes(filter) && !this.tags().includes(tag));
  }

  addTagFromEvent(ev: Event) {
    const val = (ev.target as HTMLSelectElement | null)?.value ?? '';
    this.addTag(val);
    if (ev.target && ev.target instanceof HTMLSelectElement) ev.target.value = '';
  }

  removeTag(name: string) {
    this.tags.update(tags => tags.filter(tag => tag !== name));
  }

  addPublisher(publisher: string) {
    const p = (publisher || '').trim();
    if (!p) return;
    if (this.publishers().includes(p)) return;
    this.publishers.update(publishers => [...publishers, p]);
  }

  setPublishersFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.publishersFilter.set(value);
  }

  filteredPublishers() {
    const filter = this.publishersFilter().toLowerCase();
    return this.availablePublishers().filter(publisher => publisher.toLowerCase().includes(filter) && !this.publishers().includes(publisher));
  }

  addPublisherFromEvent(ev: Event) {
    const val = (ev.target as HTMLSelectElement | null)?.value ?? '';
    this.addPublisher(val);
    if (ev.target && ev.target instanceof HTMLSelectElement) ev.target.value = '';
  }

  removePublisher(name: string) {
    this.publishers.update(publishers => publishers.filter(publisher => publisher !== name));
  }

  setPrice(event: Event) {
    const value = (Number)((event.target as HTMLInputElement).value);
    this.price.set(value);
  }

  setRequiredAge(event: Event) {
    const value = (Number)((event.target as HTMLInputElement).value);
    this.requiredAge.set(value);
  }

  setReleaseYear(event: Event) {
    const value = (Number)((event.target as HTMLInputElement).value);
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
    const value = (Number)((event.target as HTMLInputElement).value);
    this.supportedLanguagesAmount.set(value);
  }

  setTitle(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.title.set(value);
  }
}