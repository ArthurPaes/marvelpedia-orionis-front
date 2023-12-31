import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AuthApi } from 'src/app/core/api/app/auth.api';
import { UserRegisterApi } from 'src/app/core/api/app/new.user.api';
import { ComponentsModule } from 'src/app/components/components.module';
import { ResetPasswordComponent } from './password-redefinition/reset-password/reset-password.component';
import { ChangePasswordComponent } from './password-redefinition/change-password/change-password.component';
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    RedirectComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
  ],
  providers: [AuthApi, UserRegisterApi],
  bootstrap: [],
  exports: [
    LoginComponent,
    SignUpComponent,
    RedirectComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
})
export class AuthModule {}
