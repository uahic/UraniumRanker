import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { UserStocksComponent } from './components/user-stocks/user-stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { UserStocksListComponent } from './components/user-stocks-list/user-stocks-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';

// Prime
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyProfileSearchComponent } from './components/company-profile-search/company-profile-search.component';
import { CompanyProfileListComponent } from './components/company-profile-list/company-profile-list.component';
import { CompanyProfilesComponent } from './components/company-profiles/company-profiles.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddCompanyDialogComponent } from './components/add-company-dialog/add-company-dialog.component';
import { CompanyIndividualRatingsComponent } from './components/company-individual-ratings/company-individual-ratings.component';
import { MdePopoverModule } from '@material-extended/mde';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [SearchBarComponent, UserStocksComponent, UserStocksListComponent, CompanyProfileSearchComponent, CompanyProfileListComponent, CompanyProfilesComponent, AddCompanyDialogComponent, CompanyIndividualRatingsComponent],
  imports: [
    CommonModule,
    FlexModule,
    StocksRoutingModule,
    ReactiveFormsModule,

    // Material
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,

    // Material Extensions
    NgxMaterialRatingModule,
    MdePopoverModule,


    // PrimeNG
    TableModule,
    ButtonModule,
    RatingModule
  ]
})
export class StocksModule { }
