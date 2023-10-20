import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() label: string = '';
  checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.checked = checkbox.checked;
    console.log(this.checked);
    this.checkedChange.emit(this.checked); // Emite o valor para o componente pai
  }
}
