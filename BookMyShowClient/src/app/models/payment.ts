export class Payment {
    id: string;
    booking_id: string;
    amount: number;
    timestamp: Date;
    
    constructor(
      id: string,
      booking_id: string,
      amount: number,
      timestamp: Date = new Date()
    ) {
      this.id = id;
      this.booking_id = booking_id;
      this.amount = amount;
      this.timestamp = timestamp;
    }
  }
  