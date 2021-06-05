import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthQuery } from '../../state/auth.query';
import { AuthService } from '../../state/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

function matchValidator(ctlName: string, ctlConfirmName: string) {
  return (formGroup: FormGroup): { [key: string]: boolean } => {
    const ctl = formGroup.controls[ctlName];
    const ctlConfirm = formGroup.controls[ctlConfirmName];
    if (!ctl || !ctlConfirm) return null;
    if (ctlConfirm.errors && !ctlConfirm.errors.nomatch) return null;

    if (ctl.value !== ctlConfirm.value) {
      ctlConfirm.setErrors({ nomatch: true });
    } else {
      ctlConfirm.setErrors(null);
    }
  }
}

@UntilDestroy()
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userDetailForm!: FormGroup;
  userPasswdForm!: FormGroup;
  isLoading$ = this.authQuery.selectLoading();

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userDetailForm = new FormGroup({
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      emailConfirmation: new FormControl('', [Validators.required, Validators.email]),
    },
      {
        validators: matchValidator('email', 'emailConfirmation')
      });

    this.userPasswdForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    },
      {
        validators: matchValidator('password', 'passwordConfirmation')
      })
  }

  onSignUp(): void {
    const { displayName, email } = this.userDetailForm.value;
    const { password } = this.userPasswdForm.value;
    from(this.authService.signup(email, password))
      .pipe(
        switchMap(credential => this.authService.update({ displayName: displayName })),
        untilDestroyed(this)
      )
      .subscribe({
        next: (transaction) => { this.router.navigate(['/']) },
        error: (reason) => this.handleError(reason)
      });
  }

  private handleError(reason: { code: string, message: string }): void {
    console.error(reason.message);

    // TODO display the reason message properly
    alert(reason.message)
  }

}
