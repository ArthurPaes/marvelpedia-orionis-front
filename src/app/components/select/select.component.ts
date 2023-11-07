import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Output() valueChange = new EventEmitter<string>();
  @Input() selectWidth = '';
  @Input() selectBorderColor = '';
  @Input() optionList: Array<string> = [];
  @Input() tagLabel = '';
  @Input() borderColor = '#FFFFFF';
  @Input() placeholder = '';
  @Input() cleanValue = '';

  public valueSelect = '';
  public showTagLabel = false;

  /**
   * ngOnInit
   *
   * Função que inicializa o placeholder do select
   */
  ngOnInit(): void {
    if (this.placeholder) {
      this.valueSelect = this.placeholder;
    }
  }

  /**
   * ngOnChanges
   *
   * Função que limpa o select ao clicar em um botão limpar do componente pai.
   */
  ngOnChanges(): void {
    if (this.cleanValue.includes('true')) {
      this.valueSelect = this.placeholder;
      this.showTagLabel = false;
      this.borderColor = '#FFFFFF';
    }
  }

  /**sendData
   *
   * This function allows you send select chosen word to parent component.
   * @param selectData value selected in input component
   */
  sendData(event: Event): void {
    this.valueSelect = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(this.valueSelect);
    if (this.valueSelect.length > 0) {
      this.borderColor = '#2C85D8';
      this.showTagLabel = true;
    }
  }
}
