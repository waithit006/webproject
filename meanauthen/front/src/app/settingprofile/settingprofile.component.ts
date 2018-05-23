import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Profile} from '../model/profile'; 
@Component({
  selector: 'app-settingprofile',
  templateUrl: './settingprofile.component.html',
  styleUrls: ['./settingprofile.component.css']
})
export class SettingprofileComponent implements OnInit {
  selectedFileProfile: File = null;
  selectedFileCover: File = null;
  profile= new Profile();
  useremail:string;
  profiledata:Profile;
  constructor(private http:HttpClient,private auth:AuthService) { }

  ngOnInit() {
   this.auth.getProfile().subscribe(data=>{
     this.useremail = data['user']['email'];

     this.readdata(this.useremail);
   })

   
  }

  readdata(email){
    this.auth.getprofile(email).subscribe(data=>{

      this.profiledata = data['profile'];
  console.log(data);
  
      
    })

  }

  
  onFileSelected(event){
    this.selectedFileProfile = <File>event.target.files[0];
  }

  onFileSelectedCover(event){
    this.selectedFileCover = <File>event.target.files[0];
    
  }
  onUpload(){
    const fd = new FormData();


   
    fd.append('cover',this.selectedFileCover,this.selectedFileCover.name);
    fd.append('profile',this.selectedFileProfile,this.selectedFileProfile.name);

    this.http.post('http://localhost:3080/profile',fd)
    .subscribe(res=>{
    
    this.profile.imageprofile = res['result']['profile']['0']['filename'];
    this.profile.imagecover = res['result']['cover']['0']['filename'];
    this.profiledata.imageprofile = this.profile.imageprofile;
    this.profiledata.imagecover = this.profile.imagecover;
      
    });
    
  this.save();

  }

  getimage(image){
  
    
    return "http://localhost:3080/uploads/"+image;
  }

  save(){

this.profile.email = this.profiledata.email;

this.profiledata = this.profile;
    this.auth.editprofile(this.profile).subscribe(data=>{
  
      console.log(this.profile);
      
    })
    console.log(this.profile);
   // this.readdata();
  alert("บันทึกเรียบร้อย");

  }


}
