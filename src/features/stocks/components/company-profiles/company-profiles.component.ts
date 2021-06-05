import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfilesQuery } from '../../state/company-profiles.query';
import { CompanyProfilesService } from '../../state/company-profiles.service';
import { AddCompanyDialogComponent } from '../add-company-dialog/add-company-dialog.component';

@Component({
  selector: 'app-company-profiles',
  templateUrl: './company-profiles.component.html',
  styleUrls: ['./company-profiles.component.scss']
})
export class CompanyProfilesComponent implements OnInit {
  profiles$ = this.companyQuery.selectAll();

  constructor(
    private companyQuery: CompanyProfilesQuery,
    private companyService: CompanyProfilesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onAddCompany(): void {
    this.dialog.open(AddCompanyDialogComponent);
  }

}
