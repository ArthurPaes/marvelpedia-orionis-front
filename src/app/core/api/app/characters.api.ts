import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersApi {
  private apiUrl = `${environment.API_BASE_URL}`;

  constructor(private httpRequestService: HttpRequestService) {}

  async getCharacters(page: number): Promise<any> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/characters?page=${page}`,
      'GET',
    );
  }
}
