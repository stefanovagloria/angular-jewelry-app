import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { MainComponent } from './main/main.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    MainComponent,
    ProductItemComponent,
    GalleryComponent,
    AboutComponent,
    ContactsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
