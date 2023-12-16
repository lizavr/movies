import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  isLoading = false;
  registerForm: FormGroup = new FormGroup({});
  password: string = '';
  confirmPassword: string = '';
  showConfirmPassword: boolean = false;
  showPassword: boolean = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const userName = form.value.userName;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    this.spinner.show('sp5');

    authObs = this.authService.signup(email, password, userName);

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        this.spinner.hide('sp5');
        this.router.navigate(['/collection']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
        this.spinner.hide('sp5');
      },
    });

    form.reset();
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
