import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthQuery } from '../../state/auth.query';
import { AuthService } from '../../state/auth.service';
import { AuthCodeMapping } from '../../models/auth-codes.model';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  isLoading$ = this.authQuery.selectLoading();

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSignIn(): void {
    const { email, password } = this.form.value;
    this.authService.signin(email, password)
      .then(_ => this.router.navigate(['/']))
      .catch(reason => this.handleError(reason));
  }

  onSignInWithGoogle(): void {
    this.authService.signin('google')
      .then(_ => this.router.navigate(['/']))
      .catch(reason => this.handleError(reason));
  }

  onSignInWithFacebook(): void {
    this.authService.signin('facebook')
      .then(_ => this.router.navigate(['/']))
      .catch(reason => this.handleError(reason));
  }

  private handleError(reason: { code: string, message: string }): void {
    console.error(reason.message);
    this.form.setErrors({
      reason: reason ? reason.message : 'Unknown Error'
    });
  }

}
