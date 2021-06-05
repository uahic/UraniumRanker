import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthQuery } from '../../../../auth/state/auth.query';
import { CompanyProfilesQuery } from '../../state/company-profiles.query';
import { CompanyProfilesService } from '../../state/company-profiles.service';
import { FacadeService } from '../../state/facade.service';
import { createUserStock, UserStock } from '../../state/user-stock.model';
import { UserStocksQuery } from '../../state/user-stocks.query';
import { UserStocksService } from '../../state/user-stocks.service';
import { RowAction } from '../user-stocks-list/user-stocks-list.component';

@UntilDestroy()
@Component({
  selector: 'app-user-stocks',
  templateUrl: './user-stocks.component.html',
  styleUrls: ['./user-stocks.component.scss']
})
export class UserStocksComponent implements OnInit {

  userStocks$: Observable<UserStock[]>;

  constructor(
    private stocksService: UserStocksService,
    private stocksQuery: UserStocksQuery,
    private facadeService: FacadeService,
    private authQuery: AuthQuery
  ) { }

  ngOnInit(): void {
    this.userStocks$ = this.stocksQuery.selectAll();
  }

  onRowAction(action: RowAction): void {
    const stockId = action.rowData.id;

    switch (action.actionType) {
      case 'delete':
        this.facadeService.deleteUserStock(stockId);
        break;
      case 'change':
        const rating = action.rowData.rating;
        this.facadeService.updateUserStockRating(stockId, rating);
        break;
      default:
        console.error('Unknown action type');
        break;
    }
  }

  onAddStock(value) {
    const isin = value.id;
    if (this.stocksQuery.hasISIN(isin)) return;

    this.authQuery.select()
      .pipe(
        switchMap(auth => {
          const stock = createUserStock(this.stocksService.createId(), auth.uid, isin, value.displayName, value.symbol, {});
          return from(this.stocksService.add(stock))
        }),
        untilDestroyed(this),
        take(1)
      ).subscribe();
  }
}

