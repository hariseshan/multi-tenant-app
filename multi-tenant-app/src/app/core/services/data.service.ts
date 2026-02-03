import { Injectable } from '@angular/core';
import data from '../../../assets/data.json';

@Injectable({ providedIn: 'root' })
export class DataService {

  private users: any[] = [...(data as any)];

  getAll() {
    return this.users;
  }

  add(user: any) {
    user.id = Date.now();
    this.users.push(user);
  }

  update(user: any) {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
  }

  delete(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
}
