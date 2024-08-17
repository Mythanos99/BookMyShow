import { Component, Input, OnInit } from '@angular/core';
import { ObjectId } from 'mongodb';
import { Cinema } from 'src/app/models/cinema';
import { Payment } from 'src/app/models/payment';
import { BookingService } from 'src/app/services/booking/booking.service';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { FOOD_SERVICES } from 'src/app/constants/food_service';
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
 @Input() Show:any;
 @Input() Booking:any;
 @Input() TotalAmount:number=0;
  cinema:Cinema=new Cinema('','','',0);
  payment:any;
  booking:any;
  seat_info:any;
  foodServices = FOOD_SERVICES;
  selectedCategory: string = 'All';
  filteredFoodServices: any[] = [];
  selectedItems: any[] = [];
  foodDetails: string = '';
  itemQuantities: { [key: string]: number } = {}; // Mapping for item quantities
  // payment:Payment=new Payment(new ObjectId,new ObjectId,[],0,'');
  constructor(private cinema_Service:CinemaService, private bookingService:BookingService) { }

  ngOnInit(): void {
    // this.cinema_Service.getCinemaById(this.Show.cinemaId).subscribe((response)=>{
    //   this.cinema=response;
    // }) #FIXME- backend not implemented
    // console.log(this.Show);
    // console.log(this.Booking);
    this.filterFoodServices();
  }
  makePayment(){
    const seat:string[]=[];
    this.Booking.forEach((element:any) => {
      seat.push(element.seatName);
    });
    this.payment={
      user_id:'60b9f1b3b3b3b00015f3b3b3', // #FIXME- hardcoded
      show_id:this.Show._id,
      identity:'MOV',
      seats:seat,
      amount:this.TotalAmount,
      status:'success',
      payment_time:new Date()
    }
    this.booking={
      user_id:'60b9f1b3b3b3b00015f3b3b3', // #FIXME- hardcoded
      show_id:this.Show._id,
      amount:this.TotalAmount,
      seats:seat,
      food:this.selectedItems,

    }
    // #FIXME- Here the food id contains the id field. I dont want the id field.
    this.updateSeats();
    const payload={Payment:this.payment,Booking:this.booking,seat_info:this.Show.seat_info};
    this.bookingService.BookTickets(payload).subscribe((response)=>{
      console.log(response);
    });
    
  }
  updateSeats(){

    this.seat_info=this.Show.seat_info
    this.Booking.forEach((element:any) => {
      let rowStatus = this.seat_info[element.categoryId].status[element.rowId];
    let rowStatusArray = rowStatus.split('');
    rowStatusArray[element.seatId] = '1';
    this.seat_info[element.categoryId].status[element.rowId] = rowStatusArray.join('');
    });
    console.log(this.seat_info);

  }
  filterFoodServices(): void {
    if (this.selectedCategory === 'All') {
      this.filteredFoodServices = this.foodServices.flatMap(service => 
        service.items.map(item => ({
          ...item, 
          image: service.imgpath, 
          quantity: this.itemQuantities[item.id] || 0
        }))
      );
    } else {
      const service = this.foodServices.find(service => service.category === this.selectedCategory);
      this.filteredFoodServices = service ? 
        service.items.map(item => ({
          ...item, 
          image: service.imgpath, 
          quantity: this.itemQuantities[item.id] || 0
        })) : [];
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFoodServices();
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.itemQuantities[item.id] = item.quantity;
    this.TotalAmount+=item.price;
    this.updateSelectedItems(item);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 0) {
      item.quantity--;
      this.itemQuantities[item.id] = item.quantity;
      this.TotalAmount-=item.price;
      this.updateSelectedItems(item);
    }
  }

  updateSelectedItems(item: any): void {
    const existingItem = this.selectedItems.find(i => i.id === item.id);
    if (existingItem) {
      if (item.quantity === 0) {
        this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
      } else {
        existingItem.quantity = item.quantity;
      }
    } else {
      if (item.quantity > 0) {
        this.selectedItems.push({ id: item.id, name: item.name, quantity: item.quantity, price: item.price });
      }
    }
    this.updateFoodDetails();
  }

  updateFoodDetails(): void {
    this.foodDetails = this.selectedItems.map(item => `${item.quantity} ${item.name}`).join(', ');
  }


}

// #FIXME- **Important- All these responses and requests make proper interfaces
// #[x]- **Important- Bad code.Fix this code. Clean also