import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RedirectComponent } from './pages/auth/redirect/redirect.component';
import { HomeComponent } from './pages/dash/home/home.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { SurveyComponent } from './pages/dash/survey/survey.component';
import { PwRecoveryComponent } from './pages/auth/password-redefinition/pw-recovery/pw-recovery.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'pwrecovery', component: PwRecoveryComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
