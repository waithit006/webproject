import { Component, OnInit } from '@angular/core';
import {ValidateService} from './../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router'
import {Profile} from '../model/profile'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  gender: string;
  user_id : string;
  profile=new Profile();
  constructor(private validateService: ValidateService,
    private flashMessagesService:FlashMessagesService,
  private authservice:AuthService,
private router:Router) { }

  ngOnInit() {
 
  }

  onRegisterSubmit(){
   const user = {
     firstname: this.firstname,
     lastname: this.lastname,
     email: this.email,
     password: this.password,
     birthdate: this.birthdate,
     gender: this.gender
   }
   this.profile.email = this.email;
   this.profile.firstname = this.firstname;
   this.profile.lastname = this.lastname;
   this.profile.birthdate = this.birthdate;
   this.profile.gender = this.gender;

    if(!this.validateService.validateRegister(user)){
     this.flashMessagesService.show('กรอกให้ครบทุกช่อง',{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('กรุณากรอกอีเมล์ให้ถูกต้อง',{cssClass: 'alert-danger',timeout: 3000});
      return false;
    }
    this.authservice.registerUser(user).subscribe(data =>{
      console.log(data['success']);
      
      if(data['success']){
        this.flashMessagesService.show('สมัครสมาชิกเสร็จสิ้น',{cssClass: 'alert-success',timeout: 3000});
       location.reload();
        //this.router.navigate(['/login'])
  
        this.authservice.addfirstprofile(this.profile).subscribe(data=>{
          console.log('add profile success');
          
        });
      }else{
        this.flashMessagesService.show(data['msg'],{cssClass: 'alert-danger',timeout: 3000});
        this.router.navigate(['/login'])
      }

     });
  }

}
