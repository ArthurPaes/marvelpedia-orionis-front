import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurvayComponent } from './pages/dashboard/survay/survay.component';
import { LoginComponent } from './pages/auth/login/login.component';
// import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignUpComponent },
  { path: 'survey', component: SurvayComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
