import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import { SurveyComponent } from './survey/survey.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { MediaExplorerComponent } from './media-explorer/media-explorer.component';

import { LastNamePipe } from './media-explorer/pipes/last-name.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    SurveyComponent,
    CharacterDetailsComponent,
    MediaExplorerComponent,
    LastNamePipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ComponentsModule,
    MatSnackBarModule,
  ],
  providers: [MarvelContentApi],
  bootstrap: [],
  exports: [
    HomeComponent,
    SurveyComponent,
    CharacterDetailsComponent,
    MediaExplorerComponent,
    LastNamePipe,
  ],
})
export class DashModule {}
