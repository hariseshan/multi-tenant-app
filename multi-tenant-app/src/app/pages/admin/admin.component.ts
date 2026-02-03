import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  users: any[] = [];
  name = '';
  email = '';
  editId: number | null = null;

  constructor(private data: DataService) {
    this.users = this.data.getAll();
  }

  save() {
    if (this.editId) {
      this.data.update({
        id: this.editId,
        name: this.name,
        email: this.email
      });
      this.editId = null;
    } else {
      this.data.add({ name: this.name, email: this.email });
    }

    this.clear();
  }

  edit(user: any) {
    this.name = user.name;
    this.email = user.email;
    this.editId = user.id;
  }

  delete(id: number) {
    this.data.delete(id);
    this.users = this.data.getAll();
  }

  clear() {
    this.name = '';
    this.email = '';
  }
}
