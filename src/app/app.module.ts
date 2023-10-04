import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { InfoModule } from './info/info.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { ApiService } from './services/api.service';
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
    HomeComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    InfoModule,
    ProductModule,
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
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
