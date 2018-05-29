import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { VerifyOtpComponent } from './component/auth/verify-otp/verify-otp.component';
import { ProfileComponent } from './component/profile/profile.component';

const appRoutes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'verifyOTP', component: VerifyOtpComponent },
{ path: 'profile', component: ProfileComponent }
];


export const routing = RouterModule.forRoot(appRoutes);



