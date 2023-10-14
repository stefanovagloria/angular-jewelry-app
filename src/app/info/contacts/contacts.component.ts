import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  sendMessage() {
    let currentUser = this.authService.getCurrentUser();

    let data = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      message: this.contactForm.value.message,
      userId: currentUser.uid,
      status: 'Unread',
    };

    this.apiService.postMessage(data).subscribe((response) =>{
      this.contactForm.reset();
    });
  }
}
