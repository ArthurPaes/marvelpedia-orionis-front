import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IRequestNewUser, IResponseNewUser } from '../interfaces/INewUser';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserRegisterApi {
  private apiUrl = environment.API_BASE_URL;

  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * registerNewUser

   * POST que será usada no componente signUp
   *
     @param userData dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status, data e horário de retorno, id, nome, gernero, data de nascimento, email, criado em, ultima atualização e se está ativo.
   */

  async registerNewUser(userData: IRequestNewUser): Promise<IResponseNewUser> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/v1/signup`,
      'POST',
      userData,
    );
    return response;
  }
}
