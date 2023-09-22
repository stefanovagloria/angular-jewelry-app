import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';



@NgModule({
  declarations: [
    ProductEditorComponent,
    ProductItemComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductEditorComponent,
    ProductItemComponent,
    ProductsListComponent
  ]
})
export class ProductModule { }
