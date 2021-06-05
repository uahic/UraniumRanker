import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { StockService } from '../../services/stock.service';
import { CompanyProfilesQuery } from '../../state/company-profiles.query';

@UntilDestroy()
@Component({
  selector: 'app-company-profile-search',
  templateUrl: './company-profile-search.component.html',
  styleUrls: ['./company-profile-search.component.scss']
})
export class CompanyProfileSearchComponent implements OnInit {
  @Output() onValueChange = new EventEmitter();
  results$: Observable<any[]>;
  searchTerm$ = new Subject<string>();
  form: FormGroup;

  constructor(
    private stockService: StockService,
    private companyQuery: CompanyProfilesQuery,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchField: [[]]
    });

    this.results$ = this.searchTerm$
      .pipe(
        filter(value => !!value),
        map(value => value.toLocaleLowerCase()),
        switchMap(value => {
          return this.companyQuery.searchStocks(value);
        }),
        untilDestroyed(this),
        startWith([]),
      );
  }

  search(event: any) {
    this.searchTerm$.next(event.target.value);
  }

  onCompanySelected(value: any) {
    this.onValueChange.emit(value);
  }

}
