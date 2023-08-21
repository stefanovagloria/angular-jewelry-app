import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'products', component: ProductsListComponent
  },
  {
    path: 'gallery', component: GalleryComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contacts', component: ContactsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* <a class="active" routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/products" routerLinkActive="active">Products </a>
      <a routerLink="/gallery" routerLinkActive="active">Gallery </a>
      <a routerLink="/about" routerLinkActive="active">About us</a>
      <a routerLink="/contacts" routerLinkActive="active">Contact us</a>*/
