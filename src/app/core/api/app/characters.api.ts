import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersApi {
  private apiUrl = `${environment.API_BASE_URL}`;

  constructor(private httpGetCharacter: HttpRequestService) {}

  async getCharacters(page: number): Promise<any> {
    return await this.httpGetCharacter.sendHttpRequest(
      `${this.apiUrl}/characters?page=${page}`,
      'GET',
    );
  }
}
