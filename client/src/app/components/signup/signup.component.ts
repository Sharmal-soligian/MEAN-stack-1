import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  submitted: boolean = false;
  signUpErrorMsg: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authServices: AuthService
  ) {
      this.signUpForm = this.fb.group({
        username: ['', [Validators.required]],
        name: ['', [Validators.required]],
        contact: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmP: ['', [Validators.required]]
      })
  }

  ngOnInit(): void {
  }

  toLogin() {
    this.router.navigate(['/'])
  }

  signupSubmit() {
    this.submitted = true;

    if(this.signUpForm.invalid) {
      return;
    }

    this.authServices.createUser(this.signUpForm.value).subscribe(
      () => {
        this.handleSignupSuccess()
      },
      (err: any) => {
        this.handleSignupError(err);
      }
    );
  };

  private handleSignupSuccess() {
    this._snackBar.open('You have successfully created and account!', 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
    this.signUpForm.reset();
    this.router.navigate(['/']);
  }

  private handleSignupError(err: any) {
    console.error('Error while creating user', err);
    this.signUpErrorMsg = err.error?.message;
    this._snackBar.open(this.signUpErrorMsg, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }
}
