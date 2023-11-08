import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { authApi } from 'src/app/core/api/app/auth.api';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatIconModule, FormsModule, ComponentsModule],
  providers: [authApi],
  exports: [LoginComponent],
})
export class AuthModule {}
