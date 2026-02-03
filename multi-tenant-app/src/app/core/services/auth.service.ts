import { Injectable } from '@angular/core';
import users from '../../../assets/users.json';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(username: string, password: string, tenant: string) {
    const user = (users as any).find(
      (u: any) => u.username === username &&
        u.password === password &&
        u.tenant === tenant
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }
}
