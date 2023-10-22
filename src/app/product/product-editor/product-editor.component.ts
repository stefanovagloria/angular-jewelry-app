import { Component, EventEmitter, Output } from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css'],
})
export class ProductEditorComponent {
  @Output() newProductEvent = new EventEmitter<boolean>();

  formIsInvalid: boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}

  productForm = this.formBuilder.group({
    productName: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
  });

  onSubmit() {
    if (this.productForm.status === 'INVALID') {
        this.formIsInvalid = true;
      return;
    }
    this.formIsInvalid = false;

    this.apiService
      .addProduct({
        ...this.productForm.value,
      })
      .subscribe((value) => {
        this.newProductEvent.emit(true);
      });

    this.productForm.patchValue({ productName: '', price: '', category: '' });
  }
}
