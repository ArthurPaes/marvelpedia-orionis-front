import { Component, OnInit } from '@angular/core';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import {
  IResponseComment,
  EnumContentCategory,
} from 'src/app/core/api/interfaces/IMarvelContent';
import { IComment, IDataContent } from './interface/media-explorer';
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
  pageNumberComments = 1;
  disableButtonPreviousPage = true;
  disableButtonNextPage = false;
  newComment = { comment: '' };
  showNotFoundMessage = false;
  showNextPreviousButtons = false;

  currentCardContent = {
    title: 'titulo do card a ser exibido',
    description: 'Descrição do card a ser exibido',
    thumb: 'url do thumb do card a ser exibido',
    externalLink: 'link de detalhes',
  };
  ngOnInit() {
    console.log(this.dataContent);
    this.getCommentList(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.pageNumberComments,
    );
  }

  createComment() {
    if (this.newComment.comment == '') {
      alert('não é possível comentar sem nenhum caracter');
      return;
    }
    this.createNewComment(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.newComment,
    );
    this.newComment.comment = ' ';
  }

  async createNewComment(
    category: EnumContentCategory,
    categoryId: number,
    newComment: object,
  ): Promise<void> {
    try {
      console.log('passaaqui');
      const response = await this.marvelContentApi.createUserComment(
        category,
        categoryId,
        newComment,
      );
      this.openSnackBar(`Seu comentário foi publicado com sucesso!`, 'Fechar');
      this.getCommentList(
        this.dataContent.categoryContent,
        this.dataContent.idContent,
        this.pageNumberComments,
      );
    } catch (err: any) {
      console.log(err);
      console.log('passa erro');
    }
  }

  /**
   * getCommentList
   *
   * Requests the comment list of deteiled content.
   */
  async getCommentList(
    category: EnumContentCategory,
    categoryId: number,
    pageNumberComments: number,
  ): Promise<void> {
    this.showNotFoundMessage = false;
    try {
      const response = await this.marvelContentApi.getCommentsByCategoryId(
        category,
        categoryId,
        pageNumberComments,
      );
      this.showNextPreviousButtons = true;
      this.commentList = response.commentsWithUserComment;
      console.log(response.data);
      this.totalComments = response.data.totalComments;
      console.log(this.totalComments);
      if (3 * pageNumberComments >= this.totalComments) {
        this.disableButtonNextPage = true;
        return;
      }
      this.disableButtonNextPage = false;
    } catch (err: any) {
      if (pageNumberComments > 1) {
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
   * handleCommentDelete
   *
   * Handles the user comment deletion.
   */
  async handleCommentDelete(commentId: number): Promise<void> {
    try {
      await this.marvelContentApi.deleteUserComment(commentId);

      this.getCommentList(
        this.dataContent.categoryContent,
        this.dataContent.idContent,
        this.pageNumberComments,
      );
    } catch (err) {
      console.log(err);
    }
  }

  nextPageComments() {
    this.disableButtonPreviousPage = false;
    this.pageNumberComments++;
    this.getCommentList(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.pageNumberComments,
    );
  }

  previousPageComments() {
    this.pageNumberComments--;
    this.disableButtonNextPage = false;
    this.disableButtonPreviousPage =
      this.pageNumberComments === 1 ? true : false;
    this.getCommentList(
      this.dataContent.categoryContent,
      this.dataContent.idContent,
      this.pageNumberComments,
    );
  }

  /**
   * openSnackBar
   *
   * Abre um componente de Snackbar do Angular Material exibindo uma mensagem para o usuário e um botão de ação.
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duração em milissegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-1'],
    });
  }
}
