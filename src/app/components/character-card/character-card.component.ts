import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() id = '';
  @Input() title = '';
  @Input() description = '';
  @Input() imageSrc = '';
  @Input() favorited = false;
  @Input() isCharacter = false;
  @Output() favoriteClick = new EventEmitter();
  @Output() buttonClick = new EventEmitter();

  /**
   * onClick
   *
   * Função responsável por emitir o evento de click para o componente pai.
   */
  onClick() {
    this.buttonClick.emit();
  }

  /**
   * toggleFavorited()
   *
   * Responsável por alternar o valor da variável `favorited` entre `true` e `false` toda vez que o usuário clica no ícone de favorito.
   * Emite o evento `favoriteClick` quando o ícone é.
   */
  toggleFavorited(): void {
    this.favorited = !this.favorited;
    this.favoriteClick.emit(this.favorited);
  }
}
