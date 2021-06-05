import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Role } from 'akita-ng-fire';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  user$ = this.select('user');
  roles$ = this.select('roles');
  profile$ = this.select('profile');

  constructor(protected store: AuthStore) {
    super(store);
  }

  selectIsSignedIn(): Observable<boolean> {
    return this.profile$
      .pipe(map(user => !!user));
  }

  hasRole(requiredRole: Role): Observable<boolean> {
    return this.roles$.pipe(map(role => role[requiredRole]));
  }

}
