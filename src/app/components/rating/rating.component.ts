import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RatingApi } from 'src/app/core/api/app/rating.api';
import { IRequestRating } from 'src/app/core/api/interfaces/IRating';
import { IModalConfig } from 'src/app/pages/auth/login/interface/login.interface';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  public ratingValue: IRequestRating = {
    grade: 0,
    comment: '',
  };

  constructor(
    private ratingApi: RatingApi,
    private router: Router,
  ) {}

  @Input() justifyContent = '';
  @Input() textColor = '#FFFFFF';
  @Input() spaceBetweenStars = '15%';
  @Input() marginTopStars = '1.5rem';
  @Input() marginBottomStars = '1.5rem';
  @Input() textareaHeight = '120px';
  @Input() textareaColor = '#FFFFFF';
  @Input() textareaWidth = '100%';
  @Input() textareaPlaceholder =
    'Se desejar, descreva mais sobre sua opinião aqui!';
  @Input() marginTopTextarea = '1.5rem';
  @Input() marginBottomTextarea = '1.5rem';
  @Input() textareaBorderColor = '#FFFFFF';
  @Input() showLabel = true;
  @Input() showTextarea = true;
  @Input() showStars = true;
  @Input() placeHolderColor = 'textarea-default';
  public starList: Array<number> = [0, 1, 2, 3, 4];
  public btnDisabled = true;

  /**
   * selectStarPosition
   *
   * Função que registra estrela selecionada e o valor a ser enviado para o backend.
   *
   * @param index Posição do array das estrelas
   */
  selectStarPosition(index: number): void {
    this.btnDisabled = false;
    this.ratingValue.grade = index + 1;
  }

  /**
   * registerTextareaData
   *
   * Função que registra o comentário da avaliação a ser enviado para o backend.
   *
   * @param textboxData Evento do textarea que registra cada tecla digitada.
   */
  registerTextareaData(textboxData: Event): void {
    this.ratingValue.comment = (
      textboxData.target as HTMLTextAreaElement
    ).value.trim();
  }

  public ratingError = false;

  modalConfig: IModalConfig = {
    showModal: false,
    icon: '',
    title: '',
    message: '',
    buttonText: '',
    overlayClick: false,
  };

  /**
   * handleRatingSuccess
   *
   * Objeto que manipula o caso de sucesso no modal.
   */
  handleRatingSuccess(successMessage: string): void {
    this.modalConfig = {
      showModal: true,
      icon: 'check_circle_outline',
      title: 'Sucesso!',
      message: successMessage,
      buttonText: 'FECHAR',
      overlayClick: true,
    };
  }

  /**
   * handleRatingError
   *
   * Objeto que manipula o caso de erro no modal.
   */
  handleRatingError(errorMessage: string): void {
    this.modalConfig = {
      showModal: true,
      icon: 'error_outline',
      title: 'Erro!',
      message: errorMessage,
      buttonText: 'FECHAR',
      overlayClick: true,
    };
  }

  /**
   * sendRating
   *
   * Função que envia o objeto para o backend que contem a avaliação pela estrela e comentários
   *
   */
  async sendRating(): Promise<void> {
    try {
      const ratingValidation = await this.ratingApi.registerRating(
        this.ratingValue,
      );
      this.handleRatingSuccess(ratingValidation.data.comment);
    } catch (error: any) {
      if (error.data.msg) {
        this.handleRatingError(error.data.msg);
      } else {
        this.handleRatingError('Erro interno do servidor!');
        this.ratingError = true;
      }
    }
  }

  /**
   * closeModal
   *
   * Função que fecha o modal e redireciona para a home.
   *
   */
  closeModal(statusModal: boolean): void {
    if (this.ratingError) {
      this.modalConfig.showModal = statusModal;
    } else {
      this.ratingError = false;
      this.router.navigate(['home']);
    }
  }
}
