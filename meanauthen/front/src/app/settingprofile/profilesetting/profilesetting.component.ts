import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.component.html',
  styleUrls: ['./profilesetting.component.css']
})
export class ProfilesettingComponent implements OnInit {

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

  
  onFileSelected(event){
    this.selectedFileProfile = <File>event.target.files[0];
  }

  onFileSelectedCover(event){
    this.selectedFileCover = <File>event.target.files[0];
    
  }
  onUpload(){
    const fd = new FormData();


   if(this.selectedFileCover==null&&this.selectedFileProfile!=null){
    fd.append('profile',this.selectedFileProfile,this.selectedFileProfile.name);
    this.http.post('http://localhost:3080/profile',fd)
    .subscribe(res=>{
    this.profiledata.imageprofile = res['result']['profile']['0']['filename'];
    this.profile.imageprofile = this.profiledata.imageprofile;  
    this.auth.editprofile(this.profile).subscribe(data=>{
  
      console.log(this.profile);
      
    })
    console.log(this.profile);
   // this.readdata();
  alert("บันทึกเรียบร้อย");
    });
    
  

   }else if(this.selectedFileCover!=null&&this.selectedFileProfile==null){
    fd.append('cover',this.selectedFileCover,this.selectedFileCover.name);
    this.http.post('http://localhost:3080/profile',fd)
    .subscribe(res=>{
    this.profiledata.imagecover = res['result']['cover']['0']['filename'];
    this.profile.imagecover = this.profiledata.imagecover; 
    this.auth.editprofile(this.profile).subscribe(data=>{
  
      console.log(this.profile);
      
    })
    console.log(this.profile);
   // this.readdata();
  alert("บันทึกเรียบร้อย"); 
    });
    
     
  
   }
   else if(this.selectedFileCover==null&&this.selectedFileProfile==null){
    this.auth.editprofile(this.profile).subscribe(data=>{
  
      console.log(this.profile);
      
    })
    console.log(this.profile);
   // this.readdata();
  alert("บันทึกเรียบร้อย");
    console.log('ok');
    
   }
   else{
   
    fd.append('cover',this.selectedFileCover,this.selectedFileCover.name);
    fd.append('profile',this.selectedFileProfile,this.selectedFileProfile.name);

    this.http.post('http://localhost:3080/profile',fd)
    .subscribe(res=>{
    console.log(res);
    
    this.profiledata.imageprofile = res['result']['profile']['0']['filename'];
    this.profiledata.imagecover = res['result']['cover']['0']['filename'];
    this.profile.imageprofile = this.profiledata.imageprofile;  
    this.profile.imagecover = this.profiledata.imagecover;  
    this.auth.editprofile(this.profile).subscribe(data=>{
  
      console.log(this.profile);
      
    })
    console.log(this.profile);
   // this.readdata();
  alert("บันทึกเรียบร้อย");
    });

  

  }
  console.log(this.profile.imagecover + this.profile.imageprofile);
  
location.reload();
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

  }


}
