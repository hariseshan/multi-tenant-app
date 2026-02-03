import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    const user = this.auth.getUser();

    if (user.role === 'Admin') return true;

    this.router.navigate(['/dashboard']);
    return false;
  }
}
