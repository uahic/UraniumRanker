import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserStocksStore, UserStocksState } from './user-stocks.store';

@Injectable({ providedIn: 'root' })
export class UserStocksQuery extends QueryEntity<UserStocksState> {

  constructor(protected store: UserStocksStore) {
    super(store);
  }

  hasISIN(isin: string): boolean {
    const collection = this.getAll();
    const hasMatch = collection.find(stock => stock.isin.trim().match(isin.trim()));
    return !!hasMatch;
  }

}
