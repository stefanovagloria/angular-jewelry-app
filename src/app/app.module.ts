import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { MainComponent } from './main/main.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {  AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ApiService } from './api.service';
import { AuthService } from './shared/services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


const firebaseConfig = {
  apiKey: 'AIzaSyDvcSZYc_Ions6pqbSVI51sRtwqHoZDl2k',

  authDomain: 'jewelry-app-550f2.firebaseapp.com',

  projectId: 'jewelry-app-550f2',

  storageBucket: 'jewelry-app-550f2.appspot.com',

  messagingSenderId: '776564391858',

  appId: '1:776564391858:web:9199f2cb4c4ded1e772eab',

  measurementId: 'G-N5GCH9PTY9',
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    MainComponent,
    ProductItemComponent,
    GalleryComponent,
    AboutComponent,
    ContactsComponent,
    HomeComponent,
    ProductEditorComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    ButtonModule,
    CardModule,
    //AngularFireModule.initializeApp(firebaseConfig),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    AngularFireDatabaseModule,
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    ApiService,
    AuthService,
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }
    //AngularFirestore
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
