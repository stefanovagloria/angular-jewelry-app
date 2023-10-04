import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {

  @Input() item?: any;


  constructor(private authService: AuthService, private apiService: ApiService){}


  addToShoppingCard(
    id: string,
    productName: string,
    price: number,
    category: string
  ) {
    console.log(id, productName, price, category);
    let user = this.authService.getCurrentUser();

    console.log(user.uid)

    this.apiService.addProductsToUserCard(user.uid, {id, productName, price, category} as Product)

   
  }
}
