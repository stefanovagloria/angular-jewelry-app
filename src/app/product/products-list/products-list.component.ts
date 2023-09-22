import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service';

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
   })
  }
}
