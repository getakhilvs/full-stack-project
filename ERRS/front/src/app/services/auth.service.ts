import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  log:boolean=false;
  login(user:any){
    localStorage.setItem('user', JSON.stringify(user))
    this.log=true;
  }
  logout(){
    localStorage.clear()
    this.log=false;
  }
  isAuthenticated(){
    const user = localStorage.getItem('user')
    if(!!user){ 
      return true
    }else{
      return false
    }
  }
}