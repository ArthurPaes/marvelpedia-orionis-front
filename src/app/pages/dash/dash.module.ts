import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatIconModule, FormsModule, ComponentsModule],
  providers: [],
  bootstrap: [],
  exports: [HomeComponent],
})
export class DashModule {}
