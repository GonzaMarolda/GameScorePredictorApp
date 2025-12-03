import { Component, inject, input, signal, HostListener, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  dropdownClicked = signal<boolean>(false);
  availableOptions = input<string[]>([]);
  options = signal<string[]>([]);
  optionsOutput = output<string[]>();
  optionsFilter = signal<string>('');

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.dropdown-input');
    if (!clickedInside) {
      this.dropdownClicked.set(false);
    }
  }

  add(option: string) {
    const t = (option || '').trim();
    if (!t) return;
    // prevent duplicates
    if (this.options().includes(t)) return;
    this.options.update(options => [...options, t]);
    this.optionsOutput.emit(this.options());
  }

  setOptionsFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.optionsFilter.set(value);
  }

  filteredOptions() {
    const filter = this.optionsFilter().toLowerCase();
    return this.availableOptions().filter(option => option.toLowerCase().includes(filter) && !this.options().includes(option));
  }

  addOptionFromEvent(ev: Event) {
    const val = (ev.target as HTMLSelectElement | null)?.value ?? '';
    this.add(val);
    if (ev.target && ev.target instanceof HTMLSelectElement) ev.target.value = '';
  }

  removeOption(name: string) {
    this.options.update(options => options.filter(option => option !== name));
    this.optionsOutput.emit(this.options());
  }

  toggleDropdown() {
    this.dropdownClicked.update(clicked => !clicked);
  }
}