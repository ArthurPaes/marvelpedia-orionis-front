import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RedirectComponent } from './redirect/redirect.component';
import { authApi } from 'src/app/core/api/app/auth.api';
import { UserRegisterApi } from 'src/app/core/api/app/new.user.api';
import { ComponentsModule } from 'src/app/components/components.module';
import { redirectApi } from 'src/app/core/api/app/redirect.api';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, RedirectComponent],
  imports: [CommonModule, MatIconModule, FormsModule, ComponentsModule],
  providers: [authApi, UserRegisterApi, redirectApi],
  bootstrap: [],
  exports: [LoginComponent, SignUpComponent, RedirectComponent],
})
export class AuthModule {}
