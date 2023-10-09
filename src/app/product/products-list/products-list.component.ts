import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  isDataLoaded: boolean = false;
  products: Product[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log('PorductsListComponent invoked')
    this.loadProducts();
    
  }

  loadProducts() {
    this.apiService.getProducts().subscribe((value) => {
      this.products = value;
      
      this.isDataLoaded = true;
    });
  }

  addItem(isNewItemAdded: boolean) {
    this.loadProducts();
  }
}
