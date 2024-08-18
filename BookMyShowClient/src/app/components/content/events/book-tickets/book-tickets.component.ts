import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

interface Ticket {
  _id: string;
  type: string;
  price: number;
  quantity: number;
}

interface PaymentDetails {
  categoryName: string;
  numberOfSeats: number;
  showTime: Date;
  showLocation: string;
  totalAmount: number;
  show_id: string;
}

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss']
})
export class BookTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedTickets: { [key: string]: number } = {}; // To store selected quantities for each ticket type
  totalAmount: number = 0;
  showPaymentGateway: boolean = false;
  paymentDetails!: PaymentDetails;
  eventId: string | null = '';

  constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventTicketInfo();
  }

  getEventTicketInfo(): void {
    this.eventService.getEventTicketInfo(this.eventId || '').subscribe(tickets => {
      this.tickets = tickets.ticketInfo;
    });
  }

  increaseQuantity(ticketId: string): void {
    if (!this.selectedTickets[ticketId]) {
      this.selectedTickets[ticketId] = 1;
    } else {
      this.selectedTickets[ticketId]++;
    }
    this.updateTotalAmount();
  }

  decreaseQuantity(ticketId: string): void {
    if (this.selectedTickets[ticketId] && this.selectedTickets[ticketId] > 0) {
      this.selectedTickets[ticketId]--;
      this.updateTotalAmount();
    }
  }

  updateTotalAmount(): void {
    this.totalAmount = Object.keys(this.selectedTickets).reduce((sum, ticketId) => {
      const ticket = this.tickets.find(t => t._id === ticketId);
      return sum + (ticket ? ticket.price * this.selectedTickets[ticketId] : 0);
    }, 0);
  }

  goToPayment(): void {
    if (this.totalAmount > 0) {
      this.paymentDetails = {
        categoryName: this.getFormattedTicketDetails(),
        numberOfSeats: this.getTotalSeats(),
        showTime: new Date(),  // Replace with actual show time if available
        showLocation: 'PVR Orion Uptown, Bengaluru',  // Replace with actual show location if available
        totalAmount: this.totalAmount,
        show_id: this.eventId || ''
      };

      this.showPaymentGateway = true;
    }
  }

  getFormattedTicketDetails(): string {
    return Object.keys(this.selectedTickets)
      .map(ticketId => {
        const ticket = this.tickets.find(t => t._id === ticketId);
        return ticket ? `${this.selectedTickets[ticketId]} ${ticket.type}` : '';
      })
      .filter(detail => detail)
      .join(', ');
  }

  getTotalSeats(): number {
    return Object.values(this.selectedTickets).reduce((total, quantity) => total + quantity, 0);
  }
}
