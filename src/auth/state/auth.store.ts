import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { FireAuthState, initialAuthState, RoleState } from 'akita-ng-fire';
import { User } from '../models/user.model';
import { Roles } from '../models/roles.model';

// export interface AuthState extends FireAuthState<User>, RoleState<Roles> { }
export interface AuthState extends FireAuthState<User> { }
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(initialAuthState);
  }

}
