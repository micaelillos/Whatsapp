import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './common/modules/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/common/header/header.component';
import { MaterialModule } from './common/modules/material.module';
import { OnlineComponent } from './components/online/online.component';
import { InitComponent } from './components/init/init.component';
import { TimedComponent } from './components/timed/timed.component';
import { SpinnerComponent } from './components/common/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactDialogComponent } from './components/timed/contact-dialog/contact-dialog.component';
import { ContactListItemComponent } from './components/common/contact-list-item/contact-list-item.component';
import { TimedListItemComponent } from './components/timed/timed-list-item/timed-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OnlineComponent,
    InitComponent,
    TimedComponent,
    SpinnerComponent,
    ContactDialogComponent,
    ContactListItemComponent,
    TimedListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
