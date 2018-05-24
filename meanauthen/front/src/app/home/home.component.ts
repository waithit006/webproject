import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Post } from '../model/post'
import {PostService} from './../services/post.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import * as moment_ from 'moment';
import {AuthService} from './../services/auth.service';
import { log } from 'util';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Directive, ElementRef ,ViewChild } from '@angular/core';
import { element } from 'protractor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Profile } from '../model/profile';
import { HttpClient } from '@angular/common/http';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts = new Post();
  postdata:Post;
  profiledata:Profile;
  namenavbar = "Profile";
  userid:string;
  email:string;
  uploadImageName: any;
  postgetbyid: Post;
  plaintext_comment:string;
  selectedFileImagePost: File = null;

  constructor(private flashMessagesService:FlashMessagesService
    ,private postservice:PostService,private auth:AuthService,
      element: ElementRef,private modalService: NgbModal,private http:HttpClient) { 
    moment_.locale('th');
  }
  closeResult: string;
  color:string = 'red';

  changeStyle($event){
    this.color = $event.type == 'mouseover' ? 'yellow' : 'red';
  }

 
  onUploadFinished($event) {
    console.log($event.serverResponse._body);
    this.uploadImageName = $event.serverResponse._body;
  }
  user:Object;

  myDate: Date;

 
  ngOnInit() {
    this.myDate = new Date();

    
    
    this.auth.getProfile().subscribe(
      data=> {
        this.user = data['user'];
        this.email = data['user']['email'];
        this.readpost();
        this.readdata(this.email);
        console.log(this.getdata(this.email));
      },
      err=>{
        console.log(err);
      }
    )

    

  }
  
  getdata(email){
    this.auth.getprofile(email).subscribe(data=>{
      console.log(data);
      
    })
  }

  getimageby(email){
   this.auth.getprofile(email).subscribe(data=>{
     return data;
   })
  }

  getimage(image){
  
    
    return "http://localhost:3080/uploads/"+image;
  }

  onFileSelected(event){
    this.selectedFileImagePost = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();


   if(this.selectedFileImagePost==null){
   
    console.log(this.user['_id']+"");
    
    this.posts.id_userpost = this.user['_id']+"";
    this.posts.email = this.email;
    this.posts.name = this.profiledata.firstname+"  "+this.profiledata.lastname;
    this.posts.imageprofile = this.profiledata.imageprofile;
    this.posts.create_on = new Date()+"";
this.postservice.createPost(this.posts).subscribe(
  data=>{
    console.log(data);
    this.readpost();
    this.posts.plaintext = "";
    this.readpost();
  },
  err=>{
console.log(err);

  }
)

   }else{
    fd.append('imagepost',this.selectedFileImagePost,this.selectedFileImagePost.name);
    this.http.post('http://localhost:3080/profile',fd)
    .subscribe(res=>{
    this.posts.image = res['result']['imagepost']['0']['filename'];
    this.posts.id_userpost = this.user['_id']+"";
    this.posts.email = this.email;
    this.posts.name = this.profiledata.firstname+"  "+this.profiledata.lastname;
    this.posts.imageprofile = this.profiledata.imageprofile;
    this.posts.create_on = new Date()+"";
this.postservice.createPost(this.posts).subscribe(
  data=>{
    console.log(data);
    this.readpost();
    this.posts.plaintext = "";
    this.readpost();
  },
  err=>{
console.log(err);

  }
)
    });
    
     
  
   }
   
  
  

  }

  readdata(email){
    this.auth.getprofile(email).subscribe(data=>{

      this.profiledata = data['profile'];
  
  console.log(data);
  
      
    })

  }

  savecomment(postid){
    this.auth.comment(postid,this.profiledata.firstname +" "+this.profiledata.lastname,this.plaintext_comment).subscribe(data=>{
        console.log(data);
        this.postservice.comment(postid).subscribe(data=>{

          this.postgetbyid = data['post'];
          console.log(this.postgetbyid['comment'][0]);
          
        })
        
    });
    this.plaintext_comment = "";
    this.readpost();
    this.readdata(this.email);
  }

  open(content,postid) {
    this.postservice.comment(postid).subscribe(data=>{

      this.postgetbyid = data['post'];
      console.log(this.postgetbyid);
      
    })
    this.modalService.open(content, { centered: true }).result.then((result) => {
         

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     
      return 'by clicking on a backdrop';
    } else {
   
   
      return  `with: ${reason}`;
    }
    
  }


  PostSubmit(){
    console.log(this.user['_id']+"");
    
    this.posts.id_userpost = this.user['_id']+"";
    this.posts.email = this.email;
    this.posts.name = this.profiledata.firstname+"  "+this.profiledata.lastname;
    this.posts.imageprofile = this.profiledata.imageprofile;
    this.posts.create_on = new Date()+"";
this.postservice.createPost(this.posts).subscribe(
  data=>{
    console.log(data);
    this.readpost();
    this.posts.plaintext = "";
    this.readpost();
  },
  err=>{
console.log(err);

  }
)
  }

readpost(){
  this.auth.getpostbyid(this.user['_id']).subscribe(
    data=> { this.postdata = data['post'];

    

  },err=>{console.log(err);
  
  }
)
}

  checktime(time){
    


    
  let yesterday = moment_().subtract(1,'day');

    
    if(!moment_(time).isBetween(yesterday,moment_())){
      return moment_(time).format("DD MMM YYYY เวลา HH:mm");   
    }else{

    return moment_(time).startOf('second').fromNow();  }
  }

  likemouseover(e,index){
console.log(e.target.id + " " + index);

  $("#"+e.target.id).css('color','red');

  console.log("hello");
  

  }

  likemouseleave(e,index){
    console.log(e.target.id + " " + index);

    
    
      $("#"+e.target.id).css('color','#c2c5d9');
    
      console.log("hello");
      
    
      }



  like(id,e){


this.postservice.LikePost(id,this.user['_id']);
if($(e.target).css('color')=='rgb(194, 197, 217)'){
$(e.target).css('color','red');
console.log($(e.target).find('span').text());

$(e.target).find('span').text(parseInt($(e.target).find('span').text())+1);
}
else{
  $(e.target).css('color','#c2c5d9');
  $(e.target).find('span').text(parseInt($(e.target).find('span').text())-1);
}


  }


  checklike(like){
    let check = false;
    
  
 
  

  
    // like.forEach(element => {
    //   if(this.userid==element){
    //    check = true;
    //    console.log(like);
    //   }
    // });

    for(let i in like){
       if(this.user['_id']==like[i]){
         check = true;
       }
        
    }
  return check;
  }


}
