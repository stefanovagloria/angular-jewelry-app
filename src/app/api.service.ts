import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData, addDoc, doc, deleteDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private fs: Firestore) { }

  getProducts(){
    let productsCollection = collection(this.fs, 'products');
    return collectionData(productsCollection);
  }


  addProduct(prod: object){
    let currentProduct = {product: prod};
    let productsCollection = collection(this.fs, 'products');
    return addDoc(productsCollection,currentProduct);
  }

  deleteProduct(id: string){
    let docRef = doc(this.fs, `products/${id}`);
    return deleteDoc(docRef);
  }
}
