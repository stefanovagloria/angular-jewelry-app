import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { InfoRoutingModule } from './info-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AboutComponent, ContactsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [InfoRoutingModule],
})
export class InfoModule {}
