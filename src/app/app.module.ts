import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { CommonModule } from '@angular/common';

//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { HttpService } from './services/http-services/http.service';
import { AuthService } from './component/auth/auth.service';
import { VerifyOtpComponent } from './component/auth/verify-otp/verify-otp.component';
import { AuthHeaderComponent } from './component/-layouts/auth-header/auth-header.component';
import { ProfileHeaderComponent } from './component/layouts/profile-header/profile-header.component';
import { AppFooterComponent } from './component/-layouts/app-footer/app-footer.component';

import { routing } from './app-routing.module';
import { MyHttpLogInterceptor } from './new-interceptor.service';
import { AngularMaterialModule } from './modules/angular-material.module'
import {ErrorStateMatcher} from '@angular/material/core';
import { EqualValidator } from './directive/validate-equal.directive';
import { VerifyEmailComponent } from './component/auth/verify-email/verify-email.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VerifyOtpComponent,
    AuthHeaderComponent,
    ProfileHeaderComponent,
    AppFooterComponent,
    EqualValidator,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ToastModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    routing,
    CommonModule,
    AngularMaterialModule
  ],
  providers: [HttpService, AuthService, ErrorStateMatcher, { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
