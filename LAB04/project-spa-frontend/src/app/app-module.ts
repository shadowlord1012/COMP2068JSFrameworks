import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProjectComponent } from './project/project.component';

//import Http client module to make http requests
import { HttpClientModule } from '@angular/common/http';
//Import the project service so we can inject it into the component
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    App,
    ProjectComponent
  ],
  imports: [ //list of modules that are needed
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ //list of services needed
    ProjectService,
  ],
  bootstrap: [ProjectComponent]
})
export class AppModule { }
