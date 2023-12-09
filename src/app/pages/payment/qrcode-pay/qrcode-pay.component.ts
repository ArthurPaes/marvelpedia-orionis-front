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
  iconStatus = 'file_copy';
  returnPaymentError = false;
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
    this.iconStatus = 'done_all';
  }
  /**
   * handleRenderQRcode
   * Request the QR code data and displays the response at View Template.
   */
  async handleRenderQRcode(): Promise<void> {
    try {
      const response = await this.paymentApi.getQRcode(this.idExtractedFromURL);
      this.qrCodeImage = response.data.image;
      this.qrCodeKey = response.data.qrcode;
      this.userName = response.data.userName;
    } catch (err) {
      this.returnPaymentError = true;
    }
  }
}
