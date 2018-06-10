import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VerifyOtpComponent,
    AuthHeaderComponent,
    ProfileHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ToastModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    routing,
    //NgbModule.forRoot()
  ],
  providers: [HttpService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
