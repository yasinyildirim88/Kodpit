import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  cardNumber: string = '';
  
  processPayment() {
    // Implement payment processing logic here
    // This could involve integrating with a payment gateway or service
    console.log('Processing payment for card number:', this.cardNumber);
  }
}
