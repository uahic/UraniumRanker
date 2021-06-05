import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { createCompanyProfile } from '../../state/company-profile.model';
import { CompanyProfilesService } from '../../state/company-profiles.service';
import { ISINValidator } from './isin-validator';

@UntilDestroy()
@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.scss']
})
export class AddCompanyDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private companyService: CompanyProfilesService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCompanyDialogComponent>
  ) {
    this.form = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      isin: ['', [ISINValidator]],
      symbol: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{1,}$/)]]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(changes => {
        this.form.patchValue({ symbol: changes.symbol.toUpperCase() }, { emitEvent: false });
      });
  }

  onSubmit(): void {
    const { displayName, isin, symbol }: { displayName: string, isin: string, symbol: string } = this.form.value;
    const companyProfile = createCompanyProfile(isin, displayName, { symbol: symbol.toUpperCase() });
    this.companyService.add(companyProfile);
    this.dialogRef.close();
  }

}
