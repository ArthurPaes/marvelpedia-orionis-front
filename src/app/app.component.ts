import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  inputDataReceived:string = '';
  
  getInputValue(dataReceived:string) {
        this.inputDataReceived = dataReceived;
  }

}
