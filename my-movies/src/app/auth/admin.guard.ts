import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const myGuard: CanActivateFn = () => {
  const myService = inject(AuthService);
  return myService.isAdmin();
};
