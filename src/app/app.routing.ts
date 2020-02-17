import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGaurdService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: 'signIn', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
  { path: 'signUp', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGaurdService],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
