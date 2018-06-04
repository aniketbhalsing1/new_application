import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { VerifyOtpComponent } from './component/auth/verify-otp/verify-otp.component';

const appRoutes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'verifyOTP', component: VerifyOtpComponent },
{
    path: 'profile',
    loadChildren: 'app/component/user-profile/user-profile.module#UserProfileModule'
  },
];


export const routing = RouterModule.forRoot(appRoutes);



