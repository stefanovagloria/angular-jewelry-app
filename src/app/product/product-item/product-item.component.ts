import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {

  @Input() item?: any;


  constructor(private authService: AuthService, private apiService: ApiService){}

  ngOnInit(): void {
   
  }

  addToShoppingCard(
    id: string,
    productName: string,
    price: number,
    category: string
  ) {
    console.log(id, productName, price, category);
    let user = this.authService.getCurrentUser();

    console.log(user.uid)

    this.apiService.addProductsToUserCard(user.uid, {id, productName, price, category})

   
  }
}
