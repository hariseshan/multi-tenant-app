import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  tenant: string = 'tenant1';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    const success = this.authService.login(
      this.username,
      this.password,
      this.tenant
    );

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password');
    }
  }
}

