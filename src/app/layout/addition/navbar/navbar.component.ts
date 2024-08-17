import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(public _AuthService:AuthService){

  }
  islogin:boolean = false
  ngOnInit(): void {
      this._AuthService.userData.subscribe(()=>{
        if(this._AuthService.userData.getValue() == null){
          this.islogin = false
        }
        else
        this.islogin =true
    
      })
    }
    
  
}
