import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = [];
  constructor() { }


  addToCart(productcombination: string) {
    this.items.push(productcombination);
  }

  getItems() {
    return this.items;
  }

  getitemsCount(){
    return this.items.length;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}


