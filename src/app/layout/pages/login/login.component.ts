import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import {  InvalidEmail, responseFailed, ResponseSuccess } from '../../../interface/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  succes!:ResponseSuccess
  errMsg!:(responseFailed | InvalidEmail)
  reload:boolean=false
  constructor(private _AuthService:AuthService, private _Router:Router){}
  loginForm:FormGroup= new FormGroup({
    email:  new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required])
  })

  submitLogin(){
    if(this.loginForm.valid){
        this.reload=true
        this._AuthService.login(this.loginForm.value).subscribe({
          next:(res)=>{
            localStorage.setItem("UserToken",res.token)
            this._AuthService.decodeUserData()
            this.reload=false; 
            this._Router.navigate(["/home"])
          },
          error:(err)=>{
            console.log(err);
            console.log(typeof err);
            if(err.status == 400){
              console.log("hamada");
              this.errMsg=err.error.errors.msg
              console.log(this.errMsg);
              
              
            }
            else{

              this.errMsg=err.error.message
            }
            
          }
        })
    }
  }
}
