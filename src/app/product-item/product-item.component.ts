import { Component, Input } from '@angular/core';

import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() items?: Product[];
}
