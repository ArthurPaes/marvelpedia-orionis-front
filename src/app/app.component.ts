import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public valorRecebidoInput:string = '';
  
    public receberValorInput(palavra:string) {
          this.valorRecebidoInput = palavra;
    }

}
