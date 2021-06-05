import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { UserStock } from './user-stock.model';

export interface UserStocksState extends EntityState<UserStock, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user-stocks' })
export class UserStocksStore extends EntityStore<UserStocksState> {

  constructor() {
    super();
  }

}
