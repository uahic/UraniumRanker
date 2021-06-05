import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoginComponent } from '../../../../auth/components/login/login.component';
import { AuthQuery } from '../../../../auth/state/auth.query';
import { AuthService } from '../../../../auth/state/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit {
  isSignedIn$ = this.authQuery.selectIsSignedIn();

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSignIn(): void {
    this.dialog.open(LoginComponent)
  }

  async onSignOut() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }

}
