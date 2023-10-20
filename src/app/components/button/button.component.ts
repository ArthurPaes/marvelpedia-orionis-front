import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() styled: string = 'default-enabled';

  constructor() {};  
}

//    TIPOS DE BOTÕES [styled]

//  - default-disabled
//  - default-enabled
//  - login-disabled
//  - login-enabled
//  - large-disabled
//  - large-enabled
//  - cancel
//  - bt-char
//  - bt-card
