import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLayoutComponent } from './layout/nav-layout/nav-layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopBarComponent } from './layout/header/top-bar/top-bar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [NavLayoutComponent, TopBarComponent],
  imports: [
    CommonModule,

    // Animations
    BrowserAnimationsModule,

    // Flex
    FlexLayoutModule,

    // CDK
    LayoutModule,

    // Material
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,

    // Router
    RouterModule,


  ],
  exports: [
    NavLayoutComponent
  ]
})
export class SharedModule { }
