import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  /**
   *sendHttpRequest
   *
   * Usada para emitir requisições http.
   *
   * @param path url backend que será feita a requisição http
   * @param method método GET, POST, PUT , DELETE
   * @param data dados que serão enviados para o backend
   * @param authToken token de autenticação
   * @returns Retorna uma promise
   */

  async sendHttpRequest(
    path: string,
    method: string,
    data?: Record<string, any>,
  ): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('@authToken')}`,
      'Content-Type': 'application/json',
    });
    try {
      switch (method) {
        case 'GET': {
          return await lastValueFrom(this.httpClient.get(path, { headers }));
        }
        case 'POST': {
          return await lastValueFrom(
            this.httpClient.post(path, data, { headers }),
          );
        }
        case 'PUT': {
          return await lastValueFrom(this.httpClient.put(path, { headers }));
        }
        case 'DELETE': {
          return await lastValueFrom(this.httpClient.delete(path, { headers }));
        }
      }
    } catch (error) {
      return this.handleHttpError(error as HttpErrorResponse);
    }
  }
  private handleHttpError(error: HttpErrorResponse) {
    //"Sem permissão. Token inválido."
    if (error.status === 403) {
      localStorage.removeItem('@authToken');
      this.router.navigate(['/login']);
    }
    return throwError(error);
  }
}
