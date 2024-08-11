import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
interface FoodItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  _id: string;
}

interface Order {
  user_id: string;
  show_id: string;
  transaction_id: string;
  amount: number;
  seats: string[];
  food: FoodItem[];  // Ensure this is properly defined
}

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  recentOrders: Order[] = [];
  allOrders: Order[] = [];

  constructor(private bookingService:BookingService) { }

  ngOnInit(): void {
    this.bookingService.getRecentBookingsOfUser('60b9f1b3b3b3b00015f3b3b3').subscribe((data) => {
      this.recentOrders = data[0].last_bookings;
      // console.log(data[0]);
    });
    this.bookingService.getAllBookingsOfUser('60b9f1b3b3b3b00015f3b3b3').subscribe((data) => {
      this.allOrders = data;
      // console.log(data);
    });
  }
}
// #FIXME- convert these response and request to correct types.hardcoded user id. Fetch all orders only when user wants it.
// #TODO- when user clicks on a booking, show the details of the booking.
// #TODO- when user clicks on load all orders, then keep a loading point.
