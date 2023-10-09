import { Component, EventEmitter, Output } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css'],
})
export class ProductEditorComponent {
  @Output() newProductEvent = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {}

  productForm = new FormGroup({
    productName: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
  });

  onSubmit() {
    let newProduct = {
      productName: this.productForm.value.productName,
      price: Number(this.productForm.value.price),
      category: this.productForm.value.category,
    };

    this.apiService
      .addProduct({
        newProduct,
      })
      .subscribe((value) => {
        console.log(value);
        this.newProductEvent.emit(true);
      });

    this.productForm.patchValue({ productName: '', price: '', category: '' });
  }
}
