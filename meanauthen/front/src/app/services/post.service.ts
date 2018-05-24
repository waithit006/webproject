import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'
import { Post } from '../model/post'
import {URLSearchParams} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private post:Post;
  private baseUri:string="http://localhost:3080";
  private headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { 

  }
  readPost(){
    return this.http.get(this.baseUri+'/users/readpost',{headers:this.headers});
  }

  createPost(Post:Post){
    return this.http.post(this.baseUri+'/users/post',Post,{headers:this.headers});

  }

  LikePost(idpost:string,Iduser:string){
    
let params = new HttpParams();
params = params.append('id', idpost);
params = params.append('userid', Iduser);

    return this.http.get(this.baseUri+'/users/like',{params:params}).subscribe();
  }
  
  comment(postid){
    return this.http.post(this.baseUri+'/users/getpostwithid',{postid:postid},{headers:this.headers});
  }

}
