import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { FooterComponent } from './footer/footer.component';
import { MyCollectionModule } from './my-collection/my-collection.module';
import { HomeModule } from './home/home.module';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    FooterComponent,
  ],
  imports: [
    HomeModule,
    AuthModule,
    CatalogModule,
    MyCollectionModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
