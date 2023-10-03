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
  arrayRemove,
} from '@angular/fire/firestore';


import { setDoc } from 'firebase/firestore';
import { Product } from '../types/product';

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

  async getProductById(id: string) {
    const docRef = doc(this.fs, `products/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());

      let productObj = docSnap.data();
      return productObj as Product;
    } else {
      return undefined;
    }
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

  async addProductsToUserCard(userId: string, product: object) {
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
