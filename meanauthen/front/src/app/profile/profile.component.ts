import { Component, OnInit } from '@angular/core';
import {ValidateService} from './../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Object;

  constructor(private validateService: ValidateService,
    private flashMessagesService:FlashMessagesService,
  private authservice:AuthService,
private router:Router) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile=>{
      this.user = profile['user'];
    },err=>{
      console.log(err);
      return false;
    });
  console.log(this.authservice.getIdLoging());
  
  }

}
