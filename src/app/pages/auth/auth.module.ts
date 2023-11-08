import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { authApi } from 'src/app/core/api/app/auth.api';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    LoginComponent,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    ModalComponent,
    SelectComponent,
    RedirectComponent,
  ],
  imports: [CommonModule, MatIconModule, FormsModule],
  providers: [authApi],
  exports: [
    LoginComponent,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    ModalComponent,
    SelectComponent,
    RedirectComponent,
  ],
})
export class AuthModule {}
