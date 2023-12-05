import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RedirectComponent } from './pages/auth/redirect/redirect.component';
import { HomeComponent } from './pages/dash/home/home.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { SurveyComponent } from './pages/dash/survey/survey.component';
import { ResetPasswordComponent } from './pages/auth/password-redefinition/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/auth/password-redefinition/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { CharacterDetailsComponent } from './pages/dash/character-details/character-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'characters/:id',
    component: CharacterDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
