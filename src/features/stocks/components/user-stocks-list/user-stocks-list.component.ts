import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserStock } from '../../state/user-stock.model';

export interface RowAction {
  actionType: 'delete' | 'change';
  rowData: any;
}
@Component({
  selector: 'app-user-stocks-list',
  templateUrl: './user-stocks-list.component.html',
  styleUrls: [
    './user-stocks-list.component.scss',
    '../../styles/common.scss'
  ]
})
export class UserStocksListComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @Output() onRowAction = new EventEmitter<RowAction>();
  @Input() stocks: UserStock[];

  displayedColumns = ['symbol', 'name', 'rating', 'action'];
  dataSource = new MatTableDataSource<any>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      rows: this.fb.array([])
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stocks) {
      const stocks = this.stocks;
      const rowArray = this.form.get('rows') as FormArray;
      rowArray.clear();
      const rows = stocks.map(value => this.fb.group({
        id: new FormControl(value.id),
        symbol: new FormControl(value.symbol),
        name: new FormControl(value.displayName),
        rating: new FormControl(value.rating),
        action: new FormControl('existingRecord')
      }));
      rows.forEach(r => {
        rowArray.push(r);
        r.valueChanges.subscribe(c => this.onRowChanged(c));
      });
      this.updateView();
    }
  }

  ngAfterViewInit(): void {
    this.updateView();
  }

  updateView() {
    this.setupDataSource((this.form.get('rows') as FormArray).controls);
  }

  private setupDataSource(controls: AbstractControl[]) {
    this.dataSource = new MatTableDataSource(controls);
    this.dataSource.sort = this.sort;
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

  onDelete(index: number): void {
    const id = this.stocks[index].id;
    const rowAction: RowAction = {
      actionType: 'delete',
      rowData: { id: id },
    };
    this.onRowAction.emit(rowAction);
  }

  onRowChanged(row: UserStock): void {
    const rowAction: RowAction = {
      actionType: 'change',
      rowData: row
    }
    this.onRowAction.emit(rowAction);
  }

}
