import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';



@NgModule({
  declarations: [
    AboutComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InfoModule { }
