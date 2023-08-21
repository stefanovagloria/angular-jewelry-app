import { Component } from '@angular/core';

import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  products: Product[] = [
    {
      productName: 'Bracelet',
      price: 45,
      category: 'Silver'
    },
    {
      productName: 'Earrings',
      price: 50,
      category: 'Gold'
    },
  ]
 
}
