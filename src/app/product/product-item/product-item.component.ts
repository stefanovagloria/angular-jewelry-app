import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit{
  @Input() item: Product;

  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    })
  }

  addToShoppingCard(
    id: string,
    productName: string,
    price: number,
    category: string
  ) {

    let user = this.authService.getCurrentUser();
    this.apiService.addProductsToUserCard(user.uid, {
      id,
      productName,
      price,
      category,
    } as Product);
  }
}
