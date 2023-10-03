import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  userProducts: Product[] = [];

  get totalAmount() {
    let sum = 0;
    this.userProducts.forEach((product) => (sum += product.price));
    return sum;
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getOrderedProducts();
  }

  async getOrderedProducts() {
    let products = await this.apiService.getUserProducts(
      'lSRy3MoP4gNlHaQwjmUbVzFN52I2'
    );
    this.userProducts = products;
  }

  removeProduct(productId: string) {
    this.userProducts = this.userProducts.filter(
      (product) => product.id !== productId
    );

    this.apiService.deleteAddedProduct(
      'lSRy3MoP4gNlHaQwjmUbVzFN52I2',
      this.userProducts
    );
  }

  removeAllProducts(){
    this.apiService.deleteAddedProduct('lSRy3MoP4gNlHaQwjmUbVzFN52I2', []);
    this.userProducts = [];
  }
  
}
