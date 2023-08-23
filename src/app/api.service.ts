import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private fs: Firestore) {}

  addProduct(prod: object) {
    let currentProduct = { product: prod };
    let productsCollection = collection(this.fs, 'products');
     addDoc(productsCollection, currentProduct).then(()=> {
      console.log('Created product!')
     }).catch((err) => {
      console.log(err);
     })
  }

  getProducts() {
    let productsCollection = collection(this.fs, 'products');
    return collectionData(productsCollection);
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
}
