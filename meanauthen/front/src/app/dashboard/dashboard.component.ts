import { Component, OnInit } from '@angular/core';
import {PostService} from './../services/post.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import {AuthService} from './../services/auth.service';
import {Post} from '../model/post';
import {Router} from '@angular/router';
import * as moment_ from 'moment';
import { Profile } from '../model/profile';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nowDate: string;
   plaintext:string;
   counttimelogin:number;
   posts = new Post();
   user_id:string;
  postdata:Post;
  namenavbar = "Feed News";
  closeResult: string;
  postgetbyid: Post;
  selectedFileImagePost: File = null;
  plaintext_comment:string;
  useremail:string;
  profiledata:Profile
  user:Object;
  havingProfileimage:boolean;
  constructor(private flashMessagesService:FlashMessagesService,private postservice:PostService,
  private authservice:AuthService,
private router:Router,private modalService: NgbModal,private http:HttpClient) { 
  moment_.locale('th');
 this.nowDate = moment_().toNow();

}

  ngOnInit() {
    this.readPost();

    this.authservice.getProfile().subscribe(data=>{
      this.useremail = data['user']['email'];
      this.readdata(this.useremail);
      this.user = data['user'];
    })

    
   
    
     

 
  }

  onFileSelected(event){
    this.selectedFileImagePost = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();


   if(this.selectedFileImagePost==null){
   
    console.log(this.user['_id']+"");
    
    this.posts.id_userpost = this.user['_id']+"";
    this.posts.email = this.useremail;
    this.posts.name = this.profiledata.firstname+"  "+this.profiledata.lastname;
    this.posts.imageprofile = this.profiledata.imageprofile;
    this.posts.create_on = new Date()+"";
this.postservice.createPost(this.posts).subscribe(
  data=>{
    console.log(data);
    this.readPost();
    this.posts.plaintext = "";
    this.readPost();
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
    this.posts.email = this.useremail;
    this.posts.name = this.profiledata.firstname+"  "+this.profiledata.lastname;
    this.posts.imageprofile = this.profiledata.imageprofile;
    this.posts.create_on = new Date()+"";
this.postservice.createPost(this.posts).subscribe(
  data=>{
    console.log(data);
    this.readPost();
    this.posts.plaintext = "";
    this.readPost();
  },
  err=>{
console.log(err);

  }
)
    });
    
     
  
   }
   
  
  

  }

  
  savecomment(postid){
    this.authservice.comment(postid,this.profiledata.firstname +" "+this.profiledata.lastname,this.plaintext_comment).subscribe(data=>{
        console.log(data);
        this.postservice.comment(postid).subscribe(data=>{

          this.postgetbyid = data['post'];
          console.log(this.postgetbyid['comment'][0]);
          
        })
        
    });
    this.plaintext_comment = "";
    this.readPost();
    this.readdata(this.useremail);
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

  
  readdata(email){
    this.authservice.getprofile(email).subscribe(data=>{

      this.profiledata = data['profile'];
      if(data['profile']['imageprofile']==null||data['profile']['imageprofile']==undefined){
        this.router.navigate(['/setting']);
      }
  console.log(data);
  
      
    })

  }

  

  checkfirsttime(){

  }

  readPost(){
    this.postservice.readPost().subscribe(
      data=>{
        console.log(data);
        this.postdata = data['post'];
        
      },
      error=>{
        console.log(error);
        
      }
    )

  }

  
  
  getimageby(email){
    this.authservice.getprofile(email).subscribe(data=>{
      return data['profile']['imageprofile'];
    })
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
    
      getimage(image){
  
    
        return "http://localhost:3080/uploads/"+image;
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
   getprofileimage(email){
    this.authservice.getprofileimage(email).subscribe(data=>{
   console.log(data);
   
    },err=>{

    },()=>{

    })

    
   } 

   checktime(time){
    


    
    let yesterday = moment_().subtract(1,'day');
  
      
      if(!moment_(time).isBetween(yesterday,moment_())){
        return moment_(time).format("DD MMM YYYY เวลา HH:mm");   
      }else{
  
      return moment_(time).startOf('second').fromNow();  }
    }

  PostSubmit(){
    console.log(this.user['_id']+"");
    
    this.posts.id_userpost = this.user['_id']+"";
    this.posts.email = this.useremail;
    this.posts.name = this.profiledata.firstname+"  "+this.profiledata.lastname;
    this.posts.imageprofile = this.profiledata.imageprofile;
    this.posts.create_on = new Date()+"";
this.postservice.createPost(this.posts).subscribe(
  data=>{
    console.log(data);
    this.readPost();
    this.posts.plaintext = "";
  },
  err=>{
console.log(err);

  }
)
  }
  // PostSubmit(){
  //   const post = {
  //     name: "kik",
  //     plaintext: this.plaintext,
  //   }


  //   this.postservice.createPost(post).subscribe(
  //     data=>{
  //       console.log(data);
  //       this.router.navigate(['dashboard']);
  //       this.readPost();
  //       this.plaintext = "";
  //     },
  //     error=>{
  //       console.log(error);
        
  //     }

  //   )
  // }

  
}