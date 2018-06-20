import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';


import { UserProfileRoutingModule } from './user-profile-routing.module';
import { DetailsComponent } from './details/details.component';
import { ProfileHeaderComponent } from './../../component/-layouts/profile-header/profile-header.component';
import { ProfileStatusComponent } from './profile-status/profile-status.component';

import { MyHttpLogInterceptor } from './../../new-interceptor.service';
import { HttpService } from './../../services/http-services/http.service';
import { ProfileService } from './../../component/user-profile/profile.service';
import { AngularMaterialModule } from './../../modules/angular-material.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEduPopupComponent } from './add-edu-popup/add-edu-popup.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {ErrorStateMatcher} from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ToastModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularMaterialModule,
    //NgbModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    DetailsComponent,
    ProfileHeaderComponent,
    ProfileStatusComponent,
    AddEduPopupComponent
  ],
  entryComponents: [AddEduPopupComponent],
  providers: [HttpService, ProfileService, ErrorStateMatcher, { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }],
  
})
export class UserProfileModule { }
