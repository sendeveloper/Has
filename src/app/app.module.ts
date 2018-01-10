import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

import { IngenicoLibraryWS } from '../assets/js/ingenicolibraryws';
import { Shortcut } from '../assets/js/shortcut';
import { IngenicoIntegration } from '../assets/js/ingenicointegration';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [IngenicoLibraryWS, Shortcut, IngenicoIntegration],
  bootstrap: [AppComponent]
})
export class AppModule { }
