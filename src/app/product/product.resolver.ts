import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../types/product';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })


export class ProductResolver implements Resolve<Product> {
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
 
   return this.apiService.getProductById(route.params['id']);
  }
}
