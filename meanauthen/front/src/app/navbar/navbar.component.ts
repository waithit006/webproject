import { Component, OnInit } from '@angular/core';
import {AuthService} from './../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import {Router} from '@angular/router'
import { Post } from '../model/post';
import { Profile } from '../model/profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  useremail:string;
  profiledata:Profile;
  constructor(private authservice:AuthService,
    private flashmessage:FlashMessagesService,
  private router:Router) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(data=>{
      this.useremail = data['user']['email'];
      this.readdata(this.useremail);
    })
 
    
   }
 
   readdata(email){
     this.authservice.getprofile(email).subscribe(data=>{
 
       this.profiledata = data['profile'];
   console.log(data);
   
       
     })
 
   }
  onLogoutClick(){
    this.authservice.logout();
    this.flashmessage.show('Log out เสร็จสิ้น',{
      cssClass:'alert-success',
      timeout: 3000
    })
    this.router.navigate(['/login']);
    return false;
  }
  getimage(image){
  
    
    return "http://localhost:3080/uploads/"+image;
  }

}
