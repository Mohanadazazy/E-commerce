import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Daum, Products } from '../../../interface/products/products';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy{
constructor(private _ProductService:ProductService){}
products!:Daum[]
Search:string=""
unSub!:Subscription
ngOnInit(): void {
    this.getProducts();
}
getProducts(){
   this.unSub = this._ProductService.getProducts().subscribe({
    next:(res)=>{
      this.products=res.data
      console.log(this.products);
      
    }
  })
}
ngOnDestroy(): void {
    this.unSub.unsubscribe()
}
}
