import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { DetailsComponent } from './details/details.component';
import { ProfileHeaderComponent } from './../../component/-layouts/profile-header/profile-header.component';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ],
  declarations: [
    DetailsComponent,
    ProfileHeaderComponent
  ]
})
export class UserProfileModule { }
