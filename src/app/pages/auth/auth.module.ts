import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { authApi } from 'src/app/core/api/app/auth.api';
import { RedirectComponent } from './redirect/redirect.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { redirectApi } from 'src/app/core/api/app/redirect.api';

@NgModule({
  declarations: [LoginComponent, RedirectComponent],
  imports: [CommonModule, MatIconModule, FormsModule, ComponentsModule],
  providers: [authApi, redirectApi],
  exports: [LoginComponent, RedirectComponent],
})
export class AuthModule {}
