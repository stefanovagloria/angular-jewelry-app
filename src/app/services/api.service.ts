import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  arrayUnion,
} from '@angular/fire/firestore';

import { setDoc } from 'firebase/firestore';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private fs: Firestore) {}

  addProduct(product: {}) {
    return this.http.post(
      'https://jewelry-app-550f2-default-rtdb.firebaseio.com/products.json',
      product
    );
  }

  getProducts() {
    return this.http
      .get<{ [id: string]: Product }>(
        'https://jewelry-app-550f2-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((productsAsJson) => {
          let products: Product[] = [];

          for (let id in productsAsJson) {
            products.push({ ...productsAsJson[id], id });
          }

          return products;
        })
      );
  }

  getProductById(id: string) {
   return  this.http.get(`https://jewelry-app-550f2-default-rtdb.firebaseio.com/products/${id}.json`)
  }

  updateProduct(
    productId: string,
    productName: string,
    price: number,
    category: string
  ) {
    const docRef = doc(this.fs, 'products', productId);
    updateDoc(docRef, { productName, price, category });
    return;
  }

  async addProductsToUserCard(userId: string, product: Product) {
    const userRef = doc(this.fs, 'users', userId);
    await setDoc(userRef, { products: arrayUnion(product) }, { merge: true });
  }

  async getUserProducts(userId: string) {
    const docRef = doc(this.fs, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let productsForCurrentUser = docSnap.data()['products'];
      return productsForCurrentUser;
    } else {
      return undefined;
    }
  }

  async deleteAddedProduct(userId: string, userProducts: Product[]) {
    const userRef = doc(this.fs, 'users', userId);

    await updateDoc(userRef, {
      products: userProducts,
    });
  }
}
