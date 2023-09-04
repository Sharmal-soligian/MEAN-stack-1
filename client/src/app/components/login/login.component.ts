import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {

  }

  toSignup() {
    this.router.navigate(['/signup'])
  }

  loginSubmit() {
    this.submitted = true;

    if(this.loginForm.valid) {
      const email = this.loginForm.value?.email;
      const password = this.loginForm.value?.password;
      this.authService.login(email, password).subscribe(
        () => {
          this.router.navigate(['/dashboard'])
        },
        (err: any) => {
          console.error('Error while login', err);
          this._snackbar.open(err.error?.error, 'Close', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
        }
      );
    };
  };

}
