import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Profile} from '../model/profile';
import {URLSearchParams} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 authToken: any;
 user: any;
 private baseUri:string="http://localhost:3080";
  private headers = new HttpHeaders().append('Content-Type','application/json');
 remember: boolean;

 
  constructor(private http:HttpClient,
  ) {
  
   }

   setremember(remembercheck){
    this.remember = remembercheck;
   }

   loggedIn(){
    const helper = new JwtHelperService();

    const isExpired = helper.isTokenExpired(localStorage.getItem('id_token'));

     const isExpired_session = helper.isTokenExpired(sessionStorage.getItem('id_token'));

 
     if(localStorage.getItem('remember')){
      const isExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
      return isExpired;
     }else{
      const isExpired_session = helper.isTokenExpired(sessionStorage.getItem('id_token'));
      return isExpired_session
     }

    
   }

   editprofile(profile:any){
    return this.http.post(this.baseUri+'/users/editprofile',profile,{headers:this.headers});
   }

   registerUser(user){

    return this.http.post(this.baseUri+'/users/register',user,{headers:this.headers});
   }

   addfirstprofile(profile:Profile){
    return this.http.post(this.baseUri+'/users/createprofile',profile,{headers:this.headers});
   }



   authenticateUser(user){
    return this.http.post(this.baseUri+'/users/authenticate',user,{headers:this.headers});
   }

   storeUserData(token,user,remember){

     if(remember){
     localStorage.setItem('id_token',token);
     localStorage.setItem('remember',remember);
     localStorage.setItem('user',JSON.stringify(user));}
     else{
      sessionStorage.setItem('id_token',token);
      sessionStorage.setItem('user',JSON.stringify(user));
     }
     this.authToken = token;
     this.user = user;
   }

   getProfile(){
   let header = new HttpHeaders();
   this.LoadToken();
   //console.log(this.authToken);
   
   header= header.append('Authorization',this.authToken);
   header = header.append('Content-Type','application/json');
    return this.http.get(this.baseUri+'/users/profile',{headers:header});
   
  }

  getpostbyid(id){
    let params = new HttpParams();
    params = params.append('id_userpost',id);

    return this.http.get(this.baseUri+'/users/postuser',{params:params});
  }

  getprofile(email){
    let params = new HttpParams();
params = params.append('email',email);


    

    return this.http.get(this.baseUri+'/users/getprofile',{params:params});
  }

  
  getprofileimage(email){
    let params = new HttpParams();
params = params.append('email',email);
    let name:any;
return this.http.get(this.baseUri+'/users/getprofileimage',{params:params});
  }

  getHistory(ID:string){
    let params = new HttpParams();
    params = params.append('id', ID);

    
        return this.http.get(this.baseUri+'/users/getname',{params:params}).subscribe();
  
  }

  getIdLoging(){
    let username:String;
    this.getProfile().subscribe(data=>{
      username = data['user']._id;
    },
    err=>{

    }
  )

  return username;
  }

   LoadToken(){
     if(localStorage.getItem('remember')){
     const token = localStorage.getItem('id_token');
     this.authToken = token;}
     else{
      const token = sessionStorage.getItem('id_token');
      this.authToken = token;
     }
   
   }

   logout(){
     this.authToken = null;
     this.user = null;
     localStorage.clear();
     sessionStorage.clear();

   }
}
