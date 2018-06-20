import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ProfileHeaderComponent } from './../../component/-layouts/profile-header/profile-header.component';
import { ProfileStatusComponent } from './profile-status/profile-status.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProfileHeaderComponent,
    children: [
      { path: '', component: DetailsComponent },
      //{ path: 'profileStatus', component: ProfileStatusComponent }
    
    ]
  },
  // { 
  //   path: '', 
  //   component: ProfileHeaderComponent,
  //   children: [
  //     { path: 'profileStat', component: ProfileStatusComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
