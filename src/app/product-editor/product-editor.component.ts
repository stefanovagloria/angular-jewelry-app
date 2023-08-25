import { Component } from '@angular/core';

import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent {

  productForm = new FormGroup({
    productName: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
  })
}
