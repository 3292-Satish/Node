import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { HobbyComponent } from "./hobby/hobby.component";
import { AuthGaurdService } from "./auth-gaurd.service";
import { AuthenticateService } from "./authentication.service";
import { ChangePassComponent } from './change-pass/change-pass.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register/:action', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGaurdService] },
  { path: 'hobby', component: HobbyComponent, canActivate:[AuthGaurdService] },
  { path: 'changePass', component:ChangePassComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HobbyComponent,
    ChangePassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [AuthenticateService, AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
