import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/components/auth/auth.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { SignupComponent } from '../auth/components/signup/signup.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ResetPasswordComponent } from '../auth/components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'stocks',
    loadChildren: () => import('../features/stocks/stocks.module').then(m => m.StocksModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'signin',
        component: LoginComponent,
        data: { num: 1 }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: { num: 2 }
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/stocks',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
