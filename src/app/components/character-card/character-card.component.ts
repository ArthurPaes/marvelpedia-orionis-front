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

  /**
   * showCharacterDetails()
   *
   * Manipula o evento de clique do botão do card para exibir informações do personagem.
   */
  showCharacterDetails() {
    // Lógica para exibir informações do personagem
  }
}
