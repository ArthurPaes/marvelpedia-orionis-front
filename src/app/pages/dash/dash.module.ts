import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import { SurveyComponent } from './survey/survey.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { MediaExplorerComponent } from './media-explorer/media-explorer.component';

@NgModule({
  declarations: [
    HomeComponent,
    SurveyComponent,
    CharacterDetailsComponent,
    MediaExplorerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ComponentsModule,
    MatSnackBarModule,
    CarouselModule,
  ],
  providers: [MarvelContentApi],
  bootstrap: [],
  exports: [
    HomeComponent,
    SurveyComponent,
    CharacterDetailsComponent,
    MediaExplorerComponent,
  ],
})
export class DashModule {}
