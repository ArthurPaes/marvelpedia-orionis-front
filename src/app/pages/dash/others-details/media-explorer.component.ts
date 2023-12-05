import { Component } from '@angular/core';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import {
  IResponseComment,
  EnumContentCategory,
} from 'src/app/core/api/interfaces/IMarvelContent';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-media-explorer',
  templateUrl: './media-explorer.component.html',
  styleUrls: ['./media-explorer.component.scss'],
})
export class MediaExplorerComponent {
  commentList: IResponseComment[] = [
    {
      id: 1,
      userName: 'Rodrigo',
      userLastName: 'Paula Costa Mota Lima',
      comment: 'Comentário de número 1',
      createdAt: '2022-12-05T00:00:00.000Z',
      categoryId: 999,
      category: 'comics',
      userComment: false,
    },
    {
      id: 2,
      userName: 'Roberta',
      userLastName: 'Tomé Fernandes',
      comment: 'Comentário de número 2',
      createdAt: '2023-12-05T00:00:00.000Z',
      categoryId: 999,
      category: 'comics',
      userComment: true,
    },
    {
      id: 3,
      userName: 'Luiz',
      userLastName: 'Inácio "lula" da Silva',
      comment: 'Comentário de número 3',
      createdAt: '2022-12-05T00:00:00.000Z',
      categoryId: 999,
      category: 'comics',
      userComment: false,
    },
  ];

  constructor(
    private marvelContentApi: MarvelContentApi,
    private activatedRoute: ActivatedRoute,
  ) {}
  category = EnumContentCategory.Comics;
  categoryId = 0;

  //TODO: É preciso confirmar como vem a response dessa requisição.
  currentCardContent = {
    title: 'titulo do card a ser exibido',
    description: 'Descrição do card a ser exibido',
    thumb: 'url do thumb do card a ser exibido',
    externalLink: 'link de detalhes',
  };

  async getCommentList(): Promise<void> {
    try {
      const response = await this.marvelContentApi.getCommentsByCategoryId(
        this.category,
        this.categoryId,
        1,
      );
      response.map((comment) => this.commentList.push(comment));
    } catch (err: any) {
      console.log(err);
    }
  }

  async handleCommentDelete(commentId: number): Promise<void> {
    try {
      await this.marvelContentApi.deleteComment(commentId);
    } catch (err) {
      console.log(err);
    }
  }
}
