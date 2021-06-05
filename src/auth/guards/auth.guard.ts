import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AuthQuery } from '../state/auth.query';
import { AuthService } from '../state/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (!environment.production) {
    //   return true;
    // }
    return this.authQuery.selectIsSignedIn()
      .pipe(
        map(isSignedIn => {
          if (!!isSignedIn) {
            return true;
          }
          this.router.navigate(['/auth/signin']);
          return false;
        }),
        catchError(error => {
          console.error(error);
          this.router.navigate(['/auth/signin']);
          return of(false);
        }),
      );
  }

}
