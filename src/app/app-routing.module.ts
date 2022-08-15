import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';

const routes: Routes = [

  {
    path: '', component: AppLayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./components/base/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthenticationGuardService] },
        { path: 'biomarker', loadChildren: () => import('./components/biomarker/biomarker.module').then(m => m.BiomarkerModule), canActivate:[AuthenticationGuardService] },
    ],
  },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthenticationGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }


