import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      "email": new FormControl("", Validators.required),
      "password": new FormControl("", [Validators.required, Validators.minLength(4)]),
      "rePassword": new FormControl("", [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.authService.SignUp(
        this.form.value.email,
        this.form.value.password
      )
    }
  }
}
