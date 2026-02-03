import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  userForm!: FormGroup;
  editId: number | null = null;
  emailExists = false;
  successMsg = '';
  errorMsg = '';
  showForm = true;
  role = '';

  constructor(
    private fb: FormBuilder,private dataService: DataService,
    private route: ActivatedRoute,private router: Router,
  ) { }


  ngOnInit() {
    this.users = this.dataService.getAll();

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
      ]]
    });
    this.role = JSON.parse(localStorage.getItem('user')!).role;
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    const toastEl = document.getElementById('successToast');
    if (toastEl) {
      const toast = new (window as any).bootstrap.Toast(toastEl, {
        delay: 3000,    
        autohide: true
      });
      toast.show();
    }
  }

  showError(msg: string) {
    this.errorMsg = msg;
    const toastEl = document.getElementById('errorToast');
    if (toastEl) {
      const toast = new (window as any).bootstrap.Toast(toastEl, {
        delay: 3000,    
        autohide: true
      });
      toast.show();
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  save() {

    if (this.userForm.invalid || this.emailExists) {
      this.showError('Please fix errors before submitting');
      return;
    }
    const formData = this.userForm.value;
    if (this.editId) {
      this.dataService.update({
        id: this.editId,
        ...formData
      });
      this.showSuccess('User updated successfully');
      this.editId = null;
    } else {
      this.dataService.add(formData);
      this.showSuccess('User added successfully');
    }
    this.users = this.dataService.getAll();
    this.userForm.reset();
  }

  edit(user: any) {
    this.editId = user.id;
    this.userForm.patchValue(user);
  }
  delete(id: number) {
    this.dataService.delete(id);
    this.users = this.dataService.getAll();
    this.showSuccess('User deleted successfully');
  }

  checkEmail() {
    const email = this.userForm.get('email')?.value;

    this.emailExists = this.users.some(
      u => u.email === email && u.id !== this.editId
    );
  }
}
