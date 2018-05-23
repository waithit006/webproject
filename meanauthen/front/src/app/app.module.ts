import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule,Routes} from '@angular/router'
import {FormsModule} from '@angular/forms';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages'
import {AuthGuard} from './guard/auth.guard'
import { MomentModule } from 'ngx-moment';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LikebuttonDirective } from './likebutton.directive';
import {ImageUploadModule} from "angular2-image-upload";
import { SettingprofileComponent } from './settingprofile/settingprofile.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const appRoutes: Routes =[
{path:'', component: HomeComponent, canActivate:[AuthGuard]},
{path:'register', component: RegisterComponent},
{path:'login', component: LoginComponent},
{path:'dashboard', component:  DashboardComponent, canActivate:[AuthGuard]},
{path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
{path:'setting', component: SettingprofileComponent,canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    LikebuttonDirective,
    SettingprofileComponent
  ],
  imports: [NgbModule.forRoot(),
    MomentModule,
    ImageUploadModule.forRoot(),
    BrowserModule,
    HttpClientModule,
RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    ModalDialogModule.forRoot()
    
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
