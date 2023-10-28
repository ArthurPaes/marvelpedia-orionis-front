// @angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

export const UsersRoutingModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
