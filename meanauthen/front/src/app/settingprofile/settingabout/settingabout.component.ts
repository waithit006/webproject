import { Component, OnInit } from '@angular/core';

import { Profile } from '../../model/profile';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-settingabout',
  templateUrl: './settingabout.component.html',
  styleUrls: ['./settingabout.component.css']
})
export class SettingaboutComponent implements OnInit {


  profile= new Profile();
  useremail:string;
  profiledata:Profile;
  constructor(private http:HttpClient,private auth:AuthService) { }

  ngOnInit() {
   this.auth.getProfile().subscribe(data=>{
     this.useremail = data['user']['email'];

     this.readdata(this.useremail);
     this.profile.email = this.useremail;
      this.profiledata = this.profile;
      
   })

   
  }

  readdata(email){
    this.auth.getprofile(email).subscribe(data=>{

      this.profile = data['profile'];
      
  console.log(data);
  
      
    })

  }



  getimage(image){
  
    
    return "http://localhost:3080/uploads/"+image;
  }

  save(){


    this.auth.editprofile(this.profile).subscribe(data=>{
  
      console.log(this.profile);
      
    })
    console.log(this.profile);
   // this.readdata();
  alert("บันทึกเรียบร้อย");
  location.reload();
  }
}