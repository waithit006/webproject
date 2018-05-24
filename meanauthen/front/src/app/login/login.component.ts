import { Component, OnInit } from '@angular/core';
import {AuthService} from './../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import {ValidateService} from './../services/validate.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  remember: boolean;
  constructor(private authservice:AuthService,
  private flashmessage:FlashMessagesService,
private router:Router,
private validate:ValidateService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  const user = {
    email: this.username,
    password: this.password
  }
  if(this.validate.validateLogin(user)){
    this.authservice.authenticateUser(user).subscribe(data=>{
      if(data['success']){
        this.authservice.storeUserData(data['token'],data['user'],this.remember);
        this.flashmessage.show('ล็อคอินสำเร็จ',{
          cssClass: 'alert-success',
          timeout: 5000});
          this.router.navigate(['dashboard']);
          location.reload();
      }else{
        this.flashmessage.show(data['msg'],{
          cssClass: 'alert-danger',
          timeout: 5000});
          this.router.navigate(['login']);
      }
      
    })}
    else{
      
      this.flashmessage.show("กรุณากรอกให้ครบทุกช่อง",{
        cssClass: 'alert-danger',
        timeout: 5000});
    }
  }
  checkfunction(){
    console.log(this.remember);
    
  }
}
