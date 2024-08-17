import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, afterRender, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private x:object){
   
    
  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.x)){
      console.log(document.title);
      
    }
  
  }
  demo(){
    
    
  }
}
