import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IResponseQrCode } from 'src/app/pages/payment/interface/qrcode.interface';

@Injectable()
export class PaymentApi {
  private apiUrl = process.env.NG_APP_API_BASE_URL;

  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * getQRcode
   * Requisita o QRCode de pagamento.
   * @returns retorna
   */
  async getQRcode(qRcodeId: string | null): Promise<{ data: IResponseQrCode }> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/payment?id=${qRcodeId}`,
      'GET',
    );
  }
}
