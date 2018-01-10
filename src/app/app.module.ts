import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

import { IngenicoLibraryWS } from '../assets/js/ingenicolibraryws';

import { Has } from '../assets/js/has/has';
import { Avayahas } from '../assets/js/has/avayahas';
import { Commonhas } from '../assets/js/has/commonhas';
import { Ingenicohas } from '../assets/js/has/ingenicohas';
import { Ingenicoresourceshas } from '../assets/js/has/ingenicoresourceshas';

import { Idparser } from '../assets/js/lib/idparser';
import { IngenicoIntegration } from '../assets/js/lib/ingenicointegration';
import { Ingenicolibrarylegacy } from '../assets/js/lib/ingenicolibrarylegacy';
import { Shortcut } from '../assets/js/lib/shortcut';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    IngenicoLibraryWS, 
    Has, Avayahas, Commonhas, Ingenicohas, Ingenicoresourceshas,
    Idparser, IngenicoIntegration, Ingenicolibrarylegacy, Shortcut
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
