import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css'],
})
export class ProductEditorComponent {
  constructor(private apiService: ApiService) {}

  productForm = new FormGroup({
    productName: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
  });

  onSubmit() {
    this.apiService.addProduct({
      productName: this.productForm.value.productName,
      price: Number(this.productForm.value.price),
      category: this.productForm.value.category,
    });
  }
}
