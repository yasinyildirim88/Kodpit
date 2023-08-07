import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BasketModel } from 'src/app/models/basket.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements AfterContentChecked {
  
  baskets: BasketModel[] = [];
  totalBasketPrice: number = 0;
  constructor(private _basket: BasketService) { }

  //Sepetdeki ürünleri toplama işlemi çağırma //
  ngAfterContentChecked() {
    this.baskets = this._basket.baskets;
    this.calculateTotalPrice();
  }
  //Sepetdeki ürünleri silme işlemi //
  delete(id: number) {
    this._basket.delete(id);
    this.calculateTotalPrice();
  }
  //Sepetdeki ürünleri toplama işlemi //
  calculateTotalPrice(): void { 
    this.totalBasketPrice = 0;
    for (const item of this.baskets) {
      if (typeof item.urunFiyati === 'number') {
        this.totalBasketPrice += item.urunFiyati;
      } else if (typeof item.urunFiyati === 'string') {
        const priceAsNumber = parseFloat(item.urunFiyati);
        if (!isNaN(priceAsNumber)) {
          this.totalBasketPrice += priceAsNumber;
        }
      }
    }}
}
