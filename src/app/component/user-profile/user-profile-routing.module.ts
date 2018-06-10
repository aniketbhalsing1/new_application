import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ProfileHeaderComponent } from './../../component/-layouts/profile-header/profile-header.component';

const routes: Routes = [
  //{ path: '', component: DetailsComponent }
  { 
    path: '', 
    component: ProfileHeaderComponent,
    children: [
      { path: '', component: DetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
