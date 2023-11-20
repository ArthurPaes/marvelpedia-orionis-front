import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';
import { IResponseContent } from '../interfaces/IContent';

@Injectable({
  providedIn: 'root',
})
export class ContentApi {
  private apiUrl = `${environment.API_BASE_URL}`;

  constructor(private httpRequestService: HttpRequestService) {}

  async getContent(
    category: string,
    page: number,
    search: string,
  ): Promise<IResponseContent> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/${category}?page=${page}&search=${search}`,
      'GET',
    );
  }
}
