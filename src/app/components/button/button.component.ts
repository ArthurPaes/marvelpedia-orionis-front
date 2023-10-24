import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {

  public buttonLabel:string = '';
  @Input()
    set label(name: string) {
      this.buttonLabel = name;
    }
    get name(): string {
      return this.buttonLabel;
    }      

  @Input() buttonType:string = 'default';
  @Input() isDisabled:boolean = false;
  @Input() custonStyle:string = '';
  
  @Output() btnClick = new EventEmitter();
  
 	constructor() {}
  ngOnInit(): void {}

	onClick() {
		this.btnClick.emit();
  }	
}