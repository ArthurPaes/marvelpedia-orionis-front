import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurvayComponent } from './pages/dashboard/survay/survay.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RedirectComponent } from './pages/auth/redirect/redirect.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'survey', component: SurvayComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
