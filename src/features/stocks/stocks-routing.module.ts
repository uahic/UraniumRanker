import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavLayoutComponent } from '@shared/layout/nav-layout/nav-layout.component';
import { CompanyProfilesComponent } from './components/company-profiles/company-profiles.component';
import { UserStocksComponent } from './components/user-stocks/user-stocks.component';

const routes: Routes = [
  {
    path:'',
    component: NavLayoutComponent,
    children: [
      {
        path: '',
        component: UserStocksComponent
      },
      {
        path: 'rankings',
        component: CompanyProfilesComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {}
