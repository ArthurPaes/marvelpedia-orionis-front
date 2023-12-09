import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { QRcodePayComponent } from './qrcode-pay/qrcode-pay.component';
import { PaymentApi } from 'src/app/core/api/app/payment.api';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [QRcodePayComponent],
  imports: [CommonModule, ComponentsModule, MatIconModule],
  exports: [QRcodePayComponent],
  providers: [PaymentApi],
})
export class PaymentModule {}
