import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }


validateRegister(user){
  if(user.firstname==undefined || user.lastname ==undefined ||user.email==undefined ||
     user.password==undefined || user.birthdate==undefined || user.gender==undefined){
      return false;
    }
    else{
      return true;
    }
}

validateLogin(user){
  if(user.email==undefined|| user.password==undefined ||user.email=="" || user.password==""){
    return false;
  }
  else{
    return true;
  }
}

validateEmail(email){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
}


