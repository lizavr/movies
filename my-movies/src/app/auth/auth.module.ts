import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLinksComponent } from './auth-links/auth-links.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, AuthLinksComponent],
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class AuthModule {}
