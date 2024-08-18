import { Component, Input, OnInit } from '@angular/core';

interface PaymentDetails {
  categoryName: string;
  numberOfSeats: number;
  showTime: Date;
  showLocation: string;
  totalAmount: number;
  show_id: string;
}
@Component({
  selector: 'app-payment-gateway-event',
  templateUrl: './payment-gateway-event.component.html',
  styleUrls: ['./payment-gateway-event.component.scss']
})
export class PaymentGatewayEventComponent implements OnInit {
  @Input() paymentDetails!: PaymentDetails;

  constructor() {}

  ngOnInit(): void {}
  
  proceedToPay(): void {
    // Logic to proceed to the payment gateway or complete payment
    console.log('Proceeding to pay:', this.paymentDetails.totalAmount);
    // Here you can add logic to redirect to a payment gateway or similar.
  }

}
