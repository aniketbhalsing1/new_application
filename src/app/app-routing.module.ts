import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { VerifyOtpComponent } from './component/auth/verify-otp/verify-otp.component';
import { AuthHeaderComponent } from './component/-layouts/auth-header/auth-header.component';
import { VerifyEmailComponent } from './component/auth/verify-email/verify-email.component';
//import { ProfileHeaderComponent } from './component/-layouts/profile-header/profile-header.component';

const appRoutes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ 
  path: '', 
  component: AuthHeaderComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verifyOTP', component: VerifyOtpComponent },
  ]
},
{ path: 'verifyEmail', component: VerifyEmailComponent },

  {
    path: 'profile',
    loadChildren: 'app/component/user-profile/user-profile.module#UserProfileModule'
  },
 ];


export const routing = RouterModule.forRoot(appRoutes);



