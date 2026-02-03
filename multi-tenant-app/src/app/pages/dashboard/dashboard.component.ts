import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  role = '';
  tenant = '';
  isUnauthorized = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

    const user = this.auth.getUser();

    this.role = user.role;
    this.tenant = user.tenant;

    if (this.role === 'User' && this.tenant === 'tenant2') {
      this.isUnauthorized = true;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
