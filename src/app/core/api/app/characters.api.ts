import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';

@Injectable({
  providedIn: 'root',
})
export class Characters {
  constructor(private httpGetCharacter: HttpRequestService) {}

  async getCharacters(page: number): Promise<any> {
    return await this.httpGetCharacter.sendHttpRequest(
      `http://localhost:4444/v1/getPage/characters/${page}`,
      'GET',
    );
  }
}
