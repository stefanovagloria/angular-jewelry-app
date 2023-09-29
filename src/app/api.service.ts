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

import { Product } from './product/product';
import { Subject } from 'rxjs';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private fs: Firestore) {}

  addProduct(prod: object) {
    let currentProduct = { product: prod };
    let productsCollection = collection(this.fs, 'products');
    addDoc(productsCollection, currentProduct)
      .then(() => {
        console.log('Created product!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProducts() {
    let productsCollection = collection(this.fs, 'products');
    return collectionData(productsCollection, { idField: 'id' });

    //, { idField: 'id'}
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

  deleteProduct(id: string) {
    let docRef = doc(this.fs, `products/${id}`);
    return deleteDoc(docRef);
  }

  async getProductById(id: string) {
    console.log(id);
    const docRef = doc(this.fs, `products/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());

      let productObj = docSnap.data();
      return productObj;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      return undefined;
    }
  }

  async addProductsToUserCard(userId: string, product: object) {
    const userRef = doc(this.fs, 'users', userId);

    // Set the "capital" field of the city 'DC'
    await setDoc(userRef, {products: arrayUnion(product)}, { merge: true });
  }
}
