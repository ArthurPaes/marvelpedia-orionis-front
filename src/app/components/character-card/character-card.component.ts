import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() imageSrc = '';
  favorited = false;
  notified = false;

  /**
   * toggleNotified()
   *
   * Responsável por alternar o valor da variável `notified` entre `true` e `false` toda vez que o usuário clica no ícone de notificação.
   */
  toggleNotified() {
    this.notified = !this.notified;
    console.log(this.notified);
  }

  /**
   * toggleFavorited()
   *
   * Responsável por alternar o valor da variável `favorited` entre `true` e `false` toda vez que o usuário clica no ícone de favorito.
   */
  toggleFavorited() {
    this.favorited = !this.favorited;
    console.log(this.favorited);
  }

  /**
   * showCharacterDetails()
   *
   * Manipula o evento de clique do botão do card para exibir informações do personagem.
   */
  showCharacterDetails() {
    // Lógica para exibir informações do personagem
  }
}
