import { Injectable } from '@angular/core';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import { AuthState, AuthStore } from './auth.store';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState>{

  constructor(store: AuthStore) {
    super(store);
    this.sync().subscribe();
  }

  createProfile(user: User): AuthState['profile'] {
    return { uid: user.uid, displayName: user.displayName };
  }
}
