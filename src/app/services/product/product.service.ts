import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { Products } from '../../interface/products/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }
  getProducts():Observable<Products>{
  return  this._HttpClient.get<Products>(Enviroment.base_url+'/api/v1/products')
  }
}
