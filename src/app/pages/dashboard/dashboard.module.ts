import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { SurvayComponent } from './survay/survay.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomeComponent } from '../home/home.component';

@NgModule({
  declarations: [SurvayComponent, HomeComponent],
  imports: [CommonModule, MatIconModule, FormsModule, ComponentsModule],
  exports: [SurvayComponent, HomeComponent],
})
export class DashboardModule {}
