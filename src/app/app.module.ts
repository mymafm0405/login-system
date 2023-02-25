import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './design/header/header.component';
import { FormContainerComponent } from './design/form-container/form-container.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './design/loading/loading.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddPostContainerComponent } from './design/add-post-container/add-post-container.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './design/home-page/home-page.component';
import { NavBarComponent } from './design/nav-bar/nav-bar.component';
import { ManageComponent } from './design/manage/manage.component';
import { AuthGuardService } from './components/auth/auth-guard.service';
import { PostComponent } from './components/post/post.component';
import { ModalComponent } from './design/modal/modal.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'add-post',
    component: AddPostContainerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'auth', component: FormContainerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormContainerComponent,
    LoginFormComponent,
    LoadingComponent,
    AddPostComponent,
    AddPostContainerComponent,
    HomePageComponent,
    NavBarComponent,
    ManageComponent,
    PostComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
