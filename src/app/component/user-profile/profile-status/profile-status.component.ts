import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProfileService } from './../../../component/user-profile/profile.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.css']
})
export class ProfileStatusComponent implements OnInit {
  personalDetails : any;
  constructor(private profileService : ProfileService, public toaster: ToastsManager, vcr: ViewContainerRef) {
		this.toaster.setRootViewContainerRef(vcr);
	 } 

  ngOnInit() {
    this.personalDetails = {"firstName" : '', "lastName" : '', "mobileVerified" : '', "emailVerified" : '', "educationProfile" : '', "clinicProfile" : ''};

      this.profileService.getDoctorProfileStatus()
        .subscribe(
            data => {
              this.personalDetails = data.data;  
            },
            error => this.toaster.error(error.error.error[0].errorMessage)
        );
  }



}
