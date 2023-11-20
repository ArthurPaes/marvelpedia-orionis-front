import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';
import { IResponseCategoryList } from '../interfaces/ICharacterCategoryList';

@Injectable({
  providedIn: 'root',
})
export class CharactersApi {
  constructor(private httpRequestService: HttpRequestService) {}

  async getCharacters(page: number): Promise<any> {
    return await this.httpRequestService.sendHttpRequest(
      `http://localhost:4444/v1/getPage/characters/${page}`,
      'GET',
    );
  }

  async getCharacterCategoryList(
    idCharacter: string,
  ): Promise<IResponseCategoryList> {
    return await this.httpRequestService.sendHttpRequest(
      `http://localhost:4444/v1/charactersCategories/${idCharacter}`,
      'GET',
    );
  }
}
