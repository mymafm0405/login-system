import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './design/header/header.component';
import { FormContainerComponent } from './design/form-container/form-container.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './design/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormContainerComponent,
    LoginFormComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
