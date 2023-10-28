import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  /**
   *sendHttpRequest : função global usada para emitir requisições http.
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
    authToken?: string,
  ): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    });
    switch (method) {
      case 'GET': {
        return await lastValueFrom(this.http.get(path, { headers }));
      }
      case 'POST': {
        return await lastValueFrom(this.http.post(path, data, { headers }));
      }
      case 'PUT': {
        return await lastValueFrom(this.http.put(path, { headers }));
      }
      case 'DELETE': {
        return await lastValueFrom(this.http.delete(path, { headers }));
      }
    }
  }
}
