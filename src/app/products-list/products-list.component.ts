import { Component, OnInit } from '@angular/core';

import { Product } from '../interfaces/product';
import { ApiService } from '../api.service';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit{
  products?:any[];

  constructor(private apiService: ApiService){
    this.getData();
  }

  ngOnInit(): void {
    this.apiService.getProducts();
  }

  addData(){
    this.apiService.addProduct({productName: 'Earrings2', price: 30, category: 'Gold'});
  }

  getData(){
   this.apiService.getProducts().subscribe((value) => {
    console.log(value)
    this.products = value;
   
    for (const product of this.products) {
      console.log(product.product.category)
    }
   })
  }
}
