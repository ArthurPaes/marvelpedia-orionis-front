import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Output() valueChange = new EventEmitter<string>();
  @Input() selectWidth = '522px';
  @Input() selectMaxWidth = '';
  @Input() selectBorderColor = '';
  @Input() optionList: Array<string> = [];
  @Input() tagLabel = '';
  @Input() borderColor = '#FFFFFF';
  @Input() placeholder = '';
  @Input() height = '';
  @Input() selectMarginBottom = '';
  @Input() selectMarginTop = '';

  public valueSelect = '';
  public showTagLabel = false;
  public placeHolderClean = '';

  /**
   * ngOnInit
   *
   * Função que inicializa o placeholder do select
   */
  ngOnInit(): void {
    if (this.placeholder) {
      this.valueSelect = this.placeholder;
      this.placeHolderClean = this.placeholder;
    }
  }

  /**
   * cleanSelectValue
   *
   * Função que limpa o select ao clicar em um botão limpar do componente pai.
   */
  cleanSelectValue(): void {
    this.valueSelect = '';
    this.showTagLabel = false;
    this.selectBorderColor = '#FFFFFF';
    this.borderColor = '#FFFFFF';
    this.valueSelect = this.placeHolderClean;
  }

  /**
   * sendData
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
