import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() imageSrc = '';
  @Input() favorited = false;
  @Input() isCharacter = false;
  notified = false;
  @Output() favoriteClick = new EventEmitter();

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
   * Emite o evento `favoriteClick` quando o ícone é.
   */
  toggleFavorited(): void {
    this.favorited = !this.favorited;
    this.favoriteClick.emit(this.favorited);
  }
}
