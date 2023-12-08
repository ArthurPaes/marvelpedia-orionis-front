import { Component, OnInit } from '@angular/core';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import { EnumContentCategory } from 'src/app/core/api/interfaces/IMarvelContent';
import {
  IComment,
  IDataContent,
  IHeaderDetails,
} from './interface/media-explorer';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-media-explorer',
  templateUrl: './media-explorer.component.html',
  styleUrls: ['./media-explorer.component.scss'],
})
export class MediaExplorerComponent implements OnInit {
  constructor(
    private marvelContentApi: MarvelContentApi,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.dataContent = this?.router?.getCurrentNavigation()?.extras?.state;
  }
  dataContent: any;
  commentList: IComment[] = [];
  totalComments = 0;
  pageNumber = 1;
  disableButtonPreviousPage = true;
  disableButtonNextPage = false;
  newComment = { comment: '' };
  showNotFoundMessage = false;
  showNextPreviousButtons = false;
  headerData: IHeaderDetails = {
    description: '',
    title: '',
    thumb: '',
    link: '',
  };

  currentCardContent = {
    title: 'titulo do card a ser exibido',
    description: 'Descrição do card a ser exibido',
    thumb: 'url do thumb do card a ser exibido',
    externalLink: 'link de detalhes',
  };
  ngOnInit(): void {
    this.getCommentList(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.pageNumber,
    );
    this.getHeaderDetails();
  }

  async getHeaderDetails() {
    try {
      const response = await this.marvelContentApi.getCharacterCategoryList(
        this.dataContent.categoryContent,
        this.dataContent.idContent,
      );
      console.log(response.data);
      // this.headerData = response.data;
      console.log(this.headerData.title);
      console.log(this.headerData);
      console.log('teste');
    } catch (err: any) {
      this.openSnackBar(`Houve um erro ao publicar o comentário`, 'Fechar');
    }
  }

  /**
   * getCommentList
   *
   * Obtém a lista de comentários para o conteúdo atual.
   *
   * Realiza uma chamada à API para trazer a lista de comentários associada
   * a um conteúdo específico da Marvel.
   *
   * @param category - A categoria do conteúdo Marvel
   * @param categoryId - O ID do conteúdo Marvel.
   * @param pageNumber - O número da página de comentários a ser exibida.
   */
  async getCommentList(
    category: EnumContentCategory,
    categoryId: number,
    pageNumber: number,
  ): Promise<void> {
    this.showNotFoundMessage = false;
    try {
      const response = await this.marvelContentApi.getCommentsByCategoryId(
        category,
        categoryId,
        pageNumber,
      );
      this.showNextPreviousButtons = true;
      this.commentList = response.commentsWithUserComment;
      //número total de comentários disponibilizados pela API em relação ao conteúdo Marvel
      this.totalComments = response.data.totalComments;
      if (3 * pageNumber >= this.totalComments) {
        this.disableButtonNextPage = true;
        return;
      }
      this.disableButtonNextPage = false;
    } catch (err: any) {
      if (pageNumber > 1) {
        this.previousPageComments();
      }
      if (err.error.data === 'Página não encontrada.') {
        this.showNotFoundMessage = true;
        this.showNextPreviousButtons = false;
        this.commentList = [];
      }
    }
  }

  /**
   * createNewComment
   *
   * Esta função usa o service `MarvelContentApi` para enviar um novo comentário à API.
   * Após o envio, exibe uma mensagem de sucesso usando `openSnackBar`, limpa o campo de comentário para preparar para um novo comentário e atualiza a lista de comentários chamando `getCommentList`.
   *
   * @param category - A categoria do conteúdo Marvel
   * @param categoryId - O ID do conteúdo Marvel.
   * @param newComment - Um objeto contendo o novo comentário a ser enviado.
   */

  async createNewComment(
    category: EnumContentCategory,
    categoryId: number,
    newComment: object,
  ): Promise<void> {
    try {
      await this.marvelContentApi.createUserComment(
        category,
        categoryId,
        newComment,
      );
      this.openSnackBar(`Seu comentário foi publicado com sucesso!`, 'Fechar');
      this.newComment.comment = '';
      this.pageNumber = 1;
      this.getCommentList(
        this.dataContent.categoryContent,
        this.dataContent.idContent,
        this.pageNumber,
      );
    } catch (err: any) {
      this.openSnackBar(`Houve um erro ao publicar o comentário`, 'Fechar');
    }
  }

  /**
   * handleCommentDelete
   *
   * A função usa o service `MarvelContentApi` para excluir um comentário com o ID fornecido. Após a exclusão, exibe uma mensagem de sucesso utilizando `openSnackBar` e atualiza a lista de comentários chamando `getCommentList`.
   *
   * @param commentId - O ID do comentário a ser excluído
   */
  async handleDeleteComment(commentId: number): Promise<void> {
    try {
      await this.marvelContentApi.deleteUserComment(commentId);
      this.openSnackBar(`Seu comentário foi excluído!`, 'Fechar');
      this.getCommentList(
        this.dataContent.categoryContent,
        this.dataContent.idContent,
        this.pageNumber,
      );
    } catch (err) {
      this.openSnackBar(`Não foi possível excluir o comentário!`, 'Fechar');
    }
  }

  /**
   * createComment
   *
   * Esta função é chamada quando o usuário quando o usuário clica no botão "Comentar". Ela realiza a chamada da função `createNewComment` para enviar o novo comentário que está armazenado na variável "newComment".
   */
  createComment(): void {
    this.createNewComment(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.newComment,
    );
  }

  /**
   * nextPageComments
   *
   * A função é chamada quando o usuário deseja visualizar a próxima página de comentários.
   */
  nextPageComments(): void {
    this.disableButtonPreviousPage = false;
    this.pageNumber++;
    this.getCommentList(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.pageNumber,
    );
  }

  /**
   * previousPageComments
   *
   * A função é chamada quando o usuário deseja visualizar a página anterior de comentários.
   */
  previousPageComments(): void {
    this.pageNumber--;
    this.disableButtonNextPage = false;
    this.disableButtonPreviousPage = this.pageNumber === 1 ? true : false;
    this.getCommentList(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.pageNumber,
    );
  }

  /**
   * openSnackBar
   *
   * Abre um componente de Snackbar do Angular Material exibindo uma mensagem para o usuário e um botão de ação.
   *
   * @param message - Menssagem a ser exibida na snackbar
   * @param action - Ação a ser executada no botão da snackbar
   */
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000, // Duração em milissegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-1'],
    });
  }
}
