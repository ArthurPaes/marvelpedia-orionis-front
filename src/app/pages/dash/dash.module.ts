import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import { SurveyComponent } from './survey/survey.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

@NgModule({
  declarations: [HomeComponent, SurveyComponent, CharacterDetailsComponent],
  imports: [CommonModule, MatIconModule, FormsModule, ComponentsModule],
  providers: [MarvelContentApi],
  bootstrap: [],
  exports: [HomeComponent, SurveyComponent, CharacterDetailsComponent],
})
export class DashModule {}
