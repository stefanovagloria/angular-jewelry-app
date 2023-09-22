import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit{
  form: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.form = new FormGroup({
      "email": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.SignIn(
        this.form.value.email,
        this.form.value.password
      );
    }
  }
}
