import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/types/product';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: any = {};

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      ( product ) => (this.product = product)
    );


  }
  addToShoppingCard(
    id: string,
    productName: string,
    price: number,
    category: string
  ) {

    console.log(id,productName)
    let user = this.authService.getCurrentUser();
    this.apiService.addProductsToUserCard(user.uid, {
      id,
      productName,
      price,
      category,
    } as Product);
  }
}
