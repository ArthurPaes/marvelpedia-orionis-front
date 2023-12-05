import { Component } from '@angular/core';

@Component({
  selector: 'app-media-explorer',
  templateUrl: './media-explorer.component.html',
  styleUrls: ['./media-explorer.component.scss'],
})
export class MediaExplorerComponent {
  arrCommentMockUp = [
    {
      id: 1,
      comment: 'Comentário de número 1',
      createdAt: '2022-12-05T00:00:00.000Z',
      categoryId: '999',
      category: 'comics',
      userComment: false,
    },
    {
      id: 2,
      comment: 'Comentário de número 2',
      createdAt: '2022-12-05T00:00:00.000Z',
      categoryId: '999',
      category: 'comics',
      userComment: false,
    },
    {
      id: 3,
      comment: 'Comentário de número 3',
      createdAt: '2022-12-05T00:00:00.000Z',
      categoryId: '999',
      category: 'comics',
      userComment: false,
    },
  ];
}
