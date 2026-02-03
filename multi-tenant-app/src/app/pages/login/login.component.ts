import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      tenant: ['', Validators.required]
    });
  }

  login() {

    if (this.loginForm.invalid) {
      return;
    }
    const { username, password, tenant } = this.loginForm.value;
    const success = this.authService.login(username, password, tenant);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Invalid credentials';
    }
  }
}
