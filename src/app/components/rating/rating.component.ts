import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RatingApi } from 'src/app/core/api/app/rating.api';
import { IRequestRating } from 'src/app/core/api/interfaces/IRating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  public ratingValue: IRequestRating = {
    chosenRate: 0,
    textboxValue: '',
  };

  constructor(
    private httpRating: RatingApi,
    private router: Router,
  ) {}

  @Input() justifyContent = '';
  @Input() textColor = '#FFFFFF';
  @Input() spaceBetweenStars = '25%';
  @Input() marginTopStars = '1.5rem';
  @Input() marginBottomStars = '1.5rem';
  @Input() textareaHeight = '120px';
  @Input() textareaColor = '#FFFFFF';
  @Input() textareaWidth = '90%';
  @Input() textareaPlaceholder =
    'Se desejar, descreva mais sobre sua opinião aqui!';
  @Input() marginTopTextarea = '0.5rem';
  @Input() marginBottomTextarea = '1.5rem';
  @Input() textareaBorderColor = '#FFFFFF';
  @Input() showLabel = true;
  @Input() showTextarea = true;
  @Input() showStars = true;
  @Input() placeHolderColor = 'textarea-default';
  public starList: Array<number> = [0, 1, 2, 3, 4];
  public btnDisabled = true;
  public modalMessage = '';
  public isModalActive = false;

  /**
   * selectStarPosition
   *
   * Função que registra estrela selecionada e o valor a ser enviado para o backend.
   *
   * @param index Posição do array das estrelas
   */
  selectStarPosition(index: number): void {
    this.btnDisabled = false;
    this.ratingValue.chosenRate = index + 1;
  }

  /**
   * registerTextareaData
   *
   * Função que registra o comentário da avaliação a ser enviado para o backend.
   *
   * @param textboxData Evento do textarea que registra cada tecla digitada.
   */
  registerTextareaData(textboxData: Event): void {
    this.ratingValue.textboxValue = (
      textboxData.target as HTMLTextAreaElement
    ).value.trim();
  }

  /**
   * sendRating
   *
   * Função que envia o objeto para o backend que contem a avaliação pela estrela e comentários
   *
   */
  sendRating(): void {
    this.httpRating
      .registerRating(this.ratingValue)
      .then(() => {
        this.modalMessage = 'Dados enviados com sucesso!';
        this.isModalActive = true;
      })
      .catch(() => {
        this.isModalActive = true;
        this.modalMessage = 'Falha ao enviar os dados!';
      });
  }

  /**
   * closeModal
   *
   * Função que fecha o modal e redireciona para a home.
   *
   */
  closeModal(statusModal: boolean): void {
    this.isModalActive = statusModal;
    this.router.navigate(['home']);
  }
}
