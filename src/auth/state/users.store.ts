import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { User } from '../models/user.model';

export interface UsersState extends EntityState<User, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', idKey: 'uid' })
export class UsersStore extends EntityStore<UsersState> {

  constructor() {
    super();
  }

}
