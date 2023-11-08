import { HttpRequestService } from '../http-request.service';
import { IRequestNewUser, IResponseNewUser } from '../interfaces/INewUser';

export class UserRegisterApi {
  constructor(private httpService: HttpRequestService) {}

  /**
   *registerNewUser
     
   * POST que será usada no componente signUp
   * 
     @param userData dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status, data e horário de retorno, id, nome, gernero, data de nascimento, email, criado em, ultima atualização e se está ativo.
   */

  async registerNewUser(userData: IRequestNewUser): Promise<IResponseNewUser> {
    const response = await this.httpService.sendHttpRequest(
      'http://localhost:4444/signup',
      'POST',
      userData,
    );
    return response;
  }
}
