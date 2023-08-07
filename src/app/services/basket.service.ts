import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BasketModel } from '../models/basket.model';
import { Observable } from 'rxjs';


interface BasketItem {
  urunAdi: string;
  urunfiyati: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  api: string = environment.api;
  baskets: BasketModel[] = [];
  private basketItems: BasketItem[] = [];

  constructor(
    private _http: HttpClient
  ) { 
    this.getBaskets();
    }

  getBasketItems(): BasketItem[] {
    return this.basketItems;
    }
     // API'den ürün fiyatlarını alacak olan fonksiyon
  getProductPricesFromAPI(): Observable<BasketItem[]> {
    // API'nin URL'si buraya gelmeli
    const apiUrl = 'http://localhost:3000/';

    // API'den ürün fiyatlarını almak için GET isteği yapılıyor
    return this._http.get<BasketItem[]>(apiUrl);
  }

  delete(id: number){
    this._http.delete<any>(this.api + "baskets/" + id).subscribe({
      next: ()=> this.getBaskets(),
      error: (err)=> console.log(err)      
    })
  }
  
  getBaskets(){
    this._http.get<any>(this.api + "baskets").subscribe({
      next: (res)=> this.baskets = res,
      error: (err)=> console.log(err)      
    })
  }

}
