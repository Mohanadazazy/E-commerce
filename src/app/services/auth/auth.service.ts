import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { InvalidEmail, login,  ResponseSuccess, signup } from '../../interface/auth/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { responseFailed } from './../../interface/auth/auth';
import { Enviroment } from '../../Enviroment/enviroment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  userData:BehaviorSubject<any> = new BehaviorSubject(null);
  token!:string;
  baseUrl=Enviroment.base_url
  constructor(private _HttpClient:HttpClient ,private _Router:Router , @Inject(PLATFORM_ID) private x:object) { 
    if(isPlatformBrowser(this.x)){
      if(localStorage.getItem("UserToken")){
        this.decodeUserData();
      }
    }
     
    
  }
  
  signUp(data:signup):Observable<ResponseSuccess | responseFailed>{
   return this._HttpClient.post<ResponseSuccess | responseFailed>(`${this.baseUrl}/api/v1/auth/signup`,data)
  }
  login(data:login):Observable<ResponseSuccess >{
   return this._HttpClient.post<ResponseSuccess >(`${this.baseUrl}/api/v1/auth/signin`,data)
  }
  logout(){
    localStorage.removeItem("UserToken")
    this.userData.next(null)
    this._Router.navigate(["/login"])
  }
  decodeUserData(){
    this.token = JSON.stringify(localStorage.getItem("UserToken"))
    this.userData.next(jwtDecode(this.token))
    console.log(this.userData.getValue());
    
  }

}
