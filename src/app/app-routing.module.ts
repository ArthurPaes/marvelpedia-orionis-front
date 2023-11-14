import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RedirectComponent } from './pages/auth/redirect/redirect.component';
import { HomeComponent } from './pages/dash/home/home.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { SurveyComponent } from './pages/dash/survey/survey.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'survey', component: SurveyComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
