import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProfileService } from './../../../component/user-profile/profile.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AddEduPopupComponent } from './../add-edu-popup/add-edu-popup.component';
import {ErrorStateMatcher} from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

var validation_messages = {
	'firstMiddleLastName': [
	  { type: 'required', message: 'Name is required' },
	  { type: 'minlength', message: 'Name must be at least 3 characters long' },
	  { type: 'maxlength', message: 'Name cannot be more than 20 characters long' },
	  { type: 'pattern', message: 'Please enter valid name' },
	],
	'email': [
	  { type: 'required', message: 'Email Id is required' },
	  { type: 'minlength', message: 'Email Id must be at least 7 characters long' },
	  { type: 'maxlength', message: 'Email Id cannot be more than 30 characters long' },
	  { type: 'pattern', message: 'Please enter valid email id' }
	],
	'password': [
	  { type: 'required', message: 'Password is required' },
	  { type: 'minlength', message: 'Password must be at least 6 characters long' },
	  { type: 'maxlength', message: 'Password cannot be more than 15 characters long' },      
	  { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
	],
	'confirmPassword': [
	  { type: 'required', message: 'Confirm password is required' },
	  { type: 'minlength', message: 'Password must be at least 6 characters long' },
	  { type: 'maxlength', message: 'Password cannot be more than 15 characters long' },      
	  { type: 'areEqual', message: 'Password mismatch' }
	],
	'mobileNo': [
	  { type: 'required', message: 'Mobile number is required' },
	  { type: 'minlength', message: 'Mobile number must be at least 10 characters long' },
	  { type: 'maxlength', message: 'Mobile number cannot be more than 10 characters long' },
	  { type: 'pattern', message: 'Please enter valid mobile number' }
	],
	'officeNo': [
	  { type: 'required', message: 'Mobile number is required' },
	  { type: 'minlength', message: 'Mobile number must be at least 10 characters long' },
	  { type: 'maxlength', message: 'Mobile number cannot be more than 10 characters long' },
	  { type: 'pattern', message: 'Please enter valid mobile number' }
	],
	'registrationNo': [
	  { type: 'required', message: 'Registration number is required' },
	  { type: 'minlength', message: 'Registration number must be at least 7 characters long' },
	  { type: 'maxlength', message: 'Registration number cannot be more than 30 characters long' },
	  { type: 'pattern', message: 'Please enter valid registration number' }
	],
	"adharNo" : [
		{ type: 'required', message: 'Aadhar number is required' },
	  { type: 'minlength', message: 'Aadhar number must be at least 12 characters long' },
	  { type: 'maxlength', message: 'Aadhar number cannot be more than 12 characters long' },
	  { type: 'pattern', message: 'Please enter valid aadhar number' }
	],
	"panNo" : [
		{ type: 'required', message: 'PAN number is required' },
	  { type: 'minlength', message: 'PAN number must be at least 11 characters long' },
	  { type: 'maxlength', message: 'PAN number cannot be more than 11 characters long' },
	  { type: 'pattern', message: 'Please enter valid PAN number' }
	],
	"state" : [
		{ type: 'required', message: 'State is required' },
	  { type: 'minlength', message: 'State must be at least 3 characters long' },
	  { type: 'pattern', message: 'Please enter valid state'  }
	],
	"city" : [
		{ type: 'required', message: 'City is required' },
	  { type: 'minlength', message: 'City must be at least 3 characters long' },
	  { type: 'pattern', message: 'Please enter valid city'  }
	],
	"addressLine1" : [
		{ type: 'required', message: 'City is required' },
	  { type: 'minlength', message: 'City must be at least 3 characters long' },
	  { type: 'pattern', message: 'Please enter valid city'  }
	],
	"addressLine2" : [
		{ type: 'required', message: 'City is required' },
	  { type: 'minlength', message: 'City must be at least 3 characters long' },
	  { type: 'pattern', message: 'Please enter valid city'  }
	],
	"pincode" : [
		{ type: 'required', message: 'Pincode is required' },
	  { type: 'minlength', message: 'Pincode must be at least 3 characters long' },
	  { type: 'pattern', message: 'Please enter valid Pincode'  }
	]

  }
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	personalForm : FormGroup;
	clinicForm : FormGroup;
	personalDetails : {"firstName" : '', "middleName" : '', "lastName" : '', "mobileNo" : '', "mobileNo1" : '', "officeNo" : '', "registrationNo" : '', "adharNo" : '', "panNo" : '', "line1" : '', "line2" : '', "area" : '', "pincode" : '', "state" : '', "city" : '', "emailId" : ''};
//	personalDetails : {"firstName" : '', "middleName" : '', "lastName" : '', "mobileNo" : '', "mobileNo1" : '', "officeNo" : '', "registrationNo" : '', "adharNo" : '', "panNo" : '', "emailId" : '', "Address" : {"line1" : '', "line2" : '', "areaId" : '', "area" : '', "pincode" : '', "stateId" : '', "state" : '', "cityId" : '', "city" : ''}};
	event : any;
	copiedData : any;
	educationList : any;
	stateList : any;
	cityList : any;
	areaList : any;
	personalLoad : boolean = false;
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	fmlNamepattern = "^[a-zA-Z_-]{8,15}$";
	pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
	
	validation_messages = validation_messages;
	matcher = new MyErrorStateMatcher();
	
	myControl: FormControl = new FormControl();
	options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]>;

	
	constructor(private router: Router, private fb : FormBuilder, public dialog: MatDialog, public toaster: ToastsManager, private profileService : ProfileService, vcr: ViewContainerRef) {
		this.toaster.setRootViewContainerRef(vcr);
	 }

  ngOnInit() {
	this.getDoctorPrsonalDetails();
		this.setData(undefined);
		this.educationDetails()
		this.getStates()
		this.clinicForm = new FormGroup({
			clinicName: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
			tagLine: new FormControl('', [ Validators.minLength(3), Validators.maxLength(20) ]),
			contactNo: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.minLength(20) ]),
			contactNo1: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.minLength(20) ]),
			emailId: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.minLength(10) ]),
			registrationNo: new FormControl('', [Validators.maxLength(10), Validators.minLength(10) ]),
			line1: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.minLength(10) ]),
			line2: new FormControl('', [ Validators.maxLength(10), Validators.minLength(10) ]),
			area: new FormControl('', [ Validators.maxLength(10), Validators.minLength(10) ]),
			state: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.minLength(10) ]),
			city: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.minLength(10) ]),
			pincode: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.minLength(10) ]),			
		});
	}

	getDoctorPrsonalDetails(){
		this.profileService.getDoctorPrsonalDetails()
			.subscribe(
					data => {
						this.getCity(data.data.address.state)
						this.getArea(data.data.address.city)
						this.setData(data.data);
					},
					error => this.toaster.error(error.error.error[0].errorMessage)
			);
	}
	state : number;
	city : number;
	area : number;
	setData(data) {
		this.copiedData = JSON.stringify(data); 
		if (data){
			this.state = parseInt(data.address.state)
			this.city = parseInt(data.address.city)
			this.area = parseInt(data.address.area)	
		}
		this.personalForm = new FormGroup({
			firstName: new FormControl(data ? data.firstName : '', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
			middleName: new FormControl(data ? data.middleName : '', [ Validators.minLength(3), Validators.maxLength(20) ]),
			lastName: new FormControl(data ? data.lastName : '', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
			mobileNo: new FormControl(data ? data.mobileNo : '', [ Validators.required, Validators.maxLength(11), Validators.minLength(11) ]),
			mobileNo1: new FormControl(data ? data.mobileNo1 : '', [Validators.maxLength(11), Validators.minLength(11) ]),
			officeNo: new FormControl(data ? data.officeNo : '', [ Validators.maxLength(11), Validators.minLength(11) ]),
			emailId: new FormControl(data ? data.emailId : '', [ Validators.required, Validators.maxLength(30), Validators.minLength(7) ]),
			registrationNo: new FormControl(data ? data.registrationNo : '', [ Validators.required, Validators.maxLength(15), Validators.minLength(10) ]),
			adharNo: new FormControl(data ? data.adharNo : '', [ Validators.required, Validators.maxLength(12), Validators.minLength(12) ]),
			panNo: new FormControl(data ? data.panNo : '', [ Validators.required, Validators.maxLength(10), Validators.minLength(10) ]),
			line1: new FormControl(data && data.address ? data.address.line1 : '', [ Validators.required, Validators.maxLength(15), Validators.minLength(3) ]),
			line2: new FormControl(data && data.address ? data.address.line2 : '', [ Validators.maxLength(15) ]),
			area: new FormControl(data && data.address ? this.area : '', [ Validators.required ]),
			state: new FormControl(data && data.address ? this.state : '', [ Validators.required ]),
			city: new FormControl(data && data.address ? this.city : '', [ Validators.required ]),
			pincode: new FormControl(data && data.address ? data.address.pincode : '', [ Validators.required, Validators.maxLength(6), Validators.minLength(6) ]),
		});
		// this.personalForm = this.fb.group({
		// 	firstName: [data ? data.firstName : '', Validators.required, Validators.minLength(3), Validators.maxLength(20) ],
		// 	middleName: [data ? data.middleName : '', Validators.minLength(3), Validators.maxLength(20) ],
		// 	lastName: [data ? data.lastName : '',  Validators.required, Validators.minLength(3), Validators.minLength(20) ],
		// 	mobileNo: [data ? data.mobileNo : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
		// 	mobileNo1: [data ? data.mobileNo1 : '', Validators.maxLength(10), Validators.minLength(10) ],
		// 	officeNo: [data ? data.officeNo : '',  Validators.maxLength(10), Validators.minLength(10) ],
		// 	emailId: [data ? data.emailId : '',  Validators.required, Validators.maxLength(10), Validators.minLength(20) ],
		// 	registrationNo: [data ? data.registrationNo : '',  Validators.required, Validators.maxLength(10), Validators.minLength(15) ],
		// 	adharNo: [data ? data.adharNo : '',  Validators.required, Validators.maxLength(14), Validators.minLength(14) ],
		// 	panNo: [data ? data.panNo : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
		// 	line1: [data && data.address ? data.address.line1 : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
		// 	line2: [data && data.address ? data.address.line2 : '',  Validators.maxLength(10), Validators.minLength(10) ],
		// 	area: [data && data.address ? data.address.area : '',  Validators.maxLength(10), Validators.minLength(10) ],
		// 	pincode: [data && data.address ? data.address.pincode : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
		// 	state: [data && data.address ? data.address.state : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
		//	city: [data && data.address ? data.address.city : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
			// address : this.fb.group({
			// 	line1: [data && data.address ? data.address.line1 : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
			// 	line2: [data && data.address ? data.address.line2 : '',  Validators.maxLength(10), Validators.minLength(10) ],
			// 	area: [data && data.address ? data.address.area : '',  Validators.maxLength(10), Validators.minLength(10) ],
			// 	pincode: [data && data.address ? data.address.pincode : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
			// 	state: [data && data.address ? data.address.state : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
			// 	city: [data && data.address ? data.address.city : '',  Validators.required, Validators.maxLength(10), Validators.minLength(10) ],
			// })
		//});
		this.personalLoad = true;
		this.personalDetails = this.personalForm.value;
	}	
	
	cancelAll(form){
		form.value = JSON.parse(this.copiedData)
	}

	saveDetails(form){
    //if (!this.personalForm.valid) return this.validateAllFormFields(this.personalForm);    
		let data = {
			"doctorId": JSON.parse(this.copiedData).doctorId,
			"firstName": form.value.firstName,
			"lastName": form.value.lastName,
			"middleName": form.value.middleName,
			"mobileNo": form.value.mobileNo,
			"mobileNo1": form.value.mobileNo1,
			"officeContact": form.value.officeContact,
			"emailId": form.value.emailId,
			"registrationNo": form.value.registrationNo,
			"adharNo": form.value.adharNo,
			"panNo": form.value.panNo,
			"emailVerified": JSON.parse(this.copiedData).emailVerified,
			"mobileVerified": JSON.parse(this.copiedData).mobileVerified,
			"address" : {
					"line1": form.value.line1, "line2": form.value.line2,
					"areaId": 1, "area": form.value.area,
					"cityId": 2, "city": form.value.city,
					"stateId": 2, "state": form.value.state,	"pincode": form.value.pincode
				}	
		}
		this.profileService.savePersonalDetails(data)
        .subscribe(
            data => {
				this.toaster.success('Personal details saved successfull');
				this.getDoctorPrsonalDetails();
			},
			error => this.toaster.error(error.error.error[0].errorMessage)
        );
	}

	openEduPopup(flag, data) {
		const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		!data ? data = { "doctorId" :  JSON.parse(this.copiedData).doctorId } : data.doctorId = JSON.parse(this.copiedData).doctorId;  
		dialogConfig.data = {
			data: data,
			flag: flag,
			title: flag == 'addEducation' ? 'Education Details' : 'Delete Education'
		};

    this.dialog.open(AddEduPopupComponent, dialogConfig);
  }

	  educationDetails(){
			this.profileService.educationDetails()
			.subscribe(
					data => this.educationList = data.data,
					error => this.toaster.error(error.error.error[0].errorMessage)
			);
		}

		getStates(){
			this.profileService.getStates()
			.subscribe(
					data => {this.stateList = data.data; console.log(data.data)},
					error => this.toaster.error(error.error.error[0].errorMessage)
			);
		}

		getCity(id){
			this.profileService.getCity(id || this.personalForm.value.state)
			.subscribe(
					data => {this.cityList = data.data; console.log(this.cityList)},
					error => this.toaster.error(error.error.error[0].errorMessage)
			);
		}

		getArea(id){
			this.profileService.getArea(id || this.personalForm.value.city)
			.subscribe(
					data => {this.areaList = data.data; console.log(this.areaList)},
					error => this.toaster.error(error.error.error[0].errorMessage)
			);
		}
		
		validateAllFormFields(formGroup: FormGroup) {      
			
			const controls = this.personalForm.controls;
				const invalid = [];
				for (const name in controls) {
						if (controls[name].invalid) {
								invalid.push(name);
						}
						console.log(invalid)
				}

      Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);             
        if (control instanceof FormControl) {             
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
          this.validateAllFormFields(control);            
        }
      });
    }
}
