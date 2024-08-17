import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){

  }
  reload:boolean=false
  errMsg!:string
  registerForm:FormGroup = new FormGroup(
    {
      name: new FormControl(null ,[ Validators.maxLength(20),  Validators.minLength(3),Validators.required]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      rePassword: new FormControl(null,[Validators.required]),
      phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },this.checkRepassword
  );
  checkRepassword(x:AbstractControl){
    if(x.get('password')?.value === x.get('rePassword')?.value){

      return null
    }
      else{
        x.get('rePassword')?.setErrors({missmatch:true})
        return {missmatch:true}
      }
      // x.get('password')?.value === x.get('rePassword')?.value ? return null : return {missmatch : true};
  }
  submitRegister(){
    this.reload= true;
    this._AuthService.signUp(this.registerForm.value).subscribe({
      next:(res)=>{
        this.reload=false
        this._Router.navigate(["/login"])
      },
      error:(err)=>{
        this.reload=false
        this.errMsg=err.error.message;
        
      }
    })
    
  }
}
