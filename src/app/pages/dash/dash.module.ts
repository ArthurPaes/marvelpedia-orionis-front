import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
  declarations: [HomeComponent, SurveyComponent],
  imports: [CommonModule, MatIconModule, FormsModule, ComponentsModule],
  providers: [MarvelContentApi],
  bootstrap: [],
  exports: [HomeComponent, SurveyComponent],
})
export class DashModule {}
