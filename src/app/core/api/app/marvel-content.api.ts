import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';
import { IResponseContentByCategorie } from '../interfaces/IContent';
import { EnumContentCategory } from 'src/app/pages/dash/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class MarvelContentApi {
  private apiUrl = `${environment.API_BASE_URL}`;

  constructor(private httpRequestService: HttpRequestService) {}

  async getContentByCategorie(
    category: EnumContentCategory,
    page: number,
    search: string,
  ): Promise<IResponseContentByCategorie> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/${category}?page=${page}&search=${search}`,
      'GET',
    );
  }
}
