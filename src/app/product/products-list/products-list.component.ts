import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  isDataLoaded: boolean = false;
  products?: any[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((value) => {
      this.products = value;
      this.isDataLoaded = true;
    });

  }

  addData() {
    this.apiService.addProduct({
      productName: 'Earrings2',
      price: 30,
      category: 'Gold',
    });
  }
}
