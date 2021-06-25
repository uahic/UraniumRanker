import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyProfile } from '../../state/company-profile.model';

@Component({
  selector: 'app-company-profile-list',
  templateUrl: './company-profile-list.component.html',
  styleUrls: [
    './company-profile-list.component.scss',
    '../../styles/common.scss'
  ]
})
export class CompanyProfileListComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() profiles: CompanyProfile[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedIsin:  string | undefined = undefined;

  displayedColumns = ['symbol', 'displayName', 'rating', 'numRatings'];
  dataSource = new MatTableDataSource();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: this.fb.array([])
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.profiles) {
      const profiles = this.profiles;
      const rowArray = this.form.get('rows') as FormArray;
      rowArray.clear();
      const rows = profiles.map(value => this.fb.group({
        id: new FormControl(value.id),
        symbol: new FormControl(value.symbol),
        displayName: new FormControl(value.displayName),
        rating: new FormControl(Math.ceil(value.sumRatings / value.numRatings)),
        numRatings: new FormControl(value.numRatings)
      }));
      rows.forEach(r => {
        rowArray.push(r);
      });
      this.updateView();
    }
  }

  updateView(): void {
    const controls = (this.form.get('rows') as FormArray).controls;
    this.dataSource = new MatTableDataSource(controls);
    this.dataSource.sort = this.sort;
    // this.dataSource.sortData = (data: AbstractControl[], sort: MatSort) => {
    //   return data.sort((a: AbstractControl, b: AbstractControl) => {
    //     a.value
    //   });
    // };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (data: AbstractControl, sortHeaderId: string) => {
      const value: any = data.value[sortHeaderId];
      return typeof value === 'string' ? value.toLocaleLowerCase() : value;
    }
    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    }
  }

  onApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelectedIndex(index: number) {
    this.selectedIsin = this.profiles[index].id as string;
  }

}
