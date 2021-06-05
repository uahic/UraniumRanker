import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthQuery } from '../../../auth/state/auth.query';
import { UserStocksStore, UserStocksState } from './user-stocks.store';
@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'user-stocks' })
export class UserStocksService extends CollectionService<UserStocksState> {

  constructor(
    store: UserStocksStore,
    private authQuery: AuthQuery
  ) {
    super(store);
    this.authQuery.select().pipe(
      filter(auth => !!auth && !!auth.uid),
      switchMap((auth) => {
        const uid = auth.uid;
        return this.syncCollection(ref => ref.where('uid', '==', uid))
      }),
    ).subscribe();
  }


}
