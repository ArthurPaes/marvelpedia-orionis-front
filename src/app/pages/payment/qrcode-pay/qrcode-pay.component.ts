import { Component } from '@angular/core';
import { PaymentApi } from 'src/app/core/api/app/payment.api';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-qrcode-pay',
  templateUrl: './qrcode-pay.component.html',
  styleUrls: ['./qrcode-pay.component.scss'],
})
export class QRcodePayComponent {
  constructor(
    private paymentApi: PaymentApi,
    private clipboard: Clipboard,
    private activatedRoute: ActivatedRoute,
  ) {}
  qrCodeImage = '';
  qrCodeKey = '';
  userName = '';
  idExtractedFromURL: string | null = '';
  /**
   * ngOnInit
   * Extracts the ID value for the URL and assigns it to a variable.
   */
  ngOnInit(): void {
    this.idExtractedFromURL =
      this.activatedRoute.snapshot.queryParamMap.get('id');
    this.handleRenderQRcode();
  }
  /**
   * handleClipBoard
   * Stores QRcode data to the clipboard area.
   */
  handleClipBoard(): void {
    this.clipboard.copy(this.qrCodeKey);
  }
  /**
   * handleRenderQRcode
   * Request the QR code data and displays the response at View Template.
   */
  async handleRenderQRcode(): Promise<void> {
    try {
      //const response = await this.paymentApi.getQRcode(this.idExtractedFromURL);
      const response = {
        date: '2023-12-09T03:01:48.451Z',
        status: true,
        data: {
          userName: 'Rodrigo',
          image:
            'data:image/png;base64,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',
          qrcode:
            '00020126580014br.gov.bcb.pix0136866888f2-cbd9-498f-8efb-2844913711c952040000530398654041.005802BR5923NICKOLASLUANGURGELBICHO6008Sorocaba62240520mpqrinter682422320756304900F',
        },
      };
      this.qrCodeImage = response.data.image;
      this.qrCodeKey = response.data.qrcode;
      this.userName = response.data.userName;
    } catch (err) {
      console.log('trata o erro');
    } //TODO: Tratar o erro
  }
}
