import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { UsersStore, UsersState } from './users.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class UsersService extends CollectionService<UsersState> {

  private isInitialized = false;

  constructor(store: UsersStore) {
    super(store);
  }

  init() {
    if(!this.isInitialized){
      this.isInitialized = true;
      this.syncCollection().subscribe();
    }
  }

}
