import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public service: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.service.getUserAuth()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}