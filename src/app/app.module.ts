import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app-routing.module';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpLogInterceptor } from './new-interceptor.service';


import {ToastModule} from 'ng2-toastr/ng2-toastr';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { HttpService } from './services/http-services/http.service';
import { AuthService } from './component/auth/auth.service';
import { VerifyOtpComponent } from './component/auth/verify-otp/verify-otp.component';
import { ProfileComponent } from './component/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VerifyOtpComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ToastModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    routing
  ],
  providers: [HttpService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
