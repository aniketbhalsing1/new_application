import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './../../../component/user-profile/profile.service';
//import { DetailsComponent } from './../../../component/user-profile/details/details.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-add-edu-popup',
  templateUrl: './add-edu-popup.component.html',
  styleUrls: ['./add-edu-popup.component.css']
})
export class AddEduPopupComponent implements OnInit {
  eduForm : FormGroup;
  capturedData : any;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEduPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private profileService : ProfileService, public toaster: ToastsManager, vcr: ViewContainerRef) {
      this.toaster.setRootViewContainerRef(vcr);
      this.capturedData = data;
     }

  ngOnInit() {
    this.eduForm = this.fb.group({
      degreeName: [this.capturedData.data.degreeName, []],
      speciality: [this.capturedData.data.speciality, []],
      Institute: [this.capturedData.data.Institute, []],
      year: [this.capturedData.data.year, []],
      state: [this.capturedData.data.state, []],
      city: [this.capturedData.data.city, []],
    });
  }

  saveDetails(form){
		let data = {
        "doctorId": this.capturedData.doctorId,
        "degreeId": 1,
        "degreeName":form.value.degreeName,
        "specialityId": 2,
        "speciality": form.value.speciality,
        "Institute": form.value.Institute,
        "city": form.value.city,
        "state": form.value.state,
        "year": form.value.year
    }
	
		this.profileService.saveEducationDetails(data)
        .subscribe(
          data => this.toaster.success('Education details saved successfull'),
          error => this.toaster.error(error.error.error[0].errorMessage)
        );
  }
  
  deleteEducation(form){
		this.profileService.deleteEducation(this.capturedData.data.doctorDegreeId)
        .subscribe(
          data => this.toaster.success('Education details deleted successfull'),
          error => this.toaster.error(error.error.error[0].errorMessage)
        );
	}

  close(flag) {
      this.dialogRef.close();
  }

}
