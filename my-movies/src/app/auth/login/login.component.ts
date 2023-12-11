import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    this.spinner.show('sp5');

    authObs = this.authService.login(email, password);

    authObs.subscribe({
      next: (resData) => {
        this.isLoading = false;
        this.spinner.hide('sp5');
        this.router.navigate(['/collection']);
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
        this.spinner.hide('sp5');
      },
    });

    form.reset();
  }
}
