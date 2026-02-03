import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  role = '';

  constructor(private auth: AuthService,
    private router: Router) {

    this.role = this.auth.getUser().role;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
